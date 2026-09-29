import { ElectoralPoll, PollDataset, PollOffice, PollResult, POLL_UFS } from './types';

const DAY = 86_400_000;
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

function dateNumber(value: string): number {
  if (!ISO_DAY.test(value)) return NaN;
  const number = Date.parse(`${value}T12:00:00Z`);
  return Number.isFinite(number) && new Date(number).toISOString().slice(0, 10) === value ? number : NaN;
}

export function brazilToday(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** Fail closed: a poll needs the disclosure fields and an identified source. */
export function isVerifiedPoll(input: unknown): input is ElectoralPoll {
  if (!input || typeof input !== 'object') return false;
  const poll = input as Partial<ElectoralPoll>;
  const textFields = ['id', 'institute', 'contractor', 'scenarioId', 'scenarioLabel', 'sourceLabel', 'tseRegistration'] as const;
  if (textFields.some((field) => typeof poll[field] !== 'string' || !poll[field]?.trim())) return false;
  if (!['president', 'governor', 'senate'].includes(poll.office ?? '') || poll.questionType !== 'stimulated' || ![1, 2].includes(poll.round ?? 0)) return false;
  if (poll.voteBasis !== undefined && !['total', 'valid'].includes(poll.voteBasis)) return false;
  if (poll.office === 'president' ? poll.uf !== 'BR' : !POLL_UFS.some(([uf]) => uf === poll.uf)) return false;
  if (poll.office === 'senate' && (poll.round !== 1 || !['two-votes', 'average-two-votes', 'first-vote', 'second-vote', 'one-vote'].includes(poll.senateVote ?? ''))) return false;
  if (!Number.isInteger(poll.sampleSize) || (poll.sampleSize ?? 0) < 1 || typeof poll.marginOfError !== 'number' || !Number.isFinite(poll.marginOfError) || poll.marginOfError < 0 || poll.marginOfError > 100 || typeof poll.confidenceLevel !== 'number' || !Number.isFinite(poll.confidenceLevel) || poll.confidenceLevel <= 0 || poll.confidenceLevel > 100) return false;
  const registry = poll.tseRegistration?.match(/^([A-Z]{2})-\d{5}\/2026$/);
  if (!registry || registry[1] !== (poll.office === 'president' ? 'BR' : poll.uf)) return false;
  if (poll.tseRegistrations !== undefined && (!Array.isArray(poll.tseRegistrations) || !poll.tseRegistrations.length || !poll.tseRegistrations.includes(poll.tseRegistration!) || poll.tseRegistrations.some((code) => typeof code !== 'string' || !new RegExp(`^${poll.uf}-\\d{5}/2026$`).test(code)))) return false;
  const start = dateNumber(poll.fieldStart ?? ''), end = dateNumber(poll.fieldEnd ?? ''), published = dateNumber(poll.publishedAt ?? '');
  if (![start, end, published].every(Number.isFinite) || start > end || published < end) return false;
  try { if (new URL(poll.sourceUrl ?? '').protocol !== 'https:') return false; } catch { return false; }
  if (!Array.isArray(poll.results) || poll.results.length < 1) return false;
  const ids = new Set<string>();
  for (const result of poll.results) {
    if (!result || typeof result.id !== 'string' || !result.id.trim() || ids.has(result.id) || typeof result.name !== 'string' || !result.name.trim() || typeof result.percent !== 'number' || !Number.isFinite(result.percent) || result.percent < 0 || result.percent > 100 || !['candidate', 'blank_null', 'undecided', 'other'].includes(result.kind)) return false;
    ids.add(result.id);
  }
  const total = poll.results.reduce((sum, result) => sum + result.percent, 0);
  return total <= (poll.office === 'senate' && poll.senateVote === 'two-votes' ? 205 : 105) && poll.results.some((result) => result.kind === 'candidate');
}

export function normalizeDataset(input: unknown): PollDataset {
  const data = input && typeof input === 'object' ? input as Partial<PollDataset> : {};
  return {
    version: 1,
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : '',
    referenceDate: typeof data.referenceDate === 'string' ? data.referenceDate : '',
    maxAgeDays: typeof data.maxAgeDays === 'number' && Number.isFinite(data.maxAgeDays) ? Math.max(1, Math.min(15, data.maxAgeDays)) : 15,
    coverageNote: typeof data.coverageNote === 'string' ? data.coverageNote : undefined,
    polls: Array.isArray(data.polls) ? data.polls.filter(isVerifiedPoll) : [],
  };
}

export interface PollAverage {
  id: string;
  label: string;
  office: PollOffice;
  uf: string;
  round: 1 | 2;
  senateVote?: ElectoralPoll['senateVote'];
  polls: ElectoralPoll[];
  results: PollResult[];
  excludedCandidates: string[];
  firstFieldDate: string;
  lastFieldDate: string;
}

/** Descriptive mean. It is neither a forecast nor a new sampled opinion poll. */
export function aggregatePolls(dataset: PollDataset, asOf: string): PollAverage[] {
  const today = dateNumber(asOf);
  if (!Number.isFinite(today)) return [];
  const groups = new Map<string, ElectoralPoll[]>();
  for (const poll of dataset.polls) {
    if (!isVerifiedPoll(poll)) continue;
    const age = (today - dateNumber(poll.fieldEnd)) / DAY;
    if (age < 0 || age > dataset.maxAgeDays || dateNumber(poll.publishedAt) > today) continue;
    const key = [poll.office, poll.uf, poll.round, poll.scenarioId, poll.senateVote ?? '', poll.voteBasis ?? 'total'].join('|');
    groups.set(key, [...(groups.get(key) ?? []), poll]);
  }
  const aggregates: PollAverage[] = [];
  for (const [id, members] of groups) {
    // One latest observation per institute prevents prolific institutes dominating.
    const latest = new Map<string, ElectoralPoll>();
    for (const poll of [...members].sort((a, b) => b.fieldEnd.localeCompare(a.fieldEnd) || b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id))) {
      const institute = poll.institute.toLocaleLowerCase('pt-BR').trim();
      if (!latest.has(institute)) latest.set(institute, poll);
    }
    const polls = [...latest.values()];
    const candidates = new Map<string, PollResult>();
    polls.forEach((poll) => poll.results.filter((result) => result.kind === 'candidate').forEach((result) => candidates.set(result.id, result)));
    const results: PollResult[] = [], excludedCandidates: string[] = [];
    for (const [candidateId, candidate] of candidates) {
      const values = polls.map((poll) => poll.results.find((result) => result.id === candidateId && result.kind === 'candidate'));
      if (values.some((result) => !result)) { excludedCandidates.push(candidate.name); continue; }
      results.push({ ...candidate, percent: Number((values.reduce((sum, result) => sum + result!.percent, 0) / values.length).toFixed(6)) });
    }
    results.sort((a, b) => b.percent - a.percent || a.name.localeCompare(b.name, 'pt-BR'));
    const first = polls[0];
    aggregates.push({ id, label: first.scenarioLabel, office: first.office, uf: first.uf, round: first.round, senateVote: first.senateVote, polls, results, excludedCandidates, firstFieldDate: polls.map((poll) => poll.fieldStart).sort()[0], lastFieldDate: polls.map((poll) => poll.fieldEnd).sort().at(-1)! });
  }
  return aggregates.sort((a, b) => b.lastFieldDate.localeCompare(a.lastFieldDate) || b.polls.length - a.polls.length || a.id.localeCompare(b.id));
}

export function formatPollDate(date: string): string {
  const number = dateNumber(date);
  return Number.isFinite(number) ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(number) : 'não informada';
}

export function formatPercent(value: number): string {
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(value)}%`;
}
