import { cache } from 'react';
import type { PerfilPublico } from './types';

const CAMARA_API_URL =
  'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&itens=1000';

interface CamaraDeputado {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto?: string;
  uri?: string;
}

export const fetchDeputados = cache(async (): Promise<PerfilPublico[]> => {
  const response = await fetch(CAMARA_API_URL, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar a API da Câmara: ${response.status}`);
  }

  const payload = (await response.json()) as { dados?: CamaraDeputado[] };

  return (payload.dados ?? []).map((deputado) => ({
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
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}`,
  }));
});
