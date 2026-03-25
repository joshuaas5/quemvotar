import { NextResponse } from 'next/server';
import { getOfficialSourceStatus, getTseDatasets } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [fontes, tseDatasets] = await Promise.all([
    getOfficialSourceStatus(),
    getTseDatasets(3),
  ]);

  return NextResponse.json({
    atualizadoEm: new Date().toISOString(),
    fontes,
    tse: tseDatasets,
  });
}
