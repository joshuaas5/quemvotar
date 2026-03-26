import { PARTY_LOGOS } from './party-logos.generated';

export function normalizePartySigla(sigla: string): string {
  return sigla
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase();
}

export function getPartyLogoBySigla(sigla: string): string | null {
  const normalized = normalizePartySigla(sigla);
  return PARTY_LOGOS[normalized] ?? null;
}

export function getPartyVisualEmoji(sigla: string): string {
  const normalized = normalizePartySigla(sigla);

  if (['PT', 'PCDOB', 'PSOL', 'PSB', 'PDT', 'PV', 'REDE'].includes(normalized)) {
    return '🌹';
  }

  if (['PL', 'NOVO', 'REPUBLICANOS', 'PP', 'UNIAO', 'PRD'].includes(normalized)) {
    return '🛡️';
  }

  return '🏛️';
}
