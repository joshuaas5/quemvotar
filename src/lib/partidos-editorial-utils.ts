import { PARTIDOS_EDITORIAL, type PartidoEditorial } from '@/lib/content/partidos-editorial';
import { PARTIDOS_EDITORIAL_EXTRA, type PartidoEditorialExtra } from '@/lib/content/partidos-editorial-extra';

/**
 * Helpers de integracao do conteudo editorial dos partidos (Fase 3.3).
 * Combina os dois arquivos de conteudo (10 partidos + 12 partidos).
 */
export type PartidoEditorialCompleto = PartidoEditorial | PartidoEditorialExtra;

export function getAllPartidosEditorial(): PartidoEditorialCompleto[] {
  return [...PARTIDOS_EDITORIAL, ...PARTIDOS_EDITORIAL_EXTRA];
}

export function getPartidoEditorialBySigla(sigla: string): PartidoEditorialCompleto | null {
  return getAllPartidosEditorial().find((partido) => partido.sigla === sigla) ?? null;
}

export function getPartidoEditorialWordCount(partido: PartidoEditorialCompleto | null): number {
  if (!partido) return 0;
  const text = [
    partido.historia.titulo, ...partido.historia.paragrafos,
    partido.ideologia.titulo, ...partido.ideologia.paragrafos,
    partido.congresso.titulo, ...partido.congresso.paragrafos,
    partido.controversias.titulo, ...partido.controversias.paragrafos,
  ].join(' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}
