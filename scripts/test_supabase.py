import os
from supabase import create_client, Client

url = "https://lblluuiqqtptefetrblt.supabase.co"
key = "sb_secret_2fBe4_ErnpMegyYvxjoRjw_dfCC3bRn"

try:
    print(f"Testando conexão com Supabase URL: {url}...")
    supabase: Client = create_client(url, key)
    # Tentando listar a tabela de candidatos (pode falhar se a tabela nao existir ou a chave for invalida)
    response = supabase.table("candidatos").select("*").limit(1).execute()
    print("Sucesso ao conectar!", response)
except Exception as e:
    print(f"Erro na conexão com as chaves fornecidas: {e}")
