export type RankingLookupHouse = 'camara' | 'senado';

type RankingLookupKeyInput = {
  nome: string;
  partido?: string | null;
  uf?: string | null;
  casa: RankingLookupHouse;
};

function normalizeToken(value?: string | null): string {
  return (value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

export function rankingHouseFromCargo(cargo?: string | null): RankingLookupHouse | null {
  const normalized = normalizeToken(cargo);
  if (normalized.includes('DEPUTAD')) return 'camara';
  if (normalized.includes('SENADOR')) return 'senado';
  return null;
}

export function buildRankingLookupKey(input: RankingLookupKeyInput): string {
  return [
    normalizeToken(input.nome),
    normalizeToken(input.partido),
    normalizeToken(input.uf),
    input.casa,
  ].join('|');
}
