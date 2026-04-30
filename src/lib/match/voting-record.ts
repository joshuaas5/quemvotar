/**
 * Registro de votacoes nominais por parlamentar e tema.
 *
 * FASE 1 (atual): Usa posicionamentos partidarios como proxy (party-themes.ts)
 * FASE 2 (futuro): Integrar votações nominais reais da Câmara via API:
 *   - https://dadosabertos.camara.leg.br/api/v2/votacoes
 *   - https://dadosabertos.camara.leg.br/api/v2/votacoes/{id}/votos
 *
 * Para cada tema do match, mapear PLs/votacoes reais:
 *   - armas: Estatuto do Desarmamento (flexibilizacao/bloqueio)
 *   - aborto: PLs de descriminalizacao
 *   - cotas: Cotas raciais/sociais em universidades
 *   - privatizacao: Privatizacao de estatais (Correios, Petrobras)
 *   - drogas: Descriminalizacao da maconha
 *   - impostos: Reforma tributaria progressiva/regressiva
 *   - meio_ambiente: Marco temporal / protecao ambiental
 *   - clt: Flexibilizacao trabalhista
 *   - agronegocio: Avanco sobre areas de preservacao
 *   - religiao: Escola sem partido / ideologia de genero
 */

export type VoteValue = 'sim' | 'nao' | 'abstencao' | 'obstrucao' | 'ausente';

export interface ParliamentarianVote {
  parliamentarianId: string;
  parliamentarianName: string;
  party: string;
  theme: string;
  vote: VoteValue;
  date: string;
  proposalId: string;
  proposalDescription: string;
}

/**
 * Busca votacoes nominais de um parlamentar da Camara.
 * TODO: Implementar chamada real à API da Camara.
 */
export async function fetchVotesByParliamentarian(
  parliamentarianId: string,
): Promise<ParliamentarianVote[]> {
  // FASE 1: Retorna vazio — usa fallback partidario
  // FASE 2: Implementar busca na API da Camara
  return [];
}

/**
 * Busca votacoes nominais por tema.
 * TODO: Implementar chamada real à API da Camara.
 */
export async function fetchVotesByTheme(theme: string): Promise<ParliamentarianVote[]> {
  // FASE 1: Retorna vazio — usa fallback partidario
  // FASE 2: Implementar busca na API da Camara
  return [];
}

/**
 * Converte um voto nominal (sim/nao) para uma pontuacao de posicionamento (1-5).
 * Usado para calcular o match quando temos votacoes reais.
 */
export function voteToPosition(vote: VoteValue, theme: string): number | null {
  switch (vote) {
    case 'sim':
      // Para temas "progressistas", SIM = posicao forte (5)
      // Para temas "conservadores", SIM = posicao fraca (1)
      return isProgressiveTheme(theme) ? 5 : 1;
    case 'nao':
      return isProgressiveTheme(theme) ? 1 : 5;
    case 'abstencao':
      return 3;
    case 'obstrucao':
      return 2.5;
    case 'ausente':
      return null; // Nao considera
    default:
      return null;
  }
}

function isProgressiveTheme(theme: string): boolean {
  const progressiveThemes = ['cotas', 'abor', 'drogas', 'impostos', 'meio_amb'];
  return progressiveThemes.includes(theme);
}
