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
  fetchCamaraDespesas,
  fetchCamaraAutorias,
  type LiderancaCongresso,
  type PanoramaDados,
  type PartidoResumo,
  type PerfilDetalhadoPublico,
  type PerfilPublico,
  type RankingListaItem,
} from './official';
import { decodeMojibake } from './utils/string';
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
export { getThemeVisual, THEME_VISUALS, type ThemeVisual } from './political-themes';

export function getCasaBadge(perfil: PerfilPublico): string {
  return perfil.casa === 'Senado Federal' ? 'SENADO FEDERAL' : 'CÂMARA DOS DEPUTADOS';
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

/** Fast path: basic profile + partido (1-2 fetches). Used for immediate hero render. */
export async function getPerfilBasico(
  fonte: PerfilPublico['fonte'],
  idOrigem: string,
): Promise<{ perfil: PerfilDetalhadoPublico; partido: PartidoResumo | null } | null> {
  try {
    const perfil = await getOfficialProfileDetail(fonte, idOrigem);
    if (!perfil) return null;
    const partido = await getPartido(perfil.partido).catch(() => null);
    return { perfil, partido };
  } catch (error) {
    console.error(`[getPerfilBasico] Erro (${fonte}, ${idOrigem}):`, error);
    return null;
  }
}

/** Enrichment data fetched in parallel via Suspense streaming. */
export interface PerfilEnriquecido {
  ranking: PerfilDetalhadoPublico['ranking'];
  governismo: PerfilDetalhadoPublico['governismo'];
  presenca: PerfilDetalhadoPublico['presenca'];
  espectro: PerfilDetalhadoPublico['espectro'];
  votacoes: PerfilDetalhadoPublico['votacoes'];
  temasVotacao: PerfilDetalhadoPublico['temasVotacao'];
  biografia: string | null;
  despesas: PerfilDetalhadoPublico['despesas'];
  autorias: PerfilDetalhadoPublico['autorias'];
}

/** Slow path: ALL external fetches in a single Promise.all (maximum parallelism). */
export async function getPerfilEnriquecido(
  perfil: PerfilDetalhadoPublico,
  partido: PartidoResumo | null,
): Promise<PerfilEnriquecido> {
  const fonte = perfil.fonte;
  const termoBuscaBiografia = perfil.nomeCompleto || perfil.nome_urna;

  const [ranking, governismo, votacoesCamara, presenca, temasCamara, biografia, despesas, autorias] = await Promise.all([
    fetchRankingForPerfil(perfil).catch(() => null),
    fetchGovernismoForPerfil(perfil).catch(() => null),
    fonte === 'camara' ? fetchCamaraVotesForPerfil(perfil).catch(() => []) : Promise.resolve([]),
    fetchAssiduidadeForPerfil(perfil).catch(() => null),
    fonte === 'camara' ? fetchCamaraVoteThemesForPerfil(perfil).catch(() => []) : Promise.resolve([]),
    fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&format=json&redirects=true&titles=${encodeURIComponent(termoBuscaBiografia)}`, { next: { revalidate: 86400 } })
      .then(r => r.json())
      .then(d => {
        const pages = d?.query?.pages;
        if (!pages) return null;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId]?.extract;
        if (extract && !extract.includes("pode referir-se a:")) return extract.split("\n")[0];
        return null;
      }).catch(() => null),
    fonte === 'camara' && (!perfil.despesas || perfil.despesas.length === 0) ? fetchCamaraDespesas(perfil.idOrigem).catch(() => []) : Promise.resolve(perfil.despesas || []),
    fonte === 'camara' && (!perfil.autorias || perfil.autorias.length === 0) ? fetchCamaraAutorias(perfil.idOrigem).catch(() => []) : Promise.resolve(perfil.autorias || []),
  ]);

  return {
    ranking,
    governismo,
    presenca,
    biografia: biografia || null,
    espectro:
      partido?.espectroEixo && partido.espectro
        ? {
            fonte: 'partido_e_votacoes',
            eixo: partido.espectroEixo,
            label: partido.espectro,
            resumo: `Campo aproximado alinhado ao posicionamento público do ${perfil.partido}.`,
          }
        : null,
    despesas: despesas.map(d => ({
      ...d,
      titulo: decodeMojibake(d.titulo),
      descricao: decodeMojibake(d.descricao),
    })),
    autorias: autorias.map(a => ({
      ...a,
      titulo: decodeMojibake(a.titulo),
      descricao: decodeMojibake(a.descricao),
    })),
    votacoes: (perfil.votacoes.length > 0 ? perfil.votacoes : votacoesCamara).map(v => ({
      ...v,
      titulo: decodeMojibake(v.titulo),
      descricao: decodeMojibake(v.descricao),
    })),
    temasVotacao: (perfil.temasVotacao.length > 0 ? perfil.temasVotacao : temasCamara).map(t => ({
      ...t,
      titulo: decodeMojibake(t.titulo),
      destaque: decodeMojibake(t.destaque),
      descricao: decodeMojibake(t.descricao),
    })),
  };
}

/** Legacy: full profile fetch (kept for backward compatibility). */
export async function getPerfilDetalhado(
  fonte: PerfilPublico['fonte'],
  idOrigem: string,
): Promise<PerfilDetalhadoPublico | null> {
  const result = await getPerfilBasico(fonte, idOrigem);
  if (!result) return null;
  const enriched = await getPerfilEnriquecido(result.perfil, result.partido);
  return { ...result.perfil, ...enriched };
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
