import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const CAMARA_PARTIES = 'https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla&itens=100';
const CAMARA_PARTY_DETAIL = 'https://dadosabertos.camara.leg.br/api/v2/partidos/';
const SEARCH_API = 'https://pt.wikipedia.org/w/api.php?action=query&list=search&srlimit=5&format=json&utf8=1&srsearch=';
const SUMMARY_API = 'https://pt.wikipedia.org/api/rest_v1/page/summary/';

const MANUAL_LOGOS = {
  PL: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Partido_Liberal_%28Brazil%29_logo.svg',
};

function normalizeSigla(sigla) {
  return sigla
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase();
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function pickExtension(url) {
  const clean = url.split('?')[0].toLowerCase();
  if (clean.endsWith('.svg')) return '.svg';
  if (clean.endsWith('.webp')) return '.webp';
  if (clean.endsWith('.png')) return '.png';
  if (clean.endsWith('.jpg') || clean.endsWith('.jpeg')) return '.jpg';
  if (clean.endsWith('.gif')) return '.gif';
  return '.png';
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${url}`);
  return response.json();
}

async function fetchCamaraOfficialLogo(partyId) {
  try {
    const detail = await fetchJson(`${CAMARA_PARTY_DETAIL}${partyId}`);
    return detail?.dados?.urlLogo ?? null;
  } catch {
    return null;
  }
}

async function tryWikipediaLogo(sigla, nome) {
  const normalizedSigla = normalizeSigla(sigla).toLowerCase();
  const normalizedNome = normalizeText(nome);
  const tokens = normalizedNome
    .split(/\s+/)
    .map((token) => token.replace(/[^a-z0-9]/g, ''))
    .filter(
      (token) =>
        token.length >= 3 &&
        !['partido', 'politico', 'politica', 'brasil', 'do', 'da', 'de', 'e'].includes(token),
    );

  const queries = [
    `${nome} partido politico brasil`,
    `${nome} partido brasileiro`,
    `${sigla} partido politico brasil`,
  ];

  for (const query of queries) {
    try {
      const search = await fetchJson(`${SEARCH_API}${encodeURIComponent(query)}`);
      const hits = search?.query?.search ?? [];

      for (const hit of hits) {
        const title = String(hit?.title ?? '');
        if (!title) continue;

        const normalizedTitle = normalizeText(title);
        const tokenMatches = tokens.filter((token) => normalizedTitle.includes(token)).length;

        const titleLooksLikeParty =
          normalizedTitle.includes(normalizedSigla) ||
          tokenMatches >= 2 ||
          (tokenMatches >= 1 && normalizedTitle.includes('partido')) ||
          normalizedTitle.includes('(brasil)');

        if (!titleLooksLikeParty) continue;

        const summaryResponse = await fetch(`${SUMMARY_API}${encodeURIComponent(title)}`, {
          headers: { Accept: 'application/json' },
        });
        if (!summaryResponse.ok) continue;

        const summary = await summaryResponse.json();
        const imageUrl = summary?.originalimage?.source ?? summary?.thumbnail?.source;
        if (!imageUrl) continue;

        return imageUrl;
      }
    } catch {
      // try next query
    }
  }

  return null;
}

async function downloadLogo(url, filePath) {
  const response = await fetch(url);
  if (!response.ok) return false;
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(filePath, bytes);
  return true;
}

async function main() {
  const root = process.cwd();
  const logosDir = path.join(root, 'public', 'logos', 'partidos');
  const generatedFile = path.join(root, 'src', 'lib', 'party-logos.generated.ts');

  await mkdir(logosDir, { recursive: true });

  const camara = await fetchJson(CAMARA_PARTIES);
  const parties = camara?.dados ?? [];
  const manifest = {};

  for (const party of parties) {
    const siglaOriginal = String(party.sigla ?? '').trim();
    const sigla = normalizeSigla(siglaOriginal);
    const nome = String(party.nome ?? siglaOriginal).trim();

    if (!sigla) continue;

    const officialLogo = await fetchCamaraOfficialLogo(party.id);
    const wikipediaLogo = await tryWikipediaLogo(siglaOriginal, nome);
    const manualLogo = MANUAL_LOGOS[sigla] ?? null;
    const candidates = [officialLogo, wikipediaLogo, manualLogo].filter(Boolean);

    if (!candidates.length) continue;

    let resolvedPath = null;

    for (const logoUrl of candidates) {
      const ext = pickExtension(logoUrl);
      const fileName = `${sigla}${ext}`;
      const filePath = path.join(logosDir, fileName);

      try {
        const ok = await downloadLogo(logoUrl, filePath);
        if (!ok) continue;
        resolvedPath = `/logos/partidos/${fileName}`;
        console.log(`OK ${sigla} <- ${logoUrl}`);
        break;
      } catch {
        if (existsSync(filePath)) {
          resolvedPath = `/logos/partidos/${fileName}`;
          break;
        }
      }
    }

    if (resolvedPath) {
      manifest[sigla] = resolvedPath;
    }
  }

  const sortedEntries = Object.entries(manifest).sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'));
  const generated = [
    '// Auto-generated by scripts/sync-party-logos.mjs',
    'export const PARTY_LOGOS: Record<string, string> = {',
    ...sortedEntries.map(([key, value]) => `  "${key}": "${value}",`),
    '};',
    '',
  ].join('\n');

  await writeFile(generatedFile, generated, 'utf8');
  console.log(`Generated ${generatedFile} with ${sortedEntries.length} logos.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
