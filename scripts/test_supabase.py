import os
from supabase import create_client, Client

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

try:
    if not url or not key:
        raise RuntimeError("Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY antes de testar.")

    print(f"Testando conexao com Supabase URL: {url}...")
    supabase: Client = create_client(url, key)
    response = supabase.table("candidatos").select("*").limit(1).execute()
    print("Sucesso ao conectar!", response)
except Exception as exc:
    print(f"Erro na conexao com as chaves fornecidas: {exc}")
