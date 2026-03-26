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
    throw new Error(`Falha ao consultar a API p�blica do CNJ: ${response.status}`);
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
