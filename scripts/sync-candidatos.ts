#!/usr/bin/env node
/**
 * ETL — Candidatos 2026 (TSE DivulgaCandContas → snapshots JSON estáticos).
 *
 * Gera, para cada UF × cargo, um dataset normalizado com o posicionamento
 * político calculado (3 camadas). Os arquivos ficam em public/dados/candidatos
 * e são servidos estaticamente — hoje pela Vercel, amanhã pelo Cloudflare R2.
 *
 * Uso:
 *   npx tsx scripts/sync-candidatos.ts                # Brasil inteiro
 *   npx tsx scripts/sync-candidatos.ts --uf PR        # só Paraná
 *   npx tsx scripts/sync-candidatos.ts --cargo 1      # só presidente
 *   npx tsx scripts/sync-candidatos.ts --uf PR,SP --cargo 3,5,6
 *
 * Idempotente: rodar 1x ou 100x gera o mesmo resultado.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { getPosicionamento } from '../src/lib/candidatos/posicionamento';
import { CARGO_CODIGOS, CARGO_LABELS, type CargoTse } from '../src/lib/candidatos/types';
import { ELEICAO_2026, TSE_API_BASE } from '../src/lib/candidatos/urls';
import { UF_LISTA } from '../src/lib/candidatos/ufs';
import { fetchOfficialCongressProfiles } from '../src/lib/official';

/* ── Config ─────────────────────────────────────────────────── */

const CARGOS: number[] = [1, 3, 5, 6, 7, 8]; // presidente, governador, senador, dep. federal, estadual, distrital
const RETRIES = 4;
const TIMEOUT_MS = 30_000;
const DELAY_MS = 1200;

interface Args {
  ufs: string[] | null;
  cargos: number[] | null;
  out: string;
  quiet: boolean;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { ufs: null, cargos: null, out: 'public/dados/candidatos', quiet: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--uf' && argv[i + 1]) {
      args.ufs = argv[i + 1].split(',').map((s) => s.trim().toUpperCase()).filter(Boolean);
      i += 1;
    } else if (arg === '--cargo' && argv[i + 1]) {
      args.cargos = argv[i + 1].split(',').map(Number).filter((n) => CARGO_CODIGOS[n]);
      i += 1;
    } else if (arg === '--out' && argv[i + 1]) {
      args.out = argv[i + 1];
      i += 1;
    } else if (arg === '--quiet') {
      args.quiet = true;
    }
  }
  return args;
}

/* ── HTTP com retry (TSE é instável) ────────────────────────── */

async function tseGet(path: string): Promise<unknown> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(`${TSE_API_BASE}${path}`, {
        headers: { Accept: 'application/json', 'User-Agent': 'QuemVotar-ETL/1.0 (sync publico)' },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} em ${path}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error as Error;
      const delayMs = 1500 * attempt * attempt;
      await new Promise((resolveDelay) => setTimeout(resolveDelay, delayMs));
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError ?? new Error(`Falha ao consultar ${path}`);
}

/* ── Normalização leve (o suficiente para vitrine + match) ──── */

interface CandidatoLite {
  id: number;
  nomeUrna: string;
  partido: string | null;
  cargoCodigo: number;
  cargo: string;
  uf: string;
  numero: number;
  situacao: string;
  totalizacao: string | null;
  coligacao: string | null;
  foto: boolean;
  /** Já exerce mandato parlamentar hoje (deputado/senador em exercício). */
  mandato: boolean;
  /** Sinaliza reeleição declarada ao TSE (nem sempre preenchido na listagem). */
  reeleicao: boolean;
  eixo: string | null;
  base: string;
  baseLabel: string;
  confianca: number;
}

interface CandidatoRaw {
  id: number;
  nomeUrna: string;
  numero: number;
  nomeCompleto?: string | null;
  partido?: { sigla?: string | null } | null;
  descricaoSituacao?: string | null;
  descricaoTotalizacao?: string | null;
  nomeColigacao?: string | null;
  cargo?: { codigo?: number; nome?: string } | null;
  fotoUrlPublicavel?: boolean;
  st_REELEICAO?: boolean;
}

