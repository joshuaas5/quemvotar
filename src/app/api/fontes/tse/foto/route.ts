import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { TSE_SITE_BASE } from '@/lib/candidatos/urls';

export const dynamic = 'force-dynamic';

/**
 * GET /api/fontes/tse/foto?sqEleicao=20322002026&id=160002547661&uf=PR
 *
 * Proxy das fotos oficiais do DivulgaCandContas (TSE) com MELHORIA de
 * qualidade: o TSE entrega uma miniatura de ~161x225px; este proxy faz
 * upscale + nitidez (lanczos3) de forma consistente e com cache longo,
 * evitando hotlink e o borrão do redimensionamento feito pelo navegador.
 * Se a imagem for maior que o alvo (Câmara/Senado não passam por aqui),
 * mantém o tamanho original.
 */
const TARGET_LARGURA = 600; // largura máxima após melhoria

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

    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') ?? 'image/jpeg';

    let saida = buffer;
    let tipoFinal = contentType;

    try {
      const imagem = sharp(buffer);
      const metadados = await imagem.metadata();

      // só melhora imagens raster menores que o alvo (TSE é ~161x225)
      if (metadados.format && ['jpeg', 'png', 'webp'].includes(metadados.format)) {
        const largura = metadados.width ?? 0;
        if (largura > 0 && largura < TARGET_LARGURA) {
          const fator = Math.min(3, TARGET_LARGURA / largura);
          saida = await imagem
            .rotate()
            .resize({
              width: Math.round(largura * fator),
              height: metadados.height ? Math.round((metadados.height * fator)) : undefined,
              fit: 'inside',
              kernel: sharp.kernel.lanczos3,
            })
            .sharpen({ sigma: 1.1, m1: 1.6 })
            .jpeg({ quality: 84 })
            .toBuffer();
          tipoFinal = 'image/jpeg';
        }
      }
    } catch {
      // se o sharp falhar (formato inesperado), entrega a imagem original
    }

    return new NextResponse(saida, {
      status: 200,
      headers: {
        'Content-Type': tipoFinal,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
        'X-Origem': 'tse-divulgacandcontas',
        'X-Foto-Melhorada': saida.length !== buffer.length ? '1' : '0',
      },
    });
  } catch {
    return NextResponse.json({ erro: 'Falha ao buscar a foto no TSE.' }, { status: 502 });
  }
}
