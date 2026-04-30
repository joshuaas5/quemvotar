import { NextRequest, NextResponse } from 'next/server';
import { calculateMatchScoreDetailedAsync, type UserAnswersMap } from '@/lib/match/calculator';

export const runtime = 'nodejs';

interface MatchPayload {
  answers: UserAnswersMap;
  parlamentares: Array<{
    id: string;
    idOrigem: string;
    nome_urna: string;
    partido: string;
    uf?: string;
    fonte: 'camara' | 'senado';
  }>;
  rankings: Record<string, number>;
}

/* Processa em batches para nao sobrecarregar a API da Camara */
async function processBatch(
  items: MatchPayload['parlamentares'],
  answers: UserAnswersMap,
  rankings: Record<string, number>,
  batchSize = 50,
) {
  const results: Array<{ id: string; score: number; rankingNota: number | null }> = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (pol) => {
        const rankingKey = `${pol.nome_urna}|${pol.partido}|${pol.uf ?? ''}|${pol.fonte}`;
        const rankingNota = rankings[rankingKey] ?? null;
        try {
          const score = await calculateMatchScoreDetailedAsync(
            answers,
            pol.idOrigem || pol.nome_urna,
            pol.partido || '',
            rankingNota,
          );
          return { id: pol.id, score, rankingNota };
        } catch {
          return { id: pol.id, score: 0, rankingNota };
        }
      }),
    );
    results.push(...batchResults);
  }

  return results;
}

export async function POST(request: NextRequest) {
  try {
    const body: MatchPayload = await request.json();
    const { answers, parlamentares, rankings } = body;

    if (!answers || !parlamentares || !rankings) {
      return NextResponse.json({ error: 'Payload invalido' }, { status: 400 });
    }

    const scores = await processBatch(parlamentares, answers, rankings);

    return NextResponse.json({ scores });
  } catch (error) {
    console.error('Erro no calculo do match:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
