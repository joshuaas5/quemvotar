/**
 * Atualização editorial de pesquisas publicadas, com fonte e ficha técnica.
 *
 * Conferir a base: node --import tsx scripts/sync-pesquisas.ts --check
 * Importar um lote revisado: node --import tsx scripts/sync-pesquisas.ts --input /tmp/lote.json
 * O lote pode ser uma pesquisa, um array ou { polls: [...] }.
 *
 * O PesqEle contém registros, não os resultados de intenção de voto. Este script
 * não inventa resultados, não lê notícias por regex e não atualiza a data quando
 * apenas confere a base. Cada número precisa ter sido conferido no relatório
 * público indicado em sourceUrl antes da importação. O fluxo do GitHub abre PR.
 */
import assert from 'node:assert/strict';
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DEFAULT_PATH = 'public/dados/pesquisas.json';
const UFS = new Set('AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO BR'.split(' '));
const OFFICES = new Set(['president', 'governor', 'senate']);
const KINDS = new Set(['candidate', 'blank_null', 'undecided', 'other']);
const SENATE_VOTES = new Set(['two-votes', 'average-two-votes', 'first-vote', 'second-vote', 'one-vote']);

type CheckedPoll = Record<string, unknown> & {
  id: string; institute: string; uf: string; office: string;
  fieldStart: string; fieldEnd: string; publishedAt: string;
};
type CheckedDataset = Record<string, unknown> & {
  version: 1; updatedAt: string; referenceDate: string; maxAgeDays: number; polls: CheckedPoll[];
};

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label}: objeto esperado.`);
  return value as Record<string, unknown>;
}

function text(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label}: texto obrigatório.`);
  return value;
}

