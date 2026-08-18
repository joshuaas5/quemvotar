import { cache } from 'react';
import type {
  CandidatoResumo,
  CandidatoTseDetalhe,
  CandidatoTseLista,
  PosicionamentoCandidato,
} from './types';
import { CARGO_CODIGOS, cargoLabelPorCodigo } from './types';
import { getPosicionamento } from './posicionamento';
import { getPlanoGoverno } from './plano-governo';
import {
  ELEICAO_2026,
  TSE_API_BASE,
  TSE_SITE_BASE,
  arquivoUrlCandidato,
  fotoProxiUrl,
  fotoUrlCandidato,
  fonteUrlCandidato,
} from './urls';

export { arquivoUrlCandidato, fotoProxiUrl, fotoUrlCandidato, fonteUrlCandidato };

/* ────────────────────────────────────────────────────────────────
 * Cliente da API oficial DivulgaCandContas do TSE.
 * A API é pública, porém instável: aplicamos retry com backoff,
 * timeout e cache com revalidação (ISR) para proteger o site.
 * ──────────────────────────────────────────────────────────────── */

const FETCH_TIMEOUT_MS = 25_000;
const MAX_ATTEMPTS = 3;

export { ELEICAO_2026 };

export interface TseApiError extends Error {
  status?: number;
}

