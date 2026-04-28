import { cache } from 'react';
import type { LiderancaCongresso, PartidoLideranca, PartidoResumo, PerfilPublico } from './types';
import { fetchDeputados } from './camara';
import { fetchSenadores } from './senado';
import { buildPartyBadgeDataUrl, getPartyMeta, getSpectrumLabel } from '@/lib/party-meta';
import { getPartyLogoBySigla } from '@/lib/party-logos';
import { normalizeRemoteImageUrl, upgradeCamaraPhotoUrl } from '@/lib/utils/profile-image';
import { getMemoryCache, setMemoryCache } from '@/lib/utils/memory-cache';

const CAMARA_API_ROOT = 'https://dadosabertos.camara.leg.br/api/v2';
const SENADO_API_ROOT = 'https://legis.senado.leg.br/dadosabertos';
const TSE_PARTIDOS_URL = 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse';
const OFFICIAL_FETCH_MAX_ATTEMPTS = 2;

interface CamaraPartido {
  id: number;
  sigla: string;
  nome: string;
  uri: string;
}

interface CamaraPartidoDetalhe {
  id: number;
  sigla: string;
  nome: string;
  uri: string;
  status?: {
    lider?: {
      nome?: string;
      uf?: string;
      urlFoto?: string;
    };
  };
  urlLogo?: string | null;
  urlWebSite?: string | null;
}

interface SenadoParlamentarLista {
  IdentificacaoParlamentar?: {
    NomeParlamentar?: string;
    SiglaPartidoParlamentar?: string;
    UfParlamentar?: string;
    Bloco?: {
      NomeBloco?: string;
      NomeApelido?: string;
    };
  };
}

interface LiderancaRaw {
  casa: 'CD' | 'SF' | 'CN';
  dataDesignacao?: string;
  descricaoTipoLideranca?: string;
  descricaoTipoUnidadeLideranca?: string;
  nomeParlamentar?: string;
  siglaPartido?: string;
  siglaPartidoFiliacao?: string;
  siglaBloco?: string;
}

interface TsePartyDetail {
  tseUrl: string;
  nome?: string | null;
  presidenteNacional?: string | null;
  siteOficial?: string | null;
  estatutoUrl?: string | null;
  definicaoCurta?: string | null;
}

async function fetchOfficial(url: string, accept: string, attempt = 1): Promise<Response> {
  try {
    const response = await fetch(url, {
      headers: { Accept: accept },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`Falha ao consultar fonte oficial: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (attempt < OFFICIAL_FETCH_MAX_ATTEMPTS) {
      return fetchOfficial(url, accept, attempt + 1);
    }

    throw error;
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetchOfficial(url, 'application/json');
  return response.json() as Promise<T>;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetchOfficial(url, 'text/html,application/xhtml+xml');
  return response.text();
}

function cleanText(value?: string | null) {
  return value?.replace(/\s+/g, ' ').trim() ?? null;
}

function buildPartyMap(perfis: PerfilPublico[]) {
  const map = new Map<
    string,
    {
      sigla: string;
      deputados: number;
      senadores: number;
      totalParlamentares: number;
    }
  >();

  for (const perfil of perfis) {
    const current = map.get(perfil.partido) ?? {
      sigla: perfil.partido,
      deputados: 0,
      senadores: 0,
      totalParlamentares: 0,
    };

    if (perfil.fonte === 'camara') {
      current.deputados += 1;
    } else {
      current.senadores += 1;
    }

    current.totalParlamentares += 1;
    map.set(perfil.partido, current);
  }

  return map;
}

const fetchCamaraPartidos = cache(async (): Promise<CamaraPartido[]> => {
  const payload = await fetchJson<{ dados?: CamaraPartido[] }>(
    `${CAMARA_API_ROOT}/partidos?ordem=ASC&ordenarPor=sigla&itens=100`,
  );

  return payload.dados ?? [];
});

const fetchSenadoListaAtual = cache(async (): Promise<SenadoParlamentarLista[]> => {
  const payload = await fetchJson<{
    ListaParlamentarEmExercicio?: {
      Parlamentares?: {
        Parlamentar?: SenadoParlamentarLista[];
      };
    };
  }>(`${SENADO_API_ROOT}/senador/lista/atual.json`);

  return payload.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar ?? [];
});

const fetchComposicaoLiderancas = cache(async (): Promise<LiderancaRaw[]> => {
  return fetchJson<LiderancaRaw[]>(`${SENADO_API_ROOT}/composicao/lideranca.json`);
});

const fetchCamaraPartidoDetalhe = cache(async (id: number): Promise<CamaraPartidoDetalhe | null> => {
  try {
    const payload = await fetchJson<{ dados?: CamaraPartidoDetalhe }>(`${CAMARA_API_ROOT}/partidos/${id}`);
    return payload.dados ?? null;
  } catch {
    return null;
  }
});

const fetchTsePartyRegistry = cache(async (): Promise<Map<string, string>> => {
  const html = await fetchText(TSE_PARTIDOS_URL);
  const regex = /<a[^>]+href="([^"]*\/partido-[^"]+)"[^>]*>\s*([A-Z][A-Za-zÀ-ÿ0-9]+)\s*<\/a>/g;
  const map = new Map<string, string>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    const sigla = match[2].replace(/\s+/g, '');

    if (!map.has(sigla)) {
      map.set(sigla, href.startsWith('http') ? href : `https://www.tse.jus.br${href}`);
    }
  }

  return map;
});

