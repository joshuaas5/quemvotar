import { afterEach, expect, it, vi } from 'vitest';

function archive() {
  const chunks: Uint8Array[] = [], central: Uint8Array[] = [];
  let offset = 0;
  for (const [id, photo] of [[11, [255, 216, 1]], [22, [255, 216, 2]]] as const) {
    const name = new TextEncoder().encode(`FSC${id}_div.jpg`);
    const local = new Uint8Array(30 + name.length + photo.length), header = new DataView(local.buffer);
    header.setUint32(0, 0x04034b50, true); header.setUint32(18, photo.length, true); header.setUint32(22, photo.length, true); header.setUint16(26, name.length, true);
    local.set(name, 30); local.set(photo, 30 + name.length);
    const entry = new Uint8Array(46 + name.length), data = new DataView(entry.buffer);
    data.setUint32(0, 0x02014b50, true); data.setUint32(20, photo.length, true); data.setUint32(24, photo.length, true); data.setUint16(28, name.length, true); data.setUint32(42, offset, true); entry.set(name, 46);
    chunks.push(local); central.push(entry); offset += local.length;
  }
  const end = new Uint8Array(22), footer = new DataView(end.buffer);
  footer.setUint32(0, 0x06054b50, true); footer.setUint32(12, central.reduce((n, x) => n + x.length, 0), true); footer.setUint32(16, offset, true);
  const all = [...chunks, ...central, end];
  const bytes = new Uint8Array(all.reduce((n, x) => n + x.length, 0)); let at = 0;
  for (const part of all) { bytes.set(part, at); at += part.length; }
  return bytes;
}

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });

for (const mode of ['range', 'full', 'cors'] as const) {
  it(`extrai somente o retrato solicitado quando o CDN responde ${mode}`, async () => {
    const bytes = archive();
    const fetch = vi.fn(async (_url: string, options?: RequestInit) => {
      const requested = (options?.headers as Record<string, string> | undefined)?.Range;
      if (mode === 'full' || !requested) return new Response(bytes, { status: 200 });
      const suffix = requested.startsWith('bytes=-');
      const [start, end] = suffix ? [Math.max(0, bytes.length - Number(requested.slice(7))), bytes.length - 1] : requested.slice(6).split('-').map(Number);
      const headers: Record<string, string> = mode === 'cors' ? {} : { 'Content-Range': `bytes ${start}-${Math.min(end, bytes.length - 1)}/${bytes.length}` };
      return new Response(bytes.slice(start, end + 1), { status: 206, headers });
    });
    vi.stubGlobal('fetch', fetch);
    const { carregarFotoArquivoTse } = await import('./foto-arquivo');
    const photo = await carregarFotoArquivoTse('SC', 22);
    expect(photo.type).toBe('image/jpeg');
    expect(Array.from(new Uint8Array(await photo.arrayBuffer()))).toEqual([255, 216, 2]);
    await expect(carregarFotoArquivoTse('SC', 33)).rejects.toThrow('Foto não encontrada');
    expect(fetch.mock.calls.every(([url]) => url.startsWith('https://cdn.tse.jus.br/'))).toBe(true);
  });
}

it('rejeita UF e identificador inválidos antes de qualquer requisição', async () => {
  const fetch = vi.fn(); vi.stubGlobal('fetch', fetch);
  const { carregarFotoArquivoTse } = await import('./foto-arquivo');
  await expect(carregarFotoArquivoTse('../SC', 22)).rejects.toThrow('Candidato inválido');
  await expect(carregarFotoArquivoTse('SC', -1)).rejects.toThrow('Candidato inválido');
  expect(fetch).not.toHaveBeenCalled();
});
