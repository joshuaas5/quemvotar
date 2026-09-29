import { describe, expect, it } from 'vitest';
import { aggregatePolls, brazilToday, isVerifiedPoll, normalizeDataset } from './aggregate';
import type { ElectoralPoll, PollDataset } from './types';

function poll(overrides: Partial<ElectoralPoll> = {}): ElectoralPoll {
  return {
    id: 'institute-a-0928', institute: 'Instituto A', contractor: 'Contratante A',
    office: 'president', uf: 'BR', round: 1, questionType: 'stimulated',
    scenarioId: 'a-b', scenarioLabel: 'Candidatos A e B',
    fieldStart: '2026-09-26', fieldEnd: '2026-09-28', publishedAt: '2026-09-29',
    sampleSize: 2000, marginOfError: 2, confidenceLevel: 95,
    tseRegistration: 'BR-12345/2026', sourceUrl: 'https://instituto.example/pesquisa.pdf', sourceLabel: 'Relatório original',
    results: [{ id: 'a', name: 'Candidato A', percent: 40, kind: 'candidate' }, { id: 'b', name: 'Candidato B', percent: 30, kind: 'candidate' }],
    ...overrides,
  };
}
function dataset(polls: ElectoralPoll[]): PollDataset {
  return { version: 1, updatedAt: '2026-09-29T18:00:00Z', referenceDate: '2026-09-29', maxAgeDays: 15, polls };
}

