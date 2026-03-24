import os
import requests
from supabase import create_client, Client

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not URL or not KEY:
    print("ERRO: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY nas variaveis de ambiente.")
    raise SystemExit(1)

supabase: Client = create_client(URL, KEY)

CAMARA_API_BASE = "https://dadosabertos.camara.leg.br/api/v2/deputados"
SENADO_API_BASE = "https://legis.senado.leg.br/dadosabertos/senador/lista/atual"


def fetch_deputados(limite=10):
    print(f"Buscando {limite} deputados na API da Camara...")
    try:
        response = requests.get(
            f"{CAMARA_API_BASE}?ordem=ASC&ordenarPor=nome&itens={limite}",
            timeout=30,
        )
        response.raise_for_status()
        return response.json().get("dados", [])
    except Exception as exc:
        print(f"Erro ao buscar API da Camara: {exc}")
        return []


def insert_candidatos(deputados):
    sucesso = 0
    for dep in deputados:
        try:
            carga = {
                "id_tse": str(dep.get("id")),
                "nome_urna": dep.get("nome"),
                "partido": dep.get("siglaPartido"),
                "uf": dep.get("siglaUf"),
                "cargo": "Deputado Federal",
                "foto_url": dep.get("urlFoto"),
                "qnt_votos_passada": None,
            }

            supabase.table("candidatos").upsert(carga, on_conflict="id_tse").execute()
            sucesso += 1
            print(f"[OK] {carga['nome_urna']} ({carga['partido']}-{carga['uf']})")
        except Exception as exc:
            print(f"[ERRO] {dep.get('nome')}: {exc}")

    print(f"\nResumo Camara: {sucesso}/{len(deputados)} inseridos com sucesso.")


def fetch_senadores():
    print("Buscando senadores na API do Senado...")
    try:
        response = requests.get(
            SENADO_API_BASE,
            headers={"Accept": "application/json"},
            timeout=30,
        )
        response.raise_for_status()
        return (
            response.json()
            .get("ListaParlamentarEmExercicio", {})
            .get("Parlamentares", {})
            .get("Parlamentar", [])
        )
    except Exception as exc:
        print(f"Erro ao buscar API do Senado: {exc}")
        return []


def insert_candidatos_senado(senadores):
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
            }
            supabase.table("candidatos").upsert(carga, on_conflict="id_tse").execute()
            sucesso += 1
            print(f"[OK] Senador {carga['nome_urna']} ({carga['partido']}-{carga['uf']})")
        except Exception as exc:
            print(f"[ERRO] {info.get('NomeParlamentar')}: {exc}")

    print(f"\nResumo Senado: {sucesso}/{len(senadores)} inseridos com sucesso.")


if __name__ == "__main__":
    print("--- INICIANDO PIPELINE ETL COMPLETO (CAMARA + SENADO) ---")

    deputados = fetch_deputados(limite=1000)
    if deputados:
        insert_candidatos(deputados)

    senadores = fetch_senadores()
    if senadores:
        insert_candidatos_senado(senadores)

    print("\n--- PIPELINE FINALIZADO ---")
