import { GUIAS_EXTRA, type GuiaExtra } from '@/lib/content/guias-extra';

/**
 * Helpers de integracao do conteudo de expansao dos guias (Fase 3.2).
 * Vivem em modulo proprio para nao depender do conteudo em si.
 */

export function getGuiaExtraBySlug(slug: string): GuiaExtra | null {
  return GUIAS_EXTRA.find((extra) => extra.slug === slug) ?? null;
}

/** Palavras adicionadas pelo conteudo de expansao de um guia. */
export function getGuiaExtraWordCount(extra: GuiaExtra | null): number {
  if (!extra) return 0;
  const text = [
    ...extra.novasSections.flatMap((s) => [s.titulo, ...s.paragrafos]),
    ...extra.exemplos.flatMap((e) => [e.titulo, ...e.paragrafos]),
    ...extra.faq.flatMap((f) => [f.pergunta, f.resposta]),
    ...extra.tabelas.flatMap((t) => [t.titulo, ...t.cabecalho, ...t.linhas.flat()]),
  ].join(' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}
