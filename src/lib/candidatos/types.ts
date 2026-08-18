/* ────────────────────────────────────────────────────────────────
 * Tipos normalizados dos candidatos 2026 (fonte: API oficial
 * DivulgaCandContas do TSE — divulgacandcontas.tse.jus.br).
 * Campos seguem a nomenclatura pública da API (snake_case) para
 * rastreabilidade direta com a fonte.
 * ──────────────────────────────────────────────────────────────── */

export type CargoTse =
  | 'presidente'
  | 'vice-presidente'
  | 'governador'
  | 'vice-governador'
  | 'senador'
  | 'deputado-federal'
  | 'deputado-estadual'
  | 'deputado-distrital'
  | 'suplente-1'
  | 'suplente-2';

export const CARGO_CODIGOS: Record<number, CargoTse> = {
  1: 'presidente',
  2: 'vice-presidente',
  3: 'governador',
  4: 'vice-governador',
  5: 'senador',
  6: 'deputado-federal',
  7: 'deputado-estadual',
  8: 'deputado-distrital',
  9: 'suplente-1',
  10: 'suplente-2',
};

export const CARGO_LABELS: Record<CargoTse, string> = {
  presidente: 'Presidente',
  'vice-presidente': 'Vice-presidente',
  governador: 'Governador',
  'vice-governador': 'Vice-governador',
  senador: 'Senador',
  'deputado-federal': 'Deputado Federal',
  'deputado-estadual': 'Deputado Estadual',
  'deputado-distrital': 'Deputado Distrital',
  'suplente-1': '1º Suplente',
  'suplente-2': '2º Suplente',
};

export function cargoLabelPorCodigo(codigo: number): string {
  return CARGO_LABELS[CARGO_CODIGOS[codigo]] ?? `Cargo ${codigo}`;
}

export function eCargoExecutivo(cargo: CargoTse | string): boolean {
  return ['presidente', 'governador'].includes(cargo);
}

/** Objeto cru da API na listagem (subset relevante). */
export interface CandidatoTseLista {
  id: number;
  nomeUrna: string;
  numero: number;
  nomeCompleto: string;
  descricaoSituacao: string | null;
  ufCandidatura: string;
  ufSuperiorCandidatura: string | null;
  partido: { numero: number | null; sigla: string | null; nome: string | null };
  nomeColigacao: string | null;
  composicaoColigacao: string | null;
  descricaoTotalizacao: string | null;
  cargo: { codigo: number; nome: string };
  fotoUrl: string | null;
  fotoUrlPublicavel: boolean;
  descricaoSexo: string | null;
  st_REELEICAO: boolean;
}

/** Objeto cru da API no detalhe (subset relevante). */
export interface CandidatoTseDetalhe extends CandidatoTseLista {
  dataDeNascimento: string | null;
  descricaoEstadoCivil: string | null;
  descricaoCorRaca: string | null;
  nacionalidade: string | null;
  grauInstrucao: string | null;
  ocupacao: string | null;
  sgUfNascimento: string | null;
  nomeMunicipioNascimento: string | null;
  localCandidatura: string | null;
  descricaoNaturalidade: string | null;
  dataUltimaAtualizacao: string | null;
  totalDeBens: number | null;
  bens: Array<{
    ordem: number;
    descricao: string;
    descricaoDeTipoDeBem: string;
    valor: number | null;
    dataUltimaAtualizacao: string | null;
  }> | null;
  sites: string[] | null;
  emails: string[] | null;
  vices: Array<{
    sq_CANDIDATO: number;
    nm_URNA: string;
    nm_CANDIDATO: string | null;
    sg_PARTIDO: string | null;
    nm_PARTIDO: string | null;
    ds_CARGO: string;
    urlFoto: string | null;
    descricaoTotalizacao: string | null;
  }> | null;
  arquivos: Array<{
    idArquivo: number;
    nome: string;
    tipo: string | null;
    codTipo: string;
    url: string | null;
  }> | null;
  eleicoesAnteriores: Array<{
    nrAno: number;
    id: string;
    nomeUrna: string;
    cargo: string;
    partido: string;
    situacaoTotalizacao: string;
    nrCandidato: number;
    local?: string | null;
    txLink: string;
  }> | null;
  legenda: { nomeLegenda: string | null; legenda: string | null } | null;
  cnpjcampanha: string | null;
  descricaoSituacaoCandidato: string | null;
  codigoSituacaoCandidato: number | null;
  candidatoApto: boolean | null;
  isCandidatoInapto: boolean | null;
  descricaoSituacaoPartido: string | null;
  st_MOTIVO_FICHA_LIMPA: boolean | null;
  st_MOTIVO_ABUSO_PODER: boolean | null;
  st_MOTIVO_COMPRA_VOTO: boolean | null;
  st_MOTIVO_CONDUTA_VEDADA: boolean | null;
  st_MOTIVO_GASTO_ILICITO: boolean | null;
  st_MOTIVO_OUTROS: string | null;
  st_MOTIVO_AUSENCIA_REQUISITO: boolean | null;
  st_MOTIVO_IND_PARTIDO: boolean | null;
  st_DIVULGA: boolean | null;
  st_DIVULGA_BENS: boolean | null;
  st_REELEICAO: boolean;
  /** Eleição à qual a candidatura pertence (usada para montar URLs). */
  eleicao?: { id?: number; ano?: number } | null;
}

