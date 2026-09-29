import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MinhaUrnaView } from './MinhaUrnaView';
const items = [{ id: 10, nomeUrna: 'Escolha privada', numero: 12345, partido: 'ABC', cargoCodigo: 6, cargo: 'Deputado Federal', uf: 'DF', eixo: null, base: 'partido', baseLabel: 'Partido' }];
vi.mock('./MinhaUrnaProvider', () => ({ useMinhaUrna: () => ({ items, remover: vi.fn(), limpar: vi.fn() }) }));
afterEach(cleanup);
describe('cola e convite', () => {
  it('mostra seis posições na ordem da urna com o cargo distrital', () => {
    render(<MinhaUrnaView />);
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getAllByRole('heading', { level: 3 }).map((e) => e.textContent)).toEqual(['Deputado Federal', 'Deputado Distrital', 'Senador · 1º voto', 'Senador · 2º voto', 'Governador', 'Presidente']);
  });
  it('compartilha a ferramenta sem incluir escolhas privadas no convite', () => {
    render(<MinhaUrnaView />);
    const url = screen.getByRole('link', { name: 'Convidar pelo WhatsApp' }).getAttribute('href')!;
    expect(decodeURIComponent(url)).toContain('/minha-urna?utm_source=compartilhamento');
    expect(decodeURIComponent(url)).not.toContain('Escolha privada');
    expect(screen.getByRole('button', { name: 'Baixar minha cola' })).toBeTruthy();
  });
});
