import type { BasePosicionamento, EixoEspectro, PosicionamentoCandidato } from './types';
import { ANALISE_CURADA_2026, type AnaliseCurada } from './analise-curada';
import { analisarPlanoGoverno } from './plano-governo';

/* ────────────────────────────────────────────────────────────────
 * Motor de posicionamento político (eixo esquerda–direita).
 *
 * Metodologia — 3 camadas, na ordem:
 *   1. ANÁLISE CURADA  — análise humana/documentada feita pela
 *      redação do QuemVotar para candidatos-chave (ver
 *      analise-curada.ts). Vale para qualquer cargo.
 *   2. PLANO DE GOVERNO — análise automática do texto do plano
 *      oficial registrado no TSE (só cargos executivos). Motor
 *      determinístico de palavras-chave, auditável.
 *   3. PARTIDO — estimativa pelo posicionamento público do
 *      partido. SEMPRE rotulada como tal na interface.
 *
 * Nenhuma camada é apresentada como verdade absoluta: a página
 * exibe a base usada, a confiança e a justificativa.
 * ──────────────────────────────────────────────────────────────── */

export const EIXO_LABELS: Record<EixoEspectro, string> = {
  esquerda: 'Esquerda',
  'centro-esquerda': 'Centro-esquerda',
  centro: 'Centro',
  'centro-direita': 'Centro-direita',
  direita: 'Direita',
};

export const EIXO_ORDER: EixoEspectro[] = ['esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita'];

export const BASE_LABELS: Record<BasePosicionamento, string> = {
  'plano-de-governo': 'Plano de governo',
  'analise-curada': 'Análise QuemVotar',
  partido: 'Posição do partido',
  indefinido: 'Não avaliado',
};

interface PartySpectrumEntry {
  eixo: EixoEspectro;
  familia: string;
  resumo: string;
}

/**
 * Mapa de posicionamento público dos partidos registrados no TSE.
 * Base: estatutos, programas partidários e comportamento
 * parlamentar consolidado — referenciados na página de metodologia.
 */
export const PARTIDOS_ESPECTRO: Record<string, PartySpectrumEntry> = {
  AGIR: { eixo: 'centro', familia: 'Centro reformista', resumo: 'partido de centro com ênfase em reformas administrativas e gestão.' },
  DEMOCRATA: { eixo: 'direita', familia: 'Liberal radical', resumo: 'partido liberal de direita com agenda radical de corte de impostos.' },
  MISSÃO: { eixo: 'centro-direita', familia: 'Centro-direita reformista', resumo: 'partido de centro-direita reformista, crítico tanto da direita liberal simplista quanto do conservadorismo radical.' },
  PRTB: { eixo: 'direita', familia: 'Trabalhista nacionalista', resumo: 'partido de direita com discurso trabalhista-nacionalista e populista.' },
  AVANTE: { eixo: 'centro', familia: 'Centro popular', resumo: 'partido de centro com discurso popular e pauta trabalhista moderada.' },
  CIDADANIA: { eixo: 'centro', familia: 'Centro liberal', resumo: 'partido de centro, herdeiro do PPS, com pauta liberal-democrata.' },
  DC: { eixo: 'centro-direita', familia: 'Conservador cristão', resumo: 'partido conservador de orientação cristã, com pauta de costumes à direita.' },
  MDB: { eixo: 'centro', familia: 'Centro democrático', resumo: 'partido de centro, pragmático e de coalizão.' },
  MOBILIZA: { eixo: 'centro-direita', familia: 'Centro conservador', resumo: 'partido de centro-direita, sucessor do PMN.' },
  NOVO: { eixo: 'direita', familia: 'Liberal', resumo: 'partido liberal de direita, defensor de Estado enxuto e menos regulação.' },
  PCdoB: { eixo: 'esquerda', familia: 'Comunista', resumo: 'partido comunista, alinhado à esquerda socialista.' },
  PCB: { eixo: 'esquerda', familia: 'Comunista', resumo: 'partido comunista revolucionário.' },
  PCO: { eixo: 'esquerda', familia: 'Comunista', resumo: 'partido comunista de orientação trotskista.' },
  PDT: { eixo: 'centro-esquerda', familia: 'Trabalhista', resumo: 'partido trabalhista de centro-esquerda, herdeiro do brizolismo.' },
  PL: { eixo: 'direita', familia: 'Liberal-conservador', resumo: 'partido liberal-conservador de direita.' },
  PMB: { eixo: 'centro', familia: 'Centro', resumo: 'partido de centro, de perfil pragmático.' },
  PODE: { eixo: 'centro-direita', familia: 'Centro reformista', resumo: 'partido de centro-direita com ênfase em gestão e eficiência.' },
  PP: { eixo: 'centro-direita', familia: 'Conservador liberal', resumo: 'partido de centro-direita, de base conservadora e liberal na economia.' },
  PRD: { eixo: 'centro-direita', familia: 'Centro-direita', resumo: 'partido de centro-direita, fusão de Patriota e PTB.' },
  PSB: { eixo: 'centro-esquerda', familia: 'Socialista democrática', resumo: 'partido socialista democrático de centro-esquerda.' },
  PSD: { eixo: 'centro', familia: 'Centro pragmático', resumo: 'partido de centro, pragmático e de coalizão.' },
  PSDB: { eixo: 'centro', familia: 'Social-democrata', resumo: 'partido social-democrata de centro.' },
  PSOL: { eixo: 'esquerda', familia: 'Esquerda socialista', resumo: 'partido de esquerda socialista, crítico ao neoliberalismo.' },
  PSTU: { eixo: 'esquerda', familia: 'Trotskista', resumo: 'partido trotskista de esquerda revolucionária.' },
  PT: { eixo: 'esquerda', familia: 'Esquerda trabalhista', resumo: 'partido de esquerda, de tradição trabalhista e social-democrata.' },
  PV: { eixo: 'centro-esquerda', familia: 'Ecologista', resumo: 'partido ecologista de centro-esquerda.' },
  REDE: { eixo: 'centro-esquerda', familia: 'Sustentabilidade', resumo: 'partido de centro-esquerda focado em sustentabilidade e direitos.' },
  REPUBLICANOS: { eixo: 'direita', familia: 'Conservador', resumo: 'partido conservador de direita, ligado a igrejas evangélicas.' },
  SOLIDARIEDADE: { eixo: 'centro', familia: 'Sindical e popular', resumo: 'partido de centro com pauta sindical e social.' },
  UNIÃO: { eixo: 'centro-direita', familia: 'Centro liberal', resumo: 'partido de centro-direita, fusão de DEM e PSL.' },
  UP: { eixo: 'esquerda', familia: 'Esquerda socialista', resumo: 'partido de esquerda socialista e anticapitalista.' },
};

