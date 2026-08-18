import { NextRequest, NextResponse } from 'next/server';
import { TSE_SITE_BASE } from '@/lib/candidatos/urls';

export const dynamic = 'force-dynamic';

/**
 * GET /api/fontes/tse/foto?sqEleicao=20322002026&id=160002547661&uf=PR
 *
 * Proxy das fotos oficiais do DivulgaCandContas (TSE).
 * O proxy evita bloqueio de hotlink e centraliza o cache:
 * a foto do TSE muda apenas quando o candidato atualiza o registro.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const sqEleicao = Number(params.get('sqEleicao') ?? '');
  const id = Number(params.get('id') ?? '');
  const uf = (params.get('uf') ?? '').toUpperCase();

  if (!Number.isFinite(sqEleicao) || !Number.isFinite(id) || !uf) {
    return NextResponse.json({ erro: 'Parâmetros inválidos. Use sqEleicao, id e uf.' }, { status: 400 });
  }

  const urlTse = `${TSE_SITE_BASE}/divulga/rest/arquivo/img/${sqEleicao}/${id}/${uf}`;

  try {
    const response = await fetch(urlTse, {
      headers: { 'User-Agent': 'QuemVotar/1.0 (proxy de imagem oficial do TSE)' },
      next: { revalidate: 86400 },
      cache: 'force-cache',
    });

    if (!response.ok) {
      return NextResponse.json({ erro: `Foto indisponível (TSE HTTP ${response.status}).` }, { status: 404 });
    }

    const contentType = response.headers.get('content-type') ?? 'image/jpeg';
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
        'X-Origem': 'tse-divulgacandcontas',
      },
    });
  } catch {
    return NextResponse.json({ erro: 'Falha ao buscar a foto no TSE.' }, { status: 502 });
  }
}
