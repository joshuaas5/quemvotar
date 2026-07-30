import { describe, expect, it } from 'vitest';
import type { PerfilDetalhadoPublico } from '@/lib/official';
import type { PerfilEnriquecido } from '@/lib/api';
import { buildProfileResearchBrief } from './profile-brief';

const profile: PerfilDetalhadoPublico = {
  id: 'camara-123', idOrigem: '123', fonte: 'camara', fonteUrl: 'https://example.org/perfil',
  nome_urna: 'Pessoa Teste', nomeCompleto: 'Pessoa de Teste', partido: 'ABC', uf: 'DF',
  cargo: 'Deputado Federal', foto_url: '', casa: 'C\u00e2mara dos Deputados', telefones: [], redesSociais: [],
  fatos: [], mandatos: [], comissoes: [{ titulo: 'Comiss\u00e3o de Teste' }], cargos: [], votacoes: [],
  despesas: [], autorias: [], filiacoes: [], linksOficiais: [{ label: 'Perfil oficial', href: 'https://example.org/perfil' }],
  notas: [], temasVotacao: [], autoriasTotal: 3,
};

const enriched: PerfilEnriquecido = {
  ranking: null, governismo: null, presenca: { fonte: 'radar_do_congresso', ano: 2026, percentual: 92, sessoesDeliberativas: 10, presencas: 9, ausenciasJustificadas: 1, ausenciasNaoJustificadas: 0, fonteUrl: 'https://example.org/presenca' },
  espectro: null, votacoes: [{ titulo: 'Vota\u00e7\u00e3o de teste' }], temasVotacao: [{ titulo: 'Tema de teste' }], biografia: null,
  despesas: [{ titulo: 'Despesa de teste' }], autorias: [{ titulo: 'Projeto de teste' }],
};

describe('profile research brief', () => {
  it('uses only available records to create practical research prompts', () => {
    const brief = buildProfileResearchBrief(profile, enriched);
    expect(brief.intro).toContain('Pessoa de Teste');
    expect(brief.snapshot).toContain('vota\u00e7\u00e3o nominal exibida');
    expect(brief.snapshot).toContain('3 registros de autoria');
    expect(brief.questions).toContain('Em quais temas esses votos ajudam a entender a posi\u00e7\u00e3o do parlamentar?');
  });
});
