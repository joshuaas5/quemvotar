import { NextRequest, NextResponse } from 'next/server';
import { UF_LISTA } from '@/lib/candidatos/ufs';
import { consultarResultados } from '@/lib/resultados/tse';

export async function GET(request: NextRequest) {
  const uf = (request.nextUrl.searchParams.get('uf') ?? 'BR').toUpperCase();
  const cargo = Number(request.nextUrl.searchParams.get('cargo') ?? '1');
  const turno = Number(request.nextUrl.searchParams.get('turno') ?? '1');
  if (!['BR', ...UF_LISTA.map((u) => u.sigla)].includes(uf) || ![1, 3, 5, 6, 7, 8].includes(cargo)
      || ![1, 2].includes(turno) || (cargo !== 1 && uf === 'BR') || (turno === 2 && ![1, 3].includes(cargo))
      || (cargo === 8 && uf !== 'DF') || (cargo === 7 && uf === 'DF')) {
    return NextResponse.json({ erro: 'Escolha um estado, cargo e turno válidos.' }, { status: 400 });
  }
  const data = await consultarResultados(uf, cargo, turno as 1 | 2);
  return NextResponse.json(data, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' } });
}
