import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { MinhaUrnaProvider } from './MinhaUrnaProvider';
import { MinhaUrnaView } from './MinhaUrnaView';
import { MINHA_URNA_KEY } from '@/lib/candidatos/minha-urna';

afterEach(() => { cleanup(); window.localStorage.clear(); vi.unstubAllGlobals(); });

it('escolher estado e tocar no candidato preenche a cola e permite remover sem abrir perfil', async () => {
  window.localStorage.clear();
  const candidate = { id: 123, nomeUrna: 'JOÃO SILVA', numero: 1234, partido: 'PL', uf: 'SC', cargoCodigo: 6, cargo: 'Deputado Federal' };
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ candidatos: [candidate] }) }));
  render(<MinhaUrnaProvider><MinhaUrnaView /></MinhaUrnaProvider>);
  fireEvent.change(screen.getByRole('combobox', { name: /Estado onde você vota/ }), { target: { value: 'SC' } });
  fireEvent.click(await screen.findByRole('button', { name: /JOÃO SILVA/ }));
  expect(JSON.parse(window.localStorage.getItem(MINHA_URNA_KEY)!)[0]).toMatchObject({ id: 123, uf: 'SC', cargoCodigo: 6 });
  expect(screen.getAllByRole('status').some((element) => element.textContent?.includes('JOÃO SILVA adicionado'))).toBe(true);
  expect(screen.queryByText('Toque no nome para adicionar à cola')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Remover' }));
  expect(JSON.parse(window.localStorage.getItem(MINHA_URNA_KEY)!)).toEqual([]);
});
