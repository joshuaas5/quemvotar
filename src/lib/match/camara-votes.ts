/**
 * Servico de busca de votacoes nominais da Camara dos Deputados
 * API: https://dadosabertos.camara.leg.br/api/v2
 */

import { getMemoryCache, setMemoryCache } from '@/lib/utils/memory-cache';

const CAMARA_API = 'https://dadosabertos.camara.leg.br/api/v2';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas

export type VoteValue = 'Sim' | 'Nao' | 'Abstencao' | 'Obstrucao' | 'Artigo 17' | null;

export interface VotoDeputado {
  deputadoId: number;
  nome: string;
  partido: string;
  uf: string;
  voto: VoteValue;
}

export interface VotacaoNominal {
  id: string;
  data: string;
  descricao: string;
  proposicoesAfetadas: Array<{
    id: number;
    siglaTipo: string;
    numero: number;
    ano: number;
  }>;
  votos: VotoDeputado[];
}

/**
 * Busca proposicoes por tipo, numero e ano.
 */
export async function buscarProposicao(
  siglaTipo: string,
  numero: number,
  ano: number,
): Promise<{ id: number; siglaTipo: string; numero: number; ano: number } | null> {
  const cacheKey = `camara:proposicao:${siglaTipo}:${numero}:${ano}`;
  const cached = getMemoryCache<{ id: number; siglaTipo: string; numero: number; ano: number } | null>(cacheKey);
  if (cached && cached.id) return cached;

  try {
    const resp = await fetch(
      `${CAMARA_API}/proposicoes?siglaTipo=${siglaTipo}&numero=${numero}&ano=${ano}&itens=1`,
      { next: { revalidate: 86400 } },
    );
    if (!resp.ok) return null;

    const data = await resp.json();
    const prop = data.dados?.[0];
    if (!prop) return null;

    const result = {
      id: prop.id,
      siglaTipo: prop.siglaTipo,
      numero: prop.numero,
      ano: prop.ano,
    };

    setMemoryCache(cacheKey, result, CACHE_TTL);
    return result;
  } catch {
    return null;
  }
}

/**
 * Busca votações de uma proposicao.
 */
export async function buscarVotacoesProposicao(
  proposicaoId: number,
): Promise<VotacaoNominal[]> {
  const cacheKey = `camara:votacoes:${proposicaoId}`;
  const cached = getMemoryCache<VotacaoNominal[]>(cacheKey);
  if (cached) return cached;

  try {
    const resp = await fetch(
      `${CAMARA_API}/proposicoes/${proposicaoId}/votacoes`,
      { next: { revalidate: 86400 } },
    );
    if (!resp.ok) return [];

    const data = await resp.json();
    const votacoes = data.dados ?? [];

    const result: VotacaoNominal[] = votacoes.map((v: any) => ({
      id: v.id,
      data: v.data,
      descricao: v.descricao,
      proposicoesAfetadas: v.proposicoesAfetadas ?? [],
      votos: [], // Votos sao buscados separadamente
    }));

    setMemoryCache(cacheKey, result, CACHE_TTL);
    return result;
  } catch {
    return [];
  }
}

/**
 * Busca votos nominais de uma votacao especifica.
 */
export async function buscarVotosVotacao(
  votacaoId: string,
): Promise<VotoDeputado[]> {
  const cacheKey = `camara:votos:${votacaoId}`;
  const cached = getMemoryCache<VotoDeputado[]>(cacheKey);
  if (cached) return cached;

  try {
    const resp = await fetch(
      `${CAMARA_API}/votacoes/${votacaoId}/votos`,
      { next: { revalidate: 86400 } },
    );
    if (!resp.ok) return [];

    const data = await resp.json();
    const votos = data.dados ?? [];

    const result: VotoDeputado[] = votos.map((v: any) => ({
      deputadoId: v.deputado_?.id,
      nome: v.deputado_?.nome,
      partido: v.deputado_?.siglaPartido,
      uf: v.deputado_?.siglaUf,
      voto: v.tipoVoto || null,
    }));

    setMemoryCache(cacheKey, result, CACHE_TTL);
    return result;
  } catch {
    return [];
  }
}

