import { cache } from 'react';
import type { PerfilItemLista, PerfilPublico } from '@/lib/official';
import type { GovernismoReferencia, PresencaReferencia } from '@/lib/official/types';
import { buildVoteThemeCards } from '@/lib/political-themes';
import { getMemoryCache, setMemoryCache } from '@/lib/utils/memory-cache';

const RADAR_API_ROOT = 'https://radar.congressoemfoco.com.br/api';
const CAMARA_API_ROOT = 'https://dadosabertos.camara.leg.br/api/v2';
const REMOTE_REVALIDATE_SECONDS = 86400;
const CAMARA_VOTE_SAMPLE_SIZE = 12;

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

interface CamaraVoteGroup {
  titulo: string;
  descricao?: string;
  data?: string;
  href?: string;
  ultimaEtapa?: string;
  ultimoVoto: number | undefined;
  sim: number;
  nao: number;
  abstencao: number;
  obstrucao: number;
  total: number;
}

function normalizeText(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}

function compact<T>(values: Array<T | null | undefined | false>): T[] {
  return values.filter(Boolean) as T[];
}

async function fetchRadar<T>(path: string): Promise<T> {
  const response = await fetch(`${RADAR_API_ROOT}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REMOTE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar o Radar do Congresso: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function fetchCamara<T>(path: string): Promise<T> {
  const response = await fetch(`${CAMARA_API_ROOT}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REMOTE_REVALIDATE_SECONDS },
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

    return casaCompativel && nomeCompativel && ufCompativel;
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
  if (!materia) return 'Votação nominal';

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

function getVoteBucket(voto: number | undefined) {
  if (voto === 1) return 'sim';
  if (voto === -1) return 'nao';
  if (voto === 0) return 'abstencao';
  if (voto === 2) return 'obstrucao';
  return 'outro';
}

function getVoteTrend(group: CamaraVoteGroup, proposalTitle?: string) {
  const proposal = proposalTitle ? ` em ${proposalTitle}` : '';
  if (group.sim > group.nao) return `Tendência: mais votos favoráveis${proposal}`;
  if (group.nao > group.sim) return `Tendência: mais votos contrários${proposal}`;
  if (group.abstencao > 0 && group.sim === 0 && group.nao === 0) {
    return `Tendência: abstenções${proposal}`;
  }
  if (group.obstrucao > 0 && group.sim === 0 && group.nao === 0) {
    return `Tendência: obstruções${proposal}`;
  }

  return `Tendência: votos divididos${proposal}`;
}

function getGroupKey(item: CamaraVoteItem) {
  const title = buildVoteTitle(item.votacao);
  const href = buildVoteHref(item.votacao);

  if (href) {
    return `${title}::${href}`;
  }

  if (title !== 'Votação nominal') {
    return `${title}::sem-link`;
  }

  return `${title}::${item.voteId}`;
}

function buildVoteGroups(detalhes: CamaraVoteItem[]): CamaraVoteGroup[] {
  const grouped = new Map<string, CamaraVoteGroup>();

  for (const item of detalhes) {
    const key = getGroupKey(item);
    const titulo = buildVoteTitle(item.votacao);
    const href = buildVoteHref(item.votacao);
    const materia = item.votacao.proposicoesAfetadas?.[0] ?? item.votacao.objetosPossiveis?.[0];
    const etapa = item.votacao.descricao?.trim();
    const bucket = getVoteBucket(item.voto);

    const current =
      grouped.get(key) ??
      ({
        titulo,
        descricao: materia?.ementa ?? item.votacao.descricao,
        data: item.votacao.data,
        href,
        ultimaEtapa: etapa,
        ultimoVoto: item.voto,
        sim: 0,
        nao: 0,
        abstencao: 0,
        obstrucao: 0,
        total: 0,
      } satisfies CamaraVoteGroup);

    current.total += 1;

    if (bucket === 'sim') current.sim += 1;
    if (bucket === 'nao') current.nao += 1;
    if (bucket === 'abstencao') current.abstencao += 1;
    if (bucket === 'obstrucao') current.obstrucao += 1;

    const isMoreRecent = (item.votacao.data ?? '') > (current.data ?? '');
    if (isMoreRecent) {
      current.data = item.votacao.data;
      current.ultimaEtapa = etapa;
      current.ultimoVoto = item.voto;
    }

    if (!current.descricao) {
      current.descricao = materia?.ementa ?? item.votacao.descricao;
    }

    grouped.set(key, current);
  }

  return Array.from(grouped.values()).sort((a, b) => (b.data ?? '').localeCompare(a.data ?? ''));
}

const findRadarPerfil = cache(async (perfil: PerfilPublico): Promise<RadarBuscaItem | null> => {
  const busca = await fetchRadar<RadarBuscaItem[]>(
    `/busca-parlamentar/buscar?nome=${encodeURIComponent(perfil.nome_urna)}`,
  );

  return findRadarMatch(busca, perfil) ?? null;
});

const fetchCamaraVoteItems = cache(async (perfil: PerfilPublico): Promise<CamaraVoteItem[]> => {
  if (perfil.fonte !== 'camara') return [];

  const match = await findRadarPerfil(perfil);
  if (!match?.idParlamentarVoz) return [];

  const payload = await fetchRadar<RadarVotosResponse>(`/parlamentares/${match.idParlamentarVoz}/votos`);
  const votos = payload.votos ?? {};
  const ids = Object.keys(votos).reverse().slice(0, CAMARA_VOTE_SAMPLE_SIZE);

  const detalhes = await Promise.all(
    ids.map(async (voteId) => {
      try {
        const votacao = await fetchCamara<CamaraVotacaoDetalhe>(`/votacoes/${voteId}`);
        if (!votacao.dados) return null;

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
    const cacheKey = `radar:governismo:${perfil.fonte}:${perfil.idOrigem}`;
    const cached = getMemoryCache<GovernismoReferencia | null>(cacheKey);
    if (cached !== null) return cached;

    const match = await findRadarPerfil(perfil);
    if (!match?.idParlamentarVoz) return null;

    const governismo = await fetchRadar<RadarGovernismoResponse>(`/governismo/${match.idParlamentarVoz}`);

    if (
      typeof governismo.total !== 'number' ||
      typeof governismo.afavor !== 'number' ||
      typeof governismo.n !== 'number' ||
      typeof governismo.nvotacoes !== 'number'
    ) {
      return null;
    }

    const result: GovernismoReferencia = {
      fonte: 'radar_do_congresso',
      percentualFavoravel: governismo.total,
      votosFavoraveis: governismo.afavor,
      votosConsiderados: governismo.n,
      votacoesMonitoradas: governismo.nvotacoes,
      fonteUrl: getRadarPerfilUrl(match.idParlamentarVoz),
    };
    setMemoryCache(cacheKey, result, REMOTE_REVALIDATE_SECONDS);
    return result;
  },
);

export const fetchAssiduidadeForPerfil = cache(
  async (perfil: PerfilPublico): Promise<PresencaReferencia | null> => {
    const cacheKey = `radar:assiduidade:${perfil.fonte}:${perfil.idOrigem}`;
    const cached = getMemoryCache<PresencaReferencia | null>(cacheKey);
    if (cached !== null) return cached;

    const match = await findRadarPerfil(perfil);
    if (!match?.idParlamentarVoz) return null;

    const payload = await fetchRadar<RadarAssiduidadeResponse>(
      `/parlamentares/${match.idParlamentarVoz}/assiduidade`,
    );
    const anos = payload.parlamentarAssiduidade ?? [];
    const maisRecente = [...anos].sort((a, b) => b.ano - a.ano)[0];

    if (!maisRecente || !maisRecente.totalSessoesDeliberativas) return null;

    const result: PresencaReferencia = {
      fonte: 'radar_do_congresso',
      ano: maisRecente.ano,
      percentual: (maisRecente.totalPresenca / maisRecente.totalSessoesDeliberativas) * 100,
      sessoesDeliberativas: maisRecente.totalSessoesDeliberativas,
      presencas: maisRecente.totalPresenca,
      ausenciasJustificadas: maisRecente.totalAusenciasJustificadas,
      ausenciasNaoJustificadas: maisRecente.totalAusenciasNaoJustificadas,
      fonteUrl: getRadarPerfilUrl(match.idParlamentarVoz),
    };
    setMemoryCache(cacheKey, result, REMOTE_REVALIDATE_SECONDS);
    return result;
  },
);

export const fetchCamaraVotesForPerfil = cache(async (perfil: PerfilPublico): Promise<PerfilItemLista[]> => {
  const cacheKey = `radar:votos:${perfil.fonte}:${perfil.idOrigem}`;
  const cached = getMemoryCache<PerfilItemLista[]>(cacheKey);
  if (cached !== null && cached.length > 0) return cached;

  const detalhes = await fetchCamaraVoteItems(perfil);
  const groups = buildVoteGroups(detalhes);

  const result = groups.slice(0, 6).map((group) => {
    const etapaLabel = group.total > 1 ? `${group.total} etapas desta matéria` : '1 etapa desta matéria';
    const resumoContagem = compact([
      group.sim > 0 ? `${group.sim} sim` : null,
      group.nao > 0 ? `${group.nao} não` : null,
      group.abstencao > 0 ? `${group.abstencao} abstenções` : null,
      group.obstrucao > 0 ? `${group.obstrucao} obstruções` : null,
    ]).join(' • ');

    return {
      titulo: group.titulo,
      descricao: group.descricao ?? 'Votação nominal registrada na Câmara dos Deputados.',
      detalhe: compact([
        etapaLabel,
        resumoContagem || null,
        group.ultimaEtapa ? `Última etapa: ${group.ultimaEtapa}` : null,
      ]).join(' • '),
      data: group.data,
      destaque: `${mapRadarVote(group.ultimoVoto)} — ${getVoteTrend(group, group.titulo)}`,
      href: group.href,
    } satisfies PerfilItemLista;
  });

  setMemoryCache(cacheKey, result, REMOTE_REVALIDATE_SECONDS);
  return result;
});

export const fetchCamaraVoteThemesForPerfil = cache(
  async (perfil: PerfilPublico): Promise<PerfilItemLista[]> => {
    const cacheKey = `radar:temas:${perfil.fonte}:${perfil.idOrigem}`;
    const cached = getMemoryCache<PerfilItemLista[]>(cacheKey);
    if (cached !== null && cached.length > 0) return cached;

    const detalhes = await fetchCamaraVoteItems(perfil);
    const groups = buildVoteGroups(detalhes);

    const result = buildVoteThemeCards(
      groups.map((group) => {
        const temaVoteLabel =
          group.sim > group.nao
            ? 'Mais votos favoráveis'
            : group.nao > group.sim
              ? 'Mais votos contrários'
              : mapRadarVote(group.ultimoVoto);

        return {
          titulo: group.titulo,
          descricao: group.descricao,
          data: group.data,
          voto: temaVoteLabel,
          href: group.href,
        };
      }),
    );

    setMemoryCache(cacheKey, result, REMOTE_REVALIDATE_SECONDS);
    return result;
  },
);
