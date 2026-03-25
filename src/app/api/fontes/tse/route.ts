import { NextRequest, NextResponse } from 'next/server';
import { getTseDatasets } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const limitParam = Number(request.nextUrl.searchParams.get('limit') ?? '6');
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 12) : 6;
  const datasets = await getTseDatasets(limit);

  return NextResponse.json({
    atualizadoEm: new Date().toISOString(),
    origem: 'tse-dados-abertos',
    dados: datasets,
  });
}
