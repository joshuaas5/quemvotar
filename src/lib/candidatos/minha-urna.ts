/* ────────────────────────────────────────────────────────────────
 * Minha Urna — checklist pessoal de votos (localStorage, 100%
 * client-side, sem custo de servidor).
 *
 * Regra eleitoral: 1 voto por cargo — Presidente, Governador,
 * Senador, Deputado Federal e Deputado Estadual/Distrital.
 * ──────────────────────────────────────────────────────────────── */

export interface MinhaUrnaItem {
  id: number;
  nomeUrna: string;
  partido: string | null;
  cargoCodigo: number;
  cargo: string;
  uf: string;
  numero: number;
  eixo: string | null;
  base: string;
  baseLabel: string;
  fotoAlta?: string | null;
}

export const MINHA_URNA_KEY = 'quemvotar:minha-urna:v1';

/** Quantos votos por cargo nas Eleições de 2026 (Senado elege EM DOBRO neste ano). */
export const VOTOS_POR_CARGO: Record<number, number> = {
  1: 1, // Presidente
  3: 1, // Governador
  5: 2, // Senador — 2026 elege 2 senadores por estado
  6: 1, // Dep. Federal
  7: 1, // Dep. Estadual
};

export function votosPorCargo(cargoCodigo: number): number {
  return VOTOS_POR_CARGO[cargoCodigo] ?? 1;
}

/** Cargos da eleição geral, na ordem da urna. */
export const CARGOS_URNA: Array<{ codigo: number; rotulo: string; obrigatorio: boolean }> = [
  { codigo: 1, rotulo: 'Presidente', obrigatorio: true },
  { codigo: 3, rotulo: 'Governador', obrigatorio: true },
  { codigo: 5, rotulo: 'Senador', obrigatorio: true },
  { codigo: 6, rotulo: 'Deputado Federal', obrigatorio: true },
  { codigo: 7, rotulo: 'Deputado Estadual', obrigatorio: false },
];

export function cargoObrigatorio(cargoCodigo: number): boolean {
  return CARGOS_URNA.find((c) => c.codigo === cargoCodigo)?.obrigatorio ?? false;
}

export function rotuloCargo(cargoCodigo: number): string {
  return CARGOS_URNA.find((c) => c.codigo === cargoCodigo)?.rotulo ?? `Cargo ${cargoCodigo}`;
}

export function carregarMinhaUrna(): MinhaUrnaItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const bruto = window.localStorage.getItem(MINHA_URNA_KEY);
    if (!bruto) return [];
    const items = JSON.parse(bruto) as MinhaUrnaItem[];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function salvarMinhaUrna(items: MinhaUrnaItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(MINHA_URNA_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('quemvotar:minha-urna-change'));
  } catch {
    // localStorage indisponível (modo privado) — ignora
  }
}

/** Máximo de votos por cargo (regra da eleição). Retorna a lista atualizada. */
export function adicionarNaUrna(
  item: Omit<MinhaUrnaItem, 'eixo' | 'base' | 'baseLabel'> & { eixo?: string | null; base?: string; baseLabel?: string },
): MinhaUrnaItem[] {
  const atual = carregarMinhaUrna();
  const jaNoCargo = atual.filter((i) => i.cargoCodigo === item.cargoCodigo);
  const maxVotos = votosPorCargo(item.cargoCodigo);

  // Já atingiu o máximo de votos para este cargo (senador = 2) → não adiciona
  if (jaNoCargo.length >= maxVotos) {
    return atual;
  }

  const novo: MinhaUrnaItem = {
    id: item.id,
    nomeUrna: item.nomeUrna,
    partido: item.partido,
    cargoCodigo: item.cargoCodigo,
    cargo: item.cargo,
    uf: item.uf,
    numero: item.numero,
    eixo: item.eixo ?? null,
    base: item.base ?? 'indefinido',
    baseLabel: item.baseLabel ?? 'Não avaliado',
    fotoAlta: item.fotoAlta ?? null,
  };
  const resultado = [...jaNoCargo, novo];
  salvarMinhaUrna(resultado);
  return resultado;
}

export function removerDaUrna(id: number): MinhaUrnaItem[] {
  const resultado = carregarMinhaUrna().filter((i) => i.id !== id);
  salvarMinhaUrna(resultado);
  return resultado;
}

export function limparMinhaUrna(): void {
  salvarMinhaUrna([]);
}

export function estaNaUrna(items: MinhaUrnaItem[], id: number): boolean {
  return items.some((i) => i.id === id);
}

/** Quantos votos de um cargo já foram preenchidos. */
export function votosPreenchidos(items: MinhaUrnaItem[], cargoCodigo: number): number {
  return items.filter((i) => i.cargoCodigo === cargoCodigo).length;
}

/** Quantos votos faltam por cargo (Senado conta em dobro). */
export function faltamNaUrna(items: MinhaUrnaItem[]): Array<{ codigo: number; rotulo: string; faltando: number }> {
  const preenchidos: Record<number, number> = {};
  for (const item of items) {
    preenchidos[item.cargoCodigo] = (preenchidos[item.cargoCodigo] ?? 0) + 1;
  }
  return CARGOS_URNA.filter((c) => {
    if (!c.obrigatorio) return false;
    const total = votosPorCargo(c.codigo);
    return (preenchidos[c.codigo] ?? 0) < total;
  }).map((c) => ({
    codigo: c.codigo,
    rotulo: c.rotulo,
    faltando: votosPorCargo(c.codigo) - (preenchidos[c.codigo] ?? 0),
  }));
}
