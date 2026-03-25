import {
  fetchOfficialCongressProfiles,
  getOfficialPanoramaDados,
  type PanoramaDados,
  type PerfilPublico,
  searchOfficialCongressProfiles,
} from './official';

export type { PanoramaDados, PerfilPublico };
export { OFFICIAL_SOURCE_LINKS, getCnjProcessoByNumero, getOfficialSourceStatus, getTseDatasets } from './official';

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

export async function searchCandidatos(query: string): Promise<PerfilPublico[]> {
  return searchOfficialCongressProfiles(query, 10);
}

export async function getPanoramaDados(): Promise<PanoramaDados> {
  return getOfficialPanoramaDados();
}