/**
 * Mapeamento de temas do match para proposicoes reais.
 * Cada tema tem uma lista de PLs que serao buscados na API.
 */
export const TEMAS_PROPOSICOES: Record<string, Array<{ siglaTipo: string; numero: number; ano: number; descricao: string }>> = {
  armas: [
    { siglaTipo: 'PL', numero: 3722, ano: 2012, descricao: 'Estatuto do Desarmamento - flexibilizacao' },
    { siglaTipo: 'PL', numero: 2626, ano: 2015, descricao: 'Posse de armas para moradores de areas rurais' },
  ],
  abor: [
    { siglaTipo: 'PL', numero: 5061, ano: 2013, descricao: 'Descriminalizacao do aborto ate 12 semanas' },
    { siglaTipo: 'PL', numero: 4852, ano: 2023, descricao: 'Aborto em caso de estupro sem necessidade de BO' },
  ],
  cotas: [
    { siglaTipo: 'PL', numero: 747, ano: 2021, descricao: 'Cotas raciais em concurso publico federal' },
    { siglaTipo: 'PEC', numero: 37, ano: 2022, descricao: 'Reserva de vagas para negros em universidades federais' },
  ],
  drogas: [
    { siglaTipo: 'PL', numero: 399, ano: 2015, descricao: 'Descriminalizacao da maconha para uso pessoal' },
    { siglaTipo: 'PL', numero: 5008, ano: 2019, descricao: 'Autorizacao do cultivo de cannabis para uso medicinal' },
  ],
  impostos: [
    { siglaTipo: 'PL', numero: 2338, ano: 2021, descricao: 'Taxacao de super-ricos e dividendos' },
    { siglaTipo: 'PEC', numero: 45, ano: 2019, descricao: 'Reforma Tributaria' },
  ],
  pvt: [
    { siglaTipo: 'PL', numero: 591, ano: 2021, descricao: 'Privatizacao dos Correios' },
    { siglaTipo: 'PL', numero: 1340, ano: 2022, descricao: 'Privatizacao da Eletrobras' },
  ],
  meio_amb: [
    { siglaTipo: 'PL', numero: 490, ano: 2007, descricao: 'Codigo Florestal - flexibilizacao' },
    { siglaTipo: 'PL', numero: 191, ano: 2020, descricao: 'Marco temporal para terras indigenas' },
  ],
  clt: [
    { siglaTipo: 'PL', numero: 6787, ano: 2016, descricao: 'Reforma Trabalhista' },
    { siglaTipo: 'PL', numero: 6047, ano: 2023, descricao: 'Desconto sindical obrigatorio' },
  ],
  agr: [
    { siglaTipo: 'PL', numero: 2633, ano: 2020, descricao: 'Regularizacao fundiaria - liberacao de terras publicas' },
    { siglaTipo: 'PL', numero: 490, ano: 2007, descricao: 'Codigo Florestal - areas de preservacao' },
  ],
  religiao: [
    { siglaTipo: 'PL', numero: 1930, ano: 2021, descricao: 'Escola sem Partido' },
    { siglaTipo: 'PL', numero: 758, ano: 2023, descricao: 'Proibicao de ideologia de genero nas escolas' },
  ],
};

/**
 * Busca todos os votos de um deputado em um tema especifico.
 * Retorna um mapa de tema -> lista de votos.
 */
export async function buscarVotosDeputadoPorTema(
  deputadoId: number,
  tema: string,
): Promise<VotoDeputado[]> {
  const proposicoes = TEMAS_PROPOSICOES[tema];
  if (!proposicoes) return [];

  const votos: VotoDeputado[] = [];

  for (const prop of proposicoes) {
    const proposicao = await buscarProposicao(prop.siglaTipo, prop.numero, prop.ano);
    if (!proposicao) continue;

    const votacoes = await buscarVotacoesProposicao(proposicao.id);
    for (const votacao of votacoes) {
      const todosVotos = await buscarVotosVotacao(votacao.id);
      const votoDeputado = todosVotos.find((v) => v.deputadoId === deputadoId);
      if (votoDeputado) {
        votos.push(votoDeputado);
      }
    }
  }

  return votos;
}
