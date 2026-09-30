import { afterEach, expect, it, vi } from 'vitest';
import { printCartao } from './print';

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.replaceChildren(); });

it('imprime só a imagem em um documento sem publicidade e limpa o frame depois', async () => {
  const revoke = vi.fn();
  class TestURL extends URL {
    static createObjectURL = vi.fn(() => 'blob:cola');
    static revokeObjectURL = revoke;
  }
  vi.stubGlobal('URL', TestURL);
  const parentPrint = vi.spyOn(window, 'print').mockImplementation(() => {});
  const advertisement = document.createElement('div');
  advertisement.dataset.advertisement = '';
  document.body.appendChild(advertisement);
  const printing = printCartao(new Blob(['cola'], { type: 'image/png' }));
  const frame = document.querySelector('iframe')!;
  const child = frame.contentWindow!;
  const childPrint = vi.spyOn(child, 'print').mockImplementation(() => {});
  vi.spyOn(child, 'focus').mockImplementation(() => {});
  const image = frame.contentDocument!.querySelector('img')!;
  expect(childPrint).not.toHaveBeenCalled();
  image.dispatchEvent(new Event('load'));
  await printing;
  expect(childPrint).toHaveBeenCalledOnce();
  expect(parentPrint).not.toHaveBeenCalled();
  expect(image.src).toBe('blob:cola');
  expect(frame.contentDocument!.querySelectorAll('script, iframe, [data-advertisement]')).toHaveLength(0);
  expect(advertisement.isConnected).toBe(true);
  child.dispatchEvent(new Event('afterprint'));
  expect(frame.isConnected).toBe(false);
  expect(revoke).toHaveBeenCalledWith('blob:cola');
});
