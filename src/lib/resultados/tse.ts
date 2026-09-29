/** Official TSE EA11/EA20 layout, 2026-06/07 revisions.
 * https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados
 */
export const TSE_BASE = 'https://resultados.tse.jus.br';
export const TSE_CONFIG = `${TSE_BASE}/oficial/ele2026/comum/config/ele-c.json`;
export const INICIO_APURACAO = { 1: '2026-10-04T20:00:00Z', 2: '2026-10-25T20:00:00Z' } as const;
export type Turno = 1 | 2;
export interface ResultadoCandidato { id: string; numero: string; nome: string; partido: string; votos: number; percentual: number; situacao: string; destinoVoto: string }
export interface ResultadoTse {
  fase: 'agendada' | 'aguardando' | 'disponivel' | 'indisponivel' | 'sem-disputa';
  uf: string; cargo: number; turno: Turno; inicio: string; fonte: string;
  atualizacao?: string; finalizada?: boolean; secoes?: number; candidatos?: ResultadoCandidato[]; avisos?: string[];
}
interface ConfigTse {
  f: string;
  pl: { cd: string; c: string; dt: string; e: { cd: string; t: string; tp: string; abr: { cd: string; cp: { cd: string }[] }[] }[] }[];
}
interface Unificado {
  f: string; ele: string; t: string; cdabr: string; tpabr: string; sup: string; dv: string;
  dg: string; hg: string; tf: string; and: string; esae: string; mnae?: string[]; s?: { pst: string; pstn?: string };
  carg: { cd: string; agr: { par: { sg: string; cand?: { n: string; sqcand: string; nm: string; nmu: string; e: string; st: string; vap: string; pvap: string; pvapn?: string; dvt: string }[] }[] }[] }[];
}
const decimal = (value: unknown) => {
  const number = Number(String(value ?? '').replace(',', '.'));
  if (!Number.isFinite(number) || number < 0) throw new Error('Valor inválido do TSE');
  return number;
};

export function localizarEleicao(raw: unknown, uf: string, cargo: number, turno: Turno): string | null {
  const config = raw as ConfigTse;
  if (config?.f !== 'o' || !Array.isArray(config.pl)) throw new Error('Configuração não oficial');
  const date = turno === 1 ? '04/10/2026' : '25/10/2026';
  const eleicao = config.pl.filter((p) => p.c === 'ele2026' && p.dt === date).flatMap((p) => p.e ?? []).find((e) =>
    String(e.t) === String(turno) && [1, 8].includes(Number(e.tp)) && e.abr?.some((a) =>
      (a.cd.toLowerCase() === uf.toLowerCase() || (turno === 1 && Number(e.tp) === 1 && a.cd.toLowerCase() === 'br'))
      && a.cp?.some((c) => Number(c.cd) === cargo)));
  if (!eleicao) return null;
  const id = String(eleicao.cd);
  if (!/^\d{1,6}$/.test(id)) throw new Error('Código inválido do TSE');
  return id;
}

export function urlResultado(uf: string, cargo: number, eleicao: string) {
  const scope = uf.toLowerCase();
  if (!/^[a-z]{2}$/.test(scope) || !/^\d{1,6}$/.test(eleicao) || ![1, 3, 5, 6, 7, 8].includes(cargo)) throw new Error('Consulta inválida');
  return `${TSE_BASE}/oficial/ele2026/${eleicao}/dados/${scope}/${scope}-c${String(cargo).padStart(4, '0')}-e${eleicao.padStart(6, '0')}-u.json`;
}

export function interpretarResultado(raw: unknown, uf: string, cargo: number, turno: Turno, eleicao: string): Omit<ResultadoTse, 'inicio' | 'fonte'> {
  const data = raw as Unificado;
  if (!data || data.f !== 'o' || String(data.ele) !== eleicao || String(data.t) !== String(turno)
      || data.cdabr?.toLowerCase() !== uf.toLowerCase() || data.sup !== 'n'
      || !Array.isArray(data.carg) || !data.dg?.endsWith('/2026')) throw new Error('Arquivo não corresponde à eleição oficial');
  const office = data.carg.find((c) => Number(c.cd) === cargo);
  if (!office || !Array.isArray(office.agr)) throw new Error('Cargo ausente');
  if (data.dv !== 's' || data.and === 'n') return { fase: 'aguardando', uf, cargo, turno, candidatos: [] };
  const finalizada = data.tf === 's';
  const candidatos = office.agr.flatMap((a) => a.par ?? []).flatMap((p) => (p.cand ?? []).map((c) => ({
    id: String(c.sqcand), numero: String(c.n), nome: c.nmu || c.nm, partido: p.sg,
    votos: decimal(c.vap), percentual: decimal(c.pvapn ?? c.pvap), destinoVoto: c.dvt ?? '',
    // EA20: e=s ALSO means a second-round finalist. Never call the leader elected.
    situacao: finalizada && c.st ? c.st : 'Apuração parcial',
  }))).sort((a, b) => b.votos - a.votos || a.nome.localeCompare(b.nome, 'pt-BR'));
  return { fase: candidatos.length ? 'disponivel' : 'aguardando', uf, cargo, turno, finalizada,
    atualizacao: `${data.dg} ${data.hg} (horário de Brasília)`, secoes: Math.min(100, decimal(data.s?.pstn ?? data.s?.pst ?? '0')),
    candidatos, avisos: data.esae === 's' ? data.mnae ?? ['O TSE ainda não atribuiu eleitos nesta disputa.'] : [] };
}

export async function consultarResultados(uf: string, cargo: number, turno: Turno, now = Date.now()): Promise<ResultadoTse> {
  const scope = cargo === 1 ? 'BR' : uf;
  const base = { uf: scope, cargo, turno, inicio: INICIO_APURACAO[turno], fonte: 'https://resultados.tse.jus.br/' };
  if (now < Date.parse(base.inicio)) return { ...base, fase: 'agendada' };
  const getJson = async (url: string) => {
    const response = await fetch(url, { next: { revalidate: 60 }, signal: AbortSignal.timeout(12_000), redirect: 'error' });
    if (!response.ok) throw new Error(`TSE ${response.status}`);
    return response.json();
  };
  try {
    const id = localizarEleicao(await getJson(TSE_CONFIG), scope, cargo, turno);
    if (!id) return { ...base, fase: 'sem-disputa' };
    const fonte = urlResultado(scope, cargo, id);
    return { ...base, fonte, ...interpretarResultado(await getJson(fonte), scope, cargo, turno, id) };
  } catch { return { ...base, fase: 'indisponivel' }; }
}
