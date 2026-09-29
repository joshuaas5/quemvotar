import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ColaCandidatePicker } from './ColaCandidatePicker';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const candidate = { id: 123, nomeUrna: 'JOÃO SILVA', numero: 1234, partido: 'PL', uf: 'SC', cargoCodigo: 6, cargo: 'Deputado Federal' };
const mockList = (candidates: unknown[]) => vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ candidatos: candidates }) }));

describe('ColaCandidatePicker', () => {
  it('adiciona com um toque e permite busca sem acentos', async () => {
    mockList([candidate]); const choose = vi.fn();
    render(<ColaCandidatePicker uf="SC" cargo={6} selectedIds={[]} onChoose={choose} onClose={() => {}} />);
    await screen.findByText('JOÃO SILVA');
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'joao' } });
    fireEvent.click(screen.getByRole('button', { name: /JOÃO SILVA/ }));
    expect(choose).toHaveBeenCalledWith(candidate);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('SC-6.json'), expect.anything());
  });

  it('impede escolher novamente o mesmo senador', async () => {
    mockList([{ ...candidate, cargoCodigo: 5, cargo: 'Senador' }]);
    render(<ColaCandidatePicker uf="SC" cargo={5} selectedIds={[123]} onChoose={vi.fn()} onClose={() => {}} />);
    await screen.findByText('JOÃO SILVA');
    expect((screen.getByRole('button', { name: /JOÃO SILVA/ }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('carrega presidente do Brasil mesmo com estado escolhido', async () => {
    mockList([{ ...candidate, cargoCodigo: 1, uf: 'BR' }]);
    render(<ColaCandidatePicker uf="SC" cargo={1} selectedIds={[]} onChoose={vi.fn()} onClose={() => {}} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(expect.stringContaining('BR-1.json'), expect.anything()));
    await screen.findByText('JOÃO SILVA');
  });
});
