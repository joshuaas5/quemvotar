export interface PerfilPublico {
  id: string;
  idOrigem: string;
  nome_urna: string;
  partido: string;
  uf?: string;
  cargo: string;
  foto_url: string;
  casa: 'Câmara dos Deputados' | 'Senado Federal';
  fonte: 'camara' | 'senado';
  fonteUrl: string;
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
