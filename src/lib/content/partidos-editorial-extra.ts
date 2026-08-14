export interface PartidoEditorialExtra {
  sigla: string;
  atualizadoEm: string;
  historia: { titulo: string; paragrafos: string[] };
  ideologia: { titulo: string; paragrafos: string[] };
  congresso: { titulo: string; paragrafos: string[] };
  controversias: { titulo: string; paragrafos: string[] };
  fontes: { label: string; href: string }[];
}

export const PARTIDOS_EDITORIAL_EXTRA: PartidoEditorialExtra[] = [
  {
    sigla: 'AGIR',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Do PTC ao Agir',
      paragrafos: [
        'O partido conhecido hoje como Agir nasceu com outro nome: o Partido Trabalhista Cristão (PTC), sigla pequena que circulou na política brasileira por décadas disputando eleições proporcionais e servindo de apoio a candidaturas majoritárias de outros partidos. Em 2022, a legenda mudou de nome e passou a se chamar Agir, mantendo o número 36.',
        'A troca de nome foi apresentada pela direção como uma renovação de marca: a sigla queria deixar para trás a identificação religiosa do nome antigo e se apresentar como uma legenda de renovação política. Na prática, a mudança preservou a estrutura enxuta e a capilaridade limitada que sempre caracterizaram o partido.',
        'Como outras legendas pequenas, o Agir nunca teve força para lançar candidaturas majoritárias competitivas. Sua atuação histórica se concentra nas eleições municipais, com candidatos a vereador e a prefeito em cidades de médio e pequeno porte, e no apoio a candidaturas de partidos maiores nos pleitos estaduais e nacionais.',
        'A história do PTC foi marcada por sucessivas mudanças de aliança: a legenda apoiou candidatos de diferentes campos ao longo dos pleitos, comportamento comum a partidos pequenos que disputam espaço nas coalizões. Essa trajetória rendeu à sigla a fama de partido de apoio, presente nas coligações mais do que no comando de projetos próprios.',
        'O partido também conviveu, como outros de seu porte, com a migração de políticos entre legendas: vereadores e prefeitos trocam de partido com frequência, e o Agir funciona, na prática, como uma das portas de entrada e saída desse trânsito partidário, fenômeno regulado pela legislação eleitoral e pela Justiça Eleitoral.',
        'Em 2024, o partido disputou as eleições municipais com o novo nome, apresentando candidaturas concentradas em municípios de pequeno e médio porte, em linha com sua trajetória histórica.'
      ],
    },
    ideologia: {
      titulo: 'Uma legenda de centro sem doutrina rígida',
      paragrafos: [
        'O Agir não se apresenta com uma doutrina econômica fechada. Seus documentos e campanhas falam em renovação política, ética e participação cidadã, sem um programa ideológico detalhado, perfil típico das legendas de centro que priorizam a negociação e a acomodação de interesses regionais.',
        'Na prática, o partido se comporta como força auxiliar: apoia governos e candidaturas de diferentes espectros em troca de espaço e recursos, comportamento que seus dirigentes justificam como pragmatismo necessário à sobrevivência de uma legenda pequena.',
        'A ausência de uma identidade programática marcante faz com que o Agir seja descrito por cientistas políticos como um partido de acomodação, sem base eleitoral própria expressiva. O partido rebate dizendo que sua função é dar voz a demandas locais, especialmente no interior do país.',
        'O partido também procura se diferenciar pela defesa da transparência e da renovação das lideranças políticas, temas recorrentes em seus materiais de campanha.'
      ],
    },
    congresso: {
      titulo: 'Presença discreta no Congresso',
      paragrafos: [
        'No Congresso Nacional, o Agir mantém presença pequena e instável: em alguns pleitos elegeu um ou outro deputado federal, e em outros ficou sem representação na Câmara. No Senado, a legenda raramente esteve presente.',
        'A força eleitoral do partido é proporcional: em eleições municipais, a legenda costuma eleger vereadores em diversas cidades, o que garante ao partido alguma base para negociar apoio nas disputas estaduais e nacionais. A bancada, quando existe, costuma votar com o governo da vez, sem uma orientação partidária rígida.',
        'Nas assembleias legislativas, a presença do partido também é pequena e concentrada em poucos estados, o que reforça o caráter local de sua atuação.'
      ],
    },
    controversias: {
      titulo: 'A crítica às legendas de apoio',
      paragrafos: [
        'A principal crítica dirigida a partidos como o Agir é a de que funcionam como "partidos de aluguel", expressão usada pela imprensa e por cientistas políticos para descrever legendas pequenas que negociam apoio eleitoral e parlamentar em troca de cargos e recursos. O partido rejeita a caracterização e afirma atuar em defesa das demandas de suas bases municipais.',
        'A troca frequente de alianças e a migração de filiados entre legendas também são apontadas por analistas como sintoma do enfraquecimento dos vínculos partidários no Brasil; trata-se, porém, de um fenômeno que atinge todo o sistema partidário, e não apenas o Agir.',
        'A disputa pelo fundo partidário e pelo tempo de propaganda eleitoral, recursos distribuídos conforme o desempenho de cada legenda, é tema recorrente de decisões da Justiça Eleitoral noticiadas pela imprensa, e envolve partidos de todos os portes.'
      ],
    },
    fontes: [
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'AVANTE',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Do PTdoB ao Avante',
      paragrafos: [
        'O Avante é o novo nome do Partido Trabalhista do Brasil (PTdoB), sigla criada na década de 1990 que circulou por anos como legenda pequena, disputando eleições proporcionais e apoiando candidaturas majoritárias de outros partidos. Em 2017, a legenda mudou de nome e passou a se chamar Avante, mantendo o número 70.',
        'O nome antigo remetia ao trabalhismo, corrente política histórica associada a Getúlio Vargas; o novo nome foi escolhido para dar à legenda uma marca mais ampla, descolada da tradição trabalhista, embora o partido continue se apresentando como defensor de pautas sociais e do emprego.',
        'Ao longo de sua trajetória, a legenda se manteve como força auxiliar das grandes coalizões: apoia candidatos a presidente, a governador e a prefeito de outros partidos em troca de espaço nas coligações, comportamento que lhe garantiu sobrevida em um sistema partidário dominado por legendas maiores.',
        'O partido também é conhecido pela capacidade de abrigar políticos em trânsito: deputados, vereadores e prefeitos que deixam outras legendas encontram no Avante uma porta de entrada rápida, o que faz da sigla uma das opções frequentes nas janelas de migração partidária.',
        'Nas eleições municipais, o Avante costuma eleger vereadores em diversas cidades, com presença mais visível no Sudeste e no Nordeste. A bancada federal, quando existe, é pequena e costuma votar com o governo da vez.',
        'Em 2022, o partido participou das eleições apoiando candidaturas majoritárias em diversos estados, mantendo o perfil de legenda de apoio das coligações.',
        'A legenda mantém diretórios em todas as regiões do país, embora com estrutura pequena, e disputa eleições municipais em todo o território nacional.'
      ],
    },
    ideologia: {
      titulo: 'Trabalhismo de fachada e pragmatismo',
      paragrafos: [
        'O Avante se apresenta como um partido popular e trabalhista, herdeiro do nome que carregou até 2017. Em seus materiais, a legenda defende a geração de emprego, o fortalecimento dos direitos sociais e a presença do Estado na economia, discurso próximo do centro político brasileiro.',
        'Na prática, porém, a atuação do partido é marcada pelo pragmatismo: sem uma base ideológica rígida, a legenda negocia apoio a governos de diferentes campos, priorizando a conquista de cargos e emendas para suas bases.',
        'Essa combinação de discurso social com prática de acomodação rende ao partido a classificação de legenda de centro, sem posições marcantes em pautas de costumes, tema em que a sigla costuma evitar posicionamentos públicos.',
        'O partido evita se posicionar em temas divisivos, preferindo concentrar o discurso em pautas sociais e econômicas, o que o torna um aliado cômodo em qualquer coalizão.',
        'Em campanhas, a legenda costuma destacar a defesa do emprego e da renda, temas que aproximam o partido do eleitorado popular nos municípios.',
        'O partido também costuma defender o fortalecimento do ensino profissionalizante em suas campanhas.'
      ],
    },
    congresso: {
      titulo: 'Força municipal, bancada pequena',
      paragrafos: [
        'No Congresso, o Avante mantém uma bancada pequena, que varia a cada eleição, com presença ocasional no Senado. A maior força da legenda está nas câmaras municipais, onde elege vereadores em diversas regiões do país.',
        'A legenda integrou em diferentes momentos as bases de apoio de governos estaduais e do governo federal, indicando cargos de segundo escalão e participando das negociações de emendas parlamentares, sem nunca ter ocupado o centro das articulações políticas nacionais.',
        'Nas assembleias legislativas, a legenda elege deputados estaduais em alguns estados, o que reforça sua presença nas negociações regionais e nas disputas municipais.'
      ],
    },
    controversias: {
      titulo: 'A crítica do "partido de aluguel"',
      paragrafos: [
        'Como outras legendas pequenas, o Avante é alvo da crítica de que negocia apoio em troca de cargos e recursos, descrição associada pela imprensa ao chamado centrão, bloco informal de partidos que historicamente condiciona apoio a vantagens materiais. A direção do partido nega a caracterização e afirma que a legenda defende pautas populares.',
        'A migração frequente de filiados para o partido e a ausência de uma identidade ideológica clara também alimentam o debate sobre o papel das legendas de apoio no sistema político brasileiro; os dirigentes rebatem dizendo que o Avante dá voz a setores sem representação própria.',
        'O uso das janelas partidárias, períodos em que a legislação permite trocar de partido sem perder o mandato, é apontado por analistas como um dos motores do crescimento de legendas como o Avante; o partido afirma que recebe políticos que compartilham de suas bandeiras.'
      ],
    },
    fontes: [
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'CIDADANIA',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Do PPS ao Cidadania',
      paragrafos: [
        'O Cidadania é o novo nome do Partido Popular Socialista (PPS), adotado em 2019. O PPS, por sua vez, nasceu em 1992 de uma cisão do Partido Comunista Brasileiro (PCB), fundado em 1922 e considerado o partido mais antigo do país: um grupo liderado por Roberto Freire deixou o PCB e fundou uma legenda social-democrata, rompendo com a tradição comunista.',
        'O novo partido apoiou as candidaturas de Fernando Henrique Cardoso à Presidência em 1994 e 1998, aproximando-se do PSDB, e em 2002 lançou Ciro Gomes à Presidência, com votação relevante que projetou a legenda nacionalmente.',
        'Nos anos seguintes, o PPS oscilou entre a oposição e o apoio a governos de diferentes campos: apoiou candidatos do PSDB em várias eleições, votou a favor do impeachment de Dilma Rousseff em 2016 e integrou a base do governo Temer, quando Roberto Freire, presidente histórico da legenda, comandou o Ministério da Cultura.',
        'Em 2019, o partido mudou de nome para Cidadania, mantendo o número 23, com a justificativa de renovar a marca. Roberto Freire, que presidiu a legenda por décadas, deixou o partido em 2021, em meio à crise de identidade que atingiu a sigla após anos de encolhimento.',
        'Em 2022, o Cidadania formou federação partidária com o PSDB, aliança que garantiu a sobrevivência parlamentar das duas legendas a partir daquele ano. A federação, válida por quatro anos, passou a ser descrita por analistas como uma estratégia de sobrevivência de dois partidos que perderam força nas últimas décadas.',
        'Nas décadas de 1990 e 2000, o partido se destacou pelo discurso de ética na política e pela defesa da reforma política, temas que marcaram as campanhas da legenda e deram a ela uma identidade própria, distinta das grandes siglas.'
      ],
    },
    ideologia: {
      titulo: 'Social-democracia em declínio',
      paragrafos: [
        'O PPS nasceu com um programa social-democrata: defesa da economia de mercado com políticas sociais, direitos civis e reforma política. Essa tradição foi mantida pelo Cidadania, que se apresenta como uma legenda de centro, com ênfase em ética pública, transparência e defesa das instituições.',
        'O partido também ficou conhecido por insistir na agenda da reforma política, como o financiamento público de campanhas e o voto em lista, pautas que defendeu por anos no Congresso.',
        'Na prática, porém, a legenda perdeu espaço: sem um eleitorado cativo e com bancadas cada vez menores, o Cidadania passou a depender de alianças para sobreviver, comportamento que seus dirigentes justificam como realismo e que os críticos classificam como perda de identidade.',
        'A legenda também é conhecida por defender pautas de transparência e de combate à corrupção, e por apoiar regras eleitorais mais rígidas, como cláusulas de desempenho, pautas que, na prática, atingem também legendas pequenas como a própria.'
      ],
    },
    congresso: {
      titulo: 'Do protagonismo ao encolhimento',
      paragrafos: [
        'O PPS teve bancadas expressivas na Câmara nos anos 1990 e início dos anos 2000, com deputados como Fernando Gabeira e o próprio Roberto Freire. A partir de 2014, porém, a bancada encolheu nas últimas eleições, e o partido passou a ter presença pequena no Congresso.',
        'No Senado, a legenda manteve presença ocasional. A federação com o PSDB, firmada em 2022, garantiu ao Cidadania a permanência parlamentar e o cumprimento da cláusula de barreira até o fim do período da aliança, em um formato que passou a concentrar a atuação das duas legendas.',
        'No plano estadual, o partido elege deputados em algumas assembleias legislativas e participa de governos de coalizão em diferentes unidades da federação, indicando cargos em secretarias e órgãos da administração.'
      ],
    },
    controversias: {
      titulo: 'A dança das alianças',
      paragrafos: [
        'A trajetória de alianças do partido — do apoio a FHC ao lançamento de Ciro Gomes, da oposição aos governos petistas ao apoio ao impeachment e ao governo Temer — foi amplamente noticiada e rendeu críticas de inconsistência. A direção sempre defendeu cada mudança como decisão de princípio, ligada à defesa da ética e das instituições.',
        'A mudança de nome para Cidadania não reverteu o declínio: a saída de Roberto Freire, em 2021, e a federação com o PSDB em 2022 foram interpretadas pela imprensa como sinais do esvaziamento da legenda, que nega estar em extinção e afirma seguir atuante nas pautas de reforma política.',
        'A federação com o PSDB foi precedida de longas negociações e gerou debate interno sobre a identidade da legenda; dirigentes afirmam que a aliança preserva a autonomia do partido e não impede que ele apresente candidaturas próprias.'
      ],
    },
    fontes: [
      { label: 'Site oficial do Cidadania', href: 'https://cidadania23.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'MOBILIZA',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'O PMN vira Mobilização Nacional',
      paragrafos: [
        'O partido hoje chamado Mobilização Nacional nasceu em 1984, no processo de redemocratização, com o nome de Partido da Mobilização Nacional (PMN). Entre os fundadores esteve o arquiteto Oscar Niemeyer, um dos nomes mais conhecidos do país, o que deu à legenda uma origem ligada à intelectualidade de esquerda.',
        'Anos depois, o partido mudou de nome e passou a se chamar Mobilização Nacional, mantendo o número 33 e a estrutura enxuta de sempre. A troca foi apresentada como uma forma de modernizar a marca, sem alterar o perfil da legenda.',
        'O PMN sempre foi um partido pequeno: sua atuação se concentra nas eleições municipais, com candidatos a vereador e a prefeito, e no apoio a candidaturas majoritárias de outras legendas nos pleitos estaduais e nacionais.',
        'Ao longo das décadas, o partido integrou coalizões de diferentes campos: esteve na base dos governos petistas em diferentes momentos e, em outros pleitos, apoiou candidaturas de centro e de direita, comportamento típico de legendas pequenas que sobrevivem da negociação de espaço nas coligações.',
        'A história da legenda também é marcada pelo trânsito de políticos: o PMN, como outras siglas pequenas, serviu de abrigo para vereadores, prefeitos e deputados que trocavam de partido, fenômeno comum no sistema político brasileiro e regulado pela Justiça Eleitoral.',
        'Nas eleições de 2018 e 2022, a legenda não lançou candidato próprio à Presidência, mantendo o perfil de força auxiliar das coligações, comportamento que se repetiu em pleitos anteriores.',
        'A fundação do partido, em 1984, ocorreu no mesmo período da campanha das Diretas Já, que reivindicava eleições diretas para presidente, contexto que marcou a primeira década da legenda.',
        'O partido passou a usar o novo nome nas eleições municipais de 2024, mantendo o perfil de legenda de apoio.'
      ],
    },
    ideologia: {
      titulo: 'Centro sem programa fechado',
      paragrafos: [
        'O Mobilização Nacional não tem uma doutrina ideológica rígida. O partido se apresenta como uma legenda de centro, com discurso voltado à participação popular e à mobilização social, em referência ao próprio nome, mas sem um programa econômico detalhado.',
        'Na prática, a sigla funciona como força de acomodação: apoia candidaturas de diferentes espectros, priorizando a conquista de cargos e emendas para suas bases municipais, comportamento que os dirigentes justificam como realismo político.',
        'A ausência de posições marcantes em temas polêmicos, como costumes e economia, faz do partido um aliado cômodo em qualquer coalizão, o que explica sua longevidade em um sistema partidário fragmentado.',
        'O discurso oficial da legenda, em campanhas e documentos, enfatiza a participação popular e a mobilização social, sem detalhar propostas específicas de governo.',
        'Na prática, o partido raramente apresenta candidaturas próprias aos principais cargos majoritários, funcionando como parceiro de coligações nos estados e municípios.'
      ],
    },
    congresso: {
      titulo: 'Presença pequena e instável',
      paragrafos: [
        'No Congresso, o Mobilização Nacional mantém presença pequena: em alguns pleitos elegeu deputados federais, em outros ficou sem representação na Câmara, e no Senado a legenda raramente esteve presente.',
        'A base eleitoral do partido está nas câmaras municipais e nas prefeituras de cidades pequenas e médias. Quando elege deputados, a bancada costuma votar com o governo da vez, sem orientação partidária rígida, e a legenda participa das negociações de emendas e cargos.',
        'Nas assembleias legislativas, o partido elege deputados estaduais em poucos estados, e sua atuação parlamentar é pouco visível no debate nacional.',
        'A legenda também costuma apoiar candidaturas majoritárias locais em troca de espaço nas coligações, prática que garante sua presença nas disputas municipais.'
      ],
    },
    controversias: {
      titulo: 'Pequenas legendas sob suspeita',
      paragrafos: [
        'Partidos pequenos como o Mobilização Nacional são frequentemente descritos pela imprensa e por cientistas políticos como "partidos de aluguel", expressão que designa legendas que negociam apoio eleitoral em troca de vantagens. O partido rejeita a caracterização e afirma atuar em defesa das demandas locais de suas bases.',
        'A mudança de nome e as constantes migrações de filiados também são apontadas por analistas como sintomas da fragilidade do vínculo entre partidos e eleitores no Brasil, um debate que atinge todo o sistema partidário, e não apenas esta legenda.',
        'A sobrevivência das legendas pequenas depende, na prática, do fundo partidário e do tempo de propaganda eleitoral, recursos distribuídos conforme o desempenho nas urnas; a disputa por esses recursos entre as siglas é tema recorrente de decisões da Justiça Eleitoral noticiadas pela imprensa.'
      ],
    },
    fontes: [
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'NOVO',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'A aposta liberal de 2011',
      paragrafos: [
        'O Partido Novo foi fundado em 2011, em São Paulo, por um grupo de empresários e profissionais liberais, entre eles João Amoêdo, executivo de banco que se tornou o principal rosto da legenda. O partido nasceu com um discurso radical de liberalismo econômico e de crítica à política tradicional, o que rendeu à sigla a imagem de "partido dos empresários".',
        'O registro levou anos para ser aprovado: a legenda precisou coletar assinaturas em todo o país e só teve o registro confirmado pelo TSE em 2015. No ano seguinte, o NOVO disputou sua primeira eleição, as municipais de 2016, elegendo vereadores em algumas cidades.',
        'Em 2018, o partido lançou João Amoêdo à Presidência. A candidatura teve votação modesta, mas projetou o partido nacionalmente: o NOVO elegeu uma pequena bancada federal e passou a ser tratado como a principal legenda liberal do país.',
        'Em 2021, Amoêdo anunciou sua saída do partido, em meio a divergências internas amplamente noticiadas pela imprensa. Em 2022, o partido lançou Luiz Felipe d\'Avila à Presidência, também com votação modesta, e elegeu novamente uma pequena bancada federal.',
        'Apesar do tamanho, o NOVO se tornou referência da agenda liberal: privatizações, corte de gastos, reforma administrativa e redução de impostos são bandeiras permanentes da legenda, que também ficou conhecida por abrir mão do fundo partidário e do fundo eleitoral, mantendo a estrutura com contribuições de filiados.',
        'O partido também se notabilizou por uma comunicação direta com o eleitorado jovem e urbano, com forte presença nas redes sociais e um discurso de crítica à política tradicional, marca que o acompanha desde a fundação.',
      ],
    },
    ideologia: {
      titulo: 'Menos Estado, mais mercado',
      paragrafos: [
        'O NOVO se define como liberal e tem como programa a redução do tamanho do Estado: defende privatizações, simplificação tributária, reforma administrativa e a participação da iniciativa privada na gestão de serviços públicos, com menos regulação e menos impostos.',
        'No plano político, a legenda defende o fim do financiamento público de campanhas e a redução do número de partidos, pautas que repete em todos os pleitos. O partido também defende o voto distrital como forma de aproximar eleitor e eleito, tema recorrente em seus documentos.',
        'A legenda também é conhecida pelo estilo de gestão: defende a meritocracia no serviço público, o controle de gastos e a transparência, temas que seus parlamentares costumam levar às comissões e aos plenários.',
        'Na prática, o partido costuma votar contra aumentos de despesas públicas e a favor de pautas de ajuste fiscal, posições que o colocam em confronto frequente com partidos de esquerda e com parte do centrão.',
        'O NOVO defende ainda a liberdade de escolha em educação e saúde, com o financiamento público vinculado ao cidadão, tema presente em seus programas e em seus debates internos.',
      ],
    },
    congresso: {
      titulo: 'Bancada pequena, agenda vocal',
      paragrafos: [
        'O NOVO elegeu pequenas bancadas na Câmara dos Deputados em 2018 e 2022, mantendo presença discreta no Senado. Apesar do tamanho, a bancada ficou conhecida pela atuação vocal em pautas econômicas e por votar de forma coesa contra projetos que ampliam gastos públicos.',
        'Nos estados, o partido elegeu deputados estaduais em algumas assembleias e, nas eleições municipais, cresceu de forma gradual, elegendo vereadores em várias cidades. O partido também adotou o chamado mandato compartilhado, pelo qual parte do salário dos parlamentares é destinada à legenda, prática usada como marca distintiva.',
        'Nas eleições municipais, o partido tem disputado prefeituras e câmaras em cidades médias e grandes, com resultados que variam conforme a região, e mantém estrutura organizada em vários estados.',
      ],
    },
    controversias: {
      titulo: 'Radicalismo e saída do fundador',
      paragrafos: [
        'No segundo turno da eleição de 2018, a direção do NOVO declarou apoio a Jair Bolsonaro, decisão que dividiu filiados e militantes, com parte do partido defendendo neutralidade. O episódio é citado pela imprensa como um dos momentos de maior tensão interna da legenda.',
        'A saída de João Amoêdo, em 2021, foi atribuída pela imprensa a divergências sobre os rumos do partido; o fundador passou a criticar publicamente a gestão da legenda, em episódios acompanhados de perto pela imprensa.',
        'O partido também é criticado por setores da esquerda por defender o enxugamento do Estado e por sua postura dura em relação a políticas sociais; os dirigentes rebatem dizendo que a agenda liberal é a forma de garantir crescimento e emprego.',
        'Entre 2019 e 2022, o partido manteve posição crítica em relação a diversas pautas do governo Bolsonaro, sobretudo as que envolviam gastos públicos, e apoiou outras, como a reforma da Previdência, aprovada em 2019, posição que rendeu críticas de ambos os lados do espectro político.',
      ],
    },
    fontes: [
      { label: 'Site oficial do NOVO', href: 'https://novo.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'PCdoB',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Comunistas desde 1962',
      paragrafos: [
        'O PCdoB foi fundado em 1962, a partir de uma cisão do Partido Comunista Brasileiro (PCB), criado em 1922 e considerado o partido mais antigo do país. A divergência que originou o novo partido envolvia a avaliação sobre o caminho para o socialismo no Brasil, tema que dividia os comunistas brasileiros desde então.',
        'Ilegal durante o regime militar, o PCdoB organizou a Guerrilha do Araguaia, na região entre o Pará e o Tocantins, duramente combatida pelas Forças Armadas no início dos anos 1970. Com a redemocratização, a partir de 1985, o partido voltou à legalidade e passou a disputar eleições.',
        'O partido elegeu parlamentares para a Assembleia Constituinte de 1987-1988 e, em 1989, apoiou a candidatura de Luiz Inácio Lula da Silva à Presidência. Desde 2002, o PCdoB integra as coalizões lideradas pelo PT, com presença constante na base dos governos Lula, Dilma e, novamente, Lula.',
        'João Amazonas, um dos fundadores, presidiu o partido de 1962 até sua morte, em 2002. A atual presidente é Luciana Santos, que em 2023 assumiu o Ministério da Ciência, Tecnologia e Inovação no governo Lula.',
        'O partido também é conhecido pela militância em movimentos sociais e estudantis: a União da Juventude Socialista (UJS), ligada ao PCdoB, tem forte presença nas universidades, e a legenda mantém relações estreitas com partidos comunistas de outros países, em especial o Partido Comunista da China.',
        'O partido também é reconhecido pela disciplina organizativa: congressos periódicos, diretórios em todos os estados e uma militância formada em escolas partidárias, estrutura rara entre legendas do seu porte.',
      ],
    },
    ideologia: {
      titulo: 'Socialismo e frentes amplas',
      paragrafos: [
        'O PCdoB se define como partido comunista e defende o socialismo como perspectiva para o Brasil. Na prática, porém, a legenda atua no campo democrático, participando de frentes amplas de esquerda e de governos de coalizão, posição que a distingue de correntes revolucionárias menores.',
        'O partido defende o fortalecimento do Estado, os direitos trabalhistas, a reforma agrária e políticas de redistribuição de renda. No plano internacional, apoia governos e partidos de orientação socialista, posição que lhe rende críticas de adversários.',
        'A relação com a China é um dos traços mais comentados: o PCdoB mantém intercâmbio partidário e diplomático com o país asiático, tema que alimenta debates sobre influência externa na política brasileira; o partido nega qualquer subordinação e afirma defender a soberania nacional.',
        'O partido defende ainda a ampliação da participação popular e o fortalecimento dos movimentos sociais, pautas que aproximam a legenda de centrais sindicais e de movimentos de juventude e de mulheres.',
      ],
    },
    congresso: {
      titulo: 'Bancada pequena e fiel à base',
      paragrafos: [
        'O PCdoB mantém uma bancada pequena na Câmara dos Deputados, com presença quase nula no Senado, mas com atuação constante: a legenda participa das articulações da base governista e indica cargos em diferentes escalões.',
        'Historicamente, a bancada vota de forma coesa com os governos petistas: apoiou a reeleição de Dilma Rousseff em 2014, votou contra o impeachment em 2016 e, em 2022, apoiou Lula desde o primeiro turno. Após a vitória, a presidente da legenda foi indicada para o Ministério da Ciência, Tecnologia e Inovação.',
        'O partido também mantém força em governos municipais e estaduais, especialmente em alianças com o PT, e suas bases estão concentradas em capitais e cidades universitárias.',
        'O partido também elege vereadores e prefeitos em cidades médias, frequentemente em coligações com o PT, e mantém secretarias estaduais em diversas unidades da federação.',
      ],
    },
    controversias: {
      titulo: 'Críticas e defesa da trajetória',
      paragrafos: [
        'O partido é alvo recorrente de críticas por sua proximidade com a China e por defender governos considerados autoritários por parte da comunidade internacional; os dirigentes rebatem dizendo que o partido defende a soberania e o direito de cada país escolher seu caminho.',
        'Adversários também acusam a legenda de defender pautas radicais, como a estatização da economia; o partido nega e aponta sua atuação nos governos de coalizão como prova de pragmatismo.',
        'A história do partido é marcada pela defesa de suas origens: em documentos e eventos, a legenda celebra a resistência à ditadura e rejeita comparações com regimes autoritários, posição que os críticos contestam.',
        'A indicação da presidente do partido para um ministério no governo Lula, em 2023, foi recebida com críticas pela oposição e com apoio da base governista, episódio amplamente noticiado.',
      ],
    },
    fontes: [
      { label: 'Site oficial do PCdoB', href: 'https://pcdob.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
      { label: 'Fundação Maurício Grabois', href: 'https://grabois.org.br' },
    ],
  },
  {
    sigla: 'PODE',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Do PTN ao Podemos',
      paragrafos: [
        'O Podemos é o novo nome do Partido Trabalhista Nacional (PTN), adotado em 2017. O PTN era uma legenda pequena, sem força eleitoral própria, que sobrevivia apoiando candidaturas majoritárias de outros partidos e negociando espaço nas coalizões.',
        'A mudança de nome, acompanhada de novo programa e nova marca, foi apresentada como uma tentativa de renovação: o partido passou a se apresentar como uma legenda de centro, com discurso de renovação política e combate à corrupção, e manteve o número 19.',
        'Em 2018, o partido lançou o senador Álvaro Dias à Presidência. A candidatura terminou em quarto lugar, com cerca de 8,7 milhões de votos, o melhor resultado da história da legenda, e transformou o Podemos em uma força média no cenário nacional.',
        'Em 2021, o ex-juiz Sergio Moro, ex-ministro da Justiça, filiou-se ao partido como pré-candidato à Presidência. Em março de 2022, porém, Moro deixou a legenda antes da campanha, em meio a divergências públicas com a direção, em episódio amplamente noticiado pela imprensa.',
        'Sem seu principal nome, o partido não lançou candidato próprio à Presidência em 2022 e voltou a atuar como força auxiliar, participando das articulações do Congresso e mantendo bancada pequena na Câmara e no Senado.',
        'O PTN, antes da mudança de nome, era conhecido como uma das legendas que mais abrigavam políticos em trânsito partidário, característica que o Podemos manteve após a troca de nome.',
        'O crescimento após 2018 atraiu prefeitos e vereadores de outras siglas, e a legenda passou a disputar espaço nas eleições municipais de 2020 e 2024, mantendo, porém, o porte médio.',
      ],
    },
    ideologia: {
      titulo: 'Centro e renovação política',
      paragrafos: [
        'O Podemos se apresenta como uma legenda de centro, sem alinhamento ideológico rígido. O partido construiu sua marca em torno do discurso de renovação política e de combate à corrupção, temas que dominaram a candidatura de Álvaro Dias em 2018.',
        'Na prática, porém, a legenda adota o pragmatismo típico das legendas médias: negocia apoio a governos de diferentes campos em troca de cargos e espaço, comportamento que seus dirigentes justificam como realismo.',
        'A deputada federal Renata Abreu, de São Paulo, preside o partido desde a mudança de nome, e a legenda mantém uma estrutura enxuta, com força concentrada em poucos estados.',
        'O partido também defende a reforma do sistema político e a redução de privilégios do serviço público, temas recorrentes no discurso de suas lideranças.',
        'Em campanhas, a legenda costuma apoiar candidaturas locais de diferentes partidos, priorizando a eleição de vereadores, base da estrutura partidária.',
        'O partido também defende a modernização da gestão pública e o uso de tecnologia nos serviços do Estado.',
      ],
    },
    congresso: {
      titulo: 'Bancada pequena, articulação constante',
      paragrafos: [
        'O Podemos mantém bancada pequena na Câmara dos Deputados e presença discreta no Senado. Apesar do tamanho, o partido participa das articulações do Congresso e costuma negociar com o governo da vez, indicando cargos em diferentes momentos.',
        'A legenda também elege vereadores e prefeitos em eleições municipais, com presença mais visível em São Paulo e em estados do Sul e do Nordeste, e a bancada federal tende a votar caso a caso, sem posição partidária rígida.',
        'Em 2022, o partido elegeu deputados federais em vários estados, mantendo bancada pequena, e, após a eleição, passou a negociar pontualmente com o governo eleito.',
        'O partido também mantém diretórios em todos os estados e disputa as eleições municipais com candidaturas proporcionais, base de sua estrutura.',
      ],
    },
    controversias: {
      titulo: 'A crise da saída de Moro',
      paragrafos: [
        'A passagem de Sergio Moro pelo partido terminou em crise pública: após a saída, em março de 2022, o ex-juiz e dirigentes do Podemos trocaram acusações noticiadas pela imprensa, e o episódio passou a ser citado como exemplo dos limites das chamadas prévias presidenciais.',
        'O partido também é criticado por abrigar políticos de diferentes campos e por mudar de posição conforme o governo, crítica comum a legendas de centro; a direção rebate dizendo que a independência é a marca da legenda.',
        'A legenda também foi criticada por setores do eleitorado por ter recebido políticos vindos de governos petistas e de governos de direita; a direção afirma que o partido é de centro por definição e que a pluralidade é uma de suas marcas.',
        'O partido, apesar do porte médio, mantém presença nas articulações do Congresso e nos debates sobre reforma política.',
      ],
    },
    fontes: [
      { label: 'Site oficial do Podemos', href: 'https://podemos.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'PRD',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'A fusão de PTB e Patriota',
      paragrafos: [
        'O Partido Renovação Democrática (PRD) nasceu da fusão entre o PTB e o Patriota, aprovada pelo TSE em novembro de 2023. A união juntou duas histórias muito diferentes: a do trabalhismo histórico e a do nacionalismo conservador.',
        'O PTB foi fundado em 1945, no fim do Estado Novo, por lideranças ligadas a Getúlio Vargas, e extinto pelo regime militar em 1965. Em 1981, no processo de redemocratização, a sigla foi recriada por Ivete Vargas, sobrinha do ex-presidente, e voltou a disputar eleições.',
        'O Patriota, por sua vez, era o antigo Partido Ecológico Nacional (PEN), que mudou de nome em 2018. Em 2018, o Patriota lançou Cabo Daciolo à Presidência, candidatura marcada por um discurso nacionalista e religioso que teve votação modesta.',
        'A fusão ocorreu depois de as duas legendas não alcançarem, nas eleições de 2022, o desempenho mínimo exigido pela cláusula de barreira, regra que condiciona o funcionamento partidário ao desempenho eleitoral. ',
        'O processo de união envolveu disputas judiciais entre grupos das duas legendas, noticiadas pela imprensa, e o PRD passou a disputar as eleições seguintes reunindo parte das bases do PTB e do Patriota.',
        'O PTB, em sua longa história, participou das principais coalizões da Nova República: integrou a base do governo Collor, ocupou ministérios em governos do PT, como o do Turismo, e se aproximou do governo Bolsonaro nos anos finais da sigla.',
        'O nome do novo partido, Renovação Democrática, foi apresentado pelos dirigentes como um recomeço, sem vinculação com o passado das duas siglas.',
        'O partido adotou o número eleitoral 25 no registro da fusão.',
      ],
    },
    ideologia: {
      titulo: 'Conservadorismo e trabalhismo',
      paragrafos: [
        'O PRD reúne duas tradições: o trabalhismo do PTB, ligado à defesa dos direitos dos trabalhadores, e o nacionalismo conservador do Patriota, marcado por posições religiosas e pela defesa da soberania nacional.',
        'Na prática, o partido se posiciona no campo da direita e da centro-direita, com discurso de defesa da família, da segurança pública e da economia de mercado, sem uma doutrina econômica detalhada.',
        'Como as demais legendas pequenas, o PRD busca crescer abrigando políticos de outras siglas e negociando espaço nas coalizões, comportamento que seus dirigentes apresentam como pragmatismo.',
        'O partido também procura abrigar candidaturas ligadas a setores religiosos e ao nacionalismo, herança do Patriota, e ao trabalhismo sindical, herança do PTB, em um arranjo que combina as duas tradições.',
        'No plano econômico, o partido defende a livre iniciativa com proteção ao trabalhador, síntese que procura conciliar as heranças das duas siglas.',
      ],
    },
    congresso: {
      titulo: 'Bancada herdada da fusão',
      paragrafos: [
        'O PRD começou sua trajetória com uma bancada pequena, formada por deputados vindos do PTB e do Patriota, com presença ocasional no Senado. A legenda busca ampliar espaço com filiações de parlamentares de outras siglas, prática comum entre partidos recém-criados.',
        'Nos estados, o partido mantém diretórios em todas as regiões e disputa eleições municipais, elegendo vereadores e prefeitos em cidades de diferentes portes.',
        'O PRD disputou as eleições municipais de 2024 com candidaturas em todas as regiões, elegendo vereadores em diversas cidades, e passou a disputar espaço nas articulações do Congresso, com a direção negociando filiações de parlamentares de outras siglas.',
      ],
    },
    controversias: {
      titulo: 'A herança de Roberto Jefferson',
      paragrafos: [
        'A história do PTB, parte da fusão que deu origem ao PRD, é marcada pela figura de Roberto Jefferson, presidente da legenda por anos. Jefferson ficou conhecido por ter revelado, em 2005, o esquema que ficaria conhecido como mensalão; foi condenado pelo STF em 2012 no julgamento do caso e sempre negou as acusações.',
        'Em 2017, Jefferson recebeu indulto presidencial. Em outubro de 2022, foi preso em sua residência depois de, segundo a Polícia Federal, reagir com disparos à prisão; ele afirmou ter agido em legítima defesa. O episódio foi amplamente noticiado e marcou o fim da gestão dele no partido.',
        'A fusão com o Patriota foi apresentada pelos dirigentes como uma forma de recomeço, mas a herança das duas legendas segue sendo tema de debate entre críticos e defensores do novo partido.',
        'O processo de fusão, que envolveu a definição da direção, do número eleitoral e do patrimônio das duas legendas, foi acompanhado de disputas judiciais noticiadas pela imprensa, resolvidas em decisões da Justiça Eleitoral.',
      ],
    },
    fontes: [
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'PSOL',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'A dissidência do PT que virou partido',
      paragrafos: [
        'O PSOL foi fundado em 2004 por dissidentes do PT, após a expulsão, em 2003, de parlamentares que votaram contra a reforma da Previdência proposta pelo governo Lula. A primeira presidente foi Heloísa Helena, senadora à época, e o partido nasceu com o número 50.',
        'Em 2006, Heloísa Helena foi candidata à Presidência e terminou a disputa em terceiro lugar, resultado que deu ao PSOL projeção nacional. Nos pleitos seguintes, o partido lançou Plínio de Arruda Sampaio (2010), Luciana Genro (2014) e Guilherme Boulos (2018 e 2022).',
        'Boulos, uma das lideranças do MTST, movimento de moradia, foi eleito deputado federal por São Paulo em 2022 com a maior votação do país para o cargo naquele pleito. Antes, em 2020, ele disputou o segundo turno da eleição para a prefeitura de São Paulo e foi derrotado por Bruno Covas; em 2024, perdeu novamente no segundo turno, para Ricardo Nunes.',
        'Em 2016, a deputada Luiza Erundina, filiada ao PSOL, disputou o segundo turno da eleição para a prefeitura de São Paulo contra João Doria. Em 2018, o deputado Jean Wyllys, reeleito naquele ano, renunciou ao mandato em janeiro de 2019 e deixou o Brasil, citando ameaças de morte.',
        'Em 2022, o PSOL formou federação partidária com a Rede Sustentabilidade, aliança que passou a disputar as eleições em conjunto e a funcionar como um único bloco no Congresso.',
        'O partido também se destacou pela eleição de parlamentares jovens e ligados a movimentos sociais, como a deputada federal Sâmia Bomfim, de São Paulo, e por construir base eleitoral principalmente nas grandes capitais.',
        'O partido também elege vereadores em capitais e em cidades médias, presença que sustenta sua estrutura nacional.',
      ],
    },
    ideologia: {
      titulo: 'Socialismo de múltiplas correntes',
      paragrafos: [
        'O PSOL se define como um partido socialista e defende a superação do capitalismo, com forte ênfase em direitos sociais, igualdade de gênero, direitos humanos e pautas ambientais. Internamente, a legenda abriga correntes que vão do trotskismo ao socialismo democrático, em um arranjo que gera debates permanentes.',
        'O partido ficou conhecido pela oposição firme a governos de direita e por pautas progressistas no Congresso, como a demarcação de terras indígenas e a defesa do SUS e da educação pública.',
        'No plano eleitoral, o PSOL defende a construção de frentes de esquerda, mas mantém críticas a alianças amplas, posição que o distingue de partidos como o PT na política de coalizão.',
        'No plano institucional, o partido defende a reforma do sistema político, com financiamento público de campanhas e fortalecimento da democracia participativa, como conselhos e orçamentos participativos.',
      ],
    },
    congresso: {
      titulo: 'Bancada pequena e vocal',
      paragrafos: [
        'O PSOL mantém bancada pequena na Câmara dos Deputados, com presença ocasional no Senado, mas com atuação desproporcional ao tamanho: seus parlamentares costumam liderar votações de destaque em pautas de direitos humanos e de costumes.',
        'O partido apoia o governo Lula com críticas, sem integrar a coalizão ministerial. A federação com a REDE, válida por quatro anos, garante ao PSOL o cumprimento da cláusula de barreira e amplia a bancada do bloco no Congresso.',
        'A bancada do PSOL também atua em pautas como a reforma urbana e o direito à moradia, temas ligados à trajetória de Boulos no MTST, além da demarcação de terras indígenas e da defesa do sistema público de saúde e de educação.',
        'A bancada também atua na defesa dos direitos LGBTQIA+ e de pautas feministas no Congresso.',
      ],
    },
    controversias: {
      titulo: 'Radicalismo e disputas internas',
      paragrafos: [
        'O partido é criticado por adversários por seu radicalismo e por pautas consideradas extremas; os dirigentes rebatem dizendo que o PSOL defende princípios e não abre mão de posições programáticas para agradar aliados.',
        'Internamente, a legenda convive com disputas entre correntes, que em diferentes momentos resultaram em expulsões, saídas e rachas noticiados pela imprensa. A relação com o PT também oscila entre a aliança eleitoral e a crítica, tema recorrente nos debates internos do partido.',
        'A federação firmada com a REDE em 2022 uniu legendas de perfis distintos, o que exigiu negociação constante entre as direções; o arranjo teve atritos pontuais relatados pela imprensa.',
        'O partido também enfrenta críticas por sua atuação de oposição dentro de governos aliados, posição que gera atritos com o PT; dirigentes afirmam que a autonomia crítica é uma marca da legenda.',
      ],
    },
    fontes: [
      { label: 'Site oficial do PSOL', href: 'https://psol.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'PV',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'Verde desde 1986',
      paragrafos: [
        'O Partido Verde foi fundado em 1986, no processo de redemocratização, reunindo militantes ambientalistas, exilados que voltavam ao país e lideranças de movimentos sociais. Já em 1989, o partido lançou Fernando Gabeira à Presidência da República, na primeira eleição direta desde 1960.',
        'Nas décadas seguintes, o PV se consolidou como a principal legenda ambientalista do país, embora pequena: sua atuação se concentra nas câmaras municipais e em bancadas reduzidas na Câmara dos Deputados. O partido mantém o número 43.',
        'O momento de maior projeção veio com Marina Silva: ex-ministra do Meio Ambiente, Marina deixou o PT em 2009 e se filiou ao PV, disputando a Presidência em 2010. A candidatura obteve mais de 19 milhões de votos, o melhor resultado da história do partido, e terminou em terceiro lugar.',
        'Em 2011, Marina deixou o PV, citando diferenças com a estrutura da legenda, e o partido voltou ao tamanho habitual. Em 2016, a legenda apoiou o impeachment de Dilma Rousseff e, em seguida, integrou a base do governo Temer, com José Sarney Filho no Ministério do Meio Ambiente.',
        'Ao longo dos anos, o PV alternou alianças com campos diferentes, comportamento que seus dirigentes justificam como pragmatismo em defesa da agenda ambiental e que críticos apontam como falta de coerência.',
        'A campanha de 2010 foi o auge eleitoral do partido, que nunca mais repetiu o desempenho daquele ano. Em 2014 e 2018, a legenda apoiou candidaturas presidenciais de centro e de centro-direita, posições que renderam críticas de ambientalistas.',
        'A legenda também manteve, ao longo dos anos, vereadores em diversas cidades, base que sustenta a estrutura partidária no interior.',
      ],
    },
    ideologia: {
      titulo: 'Ambientalismo e pragmatismo',
      paragrafos: [
        'O PV se define como partido ecologista: defende a agenda ambiental, o desenvolvimento sustentável, as energias renováveis e a proteção de biomas como a Amazônia. Essas bandeiras dão à legenda uma identidade clara, rara entre partidos pequenos.',
        'Na prática, porém, o partido convive com o pragmatismo das alianças: para sobreviver, o PV apoiou governos de diferentes espectros, o que gerou críticas de ambientalistas quando as coalizões adotaram políticas consideradas contrárias à agenda ambiental.',
        'No Congresso, a bancada costuma atuar em temas ambientais e de mudança do clima, com participação em frentes parlamentares do setor, e o partido defende a participação da sociedade civil na fiscalização das políticas públicas.',
        'O partido também defende a economia circular, a redução do uso de agrotóxicos e a proteção dos recursos hídricos, pautas recorrentes de seus parlamentares em comissões temáticas.',
        'No plano institucional, o partido defende o fortalecimento dos órgãos de proteção ambiental e o aperfeiçoamento do licenciamento, temas centrais de sua agenda parlamentar.',
      ],
    },
    congresso: {
      titulo: 'Bancada pequena, agenda permanente',
      paragrafos: [
        'O PV mantém bancada pequena na Câmara dos Deputados, com presença ocasional no Senado. A força da legenda está nas câmaras municipais, onde elege vereadores em diversas cidades, e em prefeituras de municípios médios.',
        'A agenda ambiental garante ao partido um papel desproporcional ao tamanho: em temas como código florestal, mudança do clima e licenciamento ambiental, a bancada verde costuma ser ouvida, mesmo sendo minoritária. O partido também atua em frentes parlamentares e em comissões temáticas.',
        'O partido também participa de governos estaduais e municipais em diferentes regiões, indicando secretários e ocupando cargos na administração, prática comum às legendas pequenas.',
        'A estrutura do PV, presente em todos os estados, sustenta candidaturas proporcionais em diversos municípios a cada eleição municipal.',
      ],
    },
    controversias: {
      titulo: 'Entre a bandeira e as alianças',
      paragrafos: [
        'A principal crítica dirigida ao PV é a distância entre o discurso ambiental e o apoio a governos com políticas consideradas contrárias à agenda; ambientalistas já cobraram publicamente coerência da legenda, que responde dizendo que a negociação é a forma de avançar pautas no Congresso.',
        'A passagem de Marina Silva pelo partido terminou com críticas públicas dela à estrutura da legenda, e sua saída, em 2011, foi amplamente noticiada. O episódio marcou o partido, que voltou a ser uma legenda pequena após o auge eleitoral de 2010.',
        'O partido também é criticado por sua baixa densidade programática fora da área ambiental; dirigentes respondem que a especialização temática é uma escolha da legenda.',
        'O partido também enfrenta o desafio de renovar lideranças, tema recorrente entre legendas pequenas.',
      ],
    },
    fontes: [
      { label: 'Site oficial do PV', href: 'https://pv.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'REDE',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'O partido de Marina Silva',
      paragrafos: [
        'A Rede Sustentabilidade nasceu de um movimento lançado pela ex-senadora Marina Silva em 2011, logo após a saída dela do PV, e foi formalizada como partido em 2015, com registro aprovado pelo TSE naquele ano. A legenda manteve o número 18.',
        'O projeto nasceu com a proposta de uma política baseada na sustentabilidade, na participação social e na ética, e Marina, ex-ministra do Meio Ambiente e ex-candidata à Presidência, é a principal referência do partido até hoje.',
        'Em 2018, Marina foi candidata à Presidência pela REDE e obteve cerca de 1% dos votos válidos, resultado que frustrou as expectativas criadas pela campanha de 2010. No segundo turno daquele ano, a legenda declarou apoio a Fernando Haddad.',
        'Também em 2018, o partido elegeu Joênia Wapichana, primeira deputada federal indígena da história do Brasil, por Roraima, mandato que marcou a presença da REDE no Congresso.',
        'Em 2022, o partido formou federação com o PSOL, aliança que passou a funcionar como um único bloco no Congresso, e apoiou Lula na eleição daquele ano. Em 2023, Marina Silva tomou posse como ministra do Meio Ambiente no terceiro governo Lula.',
        'O projeto da REDE nasceu com a coleta de assinaturas em todo o país, processo que durou anos e que a legenda usou para construir uma militância organizada em comitês locais.',
        'A legenda também disputou eleições estaduais e municipais, elegendo vereadores e, em alguns estados, deputados estaduais, embora em números pequenos.',
        'A REDE manteve, desde a fundação, o discurso de independência em relação aos partidos tradicionais, marca que acompanha o partido até hoje.',
      ],
    },
    ideologia: {
      titulo: 'Sustentabilidade como programa',
      paragrafos: [
        'A REDE se define como um partido da sustentabilidade: o programa combina agenda ambiental, direitos humanos, defesa da democracia participativa e transparência pública, em um discurso que a legenda apresenta como alternativa tanto à esquerda tradicional quanto ao liberalismo.',
        'No plano econômico, o partido defende a chamada economia verde, com geração de emprego a partir de energias limpas e da preservação ambiental, e a participação da sociedade civil na definição das políticas públicas.',
        'Na prática, a REDE atua como partido de centro-esquerda, com bancada pequena e dependência da liderança de Marina Silva, característica que seus críticos apontam como fragilidade e seus dirigentes, como coerência.',
        'O partido defende ainda a ampliação da participação de mulheres e de minorias na política, tema recorrente no discurso de suas lideranças, e a transparência na gestão pública.',
        'A legenda também defende a transparência nas contas públicas e o controle social do orçamento, temas presentes em seus programas.',
      ],
    },
    congresso: {
      titulo: 'Bancada pequena, voz ativa',
      paragrafos: [
        'A REDE mantém bancada pequena na Câmara dos Deputados e presença discreta no Senado, e sua sobrevivência parlamentar é garantida pela federação com o PSOL, que também assegura o cumprimento da cláusula de barreira até o fim do período da aliança.',
        'A atuação da bancada é concentrada em temas ambientais e de direitos humanos. Com Marina Silva no Ministério do Meio Ambiente, a legenda passou a ter influência direta na formulação da política ambiental do governo Lula, área de constante atrito com o Congresso.',
        'A bancada da REDE na Câmara foi reduzida ao longo das legislaturas, e o partido passou a depender da aliança com o PSOL para manter estrutura de funcionamento no Congresso.',
        'A REDE também atua em frentes parlamentares ambientais e de direitos humanos.',
      ],
    },
    controversias: {
      titulo: 'Dependência e atritos',
      paragrafos: [
        'Analistas descrevem a REDE como um partido de um nome só, pela centralidade de Marina Silva; a legenda rebate apontando a existência de militância organizada e de comitês em vários estados.',
        'A condução da política ambiental no governo Lula gerou atritos públicos entre a ministra e setores do Congresso e do próprio governo, notadamente em torno de projetos de infraestrutura na Amazônia; os episódios foram amplamente noticiados e expuseram as tensões entre a agenda ambiental e o desenvolvimento econômico.',
        'A federação com o PSOL, firmada em 2022, exigiu a convivência de duas culturas partidárias diferentes, processo acompanhado de atritos pontuais noticiados pela imprensa.',
        'Setores do agronegócio e do Congresso questionaram medidas da pasta do Meio Ambiente; a ministra defendeu a política ambiental do governo em declarações públicas.',
        'A legenda também foi questionada por sua pequena capilaridade municipal, tema que os dirigentes reconhecem como desafio.',
      ],
    },
    fontes: [
      { label: 'Site oficial da REDE', href: 'https://redesustentabilidade.org.br' },
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
  {
    sigla: 'SOLIDARIEDADE',
    atualizadoEm: '2026-08-14',
    historia: {
      titulo: 'O PHS que virou Solidariedade',
      paragrafos: [
        'O Solidariedade é o novo nome do Partido Humanista da Solidariedade (PHS), adotado em 2013. A mudança ocorreu sob o comando de Paulo Pereira da Silva, o Paulinho da Força, dirigente sindical que preside a legenda e também comandou a Força Sindical, uma das maiores centrais sindicais do país.',
        'A ligação com o sindicalismo marcou o partido desde então: o Solidariedade se apresenta como porta-voz dos trabalhadores e mantém atuação em pautas trabalhistas, embora na prática negocie apoio a governos de diferentes campos, como a maioria das legendas médias.',
        'O partido mantém o número 77 e uma estrutura de porte pequeno, com presença mais visível em São Paulo, base eleitoral de seu presidente, e em estados do Sudeste e do Nordeste.',
        'Em 2016, o partido apoiou o impeachment de Dilma Rousseff e, nos anos seguintes, votou a favor das reformas trabalhista e da Previdência, em linha com a orientação de sua direção sindical naquele período. Nos pleitos presidenciais, a legenda apoiou candidaturas de outros partidos, sem candidato próprio.',
        'Nas eleições municipais, o Solidariedade costuma eleger vereadores e prefeitos em cidades médias, e sua bancada federal, pequena, participa das articulações do Congresso.',
        'O PHS, antes da mudança de nome, era uma legenda pequena, sem representação expressiva, que disputava eleições proporcionais em alguns estados. A adoção do nome Solidariedade, em 2013, coincidiu com a aproximação do partido das centrais sindicais, e a legenda passou a crescer em câmaras municipais.',
        'O partido também é conhecido pela presença de dirigentes sindicais em sua estrutura, tanto na direção nacional quanto nos diretórios estaduais, característica que o distingue de outras legendas médias.',
        'O partido, desde então, disputa todas as eleições com candidaturas próprias em vários estados.',
      ],
    },
    ideologia: {
      titulo: 'Trabalhismo e negociação',
      paragrafos: [
        'O Solidariedade se apresenta como partido trabalhista: defende os direitos dos trabalhadores, a geração de emprego e o diálogo entre capital e trabalho, herança da trajetória sindical de seu presidente.',
        'Na prática, porém, a legenda atua como força de centro, negociando apoio a governos em troca de cargos e emendas, comportamento que seus dirigentes justificam como a forma de garantir espaço para as pautas sindicais e que os críticos classificam como pragmatismo.',
        'O partido evita posições marcantes em pautas de costumes e concentra seu discurso em temas econômicos e sociais, como emprego, renda e proteção ao trabalhador.',
        'O partido defende a manutenção dos direitos trabalhistas e a negociação coletiva como instrumento de mediação de conflitos, pautas típicas do sindicalismo brasileiro.',
        'A legenda também defende políticas de qualificação profissional e de apoio às micro e pequenas empresas, temas frequentes nos discursos de suas lideranças.',
      ],
    },
    congresso: {
      titulo: 'Bancada pequena nas articulações',
      paragrafos: [
        'O Solidariedade mantém bancada pequena na Câmara dos Deputados, com presença ocasional no Senado. A legenda participa das articulações do Congresso e costuma negociar com o governo da vez, indicando cargos em diferentes momentos.',
        'Nos estados, o partido elege deputados estaduais e vereadores em diversas cidades, com força especial em São Paulo. A bancada federal tende a votar com o governo da vez, priorizando pautas trabalhistas quando estão em jogo.',
        'Em 2018 e 2022, o partido elegeu deputados federais em diversos estados, mantendo bancada pequena, e participou das negociações de cargos e emendas do Congresso.',
        'Como outras legendas de porte médio, o Solidariedade mantém diretórios em todos os estados e participa das disputas municipais por meio de coligações regionais.',
      ],
    },
    controversias: {
      titulo: 'Sindicalismo sob crítica',
      paragrafos: [
        'A relação entre o partido e a Força Sindical é apontada por estudiosos como exemplo da interface entre sindicalismo e política no Brasil; os dirigentes do partido afirmam que a ligação é natural, pois a legenda nasceu para dar voz aos trabalhadores.',
        'Como outras legendas médias, o Solidariedade é alvo da crítica de pragmatismo, por alternar o apoio a governos de campos diferentes; a direção rebate dizendo que a negociação é o caminho para aprovar pautas em um Congresso fragmentado.',
        'A alternância de apoios do partido, entre campos políticos opostos, também rendeu críticas de analistas e de setores do movimento sindical; a direção rebate dizendo que a negociação é a marca histórica do sindicalismo brasileiro.',
        'O partido, ao longo dos anos, também esteve envolvido em debates sobre o uso do fundo partidário, tema comum entre legendas médias e pequenas.',
      ],
    },
    fontes: [
      { label: 'Registro no TSE', href: 'https://www.tse.jus.br/partidos/partidos-registrados-no-tse' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br' },
    ],
  },
];