function parseTsePartyField(html: string, label: string) {
  const regex = new RegExp(`${label}:\\s*(?:<[^>]+>)*([^<]+)`, 'i');
  const match = html.match(regex);
  return cleanText(match?.[1] ?? null);
}

function parseTsePartyLink(html: string, label: string) {
  const regex = new RegExp(`${label}:\\s*<a[^>]+href="([^"]+)"`, 'i');
  const match = html.match(regex);
  return match?.[1] ?? null;
}

function parseFirstStatuteLink(html: string) {
  const match = html.match(/Estatuto[\s\S]{0,500}?href="([^"]+)"/i);
  return match?.[1] ?? null;
}

const fetchTsePartyDetail = cache(async (sigla: string): Promise<TsePartyDetail | null> => {
  const registry = await fetchTsePartyRegistry();
  const tseUrl = registry.get(sigla);

  if (!tseUrl) {
    return null;
  }

  try {
    const html = await fetchText(tseUrl);
    const siteOficial = parseTsePartyLink(html, 'Endereço Internet');

    return {
      tseUrl,
      nome: parseTsePartyField(html, 'Nome'),
      presidenteNacional: parseTsePartyField(html, 'Presidente Nacional'),
      siteOficial,
      estatutoUrl: parseFirstStatuteLink(html),
      definicaoCurta: null,
    };
  } catch {
    return { tseUrl };
  }
});

function getPartyLeader(liderancas: LiderancaRaw[], sigla: string, casa: 'CD' | 'SF'): PartidoLideranca | null {
  const match = liderancas.find((lideranca) => {
    const partySigla = lideranca.siglaPartido ?? lideranca.siglaPartidoFiliacao;

    return (
      lideranca.casa === casa &&
      lideranca.descricaoTipoUnidadeLideranca?.includes('Partido') &&
      lideranca.descricaoTipoLideranca?.includes('Líder') &&
      partySigla === sigla
    );
  });

  if (!match?.nomeParlamentar || !match.descricaoTipoLideranca) {
    return null;
  }

  return {
    nome: match.nomeParlamentar,
    cargo: match.descricaoTipoLideranca,
    casa,
    partido: match.siglaPartido ?? match.siglaPartidoFiliacao,
  };
}

const PARTIDOS_CACHE_KEY = 'partidos:resumo:all';
const PARTIDOS_CACHE_TTL = 21600; // 6 horas

