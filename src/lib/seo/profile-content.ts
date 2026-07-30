import type { PerfilDetalhadoPublico } from '@/lib/official';

export interface ProfileDataArea {
  id: 'votacoes' | 'despesas' | 'autorias' | 'comissoes' | 'mandatos' | 'cargos';
  label: string;
}

const PROFILE_DATA_AREAS: Array<ProfileDataArea & { available: (profile: PerfilDetalhadoPublico) => boolean }> = [
  { id: 'votacoes', label: 'vota\u00e7\u00f5es nominais', available: (profile) => profile.votacoes.length > 0 },
  { id: 'despesas', label: 'despesas parlamentares', available: (profile) => profile.despesas.length > 0 },
  { id: 'autorias', label: 'autorias legislativas', available: (profile) => profile.autorias.length > 0 },
  { id: 'comissoes', label: 'comiss\u00f5es', available: (profile) => profile.comissoes.length > 0 },
  { id: 'mandatos', label: 'hist\u00f3rico de mandatos', available: (profile) => profile.mandatos.length > 0 },
  { id: 'cargos', label: 'cargos institucionais', available: (profile) => profile.cargos.length > 0 },
];

export function getAvailableProfileDataAreas(profile: PerfilDetalhadoPublico): ProfileDataArea[] {
  return PROFILE_DATA_AREAS
    .filter((area) => area.available(profile))
    .map(({ id, label }) => ({ id, label }));
}

function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} e ${items.at(-1)}`;
}

/**
 * Uses only data present in the rendered profile, so snippets do not promise
 * a section that the visitor cannot actually inspect.
 */
export function buildProfileMetaDescription(profile: PerfilDetalhadoPublico): string {
  const name = profile.nomeCompleto || profile.nome_urna;
  const representation = profile.uf ? ` por ${profile.uf}` : '';
  const areas = getAvailableProfileDataAreas(profile).map((area) => area.label).slice(0, 3);
  const availableData = areas.length > 0
    ? ` Consulte ${formatList(areas)} e fontes oficiais.`
    : ' Consulte dados de mandato e fontes oficiais.';

  return `Conhe\u00e7a ${name}, ${profile.cargo.toLowerCase()}${representation} do ${profile.partido}.${availableData}`;
}
