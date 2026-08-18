export type MatchQuestion = {
  id: string;
  title: string;
  description: string;
  accentColor: string;
};

/** Perguntas do quiz eleitoral — usadas no Match de Candidatos 2026. */
export const QUESTIONS: MatchQuestion[] = [
  {
    id: 'pvt',
    title: 'Privatizações',
    description:
      'Empresas estatais (Correios, Petrobras) devem ser privatizadas para melhorar a eficiência da economia e remover corrupção.',
    accentColor: '#ffe066',
  },
  {
    id: 'agr',
    title: 'Agronegócio',
    description:
      'O agronegócio e a produção de alimentos devem ter mais liberdade para se expandir, mesmo que avance sobre áreas de preservação ambiental informais.',
    accentColor: '#9bf6ff',
  },
  {
    id: 'impostos',
    title: 'Taxação de Fortunas',
    description:
      'O governo deve aumentar os impostos sobre grandes fortunas e grandes lucros para financiar mais programas de bem social e redução de desigualdade.',
    accentColor: '#ffc6ff',
  },
  {
    id: 'drogas',
    title: 'Drogas',
    description:
      'A legalização e regulamentação da maconha seria uma medida mais eficaz para combater o tráfico e a violência do que a proibição.',
    accentColor: '#c77dff',
  },
  {
    id: 'armas',
    title: 'Posse de Armas',
    description:
      'O acesso à posse e ao porte de armas de fogo pelo cidadão comum sem antecedentes criminais deve ser facilitado para defesa pessoal.',
    accentColor: '#bdb2ff',
  },
  {
    id: 'cotas',
    title: 'Cotas',
    description:
      'Reservas de vagas (cotas raciais e sociais) em universidades e concursos públicos são políticas fundamentais para reduzir desigualdades.',
    accentColor: '#a0c4ff',
  },
  {
    id: 'abor',
    title: 'Aborto',
    description:
      'A decisão sobre a interrupção da gravidez (aborto) nas primeiras semanas deve pertencer somente à mulher, de forma descriminalizada e legalizada.',
    accentColor: '#ffadad',
  },
  {
    id: 'religiao',
    title: 'Religião no Estado',
    description:
      'Valores cristãos e da família tradicional devem ser a principal base para as diretrizes morais de leis e do ensino público.',
    accentColor: '#fdffb6',
  },
  {
    id: 'clt',
    title: 'Leis Trabalhistas',
    description:
      'Leis de proteção ao emprego (nos moldes da CLT) precisam ser mais flexibilizadas, permitindo negociação direta entre empregador e empregado.',
    accentColor: '#caffbf',
  },
  {
    id: 'meio_amb',
    title: 'Meio Ambiente',
    description:
      'Proteger o meio ambiente e preservar florestas deve ser prioridade máxima do Estado, ainda que signifique perder poder de crescimento econômico na região.',
    accentColor: '#9bf6ff',
  },
];
