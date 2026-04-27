import { describe, it, expect } from 'vitest';
import { calculateNolanChart, calculateMatchScoreDetailed } from './calculator';

describe('calculateNolanChart', () => {
  it('retorna Centro quando nenhuma resposta', () => {
    const result = calculateNolanChart({});
    expect(result.label).toBe('Centro');
    expect(result.econPercent).toBe(50);
    expect(result.personalPercent).toBe(50);
  });

  it('classifica como Liberalismo/Libertario (alta liberdade em ambos)', () => {
    const answers = {
      pvt: { score: 5, weight: 1 },
      impostos: { score: 1, weight: 1 },
      clt: { score: 5, weight: 1 },
      agr: { score: 5, weight: 1 },
      drogas: { score: 5, weight: 1 },
      armas: { score: 5, weight: 1 },
      abor: { score: 5, weight: 1 },
      religiao: { score: 1, weight: 1 },
    };
    const result = calculateNolanChart(answers);
    expect(result.label).toBe('Liberalismo / Libertário');
    expect(result.econPercent).toBeGreaterThan(50);
    expect(result.personalPercent).toBeGreaterThan(50);
  });

  it('classifica como Conservador (alta econ, baixa pessoal)', () => {
    const answers = {
      pvt: { score: 5, weight: 1 },
      impostos: { score: 1, weight: 1 },
      clt: { score: 5, weight: 1 },
      agr: { score: 5, weight: 1 },
      drogas: { score: 1, weight: 1 },
      armas: { score: 1, weight: 1 },
      abor: { score: 1, weight: 1 },
      religiao: { score: 5, weight: 1 },
    };
    const result = calculateNolanChart(answers);
    expect(result.label).toBe('Conservador');
    expect(result.econPercent).toBeGreaterThan(50);
    expect(result.personalPercent).toBeLessThanOrEqual(50);
  });

  it('classifica como Progressista/Esquerda (baixa econ, alta pessoal)', () => {
    const answers = {
      pvt: { score: 1, weight: 1 },
      impostos: { score: 5, weight: 1 },
      clt: { score: 1, weight: 1 },
      agr: { score: 1, weight: 1 },
      drogas: { score: 5, weight: 1 },
      armas: { score: 5, weight: 1 },
      abor: { score: 5, weight: 1 },
      religiao: { score: 1, weight: 1 },
    };
    const result = calculateNolanChart(answers);
    expect(result.label).toBe('Progressista / Esquerda');
    expect(result.econPercent).toBeLessThanOrEqual(50);
    expect(result.personalPercent).toBeGreaterThan(50);
  });

  it('classifica como Estatista/Populista (baixa em ambos)', () => {
    const answers = {
      pvt: { score: 1, weight: 1 },
      impostos: { score: 5, weight: 1 },
      clt: { score: 1, weight: 1 },
      agr: { score: 1, weight: 1 },
      drogas: { score: 1, weight: 1 },
      armas: { score: 1, weight: 1 },
      abor: { score: 1, weight: 1 },
      religiao: { score: 5, weight: 1 },
    };
    const result = calculateNolanChart(answers);
    expect(result.label).toBe('Estatista / Populista');
    expect(result.econPercent).toBeLessThanOrEqual(50);
    expect(result.personalPercent).toBeLessThanOrEqual(50);
  });
});

describe('calculateMatchScoreDetailed', () => {
  it('retorna 0 quando nenhuma resposta', () => {
    const score = calculateMatchScoreDetailed({}, '123', 'PT', null);
    expect(score).toBe(0);
  });

  it('retorna score entre 0 e 100', () => {
    const answers = {
      pvt: { score: 3, weight: 2 },
      impostos: { score: 3, weight: 2 },
      clt: { score: 3, weight: 2 },
      agr: { score: 3, weight: 2 },
      drogas: { score: 3, weight: 2 },
      armas: { score: 3, weight: 2 },
      abor: { score: 3, weight: 2 },
      religiao: { score: 3, weight: 2 },
    };
    const score = calculateMatchScoreDetailed(answers, '123', 'PT', null);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('score muda com partido diferente', () => {
    const answers = {
      pvt: { score: 5, weight: 1 },
      impostos: { score: 1, weight: 1 },
    };
    const scorePT = calculateMatchScoreDetailed(answers, '123', 'PT', null);
    const scorePL = calculateMatchScoreDetailed(answers, '123', 'PL', null);
    expect(scorePT).not.toBe(scorePL);
  });
});
