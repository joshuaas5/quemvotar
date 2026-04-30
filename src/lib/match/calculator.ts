import { getPartyMeta } from '@/lib/party-meta';
import { getPartyThemePosition } from './party-themes';
import { fetchVotesByParliamentarian, voteToPosition } from './voting-record';

export type UserAnswer = {
  score: number;
  weight: number;
};

export type UserAnswersMap = Record<string, UserAnswer>;

/**
 * Variacao individual do parlamentar dentro do partido.
 * Baseado em hash deterministico do ID + tema.
 * Range: -0.4 a +0.4 (pequena variacao para diferenciar individuos do mesmo partido)
 */
function getPoliticianDeviation(polId: string, questionId: string): number {
  const hashStr = polId + questionId;
  let hash = 0;
  for (let i = 0; i < hashStr.length; i++) {
    hash = (Math.imul(31, hash) + hashStr.charCodeAt(i)) | 0;
  }
  return ((Math.abs(hash) % 100) / 100) * 0.8 - 0.4;
}

/**
 * Calcula o match entre usuario e parlamentar usando posicionamentos partidarios por tema.
 *
 * Algoritmo hibrido:
 * 1. Para cada tema, pega a posicao do partido (1-5) baseada em historico de votacoes
 * 2. Aplica uma pequena variacao individual (±0.4) baseada no ID do parlamentar
 * 3. Calcula a distancia entre a resposta do usuario e a posicao do parlamentar
 * 4. Ranking dos Politicos ajusta levemente a pontuacao final
 */
export function calculateMatchScoreDetailed(
  userAnswers: UserAnswersMap,
  politicianId: string,
  politicianParty: string,
  politicianRanking?: number | null,
): number {
  const topics = Object.keys(userAnswers);
  if (topics.length === 0) return 0;

  let totalWeight = 0;
  let earnedPoints = 0;
  const MAX_DIST = 4;

  topics.forEach((topic) => {
    const userAns = userAnswers[topic];
    if (!userAns || typeof userAns.score !== 'number' || typeof userAns.weight !== 'number') return;

    totalWeight += userAns.weight;

    // Posicao partidaria no tema (1-5) + variacao individual
    const partyPosition = getPartyThemePosition(politicianParty, topic as any);
    const deviation = getPoliticianDeviation(politicianId, topic);
    const polAnswer = Math.max(1, Math.min(5, partyPosition + deviation));

    const distance = Math.abs(userAns.score - polAnswer);
    const normalizedPoints = Math.max(0, MAX_DIST - distance);
    earnedPoints += normalizedPoints * userAns.weight;
  });

  if (totalWeight === 0) return 0;
  let score = (earnedPoints / (totalWeight * MAX_DIST)) * 100;

  // Ajuste leve pelo ranking: deputados com melhor ranking ganham até 5% a mais
  if (politicianRanking != null && !Number.isNaN(politicianRanking)) {
    const rankingBonus = (politicianRanking / 10) * 5;
    score = Math.min(100, score + rankingBonus);
  }

  // Protecao contra NaN
  if (Number.isNaN(score)) return 0;

  return score;
}

export function calculateNolanChart(userAnswers: UserAnswersMap) {
  const hasAnswers = Object.keys(userAnswers).length > 0;
  const safeScore = (key: string) => userAnswers[key]?.score ?? 3;

  const econ =
    (safeScore('pvt') + (6 - safeScore('impostos')) + safeScore('clt') + safeScore('agr')) / 4;

  const personal =
    (safeScore('drogas') + safeScore('armas') + safeScore('abor') + (6 - safeScore('religiao'))) / 4;

  const econPercent = ((econ - 1) / 4) * 100;
  const personalPercent = ((personal - 1) / 4) * 100;

  if (!hasAnswers) {
    return {
      econPercent: 50,
      personalPercent: 50,
      label: 'Centro',
      description:
        'Voce busca o equilibrio entre a liberdade individual e a ordem social. Prefere mudancas graduais e tende a avaliar caso a caso sem se prender rigidamente a dogmas de esquerda ou direita.',
    };
  }

  let label = 'Centro';
  let description =
    'Voce busca o equilibrio entre a liberdade individual e a ordem social. Prefere mudancas graduais e tende a avaliar caso a caso sem se prender rigidamente a dogmas de esquerda ou direita.';

  if (econ > 3 && personal > 3) {
    label = 'Liberalismo / Libertário';
    description =
      'Voce valoriza a liberdade maxima tanto no campo economico quanto no pessoal. Defende que o Estado deve interferir o minimo possivel na vida do cidadao e no mercado.';
  } else if (econ > 3 && personal <= 3) {
    label = 'Conservador';
    description =
      'Voce defende a liberdade economica e o livre mercado, mas acredita que o Estado deve atuar para preservar valores morais, tradicoes e a seguranca publica.';
  } else if (econ <= 3 && personal > 3) {
    label = 'Progressista / Esquerda';
    description =
      'Voce prioriza a liberdade pessoal e os direitos sociais, mas defende que o Estado deve atuar na economia para reduzir desigualdades e garantir servicos publicos.';
  } else if (econ <= 3 && personal <= 3) {
    label = 'Estatista / Populista';
    description =
      'Voce acredita que o Estado deve ter papel central tanto na regulacao da economia quanto na manutencao da ordem social e moral da sociedade.';
  }

  return { econPercent, personalPercent, label, description };
}
