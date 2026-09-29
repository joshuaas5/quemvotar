import { describe, expect, it, beforeEach } from 'vitest';
import {
  adicionarNaUrna,
  carregarMinhaUrna,
  limparMinhaUrna,
  votosPorCargo,
  faltamNaUrna,
  type MinhaUrnaItem,
} from './minha-urna';

function item(id: number, cargoCodigo: number): Omit<MinhaUrnaItem, 'eixo' | 'base' | 'baseLabel'> & { eixo?: string | null; base?: string; baseLabel?: string } {
  return { id, nomeUrna: `Candidato ${id}`, partido: 'PT', cargoCodigo, cargo: 'Senador', uf: 'PR', numero: 100 + id, eixo: 'esquerda', base: 'partido', baseLabel: 'Posição do partido' };
}

beforeEach(() => {
  if (typeof window !== 'undefined') window.localStorage.clear();
});

describe('regra eleitoral de votos por cargo', () => {
  it('2026 elege DOIS senadores por estado', () => {
    expect(votosPorCargo(5)).toBe(2);
  });

  it('demais cargos → 1 voto', () => {
    expect(votosPorCargo(1)).toBe(1);
    expect(votosPorCargo(3)).toBe(1);
    expect(votosPorCargo(6)).toBe(1);
    expect(votosPorCargo(7)).toBe(1);
  });

  it('permite escolher 2 senadores', () => {
    adicionarNaUrna(item(1, 5));
    adicionarNaUrna(item(2, 5));
    expect(carregarMinhaUrna().length).toBe(2);
  });

  it('bloqueia o 3º senador', () => {
    adicionarNaUrna(item(1, 5));
    adicionarNaUrna(item(2, 5));
    adicionarNaUrna(item(3, 5));
    expect(carregarMinhaUrna().length).toBe(2);
  });

  it('faltamNaUrna conta senador como 2 quando nenhum escolhido', () => {
    limparMinhaUrna();
    const faltando = faltamNaUrna(carregarMinhaUrna());
    const senador = faltando.find((c) => c.codigo === 5);
    expect(senador?.faltando).toBe(2);
  });
});

describe('cola eleitoral com vários cargos', () => {
  it('preserva as escolhas de outros cargos ao adicionar um novo candidato', () => {
    adicionarNaUrna(item(10, 1)); adicionarNaUrna(item(11, 3));
    adicionarNaUrna(item(12, 5)); adicionarNaUrna(item(13, 5));
    adicionarNaUrna(item(14, 6)); adicionarNaUrna(item(15, 7));
    expect(carregarMinhaUrna().map((i) => i.id)).toEqual([10, 11, 12, 13, 14, 15]);
    expect(faltamNaUrna(carregarMinhaUrna())).toEqual([]);
  });
  it('não duplica um senador nem mistura estados', () => {
    adicionarNaUrna(item(20, 5)); adicionarNaUrna(item(20, 5));
    adicionarNaUrna({ ...item(21, 6), uf: 'SP' });
    expect(carregarMinhaUrna().map((i) => i.id)).toEqual([20]);
  });
  it('conta estadual e distrital no checklist', () => {
    expect(faltamNaUrna([]).find((c) => c.codigo === 7)?.faltando).toBe(1);
    const urna = adicionarNaUrna({ ...item(30, 8), uf: 'DF' });
    expect(faltamNaUrna(urna).some((c) => c.codigo === 7 || c.codigo === 8)).toBe(false);
    expect(faltamNaUrna(urna).map((c) => c.codigo)).toEqual([6, 5, 3, 1]);
  });
  it('descarta dados corrompidos do armazenamento', () => {
    window.localStorage.setItem('quemvotar:minha-urna:v1', JSON.stringify([null, { id: 'abc' }, { id: 1, numero: 3, nomeUrna: 'Vice', uf: 'BR', cargoCodigo: 2 }]));
    expect(carregarMinhaUrna()).toEqual([]);
  });
});
