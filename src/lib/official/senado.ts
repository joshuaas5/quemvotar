import { cache } from 'react';
import type { PerfilPublico } from './types';

const SENADO_API_URL =
  'https://legis.senado.leg.br/dadosabertos/senador/lista/atual';

interface SenadoParlamentar {
  IdentificacaoParlamentar?: {
    CodigoParlamentar?: string;
    CodigoPublicoNaLegAtual?: string;
    NomeParlamentar?: string;
    SiglaPartidoParlamentar?: string;
    UfParlamentar?: string;
    UrlFotoParlamentar?: string;
    UrlPaginaParlamentar?: string;
  };
}

export const fetchSenadores = cache(async (): Promise<PerfilPublico[]> => {
  const response = await fetch(SENADO_API_URL, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar a API do Senado: ${response.status}`);
  }

  const payload = (await response.json()) as {
    ListaParlamentarEmExercicio?: {
      Parlamentares?: {
        Parlamentar?: SenadoParlamentar[];
      };
    };
  };

  const parlamentares =
    payload.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar ?? [];

  return parlamentares.map((parlamentar) => {
    const info = parlamentar.IdentificacaoParlamentar ?? {};

    return {
      id: `senado-${info.CodigoParlamentar ?? info.CodigoPublicoNaLegAtual ?? ''}`,
      idOrigem: String(info.CodigoParlamentar ?? info.CodigoPublicoNaLegAtual ?? ''),
      nome_urna: info.NomeParlamentar ?? 'Sem nome',
      partido: info.SiglaPartidoParlamentar ?? '--',
      uf: info.UfParlamentar ?? '',
      cargo: 'Senador',
      foto_url: info.UrlFotoParlamentar ?? '',
      casa: 'Senado Federal',
      fonte: 'senado',
      fonteUrl:
        info.UrlPaginaParlamentar ??
        'https://legis.senado.leg.br/dadosabertos/senador/lista/atual',
    };
  });
});
