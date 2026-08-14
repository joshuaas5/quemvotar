import type { PerfilDetalhadoPublico, PerfilPublico } from '@/lib/official';

type ProfileCandidate = Pick<PerfilPublico, 'fonte' | 'idOrigem' | 'nome_urna' | 'partido' | 'uf' | 'fonteUrl'>;

function hasText(value: string | null | undefined): value is string {
  return Boolean(value?.trim());
}

function isOfficialProfileUrl(value: string | null | undefined): boolean {
  try {
    const url = new URL(value ?? '');
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Checks the minimum identity and source data required before a profile can be
 * offered to search engines. It deliberately does not use a score based on
 * keyword volume or template length: a profile must be useful to people first.
 */
export function isProfileEligibleForSitemap(profile: ProfileCandidate): boolean {
  return (
    (profile.fonte === 'camara' || profile.fonte === 'senado') &&
    hasText(profile.idOrigem) &&
    hasText(profile.nome_urna) &&
    hasText(profile.partido) &&
    hasText(profile.uf) &&
    isOfficialProfileUrl(profile.fonteUrl)
  );
}

/**
 * Allowlist de perfis com conteudo editorial escrito por humano (Fase 3.6 do
 * plano de correcao AdSense). Chaves no formato `${fonte}/${idOrigem}`.
 *
 * Enquanto um perfil nao receber texto proprio (400-600 palavras, assinado e
 * revisado), ele permanece fora da lista e, portanto, fora do indice do Google.
 * A lista comeca vazia de proposito: nenhuma pagina montada por template deve
 * ser indexada como conteudo editorial.
 */
export const PROFILE_INDEX_ALLOWLIST: string[] = [
  // Exemplo (apos a tarefa 3.6 do plano): 'camara/204379',
];

/**
 * A rendered profile needs at least one official reference and one meaningful
 * data block in addition to its identity. Sparse or unavailable source pages
 * remain accessible to visitors, but must not be indexed as standalone content.
 *
 * Desde a Fase 1 do plano de correcao, a indexacao tambem exige presenca na
 * PROFILE_INDEX_ALLOWLIST: 100% dos perfis passavam no criterio anterior, o que
 * fazia do sitemap um reflexo do template, nao do conteudo editorial.
 */
export function isProfileEligibleForIndexing(profile: PerfilDetalhadoPublico): boolean {
  if (!isProfileEligibleForSitemap(profile)) {
    return false;
  }

  const allowlistKey = `${profile.fonte}/${profile.idOrigem}`;
  if (!PROFILE_INDEX_ALLOWLIST.includes(allowlistKey)) {
    return false;
  }

  const hasOfficialReference = profile.linksOficiais.some((link) =>
    hasText(link.label) && isOfficialProfileUrl(link.href),
  );

  const hasMeaningfulData = [
    profile.biografia,
    profile.fatos.length > 0 ? 'fatos' : null,
    profile.mandatos.length > 0 ? 'mandatos' : null,
    profile.comissoes.length > 0 ? 'comissoes' : null,
    profile.cargos.length > 0 ? 'cargos' : null,
    profile.votacoes.length > 0 ? 'votacoes' : null,
    profile.despesas.length > 0 ? 'despesas' : null,
    profile.autorias.length > 0 ? 'autorias' : null,
  ].some(Boolean);

  return hasOfficialReference && hasMeaningfulData;
}
