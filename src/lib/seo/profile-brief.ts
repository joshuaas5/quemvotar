import type { PerfilDetalhadoPublico } from '@/lib/official';
import type { PerfilEnriquecido } from '@/lib/api';

function formatCount(count: number, singular: string, plural: string): string {
  return count + ' ' + (count === 1 ? singular : plural);
}

export interface ProfileResearchBrief {
  intro: string;
  snapshot: string;
  questions: string[];
}

/**
 * Turns only the records already shown on a profile into a short, practical
 * research brief. It never assigns merit or intent to a parliamentarian.
 */
export function buildProfileResearchBrief(
  profile: PerfilDetalhadoPublico,
  enriched: PerfilEnriquecido,
): ProfileResearchBrief {
  const name = profile.nomeCompleto || profile.nome_urna;
  const representation = profile.uf ? ' por ' + profile.uf : '';
  const records: string[] = [];
  const questions: string[] = [];

  if (enriched.votacoes.length > 0) {
    records.push(formatCount(enriched.votacoes.length, 'vota\u00e7\u00e3o nominal exibida', 'vota\u00e7\u00f5es nominais exibidas'));
    questions.push('Em quais temas esses votos ajudam a entender a posi\u00e7\u00e3o do parlamentar?');
  }

  const authorshipCount = profile.autoriasTotal ?? enriched.autorias.length;
  if (authorshipCount > 0) {
    records.push(formatCount(authorshipCount, 'registro de autoria', 'registros de autoria'));
    questions.push('As propostas tratam das prioridades que voc\u00ea considera importantes?');
  }

  if (profile.comissoes.length > 0) {
    records.push(formatCount(profile.comissoes.length, 'comiss\u00e3o ou frente registrada', 'comiss\u00f5es ou frentes registradas'));
    questions.push('As comiss\u00f5es em que atua combinam com os temas que defende?');
  }

  if (enriched.despesas.length > 0) {
    records.push(formatCount(enriched.despesas.length, 'despesa exibida', 'despesas exibidas'));
    questions.push('Os gastos t\u00eam finalidade identific\u00e1vel e podem ser conferidos na fonte?');
  }

  if (enriched.presenca) {
    records.push('presen\u00e7a de ' + enriched.presenca.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 0 }) + '% nas sess\u00f5es consideradas');
    questions.push('A presen\u00e7a deve ser lida junto com comiss\u00f5es, relatorias e outras atividades do mandato?');
  }

  if (enriched.temasVotacao.length > 0) {
    questions.push('Os temas agrupados nesta p\u00e1gina confirmam ou contradizem o discurso p\u00fablico?');
  }

  questions.push('Quais informa\u00e7\u00f5es ainda faltam e devem ser verificadas nos links oficiais?');

  const sourceCount = profile.linksOficiais.length;
  const sourceText = sourceCount > 0
    ? 'A p\u00e1gina tamb\u00e9m oferece ' + formatCount(sourceCount, 'link oficial', 'links oficiais') + ' para confer\u00eancia.'
    : 'Quando algum dado exigir confirma\u00e7\u00e3o, procure a fonte institucional correspondente.';

  return {
    intro: name + ' \u00e9 ' + profile.cargo.toLowerCase() + representation + ' pelo ' + profile.partido + '. Este resumo n\u00e3o d\u00e1 nota nem recomenda voto: ele mostra por onde come\u00e7ar uma pesquisa sobre o mandato.',
    snapshot: records.length > 0
      ? 'Nesta consulta, voc\u00ea pode investigar ' + records.join(', ') + '. ' + sourceText
      : 'Nesta consulta, o perfil traz informa\u00e7\u00f5es cadastrais e caminhos para pesquisa. ' + sourceText,
    questions: questions.slice(0, 4),
  };
}
