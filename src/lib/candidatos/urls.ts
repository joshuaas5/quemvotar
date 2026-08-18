/* ────────────────────────────────────────────────────────────────
 * URLs oficiais do TSE (sem dependência de React — usáveis por
 * scripts ETL e pelo runtime do site).
 * ──────────────────────────────────────────────────────────────── */

export const TSE_API_BASE = 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1';
export const TSE_SITE_BASE = 'https://divulgacandcontas.tse.jus.br';

/** Eleição Geral Federal 2026 — id oficial na API do TSE. */
export const ELEICAO_2026 = { ano: 2026, sqEleicao: 20322002026 };

export function fonteUrlCandidato(ano: number, sqEleicao: number, uf: string, id: number): string {
  return `${TSE_SITE_BASE}/divulga/#/candidato/${ano}/${sqEleicao}/${uf.toUpperCase()}/${id}`;
}

export function fotoUrlCandidato(sqEleicao: number, id: number, uf: string): string | null {
  return `${TSE_SITE_BASE}/divulga/rest/arquivo/img/${sqEleicao}/${id}/${uf.toUpperCase()}`;
}

/** Foto servida pelo proxy do próprio site (evita hotlink/CORS). */
export function fotoProxiUrl(sqEleicao: number, id: number, uf: string): string {
  return `/api/fontes/tse/foto?sqEleicao=${sqEleicao}&id=${id}&uf=${uf.toUpperCase()}`;
}

export function arquivoUrlCandidato(idArquivo: number): string {
  return `${TSE_SITE_BASE}/divulga/rest/arquivo/doc/${idArquivo}`;
}
