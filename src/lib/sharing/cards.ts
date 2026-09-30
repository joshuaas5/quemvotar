import { carregarFotoArquivoTse } from '@/lib/candidatos/foto-arquivo';

export interface CardRow { label: string; title: string; detail: string; value: string; photoUrls?: string[] }
export interface ShareCard { title: string; subtitle: string; rows: CardRow[]; notes: string[]; path: string }

/** Only same-origin assets are drawn, so downloads never taint the canvas. */
export async function carregarFotoCartao(sources: string[]): Promise<HTMLImageElement> {
  for (const source of sources) {
    const url = new URL(source, window.location.href);
    if (url.origin !== window.location.origin) continue;
    try {
      return await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        const timer = setTimeout(() => { image.onload = null; image.onerror = null; reject(new Error('timeout')); }, 25_000);
        image.onload = () => { clearTimeout(timer); image.onload = null; image.onerror = null; if (image.naturalWidth) resolve(image); else reject(new Error('empty')); };
        image.onerror = () => { clearTimeout(timer); image.onload = null; image.onerror = null; reject(new Error('image')); };
        image.src = url.href;
      });
    } catch { /* Try the next real, same-origin source. */ }
  }
  // The official static archive also works in the browser if the server is unavailable.
  const proxy = sources.map((source) => new URL(source, window.location.href)).find((url) => url.origin === window.location.origin && url.pathname === '/api/fontes/tse/foto' && url.searchParams.get('sqEleicao') === '20322002026');
  if (proxy) {
    const blob = await carregarFotoArquivoTse(proxy.searchParams.get('uf') ?? '', Number(proxy.searchParams.get('id')));
    const url = URL.createObjectURL(blob);
    try { return await carregarFotoCartao([url]); }
    finally { URL.revokeObjectURL(url); }
  }
  throw new Error('Foto indisponível');
}

export function desenharRetrato(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale, sourceHeight = height / scale;
  ctx.drawImage(image, (image.naturalWidth - sourceWidth) / 2, 0, sourceWidth, sourceHeight, x, y, width, height);
}

/** Rendered locally: vote choices and quiz answers never go to an image service. */
export async function criarCartao(card: ShareCard): Promise<Blob> {
  await document.fonts.ready;
  const photos = await Promise.all(card.rows.map(async (row) => {
    if (!row.photoUrls?.length) return null;
    try { return await carregarFotoCartao(row.photoUrls); }
    catch { throw new Error(`A foto de ${row.title} não carregou. Tente baixar novamente em alguns instantes.`); }
  }));
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 490 + card.rows.length * 160 + card.notes.length * 38;
  const ctx = canvas.getContext('2d');
  const font = getComputedStyle(document.body).getPropertyValue('--font-space-grotesk').trim() || 'Arial, sans-serif';
  if (!ctx) throw new Error('Seu navegador não permite criar imagens. Use a impressão.');
  ctx.fillStyle = '#f5f6f7'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  const text = (value: string, x: number, y: number, size: number, maxWidth = 940, color = '#111') => {
    ctx.fillStyle = color;
    ctx.font = `800 ${size}px ${font}`;
    while (ctx.measureText(value).width > maxWidth && size > 18) {
      size -= 1; ctx.font = `800 ${size}px ${font}`;
    }
    ctx.fillText(value, x, y, maxWidth);
  };
  ctx.fillStyle = '#ffd709'; ctx.fillRect(0, 0, 1080, 270);
  text('QUEM VOTAR.', 60, 78, 34);
  text(card.title, 60, 160, 62);
  text(card.subtitle, 60, 220, 26);
  card.rows.forEach((row, index) => {
    const y = 305 + index * 160;
    ctx.fillStyle = '#111'; ctx.fillRect(68, y + 8, 948, 140);
    ctx.fillStyle = '#fff'; ctx.fillRect(60, y, 948, 140);
    ctx.strokeStyle = '#111'; ctx.lineWidth = 4; ctx.strokeRect(60, y, 948, 140);
    const photo = photos[index];
    if (photo) desenharRetrato(ctx, photo, 76, y + 12, 92, 116);
    const x = photo ? 188 : 82, availableWidth = photo ? 510 : 610;
    text(row.label.toUpperCase(), x, y + 30, 20, availableWidth);
    text(row.title, x, y + 78, 34, availableWidth);
    text(row.detail, x, y + 112, 21, availableWidth, '#444');
    text(row.value, 730, y + 88, 52, 254);
  });
  const bottom = 345 + card.rows.length * 160;
  card.notes.forEach((note, index) => text(note, 60, bottom + index * 38, 21));
  text(`quemvotar.com.br${card.path}`, 60, canvas.height - 50, 28);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Não foi possível criar a imagem.')), 'image/png'));
}

export function baixarCartao(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename;
  document.body.appendChild(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export async function compartilharCartao(blob: Blob, filename: string, title: string) {
  const file = new File([blob], filename, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title }); return 'shared'; }
    catch (error) { if (error instanceof Error && error.name === 'AbortError') return 'cancelled'; }
  }
  baixarCartao(blob, filename); return 'downloaded';
}
