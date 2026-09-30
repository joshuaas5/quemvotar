import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { MobileAd } from './MobileAd';

const state = vi.hoisted(() => ({ pathname: '/', items: [] as unknown[] }));
vi.mock('next/navigation', () => ({ usePathname: () => state.pathname }));
vi.mock('@/components/candidatos/MinhaUrnaProvider', () => ({ useMinhaUrna: () => ({ items: state.items }) }));

beforeEach(() => {
  state.pathname = '/';
  state.items = [];
  sessionStorage.clear();
  vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('permite fechar o banner e mantém fechado depois de navegar na mesma sessão', () => {
  const view = render(<MobileAd />);
  expect(view.container.querySelector('iframe')?.srcdoc).toContain('876aa82b74c7ba612f7e65595c0ca3b7');
  fireEvent.click(screen.getByRole('button', { name: 'Fechar publicidade' }));
  expect(view.container.querySelector('iframe')).toBeNull();
  view.unmount();
  expect(render(<MobileAd />).container.querySelector('aside')).toBeNull();
});

it.each(['/minha-urna', '/match', '/match/resultado'])('preserva a navegação em %s sem banner fixo', (pathname) => {
  state.pathname = pathname;
  expect(render(<MobileAd />).container.querySelector('iframe')).toBeNull();
});

it('mantém o banner mesmo com escolhas salvas na colinha', () => {
  const view = render(<MobileAd />);
  state.items = [{ id: 'candidato' }];
  view.rerender(<MobileAd />);
  expect(view.container.querySelector('iframe')).not.toBeNull();
});
