import { describe, expect, it } from 'vitest';
import { getFotoAltaParlamentar } from './foto-alta';

describe('getFotoAltaParlamentar', () => {
  it('deputado federal → foto grande da Câmara', () => {
    const url = getFotoAltaParlamentar({ idOrigem: '220704', casa: 'Câmara dos Deputados' });
    expect(url).toBe('https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/220704.jpg');
  });

  it('senador → foto oficial grande do Senado', () => {
    const url = getFotoAltaParlamentar({ idOrigem: '6331', casa: 'Senado Federal' });
    expect(url).toBe('https://legis.senado.leg.br/senadores/fotos-oficiais/6331');
  });

  it('id com prefixo de letras extrai só os dígitos', () => {
    const url = getFotoAltaParlamentar({ idOrigem: 'deputado-220704', casa: 'Câmara dos Deputados' });
    expect(url).toContain('/220704.jpg');
  });

  it('id vazio → null (sem quebrar)', () => {
    expect(getFotoAltaParlamentar({ idOrigem: '', casa: 'Câmara dos Deputados' })).toBeNull();
    expect(getFotoAltaParlamentar({ idOrigem: 'abc', casa: 'Senado Federal' })).toBeNull();
  });
});
