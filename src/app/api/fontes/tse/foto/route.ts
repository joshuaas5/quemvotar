import { NextRequest, NextResponse } from 'next/server';
import { TSE_SITE_BASE } from '@/lib/candidatos/urls';

// NOTA: `sharp` é importado LAZY (dentro da rota) para que, se o binário
// nativo falhar no ambiente de deploy, a rota não derrube 100% nas 500.
// Sem import estático no topo.

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

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

  if (!Number.isSafeInteger(sqEleicao) || sqEleicao <= 0 || !Number.isSafeInteger(id) || id <= 0 || !/^(BR|AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/.test(uf)) {
    return NextResponse.json({ erro: 'Parâmetros inválidos. Use sqEleicao, id e uf.' }, { status: 400 });
  }

  let urlTse = `${TSE_SITE_BASE}/divulga/rest/arquivo/img/${sqEleicao}/${id}/${uf}`;
  const alta = params.get('alta');
  if (alta) {
    try {
      const url = new URL(alta);
      const camera = url.hostname === 'www.camara.leg.br' && /^\/internet\/deputado\/bandep\/pagina_do_deputado\/\d+\.jpg$/.test(url.pathname);
      const senate = url.hostname === 'legis.senado.leg.br' && /^\/senadores\/fotos-oficiais\/\d+$/.test(url.pathname);
      if (url.protocol !== 'https:' || url.port || url.username || url.password || url.search || url.hash || !(camera || senate)) throw new Error('source');
      urlTse = url.href;
    } catch { return NextResponse.json({ erro: 'Fonte de foto inválida.' }, { status: 400 }); }
  }

  try {
    // Timeout rígido: o TSE é instável e um upstream travado NÃO pode segurar o
    // servidor (foi o que derrubou fotos e até o manifest.json em rajada).
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);

    let response: Response;
    try {
      response = await fetch(urlTse, {
        headers: { 'User-Agent': 'QuemVotar/1.0 (proxy de imagem oficial do TSE)' },
        signal: controller.signal,
        next: { revalidate: 86400 },
        cache: 'force-cache',
        redirect: 'error',
      });
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) {
      // Só uma ausência real pode ser cacheada como foto inexistente.
      // Bloqueio/indisponibilidade do upstream não significa ausência da foto.
      return new NextResponse(null, {
        status: response.status === 404 ? 404 : 502,
        headers: { 'Cache-Control': response.status === 404 ? 'public, max-age=600, s-maxage=600' : 'no-store', 'X-Foto-Erro': `upstream-${response.status}` },
      });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') ?? 'image/jpeg';
    if (!contentType.toLowerCase().startsWith('image/') || buffer.length === 0) {
      return new NextResponse(null, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    }

    let saida = buffer;
    let tipoFinal = contentType;

    try {
      // Lazy: sharp só é carregado aqui (fallback p/ imagem original se falhar)
      const sharp = (await import('sharp')).default;
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
              height: metadados.height ? Math.round(metadados.height * fator) : undefined,
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
      // se o sharp falhar (formato inesperado/binário), entrega a imagem original
    }

    return new NextResponse(saida, {
      status: 200,
      headers: {
        'Content-Type': tipoFinal,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
        'X-Origem': alta ? 'parlamento-foto-oficial' : 'tse-divulgacandcontas',
        'X-Foto-Melhorada': saida.length !== buffer.length ? '1' : '0',
      },
    });
  } catch (error) {
    // Falha de rede/timeout: permite nova tentativa e o fallback oficial no cliente.
    return new NextResponse(null, {
      status: 502,
      headers: { 'Cache-Control': 'no-store', 'X-Foto-Erro': error instanceof Error && error.name === 'AbortError' ? 'timeout' : 'network' },
    });
  }
}
