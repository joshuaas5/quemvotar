import { NextRequest, NextResponse } from 'next/server';
import { listarCandidatos } from '@/lib/candidatos/tse';
import { CARGO_CODIGOS } from '@/lib/candidatos/types';

export const dynamic = 'force-dynamic';

/**
 * GET /api/fontes/tse/candidatos?ano=2026&uf=PR&cargo=6&sqEleicao=20322002026
 * Lista oficial de candidatos do DivulgaCandContas (TSE).
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const ano = Number(params.get('ano') ?? '2026');
  const uf = (params.get('uf') ?? 'BR').toUpperCase();
  const cargoCodigo = Number(params.get('cargo') ?? '');
  const sqEleicaoParam = params.get('sqEleicao');
  const sqEleicao = sqEleicaoParam ? Number(sqEleicaoParam) : null;

  if (!Number.isFinite(ano) || !CARGO_CODIGOS[cargoCodigo]) {
    return NextResponse.json(
      { erro: 'Parâmetros inválidos. Use ano, uf e cargo (1,3,5,6,7,8).' },
      { status: 400 },
    );
  }

  try {
    const resultado = await listarCandidatos(ano, uf, cargoCodigo, sqEleicao);
    return NextResponse.json({
      origem: 'tse-divulgacandcontas',
      fonteUrl: 'https://divulgacandcontas.tse.jus.br/divulga/',
      ...resultado,
    });
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : 'Falha desconhecida';
    return NextResponse.json({ erro: mensagem }, { status: 502 });
  }
}
