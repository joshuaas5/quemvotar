import { cache } from 'react';
import type { PerfilItemLista, PerfilPublico } from '@/lib/official';
import type { GovernismoReferencia, PresencaReferencia } from '@/lib/official/types';
import { buildVoteThemeCards } from '@/lib/political-themes';

const RADAR_API_ROOT = 'https://radar.congressoemfoco.com.br/api';
const CAMARA_API_ROOT = 'https://dadosabertos.camara.leg.br/api/v2';

interface RadarBuscaItem {
  idParlamentar?: string;
  idParlamentarVoz?: string;
  nomeEleitoral?: string;
  uf?: string;
  casa?: string;
  parlamentarPartido?: {
    sigla?: string;
  };
}

interface RadarGovernismoResponse {
  afavor?: number;
  n?: number;
  nvotacoes?: number;
  total?: number;
}

interface RadarVotosResponse {
  votos?: Record<string, number>;
}

interface RadarAssiduidadeAno {
  ano: number;
  totalSessoesDeliberativas: number;
  totalPresenca: number;
  totalAusenciasJustificadas: number;
  totalAusenciasNaoJustificadas: number;
}

interface RadarAssiduidadeResponse {
  parlamentarAssiduidade?: RadarAssiduidadeAno[];
}

interface CamaraVotacaoDetalhe {
  dados?: {
    id?: string;
    data?: string;
    descricao?: string;
    aprovacao?: number;
    objetosPossiveis?: Array<{
      id?: number;
      siglaTipo?: string;
      numero?: number;
      ano?: number;
      ementa?: string;
    }>;
    proposicoesAfetadas?: Array<{
      id?: number;
      siglaTipo?: string;
      numero?: number;
      ano?: number;
      ementa?: string;
    }>;
  };
}

