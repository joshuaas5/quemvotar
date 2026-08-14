/**
 * Registro de autores do QuemVotar (Fase 2 do plano de correcao AdSense).
 *
 * TODO: substituir o nome de exibicao da equipe pela pessoa responsavel
 * (nome completo, credencial verdadeira, cidade/UF) quando o responsavel
 * editorial confirmar os dados. Nada aqui deve ser inventado.
 */

export interface Author {
  slug: string;
  name: string;
  role: string;
  credential: string;
  cityUf: string;
  bio: string[];
  photoUrl?: string;
}

export const AUTHORS: Author[] = [
  {
    slug: 'equipe-quemvotar',
    name: 'Equipe Editorial do QuemVotar',
    role: 'Edi\u00e7\u00e3o e revis\u00e3o de conte\u00fado',
    credential:
      'Projeto editorial independente mantido pela Equipe QuemVotar, com sede em Santa Catarina (Brasil), sem v\u00ednculo com partidos, candidatos ou \u00f3rg\u00e3os p\u00fablicos.',
    cityUf: 'Brasil',
    bio: [
      'A Equipe Editorial do QuemVotar \u00e9 respons\u00e1vel pelos guias, an\u00e1lises e textos de metodologia publicados no site. Cada material passa por revis\u00e3o de fontes antes da publica\u00e7\u00e3o, e corre\u00e7\u00f5es sinalizadas por leitores s\u00e3o avaliadas e respondidas pelo canal de contato.',
      'Todo conte\u00fado \u00e9 produzido com base em registros p\u00fablicos oficiais \u2014 C\u00e2mara dos Deputados, Senado Federal, TSE e CNJ \u2014 e n\u00e3o representa posi\u00e7\u00e3o partid\u00e1ria, nem recomendação de voto.',
    ],
  },
];

export function getAuthorBySlug(slug: string) {
  return AUTHORS.find((author) => author.slug === slug) ?? null;
}
