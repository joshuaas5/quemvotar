import { cache } from 'react';
import { supabase } from './supabase';

export interface PerfilPublico {
  id: string;
  id_tse?: string;
  nome_urna: string;
  partido: string;
  uf?: string;
  cargo: string;
  foto_url: string;
  casa: 'Camara dos Deputados' | 'Senado Federal';
  fonte: 'supabase' | 'camara' | 'senado';
}

export interface PanoramaDados {
  totalParlamentares: number | null;
  totalDeputados: number | null;
  totalSenadores: number | null;
  totalUfs: number | null;
  fonteAtual: 'espelho_supabase' | 'apis_oficiais' | 'indisponivel';
}

interface SupabaseRow {
  id: string;
  id_tse?: string | null;
  nome_urna: string;
  partido: string;
  uf?: string | null;
  cargo: string;
  foto_url?: string | null;
}

const CAMARA_API_URL =
  'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&itens=1000';
const SENADO_API_URL =
  'https://legis.senado.leg.br/dadosabertos/senador/lista/atual';

export const OFFICIAL_SOURCE_LINKS = [
  {
    id: 'camara',
    label: 'API oficial da Camara dos Deputados',
    href: 'https://dadosabertos.camara.leg.br/api/v2/deputados',
  },
  {
    id: 'senado',
    label: 'Dados Abertos do Senado Federal',
    href: 'https://legis.senado.leg.br/dadosabertos/senador/lista/atual',
  },
];

function inferCasa(cargo: string): PerfilPublico['casa'] {
  return cargo.toLowerCase().includes('senador')
    ? 'Senado Federal'
    : 'Camara dos Deputados';
}

function normalizeSupabaseRow(row: SupabaseRow): PerfilPublico {
  return {
    id: row.id,
    id_tse: row.id_tse ?? undefined,
    nome_urna: row.nome_urna,
    partido: row.partido,
    uf: row.uf ?? undefined,
    cargo: row.cargo,
    foto_url: row.foto_url ?? '',
    casa: inferCasa(row.cargo),
    fonte: 'supabase',
  };
}

function normalizeCamaraDeputado(record: Record<string, unknown>): PerfilPublico {
  return {
    id: String(record.id ?? ''),
    id_tse: String(record.id ?? ''),
    nome_urna: String(record.nome ?? 'Deputado sem nome'),
    partido: String(record.siglaPartido ?? '--'),
    uf: String(record.siglaUf ?? ''),
    cargo: 'Deputado Federal',
    foto_url: String(record.urlFoto ?? ''),
    casa: 'Camara dos Deputados',
    fonte: 'camara',
  };
}

function normalizeSenador(record: Record<string, unknown>): PerfilPublico {
  const identificacao = (record.IdentificacaoParlamentar ??
    {}) as Record<string, unknown>;

  return {
    id: String(
      identificacao.CodigoParlamentar ?? identificacao.CodigoPublicoNaLegAtual ?? '',
    ),
    id_tse: String(
      identificacao.CodigoParlamentar ?? identificacao.CodigoPublicoNaLegAtual ?? '',
    ),
    nome_urna: String(identificacao.NomeParlamentar ?? 'Senador sem nome'),
    partido: String(identificacao.SiglaPartidoParlamentar ?? '--'),
    uf: String(identificacao.UfParlamentar ?? ''),
    cargo: 'Senador',
    foto_url: String(identificacao.UrlFotoParlamentar ?? ''),
    casa: 'Senado Federal',
    fonte: 'senado',
  };
}