export const fetchPartidosResumo = cache(async (): Promise<PartidoResumo[]> => {
  const cached = getMemoryCache<PartidoResumo[]>(PARTIDOS_CACHE_KEY);
  if (cached !== null && cached.length > 0) return cached;

  const [deputados, senadores, partidosCamara, liderancas, senadoLista] = await Promise.all([
    fetchDeputados(),
    fetchSenadores(),
    fetchCamaraPartidos(),
    fetchComposicaoLiderancas(),
    fetchSenadoListaAtual(),
  ]);

  const totais = buildPartyMap([...deputados, ...senadores]);
  const camaraIndex = new Map(partidosCamara.map((partido) => [partido.sigla, partido]));
  const partidosOrdenados = Array.from(totais.values()).sort(
    (a, b) => b.totalParlamentares - a.totalParlamentares || a.sigla.localeCompare(b.sigla, 'pt-BR'),
  );

  const detalhesCamara = new Map<string, CamaraPartidoDetalhe | null>();
  const detalhesTse = new Map<string, TsePartyDetail | null>();

  // Busca detalhes em paralelo por partido (Camara + TSE ao mesmo tempo)
  await Promise.all(
    partidosOrdenados.map(async (partido) => {
      const referencia = camaraIndex.get(partido.sigla);
      const [detalheCamara, detalheTse] = await Promise.all([
        referencia
          ? fetchCamaraPartidoDetalhe(referencia.id).catch(() => null)
          : Promise.resolve(null),
        fetchTsePartyDetail(partido.sigla).catch(() => null),
      ]);
      detalhesCamara.set(partido.sigla, detalheCamara);
      detalhesTse.set(partido.sigla, detalheTse);
    }),
  );

  const resultado = partidosOrdenados.map((totaisPartido) => {
    const detalheCamara = detalhesCamara.get(totaisPartido.sigla);
    const detalheTse = detalhesTse.get(totaisPartido.sigla);
    const meta = getPartyMeta(totaisPartido.sigla);
    const blocosSenado = Array.from(
      new Set(
        senadoLista
          .filter((item) => item.IdentificacaoParlamentar?.SiglaPartidoParlamentar === totaisPartido.sigla)
          .map(
            (item) =>
              item.IdentificacaoParlamentar?.Bloco?.NomeApelido || item.IdentificacaoParlamentar?.Bloco?.NomeBloco,
          )
          .filter((value): value is string => Boolean(value)),
      ),
    );

    const localLogo = getPartyLogoBySigla(totaisPartido.sigla);
    const logoUrl =
      localLogo ??
      (normalizeRemoteImageUrl(detalheCamara?.urlLogo) &&
      !normalizeRemoteImageUrl(detalheCamara?.urlLogo).toLowerCase().endsWith('.gif')
        ? normalizeRemoteImageUrl(detalheCamara?.urlLogo)
        : buildPartyBadgeDataUrl(totaisPartido.sigla, meta.primary, meta.secondary));

    return {
      sigla: totaisPartido.sigla,
      nome: detalheTse?.nome ?? detalheCamara?.nome ?? totaisPartido.sigla,
      logoUrl,
      fonteUrl: detalheCamara?.uri ?? camaraIndex.get(totaisPartido.sigla)?.uri ?? TSE_PARTIDOS_URL,
      tseUrl: detalheTse?.tseUrl ?? null,
      deputados: totaisPartido.deputados,
      senadores: totaisPartido.senadores,
      totalParlamentares: totaisPartido.totalParlamentares,
      presidenteNacional: detalheTse?.presidenteNacional ?? null,
      siteOficial: detalheTse?.siteOficial ?? detalheCamara?.urlWebSite ?? null,
      estatutoUrl: detalheTse?.estatutoUrl ?? null,
      definicaoCurta: detalheTse?.definicaoCurta ?? `Partido com atuação parlamentar em ${totaisPartido.totalParlamentares} cadeiras no Congresso.`,
      familiaPolitica: meta.family,
      espectro: getSpectrumLabel(meta.spectrum),
      espectroEixo: meta.spectrum,
      cores: [meta.primary, meta.secondary],
      liderCamara: detalheCamara?.status?.lider?.nome
        ? {
            nome: detalheCamara.status.lider.nome,
            cargo: 'Líder da Câmara dos Deputados',
            casa: 'CD',
            partido: totaisPartido.sigla,
            uf: detalheCamara.status.lider.uf,
            fotoUrl: upgradeCamaraPhotoUrl(detalheCamara.status.lider.urlFoto),
          }
        : getPartyLeader(liderancas, totaisPartido.sigla, 'CD'),
      liderSenado: getPartyLeader(liderancas, totaisPartido.sigla, 'SF'),
      blocosSenado,
    };
  });

  setMemoryCache(PARTIDOS_CACHE_KEY, resultado, PARTIDOS_CACHE_TTL);
  return resultado as PartidoResumo[];
});

function mapCategoria(descricao?: string): LiderancaCongresso['categoria'] | null {
  const normalized = descricao?.toLowerCase() ?? '';

  if (normalized.includes('governo')) return 'governo';
  if (normalized.includes('oposição') || normalized.includes('oposicao')) return 'oposicao';
  if (normalized.includes('maioria')) return 'maioria';
  if (normalized.includes('minoria')) return 'minoria';

  return null;
}

const LIDERANCAS_CACHE_KEY = 'congresso:liderancas:all';
const LIDERANCAS_CACHE_TTL = 21600; // 6 horas

export const fetchLiderancasCongresso = cache(async (): Promise<LiderancaCongresso[]> => {
  const cached = getMemoryCache<LiderancaCongresso[]>(LIDERANCAS_CACHE_KEY);
  if (cached !== null && cached.length > 0) return cached;

  const liderancas = await fetchComposicaoLiderancas();
  const resultado: LiderancaCongresso[] = [];

  for (const lideranca of liderancas) {
    if (!lideranca.descricaoTipoLideranca?.includes('Líder')) {
      continue;
    }

    const categoria = mapCategoria(lideranca.descricaoTipoUnidadeLideranca);

    if (!categoria || !lideranca.nomeParlamentar || !lideranca.descricaoTipoUnidadeLideranca) {
      continue;
    }

    resultado.push({
      id: `${categoria}-${lideranca.casa}-${lideranca.nomeParlamentar}`,
      categoria,
      titulo: lideranca.descricaoTipoUnidadeLideranca,
      casa: lideranca.casa,
      nomeParlamentar: lideranca.nomeParlamentar,
      partido: lideranca.siglaPartido ?? lideranca.siglaPartidoFiliacao ?? lideranca.siglaBloco,
      dataDesignacao: lideranca.dataDesignacao,
    });
  }

  setMemoryCache(LIDERANCAS_CACHE_KEY, resultado, LIDERANCAS_CACHE_TTL);
  return resultado;
});

export async function getPartidoResumo(sigla: string): Promise<PartidoResumo | null> {
  const partidos = await fetchPartidosResumo();
  return partidos.find((partido) => partido.sigla === sigla.toUpperCase()) ?? null;
}
