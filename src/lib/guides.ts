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


export interface GuideSource {
  label: string;
  description: string;
  href: string;
}
export interface GuideCategory {
  id: string;
  label: string;
  description: string;
  colorClass: string;
  textClass: string;
  slugs: string[];
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: 'avaliacao',
    label: 'Avaliação de Mandato',
    description: 'Critérios para avaliar deputados, senadores, promessas, partidos e desempenho real.',
    colorClass: 'bg-[#FFD709]',
    textClass: 'text-black',
    slugs: [
      'como-avaliar-deputado-federal',
      'como-avaliar-senador',
      'como-comparar-parlamentares',
      'como-acompanhar-promessas-campanha',
      'como-analisar-rankings-politicos',
      'como-entender-historico-partidario',
      'como-avaliar-politicas-publicas',
      'como-avaliar-reeleicao',
    ],
  },
  {
    id: 'congresso',
    label: 'Como o Congresso Funciona',
    description: 'Explicações sobre cargos, comissões, propostas, votações, orçamento e rotina legislativa.',
    colorClass: 'bg-[#9BF6FF]',
    textClass: 'text-black',
    slugs: [
      'glossario-politico-congresso',
      'diferenca-deputado-senador',
      'como-funcionam-comissoes',
      'como-ler-projetos-de-lei',
      'como-entender-orcamento-emendas',
    ],
  },
  {
    id: 'sistema-eleitoral',
    label: 'Sistema Eleitoral',
    description: 'Regras que explicam eleição proporcional, suplência, federações, partidos e pesquisas.',
    colorClass: 'bg-[#D7B8FF]',
    textClass: 'text-black',
    slugs: [
      'como-funciona-quociente-eleitoral',
      'federacoes-coligacoes-partidos',
      'o-que-faz-suplente',
      'voto-proporcional-legenda',
      'como-checar-pesquisas-eleitorais',
    ],
  },
  {
    id: 'checagem',
    label: 'Checagem e Fontes',
    description: 'Guias para conferir dados oficiais, evitar boatos e ler registros públicos com cuidado.',
    colorClass: 'bg-[#C8FF8C]',
    textClass: 'text-black',
    slugs: [
      'como-conferir-fontes-oficiais',
      'como-evitar-desinformacao-eleitoral',
      'como-checar-processos-e-condenacoes',
      'como-usar-portais-transparencia',
      'como-avaliar-politico-redes-sociais',
    ],
  },
  {
    id: 'voto',
    label: 'Voto Consciente',
    description: 'Conteúdo prático para transformar dados públicos em decisão eleitoral mais responsável.',
    colorClass: 'bg-[#FFB3D9]',
    textClass: 'text-black',
    slugs: [
      'em-quem-votar',
      'como-pesquisar-candidato-pelo-nome',
      'checklist-antes-de-votar',
      'como-usar-match-eleitoral',
      'como-ler-votacoes-nominais',
      'guia-primeiro-voto',
      'como-montar-lista-criterios-voto',
      'como-conversar-politica-familia',
      'guia-temas-seguranca-publica',
      'guia-temas-educacao',
      'guia-temas-saude',
      'guia-temas-meio-ambiente',
      'guia-temas-economia-impostos',
    ],
  },
];

