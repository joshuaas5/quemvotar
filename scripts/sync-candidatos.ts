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
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { getPosicionamento } from '../src/lib/candidatos/posicionamento';
import { CARGO_CODIGOS, CARGO_LABELS, type CargoTse } from '../src/lib/candidatos/types';
import { ELEICAO_2026, TSE_API_BASE, arquivoUrlCandidato } from '../src/lib/candidatos/urls';
import { UF_LISTA } from '../src/lib/candidatos/ufs';
import { getFotoAltaParlamentar } from '../src/lib/candidatos/foto-alta';
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
  uploadR2: boolean;
  detalhes: boolean;
  cap: number;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { ufs: null, cargos: null, out: 'public/dados/candidatos', quiet: false, uploadR2: false, detalhes: false, cap: 1000 };
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
    } else if (arg === '--upload-r2') {
      args.uploadR2 = true;
    } else if (arg === '--detalhes') {
      args.detalhes = true;
    } else if (arg === '--cap' && argv[i + 1]) {
      args.cap = Math.min(10000, Math.max(50, Number(argv[i + 1]) || 1000));
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
  /** Foto em alta resolução (Câmara/Senado) quando o candidato é parlamentar em exercício. */
  fotoAlta: string | null;
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
interface PerfilParlamentarResumo {
  nome_urna: string;
  partido: string;
  uf?: string | null;
  idOrigem: string;
  casa: 'Câmara dos Deputados' | 'Senado Federal';
}

/** Constrói um mapa chave nome|partido|uf → foto em alta do parlamentar em exercício. */
function construirChavesParlamentares(perfis: PerfilParlamentarResumo[]): Map<string, string | null> {
  const chaves = new Map<string, string | null>();
  for (const perfil of perfis) {
    chaves.set(
      `${normalizarNome(perfil.nome_urna)}|${perfil.partido.toUpperCase()}|${(perfil.uf ?? '').toUpperCase()}`,
      getFotoAltaParlamentar(perfil),
    );
  }
  return chaves;
}

function normalizar(
  raw: CandidatoRaw,
  ano: number,
  sqEleicao: number,
  uf: string,
  chavesParlamentares: Map<string, string | null>,
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
  const chaveMandato = cargoFederal
    ? chavesParlamentares.has(chaveExata)
      ? chaveExata
      : chaveCompleta !== '' && chavesParlamentares.has(chaveCompleta)
        ? chaveCompleta
        : ''
    : chaveCompleta !== '' && chavesParlamentares.has(chaveCompleta)
      ? chaveCompleta
      : '';
  const mandato = chaveMandato !== '';
  const fotoAlta = chaveMandato !== '' ? (chavesParlamentares.get(chaveMandato) ?? null) : null;

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
    fotoAlta,
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
  chavesParlamentares: Map<string, string | null>,
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

/* ── Upload para o Cloudflare R2 (fase 2 — egress grátis) ───── */

async function uploadArquivosR2(outDir: string, quiet: boolean) {
  const accountId = process.env.R2_ACCOUNT_ID ?? '';
  const accessKeyId = process.env.R2_ACCESS_KEY_ID ?? '';
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY ?? '';
  const bucket = process.env.R2_BUCKET ?? '';

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    console.warn('⚠️ --upload-r2 pedido, mas faltam envs R2_* (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET). Pulando upload.');
    return;
  }

  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  const arquivos = readdirSync(outDir).filter((f) => f.endsWith('.json'));
  let ok = 0;

  for (const arquivo of arquivos) {
    const body = readFileSync(join(outDir, arquivo));
    const isIndex = arquivo.startsWith('index');
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `candidatos/${arquivo}`,
        Body: body,
        ContentType: 'application/json; charset=utf-8',
        CacheControl: isIndex ? 'public, max-age=600, s-maxage=600' : 'public, max-age=300, s-maxage=300',
      }),
    );
    ok += 1;
  }

  if (!quiet) {
    console.log(`☁️ R2: ${ok} arquivos enviados para s3://${bucket}/candidatos/`);
  }
}

/* ── Detalhes completos (bens, plano, redes, histórico) — incrementais ──*/

type MapaDetalhes = Record<string, unknown>;

