import { cache } from 'react';
import type { PerfilDetalhadoPublico, PerfilItemLista, PerfilPublico } from './types';
import { improveProfilePhotoUrl } from '@/lib/utils/profile-image';
import { decodeMojibake } from '@/lib/utils/string';
import { getMemoryCache, setMemoryCache } from '@/lib/utils/memory-cache';
import { DEPUTADOS_FALLBACK, PARTIDOS_FALLBACK } from '@/lib/fallback-data';

const CAMARA_API_ROOT = 'https://dadosabertos.camara.leg.br/api/v2';
const AUTORIAS_AMOSTRA_ANALISADA = 8;

interface CamaraLink {
  rel?: string;
  href?: string;
}

interface CamaraResponse<T> {
  dados?: T;
  links?: CamaraLink[];
}

interface CamaraDeputado {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto?: string;
  uri?: string;
}

interface CamaraGabinete {
  nome?: string;
  predio?: string;
  sala?: string;
  andar?: string;
  telefone?: string;
  email?: string;
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
  siglaTipo?: string;
  numero?: number;
  ano?: number;
  ementa?: string;
  dataApresentacao?: string;
}

interface CamaraProposicaoDetalhe {
  statusProposicao?: {
    descricaoSituacao?: string;
    descricaoTramitacao?: string;
    despacho?: string;
  };
}

const API_TIMEOUT_MS = 8000;

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchCamara<T>(path: string): Promise<T> {
  const response = await fetchWithTimeout(`${CAMARA_API_ROOT}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar a API da Câmara: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function compact<T>(values: Array<T | null | undefined | false>): T[] {
  return values.filter(Boolean) as T[];
}

function formatCurrency(value?: number) {
  if (typeof value !== 'number') {
    return null;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function formatGabinete(gabinete?: CamaraGabinete): string | null {
  if (!gabinete) {
    return null;
  }

  const partes = compact([
    gabinete.predio ? `Prédio ${decodeMojibake(gabinete.predio)}` : null,
    gabinete.andar ? `${decodeMojibake(gabinete.andar)}º andar` : null,
    gabinete.sala ? `Sala ${decodeMojibake(gabinete.sala)}` : null,
    gabinete.nome ? `Gabinete ${decodeMojibake(gabinete.nome)}` : null,
  ]);

  return partes.length > 0 ? partes.join(' • ') : null;
}

function getCamaraPublicProfileUrl(id: string) {
  return `https://www.camara.leg.br/deputados/${id}`;
}

function getCamaraProposicaoUrl(id: number) {
  return `https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=${id}`;
}

function getSocialNetworkLabel(url: string, index: number) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');

    if (hostname.includes('instagram.com')) return 'Instagram';
    if (hostname.includes('facebook.com')) return 'Facebook';
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) return 'X';
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) return 'YouTube';
    if (hostname.includes('tiktok.com')) return 'TikTok';
    if (hostname.includes('linkedin.com')) return 'LinkedIn';
    if (hostname.includes('threads.net')) return 'Threads';
  } catch {
    return `Rede ${index + 1}`;
  }

  return `Rede ${index + 1}`;
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function isApprovedCamaraStatus(detalhe: CamaraProposicaoDetalhe) {
  const texto = normalizeText(
    [
      detalhe.statusProposicao?.descricaoSituacao,
      detalhe.statusProposicao?.descricaoTramitacao,
      detalhe.statusProposicao?.despacho,
    ]
      .filter(Boolean)
      .join(' '),
  );

  return texto.includes('aprovad');
}

function getTotalFromLastLink(links: CamaraLink[] | undefined, defaultValue: number) {
  const last = links?.find((link) => link.rel === 'last')?.href;

  if (!last) {
    return defaultValue;
  }

  try {
    const url = new URL(last);
    const pagina = Number(url.searchParams.get('pagina'));
    return Number.isFinite(pagina) ? pagina : defaultValue;
  } catch {
    return defaultValue;
  }
}

function normalizeDeputado(deputado: CamaraDeputado): PerfilPublico {
  return {
    id: `camara-${deputado.id}`,
    idOrigem: String(deputado.id),
    nome_urna: deputado.nome,
    partido: deputado.siglaPartido,
    uf: deputado.siglaUf,
    cargo: 'Deputado Federal',
    foto_url: improveProfilePhotoUrl('camara', String(deputado.id), deputado.urlFoto),
    casa: 'Câmara dos Deputados',
    fonte: 'camara',
    fonteUrl: getCamaraPublicProfileUrl(String(deputado.id)),
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
        ? `Glosa de ${formatCurrency(despesa.valorGlosa)}`
        : null,
    ]).join(' • '),
    data: despesa.dataDocumento ?? undefined,
    destaque: formatCurrency(despesa.valorLiquido ?? despesa.valorDocumento) ?? undefined,
    href: despesa.urlDocumento ?? undefined,
  };
}

function mapAutoria(proposicao: CamaraProposicao): PerfilItemLista {
  const identificacao = compact([
    proposicao.siglaTipo ?? null,
    typeof proposicao.numero === 'number' ? String(proposicao.numero) : null,
    typeof proposicao.ano === 'number' && proposicao.ano > 0 ? String(proposicao.ano) : null,
  ]).join('/');

  return {
    titulo: identificacao || `Proposição ${proposicao.id}`,
    descricao: proposicao.ementa ?? 'Sem ementa resumida disponível.',
    data: proposicao.dataApresentacao ?? undefined,
    href: getCamaraProposicaoUrl(proposicao.id),
  };
}

