import { cache } from 'react';
import type { PerfilDetalhadoPublico, PerfilItemLista, PerfilPublico } from './types';

const CAMARA_API_ROOT = 'https://dadosabertos.camara.leg.br/api/v2';
const CAMARA_DEPUTADOS_URL =
  `${CAMARA_API_ROOT}/deputados?ordem=ASC&ordenarPor=nome&itens=1000`;

interface CamaraDeputado {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto?: string;
  uri?: string;
}

interface CamaraDeputadoDetalhe {
  id: number;
  uri: string;
  nomeCivil?: string;
  ultimoStatus?: {
    id: number;
    uri?: string;
    nome?: string;
    siglaPartido?: string;
    siglaUf?: string;
    idLegislatura?: number;
    urlFoto?: string;
    email?: string | null;
    data?: string;
    nomeEleitoral?: string;
    gabinete?: CamaraGabinete;
    situacao?: string;
    condicaoEleitoral?: string;
  };
  sexo?: string;
  urlWebsite?: string | null;
  redeSocial?: string[];
  dataNascimento?: string;
  ufNascimento?: string;
  municipioNascimento?: string;
  escolaridade?: string;
}

interface CamaraDespesa {
  tipoDespesa?: string;
  tipoDocumento?: string;
  dataDocumento?: string;
  numDocumento?: string;
  valorLiquido?: number;
  valorDocumento?: number;
  valorGlosa?: number;
  urlDocumento?: string;
  nomeFornecedor?: string;
}

interface CamaraProposicao {
  id: number;
  uri: string;
  siglaTipo?: string;
  numero?: number;
  ano?: number;
  ementa?: string;
  dataApresentacao?: string;
}

interface CamaraGabinete {
  nome?: string;
  predio?: string;
  sala?: string;
  andar?: string;
  telefone?: string;
  email?: string;
}

