import type { UserAnswersMap } from './calculator';

/* ────────────────────────────────────────────────────────────────
 * Match de CANDIDATOS 2026 (100% client-side).
 *
 * Diferente do match de parlamentares (que usa votações reais),
 * candidatos ainda não votaram: o match é calculado pelo EIXO
 * político — o seu (derivado das respostas do quiz) contra o eixo
 * do candidato (plano de governo / análise / partido).
 *
 * O eixo do candidato vem dos snapshots gerados pelo ETL
 * (public/dados/candidatos/*.json) — sem nenhuma chamada de
 * servidor no caminho crítico.
 * ──────────────────────────────────────────────────────────────── */

export const EIXOS = ['esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita'] as const;
export type Eixo = (typeof EIXOS)[number];

/**
 * Resposta esperada (1..5) por tema, para cada posição do eixo
 * (0=esquerda .. 4=direita). Mesma convenção do match de
 * parlamentares, aqui autocontida para o match de candidatos.
 */
export const THEMES_EIXO: Record<string, number[]> = {
  pvt: [1, 2, 3, 4, 5],
  agr: [1, 2, 3, 4, 5],
  impostos: [5, 4, 3, 2, 1],
  drogas: [5, 4, 3, 2, 1],
  armas: [1, 1, 2, 4, 5],
  cotas: [5, 4.5, 3.5, 2.5, 1.5],
  abor: [5, 4, 3, 2, 1],
  religiao: [1, 2, 3, 4, 5],
  clt: [1, 2, 3, 4, 5],
  meio_amb: [5, 5, 4, 3, 2],
};

const PESOS_POR_TEMA: Record<string, number> = {
  pvt: 2,
  agr: 1,
  impostos: 2,
  drogas: 1,
  armas: 1,
  cotas: 1,
  abor: 2,
  religiao: 1,
  clt: 1,
  meio_amb: 1,
};

/** Candidato leve como sai do snapshot (index.json / index-{UF}.json). */
export interface CandidatoMatchLite {
  id: number;
  nomeUrna: string;
  partido: string | null;
  cargoCodigo: number;
  cargo: string;
  uf: string;
  numero: number;
  situacao: string;
  coligacao: string | null;
  foto: boolean;
  /** Foto em alta resolução (Câmara/Senado) quando o candidato é parlamentar em exercício. */
  fotoAlta?: string | null;
  /** Já exerce mandato parlamentar hoje (deputado/senador em exercício). */
  mandato: boolean;
  /** Sinaliza reeleição declarada ao TSE (nem sempre preenchido na listagem). */
  reeleicao: boolean;
  eixo: Eixo | null;
  base: 'plano-de-governo' | 'analise-curada' | 'partido' | 'indefinido';
  baseLabel: string;
  confianca: number;
}

/**
 * Eixo do usuário: para cada tema respondido, acha o índice de
 * espectro (0=esquerda .. 4=direita) cuja resposta esperada mais
 * se aproxima da resposta do usuário. Pondera pela importância
 * do tema e retorna o índice médio.
 */
export function calcularEixoUsuario(answers: UserAnswersMap): { indice: number; label: string } {
  const temas = Object.keys(answers).filter((id) => THEMES_EIXO[id]);
  if (temas.length === 0) return { indice: 2, label: 'Centro' };

  let somaPesada = 0;
  let totalPeso = 0;

  for (const tema of temas) {
    const resposta = answers[tema].score;
    const peso = PESOS_POR_TEMA[tema] ?? 1;
    const esperado = THEMES_EIXO[tema];

    let melhorDistancia = Infinity;
    let melhorIndice = 2;
    esperado.forEach((valorEsperado, indice) => {
      const distancia = Math.abs(resposta - valorEsperado);
      if (distancia < melhorDistancia) {
        melhorDistancia = distancia;
        melhorIndice = indice;
      }
    });

    somaPesada += melhorIndice * peso;
    totalPeso += peso;
  }

  const indice = Math.round(somaPesada / totalPeso);
  return { indice, label: EIXOS[indice] };
}

export interface MatchCandidatoResultado {
  candidato: CandidatoMatchLite;
  match: number; // 0..100
  distancia: number; // 0..4
}

/**
 * Pontuação: 100 - distância(eixo usuário, eixo candidato) * 25,
 * ajustada pela confiança da base do posicionamento (quanto mais
 * sólida a base, mais o eixo conta). Candidatos sem eixo ficam no
 * final da lista (match 0).
 */
export function pontuarCandidato(
  usuarioIndice: number,
  candidato: CandidatoMatchLite,
): MatchCandidatoResultado {
  if (!candidato.eixo) {
    return { candidato, match: 0, distancia: 4 };
  }

  const candidatoIndice = EIXOS.indexOf(candidato.eixo);
  const distancia = Math.abs(usuarioIndice - candidatoIndice);

  const fatorConfianca = 0.55 + 0.45 * candidato.confianca;
  const match = Math.max(0, Math.round((4 - distancia) * 25 * fatorConfianca));

  return { candidato, match, distancia };
}

export function ordenarMatches(
  usuarioIndice: number,
  candidatos: CandidatoMatchLite[],
): MatchCandidatoResultado[] {
  return candidatos
    .map((candidato) => pontuarCandidato(usuarioIndice, candidato))
    .sort((a, b) => b.match - a.match || a.candidato.nomeUrna.localeCompare(b.candidato.nomeUrna));
}
