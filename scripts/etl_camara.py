import os
import requests
from supabase import create_client, Client

# Configurações do Supabase
URL = "https://lblluuiqqtptefetrblt.supabase.co"
# Usando a Secret Key (Service Role) para evitar problemas de RLS durante o ETL inicial
KEY = "sb_secret_2fBe4_ErnpMegyYvxjoRjw_dfCC3bRn"

if not URL or not KEY:
    print("ERRO: Defina SUPABASE_URL e SUPABASE_KEY nas variáveis de ambiente.")
    exit(1)

supabase: Client = create_client(URL, KEY)

# API da Câmara dos Deputados
CAMARA_API_BASE = "https://dadosabertos.camara.leg.br/api/v2/deputados"

def fetch_deputados(limite=10):
    """Busca deputados da legislatura atual."""
    print(f"Buscando {limite} deputados na API da Câmara...")
    try:
        response = requests.get(f"{CAMARA_API_BASE}?ordem=ASC&ordenarPor=nome&itens={limite}")
        response.raise_for_status()
        dados = response.json().get('dados', [])
        return dados
    except Exception as e:
        print(f"Erro ao buscar API da Câmara: {e}")
        return []

def insert_candidatos(deputados):
    """Insere deputados no Supabase (ignorando duplicatas da API)."""
    sucesso = 0
    for dep in deputados:
        try:
            # Map da API para o nosso Banco
            carga = {
                "id_tse": str(dep.get("id")), # Na câmara o ID também é numérico
                "nome_urna": dep.get("nome"),
                "partido": dep.get("siglaPartido"),
                "uf": dep.get("siglaUf"),
                "cargo": "Deputado Federal",
                "foto_url": dep.get("urlFoto"),
                "status_ficha_limpa": True, # Mockado até integração CNJ/Jusbrasil
                "num_processos_stf": 0,
                "qnt_votos_passada": None
            }
            
            # Upsert
            response = supabase.table("candidatos").upsert(carga, on_conflict="id_tse").execute()
            sucesso += 1
            print(f"[OK] {carga['nome_urna']} ({carga['partido']}-{carga['uf']})")
        except Exception as e:
            print(f"[ERRO] {dep.get('nome')}: {e}")
            
    print(f"\\nResumo: {sucesso}/{len(deputados)} inseridos com sucesso no Supabase.")

# API do Senado
SENADO_API_BASE = "https://legis.senado.leg.br/dadosabertos/senador/lista/atual"

def fetch_senadores():
    """Busca senadores da legislatura atual."""
    print("Buscando senadores na API do Senado...")
    try:
        # Senado prefere application/json via Header
        headers = {"Accept": "application/json"}
        response = requests.get(SENADO_API_BASE, headers=headers)
        response.raise_for_status()
        dados = response.json().get('ListaParlamentarEmExercicio', {}).get('Parlamentares', {}).get('Parlamentar', [])
        return dados
    except Exception as e:
        print(f"Erro ao buscar API do Senado: {e}")
        return []

def insert_candidatos_senado(senadores):
    """Insere senadores no Supabase."""
    sucesso = 0
    for sen in senadores:
        info = sen.get("IdentificacaoParlamentar", {})
        try:
            carga = {
                "id_tse": str(info.get("CodigoParlamentar")),
                "nome_urna": info.get("NomeParlamentar"),
                "partido": info.get("SiglaPartidoParlamentar"),
                "uf": info.get("UfParlamentar"),
                "cargo": "Senador",
                "foto_url": info.get("UrlFotoParlamentar"),
                "status_ficha_limpa": True,
                "num_processos_stf": 0
            }
            supabase.table("candidatos").upsert(carga, on_conflict="id_tse").execute()
            sucesso += 1
            print(f"[OK] Senador {carga['nome_urna']} ({carga['partido']}-{carga['uf']})")
        except Exception as e:
            print(f"[ERRO] {info.get('NomeParlamentar')}: {e}")
            
    print(f"\\nResumo Senado: {sucesso}/{len(senadores)} inseridos com sucesso.")

if __name__ == "__main__":
    print("--- INICIANDO PIPELINE ETL COMPLETO (Câmara + Senado) ---")
    
    # 1. Câmara
    deputados = fetch_deputados(limite=1000)
    if deputados:
        insert_candidatos(deputados)
        
    # 2. Senado
    senadores = fetch_senadores()
    if senadores:
        insert_candidatos_senado(senadores)
    
    print("\\n--- PIPELINE FINALIZADO ---")
