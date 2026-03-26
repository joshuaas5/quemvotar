export interface PerfilPublico {
  id: string;
  idOrigem: string;
  nome_urna: string;
  partido: string;
  uf?: string;
  cargo: string;
  foto_url: string;
  casa: 'C�mara dos Deputados' | 'Senado Federal';
  fonte: 'camara' | 'senado';
  fonteUrl: string;
}

export interface PerfilFato {
  label: string;
  value: string;
  helper?: string;
}

export interface PerfilItemLista {
  titulo: string;
  descricao?: string;
  detalhe?: string;
  data?: string;
  destaque?: string;
  href?: string;
}

export interface PerfilLinkOficial {
  label: string;
  href: string;
}

export interface PerfilDetalhadoPublico extends PerfilPublico {
  nomeCompleto?: string | null;
  sexo?: string | null;
  email?: string | null;
  telefones: string[];
  dataNascimento?: string | null;
  naturalidade?: string | null;
  escolaridade?: string | null;
  situacao?: string | null;
  condicaoMandato?: string | null;
  gabinete?: string | null;
  sitePessoal?: string | null;
  redesSociais: string[];
  atualizadoEm?: string | null;
  fatos: PerfilFato[];
  mandatos: PerfilItemLista[];
  comissoes: PerfilItemLista[];
  cargos: PerfilItemLista[];
  votacoes: PerfilItemLista[];
  despesas: PerfilItemLista[];
  autorias: PerfilItemLista[];
  filiacoes: PerfilItemLista[];
  linksOficiais: PerfilLinkOficial[];
  notas: string[];
  autoriasTotal?: number | null;
  autoriasAprovadas?: number | null;
  autoriasAmostraAnalisada?: number | null;
  temasVotacao: PerfilItemLista[];
  presenca?: PresencaReferencia | null;
  espectro?: EspectroAproximado | null;
  ranking?: RankingReferencia | null;
  governismo?: GovernismoReferencia | null;
}

export interface PartidoLideranca {
  nome: string;
  cargo: string;
  casa: 'CD' | 'SF' | 'CN';
  partido?: string;
  uf?: string;
  fotoUrl?: string;
}

export interface PartidoResumo {
  sigla: string;
  nome: string;
  logoUrl?: string | null;
  fonteUrl: string;
  tseUrl?: string | null;
  deputados: number;
  senadores: number;
  totalParlamentares: number;
  numeroLegenda?: string | null;
  presidenteNacional?: string | null;
  siteOficial?: string | null;
  estatutoUrl?: string | null;
  definicaoCurta?: string | null;
  familiaPolitica?: string | null;
  espectro?: string | null;
  espectroEixo?: 'esquerda' | 'centro-esquerda' | 'centro' | 'centro-direita' | 'direita' | null;
  cores?: string[];
  liderCamara?: PartidoLideranca | null;
  liderSenado?: PartidoLideranca | null;
  blocosSenado: string[];
}

export interface LiderancaCongresso {
  id: string;
  categoria: 'governo' | 'oposicao' | 'maioria' | 'minoria';
  titulo: string;
  casa: 'CD' | 'SF' | 'CN';
  nomeParlamentar: string;
  partido?: string;
  dataDesignacao?: string;
}

export interface RankingAno {
  ano: number;
  pontuacao: number;
  votacoes?: number;
  gastos?: number;
  presenca?: number;
  privilegios?: number;
}

export interface RankingReferencia {
  fonte: 'ranking_dos_politicos';
  nota: number;
  rankingGeral?: number | null;
  rankingCasa?: number | null;
  rankingPartido?: number | null;
  rankingEstado?: number | null;
  atualizadoEm?: string | null;
  fonteUrl: string;
  anos: RankingAno[];
}

export interface GovernismoReferencia {
  fonte: 'radar_do_congresso';
  percentualFavoravel: number;
  votosFavoraveis: number;
  votosConsiderados: number;
  votacoesMonitoradas: number;
  fonteUrl: string;
}

export interface PresencaReferencia {
  fonte: 'radar_do_congresso';
  ano: number;
  percentual: number;
  sessoesDeliberativas: number;
  presencas: number;
  ausenciasJustificadas: number;
  ausenciasNaoJustificadas: number;
  fonteUrl: string;
}

export interface EspectroAproximado {
  fonte: 'partido_e_votacoes';
  label: string;
  eixo: 'esquerda' | 'centro-esquerda' | 'centro' | 'centro-direita' | 'direita';
  resumo: string;
}

export interface RankingListaItem {
  id: string;
  nome: string;
  nomeCivil?: string | null;
  cargo: string;
  partido: string;
  uf: string;
  fotoUrl?: string | null;
  slug?: string | null;
  fonteUrl: string;
  ranking: RankingReferencia;
}

export interface PanoramaDados {
  totalParlamentares: number | null;
  totalDeputados: number | null;
  totalSenadores: number | null;
  totalUfs: number | null;
  fonteAtual: 'apis_oficiais' | 'indisponivel';
}

export interface FonteStatus {
  id: 'camara' | 'senado' | 'tse' | 'cnj';
  nome: string;
  status: 'ok' | 'parcial' | 'indisponivel';
  detalhes: string;
  href: string;
}

export interface TseResource {
  id: string;
  nome: string;
  formato: string;
  descricao: string;
  url: string;
}

export interface TseDataset {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  atualizadoEm: string;
  recursos: TseResource[];
}

export interface CnjProcessoResumo {
  numeroProcesso: string;
  tribunal: string;
  grau: string;
  classe: string;
  assuntoPrincipal: string | null;
  orgaoJulgador: string;
  dataAjuizamento: string | null;
  ultimaAtualizacao: string | null;
  fonteUrl: string;
}
