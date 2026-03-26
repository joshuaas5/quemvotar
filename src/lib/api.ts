import {
  fetchOfficialCongressProfiles,
  getLiderancasCongresso,
  getOfficialCongressProfile,
  getOfficialPanoramaDados,
  getOfficialProfileDetail,
  getOfficialProfileHref,
  getPartido,
  getPartidosResumo,
  searchOfficialCongressProfiles,
  type LiderancaCongresso,
  type PanoramaDados,
  type PartidoResumo,
  type PerfilDetalhadoPublico,
  type PerfilPublico,
  type RankingListaItem,
} from './official';
import {
  fetchAssiduidadeForPerfil,
  fetchCamaraVoteThemesForPerfil,
  fetchCamaraVotesForPerfil,
  fetchGovernismoForPerfil,
} from './external/radar';
import { fetchRankingForPerfil, fetchRankingTop } from './external/ranking';

export type {
  LiderancaCongresso,
  PanoramaDados,
  PartidoResumo,
  PerfilDetalhadoPublico,
  PerfilPublico,
  RankingListaItem,
};
export {
  OFFICIAL_SOURCE_LINKS,
  getCnjProcessoByNumero,
  getOfficialSourceStatus,
  getTseDatasets,
} from './official';

export function getCasaBadge(perfil: PerfilPublico): string {
  return perfil.casa === 'Senado Federal' ? 'SENADO' : 'CAMARA';
}

export function getFonteBadge(perfil: PerfilPublico): string {
  return perfil.fonte === 'camara' ? 'FONTE OFICIAL: CÂMARA' : 'FONTE OFICIAL: SENADO';
}

export async function getHighlights(): Promise<PerfilPublico[]> {
  const profiles = await fetchOfficialCongressProfiles();
  const shuffled = [...profiles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export async function getParlamentares(): Promise<PerfilPublico[]> {
  return fetchOfficialCongressProfiles();
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
  const perfil = await getOfficialProfileDetail(fonte, idOrigem);

  if (!perfil) {
    return null;
  }

  const withTimeout = async <T>(promise: Promise<T>, fallback: T, timeoutMs = 2500): Promise<T> => {
    try {
      return await Promise.race<T>([
        promise,
        new Promise<T>((resolve) => {
          setTimeout(() => resolve(fallback), timeoutMs);
        }),
      ]);
    } catch {
      return fallback;
    }
  };

  const [ranking, governismo, votacoesCamara] = await Promise.all([
    withTimeout(fetchRankingForPerfil(perfil), null),
    withTimeout(fetchGovernismoForPerfil(perfil), null),
    fonte === 'camara'
      ? withTimeout(fetchCamaraVotesForPerfil(perfil), [] as PerfilDetalhadoPublico['votacoes'])
      : Promise.resolve([] as PerfilDetalhadoPublico['votacoes']),
  ]);
  const [presenca, partidoResumo, temasCamara] = await Promise.all([
    withTimeout(fetchAssiduidadeForPerfil(perfil), null),
    withTimeout(getPartido(perfil.partido), null),
    fonte === 'camara'
      ? withTimeout(fetchCamaraVoteThemesForPerfil(perfil), [] as PerfilDetalhadoPublico['temasVotacao'])
      : Promise.resolve([] as PerfilDetalhadoPublico['temasVotacao']),
  ]);

  return {
    ...perfil,
    ranking,
    governismo,
    presenca,
    espectro:
      partidoResumo?.espectroEixo && partidoResumo.espectro
        ? {
            fonte: 'partido_e_votacoes',
            eixo: partidoResumo.espectroEixo,
            label: partidoResumo.espectro,
            resumo: `Campo aproximado alinhado ao posicionamento público do ${perfil.partido}.`,
          }
        : null,
    votacoes: perfil.votacoes.length > 0 ? perfil.votacoes : votacoesCamara,
    temasVotacao: perfil.temasVotacao.length > 0 ? perfil.temasVotacao : temasCamara,
  };
}

export async function getPartidos(): Promise<PartidoResumo[]> {
  return getPartidosResumo();
}

export async function getPartidoPorSigla(sigla: string): Promise<PartidoResumo | null> {
  return getPartido(sigla);
}

export async function getLiderancas(): Promise<LiderancaCongresso[]> {
  return getLiderancasCongresso();
}

export async function getRankingParlamentares(
  limit = 24,
  fonte?: PerfilPublico['fonte'],
): Promise<RankingListaItem[]> {
  return fetchRankingTop(limit, fonte);
}



