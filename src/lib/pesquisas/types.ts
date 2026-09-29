export type PollOffice = 'president' | 'governor' | 'senate';
export type SenateVote = 'two-votes' | 'average-two-votes' | 'first-vote' | 'second-vote' | 'one-vote';

export interface PollResult {
  /** Stable identity across institutes, never a position in the result list. */
  id: string;
  name: string;
  party?: string;
  percent: number;
  kind: 'candidate' | 'blank_null' | 'undecided' | 'other';
}

export interface ElectoralPoll {
  id: string;
  institute: string;
  contractor: string;
  office: PollOffice;
  uf: string;
  round: 1 | 2;
  questionType: 'stimulated';
  /** Same choices, wording, vote convention and electorate must share this key. */
  scenarioId: string;
  scenarioLabel: string;
  senateVote?: SenateVote;
  fieldStart: string;
  fieldEnd: string;
  publishedAt: string;
  sampleSize: number;
  marginOfError: number;
  confidenceLevel: number;
  tseRegistration: string;
  sourceUrl: string;
  sourceLabel: string;
  results: PollResult[];
}

export interface PollDataset {
  version: 1;
  updatedAt: string;
  referenceDate: string;
  maxAgeDays: number;
  coverageNote?: string;
  polls: ElectoralPoll[];
}

export const POLL_OFFICES: Record<PollOffice, string> = {
  president: 'Presidente', governor: 'Governador', senate: 'Senado',
};

export const POLL_UFS = [
  ['AC', 'Acre'], ['AL', 'Alagoas'], ['AP', 'Amapá'], ['AM', 'Amazonas'],
  ['BA', 'Bahia'], ['CE', 'Ceará'], ['DF', 'Distrito Federal'], ['ES', 'Espírito Santo'],
  ['GO', 'Goiás'], ['MA', 'Maranhão'], ['MT', 'Mato Grosso'], ['MS', 'Mato Grosso do Sul'],
  ['MG', 'Minas Gerais'], ['PA', 'Pará'], ['PB', 'Paraíba'], ['PR', 'Paraná'],
  ['PE', 'Pernambuco'], ['PI', 'Piauí'], ['RJ', 'Rio de Janeiro'], ['RN', 'Rio Grande do Norte'],
  ['RS', 'Rio Grande do Sul'], ['RO', 'Rondônia'], ['RR', 'Roraima'], ['SC', 'Santa Catarina'],
  ['SP', 'São Paulo'], ['SE', 'Sergipe'], ['TO', 'Tocantins'],
] as const;