interface CamaraVoteItem {
  voteId: string;
  voto: number | undefined;
  votacao: NonNullable<CamaraVotacaoDetalhe['dados']>;
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function compact<T>(values: Array<T | null | undefined | false>): T[] {
  return values.filter(Boolean) as T[];
}

async function fetchRadar<T>(path: string): Promise<T> {
  const response = await fetch(`${RADAR_API_ROOT}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar o Radar do Congresso: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function fetchCamara<T>(path: string): Promise<T> {
  const response = await fetch(`${CAMARA_API_ROOT}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar a API da Câmara: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function findRadarMatch(items: RadarBuscaItem[], perfil: PerfilPublico) {
  const nomePerfil = normalizeText(perfil.nome_urna);

  return items.find((item) => {
    const casaCompativel =
      (perfil.fonte === 'camara' && item.casa === 'camara') ||
      (perfil.fonte === 'senado' && item.casa === 'senado');
    const nomeCompativel = normalizeText(item.nomeEleitoral ?? '') === nomePerfil;
    const ufCompativel = !perfil.uf || !item.uf || item.uf === perfil.uf;
    const partidoCompativel =
      !perfil.partido || !item.parlamentarPartido?.sigla || item.parlamentarPartido.sigla === perfil.partido;

    return casaCompativel && nomeCompativel && ufCompativel && partidoCompativel;
  });
}

function getRadarPerfilUrl(idParlamentarVoz: string) {
  return `https://radar.congressoemfoco.com.br/parlamentar/${idParlamentarVoz}`;
}

function mapRadarVote(code: number | undefined) {
  if (code === 1) return 'Votou sim';
  if (code === -1) return 'Votou não';
  if (code === 0) return 'Abstenção registrada';
  if (code === 2) return 'Obstrução registrada';
  return 'Voto registrado';
}

function buildVoteTitle(votacao: CamaraVoteItem['votacao']) {
  const materia = votacao.proposicoesAfetadas?.[0] ?? votacao.objetosPossiveis?.[0];

  if (!materia) {
    return 'Votação nominal';
  }

  const partes = compact([
    materia.siglaTipo ?? null,
    typeof materia.numero === 'number' ? String(materia.numero) : null,
    typeof materia.ano === 'number' && materia.ano > 0 ? String(materia.ano) : null,
  ]);

  return partes.length > 0 ? partes.join('/') : 'Votação nominal';
}

function buildVoteHref(votacao: CamaraVoteItem['votacao']) {
  const materia = votacao.proposicoesAfetadas?.[0] ?? votacao.objetosPossiveis?.[0];

  return materia?.id
    ? `https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=${materia.id}`
    : undefined;
}

const findRadarPerfil = cache(async (perfil: PerfilPublico): Promise<RadarBuscaItem | null> => {
  const busca = await fetchRadar<RadarBuscaItem[]>(
    `/busca-parlamentar/buscar?nome=${encodeURIComponent(perfil.nome_urna)}`,
  );

  return findRadarMatch(busca, perfil) ?? null;
});

const fetchCamaraVoteItems = cache(async (perfil: PerfilPublico): Promise<CamaraVoteItem[]> => {
  if (perfil.fonte !== 'camara') {
    return [];
  }

  const match = await findRadarPerfil(perfil);

  if (!match?.idParlamentarVoz) {
    return [];
  }

  const payload = await fetchRadar<RadarVotosResponse>(`/parlamentares/${match.idParlamentarVoz}/votos`);
  const votos = payload.votos ?? {};
  const ids = Object.keys(votos).reverse().slice(0, 30);

  const detalhes = await Promise.all(
    ids.map(async (voteId) => {
      try {
        const votacao = await fetchCamara<CamaraVotacaoDetalhe>(`/votacoes/${voteId}`);

        if (!votacao.dados) {
          return null;
        }

        return {
          voteId,
          voto: votos[voteId],
          votacao: votacao.dados,
        } satisfies CamaraVoteItem;
      } catch {
        return null;
      }
    }),
  );

  const validos = detalhes.filter((item) => item !== null) as CamaraVoteItem[];

  return validos.sort((a, b) => (b.votacao.data ?? '').localeCompare(a.votacao.data ?? ''));
});

export const fetchGovernismoForPerfil = cache(
  async (perfil: PerfilPublico): Promise<GovernismoReferencia | null> => {
    const match = await findRadarPerfil(perfil);

    if (!match?.idParlamentarVoz) {
      return null;
    }

    const governismo = await fetchRadar<RadarGovernismoResponse>(`/governismo/${match.idParlamentarVoz}`);

    if (
      typeof governismo.total !== 'number' ||
      typeof governismo.afavor !== 'number' ||
      typeof governismo.n !== 'number' ||
      typeof governismo.nvotacoes !== 'number'
    ) {
      return null;
    }

    return {
      fonte: 'radar_do_congresso',
      percentualFavoravel: governismo.total,
      votosFavoraveis: governismo.afavor,
      votosConsiderados: governismo.n,
      votacoesMonitoradas: governismo.nvotacoes,
      fonteUrl: getRadarPerfilUrl(match.idParlamentarVoz),
    };
  },
);

export const fetchAssiduidadeForPerfil = cache(
  async (perfil: PerfilPublico): Promise<PresencaReferencia | null> => {
    const match = await findRadarPerfil(perfil);

    if (!match?.idParlamentarVoz) {
      return null;
    }

    const payload = await fetchRadar<RadarAssiduidadeResponse>(
      `/parlamentares/${match.idParlamentarVoz}/assiduidade`,
    );
    const anos = payload.parlamentarAssiduidade ?? [];
    const maisRecente = [...anos].sort((a, b) => b.ano - a.ano)[0];

    if (!maisRecente || !maisRecente.totalSessoesDeliberativas) {
      return null;
    }

    return {
      fonte: 'radar_do_congresso',
      ano: maisRecente.ano,
      percentual: (maisRecente.totalPresenca / maisRecente.totalSessoesDeliberativas) * 100,
      sessoesDeliberativas: maisRecente.totalSessoesDeliberativas,
      presencas: maisRecente.totalPresenca,
      ausenciasJustificadas: maisRecente.totalAusenciasJustificadas,
      ausenciasNaoJustificadas: maisRecente.totalAusenciasNaoJustificadas,
      fonteUrl: getRadarPerfilUrl(match.idParlamentarVoz),
    };
  },
);

export const fetchCamaraVotesForPerfil = cache(
  async (perfil: PerfilPublico): Promise<PerfilItemLista[]> => {
    const detalhes = await fetchCamaraVoteItems(perfil);

    return detalhes.slice(0, 6).map(({ votacao, voto }) => {
      const materia = votacao.proposicoesAfetadas?.[0] ?? votacao.objetosPossiveis?.[0];

      return {
        titulo: buildVoteTitle(votacao),
        descricao:
          materia?.ementa ?? votacao.descricao ?? 'Votação nominal registrada na Câmara dos Deputados.',
        detalhe: compact([
          mapRadarVote(voto),
          votacao.aprovacao === 1 ? 'Resultado: aprovada' : 'Resultado: não aprovada',
        ]).join(' • '),
        data: votacao.data,
        destaque: mapRadarVote(voto),
        href: buildVoteHref(votacao),
      } satisfies PerfilItemLista;
    });
  },
);

export const fetchCamaraVoteThemesForPerfil = cache(
  async (perfil: PerfilPublico): Promise<PerfilItemLista[]> => {
    const detalhes = await fetchCamaraVoteItems(perfil);

    return buildVoteThemeCards(
      detalhes.map(({ votacao, voto }) => {
        const materia = votacao.proposicoesAfetadas?.[0] ?? votacao.objetosPossiveis?.[0];

        return {
          titulo: buildVoteTitle(votacao),
          descricao: materia?.ementa ?? votacao.descricao,
          data: votacao.data,
          voto: mapRadarVote(voto),
          href: buildVoteHref(votacao),
        };
      }),
    );
  },
);
