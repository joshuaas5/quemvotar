import { cache } from 'react';
import type { TseDataset, TseResource } from './types';

const TSE_CKAN_URL =
  'https://dadosabertos.tse.jus.br/api/3/action/package_search?q=candidatos';

interface CkanResource {
  id: string;
  name?: string;
  description?: string;
  format?: string;
  url?: string;
}

interface CkanPackage {
  id: string;
  name: string;
  title: string;
  notes?: string;
  metadata_modified: string;
  resources?: CkanResource[];
}

function normalizeResource(resource: CkanResource): TseResource {
  return {
    id: resource.id,
    nome: resource.name ?? 'Recurso sem nome',
    formato: resource.format ?? 'N/D',
    descricao: resource.description ?? '',
    url: resource.url ?? '',
  };
}

export const fetchTseCandidateDatasets = cache(
  async (limit = 6): Promise<TseDataset[]> => {
    const response = await fetch(TSE_CKAN_URL, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`Falha ao consultar o portal do TSE: ${response.status}`);
    }

    const payload = (await response.json()) as {
      success?: boolean;
      result?: {
        results?: CkanPackage[];
      };
    };

    const packages = (payload.result?.results ?? [])
      .filter((item) => item.title.toLowerCase().includes('candidatos'))
      .sort((a, b) => b.metadata_modified.localeCompare(a.metadata_modified))
      .slice(0, limit);

    return packages.map((item) => ({
      id: item.id,
      slug: item.name,
      titulo: item.title,
      descricao: item.notes ?? '',
      atualizadoEm: item.metadata_modified,
      recursos: (item.resources ?? []).slice(0, 5).map(normalizeResource),
    }));
  },
);
