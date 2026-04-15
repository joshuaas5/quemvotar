import { describe, it, expect } from 'vitest';
import { calculateMatchScore } from './calculator';

describe('Match Engine Calculator (Fase 1)', () => {
  it('deve retornar 100% quando tudo bater (pesos iguais)', () => {
    const user = { temaA: { vote: 'SIM', weight: 1 } };
    const pol = { temaA: 'SIM' };
    expect(calculateMatchScore(user, pol)).toBe(100);
  });

  it('deve dar peso maior para temas importantes', () => {
    const user = {
      temaA: { vote: 'SIM', weight: 2 }, // Peso 2, político vai votar 'NAO' (Errou)
      temaB: { vote: 'NAO', weight: 1 }  // Peso 1, político vai votar 'NAO' (Acertou)
    };
    const pol = { temaA: 'NAO', temaB: 'NAO' };
    // Cálculo: Acertou peso 1, Errou peso 2. Total peso = 3. Fez 1 ponto. (1/3) * 100 = 33.33%
    expect(calculateMatchScore(user, pol)).toBeCloseTo(33.33, 2);
  });

  it('deve pontuar 0 no tema se o político esteve AUSENTE ou em OBSTRUÇÃO', () => {
    const user = { temaA: { vote: 'SIM', weight: 1 } };
    const pol = { temaA: 'AUSENTE' };
    expect(calculateMatchScore(user, pol)).toBe(0);
  });

  it('deve retornar 0 se o político não tiver voto registrado na base', () => {
    const user = { temaA: { vote: 'SIM', weight: 1 } };
    const pol = {};
    expect(calculateMatchScore(user, pol)).toBe(0);
  });
});
