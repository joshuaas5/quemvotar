import { describe, it, expect } from 'vitest';
import { decodeMojibake, decodeObjMojibake } from './string';
import {
  getHighQualityCamaraPhotoUrl,
  upgradeCamaraPhotoUrl,
  getHighQualitySenadoPhotoUrl,
  improveProfilePhotoUrl,
  normalizeRemoteImageUrl,
} from './profile-image';

describe('decodeMojibake', () => {
  it('returns empty string for null/undefined', () => {
    expect(decodeMojibake(null)).toBe('');
    expect(decodeMojibake(undefined)).toBe('');
    expect(decodeMojibake('')).toBe('');
  });

  it('decodes common mojibake characters', () => {
    expect(decodeMojibake('JosÃ©')).toBe('José');
    expect(decodeMojibake('SÃ£o Paulo')).toBe('São Paulo');
    expect(decodeMojibake('Ã§Ã£o')).toBe('ção');
  });

  it('returns original string if no mojibake detected', () => {
    expect(decodeMojibake('Normal text')).toBe('Normal text');
    expect(decodeMojibake('Câmara dos Deputados')).toBe('Câmara dos Deputados');
  });
});

describe('decodeObjMojibake', () => {
  it('decodes all string fields in an object', () => {
    const input = {
      nome: 'JosÃ©',
      cidade: 'SÃ£o Paulo',
      idade: 30,
    };
    const result = decodeObjMojibake(input);
    expect(result.nome).toBe('José');
    expect(result.cidade).toBe('São Paulo');
    expect(result.idade).toBe(30);
  });
});

describe('profile-image utilities', () => {
  describe('getHighQualityCamaraPhotoUrl', () => {
    it('generates correct high-quality URL from numeric ID', () => {
      expect(getHighQualityCamaraPhotoUrl('12345')).toBe(
        'https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/12345.jpg'
      );
    });

    it('returns empty string for invalid ID', () => {
      expect(getHighQualityCamaraPhotoUrl('')).toBe('');
      expect(getHighQualityCamaraPhotoUrl('abc')).toBe('');
    });
  });

  describe('upgradeCamaraPhotoUrl', () => {
    it('upgrades low-quality URL to high-quality', () => {
      const lowQuality = 'https://www.camara.leg.br/internet/deputado/bandep/12345.jpg';
      expect(upgradeCamaraPhotoUrl(lowQuality)).toBe(
        'https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/12345.jpg'
      );
    });

    it('returns empty string for null/undefined input', () => {
      expect(upgradeCamaraPhotoUrl(null)).toBe('');
      expect(upgradeCamaraPhotoUrl(undefined)).toBe('');
    });

    it('converts http to https', () => {
      const httpUrl = 'http://www.camara.leg.br/internet/deputado/bandep/12345.jpg';
      expect(upgradeCamaraPhotoUrl(httpUrl)).toContain('https://');
    });
  });

  describe('getHighQualitySenadoPhotoUrl', () => {
    it('generates correct senate photo URL', () => {
      expect(getHighQualitySenadoPhotoUrl('6789')).toBe(
        'https://www.senado.leg.br/senadores/img/fotos-oficiais/senador6789.jpg'
      );
    });

    it('returns empty string for invalid ID', () => {
      expect(getHighQualitySenadoPhotoUrl('')).toBe('');
    });
  });

  describe('improveProfilePhotoUrl', () => {
    it('prioritizes high-quality camera URL for camara source', () => {
      const result = improveProfilePhotoUrl('camara', '12345');
      expect(result).toContain('pagina_do_deputado');
    });

    it('falls back to upgrading current URL when ID fails', () => {
      const current = 'https://www.camara.leg.br/internet/deputado/bandep/12345.jpg';
      const result = improveProfilePhotoUrl('camara', 'invalid', current);
      expect(result).toContain('pagina_do_deputado');
    });

    it('uses senate URL for senado source', () => {
      const result = improveProfilePhotoUrl('senado', '6789');
      expect(result).toContain('senado.leg.br');
    });
  });

  describe('normalizeRemoteImageUrl', () => {
    it('converts http to https', () => {
      expect(normalizeRemoteImageUrl('http://example.com/img.jpg')).toBe('https://example.com/img.jpg');
    });

    it('returns empty string for null/undefined', () => {
      expect(normalizeRemoteImageUrl(null)).toBe('');
      expect(normalizeRemoteImageUrl(undefined)).toBe('');
    });
  });
});
