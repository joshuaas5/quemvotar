import { NextResponse } from 'next/server';
import { getOfficialSourceStatus, getTseDatasets } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [fontes, tseDatasets] = await Promise.all([
      getOfficialSourceStatus(),
      getTseDatasets(3),
    ]);

    return NextResponse.json({
      atualizadoEm: new Date().toISOString(),
      fontes,
      tse: tseDatasets,
    });
  } catch (error) {
    console.error('[API /fontes] Error:', error);
    return NextResponse.json(
      {
        error: 'Não foi possível consultar as fontes de dados no momento. Tente novamente mais tarde.',
        atualizadoEm: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
