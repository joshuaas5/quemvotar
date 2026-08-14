import { PERFIS_EDITORIAL_1 } from '@/lib/content/perfis-editorial-1';
import { PERFIS_EDITORIAL_2 } from '@/lib/content/perfis-editorial-2';
import { PERFIS_EDITORIAL_3 } from '@/lib/content/perfis-editorial-3';
import { PERFIS_EDITORIAL_4 } from '@/lib/content/perfis-editorial-4';
import type { PerfilEditorial } from '@/lib/content/perfis-editorial-1';

/**
 * Helpers de integracao do conteudo editorial dos perfis (Fase 3.6).
 * Um perfil so e indexavel depois de receber texto escrito por humano;
 * o texto e renderizado na pagina e o ID entra na allowlist.
 */

export function getAllPerfisEditorial(): PerfilEditorial[] {
  return [
    ...PERFIS_EDITORIAL_1,
    ...PERFIS_EDITORIAL_2,
    ...PERFIS_EDITORIAL_3,
    ...PERFIS_EDITORIAL_4,
  ];
}

export function getPerfilEditorial(fonte: string, idOrigem: string): PerfilEditorial | null {
  return getAllPerfisEditorial().find(
    (perfil) => perfil.fonte === fonte && perfil.idOrigem === idOrigem,
  ) ?? null;
}

/** Chaves no formato fonte/idOrigem para a allowlist de indexacao. */
export function getPerfisAllowlistKeys(): string[] {
  return getAllPerfisEditorial().map((perfil) => `${perfil.fonte}/${perfil.idOrigem}`);
}
