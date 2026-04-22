import type { CnjProcessoResumo } from './types';

const CNJ_PUBLIC_API_KEY =
  'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==';
const CNJ_API_BASE = 'https://api-publica.datajud.cnj.jus.br';

interface CnjHit {
  _source?: {
    numeroProcesso?: string;
    tribunal?: string;
    grau?: string;
    classe?: {
      nome?: string;
    };
    assuntos?: Array<{
      nome?: string;
    }>;
    orgaoJulgador?: {
      nome?: string;
    };
    dataAjuizamento?: string;
    dataHoraUltimaAtualizacao?: string;
  };
}

function buildEndpoint(tribunalSlug: string) {
  return `${CNJ_API_BASE}/api_publica_${tribunalSlug.toLowerCase()}/_search`;
}

const TRIBUNAIS_BUSCA = [
  'trf1', 'trf2', 'trf3', 'trf4', 'trf5', 'trf6',
  'tjac', 'tjal', 'tjap', 'tjba', 'tjce', 'tjdf', 'tjes', 'tjgo',
  'tjma', 'tjmg', 'tjms', 'tjmt', 'tjpa', 'tjpb', 'tjpe', 'tjpi',
  'tjpr', 'tjrj', 'tjrn', 'tjro', 'tjrr', 'tjrs', 'tjsc', 'tjse',
  'tjsp', 'tjto',
];

async function fetchCnjByName(tribunalSlug: string, nome: string): Promise<CnjProcessoResumo[]> {
  const response = await fetch(buildEndpoint(tribunalSlug), {
    method: 'POST',
    headers: {
      Authorization: `ApiKey ${CNJ_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      size: 10,
      query: {
        match: {
          'partes.nome': nome,
        },
      },
    }),
    cache: 'no-store',
  });

  if (!response.ok) return [];

  const payload = (await response.json()) as {
    hits?: {
      hits?: CnjHit[];
    };
  };

  return (payload.hits?.hits ?? [])
    .map((hit) => hit._source)
    .filter((source): source is NonNullable<typeof source> => Boolean(source?.numeroProcesso))
    .map((hit) => ({
      numeroProcesso: hit.numeroProcesso!,
      tribunal: hit.tribunal ?? tribunalSlug.toUpperCase(),
      grau: hit.grau ?? 'N/D',
      classe: hit.classe?.nome ?? 'N/D',
      assuntoPrincipal: hit.assuntos?.[0]?.nome ?? null,
      orgaoJulgador: hit.orgaoJulgador?.nome ?? 'N/D',
      dataAjuizamento: hit.dataAjuizamento ?? null,
      ultimaAtualizacao: hit.dataHoraUltimaAtualizacao ?? null,
      fonteUrl: buildEndpoint(tribunalSlug),
    }));
}

export async function searchCnjByPoliticianName(nome: string): Promise<CnjProcessoResumo[]> {
  const sanitized = nome.trim();
  if (!sanitized) return [];

  const results = await Promise.allSettled(
    TRIBUNAIS_BUSCA.map((t) => fetchCnjByName(t, sanitized)),
  );

  const all = results
    .filter((r): r is PromiseFulfilledResult<CnjProcessoResumo[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value);

  // Deduplicar por número de processo
  const seen = new Set<string>();
  return all.filter((p) => {
    if (seen.has(p.numeroProcesso)) return false;
    seen.add(p.numeroProcesso);
    return true;
  });
}

export async function searchCnjProcessByNumber(
  tribunalSlug: string,
  numeroProcesso: string,
): Promise<CnjProcessoResumo | null> {
  const sanitizedNumber = numeroProcesso.replace(/\D/g, '');
  const sanitizedTribunal = tribunalSlug.trim().toLowerCase();

  if (!sanitizedNumber || !sanitizedTribunal) {
    return null;
  }

  const response = await fetch(buildEndpoint(sanitizedTribunal), {
    method: 'POST',
    headers: {
      Authorization: `ApiKey ${CNJ_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {
        match: {
          numeroProcesso: sanitizedNumber,
        },
      },
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar a API pública do CNJ: ${response.status}`);
  }

  const payload = (await response.json()) as {
    hits?: {
      hits?: CnjHit[];
    };
  };

  const hit = payload.hits?.hits?.[0]?._source;

  if (!hit?.numeroProcesso) {
    return null;
  }

  return {
    numeroProcesso: hit.numeroProcesso,
    tribunal: hit.tribunal ?? tribunalSlug.toUpperCase(),
    grau: hit.grau ?? 'N/D',
    classe: hit.classe?.nome ?? 'N/D',
    assuntoPrincipal: hit.assuntos?.[0]?.nome ?? null,
    orgaoJulgador: hit.orgaoJulgador?.nome ?? 'N/D',
    dataAjuizamento: hit.dataAjuizamento ?? null,
    ultimaAtualizacao: hit.dataHoraUltimaAtualizacao ?? null,
    fonteUrl: buildEndpoint(sanitizedTribunal),
  };
}