function normalizarNome(nome: string): string {
  return nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Constrói um set de chaves nome|partido|uf dos parlamentares em exercício. */
function construirChavesParlamentares(perfis: Array<{ nome_urna: string; partido: string; uf?: string | null }>): Set<string> {
  const chaves = new Set<string>();
  for (const perfil of perfis) {
    chaves.add(`${normalizarNome(perfil.nome_urna)}|${perfil.partido.toUpperCase()}|${(perfil.uf ?? '').toUpperCase()}`);
  }
  return chaves;
}

function normalizar(
  raw: CandidatoRaw,
  ano: number,
  sqEleicao: number,
  uf: string,
  chavesParlamentares: Set<string>,
): CandidatoLite {
  const cargoCodigo = raw.cargo?.codigo ?? 0;
  const cargoTse = CARGO_CODIGOS[cargoCodigo] as CargoTse | undefined;
  const posicionamento = getPosicionamento({
    idTse: raw.id,
    nome: raw.nomeUrna,
    partido: raw.partido?.sigla ?? null,
    cargo: cargoTse ?? null,
    cargoCodigo,
  });

  const chaveExata = `${normalizarNome(raw.nomeUrna)}|${(raw.partido?.sigla ?? '').toUpperCase()}|${uf}`;
  const chaveCompleta = raw.nomeCompleto
    ? `${normalizarNome(raw.nomeCompleto)}|${(raw.partido?.sigla ?? '').toUpperCase()}|${uf}`
    : '';

  // Conservador: cargo federal aceita nome de urna idêntico; cargo estadual
  // exige nome civil idêntico (evita homônimo com deputado federal).
  const cargoFederal = [5, 6].includes(cargoCodigo);
  const mandato = cargoFederal
    ? chavesParlamentares.has(chaveExata) || (chaveCompleta !== '' && chavesParlamentares.has(chaveCompleta))
    : chaveCompleta !== '' && chavesParlamentares.has(chaveCompleta);

  return {
    id: raw.id,
    nomeUrna: raw.nomeUrna,
    partido: raw.partido?.sigla ?? null,
    cargoCodigo,
    cargo: CARGO_LABELS[cargoTse ?? 'deputado-federal'],
    uf,
    numero: raw.numero,
    situacao: raw.descricaoSituacao ?? 'Não informada',
    totalizacao: raw.descricaoTotalizacao ?? null,
    coligacao: raw.nomeColigacao ?? null,
    foto: true,
    mandato,
    reeleicao: Boolean(raw.st_REELEICAO),
    eixo: posicionamento.eixo,
    base: posicionamento.base,
    baseLabel: posicionamento.baseLabel,
    confianca: Math.round(posicionamento.confianca * 100) / 100,
  };
}

/* ── Sync de uma UF+cargo ───────────────────────────────────── */

async function syncCombinacao(
  ano: number,
  sqEleicao: number,
  uf: string,
  cargoCodigo: number,
  outDir: string,
  quiet: boolean,
  chavesParlamentares: Set<string>,
): Promise<CandidatoLite[]> {
  const path = `/candidatura/listar/${ano}/${uf}/${sqEleicao}/${cargoCodigo}/candidatos`;
  const payload = (await tseGet(path)) as {
    candidatos?: CandidatoRaw[];
  };

  const candidatos = (payload.candidatos ?? []).map((raw) =>
    normalizar(raw, ano, sqEleicao, uf, chavesParlamentares),
  );

  const dataset = {
    geradoEm: new Date().toISOString(),
    ano,
    sqEleicao,
    uf,
    cargoCodigo,
    cargo: CARGO_LABELS[CARGO_CODIGOS[cargoCodigo] as CargoTse],
    fonte: 'tse-divulgacandcontas',
    total: candidatos.length,
    candidatos,
  };

  writeFileSync(join(outDir, `${uf}-${cargoCodigo}.json`), JSON.stringify(dataset), 'utf-8');

  if (!quiet) {
    const nomeCargo = CARGO_LABELS[CARGO_CODIGOS[cargoCodigo] as CargoTse];
    console.log(`✓ ${uf} | ${nomeCargo}: ${candidatos.length} candidatos`);
  }

  return candidatos;
}

/* ── Main ───────────────────────────────────────────────────── */

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outDir = resolve(process.cwd(), args.out);
  mkdirSync(outDir, { recursive: true });

  const ufs = args.ufs ?? ['BR', ...UF_LISTA.map((u) => u.sigla)];
  const cargos = args.cargos ?? CARGOS;
  const ano = ELEICAO_2026.ano;
  const sqEleicao = ELEICAO_2026.sqEleicao;

  // Referência de parlamentares em exercício (para marcar quem já tem mandato)
  const perfisParlamentares = await fetchOfficialCongressProfiles().catch(() => []);
  const chavesParlamentares = construirChavesParlamentares(perfisParlamentares);
  if (!args.quiet) {
    console.log(`🏛️ Referência: ${perfisParlamentares.length} parlamentares em exercício`);
  }

  const inicio = Date.now();
  let total = 0;
  const resumo: Record<string, number> = {};

  for (const uf of ufs) {
    for (const cargoCodigo of cargos) {
      try {
        const candidatos = await syncCombinacao(ano, sqEleicao, uf, cargoCodigo, outDir, args.quiet, chavesParlamentares);
        total += candidatos.length;
        resumo[`${uf}-${cargoCodigo}`] = candidatos.length;
      } catch (error) {
        const mensagem = error instanceof Error ? error.message : String(error);
        console.error(`✗ ${uf} | cargo ${cargoCodigo}: ${mensagem}`);
      }
      await new Promise((resolveDelay) => setTimeout(resolveDelay, DELAY_MS));
    }
  }

  // Índices (usados pela busca e pelo Match client-side)
  const indexGlobal: CandidatoLite[] = [];
  const porUf: Record<string, number> = {};

  for (const uf of ufs) {
    const entries: CandidatoLite[] = [];
    for (const cargoCodigo of cargos) {
      const arquivo = join(outDir, `${uf}-${cargoCodigo}.json`);
      if (!existsSync(arquivo)) continue;
      const dataset = JSON.parse(readFileSync(arquivo, 'utf-8')) as { candidatos: CandidatoLite[] };
      entries.push(...dataset.candidatos.map((c) => ({ ...c, uf })));
    }
    porUf[uf] = entries.length;
    writeFileSync(
      join(outDir, `index-${uf}.json`),
      JSON.stringify({ geradoEm: new Date().toISOString(), ano, sqEleicao, uf, total: entries.length, candidatos: entries }),
      'utf-8',
    );
    indexGlobal.push(...entries);
  }

  const porCargo: Record<string, number> = {};
  for (const cargoCodigo of cargos) {
    porCargo[String(cargoCodigo)] = indexGlobal.filter((c) => c.cargoCodigo === cargoCodigo).length;
  }

  writeFileSync(
    join(outDir, 'index.json'),
    JSON.stringify({
      geradoEm: new Date().toISOString(),
      ano,
      sqEleicao,
      fonte: 'tse-divulgacandcontas',
      total: indexGlobal.length,
      porCargo,
      porUf,
      candidatos: indexGlobal,
    }),
    'utf-8',
  );

  const segundos = ((Date.now() - inicio) / 1000).toFixed(0);
  console.log(`\n✅ Sync concluído: ${total} candidatos em ${ufs.length} UF × ${cargos.length} cargos (${segundos}s)`);
  console.log(`📁 Saída: ${outDir}`);
}

main().catch((error) => {
  console.error('Falha fatal:', error);
  process.exit(1);
});
