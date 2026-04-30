/**
 * Interface para registro de votacoes nominais.
 * Implementacao real esta em camara-votes.ts
 */

export type VoteValue = 'Sim' | 'Nao' | 'Abstencao' | 'Obstrucao' | 'Artigo 17' | null;

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
 * Converte um voto nominal (sim/nao) para uma pontuacao de posicionamento (1-5).
 */
export function voteToPosition(vote: VoteValue | string | null | undefined, _theme: string): number | null {
  if (!vote) return null;

  const v = String(vote).trim();

  /*
   * Todos os PLs mapeados em TEMAS_PROPOSICOES tem redacao onde
   * votar SIM = concordar com a afirmacao do quiz (posicao 5)
   * votar NAO = discordar da afirmacao do quiz (posicao 1)
   */
  switch (v) {
    case 'Sim':
      return 5;
    case 'Nao':
    case 'Não':
      return 1;
    case 'Abstencao':
    case 'Abstenção':
      return 3;
    case 'Obstrucao':
    case 'Obstrução':
      return 2.5;
    case 'Artigo 17':
      return 2.5;
    case 'ausente':
    case 'Ausente':
    case null:
    case undefined:
      return null;
    default:
      return null;
  }
}
