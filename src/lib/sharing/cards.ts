export interface CardRow { label: string; title: string; detail: string; value: string }
export interface ShareCard { title: string; subtitle: string; rows: CardRow[]; notes: string[]; path: string }

/** Rendered locally: vote choices and quiz answers never go to an image service. */
export async function criarCartao(card: ShareCard): Promise<Blob> {
  await document.fonts.ready;
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
    text(row.label.toUpperCase(), 82, y + 30, 20, 610);
    text(row.title, 82, y + 78, 34, 610);
    text(row.detail, 82, y + 112, 21, 610, '#444');
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