async function tseFetch(
  path: string,
  options: { revalidate?: number; timeoutMs?: number } = {},
): Promise<Response> {
  const { revalidate = 300, timeoutMs = FETCH_TIMEOUT_MS } = options;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${TSE_API_BASE}${path}`, {
        headers: { Accept: 'application/json', 'User-Agent': 'QuemVotar/1.0 (site civico de dados publicos)' },
        signal: controller.signal,
        next: { revalidate },
      });

      if (response.status === 404) {
        const error = new Error(`TSE: recurso não encontrado (${path})`) as TseApiError;
        error.status = 404;
        throw error;
      }

      if (!response.ok) {
        const error = new Error(`TSE: HTTP ${response.status} em ${path}`) as TseApiError;
        error.status = response.status;
        throw error;
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      if (attempt < MAX_ATTEMPTS) {
        const delayMs = 800 * attempt * attempt; // 800ms, 3.2s
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError ?? new Error(`TSE: falha ao consultar ${path}`);
}

/* ── Endpoints auxiliares ─────────────────────────────────────── */

interface EleicaoOrdinaria {
  id: number;
  ano: number;
  nomeEleicao: string | null;
  tipoAbrangencia: string | null;
  dataEleicao: string | null;
}

export const getEleicoesOrdinarias = cache(async (): Promise<EleicaoOrdinaria[]> => {
  const response = await tseFetch('/eleicao/ordinarias', { revalidate: 86400 });
  const data = (await response.json()) as EleicaoOrdinaria[];
  return Array.isArray(data) ? data : [];
});

export const getSqEleicao = cache(async (ano = 2026): Promise<number | null> => {
  const eleicoes = await getEleicoesOrdinarias();
  return eleicoes.find((item) => item.ano === ano)?.id ?? null;
});

interface CargoTseApi { codigo: number; nome: string }

export const getCargos2026 = cache(async (): Promise<CargoTseApi[]> => {
  const response = await tseFetch('/candidatura/cargos?ano=2026', { revalidate: 86400 });
  const data = (await response.json()) as CargoTseApi[];
  return Array.isArray(data) ? data : [];
});

/* ── Listagem ─────────────────────────────────────────────────── */

export interface ListaCandidatosResultado {
  uf: string;
  cargoCodigo: number;
  cargo: string;
  candidatos: CandidatoResumo[];
  atualizadoEm: string | null;
}

const LISTA_REVALIDATE = 300; // 5 min — dados de registro mudam em tempo real

export async function listarCandidatos(
  ano: number,
  uf: string,
  cargoCodigo: number,
  sqEleicao?: number | null,
): Promise<ListaCandidatosResultado> {
  const eleicaoId = sqEleicao ?? (await getSqEleicao(ano)) ?? ELEICAO_2026.sqEleicao;
  const ufNormalizada = (uf || 'BR').toUpperCase();
  const path = `/candidatura/listar/${ano}/${ufNormalizada}/${eleicaoId}/${cargoCodigo}/candidatos`;

  const response = await tseFetch(path, { revalidate: LISTA_REVALIDATE });
  const payload = (await response.json()) as {
    unidadeEleitoral?: { sigla?: string | null };
    cargo?: { codigo?: number; nome?: string } | null;
    candidatos?: CandidatoTseLista[];
  };

  const lista = payload.candidatos ?? [];

  const candidatos: CandidatoResumo[] = lista.map((candidato) =>
    normalizarCandidato(candidato, ano, eleicaoId, ufNormalizada),
  );

  return {
    uf: ufNormalizada,
    cargoCodigo: payload.cargo?.codigo ?? cargoCodigo,
    cargo: payload.cargo?.nome ?? cargoLabelPorCodigo(cargoCodigo),
    candidatos,
    atualizadoEm: new Date().toISOString(),
  };
}

/* ── Detalhe ──────────────────────────────────────────────────── */

const DETALHE_REVALIDATE = 600; // 10 min

export async function buscarCandidato(
  ano: number,
  uf: string,
  idCandidato: number,
  sqEleicao?: number | null,
): Promise<CandidatoTseDetalhe | null> {
  const eleicaoId = sqEleicao ?? (await getSqEleicao(ano)) ?? ELEICAO_2026.sqEleicao;
  const ufNormalizada = (uf || 'BR').toUpperCase();
  const path = `/candidatura/buscar/${ano}/${ufNormalizada}/${eleicaoId}/candidato/${idCandidato}`;

  const response = await tseFetch(path, { revalidate: DETALHE_REVALIDATE });
  const payload = (await response.json()) as CandidatoTseDetalhe;
  if (!payload || typeof payload.id !== 'number') return null;
  return payload;
}

/* ── Normalização ─────────────────────────────────────────────── */

export function normalizarCandidato(
  candidato: CandidatoTseLista,
  ano: number,
  sqEleicao: number,
  uf: string,
): CandidatoResumo {
  const cargoCodigo = candidato.cargo?.codigo ?? 0;
  const cargo = CARGO_CODIGOS[cargoCodigo];
  const posicionamento = getPosicionamento({
    idTse: candidato.id,
    nome: candidato.nomeUrna,
    partido: candidato.partido?.sigla ?? null,
    cargo: cargo ?? null,
    cargoCodigo,
  });

  return {
    idTse: candidato.id,
    ano,
    sqEleicao,
    uf,
    nomeUrna: candidato.nomeUrna,
    nomeCompleto: candidato.nomeCompleto,
    numero: candidato.numero,
    partido: candidato.partido?.sigla ?? null,
    cargoCodigo,
    cargo: cargoLabelPorCodigo(cargoCodigo),
    situacao: candidato.descricaoSituacao ?? 'Não informada',
    totalizacao: candidato.descricaoTotalizacao ?? null,
    coligacao: candidato.nomeColigacao ?? null,
    composicaoColigacao: candidato.composicaoColigacao ?? null,
    fotoUrl: candidato.fotoUrlPublicavel ? fotoUrlCandidato(sqEleicao, candidato.id, uf) : null,
    fotoUrlPublicavel: Boolean(candidato.fotoUrlPublicavel),
    reelegibilidade: typeof candidato.st_REELEICAO === 'boolean' ? candidato.st_REELEICAO : null,
    posicionamento,
    fonteUrl: fonteUrlCandidato(ano, sqEleicao, uf, candidato.id),
  };
}

export async function normalizarCandidatoDetalhe(
  candidato: CandidatoTseDetalhe,
  ano: number,
  sqEleicao: number,
  uf: string,
): Promise<CandidatoResumo & {
  sexo: string | null;
  dataNascimento: string | null;
  estadoCivil: string | null;
  corRaca: string | null;
  nacionalidade: string | null;
  grauInstrucao: string | null;
  ocupacao: string | null;
  naturalidade: string | null;
  localCandidatura: string | null;
  dataUltimaAtualizacao: string | null;
  totalDeBens: number | null;
  bens: CandidatoTseDetalhe['bens'];
  sites: string[];
  emails: string[];
  vices: CandidatoTseDetalhe['vices'];
  eleicoesAnteriores: CandidatoTseDetalhe['eleicoesAnteriores'];
  cnpjcampanha: string | null;
  situacaoCandidato: string | null;
  candidatoApto: boolean | null;
  motivosInelegibilidade: string[];
  planoGoverno: Awaited<ReturnType<typeof getPlanoGoverno>>;
  arquivos: CandidatoTseDetalhe['arquivos'];
  legendaNome: string | null;
}> {
  const base = normalizarCandidato(candidato, ano, sqEleicao, uf);

  const motivos: string[] = [];
  if (candidato.st_MOTIVO_FICHA_LIMPA) motivos.push('Inelegibilidade (Lei da Ficha Limpa)');
  if (candidato.st_MOTIVO_ABUSO_PODER) motivos.push('Abuso de poder');
  if (candidato.st_MOTIVO_COMPRA_VOTO) motivos.push('Compra de votos');
  if (candidato.st_MOTIVO_CONDUTA_VEDADA) motivos.push('Conduta vedada');
  if (candidato.st_MOTIVO_GASTO_ILICITO) motivos.push('Gasto ilícito de campanha');
  if (candidato.st_MOTIVO_AUSENCIA_REQUISITO) motivos.push('Ausência de requisito de registro');
  if (candidato.st_MOTIVO_IND_PARTIDO) motivos.push('Indeferimento por decisão do partido');
  if (candidato.st_MOTIVO_OUTROS) motivos.push(candidato.st_MOTIVO_OUTROS);

  const planoGoverno = await getPlanoGoverno(candidato);

  return {
    ...base,
    sexo: candidato.descricaoSexo ?? null,
    dataNascimento: candidato.dataDeNascimento ?? null,
    estadoCivil: candidato.descricaoEstadoCivil ?? null,
    corRaca: candidato.descricaoCorRaca ?? null,
    nacionalidade: candidato.nacionalidade ?? null,
    grauInstrucao: candidato.grauInstrucao ?? null,
    ocupacao: candidato.ocupacao ?? null,
    naturalidade: candidato.descricaoNaturalidade ?? candidato.nomeMunicipioNascimento ?? null,
    localCandidatura: candidato.localCandidatura ?? null,
    dataUltimaAtualizacao: candidato.dataUltimaAtualizacao ?? null,
    totalDeBens: candidato.totalDeBens ?? null,
    bens: candidato.bens ?? [],
    sites: candidato.sites ?? [],
    emails: candidato.emails ?? [],
    vices: candidato.vices ?? [],
    eleicoesAnteriores: candidato.eleicoesAnteriores ?? [],
    cnpjcampanha: candidato.cnpjcampanha ?? null,
    situacaoCandidato: candidato.descricaoSituacaoCandidato ?? candidato.descricaoSituacao ?? null,
    candidatoApto: candidato.candidatoApto ?? null,
    motivosInelegibilidade: motivos,
    planoGoverno,
    arquivos: candidato.arquivos ?? [],
    legendaNome: candidato.legenda?.nomeLegenda ?? candidato.legenda?.legenda ?? null,
  };
}

export type CandidatoDetalhadoNormalizado = Awaited<ReturnType<typeof normalizarCandidatoDetalhe>>;

export type { PosicionamentoCandidato };
