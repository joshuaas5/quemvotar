-- Schema SQL para o projeto QuemVotar.com.br
-- Copie e cole este script no SQL Editor do Supabase.

CREATE TABLE public.candidatos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_tse VARCHAR UNIQUE,
    nome_urna VARCHAR NOT NULL,
    partido VARCHAR NOT NULL,
    uf VARCHAR(2) NOT NULL,
    cargo VARCHAR NOT NULL,
    foto_url TEXT,
    status_ficha_limpa BOOLEAN,      -- preencher apenas com fonte judicial oficial auditada
    num_processos_stf INTEGER,       -- preencher apenas com fonte judicial oficial auditada
    indice_atuacao INTEGER DEFAULT 0,
    qnt_votos_passada INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.votacoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    candidato_id UUID REFERENCES public.candidatos(id) ON DELETE CASCADE,
    id_proposicao VARCHAR,
    tema_simplificado VARCHAR,
    ementa TEXT,
    voto VARCHAR NOT NULL,
    data_votacao DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.cache_api (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_cache_api_expires ON public.cache_api(expires_at);

CREATE INDEX idx_candidatos_partido ON public.candidatos(partido);
CREATE INDEX idx_candidatos_uf ON public.candidatos(uf);
CREATE INDEX idx_votacoes_candidato ON public.votacoes(candidato_id);

ALTER TABLE public.candidatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cache_api ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura publica de candidatos habilitada" ON public.candidatos FOR SELECT USING (true);
CREATE POLICY "Leitura publica de votacoes habilitada" ON public.votacoes FOR SELECT USING (true);
CREATE POLICY "Leitura publica de cache habilitada" ON public.cache_api FOR SELECT USING (true);
