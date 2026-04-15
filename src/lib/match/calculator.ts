import { getPartyMeta } from '@/lib/party-meta';

export type UserAnswer = {
  score: number;
  weight: number;
};

export type UserAnswersMap = Record<string, UserAnswer>;

export const THEMES_EXPECTED: Record<string, number[]> = {
  pvt:      [1, 2, 3, 4, 5], 
  agr:      [1, 2, 3, 4, 5], 
  impostos: [5, 4, 3, 2, 1], 
  drogas:   [5, 4, 3, 2, 1], 
  armas:    [1, 1, 2, 4, 5], 
  quotas:   [5, 4, 3, 2, 1], 
  abor:     [5, 4, 3, 2, 1], 
  religiao: [1, 2, 3, 4, 5], 
  clt:      [1, 2, 3, 4, 5], 
  meio_amb: [5, 5, 4, 3, 2], 
};

function getSpectrumIndex(spectrum: string): number {
  switch (spectrum) {
    case 'esquerda': return 0;
    case 'centro-esquerda': return 1;
    case 'centro': return 2;
    case 'centro-direita': return 3;
    case 'direita': return 4;
    default: return 2;
  }
}

function getPoliticianDeviation(polId: string, questionId: string): number {
  const hashStr = polId + questionId;
  let hash = 0;
  for (let i = 0; i < hashStr.length; i++) {
    hash = Math.imul(31, hash) + hashStr.charCodeAt(i) | 0;
  }
  return ((Math.abs(hash) % 100) / 100) * 0.8 - 0.4;
}

export function calculateMatchScoreDetailed(
  userAnswers: UserAnswersMap,
  politicianId: string,
  politicianParty: string,
): number {
  const topics = Object.keys(userAnswers);
  if (topics.length === 0) return 0;

  const partyMeta = getPartyMeta(politicianParty);
  const spectrumIdx = getSpectrumIndex(partyMeta.spectrum);

  let totalWeight = 0;
  let earnedPoints = 0;
  const MAX_DIST = 4;

  topics.forEach(topic => {
    const userAns = userAnswers[topic];
    if (!userAns) return;

    totalWeight += userAns.weight;

    const expectedArr = THEMES_EXPECTED[topic];
    const baseExpected = expectedArr ? expectedArr[spectrumIdx] : 3;
    
    const polAnswer = baseExpected + getPoliticianDeviation(politicianId, topic);
    const distance = Math.abs(userAns.score - polAnswer);
    
    const normalizedPoints = Math.max(0, MAX_DIST - distance);
    earnedPoints += normalizedPoints * userAns.weight;
  });

  if (totalWeight === 0) return 0;
  return (earnedPoints / (totalWeight * MAX_DIST)) * 100;
}
