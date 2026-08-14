export interface GuiaExtra {
  slug: string;
  novasSections: { titulo: string; paragrafos: string[] }[];
  exemplos: { titulo: string; paragrafos: string[]; fonte?: { label: string; href: string } }[];
  faq: { pergunta: string; resposta: string }[];
  tabelas: { titulo: string; cabecalho: string[]; linhas: string[][] }[];
}

export const GUIAS_EXTRA: GuiaExtra[] = [
  {
    slug: 'em-quem-votar',
    novasSections: [
      {
        titulo: 'Dê à pesquisa um formato que cabe na sua rotina',
        paragrafos: [
          'Decidir o voto não exige virar analista profissional, mas também não combina com decisão tomada na véspera, sob pressão de propaganda e de conversas de última hora. Uma saída prática é dividir a tarefa em etapas curtas: primeiro, identificar os cargos em disputa e as próprias prioridades; depois, escolher dois ou três nomes por cargo para pesquisar com calma; por fim, comparar os finalistas usando as mesmas perguntas para todos. Distribuir o esforço em dias diferentes reduz o cansaço, aproveita melhor o tempo disponível e diminui o risco de decidir pelo candidato mais barulhento.',
          'O tempo dedicado pode variar conforme o cargo e conforme o seu interesse, mas é prudente reservar ao menos uma rodada de pesquisa para cada voto. Vale gastar mais energia nas escolhas que afetam diretamente a sua vida, sem esquecer que os votos para deputado e senador definem o Congresso que aprova leis e fiscaliza o governo. Quem nunca acompanhou política pode começar por fontes oficiais e por conversas com pessoas de confiança; quem já acompanha precisa apenas organizar o que sabe. O importante é que a decisão final tenha um motivo anotado, mesmo que simples.',
          'Limitar a quantidade de informação também faz parte do método. Ler vinte perfis por cargo costuma terminar em paralisia, enquanto aprofundar dois ou três nomes rende muito mais. Se aparecer um dado novo e sério, como uma condenação relevante, uma mudança de partido ou uma denúncia com fonte verificável, vale voltar à pesquisa e atualizar a conclusão. Se o dado for apenas ruído, uma postagem polêmica sem origem, ele não precisa derrubar horas de análise. Organização protege o voto e a sua atenção.',
        ],
      },
      {
        titulo: 'Trate a informação como um material a ser verificado',
        paragrafos: [
          'Toda informação política chega com pelo menos três camadas: o dado verificável, a interpretação de quem conta e o interesse de quem divulga. Uma notícia de veículo com jornalistas identificados, uma postagem de campanha, um meme e uma fofoca de grupo não têm o mesmo peso, e tratá-los como iguais é o caminho mais curto para o erro. Antes de formar opinião, pergunte de onde veio a afirmação e se outra pessoa consegue conferi-la em uma fonte pública, com data e documento.',
          'Anotar a origem ajuda mais do que decorar fatos. Ao encontrar uma afirmação importante, registre mentalmente ou no papel se ela veio de página oficial, de veículo de imprensa, de perfil de apoiador ou de material patrocinado. Isso não significa desconfiar de tudo, apenas classificar o material antes de usá-lo. Conteúdo pago de campanha pode ser verdadeiro, assim como matéria jornalística pode conter erro; a classificação indica apenas onde procurar confirmação e qual nível de cautela aplicar.',
          'Quando duas fontes divergirem, resista à tentação de aceitar a que confirma a sua preferência. Procure o registro primário: a votação nominal, o documento oficial, a fala completa, o processo com número e tribunal. Em temas controversos, a informação mais confiável costuma ser a que qualquer pessoa consegue conferir sozinha. Se a divergência continuar depois da checagem, é honesto reconhecer a incerteza e pesar os dois lados com cuidado, em vez de escolher a versão mais confortável e repassá-la como fato.',
        ],
      },
      {
        titulo: 'Enxergue a eleição como um todo, não como um único voto',
        paragrafos: [
          'Nas eleições gerais de 2026, o eleitor escolherá presidente, governador, senador e deputados no mesmo dia. Cada voto cumpre uma função: os cargos do Executivo definem quem administra e executa políticas, enquanto senador e deputados formam o Congresso que aprova leis, analisa medidas provisórias e fiscaliza o governo federal. Um voto bem pensado não substitui os outros, e ignorar os cargos legislativos entrega a definição do Congresso a quem votou apenas pela propaganda ou pelo nome mais conhecido.',
          'É natural dedicar mais tempo ao cargo que desperta mais interesse, mas vale ao menos uma rodada de pesquisa para cada um deles. Muitos eleitores conhecem bem a disputa para presidente e repetem, nos demais cargos, o primeiro nome que apareceu na tela. O custo dessa pressa aparece depois da eleição: parlamentares eleitos com pouca análise formam um Congresso que nem sempre reflete escolhas conscientes. Uma hora de pesquisa por cargo é um investimento pequeno diante de quatro ou oito anos de mandato.',
          'Pense também nas consequências coletivas do voto proporcional. O voto em um candidato a deputado fortalece o partido ou a federação dele e pode ajudar a eleger outros nomes da mesma lista, inclusive pessoas que você não escolheria. Antes de confirmar, vale perguntar: se esse voto ajudar a formar uma bancada, eu aceito o conjunto que vem junto? A pergunta não tem resposta certa, mas torná-la explícita faz parte de uma decisão consciente, principalmente em eleições proporcionais.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'O registro oficial de candidaturas no TSE',
        paragrafos: [
          'Antes de confiar no que um perfil de rede social diz sobre um candidato, vale consultar o registro oficial de candidaturas mantido pelo Tribunal Superior Eleitoral. Nele é possível conferir o nome de urna, o partido, a situação do registro e os bens declarados no momento da candidatura. A ferramenta pública mais conhecida é o DivulgaCand, que reúne esses dados por eleição e por estado. A consulta não substitui a análise de mandato, mas ajuda a confirmar que a pessoa pesquisada é mesmo a candidata e que as informações básicas batem com o que circula nas conversas.',
        ],
        fonte: { label: 'Tribunal Superior Eleitoral', href: 'https://www.tse.jus.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'Preciso pesquisar todos os candidatos de todos os cargos?',
        resposta: 'Não. Uma pesquisa realista começa pelos cargos em disputa e pelas suas prioridades. Para cada cargo, escolha poucos nomes e aprofunde neles; é melhor conhecer bem dois ou três do que ler superficialmente vinte. O importante é que nenhum voto fique inteiramente no automático: deputados e senadores também merecem ao menos uma rodada de checagem, mesmo que menor do que a dedicada ao cargo que mais interessa a você.',
      },
      {
        pergunta: 'Voto nulo ou em branco pode anular uma eleição?',
        resposta: 'Não. O voto nulo não é computado para o resultado e não anula a eleição; a regra que prevê anulação trata de situações de nulidade da votação por irregularidade, não do voto dado pelo eleitor. Voto em branco também não é contado para nenhum candidato. Quem quer influir no resultado precisa votar em um candidato ou, nos cargos proporcionais, na legenda.',
      },
      {
        pergunta: 'O que é voto útil e faz sentido usá-lo?',
        resposta: 'Voto útil é uma estratégia em que o eleitor escolhe, entre os candidatos com os quais simpatiza, aquele que considera com mais chance de vitória, para evitar que o voto se perca em um nome sem viabilidade. É uma decisão legítima, mas depende de avaliação pessoal de cenário. Nenhuma pesquisa ou palpite garante quem vencerá, e muitos eleitores preferem votar na convicção, mesmo sabendo que o resultado pode ser outro.',
      },
      {
        pergunta: 'Posso levar anotações para a urna?',
        resposta: 'Sim. Levar uma cola com os números dos candidatos escolhidos é permitido e comum. Na hora de votar, digite o número na urna eletrônica, confira o nome, a foto e o partido exibidos na tela e confirme. A conferência da foto evita o erro de digitar um número trocado, que costuma aparecer em eleições com candidatos de nomes parecidos.',
      },
      {
        pergunta: 'Posso mudar de candidato entre o primeiro e o segundo turno?',
        resposta: 'Sim. Quando há segundo turno, o eleitor volta às urnas e vota novamente, podendo escolher candidato diferente do primeiro turno, inclusive um que não apoiou na primeira rodada. Não há obrigação de coerência entre turnos. Vale lembrar que segundo turno só ocorre para cargos do Executivo, como presidente e governador, e nunca para senador ou deputado.',
      },
    ],
    tabelas: [
      {
        titulo: 'Cargos em disputa na eleição geral de 2026',
        cabecalho: ['Cargo', 'Esfera', 'Mandato', 'O que o voto define'],
        linhas: [
          ['Presidente da República', 'Federal', '4 anos', 'Quem comanda o Executivo federal'],
          ['Governador', 'Estadual', '4 anos', 'Quem comanda o Executivo estadual'],
          ['Senador', 'Federal', '8 anos', 'Quem compõe o Senado'],
          ['Deputado federal', 'Federal', '4 anos', 'Quem compõe a Câmara dos Deputados'],
          ['Deputado estadual ou distrital', 'Estadual', '4 anos', 'Quem compõe a Assembleia Legislativa ou a Câmara Distrital'],
        ],
      },
    ],
  },
  {
    slug: 'como-avaliar-deputado-federal',
    novasSections: [
      {
        titulo: 'Leia projetos e proposições com contexto',
        paragrafos: [
          'A autoria de projetos é um dos primeiros dados que aparecem na avaliação, mas precisa de contexto. Apresentar muitas propostas pode indicar trabalho ou apenas produção de material de campanha; apresentar poucas pode esconder atuação em relatorias e negociações. O ponto é verificar o que aconteceu com cada texto: se avançou em comissões, se recebeu parecer, se virou lei ou se permanece parado há anos. A ficha de tramitação de cada proposição conta essa história com datas e etapas.',
          'O tema das proposições também conta. Um deputado pode protocolar dezenas de homenagens e poucas políticas estruturais; outro pode concentrar-se em um assunto relevante para a sua região. Ao comparar, observe se os temas têm relação com as promessas de campanha e com as prioridades declaradas. Coautorias, requerimentos de informação, pedidos de audiência e convocações também são formas de trabalho que aparecem nos registros oficiais e ajudam a dimensionar o mandato além dos discursos.',
          'Lembre-se de que o valor de uma proposição não se mede apenas pela aprovação. Emendas a projetos de outros autores, pareceres, relatorias e acordos podem alterar o resultado final de uma política pública. Um deputado que nunca teve projeto próprio aprovado pode ter influenciado leis importantes nos bastidores. O registro público permite reconstruir esse caminho, mas exige leitura cuidadosa de cada etapa, porque o trabalho legislativo raramente cabe em uma métrica única.',
        ],
      },
      {
        titulo: 'Comissões contam boa parte da história',
        paragrafos: [
          'O trabalho em comissões é um dos melhores retratos da atuação de um deputado. É lá que propostas são analisadas, audiências públicas ocorrem e relatorias são distribuídas. Um parlamentar que participa com regularidade da comissão ligada à sua área de atuação demonstra coerência entre discurso e prática, principalmente se apresenta emendas, requerimentos e votos registrados. O eleitor pode consultar a composição de cada comissão e o histórico de participação no portal da Câmara.',
          'A presença em comissões também ajuda a diferenciar protagonismo de formalidade. Participar da reunião é o mínimo; o que revela influência é relatar matérias estratégicas, ter pareceres acolhidos, conduzir audiências e construir acordo entre bancadas. Esses registros aparecem nas atas e nas páginas de tramitação e podem ser conferidos por qualquer eleitor sem depender de resumo de terceiros. Quando o deputado vira relator de um tema central, sua assinatura no parecer vale mais do que uma hora de discurso.',
          'Quando a pauta da comissão é tema de campanha, a comparação fica mais fácil: veja quem compareceu aos debates, quem apresentou contribuições e quem votou contra o próprio discurso. Nada disso substitui a sua opinião sobre os temas, mas transforma a avaliação de impressão em evidência. O silêncio em comissão também é um dado, principalmente quando o assunto é central para o eleitorado do deputado e ele simplesmente não aparece.',
        ],
      },
      {
        titulo: 'Evite os erros mais comuns de avaliação',
        paragrafos: [
          'O primeiro erro é julgar o mandato por um único fato: um voto, uma fala, uma despesa. Qualquer registro isolado pode enganar. O segundo é comparar deputados de contextos muito diferentes, como um recém-eleito e um líder de bancada, sem considerar tempo de mandato, espaço político e tema de atuação. O terceiro é tratar ranking como veredito: sem metodologia clara, uma nota pode misturar critérios incomparáveis e produzir conclusões que os dados brutos não sustentam.',
          'Também é comum avaliar o parlamentar apenas pelo que ele diz nas redes sociais. Comunicação faz parte do mandato, mas não é o mandato. Um deputado pode ser excelente comunicador e pouco atuante nos registros oficiais, ou o contrário. A leitura equilibrada combina os dois lados: o que ele declara e o que os dados públicos mostram, com data e fonte para cada afirmação. Perfis com muitos seguidores não substituem uma ficha de votação com poucos registros.',
          'Por fim, evite decidir antes de pesquisar. Escolher o nome e depois procurar apenas confirmações é um atalho confortável e enganoso. Leia também críticas fundamentadas e verifique a fonte original. Se a conclusão mudar depois da pesquisa, isso não é fraqueza; é exatamente o sinal de que a avaliação saiu do automático e passou a ser feita com informação. O objetivo não é achar um parlamentar perfeito, e sim escolher com mais consciência.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Dados abertos da Câmara dos Deputados',
        paragrafos: [
          'A Câmara mantém um portal de dados abertos que reúne, em formatos legíveis por máquina, informações sobre proposições, votações, deputados, comissões e despesas. Qualquer pessoa pode baixar as bases ou consultar a documentação da API pública. Para o eleitor, o portal é uma alternativa à navegação página a página: com o nome de um deputado, é possível cruzar temas, presenças e registros de votação. Os dados exigem cuidado com datas e filtros, mas são uma das fontes primárias mais úteis para avaliar mandato sem depender de terceiros.',
        ],
        fonte: { label: 'Dados Abertos da Câmara dos Deputados', href: 'https://dadosabertos.camara.leg.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'O que pesa mais: votos, projetos ou presença?',
        resposta: 'Nenhum critério isolado decide. Votos mostram posições concretas, projetos mostram prioridades e presença mostra compromisso com a rotina, mas cada um tem limitações: voto depende do texto votado, projeto depende de tramitação e ausência pode ter justificativa. A avaliação mais justa combina os três com contexto, e o peso de cada critério depende das suas prioridades eleitorais.',
      },
      {
        pergunta: 'Deputado pode perder o mandato por não cumprir promessa?',
        resposta: 'Não. Promessa de campanha não gera perda de mandato, que só ocorre nas situações previstas em lei, como condenações específicas ou infrações graves ao decoro parlamentar, decididas pela própria Casa ou pela Justiça, conforme o caso. A cobrança por promessas é política e eleitoral: cabe ao eleitor acompanhar, avaliar e decidir na eleição seguinte.',
      },
      {
        pergunta: 'Como saber se o deputado trabalha pelo meu estado?',
        resposta: 'Observe emendas destinadas ao estado, participação em comissões ligadas a temas regionais, requerimentos de informação, audiências realizadas na região e votações que afetam diretamente o estado. Confira também a agenda pública e as notícias institucionais. Nenhum dado sozinho prova dedicação, mas o conjunto ajuda a ver se o parlamentar combina atuação nacional com presença local.',
      },
      {
        pergunta: 'O que é a cota parlamentar?',
        resposta: 'É uma verba pública que custeia despesas relacionadas ao exercício do mandato, como passagens, alimentação, aluguel de escritório, combustível e serviços de comunicação, dentro de limites e regras definidos pela Câmara. Ela não é salário nem emenda parlamentar. Os valores são públicos e podem ser consultados no portal da Câmara, o que permite observar padrões de gasto ao longo do tempo.',
      },
      {
        pergunta: 'Quantos votos um deputado federal precisa para se eleger?',
        resposta: 'Não existe número fixo. O resultado depende do quociente eleitoral do estado, calculado a partir dos votos válidos e do número de vagas em disputa, e da votação do partido ou federação. Em estados diferentes, o mesmo número de votos pode eleger ou não. Por isso, a análise de um deputado não deve começar pela votação recebida, e sim pela atuação no mandato.',
      },
    ],
    tabelas: [
      {
        titulo: 'O que observar em um mandato de deputado federal',
        cabecalho: ['Critério', 'O que procurar', 'Onde conferir'],
        linhas: [
          ['Votações', 'Posição em temas relevantes, com texto e fase da votação', 'Portal da Câmara e dados abertos'],
          ['Proposições', 'Autoria, tema, avanço e resultado de projetos e emendas', 'Ficha de tramitação na Câmara'],
          ['Comissões', 'Participação, relatorias, requerimentos e audiências', 'Atas e pautas das comissões'],
          ['Presença', 'Comparecimento em sessões e justificativas de ausência', 'Portal da Câmara'],
          ['Despesas', 'Uso da cota parlamentar com finalidade e fornecedor', 'Portal da Câmara'],
        ],
      },
    ],
  },
  {
    slug: 'como-avaliar-senador',
    novasSections: [
      {
        titulo: 'Acompanhe sabatinas com atenção',
        paragrafos: [
          'Uma das atribuições mais específicas do Senado é analisar autoridades indicadas para cargos relevantes, como ministros de tribunais superiores, dirigentes de bancos e agências, chefes de missões diplomáticas e outras funções previstas em lei. Nas sabatinas, o senador pode questionar trajetória, qualificação, conflitos de interesse e planos para o cargo. A forma como cada parlamentar conduz essas perguntas revela critérios que vão além do discurso de plenário. Esse papel é exclusivo da Casa e não tem equivalente direto na Câmara dos Deputados, o que amplia a responsabilidade de cada senador nesses processos.',
          'Ao avaliar um senador, vale procurar como ele se comportou nessas análises: se estuda o currículo, se faz perguntas técnicas, se pressiona por transparência ou se aprova indicações sem debate. Não existe padrão único de bom comportamento, mas existe diferença entre participação real e formalidade. O histórico das sabatinas fica registrado nas notas taquigráficas e pode ser consultado no portal do Senado, o que torna essa parte do mandato verificável por qualquer eleitor.',
          'Essas decisões têm efeito de longo prazo: uma autoridade aprovada pode permanecer no cargo por anos e influenciar políticas inteiras. Por isso, o voto em uma sabatina pode importar tanto quanto o voto em um projeto de lei. Um senador que trata indicações com rigor institucional demonstra cuidado com um poder que o eleitor dificilmente enxerga na campanha, mas que afeta diretamente a vida pública e a qualidade das instituições.',
        ],
      },
      {
        titulo: 'O mandato de oito anos exige outro ritmo de cobrança',
        paragrafos: [
          'Enquanto deputados federais têm mandato de quatro anos, senadores ficam oito. Isso muda a comparação entre promessa e resultado: dá mais tempo para projetos de fôlego, mas também exige do eleitor um acompanhamento contínuo. Um senador eleito em 2026, por exemplo, tomará posse em 2027 e só voltará às urnas em 2034, período em que várias legislaturas da Câmara se renovam e em que o contexto político pode mudar diversas vezes.',
          'O ciclo longo também favorece o amadurecimento de temas institucionais, como pacto federativo, reformas estruturais e relações exteriores, que raramente produzem resultados imediatos. Ao avaliar, considere não apenas o que o senador fez no primeiro ano, mas a coerência da trajetória ao longo do tempo: mudanças de posição são aceitáveis quando explicadas e preocupantes quando parecem apenas convenientes para cada momento. O eleitor que acompanha apenas o primeiro ano de mandato corre o risco de julgar cedo demais uma trajetória que ainda terá muitos capítulos.',
          'A renovação do Senado é escalonada: em algumas eleições, renova-se um terço das cadeiras; em outras, dois terços. Na eleição geral de 2026, estão em disputa as cadeiras da renovação de dois terços, com dois senadores sendo eleitos por estado e pelo Distrito Federal. Entender essa regra ajuda a perceber por que o Senado preserva memória institucional enquanto a Câmara se renova por inteiro a cada eleição. A alternância garante que, a cada eleição, uma parcela da Casa permaneça em exercício e mantenha o trabalho legislativo em andamento.',
        ],
      },
      {
        titulo: 'Olhe o estado, mas sem confundir papéis',
        paragrafos: [
          'Cada estado tem três senadores, e a representação estadual é parte central do mandato. Vale observar se o parlamentar acompanha temas regionais, destina emendas com critério, participa de comissões ligadas a questões locais e mantém contato com prefeitos, entidades e movimentos do estado. Mas é preciso cuidado: o senador não administra municípios nem executa obras, e promessas locais precisam ser compatíveis com as atribuições do cargo que ele disputa. O voto para senador, portanto, é sempre uma escolha sobre quem defenderá o estado em Brasília por oito anos.',
          'A atuação federal também protege o estado. Decisões sobre repartição de receitas, dívida de estados e municípios, fundos regionais e regras de infraestrutura passam pelo Senado. Um senador atento pode defender interesses do estado em temas nacionais, e essa defesa nem sempre aparece em anúncios de inauguração. Procure nos registros as votações e relatorias que afetam diretamente a sua região, em vez de confiar apenas no material de divulgação. Vale acompanhar também as emendas de bancada, que são decididas em conjunto e muitas vezes passam despercebidas nas campanhas.',
          'Por fim, conheça os suplentes. Cada candidato a senador registra dois suplentes, que podem assumir o mandato em caso de licença, afastamento ou outra situação prevista em lei. Como o mandato é longo, a chance de uma substituição acontecer não é pequena. Avaliar quem entra na vaga faz parte de avaliar o voto, principalmente quando o suplente é pouco conhecido e pode passar anos no exercício do mandato. Em uma eleição de renovação de dois terços, por exemplo, cada senador eleito leva consigo dois suplentes, o que torna a pesquisa sobre eles parte da escolha.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Portal do Senado Federal',
        paragrafos: [
          'O portal do Senado reúne a atividade legislativa da Casa: proposições, votações, comissões, sabatinas, notas taquigráficas e notícias institucionais. É possível acompanhar a pauta do plenário, consultar a atuação de cada senador e ler os relatórios das comissões. Para quem avalia um mandato, o portal é a fonte primária mais direta: qualquer afirmação sobre um senador pode ser confrontada com os registros oficiais publicados ali, evitando depender de recortes e resumos de terceiros.',
        ],
        fonte: { label: 'Senado Federal', href: 'https://www12.senado.leg.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'Preciso conhecer os suplentes do candidato a senador?',
        resposta: 'Sim, vale a pena. Os dois suplentes registrados na candidatura podem assumir o mandato em situações previstas em lei, como licença, afastamento ou impedimento do titular. Como o mandato dura oito anos, substituições não são raras. Saber o nome, o partido e a trajetória de quem pode entrar na vaga reduz surpresas e completa a avaliação do voto.',
      },
      {
        pergunta: 'O que um senador pode fazer pela minha cidade?',
        resposta: 'Ele não administra o município, mas pode apoiar por meio de emendas ao orçamento federal, fiscalizar a execução de recursos, votar leis que afetam repasses e fundos e defender temas regionais em comissões e relatorias. Antes de cobrar, verifique se a promessa cabe no cargo: obras e serviços locais dependem principalmente de prefeitos, governadores e órgãos executores.',
      },
      {
        pergunta: 'Por que o Senado renova só parte das cadeiras?',
        resposta: 'A Constituição determinou mandato de oito anos e renovação escalonada: um terço das cadeiras em uma eleição e dois terços na seguinte. A ideia é preservar continuidade e memória institucional, evitando que a Casa se renova por inteiro de uma vez. Na eleição geral de 2026, renovam-se dois terços, com duas vagas por estado e pelo Distrito Federal.',
      },
      {
        pergunta: 'O que é sessão conjunta do Congresso Nacional?',
        resposta: 'É a reunião de deputados e senadores em um mesmo colegiado para decisões que envolvem as duas casas, como a análise de vetos presidenciais e a apreciação de outros temas previstos em lei. Nessas sessões, os votos de deputados e senadores são contados em conjunto. Acompanhar as sessões conjuntas ajuda a entender decisões que não aparecem nas pautas individuais de cada casa.',
      },
      {
        pergunta: 'Posso votar em um senador que não seja do meu estado?',
        resposta: 'Não. O voto para senador é estadual: o eleitor vota nos candidatos registrados no seu estado ou no Distrito Federal, e a vaga pertence à representação daquela unidade da federação. O mesmo vale para deputado federal e estadual. A escolha do senador, portanto, é sempre uma escolha sobre quem representará o seu estado no Congresso Nacional.',
      },
    ],
    tabelas: [
      {
        titulo: 'Diferenças de avaliação entre deputado federal e senador',
        cabecalho: ['Critério', 'Deputado federal', 'Senador'],
        linhas: [
          ['Mandato', '4 anos', '8 anos'],
          ['Renovação', 'Toda a Câmara a cada eleição', 'Um terço ou dois terços, alternadamente'],
          ['Representação', 'Proporcional à população do estado', 'Igualitária: três por estado e pelo DF'],
          ['Avaliação típica', 'Votações, projetos, comissões e cota', 'Sabatinas, relatorias, temas federativos e suplentes'],
          ['Foco da cobrança', 'Pauta temática e relação com o partido', 'Coerência ao longo de oito anos e defesa do estado'],
        ],
      },
    ],
  },
  {
    slug: 'diferenca-deputado-senador',
    novasSections: [
      {
        titulo: 'O caminho de uma lei passa pelas duas casas',
        paragrafos: [
          'A maioria das leis ordinárias começa como projeto na Câmara ou no Senado, é analisada em comissões, votada no plenário da casa de origem e depois segue para a outra casa. Se houver alterações, o texto volta para nova análise; se aprovado nas duas, vai à sanção do presidente da República. Esse vai e vem é intencional: cada casa revisa o trabalho da outra antes que a proposta se torne lei, e é por isso que deputados e senadores dividem o protagonismo legislativo.',
          'Há exceções de origem. Medidas provisórias, por exemplo, são editadas pelo presidente com força de lei e precisam ser apreciadas pelo Congresso em prazo determinado, começando pela Câmara, conforme prevê a Constituição. Já projetos sobre alguns temas podem começar pelo Senado. Para o eleitor, a lição prática é simples: uma proposta precisa do aval das duas casas, e a atuação em qualquer uma delas pode mudar o texto final antes da votação.',
          'O veto presidencial também envolve as duas casas. Se o presidente vetar parte ou todo o projeto, o Congresso analisa o veto em sessão conjunta e pode mantê-lo ou derrubá-lo com o voto da maioria absoluta de deputados e senadores. Ou seja: a palavra final sobre uma lei costuma ser compartilhada entre Executivo e Legislativo, o que reforça a importância de acompanhar mais de uma etapa do processo e de saber em qual casa a proposta está.',
        ],
      },
      {
        titulo: 'O orçamento passa pelo Congresso inteiro',
        paragrafos: [
          'O orçamento federal nasce de proposta do Executivo e é apreciado pelo Congresso Nacional, que pode alterá-lo por meio de emendas, dentro das regras legais. Uma comissão mista, formada por deputados e senadores, analisa o projeto antes da votação. Por isso, deputados e senadores influenciam juntos a destinação de recursos públicos, cada um com suas emendas e negociações, e o acompanhamento do orçamento exige olhar as duas casas. Acompanhar a comissão mista de orçamento é uma forma de ver deputados e senadores decidindo juntos sobre o dinheiro público.',
          'A partir da Emenda Constitucional 86/2015, parte das emendas individuais ganhou execução obrigatória, o chamado orçamento impositivo, com limites e regras que mudaram ao longo do tempo. Isso aproximou o eleitor do parlamentar na área de recursos: hoje é possível perguntar por emenda, por valor e por resultado de forma mais concreta do que no passado, e cobrar prestação de contas de deputados e senadores. Hoje o eleitor pode comparar o que cada parlamentar destinou e em que medida os recursos anunciados foram de fato executados.',
          'Na prática, a diferença entre as casas aparece no estilo: a Câmara, com 513 deputados, tem mais pulverização e disputa por espaço; o Senado, com 81 senadores, tende a ter decisões mais concentradas em cada parlamentar. As duas coisas importam para o orçamento, porque emendas individuais de deputados e senadores disputam os mesmos limites legais e os mesmos espaços de negociação com o governo. O tamanho das casas também explica diferenças de agenda, de visibilidade e de relação com o governo.',
        ],
      },
      {
        titulo: 'O que muda na hora de escolher',
        paragrafos: [
          'Ao votar para deputado federal, o eleitor escolhe um nome dentro de uma lista partidária, em sistema proporcional; ao votar para senador, escolhe diretamente entre candidatos, vencendo os mais votados, conforme o número de vagas em disputa. Essa diferença básica explica muito do comportamento: deputados dependem do partido para se eleger e para atuar; senadores dependem mais do voto direto e do nome próprio. Saber se o seu voto conta para uma lista ou diretamente para um nome é essencial para entender os resultados do pleito.',
          'Na renovação de dois terços do Senado, como ocorre em 2026, cada estado elege dois senadores; na renovação de um terço, elege um. Já a Câmara se renova por inteiro a cada eleição, com o número de vagas por estado variando entre oito e setenta, conforme a população. Essas regras ajudam a entender por que algumas campanhas são mais coletivas e outras mais personalizadas, e por que certos estados têm bancadas maiores.',
          'Para decidir, pergunte o que você espera de cada voto. Se o tema é lei nacional com impacto direto no dia a dia, deputado e senador têm peso semelhante. Se o tema é institucional, como aprovação de autoridades ou equilíbrio federativo, o Senado é a casa central. Cobrar do cargo certo é o primeiro passo para uma avaliação justa, e o segundo é conferir registros oficiais das duas casas antes de concluir qualquer coisa.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Acompanhe a tramitação no portal da Câmara',
        paragrafos: [
          'O portal da Câmara permite acompanhar a tramitação de proposições por número, autor, tema ou comissão. A ficha de tramitação mostra datas, pareceres, votações e o envio da matéria ao Senado quando necessário. Esse registro público é a forma mais direta de conferir em qual casa uma proposta está e o que já aconteceu com ela, sem depender de notícias ou resumos de redes sociais. Quando uma proposta muda de casa, o acompanhamento continua no portal da casa seguinte.',
        ],
        fonte: { label: 'Câmara dos Deputados', href: 'https://www.camara.leg.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'Qual casa é mais importante?',
        resposta: 'As duas são indispensáveis, com papéis diferentes. A Câmara é maior, mais fragmentada e costuma iniciar a maioria das propostas; o Senado revisa, inicia projetos próprios e concentra decisões institucionais, como aprovação de autoridades. A importância de cada casa varia conforme o tema: para orçamento e leis comuns, as duas pesam; para indicações e questões federativas, o Senado é central.',
      },
      {
        pergunta: 'Deputado pode virar senador sem eleição?',
        resposta: 'Não. São cargos eletivos distintos, e ninguém muda de casa sem passar pelas urnas. Existe, porém, o caso dos suplentes: cada senador tem dois suplentes registrados, que podem assumir o mandato em situações previstas em lei. Já um deputado federal eleito pode concorrer ao Senado na eleição seguinte, mas, se eleito, precisará deixar a Câmara para assumir o novo cargo.',
      },
      {
        pergunta: 'O voto para deputado federal e estadual funciona igual?',        resposta: 'Sim, na lógica geral: os dois usam sistema proporcional, em que o voto soma para o partido ou federação e o quociente eleitoral define as vagas. A diferença está na esfera: deputado federal atua em Brasília, em leis nacionais; deputado estadual atua na assembleia do estado, em leis estaduais. Por isso, as pautas cobradas de cada um são diferentes, e a pesquisa para cada cargo também deve ser.',
      },
      {
        pergunta: 'Por que o Senado tem menos cadeiras que a Câmara?',
        resposta: 'Porque a Constituição optou por uma casa federativa: cada estado e o Distrito Federal elegem três senadores, independentemente da população, totalizando 81. A Câmara, com 513 deputados, distribui as vagas conforme a população, com mínimo de oito e máximo de setenta por estado. O objetivo é equilibrar representação da população com representação igualitária dos estados no Congresso.',
      },
      {
        pergunta: 'Quem vota primeiro em uma proposta?',
        resposta: 'Depende da origem. A maioria dos projetos de lei ordinária começa na Câmara e depois vai ao Senado; alguns começam pelo Senado. Medidas provisórias, editadas pelo presidente, são examinadas primeiro pela Câmara. Em qualquer caso, a proposta precisa ser aprovada nas duas casas, e alterações fazem o texto voltar para revisão na casa de origem antes da sanção.',
      },
    ],
    tabelas: [
      {
        titulo: 'Deputado federal x senador em resumo',
        cabecalho: ['Item', 'Deputado federal', 'Senador'],
        linhas: [
          ['Quantidade', '513 no total', '81 no total (3 por estado e pelo DF)'],
          ['Mandato', '4 anos', '8 anos'],
          ['Renovação', 'Câmara inteira a cada eleição', 'Um terço ou dois terços, alternados'],
          ['Sistema de eleição', 'Proporcional, por estado', 'Majoritário, por estado'],
          ['Principais funções', 'Leis, comissões, fiscalização e orçamento', 'Leis, sabatinas, temas federativos e orçamento'],
        ],
      },
    ],
  },
  {
    slug: 'como-funciona-quociente-eleitoral',
    novasSections: [
      {
        titulo: 'O cálculo passo a passo, com números hipotéticos',
        paragrafos: [
          'Para entender o quociente eleitoral, um exemplo hipotético ajuda. Imagine uma eleição com 100 mil votos válidos e 10 vagas em disputa: o quociente eleitoral seria de 10 mil votos. Um partido que obtivesse 28 mil votos teria, nessa conta simplificada, duas cadeiras garantidas, e os 8 mil votos restantes entrariam na disputa das sobras. O exemplo é fictício, mas mostra a lógica da divisão que define as vagas. Nas eleições reais, os números são outros, mas a operação matemática básica é a mesma.',
          'A distribuição não termina na primeira divisão. Depois de preenchidas as vagas iniciais, as cadeiras que sobrarem são disputadas por partidos e federações, seguindo regras legais que incluem critérios de desempenho mínimo e cálculos de média. Essas regras mudaram ao longo do tempo e têm detalhes que o eleitor não precisa decorar, mas deve saber que existem, porque são elas que definem os últimos nomes eleitos. Consultar a legislação vigente e a explicação oficial da Justiça Eleitoral é a forma mais segura de entender a regra aplicável em cada eleição.',
          'O importante é reter a ideia central: em eleição proporcional, o voto fortalece primeiro o conjunto. O quociente eleitoral funciona como uma régua que traduz votos em cadeiras, e o desempenho individual define quais nomes da lista ocupam as vagas conquistadas pelo grupo. Quem entende essa lógica deixa de estranhar resultados em que um candidato muito votado ajuda a eleger colegas de partido. É essa combinação entre desempenho coletivo e individual que torna o sistema proporcional diferente do majoritário.',
        ],
      },
      {
        titulo: 'Voto de legenda e voto no candidato',
        paragrafos: [
          'Além de votar no nome de um candidato, o eleitor pode votar apenas na legenda, digitando o número do partido. Esse voto soma ao total da sigla e ajuda a eleger candidatos da lista, sem escolher uma pessoa específica. Para quem confia no programa do partido mais do que em nomes individuais, o voto de legenda é uma opção prevista na legislação eleitoral e registrada na urna com a tecla de confirmação.',
          'Na prática, o voto de legenda fortalece a bancada, mas não controla quais nomes entram: as vagas conquistadas são ocupadas pelos candidatos mais votados do partido ou da federação, desde que cumpram as exigências legais de desempenho. Por isso, mesmo quem vota na legenda influencia o resultado final do grupo. A diferença entre os dois votos está na dose de controle individual sobre a lista. Antes de votar na legenda, vale conhecer a lista de candidatos que podem ser beneficiados por esse voto.',
          'Vale lembrar que o voto de legenda só existe nos cargos proporcionais, como deputado federal, deputado estadual e vereador. Para presidente, governador e senador, o voto é sempre em candidato, e a lógica é majoritária: vence quem tiver mais votos, conforme as regras de cada cargo. Misturar as duas lógicas é um dos erros mais comuns na hora de interpretar resultados eleitorais. No voto majoritário, o candidato mais votado vence, e o partido não redistribui a cadeira.',
        ],
      },
      {
        titulo: 'Por que o partido entrou na sua decisão',
        paragrafos: [
          'Como a cadeira pertence ao partido ou à federação, o voto em um candidato fortalece também os colegas de lista. Se você apoia uma pessoa, mas rejeita o grupo, o resultado pode ser uma bancada que você não esperava. Essa é a consequência coletiva do voto proporcional, e conhecê-la antes da eleição evita surpresas e arrependimentos depois do resultado divulgado. Essa é uma das razões pelas quais partidos e federações aparecem com destaque nas campanhas proporcionais.',
          'As federações partidárias funcionam, para o cálculo, como um partido único: os votos de todos os integrantes são somados, e as cadeiras são distribuídas entre os partidos federados conforme as regras internas e os votos de cada candidato. Desde 2020, as coligações deixaram de valer para eleições proporcionais, o que tornou as federações uma das principais formas de disputa conjunta. A regra vigente pode ser conferida na legislação eleitoral e nas orientações oficiais da Justiça Eleitoral.',
          'Para o eleitor, a recomendação prática é sempre a mesma: antes de votar em um nome para cargo proporcional, veja a lista completa do partido ou da federação, os principais candidatos e o programa do grupo. Pergunte a si mesmo se aceita a bancada que seu voto ajuda a formar. Se a resposta for negativa, vale repensar a escolha ou entender melhor o conjunto antes da eleição. A decisão final continua sendo sua, mas feita com informação sobre o grupo que o voto fortalece.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'O TSE explica o sistema proporcional',
        paragrafos: [
          'O Tribunal Superior Eleitoral publica material educativo sobre o sistema eleitoral brasileiro, incluindo explicações sobre eleição proporcional, quociente eleitoral e distribuição de vagas. O conteúdo institucional ajuda a conferir como a regra funciona na prática e a tirar dúvidas que circulam em conversas de campanha. Consultar a explicação oficial antes de discutir resultados é uma forma simples de evitar reproduzir versões erradas do cálculo em grupos de mensagem.',
        ],
        fonte: { label: 'Tribunal Superior Eleitoral', href: 'https://www.tse.jus.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'Se meu candidato não for eleito, meu voto é perdido?',
        resposta: 'Não no sistema proporcional. O voto dado a um candidato soma ao total do partido ou da federação e pode ajudar a eleger outros nomes da lista, além de influenciar as sobras. O voto só fica sem efeito se o partido não alcançar as regras mínimas para obter cadeiras. Por isso, a escolha do partido é parte essencial do voto em cargos proporcionais.',
      },
      {
        pergunta: 'O que é voto de legenda?',
        resposta: 'É o voto dado diretamente ao partido, digitando apenas o número da sigla na urna, sem escolher candidato. Ele conta para o total do partido ou da federação na eleição proporcional e ajuda a eleger candidatos da lista. Não existe voto de legenda em cargos majoritários, como presidente, governador e senador, em que o eleitor precisa escolher um nome.',
      },
      {
        pergunta: 'Por que um candidato com menos votos que outro foi eleito?',
        resposta: 'Porque, no sistema proporcional, a vaga não pertence apenas ao candidato mais votado individualmente. O total de votos do partido ou da federação define quantas cadeiras o grupo conquista, e os candidatos mais votados dentro do grupo ocupam essas cadeiras, respeitadas as regras de desempenho. Um candidato pode entrar com votação menor que a de um colega de outro partido.',
      },
      {
        pergunta: 'O quociente eleitoral é igual em todo o país?',
        resposta: 'Não. Ele é calculado por estado (ou pelo Distrito Federal) e por cargo, a partir dos votos válidos e do número de vagas em disputa naquela unidade. Estados com mais eleitores e mais vagas tendem a ter quocientes maiores. Por isso, comparar votos de deputados de estados diferentes sem considerar o quociente de cada um pode levar a conclusões erradas.',
      },
      {
        pergunta: 'Um candidato com pouca votação pode ser eleito?',
        resposta: 'Sim, se o partido ou a federação tiver votos suficientes para conquistar cadeiras e o candidato cumprir as exigências legais de desempenho individual. É o chamado efeito puxador de voto, em que nomes muito votados ajudam a eleger colegas de lista. Saber disso antes da eleição ajuda a votar com consciência da bancada que vem junto.',
      },
    ],
    tabelas: [
      {
        titulo: 'Exemplo hipotético de cálculo do quociente eleitoral',
        cabecalho: ['Etapa', 'Valor hipotético', 'O que significa'],
        linhas: [
          ['Votos válidos', '100 mil', 'Total de votos computados na eleição do exemplo'],
          ['Vagas em disputa', '10', 'Número de cadeiras do cargo naquela eleição'],
          ['Quociente eleitoral', '10 mil votos', 'Divisão de 100 mil votos válidos por 10 vagas'],
          ['Partido com 28 mil votos', '2 cadeiras na primeira rodada', '28 mil divididos por 10 mil, com sobra de 8 mil votos'],
          ['Sobras', 'Disputa por regras legais', 'Cadeiras restantes distribuídas conforme a legislação vigente'],
        ],
      },
    ],
  },
  {
    slug: 'como-checar-pesquisas-eleitorais',
    novasSections: [
      {
        titulo: 'Comece pelo registro oficial',
        paragrafos: [
          'A Lei 9.504/1997, conhecida como Lei das Eleições, exige que pesquisas eleitorais sejam registradas no Tribunal Superior Eleitoral antes da divulgação. O registro informa quem contratou, quem realizou, a metodologia e o período de coleta. Consultar o registro é o primeiro passo para avaliar qualquer pesquisa: sem registro, o número divulgado não atende à regra e deve ser tratado com ainda mais cautela. O hábito de abrir o registro antes de comentar uma pesquisa protege o eleitor de números sem compromisso com o método.',
          'O registro público também ajuda a identificar conflitos de interesse. Uma pesquisa contratada por um partido pode ser tecnicamente correta, mas merece leitura atenta: o contratante escolheu perguntas, cenários e datas que podem favorecer uma narrativa. Isso não invalida o levantamento, apenas indica que o leitor deve verificar cada detalhe metodológico antes de levar o número a sério. A pergunta útil é se a metodologia suporta a conclusão que o contratante quer divulgar, e não apenas se o número existe.',
          'Além do registro, verifique se a pesquisa foi realizada por instituto com histórico conhecido e se a metodologia está descrita com clareza: tamanho da amostra, forma de coleta, margem de erro, nível de confiança e critérios de ponderação. Quanto mais transparente o método, mais fácil é avaliar os limites do resultado. Quanto mais vaga a descrição, maior a chance de números bonitos e conclusões frágeis. Institutos com histórico de transparência costumam descrever esses elementos com mais detalhe do que levantamentos de ocasião.',
        ],
      },
      {
        titulo: 'Cenários e perguntas mudam o número',
        paragrafos: [
          'Pesquisa espontânea pergunta em quem o eleitor votaria sem apresentar lista; pesquisa estimulada mostra os nomes. Os resultados podem ser muito diferentes, e cada formato responde a uma pergunta distinta: lembrança de nome e intenção com lista à frente. Manchetes costumam misturar os dois, e o leitor precisa conferir qual formato gerou o número citado antes de comentar ou compartilhar. A diferença entre os dois formatos costuma ser maior nos cargos menos conhecidos pelo eleitorado.',
          'Cenários também importam. Pesquisas podem testar primeiro turno, segundo turno simulado, com ou sem nomes de possíveis aliados, e até rejeição. Um candidato pode aparecer bem em um cenário e mal em outro. Ao comparar pesquisas, confira se os cenários são os mesmos; comparar números de formatos diferentes é como comparar respostas de perguntas diferentes, o que pode gerar conclusões erradas sobre quem cresceu ou caiu. O mesmo eleitor pode reagir de forma diferente quando um nome entra ou sai do cenário testado.',
          'A pergunta sobre rejeição ajuda a ler o cenário com mais profundidade: um candidato pode liderar a intenção de voto e também liderar a rejeição, o que muda a leitura de sua viabilidade. Para o eleitor, o valor da pesquisa está menos na posição do momento e mais na combinação de informações: intenção, rejeição, cenários e tendência ao longo do tempo. Líder em intenção e em rejeição enfrenta um teto eleitoral que o número isolado de intenção não revela.',
        ],
      },
      {
        titulo: 'Nenhuma pesquisa substitui o seu critério',
        paragrafos: [
          'Pesquisa mede um momento, não o futuro. Votos mudam com debates, fatos novos, campanhas e conversas. Tratar uma pesquisa como resultado antecipado transforma o eleitor em torcedor de cenário e enfraquece a própria decisão. O uso saudável do dado é informativo: saber quem está competitivo ajuda a entender o ambiente, mas não responde se o candidato é coerente, preparado ou confiável. Acompanhar a série histórica de um instituto diz mais sobre tendências do que uma única rodada.',
          'A chamada boca de urna, pesquisa feita com eleitores no dia da votação, é proibida pela legislação eleitoral. Já as pesquisas regulares têm divulgação regulada, com regras de registro e prazos. Por isso, números que circulam na véspera ou no dia da eleição sem registro devem ser recebidos como material de campanha, não como informação verificada. Quando o conteúdo não tem registro ou data verificável, o tratamento mais prudente é o mesmo dado a qualquer peça de propaganda.',
          'Por fim, desconfie de quem usa pesquisa como ordem: votar no líder para não perder o voto ou no azarão para não ser manada são escolhas pessoais, não imposições dos números. O bom eleitor combina dados de pesquisa com propostas, histórico, partido e fontes oficiais, e aceita que o resultado final pertence aos eleitores, não às pesquisas. Pesquisas informam o cenário; a decisão, com valores e critérios próprios, continua sendo exclusivamente sua.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Registro de pesquisas no TSE',
        paragrafos: [
          'O TSE disponibiliza consulta pública às pesquisas eleitorais registradas, com informações sobre contratante, instituto, metodologia e período de coleta. Antes de acreditar em um número compartilhado em grupos de mensagem, vale procurar o registro correspondente e comparar os dados divulgados com os declarados. A consulta é gratuita e aberta, e o hábito de conferi-la transforma o leitor em verificador. Pesquisa sem registro não deve ser tratada como informação confiável.',
        ],
        fonte: { label: 'Tribunal Superior Eleitoral', href: 'https://www.tse.jus.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'Pesquisa eleitoral erra muito?',
        resposta: 'Toda pesquisa tem limites: amostra, margem de erro, momento da coleta e decisões metodológicas. Algumas acertam o resultado, outras erram, e nenhuma garante o futuro. O que a pesquisa faz bem é descrever um cenário em uma data específica. Ler a metodologia e comparar várias pesquisas ao longo do tempo é mais prudente do que confiar em um único número.',
      },
      {
        pergunta: 'O que é margem de erro?',
        resposta: 'É o intervalo em que o resultado real provavelmente se encontra, segundo o método adotado. Uma pesquisa com 50% e margem de dois pontos, por exemplo, indica um intervalo entre 48% e 52%. Quando a diferença entre dois candidatos é menor que a margem, diz-se que há empate técnico: o levantamento não permite afirmar quem está à frente.',
      },
      {
        pergunta: 'O que é empate técnico?',
        resposta: 'É a situação em que a diferença entre candidatos fica dentro da margem de erro da pesquisa. Isso não significa que os dois tenham exatamente os mesmos votos, mas que o método não consegue distinguir quem está na frente com segurança. Manchetes que ignoram a margem costumam criar viradas que os próprios dados não sustentam.',
      },
      {
        pergunta: 'Toda pesquisa precisa ser registrada no TSE?',
        resposta: 'Sim, para divulgação em período eleitoral, conforme a Lei 9.504/1997, que exige registro prévio com informações de contratante, metodologia e período de coleta. Enquetes informais, feitas sem método e sem registro, não são pesquisas eleitorais regulares e não devem ser tratadas como tal. O registro público permite ao eleitor conferir a origem do número.',
      },
      {
        pergunta: 'Devo votar no candidato que lidera as pesquisas?',
        resposta: 'Não necessariamente. Pesquisa indica viabilidade e cenário, mas não diz se o candidato é a melhor escolha para os seus critérios. Votar apenas no líder transforma o voto em aposta em um cenário, e cenários mudam. Combine os números com propostas, histórico, partido e fontes oficiais, e decida com base no que você verifica, não no que os outros projetam.',
      },
    ],
    tabelas: [
      {
        titulo: 'O que observar em uma pesquisa eleitoral',
        cabecalho: ['Item', 'O que observar', 'Por que importa'],
        linhas: [
          ['Registro no TSE', 'Número de registro e dados do contratante', 'Garante que a pesquisa seguiu a regra legal'],
          ['Amostra', 'Tamanho e perfil dos entrevistados', 'Amostra pequena ou mal distribuída reduz confiança'],
          ['Margem de erro', 'Intervalo informado pelo instituto', 'Define se diferenças são significativas'],
          ['Período de coleta', 'Datas das entrevistas', 'Eventos após a coleta podem mudar o cenário'],
          ['Cenário e formato', 'Estimulada, espontânea, primeiro ou segundo turno', 'Números de formatos diferentes não se comparam diretamente'],
        ],
      },
    ],
  },
  {
    slug: 'como-evitar-desinformacao-eleitoral',
    novasSections: [
      {
        titulo: 'Dado verdadeiro também pode enganar',
        paragrafos: [
          'Grande parte da desinformação política não inventa fatos: ela pega um dado real e o apresenta fora de contexto. Um número de votos, uma despesa, uma fala antiga ou uma votação parcial podem ser verdadeiros e, mesmo assim, sustentar uma conclusão falsa. O primeiro reflexo de quem recebe uma acusação grave deveria ser perguntar o que o dado realmente mostra, e não apenas se ele existe. A checagem séria pergunta pelo contexto, pela data e pelo recorte, e não apenas pela existência do registro.',
          'Um exemplo comum é o recorte de uma votação: mostrar que um parlamentar votou sim em uma etapa pode ser verdadeiro e, ainda assim, enganoso se a votação era sobre um requerimento, e não sobre o mérito da proposta. Antes de compartilhar, confira o objeto exato da votação, a data e a versão do texto. O dado completo costuma contar uma história diferente da versão recortada. O mesmo cuidado vale para listas de presença, gastos e qualquer registro que dependa de explicação para fazer sentido.',
          'O mesmo cuidado vale para números de gastos e processos. Um valor alto pode ter explicação administrativa legítima; um processo pode estar arquivado ou ter sido reformado em recurso. Verificar a fase e a fonte primária não é defender ninguém: é proteger a qualidade da informação que circula e a sua própria credibilidade ao repassá-la adiante. Conferir a fonte primária é um hábito que beneficia todos os lados do debate, inclusive quem critica e quem defende.',
        ],
      },
      {
        titulo: 'Imagens e vozes já não são prova automática',
        paragrafos: [
          'A edição de imagens, áudios e vídeos ficou mais barata e sofisticada, inclusive com recursos de inteligência artificial capazes de simular rostos e vozes. Conteúdo sintético bem feito pode enganar até quem acompanha política de perto. Por isso, a regra mudou: material audiovisual é ponto de partida para verificação, não prova final, principalmente quando a mensagem pede indignação imediata. Quanto mais grave a acusação e mais forte o apelo emocional, maior deve ser o rigor antes de aceitar o conteúdo.',
          'A legislação eleitoral passou a tratar do tema, com regras específicas para propaganda e para o uso de conteúdo sintético em campanhas, e a Justiça Eleitoral analisa casos concretos. Para o cidadão, o caminho seguro continua o mesmo: procurar a gravação completa, o contexto, a data e a fonte. Se a única versão disponível é um corte curto sem origem, a chance de manipulação aumenta. O ponto para o eleitor é prático: sem a versão completa e a fonte, o vídeo não deveria circular como prova.',
          'Também vale desconfiar de imagens antigas recicladas em época de eleição. Enchentes, manifestações e cenas de outros anos costumam reaparecer com legendas novas. A busca reversa de imagens e a procura pela data original ajudam a identificar reciclagem. O objetivo não é virar investigador profissional, e sim incorporar pequenos hábitos de verificação antes de clicar em compartilhar. Esses pequenos procedimentos custam minutos e evitam que você seja o próximo elo de uma corrente enganosa.',
        ],
      },
      {
        titulo: 'O que a lei brasileira diz sobre o tema',
        paragrafos: [
          'O Brasil tem marcos importantes para o debate. O Marco Civil da Internet, Lei 12.965/2014, define princípios para o uso da rede no país, como liberdade de expressão, privacidade e responsabilização de provedores, conforme as regras legais. A LGPD, Lei 13.709/2018, protege dados pessoais e estabelece limites para o tratamento de informações. Os dois marcos ajudam a entender direitos e deveres de quem produz e de quem consome conteúdo. Ler a lei diretamente, e não pela versão de terceiros, é a melhor forma de entender o que cada marco realmente garante.',
          'Há ainda um projeto de lei em tramitação na Câmara dos Deputados, o PL 2630/2020, que trata de transparência e responsabilidade das plataformas digitais no combate à desinformação. O projeto não foi aprovado e não é lei: qualquer afirmação sobre o que a nova lei exige deve ser conferida com o status oficial da tramitação. Acompanhar o andamento no portal da Câmara evita confundir proposta com regra vigente. A mesma cautela vale para qualquer proposta citada em campanha: proposta não é lei até completar a tramitação e a sanção.',
          'No plano eleitoral, a Justiça Eleitoral atua em casos de desinformação que afetam o processo de votação, e as plataformas têm canais de denúncia de conteúdo. Cada situação é analisada conforme a lei e as circunstâncias. Para o eleitor, o essencial é saber que existem regras e canais, mas que nenhum mecanismo substitui a verificação pessoal antes de compartilhar qualquer material político. O equilíbrio entre liberdade de expressão e responsabilidade é definido caso a caso, e generalizações costumam enganar.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'A tramitação do PL 2630/2020',
        paragrafos: [
          'O PL 2630/2020, que propõe regras de transparência e responsabilidade para plataformas digitais, é frequentemente citado em debates sobre desinformação. Ele está em tramitação na Câmara dos Deputados e ainda não foi aprovado: não é lei em vigor. A ficha de tramitação no portal da Câmara mostra o histórico da proposta, as comissões por onde passou e o estágio atual. Conferir o andamento oficial é a forma mais simples de não confundir proposta com regra já vigente.',
        ],
        fonte: { label: 'Câmara dos Deputados', href: 'https://www.camara.leg.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'Como saber se um vídeo é falso ou fora de contexto?',
        resposta: 'Comece pela origem: quem publicou, quando, onde e por quê. Procure a versão completa e o contexto do evento; busque o nome e a data em fontes confiáveis. Se o vídeo for antigo, a busca pela data original costuma revelar a reciclagem. Conteúdo sintético, gerado por inteligência artificial, merece atenção redobrada, principalmente quando a mensagem pede reação imediata.',
      },
      {
        pergunta: 'Já compartilhei desinformação. O que fazer?',
        resposta: 'O melhor é corrigir publicamente, no mesmo grupo ou perfil em que compartilhou, explicando o erro e enviando a fonte correta. Corrigir pode parecer constrangedor, mas constrói confiança a longo prazo. Depois, adote um ritual de verificação antes de repassar qualquer conteúdo político: link, data, fonte primária e uma pergunta sobre quem ganha com aquela versão.',
      },
      {
        pergunta: 'Denunciar conteúdo de desinformação ajuda?',
        resposta: 'Sim, as plataformas mantêm canais de denúncia e a Justiça Eleitoral atua em casos que afetam o processo eleitoral, conforme a legislação. Denunciar não garante remoção imediata, mas contribui para que o conteúdo seja analisado. Ao denunciar, informe o link, o contexto e o motivo. O complemento indispensável é não repassar o conteúdo você mesmo, mesmo para criticá-lo.',
      },
      {
        pergunta: 'O que é deepfake?',
        resposta: 'É um conteúdo sintético, geralmente vídeo ou áudio, criado ou alterado com técnicas de inteligência artificial para simular a imagem ou a voz de uma pessoa. Em contexto eleitoral, deepfakes podem fabricar falas e cenas que nunca ocorreram. A verificação inclui procurar a versão original, checar a fonte e observar sinais de edição, além de consultar esclarecimentos oficiais quando o caso ganha relevo.',
      },
      {
        pergunta: 'Desinformação é crime?',
        resposta: 'Depende do caso. Algumas condutas podem configurar ilícitos eleitorais ou penais, como calúnia, injúria e difamação, ou infrações à legislação eleitoral, mas cada situação é analisada pela Justiça com base em provas e circunstâncias. Não existe resposta automática para essa pergunta. O caminho seguro é não participar da corrente: não compartilhe, denuncie e confie na apuração oficial.',
      },
    ],
    tabelas: [
      {
        titulo: 'Sinais de alerta e atitudes úteis',
        cabecalho: ['Sinal de alerta', 'Atitude recomendada'],
        linhas: [
          ['Mensagem pede compartilhamento imediato', 'Pausar e verificar antes de repassar'],
          ['Print sem link ou sem data', 'Procurar o documento ou a página original'],
          ['Vídeo curto sem contexto', 'Buscar versão completa e fonte do evento'],
          ['Dado verdadeiro usado para conclusão exagerada', 'Conferir o objeto exato do dado (votação, processo, gasto)'],
          ['Conteúdo com apelo emocional forte', 'Desconfiar da pressa e buscar a fonte primária'],
        ],
      },
    ],
  },
  {
    slug: 'como-pesquisar-candidato-pelo-nome',
    novasSections: [
      {
        titulo: 'Comece pelo registro oficial de candidatura',
        paragrafos: [
          'O ponto de partida mais seguro é o registro de candidatura no TSE. Nele aparecem o nome de urna, o partido, a federação ou coligação, o cargo, a situação do registro e os bens declarados pelo candidato no momento do pedido. Esses dados ajudam a confirmar que você encontrou a pessoa certa e a comparar informações básicas com o que circula nas redes sociais e nos grupos de mensagem. A consulta é gratuita, leva poucos minutos e evita que a pesquisa comece com a pessoa errada.',
          'A situação do registro merece atenção especial: pode estar deferida, indeferida ou pendente de recurso, e muda com decisões da Justiça Eleitoral. Uma candidatura indeferida não significa culpa nem inocência; significa que o registro não atendeu a alguma exigência legal e que pode haver recurso em andamento. Antes de concluir qualquer coisa, verifique a data e o estágio atual da decisão. O registro oficial é o único lugar onde a situação da candidatura tem valor jurídico; o resto é especulação.',
          'A declaração de bens é pública e costuma gerar muita conversa, mas exige leitura cuidadosa: valores declarados no registro podem estar desatualizados ou seguir regras próprias do sistema. Um patrimônio alto não é crime, e um patrimônio baixo não é prova de virtude. O dado serve para levantar perguntas, não para fechar julgamentos sobre a pessoa candidata. O melhor uso da declaração de bens é comparar períodos e perguntar sobre mudanças, sempre com fonte e data.',
        ],
      },
      {
        titulo: 'Veja a prestação de contas da campanha',
        paragrafos: [
          'Candidatos precisam registrar e prestar contas dos gastos e das fontes de financiamento da campanha, conforme as regras eleitorais. O TSE publica as prestações de contas, com doações, despesas e limites. Analisar esse material ajuda a entender quem sustenta a candidatura e se os gastos parecem compatíveis com o tamanho da campanha declarada e com a realidade do eleitorado. A leitura das contas não decide o voto, mas ajuda a entender de onde vem o financiamento da campanha.',
          'A leitura das contas não é simples: é preciso considerar o período, os fornecedores, os serviços contratados e as regras de cada eleição. Gastos altos podem ter explicação legítima, e gastos baixos podem esconder doações não declaradas, que a Justiça Eleitoral apura. Para o eleitor, o essencial é saber que as contas existem, são públicas e podem revelar padrões interessantes quando analisadas com calma. O importante é não tratar nenhum valor isolado como prova, e sim como ponto de partida para perguntas.',
          'Se a prestação de contas foi desaprovada, isso gera consequências legais, mas o significado político depende do contexto e das decisões da Justiça. Evite conclusões apressadas com base em uma única notícia: confira a decisão, a fase do processo e a possibilidade de recurso. O histórico de contas de campanhas anteriores, quando disponível, também ajuda a identificar padrões de comportamento. A decisão da Justiça Eleitoral sobre as contas é documento público e deve ser lida no original, não em recorte.',
        ],
      },
      {
        titulo: 'Complete com o histórico de quem já exerceu mandato',
        paragrafos: [
          'Para candidatos que já foram parlamentares, o histórico oficial é o melhor material: votações, presenças, proposições, comissões, relatorias e despesas de mandato. Esses registros respondem com mais precisão do que qualquer discurso de campanha a perguntas como o que essa pessoa fez e em que temas atuou. O QuemVotar organiza parte desses dados, e as páginas oficiais completam a conferência. Esse histórico permite comparar candidatos com a mesma régua, em vez de depender de impressões.',
          'Candidatos novatos não têm esse histórico, e a pesquisa muda de foco: vale procurar atuação profissional, participação em entidades, gestão de empresas ou organizações, cargos anteriores e posições públicas documentadas. A ausência de registro não é defeito, mas também não substitui provas: promessas de quem nunca exerceu cargo precisam ser avaliadas pelo plano apresentado e pela viabilidade do cargo disputado. Na ausência de registros, o critério mais seguro é exigir propostas com prazo, custo e responsável pela execução.',
          'Em qualquer caso, complete a pesquisa com material de campanha, entrevistas e debates, comparando respostas às mesmas perguntas. Se o candidato promete algo que depende de outro cargo ou de outra esfera de governo, anote a incompatibilidade. Uma pesquisa honesta aceita lacunas: nem tudo estará disponível, e reconhecer o que ainda falta saber é parte da decisão. Terminar a pesquisa com perguntas em aberto é melhor do que fechá-la com certezas que os dados não sustentam.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Prestação de contas de campanha no TSE',
        paragrafos: [
          'O Tribunal Superior Eleitoral publica as prestações de contas de campanha, com doações recebidas, despesas declaradas e a decisão da Justiça Eleitoral sobre cada conta. A consulta pode ser feita por candidato, partido ou eleição. Para o eleitor, o material ajuda a responder quem financiou a candidatura e como o dinheiro foi usado, sempre com atenção às datas e às regras de cada pleito. Contas desaprovadas geram consequências legais específicas.',
        ],
        fonte: { label: 'Tribunal Superior Eleitoral', href: 'https://www.tse.jus.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'Onde encontro a lista oficial de candidatos?',
        resposta: 'No DivulgaCand, sistema público do TSE que reúne os registros de candidatura de todas as eleições. A consulta é aberta e pode ser feita por estado, cargo e partido. A lista oficial evita depender de listas circulantes em grupos de mensagem, que podem estar desatualizadas ou conter nomes que nem chegaram a registrar candidatura.',
      },
      {
        pergunta: 'O que significa candidatura indeferida?',
        resposta: 'Significa que o pedido de registro foi negado pela Justiça Eleitoral, por algum motivo previsto em lei, como inelegibilidade ou falha documental. O candidato pode recorrer, e a situação pode mudar até a eleição. Por isso, antes de afirmar que alguém não pode ser candidato, confira a decisão mais recente e se ainda há recurso pendente.',
      },
      {
        pergunta: 'Candidato precisa declarar bens?',
        resposta: 'Sim. A declaração de bens faz parte do pedido de registro de candidatura e é pública. Os valores podem estar desatualizados ou seguir regras do sistema, então o dado serve mais para levantar perguntas do que para fechar julgamentos. Mudanças bruscas entre eleições, por exemplo, podem merecer investigação, mas explicações legítimas também existem.',
      },
      {
        pergunta: 'Como saber se um candidato já foi condenado?',
        resposta: 'A consulta de processos é feita por tribunal: Justiça Eleitoral, Justiça Federal, Justiça Estadual e tribunais superiores, conforme o caso. O número do processo permite acompanhar a fase e a decisão. A Lei Complementar 135/2010, a Lei da Ficha Limpa, define hipóteses de inelegibilidade, mas condenação nem sempre significa inelegibilidade, e processo não é condenação.',
      },
      {
        pergunta: 'Vale pesquisar o candidato a vice ou os suplentes?',
        resposta: 'Sim. No caso do Senado, os dois suplentes podem assumir o mandato, e no caso de outros cargos, o vice pode assumir em situações previstas. Conhecer o nome, o partido e a trajetória de quem pode entrar na vaga completa a avaliação. Um voto em uma chapa é também um voto no conjunto que pode governar ou legislar.',
      },
    ],
    tabelas: [
      {
        titulo: 'Onde procurar cada dado do candidato',
        cabecalho: ['Dado', 'Onde consultar', 'O que observar'],
        linhas: [
          ['Registro e situação da candidatura', 'DivulgaCand, no site do TSE', 'Nome, partido, cargo e estágio do registro'],
          ['Bens declarados', 'DivulgaCand', 'Valores e data da declaração'],
          ['Contas de campanha', 'Prestação de contas no TSE', 'Doações, gastos e limites'],
          ['Mandato em exercício', 'Portal da Câmara ou do Senado', 'Votações, presenças, proposições e despesas'],
          ['Processos', 'Tribunais competentes', 'Número, fase e decisões'],
        ],
      },
    ],
  },
  {
    slug: 'como-checar-processos-e-condenacoes',
    novasSections: [
      {
        titulo: 'A Lei da Ficha Limpa em poucas palavras',
        paragrafos: [
          'A Lei Complementar 135/2010, conhecida como Lei da Ficha Limpa, criou hipóteses de inelegibilidade para quem foi condenado em decisão colegiada por órgãos da Justiça, em casos previstos na lei, entre outras situações, como rejeição de contas públicas e perda de mandato. A regra é específica: nem toda condenação gera inelegibilidade, e cada hipótese tem condições e prazos próprios. A leitura da lei e de cada decisão concreta é indispensável antes de qualquer afirmação sobre elegibilidade.',
          'A inelegibilidade tem prazo, em regra de oito anos, contado conforme o caso previsto na lei. Por isso, uma condenação antiga pode não ter mais efeito eleitoral, e uma decisão recente pode gerar efeito imediato. Antes de concluir que alguém está com a ficha suja, é preciso conferir a hipótese legal, o órgão que decidiu, a data e o prazo. Nenhuma lista de terceiros substitui essa conferência. Consultar a Justiça Eleitoral na época do registro de candidatura é o caminho para saber como a regra se aplica ao caso.',
          'A Ficha Limpa também não é uma lista de culpados: ela é uma regra de elegibilidade, que decide quem pode concorrer, e não quem é inocente ou culpado. Uma pessoa inelegível pode ter sido absolvida em outras esferas, e uma pessoa elegível pode estar respondendo a processos graves. O eleitor pode usar a lei como informação, mas deve manter separados o julgamento jurídico e a avaliação política. Manter essa distinção evita tanto o linchamento público quanto a absolvição antecipada de quem responde a processos.',
        ],
      },
      {
        titulo: 'Onde consultar cada tipo de processo',
        paragrafos: [
          'Processos eleitorais são consultados na Justiça Eleitoral; processos criminais comuns, na Justiça Estadual ou Federal, conforme o caso; processos trabalhistas, na Justiça do Trabalho; e ações de improbidade, na Justiça competente pela matéria. Tribunais superiores têm seus próprios sistemas de consulta. O número do processo é a chave: com ele, qualquer pessoa acompanha partes, movimentações e decisões. Cada tribunal publica instruções de consulta, e a maioria dos sistemas é aberta e gratuita.',
          'Sem o número, a busca por nome pode gerar confusão com homônimos e resultados incompletos. Quando uma notícia fala em processo, procure os dados completos: tribunal, número, classe, partes e fase. Se a notícia não informa esses elementos, isso já é um sinal de alerta sobre a qualidade da informação. Fontes sérias permitem que o leitor confira o que foi publicado. A busca por nome pode ser útil como primeiro passo, mas nunca deve encerrar a verificação.',
          'Alguns processos tramitam em segredo de justiça, e o acesso público é limitado por lei. Nessas situações, a ausência de informação não significa ocultação nem culpa. Da mesma forma, o sigilo de um inquérito não é condenação. Respeitar os limites legais de acesso e distinguir sigilo de irregularidade faz parte de uma checagem honesta. O sigilo existe para proteger direitos, e sua existência não pode ser usada como atalho para conclusões.',
        ],
      },
      {
        titulo: 'Recursos, presunção de inocência e leitura de notícias',
        paragrafos: [
          'A Constituição garante a presunção de inocência: ninguém é considerado culpado antes do trânsito em julgado da condenação. Como as decisões podem ser alvo de recursos, uma condenação em primeira instância ou em órgão colegiado pode ser reformada, anulada ou confirmada depois. A linguagem correta importa: condenado tem significado diferente de réu, investigado e denunciado. No debate público, usar os termos com precisão é uma forma de respeito ao devido processo legal.',
          'Ao ler uma notícia sobre processo, confira se o título corresponde ao corpo do texto, se a decisão citada existe e se a data está clara. Notícias antigas costumam ser recicladas em época eleitoral sem avisar o leitor. Se o processo foi arquivado, extinto ou teve a condenação anulada, a versão atual é outra. Guardar link e data da consulta ajuda a não repetir informação velha. Notícia que não permite verificação é material de campanha, qualquer que seja a sua origem.',
          'Por fim, separe os planos. A Justiça decide sobre a lei; o eleitor decide sobre representação. Um candidato pode ser juridicamente elegível e politicamente questionável, e vice-versa. Usar processos como um dos critérios de voto é legítimo, desde que com informação completa, atualizada e sem transformar acusação em sentença. Uma análise justa pesa a fase processual, a natureza da acusação e a data dos fatos, sem transformar resumo em sentença.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Lei da Ficha Limpa (LC 135/2010)',
        paragrafos: [
          'A Lei Complementar 135/2010, publicada em 2010, alterou a Lei Complementar 64/1990 para ampliar as hipóteses de inelegibilidade. O texto oficial está disponível no site do Planalto, com a redação completa dos dispositivos. Antes de afirmar que alguém está inelegível ou que a Ficha Limpa não vale mais, confira o texto da lei e a decisão judicial do caso: a regra é objetiva, e cada situação concreta depende do enquadramento legal e do prazo.',
        ],
        fonte: { label: 'Planalto — Lei Complementar 135/2010', href: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/Lcp135.htm' },
      },
    ],
    faq: [
      {
        pergunta: 'Ter processo significa que a pessoa é culpada?',
        resposta: 'Não. Processo é uma disputa judicial em andamento, e a Constituição presume a inocência até o trânsito em julgado da condenação. Muitos processos terminam em absolvição, arquivamento ou extinção. Por isso, a pergunta certa não é se a pessoa tem processo, e sim qual processo, em que fase, com qual decisão e em que data.',
      },
      {
        pergunta: 'O que é trânsito em julgado?',
        resposta: 'É o momento em que a decisão não pode mais ser alterada por recursos ordinários previstos em lei. Até lá, a decisão pode ser reformada ou anulada. O trânsito em julgado é o marco que a Constituição usa para a presunção de inocência: antes dele, ninguém é formalmente considerado culpado. Confundir condenação recorrível com decisão final é um erro comum em debates eleitorais.',
      },
      {
        pergunta: 'Condenado por órgão colegiado pode ser candidato?',
        resposta: 'Depende. A Lei da Ficha Limpa prevê inelegibilidade para condenações em decisão colegiada em hipóteses específicas, com condições e prazos próprios, e há exceções e discussões jurídicas caso a caso. Além disso, a Justiça Eleitoral analisa cada registro de candidatura. A resposta segura é sempre a mesma: conferir a hipótese legal, a decisão, a data e o prazo antes de concluir.',
      },
      {
        pergunta: 'Onde consulto se alguém está inelegível?',
        resposta: 'A inelegibilidade é verificada no processo de registro de candidatura, julgado pela Justiça Eleitoral. O DivulgaCand, no site do TSE, mostra a situação de cada registro, incluindo recursos pendentes. Para condenações, a consulta é feita no tribunal que proferiu a decisão, com o número do processo. Listas prontas em redes sociais não substituem a consulta oficial atualizada.',
      },
      {
        pergunta: 'Devo descartar um candidato que tem processos?',
        resposta: 'Essa é uma decisão pessoal, mas faça-a com informação completa: natureza do processo, fase, tribunal, data e possibilidade de recurso. Uma acusação antiga arquivada tem peso diferente de uma condenação recente. O ideal é reunir os dados oficiais, comparar com outros critérios de avaliação e reconhecer que a informação judicial é um dos elementos, não o único.',
      },
    ],
    tabelas: [
      {
        titulo: 'Fases e termos de um processo',
        cabecalho: ['Termo', 'O que significa', 'O que não significa'],
        linhas: [
          ['Acusação', 'Afirmação de que alguém praticou algo', 'Prova ou condenação'],
          ['Investigação', 'Apuração de indícios', 'Culpa'],
          ['Denúncia ou queixa', 'Início formal da ação penal', 'Condenação'],
          ['Condenação', 'Decisão desfavorável', 'Decisão final, se ainda houver recurso'],
          ['Trânsito em julgado', 'Fim dos recursos ordinários', 'Fim de todas as discussões jurídicas possíveis'],
        ],
      },
    ],
  },
  {
    slug: 'como-funcionam-comissoes',
    novasSections: [
      {
        titulo: 'Os tipos de comissão e seus papéis',
        paragrafos: [
          'As comissões permanentes existem em todas as legislaturas e tratam de temas fixos, como Constituição e Justiça, Educação, Saúde, Segurança Pública, Meio Ambiente, Finanças e Fiscalização. As comissões especiais são criadas para analisar matérias pontuais, como uma proposta específica ou uma investigação determinada. Já as comissões mistas reúnem deputados e senadores, como a comissão que analisa o orçamento. A existência dessas divisões permite que cada tema seja analisado por parlamentares com alguma familiaridade com a área.',
          'A comissão parlamentar de inquérito, a CPI, é criada para investigar fato determinado, por prazo certo, e dispõe de poderes de investigação previstos na Constituição, como ouvir testemunhas e requisitar documentos. Ao final, apresenta relatório e pode sugerir providências a órgãos competentes, como o Ministério Público. CPI não julga nem condena: ela investiga e encaminha conclusões. O valor da CPI está na qualidade da apuração e no uso que as instituições fazem do relatório final.',
          'Cada tipo de comissão produz registros públicos: atas, pautas, pareceres, notas taquigráficas e vídeos. Saber diferenciar os tipos ajuda o eleitor a ler esses documentos: um parecer de comissão permanente tem significado diferente de um relatório final de CPI, e uma comissão especial pode aprovar um texto que depois ainda passará por outras etapas do processo legislativo. Esses documentos ficam disponíveis nos portais oficiais e permitem que o cidadão acompanhe a discussão sem intermediários.',
        ],
      },
      {
        titulo: 'Como acompanhar o trabalho das comissões',
        paragrafos: [
          'Os portais da Câmara e do Senado publicam a composição de cada comissão, a pauta das reuniões, os relatores designados e os resultados das votações. Acompanhar a pauta semanal é uma forma eficiente de saber o que será decidido e quem participa. Mesmo quem tem pouco tempo pode selecionar as comissões ligadas aos temas que mais lhe interessam e acompanhar apenas elas. Definir um dia da semana para olhar as pautas é um hábito simples que rende uma visão realista do Congresso.',
          'As reuniões de comissão costumam ser abertas e transmitidas, e as audiências públicas podem ser acompanhadas ao vivo ou em gravação. Requerimentos de audiência apresentados por um parlamentar indicam quais temas ele quer debater; os convidados indicam quais vozes ele considera relevantes. Esse material é um retrato valioso do mandato, muitas vezes mais revelador do que discursos de plenário. A participação de especialistas, governo e sociedade civil nessas audiências ajuda a qualificar a decisão final.',
          'Para aprofundar, leia os pareceres dos relatores: eles explicam o motivo da recomendação, citam o texto analisado e registram emendas. Comparar o parecer com o texto final votado mostra quanto do relatório foi aceito. Esse percurso documenta influência real, algo que listas de projetos apresentados não mostram e que costuma escapar das avaliações superficiais. Relatorias bem conduzidas aparecem na qualidade do texto final, e não apenas na quantidade de reuniões realizadas.',
        ],
      },
      {
        titulo: 'Comissões e o resultado final das propostas',
        paragrafos: [
          'Em alguns casos, a comissão tem a palavra final: matérias com tramitação conclusiva podem ser aprovadas sem passar pelo plenário, salvo recurso, e no Senado há matérias com tramitação terminativa. Isso significa que decisões importantes podem ser tomadas em reuniões com pouca visibilidade, reforçando a importância de acompanhar as comissões e não apenas o plenário. A tramitação de cada matéria pode ser conferida na ficha oficial, que informa se houve recurso e qual a próxima etapa.',
          'Na maioria dos casos, porém, a comissão é uma etapa: a proposta ainda precisa de votação no plenário da casa e, depois, na outra casa. Um projeto aprovado em comissão com alterações pode ser rejeitado em plenário, e um parecer contrário pode ser vencido. O resultado final depende do conjunto do processo, e cada etapa deixa registros que o eleitor pode conferir. O acompanhamento completo, da comissão à sanção, é o que diferencia leitura de processo de leitura de manchete.',
          'Para o eleitor, a consequência prática é clara: avaliar um parlamentar olhando apenas o plenário é incompleto. Quem trabalha bem em comissão pode aprovar políticas relevantes com pouco holofote; quem só aparece em plenário pode ter atuação rala nos bastidores. Combinar os dois retratos é a leitura mais próxima do mandato real. Antes de concluir sobre um mandato, verifique os dois espaços de atuação nos registros oficiais de cada casa.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Consulta de comissões no portal da Câmara',
        paragrafos: [
          'O portal da Câmara permite consultar as comissões permanentes e especiais, com composição, pautas, atas, pareceres e notícias de cada colegiado. É possível localizar a comissão por tema e verificar quais parlamentares participam e quais propostas estão na pauta. Para o eleitor, a consulta transforma perguntas abstratas sobre atuação em respostas documentadas: quem relata, quem requer audiência e quem vota em cada matéria aparece nos registros oficiais.',
        ],
        fonte: { label: 'Câmara dos Deputados', href: 'https://www.camara.leg.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'O que é uma CPI?',
        resposta: 'É a comissão parlamentar de inquérito, criada para investigar fato determinado, com prazo certo e poderes de investigação previstos na Constituição, como ouvir testemunhas e requisitar documentos. Ao final, apresenta relatório e pode sugerir providências a órgãos como o Ministério Público. CPI não condena nem julga; ela apura e encaminha conclusões às autoridades competentes.',
      },
      {
        pergunta: 'Audiências públicas são abertas ao público?',
        resposta: 'Em geral, sim: as reuniões de comissão e as audiências públicas costumam ser públicas e transmitidas pelos canais oficiais, e qualquer cidadão pode assistir. A participação como expositor, porém, depende de convite ou requerimento aprovado. Acompanhar audiências é uma forma acessível de ver o debate técnico antes das votações e de observar quem o parlamentar ouve.',
      },
      {
        pergunta: 'O que é comissão mista?',
        resposta: 'É um colegiado formado por deputados e senadores para tratar de temas comuns às duas casas. O exemplo mais conhecido é a comissão mista de orçamento, que analisa o projeto de lei orçamentária antes da votação no Congresso. Decisões de comissão mista envolvem as duas casas, o que reforça o caráter conjunto do processo orçamentário e de outros temas compartilhados.',
      },
      {
        pergunta: 'Como saber de qual comissão um parlamentar participa?',
        resposta: 'As páginas oficiais da Câmara e do Senado informam a composição de cada comissão e o perfil de cada parlamentar, com o histórico de participação. No perfil do deputado ou senador, é possível ver de quais comissões faz parte, quais relatorias assumiu e quantas vezes compareceu. Esses registros públicos são o ponto de partida para avaliar a atuação temática.',
      },
      {
        pergunta: 'Comissão pode aprovar um projeto sozinha?',
        resposta: 'Em alguns casos, sim. Matérias com tramitação conclusiva podem ser aprovadas pela comissão sem ida ao plenário, salvo recurso; no Senado, há a tramitação terminativa com lógica parecida. Na maioria dos casos, porém, a comissão é uma etapa intermediária, e o projeto ainda será votado no plenário e na outra casa. O regimento de cada casa define o rito.',
      },
    ],
    tabelas: [
      {
        titulo: 'Tipos de comissão no Congresso',
        cabecalho: ['Tipo', 'Composição', 'Função principal'],
        linhas: [
          ['Permanente', 'Deputados ou senadores, por tema', 'Analisar matérias da sua área ao longo da legislatura'],
          ['Especial', 'Deputados ou senadores, para tarefa pontual', 'Examinar proposta ou assunto específico'],
          ['Mista', 'Deputados e senadores', 'Tratar de temas comuns, como o orçamento'],
          ['CPI', 'Deputados ou senadores', 'Investigar fato determinado, por prazo certo'],
        ],
      },
    ],
  },
  {
    slug: 'como-ler-projetos-de-lei',
    novasSections: [
      {
        titulo: 'Os tipos de proposição e suas regras',
        paragrafos: [
          'Um projeto de lei ordinária (PL) trata de temas comuns e, em geral, é aprovado por maioria simples dos presentes. Um projeto de lei complementar (PLP) trata de matérias que a Constituição reserva à lei complementar e exige maioria absoluta. Já a proposta de emenda à Constituição (PEC) altera o texto constitucional e exige aprovação por três quintos dos membros, em dois turnos, em cada casa. Essas diferenças de quórum explicam por que algumas matérias avançam rápido e outras exigem longas negociações.',
          'A medida provisória (MP) é editada pelo presidente da República com força de lei, nos casos previstos no artigo 62 da Constituição, e precisa ser apreciada pelo Congresso em prazo determinado: sessenta dias, prorrogáveis uma única vez por igual período. Ela começa pela Câmara, passa por comissão mista e, se não for votada a tempo, perde eficácia. Entender essa diferença evita cobrar da pessoa errada. Acompanhar o prazo de uma medida provisória é essencial, porque o tempo é parte da disputa política.',
          'Há ainda proposições de natureza acessória: requerimentos de informação, de urgência, de audiência pública, indicações e projetos de resolução. Elas não criam leis, mas movimentam o processo e revelam estratégia. Saber identificar o tipo de proposição ajuda a ler a pauta do Congresso sem confundir um pedido de informação com uma mudança de lei ou um convite de debate. Requerimentos bem usados são instrumentos de fiscalização e de pressão, e merecem a mesma atenção que os projetos.',
        ],
      },
      {
        titulo: 'Da aprovação à sanção: o caminho completo',
        paragrafos: [
          'Aprovado em uma casa, o projeto segue para a outra, onde pode ser aprovado como está, alterado ou rejeitado. Se houver alterações, o texto volta para a casa de origem, que decide se aceita as mudanças. Aprovado nas duas casas, o projeto vai à sanção do presidente da República, que pode sancionar ou vetar, total ou parcialmente, por inconstitucionalidade ou contrariedade ao interesse público. Cada ida e volta entre as casas altera o texto e o equilíbrio político da proposta.',
          'O veto não encerra o assunto: o Congresso analisa a decisão em sessão conjunta e pode mantê-la ou derrubá-la com o voto da maioria absoluta de deputados e senadores. Se o veto cair, o texto vira lei. Esse percurso mostra por que a aprovação na Câmara não significa lei pronta: ainda faltam o Senado, a sanção e, em caso de veto, a análise do Congresso. O resultado do veto define se a lei nasce com o texto do Congresso ou com o texto ajustado pelo Executivo.',
          'Depois de sancionada, a lei ainda depende de regulamentação e de execução. Algumas leis dependem de decreto, portaria ou norma do órgão responsável para produzir efeito completo, e muitas dependem de recursos no orçamento. Acompanhar a lei até a implementação é a etapa final de uma leitura responsável, e é exatamente onde muitos anúncios políticos param. Entre a sanção e o efeito prático pode haver anos, e acompanhar essa distância é parte da fiscalização.',
        ],
      },
      {
        titulo: 'Leitura crítica da justificativa',
        paragrafos: [
          'A justificativa de um projeto explica por que o autor propõe a mudança. Ela costuma citar dados, casos e objetivos, mas é um texto argumentativo: pode exagerar benefícios, omitir custos e generalizar experiências. Ao ler, confira se os números citados têm fonte, se os exemplos são representativos e se a proposta realmente resolve o problema descrito, em vez de apenas dar nome a uma intenção. Uma justificativa honesta reconhece custos e riscos; uma frágil apresenta apenas benefícios.',
          'Também vale perguntar quem é afetado: a proposta beneficia um grupo específico, a população em geral, empresas ou entes públicos? Quem arca com os custos? Existe efeito sobre orçamento, sobre outras leis ou sobre direitos? Essas perguntas transformam a leitura de um texto técnico em análise de política pública, que é o que o eleitor realmente precisa fazer. Perguntas como essas podem ser feitas por qualquer pessoa, sem formação jurídica, e melhoram muito a leitura do texto.',
          'Por fim, compare a proposta com a atuação declarada do autor. Um parlamentar que discursa sobre um tema e nunca apresenta ou apoia projetos relacionados pode estar apenas surfando a pauta. O conjunto de proposições, votos e relatorias forma um retrato mais fiel do que qualquer discurso isolado, e tudo isso é público e verificável nas páginas oficiais. O histórico público de proposições e votos é a base mais honesta para essa comparação.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Acompanhamento de proposições no portal da Câmara',
        paragrafos: [
          'O portal da Câmara permite acompanhar qualquer proposição pelo número: a ficha de tramitação mostra datas, comissões, pareceres, votos e o envio ao Senado, quando ocorre. Também é possível buscar projetos por autor, tema ou situação. Para o eleitor, a ficha de tramitação é a resposta direta a perguntas como o projeto andou, quem relatou e em que versão foi votado, sem depender de resumos de terceiros.',
        ],
        fonte: { label: 'Câmara dos Deputados', href: 'https://www.camara.leg.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'O que é uma PEC?',
        resposta: 'É a proposta de emenda à Constituição, usada para alterar o texto constitucional. Exige aprovação por três quintos dos membros de cada casa, em dois turnos de votação. PECs tratam de mudanças estruturais, e por isso têm quórum mais rigoroso que projetos de lei comuns. Uma PEC rejeitada não pode ser reapresentada na mesma sessão legislativa, conforme a Constituição.',
      },
      {
        pergunta: 'O que é medida provisória?',
        resposta: 'É um ato do presidente da República com força de lei, previsto no artigo 62 da Constituição, para casos de relevância e urgência. Ela vale imediatamente, mas precisa ser aprovada pelo Congresso em até sessenta dias, prorrogáveis uma vez por igual período, começando pela Câmara. Se não for votada a tempo, perde a eficácia. A tramitação de MPs é um dos pontos mais acompanhados do processo legislativo.',
      },
      {
        pergunta: 'Qual a diferença entre sanção e veto?',
        resposta: 'Sanção é a concordância do presidente com o projeto aprovado pelo Congresso, que então se torna lei. Veto é a recusa, total ou parcial, por inconstitucionalidade ou contrariedade ao interesse público. O veto não é definitivo: o Congresso pode derrubá-lo em sessão conjunta com o voto da maioria absoluta de deputados e senadores, fazendo o texto virar lei mesmo contra a vontade do Executivo.',
      },
      {
        pergunta: 'Projeto aprovado na Câmara já é lei?',
        resposta: 'Não. A aprovação na Câmara é apenas uma etapa. O projeto precisa ser analisado pelo Senado (se começou na Câmara), depois sancionado ou vetado pelo presidente, e, em caso de veto, a decisão ainda passa pelo Congresso. Cada etapa pode alterar o texto. Por isso, quando alguém diz que virou lei, confira se o processo completo realmente terminou.',
      },
      {
        pergunta: 'O que é projeto de lei complementar?',
        resposta: 'É a proposição usada para matérias que a Constituição reserva à lei complementar, como regras de organização do sistema tributário e outras áreas específicas. A aprovação exige maioria absoluta dos membros da casa, mais rigorosa que a maioria simples das leis ordinárias. A sigla PLP aparece na numeração, e a diferença de quórum explica por que algumas matérias demoram mais para avançar.',
      },
    ],
    tabelas: [
      {
        titulo: 'Tipos de proposição em resumo',
        cabecalho: ['Tipo', 'O que altera', 'Exigência de aprovação'],
        linhas: [
          ['PL (projeto de lei)', 'Leis ordinárias', 'Maioria simples dos presentes'],
          ['PLP (projeto de lei complementar)', 'Matérias de lei complementar', 'Maioria absoluta dos membros'],
          ['PEC (proposta de emenda à Constituição)', 'Texto da Constituição', 'Três quintos, em dois turnos, em cada casa'],
          ['MP (medida provisória)', 'Força de lei, editada pelo presidente', 'Apreciação pelo Congresso em prazo constitucional'],
          ['Requerimentos e indicações', 'Atos internos e pedidos', 'Regras regimentais de cada casa'],
        ],
      },
    ],
  },
  {
    slug: 'como-entender-orcamento-emendas',
    novasSections: [
      {
        titulo: 'Os tipos de emenda e quem apresenta cada um',
        paragrafos: [
          'Emendas parlamentares são propostas de alteração do orçamento apresentadas por deputados e senadores. As emendas individuais são apresentadas por um parlamentar; as de bancada, pelo conjunto dos parlamentares de um estado; as de comissão, pelos colegiados temáticos; e as de relator, pelo relator do orçamento, com regras próprias. Cada tipo tem limites, requisitos e finalidades definidos na legislação orçamentária. Conhecer a diferença entre eles é o primeiro passo para não misturar responsabilidades na hora de cobrar.',
          'A distinção importa para a fiscalização: saber quem apresentou a emenda, para qual programa e com qual valor ajuda a avaliar a atuação de cada parlamentar. Uma emenda individual pode ser acompanhada do nome do autor; uma de bancada envolve decisão coletiva, e a atribuição de mérito a um único nome pode ser imprecisa. Ler o documento da emenda evita esse tipo de erro. A numeração oficial de cada emenda permite rastrear o autor e o objeto em sistemas públicos.',
          'Também é importante diferenciar emenda de execução: a emenda indica a destinação, mas o recurso precisa ser empenhado, liquidado e pago, etapas que dependem do Executivo e das regras de cada programa. Uma emenda apresentada pode não ser executada, e uma executada pode não ter sido concluída. O anúncio de recurso garantido exige conferência do ciclo completo. O ciclo completo, do empenho ao pagamento, é o que separa intenção de resultado no orçamento público.',
        ],
      },
      {
        titulo: 'O orçamento impositivo e a EC 86/2015',
        paragrafos: [
          'Até 2015, a execução das emendas dependia de decisão do Executivo, e muitos recursos anunciados nunca saíam do papel. A Emenda Constitucional 86/2015 mudou esse quadro ao tornar obrigatória a execução de parte das emendas individuais, dentro de limites e regras definidos em lei. Esse mecanismo ficou conhecido como orçamento impositivo e foi ampliado e ajustado por normas posteriores. A mudança não eliminou a negociação política, mas criou instrumentos objetivos de cobrança que o eleitor pode usar.',
          'O impositivo não significa que todo recurso chega automaticamente à ponta: existem limites globais, regras de contingenciamento e condições específicas para áreas como saúde. Mesmo obrigatória, a execução passa por etapas administrativas, e obras podem atrasar por problemas técnicos ou de contratação. O avanço é real, mas a entrega continua dependendo de acompanhamento constante. Acompanhar a fase da execução é a única forma de saber se a emenda virou serviço para a população.',
          'Para o eleitor, a EC 86/2015 mudou a pergunta possível: hoje é razoável cobrar do parlamentar o número da emenda, o valor, o órgão executor e a fase em que o recurso está. Antes da impositividade, essa cobrança era menos objetiva. Saber o que mudou ajuda a separar promessa possível de anúncio de ocasião feito apenas para impressionar. Perguntas como qual emenda, qual valor e qual fase transformam cobrança genérica em fiscalização concreta.',
        ],
      },
      {
        titulo: 'Perguntas que organizam a fiscalização do orçamento',
        paragrafos: [
          'Qualquer cidadão pode fiscalizar o orçamento com poucas perguntas: qual programa recebeu o recurso? Qual órgão executa? Qual município ou instituição é beneficiário? Quanto foi empenhado, liquidado e pago? Em que data? Essas respostas aparecem nos portais de transparência do Congresso e do governo federal, e muitas delas podem ser consultadas sem cadastro. Anotar as respostas com data e link permite comparar a evolução da execução ao longo do tempo e detectar promessas sem lastro.',
          'A qualidade da destinação também merece pergunta: o recurso atende necessidade pública, tem critério de escolha e produz resultado verificável? Concentração em fornecedores ou entidades ligadas a aliados, ausência de prestação de contas e projetos parados são sinais que pedem atenção. O oposto, destinação difusa sem explicação, também merece questionamento. Critérios claros de escolha, prestação de contas regular e resultado verificável são o mínimo que se espera de qualquer destinação de recursos públicos.',
          'Por fim, acompanhe o orçamento além da campanha: a execução se estende por meses e anos, e a fiscalização cidadã é mais eficaz quando contínua. Guardar links, anotar datas e comparar anúncio com pagamento efetivo transforma indignação momentânea em controle permanente. O orçamento público é o documento onde as prioridades de um país aparecem sem retórica. O cidadão que acompanha o orçamento fora da campanha transforma a própria experiência em instrumento de controle social.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'O orçamento no portal do Senado',
        paragrafos: [
          'O Senado publica conteúdo institucional sobre o orçamento público e a tramitação das leis orçamentárias, com materiais sobre o ciclo que envolve o plano plurianual, a lei de diretrizes e a lei orçamentária anual. O material ajuda o cidadão a entender em que etapa cada tema é decidido e onde procurar os documentos. Para quem quer fiscalizar, começar pelo conteúdo institucional reduz a curva de aprendizado e evita depender de explicações com interesses próprios.',
        ],
        fonte: { label: 'Senado Federal', href: 'https://www12.senado.leg.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'O que é orçamento impositivo?',
        resposta: 'É o regime em que parte das emendas parlamentares passou a ter execução obrigatória, ou seja, o governo não pode simplesmente deixar de gastar o recurso. No Brasil, a Emenda Constitucional 86/2015 criou essa obrigatoriedade para emendas individuais, com limites e regras definidos em lei. A obrigação vale para a execução, mas a entrega final da obra ou serviço ainda depende de acompanhamento.',
      },
      {
        pergunta: 'Qual a diferença entre emenda individual e de bancada?',
        resposta: 'A emenda individual é apresentada por um parlamentar, com valor e regras próprios, e permite acompanhamento nominal. A emenda de bancada é apresentada pelo conjunto dos parlamentares de um estado ou do Distrito Federal, com decisão coletiva sobre a destinação. Na prática, a individual permite cobrar um nome; a de bancada exige observar como o grupo decidiu.',
      },
      {
        pergunta: 'Emenda aprovada vira obra entregue?',
        resposta: 'Não automaticamente. A emenda indica a destinação de recursos, mas o caminho inclui empenho, contratação, execução, fiscalização e pagamento. Obras podem atrasar, valores podem ser ajustados e projetos podem nem sair do papel. Por isso, o acompanhamento deve ir até a entrega: consultar a fase da execução e o resultado concreto é mais confiável do que confiar no anúncio.',
      },
      {
        pergunta: 'Onde ver quanto um parlamentar destinou?',
        resposta: 'Os portais de transparência do Congresso Nacional e do governo federal publicam informações sobre emendas, com autor, valor, beneficiário e fase de execução. Os dados também aparecem em bases abertas e sistemas de orçamento. Ao consultar, registre a data, porque a execução muda com frequência. Comparar anúncios de campanha com os registros oficiais é um bom teste de coerência.',
      },
      {
        pergunta: 'O que é empenho?',
        resposta: 'É a primeira etapa formal da despesa pública: a reserva de recursos para pagar uma despesa prevista, registrada em documento próprio. Depois vêm a liquidação, quando se confirma que o bem ou serviço foi entregue, e o pagamento. Um valor empenhado ainda não é dinheiro pago. Entender essa cadeia evita tratar anúncio de empenho como entrega concluída.',
      },
    ],
    tabelas: [
      {
        titulo: 'Tipos de emenda parlamentar',
        cabecalho: ['Tipo', 'Quem apresenta', 'Característica geral'],
        linhas: [
          ['Individual', 'Um deputado ou senador', 'Permite acompanhamento nominal; parte tem execução obrigatória'],
          ['De bancada', 'Parlamentares de um estado ou do DF', 'Decisão coletiva sobre destinações'],
          ['De comissão', 'Comissões temáticas', 'Vinculada às áreas de atuação do colegiado'],
          ['De relator', 'Relator do orçamento', 'Regras e limites próprios da legislação orçamentária'],
        ],
      },
    ],
  },
  {
    slug: 'como-conferir-fontes-oficiais',
    novasSections: [
      {
        titulo: 'A Lei de Acesso à Informação é sua aliada',
        paragrafos: [
          'A Lei 12.527/2011, a Lei de Acesso à Informação, garante a qualquer pessoa o direito de pedir informações públicas a órgãos e entidades, sem necessidade de justificar o motivo. O pedido pode ser feito por canais oficiais, e a resposta deve vir em prazo definido em lei, prorrogável com justificativa. Se o pedido for negado, há possibilidade de recurso na própria instituição e nas instâncias de controle. O direito de acesso é gratuito e vale para qualquer informação pública, independentemente do motivo do pedido.',
          'A LAI tem exceções previstas em lei, como informações pessoais, segredos de justiça e temas que envolvem segurança nacional, mas a regra é a publicidade: a negativa precisa ser fundamentada e indicar o caminho do recurso. Para o eleitor, a lei transforma dúvidas sobre gastos, contratos e processos em pedidos concretos, e o registro do pedido pode ser usado depois em uma fiscalização. O cidadão que conhece as regras de transparência fica menos vulnerável a versões alarmistas sobre segredos inexistentes.',
          'Antes de pedir, porém, procure a informação nas páginas públicas: muitos dados já estão publicados em portais de transparência e bases abertas, e a consulta direta costuma ser mais rápida. O pedido via LAI é o próximo passo quando a informação não está disponível, está incompleta ou foi negada. Conhecer os dois caminhos torna a checagem mais eficiente e menos dependente de intermediários. A combinação de busca direta e pedido formal cobre quase todas as necessidades de verificação do eleitor comum.',
        ],
      },
      {
        titulo: 'Bases de dados abertos: o que são e como usar',
        paragrafos: [
          'Dados abertos são informações publicadas em formatos legíveis por máquina, como CSV e JSON, que qualquer pessoa pode baixar e analisar. A Câmara dos Deputados mantém um portal desse tipo, com bases sobre proposições, votações, parlamentares e despesas, e outros órgãos seguem padrão semelhante. Para o cidadão, as bases permitem cruzar informações que as páginas de consulta individual não mostram. A publicação em formato aberto é um compromisso institucional com a transparência que facilita a fiscalização cidadã.',
          'Usar dados abertos exige cuidado com a interpretação: campos com nomes técnicos, períodos diferentes e atualizações parciais podem gerar conclusões erradas. Ao analisar, anote a data do download, o filtro usado e a definição de cada campo. Uma análise reproduzível vale mais do que um gráfico bonito sem origem, e a transparência do método protege quem faz a análise de críticas justas. O erro mais comum é comparar bases de períodos diferentes sem ajustar os critérios.',
          'Os portais também documentam o uso: páginas de ajuda, dicionários de dados e exemplos de consulta ajudam iniciantes. Quem não programa pode usar planilhas para filtrar e ordenar as bases. O objetivo não é virar cientista de dados, e sim conseguir responder perguntas simples, como quantas vezes um parlamentar votou em determinado tema ou quanto gastou em um período. Começar pela documentação evita horas perdidas e conclusões apressadas sobre dados mal compreendidos.',
        ],
      },
      {
        titulo: 'Monte seu próprio caderno de verificação',
        paragrafos: [
          'Um caderno de fontes pode ser uma planilha, um documento ou simplesmente anotações organizadas. Para cada informação importante, registre: o que diz, quem publicou, o link, a data da consulta e um trecho copiado. Esse hábito transforma a checagem em processo contínuo e facilita voltar aos dados quando surgirem versões conflitantes ou novas perguntas. O caderno também ajuda a mostrar a outra pessoa como você chegou àquela conclusão, com o caminho percorrido.',
          'Na dúvida entre duas fontes, procure a hierarquia: documento oficial, registro institucional, notícia de veículo com jornalistas identificados, opinião de terceiros. Fontes secundárias podem ser boas, mas a decisão importante merece o dado primário. Se o dado primário não for encontrável, a afirmação perde força, independentemente de quem a divulgou. Quando o dado primário não existe, a informação deve ser apresentada com essa ressalva explícita, e não como fato consumado e definitivo.',
          'Por fim, atualize o caderno: dados mudam, processos avançam e páginas são reformuladas. Revisitar as informações perto da eleição evita repetir versões antigas. O esforço parece pequeno quando comparado ao dano de uma acusação falsa compartilhada como verdade, e o caderno de fontes é a ferramenta mais barata de defesa contra a desinformação. Revisar o próprio material perto da eleição é a última etapa de uma checagem responsável e evita repetir erros antigos.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Lei de Acesso à Informação (Lei 12.527/2011)',
        paragrafos: [
          'A Lei 12.527/2011 estabelece os procedimentos para garantir o acesso a informações públicas no Brasil, valendo para os três poderes e para as três esferas de governo. O texto oficial está disponível no site do Planalto. Antes de aceitar que um dado é secreto ou que ninguém pode saber, vale ler a lei e verificar as hipóteses legais de restrição: a regra geral é a publicidade, e a negativa precisa de fundamentação.',
        ],
        fonte: { label: 'Planalto — Lei 12.527/2011', href: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm' },
      },
    ],
    faq: [
      {
        pergunta: 'Qualquer pessoa pode pedir informação pública?',
        resposta: 'Sim. A Lei de Acesso à Informação garante o direito a qualquer pessoa, física ou jurídica, sem exigir justificativa. O pedido é feito por canal oficial do órgão, com identificação do solicitante, e deve ser respondido em prazo legal, prorrogável com justificativa. O exercício desse direito não depende de advogado, cadastro especial ou vínculo com a instituição.',
      },
      {
        pergunta: 'O órgão pode negar um pedido de informação?',
        resposta: 'Pode, mas somente nas hipóteses previstas em lei, como informações pessoais, segredos de justiça ou temas sensíveis à segurança, e a negativa precisa ser fundamentada. Além disso, deve indicar o caminho do recurso, que pode ser apresentado à própria instituição ou às autoridades de controle. Negativa sem fundamento legal pode ser questionada.',
      },
      {
        pergunta: 'O que é dado primário?',
        resposta: 'É o registro original de um fato: o documento, a votação, o empenho, o processo, a ata. Dado secundário é a versão contada por terceiros, como notícias e resumos. Para decisões importantes, o ideal é chegar ao primário. Se uma notícia não informa a fonte primária, ela pode ainda ser útil, mas deve ser tratada como ponto de partida, não como prova.',
      },
      {
        pergunta: 'Fonte oficial é sempre verdadeira?',
        resposta: 'Fonte oficial é a referência mais forte disponível, mas não é infalível: registros podem conter erros de digitação, atrasos de atualização e divergências entre sistemas. O procedimento seguro é conferir datas, documentos e versões, e cruzar com outras fontes quando a informação for decisiva. Oficial indica origem institucional, e não garantia absoluta de correção.',
      },
      {
        pergunta: 'O que é formato aberto?',
        resposta: 'É um formato de arquivo que qualquer programa consegue ler sem depender de software proprietário, como CSV e JSON, ao contrário de formatos fechados. Dados em formato aberto facilitam download, filtro e análise por qualquer cidadão. Quando um portal disponibiliza bases abertas, a fiscalização deixa de depender de telas de consulta limitadas e ganha possibilidades de cruzamento.',
      },
    ],
    tabelas: [
      {
        titulo: 'Qual fonte consultar para cada pergunta',
        cabecalho: ['Pergunta', 'Fonte recomendada'],
        linhas: [
          ['Como um deputado votou?', 'Portal da Câmara e dados abertos da Câmara'],
          ['O que um senador relatou?', 'Portal do Senado'],
          ['Qual a situação da candidatura?', 'DivulgaCand, no site do TSE'],
          ['Existe processo contra alguém?', 'Tribunais competentes, com número do processo'],
          ['Qual o texto oficial de uma lei?', 'Site do Planalto'],
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-saude',
    novasSections: [
      {
        titulo: 'Vacinação e prevenção valem mais que hospital',
        paragrafos: [
          'A vacinação é uma das políticas de saúde com melhor custo-benefício conhecido: previne doenças, reduz internações e salva vidas. O Brasil mantém um programa nacional de imunização que define calendário e distribui vacinas gratuitamente pelo SUS. Ao avaliar propostas de saúde, pergunte como o candidato pretende fortalecer a cobertura vacinal, combater a hesitação e garantir estoques, logística e informação de qualidade. Perguntar sobre vacinação é uma das formas mais diretas de testar se a proposta de saúde tem base concreta.',
          'Prevenção vai além da vacina: inclui acompanhamento de gestantes, saúde da criança, prevenção de doenças crônicas, alimentação adequada e promoção de atividade física. Políticas preventivas são menos visíveis que inaugurações, mas reduzem a pressão sobre hospitais ao longo do tempo. Uma proposta de saúde que ignora prevenção costuma tratar o sintoma e não a causa, com custo maior para o sistema e para o paciente. No orçamento da saúde, o investimento em prevenção costuma disputar espaço com o custeio de hospitais, e a escolha revela prioridades.',
          'Ao cobrar resultados, use indicadores: cobertura vacinal, mortalidade infantil, detecção precoce de doenças, taxas de internação evitável. Esses números existem e são públicos, o que permite comparar municípios, estados e períodos. Uma campanha pode prometer saúde para todos sem dizer como; uma proposta séria explica qual indicador pretende melhorar, com qual instrumento e em quanto tempo. Números públicos, comparados ao longo do tempo, mostram se o discurso se transforma em melhoria mensurável.',
        ],
      },
      {
        titulo: 'Medicamentos: acesso vai além de remédio grátis',
        paragrafos: [
          'O acesso a medicamentos é um dos maiores desafios do SUS: envolve incorporação de novos tratamentos, compras públicas, distribuição, programas de dispensação e financiamento. Promessas de remédio para todos esbarram em custo, evidência científica e orçamento. Uma proposta séria explica como o novo medicamento será incorporado, financiado e distribuído sem desorganizar o resto do sistema. O debate sobre medicamentos é também um debate sobre quem decide o que entra no sistema e com que rapidez.',
          'A fila de medicamentos de alto custo, por exemplo, pode ter causas diferentes: incorporação pendente, falta de registro, problema de compra ou regulação estadual. O eleitor pode perguntar qual gargalo a proposta ataca. A judicialização, quando pacientes recorrem à Justiça para obter tratamento, é consequência desses gargalos e tema constante de debate sobre políticas de saúde e sobre o papel de cada esfera de governo. Propostas que prometem resolver tudo sem nomear o gargalo costumam esconder a falta de diagnóstico.',
          'Ao avaliar um parlamentar, veja se ele atua em temas de regulação sanitária, incorporação de tecnologias e financiamento do SUS, e não apenas em casos individuais de divulgação. Leis, emendas e fiscalização nesses temas têm efeito coletivo muito maior do que a entrega pontual de medicamento anunciada em campanha, embora esta também tenha seu valor simbólico para quem espera na fila. A atuação legislativa em saúde raramente aparece em propaganda, mas define o funcionamento do sistema por décadas.',
        ],
      },
      {
        titulo: 'Saúde mental e doenças crônicas precisam de cuidado contínuo',
        paragrafos: [
          'Saúde mental virou pauta central: depressão, ansiedade e sofrimento psíquico afetam todas as idades e sobrecarregam a rede pública. O SUS conta com uma rede de atenção psicossocial, com serviços de diferentes portes, mas a cobertura é desigual entre regiões. Propostas sérias discutem ampliação de equipes, cuidado territorial e articulação com escolas, assistência social e mercado de trabalho. A comparação entre discurso e orçamento é particularmente reveladora nesse tema, onde a demanda cresce mais rápido que a estrutura.',
          'Doenças crônicas, como diabetes e hipertensão, exigem acompanhamento contínuo, medicamentos regulares e educação em saúde. Sem esse cuidado, geram complicações caras e evitáveis, como amputações, cegueira e internações de urgência. A atenção básica é o espaço natural desse acompanhamento, o que reforça a importância de avaliar propostas que fortalecem postos e equipes, e não apenas hospitais de grande porte. No debate eleitoral, perguntar como o candidato pretende cuidar de quem convive com doença crônica testa a seriedade da proposta.',
          'Ao ouvir promessas sobre saúde mental, pergunte pela rede: haverá mais equipes, mais vagas em serviços especializados, mais apoio às famílias, mais integração com escolas? Números de atendimento contam parte da história; continuidade do cuidado conta outra. O discurso que reduz saúde mental a acolhimento sem estrutura pode ser bonito e pouco eficaz na vida real das pessoas que precisam de tratamento. A pergunta final é sempre a mesma: o que muda na vida de quem precisa de cuidado hoje?',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Dados de saúde e a LGPD',
        paragrafos: [
          'A Lei 13.709/2018, a LGPD, trata os dados de saúde como dados pessoais sensíveis, o que impõe cuidados especiais a hospitais, planos, aplicativos e pesquisas. Em um momento em que prontuários eletrônicos e telessaúde avançam, a proteção desses dados é parte da qualidade do serviço público de saúde. Conhecer os princípios da lei ajuda o eleitor a cobrar segurança no tratamento de informações, sem abrir mão do uso legítimo dos dados para políticas de saúde.',
        ],
        fonte: { label: 'Planalto — Lei 13.709/2018', href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm' },
      },
    ],
    faq: [
      {
        pergunta: 'O SUS é gratuito para todos?',
        resposta: 'Sim, na regra geral. O Sistema Único de Saúde é público e universal: o atendimento é gratuito para toda a população, independentemente de contribuição, e a Constituição o define como direito de todos e dever do Estado. A gratuidade cobre desde a atenção básica até procedimentos de alta complexidade, embora a qualidade e o acesso variem muito entre regiões.',
      },
      {
        pergunta: 'Parlamentar pode abrir um hospital?',
        resposta: 'Não diretamente. Deputados e senadores não administram unidades de saúde, que são geridas por prefeituras, governos estaduais e o Ministério da Saúde, conforme a esfera. O parlamentar atua por leis, orçamento, emendas e fiscalização: pode destinar recursos, cobrar execução e aprovar políticas nacionais. Cobrar a abertura de hospital do parlamentar errado é um erro comum de avaliação.',
      },
      {
        pergunta: 'O que é atenção básica?',
        resposta: 'É o nível de saúde mais próximo da população: unidades básicas, equipes de saúde da família, vacinação, pré-natal, acompanhamento de doenças crônicas e prevenção. É considerada a porta de entrada do SUS e o nível com maior capacidade de evitar que problemas simples virem casos graves. Fortalecer a atenção básica costuma ser a política de saúde com melhor relação entre custo e resultado.',
      },
      {
        pergunta: 'Como saber se uma emenda de saúde foi executada?',
        resposta: 'Consulte os portais de transparência e os sistemas de orçamento, onde é possível acompanhar empenho, liquidação e pagamento das emendas, com beneficiário e objeto. A execução pode demorar e nem sempre é concluída. Comparar o anúncio da emenda com o registro oficial da fase atual é o método mais direto de separar recurso destinado de recurso efetivamente aplicado.',
      },
      {
        pergunta: 'Vacinação é obrigatória no Brasil?',
        resposta: 'O país tem um programa nacional de imunização que define o calendário de vacinas, e alguns estados e municípios exigem comprovação de vacinação para matrícula escolar ou outros fins. A obrigatoriedade é definida por lei e já foi tema de decisões judiciais em casos concretos. No debate eleitoral, a pergunta mais útil é como o candidato pretende ampliar cobertura e confiança na vacinação.',
      },
    ],
    tabelas: [
      {
        titulo: 'Níveis de atenção no SUS',
        cabecalho: ['Nível', 'O que oferece', 'Onde ocorre'],
        linhas: [
          ['Atenção básica', 'Prevenção, vacinação, acompanhamento contínuo', 'Unidades básicas e equipes de saúde da família'],
          ['Média complexidade', 'Consultas com especialistas, exames e pequenos procedimentos', 'Ambulatórios e hospitais de menor porte'],
          ['Alta complexidade', 'Cirurgias, tratamentos e leitos intensivos', 'Hospitais de referência'],
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-educacao',
    novasSections: [
      {
        titulo: 'Alfabetização é a base de tudo',
        paragrafos: [
          'Alfabetizar na idade certa é a política educacional com efeito mais duradouro: crianças que aprendem a ler e escrever até os anos iniciais têm trajetória escolar muito diferente das que não aprendem. Propostas de educação deveriam começar por aqui: avaliação diagnóstica, materiais adequados, formação de professores e acompanhamento de quem fica para trás, com metas e prazos claros. A alfabetização é também a base da permanência: quem aprende a ler tem menos chance de abandonar a escola.',
          'A alfabetização também é um indicador de gestão: resultados de avaliações nacionais permitem comparar redes, identificar atrasos e cobrar correção de rumo. Uma campanha pode falar muito em qualidade sem citar um único dado; outra pode apresentar metas claras de alfabetização e o caminho para alcançá-las. A diferença entre as duas é o começo de uma avaliação séria da proposta. Esses dados públicos permitem que qualquer eleitor compare a promessa com o desempenho da rede.',
          'Cuidado com promessas de soluções mágicas, como um único método ou um único material que resolve a alfabetização. A experiência mostra que combinação de método, formação, tempo de aula, acompanhamento e apoio às famílias importa mais que fórmula isolada. O eleitor pode perguntar: qual é o plano para os alunos que não alcançarem a meta no prazo previsto? Desconfiar de atalhos é especialmente importante em um tema em que resultados aparecem só depois de anos de trabalho.',
        ],
      },
      {
        titulo: 'Ensino técnico e formação profissional',
        paragrafos: [
          'O ensino técnico ganha espaço no debate como caminho entre escola e trabalho. A rede federal de educação profissional, com institutos federais, é uma referência nacional, mas a cobertura é desigual entre regiões. Propostas sérias discutem expansão com qualidade, parcerias com o setor produtivo e articulação com o ensino médio regular, sem transformar a formação profissional em atalho para mão de obra barata. O ensino técnico bem feito combina teoria, prática e experiência real de trabalho, o que exige estrutura e parcerias sérias.',
          'Ao avaliar promessas de formação para o emprego, pergunte: qual curso, qual duração, qual certificação, qual conexão com as vagas da região? Cursos técnicos desconectados do mercado local formam para o desemprego. Também vale observar se a proposta inclui permanência: transporte, alimentação e bolsas fazem diferença entre matrícula e conclusão, principalmente para estudantes de baixa renda. O acompanhamento dos egressos, com dados de emprego e renda, é o melhor teste de uma promessa de formação profissional.',
          'Ensino técnico não é alternativa para reduzir direitos nem para precarizar o ensino médio: a boa política combina formação geral sólida com habilitação profissional. O eleitor pode exigir que a proposta respeite essa combinação e apresente indicadores de conclusão, inserção no mercado de trabalho e satisfação dos egressos, em vez de apenas contar matrículas anunciadas em campanha. A formação profissional integrada ao currículo comum é o modelo que melhor responde às duas demandas.',
        ],
      },
      {
        titulo: 'Financiamento: quanto custa a educação prometida',
        paragrafos: [
          'Educação de qualidade custa caro, e a Constituição define pisos mínimos de investimento: a União aplica em manutenção e desenvolvimento do ensino um percentual de sua receita de impostos, e estados e municípios têm piso próprio mais alto. Além disso, o Fundeb reúne recursos de estados e municípios para a educação básica, com complementação da União para as redes com menor capacidade. Os percentuais mínimos existem justamente para proteger a educação das oscilações políticas e orçamentárias.',
          'Ao ouvir promessas educacionais, pergunte de onde vem o dinheiro: ampliar vagas em creche, valorizar professores e reformar escolas exige receita nova, remanejamento ou eficiência de gestão. Propostas sem fonte de financiamento são cartas de intenção. Também vale observar se o candidato defende carreiras que atraiam bons profissionais e condições de trabalho dignas para quem está na sala de aula. Promessas sem orçamento são especialmente frágeis na educação, onde o custo de cada vaga é alto e contínuo.',
          'O custo por aluno, o percentual do orçamento destinado à educação e a qualidade do gasto são dados públicos que o eleitor pode comparar entre estados e municípios. Gasto alto com resultado ruim sugere problema de gestão; gasto baixo sugere desinvestimento. Nenhum número isolado conta a história, mas o conjunto permite perguntas muito mais precisas do que o debate sobre promessas. A leitura conjunta de investimento e resultado é o que separa diagnóstico de opinião no debate educacional.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'LDB e Fundeb: as bases legais da educacao basica',
        paragrafos: [
          'A Lei 9.394/1996, conhecida como Lei de Diretrizes e Bases da Educacao (LDB), organiza a educacao brasileira em niveis e modalidades e distribui responsabilidades entre Uniao, estados e municipios. E o marco legal que o eleitor deve conhecer antes de avaliar qualquer proposta educacional, porque define quem e responsavel pelo que.',
          'O Fundeb, por sua vez, foi criado por emenda constitucional em 2006 e tornado permanente pela Emenda Constitucional 108/2020. Ele reune recursos de estados, municipios e Distrito Federal para financiar a educacao basica, com complementacao da Uniao. Propostas que ignoram o fundo tendem a ignorar tambem de onde vem o dinheiro da escola publica.',
        ],
        fonte: { label: 'Lei 9.394/1996 (LDB) no Planalto', href: 'https://www.planalto.gov.br/ccivil_03/leis/l9394.htm' },
      },
    ],
    faq: [
      {
        pergunta: 'O que é o Fundeb?',
        resposta: 'É o fundo que reúne recursos de estados, municípios e do Distrito Federal para financiar a educação básica, com complementação da União para redes com menor capacidade. Criado por emenda constitucional e tornado permanente depois, o Fundeb distribui os recursos conforme o número de matrículas e as regras de valor por aluno. Entender o fundo ajuda a ler disputas orçamentárias da educação.',
      },
      {
        pergunta: 'Quem é responsável pela escola do meu bairro?',
        resposta: 'Depende da etapa: creches e ensino fundamental são responsabilidade principal dos municípios; o ensino médio, dos estados; universidades e institutos federais, da União. A União também atua com apoio técnico e financeiro. Ao cobrar melhorias, identifique primeiro o ente responsável: cobrar do prefeito uma escola estadual, ou do governador uma creche municipal, atrasa a solução.',
      },
      {
        pergunta: 'O que é o Ideb?',
        resposta: 'É o Índice de Desenvolvimento da Educação Básica, calculado pelo governo federal a partir de dois fatores: o desempenho dos alunos em avaliações nacionais e as taxas de aprovação escolar. O índice permite comparar escolas, municípios e estados ao longo do tempo. Ele é útil para acompanhar tendências, mas não mede tudo: aspectos como clima escolar e infraestrutura ficam fora do número.',
      },
      {
        pergunta: 'O Enem é obrigatório?',
        resposta: 'Não. O Exame Nacional do Ensino Médio é voluntário e serve como porta de entrada para universidades públicas e privadas, programas de bolsas e financiamento estudantil. A inscrição é opcional e o exame não é exigido para concluir o ensino médio. Para avaliar propostas de educação superior, vale perguntar como o candidato pretende ampliar acesso sem depender só do desempenho em um dia de prova.',
      },
      {
        pergunta: 'Professor precisa de concurso para trabalhar em escola pública?',
        resposta: 'Em geral, sim: o ingresso em cargos efetivos do serviço público exige concurso, conforme a Constituição, e isso vale para professores da rede pública. Existem contratações temporárias em situações previstas em lei, mas a regra da carreira é o concurso. Propostas de valorização docente deveriam explicar carreira, formação e condições de trabalho, e não apenas salário isolado.',
      },
    ],
    tabelas: [
      {
        titulo: 'Etapas da educação e o que observar',
        cabecalho: ['Etapa', 'Principal responsável', 'O que observar nas propostas'],
        linhas: [
          ['Creche e pré-escola', 'Municípios', 'Vagas, qualidade do atendimento e formação das equipes'],
          ['Ensino fundamental', 'Municípios (anos iniciais e finais)', 'Alfabetização, fluxo escolar e infraestrutura'],
          ['Ensino médio', 'Estados', 'Currículo, permanência e conexão com o futuro'],
          ['Ensino técnico', 'Estados e rede federal', 'Cursos alinhados às vagas da região'],
          ['Ensino superior', 'União (federais) e estados', 'Acesso, permanência e financiamento'],
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-seguranca-publica',
    novasSections: [
      {
        titulo: 'Sistema prisional: a parte invisível da segurança',
        paragrafos: [
          'O sistema prisional é o elo mais invisível e mais problemático da segurança pública: superlotação, condições precárias, organização de facções e falta de políticas de reintegração afetam a reincidência e a segurança de quem vive fora dos muros. Propostas que ignoram as prisões tratam só metade do problema. Pergunte como o candidato pretende enfrentar a superlotação, separar perfis e garantir condições dignas de custódia. A segurança pública começa a falhar quando o Estado não sabe o que fazer com quem prende.',
          'A reincidência é o indicador mais duro do fracasso do sistema: quem sai da prisão sem trabalho, moradia e vínculo social tende a voltar. Políticas de educação, trabalho e assistência dentro e fora das prisões reduzem esse ciclo, mas exigem investimento contínuo e gestão. O discurso de endurecer sem plano prisional costuma produzir mais presos e os mesmos problemas de sempre, sem ganho real de segurança. Política prisional não é tema de assistencialismo, e sim de segurança: o preso de hoje volta para o convívio social.',
          'Ao avaliar, observe se o candidato conhece o tema: números de presos, déficit de vagas, perfil da população carcerária e programas existentes. Quem trata o sistema prisional como assunto menor provavelmente tratará a segurança como slogan. Não existe política de segurança completa sem resposta para a pergunta: o que acontece com quem é preso? Quem domina o tema responde com números, prazos e planos; quem não domina responde com slogans e promessas genéricas.',
        ],
      },
      {
        titulo: 'Violência doméstica: política de segurança que começa em casa',
        paragrafos: [
          'A violência doméstica e familiar é um dos maiores problemas de segurança do país e exige resposta integrada: medidas protetivas, delegacias preparadas, juizados, abrigos, apoio psicológico e econômico às vítimas. A Lei 11.340/2006, a Lei Maria da Penha, criou esse arcabouço, e sua aplicação ainda é desigual entre regiões e entre municípios de diferentes tamanhos. O enfrentamento exige que as instituições conversem entre si, e essa articulação é um teste de gestão.',
          'Propostas sérias discutem prevenção, capacitação de agentes, monitoramento de medidas protetivas e atendimento a agressores. Também é preciso olhar os dados: feminicídios, notificações e subnotificação são indicadores que qualquer gestor de segurança deveria conhecer. O eleitor pode perguntar qual é o plano para proteger quem denuncia, desde a delegacia até a saída da situação de violência. A subnotificação torna o problema ainda maior do que os registros mostram, e isso precisa estar no diagnóstico.',
          'A violência doméstica conecta segurança, saúde e assistência social: a vítima precisa de atendimento médico, proteção policial e suporte de renda e moradia. Propostas que tratam o tema apenas como endurecimento de pena ignoram a parte mais difícil, que é a prevenção e a proteção efetiva antes do desfecho trágico, quando ainda há tempo de interromper o ciclo. Políticas que atuam em apenas um desses campos deixam a vítima desprotegida nos demais.',
        ],
      },
      {
        titulo: 'Dados, território e a pergunta segurança para quem',
        paragrafos: [
          'Segurança pública é um tema territorial: os problemas de uma capital não são os de uma cidade pequena, e as soluções também não. Políticas de iluminação, urbanismo e comércio local, por exemplo, reduzem crimes de oportunidade. Ao avaliar propostas, pergunte qual território, qual crime e qual horário a medida pretende atingir: generalizações bonitas escondem ausência de diagnóstico e de prioridade. Boas propostas de segurança nascem de diagnóstico local, e não de receitas copiadas de outros países.',
          'Os dados oficiais de criminalidade existem e permitem acompanhar tendências, mas exigem leitura cuidadosa: mudanças de registro, subnotificação e recortes diferentes podem distorcer comparações. Desconfie de quem apresenta apenas o número que confirma seu discurso. Um diagnóstico honesto mostra o problema completo, inclusive as partes que não favorecem a narrativa da campanha. O eleitor pode exigir que as campanhas citem a fonte, o período e o recorte territorial de cada estatística apresentada.',
          'Por fim, a pergunta segurança para quem é essencial: políticas podem proteger uns e expor outros, como no caso da letalidade policial e da abordagem discriminatória. O eleitor pode exigir que as propostas incluam controle externo, transparência e mecanismos de responsabilização, além de eficiência operacional. Segurança pública sem controle público é risco, não solução. Política de segurança que não presta contas à população tende a se tornar instrumento de poder, e não de proteção.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'SUSP: a tentativa de integrar a seguranca publica',
        paragrafos: [
          'O Sistema Unico de Seguranca Publica (SUSP) foi instituido pela Lei 13.675/2018 para integrar as politicas de seguranca entre Uniao, estados e municipios, com objetivos, metas e indicadores comuns. E um bom exemplo de como a legislacao nacional tenta organizar uma area em que a execucao e majoritariamente estadual.',
          'Ao avaliar promessas de seguranca, vale perguntar se a proposta dialoga com o SUSP, com o Sistema Nacional de Politicas Publicas sobre Drogas ou com o Sistema Nacional de Atendimento Socioeducativo, porque cada um organiza uma parte da resposta institucional ao problema.',
        ],
        fonte: { label: 'Lei 13.675/2018 (SUSP) no Planalto', href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13675.htm' },
      },
    ],
    faq: [
      {
        pergunta: 'O que é letalidade policial?',
        resposta: 'É o número de mortes causadas por agentes de segurança no exercício da função. É um indicador importante porque revela como a força é usada: níveis altos costumam indicar problemas de treinamento, tática e controle. Políticas sérias buscam reduzir a criminalidade e a letalidade ao mesmo tempo, com protocolos, investigação de mortes e transparência dos dados.',
      },
      {
        pergunta: 'Aumentar pena reduz o crime?',
        resposta: 'A relação entre punição e criminalidade é complexa e varia conforme o tipo de crime. Evidências de diferentes países mostram que a severidade da pena influencia menos do que a certeza da punição e a capacidade de investigar. Pena maior sem investigação eficiente produz pouca mudança prática. O debate honesto combina punição adequada com prevenção, investigação e reintegração.',
      },
      {
        pergunta: 'O que são medidas protetivas?',
        resposta: 'São decisões da Justiça para proteger vítimas de violência doméstica, previstas na Lei Maria da Penha, como afastamento do agressor do lar, proibição de aproximação e contato, e entrega de armas. O descumprimento pode levar à prisão. A eficácia das medidas depende de monitoramento e de estrutura das delegacias e dos tribunais, o que varia muito entre regiões.',
      },
      {
        pergunta: 'Parlamentar federal controla a polícia?',
        resposta: 'Não diretamente. As polícias têm estrutura própria e respondem aos governos estaduais, no caso das polícias civil e militar, ou à União, no caso das polícias federal, rodoviária e outras forças, conforme a organização prevista em lei. Deputados e senadores influenciam por leis penais, orçamento, fundos, fiscalização e controle. Por isso, promessa de mudar a polícia exige saber em qual esfera o candidato atua.',
      },
      {
        pergunta: 'O que é o sistema prisional?',
        resposta: 'É o conjunto de estabelecimentos e regras que executam as prisões: cadeias, presídios, penitenciárias e medidas alternativas, com normas próprias de execução penal. Inclui direitos e deveres da pessoa presa, condições de custódia e programas de reintegração. É parte da política de segurança, e seu funcionamento afeta diretamente a reincidência e a segurança pública como um todo.',
      },
    ],
    tabelas: [
      {
        titulo: 'Instrumentos de segurança e seus limites',
        cabecalho: ['Instrumento', 'Problema que ataca', 'Limite típico'],
        linhas: [
          ['Policiamento ostensivo', 'Crimes de oportunidade e sensação de insegurança', 'Não resolve crimes complexos sem investigação'],
          ['Investigação e inteligência', 'Crimes organizados e de autoria desconhecida', 'Exige perícia, equipe e tempo'],
          ['Penas e prisão', 'Reincidência em tese', 'Sem reintegração, produz reincidência'],
          ['Prevenção social', 'Causas estruturais da violência', 'Resultados lentos e de difícil medição'],
          ['Controle externo', 'Abusos e letalidade policial', 'Depende de órgãos independentes e dados abertos'],
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-meio-ambiente',
    novasSections: [
      {
        titulo: 'Saneamento é saúde, meio ambiente e dignidade',
        paragrafos: [
          'Saneamento básico, que inclui água potável, coleta e tratamento de esgoto, manejo de resíduos e drenagem urbana, é um dos temas ambientais com impacto mais direto na vida das pessoas. A falta de esgoto tratado contamina rios e praias, espalha doenças e penaliza quem tem menos renda. O país tem metas legais de universalização, e a execução depende principalmente dos municípios, com apoio de estados e da União. A universalização do saneamento é também uma política de igualdade: a falta de esgoto atinge desproporcionalmente quem tem menos renda.',
          'Ao avaliar propostas, pergunte sobre investimento, modelo de gestão e tarifa: universalizar o saneamento exige recursos vultosos e escolhas entre prestação pública, privada ou mista, tema de debate constante no Congresso e nas prefeituras. Também vale observar se a proposta conecta saneamento a saúde pública e a recuperação de rios, em vez de tratá-lo apenas como obra de infraestrutura visível. A pergunta sobre quem paga a conta e quem fiscaliza o serviço é parte da avaliação de qualquer modelo.',
          'O eleitor pode acompanhar indicadores simples: percentual da população com água tratada, coleta e tratamento de esgoto, e situação da drenagem urbana. Esses dados são públicos e comparáveis entre municípios. Uma proposta de meio ambiente que ignora saneamento trata da paisagem e esquece a água que corre embaixo da cidade e a saúde das pessoas que dependem dela. Dados de saneamento ajudam a cobrar prefeitos, governadores e parlamentares com números, e não apenas com promessas.',
        ],
      },
      {
        titulo: 'Energia: a transição que já começou',
        paragrafos: [
          'A matriz elétrica brasileira já é majoritariamente renovável, com forte presença de hidrelétricas e crescimento de eólica e solar. A transição energética trata de ampliar fontes de baixa emissão, modernizar as redes e garantir que a mudança gere empregos e não apenas custos. Propostas sérias discutem investimento, leilões, armazenamento de energia e impacto social das obras sobre comunidades e territórios. A transição, porém, não é automática: depende de investimento em rede, armazenamento e regulação.',
          'Ao ouvir promessas sobre energia, pergunte: qual fonte, qual prazo, qual custo para o consumidor e qual impacto local? Hidrelétricas têm passivo social e ambiental; eólica e solar dependem de rede de transmissão e da regularidade do vento e do sol. A discussão honesta reconhece trocas e limites. Também vale perguntar como a proposta trata a pobreza energética, que atinge milhões de brasileiros. Também vale perguntar quem arca com os custos da transição e como as comunidades afetadas serão compensadas.',
          'O Congresso decide boa parte do marco energético: regras de leilões, incentivos, licenciamento e tarifas. Por isso, o voto em deputado e senador influencia diretamente a velocidade da transição. Ao avaliar um parlamentar, veja suas posições em votações de energia e meio ambiente, e não apenas o discurso sobre futuro sustentável em época de campanha. O voto em deputado e senador, portanto, tem efeito concreto sobre o preço da energia e sobre o ritmo da descarbonização.',
        ],
      },
      {
        titulo: 'Resíduos: do lixão à economia circular',
        paragrafos: [
          'O Brasil ainda enfrenta o desafio de encerrar lixões e tratar adequadamente o lixo. A Política Nacional de Resíduos Sólidos, Lei 12.305/2010, estabeleceu diretrizes para destinação correta, reciclagem e responsabilidade de fabricantes, mas a implementação é desigual entre estados e municípios. Propostas sérias discutem coleta seletiva, cooperativas de catadores e financiamento do sistema de gestão de resíduos. O encerramento de lixões é uma das metas mais cobradas por lei e ainda distante em muitas regiões do país.',
          'A economia circular propõe pensar o resíduo como recurso: reutilizar, reciclar e reduzir em vez de descartar. Isso envolve desenho de produtos, logística reversa e mercado para materiais reciclados. Ao avaliar propostas, pergunte como será financiada a infraestrutura de reciclagem e como os catadores, parte essencial da cadeia, serão incluídos com dignidade e remuneração justa. A cadeia da reciclagem só funciona se houver demanda para o material reciclado e regras claras de responsabilidade.',
          'Resíduos também são tema de saúde e clima: lixões emitem gases de efeito estufa e contaminam solo e água. Por isso, a gestão de resíduos conecta três pautas, ambiente, saúde e economia, e merece pergunta concreta em qualquer debate: para onde vai o lixo da minha cidade e o que a proposta muda nessa resposta? Essa conexão mostra que a pauta ambiental não é separada da vida cotidiana, e sim parte dela.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Codigo Florestal e a lei de crimes ambientais',
        paragrafos: [
          'O Codigo Florestal (Lei 12.651/2012) define regras de uso da terra, areas de preservacao permanente e reserva legal, e e a referencia central para avaliar discursos sobre desmatamento e regularizacao ambiental. Ja a Lei 9.605/1998 tipifica crimes ambientais e prevê penas, o que ajuda a entender o debate sobre punicao a infratores.',
          'Ao ouvir promessas ambientais, pergunte em qual marco a proposta se apoia: regularizacao de areas, fiscalizacao, incentivo a boas praticas ou mudanca de regras. Cada caminho tem efeitos diferentes sobre produtores, comunidades e biomas.',
        ],
        fonte: { label: 'Lei 12.651/2012 (Codigo Florestal) no Planalto', href: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12651.htm' },
      },
    ],
    faq: [
      {
        pergunta: 'O que é desmatamento ilegal?',
        resposta: 'É a supressão de vegetação sem autorização do órgão ambiental competente, fora das regras de uso da terra. Ele difere do desmatamento autorizado, que segue limites legais. A fiscalização, o monitoramento por satélite e a punição são instrumentos centrais para conter o ilegal. Propostas ambientais sérias explicam como pretendem fortalecer esses instrumentos sem prejudicar produtores regulares.',
      },
      {
        pergunta: 'O que é o CAR?',
        resposta: 'É o Cadastro Ambiental Rural, registro eletrônico dos imóveis rurais que declara áreas de reserva legal, preservação permanente e uso permitido. Ele é a base para a regularização ambiental e para o controle do desmatamento. A qualidade do cadastro depende de declarações corretas e de análise pelos órgãos estaduais, o que gera debate sobre prazos e efetividade.',
      },
      {
        pergunta: 'O que é transição energética?',
        resposta: 'É a mudança gradual da forma como um país produz e consome energia, reduzindo a participação de fontes poluentes e ampliando as de baixa emissão, como eólica, solar e outras renováveis. Envolve tecnologia, investimento, empregos e custos para os consumidores. Não existe transição sem escolhas difíceis, e a qualidade do debate depende de números e prazos concretos.',
      },
      {
        pergunta: 'Saneamento é responsabilidade de quem?',
        resposta: 'A prestação dos serviços de água e esgoto é, em regra, responsabilidade dos municípios, que podem prestar diretamente ou por meio de empresas públicas, privadas ou consórcios, com regulação e metas definidas em lei. Estados e a União apoiam com financiamento e políticas nacionais. Ao cobrar saneamento, identifique primeiro o prestador e a agência reguladora da sua cidade.',
      },
      {
        pergunta: 'O que é economia circular?',
        resposta: 'É um modelo em que produtos e materiais são mantidos em uso pelo maior tempo possível: reduzir, reutilizar, reparar e reciclar, em vez de extrair, usar e descartar. Na prática, envolve desenho de produtos, coleta seletiva, logística reversa e mercado de reciclados. A transição para esse modelo gera empregos, mas exige investimento e regras claras.',
      },
    ],
    tabelas: [
      {
        titulo: 'Temas ambientais e perguntas úteis',
        cabecalho: ['Tema', 'Pergunta para avaliar propostas'],
        linhas: [
          ['Desmatamento', 'Como fortalecer monitoramento e punição sem prejudicar produtores regulares?'],
          ['Saneamento', 'Qual a meta de água e esgoto tratado e de onde virá o financiamento?'],
          ['Energia', 'Qual fonte, prazo, custo para o consumidor e impacto local?'],
          ['Resíduos', 'Como encerrar lixões e incluir catadores na cadeia de reciclagem?'],
          ['Clima', 'Como adaptar cidades e campo a secas, enchentes e ondas de calor?'],
        ],
      },
    ],
  },
  {
    slug: 'guia-temas-economia-impostos',
    novasSections: [
      {
        titulo: 'Reforma tributária: o que mudou e o que ainda vem',
        paragrafos: [
          'A reforma tributária aprovada pela Emenda Constitucional 132/2023 reorganiza a tributação sobre o consumo: os tributos atuais, que incidem em cascata, serão substituídos gradualmente por um modelo de imposto sobre valor agregado, com uma parte de competência federal e outra de competência estadual e municipal. A transição será longa, com regras específicas para setores como saúde, educação e transporte. Entender essa arquitetura ajuda o eleitor a acompanhar os debates das leis complementares que virão.',
          'A reforma também criou uma cesta básica nacional de alimentos com tributação reduzida e um imposto seletivo para desestimular produtos considerados nocivos à saúde e ao meio ambiente. A implementação depende de leis complementares, que ainda serão discutidas e votadas. Por isso, o debate sobre tributos está longe de terminar, e o acompanhamento do Congresso continua essencial. A definição de quais produtos entram ou saem dessas regras será objeto de disputa política nos próximos anos.',
          'Para o eleitor, a reforma muda o vocabulário da cobrança: em vez de promessas vagas de acabar com impostos, o debate passa a ser sobre alíquotas, transição, exceções e impacto no preço final. Propostas sérias explicam como cada etapa afeta a vida real, do alimento ao serviço. Desconfie de quem promete simplificação instantânea: a transição é desenhada para durar anos. Propostas que ignoram o desenho da reforma costumam estar desatualizadas ou simplificadas demais para orientar a decisão.',
        ],
      },
      {
        titulo: 'Inflação, juros e poder de compra',
        paragrafos: [
          'A inflação é a alta generalizada dos preços, e seu efeito mais sentido é a perda de poder de compra: o salário que não sobe junto compra menos. O combate à inflação envolve política monetária, conduzida pelo Banco Central, e políticas fiscais do governo e do Congresso, como controle de gastos e regras de receita. Nenhum parlamentar define os juros sozinho, e prometer isso é simplificar demais. A pergunta para o candidato é como suas propostas afetam a inflação e o bolso do eleitor no curto e no longo prazo.',
          'Ao avaliar propostas econômicas, pergunte como elas afetam a inflação e as contas públicas: medidas que estimulam consumo sem base podem aquecer preços; cortes mal feitos podem reduzir serviços essenciais. O debate honesto reconhece que não existe ganho sem custo. Também vale observar se o candidato fala de juros e inflação com números atuais e fontes verificáveis. A seriedade de uma proposta econômica aparece na disposição de explicar custos e de citar fontes.',
          'A taxa básica de juros, definida pelo Banco Central, influencia crédito, emprego e dívida pública, mas é apenas uma peça do quebra-cabeça. O Congresso influencia o ambiente econômico por leis tributárias, orçamento, regras de gasto e reformas estruturais. Para o eleitor, a pergunta central é: como a proposta melhora a vida de quem trabalha e paga contas no fim do mês? Entender o papel de cada instituição evita cobranças erradas e melhora a qualidade da conversa sobre economia.',
        ],
      },
      {
        titulo: 'Dívida pública e o tamanho do Estado',
        paragrafos: [
          'A dívida pública é o conjunto de obrigações do governo, financiadas por títulos vendidos a investidores, bancos e fundos. Ela não é boa nem má em si: depende do tamanho, do prazo, do custo e do uso dos recursos. Dívida para financiar investimento pode ser saudável; dívida para pagar gasto corrente crescente tende a gerar problemas futuros e a pressionar juros e inflação. O tema da dívida merece pergunta direta ao candidato: qual a sua proposta para equilibrar contas sem sacrificar serviços?',
          'O debate sobre o tamanho do Estado confunde receita e despesa com qualidade: um Estado grande pode ser ineficiente, mas um Estado pequeno pode deixar serviços essenciais sem recursos. A pergunta útil não é mais ou menos Estado, e sim: o que o Estado faz bem, o que faz mal e quem paga a conta? Respostas honestas exigem dados de orçamento, não slogans. O eleitor pode pedir exemplos concretos de gasto que o candidato cortaria e de serviço que ampliaria.',
          'Indicadores públicos, como resultado primário, dívida em relação à economia, carga tributária e inflação, ajudam o eleitor a acompanhar o rumo das contas. Cada um tem limites de interpretação, e a leitura conjunta é melhor que qualquer número isolado. Uma proposta econômica séria cita esses indicadores e explica como pretende melhorá-los sem transferir custos para quem tem menos. Acompanhar esses números ao longo do mandato é uma forma prática de avaliar a coerência entre discurso e resultado.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'A reforma tributária no portal da Câmara',
        paragrafos: [
          'A tramitação da reforma tributária pode ser acompanhada no portal da Câmara, onde ficam registrados os textos, pareceres e votações que resultaram na Emenda Constitucional 132/2023, promulgada em 2023. As leis complementares que detalham a implementação seguem o mesmo caminho público de tramitação. Acompanhar os documentos oficiais é a forma mais segura de saber o que já é regra e o que ainda é proposta em discussão.',
        ],
        fonte: { label: 'Câmara dos Deputados', href: 'https://www.camara.leg.br/' },
      },
    ],
    faq: [
      {
        pergunta: 'O que é carga tributária?',
        resposta: 'É a relação entre o total de tributos arrecadados e o tamanho da economia. A carga brasileira é relativamente alta e concentrada em tributos sobre consumo, o que tende a pesar mais sobre rendas menores, já que todos pagam o mesmo percentual no preço. O debate sobre carga deveria incluir também a qualidade do gasto: o que o Estado entrega em troca dos impostos.',
      },
      {
        pergunta: 'O que é déficit público?',
        resposta: 'É a situação em que o governo gasta mais do que arrecada em um período. O déficit pode ser financiado com dívida, o que aumenta obrigações futuras, ou reduzido com mais receita e menos despesa. Nem todo déficit é desastre nem todo superávit é virtude: o que importa é a trajetória, o custo da dívida e o que o gasto produz.',
      },
      {
        pergunta: 'A reforma tributária acaba com todos os impostos?',
        resposta: 'Não. A Emenda Constitucional 132/2023 reorganiza a tributação sobre o consumo, substituindo gradualmente tributos como os que incidem sobre produtos e serviços por um modelo de imposto sobre valor agregado, com parte federal e parte estadual e municipal. Impostos sobre renda e patrimônio, contribuições e taxas continuam existindo. O objetivo é simplificar e reduzir cumulatividade, não zerar a arrecadação.',
      },
      {
        pergunta: 'O que é inflação?',
        resposta: 'É a alta generalizada e persistente dos preços, que reduz o poder de compra do dinheiro. Ela é medida por índices que acompanham o custo de uma cesta de bens e serviços. A inflação alta corrói salários e poupanças, e seu controle envolve política monetária do Banco Central e política fiscal. No debate eleitoral, pergunte como a proposta afeta preços, emprego e renda.',
      },
      {
        pergunta: 'Parlamentar define os juros?',
        resposta: 'Não. A taxa básica de juros é decidida pelo Banco Central, que conduz a política monetária com autonomia técnica. O Congresso influencia o ambiente econômico por leis tributárias, orçamento e regras fiscais, que afetam inflação e confiança, mas não vota a taxa de juros. Cobrar de um deputado a decisão sobre juros é cobrar da pessoa errada.',
      },
    ],
    tabelas: [
      {
        titulo: 'Tipos de tributo e o que financiam',
        cabecalho: ['Tipo', 'Exemplos gerais', 'Destinação típica'],
        linhas: [
          ['Tributos sobre consumo', 'Impostos que incidem sobre produtos e serviços', 'Arrecadação geral, com parte vinculada a áreas específicas'],
          ['Tributos sobre renda', 'Imposto sobre a renda de pessoas e empresas', 'Arrecadação geral da União'],
          ['Tributos sobre patrimônio', 'Impostos sobre propriedade e transmissão de bens', 'Arrecadação de estados e municípios'],
          ['Contribuições sociais', 'Contribuições para a seguridade social', 'Parte da arrecadação é vinculada a saúde, previdência e assistência'],
        ],
      },
    ],
  },

  {
    slug: 'como-conversar-politica-familia',
    novasSections: [
      {
        titulo: 'Crie combinados antes do tema subir',
        paragrafos: [
          'Antes de uma conversa que você sabe que pode esquentar, combine regras simples: ninguém interrompe, ninguém xinga e qualquer afirmação sobre fato precisa vir acompanhada de fonte ou da promessa de buscar uma. Combinados não garantem paz, mas transformam a briga de torcida em discussão com método.',
          'Um bom combinado é o de não julgar a pessoa pela pergunta: quem pergunta algo que parece ingênuo está, na maioria das vezes, tentando entender. Responder com ironia fecha a porta; responder com uma fonte ou um exemplo abre caminho para a próxima pergunta.',
        ],
      },
      {
        titulo: 'Use exemplos próximos, não teorias distantes',
        paragrafos: [
          'Conversas políticas funcionam melhor quando ancoradas na vida concreta: o posto de saúde do bairro, a escola dos filhos, o preço da cesta básica, a segurança na rua. Em vez de discutir abstrações como "o papel do Estado", pergunte o que cada pessoa acha que deveria mudar nesses lugares e quem ela acha que pode agir.',
          'Essa ancoragem também ajuda a separar o que é responsabilidade de cada cargo. Quando a conversa chega em um problema real, a pergunta "isso depende de prefeito, governador, deputado, senador ou presidente?" tira a discussão do abstrato e a coloca no terreno em que dá para pesquisar e cobrar.',
        ],
      },
      {
        titulo: 'Quando a conversa for sobre dados, trate como investigação conjunta',
        paragrafos: [
          'Se alguém trouxer um número, uma votação ou uma notícia, trate o caso como uma investigação a dois: qual é a fonte, qual é a data, qual é o recorte, existe registro oficial? Pesquisar junto muda a dinâmica — deixa de ser um contra o outro e passa a ser os dois contra o problema da informação.',
          'Termine a investigação com um resumo do que ficou confirmado, do que ficou em aberto e do que cada um vai verificar por conta própria. Mesmo que ninguém mude de opinião, os dois saem da conversa com mais método e menos rancor.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'O teste da fonte em três perguntas',
        paragrafos: [
          'Um exercício simples para aplicar em família: diante de qualquer afirmação política forte, fazer três perguntas — onde isso está registrado? quando aconteceu? quem publicou? Se as três tiverem resposta com link ou documento, a afirmação merece ser levada a sério; se nenhuma tiver, vale tratar como boato até prova em contrário.',
          'Esse teste funciona melhor como hábito do que como armadilha. Aplicado com gentileza, ele educa sem humilhar; aplicado como ataque, fecha a conversa. A diferença está no tom: perguntar por curiosidade, não por desconfiança.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Vale a pena discutir política com quem não quer discutir?',
        resposta: 'Depende do objetivo. Se a intenção é convencer a qualquer custo, provavelmente não. Se a intenção é entender o outro lado e semear dúvidas saudáveis, uma conversa curta e respeitosa já vale. Saber a hora de parar também é parte da habilidade: nem toda mesa de jantar precisa virar plenário.',
      },
      {
        pergunta: 'Como reagir quando alguém repete uma notícia falsa?',
        resposta: 'Evite o ataque pessoal. Pergunte de onde veio a informação e ofereça buscar juntos o registro oficial. Se a pessoa se fechar, deixe o tema de lado e volte em outro momento. Corrigir com gentileza funciona melhor do que vencer o debate na hora, e protege a relação familiar a longo prazo.',
      },
      {
        pergunta: 'Política familiar precisa ter sempre um vencedor?',
        resposta: 'Não. Conversas sobre política podem terminar sem acordo e ainda assim serem produtivas, se cada um sair com uma pergunta nova ou uma fonte para conferir. O voto é individual e secreto; a conversa não precisa virar votação.',
      },
    ],
    tabelas: [],
  },
];