function slimDetalhe(raw: any): Record<string, unknown> {
  return {
    nomeCompleto: raw.nomeCompleto ?? null,
    sexo: raw.descricaoSexo ?? null,
    dataNascimento: raw.dataDeNascimento ?? null,
    estadoCivil: raw.descricaoEstadoCivil ?? null,
    corRaca: raw.descricaoCorRaca ?? null,
    nacionalidade: raw.nacionalidade ?? null,
    grauInstrucao: raw.grauInstrucao ?? null,
    ocupacao: raw.ocupacao ?? null,
    naturalidade: raw.descricaoNaturalidade ?? raw.nomeMunicipioNascimento ?? null,
    cnpjcampanha: raw.cnpjcampanha ?? null,
    situacaoCandidato: raw.descricaoSituacaoCandidato ?? raw.descricaoSituacao ?? null,
    legendaNome: raw.legenda?.nomeLegenda ?? raw.legenda?.legenda ?? null,
    totalDeBens: raw.totalDeBens ?? null,
    bens: (raw.bens ?? []).slice(0, 12).map((b: any) => ({
      descricao: b.descricao ?? '',
      tipo: b.descricaoDeTipoDeBem ?? '',
      valor: b.valor ?? null,
    })),
    sites: (raw.sites ?? []).filter((s: unknown) => typeof s === 'string' && /^https?:\/\//.test(s)).slice(0, 20),
    eleicoesAnteriores: (raw.eleicoesAnteriores ?? []).map((e: any) => ({
      nrAno: e.nrAno,
      cargo: e.cargo ?? '',
      partido: e.partido ?? '',
      situacaoTotalizacao: e.situacaoTotalizacao ?? '',
      local: e.local ?? null,
    })),
    planoGoverno: (() => {
      const plano = (raw.arquivos ?? []).find((a: any) => a.codTipo === '5');
      return plano
        ? {
            disponivel: true,
            nomeArquivo: plano.nome ?? null,
            urlDownload: arquivoUrlCandidato(plano.idArquivo),
          }
        : { disponivel: false };
    })(),
    motivosInelegibilidade: (() => {
      const motivos: string[] = [];
      if (raw.st_MOTIVO_FICHA_LIMPA) motivos.push('Inelegibilidade (Lei da Ficha Limpa)');
      if (raw.st_MOTIVO_ABUSO_PODER) motivos.push('Abuso de poder');
      if (raw.st_MOTIVO_COMPRA_VOTO) motivos.push('Compra de votos');
      if (raw.st_MOTIVO_CONDUTA_VEDADA) motivos.push('Conduta vedada');
      if (raw.st_MOTIVO_GASTO_ILICITO) motivos.push('Gasto ilícito de campanha');
      if (raw.st_MOTIVO_AUSENCIA_REQUISITO) motivos.push('Ausência de requisito de registro');
      if (raw.st_MOTIVO_IND_PARTIDO) motivos.push('Indeferimento por decisão do partido');
      return motivos;
    })(),
    vices: (raw.vices ?? []).slice(0, 4).map((v: any) => ({
      nome: v.nm_URNA ?? '',
      partido: v.sg_PARTIDO ?? null,
      cargo: v.ds_CARGO ?? '',
    })),
  };
}

async function syncDetalhes(
  outDir: string,
  ufs: string[],
  cargos: number[],
  ano: number,
  sqEleicao: number,
  cap: number,
  quiet: boolean,
) {
  let processados = 0;
  let falhasConsecutivas = 0;
  const DELAY_DETALHE = 450;

  for (const uf of ufs) {
    const ids = new Set<number>();
    for (const cargoCodigo of cargos) {
      const arquivo = join(outDir, `${uf}-${cargoCodigo}.json`);
      if (!existsSync(arquivo)) continue;
      const dataset = JSON.parse(readFileSync(arquivo, 'utf-8')) as { candidatos: Array<{ id: number }> };
      (dataset.candidatos ?? []).forEach((c) => ids.add(c.id));
    }
    if (ids.size === 0) continue;

    const arquivoDetalhe = join(outDir, `detalhes-${uf}.json`);
    const mapa: MapaDetalhes = existsSync(arquivoDetalhe)
      ? (JSON.parse(readFileSync(arquivoDetalhe, 'utf-8')) as { detalhes: MapaDetalhes }).detalhes ?? {}
      : {};

    const faltando = [...ids].filter((id) => mapa[String(id)] === undefined);
    if (!quiet) console.log(`🔍 ${uf}: ${ids.size} candidatos, ${faltando.length} sem detalhe ainda`);

    for (const id of faltando) {
      if (processados >= cap) break;
      if (falhasConsecutivas >= 20) {
        console.warn('⛔ Muitas falhas consecutivas (TSE bloqueando) — parando esta rodada para proteger o IP do cron.');
        await finalizarDetalhes(outDir, uf, mapa);
        return;
      }
      try {
        const raw = (await tseGet(`/candidatura/buscar/${ano}/${uf}/${sqEleicao}/candidato/${id}`)) as any;
        if (raw && typeof raw.id === 'number') {
          mapa[String(id)] = slimDetalhe(raw);
          falhasConsecutivas = 0;
        } else {
          falhasConsecutivas += 1;
        }
      } catch {
        falhasConsecutivas += 1;
      }
      processados += 1;
      if (processados % 50 === 0 && !quiet) {
        console.log(`   … ${processados}/${cap} processados`);
      }
      await new Promise((r) => setTimeout(r, DELAY_DETALHE));
    }

    await finalizarDetalhes(outDir, uf, mapa, sqEleicao);
  }

  if (!quiet) console.log(`✅ Detalhes: ${processados} candidatos processados nesta rodada (cap ${cap}).`);
}

async function finalizarDetalhes(outDir: string, uf: string, mapa: MapaDetalhes, sqEleicao = ELEICAO_2026.sqEleicao) {
  writeFileSync(
    join(outDir, `detalhes-${uf}.json`),
    JSON.stringify({ geradoEm: new Date().toISOString(), sqEleicao, uf, total: Object.keys(mapa).length, detalhes: mapa }),
    'utf-8',
  );
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

  // Modo DETALHES: só completa os perfis (bens, plano, redes, histórico),
  // incremental e devagar, para não tomar bloqueio do TSE no IP do cron.
  if (args.detalhes) {
    await syncDetalhes(outDir, ufs, cargos, ano, sqEleicao, args.cap, args.quiet);
    if (args.uploadR2) {
      await uploadArquivosR2(outDir, args.quiet);
    }
    return;
  }

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

  if (args.uploadR2) {
    await uploadArquivosR2(outDir, args.quiet);
  }
}

main().catch((error) => {
  console.error('Falha fatal:', error);
  process.exit(1);
});
