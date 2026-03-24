-- Schema SQL para o Projeto QuemVotar.com.br
-- Copie e cole este script no SQL Editor do Supabase (https://app.supabase.com)

-- 1. Criação da Tabela de Candidatos
CREATE TABLE public.candidatos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_tse VARCHAR UNIQUE,           -- Identificador oficial no TSE/Câmara
    nome_urna VARCHAR NOT NULL,      -- Nome público na urna
    partido VARCHAR NOT NULL,        -- Sigla do partido (Opcional criar tabela partidos se normalizado)
    uf VARCHAR(2) NOT NULL,          -- UF do estado (e.g., SP, RJ)
    cargo VARCHAR NOT NULL,          -- e.g., 'Deputado Federal', 'Senador'
    foto_url TEXT,                   -- URL da foto oficial 
    status_ficha_limpa BOOLEAN DEFAULT TRUE,
    num_processos_stf INTEGER DEFAULT 0,
    indice_atuacao INTEGER DEFAULT 0,-- Índice computado pelo nosso pipeline (Engajamento, presenças)
    qnt_votos_passada INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criação da Tabela de Votações (Para o Match Funcionar)
CREATE TABLE public.votacoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    candidato_id UUID REFERENCES public.candidatos(id) ON DELETE CASCADE,
    id_proposicao VARCHAR,           -- ID oficial da PL na câmara
    tema_simplificado VARCHAR,         -- e.g., 'Economia', 'Meio Ambiente'
    ementa TEXT,
    voto VARCHAR NOT NULL,           -- 'Sim', 'Não', 'Abstenção', 'Ausente'
    data_votacao DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes para performance
CREATE INDEX idx_candidatos_partido ON public.candidatos(partido);
CREATE INDEX idx_candidatos_uf ON public.candidatos(uf);
CREATE INDEX idx_votacoes_candidato ON public.votacoes(candidato_id);

-- Ativar Row Level Security
ALTER TABLE public.candidatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votacoes ENABLE ROW LEVEL SECURITY;

-- Políticas Públicas de Leitura
CREATE POLICY "Leitura pública de candidatos habilitada" ON public.candidatos FOR SELECT USING (true);
CREATE POLICY "Leitura pública de votações habilitada" ON public.votacoes FOR SELECT USING (true);