/** Mapa normalizado (case-insensitive) para siglas com caixa mista (ex.: PCdoB). */
const PARTIDOS_ESPECTRO_NORMALIZADO: Record<string, PartySpectrumEntry> = Object.fromEntries(
  Object.entries(PARTIDOS_ESPECTRO).map(([sigla, meta]) => [sigla.toUpperCase(), meta]),
);

export function getPartidoEspectro(sigla: string | null): PartySpectrumEntry | null {
  if (!sigla) return null;
  return PARTIDOS_ESPECTRO_NORMALIZADO[sigla.toUpperCase()] ?? null;
}

export interface EntradaPosicionamento {
  idTse: number;
  nome: string;
  partido: string | null;
  cargo: string | null;
  cargoCodigo: number;
  /** Texto do plano de governo já extraído (executivos). */
  planoTexto?: string | null;
}

/** 1ª camada: análise curada (humana, documentada). */
function usarAnaliseCurada(analise: AnaliseCurada): PosicionamentoCandidato {
  return {
    eixo: analise.eixo,
    label: EIXO_LABELS[analise.eixo],
    base: 'analise-curada',
    baseLabel: BASE_LABELS['analise-curada'],
    resumo: analise.resumo,
    confianca: analise.confianca,
    temas: analise.temas,
    avisos: analise.avisos ?? [],
    analisadoEm: analise.analisadoEm,
    planoUrl: analise.planoUrl ?? null,
  };
}

/** 2ª camada: plano de governo (motor determinístico de palavras-chave). */
function usarPlanoGoverno(texto: string, partido: string | null): PosicionamentoCandidato {
  const resultado = analisarPlanoGoverno(texto);

  const avisos = [
    'Posição estimada automaticamente a partir do texto do plano de governo registrado no TSE, com base em palavras-chave e temas. É uma aproximação, não uma declaração do candidato.',
  ];

  return {
    eixo: resultado.eixo,
    label: EIXO_LABELS[resultado.eixo],
    base: 'plano-de-governo',
    baseLabel: BASE_LABELS['plano-de-governo'],
    resumo: resultado.resumo,
    confianca: resultado.confianca,
    temas: resultado.temas,
    avisos,
    analisadoEm: new Date().toISOString(),
  };
}

/** 3ª camada: partido (fallback explícito). */
function usarPartido(
  partido: string | null,
  cargo: string | null,
  nome: string,
): PosicionamentoCandidato {
  const meta = getPartidoEspectro(partido);

  if (!meta) {
    return {
      eixo: null,
      label: 'Não avaliado',
      base: 'indefinido',
      baseLabel: BASE_LABELS.indefinido,
      resumo: `Não foi possível estimar o posicionamento de ${nome}: partido não mapeado e sem plano de governo disponível.`,
      confianca: 0,
      temas: [],
      avisos: ['Sem base suficiente para classificação.'],
    };
  }

  const cargoLegislativo = cargo && !['presidente', 'governador', 'vice-presidente', 'vice-governador'].includes(cargo);

  return {
    eixo: meta.eixo,
    label: EIXO_LABELS[meta.eixo],
    base: 'partido',
    baseLabel: BASE_LABELS.partido,
    resumo: `Candidato a ${cargo ?? 'cargo eletivo'} ${cargoLegislativo ? 'sem plano de governo obrigatório' : 'sem plano de governo disponível até o momento'}. Posição estimada pelo posicionamento público do ${partido} (${meta.familia}): ${meta.resumo}`,
    confianca: 0.6,
    temas: [],
    avisos: [
      'Esta é uma estimativa pelo partido, não uma análise individual do candidato. Candidatos do mesmo partido podem ter posições próprias diferentes.',
    ],
  };
}

/** Ponto de entrada único do motor. */
export function getPosicionamento(entrada: EntradaPosicionamento): PosicionamentoCandidato {
  // 1. Análise curada tem prioridade (é a mais informada).
  const curada = ANALISE_CURADA_2026[entrada.idTse];
  if (curada) return usarAnaliseCurada(curada);

  // 2. Plano de governo disponível (executivos).
  if (entrada.planoTexto && entrada.planoTexto.trim().length > 120) {
    return usarPlanoGoverno(entrada.planoTexto, entrada.partido);
  }

  // 3. Partido.
  return usarPartido(entrada.partido, entrada.cargo, entrada.nome);
}
