/**
 * Secao editorial assinada do QuemVotar (Fase 3.4 do plano de correcao AdSense).
 *
 * Cada artigo e assinado, datado e revisado. A periodicidade pretendida e
 * semanal, com analise do que o Congresso votou; os artigos desta lista sao
 * permanentes e evergreen.
 */

export interface EditorialSection {
  title: string;
  paragraphs: string[];
}

export interface EditorialArticle {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  sections: EditorialSection[];
  sources: { label: string; href: string }[];
}

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    slug: 'o-que-votacao-no-congresso-realmente-decide',
    title: 'O que uma vota\u00e7\u00e3o no Congresso realmente decide (e como acompanhar em ano eleitoral)',
    description:
      'Nem toda vota\u00e7\u00e3o vira lei, e nem toda lei nasce de uma vota\u00e7\u00e3o famosa. Este texto mostra o caminho institucional de uma proposta e o que o eleitor deve observar em 2026.',
    author: 'equipe-quemvotar',
    publishedAt: '2026-08-14',
    updatedAt: '2026-08-14',
    intro:
      'Em ano eleitoral, o Congresso vira manchete quase todos os dias: pauta econ\u00f4mica, emendas, comiss\u00f5es, vota\u00e7\u00f5es de \u00faltima hora. Entre a manchete e a lei existe, por\u00e9m, um caminho institucional longo, com etapas que mudam o sentido do que foi votado. Entender esse caminho \u00e9 a diferen\u00e7a entre acompanhar pol\u00edtica com m\u00e9todo e apenas reagir a cortes de v\u00eddeo.',
    sections: [
      {
        title: 'O que uma vota\u00e7\u00e3o registra',
        paragraphs: [
          'Uma vota\u00e7\u00e3o nominal registra a posi\u00e7\u00e3o individual de cada parlamentar sobre um objeto preciso: o texto principal de um projeto, um destaque, um requerimento de urg\u00eancia, uma emenda ou um pedido de adiamento. O mesmo tema pode gerar v\u00e1rias vota\u00e7\u00f5es, com sentidos diferentes. Votar contra o texto principal n\u00e3o \u00e9 o mesmo que votar contra a urg\u00eancia, e votar a favor de um destaque pode ser uma forma de tentar mudar o resultado final.',
          'Por isso, quando uma postagem diz que um parlamentar \u201capoiou\u201d ou \u201crejeitou\u201d um tema, a primeira pergunta \u00e9: qual vota\u00e7\u00e3o exatamente? O registro p\u00fablico da C\u00e2mara e do Senado informa o objeto da delibera\u00e7\u00e3o, a data e a orienta\u00e7\u00e3o das lideran\u00e7as. Conferir esses tr\u00eas campos evita a maior parte dos erros de interpreta\u00e7\u00e3o.',
        ],
      },
      {
        title: 'Do projeto \u00e0 lei: as etapas que mudam o texto',
        paragraphs: [
          'Uma proposta nasce com uma ementa e um texto. Nas comiss\u00f5es, o relator analisa a mat\u00e9ria e pode apresentar parecer com substitutivo \u2014 uma nova vers\u00e3o, muitas vezes distante do original. O plen\u00e1rio vota o texto que chegou at\u00e9 ele, n\u00e3o necessariamente o que foi protocolado. Se aprovado, o projeto segue para a outra Casa, onde o ciclo recome\u00e7a, e depois para san\u00e7\u00e3o ou veto do presidente da Rep\u00fablica.',
          'Essas etapas importam porque um parlamentar pode ter apoiado uma proposta em um ponto da tramita\u00e7\u00e3o e votado contra a vers\u00e3o final, ou o contr\u00e1rio. Acompanhar apenas o desfecho \u2014 \u201ca lei foi aprovada\u201d \u2014 esconde quem alterou o texto, quem tentou mudar o rumo e quem negociou nos bastidores. Para o eleitor que quer avaliar mandato, a tramita\u00e7\u00e3o \u00e9 t\u00e3o informativa quanto o voto final.',
        ],
      },
      {
        title: 'Em ano eleitoral, cuidado com a pauta de vitrine',
        paragraphs: [
          'Per\u00edodos pr\u00f3ximos \u00e0 elei\u00e7\u00e3o concentram propostas com apelo imediato: benef\u00edcios, pautas simb\u00f3licas, requerimentos de fiscaliza\u00e7\u00e3o e discursos de plen\u00e1rio. Parte desse movimento \u00e9 normal \u2014 o Congresso responde ao calend\u00e1rio pol\u00edtico. Outra parte \u00e9 pura vitrine: proposi\u00e7\u00f5es apresentadas sem chance real de avan\u00e7o, usadas para alimentar o material de campanha.',
          'O teste pr\u00e1tico \u00e9 o mesmo para todas as \u00e9pocas: a proposta tem parecer? Passou por comiss\u00e3o? Tem data para vota\u00e7\u00e3o? O autor construiu apoio ou apenas protocolou o texto? Projetos parados por anos n\u00e3o s\u00e3o entregas, s\u00e3o inten\u00e7\u00f5es. Avaliar mandato \u00e9 avaliar o que avan\u00e7ou institucionalmente, n\u00e3o o que foi anunciado em v\u00eddeo.',
        ],
      },
      {
        title: 'Como usar os dados p\u00fablicos a seu favor',
        paragraphs: [
          'Os registros oficiais s\u00e3o acess\u00edveis e gratuitos: os dados abertos da C\u00e2mara e do Senado publicam proposi\u00e7\u00f5es, vota\u00e7\u00f5es, comiss\u00f5es, presen\u00e7a e despesas. No QuemVotar, esses registros s\u00e3o organizados por perfil, com link para a fonte original em cada bloco. A leitura recomendada \u00e9 a mesma h\u00e1 anos: comece pelo tema que importa para voc\u00ea, abra os perfis dos candidatos, compare vota\u00e7\u00f5es e projetos, e desconfie de qualquer conclus\u00e3o que n\u00e3o aponte um registro verific\u00e1vel.',
          'Em 2026, o eleitor que dominar esse m\u00e9todo sai na frente. N\u00e3o porque ter\u00e1 mais informa\u00e7\u00e3o, mas porque saber\u00e1 qual informa\u00e7\u00e3o \u00e9 confi\u00e1vel \u2014 e qual \u00e9 apenas campanha usando o Congresso como cen\u00e1rio.',
        ],
      },
    ],
    sources: [
      { label: 'Dados Abertos da C\u00e2mara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados Abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
];

export function getEditorialBySlug(slug: string) {
  return EDITORIAL_ARTICLES.find((article) => article.slug === slug) ?? null;
}
