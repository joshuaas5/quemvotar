/** Official public photo archives; HTTP ranges avoid downloading a whole state. */
interface ZipEntry { offset: number; size: number; method: number; name: string }
interface ZipIndex { url: string; total: number; entries: Map<string, ZipEntry>; full?: Uint8Array }
const indexes = new Map<string, { expires: number; promise: Promise<ZipIndex> }>();
const ufs = /^(BR|AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/;

async function range(url: string, value: string) {
  const response = await fetch(url, { headers: value ? { Range: value } : undefined, credentials: 'omit', signal: AbortSignal.timeout(15_000) });
  if (response.status !== 200 && response.status !== 206) throw new Error('Arquivo de fotos indisponível');
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length > 64_000_000) throw new Error('Arquivo de fotos muito grande');
  if (response.status === 200) return { bytes, start: 0, total: bytes.length, full: true };
  const match = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(response.headers.get('Content-Range') ?? '');
  // Content-Range may be hidden by CORS in a browser; the official ZIP itself allows CORS.
  if (!match) return range(url, '');
  if (Number(match[2]) - Number(match[1]) + 1 !== bytes.length) throw new Error('Faixa de fotos inválida');
  return { bytes, start: Number(match[1]), total: Number(match[3]), full: false };
}

async function loadIndex(uf: string): Promise<ZipIndex> {
  const url = `https://cdn.tse.jus.br/estatistica/sead/eleicoes/eleicoes2026/fotos/foto_cand2026_${uf}_div.zip`;
  const tail = await range(url, 'bytes=-65557');
  const view = new DataView(tail.bytes.buffer, tail.bytes.byteOffset, tail.bytes.byteLength);
  let end = tail.bytes.length - 22;
  while (end >= 0 && view.getUint32(end, true) !== 0x06054b50) end--;
  if (end < 0) throw new Error('Índice de fotos não encontrado');
  const size = view.getUint32(end + 12, true), offset = view.getUint32(end + 16, true);
  if (size > 4_000_000 || offset + size > tail.total) throw new Error('Índice de fotos inválido');
  const directory = offset >= tail.start && offset + size <= tail.start + tail.bytes.length
    ? { ...tail, bytes: tail.bytes.subarray(offset - tail.start, offset - tail.start + size) }
    : await range(url, `bytes=${offset}-${offset + size - 1}`);
  const bytes = directory.full && directory.bytes.length === directory.total
    ? directory.bytes.subarray(offset, offset + size) : directory.bytes;
  const data = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const entries = new Map<string, ZipEntry>();
  for (let at = 0; at + 46 <= bytes.length;) {
    if (data.getUint32(at, true) !== 0x02014b50) throw new Error('Entrada de foto inválida');
    const nameLength = data.getUint16(at + 28, true), extra = data.getUint16(at + 30, true), comment = data.getUint16(at + 32, true);
    if (at + 46 + nameLength + extra + comment > bytes.length) throw new Error('Índice incompleto');
    const name = new TextDecoder().decode(bytes.subarray(at + 46, at + 46 + nameLength));
    entries.set(name, { name, method: data.getUint16(at + 10, true), size: data.getUint32(at + 20, true), offset: data.getUint32(at + 42, true) });
    at += 46 + nameLength + extra + comment;
  }
  return { url, total: tail.total, entries, full: tail.full ? tail.bytes : directory.full ? directory.bytes : undefined };
}

export async function carregarFotoArquivoTse(uf: string, id: number): Promise<Blob> {
  if (!ufs.test(uf) || !Number.isSafeInteger(id) || id <= 0) throw new Error('Candidato inválido');
  let cached = indexes.get(uf);
  if (!cached || cached.expires < Date.now()) {
    const promise = loadIndex(uf);
    cached = { expires: Date.now() + 3_600_000, promise };
    indexes.set(uf, cached);
    promise.catch(() => { if (indexes.get(uf)?.promise === promise) indexes.delete(uf); });
    if (indexes.size > 4) indexes.delete(indexes.keys().next().value!);
  }
  const index = await cached.promise;
  const entry = index.entries.get(`F${uf}${id}_div.jpg`);
  if (!entry || entry.size > 2_000_000) throw new Error('Foto não encontrada no arquivo oficial');
  const part = index.full ? null : await range(index.url, `bytes=${entry.offset}-${Math.min(index.total - 1, entry.offset + 30 + entry.name.length + 4096 + entry.size - 1)}`);
  const block = index.full ? index.full.subarray(entry.offset) : part!.bytes.subarray(entry.offset - part!.start);
  const data = new DataView(block.buffer, block.byteOffset, block.byteLength);
  if (block.length < 30 || data.getUint32(0, true) !== 0x04034b50) throw new Error('Foto inválida');
  const start = 30 + data.getUint16(26, true) + data.getUint16(28, true);
  if (start + entry.size > block.length) throw new Error('Foto incompleta');
  const photo = block.slice(start, start + entry.size);
  if (entry.method === 0) return new Blob([photo], { type: 'image/jpeg' });
  if (entry.method === 8) {
    const stream = new Blob([photo]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Blob([await new Response(stream).arrayBuffer()], { type: 'image/jpeg' });
  }
  throw new Error('Formato de foto não suportado');
}
