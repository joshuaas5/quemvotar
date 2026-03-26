import {
  fetchOfficialCongressProfiles,
  getOfficialCongressProfile,
  getOfficialPanoramaDados,
  getOfficialProfileDetail,
  getOfficialProfileHref,
  type PanoramaDados,
  type PerfilDetalhadoPublico,
  type PerfilPublico,
  searchOfficialCongressProfiles,
} from './official';

export type { PanoramaDados, PerfilDetalhadoPublico, PerfilPublico };
export {
  OFFICIAL_SOURCE_LINKS,
  getCnjProcessoByNumero,
  getOfficialSourceStatus,
  getTseDatasets,
} from './official';

export function getCasaBadge(perfil: PerfilPublico): string {
  return perfil.casa === 'Senado Federal'
    ? 'SENADO FEDERAL'
    : 'CÂMARA DOS DEPUTADOS';
}

export function getFonteBadge(perfil: PerfilPublico): string {
  return perfil.fonte === 'camara'
    ? 'FONTE OFICIAL: CÂMARA'
    : 'FONTE OFICIAL: SENADO';
}

export async function getHighlights(): Promise<PerfilPublico[]> {
  const profiles = await fetchOfficialCongressProfiles();
  return profiles.slice(0, 3);
}

export function getPerfilHref(perfil: Pick<PerfilPublico, 'fonte' | 'idOrigem'>): string {
  return getOfficialProfileHref(perfil);
}

export async function searchCandidatos(query: string): Promise<PerfilPublico[]> {
  return searchOfficialCongressProfiles(query, 10);
}

export async function getPanoramaDados(): Promise<PanoramaDados> {
  return getOfficialPanoramaDados();
}

export async function getPerfil(
  fonte: PerfilPublico['fonte'],
  idOrigem: string,
): Promise<PerfilPublico | null> {
  return getOfficialCongressProfile(fonte, idOrigem);
}

export async function getPerfilDetalhado(
  fonte: PerfilPublico['fonte'],
  idOrigem: string,
): Promise<PerfilDetalhadoPublico | null> {
  return getOfficialProfileDetail(fonte, idOrigem);
}
