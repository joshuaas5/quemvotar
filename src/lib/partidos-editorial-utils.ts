import { PARTIDOS_EDITORIAL, type PartidoEditorial } from '@/lib/content/partidos-editorial';

/** Helpers de integracao do conteudo editorial dos partidos (Fase 3.3). */
export function getPartidoEditorialBySigla(sigla: string): PartidoEditorial | null {
  return PARTIDOS_EDITORIAL.find((partido) => partido.sigla === sigla) ?? null;
}

export function getPartidoEditorialWordCount(partido: PartidoEditorial | null): number {
  if (!partido) return 0;
  const text = [
    partido.historia.titulo, ...partido.historia.paragrafos,
    partido.ideologia.titulo, ...partido.ideologia.paragrafos,
    partido.congresso.titulo, ...partido.congresso.paragrafos,
    partido.controversias.titulo, ...partido.controversias.paragrafos,
  ].join(' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}
