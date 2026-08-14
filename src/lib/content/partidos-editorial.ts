export interface PartidoEditorial {
  sigla: string;
  atualizadoEm: string;
  historia: { titulo: string; paragrafos: string[] };
  ideologia: { titulo: string; paragrafos: string[] };
  congresso: { titulo: string; paragrafos: string[] };
  controversias: { titulo: string; paragrafos: string[] };
  fontes: { label: string; href: string }[];
}

export const PARTIDOS_EDITORIAL: PartidoEditorial[] = [
  {
    sigla: 'PT',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Das greves do ABC ao Palácio do Planalto',
      paragrafos: [
        'O Partido dos Trabalhadores foi fundado em 10 de fevereiro de 1980, em assembleia realizada no Colégio Sion, em São Paulo. Reuniu lideranças sindicais do ABC paulista, intelectuais, militantes católicos ligados à Teologia da Libertação, exilados que voltavam ao país e veteranos da luta armada contra o regime militar. Luiz Inácio Lula da Silva, então presidente do Sindicato dos Metalúrgicos de São Bernardo do Campo e Diadema, esteve entre os principais articuladores. A fundação aconteceu no processo de abertura política, poucos meses depois das grandes greves que marcaram a região do ABC entre 1978 e 1980.',
        'A legenda disputou sua primeira eleição em 1982 e ajudou a organizar, nos anos seguintes, a Central Única dos Trabalhadores (CUT), fundada em 1983, e o Movimento dos Trabalhadores Rurais Sem Terra (MST), criado em 1984, embora sempre tenha afirmado sua autonomia em relação aos movimentos sociais. Em 1984, o partido aderiu à campanha das Diretas Já, que reivindicava eleições diretas para presidente. Em 1989, na primeira disputa presidencial direta desde 1960, Lula chegou ao segundo turno e perdeu para Fernando Collor. O desempenho consolidou o PT como principal força da esquerda brasileira, com vitórias importantes em prefeituras e governos estaduais ao longo dos anos 1990.',
        'Em 2002, Lula venceu a eleição presidencial e assumiu o primeiro governo do partido, sendo reeleito em 2006. Em 2010, a ex-ministra Dilma Rousseff foi eleita e reeleita em 2014. Em 2016, o processo de impeachment resultou no afastamento definitivo da presidente, em decisão do Senado tomada em agosto daquele ano.',
        'Em 2018, Lula estava preso em Curitiba em decorrência de condenações da Operação Lava Jato e teve a candidatura barrada com base na Lei da Ficha Limpa; o partido lançou Fernando Haddad. Em 2021, o Supremo Tribunal Federal anulou as condenações de Lula, ao declarar a suspeição do ex-juiz Sergio Moro e a incompetência da 13ª Vara Federal de Curitiba. Em 2022, Lula venceu Jair Bolsonaro no segundo turno e tomou posse em janeiro de 2023 para o terceiro mandato.',
        'O partido construiu uma cultura organizativa rara na política brasileira: diretórios na quase totalidade dos municípios, filiação numerosa e correntes internas que disputam teses, direções e candidaturas em encontros periódicos. Essa estrutura ajudou a legenda a sobreviver a derrotas e crises, mas também alimentou debates permanentes sobre o peso das tendências e o comando do partido.',
        'Nos anos 1980 e 1990, o partido também construiu vitrines de gestão: elegeu Luiza Erundina prefeita de São Paulo em 1988, administrou Porto Alegre com o orçamento participativo a partir de 1989 e governou o Rio Grande do Sul com Olívio Dutra entre 1999 e 2002. Essas experiências foram apresentadas pela legenda como exemplos do chamado modo petista de governar.',
      ],
    },
    ideologia: {
      titulo: 'Um partido socialista e suas correntes',
      paragrafos: [
        'O estatuto do PT o define como uma organização política de caráter socialista, comprometida com a construção de uma sociedade democrática e sem exploração. Na prática, o partido combina esse discurso com a defesa da democracia representativa, dos direitos trabalhistas, da reforma agrária e de políticas de redistribuição de renda. Os programas de governo vitoriosos em 2002 e 2022 deram ênfase à inclusão social, ao mercado interno e ao papel do Estado no desenvolvimento.',
        'Internamente, convivem correntes organizadas que vão de posições moderadas, hegemônicas nas últimas décadas, a grupos autodeclarados revolucionários, com peso pequeno nas direções. A experiência dos governos federais, marcada por alianças com partidos de centro e de centro-direita, gerou sucessivos debates internos sobre os limites do que o partido chama de participação democrática.',
        'No plano internacional, o PT se identifica com a tradição da esquerda democrática latino-americana e participou da criação do Foro de São Paulo, encontro de partidos e organizações de esquerda realizado pela primeira vez em 1990. A centralidade de Lula é outro traço marcante: o presidente Lula concentra boa parte do capital eleitoral do partido, o que torna a sucessão interna um tema permanente.',
        'O partido também defende a reforma agrária e a demarcação de terras indígenas, pautas que o colocam em atrito frequente com a bancada ruralista no Congresso.',
      ],
    },
    congresso: {
      titulo: 'Maior bancada de esquerda',
      paragrafos: [
        'Desde os anos 1990, o PT mantém uma das maiores bancadas da Câmara dos Deputados e a maior da esquerda brasileira. O partido presidiu a Câmara com João Paulo Cunha (2003-2005) e Arlindo Chinaglia (2007-2009). Durante os governos de 2003 a 2016 e novamente a partir de 2023, a bancada foi o núcleo da base aliada, responsável por aprovar programas como o Bolsa Família e as principais pautas econômicas e sociais dos governos petistas.',
        'No Senado, o partido teve bancadas expressivas e ocupou cargos de liderança do governo. A relação com o Congresso, porém, nunca foi tranquila: a necessidade de construir maiorias com partidos de perfil conservador foi fonte constante de atritos, tanto com a oposição quanto com alas internas.',
      ],
    },
    controversias: {
      titulo: 'Mensalão, Lava Jato e anulações',
      paragrafos: [
        'O partido esteve no centro de dois grandes escândalos noticiados nas últimas duas décadas. Em 2005, veio a público o esquema conhecido como mensalão, descrito pela imprensa como compra de apoio parlamentar. Em 2012, o STF condenou dirigentes da legenda, entre eles o ex-ministro José Dirceu, por crimes como corrupção ativa e lavagem de dinheiro; as condenações foram objeto de recursos e as penas, executadas conforme a legislação penal.',
        'A partir de 2014, a Operação Lava Jato atingiu o partido com condenações de primeira e segunda instância contra Lula, que ficou preso entre 2018 e 2019. Em 2021, o STF anulou as condenações ao declarar a suspeição do juiz responsável e a incompetência do foro. O partido sempre negou as acusações e classificou os processos como perseguição; os desfechos judiciais continuam a gerar interpretações opostas entre apoiadores e críticos.',
      ],
    },
    fontes: [
      { label: 'Site oficial do PT', href: 'https://pt.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
      { label: 'Fundação Perseu Abramo', href: 'https://fpabramo.org.br' },
    ],
  },
  {
    sigla: 'PL',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Uma sigla com duas histórias',
      paragrafos: [
        'A atual sigla PL reúne duas histórias. O Partido Liberal original foi fundado em 1985, no fim do regime militar, por políticos liberais como Álvaro Valle, e participou das primeiras eleições da redemocratização. Em 2006, essa legenda se fundiu com o PRONA, partido conservador criado pelo médico Enéas Carneiro, dando origem ao Partido da República (PR).',
        'O PRONA elegeu deputados federais e ficou conhecido pelo discurso nacionalista de seu fundador; a fusão de 2006 incorporou parte dessa militância ao PR.',
        'O PL original participou da Assembleia Constituinte de 1987-1988 e apoiou sucessivos governos da Nova República, com expressão eleitoral limitada, concentrada em poucos estados. Sua base era concentrada em poucos estados, e a legenda funcionava como força auxiliar das coalizões da época.',
        'Sob o comando de Valdemar Costa Neto, o PR cresceu como parte do chamado centrão, participando de governos de diferentes campos. Entre 2006 e 2019, a legenda apoiou os governos de Lula e Dilma, integrou a base de Michel Temer e, a partir de 2019, aproximou-se do governo Bolsonaro, indicando ministros. Em 2019, em convenção nacional, o partido aprovou a volta do nome Partido Liberal.',
        'A virada ocorreu em 2021, quando Jair Bolsonaro, então presidente da República, filiou-se à legenda para disputar a reeleição. A entrada do presidente e de seus aliados acelerou a migração de políticos bolsonaristas para o partido, que já vinha crescendo desde 2018.',
        'Entre 2019 e 2021, o partido cresceu também com a migração de parlamentares vindos do PSL e de outras legendas, muitos deles ligados ao governo Bolsonaro. A soma dessas migrações à estrutura antiga do centrão fez do PL, em pouco tempo, a maior força partidária da direita brasileira.',
        'O partido manteve o número eleitoral 22, herdado do Partido Liberal original e usado também pelo PR. Na eleição de 2022, além da bancada da Câmara, a legenda elegeu governadores como Cláudio Castro, no Rio de Janeiro, e Jorginho Mello, em Santa Catarina.',
        'Na eleição de 2022, o PL elegeu a maior bancada da Câmara dos Deputados, com 99 cadeiras, e se tornou a principal força de oposição ao governo eleito naquele ano. A legenda também elegeu senadores e governadores e passou a concentrar a maior parte do eleitorado identificado com o bolsonarismo.',
        'O presidente nacional do partido, Valdemar Costa Neto, comanda a legenda há décadas, o que o torna uma das figuras mais influentes do centrão. Essa combinação — um comando antigo e uma base eleitoral nova, formada ao redor de Bolsonaro — define o perfil atual do PL.',
      ],
    },
    ideologia: {
      titulo: 'Liberal na economia, conservador nos costumes',
      paragrafos: [
        'O PL se apresenta como um partido liberal na economia e conservador nos costumes. Seu programa defende a redução do tamanho do Estado, a liberdade econômica, a segurança jurídica e pautas duras de segurança pública. No campo dos costumes, a legenda alinha-se a posições conservadoras, como a defesa da família e a oposição ao aborto.',
        'A chegada de Bolsonaro e de sua base tornou o partido o principal veículo eleitoral do bolsonarismo, fenômeno descrito pela imprensa como a união entre conservadorismo de costumes e liberalismo econômico. Internamente, convivem alas com perfis diferentes: parlamentares ligados ao centrão, herdeiros da história do PR, e quadros vindos do bolsonarismo.',
        'Nas eleições municipais de 2024, a legenda ficou entre os partidos que mais elegeram prefeitos no país, sinal do crescimento da estrutura partidária fora do Congresso. O partido também investe na formação de candidaturas próprias para as eleições presidenciais seguintes, com Bolsonaro como principal liderança.',
        'A legenda também defende a pauta armamentista e o endurecimento de penas, temas centrais do discurso de Bolsonaro e de seus aliados no partido. No plano institucional, a bancada costuma criticar decisões do STF que considera expansivas, e as propostas que limitam a atuação dos ministros seguem em tramitação no Congresso.',
      ],
    },
    congresso: {
      titulo: 'A maior bancada da Câmara',
      paragrafos: [
        'Com 99 deputados eleitos em 2022, o PL formou a maior bancada da Câmara na legislatura iniciada em 2023, à frente de PT e União Brasil. A bancada liderou a oposição ao governo Lula, com atuação forte em pautas de segurança, costumes e economia, e apoiou a reeleição de Arthur Lira à presidência da Câmara em 2023.',
        'No Senado, a bancada do partido também cresceu e passou a disputar o protagonismo da oposição. O partido indicou ministros em governos de diferentes campos e mantém, por meio do centrão, canais de negociação com o governo, mesmo na condição de principal bloco oposicionista.',
        'O partido indicou ministros no governo Bolsonaro, entre eles o do Turismo, Marcelo Álvaro Antônio, e manteve cargos de comando em comissões e relatorias. Mesmo na oposição ao governo Lula, a bancada negociou pautas pontuais com o Planalto.',
      ],
    },
    controversias: {
      titulo: 'Condenações e questionamentos eleitorais',
      paragrafos: [
        'Valdemar Costa Neto, presidente da legenda, foi condenado pelo STF em 2012 no processo do mensalão, por fatos ocorridos quando a sigla ainda era o Partido Liberal original. Ele foi sentenciado por corrupção ativa e lavagem de dinheiro e cumpriu parte da pena; sempre negou as acusações.',
        'Em 2022, o partido apresentou à Justiça Eleitoral pedidos de auditoria e questionou a confiabilidade do resultado da eleição presidencial. O TSE rejeitou os pedidos e, em 2023, multou a legenda em R$ 22,9 milhões, em decisão que apontou litigância de má-fé. O partido recorreu e nega irregularidades.',
        'A relação entre a legenda e o ex-presidente Bolsonaro também é tema de atenção permanente, uma vez que ele concentra a liderança política do partido e responde a processos no STF, em situações acompanhadas pela imprensa.',
      ],
    },
    fontes: [
      { label: 'Site oficial do PL', href: 'https://pl.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'PSDB',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Nascido da dissidência do PMDB',
      paragrafos: [
        'O PSDB foi fundado em 25 de junho de 1988 por um grupo de parlamentares do PMDB insatisfeitos com o governo de José Sarney. Entre os fundadores estavam Mário Covas, Franco Montoro, Fernando Henrique Cardoso, José Serra e Geraldo Alckmin. A legenda nasceu com o discurso de modernização do Estado, responsabilidade fiscal e desenvolvimento social, e registrou-se no TSE no mesmo ano.',
        'Em 1989, o partido lançou Mário Covas à Presidência. O grande salto veio com o Plano Real: FHC, ministro da Fazenda de Itamar Franco, comandou o plano que estabilizou a economia e venceu a eleição de 1994 no primeiro turno, sendo reeleito em 1998.',
        'Os oito anos do governo FHC foram marcados por privatizações, pela Lei de Responsabilidade Fiscal, aprovada em 2000, pela criação de programas sociais e pelo enfrentamento de crises internacionais. Em 2002, o partido perdeu a eleição para Lula e tornou-se o principal partido de oposição, papel que manteve ao longo dos governos petistas: a disputa entre tucanos e petistas marcou a política brasileira por duas décadas.',
        'Em 2014, o senador Aécio Neves levou a disputa presidencial ao segundo turno e foi derrotado por Dilma Rousseff por diferença de cerca de três pontos percentuais. O partido pediu a auditoria do resultado, pedido rejeitado pelo TSE. Nos anos seguintes, a legenda apoiou o impeachment de Dilma e integrou a base do governo Temer.',
        'Em 2018, o candidato Geraldo Alckmin teve o pior desempenho da história do partido, e a legenda entrou em crise. Em 2022, Alckmin deixou o partido após 33 anos de filiação para concorrer como vice na chapa de Lula. No mesmo ano, o PSDB perdeu o governo de São Paulo, que comandava desde 1995, encerrando um ciclo de 28 anos no principal estado do país.',
        'O partido também governou Minas Gerais com Aécio Neves, entre 2003 e 2010, e Goiás com Marconi Perillo, em dois períodos que somaram mais de uma década. No plano federal, chegou a comandar o Ministério das Relações Exteriores no governo Temer, com o senador Aloysio Nunes, e manteve presença em cargos de segundo escalão em diferentes governos.',
        'Na capital paulista, o partido elegeu os prefeitos José Serra (2004) e João Doria (2016), ampliando sua presença nas maiores cidades do estado.',
        'No governo FHC, o partido comandou ministérios centrais, como a Fazenda, com Pedro Malan, e a Saúde, com José Serra, período em que a legenda consolidou sua imagem de partido de quadros técnicos.',
      ],
    },
    ideologia: {
      titulo: 'A social-democracia como programa',
      paragrafos: [
        'O PSDB se define como um partido social-democrata, e essa palavra aparece nos documentos oficiais da legenda como síntese de seu projeto: combinar crescimento econômico com políticas sociais dentro de uma economia de mercado. O partido defende o equilíbrio fiscal, a abertura comercial, a reforma do Estado e a universalização de serviços como saúde e educação.',
        'Na década de 1990, a legenda se aproximou das teses da chamada terceira via, associadas ao britânico Tony Blair e ao americano Bill Clinton, e passou a defender a atualização da social-democracia para a era da globalização.',
        'Ao longo do tempo, o partido oscilou entre uma ala mais liberal, próxima do empresariado, e uma ala mais ligada à gestão pública; o equilíbrio entre essas correntes marcou seus congressos e eleições internas. Na prática, o PSDB governou com alianças amplas, incluindo partidos de perfil conservador, o que gerou críticas de que o discurso social-democrata convivia com práticas tradicionais de coalizão.',
        'Em São Paulo, o partido se identificou com a educação em tempo integral e a gestão por resultados, temas que marcaram os discursos de suas gestões estaduais. A legenda também defende a reforma do Estado e a digitalização de serviços públicos.',
      ],
    },
    congresso: {
      titulo: 'Do governo federal ao encolhimento',
      paragrafos: [
        'No auge, o PSDB comandou o governo federal por oito anos e governou São Paulo por 28 anos consecutivos, com gestões de Mário Covas, Geraldo Alckmin, José Serra e João Doria. A bancada federal apoiou as reformas trabalhista (2017) e da Previdência (2019), em sintonia com os governos Temer e Bolsonaro em diferentes momentos.',
        'A partir de 2018, o partido sofreu perdas sucessivas: a bancada federal encolheu, governadores trocaram de legenda e o partido perdeu protagonismo nacional. A partir de 2023, já sem Alckmin (que saiu em 2022) e sem o governo de São Paulo, o PSDB passou a ser uma força média no Congresso, mantendo governos estaduais em estados como Mato Grosso do Sul.',
        'A bancada mantém atuação em pautas de gestão fiscal e defende a agenda de reformas econômicas. No Senado, o partido, embora com bancada pequena, preservou relatorias de matérias econômicas.',
      ],
    },
    controversias: {
      titulo: 'Crise, afastamentos e saídas',
      paragrafos: [
        'Em 2017, o STF determinou o afastamento do senador Aécio Neves do mandato, após a divulgação de gravações feitas pelo empresário Joesley Batista em acordo de delação. Aécio respondeu a inquéritos no âmbito da Lava Jato e sempre negou as acusações; parte dos processos foi arquivada ou extinta, conforme registros do STF. O episódio aprofundou a crise da legenda e abriu disputas internas entre alas.',
        'A saída de Alckmin em 2022, para compor a chapa de Lula, foi tratada pela imprensa como símbolo do declínio do partido e gerou reações opostas entre filiados. A trajetória de alianças da legenda — da oposição ao PT à base de Temer, e depois à chapa de Lula — também alimentou críticas de pragmatismo.',
      ],
    },
    fontes: [
      { label: 'Site oficial do PSDB', href: 'https://psdb.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Instituto Teotônio Vilela', href: 'https://itv.org.br' },
    ],
  },
  {
    sigla: 'MDB',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Da oposição consentida ao centro do poder',
      paragrafos: [
        'O MDB é um dos partidos mais antigos do Brasil. Foi criado em 30 de junho de 1966, depois que o Ato Institucional nº 2 extinguiu os partidos existentes e instituiu o bipartidarismo, com a ARENA, que apoiava o regime militar, e o MDB, que reunia a oposição. O partido nasceu, portanto, como uma oposição consentida, mas cresceu até se tornar a principal força contrária à ditadura.',
        'Nos anos 1970, o MDB obteve vitórias eleitorais importantes, como nas eleições de 1974, e passou a abrigar desde moderados até setores da esquerda. Com a reforma partidária de 1979 e a volta do pluripartidarismo, a sigla passou a se chamar PMDB.',
        'Na década de 1980, o partido esteve no centro da redemocratização: participou da campanha das Diretas Já, venceu a eleição indireta de 1985 com Tancredo Neves, que morreu antes de tomar posse, e entregou a Presidência a José Sarney, seu vice. Ulysses Guimarães, principal líder da legenda, comandou a Assembleia Constituinte que promulgou a Constituição de 1988.',
        'Nas décadas seguintes, o PMDB integrou praticamente todas as coalizões federais, tornando-se conhecido pela capilaridade: filiados em quase todos os municípios e presença permanente em ministérios, governos estaduais e prefeituras. Integrou a base de Fernando Henrique Cardoso a partir de 1996 e foi o principal aliado dos governos Lula e Dilma, até o rompimento que levou ao impeachment de 2016.',
        'Em 2016, o partido chegou à Presidência com Michel Temer, vice de Dilma Rousseff, que assumiu após o impeachment e governou até o fim do mandato, em dezembro de 2018. Em 2017, a legenda voltou a se chamar MDB, em decisão de convenção nacional. O partido tem uma cultura de acomodação de correntes regionais: na prática, cada diretório estadual funciona com grande autonomia, o que ajuda a explicar sua longevidade.',
        'No plano institucional, o partido presidiu a Câmara dos Deputados com Ulysses Guimarães (1989-1991), Michel Temer (1997-2001) e Henrique Eduardo Alves (2013-2015), além de longos períodos no comando do Senado. Na década de 1980, o PMDB também governou o Rio de Janeiro com Moreira Franco (1987-1991).',
        'Em 1998, o partido lançou Itamar Franco à Presidência, com votação inexpressiva; nos anos 1990, a legenda também elegeu governadores em estados importantes do Sul e do Nordeste.',
        'Entre 2001 e 2019, senadores do partido presidiram o Senado na maior parte do período, com Ramez Tebet, José Sarney, Renan Calheiros, Garibaldi Alves e Eunício Oliveira.',
      ],
    },
    ideologia: {
      titulo: 'Um partido de centro e vocação ampla',
      paragrafos: [
        'O MDB sempre se definiu como um partido de centro, sem bandeiras ideológicas rígidas. Seus documentos falam em desenvolvimento, democracia e justiça social, mas o traço mais duradouro é a vocação de abrigar correntes diversas: a legenda já elegeu desde políticos identificados com a esquerda até nomes ligados ao conservadorismo.',
        'Essa característica é apresentada pelos dirigentes como virtude — a capacidade de construir pontes e governar com base no diálogo — e pelos críticos como falta de identidade programática, com o partido funcionando como um grande guarda-chuva de interesses regionais.',
        'Na prática, o programa do partido combina defesa do setor público com abertura ao capital privado, políticas sociais com ajuste fiscal, em um equilíbrio que muda conforme o governo de plantão. A autonomia dos diretórios estaduais é outro traço marcante: muitas vezes, o MDB de um estado apoia um candidato a presidente diferente da orientação nacional, prática tolerada pela direção.',
        'O partido também se orgulha de sua história de resistência ao regime militar, lembrada em documentos e eventos oficiais da legenda. Essa memória convive com a imagem atual de força governista: para os dirigentes, ocupar ministérios é a forma de garantir recursos e influência para as bases municipais, prioridade histórica da sigla. A expressão partido de centro é usada pela própria legenda em seus materiais oficiais.',
      ],
    },
    congresso: {
      titulo: 'Presença permanente',
      paragrafos: [
        'O MDB é tradicionalmente o partido com o maior número de filiados do país e um dos que mais elegem prefeitos e vereadores, posição que manteve por décadas, embora disputada de perto por PSD e PL nas eleições municipais de 2024.',
        'No Congresso, o partido manteve bancadas grandes na Câmara e no Senado, presidiu o Senado em vários períodos, com José Sarney e Renan Calheiros, e integrou as bases de praticamente todos os governos desde a redemocratização. Em 2016, o processo do impeachment levou o vice-presidente Michel Temer à Presidência, onde permaneceu até 2018.',
        'Após 2018, a legenda perdeu espaço na coalizão do governo Bolsonaro, mas seguiu como força relevante. Nos primeiros anos do governo Lula, manteve posição de independência com diálogo, indicando cargos em diferentes momentos.',
        'Nas eleições de 2022, a legenda reelegeu o governador do Pará, Helder Barbalho, e manteve presença em estados do Norte e do Nordeste. Por ser uma das maiores legendas em filiados e votos, o partido também recebe uma das maiores parcelas do fundo partidário, o que sustenta sua estrutura em todo o país.',
      ],
    },
    controversias: {
      titulo: 'Do impeachment à prisão de Temer',
      paragrafos: [
        'A trajetória do partido é marcada por investigações envolvendo lideranças. Em 2019, o ex-presidente Michel Temer chegou a ser preso preventivamente por decisão da primeira instância, em investigação sobre supostas irregularidades envolvendo o Porto de Santos; a prisão foi revogada dias depois pelo Tribunal Regional Federal da 2ª Região. Temer sempre negou as acusações.',
        'Renan Calheiros, um dos principais líderes da legenda, foi alvo de inquéritos e denúncias noticiados ao longo dos anos, sempre negando irregularidades. O partido também convive com a imagem, difundida na imprensa, de força do chamado centrão, bloco informal que negocia apoio em troca de cargos e emendas, imagem que seus dirigentes contestam.',
      ],
    },
    fontes: [
      { label: 'Site oficial do MDB', href: 'https://www.mdb.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    sigla: 'PP',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Uma linhagem desde a ARENA',
      paragrafos: [
        'O PP é herdeiro de uma linhagem partidária que começa na ARENA, partido criado em 1966 para apoiar o regime militar. Com a reforma partidária de 1979, a ARENA deu lugar ao PDS. Em 1993, o PDS se fundiu com o PDC, dando origem ao PPR; no mesmo ano, PST e PTR criaram o PP. Em 1995, PPR e PP se uniram no PPB, o Partido Progressista Brasileiro. Em 2003, o PPB passou a se chamar PP e, em 2017, a legenda adotou o nome Progressistas, mantendo a sigla.',
        'O PPB, nome da legenda nos anos 1990, integrou a base do governo Fernando Henrique Cardoso e chegou a indicar ministros no período. A tradição de participar das coalizões federais se manteve nas décadas seguintes, com a legenda sempre presente nas negociações de cargos e emendas.',
        'Essa sequência de fusões produziu um partido com forte presença no interior do país e no agronegócio, perfil conservador e tradição de pragmatismo. Nos anos 1990, o PPB teve como principal expoente o ex-prefeito de São Paulo Paulo Maluf.',
        'Ao longo das últimas décadas, a legenda integrou as bases dos governos de Fernando Henrique Cardoso, Lula, Dilma, Temer e Bolsonaro, em diferentes momentos, com ministérios e cargos. Na eleição de 1989, a linhagem do partido apoiou Fernando Collor no segundo turno, e a partir de então participou de praticamente todas as coalizões federais.',
        'O PP também é um dos pilares do chamado centrão, bloco informal de partidos que negocia apoio aos governos em troca de cargos e emendas. O termo, usado desde a Assembleia Constituinte, ganhou novo sentido nos anos 2010 para descrever o bloco de partidos médios que passou a concentrar a articulação da Câmara.',
        'Em 2021, o deputado Arthur Lira, do PP de Alagoas, foi eleito presidente da Câmara com apoio do centrão e do governo Bolsonaro, e foi reeleito em 2023, mantendo o partido no centro do comando da Casa. No Senado, o senador Ciro Nogueira, do Piauí, foi líder do governo Bolsonaro e depois ministro-chefe da Casa Civil, entre 2021 e 2022.',
        'A força do partido vem de sua capilaridade: diretórios organizados no interior, bancadas estaduais ativas e uma rede de prefeitos que se renova a cada eleição municipal. Essa estrutura transformou o PP em peça obrigatória das negociações orçamentárias no Congresso.',
        'A legenda também elegeu governadores ao longo de sua história, como Esperidião Amin em Santa Catarina, eleito duas vezes, e mantém bancadas fortes nas assembleias do Sul.',
      ],
    },
    ideologia: {
      titulo: 'Conservadorismo e pragmatismo',
      paragrafos: [
        'O partido se apresenta como conservador e defensor da economia de mercado, da segurança jurídica e da propriedade. Na prática, sua atuação é marcada pelo pragmatismo: o PP participou de governos de esquerda e de direita, priorizando a conquista de cargos e emendas para suas bases eleitorais.',
        'A forte ligação com o agronegócio e com o interior do país dá ao partido um perfil ruralista: a bancada abriga integrantes da Frente Parlamentar da Agropecuária e atua em temas como crédito rural, questões fundiárias e legislação ambiental, com defesa dos interesses do setor produtivo rural.',
        'Em pautas de costumes, predomina o conservadorismo, com posições contrárias à legalização do aborto e defesa de pautas ligadas à família. A legenda evita, em geral, posições radicais e procura manter canais de diálogo com todos os campos políticos, característica que seus dirigentes apresentam como realismo.',
        'A bancada também defende a simplificação tributária e o crédito rural, temas caros às suas bases no interior do país.',
        'O partido também defende a segurança jurídica no campo e a regularização fundiária, pautas recorrentes de suas bancadas rurais.',
      ],
    },
    congresso: {
      titulo: 'Pilar do centrão',
      paragrafos: [
        'O PP manteve ao longo das décadas bancadas expressivas na Câmara, com força especialmente no Sul e em estados como Alagoas e Piauí. A eleição de Arthur Lira para a presidência da Câmara, em 2021, e sua reeleição em 2023 deram ao partido o comando da principal casa legislativa do país.',
        'No Senado, a bancada do partido apoiou os governos de diferentes campos, e Ciro Nogueira ocupou a liderança do governo Bolsonaro na Casa antes de assumir a Casa Civil. O partido também preside comissões relevantes e participa da distribuição de relatorias estratégicas no Congresso.',
        'Em 2024, o partido elegeu prefeitos em centenas de municípios, consolidando sua base municipal, e manteve bancadas expressivas nas assembleias legislativas.',
      ],
    },
    controversias: {
      titulo: 'Do mensalão à Lava Jato',
      paragrafos: [
        'No processo do mensalão, julgado pelo STF em 2012, foram condenados os então deputados Pedro Corrêa e Pedro Henry, dirigentes da legenda, por envolvimento no esquema de compra de apoio parlamentar noticiado em 2005. Ambos negaram as acusações e recorreram das condenações.',
        'A partir de 2014, a Operação Lava Jato alcançou parlamentares e ex-dirigentes do partido, com prisões, delações e condenações noticiadas; alguns casos terminaram em arquivamento ou absolvição. O partido, como legenda, não foi condenado nesses processos, e os envolvidos negam as acusações.',
        'Nos anos 2020, o partido também foi citado em reportagens sobre o uso de emendas parlamentares para ampliar sua influência; o instrumento das emendas de relator, apelidado de orçamento secreto, foi suspenso pelo STF em 2022, após questionamentos de constitucionalidade. O PP, como legenda, não foi condenado nesses processos.',
      ],
    },
    fontes: [
      { label: 'Site oficial do Progressistas', href: 'https://www.progressistas.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'PSD',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'O partido novo com nome antigo',
      paragrafos: [
        'O PSD foi fundado em 2011 pelo então prefeito de São Paulo, Gilberto Kassab, depois que ele deixou o DEM. O registro foi aprovado pelo TSE em setembro daquele ano, e o partido nasceu com discurso de centro, sem alinhamento ideológico rígido, priorizando gestão e resultados.',
        'Kassab deixou o DEM após atritos com a direção da legenda, que criticara seu apoio à candidatura de Dilma Rousseff em 2010. Ao fundar o PSD, ele levou consigo prefeitos e vereadores de vários estados, em um movimento que a imprensa descreveu como a criação de um partido de gestores.',
        'O nome remete ao PSD histórico, criado em 1945 e extinto pelo regime militar em 1965, que teve Juscelino Kubitschek como principal nome. A escolha foi apresentada pela nova legenda como homenagem, mas não há vínculo legal entre as duas siglas.',
        'Em 2015, Kassab aceitou o Ministério das Cidades no governo Dilma, aproximando o partido do governo federal; depois, a legenda apoiou o impeachment de 2016 e integrou a base do governo Temer, com Kassab na Secretaria de Governo.',
        'Nas eleições municipais de 2016, o partido elegeu prefeitos em capitais como Belo Horizonte, com Alexandre Kalil. O crescimento foi acompanhado de filiações em massa: em 2022, o PSD figurava entre os partidos com maior número de prefeitos eleitos no país.',
        'Em pouco mais de uma década, o PSD se tornou um dos maiores partidos do país: elegeu bancadas crescentes na Câmara e no Senado, governadores e milhares de prefeitos. A legenda atraiu sobretudo prefeitos e vereadores, que encontraram nela espaço para manter bases locais sem confronto ideológico.',
        'Kassab comandou a legenda desde a fundação e a manteve liberada nas disputas presidenciais de 2018 e 2022, sem compromisso formal com candidatos. Em 2023, o partido passou a integrar a base do governo Lula, indicando os ministros de Minas e Energia, Alexandre Silveira, e da Pesca e Aquicultura, André de Paula.',
        'O partido também atraiu quadros de outras legendas: em 2022, recebeu a ex-tucana Raquel Lyra, eleita governadora de Pernambuco naquele ano.',
        'Em 2018, o partido elegeu Ratinho Júnior governador do Paraná, reeleito em 2022, e passou a disputar governos estaduais em todas as regiões.',
      ],
    },
    ideologia: {
      titulo: 'Centro e gestão',
      paragrafos: [
        'O PSD se define como um partido de centro. Seus documentos e discursos enfatizam a gestão pública, o desenvolvimento regional e o diálogo, em vez de bandeiras ideológicas. Na prática, o partido evita posições polêmicas e constrói seu programa em torno de temas como infraestrutura, saúde, educação e segurança.',
        'Essa opção rende ao partido críticas de falta de identidade programática; seus dirigentes respondem que o papel da legenda é governar, e não doutrinar. No Congresso, a bancada tende a votar com o governo da vez em questões econômicas e a inclinar-se ao conservadorismo em pautas de costumes, embora com divisões internas.',
        'O partido também defende o municipalismo, a transferência de recursos e decisões para as prefeituras, tema que aparece com frequência nos discursos de seus dirigentes e orienta boa parte das emendas apresentadas pela bancada.',
        'O fundador, Gilberto Kassab, tornou-se conhecido pela defesa da desburocratização e da gestão enxuta, temas que orientam o programa da legenda. O partido também defende o pacto federativo e a revisão das regras de distribuição de recursos com ganhos para os municípios.',
        'Nos estados, o partido costuma adotar programas de governo próprios, sem seguir uma cartilha nacional, o que reforça o perfil descentralizado da legenda.',
      ],
    },
    congresso: {
      titulo: 'Crescimento acelerado',
      paragrafos: [
        'O PSD elegeu em 2022 uma das maiores bancadas da Câmara e manteve presença relevante no Senado. A partir de 2023, com dois ministérios no governo Lula, passou a integrar formalmente a base aliada, depois de anos de independência nas disputas presidenciais.',
        'Nos estados, o partido governa o Paraná, com Ratinho Júnior reeleito, e Pernambuco, com Raquel Lyra. Nas eleições municipais de 2024, ficou entre os partidos que mais elegeram prefeitos no país.',
        'O comando de Kassab, único presidente desde a fundação, dá ao partido uma estabilidade rara: sem disputas públicas de direção, a legenda concentra esforços na articulação parlamentar e na expansão de sua base municipal.',
        'O senador Rodrigo Pacheco, do PSD, preside o Senado desde 2021, posição que deu ao partido papel central na articulação das pautas econômicas do Congresso. Na Câmara, a bancada costuma integrar os blocos majoritários, independentemente do governo.',
      ],
    },
    controversias: {
      titulo: 'A crítica ao pragmatismo',
      paragrafos: [
        'A principal crítica dirigida ao PSD é o pragmatismo: a legenda apoiou governos de campos opostos em poucos anos — Dilma, Temer, Bolsonaro e Lula —, o que leva analistas a classificá-la como parte do centrão. Os dirigentes rebatem dizendo que o partido é de centro por definição e que a participação em governos é forma de servir à população.',
        'Em 2022, o partido liberou a bancada na eleição presidencial, e dirigentes apoiaram candidatos diferentes, prática legal, mas criticada por eleitores que esperam posições claras. A adoção do nome do PSD histórico, sem vínculo jurídico com a sigla extinta em 1965, também gerou questionamentos pontuais na imprensa.',
      ],
    },
    fontes: [
      { label: 'Site oficial do PSD', href: 'https://psd.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'UNIÃO',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Fusão de duas histórias',
      paragrafos: [
        'O União Brasil nasceu da fusão entre DEM e PSL, anunciada em outubro de 2021 e aprovada pelo TSE em fevereiro de 2022. A fusão uniu duas histórias diferentes: a do PFL, partido criado em 1985 por dissidentes do PDS, e a do PSL, legenda fundada em 1994 que cresceu ao abrigar o bolsonarismo.',
        'O PFL apoiou o governo Sarney, participou das coalizões de Fernando Henrique Cardoso, com o vice-presidente Marco Maciel, e se tornou nos anos 1990 uma das maiores forças conservadoras, sob liderança do senador Antônio Carlos Magalhães. Em 2007, o partido mudou de nome para Democratas.',
        'O Democratas atravessou a década de 2010 em declínio: perdeu governadores, bancadas e prefeitos, embora tenha mantido a presidência da Câmara com Rodrigo Maia entre 2016 e 2021, período em que o centrão voltou ao centro das negociações políticas.',
        'O PSL, por sua vez, foi durante anos uma legenda pequena. Em 2018, Jair Bolsonaro se filiou ao partido e venceu a eleição presidencial; o PSL elegeu 52 deputados federais naquele pleito. Após a eleição, a relação do presidente com a direção do partido se rompeu, e Bolsonaro deixou a legenda em novembro de 2019.',
        'O União Brasil herdou a maior base de filiados entre os partidos, vinda do DEM, e uma das maiores bancadas da Câmara. Na eleição de 2022, elegeu a terceira maior bancada da Casa, atrás de PL e PT.',
        'A fusão foi apresentada pelos dirigentes como a criação de uma grande legenda de centro-direita. Internamente, porém, as alas de origem tinham perfis distintos: a do DEM, mais liberal e de quadros tradicionais, e a do PSL, marcada pela base formada em 2018. O comando inicial do novo partido foi entregue a Luciano Bivar, que presidia o PSL.',
        'A fusão foi aprovada em fevereiro de 2022, em tempo de disputar a eleição daquele ano com a nova legenda. O União Brasil entrou na campanha como o partido com o maior número de filiados do país e com bancadas herdadas de duas histórias muito diferentes.',
        'A fusão também concentrou um dos maiores fundos partidário e eleitoral do país, o que deu à legenda estrutura financeira para disputar a eleição de 2022 em todas as unidades da federação.',
      ],
    },
    ideologia: {
      titulo: 'Centro-direita em construção',
      paragrafos: [
        'O União Brasil se apresenta como um partido de centro-direita, defensor da economia de mercado, da segurança pública e de pautas conservadoras nos costumes. Seu programa busca combinar o liberalismo econômico da tradição do DEM com o conservadorismo social que marcou o PSL.',
        'Na prática, a legenda funciona como um grande guarda-chuva: abriga desde políticos ligados ao agronegócio e à bancada evangélica até prefeitos e gestores sem posições ideológicas definidas. Essa amplitude é apresentada pelos dirigentes como força e, pelos críticos, como ausência de programa.',
        'A relação com o bolsonarismo é o ponto mais sensível: depois da saída de Bolsonaro para o PL, o partido procurou construir identidade própria de centro-direita, com diálogo com diferentes campos. Tanto o DEM quanto o PSL apoiaram a reforma da Previdência de 2019 e as pautas econômicas do governo da época, posição que a nova legenda manteve nos anos seguintes.',
        'Em segurança pública, a bancada defende o endurecimento de penas; em economia, apoia pautas de responsabilidade fiscal. A relação com a bancada evangélica e com o agronegócio também marca a legenda, que reúne integrantes dos dois grupos em suas fileiras.',
        'A bancada também atua em pautas municipais, com forte presença de prefeitos na legenda.',
      ],
    },
    congresso: {
      titulo: 'Peso imediato no Congresso',
      paragrafos: [
        'Com a terceira maior bancada da Câmara a partir de 2023, o União Brasil se tornou peça central nas votações: governos de qualquer campo precisam do partido para formar maioria. Em 2023, a legenda passou a integrar a base do governo Lula, indicando os ministros das Comunicações, Juscelino Filho, e do Turismo, Celso Sabino.',
        'No Senado, a bancada também cresceu, e o partido preside comissões relevantes. Nas eleições municipais de 2024, ficou entre os partidos que mais elegeram prefeitos, ampliando sua capilaridade. Em 2025, disputou a presidência da Câmara com candidatura própria, sem sucesso.',
        'Nos estados, o partido governa Goiás com Ronaldo Caiado, reeleito em 2022, e mantém diretórios fortes em todas as regiões.',
      ],
    },
    controversias: {
      titulo: 'Disputas internas',
      paragrafos: [
        'O partido começou a legislatura de 2023 em meio a uma disputa interna pela presidência, entre Luciano Bivar, herdeiro da ala do PSL, e Antonio Rueda, apoiado pela ala do DEM. A briga foi parar na Justiça Eleitoral, que reconheceu a eleição de Rueda como presidente em decisão noticiada em 2024.',
        'A mudança de posição em relação ao governo federal — de opositor a aliado de Lula em menos de um ano — também rendeu críticas: parte da base, identificada com a direita, cobrou coerência, enquanto dirigentes defenderam a participação no governo como forma de ampliar influência. A fusão das duas siglas ainda gerou atritos administrativos noticiados, com disputas por diretórios estaduais e pelo comando do fundo partidário.',
      ],
    },
    fontes: [
      { label: 'Site oficial do União Brasil', href: 'https://uniaobrasil.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'REPUBLICANOS',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Do PRB ao Republicanos',
      paragrafos: [
        'O Republicanos foi criado em 2005 com o nome de Partido Republicano Brasileiro (PRB). A legenda nasceu com o apoio de lideranças ligadas à Igreja Universal do Reino de Deus, e seus primeiros dirigentes eram, em sua maioria, bispos e pastores da igreja, vínculo que marcou o partido desde a origem.',
        'O PRB disputou sua primeira eleição em 2006 e, a partir de 2010, passou a eleger bancadas na Câmara e a crescer em câmaras municipais, com força sobretudo em São Paulo e no Rio de Janeiro, estados de grande presença da Igreja Universal.',
        'A criação foi articulada nos bastidores da igreja, segundo relatos da imprensa, e o primeiro programa da legenda deu centralidade a valores religiosos e à família. Durante anos, o PRB foi uma legenda pequena, com bancadas tímidas na Câmara; o crescimento começou na década de 2010, quando o partido passou a eleger bancadas maiores e a participar de governos estaduais e municipais.',
        'Em 2019, o partido mudou de nome para Republicanos, mantendo a sigla e o número eleitoral. A mudança foi apresentada como forma de ampliar o alcance da legenda para além do público evangélico, sem abandonar as pautas cristãs.',
        'Nas eleições municipais de 2024, o partido manteve prefeituras importantes e cresceu em câmaras municipais, consolidando a estrutura que sustenta sua bancada federal.',
        'O partido foi presidido durante quase toda a sua história por Marcos Pereira, ex-ministro da Indústria e Comércio Exterior no governo Temer. Sob seu comando, a legenda apoiou o governo Bolsonaro entre 2019 e 2022 e, a partir do fim de 2023, passou a integrar a base do governo Lula.',
        'No governo Temer, o partido apoiou a reforma trabalhista de 2017, aprovada com o voto da bancada, e manteve cargos no primeiro escalão.',
        'Em 2016, a bancada apoiou o impeachment de Dilma Rousseff e, em seguida, integrou a base do governo Temer.',
        'Em 2018, ainda como PRB, a legenda declarou apoio a Jair Bolsonaro no segundo turno da eleição presidencial, aliança renovada em 2022.',
        'Em 2022, o partido elegeu a maior bancada de sua história na Câmara dos Deputados. A relação com a Igreja Universal continua sendo o traço distintivo: parlamentares da legenda costumam ser bispos, pastores ou membros da igreja, e o partido mantém atuação intensa em pautas religiosas no Congresso.',
      ],
    },
    ideologia: {
      titulo: 'Valores cristãos e conservadorismo',
      paragrafos: [
        'O Republicanos se apresenta como um partido conservador, defensor dos valores cristãos e da família. Em seus documentos, a legenda defende a liberdade religiosa e posições contrárias à legalização do aborto; em pautas de costumes, a bancada costuma atuar de forma coordenada no Congresso.',
        'No campo econômico, o partido tende a apoiar pautas liberais e a defesa do empreendedorismo, com ênfase em políticas para pequenos negócios. A identidade cristã, porém, é o elemento central do discurso da legenda, que também defende pautas duras de segurança pública.',
        'Apesar do perfil conservador, o partido se manteve aberto a alianças com governos de diferentes campos, priorizando a conquista de cargos e emendas, postura que seus dirigentes justificam como serviço à população e que os críticos classificam como pragmatismo.',
        'Em pautas de costumes, como aborto e drogas, o partido adota posições conservadoras e costuma votar de forma unida. A defesa do pequeno negócio e do emprego aparece como ponte para o eleitorado não religioso.',
        'A bancada também apoia políticas de proteção à maternidade e à primeira infância, temas frequentes nos discursos de seus parlamentares.',
      ],
    },
    congresso: {
      titulo: 'Bancada crescente',
      paragrafos: [
        'O Republicanos elegeu em 2022 sua maior bancada da história na Câmara e passou a ser um partido de porte médio-grande no Congresso. Integrou a base do governo Bolsonaro, votando com o governo nas principais pautas, e apoiou a reeleição do então presidente em 2022.',
        'Em 2023, o partido mudou de posição: passou a integrar a base do governo Lula, indicando Silvio Costa Filho para o Ministério de Portos e Aeroportos. A mudança foi justificada pela direção como busca de espaço para agendas municipais e sociais.',
        'Em 2025, o deputado Hugo Motta, do Republicanos da Paraíba, foi eleito presidente da Câmara dos Deputados com apoio amplo, o primeiro presidente da história do partido a comandar a Casa.',
        'Em 2024, o partido ampliou sua presença municipal, elegendo prefeitos e vereadores em diversos estados. A presidência da Câmara deu à legenda visibilidade nacional e poder de agenda, consolidando o crescimento iniciado na década de 2010.',
      ],
    },
    controversias: {
      titulo: 'Partido e igreja',
      paragrafos: [
        'A ligação com a Igreja Universal é o principal alvo de questionamentos: relatos da imprensa e estudos acadêmicos apontam influência da igreja sobre a legenda, inclusive na seleção de candidatos. O partido nega qualquer subordinação institucional e afirma que a presença de religiosos é consequência natural de sua base.',
        'A presença de bispos e pastores em cargos de comando é citada por estudiosos como exemplo da interface entre religião e política no Brasil, tema de debate acadêmico e jornalístico.',
        'Em 2023, a entrada na base do governo Lula gerou críticas de parte do eleitorado conservador, que cobrou coerência; a direção respondeu que o partido busca resultados, e não alinhamento automático com qualquer campo político.',
      ],
    },
    fontes: [
      { label: 'Site oficial do Republicanos', href: 'https://republicanos10.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'PSB',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Um partido refundado',
      paragrafos: [
        'O PSB é uma das legendas mais antigas em atividade, com uma história que começa em 1947, quando o Partido Socialista Brasileiro foi fundado por intelectuais e militantes de esquerda. Extinto pelo regime militar em 1965, o partido foi refundado em 1985, no processo de redemocratização, por lideranças como o ex-governador de Pernambuco Miguel Arraes.',
        'Em 1989, o PSB integrou a Frente Brasil Popular, que lançou Lula à Presidência, e a bancada do partido esteve presente na Assembleia Constituinte de 1987-1988. Ao longo dos anos 1990, a legenda participou das articulações da esquerda no plano nacional.',
        'Arraes, que fora cassado e exilado após o golpe de 1964, tornou-se a principal liderança do PSB e elegeu-se governador de Pernambuco em 1986 e 1994. A força do partido se concentrou historicamente no Nordeste, em especial em Pernambuco, e a legenda sempre cultivou a imagem de partido de quadros, com presença de técnicos e gestores.',
        'O partido apoiou os governos Lula e Dilma e, em 2013, deixou a base do governo federal, quando o então governador Eduardo Campos, neto de Arraes, se lançou candidato à Presidência. Em agosto de 2014, Campos morreu em um acidente aéreo em Santos durante a campanha; a ex-senadora Marina Silva, filiada ao partido desde 2013, assumiu a candidatura e terminou a eleição em terceiro lugar.',
        'Em 2016, o PSB apoiou o impeachment de Dilma Rousseff e integrou a base do governo Temer, com Fernando Coelho Filho no Ministério de Minas e Energia. Em 2022, o partido apoiou Lula, e o ex-governador Geraldo Alckmin, recém-filiado ao PSB, tornou-se candidato a vice-presidente na chapa vencedora.',
        'Em 2020, João Campos, filho de Eduardo Campos, foi eleito prefeito do Recife, sendo reeleito em 2024. Em 2023, o partido voltou à base do governo Lula, indicando Márcio França para o Ministério de Portos e Aeroportos.',
        'A morte de Campos deixou uma lacuna de liderança: nos anos seguintes, o partido perdeu quadros e bancadas, e a reconstrução passou a depender de nomes como João Campos e de alianças no plano federal.',
        'Em 2002, o PSB apoiou Lula e passou a integrar a base do governo federal, com cargos no segundo escalão e participação nas articulações da coalizão.',
      ],
    },
    ideologia: {
      titulo: 'Socialismo democrático',
      paragrafos: [
        'O PSB se define como um partido socialista democrático: defende a democracia representativa, a economia de mercado com regulação estatal e políticas sociais amplas. Em seus documentos, combina o socialismo com o desenvolvimento nacional, com ênfase no papel do Estado em infraestrutura, educação e ciência.',
        'Ao contrário de partidos de esquerda mais radicais, o PSB sempre aceitou alianças amplas, inclusive com partidos de centro e de direita, o que lhe rendeu o perfil de legenda pragmática de esquerda.',
        'A defesa do Nordeste e do desenvolvimento regional é um traço constante do discurso do partido, que historicamente reivindica políticas de combate à seca e de investimento na região. No plano internacional, a legenda se identifica com o socialismo democrático europeu e participa de fóruns de partidos de esquerda.',
        'Em campanhas e documentos, o partido apresenta a redução das desigualdades regionais como prioridade. A legenda também defende o fortalecimento do sistema público de saúde e de educação, temas centrais dos governos do partido em Pernambuco.',
        'Os governos do PSB em Pernambuco são apresentados pela legenda como vitrines de políticas de educação e saúde no Nordeste.',
      ],
    },
    congresso: {
      titulo: 'Do Nordeste ao governo federal',
      paragrafos: [
        'O PSB governou Pernambuco por quatro mandatos consecutivos, entre 2007 e 2022, com Eduardo Campos e Paulo Câmara, e manteve o Recife com João Campos a partir de 2021. No Congresso, a bancada federal encolheu nas eleições de 2018 e 2022, mas o partido preservou presença em estados do Nordeste e do Sudeste.',
        'A partir de 2023, o partido voltou a integrar a base do governo Lula, indicando Márcio França para o Ministério de Portos e Aeroportos. A bancada passou a apoiar as pautas econômicas do governo, com atenção especial a temas sociais.',
        'Além de Pernambuco, o partido governou João Pessoa com Luciano Cartaxo (2013-2020) e manteve bancadas em assembleias estaduais do Nordeste. A bancada federal votou com o governo em pautas sociais e de arrecadação.',
      ],
    },
    controversias: {
      titulo: 'A dança das alianças',
      paragrafos: [
        'A trajetória de alianças do PSB em uma década — da base de Dilma à oposição, do apoio ao impeachment à base de Temer e, depois, ao apoio a Lula — foi amplamente noticiada e rendeu críticas de inconsistência. Dirigentes do partido responderam que cada mudança foi motivada por avaliações de conjuntura.',
        'A passagem de Marina Silva pelo partido também foi conturbada: ela se filiou em 2013, foi candidata à Presidência em 2014 e deixou a legenda em 2015 para fundar a Rede Sustentabilidade, citando diferenças programáticas.',
        'Setores da esquerda também criticaram o partido por ter apoiado o impeachment de 2016, posição que o PSB defendeu como decisão de princípio. Nos períodos de mudança de aliança, a legenda viu parlamentares migrarem para outras siglas, perda comum em momentos de transição.',
      ],
    },
    fontes: [
      { label: 'Site oficial do PSB', href: 'https://psb40.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    sigla: 'PDT',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'O trabalhismo de Brizola',
      paragrafos: [
        'O PDT foi criado em 1979 por Leonel Brizola, ex-governador do Rio Grande do Sul, exilado durante o regime militar e cunhado do ex-presidente João Goulart. Depois de perder para Ivete Vargas a disputa judicial pelo registro do PTB, Brizola fundou o PDT como herdeiro do trabalhismo, corrente política criada por Getúlio Vargas.',
        'O partido cresceu com o brizolismo: Brizola foi eleito governador do Rio de Janeiro em 1982 e reeleito em 1990, e o PDT dominou a política fluminense nos anos 1980. No Rio, Brizola criou os CIEPs, escolas de tempo integral que se tornaram marca de seus governos. Em 1989, foi candidato a presidente, terminou em terceiro lugar e apoiou Lula no segundo turno.',
        'Nos anos 1990 e 2000, o partido perdeu força: a bancada federal encolheu, e o PDT passou a disputar espaço como força média, com presença em estados como Rio Grande do Sul, Rio de Janeiro, Ceará e Amapá, onde governou por longos períodos com Waldez Góes. Brizola morreu em 2004, e seu nome continua sendo a referência central da legenda.',
        'Em 2015, Ciro Gomes se filiou ao partido e se tornou o principal nome da legenda, candidato à Presidência em 2018, quando terminou em terceiro lugar, e em 2022, quando ficou em quarto.',
        'A relação com o PT marcou a história do partido: aliados em vários momentos — do segundo turno de 1989 ao apoio a Lula em 2022 —, as duas legendas também disputaram o mesmo eleitorado de esquerda. Em 2016, porém, o PDT liberou a bancada na votação do impeachment de Dilma Rousseff, e a maioria dos seus deputados votou a favor, decisão que marcou o distanciamento em relação ao PT.',
        'Nos anos 1980, o partido elegeu Saturnino Braga prefeito do Rio de Janeiro, em 1985, e construiu no estado uma máquina política que durou até meados dos anos 1990. Depois disso, o partido nunca repetiu a força que teve no Rio, passando a crescer em outros estados.',
        'O PDT participou da Assembleia Constituinte de 1987-1988, com bancada própria, e manteve força no Rio Grande do Sul, estado de origem de Brizola. A partir dos anos 1990, a bancada federal encolheu, e o partido passou a depender de lideranças regionais e de alianças no plano nacional.',
      ],
    },
    ideologia: {
      titulo: 'Nacionalismo e desenvolvimento',
      paragrafos: [
        'O PDT se define como um partido trabalhista. Seu programa reivindica o legado de Getúlio Vargas e João Goulart: nacionalismo econômico, papel ativo do Estado, defesa dos direitos trabalhistas e do desenvolvimento industrial. A palavra trabalhista está na origem do nome e na identidade da legenda.',
        'Ao longo dos anos, o partido combinou essa tradição com bandeiras como educação pública em tempo integral, reforma agrária e defesa da soberania nacional.',
        'O PDT também é conhecido pela defesa de um modelo de desenvolvimento com forte presença do Estado na economia, posição que o distingue das legendas liberais. Na prática, porém, o partido se aproximou do centro ao longo do tempo, participando de governos de diferentes campos e acomodando perfis diversos, de sindicalistas a empresários.',
        'O partido também defende a educação em tempo integral, herança dos CIEPs de Brizola, e políticas de geração de emprego com apoio à indústria nacional. No plano institucional, defende o fortalecimento dos direitos trabalhistas e da previdência pública.',
        'O nacionalismo do partido aparece na defesa dos recursos naturais e na oposição à venda de empresas estatais, posições recorrentes nos discursos de suas lideranças.',
      ],
    },
    congresso: {
      titulo: 'Do auge ao encolhimento',
      paragrafos: [
        'O PDT teve nas décadas de 1980 e 1990 uma das maiores bancadas da Câmara, concentrada no Rio de Janeiro; depois, a bancada encolheu. O partido apoiou o impeachment de 2016, decisão que marcou distanciamento do PT, e, em 2022, apoiou Lula no segundo turno.',
        'A partir de 2023, o partido manteve posição de independência em relação ao governo Lula, votando caso a caso, embora tenha indicado Carlos Lupi para o Ministério da Previdência Social. No Senado, a bancada é pequena, mas ativa em temas trabalhistas e previdenciários.',
        'Na legislatura iniciada em 2023, a bancada da Câmara manteve o perfil histórico da legenda, com atuação em temas trabalhistas e em votações de matérias previdenciárias.',
        'O PDT também participa das articulações da base governista em temas trabalhistas, votando com o governo quando avalia que as pautas preservam direitos.',
      ],
    },
    controversias: {
      titulo: 'Rompimentos e rachas',
      paragrafos: [
        'O apoio ao impeachment de Dilma Rousseff, em 2016, dividiu o partido: parte dos filiados, identificada com a tradição de esquerda, criticou a decisão, tomada pela direção nacional, que justificou publicamente a posição.',
        'Após as eleições de 2022, o partido viveu um racha público entre Ciro Gomes e a direção nacional, comandada por Carlos Lupi: o ex-candidato criticou abertamente a gestão da legenda e a relação com o governo Lula, em episódios amplamente noticiados em 2023 e 2024.',
        'A relação com o PT, marcada por alianças e rompimentos, segue como tema de debate interno: o partido alterna críticas ao governo Lula e votos favoráveis, posição que gera atritos entre as alas.',
      ],
    },
    fontes: [
      { label: 'Site oficial do PDT', href: 'https://pdt.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
];
