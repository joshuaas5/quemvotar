import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { carregarFotoCartao, criarCartao, desenharRetrato, type ShareCard } from './cards';
import { fotosParaExportar } from '@/lib/candidatos/foto-export';

const loaded: string[] = [];
class TestImage {
  naturalWidth = 100;
  naturalHeight = 200;
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  set src(value: string) {
    loaded.push(value);
    queueMicrotask(() => value.includes('missing') ? this.onerror?.() : this.onload?.());
  }
}

beforeEach(() => { loaded.length = 0; vi.stubGlobal('Image', TestImage); Object.defineProperty(document, 'fonts', { configurable: true, value: { ready: Promise.resolve() } }); });
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('cartão com fotos', () => {
  it('tenta outra foto real e rejeita URLs externas que contaminariam o canvas', async () => {
    await carregarFotoCartao(['https://external.example/photo.jpg', '/missing.jpg', '/portrait.jpg']);
    expect(loaded).toEqual([new URL('/missing.jpg', window.location.href).href, new URL('/portrait.jpg', window.location.href).href]);
  });

  it('desenha todos os retratos antes de gerar o PNG, mantendo números e nomes', async () => {
    const ctx = { fillRect: vi.fn(), strokeRect: vi.fn(), fillText: vi.fn(), measureText: vi.fn(() => ({ width: 100 })), drawImage: vi.fn() };
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
    const encode = vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback) => callback(new Blob(['png'], { type: 'image/png' })));
    const card: ShareCard = { title: 'COLA', subtitle: 'SC', path: '/minha-urna', notes: [], rows: [{ label: 'Presidente', title: 'Lula', detail: 'PT', value: '13', photoUrls: ['/images/candidatos/lula.png'] }, { label: 'Senador', title: 'Nome do candidato', detail: 'SC', value: '123', photoUrls: ['/portrait.jpg'] }] };
    const output = await criarCartao(card);
    expect(output.type).toBe('image/png');
    expect(ctx.drawImage).toHaveBeenCalledTimes(2);
    expect(ctx.fillText).toHaveBeenCalledWith('13', expect.any(Number), expect.any(Number), expect.any(Number));
    expect(ctx.drawImage.mock.invocationCallOrder.at(-1)!).toBeLessThan(encode.mock.invocationCallOrder[0]);
  });

  it('não baixa silenciosamente uma cola sem a foto escolhida', async () => {
    await expect(criarCartao({ title: 'COLA', subtitle: 'SC', path: '/minha-urna', notes: [], rows: [{ label: 'Senador', title: 'Maria', detail: 'SC', value: '123', photoUrls: ['/missing.jpg'] }] })).rejects.toThrow('A foto de Maria não carregou');
  });

  it('recorta na proporção do retrato, sem esticar o rosto', () => {
    const drawImage = vi.fn();
    desenharRetrato({ drawImage } as unknown as CanvasRenderingContext2D, { naturalWidth: 200, naturalHeight: 100 } as HTMLImageElement, 10, 20, 50, 100);
    expect(drawImage).toHaveBeenCalledWith(expect.anything(), 75, 0, 50, 100, 10, 20, 50, 100);
  });

  it('prioriza retratos locais de Lula e Flávio e usa proxy para outros candidatos', () => {
    expect(fotosParaExportar(20322002026, 280002542548, 'BR')[0]).toBe('/images/candidatos/lula.png');
    expect(fotosParaExportar(20322002026, 280002551544, 'BR')[0]).toBe('/images/candidatos/flavio-bolsonaro.jpg');
    expect(fotosParaExportar(20322002026, 123, 'SC')[0]).toContain('/api/fontes/tse/foto?');
  });
});
