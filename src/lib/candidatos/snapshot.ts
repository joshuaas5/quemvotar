import type { CandidatoResumo, PosicionamentoCandidato } from './types';
import { EIXO_LABELS } from './posicionamento';

/* ────────────────────────────────────────────────────────────────
 * Leitura dos SNAPSHOTS estáticos de candidatos (public/dados).
 * O cron do GitHub atualiza esses arquivos a cada ~3h; eles são
 * servidos pela Vercel como estáticos — o site NÃO depende do TSE
 * ao vivo para carregar vitrines e perfis (robustez em época de
 * eleição, quando o TSE oscila).
 * ──────────────────────────────────────────────────────────────── */

export interface CandidatoSnapshotLite {
  id: number;
  nomeUrna: string;
  partido: string | null;
  cargoCodigo: number;
  cargo: string;
  uf: string;
  numero: number;
  situacao: string;
  totalizacao: string | null;
  coligacao: string | null;
  foto: boolean;
  fotoAlta?: string | null;
  mandato: boolean;
  reeleicao: boolean;
  eixo: string | null;
  base: string;
  baseLabel: string;
  confianca: number;
}

export interface SnapshotDataset {
  geradoEm: string;
  ano: number;
  sqEleicao: number;
  uf: string;
  cargoCodigo: number;
  cargo: string;
  total: number;
  candidatos: CandidatoSnapshotLite[];
}

export const SQ_ELEICAO_2026 = 20322002026;
const ANO_2026 = 2026;

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ?? 'https://www.quemvotar.com.br';
}

function posicionamentoDoLite(lite: CandidatoSnapshotLite): PosicionamentoCandidato {
  const eixo = lite.eixo as PosicionamentoCandidato['eixo'];
  return {
    eixo,
    label: eixo ? EIXO_LABELS[eixo] : 'Não avaliado',
    base: (lite.base as PosicionamentoCandidato['base']) ?? 'indefinido',
    baseLabel: lite.baseLabel ?? 'Não avaliado',
    resumo: '',
    confianca: lite.confianca ?? 0,
    temas: [],
    avisos: [],
  };
}

export { posicionamentoDoLite };

/** Converte um item do snapshot no formato usado pela vitrine. */
export function liteParaResumo(
  lite: CandidatoSnapshotLite,
  ano = ANO_2026,
  sqEleicao = SQ_ELEICAO_2026,
): CandidatoResumo {
  return {
    idTse: lite.id,
    ano,
    sqEleicao,
    uf: lite.uf,
    nomeUrna: lite.nomeUrna,
    nomeCompleto: lite.nomeUrna,
    numero: lite.numero,
    partido: lite.partido,
    cargoCodigo: lite.cargoCodigo,
    cargo: lite.cargo,
    situacao: lite.situacao,
    totalizacao: lite.totalizacao,
    coligacao: lite.coligacao,
    composicaoColigacao: null,
    fotoUrl: null,
    fotoUrlPublicavel: Boolean(lite.foto),
    reelegibilidade: lite.reeleicao || null,
    posicionamento: posicionamentoDoLite(lite),
    fonteUrl: `${siteUrl()}/candidatos/${ano}/${lite.uf}/${lite.id}`,
  };
}

// Campos extras para fotos em alta no snapshot
export interface CandidatoResumoComFoto extends CandidatoResumo {
  fotoAlta?: string | null;
  mandato?: boolean | null;
}

/** Lê o snapshot de um UF+cargo (estático, servido pela Vercel). */
export async function lerSnapshotDataset(
  uf: string,
  cargoCodigo: number,
  ano = ANO_2026,
): Promise<SnapshotDataset | null> {
  try {
    const response = await fetch(`${siteUrl()}/dados/candidatos/${uf}-${cargoCodigo}.json`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    return (await response.json()) as SnapshotDataset;
  } catch {
    return null;
  }
}

/** Lê a vitrine de um UF+cargo já adaptada para a página. */
export async function lerSnapshotCandidatos(
  uf: string,
  cargoCodigo: number,
  ano = ANO_2026,
): Promise<Array<CandidatoResumoComFoto>> {
  const dataset = await lerSnapshotDataset(uf, cargoCodigo, ano);
  if (!dataset) return [];
  return dataset.candidatos.map((lite) => ({
    ...liteParaResumo(lite, dataset.ano, dataset.sqEleicao),
    fotoAlta: lite.fotoAlta ?? null,
    mandato: lite.mandato || null,
  }));
}

/** Busca um candidato no índice do estado (todos os cargos). */
export async function buscarNoSnapshot(
  uf: string,
  id: number,
): Promise<(CandidatoSnapshotLite & { sqEleicao: number }) | null> {
  try {
    const response = await fetch(`${siteUrl()}/dados/candidatos/index-${uf}.json`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { sqEleicao?: number; candidatos?: CandidatoSnapshotLite[] };
    const encontrado = (payload.candidatos ?? []).find((c) => c.id === id) ?? null;
    if (!encontrado) return null;
    return { ...encontrado, sqEleicao: payload.sqEleicao ?? SQ_ELEICAO_2026 };
  } catch {
    return null;
  }
}

/* ── Detalhe completo (bens, plano, redes, histórico) — snapshot ── */

/** Detalhe emagrecido gerado pelo ETL (modo --detalhes). */
export interface DetalheSnapshot {
  nomeCompleto?: string | null;
  sexo?: string | null;
  dataNascimento?: string | null;
  estadoCivil?: string | null;
  corRaca?: string | null;
  nacionalidade?: string | null;
  grauInstrucao?: string | null;
  ocupacao?: string | null;
  naturalidade?: string | null;
  cnpjcampanha?: string | null;
  situacaoCandidato?: string | null;
  legendaNome?: string | null;
  totalDeBens?: number | null;
  bens?: Array<{ descricao: string; tipo: string; valor: number | null }>;
  sites?: string[];
  eleicoesAnteriores?: Array<{
    nrAno?: number;
    cargo?: string;
    partido?: string;
    situacaoTotalizacao?: string;
    local?: string | null;
  }>;
  planoGoverno?: { disponivel?: boolean; nomeArquivo?: string | null; urlDownload?: string | null };
  motivosInelegibilidade?: string[];
  vices?: Array<{ nome: string; partido: string | null; cargo: string }>;
}

export async function buscarDetalheSnapshot(uf: string, id: number): Promise<DetalheSnapshot | null> {
  try {
    const response = await fetch(`${siteUrl()}/dados/candidatos/detalhes-${uf}.json`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { detalhes?: Record<string, DetalheSnapshot> };
    return payload.detalhes?.[String(id)] ?? null;
  } catch {
    return null;
  }
}
