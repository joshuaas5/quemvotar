import { UFS_EDITORIAL, type UfEditorial } from '@/lib/content/uf-editorial';

/** Helpers de integracao do conteudo editorial das paginas de UF (Fase 3.4). */
export function getUfEditorialByUf(uf: string): UfEditorial | null {
  return UFS_EDITORIAL.find((estado) => estado.uf === uf) ?? null;
}

export function getUfEditorialWordCount(estado: UfEditorial | null): number {
  if (!estado) return 0;
  const text = [
    estado.bancada.titulo, ...estado.bancada.paragrafos,
    estado.temas.titulo, ...estado.temas.paragrafos,
    estado.historia.titulo, ...estado.historia.paragrafos,
  ].join(' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}
