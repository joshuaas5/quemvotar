import type { PartidoResumo } from '@/lib/official';
import { getPartidoEspectro } from '@/lib/candidatos/posicionamento';

/* ────────────────────────────────────────────────────────────────
 * Fallback para partidos novos/cadastrados em 2026 que ainda não
 * aparecem na raspagem do site do TSE (ex.: Missão, Democrata).
 * Evita página 404 — mostra uma ficha mínima com o posicionamento
 * mapeado pelo motor de candidatos.
 * ──────────────────────────────────────────────────────────────── */

const PARTIDOS_2026: Record<string, { numero: number; nome: string }> = {
  MISSÃO: { numero: 14, nome: 'Partido Missão' },
  DEMOCRATA: { numero: 35, nome: 'Democrata' },
  PRTB: { numero: 28, nome: 'Partido Renovador Trabalhista Brasileiro' },
  PMB: { numero: 35, nome: 'Partido da Mulher Brasileira' },
};

const TSE_PARTIDOS_URL = 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse';

export function getPartidoFallback2026(sigla: string): PartidoResumo | null {
  const info = PARTIDOS_2026[sigla.toUpperCase()];
  if (!info) return null;

  const espectro = getPartidoEspectro(sigla);

  return {
    sigla: sigla.toUpperCase(),
    nome: info.nome,
    logoUrl: null,
    fonteUrl: TSE_PARTIDOS_URL,
    tseUrl: TSE_PARTIDOS_URL,
    deputados: 0,
    senadores: 0,
    totalParlamentares: 0,
    numeroLegenda: String(info.numero),
    presidenteNacional: null,
    siteOficial: null,
    estatutoUrl: null,
    definicaoCurta: espectro
      ? `Partido registrado no TSE para as eleições de 2026. ${espectro.resumo.charAt(0).toUpperCase()}${espectro.resumo.slice(1)}.`
      : 'Partido registrado no TSE para as eleições de 2026.',
    familiaPolitica: espectro?.familia ?? null,
    espectro: espectro ? (espectro.eixo.charAt(0).toUpperCase() + espectro.eixo.slice(1)) : null,
    espectroEixo: espectro?.eixo ?? null,
    cores: ['#111827', '#9ca3af'],
    liderCamara: null,
    liderSenado: null,
    blocosSenado: [],
  };
}

/**
 * Preenche campos opcionais que o scraper do TSE às vezes deixa de fora
 * (ex.: partidos novos com ficha incompleta). Evita quebra na página.
 */
export function completarPartido2026(partido: Partial<PartidoResumo>): PartidoResumo {
  // Família/espectro curado quando o partido está no motor de posicionamento
  const espectroCurado = getPartidoEspectro(partido.sigla ?? null);

  return {
    sigla: partido.sigla ?? '',
    nome: partido.nome ?? `Partido ${partido.sigla ?? ''}`,
    logoUrl: partido.logoUrl ?? null,
    fonteUrl: partido.fonteUrl ?? TSE_PARTIDOS_URL,
    tseUrl: partido.tseUrl ?? TSE_PARTIDOS_URL,
    deputados: partido.deputados ?? 0,
    senadores: partido.senadores ?? 0,
    totalParlamentares: partido.totalParlamentares ?? (partido.deputados ?? 0) + (partido.senadores ?? 0),
    numeroLegenda: partido.numeroLegenda ?? null,
    presidenteNacional: partido.presidenteNacional ?? null,
    siteOficial: partido.siteOficial ?? null,
    estatutoUrl: partido.estatutoUrl ?? null,
    definicaoCurta: partido.definicaoCurta ?? null,
    familiaPolitica: partido.familiaPolitica ?? espectroCurado?.familia ?? null,
    espectro: partido.espectro ?? null,
    espectroEixo: partido.espectroEixo ?? espectroCurado?.eixo ?? null,
    cores: partido.cores && partido.cores.length >= 2 ? partido.cores : ['#111827', '#9ca3af'],
    liderCamara: partido.liderCamara ?? null,
    liderSenado: partido.liderSenado ?? null,
    blocosSenado: Array.isArray(partido.blocosSenado) ? partido.blocosSenado : [],
  };
}
