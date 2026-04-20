import { getPartyMeta } from '@/lib/party-meta';

export type UserAnswer = {
  score: number;
  weight: number;
};

export type UserAnswersMap = Record<string, UserAnswer>;

export const THEMES_EXPECTED: Record<string, number[]> = {
  pvt: [1, 2, 3, 4, 5],
  agr: [1, 2, 3, 4, 5],
  impostos: [5, 4, 3, 2, 1],
  drogas: [5, 4, 3, 2, 1],
  armas: [1, 1, 2, 4, 5],
  cotas_raciais: [5, 4, 3, 2, 1],
  cotas_sociais: [5, 5, 4, 3, 2],
  cotas: [5, 4.5, 3.5, 2.5, 1.5],
  abor: [5, 4, 3, 2, 1],
  religiao: [1, 2, 3, 4, 5],
  clt: [1, 2, 3, 4, 5],
  meio_amb: [5, 5, 4, 3, 2],
};

const THEME_ALIASES: Record<string, string[]> = {
  cotas: ['cotas_raciais', 'cotas_sociais'],
  quotas: ['cotas_raciais', 'cotas_sociais'],
};

function getExpectedScore(topic: string, spectrumIdx: number): number {
  const expected = THEMES_EXPECTED[topic];
  if (expected) {
    return expected[spectrumIdx] ?? 3;
  }

  const aliases = THEME_ALIASES[topic];
  if (!aliases || aliases.length === 0) {
    return 3;
  }

  const scores = aliases
    .map((alias) => THEMES_EXPECTED[alias]?.[spectrumIdx])
    .filter((value): value is number => typeof value === 'number');

  if (scores.length === 0) {
    return 3;
  }

  const total = scores.reduce((acc, value) => acc + value, 0);
  return total / scores.length;
}

function getSpectrumIndex(spectrum: string): number {
  switch (spectrum) {
    case 'esquerda':
      return 0;
    case 'centro-esquerda':
      return 1;
    case 'centro':
      return 2;
    case 'centro-direita':
      return 3;
    case 'direita':
      return 4;
    default:
      return 2;
  }
}

function getPoliticianDeviation(polId: string, questionId: string): number {
  const hashStr = polId + questionId;
  let hash = 0;
  for (let i = 0; i < hashStr.length; i++) {
    hash = (Math.imul(31, hash) + hashStr.charCodeAt(i)) | 0;
  }
  return ((Math.abs(hash) % 100) / 100) * 0.8 - 0.4;
}

export function calculateMatchScoreDetailed(
  userAnswers: UserAnswersMap,
  politicianId: string,
  politicianParty: string,
  politicianRanking?: number | null,
): number {
  const topics = Object.keys(userAnswers);
  if (topics.length === 0) return 0;

  const partyMeta = getPartyMeta(politicianParty);
  let spectrumIdx = getSpectrumIndex(partyMeta.spectrum);
  if (politicianRanking != null) {
    if (politicianRanking < 3) spectrumIdx = 0;
    else if (politicianRanking < 5) spectrumIdx = 1;
    else if (politicianRanking < 7) spectrumIdx = 2;
    else if (politicianRanking < 8.5) spectrumIdx = 3;
    else spectrumIdx = 4;
  }

  let totalWeight = 0;
  let earnedPoints = 0;
  const MAX_DIST = 4;

  topics.forEach((topic) => {
    const userAns = userAnswers[topic];
    if (!userAns) return;

    totalWeight += userAns.weight;

    const baseExpected = getExpectedScore(topic, spectrumIdx);

    const polAnswer = baseExpected + getPoliticianDeviation(politicianId, topic);
    const distance = Math.abs(userAns.score - polAnswer);

    const normalizedPoints = Math.max(0, MAX_DIST - distance);
    earnedPoints += normalizedPoints * userAns.weight;
  });

  if (totalWeight === 0) return 0;
  return (earnedPoints / (totalWeight * MAX_DIST)) * 100;
}

export function calculateNolanChart(userAnswers: UserAnswersMap) {
  const safeScore = (key: string) => userAnswers[key]?.score ?? 3;

  const econ =
    (safeScore('pvt') + (6 - safeScore('impostos')) + safeScore('clt') + safeScore('agr')) / 4;

  const personal =
    (safeScore('drogas') + safeScore('armas') + safeScore('abor') + (6 - safeScore('religiao'))) / 4;

  const econPercent = ((econ - 1) / 4) * 100;
  const personalPercent = ((personal - 1) / 4) * 100;

  let label = 'Centro';
  let description =
    'Você busca o equilíbrio entre a liberdade individual e a ordem social. Prefere mudanças graduais e tende a avaliar caso a caso sem se prender rigidamente a dogmas de esquerda ou direita.';

  if (econ > 3 && personal > 3) {
    label = 'Liberalismo / Libertário';
    description =
      'Você valoriza a liberdade máxima tanto no campo econômico quanto no pessoal. Defende que o Estado deve interferir o mínimo possível na vida do cidadão e no mercado.';
  } else if (econ > 3 && personal <= 3) {
    label = 'Conservador';
    description =
      'Você defende a liberdade econômica e o livre mercado, mas acredita que o Estado deve atuar para preservar valores morais, tradições e a segurança pública.';
  } else if (econ <= 3 && personal > 3) {
    label = 'Progressista / Esquerda';
    description =
      'Você prioriza a liberdade pessoal e os direitos sociais, mas defende que o Estado deve atuar na economia para reduzir desigualdades e garantir serviços públicos.';
  } else if (econ <= 3 && personal <= 3) {
    label = 'Estatista / Populista';
    description =
      'Você acredita que o Estado deve ter papel central tanto na regulação da economia quanto na manutenção da ordem social e moral da sociedade.';
  }

  return { econPercent, personalPercent, label, description };
}