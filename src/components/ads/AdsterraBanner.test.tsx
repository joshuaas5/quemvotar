import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { AdLeaderboard, AdSidebar } from './Adsterra';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function screen(width: number) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('max-width') ? width <= 767 : width >= Number(query.match(/\d+/)![0]),
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
  }));
}

it('carrega somente o banner de 320px no topo e não solicita as laterais no celular', () => {
  screen(390);
  const view = render(<><AdLeaderboard /><AdSidebar side="left" /><AdSidebar /></>);
  const frames = view.container.querySelectorAll('iframe');
  expect(frames).toHaveLength(1);
  expect(frames[0].width).toBe('320');
});

it('isola as configurações do topo e da lateral no desktop e mantém a marcação de impressão', () => {
  screen(1366);
  const view = render(<><AdLeaderboard /><AdSidebar side="left" /><AdSidebar /></>);
  const frames = [...view.container.querySelectorAll('iframe')];
  expect(frames).toHaveLength(3);
  expect(frames[0].srcdoc).toContain('b9861387958db10ac9330cab0e89166e');
  expect(frames[1].srcdoc).toContain('c9bf45f4747c8fa088adcb1889774660');
  expect(frames[1].height).toBe('600');
  expect(frames[1].title).toBe('Publicidade lateral esquerda');
  expect(frames[2].title).toBe('Publicidade lateral direita');
  expect(frames[2].srcdoc).toContain('c9bf45f4747c8fa088adcb1889774660');
  expect(frames.every((frame) => frame.closest('[data-advertisement]'))).toBe(true);
  expect(document.querySelectorAll('script[src*="highrevenueformat"]')).toHaveLength(0);
});
