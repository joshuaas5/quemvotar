/**
 * Posicionamentos partidarios por tema (1 = discordo totalmente, 5 = concordo totalmente)
 * Baseado em historicos de votacoes, orientacoes de bancada e declaracoes publicas.
 * Usado como base para o algoritmo de match ate que votações nominais individuais estejam disponiveis.
 */

export type ThemeKey =
  | 'pvt'
  | 'agr'
  | 'impostos'
  | 'drogas'
  | 'armas'
  | 'cotas'
  | 'abor'
  | 'religiao'
  | 'clt'
  | 'meio_amb';

export const PARTY_THEME_POSITIONS: Record<string, Record<ThemeKey, number>> = {
  // Esquerda
  PT:       { pvt: 1, agr: 2, impostos: 5, drogas: 5, armas: 1, cotas: 5, abor: 4, religiao: 1, clt: 5, meio_amb: 5 },
  PSOL:     { pvt: 1, agr: 1, impostos: 5, drogas: 5, armas: 1, cotas: 5, abor: 5, religiao: 1, clt: 5, meio_amb: 5 },
  PCdoB:    { pvt: 1, agr: 2, impostos: 5, drogas: 4, armas: 1, cotas: 5, abor: 4, religiao: 1, clt: 5, meio_amb: 5 },
  REDE:     { pvt: 2, agr: 2, impostos: 4, drogas: 5, armas: 2, cotas: 5, abor: 4, religiao: 2, clt: 4, meio_amb: 5 },

  // Centro-esquerda
  PSB:      { pvt: 2, agr: 3, impostos: 4, drogas: 4, armas: 2, cotas: 4, abor: 4, religiao: 2, clt: 4, meio_amb: 4 },
  PDT:      { pvt: 2, agr: 3, impostos: 4, drogas: 3, armas: 2, cotas: 4, abor: 3, religiao: 2, clt: 4, meio_amb: 4 },
  PV:       { pvt: 2, agr: 2, impostos: 4, drogas: 4, armas: 2, cotas: 4, abor: 4, religiao: 2, clt: 3, meio_amb: 5 },

  // Centro
  MDB:      { pvt: 3, agr: 4, impostos: 3, drogas: 3, armas: 3, cotas: 3, abor: 3, religiao: 3, clt: 3, meio_amb: 3 },
  PSD:      { pvt: 3, agr: 4, impostos: 3, drogas: 3, armas: 3, cotas: 3, abor: 3, religiao: 3, clt: 3, meio_amb: 3 },
  PSDB:     { pvt: 3, agr: 3, impostos: 3, drogas: 3, armas: 3, cotas: 3, abor: 3, religiao: 3, clt: 3, meio_amb: 4 },
  CIDADANIA:{ pvt: 3, agr: 3, impostos: 3, drogas: 4, armas: 3, cotas: 3, abor: 3, religiao: 2, clt: 3, meio_amb: 4 },
  AGIR:     { pvt: 3, agr: 4, impostos: 3, drogas: 3, armas: 3, cotas: 3, abor: 3, religiao: 3, clt: 3, meio_amb: 3 },
  SOLIDARIEDADE: { pvt: 3, agr: 4, impostos: 3, drogas: 3, armas: 3, cotas: 3, abor: 3, religiao: 3, clt: 3, meio_amb: 3 },
  AVANTE:   { pvt: 3, agr: 4, impostos: 3, drogas: 3, armas: 3, cotas: 3, abor: 3, religiao: 3, clt: 3, meio_amb: 3 },

  // Centro-direita
  UNIÃO:    { pvt: 4, agr: 4, impostos: 2, drogas: 2, armas: 4, cotas: 2, abor: 2, religiao: 4, clt: 2, meio_amb: 3 },
  PODE:     { pvt: 4, agr: 4, impostos: 2, drogas: 2, armas: 4, cotas: 2, abor: 2, religiao: 4, clt: 2, meio_amb: 3 },
  PP:       { pvt: 4, agr: 5, impostos: 2, drogas: 2, armas: 4, cotas: 2, abor: 2, religiao: 4, clt: 2, meio_amb: 2 },
  PRD:      { pvt: 4, agr: 4, impostos: 2, drogas: 2, armas: 4, cotas: 2, abor: 2, religiao: 4, clt: 2, meio_amb: 3 },
  MOBILIZA: { pvt: 4, agr: 4, impostos: 2, drogas: 2, armas: 4, cotas: 2, abor: 2, religiao: 4, clt: 2, meio_amb: 3 },

  // Direita
  PL:       { pvt: 5, agr: 5, impostos: 1, drogas: 1, armas: 5, cotas: 1, abor: 1, religiao: 5, clt: 1, meio_amb: 2 },
  REPUBLICANOS: { pvt: 4, agr: 5, impostos: 1, drogas: 1, armas: 5, cotas: 1, abor: 1, religiao: 5, clt: 1, meio_amb: 2 },
  NOVO:     { pvt: 5, agr: 4, impostos: 1, drogas: 3, armas: 4, cotas: 1, abor: 2, religiao: 3, clt: 1, meio_amb: 3 },
};

export function getPartyThemePosition(party: string, theme: ThemeKey): number {
  const positions = PARTY_THEME_POSITIONS[party.toUpperCase()];
  if (!positions) return 3; // Default centro se partido desconhecido
  return positions[theme] ?? 3;
}
