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
export function voteToPosition(vote: VoteValue | string | null | undefined, theme: string): number | null {
  if (!vote) return null;

  const v = String(vote).trim();

  switch (v) {
    case 'Sim':
      // Para temas "progressistas", SIM = posicao forte (5)
      // Para temas "conservadores", SIM = posicao fraca (1)
      return isProgressiveTheme(theme) ? 5 : 1;
    case 'Nao':
    case 'Não':
      return isProgressiveTheme(theme) ? 1 : 5;
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

function isProgressiveTheme(theme: string): boolean {
  const progressiveThemes = ['cotas', 'abor', 'drogas', 'impostos', 'meio_amb'];
  return progressiveThemes.includes(theme);
}
