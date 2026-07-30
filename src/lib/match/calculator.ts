import { getPartyThemePosition, type ThemeKey } from './party-themes';
import { buscarVotosDeputadoPorTema } from './camara-votes';
import { voteToPosition } from './voting-record';

const THEME_KEYS: ThemeKey[] = ['pvt', 'agr', 'impostos', 'drogas', 'armas', 'cotas', 'abor', 'religiao', 'clt', 'meio_amb'];

function getPositionForTheme(party: string, theme: string): number {
  if (!THEME_KEYS.includes(theme as ThemeKey)) return 3;
  return getPartyThemePosition(party, theme as ThemeKey);
}

export type UserAnswer = {
  score: number;
  weight: number;
};

export type UserAnswersMap = Record<string, UserAnswer>;

export type MatchEvidence = {
  temasComVotosPublicos: number;
  temasComReferenciaPartidaria: number;
};

/**
 * Calcula a posicao de um parlamentar em um tema.
 *
 * ALGORITMO HIBRIDO:
 * 1. Tenta buscar votacoes REAIS do deputado na Camara (FASE 2 - parcial)
 * 2. Se nao encontrar, usa posicao PARTIDARIA por tema (FASE 1 - atual)
 * 3. Guarda a origem de cada tema para exibicao transparente no resultado.
 * 4. Exibe o Ranking dos Politicos separadamente, sem alterar a afinidade.
 */
async function getPoliticianPosition(
  politicianId: string,
  politicianParty: string,
  theme: string,
): Promise<{ position: number; source: 'voto_publico' | 'referencia_partidaria' }> {
  // FASE 2: Tentar buscar votos reais (apenas para deputados da Camara)
  const numericId = parseInt(politicianId, 10);
  if (!Number.isNaN(numericId) && numericId > 0) {
    try {
      const votosReais = await buscarVotosDeputadoPorTema(numericId, theme);
      if (votosReais.length > 0) {
        // Calcula media dos votos reais convertidos para posicao 1-5
        const posicoes = votosReais
          .map((v) => voteToPosition(v.voto, theme))
          .filter((p): p is number => p !== null);

        if (posicoes.length > 0) {
          const media = posicoes.reduce((a, b) => a + b, 0) / posicoes.length;
          return { position: Math.max(1, Math.min(5, media)), source: 'voto_publico' };
        }
      }
    } catch {
      // Se falhar, usa fallback partidario
    }
  }

  // FASE 1: fallback para a referencia partidaria, sem variacao inventada.
  const partyPosition = getPositionForTheme(politicianParty, theme);
  return { position: partyPosition, source: 'referencia_partidaria' };
}

/**
 * Calcula o match entre usuario e parlamentar (VERSAO ASSINCRONA).
 *
 * Usa votos reais quando disponiveis, fallback partidario quando nao.
 */
export async function calculateMatchScoreWithEvidenceAsync(
  userAnswers: UserAnswersMap,
  politicianId: string,
  politicianParty: string,
  _politicianRanking?: number | null,
): Promise<{ score: number; evidence: MatchEvidence }> {
  const topics = Object.keys(userAnswers);
  if (topics.length === 0) return { score: 0, evidence: { temasComVotosPublicos: 0, temasComReferenciaPartidaria: 0 } };

  let totalWeight = 0;
  let earnedPoints = 0;
  const MAX_DIST = 4;

  // Busca posicoes em paralelo para todos os temas
  const positions = await Promise.all(
    topics.map((topic) => getPoliticianPosition(politicianId, politicianParty, topic)),
  );

  topics.forEach((topic, index) => {
    const userAns = userAnswers[topic];
    if (!userAns || typeof userAns.score !== 'number' || typeof userAns.weight !== 'number') return;

    totalWeight += userAns.weight;

    const polAnswer = positions[index].position;
    const distance = Math.abs(userAns.score - polAnswer);
    const normalizedPoints = Math.max(0, MAX_DIST - distance);
    earnedPoints += normalizedPoints * userAns.weight;
  });

  const evidence = positions.reduce<MatchEvidence>((summary, position) => {
    if (position.source === 'voto_publico') summary.temasComVotosPublicos += 1;
    else summary.temasComReferenciaPartidaria += 1;
    return summary;
  }, { temasComVotosPublicos: 0, temasComReferenciaPartidaria: 0 });

  if (totalWeight === 0) return { score: 0, evidence };
  const score = (earnedPoints / (totalWeight * MAX_DIST)) * 100;


  // Protecao contra NaN
  if (Number.isNaN(score)) return { score: 0, evidence };

  return { score, evidence };
}

export async function calculateMatchScoreDetailedAsync(
  userAnswers: UserAnswersMap,
  politicianId: string,
  politicianParty: string,
  politicianRanking?: number | null,
): Promise<number> {
  const result = await calculateMatchScoreWithEvidenceAsync(userAnswers, politicianId, politicianParty, politicianRanking);
  return result.score;

}
/**
 * Calcula o match entre usuario e parlamentar (VERSAO SINCRONA - fallback).
 *
 * Usa apenas posicoes partidarias (mais rapido, sem chamadas de API).
 * Mantido para compatibilidade com codigo existente.
 */
export function calculateMatchScoreDetailed(
  userAnswers: UserAnswersMap,
  _politicianId: string,
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

    // Fallback sincrono: referencia partidaria sem diferenca inventada.
    const partyPosition = getPositionForTheme(politicianParty, topic);
    const polAnswer = partyPosition;

    const distance = Math.abs(userAns.score - polAnswer);
    const normalizedPoints = Math.max(0, MAX_DIST - distance);
    earnedPoints += normalizedPoints * userAns.weight;
  });

  if (totalWeight === 0) return 0;
  const score = (earnedPoints / (totalWeight * MAX_DIST)) * 100;


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
