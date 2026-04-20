const CAMARA_BANDEP_PATH = '/internet/deputado/bandep/';
const CAMARA_HIGH_QUALITY_PATH = '/internet/deputado/bandep/pagina_do_deputado/';

function toHttps(url: string): string {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://').trim();
}

function extractNumericId(value?: string): string | null {
  if (!value) return null;
  const digits = value.match(/\d+/g)?.join('') ?? '';
  return digits.length > 0 ? digits : null;
}

export function getHighQualityCamaraPhotoUrl(id: string): string {
  const deputadoId = extractNumericId(id);
  if (!deputadoId) return '';
  return `https://www.camara.leg.br${CAMARA_HIGH_QUALITY_PATH}${deputadoId}.jpg`;
}

export function upgradeCamaraPhotoUrl(url?: string | null): string {
  const normalized = toHttps(url ?? '');
  if (!normalized) return '';

  if (normalized.includes(CAMARA_HIGH_QUALITY_PATH)) {
    return normalized;
  }

  const idFromUrl = normalized.match(/bandep\/(?:pagina_do_deputado\/)?(\d+)\.jpg/i)?.[1];
  if (idFromUrl) {
    return getHighQualityCamaraPhotoUrl(idFromUrl) || normalized;
  }

  if (normalized.includes(CAMARA_BANDEP_PATH)) {
    return normalized.replace(CAMARA_BANDEP_PATH, CAMARA_HIGH_QUALITY_PATH);
  }

  return normalized;
}

export function getHighQualitySenadoPhotoUrl(id: string): string {
  const senadorId = extractNumericId(id);
  if (!senadorId) return '';
  return `https://www.senado.leg.br/senadores/img/fotos-oficiais/senador${senadorId}.jpg`;
}

export function improveProfilePhotoUrl(
  fonte: 'camara' | 'senado',
  idOrigem: string,
  currentUrl?: string | null,
): string {
  if (fonte === 'camara') {
    const highQuality = getHighQualityCamaraPhotoUrl(idOrigem);
    if (highQuality) return highQuality;
    return upgradeCamaraPhotoUrl(currentUrl);
  }

  const senadoHighQuality = getHighQualitySenadoPhotoUrl(idOrigem);
  if (senadoHighQuality) return senadoHighQuality;
  return toHttps(currentUrl ?? '');
}

export function normalizeRemoteImageUrl(url?: string | null): string {
  return toHttps(url ?? '');
}
