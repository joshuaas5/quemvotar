import { cache } from 'react';
import type {
  LiderancaCongresso,
  PartidoLideranca,
  PartidoResumo,
  PerfilPublico,
} from './types';
import { fetchDeputados } from './camara';
import { fetchSenadores } from './senado';

const CAMARA_API_ROOT = 'https://dadosabertos.camara.leg.br/api/v2';
const SENADO_API_ROOT = 'https://legis.senado.leg.br/dadosabertos';

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

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar fonte oficial: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function compact<T>(values: Array<T | null | undefined | false>): T[] {
  return values.filter(Boolean) as T[];
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
    const payload = await fetchJson<{ dados?: CamaraPartidoDetalhe }>(
      `${CAMARA_API_ROOT}/partidos/${id}`,
    );
    return payload.dados ?? null;
  } catch {
    return null;
  }
});

function getPartyLeader(
  liderancas: LiderancaRaw[],
  sigla: string,
  casa: 'CD' | 'SF',
): PartidoLideranca | null {
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

export const fetchPartidosResumo = cache(async (): Promise<PartidoResumo[]> => {
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

  await Promise.all(
    partidosOrdenados.map(async (partido) => {
      const referencia = camaraIndex.get(partido.sigla);

      if (!referencia) {
        detalhesCamara.set(partido.sigla, null);
        return;
      }

      detalhesCamara.set(partido.sigla, await fetchCamaraPartidoDetalhe(referencia.id));
    }),
  );

  return partidosOrdenados.map((totaisPartido) => {
    const detalheCamara = detalhesCamara.get(totaisPartido.sigla);
    const blocosSenado = Array.from(
      new Set(
        senadoLista
          .filter(
            (item) =>
              item.IdentificacaoParlamentar?.SiglaPartidoParlamentar === totaisPartido.sigla,
          )
          .map(
            (item) =>
              item.IdentificacaoParlamentar?.Bloco?.NomeApelido ||
              item.IdentificacaoParlamentar?.Bloco?.NomeBloco,
          )
          .filter((value): value is string => Boolean(value)),
      ),
    );

    return {
      sigla: totaisPartido.sigla,
      nome: detalheCamara?.nome ?? totaisPartido.sigla,
      logoUrl: detalheCamara?.urlLogo ?? null,
      fonteUrl:
        detalheCamara?.uri ??
        camaraIndex.get(totaisPartido.sigla)?.uri ??
        `${SENADO_API_ROOT}/composicao/lideranca.json`,
      deputados: totaisPartido.deputados,
      senadores: totaisPartido.senadores,
      totalParlamentares: totaisPartido.totalParlamentares,
      liderCamara: detalheCamara?.status?.lider?.nome
        ? {
            nome: detalheCamara.status.lider.nome,
            cargo: 'Líder da Câmara dos Deputados',
            casa: 'CD',
            partido: totaisPartido.sigla,
            uf: detalheCamara.status.lider.uf,
            fotoUrl: detalheCamara.status.lider.urlFoto,
          }
        : getPartyLeader(liderancas, totaisPartido.sigla, 'CD'),
      liderSenado: getPartyLeader(liderancas, totaisPartido.sigla, 'SF'),
      blocosSenado,
    };
  });
});

function mapCategoria(descricao?: string): LiderancaCongresso['categoria'] | null {
  const normalized = descricao?.toLowerCase() ?? '';

  if (normalized.includes('governo')) return 'governo';
  if (normalized.includes('oposição') || normalized.includes('oposicao')) return 'oposicao';
  if (normalized.includes('maioria')) return 'maioria';
  if (normalized.includes('minoria')) return 'minoria';

  return null;
}

export const fetchLiderancasCongresso = cache(async (): Promise<LiderancaCongresso[]> => {
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

  return resultado;
});

export async function getPartidoResumo(sigla: string): Promise<PartidoResumo | null> {
  const partidos = await fetchPartidosResumo();
  return partidos.find((partido) => partido.sigla === sigla.toUpperCase()) ?? null;
}