async function fetchAutoriasResumo(id: string) {
  const [contagemPayload, recentesPayload] = await Promise.all([
    fetchCamara<CamaraResponse<CamaraProposicao[]>>(
      `/proposicoes?idDeputadoAutor=${id}&ordem=DESC&ordenarPor=id&itens=1`,
    ),
    fetchCamara<CamaraResponse<CamaraProposicao[]>>(
      `/proposicoes?idDeputadoAutor=${id}&ordem=DESC&ordenarPor=id&itens=${AUTORIAS_AMOSTRA_ANALISADA}`,
    ),
  ]);

  const recentes = recentesPayload.dados ?? [];
  const total = getTotalFromLastLink(contagemPayload.links, contagemPayload.dados?.length ?? 0);

  const detalhes = await Promise.all(
    recentes.map(async (proposicao) => {
      try {
        const detalhe = await fetchCamara<CamaraResponse<CamaraProposicaoDetalhe>>(
          `/proposicoes/${proposicao.id}`,
        );
        return detalhe.dados ?? null;
      } catch {
        return null;
      }
    }),
  );

  return {
    total,
    aprovadas: detalhes.filter((detalhe) => detalhe && isApprovedCamaraStatus(detalhe)).length,
    recentes,
  };
}

const DEPUTADOS_CACHE_KEY = 'camara:deputados:all';
const DEPUTADOS_CACHE_TTL = 1800; // 30 minutos

export const fetchDeputados = cache(async (): Promise<PerfilPublico[]> => {
  const cached = getMemoryCache<PerfilPublico[]>(DEPUTADOS_CACHE_KEY);
  if (cached !== null && cached.length > 0) return cached;

  try {
    const payload = await fetchCamara<CamaraResponse<CamaraDeputado[]>>(
      '/deputados?ordem=ASC&ordenarPor=nome&itens=1000',
    );

    const result = (payload.dados ?? []).map(normalizeDeputado);
    setMemoryCache(DEPUTADOS_CACHE_KEY, result, DEPUTADOS_CACHE_TTL);
    return result;
  } catch (error) {
    console.error('[fetchDeputados] Falha ao carregar deputados:', error);
    console.warn('[fetchDeputados] Usando dados fallback para build');
    return DEPUTADOS_FALLBACK;
  }
});

export const fetchDeputadoDetalhado = cache(
  async (id: string): Promise<PerfilDetalhadoPublico | null> => {
    const detalhePayload = await fetchCamara<CamaraResponse<CamaraDeputadoDetalhe>>(`/deputados/${id}`);

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
      foto_url: improveProfilePhotoUrl('camara', String(detalhe.id), ultimoStatus?.urlFoto),
      casa: 'Câmara dos Deputados',
      fonte: 'camara',
      fonteUrl: getCamaraPublicProfileUrl(String(detalhe.id)),
    };

    const naturalidade = compact([detalhe.municipioNascimento ?? null, detalhe.ufNascimento ?? null]).join(
      ' - ',
    );

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
                ? `Atualização oficial publicada em ${ultimoStatus.data}`
                : 'Registro atual de exercício na Câmara dos Deputados.',
              data: ultimoStatus?.data ?? undefined,
              destaque: ultimoStatus?.condicaoEleitoral ?? undefined,
            }
          : null,
      ]),
      comissoes: [],
      cargos: [],
      votacoes: [],
      despesas: [],
      autorias: [],
      filiacoes: [],
      linksOficiais: compact([
        { label: 'Perfil oficial na Câmara', href: perfilBase.fonteUrl },
        { label: 'Dados abertos da Câmara', href: detalhe.uri ?? `${CAMARA_API_ROOT}/deputados/${id}` },
        detalhe.urlWebsite ? { label: 'Site pessoal', href: detalhe.urlWebsite } : null,
        ...(detalhe.redeSocial ?? []).map((href, index) => ({
          label: getSocialNetworkLabel(href, index),
          href,
        })),
      ]),
      notas: ['Dados desta página são carregados a partir das fontes oficiais da Câmara dos Deputados.'],
      autoriasTotal: null,
      autoriasAprovadas: null,
      autoriasAmostraAnalisada: null,
      temasVotacao: [],
    };
  },
);

export async function fetchCamaraDespesas(id: string): Promise<PerfilItemLista[]> {
  try {
    const despesasPayload = await fetchCamara<CamaraResponse<CamaraDespesa[]>>(
      `/deputados/${id}/despesas?ordem=DESC&ordenarPor=ano&itens=6`
    );
    return (despesasPayload.dados ?? []).map(mapDespesa);
  } catch {
    return [];
  }
}

export async function fetchCamaraAutorias(id: string): Promise<PerfilItemLista[]> {
  try {
    const autoriasResumo = await fetchAutoriasResumo(id);
    return autoriasResumo.recentes.slice(0, 8).map(mapAutoria);
  } catch {
    return [];
  }
}




