import { describe, expect, it } from 'vitest';
import type { PerfilDetalhadoPublico } from '@/lib/official';
import { isProfileEligibleForIndexing, isProfileEligibleForSitemap } from './indexability';

const profileIdentity = {
  fonte: 'camara' as const,
  idOrigem: '123',
  nome_urna: 'Pessoa Teste',
  partido: 'ABC',
  uf: 'DF',
  fonteUrl: 'https://www.camara.leg.br/deputados/123',
};

function buildDetailedProfile(overrides: Partial<PerfilDetalhadoPublico> = {}): PerfilDetalhadoPublico {
  return {
    ...profileIdentity,
    id: 'camara-123',
    cargo: 'Deputado Federal',
    foto_url: '',
    casa: 'C\u00e2mara dos Deputados',
    telefones: [],
    redesSociais: [],
    fatos: [],
    mandatos: [],
    comissoes: [],
    cargos: [],
    votacoes: [],
    despesas: [],
    autorias: [],
    filiacoes: [],
    linksOficiais: [],
    notas: [],
    temasVotacao: [],
    ...overrides,
  };
}

describe('profile indexability', () => {
  it('accepts complete identities in the sitemap', () => {
    expect(isProfileEligibleForSitemap(profileIdentity)).toBe(true);
  });

  it('keeps identities without a trustworthy source URL out of the sitemap', () => {
    expect(isProfileEligibleForSitemap({ ...profileIdentity, fonteUrl: '' })).toBe(false);
  });

  it('does not index a profile without an official reference and useful data', () => {
    expect(isProfileEligibleForIndexing(buildDetailedProfile())).toBe(false);
  });

  it('indexes a profile with a source and substantive official data', () => {
    const profile = buildDetailedProfile({
      fatos: [{ label: 'Status', value: 'Active' }],
      linksOficiais: [{ label: 'Perfil oficial', href: profileIdentity.fonteUrl }],
    });

    expect(isProfileEligibleForIndexing(profile)).toBe(true);
  });
