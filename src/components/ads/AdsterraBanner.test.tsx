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

it('carrega somente o banner mobile e não solicita o lateral em tela pequena', () => {
  screen(390);
  const view = render(<><AdLeaderboard /><AdSidebar /></>);
  const frames = view.container.querySelectorAll('iframe');
  expect(frames).toHaveLength(1);
  expect(frames[0].srcdoc).toContain('876aa82b74c7ba612f7e65595c0ca3b7');
  expect(frames[0].width).toBe('320');
});

it('isola as configurações do topo e da lateral no desktop e mantém a marcação de impressão', () => {
  screen(1366);
  const view = render(<><AdLeaderboard /><AdSidebar /></>);
  const frames = [...view.container.querySelectorAll('iframe')];
  expect(frames).toHaveLength(2);
  expect(frames[0].srcdoc).toContain('b9861387958db10ac9330cab0e89166e');
  expect(frames[1].srcdoc).toContain('c9bf45f4747c8fa088adcb1889774660');
  expect(frames[1].height).toBe('600');
  expect(frames.every((frame) => frame.closest('[data-advertisement]'))).toBe(true);
  expect(document.querySelectorAll('script[src*="highrevenueformat"]')).toHaveLength(0);
});
