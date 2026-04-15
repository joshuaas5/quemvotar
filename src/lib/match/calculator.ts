export type UserAnswer = {
  vote: string;
  weight: number;
};

export type PoliticianVotes = Record<string, string>;
export type UserAnswersMap = Record<string, UserAnswer>;

export function calculateMatchScore(
  userAnswers: UserAnswersMap, 
  politicianVotes: PoliticianVotes
): number {
  const topics = Object.keys(userAnswers);
  if (topics.length === 0) return 0;

  let totalWeight = 0;
  let earnedPoints = 0;

  topics.forEach(topic => {
    const userAns = userAnswers[topic];
    const polVote = politicianVotes[topic];

    // Sempre soma o peso total da questão
    totalWeight += userAns.weight;

    // Se o político tem voto e é exatamente igual ao do usuário:
    // Soma os pontos. Se for "AUSENTE", "ABSTENÇÃO" ou null, ele não pontua.
    if (polVote && polVote === userAns.vote) {
      earnedPoints += userAns.weight;
    }
  });

  // Proteção contra divisão por zero
  if (totalWeight === 0) return 0;

  return (earnedPoints / totalWeight) * 100;
}