describe('electoral polling aggregation', () => {
  it('keeps published valid-vote percentages separate from total-sample percentages', () => {
    expect(aggregatePolls(dataset([poll(), poll({ id: 'valid', institute: 'B', voteBasis: 'valid' })]), '2026-09-29')).toHaveLength(2);
  });
  it('requires every registration in a consolidated study to match the electorate', () => {
    expect(isVerifiedPoll(poll({ tseRegistrations: ['BR-12345/2026', 'BR-54321/2026'] }))).toBe(true);
    expect(isVerifiedPoll(poll({ tseRegistrations: ['BR-12345/2026', 'SP-54321/2026'] }))).toBe(false);
  });

  it('avoids binary floating-point artifacts at a displayed rounding boundary', () => {
    const a = poll({ results: [{ id: 'a', name: 'A', percent: 45.8, kind: 'candidate' }] });
    const b = poll({ id: 'b', institute: 'B', results: [{ id: 'a', name: 'A', percent: 46.1, kind: 'candidate' }] });
    expect(aggregatePolls(dataset([a, b]), '2026-09-29')[0].results[0].percent).toBe(45.95);
  });
  it('gives institutes equal weight rather than weighting by sample size', () => {
    const a = poll();
    const b = poll({ id: 'b', institute: 'Instituto B', sampleSize: 5000, results: [{ id: 'a', name: 'Candidato A', percent: 60, kind: 'candidate' }, { id: 'b', name: 'Candidato B', percent: 20, kind: 'candidate' }] });
    const result = aggregatePolls(dataset([a, b]), '2026-09-29')[0];
    expect(result.results.map((candidate) => candidate.percent)).toEqual([50, 25]);
  });
  it('only includes the latest observation per institute in each scenario', () => {
    const old = poll({ id: 'old', fieldStart: '2026-09-20', fieldEnd: '2026-09-22', publishedAt: '2026-09-23' });
    const newest = poll({ id: 'latest', results: [{ id: 'a', name: 'Candidato A', percent: 55, kind: 'candidate' }] });
    const result = aggregatePolls(dataset([old, newest]), '2026-09-29')[0];
    expect(result.polls.map((record) => record.id)).toEqual(['latest']);
    expect(result.results[0].percent).toBe(55);
  });
  it('never interprets a candidate missing from one poll as zero', () => {
    const b = poll({ id: 'b', institute: 'Instituto B', results: [{ id: 'a', name: 'Candidato A', percent: 50, kind: 'candidate' }] });
    const result = aggregatePolls(dataset([poll(), b]), '2026-09-29')[0];
    expect(result.results.map((candidate) => candidate.id)).toEqual(['a']);
    expect(result.results[0].percent).toBe(45);
    expect(result.excludedCandidates).toEqual(['Candidato B']);
  });
  it('separates candidate scenarios, turns, offices and states', () => {
    const variants = [poll(), poll({ id: 'scenario', scenarioId: 'a-b-c' }), poll({ id: 'second-turn', round: 2 }), poll({ id: 'sp', office: 'governor', uf: 'SP', tseRegistration: 'SP-12345/2026' }), poll({ id: 'rj', office: 'governor', uf: 'RJ', tseRegistration: 'RJ-12345/2026' })];
    expect(aggregatePolls(dataset(variants), '2026-09-29')).toHaveLength(5);
  });
  it('keeps the sum and average of two Senate choices and the individual choices separate', () => {
    const variants = (['two-votes', 'average-two-votes', 'first-vote', 'second-vote'] as const).map((senateVote) => poll({ id: senateVote, office: 'senate', uf: 'SP', tseRegistration: 'SP-12345/2026', senateVote }));
    expect(aggregatePolls(dataset(variants), '2026-09-29')).toHaveLength(4);
  });
  it('uses end of fieldwork for recency, not the publication date', () => {
    const old = poll({ id: 'old', fieldStart: '2026-09-10', fieldEnd: '2026-09-11', publishedAt: '2026-09-29' });
    expect(aggregatePolls(dataset([old]), '2026-09-29')).toEqual([]);
  });
  it('rejects future fieldwork, future publication and invalid dates', () => {
    const future = poll({ id: 'future', fieldEnd: '2026-09-30', publishedAt: '2026-09-30' });
    const unpublished = poll({ id: 'unpublished', publishedAt: '2026-09-30' });
    const invalid = poll({ id: 'invalid', fieldStart: '2026-02-29' });
    expect(aggregatePolls(dataset([future, unpublished, invalid]), '2026-09-29')).toEqual([]);
  });
  it('requires the disclosure fields and a registry for the correct election and geography', () => {
    expect(isVerifiedPoll(poll({ contractor: '' }))).toBe(false);
    expect(isVerifiedPoll(poll({ confidenceLevel: NaN }))).toBe(false);
    expect(isVerifiedPoll(poll({ marginOfError: NaN }))).toBe(false);
    expect(isVerifiedPoll(poll({ tseRegistration: 'SP-12345/2026' }))).toBe(false);
    expect(isVerifiedPoll(poll({ tseRegistration: 'BR-12345/2022' }))).toBe(false);
    expect(isVerifiedPoll(poll({ sourceUrl: 'javascript:alert(1)' }))).toBe(false);
  });
  it('accepts Senate totals above 100 only for the sum of two choices', () => {
    const senate = poll({ office: 'senate', uf: 'SP', tseRegistration: 'SP-12345/2026', senateVote: 'two-votes', results: [{ id: 'a', name: 'Candidato A', percent: 80, kind: 'candidate' }, { id: 'b', name: 'Candidato B', percent: 70, kind: 'candidate' }] });
    expect(isVerifiedPoll(senate)).toBe(true);
    expect(isVerifiedPoll({ ...senate, senateVote: 'average-two-votes' })).toBe(false);
    expect(isVerifiedPoll({ ...senate, round: 2 })).toBe(false);
  });
  it('normalizes malformed input without inventing observations', () => {
    expect(normalizeDataset(null).polls).toEqual([]);
    expect(normalizeDataset({ polls: [poll(), poll({ sampleSize: 0 })], maxAgeDays: NaN }).polls).toHaveLength(1);
    expect(normalizeDataset({ maxAgeDays: NaN }).maxAgeDays).toBe(15);
  });
  it('uses the Brazilian calendar day at UTC midnight', () => {
    expect(brazilToday(new Date('2026-09-30T01:00:00Z'))).toBe('2026-09-29');
  });
});
