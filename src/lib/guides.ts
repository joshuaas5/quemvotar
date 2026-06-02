export interface GuideSection {
  title: string;
  paragraphs: string[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  readingTime: string;
  intro: string;
  sections: GuideSection[];
}

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: 'como-avaliar-deputado-federal',
    title: 'Como avaliar um deputado federal antes de votar',
    description:
      'Um guia prático para analisar atuação, presença, votações, gastos, partido e fontes oficiais de deputados federais.',
    updatedAt: '2026-04-28',
    readingTime: '6 min',
    intro:
      'Avaliar um deputado federal exige mais do que lembrar uma fala viral ou uma promessa de campanha. O mandato combina votação em plenário, trabalho em comissões, apresentação de projetos, fiscalização do governo, uso de recursos públicos e relação com o partido. Este guia mostra como transformar esses sinais em uma análise mais responsável.',
    sections: [
      {
        title: 'Comece pelo papel real do cargo',
        paragraphs: [
          'Deputados federais votam leis nacionais, analisam medidas provisórias, fiscalizam o Executivo, participam de comissões e representam interesses de seus estados e bases eleitorais. Nem todo resultado aparece como projeto aprovado com o nome do parlamentar, porque muita atuação acontece em relatorias, negociações, audiências e votações coletivas.',
          'Por isso, não avalie apenas quantidade de projetos apresentados. Um deputado pode protocolar muitas propostas com baixa chance de avanço, enquanto outro pode ter influência relevante em comissões, relatorias ou votações decisivas. O ideal é olhar volume, qualidade, tema e resultado institucional.',
        ],
      },
      {
        title: 'Leia votações e partidos em conjunto',
        paragraphs: [
          'Votos nominais ajudam a entender posições concretas. Eles mostram como o parlamentar se posicionou quando houve registro individual. Mas muitos temas passam por acordos, votações simbólicas ou orientações partidárias que não deixam uma lista simples de voto individual.',
          'O partido também importa. Lideranças orientam bancadas, negociam prioridades e influenciam a agenda. Se um deputado frequentemente segue a orientação partidária, a identidade do partido ajuda a interpretar sua atuação. Se diverge com frequência, vale investigar em quais temas isso acontece.',
        ],
      },
      {
        title: 'Use presença e gastos como sinais, não como sentença',
        paragraphs: [
          'Presença em sessões pode indicar compromisso com a rotina legislativa, mas não mede todo o trabalho parlamentar. Parte da atividade ocorre fora do plenário, em reuniões, comissões, relatorias e agendas no estado. Ausências justificadas também precisam ser diferenciadas de faltas sem explicação.',
          'Gastos de cota parlamentar devem ser observados com contexto: valor total, tipo de despesa, recorrência, fornecedor e finalidade pública. Um gasto alto não é automaticamente irregular, e um gasto baixo não prova bom mandato. O ponto é verificar transparência, coerência e possibilidade de conferência.',
        ],
      },
      {
        title: 'Compare com parlamentares parecidos',
        paragraphs: [
          'Comparações fazem mais sentido quando envolvem parlamentares da mesma casa, mesmo estado, partido semelhante ou temas próximos. Comparar um deputado de primeiro mandato com um líder partidário veterano pode distorcer a análise se o contexto não for considerado.',
          'Procure padrões: como vota em temas econômicos, costumes, meio ambiente, segurança, educação e transparência; quais comissões frequenta; quais projetos prioriza; e se suas fontes oficiais confirmam a narrativa pública do mandato.',
        ],
      },
    ],
  },
  {
    slug: 'como-avaliar-senador',
    title: 'Como avaliar um senador antes de votar',
    description:
      'Entenda o que observar em um mandato de senador: votações, sabatinas, comissões, relatorias, partido e representação estadual.',
    updatedAt: '2026-04-28',
    readingTime: '5 min',
    intro:
      'Senadores têm mandatos longos e influência relevante sobre leis nacionais, autoridades públicas, política fiscal, relações federativas e temas institucionais. Avaliar um senador exige atenção ao plenário, às comissões e ao papel de representação do estado.',
    sections: [
      {
        title: 'Entenda a diferença do Senado',
        paragraphs: [
          'O Senado revisa propostas aprovadas pela Câmara, inicia projetos próprios, julga autoridades em situações específicas, aprova indicações para cargos relevantes e participa de decisões sobre dívida pública, orçamento e pacto federativo. Isso torna o mandato menos numeroso e frequentemente mais institucional do que o de deputado federal.',
          'Como cada estado tem três senadores, a comparação estadual é especialmente importante. O eleitor pode observar se o parlamentar atua em temas relevantes para sua região sem perder de vista votações nacionais que afetam todo o país.',
        ],
      },
      {
        title: 'Observe relatorias e comissões',
        paragraphs: [
          'No Senado, relatorias e comissões podem revelar mais do que discursos de plenário. Um senador que relata uma proposta importante influencia o texto final, negocia alterações e define pontos que chegarão à votação.',
          'Comissões permanentes, CPIs e audiências públicas também ajudam a identificar prioridades. A presença nesses espaços mostra se o parlamentar atua em segurança, economia, educação, saúde, meio ambiente, Constituição e Justiça ou temas regionais.',
        ],
      },
      {
        title: 'Analise indicações e temas institucionais',
        paragraphs: [
          'Senadores participam da aprovação de autoridades para tribunais, agências, embaixadas e outros cargos. Essas decisões têm impacto de longo prazo e nem sempre recebem a mesma atenção que votações de projetos de lei.',
          'Ao avaliar um senador, procure entender como ele se posiciona em sabatinas, quais critérios declara usar e se sua postura é coerente com transparência, independência institucional e interesse público.',
        ],
      },
      {
        title: 'Não reduza o mandato a popularidade',
        paragraphs: [
          'Senadores costumam ter grande visibilidade regional, mas popularidade não substitui análise de voto. Uma avaliação responsável combina atuação legislativa, relação com o estado, coerência partidária, presença, relatorias, comissões e fontes oficiais.',
          'Use rankings e resumos como porta de entrada, não como decisão final. Sempre que possível, confira a página oficial do Senado e compare o histórico do parlamentar com suas promessas públicas.',
        ],
      },
    ],
  },
  {
    slug: 'como-ler-votacoes-nominais',
    title: 'Como ler votações nominais no Congresso',
    description:
      'Aprenda a interpretar votos nominais, orientações partidárias, abstenções, obstruções e limites dos dados de votação.',
    updatedAt: '2026-04-28',
    readingTime: '7 min',
    intro:
      'Votações nominais são uma das formas mais objetivas de acompanhar parlamentares, porque registram posições individuais. Mesmo assim, elas precisam ser lidas com contexto: texto votado, destaques, orientação partidária, quórum, obstrução e efeito prático da decisão.',
    sections: [
      {
        title: 'O voto depende do texto votado',
        paragraphs: [
          'Um parlamentar pode votar “sim” em um requerimento, “não” em um destaque e depois votar diferente no texto principal. Sem identificar exatamente o objeto da votação, é fácil interpretar o registro de forma errada.',
          'Antes de concluir que alguém apoiou ou rejeitou um tema, confira se a votação era sobre o mérito da proposta, urgência, adiamento, destaque, emenda, requerimento procedimental ou texto final. Procedimentos legislativos podem alterar completamente o sentido político do voto.',
        ],
      },
      {
        title: 'Abstenção e obstrução também comunicam posição',
        paragraphs: [
          'Abstenção não é sempre neutralidade. Em alguns casos, pode indicar discordância parcial, estratégia partidária ou tentativa de não se comprometer com uma decisão polarizada. Obstrução, por sua vez, é uma ferramenta usada para dificultar ou atrasar votações.',
          'Ao comparar parlamentares, observe se abstenções e obstruções aparecem em temas específicos. Um padrão repetido pode revelar estratégia política mais do que ausência de opinião.',
        ],
      },
      {
        title: 'Orientação de bancada influencia o resultado',
        paragraphs: [
          'Partidos e lideranças orientam votos para organizar a atuação coletiva. Seguir orientação não é necessariamente negativo: sistemas legislativos funcionam com partidos. O ponto é entender se o parlamentar vota de forma coerente com sua campanha, seu eleitorado e seu programa partidário.',
          'Divergências também importam. Quando um parlamentar rompe com a bancada, vale observar se isso ocorre por convicção temática, interesse regional, pressão pública ou disputa interna.',
        ],
      },
      {
        title: 'Cuidado com recortes virais',
        paragraphs: [
          'Postagens em redes sociais frequentemente mostram uma votação isolada sem explicar o texto, a fase do processo ou os destaques votados. Esse recorte pode gerar uma conclusão verdadeira em parte, mas enganosa no conjunto.',
          'A leitura mais segura combina o registro nominal, a ementa da proposta, notícias institucionais, pareceres e a página oficial da votação. Quanto mais controverso o tema, mais importante é conferir a fonte original.',
        ],
      },
    ],
  },
  {
    slug: 'como-conferir-fontes-oficiais',
    title: 'Como conferir fontes oficiais sobre políticos',
    description:
      'Um roteiro para verificar dados em Câmara, Senado, TSE, CNJ e páginas públicas antes de compartilhar informações políticas.',
    updatedAt: '2026-04-28',
    readingTime: '6 min',
    intro:
      'A melhor defesa contra desinformação política é saber voltar à fonte. Dados de mandato, candidatura, partido, votação, processo e despesa podem estar espalhados por órgãos diferentes. Este guia mostra um caminho prático para conferir informações antes de confiar ou compartilhar.',
    sections: [
      {
        title: 'Identifique que tipo de dado você está verificando',
        paragraphs: [
          'Nem toda informação sobre política vem do mesmo lugar. Dados de mandato atual costumam estar na Câmara ou no Senado. Dados eleitorais e partidários podem estar no TSE. Informações processuais dependem do tribunal competente ou de bases judiciais. Notícias e declarações exigem outra camada de checagem.',
          'Começar pela pergunta correta evita erro de fonte. Se a dúvida é “como votou?”, procure votação. Se é “qual partido?”, procure a casa legislativa e o TSE. Se é “foi candidato?”, procure dados eleitorais. Se é “tem processo?”, confira número, tribunal e fase processual.',
        ],
      },
      {
        title: 'Prefira páginas oficiais e dados com identificação clara',
        paragraphs: [
          'Uma fonte confiável deve permitir identificar órgão, data, número, URL, documento ou registro. Prints sem link, listas sem origem e textos sem data são frágeis, mesmo quando parecem convincentes.',
          'Ao usar o QuemVotar, abra os links de fonte quando quiser confirmar uma informação sensível. O objetivo da plataforma é facilitar o caminho, não substituir a conferência quando a decisão for importante.',
        ],
      },
      {
        title: 'Verifique datas e atualizações',
        paragraphs: [
          'Política muda rápido. Parlamentares trocam de partido, suplentes assumem, licenças ocorrem, votações são atualizadas e despesas podem aparecer com atraso. Uma informação verdadeira em uma data pode estar incompleta meses depois.',
          'Sempre confira se a página informa data de atualização ou se a fonte oficial apresenta registro recente. Em caso de divergência, a fonte primária mais atual costuma ser o melhor ponto de partida.',
        ],
      },
      {
        title: 'Desconfie de rankings sem metodologia',
        paragraphs: [
          'Rankings podem ser úteis, mas precisam explicar critérios. Uma nota pode considerar presença, economia de recursos, processos, votos, privilégios ou outros fatores. Sem metodologia, o número vira opinião disfarçada de métrica.',
          'Quando usar rankings, compare com dados brutos e procure entender o peso de cada critério. Métricas são atalhos, não substitutos de análise.',
        ],
      },
    ],
  },
  {
    slug: 'como-comparar-parlamentares',
    title: 'Como comparar parlamentares sem cair em atalhos ruins',
    description:
      'Veja critérios para comparar deputados e senadores de forma justa: casa, UF, partido, mandato, temas, votos e indicadores.',
    updatedAt: '2026-04-28',
    readingTime: '5 min',
    intro:
      'Comparar parlamentares ajuda o eleitor a sair da impressão vaga e observar diferenças concretas. Mas uma comparação mal feita pode ser injusta ou enganosa. O segredo é comparar pessoas em contextos semelhantes e separar dados objetivos de preferências pessoais.',
    sections: [
      {
        title: 'Compare cargos equivalentes quando possível',
        paragraphs: [
          'Deputados e senadores têm funções diferentes, mandatos diferentes e rotinas legislativas diferentes. Comparar diretamente os dois pode ser útil em temas amplos, mas é mais justo comparar deputado com deputado e senador com senador.',
          'Também vale considerar tempo de mandato. Um parlamentar recém-empossado teve menos oportunidade de apresentar projetos, relatar matérias ou consolidar histórico de votação.',
        ],
      },
      {
        title: 'Escolha temas antes de olhar nomes',
        paragraphs: [
          'Uma boa comparação começa pelos temas que importam para você: economia, segurança, direitos sociais, meio ambiente, educação, saúde, transparência ou costumes. Depois disso, observe quais parlamentares têm histórico nesses assuntos.',
          'Esse método reduz viés de popularidade. Em vez de escolher primeiro um nome conhecido, você define critérios e depois verifica quem se aproxima deles.',
        ],
      },
      {
        title: 'Diferencie estilo de resultado',
        paragraphs: [
          'Alguns parlamentares são mais presentes em comunicação pública; outros atuam nos bastidores, comissões e relatorias. Estilo não é sinônimo de resultado. Um perfil barulhento pode produzir pouco efeito legislativo, e um perfil discreto pode ter influência técnica relevante.',
          'Procure evidências: relatórios, votações, projetos, cargos em comissão, liderança partidária, emendas, fiscalização e presença em debates oficiais.',
        ],
      },
      {
        title: 'Use indicadores como painel, não placar único',
        paragraphs: [
          'Nota, presença, gastos e alinhamento ajudam quando vistos juntos. O erro é transformar um único número em conclusão total. Um parlamentar pode ter boa presença e baixa produção legislativa; outro pode ter muitos projetos sem avanço; outro pode economizar recursos mas votar contra prioridades do eleitor.',
          'A pergunta final deve ser: o conjunto dos dados confirma o tipo de representação que você espera?',
        ],
      },
    ],
  },
  {
    slug: 'glossario-politico-congresso',
    title: 'Glossário básico do Congresso Nacional',
    description:
      'Entenda termos comuns da política brasileira: bancada, comissão, relator, quórum, destaque, obstrução, suplente e liderança.',
    updatedAt: '2026-04-28',
    readingTime: '8 min',
    intro:
      'Muitos dados legislativos parecem confusos porque usam termos próprios do Congresso. Entender esse vocabulário ajuda a interpretar notícias, votações e perfis parlamentares com menos dependência de explicações partidárias ou recortes de rede social.',
    sections: [
      {
        title: 'Bancada, bloco e liderança',
        paragraphs: [
          'Bancada é o conjunto de parlamentares de um partido, estado, tema ou grupo político. A bancada partidária costuma ser a mais importante para votações, porque partidos orientam votos e negociam espaço na agenda legislativa.',
          'Blocos são agrupamentos formais de partidos para atuação conjunta, especialmente relevantes no Senado. Lideranças representam partidos, governo, oposição, maioria ou minoria e influenciam a organização das votações.',
        ],
      },
      {
        title: 'Comissão e relator',
        paragraphs: [
          'Comissões são grupos temáticos que analisam propostas antes do plenário ou decidem matérias em caráter conclusivo quando o regimento permite. Elas tratam de áreas como Constituição e Justiça, economia, educação, saúde, segurança e meio ambiente.',
          'Relator é o parlamentar responsável por analisar uma proposta e apresentar parecer. A relatoria pode ser decisiva, porque define o texto recomendado, aceita ou rejeita emendas e orienta o debate técnico.',
        ],
      },
      {
        title: 'Quórum, destaque e obstrução',
        paragraphs: [
          'Quórum é o número mínimo de parlamentares necessário para abrir sessão ou aprovar determinada matéria. Algumas decisões exigem maioria simples; outras exigem maioria absoluta ou quórum qualificado.',
          'Destaque é um instrumento para votar separadamente parte de uma proposta. Obstrução é uma estratégia usada para atrasar ou dificultar votação, normalmente por partidos que querem ganhar tempo ou impedir avanço de uma matéria.',
        ],
      },
      {
        title: 'Suplente, licença e mandato',
        paragraphs: [
          'Suplente é quem assume temporária ou definitivamente quando o titular se licencia, renuncia, morre ou ocupa outro cargo. No Senado, suplentes são eleitos junto com o titular; na Câmara, a suplência depende da votação partidária e da regra eleitoral.',
          'Licenças podem ocorrer por motivos pessoais, saúde, missão oficial ou exercício de cargo no Executivo. Ao avaliar um parlamentar, confira se o mandato esteve ativo durante o período analisado.',
        ],
      },
      {
        title: 'Projeto, emenda e medida provisória',
        paragraphs: [
          'Projetos de lei propõem novas regras ou alterações em leis existentes. Emendas modificam o texto em tramitação. Medidas provisórias são editadas pelo Executivo com força de lei imediata, mas precisam ser analisadas pelo Congresso para continuar valendo.',
          'Quando um parlamentar aparece associado a uma proposta, verifique se ele é autor, coautor, relator, membro da comissão ou apenas votou na matéria. Cada papel tem peso diferente.',
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return GUIDE_ARTICLES.find((article) => article.slug === slug) ?? null;
}
