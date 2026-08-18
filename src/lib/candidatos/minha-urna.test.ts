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