async function fetchJson<T>(url: string, headers?: Record<string, string>): Promise<T> {
  const response = await fetch(url, {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar ${url}: ${response.status}`);
  }

  return (await response.json()) as T;
}

const fetchCamaraDeputados = cache(async (): Promise<PerfilPublico[]> => {
  try {
    const payload = await fetchJson<{ dados?: Array<Record<string, unknown>> }>(
      CAMARA_API_URL,
      { Accept: 'application/json' },
    );

    return (payload.dados ?? []).map(normalizeCamaraDeputado);
  } catch (error) {
    console.error('Erro ao consultar a API oficial da Camara:', error);
    return [];
  }
});

const fetchSenadores = cache(async (): Promise<PerfilPublico[]> => {
  try {
    const payload = await fetchJson<{
      ListaParlamentarEmExercicio?: {
        Parlamentares?: {
          Parlamentar?: Array<Record<string, unknown>>;
        };
      };
    }>(SENADO_API_URL, { Accept: 'application/json' });

    return (
      payload.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar ?? []
    ).map(normalizeSenador);
  } catch (error) {
    console.error('Erro ao consultar a API oficial do Senado:', error);
    return [];
  }
});

const fetchOfficialProfiles = cache(async (): Promise<PerfilPublico[]> => {
  const [deputados, senadores] = await Promise.all([
    fetchCamaraDeputados(),
    fetchSenadores(),
  ]);

  return [...deputados, ...senadores].sort((a, b) =>
    a.nome_urna.localeCompare(b.nome_urna, 'pt-BR'),
  );
});

async function getMirroredProfiles(options?: {
  limit?: number;
  query?: string;
}): Promise<PerfilPublico[]> {
  if (!supabase) {
    return [];
  }

  try {
    let request = supabase
      .from('candidatos')
      .select('id, id_tse, nome_urna, partido, uf, cargo, foto_url')
      .order('nome_urna', { ascending: true });

    if (options?.query) {
      request = request.or(
        `nome_urna.ilike.%${options.query}%,partido.ilike.%${options.query}%`,
      );
    }

    if (options?.limit) {
      request = request.limit(options.limit);
    }

    const { data, error } = await request;

    if (error) {
      throw error;
    }

    return (data ?? []).map((row) => normalizeSupabaseRow(row as SupabaseRow));
  } catch (error) {
    console.error('Erro ao consultar o espelho Supabase:', error);
    return [];
  }
}

async function getMirroredStats(): Promise<PanoramaDados> {
  if (!supabase) {
    return {
      totalParlamentares: null,
      totalDeputados: null,
      totalSenadores: null,
      totalUfs: null,
      fonteAtual: 'indisponivel',
    };
  }

  try {
    const [total, deputados, senadores, ufs] = await Promise.all([
      supabase.from('candidatos').select('id', { count: 'exact', head: true }),
      supabase
        .from('candidatos')
        .select('id', { count: 'exact', head: true })
        .eq('cargo', 'Deputado Federal'),
      supabase
        .from('candidatos')
        .select('id', { count: 'exact', head: true })
        .eq('cargo', 'Senador'),
      supabase.from('candidatos').select('uf'),
    ]);

    if (total.error || deputados.error || senadores.error || ufs.error) {
      throw total.error ?? deputados.error ?? senadores.error ?? ufs.error;
    }

    const totalUfs = new Set(
      (ufs.data ?? [])
        .map((row) => row.uf)
        .filter((value): value is string => Boolean(value)),
    ).size;

    return {
      totalParlamentares: total.count ?? 0,
      totalDeputados: deputados.count ?? 0,
      totalSenadores: senadores.count ?? 0,
      totalUfs,
      fonteAtual: 'espelho_supabase',
    };
  } catch (error) {
    console.error('Erro ao calcular panorama a partir do Supabase:', error);
    return {
      totalParlamentares: null,
      totalDeputados: null,
      totalSenadores: null,
      totalUfs: null,
      fonteAtual: 'indisponivel',
    };
  }
}

export function getCasaBadge(perfil: PerfilPublico): string {
  return perfil.casa === 'Senado Federal'
    ? 'SENADO FEDERAL'
    : 'CAMARA DOS DEPUTADOS';
}

export function getFonteBadge(perfil: PerfilPublico): string {
  switch (perfil.fonte) {
    case 'camara':
      return 'FONTE OFICIAL: CAMARA';
    case 'senado':
      return 'FONTE OFICIAL: SENADO';
    default:
      return 'ESPELHO OFICIAL: SUPABASE';
  }
}

export async function getHighlights(): Promise<PerfilPublico[]> {
  const mirrored = await getMirroredProfiles({ limit: 3 });
  if (mirrored.length > 0) {
    return mirrored;
  }

  const [deputados, senadores] = await Promise.all([
    fetchCamaraDeputados(),
    fetchSenadores(),
  ]);

  return [...deputados.slice(0, 2), ...senadores.slice(0, 1)].filter(Boolean);
}

export async function searchCandidatos(query: string): Promise<PerfilPublico[]> {
  const sanitizedQuery = query.trim();

  if (!sanitizedQuery) {
    return [];
  }

  const mirrored = await getMirroredProfiles({
    limit: 10,
    query: sanitizedQuery,
  });

  if (mirrored.length > 0) {
    return mirrored;
  }

  const officialProfiles = await fetchOfficialProfiles();
  const normalizedQuery = sanitizedQuery.toLowerCase();

  return officialProfiles
    .filter((perfil) => {
      const searchable = [
        perfil.nome_urna,
        perfil.partido,
        perfil.uf ?? '',
        perfil.cargo,
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    })
    .slice(0, 10);
}

export async function getPanoramaDados(): Promise<PanoramaDados> {
  const mirroredStats = await getMirroredStats();

  if (mirroredStats.totalParlamentares) {
    return mirroredStats;
  }

  const [deputados, senadores] = await Promise.all([
    fetchCamaraDeputados(),
    fetchSenadores(),
  ]);

  const oficiais = [...deputados, ...senadores];

  if (oficiais.length === 0) {
    return {
      totalParlamentares: null,
      totalDeputados: null,
      totalSenadores: null,
      totalUfs: null,
      fonteAtual: 'indisponivel',
    };
  }

  return {
    totalParlamentares: oficiais.length,
    totalDeputados: deputados.length,
    totalSenadores: senadores.length,
    totalUfs: new Set(
      oficiais
        .map((perfil) => perfil.uf)
        .filter((value): value is string => Boolean(value)),
    ).size,
    fonteAtual: 'apis_oficiais',
  };
}
