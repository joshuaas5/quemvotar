import { cache } from 'react';
import type { PerfilPublico } from '@/lib/official';
import type { RankingListaItem, RankingReferencia } from '@/lib/official/types';

const RANKING_API_ROOT = 'https://www.politicos.org.br/api';
const RANKING_SITE_ROOT = 'https://ranking.org.br';

interface RankingAnoApi {
  ano?: number;
  pontuacao?: number;
  nota_base?: {
    votacoes?: number;
    gastos?: number;
    presenca?: number;
    privilegios?: number;
  };
}

interface RankingItemApi {
  id: number;
  nome?: string;
  nome_eleitoral?: string;
  nome_civil?: string;
  url_foto?: string;
  cargo?: string;
  partido?: string;
  uf?: string;
  slug?: string;
  composicao_pontuacao?: {
    pontuacao?: number;
    anos?: RankingAnoApi[];
    ranking_geral?: number | null;
    ranking_casa?: number | null;
    ranking_partido?: number | null;
    ranking_estado?: number | null;
  };
}

interface RankingApiResponse {
  items?: RankingItemApi[];
  lastSync?: string;
  totalPages?: number;
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function getRankingSourceUrl(item: RankingItemApi) {
  return item.slug ? `${RANKING_SITE_ROOT}/perfil/${item.slug}` : `${RANKING_SITE_ROOT}/ranking`;
}

function buildRankingReferencia(item: RankingItemApi, lastSync?: string): RankingReferencia | null {
  const composicao = item.composicao_pontuacao;

  if (!composicao || typeof composicao.pontuacao !== 'number') {
    return null;
  }

  return {
    fonte: 'ranking_dos_politicos',
    nota: composicao.pontuacao,
    rankingGeral: composicao.ranking_geral ?? null,
    rankingCasa: composicao.ranking_casa ?? null,
    rankingPartido: composicao.ranking_partido ?? null,
    rankingEstado: composicao.ranking_estado ?? null,
    atualizadoEm: lastSync ?? null,
    fonteUrl: getRankingSourceUrl(item),
    anos: (composicao.anos ?? [])
      .filter((ano) => typeof ano.ano === 'number' && typeof ano.pontuacao === 'number')
      .map((ano) => ({
        ano: ano.ano as number,
        pontuacao: ano.pontuacao as number,
        votacoes: ano.nota_base?.votacoes,
        gastos: ano.nota_base?.gastos,
        presenca: ano.nota_base?.presenca,
        privilegios: ano.nota_base?.privilegios,
      })),
  };
}

async function fetchRanking<T>(path: string): Promise<T> {
  const response = await fetch(`${RANKING_API_ROOT}${path}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar o Ranking dos Políticos: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function matchesHouse(cargo: string | undefined, fonte: PerfilPublico['fonte']) {
  const normalized = normalizeText(cargo ?? '');

  if (fonte === 'camara') {
    return normalized.includes('deputado');
  }

  return normalized.includes('senador');
}

function findBestRankingMatch(items: RankingItemApi[], perfil: PerfilPublico) {
  const nomePerfil = normalizeText(perfil.nome_urna);
  const exactName = items.find((item) => {
    const nomes = [item.nome_eleitoral, item.nome, item.nome_civil]
      .filter((value): value is string => Boolean(value))
      .map(normalizeText);

    return matchesHouse(item.cargo, perfil.fonte) && nomes.includes(nomePerfil);
  });

  if (exactName) {
    return exactName;
  }

  return items.find((item) => {
    const nomes = [item.nome_eleitoral, item.nome, item.nome_civil]
      .filter((value): value is string => Boolean(value))
      .map(normalizeText)
      .join(' ');

    return matchesHouse(item.cargo, perfil.fonte) && nomes.includes(nomePerfil);
  });
}

export const fetchRankingForPerfil = cache(async (perfil: PerfilPublico): Promise<RankingReferencia | null> => {
  const query = encodeURIComponent(perfil.nome_urna);
  const payload = await fetchRanking<RankingApiResponse>(
    `/filter-items-ranking?page=1&per_page=10&current_tab=0&nome=${query}&ordenar_por=pontuacao&ordem=desc`,
  );

  const match = findBestRankingMatch(payload.items ?? [], perfil);
  return match ? buildRankingReferencia(match, payload.lastSync) : null;
});

export const fetchRankingTop = cache(
  async (limit = 24, fonte?: PerfilPublico['fonte']): Promise<RankingListaItem[]> => {
    const items: RankingListaItem[] = [];
    const perPage = 100;
    let page = 1;
    let totalPages = 1;
    let lastSync: string | undefined;

    while (items.length < limit && page <= totalPages) {
      const payload = await fetchRanking<RankingApiResponse>(
        `/filter-items-ranking?page=${page}&per_page=${perPage}&current_tab=0&ordenar_por=pontuacao&ordem=desc`,
      );

      totalPages = payload.totalPages ?? totalPages;
      lastSync = payload.lastSync ?? lastSync;

      for (const item of payload.items ?? []) {
        if (fonte && !matchesHouse(item.cargo, fonte)) {
          continue;
        }

        const ranking = buildRankingReferencia(item, lastSync);

        if (!ranking) {
          continue;
        }

        items.push({
          id: String(item.id),
          nome: item.nome_eleitoral ?? item.nome ?? 'Parlamentar',
          nomeCivil: item.nome_civil ?? null,
          cargo: item.cargo ?? 'Parlamentar',
          partido: item.partido ?? '--',
          uf: item.uf ?? '--',
          fotoUrl: item.url_foto ?? null,
          slug: item.slug ?? null,
          fonteUrl: getRankingSourceUrl(item),
          ranking,
        });

        if (items.length >= limit) {
          break;
        }
      }

      page += 1;
    }

    return items.slice(0, limit);
  },
);
