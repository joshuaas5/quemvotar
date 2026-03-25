import { NextRequest, NextResponse } from 'next/server';
import { getHighlights, searchCandidatos } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? '';

  if (!query) {
    const destaques = await getHighlights();
    return NextResponse.json({
      atualizadoEm: new Date().toISOString(),
      origem: 'apis-oficiais',
      dados: destaques,
    });
  }

  const resultados = await searchCandidatos(query);

  return NextResponse.json({
    atualizadoEm: new Date().toISOString(),
    origem: 'apis-oficiais',
    dados: resultados,
  });
}
