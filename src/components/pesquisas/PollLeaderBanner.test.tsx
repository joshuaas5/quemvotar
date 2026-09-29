import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { PollLeaderBanner } from './PollLeaderBanner';
import { readPollDataset } from '@/lib/pesquisas/read';
import type { PollDataset } from '@/lib/pesquisas/types';
vi.mock('@/lib/pesquisas/read', () => ({ readPollDataset: vi.fn() }));
afterEach(() => { cleanup(); vi.useRealTimers(); vi.resetAllMocks(); });
const data = (lulaLeads: boolean): PollDataset => ({ version: 1, updatedAt: '2026-09-29', referenceDate: '2026-09-29', maxAgeDays: 15, polls: [{
  id: 'test', institute: 'Exemplo', contractor: 'Exemplo', office: 'president', uf: 'BR', round: 2, questionType: 'stimulated', scenarioId: 'lula-flavio-bolsonaro-total-vote', scenarioLabel: 'Lula × Flávio', fieldStart: '2026-09-25', fieldEnd: '2026-09-28', publishedAt: '2026-09-29', sampleSize: 2000, marginOfError: 2, confidenceLevel: 95, tseRegistration: 'BR-12345/2026', sourceUrl: 'https://example.org/report', sourceLabel: 'Exemplo', results: [
    { id: 'flavio-bolsonaro', name: 'Flávio Bolsonaro', kind: 'candidate', percent: lulaLeads ? 45 : 47 },
    { id: 'lula', name: 'Lula', kind: 'candidate', percent: lulaLeads ? 47 : 45 },
  ],
}] });
it('carrega foto local imediatamente e troca para a foto de Lula quando ele lidera', async () => {
  vi.useFakeTimers(); vi.setSystemTime(new Date('2026-09-29T21:00:00Z'));
  vi.mocked(readPollDataset).mockResolvedValue(data(false));
  const view = render(await PollLeaderBanner());
  expect(screen.getByRole('img').getAttribute('src')).toBe('/images/candidatos/flavio-bolsonaro.jpg');
  expect(screen.getByRole('img').getAttribute('loading')).toBe('eager');
  vi.mocked(readPollDataset).mockResolvedValue(data(true));
  view.rerender(await PollLeaderBanner());
  expect(screen.getByRole('img').getAttribute('src')).toBe('/images/candidatos/lula.png');
  expect(screen.getByRole('img').getAttribute('alt')).toContain('Lula');
});