function number(value: unknown, label: string, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label}: número entre ${min} e ${max} esperado.`);
  }
  return value;
}

function date(value: unknown, label: string): string {
  const result = text(value, label);
  if (!/^2026-\d{2}-\d{2}$/.test(result) || Number.isNaN(Date.parse(`${result}T12:00:00Z`)) ||
      new Date(`${result}T12:00:00Z`).toISOString().slice(0, 10) !== result) {
    throw new Error(`${label}: data válida de 2026 em AAAA-MM-DD esperada.`);
  }
  return result;
}

export function checkPoll(value: unknown, referenceDate: string): CheckedPoll {
  const poll = record(value, 'Pesquisa');
  const id = text(poll.id, 'id');
  for (const key of ['institute', 'contractor', 'scenarioId', 'scenarioLabel', 'sourceLabel']) text(poll[key], `${id}.${key}`);
  const uf = text(poll.uf, `${id}.uf`);
  const office = text(poll.office, `${id}.office`);
  if (!UFS.has(uf) || !OFFICES.has(office)) throw new Error(`${id}: UF ou cargo inválido.`);
  if (office === 'president' && uf !== 'BR') throw new Error(`${id}: o painel presidencial usa pesquisas nacionais.`);
  if (uf === 'BR' && office !== 'president') throw new Error(`${id}: governo e Senado exigem uma UF.`);
  if (poll.round !== 1 && poll.round !== 2) throw new Error(`${id}: turno inválido.`);
  if (office === 'senate' && poll.round !== 1) throw new Error(`${id}: Senado não tem segundo turno.`);
  if (poll.questionType !== 'stimulated') throw new Error(`${id}: apenas intenção de voto estimulada entra nesta base.`);
  if (poll.voteBasis !== undefined && !['total', 'valid'].includes(String(poll.voteBasis))) throw new Error(`${id}: base de percentuais inválida.`);
  if (office === 'senate' && !SENATE_VOTES.has(String(poll.senateVote))) throw new Error(`${id}: informar como o voto para Senado foi medido.`);
  if (office !== 'senate' && poll.senateVote != null) throw new Error(`${id}: senateVote só se aplica ao Senado.`);

  const fieldStart = date(poll.fieldStart, `${id}.fieldStart`);
  const fieldEnd = date(poll.fieldEnd, `${id}.fieldEnd`);
  const publishedAt = date(poll.publishedAt, `${id}.publishedAt`);
  if (fieldStart > fieldEnd || fieldEnd > publishedAt || publishedAt > referenceDate) {
    throw new Error(`${id}: datas fora de ordem ou publicação posterior à referência.`);
  }
  const sampleSize = number(poll.sampleSize, `${id}.sampleSize`, 1, 10_000_000);
  if (!Number.isInteger(sampleSize)) throw new Error(`${id}: amostra deve ser um número inteiro.`);
  number(poll.marginOfError, `${id}.marginOfError`, 0, 100);
  number(poll.confidenceLevel, `${id}.confidenceLevel`, 0.01, 100);
  const registry = text(poll.tseRegistration, `${id}.tseRegistration`);
  if (!/^[A-Z]{2}-\d{5}\/2026$/.test(registry) || !UFS.has(registry.slice(0, 2))) {
    throw new Error(`${id}: registro PesqEle esperado no formato UF-12345/2026.`);
  }
  if (office !== 'president' && registry.slice(0, 2) !== uf) throw new Error(`${id}: registro não corresponde à UF.`);
  if (office === 'president' && registry.slice(0, 2) !== 'BR') throw new Error(`${id}: pesquisa nacional exige registro BR.`);
  if (poll.tseRegistrations !== undefined && (!Array.isArray(poll.tseRegistrations) || !poll.tseRegistrations.length || !poll.tseRegistrations.includes(registry) || poll.tseRegistrations.some((code) => typeof code !== 'string' || !new RegExp(`^${uf}-\\d{5}/2026$`).test(code)))) throw new Error(`${id}: registros adicionais inválidos.`);
  const sourceUrl = new URL(text(poll.sourceUrl, `${id}.sourceUrl`));
  if (sourceUrl.protocol !== 'https:' || sourceUrl.username || sourceUrl.password) throw new Error(`${id}: URL HTTPS pública da fonte esperada.`);

  if (!Array.isArray(poll.results) || poll.results.length < 2) throw new Error(`${id}: resultados publicados obrigatórios.`);
  const candidateIds = new Set<string>();
  let candidates = 0;
  let sum = 0;
  for (const resultValue of poll.results) {
    const result = record(resultValue, `${id}.results`);
    const resultId = text(result.id, `${id}.results.id`);
    if (candidateIds.has(resultId)) throw new Error(`${id}: resultado duplicado: ${resultId}.`);
    candidateIds.add(resultId);
    text(result.name, `${id}.${resultId}.name`);
    if (!KINDS.has(String(result.kind))) throw new Error(`${id}.${resultId}: categoria inválida.`);
    if (result.party != null) text(result.party, `${id}.${resultId}.party`);
    sum += number(result.percent, `${id}.${resultId}.percent`, 0, 100);
    if (result.kind === 'candidate') candidates++;
  }
  if (candidates < 2) throw new Error(`${id}: incluir ao menos dois candidatos do cenário publicado.`);
  if (poll.round === 2 && candidates !== 2) throw new Error(`${id}: cenário de segundo turno precisa ter dois candidatos.`);
  const maximum = office === 'senate' && poll.senateVote === 'two-votes' ? 205 : 105;
  if (sum > maximum) throw new Error(`${id}: percentuais excedem o total compatível com a modalidade da pesquisa.`);
  return poll as CheckedPoll;
}

export function checkDataset(value: unknown): CheckedDataset {
  const dataset = record(value, 'Base');
  if (dataset.version !== 1) throw new Error('Base: versão 1 esperada.');
  const referenceDate = date(dataset.referenceDate, 'referenceDate');
  const updatedAt = text(dataset.updatedAt, 'updatedAt');
  if (Number.isNaN(Date.parse(updatedAt)) || !/^2026-.*T/.test(updatedAt)) throw new Error('updatedAt: timestamp ISO de 2026 esperado.');
  number(dataset.maxAgeDays, 'maxAgeDays', 1, 90);
  if (!Number.isInteger(dataset.maxAgeDays)) throw new Error('maxAgeDays: número inteiro esperado.');
  if (!Array.isArray(dataset.polls) || !dataset.polls.length) throw new Error('Base vazia não pode substituir as pesquisas publicadas.');
  const ids = new Set<string>();
  for (const pollValue of dataset.polls) {
    const poll = checkPoll(pollValue, referenceDate);
    if (ids.has(poll.id)) throw new Error(`Pesquisa duplicada: ${poll.id}.`);
    ids.add(poll.id);
  }
  return dataset as CheckedDataset;
}

function todayInBrazil(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

function selfTest(): void {
  // Fixture sintética exclusivamente de validação: nunca é gravada na base.
  const poll = {
    id: 'fixture', institute: 'Instituto de teste', contractor: 'Contratante de teste', office: 'president', uf: 'BR', round: 1,
    questionType: 'stimulated', scenarioId: 'primeiro-turno', scenarioLabel: 'Teste', fieldStart: '2026-09-25', fieldEnd: '2026-09-27',
    publishedAt: '2026-09-28', sampleSize: 1000, marginOfError: 3, confidenceLevel: 95, tseRegistration: 'BR-00001/2026',
    sourceUrl: 'https://example.org/relatorio', sourceLabel: 'Fixture de validação',
    results: [{ id: 'a', name: 'A', percent: 40, kind: 'candidate' }, { id: 'b', name: 'B', percent: 35, kind: 'candidate' }],
  };
  const base = { version: 1, updatedAt: '2026-09-29T20:00:00Z', referenceDate: '2026-09-29', maxAgeDays: 15, polls: [poll] };
  assert.equal(checkDataset(base).polls.length, 1);
  assert.throws(() => checkDataset({ ...base, polls: [] }), /vazia/);
  assert.throws(() => checkDataset({ ...base, polls: [poll, poll] }), /duplicada/);
  assert.throws(() => checkPoll({ ...poll, tseRegistration: null }, base.referenceDate), /obrigatório/);
  assert.throws(() => checkPoll({ ...poll, confidenceLevel: undefined }, base.referenceDate), /número/);
  assert.throws(() => checkPoll({ ...poll, sourceUrl: 'javascript:alert(1)' }, base.referenceDate), /HTTPS/);
  assert.throws(() => checkPoll({ ...poll, fieldStart: '2026-02-30' }, base.referenceDate), /data válida/);
  assert.throws(() => checkPoll({ ...poll, publishedAt: '2026-09-30' }, base.referenceDate), /posterior/);
  assert.throws(() => checkPoll({ ...poll, office: 'senate', uf: 'SP', round: 2 }, base.referenceDate), /segundo turno/);
  assert.throws(() => checkPoll({ ...poll, office: 'senate', uf: 'SP', tseRegistration: 'SP-00001/2026' }, base.referenceDate), /Senado foi medido/);
  assert.throws(() => checkPoll({ ...poll, results: [...poll.results, poll.results[0]] }, base.referenceDate), /duplicado/);
  assert.throws(() => checkPoll({ ...poll, results: poll.results.map(r => ({ ...r, percent: 90 })) }, base.referenceDate), /excedem/);
  console.log('Validador: 12 verificações passaram.');
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) { selfTest(); return; }
  const option = (flag: string): string | undefined => {
    const index = args.indexOf(flag);
    if (index === -1) return undefined;
    if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`${flag} exige um caminho.`);
    return args[index + 1];
  };
  const outputPath = resolve(option('--output') ?? DEFAULT_PATH);
  const inputPath = option('--input');
  if (!inputPath && !args.includes('--check')) {
    console.log('Uso: node --import tsx scripts/sync-pesquisas.ts --check | --input lote.json [--output base.json]');
    return;
  }
  const current = checkDataset(JSON.parse(await readFile(outputPath, 'utf8')));
  if (!inputPath) {
    console.log(`Base validada: ${current.polls.length} pesquisas; atualização editorial ${current.updatedAt}.`);
    return;
  }
  const input: unknown = JSON.parse(await readFile(resolve(inputPath), 'utf8'));
  const batch = Array.isArray(input) ? input : Array.isArray(record(input, 'Lote').polls) ? record(input, 'Lote').polls as unknown[] : [input];
  if (!batch.length) throw new Error('Lote vazio: nenhuma atualização realizada.');
  const referenceDate = todayInBrazil();
  const incoming = batch.map(value => checkPoll(value, referenceDate));
  if (new Set(incoming.map(poll => poll.id)).size !== incoming.length) throw new Error('Lote contém IDs de pesquisa duplicados.');
  const byId = new Map(current.polls.map(poll => [poll.id, poll]));
  for (const poll of incoming) byId.set(poll.id, poll);
  const polls = [...byId.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id));
  const oldById = new Map(current.polls.map(poll => [poll.id, JSON.stringify(poll)]));
  if (incoming.every(poll => oldById.get(poll.id) === JSON.stringify(poll))) {
    console.log('Lote já presente: a data de atualização foi preservada.');
    return;
  }
  const updated = checkDataset({ ...current, referenceDate, updatedAt: new Date().toISOString(), polls });
  const temporaryPath = `${outputPath}.tmp`;
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(temporaryPath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, outputPath);
  console.log(`${incoming.length} pesquisas importadas; ${polls.length} no acervo. Conferir o diff e as fontes antes de publicar.`);
}

if (process.argv[1] && /(?:^|\/)sync-pesquisas\.(?:ts|js)$/.test(process.argv[1])) {
  void main().catch(error => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
