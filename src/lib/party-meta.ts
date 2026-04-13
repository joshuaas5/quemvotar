type PartySpectrum = 'esquerda' | 'centro-esquerda' | 'centro' | 'centro-direita' | 'direita';

interface PartyMeta {
  primary: string;
  secondary: string;
  family: string;
  spectrum: PartySpectrum;
  economicAxis: -2 | -1 | 0 | 1 | 2;
  socialAxis: -2 | -1 | 0 | 1 | 2;
}

export const PARTY_META: Record<string, PartyMeta> = {
  AGIR: { primary: '#264653', secondary: '#5fa8d3', family: 'Centro reformista', spectrum: 'centro', economicAxis: 0, socialAxis: 0 },
  AVANTE: { primary: '#f05d23', secondary: '#ffd166', family: 'Centro popular', spectrum: 'centro', economicAxis: 0, socialAxis: 0 },
  CIDADANIA: { primary: '#ff7f11', secondary: '#1f2937', family: 'Centro liberal', spectrum: 'centro', economicAxis: 1, socialAxis: 0 },
  MDB: { primary: '#f04e36', secondary: '#f9c74f', family: 'Centro democrático', spectrum: 'centro', economicAxis: 0, socialAxis: 0 },
  MOBILIZA: { primary: '#1d4ed8', secondary: '#60a5fa', family: 'Centro conservador', spectrum: 'centro-direita', economicAxis: 1, socialAxis: 1 },
  NOVO: { primary: '#f97316', secondary: '#0f172a', family: 'Liberal', spectrum: 'direita', economicAxis: 2, socialAxis: 1 },
  PCdoB: { primary: '#c1121f', secondary: '#f6bd60', family: 'Comunista', spectrum: 'esquerda', economicAxis: -2, socialAxis: -1 },
  PDT: { primary: '#dc2626', secondary: '#f59e0b', family: 'Trabalhista', spectrum: 'centro-esquerda', economicAxis: -1, socialAxis: -1 },
  PL: { primary: '#1d4ed8', secondary: '#f59e0b', family: 'Liberal-conservador', spectrum: 'direita', economicAxis: 2, socialAxis: 2 },
  PODE: { primary: '#1d3557', secondary: '#e63946', family: 'Centro reformista', spectrum: 'centro-direita', economicAxis: 1, socialAxis: 1 },
  PP: { primary: '#2563eb', secondary: '#fde047', family: 'Conservador liberal', spectrum: 'centro-direita', economicAxis: 2, socialAxis: 1 },
  PRD: { primary: '#2563eb', secondary: '#ef4444', family: 'Centro-direita', spectrum: 'centro-direita', economicAxis: 1, socialAxis: 1 },
  PSB: { primary: '#f97316', secondary: '#ef4444', family: 'Socialista democrática', spectrum: 'centro-esquerda', economicAxis: -1, socialAxis: -1 },
  PSD: { primary: '#1d4ed8', secondary: '#22c55e', family: 'Centro pragmático', spectrum: 'centro', economicAxis: 0, socialAxis: 0 },
  PSDB: { primary: '#2563eb', secondary: '#f59e0b', family: 'Social-democrata', spectrum: 'centro', economicAxis: 0, socialAxis: 0 },
  PSOL: { primary: '#dc2626', secondary: '#111827', family: 'Esquerda socialista', spectrum: 'esquerda', economicAxis: -2, socialAxis: -2 },
  PT: { primary: '#d90429', secondary: '#111827', family: 'Esquerda trabalhista', spectrum: 'esquerda', economicAxis: -2, socialAxis: -1 },
  PV: { primary: '#16a34a', secondary: '#84cc16', family: 'Ecologista', spectrum: 'centro-esquerda', economicAxis: -1, socialAxis: -2 },
  REDE: { primary: '#16a34a', secondary: '#0891b2', family: 'Sustentabilidade', spectrum: 'centro-esquerda', economicAxis: -1, socialAxis: -2 },
  REPUBLICANOS: { primary: '#1d4ed8', secondary: '#f97316', family: 'Conservador', spectrum: 'direita', economicAxis: 1, socialAxis: 2 },
  SOLIDARIEDADE: { primary: '#7c3aed', secondary: '#ec4899', family: 'Sindical e popular', spectrum: 'centro', economicAxis: -1, socialAxis: 0 },
  UNIÃO: { primary: '#1d4ed8', secondary: '#facc15', family: 'Centro liberal', spectrum: 'centro-direita', economicAxis: 1, socialAxis: 0 },
};

export function getPartyMeta(sigla: string) {
  return PARTY_META[sigla] ?? {
    primary: '#111827',
    secondary: '#9ca3af',
    family: 'Centro político',
    spectrum: 'centro' as const,
    economicAxis: 0 as const,
    socialAxis: 0 as const,
  };
}

export function getSpectrumLabel(spectrum: PartySpectrum) {
  switch (spectrum) {
    case 'esquerda':
      return 'Esquerda';
    case 'centro-esquerda':
      return 'Centro-esquerda';
    case 'centro':
      return 'Centro';
    case 'centro-direita':
      return 'Centro-direita';
    case 'direita':
      return 'Direita';
  }
}

export function buildPartyBadgeDataUrl(sigla: string, primary: string, secondary: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="320" height="320" rx="48" fill="url(#g)" />
      <circle cx="255" cy="72" r="34" fill="rgba(255,255,255,0.18)" />
      <circle cx="72" cy="250" r="48" fill="rgba(255,255,255,0.12)" />
      <text x="160" y="184" text-anchor="middle" font-family="Arial, sans-serif" font-size="92" font-weight="800" fill="#ffffff">${sigla}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
