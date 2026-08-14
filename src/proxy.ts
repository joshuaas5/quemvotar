import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { REMOVED_GUIDE_SLUGS } from '@/lib/guides';

/**
 * Fase 1 do plano de correcao AdSense: os 18 guias cortados saem do ar com
 * status 410 Gone. Diferente do 404, o 410 sinaliza remocao deliberada ao
 * Google: manter artigo fraco publicado e pior do que nao ter artigo.
 *
 * Nota (Next.js 16): middleware foi renomeado para proxy. Este arquivo roda
 * antes do roteamento e responde diretamente com 410 para os slugs removidos.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = /^\/guias\/([^/]+)\/?$/.exec(pathname);
  if (match && REMOVED_GUIDE_SLUGS.includes(match[1])) {
    return new NextResponse('Guia removido.', {
      status: 410,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/guias/:path*',
};
