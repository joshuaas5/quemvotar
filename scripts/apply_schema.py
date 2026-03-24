import psycopg2

# Tentando usar a "Secret api key" como a senha do banco, ja que o usuario pediu para "mandar pelo CLI"
# e forneceu essa chave como a secreta.
DB_URL = "postgresql://postgres:sb_secret_2fBe4_ErnpMegyYvxjoRjw_dfCC3bRn@db.lblluuiqqtptefetrblt.supabase.co:5432/postgres"

SQL = """
CREATE TABLE IF NOT EXISTS public.candidatos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    id_tse VARCHAR UNIQUE,
    nome_urna VARCHAR NOT NULL,
    partido VARCHAR NOT NULL,
    uf VARCHAR(2) NOT NULL,
    cargo VARCHAR NOT NULL,
    foto_url TEXT,
    status_ficha_limpa BOOLEAN DEFAULT TRUE,
    num_processos_stf INTEGER DEFAULT 0,
    indice_atuacao INTEGER DEFAULT 0,
    qnt_votos_passada INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.votacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    candidato_id UUID REFERENCES public.candidatos(id) ON DELETE CASCADE,
    id_proposicao VARCHAR,
    tema_simplificado VARCHAR,
    ementa TEXT,
    voto VARCHAR NOT NULL,
    data_votacao DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.candidatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votacoes ENABLE ROW LEVEL SECURITY;

-- Drop existings to avoid error if re-running
DROP POLICY IF EXISTS "Leitura pública candidatos" ON public.candidatos;
DROP POLICY IF EXISTS "Leitura pública votacoes" ON public.votacoes;

CREATE POLICY "Leitura pública candidatos" ON public.candidatos FOR SELECT USING (true);
CREATE POLICY "Leitura pública votacoes" ON public.votacoes FOR SELECT USING (true);
"""

try:
    print("Conectando via Postgres...")
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    print("Executando SQL...")
    cur.execute(SQL)
    conn.commit()
    cur.close()
    conn.close()
    print("Sucesso! Tabelas criadas.")
except Exception as e:
    print(f"Erro ao executar SQL: {e}")
