import { cache } from 'react';
import { fetchDeputadoDetalhado, fetchDeputados, fetchCamaraDespesas, fetchCamaraAutorias } from './camara';
import { searchCnjProcessByNumber } from './cnj';
import { fetchLiderancasCongresso, fetchPartidosResumo, getPartidoResumo } from './partidos';
import { fetchSenadorDetalhado, fetchSenadores } from './senado';
import { fetchTseCandidateDatasets } from './tse';
import type {
  CnjProcessoResumo,
  FonteStatus,
  LiderancaCongresso,
  PanoramaDados,
  PartidoResumo,
  PerfilDetalhadoPublico,
  PerfilItemLista,
  PerfilPublico,
  RankingListaItem,
  TseDataset,
} from './types';

export type {
  CnjProcessoResumo,
  FonteStatus,
  LiderancaCongresso,
  PanoramaDados,
  PartidoResumo,
  PerfilDetalhadoPublico,
  PerfilItemLista,
  PerfilPublico,
  RankingListaItem,
  TseDataset,
} from './types';

export const OFFICIAL_SOURCE_LINKS = [
  {
    id: 'camara',
    label: 'API oficial da Câmara dos Deputados',
    href: 'https://dadosabertos.camara.leg.br/swagger/api.html',
  },
  {
    id: 'senado',
    label: 'Dados Abertos do Senado Federal',
    href: 'https://legis.senado.leg.br/dadosabertos/senador/lista/atual',
  },
  {
    id: 'tse',
    label: 'Portal de Dados Abertos do TSE',
    href: 'https://dadosabertos.tse.jus.br/',
  },
  {
    id: 'cnj',
    label: 'API pública DataJud do CNJ',
    href: 'https://datajud-wiki.cnj.jus.br/api-publica/exemplos/',
  },
] as const;

export const fetchOfficialCongressProfiles = cache(async (): Promise<PerfilPublico[]> => {
  const [deputadosResult, senadoresResult] = await Promise.allSettled([fetchDeputados(), fetchSenadores()]);

  const deputados = deputadosResult.status === 'fulfilled' ? deputadosResult.value : [];
  const senadores = senadoresResult.status === 'fulfilled' ? senadoresResult.value : [];

  return [...deputados, ...senadores].sort((a, b) => a.nome_urna.localeCompare(b.nome_urna, 'pt-BR'));
});

export function getOfficialProfileHref(perfil: Pick<PerfilPublico, 'fonte' | 'idOrigem'>): string {
  return `/perfil/${perfil.fonte}/${perfil.idOrigem}`;
}

export async function getOfficialCongressProfile(
  fonte: PerfilPublico['fonte'],
  idOrigem: string,
): Promise<PerfilPublico | null> {
  const perfis = await fetchOfficialCongressProfiles();

  return perfis.find((perfil) => perfil.fonte === fonte && perfil.idOrigem === idOrigem) ?? null;
}

export async function getOfficialProfileDetail(
  fonte: PerfilPublico['fonte'],
  idOrigem: string,
): Promise<PerfilDetalhadoPublico | null> {
  if (fonte === 'camara') {
    return fetchDeputadoDetalhado(idOrigem);
  }

  if (fonte === 'senado') {
    return fetchSenadorDetalhado(idOrigem);
  }

  return null;
}

export async function searchOfficialCongressProfiles(
  query: string,
  limit = 10,
): Promise<PerfilPublico[]> {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  const profiles = await fetchOfficialCongressProfiles();

  return profiles
    .filter((perfil) => {
      const searchable = [perfil.nome_urna, perfil.partido, perfil.uf ?? '', perfil.cargo]
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    })
    .slice(0, limit);
}

export async function getOfficialPanoramaDados(): Promise<PanoramaDados> {
  try {
    const [deputadosResult, senadoresResult] = await Promise.allSettled([fetchDeputados(), fetchSenadores()]);
    const deputados = deputadosResult.status === 'fulfilled' ? deputadosResult.value : [];
    const senadores = senadoresResult.status === 'fulfilled' ? senadoresResult.value : [];
    const parlamentares = [...deputados, ...senadores];

    if (parlamentares.length === 0) {
      return {
        totalParlamentares: null,
        totalDeputados: null,
        totalSenadores: null,
        totalUfs: null,
        fonteAtual: 'indisponivel',
      };
    }

    return {
      totalParlamentares: parlamentares.length,
      totalDeputados: deputados.length,
      totalSenadores: senadores.length,
      totalUfs: new Set(
        parlamentares.map((perfil) => perfil.uf).filter((uf): uf is string => Boolean(uf)),
      ).size,
      fonteAtual: 'apis_oficiais',
    };
  } catch (error) {
    console.error('Erro ao montar panorama oficial:', error);
    return {
      totalParlamentares: null,
      totalDeputados: null,
      totalSenadores: null,
      totalUfs: null,
      fonteAtual: 'indisponivel',
    };
  }
}

export async function getOfficialSourceStatus(): Promise<FonteStatus[]> {
  const [camara, senado, tse] = await Promise.allSettled([
    fetchDeputados(),
    fetchSenadores(),
    fetchTseCandidateDatasets(3),
  ]);

  return [
    {
      id: 'camara',
      nome: 'Câmara dos Deputados',
      status: camara.status === 'fulfilled' ? 'ok' : 'indisponivel',
      detalhes:
        camara.status === 'fulfilled'
          ? `${camara.value.length} deputados carregados da API oficial.`
          : 'Falha ao consultar a API oficial da Câmara.',
      href: 'https://dadosabertos.camara.leg.br/swagger/api.html',
    },
    {
      id: 'senado',
      nome: 'Senado Federal',
      status: senado.status === 'fulfilled' ? 'ok' : 'indisponivel',
      detalhes:
        senado.status === 'fulfilled'
          ? `${senado.value.length} senadores carregados da API oficial.`
          : 'Falha ao consultar a API oficial do Senado.',
      href: 'https://legis.senado.leg.br/dadosabertos/senador/lista/atual',
    },
    {
      id: 'tse',
      nome: 'TSE Dados Abertos',
      status: tse.status === 'fulfilled' ? 'ok' : 'indisponivel',
      detalhes:
        tse.status === 'fulfilled'
          ? `${tse.value.length} conjuntos de dados de candidatos identificados no portal oficial.`
          : 'Falha ao consultar o CKAN oficial do TSE.',
      href: 'https://dadosabertos.tse.jus.br/',
    },
    {
      id: 'cnj',
      nome: 'CNJ DataJud',
      status: 'parcial',
      detalhes:
        'Integração segura disponível por número de processo e tribunal. Correspondência automática por nome ainda não será feita.',
      href: 'https://datajud-wiki.cnj.jus.br/api-publica/exemplos/',
    },
  ];
}

export async function getTseDatasets(limit = 6): Promise<TseDataset[]> {
  return fetchTseCandidateDatasets(limit);
}

export async function getPartidosResumo(): Promise<PartidoResumo[]> {
  return fetchPartidosResumo();
}

export async function getPartido(sigla: string): Promise<PartidoResumo | null> {
  return getPartidoResumo(sigla);
}

export async function getLiderancasCongresso(): Promise<LiderancaCongresso[]> {
  return fetchLiderancasCongresso();
}

export async function getCnjProcessoByNumero(
  tribunalSlug: string,
  numeroProcesso: string,
): Promise<CnjProcessoResumo | null> {
  return searchCnjProcessByNumber(tribunalSlug, numeroProcesso);
}

export { searchCnjByPoliticianName } from './cnj';
export { fetchCamaraDespesas, fetchCamaraAutorias };