const GUIDE_CARD_STYLES = [
  'bg-[#FFD709]',
  'bg-[#9BF6FF]',
  'bg-[#FFB3D9]',
  'bg-[#C8FF8C]',
  'bg-[#FFC27A]',
  'bg-[#D7B8FF]',
];

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
  {
    slug: 'diferenca-deputado-senador',
    title: 'Qual é a diferença entre deputado federal e senador?',
    description:
      'Entenda funções, mandato, forma de eleição, peso político e como comparar deputados e senadores sem misturar papéis diferentes.',
    updatedAt: '2026-04-28',
    readingTime: '9 min',
    intro:
      'Deputados federais e senadores fazem parte do Congresso Nacional, mas não ocupam o mesmo papel. Eles votam leis, fiscalizam o governo e representam a população, porém atuam em casas diferentes, com mandatos diferentes e responsabilidades institucionais próprias. Entender essa diferença evita cobranças erradas e melhora a avaliação do voto.',
    sections: [
      {
        title: 'A Câmara representa a população de forma proporcional',
        paragraphs: [
          'Deputados federais são eleitos para representar a população dos estados de forma proporcional. Estados mais populosos elegem mais deputados, respeitando limites constitucionais. Na prática, isso cria uma casa maior, mais plural e mais diretamente ligada à diversidade eleitoral do país.',
          'A Câmara costuma ser o ponto inicial de muitas propostas e tem papel central na formação de maiorias políticas. Deputados atuam em comissões, apresentam projetos, votam medidas provisórias, discutem orçamento e fiscalizam o governo federal. A quantidade maior de parlamentares também faz com que a atuação partidária e de blocos tenha grande peso.',
          'Ao avaliar um deputado, é razoável observar presença, votações, temas de atuação, projetos, relatorias, gastos, emendas, participação em comissões e coerência com o programa pelo qual foi eleito. Mas é importante lembrar que nem todo deputado terá o mesmo espaço político: líderes, relatores e presidentes de comissão costumam ter mais influência no processo legislativo.',
        ],
      },
      {
        title: 'O Senado representa os estados de forma igualitária',
        paragraphs: [
          'Cada estado e o Distrito Federal elegem três senadores, independentemente do tamanho da população. Isso faz do Senado uma casa de equilíbrio federativo: São Paulo e Roraima têm o mesmo número de senadores, embora tenham populações muito diferentes.',
          'Senadores têm mandato de oito anos e participam de decisões institucionais relevantes, como aprovação de autoridades, análise de temas federativos, sabatinas, relações exteriores, dívida pública e revisão de projetos vindos da Câmara. A casa é menor, então cada senador tende a ter peso individual maior.',
          'Ao avaliar um senador, observe relatorias, sabatinas, comissões, votações em temas nacionais, postura institucional e relação com interesses do estado. Popularidade regional pode ajudar a entender sua força política, mas não substitui análise de registro legislativo.',
        ],
      },
      {
        title: 'Comparações diretas podem enganar',
        paragraphs: [
          'Comparar um deputado e um senador usando os mesmos critérios pode distorcer a avaliação. Deputados costumam ter mais concorrência interna, mais fragmentação partidária e uma rotina de votação mais numerosa. Senadores, por outro lado, têm mandatos mais longos e maior exposição em decisões institucionais específicas.',
          'Se você quer comparar desempenho, prefira deputado com deputado e senador com senador. Quando a comparação envolver casas diferentes, deixe claro o critério: posição sobre um tema, atuação pelo estado, coerência partidária, transparência de gastos ou capacidade de articulação.',
          'Uma boa pergunta é: dentro do papel institucional que ocupa, esse parlamentar entrega o tipo de representação que prometeu? Essa pergunta é mais justa do que tentar aplicar o mesmo placar a cargos diferentes.',
        ],
      },
      {
        title: 'Como usar essa diferença na hora de votar',
        paragraphs: [
          'Para deputado federal, vale olhar com atenção a pauta temática, a relação com o partido, as votações recentes, o trabalho em comissões e a capacidade de fiscalizar o Executivo. Para senador, vale acrescentar análise de sabatinas, relatorias estruturantes, decisões federativas e postura em temas institucionais.',
          'Nos dois casos, evite decidir apenas por fama, cortes de vídeo ou propaganda. O melhor voto nasce da combinação entre valores pessoais, dados oficiais, histórico público e clareza sobre o que cada cargo realmente pode fazer.',
        ],
      },
    ],
  },
  {
    slug: 'como-funcionam-comissoes',
    title: 'Como funcionam as comissões da Câmara e do Senado',
    description:
      'Veja por que comissões, relatorias e audiências públicas são essenciais para entender a atuação real de um parlamentar.',
    updatedAt: '2026-04-28',
    readingTime: '10 min',
    intro:
      'Muita gente acompanha apenas votações de plenário, mas uma parte decisiva do Congresso acontece nas comissões. É nelas que propostas são debatidas tecnicamente, relatórios são construídos, audiências públicas acontecem e matérias podem avançar ou travar antes de chegar ao público mais amplo.',
    sections: [
      {
        title: 'Comissões são filtros temáticos',
        paragraphs: [
          'Uma comissão reúne parlamentares para discutir uma área específica, como Constituição e Justiça, Educação, Saúde, Segurança Pública, Meio Ambiente, Agricultura, Fiscalização Financeira ou Assuntos Econômicos. Em vez de todo o Congresso analisar tudo ao mesmo tempo, as comissões distribuem o trabalho por tema.',
          'Esse filtro é importante porque muitas propostas exigem conhecimento técnico. Uma proposta sobre orçamento deve ser analisada com critérios diferentes de uma proposta sobre saúde pública ou segurança. A comissão cria um espaço para audiências, pareceres, emendas e negociação.',
          'Quando um parlamentar participa de uma comissão relacionada a sua principal pauta, isso pode mostrar coerência de atuação. Por outro lado, presença formal na comissão não garante influência real: é preciso observar participação, relatórios, votos e protagonismo nos debates.',
        ],
      },
      {
        title: 'O relator pode mudar o destino de uma proposta',
        paragraphs: [
          'O relator é escolhido para analisar uma matéria e apresentar parecer. Esse parecer pode recomendar aprovação, rejeição, substitutivo, alterações ou ajustes técnicos. Em muitos casos, a versão final votada tem mais relação com o relatório do que com o texto original.',
          'Por isso, relatorias são sinal importante de poder legislativo. Um parlamentar que relata temas relevantes pode influenciar políticas públicas mesmo sem aparecer tanto em discursos de plenário. A relatoria também revela confiança política: líderes e presidentes de comissão tendem a entregar matérias estratégicas a quem tem capacidade de negociação.',
          'Ao avaliar um parlamentar, veja se ele foi relator de propostas relevantes, qual foi sua posição, se ouviu setores afetados e se o texto final preservou coerência com as promessas que fez aos eleitores.',
        ],
      },
      {
        title: 'Audiências públicas revelam prioridades',
        paragraphs: [
          'Audiências públicas permitem ouvir especialistas, governo, sociedade civil, empresas, sindicatos e grupos afetados por determinada proposta. Elas não são apenas formalidade: podem revelar quem o parlamentar escuta e quais evidências considera importantes.',
          'Um parlamentar que convoca audiência sobre tema técnico demonstra interesse em aprofundar o debate. Mas também é importante observar diversidade de convidados. Audiências com apenas um lado do problema podem funcionar mais como palco político do que como investigação séria.',
          'Para o eleitor, acompanhar audiências ajuda a identificar se o mandato age com base em dados, pressão de grupos específicos, ideologia ou estratégia eleitoral.',
        ],
      },
      {
        title: 'Comissões podem aprovar sem plenário',
        paragraphs: [
          'Algumas matérias podem ter tramitação conclusiva ou terminativa, dependendo da casa e do regimento. Isso significa que uma comissão pode aprovar uma proposta sem que ela vá ao plenário, salvo recurso ou regra específica.',
          'Esse ponto é essencial: se você acompanha apenas plenário, pode perder decisões importantes. Parlamentares ativos em comissões podem influenciar leis mesmo sem grande visibilidade pública.',
          'Ao usar dados legislativos, procure entender se determinada proposta passou por comissão, quem relatou, quem votou e se houve recurso ao plenário. Essa trilha mostra melhor o caminho real da decisão.',
        ],
      },
    ],
  },
  {
    slug: 'como-ler-projetos-de-lei',
    title: 'Como ler projetos de lei sem se perder no juridiquês',
    description:
      'Aprenda a entender ementa, autoria, justificativa, parecer, substitutivo, emenda e tramitação de uma proposta legislativa.',
    updatedAt: '2026-04-28',
    readingTime: '11 min',
    intro:
      'Projetos de lei costumam parecer documentos difíceis, mas boa parte da leitura pode ser organizada em perguntas simples: quem apresentou, o que muda, por que muda, qual texto está valendo agora, onde está tramitando e quem será afetado. Esse roteiro ajuda a ler propostas com menos dependência de interpretações prontas.',
    sections: [
      {
        title: 'Comece pela ementa, mas não pare nela',
        paragraphs: [
          'A ementa é o resumo oficial da proposta. Ela ajuda a identificar o assunto, mas não substitui a leitura do texto. Às vezes a ementa é ampla demais, técnica demais ou positiva demais para revelar os efeitos práticos da medida.',
          'Depois da ementa, procure o texto completo. Veja quais leis são alteradas, quais artigos são criados ou revogados e se a proposta impõe obrigações, cria benefícios, muda punições, altera orçamento ou transfere responsabilidade entre órgãos.',
          'Uma leitura responsável separa intenção declarada de efeito jurídico. Uma proposta pode dizer que protege determinado grupo, mas criar mecanismos fracos. Outra pode parecer simples, mas alterar pontos centrais de uma política pública.',
        ],
      },
      {
        title: 'Autoria não é o mesmo que aprovação',
        paragraphs: [
          'Muitos parlamentares divulgam projetos apresentados, mas apresentar não significa aprovar. A proposta ainda precisa tramitar, receber pareceres, passar por comissões, eventualmente ir ao plenário e, dependendo do caso, seguir para outra casa legislativa e sanção presidencial.',
          'Avalie se o parlamentar só protocolou textos ou se conseguiu construir apoio para avançar. Projetos parados por anos podem indicar baixa prioridade, falta de articulação, resistência política ou simplesmente congestionamento legislativo.',
          'Coautoria também merece contexto. Assinar uma proposta pode demonstrar apoio político, mas o papel do autor principal, do relator e das lideranças costuma ter peso diferente.',
        ],
      },
      {
        title: 'Parecer e substitutivo podem mudar tudo',
        paragraphs: [
          'Durante a tramitação, o relator pode apresentar parecer com substitutivo. Um substitutivo troca o texto original por uma nova versão. Isso significa que a proposta votada pode ser muito diferente da proposta apresentada inicialmente.',
          'Por isso, quando alguém diz que um parlamentar “apoiou um projeto”, confira qual versão estava em votação. O parlamentar pode ter apoiado um substitutivo moderado, rejeitado um destaque específico ou votado em uma etapa procedimental.',
          'Acompanhar pareceres é mais trabalhoso, mas melhora muito a qualidade da análise. Pareceres mostram argumentos técnicos, constitucionalidade, impactos e negociações feitas ao longo do processo.',
        ],
      },
      {
        title: 'Tramitação mostra prioridade e viabilidade',
        paragraphs: [
          'A tramitação indica onde a proposta está, por quais comissões passou, quem relatou, quais prazos existem e se houve movimentação recente. Uma proposta parada pode estar aguardando parecer, acordo político, recurso, pauta de comissão ou decisão da presidência da casa.',
          'Para o eleitor, a tramitação ajuda a separar propaganda de resultado. Um mandato pode divulgar dezenas de projetos, mas poucos avançarem. Outro pode trabalhar em menos matérias, porém com maior efeito prático por meio de relatorias ou negociações.',
          'Sempre que possível, combine leitura da proposta com registro de tramitação e votos. Assim você entende não apenas o que foi prometido, mas o que aconteceu institucionalmente.',
        ],
      },
    ],
  },
  {
    slug: 'como-entender-orcamento-emendas',
    title: 'Como entender orçamento, emendas parlamentares e dinheiro público',
    description:
      'Um guia para diferenciar emendas, orçamento, gastos de gabinete, cota parlamentar e responsabilidade na destinação de recursos.',
    updatedAt: '2026-04-28',
    readingTime: '12 min',
    intro:
      'Dinheiro público é um dos temas mais importantes para avaliar representantes, mas também um dos mais fáceis de confundir. Emenda parlamentar, orçamento federal, cota de exercício parlamentar, verba de gabinete e gasto de campanha são coisas diferentes. Misturar esses conceitos atrapalha a fiscalização cidadã.',
    sections: [
      {
        title: 'Orçamento não é caixa pessoal do parlamentar',
        paragraphs: [
          'O orçamento federal é aprovado pelo Congresso e executado pelo Executivo, seguindo regras, programas, órgãos responsáveis e limites legais. Parlamentares influenciam esse processo por votações, relatorias, emendas e negociações políticas, mas não deveriam tratar recursos públicos como propriedade pessoal.',
          'Quando um político diz que “trouxe dinheiro” para uma cidade, vale perguntar: qual emenda, qual programa, qual órgão executou, qual valor foi empenhado, qual valor foi pago e qual obra ou serviço foi entregue? A diferença entre anúncio e pagamento efetivo pode ser grande.',
          'O eleitor deve procurar documentos que identifiquem número da emenda, beneficiário, ministério, município, objeto e fase da execução. Sem isso, a promessa pode virar marketing sem rastreabilidade.',
        ],
      },
      {
        title: 'Emenda parlamentar precisa ser acompanhada até a entrega',
        paragraphs: [
          'Uma emenda pode indicar destinação de recursos, mas o caminho até a entrega passa por empenho, convênio, execução, fiscalização e pagamento. Nem toda emenda anunciada vira obra concluída ou serviço entregue.',
          'Avaliar um parlamentar por emendas exige olhar qualidade da destinação. Recursos foram para saúde, educação, infraestrutura, cultura ou entidades? Havia critério público? O destino atende necessidade real? Houve concentração em aliados políticos?',
          'Transparência não é só publicar valor. É permitir que o cidadão entenda finalidade, beneficiário, execução e resultado concreto.',
        ],
      },
      {
        title: 'Cota parlamentar é outra coisa',
        paragraphs: [
          'A cota parlamentar financia despesas relacionadas ao exercício do mandato, como passagens, comunicação, aluguel de escritório, combustíveis ou serviços autorizados pelas regras da casa legislativa. Ela não é a mesma coisa que emenda nem orçamento de política pública.',
          'Ao analisar cota, observe padrões: fornecedores recorrentes, valores altos, gastos perto do limite, tipo de serviço e relação com a atividade parlamentar. Despesa regular não é automaticamente irregular, mas precisa fazer sentido e ser verificável.',
          'Também compare parlamentares em contextos parecidos. Um representante de estado distante de Brasília pode ter padrão de passagem diferente de outro que mora mais perto. Contexto não elimina fiscalização, mas evita conclusões apressadas.',
        ],
      },
      {
        title: 'O que perguntar antes de elogiar ou criticar',
        paragraphs: [
          'Antes de concluir que um parlamentar foi eficiente no uso de recursos, pergunte se há fonte pública, se o valor foi executado, se o resultado chegou ao cidadão e se a destinação seguiu critérios transparentes.',
          'Antes de concluir que houve desperdício, verifique a regra aplicável, o período, a finalidade e a documentação. Fiscalização boa é firme, mas precisa ser precisa.',
        ],
      },
    ],
  },
  {
    slug: 'como-acompanhar-promessas-campanha',
    title: 'Como acompanhar promessas de campanha depois da eleição',
    description:
      'Aprenda a transformar promessas eleitorais em critérios verificáveis durante o mandato, separando discurso, competência e resultado.',
    updatedAt: '2026-04-28',
    readingTime: '9 min',
    intro:
      'Promessa de campanha costuma ser simples, direta e emocional. Mandato parlamentar é mais complexo: depende de competência legal, articulação, orçamento, maioria política e tempo. Acompanhar promessas exige transformar frases de campanha em indicadores verificáveis.',
    sections: [
      {
        title: 'Primeiro veja se a promessa cabe no cargo',
        paragraphs: [
          'Candidatos muitas vezes prometem resolver problemas que não dependem diretamente do cargo disputado. Um deputado federal não administra hospital municipal, um senador não executa obra local sozinho e um vereador não controla política nacional. Isso não significa que não possam influenciar, mas a cobrança precisa respeitar competência institucional.',
          'Antes de avaliar cumprimento, pergunte: esse cargo pode fazer isso diretamente? Precisa de lei? Precisa de orçamento? Depende do Executivo? Depende do estado ou município? Essa triagem evita cobrar o parlamentar por algo que ele não controla ou aceitar desculpas quando ele tinha instrumentos reais.',
        ],
      },
      {
        title: 'Transforme promessa em pergunta verificável',
        paragraphs: [
          'Uma promessa como “vou defender a saúde” é vaga. Para acompanhar, transforme em perguntas: apresentou projetos sobre saúde? Votou em propostas da área? Destinou emendas? Participou de comissão relacionada? Fiscalizou políticas públicas? Publicou prestação de contas?',
          'Quanto mais concreta a pergunta, mais fácil verificar. Promessas genéricas favorecem propaganda permanente; critérios específicos aproximam o eleitor de dados oficiais.',
        ],
      },
      {
        title: 'Diferencie tentativa de resultado',
        paragraphs: [
          'Um parlamentar pode tentar cumprir uma promessa e fracassar por falta de apoio. Outro pode prometer, não agir e depois culpar o sistema. Para diferenciar, procure evidências de ação: projetos, requerimentos, votos, relatorias, audiências, emendas, fiscalização e articulação pública.',
          'Resultado importa, mas tentativa documentada também diz algo sobre prioridade. O eleitor deve observar se houve esforço consistente ou apenas lembrança da promessa em época eleitoral.',
        ],
      },
      {
        title: 'Crie uma lista de acompanhamento anual',
        paragraphs: [
          'Uma prática simples é registrar três a cinco promessas principais do candidato eleito e revisá-las anualmente. Para cada promessa, anote qual fonte será usada para verificar avanço: página oficial, votações, emendas, projetos, comissões ou prestação de contas.',
          'Isso reduz dependência de memória e propaganda. Ao final do mandato, você terá uma linha do tempo mais justa: o que prometeu, o que podia fazer, o que tentou e o que entregou.',
        ],
      },
    ],
  },
  {
    slug: 'como-analisar-rankings-politicos',
    title: 'Como analisar rankings políticos sem terceirizar seu voto',
    description:
      'Entenda vantagens, riscos e perguntas essenciais antes de usar notas públicas, rankings e índices legislativos na decisão eleitoral.',
    updatedAt: '2026-04-28',
    readingTime: '10 min',
    intro:
      'Rankings políticos podem ajudar a organizar muita informação, mas também podem induzir o eleitor a terceirizar julgamento. Uma nota resume critérios escolhidos por alguém. Para usar bem, é preciso entender o que entra na nota, o que fica de fora e se os critérios combinam com seus valores.',
    sections: [
      {
        title: 'Toda nota carrega uma visão de mundo',
        paragraphs: [
          'Um ranking pode valorizar economia de recursos, presença, combate a privilégios, alinhamento econômico, transparência, produtividade legislativa ou votos em temas específicos. Nenhum desses critérios é neutro por si só; todos expressam escolhas metodológicas.',
          'Isso não torna rankings inúteis. Pelo contrário: eles podem ser excelentes atalhos quando são transparentes. O problema é usar uma nota sem saber o que ela mede. Uma pessoa pode concordar com o parlamentar em temas sociais, mas discordar dos critérios econômicos de um ranking, ou o contrário.',
        ],
      },
      {
        title: 'Procure metodologia antes de olhar colocação',
        paragraphs: [
          'Antes de comemorar ou condenar uma posição, leia a metodologia. Quais votos entram? Qual período é considerado? Ausência pesa? Processos contam? Há diferença entre deputado e senador? O ranking trata partidos pequenos e grandes da mesma forma?',
          'Sem essas respostas, a colocação vira número solto. Um parlamentar pode subir por um critério que você considera secundário e cair por outro que você considera central.',
        ],
      },
      {
        title: 'Compare ranking com dados brutos',
        paragraphs: [
          'Use rankings como porta de entrada. Se alguém aparece muito bem ou muito mal colocado, abra o perfil e veja votos, presença, despesas, projetos e fontes oficiais. O objetivo é entender por que a nota existe.',
          'Quando a nota e os dados brutos contam histórias diferentes, investigue. Pode haver erro, atraso de atualização, critério controverso ou simplesmente uma diferença legítima entre o que o ranking valoriza e o que você valoriza.',
        ],
      },
      {
        title: 'Não transforme ranking em santificação ou cancelamento',
        paragraphs: [
          'Uma nota alta não prova que o parlamentar é bom em tudo. Uma nota baixa não prova que ele é ruim em tudo. Mandatos são multidimensionais: ideologia, competência, ética, presença, articulação e impacto público não cabem perfeitamente em um único número.',
          'A pergunta útil é: esse ranking ilumina um aspecto relevante do mandato? Se sim, use. Se ele tenta substituir todo o julgamento político, desconfie.',
        ],
      },
    ],
  },
  {
    slug: 'como-entender-historico-partidario',
    title: 'Como entender troca de partido e histórico partidário',
    description:
      'Veja quando mudança partidária é sinal de incoerência, estratégia, sobrevivência política ou reorganização legítima do sistema.',
    updatedAt: '2026-04-28',
    readingTime: '8 min',
    intro:
      'Trocar de partido é comum na política brasileira, mas nem toda troca tem o mesmo significado. Algumas revelam mudança real de posição, outras refletem reorganização partidária, janela legal, fusões, federações, disputas internas ou busca por viabilidade eleitoral. O histórico partidário precisa ser lido com contexto.',
    sections: [
      {
        title: 'Partido importa porque organiza poder',
        paragraphs: [
          'Partidos controlam tempo de campanha, fundo eleitoral, liderança, comissões, orientação de voto e alianças. Mesmo parlamentares com marca pessoal forte dependem de estrutura partidária para disputar eleições e influenciar votações.',
          'Por isso, histórico partidário ajuda a entender trajetória política. Um parlamentar que passou por legendas muito diferentes pode ter explicação legítima, mas também pode indicar baixa coerência ideológica. A conclusão depende do padrão e dos temas votados.',
        ],
      },
      {
        title: 'Nem toda troca é igual',
        paragraphs: [
          'Mudanças podem acontecer por fusão de partidos, criação de federação, janela partidária, conflito com direção, mudança de liderança local, sobrevivência eleitoral ou alteração real de convicções. Tratar todas como oportunismo simplifica demais a política.',
          'A pergunta mais útil é: depois da troca, o parlamentar mudou seus votos e prioridades? Se mudou, em quais temas? Se não mudou, talvez a troca tenha sido mais estratégica do que ideológica.',
        ],
      },
      {
        title: 'Compare discurso antigo e atuação recente',
        paragraphs: [
          'Um bom teste é comparar promessas de campanha, partido pelo qual foi eleito, votações recentes e justificativas públicas da mudança. Coerência não significa nunca mudar de opinião, mas mudança responsável exige explicação.',
          'Quando a troca partidária acontece logo após a eleição ou contraria frontalmente a pauta apresentada ao eleitor, o nível de cobrança deve ser maior. O eleitor votou em uma combinação de pessoa, partido e programa.',
        ],
      },
      {
        title: 'Use histórico como pista, não como prova única',
        paragraphs: [
          'Histórico partidário é um sinal, mas não substitui análise de votos, projetos, presença e fontes oficiais. Há parlamentares estáveis em partido, mas incoerentes em votações; há parlamentares que trocaram de legenda, mas mantiveram linha programática clara.',
          'A melhor análise combina trajetória, justificativa, atuação e consequências práticas para o mandato.',
        ],
      },
    ],
  },
  {
    slug: 'como-evitar-desinformacao-eleitoral',
    title: 'Como evitar desinformação eleitoral no WhatsApp e nas redes',
    description:
      'Um guia prático para identificar recortes enganosos, prints sem fonte, vídeos fora de contexto e falsas acusações políticas.',
    updatedAt: '2026-04-28',
    readingTime: '12 min',
    intro:
      'Desinformação eleitoral raramente aparece como mentira óbvia. Muitas vezes ela mistura dado real, recorte fora de contexto, título exagerado, print sem link e emoção moral. A melhor proteção é criar um ritual simples antes de compartilhar qualquer conteúdo político.',
    sections: [
      {
        title: 'Desconfie de urgência emocional',
        paragraphs: [
          'Mensagens que pedem compartilhamento imediato, usam linguagem de pânico ou dizem que “a mídia não quer mostrar” costumam tentar reduzir sua disposição de checar. A pressa é parte da estratégia.',
          'Antes de repassar, respire e pergunte: há link? há data? há fonte primária? o conteúdo mostra documento completo ou apenas print? quem ganha com a circulação dessa versão?',
          'Informação verdadeira resiste a alguns minutos de verificação. Se uma mensagem só funciona quando você não confere, ela provavelmente é frágil.',
        ],
      },
      {
        title: 'Print não é fonte',
        paragraphs: [
          'Prints podem ser editados, recortados ou tirados de contexto. Mesmo quando são reais, podem ocultar data, sequência da conversa, link original ou resposta posterior. Use print como pista, nunca como prova final.',
          'Procure o documento, vídeo, votação ou declaração original. Se a acusação envolve voto parlamentar, abra a página da votação. Se envolve processo, procure número e tribunal. Se envolve fala, busque a gravação completa ou transcrição confiável.',
        ],
      },
      {
        title: 'Vídeos curtos precisam de contexto',
        paragraphs: [
          'Um corte de 20 segundos pode mudar o sentido de uma fala. Pode retirar pergunta, ironia, continuação, data ou circunstância. Em política, cortes são usados para confirmar crenças de quem já concorda com a mensagem.',
          'Quando o vídeo for grave, procure versão longa, data, local e tema. Veja se outros veículos ou fontes institucionais registraram a mesma fala. Se só existe um corte sem origem, a chance de manipulação aumenta.',
        ],
      },
      {
        title: 'Crie uma regra pessoal de compartilhamento',
        paragraphs: [
          'Uma regra simples: não compartilhe acusação individual sem fonte primária ou veículo confiável; não compartilhe votação sem link oficial; não compartilhe processo sem número; não compartilhe ranking sem metodologia.',
          'Essa disciplina reduz o alcance de boatos e melhora a conversa política. O objetivo não é defender político, mas defender a qualidade da decisão pública.',
        ],
      },
    ],
  },
  {
    slug: 'como-checar-processos-e-condenacoes',
    title: 'Como checar processos, condenações e acusações contra políticos',
    description:
      'Entenda diferença entre acusação, investigação, ação judicial, condenação, recurso, trânsito em julgado e inelegibilidade.',
    updatedAt: '2026-04-28',
    readingTime: '11 min',
    intro:
      'Informações judiciais sobre políticos exigem cuidado. Uma investigação não é condenação; uma ação em andamento não é culpa provada; uma condenação pode estar sujeita a recurso; e inelegibilidade depende de regras específicas. Checar corretamente evita injustiça e evita propaganda enganosa.',
    sections: [
      {
        title: 'Comece separando os termos',
        paragraphs: [
          'Acusação é uma afirmação de que alguém praticou algo. Investigação é apuração. Denúncia aceita pode iniciar ação penal. Ação judicial é processo em tramitação. Condenação é decisão de uma autoridade judicial. Trânsito em julgado é quando não cabem mais recursos ordinários. Cada fase tem peso diferente.',
          'Misturar esses termos é comum em disputa eleitoral. Uma campanha pode chamar investigação de “condenação” para atacar adversário; outra pode chamar condenação recorrível de “nada comprovado” para reduzir gravidade. A leitura correta exige identificar a fase processual.',
        ],
      },
      {
        title: 'Procure número do processo e tribunal',
        paragraphs: [
          'Notícia séria sobre processo deve permitir encontrar número, tribunal, classe processual, partes e movimentação. Sem esses dados, a checagem fica frágil. Nome de pessoa pode gerar homônimos, erros e confusões.',
          'Quando consultar, veja se o processo é cível, criminal, eleitoral, administrativo ou de improbidade. Cada área tem consequências diferentes. Também observe se há segredo de justiça, recurso pendente ou decisão reformada.',
        ],
      },
      {
        title: 'Condenação não é sempre inelegibilidade',
        paragraphs: [
          'Inelegibilidade depende da legislação eleitoral, do tipo de decisão, do órgão julgador, do crime ou ato discutido e do momento processual. Nem toda condenação impede candidatura automaticamente, e nem toda candidatura liberada significa ausência de problemas judiciais.',
          'Para avaliar politicamente, você pode considerar gravidade ética mesmo quando não há inelegibilidade. Mas precisa separar julgamento jurídico de julgamento político.',
        ],
      },
      {
        title: 'Cuidado com listas sem atualização',
        paragraphs: [
          'Listas antigas de processos podem incluir ações arquivadas, decisões reformadas, homônimos ou registros sem contexto. Sempre procure data e status atual.',
          'Se a informação for decisiva para seu voto, vá além do resumo: consulte movimentação, decisão principal e fonte institucional. O custo de errar em acusações pessoais é alto para o debate público.',
        ],
      },
    ],
  },
  {
    slug: 'como-usar-portais-transparencia',
    title: 'Como usar portais de transparência para fiscalizar políticos',
    description:
      'Aprenda a navegar por portais públicos, entender filtros, datas, empenhos, pagamentos, fornecedores e limitações dos dados.',
    updatedAt: '2026-04-28',
    readingTime: '10 min',
    intro:
      'Portais de transparência são ferramentas poderosas, mas nem sempre fáceis. Eles usam termos administrativos, filtros por data, campos técnicos e bases que podem ter atraso. Saber navegar evita conclusões precipitadas e melhora a fiscalização cidadã.',
    sections: [
      {
        title: 'Defina a pergunta antes de abrir o portal',
        paragraphs: [
          'Entrar em um portal sem pergunta clara gera confusão. Você quer saber quanto foi pago? Quanto foi empenhado? Quem recebeu? Qual órgão executou? Qual município foi beneficiado? Qual parlamentar indicou recurso? Cada pergunta exige filtro diferente.',
          'Anote antes: pessoa, período, órgão, cidade, tipo de despesa e palavra-chave. Isso reduz ruído e evita transformar uma base pública enorme em caça aleatória por suspeitas.',
        ],
      },
      {
        title: 'Entenda empenho, liquidação e pagamento',
        paragraphs: [
          'Empenho é reserva de orçamento para determinada despesa. Liquidação é reconhecimento de que o serviço ou bem foi entregue conforme regras. Pagamento é saída efetiva do dinheiro. Um valor empenhado pode não ter sido pago ainda.',
          'Muitas divulgações políticas usam valor anunciado ou empenhado como se fosse entrega concluída. Para fiscalizar resultado, veja a cadeia completa e, quando possível, confirme obra, serviço ou compra realizada.',
        ],
      },
      {
        title: 'Fornecedor recorrente merece atenção, não condenação automática',
        paragraphs: [
          'Quando um mesmo fornecedor aparece muitas vezes, vale investigar contrato, objeto, competição, valores e vínculos. Recorrência pode ser normal em serviços contínuos, mas também pode revelar concentração problemática.',
          'A análise deve combinar dados do portal com documentos de contratação, notas fiscais, termos de referência e comparação de preços quando disponíveis.',
        ],
      },
      {
        title: 'Guarde links e datas de consulta',
        paragraphs: [
          'Portais mudam, dados atualizam e filtros expiram. Ao encontrar algo relevante, registre link, data da consulta, parâmetros usados e, se possível, baixe arquivo em formato aberto.',
          'Isso torna sua checagem reprodutível. Fiscalização boa permite que outra pessoa siga o mesmo caminho e chegue ao mesmo dado.',
        ],
      },
    ],
  },
  {
    slug: 'guia-primeiro-voto',
    title: 'Guia do primeiro voto: como decidir sem depender de propaganda',
    description:
      'Um roteiro para jovens eleitores organizarem valores, fontes, prioridades e comparação de candidatos antes da eleição.',
    updatedAt: '2026-04-28',
    readingTime: '9 min',
    intro:
      'O primeiro voto pode parecer uma mistura de pressão familiar, redes sociais, propaganda e medo de errar. A boa notícia é que voto consciente não exige saber tudo sobre política. Exige método: entender cargos, definir prioridades, conferir fontes e comparar opções com calma.',
    sections: [
      {
        title: 'Entenda o que cada cargo pode fazer',
        paragraphs: [
          'Antes de escolher, entenda a função do cargo em disputa. Presidente, governador, prefeito, senador, deputado, vereador e deputado estadual não têm as mesmas responsabilidades. Muita frustração política nasce de esperar de um cargo algo que ele não pode entregar sozinho.',
          'Quando você sabe o papel do cargo, consegue avaliar propostas com mais precisão. Uma promessa pode ser importante, mas estar no nível errado de governo. Outra pode depender de lei, orçamento ou maioria legislativa.',
        ],
      },
      {
        title: 'Escolha três prioridades pessoais',
        paragraphs: [
          'Ninguém acompanha todos os temas com profundidade. Escolha três áreas que mais importam para você: educação, emprego, segurança, saúde, meio ambiente, transporte, direitos sociais, economia, combate à corrupção ou tecnologia.',
          'Depois, avalie candidatos a partir dessas prioridades. Isso reduz influência de memes, brigas e carisma. Você passa a perguntar: essa pessoa tem histórico ou proposta consistente nos temas que considero centrais?',
        ],
      },
      {
        title: 'Use redes sociais como vitrine, não como prova',
        paragraphs: [
          'Rede social mostra como o candidato quer ser visto. Fonte oficial mostra parte do que ele fez. As duas coisas podem ser úteis, mas têm pesos diferentes. Vídeos, slogans e cortes devem levar você a pesquisar, não encerrar a pesquisa.',
          'Quando um candidato fizer uma afirmação forte, procure documento, votação, projeto, dado público ou notícia confiável. O hábito de checar uma informação por dia já muda a qualidade do voto.',
        ],
      },
      {
        title: 'Converse sem transformar tudo em torcida',
        paragraphs: [
          'Família e amigos influenciam, mas voto é responsabilidade individual. Escute argumentos, peça fontes e compare critérios. Discordar de alguém próximo não precisa virar briga pessoal.',
          'Uma boa conversa política começa com pergunta concreta: “qual dado fez você decidir isso?” Quando a conversa sai do rótulo e entra na evidência, todo mundo aprende mais.',
        ],
      },
    ],
  },
  {
    slug: 'como-montar-lista-criterios-voto',
    title: 'Como montar uma lista de critérios para escolher candidato',
    description:
      'Crie uma matriz simples para comparar candidatos por valores, histórico, propostas, viabilidade, ética e fontes públicas.',
    updatedAt: '2026-04-28',
    readingTime: '8 min',
    intro:
      'Uma lista de critérios ajuda a transformar voto em decisão organizada. Em vez de depender apenas de simpatia, rejeição ou propaganda, você define o que importa e compara candidatos de forma mais clara. Não precisa ser uma planilha complexa: cinco critérios bem escolhidos já melhoram muito a decisão.',
    sections: [
      {
        title: 'Separe valores de evidências',
        paragraphs: [
          'Valores são suas prioridades: liberdade, igualdade, segurança, crescimento econômico, proteção ambiental, responsabilidade fiscal, direitos sociais, transparência. Evidências são registros que mostram se o candidato age de forma compatível com esses valores.',
          'Um erro comum é escolher candidato apenas porque ele usa palavras parecidas com seus valores. O melhor é perguntar: que votos, projetos, alianças, decisões e histórico confirmam esse discurso?',
        ],
      },
      {
        title: 'Escolha poucos critérios e dê peso',
        paragraphs: [
          'Uma matriz simples pode ter cinco critérios: coerência com meus valores, histórico público, competência para o cargo, transparência das fontes e viabilidade política. Dê nota de 1 a 5 para cada um ou apenas classifique como forte, médio ou fraco.',
          'Se um tema for decisivo para você, dê peso maior. Por exemplo: se meio ambiente é prioridade absoluta, a posição do candidato nesse tema deve pesar mais do que carisma em debate.',
        ],
      },
      {
        title: 'Inclua um critério de risco',
        paragraphs: [
          'Além de pontos positivos, avalie riscos: acusações graves, falta de transparência, mudança brusca de posição, alianças incompatíveis, histórico de desinformação ou promessa impossível.',
          'Risco não significa cancelamento automático. Significa que você precisa de mais evidência antes de confiar. Quanto maior o poder do cargo, maior deve ser o cuidado.',
        ],
      },
      {
        title: 'Revise quando surgirem fatos novos',
        paragraphs: [
          'Critérios não devem virar prisão mental. Se surgirem fatos relevantes, atualize sua avaliação. Mudar de opinião diante de evidência boa é sinal de maturidade política.',
          'O importante é não mudar por pressão emocional de última hora sem checar. Tenha método, mas mantenha abertura para informação nova.',
        ],
      },
    ],
  },
  {
    slug: 'como-conversar-politica-familia',
    title: 'Como conversar sobre política em família sem virar guerra',
    description:
      'Estratégias para discutir voto, dados públicos e divergências políticas com menos briga e mais foco em evidências.',
    updatedAt: '2026-04-28',
    readingTime: '7 min',
    intro:
      'Conversar sobre política em família pode ser difícil porque mistura identidade, memória, medo, religião, classe social, território e experiências pessoais. O objetivo não precisa ser convencer todo mundo. Às vezes, a vitória é só melhorar a qualidade da conversa e reduzir desinformação.',
    sections: [
      {
        title: 'Comece por perguntas, não por acusações',
        paragraphs: [
          'Frases como “você está errado” ou “você caiu em fake news” fecham a conversa. Perguntas abrem espaço: “onde você viu isso?”, “tem link?”, “qual votação foi essa?”, “qual fonte confirmou?”.',
          'Perguntar não é concordar. É deslocar a conversa da identidade para a evidência. Quando a pessoa precisa mostrar fonte, o debate melhora naturalmente.',
        ],
      },
      {
        title: 'Escolha uma informação por vez',
        paragraphs: [
          'Tentar corrigir dez boatos ao mesmo tempo vira disputa de resistência. Escolha uma afirmação concreta e investigue junto. Pode ser uma votação, uma promessa, um processo ou uma despesa.',
          'Quando a família aprende o caminho de checagem em um caso, fica mais fácil repetir em outros. O método vale mais do que vencer uma discussão isolada.',
        ],
      },
      {
        title: 'Separe valor moral de fato verificável',
        paragraphs: [
          'Duas pessoas podem concordar sobre o fato e discordar sobre o valor. Por exemplo: ambas podem confirmar que um parlamentar votou “sim” em uma proposta, mas discordar se isso foi bom ou ruim. Essa separação reduz briga inútil.',
          'Primeiro verifique o dado; depois discuta interpretação. Misturar as duas etapas faz todo mundo disputar realidade e opinião ao mesmo tempo.',
        ],
      },
      {
        title: 'Saiba quando parar',
        paragraphs: [
          'Nem toda conversa precisa terminar em acordo. Se o clima virou humilhação, ironia ou ataque pessoal, pare. Política é importante, mas relações familiares também importam.',
          'Você pode deixar um link, uma pergunta e um convite para continuar depois. Conversas boas às vezes amadurecem em silêncio, não na hora da discussão.',
        ],
      },
    ],
  },
  {
    slug: 'como-funciona-quociente-eleitoral',
    title: 'Como funciona o quociente eleitoral e por que seu voto pode eleger outro nome',
    description:
      'Entenda a regra do voto proporcional, cálculo de vagas, quociente eleitoral, sobras e por que partido importa na eleição para deputado.',
    updatedAt: '2026-04-28',
    readingTime: '11 min',
    intro:
      'Na eleição para deputado federal, deputado estadual e vereador, nem sempre os mais votados individualmente ficam com todas as vagas. O Brasil usa sistema proporcional, em que o desempenho do partido ou federação influencia quem entra. Entender o quociente eleitoral ajuda a perceber por que escolher partido também faz parte do voto.',
    sections: [
      {
        title: 'O voto proporcional começa no conjunto, não só no candidato',
        paragraphs: [
          'Em eleições proporcionais, os votos dados a candidatos de um partido ou federação são somados aos votos de legenda. Esse total ajuda a definir quantas cadeiras aquele grupo terá. Depois, as vagas são preenchidas pelos candidatos mais votados dentro do grupo, respeitando regras de desempenho individual.',
          'Isso significa que seu voto em um candidato ajuda primeiro a fortalecer a lista partidária. Se o partido tiver votos suficientes para várias cadeiras, outros nomes da mesma lista podem entrar. Por isso, votar em uma pessoa sem olhar o partido pode gerar surpresa no resultado final.',
        ],
      },
      {
        title: 'Quociente eleitoral é uma régua de entrada',
        paragraphs: [
          'De forma simplificada, o quociente eleitoral nasce da divisão dos votos válidos pelo número de vagas em disputa. Ele funciona como referência para calcular quantas cadeiras cada partido ou federação pode conquistar inicialmente.',
          'A regra tem detalhes e pode envolver distribuição de sobras, desempenho mínimo e mudanças legais ao longo do tempo. O ponto prático para o eleitor é entender que a eleição proporcional não é uma corrida puramente individual. O desempenho coletivo pesa muito.',
        ],
      },
      {
        title: 'Candidato puxador de voto pode alterar a bancada',
        paragraphs: [
          'Um candidato muito votado pode ajudar o partido a conquistar mais cadeiras. Essas cadeiras podem ser ocupadas por outros candidatos do mesmo partido ou federação, desde que cumpram as exigências legais. Esse fenômeno é conhecido popularmente como efeito puxador de voto.',
          'O eleitor deve perguntar: se meu candidato ajudar a eleger outros nomes, eu aceito a bancada que vem junto? Essa pergunta é essencial porque o voto proporcional carrega consequência coletiva.',
        ],
      },
      {
        title: 'Como usar isso na decisão de voto',
        paragraphs: [
          'Antes de votar para deputado, olhe candidato, partido, federação, principais nomes da lista e linha programática. Se você gosta de um candidato, mas rejeita fortemente o partido e a provável bancada, vale repensar o risco.',
          'O voto proporcional recompensa organização coletiva. Um voto consciente considera a pessoa e o grupo político que ela ajuda a fortalecer.',
        ],
      },
    ],
  },
  {
    slug: 'federacoes-coligacoes-partidos',
    title: 'Federações, coligações e partidos: o que mudou e por que isso afeta seu voto',
    description:
      'Entenda diferenças entre partido, federação e coligação, e como alianças eleitorais podem mudar a leitura do candidato.',
    updatedAt: '2026-04-28',
    readingTime: '10 min',
    intro:
      'Alianças partidárias parecem detalhe burocrático, mas afetam eleição, bancada, tempo de propaganda, distribuição de recursos e comportamento legislativo. Entender a diferença entre partido, federação e coligação ajuda a enxergar quem está junto antes e depois da votação.',
    sections: [
      {
        title: 'Partido é a unidade básica da representação',
        paragraphs: [
          'Partidos organizam candidaturas, programas, líderes, bancadas, orientação de voto e acesso a recursos eleitorais. Mesmo quando o candidato tem marca pessoal forte, ele disputa por uma estrutura partidária e depois atua dentro de uma bancada.',
          'Por isso, partido não é rodapé da urna. Ele influencia quem será eleito junto, quais alianças terão força e como o parlamentar poderá atuar no Congresso.',
        ],
      },
      {
        title: 'Federação é aliança com compromisso mais duradouro',
        paragraphs: [
          'Federações partidárias unem partidos para atuar de forma conjunta por período determinado em lei. Diferentemente de uma aliança informal de campanha, a federação cria obrigações de atuação conjunta e impacta a organização parlamentar.',
          'Para o eleitor, isso significa que partidos federados devem ser analisados como bloco em muitos contextos. Não basta olhar apenas a sigla preferida; é importante ver quem está federado com ela.',
        ],
      },
      {
        title: 'Coligações mudaram de peso nas eleições proporcionais',
        paragraphs: [
          'As regras sobre coligações variam conforme o tipo de eleição e mudanças legais. Em eleições proporcionais, coligações deixaram de funcionar como antes, o que tornou partidos e federações ainda mais relevantes para a distribuição de cadeiras.',
          'Como regra prática, sempre confira a regra vigente da eleição em disputa. O sistema eleitoral brasileiro muda e detalhes podem alterar estratégia partidária e consequência do voto.',
        ],
      },
      {
        title: 'Aliança local pode contrariar discurso nacional',
        paragraphs: [
          'Um partido pode ter discurso nacional forte e fazer alianças locais pragmáticas. Isso não é necessariamente ilegal, mas importa para o eleitor. Alianças mostram prioridades reais, capacidade de negociação e limites do discurso público.',
          'Antes de votar, observe quem apoia quem no seu estado, quem compõe federação e quais candidaturas caminham juntas. Muitas vezes a política real está nas alianças, não apenas no slogan.',
        ],
      },
    ],
  },
  {
    slug: 'o-que-faz-suplente',
    title: 'O que faz um suplente e por que ele importa no seu voto',
    description:
      'Entenda suplência na Câmara e no Senado, substituições, licenças, riscos e por que suplente também deve ser avaliado.',
    updatedAt: '2026-04-28',
    readingTime: '8 min',
    intro:
      'Suplente costuma aparecer pouco na campanha, mas pode assumir mandato e votar decisões importantes. Em eleições majoritárias e proporcionais, a suplência funciona de formas diferentes. Ignorar suplentes é deixar parte da representação fora da análise.',
    sections: [
      {
        title: 'No Senado, suplentes vêm na chapa',
        paragraphs: [
          'Cada candidato ao Senado registra suplentes. Se o titular se afasta, renuncia, morre ou assume outro cargo, o suplente pode ocupar a cadeira. Como o mandato de senador dura oito anos, suplente pode acabar exercendo poder por bastante tempo.',
          'Por isso, o eleitor deve olhar quem são os suplentes do candidato ao Senado. Eles têm trajetória pública? Representam quais interesses? Têm relação familiar, empresarial ou política com o titular? Essas perguntas importam.',
        ],
      },
      {
        title: 'Na Câmara, suplência depende da lista partidária',
        paragraphs: [
          'Para deputado, suplentes são definidos pelo desempenho da lista partidária ou federação. Quando um titular sai temporária ou definitivamente, assume o próximo nome elegível do mesmo grupo, conforme regras aplicáveis.',
          'Isso reforça a importância de observar o partido inteiro. Seu voto pode ajudar a eleger um titular e, em caso de mudança, abrir espaço para outro nome da mesma legenda ou federação.',
        ],
      },
      {
        title: 'Licenças podem mudar a representação real',
        paragraphs: [
          'Parlamentares podem se licenciar por saúde, missão, interesse particular ou para ocupar cargos no Executivo. Em alguns casos, o suplente assume e participa de votações, comissões e decisões políticas.',
          'A representação que o eleitor escolheu pode mudar ao longo do mandato. Isso não é necessariamente problema, mas precisa ser transparente e acompanhado.',
        ],
      },
      {
        title: 'Como avaliar suplentes antes da eleição',
        paragraphs: [
          'Para senador, veja nome, histórico, vínculos e experiência dos suplentes. Para deputado, olhe a lista de candidatos do partido e seus principais nomes. Em ambos os casos, entenda que voto nunca é só individual.',
          'Suplente não deve ser tratado como detalhe. Ele pode virar titular, votar leis e influenciar decisões nacionais.',
        ],
      },
    ],
  },
  {
    slug: 'voto-proporcional-legenda',
    title: 'Voto de legenda: quando faz sentido votar só no partido?',
    description:
      'Entenda voto de legenda, diferenças entre votar em candidato e votar no partido, e os riscos de não conhecer a lista.',
    updatedAt: '2026-04-28',
    readingTime: '8 min',
    intro:
      'Em eleições proporcionais, o eleitor pode votar diretamente em um candidato ou votar na legenda do partido. O voto de legenda fortalece a lista partidária sem escolher um nome específico. Pode ser uma decisão coerente, mas exige confiança no conjunto do partido.',
    sections: [
      {
        title: 'Voto de legenda fortalece o partido',
        paragraphs: [
          'Quando você vota na legenda, seu voto entra para o total do partido ou federação. Esse total ajuda a calcular cadeiras, mas a ocupação das vagas depende dos candidatos mais votados dentro da lista e das regras de desempenho.',
          'Esse voto pode fazer sentido quando o eleitor confia mais no programa partidário do que em um nome específico. Mas ele também pode ajudar candidatos da lista que o eleitor talvez não conheça.',
        ],
      },
      {
        title: 'Não use voto de legenda como voto sem consequência',
        paragraphs: [
          'Algumas pessoas votam na legenda para evitar escolher candidato, como se fosse uma opção neutra. Não é neutra. Ela influencia a bancada e pode ajudar a eleger nomes específicos da lista partidária.',
          'Antes de votar na legenda, veja quem são os candidatos competitivos daquele partido no seu estado. Pergunte se você ficaria confortável com qualquer um deles ocupando a cadeira.',
        ],
      },
      {
        title: 'Quando pode ser uma escolha coerente',
        paragraphs: [
          'O voto de legenda pode ser coerente quando o partido tem programa claro, lista consistente, histórico compatível com seus valores e candidaturas que você considera aceitáveis. Nesse caso, você está escolhendo um projeto coletivo.',
          'Também pode ser usado por quem quer fortalecer uma bancada temática ou ideológica, desde que conheça os riscos da lista.',
        ],
      },
      {
        title: 'Como decidir entre candidato e legenda',
        paragraphs: [
          'Se você encontrou um candidato confiável dentro de um partido aceitável, votar no candidato dá sinal individual e fortalece a legenda. Se não encontrou nome específico, mas confia no partido inteiro, voto de legenda pode fazer sentido.',
          'Se você gosta de um candidato, mas rejeita a lista, o voto proporcional cria dilema real. Nesse caso, talvez seja melhor buscar outro nome em grupo político mais compatível.',
        ],
      },
    ],
  },
  {
    slug: 'como-checar-pesquisas-eleitorais',
    title: 'Como ler pesquisas eleitorais sem cair em manchete fácil',
    description:
      'Aprenda a observar margem de erro, amostra, método, registro, data de campo, contratante e diferença entre tendência e certeza.',
    updatedAt: '2026-04-28',
    readingTime: '10 min',
    intro:
      'Pesquisa eleitoral é fotografia de um momento, não profecia. Ela pode indicar tendências, medir cenários e mostrar mudanças de humor do eleitorado, mas precisa ser lida com método. Manchetes costumam simplificar demais números que dependem de amostra, data, pergunta e margem de erro.',
    sections: [
      {
        title: 'Margem de erro muda a leitura do empate',
        paragraphs: [
          'Se dois candidatos aparecem separados por poucos pontos, eles podem estar tecnicamente empatados dentro da margem de erro. Isso não significa que estão exatamente iguais, mas que a pesquisa não permite afirmar com segurança quem está na frente.',
          'Manchetes que tratam diferença pequena como virada definitiva podem enganar. Sempre veja margem de erro e nível de confiança antes de concluir mudança real.',
        ],
      },
      {
        title: 'Data de campo importa muito',
        paragraphs: [
          'Pesquisa feita antes de debate, escândalo, aliança ou fato relevante pode não refletir o cenário depois do evento. A data de divulgação nem sempre é a data de coleta.',
          'Ao comparar pesquisas, veja quando as entrevistas foram realizadas. Duas pesquisas divulgadas no mesmo dia podem medir momentos diferentes.',
        ],
      },
      {
        title: 'Amostra e método afetam resultado',
        paragraphs: [
          'Pesquisas podem usar entrevistas presenciais, telefônicas ou outros métodos. Cada abordagem tem limitações, custos e riscos de viés. O desenho da amostra busca representar o eleitorado, mas nunca é perfeito.',
          'Também observe abrangência: pesquisa nacional, estadual, municipal ou por segmento. Não use dado de um recorte como se representasse todo o eleitorado.',
        ],
      },
      {
        title: 'Pesquisa não deve substituir avaliação de candidato',
        paragraphs: [
          'Votar apenas em quem está na frente transforma pesquisa em profecia autorrealizável. Pesquisa informa viabilidade e cenário, mas não responde se o candidato é bom, coerente ou confiável.',
          'Use pesquisas como um dado do ambiente eleitoral. Para decidir voto, combine com propostas, histórico, partido, fontes oficiais e seus critérios pessoais.',
        ],
      },
    ],
  },
  {
    slug: 'como-avaliar-politico-redes-sociais',
    title: 'Como avaliar político pelas redes sociais sem cair em performance',
    description:
      'Aprenda a separar comunicação eficiente, prestação de contas, propaganda, indignação encenada e desinformação nas redes.',
    updatedAt: '2026-04-28',
    readingTime: '9 min',
    intro:
      'Redes sociais são vitrine obrigatória da política moderna. Elas podem aproximar eleitor e mandato, mas também premiam exagero, recorte, briga e simplificação. Avaliar político pelas redes exige separar comunicação de atuação concreta.',
    sections: [
      {
        title: 'Engajamento não é entrega pública',
        paragraphs: [
          'Curtidas, compartilhamentos e visualizações mostram capacidade de mobilização, não necessariamente qualidade legislativa. Um vídeo viral pode tratar de tema real, mas também pode esconder ausência de trabalho em comissões, votações ou fiscalização.',
          'Use redes como porta de entrada. Quando o político afirma que fez algo, procure o documento, projeto, votação, emenda ou fonte oficial correspondente.',
        ],
      },
      {
        title: 'Prestação de contas deve ter link e detalhe',
        paragraphs: [
          'Boa comunicação pública mostra fonte, data, valor, projeto, cidade, órgão responsável e etapa de execução. Propaganda fraca usa apenas foto, frase de impacto e “conquista” sem rastreabilidade.',
          'Se a postagem anuncia obra, recurso ou votação, pergunte onde conferir. Político que facilita verificação tende a respeitar mais o eleitor.',
        ],
      },
      {
        title: 'Indignação permanente pode esconder baixa produção',
        paragraphs: [
          'Alguns perfis vivem de conflito. Denunciam, atacam, ironizam e mobilizam base, mas oferecem pouca solução verificável. Fiscalizar é parte do mandato, mas fiscalização séria gera documentos, requerimentos, audiências, representações ou votos.',
          'Não confunda agressividade com coragem. A pergunta é: a indignação virou ação institucional ou apenas conteúdo?',
        ],
      },
      {
        title: 'Observe consistência entre rede e voto',
        paragraphs: [
          'Um parlamentar pode se apresentar como defensor de uma pauta nas redes e votar de forma diferente no Congresso. Também pode omitir votações impopulares e destacar apenas cortes favoráveis.',
          'Compare discurso público com registro oficial. A coerência entre fala e voto é um dos melhores testes de autenticidade política.',
        ],
      },
    ],
  },
  {
    slug: 'como-avaliar-politicas-publicas',
    title: 'Como avaliar políticas públicas prometidas por políticos',
    description:
      'Um guia para analisar propostas de saúde, educação, segurança, economia e assistência sem cair em slogans impossíveis.',
    updatedAt: '2026-04-28',
    readingTime: '11 min',
    intro:
      'Propostas políticas costumam ser vendidas como solução simples para problemas complexos. Avaliar política pública exige perguntar qual problema será resolvido, com qual instrumento, quanto custará, quem executará, quem será afetado e como o resultado será medido.',
    sections: [
      {
        title: 'Toda política precisa definir problema',
        paragraphs: [
          'Promessas vagas como “melhorar a educação” ou “combater a violência” não bastam. Qual indicador está ruim? Em qual território? Para qual público? Em que prazo? Sem diagnóstico, a proposta vira slogan.',
          'Uma política boa começa descrevendo o problema de forma verificável. Se o candidato não sabe explicar o problema, provavelmente também não sabe resolver.',
        ],
      },
      {
        title: 'Instrumento e competência precisam combinar',
        paragraphs: [
          'Algumas soluções dependem de lei federal, outras de orçamento estadual, gestão municipal, convênio ou decisão administrativa. Proposta séria identifica quem tem competência para agir.',
          'Quando candidato promete algo fora do alcance do cargo, pode estar usando tema popular sem plano real. Isso não impede articulação política, mas exige transparência sobre limites.',
        ],
      },
      {
        title: 'Custo e financiamento são parte da proposta',
        paragraphs: [
          'Toda política pública custa dinheiro, tempo, equipe ou prioridade. Mesmo medidas regulatórias têm custo de implementação e fiscalização. Promessa sem financiamento é incompleta.',
          'Pergunte de onde virá o recurso, qual programa será reduzido, se há estimativa de impacto e como será evitado desperdício. Responsabilidade fiscal não é assunto separado da política social; é condição para ela durar.',
        ],
      },
      {
        title: 'Resultado precisa ser mensurável',
        paragraphs: [
          'Uma proposta deve permitir avaliação: reduzir fila, aumentar matrícula, diminuir evasão, melhorar vacinação, reduzir homicídios, ampliar renda, melhorar saneamento. Sem indicador, qualquer resultado pode ser vendido como sucesso.',
          'Eleitor consciente acompanha promessa por evidência, não por propaganda. Se a política foi implementada, pergunte se mudou o indicador que pretendia mudar.',
        ],
      },
    ],
  },
  {
    slug: 'como-avaliar-reeleicao',
    title: 'Como avaliar candidato à reeleição usando o mandato que ele já teve',
    description:
      'Veja como cobrar quem já ocupou cargo: promessas cumpridas, votos, entregas, ausências, alianças e prestação de contas.',
    updatedAt: '2026-04-28',
    readingTime: '9 min',
    intro:
      'Candidato à reeleição não deve ser avaliado como promessa em branco. Ele já teve mandato, poder, recursos, equipe e oportunidades de agir. Isso torna a avaliação mais objetiva: o eleitor pode comparar discurso anterior, atuação real e nova campanha.',
    sections: [
      {
        title: 'Comece pelas promessas anteriores',
        paragraphs: [
          'Recupere propostas da campanha passada, plano de governo, entrevistas e materiais públicos. Depois veja o que virou ação, o que ficou parado e o que foi abandonado sem explicação.',
          'Nem toda promessa não cumprida é má-fé; pode haver derrota legislativa ou falta de competência do cargo. Mas candidato sério explica limites e mostra tentativa documentada.',
        ],
      },
      {
        title: 'Compare presença, votos e prioridades',
        paragraphs: [
          'Quem já teve mandato deixou registros: votações, presença, projetos, emendas, relatorias, despesas e discursos oficiais. Esses dados são mais fortes do que nova propaganda.',
          'Veja se as prioridades da campanha atual combinam com o que ele fez. Mudanças podem ser legítimas, mas devem vir acompanhadas de justificativa clara.',
        ],
      },
      {
        title: 'Analise alianças formadas no exercício do poder',
        paragraphs: [
          'Aliança de campanha é uma coisa; aliança de governo ou de bancada é outra. Quem já ocupou cargo mostrou com quem votou, quem apoiou, quais acordos aceitou e quais temas priorizou quando havia custo político.',
          'Essa trajetória revela mais do que slogans. O eleitor deve observar se alianças foram coerentes com o mandato prometido.',
        ],
      },
      {
        title: 'Reeleição precisa de prestação de contas, não só promessa nova',
        paragraphs: [
          'Candidato à reeleição deve explicar o mandato anterior: o que entregou, onde falhou, quais dados comprovam e o que pretende corrigir. Campanha que ignora o próprio mandato merece desconfiança.',
          'A pergunta central é simples: depois de ver o que fez com poder real, você daria mais tempo e mais influência a essa pessoa?',
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-seguranca-publica',
    title: 'Guia para avaliar propostas de segurança pública',
    description:
      'Critérios para analisar discurso sobre polícia, armas, prevenção, sistema prisional, investigação e redução de violência.',
    updatedAt: '2026-04-28',
    readingTime: '10 min',
    intro:
      'Segurança pública é um dos temas mais emocionais da política. Medo, indignação e experiências pessoais pesam muito. Justamente por isso, propostas de segurança precisam ser avaliadas com cuidado: promessa dura não é automaticamente eficiente, e discurso técnico também precisa mostrar resultado.',
    sections: [
      {
        title: 'Separe prevenção, repressão e investigação',
        paragraphs: [
          'Segurança envolve prevenção social, policiamento ostensivo, inteligência, investigação, perícia, sistema prisional, justiça criminal e políticas urbanas. Proposta séria diz qual parte do problema pretende atacar.',
          'Aumentar pena, por exemplo, não melhora investigação automaticamente. Comprar viaturas não resolve perícia. Construir presídio não substitui prevenção. Cada instrumento atua em ponto diferente da cadeia.',
        ],
      },
      {
        title: 'Pergunte qual indicador será melhorado',
        paragraphs: [
          'Homicídios, roubos, violência doméstica, letalidade policial, elucidação de crimes, reincidência e sensação de segurança são indicadores diferentes. Uma política pode melhorar um e piorar outro.',
          'Quando candidato promete “mais segurança”, pergunte: segurança para quem, contra qual crime, em qual território e medida por qual dado?',
        ],
      },
      {
        title: 'Armas e polícia exigem debate com evidência',
        paragraphs: [
          'Temas como armas, abordagem policial e uso da força mobilizam valores fortes. O eleitor pode ter posição ideológica, mas deve exigir evidência de impacto, controle, treinamento e responsabilidade.',
          'Política de segurança sem transparência pode produzir abuso. Política sem capacidade operacional pode virar promessa vazia. O equilíbrio está em cobrar resultado e controle público.',
        ],
      },
      {
        title: 'Quem executa nem sempre é quem promete',
        paragraphs: [
          'Muitas competências de segurança são estaduais, mas deputados e senadores influenciam leis penais, orçamento, fiscalização, fundos e regras nacionais. Prefeitos influenciam iluminação, urbanismo, guarda municipal e prevenção local.',
          'Avalie se o candidato promete algo compatível com o cargo. Segurança é tema legítimo em várias esferas, mas cada esfera tem ferramentas diferentes.',
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-educacao',
    title: 'Guia para avaliar propostas de educação',
    description:
      'Como analisar promessas sobre escola, professores, alfabetização, ensino técnico, universidades, financiamento e resultados.',
    updatedAt: '2026-04-28',
    readingTime: '10 min',
    intro:
      'Educação aparece em quase toda campanha, mas propostas variam muito em qualidade. Algumas focam infraestrutura, outras currículo, professores, alfabetização, tecnologia, ensino técnico ou universidade. O eleitor precisa entender qual problema educacional está sendo enfrentado e como medir avanço.',
    sections: [
      {
        title: 'Identifique a etapa da educação',
        paragraphs: [
          'Creche, alfabetização, ensino fundamental, ensino médio, ensino técnico e ensino superior têm problemas diferentes. Uma proposta boa para universidade pode não resolver alfabetização; uma política de creche exige gestão diferente de uma política de pesquisa científica.',
          'Antes de avaliar, pergunte qual etapa será priorizada e por quê. A resposta deve vir com diagnóstico, dados e público-alvo.',
        ],
      },
      {
        title: 'Professor é central, mas não é o único fator',
        paragraphs: [
          'Valorização docente importa: formação, carreira, salário, condições de trabalho e apoio pedagógico afetam resultado. Mas educação também depende de gestão, currículo, material, infraestrutura, alimentação, transporte e acompanhamento familiar.',
          'Desconfie de proposta que promete revolução educacional atacando apenas um fator. Sistemas educacionais melhoram com combinação de políticas consistentes ao longo do tempo.',
        ],
      },
      {
        title: 'Resultado precisa ir além de inauguração',
        paragraphs: [
          'Construir escola ou comprar equipamento pode ser importante, mas resultado educacional aparece em aprendizagem, permanência, redução de evasão, alfabetização e qualidade do ensino.',
          'Uma campanha pode mostrar obra bonita sem provar melhora pedagógica. O eleitor deve procurar indicadores, avaliações e continuidade da política.',
        ],
      },
      {
        title: 'Competência federativa muda a cobrança',
        paragraphs: [
          'Municípios têm papel forte em creche e ensino fundamental; estados em ensino médio; União em financiamento, universidades federais, regras nacionais e programas de apoio. Parlamentares influenciam leis, orçamento e fiscalização.',
          'Cobrar corretamente exige saber quem executa. Promessa educacional boa explica como o cargo pretendido pode agir dentro dessa divisão.',
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-saude',
    title: 'Guia para avaliar propostas de saúde pública',
    description:
      'Como analisar promessas sobre SUS, filas, atenção básica, hospitais, medicamentos, vacinação, financiamento e gestão.',
    updatedAt: '2026-04-28',
    readingTime: '10 min',
    intro:
      'Saúde pública envolve urgência emocional e complexidade administrativa. Filas, hospitais, medicamentos e vacinação afetam a vida diretamente. Para avaliar propostas, é preciso diferenciar financiamento, gestão, atenção básica, média complexidade, alta complexidade e responsabilidade de cada esfera de governo.',
    sections: [
      {
        title: 'Atenção básica costuma ser a porta de entrada',
        paragraphs: [
          'Postos, equipes de saúde da família, prevenção, acompanhamento de doenças crônicas e vacinação reduzem pressão sobre hospitais. Promessas focadas apenas em grandes obras podem ignorar a base do sistema.',
          'Ao avaliar proposta, veja se ela fortalece atendimento próximo da população ou apenas promete inaugurações visíveis. Saúde eficiente combina prevenção e tratamento.',
        ],
      },
      {
        title: 'Fila precisa de diagnóstico',
        paragraphs: [
          'Fila pode ocorrer por falta de especialista, equipamento, regulação, leito, transporte, gestão de agenda ou financiamento. Proposta séria identifica gargalo específico.',
          'Prometer “zerar fila” sem dizer qual fila, em quanto tempo, com qual equipe e orçamento é frágil. O eleitor deve pedir indicador: consultas, exames, cirurgias, medicamentos ou regulação?',
        ],
      },
      {
        title: 'Hospital não resolve tudo sozinho',
        paragraphs: [
          'Hospitais são essenciais, mas custosos. Sem atenção básica, regulação e rede regional, hospital vira solução sobrecarregada. Construir unidade sem equipe e custeio pode criar prédio sem atendimento adequado.',
          'Boa proposta de saúde explica funcionamento da rede: prevenção, encaminhamento, exames, especialistas, urgência e continuidade do cuidado.',
        ],
      },
      {
        title: 'Parlamentar influencia orçamento e fiscalização',
        paragraphs: [
          'Deputados e senadores não administram diretamente postos ou hospitais locais, mas votam leis, orçamento, pisos, programas nacionais e podem fiscalizar políticas públicas. Também podem destinar emendas, que precisam ser acompanhadas até a entrega.',
          'Ao avaliar parlamentar, veja se recursos anunciados chegaram, se foram executados e se houve melhora concreta para usuários do sistema.',
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-meio-ambiente',
    title: 'Guia para avaliar propostas de meio ambiente e clima',
    description:
      'Critérios para analisar discurso ambiental, agropecuária, fiscalização, energia, saneamento, clima e desenvolvimento sustentável.',
    updatedAt: '2026-04-28',
    readingTime: '10 min',
    intro:
      'Meio ambiente não é tema isolado: envolve saúde, agricultura, energia, cidades, saneamento, economia, povos tradicionais, clima e comércio internacional. Avaliar propostas ambientais exige sair da oposição simplista entre preservar e desenvolver.',
    sections: [
      {
        title: 'Veja se há metas verificáveis',
        paragraphs: [
          'Prometer proteger o meio ambiente é fácil. Proposta séria fala em redução de desmatamento, recuperação de áreas, fiscalização, saneamento, adaptação climática, energia limpa ou gestão de resíduos com indicadores.',
          'Sem meta, prazo e órgão responsável, o discurso ambiental vira sinalização para agradar públicos diferentes sem compromisso real.',
        ],
      },
      {
        title: 'Fiscalização e desenvolvimento precisam aparecer juntos',
        paragraphs: [
          'Atividade econômica depende de segurança jurídica e regras claras. Fiscalização fraca favorece ilegalidade e prejudica produtores que cumprem a lei. Ao mesmo tempo, política ambiental precisa considerar emprego, renda e transição produtiva.',
          'Avalie se o candidato apresenta instrumentos concretos: monitoramento, crédito, assistência técnica, regularização, punição a ilegalidades e incentivo a práticas sustentáveis.',
        ],
      },
      {
        title: 'Clima afeta cidade, campo e orçamento',
        paragraphs: [
          'Eventos extremos, enchentes, secas e ondas de calor já impactam infraestrutura, saúde, agricultura e gasto público. Política climática não é apenas pauta internacional; é planejamento de risco.',
          'Bons mandatos conectam clima a defesa civil, saneamento, habitação, drenagem, seguro rural, energia e proteção de populações vulneráveis.',
        ],
      },
      {
        title: 'Compare discurso com votos e alianças',
        paragraphs: [
          'Um parlamentar pode falar em sustentabilidade e votar contra fiscalização ambiental; outro pode defender agro e apoiar regularização responsável. O detalhe está nos projetos, emendas e votações concretas.',
          'Use fontes oficiais para verificar se o discurso ambiental ou produtivo aparece em decisões reais, não apenas em campanha.',
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-economia-impostos',
    title: 'Guia para avaliar propostas de economia, impostos e emprego',
    description:
      'Como analisar promessas sobre crescimento, carga tributária, responsabilidade fiscal, emprego, renda e serviços públicos.',
    updatedAt: '2026-04-28',
    readingTime: '11 min',
    intro:
      'Economia é um dos campos mais usados em campanha, mas também um dos mais cheios de frases vagas. “Gerar emprego”, “baixar impostos” e “controlar gastos” são objetivos populares. O ponto é entender como o candidato pretende chegar lá e quem ganha ou perde com cada escolha.',
    sections: [
      {
        title: 'Crescimento precisa de mecanismo',
        paragraphs: [
          'Prometer crescimento não explica política econômica. O candidato fala em investimento público, crédito, reforma tributária, qualificação, inovação, infraestrutura, segurança jurídica, comércio exterior ou redução de burocracia?',
          'Cada mecanismo tem custo, prazo e grupo afetado. Proposta econômica séria mostra caminho, não apenas desejo.',
        ],
      },
      {
        title: 'Baixar imposto exige dizer qual imposto e qual compensação',
        paragraphs: [
          'Impostos financiam serviços públicos. Reduzir carga pode ser desejável em muitos casos, mas é preciso dizer qual tributo, para quem, com qual impacto e como compensar perda de receita ou cortar gasto.',
          'Promessa genérica de cortar imposto sem plano pode virar déficit, redução de serviço ou benefício concentrado. Avalie distribuição: quem paga menos e quem deixa de receber política pública?',
        ],
      },
      {
        title: 'Responsabilidade fiscal não é só corte',
        paragraphs: [
          'Cuidar das contas públicas envolve receita, despesa, qualidade do gasto, dívida, investimento e prioridade. Cortar gasto ruim é diferente de desmontar serviço essencial; aumentar arrecadação eficiente é diferente de elevar carga de forma injusta.',
          'Boa proposta fiscal explica escolhas. Política séria reconhece que orçamento é disputa de prioridades, não mágica.',
        ],
      },
      {
        title: 'Emprego depende de ambiente e qualificação',
        paragraphs: [
          'Emprego não nasce apenas por decreto. Depende de crescimento, investimento, educação, infraestrutura, tecnologia, crédito, segurança jurídica e demanda. Políticas públicas podem ajudar, mas precisam combinar instrumentos.',
          'Ao avaliar promessa de emprego, procure setor, público-alvo, fonte de financiamento, prazo e indicador. A diferença entre slogan e plano está nesses detalhes.',
        ],
      },
    ],
  },
  {
    slug: 'em-quem-votar',
    title: 'Em quem votar? Um m\u00e9todo simples para decidir seu voto',
    description:
      'Um passo a passo para sair da d\u00favida, comparar candidatos com calma e decidir em quem votar sem depender de propaganda ou torcida.',
    updatedAt: '2026-07-30',
    readingTime: '10 min',
    intro:
      'A pergunta em quem votar parece pedir um nome r\u00e1pido. Mas a resposta boa n\u00e3o come\u00e7a por um candidato: come\u00e7a pelo que voc\u00ea espera da pol\u00edtica e pelo cargo que estar\u00e1 em disputa. Este guia organiza uma decis\u00e3o que cabe na vida real, mesmo para quem tem pouco tempo, n\u00e3o acompanha not\u00edcias todos os dias e est\u00e1 cansado de promessa vazia.',
    sections: [
      {
        title: 'Comece pelo cargo, n\u00e3o pelo rosto',
        paragraphs: [
          'Antes de pesquisar um nome, descubra qual cargo aquela pessoa quer ocupar e o que esse cargo realmente pode fazer. Um deputado federal vota leis nacionais, participa de comiss\u00f5es e fiscaliza o governo federal. Um senador tamb\u00e9m vota leis e tem atribui\u00e7\u00f5es pr\u00f3prias, como analisar indica\u00e7\u00f5es importantes. Prefeito, vereador, governador e presidente t\u00eam responsabilidades diferentes. Cobrar da pessoa errada \u00e9 o primeiro caminho para cair em promessa imposs\u00edvel.',
          'Quando uma proposta parecer muito boa, fa\u00e7a uma pergunta simples: essa pessoa tem poder para realizar isso ou depende de outra esfera de governo? A resposta n\u00e3o precisa matar sua esperan\u00e7a; ela ajuda a separar compromisso poss\u00edvel de frase feita para campanha.',
        ],
      },
      {
        title: 'Escolha tr\u00eas prioridades que s\u00e3o suas',
        paragraphs: [
          'N\u00e3o existe candidato perfeito. Por isso, uma lista enorme de exig\u00eancias costuma terminar em paralisia. Escolha tr\u00eas assuntos que mexem de verdade com a sua vida, sua fam\u00edlia ou seu bairro: emprego, sa\u00fade, seguran\u00e7a, escola, moradia, custo de vida, meio ambiente, direitos ou transporte. A lista precisa ser sua, n\u00e3o a pauta mais barulhenta da semana.',
          'Depois, anote o que voc\u00ea gostaria de ver em cada assunto. Em vez de escrever apenas sa\u00fade, escreva algo como reduzir a demora para consulta, fortalecer atendimento perto de casa ou melhorar acesso a rem\u00e9dios. Quanto mais clara for a sua pergunta, mais f\u00e1cil fica perceber quando uma resposta \u00e9 concreta.',
        ],
      },
      {
        title: 'Troque promessas por perguntas verific\u00e1veis',
        paragraphs: [
          'Promessa gen\u00e9rica \u00e9 f\u00e1cil de aplaudir e dif\u00edcil de cobrar. Uma proposta fica mais s\u00e9ria quando responde como ser\u00e1 feita, de onde vir\u00e1 o dinheiro, quem executa, em quanto tempo e qual resultado pode ser medido. Se essas respostas n\u00e3o aparecem, n\u00e3o significa automaticamente m\u00e1 inten\u00e7\u00e3o; significa que ainda falta informa\u00e7\u00e3o para decidir.',
          'Use a mesma r\u00e9gua para todos. Pergunte qual problema a proposta resolve, quem ser\u00e1 beneficiado, o que pode dar errado e como a pessoa vai prestar contas. Esse cuidado protege voc\u00ea tanto de quem promete demais quanto de quem usa apenas medo e indigna\u00e7\u00e3o para convencer.',
        ],
      },
      {
        title: 'Use o Match como come\u00e7o, n\u00e3o como veredito',
        paragraphs: [
          'O Match Eleitoral do QuemVotar \u00e9 \u00fatil para transformar suas prioridades em uma primeira lista de nomes. Voc\u00ea responde a temas pol\u00edticos e recebe uma medida de afinidade. Isso pode revelar candidatos que voc\u00ea n\u00e3o conhecia e organizar uma pesquisa que antes parecia grande demais.',
          'Mas afinidade n\u00e3o \u00e9 ordem de voto. O resultado n\u00e3o conhece sua hist\u00f3ria, sua cidade, seus limites pessoais nem todos os fatos da vida p\u00fablica de uma pessoa. Escolha alguns nomes que apareceram e abra os perfis. A pergunta seguinte \u00e9: o que a atua\u00e7\u00e3o, os votos, o partido e as fontes mostram sobre eles?',
        ],
      },
      {
        title: 'Pesquise candidato e partido juntos',
        paragraphs: [
          'No Congresso, pol\u00edtica n\u00e3o \u00e9 trabalho solit\u00e1rio. Partidos organizam bancadas, indicam lideran\u00e7as, negociam prioridades e orientam votos. Por isso, conhecer apenas a pessoa deixa uma parte importante de fora. Veja o partido, as alian\u00e7as, a forma como a bancada atua e se existe coer\u00eancia entre o discurso individual e as escolhas coletivas.',
          'Isso n\u00e3o quer dizer que todo parlamentar vota igual ao partido ou que a sigla define tudo. Quer dizer apenas que partido \u00e9 dado relevante. Se um candidato se apresenta como independente, vale investigar em quais temas ele acompanha ou diverge da pr\u00f3pria bancada.',
        ],
      },
      {
        title: 'Compare provas, n\u00e3o torcida',
        paragraphs: [
          'Depois de reduzir a lista a dois ou tr\u00eas nomes, compare o que \u00e9 verific\u00e1vel: posi\u00e7\u00f5es em temas importantes, vota\u00e7\u00f5es registradas, presen\u00e7a, projetos, gastos quando houver dados e fontes oficiais. Uma fala de rede social pode mostrar comunica\u00e7\u00e3o; um registro p\u00fablico ajuda a mostrar atua\u00e7\u00e3o.',
          'Evite procurar apenas material que confirma sua prefer\u00eancia inicial. Leia tamb\u00e9m uma cr\u00edtica bem fundamentada e procure a fonte original. Se um dado vier em print, v\u00eddeo curto ou lista sem link, trate como ponto de partida para checagem, n\u00e3o como prova final.',
        ],
      },
      {
        title: 'Decida e guarde o motivo da sua escolha',
        paragraphs: [
          'Quando chegar a uma decis\u00e3o, escreva em poucas linhas por que escolheu aquele nome ou partido. Pode ser algo simples: concordo com as prioridades, encontrei registros que sustentam a fala e aceito os pontos com que n\u00e3o concordo. Esse registro evita que seu voto vire apenas mem\u00f3ria de uma propaganda forte.',
          'Depois da elei\u00e7\u00e3o, volte a essa anota\u00e7\u00e3o. Votar n\u00e3o termina na urna. Acompanhar um mandato, cobrar explica\u00e7\u00f5es e corrigir a pr\u00f3pria opini\u00e3o quando surgem fatos novos faz parte de uma escolha respons\u00e1vel.',
        ],
      },
    ],
  },
  {
    slug: 'como-usar-match-eleitoral',
    title: 'Match eleitoral: como usar o resultado sem terceirizar seu voto',
    description:
      'Entenda o que a afinidade do Match Eleitoral mede, o que ela n\u00e3o mede e como transformar o resultado em uma pesquisa melhor.',
    updatedAt: '2026-07-30',
    readingTime: '9 min',
    intro:
      'Um Match Eleitoral serve para organizar afinidades, n\u00e3o para escolher por voc\u00ea. Ele pode ser uma porta de entrada poderosa para pesquisa pol\u00edtica: em vez de come\u00e7ar por centenas de nomes, voc\u00ea parte das respostas que deu sobre temas importantes. O valor do resultado aparece quando ele \u00e9 usado com curiosidade, fontes e senso cr\u00edtico.',
    sections: [
      {
        title: 'O que o resultado mede',
        paragraphs: [
          'O Match compara suas respostas sobre temas pol\u00edticos com as refer\u00eancias dispon\u00edveis para parlamentares. No QuemVotar, a afinidade pode usar votos p\u00fablicos quando eles s\u00e3o localizados e refer\u00eancias partid\u00e1rias quando n\u00e3o existe voto individual dispon\u00edvel para aquele tema. Por isso, o resultado mostra aproxima\u00e7\u00e3o entre respostas, e n\u00e3o uma verdade absoluta sobre uma pessoa.',
          'A porcentagem \u00e9 uma medida de semelhan\u00e7a dentro das perguntas respondidas. Ela ajuda a comparar nomes sob a mesma r\u00e9gua. N\u00e3o significa que o parlamentar concorda com voc\u00ea em tudo, nem que o site recomenda votar nele.',
        ],
      },
      {
        title: 'O que o resultado n\u00e3o mede',
        paragraphs: [
          'Nenhum question\u00e1rio consegue resumir car\u00e1ter, capacidade de negociar, qualidade de equipe, rela\u00e7\u00e3o com eleitores, situa\u00e7\u00f5es locais ou todos os fatos de um mandato. Tamb\u00e9m n\u00e3o substitui checagem de processos, gastos, presen\u00e7a e promessas. Uma afinidade alta \u00e9 convite para olhar mais de perto, e n\u00e3o atalho para encerrar a pesquisa.',
          'O Match tamb\u00e9m n\u00e3o transforma partido em destino. Partidos s\u00e3o relevantes para entender vota\u00e7\u00f5es e alian\u00e7as, mas pessoas podem divergir. Abra o perfil, confira os dados que existem e veja em quais temas aquela aproxima\u00e7\u00e3o aparece.',
        ],
      },
      {
        title: 'Responda pensando no que voc\u00ea realmente defende',
        paragraphs: [
          'Evite responder para chegar a um nome que voc\u00ea j\u00e1 gosta. O resultado fica mais \u00fatil quando voc\u00ea responde de acordo com suas convic\u00e7\u00f5es, mesmo que elas misturem posi\u00e7\u00f5es que n\u00e3o cabem em um r\u00f3tulo simples. Essa mistura \u00e9 normal e pode ser exatamente o que torna a ferramenta interessante.',
          'Quando uma pergunta parecer dif\u00edcil, pare e leia com calma. Pense em consequ\u00eancias, n\u00e3o apenas no nome do tema. Se voc\u00ea mudar de ideia depois, refa\u00e7a o quiz. Revisar opini\u00e3o com mais informa\u00e7\u00e3o \u00e9 sinal de cuidado, n\u00e3o de fraqueza.',
        ],
      },
      {
        title: 'Leia a origem de cada afinidade',
        paragraphs: [
          'O resultado informa quantos temas usaram voto p\u00fablico e quantos usaram refer\u00eancia partid\u00e1ria. Essa diferen\u00e7a importa. Voto p\u00fablico aponta para um registro individual localizado; refer\u00eancia partid\u00e1ria ajuda a preencher uma lacuna quando esse registro n\u00e3o est\u00e1 dispon\u00edvel. Os dois tipos de informa\u00e7\u00e3o devem ser lidos com o contexto que merecem.',
          'Um resultado transparente n\u00e3o finge ter certeza onde n\u00e3o tem. Se houver poucas refer\u00eancias para um nome, trate a afinidade como pista inicial. Se houver mais dados p\u00fablicos, use-os para aprofundar a compara\u00e7\u00e3o nos perfis e nas fontes oficiais.',
        ],
      },
      {
        title: 'Use os filtros para aproximar a pesquisa da sua realidade',
        paragraphs: [
          'Depois de ver os resultados, filtre por estado e por Casa legislativa quando isso fizer sentido para sua pesquisa. Procurar representantes do seu estado pode tornar a lista mais pr\u00f3xima do cotidiano, enquanto olhar deputados e senadores juntos ajuda a perceber diferen\u00e7as de cargo.',
          'N\u00e3o use o filtro para eliminar informa\u00e7\u00e3o inc\u00f4moda. Ele serve para organizar. Vale guardar alguns nomes fora do seu estado quando voc\u00ea estiver estudando temas nacionais, partidos ou vota\u00e7\u00f5es que ajudam a entender melhor o cen\u00e1rio.',
        ],
      },
      {
        title: 'Abra os perfis antes de escolher',
        paragraphs: [
          'Selecione alguns dos nomes com maior afinidade e abra seus perfis. Veja o que est\u00e1 dispon\u00edvel sobre mandato, votos, despesas, autoria, comiss\u00f5es e fontes. Depois compare com as tr\u00eas prioridades que voc\u00ea definiu. Uma pessoa pode aparecer bem no quiz e ainda assim n\u00e3o ser a melhor escolha para o que voc\u00ea considera mais urgente.',
          'A compara\u00e7\u00e3o fica melhor quando voc\u00ea usa a mesma pergunta para todos: o que esta pessoa fez, que evid\u00eancia existe, qual partido a cerca e o que ainda n\u00e3o sei? Essa \u00faltima pergunta \u00e9 importante porque evita confundir falta de dado com dado favor\u00e1vel.',
        ],
      },
      {
        title: 'Compartilhe com contexto',
        paragraphs: [
          'O cart\u00e3o de resultado pode ser divertido de compartilhar e abrir conversa com amigos e familiares. Mas ele n\u00e3o deve virar r\u00f3tulo para atacar algu\u00e9m ou prova de que uma pessoa \u00e9 melhor que outra. Compartilhe dizendo que o resultado mostra afinidade nas respostas, n\u00e3o uma recomenda\u00e7\u00e3o definitiva.',
          'Se o compartilhamento levar outra pessoa a pesquisar, checar uma fonte e pensar nas pr\u00f3prias prioridades, ele cumpriu seu melhor papel. Democracia melhora quando mais gente troca slogan por pergunta bem feita.',
        ],
      },
    ],
  },,
  {
    slug: 'como-pesquisar-candidato-pelo-nome',
    title: 'Como pesquisar um candidato pelo nome antes de votar',
    description:
      'Um roteiro simples para sair do nome que aparece na tela e descobrir dados, mandato, partido, propostas, fontes e o que ainda precisa ser conferido.',
    updatedAt: '2026-07-30',
    readingTime: '7 min',
    intro:
      'Pesquisar um candidato pelo nome parece fácil, mas é justamente aí que muita gente para cedo demais. O primeiro resultado, um vídeo viral ou uma postagem de campanha não contam a história toda. Com algumas perguntas simples, você consegue transformar um nome conhecido em uma pesquisa mais justa e útil.',
    sections: [
      {
        title: 'Confirme se você encontrou a pessoa certa',
        paragraphs: [
          'Comece pelo básico: nome completo ou nome de urna, cargo, estado e partido. Há nomes parecidos, apelidos iguais e pessoas que já ocuparam cargos diferentes. Conferir esses quatro pontos evita compartilhar informação de uma pessoa como se fosse de outra.',
          'No QuemVotar, o perfil informa a Casa legislativa, a UF e a sigla partidária. Se a pesquisa for eleitoral, complete a checagem no TSE. Se for sobre um mandato em exercício, use também a página oficial da Câmara ou do Senado.',
        ],
      },
      {
        title: 'Entenda qual cargo a pessoa disputa ou exerce',
        paragraphs: [
          'Não cobre de um vereador o que depende de um senador, nem trate deputado federal e senador como se fizessem o mesmo trabalho. O cargo define quais leis a pessoa pode votar, quais comissões pode integrar e que tipo de problema consegue enfrentar diretamente.',
          'Antes de avaliar promessas, pergunte: isso é responsabilidade desse cargo? A resposta ajuda a separar uma proposta possível de uma frase feita para ganhar atenção. Quando a promessa depende de prefeitura, governo estadual, Congresso e Justiça ao mesmo tempo, vale procurar o papel exato de cada um.',
        ],
      },
      {
        title: 'Olhe o partido junto com a pessoa',
        paragraphs: [
          'Candidato não atua sozinho. Partido influencia candidatura, alianças, liderança, orientação de voto e espaço nas comissões. Isso não quer dizer que toda pessoa vota igual à bancada, mas ignorar a sigla deixa um pedaço importante da história de fora.',
          'Abra a página do partido, veja a bancada atual e procure entender como ele se apresenta. Depois volte ao perfil individual: onde há dados de votos, projetos e comissões, compare se a atuação parece coerente com o que a pessoa diz defender.',
        ],
      },
      {
        title: 'Troque frases vagas por provas',
        paragraphs: [
          'Frases como “luta pelo povo”, “defende a família” ou “combate a corrupção” podem significar coisas muito diferentes. Em vez de discutir só o slogan, peça exemplos: qual projeto, qual voto, qual fiscalização, qual proposta, qual resultado ou qual fonte confirma a afirmação?',
          'Nem toda atuação relevante vira uma lei aprovada. Mesmo assim, uma explicação séria deixa rastro: uma proposição, uma votação, uma audiência, uma relatoria, uma emenda, uma prestação de contas ou uma fonte institucional. Sem esse rastro, trate a fala como promessa, não como fato.',
        ],
      },
      {
        title: 'Veja o que os dados mostram e o que não mostram',
        paragraphs: [
          'Presença, gastos, autoria de propostas e participação em votações ajudam a montar um retrato, mas nenhum número decide sozinho se alguém merece seu voto. Gasto alto não prova irregularidade; gasto baixo não prova bom mandato; muitos projetos não garantem impacto; ausência precisa de contexto.',
          'Use os dados para criar perguntas melhores. Há despesas com finalidade clara? Os temas das propostas importam para você? Há registros de voto para assuntos relevantes? O perfil mostra uma fonte para você conferir? A melhor pesquisa aceita que algumas respostas podem continuar abertas.',
        ],
      },
      {
        title: 'Compare poucos nomes com a mesma régua',
        paragraphs: [
          'Escolha de dois a cinco nomes e anote as mesmas perguntas para todos. Por exemplo: quais são minhas três prioridades, que evidência encontro para cada uma, qual partido cerca essa pessoa e que informação ainda falta? A comparação fica muito mais honesta quando a régua não muda conforme a simpatia.',
          'Se você não sabe por onde começar, faça o Match Eleitoral e use o resultado apenas para abrir uma lista inicial. Depois, pesquise os nomes um por um. Afinidade em respostas é uma pista; a decisão melhora quando você confere o perfil e as fontes públicas.',
        ],
      },
      {
        title: 'Compartilhe a fonte, não só a conclusão',
        paragraphs: [
          'Quando encontrar algo importante, compartilhe o link do dado, não apenas um print com uma frase. Assim quem recebe consegue verificar por conta própria, ver a data e entender o contexto. Isso diminui boatos e torna a conversa política menos baseada em torcida.',
          'Mudar de opinião depois de pesquisar não é incoerência. É exatamente o que acontece quando uma escolha deixa de ser impulso e passa a ter informação por trás. O objetivo não é achar um candidato perfeito: é escolher com mais consciência e menos manipulação.',
        ],
      },
    ],
  },
  {
    slug: 'checklist-antes-de-votar',
    title: 'Checklist antes de votar: 8 perguntas para não decidir no impulso',
    description:
      'Uma lista direta para organizar sua escolha eleitoral em poucos minutos, fugir da propaganda e saber o que conferir antes de decidir.',
    updatedAt: '2026-07-30',
    readingTime: '6 min',
    intro:
      'Não existe escolha política sem valores pessoais, mas existe diferença entre votar por convicção e votar no impulso. Este checklist serve para dar uma pausa antes de decidir. Você não precisa virar especialista: basta responder com sinceridade, comparar alguns nomes e conferir o que for importante para você.',
    sections: [
      {
        title: '1. Quais problemas pesam mais na minha vida?',
        paragraphs: [
          'Escreva três prioridades reais. Pode ser emprego, preço dos alimentos, segurança, escola, saúde, moradia, transporte, meio ambiente, direitos, impostos ou outro tema que afeta sua família. Sem essa etapa, é fácil deixar a campanha escolher por você qual assunto deve importar.',
          'Não precisa procurar um candidato que pense igual em tudo. O ponto é saber em que você não abre mão e onde aceita diferenças. Essa clareza impede que uma fala emocionante apague questões que você considera essenciais.',
        ],
      },
      {
        title: '2. Estou olhando para o cargo certo?',
        paragraphs: [
          'Antes de cobrar uma solução, confirme se ela depende do cargo disputado. Deputados e senadores fazem leis, fiscalizam e participam do orçamento federal. Prefeitos, governadores, vereadores, ministros e tribunais têm responsabilidades diferentes.',
          'Promessa impossível para o cargo não vira boa ideia porque foi bem apresentada. Perguntar “isso está nas mãos dessa pessoa?” é uma das formas mais simples de reconhecer propaganda que parece prática, mas não explica como funcionaria.',
        ],
      },
      {
        title: '3. O que é fala e o que tem prova?',
        paragraphs: [
          'Todo candidato pode dizer que trabalha muito, combate privilégios ou defende uma causa. Procure o que sustenta a frase: projeto, voto, fiscalização, prestação de contas, atuação em comissão, proposta detalhada ou fonte oficial.',
          'Uma imagem, um corte de vídeo e uma lista sem link não bastam para concluir algo sério. Quanto maior a acusação ou promessa, maior deve ser sua vontade de abrir a fonte original.',
        ],
      },
      {
        title: '4. Conheço o partido e as alianças?',
        paragraphs: [
          'A pessoa importa, mas o partido também. A sigla organiza candidatura, bancada, lideranças e muitas votações. Pesquise o partido sem transformar isso em atalho: ele ajuda a entender o contexto, enquanto o histórico individual mostra como aquela pessoa atua.',
          'Se houver federação, coligação ou mudança recente de partido, veja a data e o motivo informado. Política tem negociações e mudanças legítimas, mas o eleitor tem direito de perguntar se existe coerência entre discurso, alianças e decisões.',
        ],
      },
      {
        title: '5. Comparei mais de um nome?',
        paragraphs: [
          'Escolher o primeiro nome conhecido é confortável, mas pode esconder opções melhores para suas prioridades. Compare pelo menos dois nomes usando a mesma lista de perguntas. Assim você percebe diferenças que a campanha costuma deixar de lado.',
          'Evite comparar apenas seguidores, curtidas ou quantidade de vídeos. Popularidade mostra alcance; não mostra sozinha preparo, compromisso, resultado ou coerência. Dados e fontes podem ser menos chamativos, mas ajudam muito mais na hora de decidir.',
        ],
      },
      {
        title: '6. Eu sei o que ainda não sei?',
        paragraphs: [
          'Uma pesquisa responsável não precisa fingir certeza total. Anote o que não conseguiu confirmar: uma despesa, uma proposta, uma posição antiga, uma informação sobre partido ou um vídeo sem contexto. Falta de dado não é prova a favor nem contra.',
          'Quando não houver resposta, procure a fonte primária ou reconheça a dúvida. Essa postura protege você de narrativas que usam silêncio, dado incompleto ou erro de interpretação como se fossem prova definitiva.',
        ],
      },
      {
        title: '7. Fiz uma pausa antes de compartilhar?',
        paragraphs: [
          'Conteúdo político é feito para provocar reação rápida: medo, indignação, orgulho ou raiva. Antes de encaminhar, pare alguns minutos e pergunte de onde veio, quando foi publicado, se a fala está completa e se outra fonte confiável confirma.',
          'Compartilhar algo falso porque “parecia verdade” ainda espalha dano. A pausa não é censura nem fraqueza; é cuidado com quem vai receber a informação e com a qualidade da conversa pública.',
        ],
      },
      {
        title: '8. Minha escolha cabe em uma frase honesta?',
        paragraphs: [
          'Tente completar: “Estou considerando esta pessoa porque ela se aproxima das minhas prioridades em X, Y e Z, e conferi A e B.” Se a frase só fala de ódio ao outro lado ou de fama, talvez falte pesquisa.',
          'Você pode usar o Match Eleitoral, a busca por nome e a comparação do QuemVotar para organizar esse caminho. O resultado mais importante não é receber uma resposta pronta: é conseguir explicar a própria decisão sem depender de boato ou torcida.',
        ],
      },
    ],
  }
];
const CORE_GUIDE_SOURCES: GuideSource[] = [
  {
    label: 'Dados Abertos da C\u00e2mara',
    description: 'Deputados, vota\u00e7\u00f5es, proposi\u00e7\u00f5es, \u00f3rg\u00e3os e despesas parlamentares.',
    href: 'https://dadosabertos.camara.leg.br/',
  },
  {
    label: 'Dados Abertos do Senado',
    description: 'Dados legislativos e administrativos publicados pelo Senado Federal.',
    href: 'https://www12.senado.leg.br/dados-abertos/dados-abertos',
  },
  {
    label: 'Portal de Dados Abertos do TSE',
    description: 'Dados eleitorais, candidaturas, resultados e estat\u00edsticas oficiais.',
    href: 'https://dadosabertos.tse.jus.br/',
  },
];

/**
 * These are starting points for verification, not a claim that every source
 * supplied every sentence in an editorial guide.
 */
export function getGuideSources(article: GuideArticle): GuideSource[] {
  const category = getGuideCategory(article);

  if (category.id === 'congresso') return CORE_GUIDE_SOURCES.slice(0, 2);
  if (category.id === 'checagem') return [CORE_GUIDE_SOURCES[2], ...CORE_GUIDE_SOURCES.slice(0, 2)];
  return CORE_GUIDE_SOURCES;
}


export function getGuideBySlug(slug: string) {
  return GUIDE_ARTICLES.find((article) => article.slug === slug) ?? null;
}

export function getGuideCategory(article: GuideArticle) {
  return GUIDE_CATEGORIES.find((category) => category.slugs.includes(article.slug)) ?? GUIDE_CATEGORIES[0];
}

export function getGuideCardStyle(index: number) {
  return GUIDE_CARD_STYLES[index % GUIDE_CARD_STYLES.length];
}

export function getGuideWordCount(article: GuideArticle) {
  const text = [
    article.title,
    article.description,
    article.intro,
    ...article.sections.flatMap((section) => [section.title, ...section.paragraphs]),
  ].join(' ');

  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getGuideReadingTime(article: GuideArticle) {
  const minutes = Math.max(2, Math.ceil(getGuideWordCount(article) / 260));
  return `${minutes} min`;
}
