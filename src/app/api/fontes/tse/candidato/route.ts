import { NextRequest, NextResponse } from 'next/server';
import { buscarCandidato, normalizarCandidatoDetalhe } from '@/lib/candidatos/tse';

export const dynamic = 'force-dynamic';

/**
 * GET /api/fontes/tse/candidato?ano=2026&uf=PR&id=160002547661&sqEleicao=20322002026
 * Perfil completo de um candidato (DivulgaCandContas — TSE).
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const ano = Number(params.get('ano') ?? '2026');
  const uf = (params.get('uf') ?? 'BR').toUpperCase();
  const id = Number(params.get('id') ?? '');
  const sqEleicaoParam = params.get('sqEleicao');
  const sqEleicao = sqEleicaoParam ? Number(sqEleicaoParam) : null;

  if (!Number.isFinite(ano) || !Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ erro: 'Parâmetros inválidos. Use ano, uf e id.' }, { status: 400 });
  }

  try {
    const bruto = await buscarCandidato(ano, uf, id, sqEleicao);
    if (!bruto) {
      return NextResponse.json({ erro: 'Candidato não encontrado no TSE.' }, { status: 404 });
    }
    const eleicaoId = bruto.eleicao?.id ?? sqEleicao ?? (await import('@/lib/candidatos/tse')).ELEICAO_2026.sqEleicao;
    const candidato = await normalizarCandidatoDetalhe(bruto, ano, eleicaoId, uf);
    return NextResponse.json({
      origem: 'tse-divulgacandcontas',
      ...candidato,
    });
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : 'Falha desconhecida';
    return NextResponse.json({ erro: mensagem }, { status: 502 });
  }
}