async function fetchCamara<T>(path: string): Promise<T> {
  const response = await fetch(`${CAMARA_API_ROOT}${path}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar a API da Câmara: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function compact<T>(values: Array<T | null | undefined | false>): T[] {
  return values.filter(Boolean) as T[];
}

function formatGabinete(gabinete?: CamaraGabinete): string | null {
  if (!gabinete) {
    return null;
  }

  const partes = compact([
    gabinete.predio ? `Prédio ${gabinete.predio}` : null,
    gabinete.andar ? `${gabinete.andar}º andar` : null,
    gabinete.sala ? `Sala ${gabinete.sala}` : null,
    gabinete.nome ? `Gabinete ${gabinete.nome}` : null,
  ]);

  if (partes.length === 0) {
    return null;
  }

  return partes.join(' • ');
}

function normalizeDeputado(deputado: CamaraDeputado): PerfilPublico {
  return {
    id: `camara-${deputado.id}`,
    idOrigem: String(deputado.id),
    nome_urna: deputado.nome,
    partido: deputado.siglaPartido,
    uf: deputado.siglaUf,
    cargo: 'Deputado Federal',
    foto_url: deputado.urlFoto ?? '',
    casa: 'Câmara dos Deputados',
    fonte: 'camara',
    fonteUrl:
      deputado.uri ??
      `${CAMARA_API_ROOT}/deputados/${deputado.id}`,
  };
}

function mapDespesa(despesa: CamaraDespesa): PerfilItemLista {
  return {
    titulo: despesa.tipoDespesa ?? 'Despesa parlamentar',
    descricao: despesa.nomeFornecedor ?? 'Fornecedor não informado',
    detalhe: compact([
      despesa.tipoDocumento ?? null,
      despesa.numDocumento ? `Documento ${despesa.numDocumento}` : null,
      typeof despesa.valorGlosa === 'number' && despesa.valorGlosa > 0
        ? `Glosa de R$ ${despesa.valorGlosa.toFixed(2)}`
        : null,
    ]).join(' • '),
    data: despesa.dataDocumento ?? undefined,
    destaque:
      typeof despesa.valorLiquido === 'number'
        ? `R$ ${despesa.valorLiquido.toFixed(2)}`
        : typeof despesa.valorDocumento === 'number'
          ? `R$ ${despesa.valorDocumento.toFixed(2)}`
          : undefined,
    href: despesa.urlDocumento ?? undefined,
  };
}

function mapAutoria(proposicao: CamaraProposicao): PerfilItemLista {
  const identificacao = compact([
    proposicao.siglaTipo ?? null,
    typeof proposicao.numero === 'number' ? String(proposicao.numero) : null,
    typeof proposicao.ano === 'number' ? String(proposicao.ano) : null,
  ]).join('/');

  return {
    titulo: identificacao || `Proposição ${proposicao.id}`,
    descricao: proposicao.ementa ?? 'Sem ementa resumida disponível.',
    data: proposicao.dataApresentacao ?? undefined,
    href: proposicao.uri || undefined,
  };
}

export const fetchDeputados = cache(async (): Promise<PerfilPublico[]> => {
  const payload = await fetchCamara<{ dados?: CamaraDeputado[] }>(
    '/deputados?ordem=ASC&ordenarPor=nome&itens=1000',
  );

  return (payload.dados ?? []).map(normalizeDeputado);
});

export const fetchDeputadoDetalhado = cache(
  async (id: string): Promise<PerfilDetalhadoPublico | null> => {
    const [detalhePayload, despesasPayload, autoriasPayload] = await Promise.all([
      fetchCamara<{ dados?: CamaraDeputadoDetalhe }>(`/deputados/${id}`),
      fetchCamara<{ dados?: CamaraDespesa[] }>(
        `/deputados/${id}/despesas?ordem=DESC&ordenarPor=dataDocumento&itens=6`,
      ),
      fetchCamara<{ dados?: CamaraProposicao[] }>(
        `/proposicoes?idDeputadoAutor=${id}&ordem=DESC&ordenarPor=id&itens=6`,
      ),
    ]);

    const detalhe = detalhePayload.dados;

    if (!detalhe?.id) {
      return null;
    }

    const ultimoStatus = detalhe.ultimoStatus;
    const gabinete = formatGabinete(ultimoStatus?.gabinete);
    const perfilBase: PerfilPublico = {
      id: `camara-${detalhe.id}`,
      idOrigem: String(detalhe.id),
      nome_urna: ultimoStatus?.nomeEleitoral ?? ultimoStatus?.nome ?? 'Deputado Federal',
      partido: ultimoStatus?.siglaPartido ?? '--',
      uf: ultimoStatus?.siglaUf ?? '',
      cargo: 'Deputado Federal',
      foto_url: ultimoStatus?.urlFoto ?? '',
      casa: 'Câmara dos Deputados',
      fonte: 'camara',
      fonteUrl: detalhe.uri ?? `${CAMARA_API_ROOT}/deputados/${id}`,
    };

    const naturalidade = compact([
      detalhe.municipioNascimento ?? null,
      detalhe.ufNascimento ?? null,
    ]).join(' - ');

    return {
      ...perfilBase,
      nomeCompleto: detalhe.nomeCivil ?? null,
      sexo: detalhe.sexo ?? null,
      email: ultimoStatus?.gabinete?.email ?? ultimoStatus?.email ?? null,
      telefones: compact([ultimoStatus?.gabinete?.telefone ?? null]),
      dataNascimento: detalhe.dataNascimento ?? null,
      naturalidade: naturalidade || null,
      escolaridade: detalhe.escolaridade ?? null,
      situacao: ultimoStatus?.situacao ?? null,
      condicaoMandato: ultimoStatus?.condicaoEleitoral ?? null,
      gabinete,
      sitePessoal: detalhe.urlWebsite ?? null,
      redesSociais: (detalhe.redeSocial ?? []).filter(Boolean),
      atualizadoEm: ultimoStatus?.data ?? null,
      fatos: compact([
        { label: 'Cargo', value: 'Deputado Federal' },
        perfilBase.partido ? { label: 'Partido', value: perfilBase.partido } : null,
        perfilBase.uf ? { label: 'UF', value: perfilBase.uf } : null,
        ultimoStatus?.situacao ? { label: 'Situação', value: ultimoStatus.situacao } : null,
        ultimoStatus?.condicaoEleitoral
          ? { label: 'Condição', value: ultimoStatus.condicaoEleitoral }
          : null,
        gabinete ? { label: 'Gabinete', value: gabinete } : null,
        detalhe.escolaridade ? { label: 'Escolaridade', value: detalhe.escolaridade } : null,
      ]),
      mandatos: compact([
        ultimoStatus?.idLegislatura
          ? {
              titulo: `Legislatura ${ultimoStatus.idLegislatura}`,
              descricao: ultimoStatus?.data
                ? `Status oficial publicado em ${ultimoStatus.data}`
                : 'Registro atual de exercício na Câmara dos Deputados.',
              data: ultimoStatus?.data ?? undefined,
              destaque: ultimoStatus?.condicaoEleitoral ?? undefined,
            }
          : null,
      ]),
      comissoes: [],
      cargos: [],
      votacoes: [],
      despesas: (despesasPayload.dados ?? []).map(mapDespesa),
      autorias: (autoriasPayload.dados ?? []).map(mapAutoria),
      filiacoes: [],
      linksOficiais: compact([
        { label: 'Página da API da Câmara', href: perfilBase.fonteUrl },
        detalhe.urlWebsite ? { label: 'Site pessoal informado', href: detalhe.urlWebsite } : null,
        ...(detalhe.redeSocial ?? []).map((href, index) => ({
          label: `Rede social ${index + 1}`,
          href,
        })),
      ]),
      notas: [
        'Despesas exibidas vêm da cota parlamentar retornada pela API oficial da Câmara dos Deputados.',
        'As proposições listadas correspondem às autorias recentes encontradas para este deputado na fonte oficial.',
        'Dados judiciais e reputacionais não são inferidos automaticamente nesta página.',
      ],
    };
  },
);