/* ── Normalizados para a UI ───────────────────────────────────── */

export type EixoEspectro =
  | 'esquerda'
  | 'centro-esquerda'
  | 'centro'
  | 'centro-direita'
  | 'direita';

export type BasePosicionamento =
  | 'plano-de-governo'
  | 'analise-curada'
  | 'partido'
  | 'indefinido';

export interface PosicionamentoCandidato {
  eixo: EixoEspectro | null;
  /** Rótulo curto exibido (ex.: "Esquerda", "Centro-direita"). */
  label: string;
  /** Base da estimativa — exibida em selo para transparência. */
  base: BasePosicionamento;
  baseLabel: string;
  /** Resumo em linguagem natural explicando POR QUE. */
  resumo: string;
  /** 0..1 — confiança da estimativa. */
  confianca: number;
  /** Temas principais identificados (plano de governo / análise curada). */
  temas: string[];
  /** Avisos de transparência (ex.: candidato legislativo sem plano de governo). */
  avisos: string[];
  /** Data em que a análise foi produzida (ISO). */
  analisadoEm?: string;
  /** Fonte do plano de governo quando analisado (URL do PDF no TSE). */
  planoUrl?: string | null;
}

export interface PlanoGovernoResumo {
  disponivel: boolean;
  nomeArquivo?: string | null;
  idArquivo?: number | null;
  urlDownload?: string | null;
  textoExtraido?: string | null;
  resumoAutomatico?: string | null;
}

/** Candidato normalizado para listagem. */
export interface CandidatoResumo {
  idTse: number;
  ano: number;
  sqEleicao: number;
  uf: string;
  nomeUrna: string;
  nomeCompleto: string;
  numero: number;
  partido: string | null;
  cargoCodigo: number;
  cargo: string;
  situacao: string;
  totalizacao: string | null;
  coligacao: string | null;
  composicaoColigacao: string | null;
  fotoUrl: string | null;
  fotoUrlPublicavel: boolean;
  reelegibilidade: boolean | null;
  posicionamento: PosicionamentoCandidato;
  fonteUrl: string;
}

/** Candidato normalizado para o perfil completo. */
export interface CandidatoDetalhado extends CandidatoResumo {
  sexo: string | null;
  dataNascimento: string | null;
  estadoCivil: string | null;
  corRaca: string | null;
  nacionalidade: string | null;
  grauInstrucao: string | null;
  ocupacao: string | null;
  naturalidade: string | null;
  localCandidatura: string | null;
  dataUltimaAtualizacao: string | null;
  totalDeBens: number | null;
  bens: Array<{
    ordem: number;
    descricao: string;
    descricaoDeTipoDeBem: string;
    valor: number | null;
    dataUltimaAtualizacao: string | null;
  }>;
  sites: string[];
  emails: string[];
  vices: Array<{
    sq_CANDIDATO: number;
    nm_URNA: string;
    nm_CANDIDATO: string | null;
    sg_PARTIDO: string | null;
    nm_PARTIDO: string | null;
    ds_CARGO: string;
    urlFoto: string | null;
    descricaoTotalizacao: string | null;
  }>;
  eleicoesAnteriores: Array<{
    nrAno: number;
    id: string;
    nomeUrna: string;
    cargo: string;
    partido: string;
    situacaoTotalizacao: string;
    nrCandidato: number;
    local?: string | null;
    txLink: string;
  }>;
  cnpjcampanha: string | null;
  situacaoCandidato: string | null;
  candidatoApto: boolean | null;
  motivosInelegibilidade: string[];
  planoGoverno: PlanoGovernoResumo;
  arquivos: Array<{
    idArquivo: number;
    nome: string;
    tipo: string | null;
    codTipo: string;
    url: string | null;
  }>;
  legendaNome: string | null;
}
