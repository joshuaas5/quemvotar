export interface UfEditorialSecao {
  titulo: string;
  paragrafos: string[];
}

export interface UfEditorial {
  uf: string; // sigla em minusculo: 'sp', 'rj', ...
  nome: string; // nome do estado: 'São Paulo', ...
  atualizadoEm: string;
  bancada: UfEditorialSecao;      // perfil da bancada estadual no Congresso
  temas: UfEditorialSecao;        // temas regionais recorrentes
  historia: UfEditorialSecao;     // histórico de representação
  fontes: { label: string; href: string }[];
}

export const UFS_EDITORIAL: UfEditorial[] = [
  {
    uf: 'ac',
    nome: 'Acre',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada compacta, peso federativo',
      paragrafos: [
        'O Acre elege uma das menores bancadas da Câmara dos Deputados, em linha com a dimensão do seu eleitorado, e três senadores, o mesmo número de todas as unidades da federação. A pequena delegação convive com uma agenda ampla: a distância de Brasília, o isolamento por estradas e as particularidades amazônicas fazem da infraestrutura e das políticas sociais temas permanentes da representação acreana. A capital, Rio Branco, concentra a maior parte da população e dos serviços, enquanto os municípios do interior dependem de estradas e de políticas específicas.',
        'Na Câmara, a bancada costuma somar forças com as demais delegações do Norte em pautas regionais, como energia, transporte e regularização fundiária. No Senado, os três representantes do estado têm o mesmo peso dos grandes estados, característica que reforça o papel da casa como instância de equilíbrio entre as unidades da federação e dá voz proporcional a um dos menores colégios eleitorais do país. Essa regra constitucional garante aos estados pequenos uma voz que a proporcionalidade da Câmara não oferece.',
        'A composição da delegação alterna perfis ligados ao funcionalismo público, ao setor produtivo e aos movimentos sociais, reflexo das disputas locais entre diferentes projetos para a região. A renovação parcial a cada eleição mantém a bancada em movimento, sem apagar o traço comum de defesa de políticas para a Amazônia e de atenção aos municípios isolados do interior. O funcionalismo público e as transferências federais pesam na economia local, o que aproxima a agenda da bancada do orçamento da União.',
      ],
    },
    temas: {
      titulo: 'Amazônia, fronteira e a memória da borracha',
      paragrafos: [
        'O território acreano é coberto em grande parte pela floresta amazônica, e a economia local combina pecuária, extrativismo, agricultura familiar e serviços públicos. O estado faz fronteira com o Peru e a Bolívia, o que traz à agenda temas de integração sul-americana, comércio de fronteira e cooperação em saúde, segurança e educação nas cidades limítrofes. Os rios Acre, Purus e Juruá orientam a ocupação e o transporte em boa parte do território.',
        'A história da borracha moldou o povoamento: seringais e seringueiros ocuparam o atual território entre o fim do século XIX e meados do século XX, em um ciclo que deixou marcas na cultura e na ocupação rural. Mais recentemente, o Acre se tornou referência em debates sobre desenvolvimento sustentável, manejo florestal e preservação da floresta em pé, com políticas estaduais que projetaram o estado no debate nacional sobre o clima. Essa experiência influenciou políticas de crédito e de assistência técnica para a agricultura familiar em todo o país.',
        'As cheias e vazantes do rio Acre afetam municípios quase todos os anos, e a BR-364 segue como principal via de ligação com o restante do país. Essas condições mantêm na pauta da representação federal as obras de infraestrutura, a prevenção de desastres e o atendimento às populações ribeirinhas e indígenas, temas que reaparecem em todas as legislaturas. A defesa civil e o apoio às populações atingidas por cheias são pautas que costumam unir a delegação.',
      ],
    },
    historia: {
      titulo: 'Do território federal ao estado',
      paragrafos: [
        'O Acre foi incorporado ao Brasil no início do século XX, ao fim de um período de disputa com a Bolívia pela região, marcado pela chamada Revolução Acreana. O Tratado de Petrópolis, assinado em 1903, definiu a fronteira e integrou definitivamente o território ao país, em troca de compensações e da construção da ferrovia Madeira-Mamoré, que ligaria o Acre ao rio Amazonas. A economia da borracha, então em alta, deu ao Acre importância estratégica para o Brasil na região.',
        'Por décadas, a região foi administrada como território federal, sem representação eleita no Congresso Nacional. Em 1962, o Acre foi elevado à condição de estado e passou a eleger governador, deputados federais e senadores, incorporando-se ao sistema federativo como as demais unidades e iniciando sua história própria de representação política. A elevação a estado foi recebida como conquista da população local, que passou a ter voz direta nas decisões nacionais.',
        'Desde então, a representação acreana se consolidou em torno das pautas amazônicas e do desenvolvimento regional, com participação constante nas discussões sobre reformas e distribuição de recursos federais. A combinação de bancada pequena na Câmara e três senadores garante ao estado voz própria nas negociações nacionais, em um país onde as unidades menos populosas dependem fortemente do orçamento federal. O estado também participa dos debates sobre reformas administrativa e tributária, que afetam diretamente as finanças das unidades menores.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'al',
    nome: 'Alagoas',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Presença que supera o tamanho do eleitorado',
      paragrafos: [
        'Alagoas elege uma bancada federal de porte médio e três senadores, mas costuma projetar no Congresso uma influência superior ao tamanho do seu eleitorado. Parlamentares do estado aparecem com frequência em posições de comando na Câmara dos Deputados, inclusive na presidência da Casa, o que amplia o peso da delegação nas negociações nacionais e na distribuição de recursos para o Nordeste. A presença de alagoanos em cargos de comando nas duas casas é uma constante histórica, reforçada pela atuação em comissões estratégicas e relatorias.',
        'A bancada atua de forma recorrente em pautas regionais, como convivência com a seca, obras hídricas, programas sociais e desenvolvimento do semiárido. No Senado, os representantes alagoanos participam das discussões federativas e de temas ligados à economia local, como a indústria sucroalcooleira, a produção de gás natural e o polo químico instalado no estado. A bancada também acompanha os repasses federais para saúde e educação, áreas sensíveis para a população e para os municípios.',
        'A composição da delegação combina nomes de diferentes partidos e espectros ideológicos, com renovação parcial a cada eleição. As disputas pelas cadeiras costumam ser acirradas e envolver as principais lideranças locais, em um estado de forte enraizamento partidário e de tradição de grupos políticos que se alternam no comando da representação federal. As eleições municipais, que renovam as bases eleitorais, costumam antecipar mudanças na composição da bancada.',
      ],
    },
    temas: {
      titulo: 'Cana, turismo e o rio São Francisco',
      paragrafos: [
        'A economia alagoana tem raízes históricas na cana-de-açúcar e na indústria sucroalcooleira, setor que organizou o interior do estado e ainda sustenta municípios da Zona da Mata. A capital, Maceió, concentra serviços, comércio e o turismo de praia, atividade que cresceu nas últimas décadas e se tornou importante geradora de empregos e de arrecadação. O polo químico e a indústria de alimentos completam a base industrial, enquanto o comércio e a construção sustentam a capital.',
        'No litoral, as lagoas Mundaú e Manguaba e a foz do rio São Francisco, na divisa com Sergipe, formam paisagens de grande apelo turístico e importância ecológica. O baixo São Francisco também está no centro de debates sobre revitalização do rio, pesca e convivência com a seca no sertão alagoano, uma das áreas historicamente mais atingidas do Nordeste. A região também concentra projetos de agricultura irrigada e de piscicultura, atividades em expansão no baixo São Francisco.',
        'A pesca, o artesanato em filé e as festas populares completam o perfil cultural do estado, que enfrenta ainda desafios urbanos na região metropolitana de Maceió. Esses temas aparecem com frequência nas emendas e requerimentos da bancada federal e nos debates sobre investimentos federais, da infraestrutura hídrica ao saneamento básico. A renda local depende fortemente dos serviços, o que torna a bancada sensível às políticas federais de crédito e de emprego.',
      ],
    },
    historia: {
      titulo: 'Uma província nascida de Pernambuco',
      paragrafos: [
        'Alagoas foi desmembrada de Pernambuco em 1817 e elevada à condição de província no início do século XIX, ainda no período colonial tardio. Desde então, o estado mantém representação nas instâncias legislativas nacionais, da Assembleia Geral do Império ao Congresso da República, com participação nas principais discussões políticas do país em todos os períodos. A criação da província foi um desdobramento da Revolução Pernambucana de 1817, episódio que reorganizou a divisão administrativa do Nordeste.',
        'No século XX, a política alagoana acompanhou ciclos econômicos, do açúcar à indústria química e ao gás natural, e construiu uma elite política de forte enraizamento local, com capilaridade nos municípios do interior. A representação federal refletiu essas fases, alternando períodos de maior ou menor protagonismo nacional, mas sempre preservando bancada proporcional à população. A chegada de indústrias, a partir dos anos 1960, diversificou uma economia que dependia da cana e aproximou a bancada das pautas de desenvolvimento.',
        'Nas últimas décadas, o estado ganhou atenção nacional por avanços em indicadores sociais, movimento atribuído a políticas de transferência de renda e programas de saúde. A história recente da representação alagoana combina permanência de grupos tradicionais com renovação, um equilíbrio comum entre os estados do Nordeste e que se mantém nas sucessivas legislaturas. Os desafios de infraestrutura e de diversificação produtiva seguem orientando a atuação da delegação no Congresso.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'am',
    nome: 'Amazonas',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'A bancada da Zona Franca',
      paragrafos: [
        'O Amazonas elege uma das maiores bancadas entre os estados do Norte e três senadores, e sua representação no Congresso é fortemente associada à Zona Franca de Manaus. O polo industrial da capital é o principal vetor econômico do estado, e a defesa dos incentivos fiscais da região aparece como pauta transversal da delegação amazonense em todas as legislaturas. A renovação periódica dos incentivos, decidida no Congresso, é acompanhada ano a ano pela delegação, que articula apoio de outras regiões.',
        'Na Câmara, a bancada atua em bloco com as demais delegações amazônicas em temas como infraestrutura de transporte, energia e regularização fundiária. No Senado, os três representantes do estado participam das comissões ligadas ao desenvolvimento regional e à política ambiental, áreas em que o Amazonas é diretamente interessado, tanto pela floresta quanto pelo modelo industrial. A bancada também se dedica a temas de saúde nas fronteiras e de educação indígena, áreas de demandas específicas do estado.',
        'A composição da delegação reflete a geografia do estado: parlamentares ligados a Manaus e à indústria convivem com representantes de municípios do interior, acessíveis principalmente por via fluvial. As eleições locais costumam renovar parte da bancada, mantendo, porém, o consenso em torno das pautas da Zona Franca e da presença do Estado na região. A pluralidade do eleitorado, entre a capital industrial e um interior de forte presença ribeirinha e indígena, se reflete na composição da delegação.',
      ],
    },
    temas: {
      titulo: 'Floresta, rios e o modelo de Manaus',
      paragrafos: [
        'O Amazonas é o maior estado do país em área e abriga a maior parte da floresta amazônica em território nacional, com Manaus, a maior cidade da região, isolada no meio da selva. O transporte é feito sobretudo pelos rios, e as secas e cheias extremas dos últimos anos expuseram a vulnerabilidade logística e humana de municípios que dependem do nível das águas. O encontro dos rios Negro e Solimões, que forma o Amazonas, concentra a maior bacia hidrográfica do planeta e é símbolo da região.',
        'A Zona Franca de Manaus, criada na década de 1960, concentra indústrias de eletroeletrônicos, duas rodas e química, sustentadas por incentivos fiscais que são renovados periodicamente pelo Congresso. O modelo gera empregos na capital e atrai investimentos, mas convive com desigualdades entre Manaus e o interior, tema recorrente nos debates sobre políticas para a Amazônia. O debate sobre o modelo envolve empregos, tecnologia e o futuro do comércio na região, temas que mobilizam a sociedade amazonense.',
        'Biodiversidade, povos indígenas, unidades de conservação e o potencial da bioeconomia completam o quadro de temas que mobilizam a representação amazonense. As discussões sobre mudanças climáticas e desenvolvimento sustentável deram ao estado papel central nos debates nacionais e internacionais sobre o futuro da floresta e das populações que dela dependem. Pesquisadores e organizações ambientais na região aproximam a pauta local dos fóruns internacionais sobre clima e biodiversidade.',
      ],
    },
    historia: {
      titulo: 'Da borracha à Zona Franca',
      paragrafos: [
        'O Amazonas viveu no fim do século XIX e início do século XX o auge do ciclo da borracha, que transformou Manaus em uma das cidades mais ricas do país e financiou obras como o Teatro Amazonas e o porto flutuante. O declínio do extrativismo, com a concorrência asiática, mergulhou o estado em décadas de estagnação econômica e de perda populacional relativa. O auge do extrativismo atraiu trabalhadores de todo o país e financiou uma vida cultural que marcou a cidade até hoje.',
        'A criação da Zona Franca de Manaus, na década de 1960, mudou essa trajetória ao atrair indústrias para o coração da Amazônia e reverter o fluxo migratório. Desde então, a representação amazonense no Congresso se organiza em torno da defesa do modelo, renovado por decisões do Legislativo, do Executivo e do Judiciário ao longo dos anos, sempre com forte debate público. As renovações do modelo, acompanhadas de contrapartidas de investimento, foram negociadas pela representação amazonense em todas as legislaturas.',
        'A história política recente do estado também registra a expansão da presença do Estado na região, com universidades, institutos de pesquisa e políticas de proteção ambiental. A combinação de uma bancada numerosa para os padrões do Norte com três senadores dá ao Amazonas peso relevante nas negociações federativas e nas pautas ambientais nacionais. A capital concentra a maior parte da população, mas o interior segue prioridade em pautas de saúde, educação e transporte.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'ap',
    nome: 'Amapá',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Delegação pequena, agenda própria',
      paragrafos: [
        'O Amapá elege uma das menores bancadas da Câmara dos Deputados, em razão da população reduzida, e três senadores no Senado Federal. Apesar do tamanho, a delegação costuma ter atuação organizada em torno das pautas amazônicas e de fronteira, temas que marcam o cotidiano do estado e dependem diretamente de decisões federais. A presença federal é decisiva no estado, que depende de transferências para financiar serviços básicos em municípios pequenos e isolados.',
        'Na Câmara, os representantes do Amapá integram frentes ligadas à Amazônia, à infraestrutura e às populações tradicionais. No Senado, os três senadores do estado participam das comissões de desenvolvimento regional e meio ambiente, com peso igual ao das grandes unidades da federação, característica que valoriza a representação dos estados menos populosos. A delegação também acompanha os programas de segurança nas fronteiras e as políticas para as populações indígenas e quilombolas.',
        'A composição da bancada alterna perfis ligados ao funcionalismo público, ao setor produtivo e a movimentos comunitários, em um estado onde o poder público é o principal empregador. As eleições costumam renovar parte da delegação, mas preservam o consenso em torno de obras de ligação, da presença federal na região e da defesa das unidades de conservação. O eleitorado amapaense, jovem e urbano, concentra-se em Macapá e Santana, cidades que polarizam as disputas eleitorais do estado.',
      ],
    },
    temas: {
      titulo: 'Fronteira, floresta e a economia do açaí',
      paragrafos: [
        'O Amapá é quase totalmente coberto pela floresta amazônica, e a capital, Macapá, fica na foz do rio Amazonas, em posição estratégica para o transporte fluvial. O estado faz fronteira com a Guiana Francesa, e a ponte sobre o rio Oiapoque, inaugurada na década de 2010, aproximou a região do território europeu ultramarino e abriu novas possibilidades de comércio e cooperação. Na altura de Macapá, o rio Amazonas é tão largo que forma um mar de água doce, paisagem que define a relação do estado com a navegação.',
        'A economia local combina a extração de açaí, a produção de madeira, a mineração e o funcionalismo público. Historicamente, a exploração de manganês na Serra do Navio, iniciada em meados do século XX, marcou a mineração amapaense, atividade que segue presente no debate sobre desenvolvimento do estado e sobre os limites da atividade em áreas de floresta. A pesca, o manejo do açaí e o extrativismo vegetal seguem sendo atividades centrais para as comunidades do interior.',
        'Unidades de conservação extensas, como os parques do Tumucumaque e do Cabo Orange, protegem parte do território e alimentam a discussão sobre como conciliar preservação e geração de renda. A logística, dependente de portos, aeroportos e estradas em manutenção, é tema recorrente na pauta da representação federal, assim como a energia e o saneamento. A criação de áreas protegidas foi acompanhada de debates sobre o uso da terra, tema que segue dividindo opiniões na política local.',
      ],
    },
    historia: {
      titulo: 'O território que virou estado em 1988',
      paragrafos: [
        'A região do atual Amapá pertenceu à capitania do Grão-Pará e, por muito tempo, permaneceu pouco povoada, à margem dos grandes ciclos econômicos nacionais. No século XX, foi transformada em território federal, administrada diretamente pelo governo central, que manteve atenção especial à região pela posição estratégica na foz do Amazonas. A posição na foz do Amazonas fez do território ponto de interesse militar e de integração regional ao longo do século XX.',
        'A criação do território federal do Amapá ocorreu na década de 1940, e a região ganhou infraestrutura básica ao longo das décadas seguintes, com a construção de estradas e a instalação de serviços públicos. Com a Constituição de 1988, o Amapá foi elevado à condição de estado e passou a eleger governador, deputados federais e senadores, como as demais unidades da federação. A instalação do estado atraiu servidores e investimentos, e Macapá cresceu em ritmo acelerado nas décadas seguintes à Constituinte.',
        'Desde então, a representação amapaense construiu sua história no Congresso em torno da infraestrutura de integração, da proteção ambiental e do fortalecimento do funcionalismo regional. A delegação pequena na Câmara soma-se aos três senadores, garantindo ao estado voz nas discussões federativas e nas pautas amazônicas, em um país onde a maioria dos estados do Norte depende do orçamento federal. A curta história institucional não impediu que o estado formasse lideranças próprias e marcasse presença nas pautas amazônicas do Congresso.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'ba',
    nome: 'Bahia',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Entre as maiores bancadas do país',
      paragrafos: [
        'A Bahia elege uma das maiores bancadas da Câmara dos Deputados do país e três senadores, reflexo de uma das maiores populações do Brasil. O tamanho da delegação dá ao estado papel central nas negociações nacionais: nenhuma coalizão governista ignora a bancada baiana, que costuma abrigar lideranças de diferentes partidos e espectros ideológicos. A delegação costuma ser disputada tanto pelo governo quanto pela oposição, o que amplia o poder de barganha do estado nas votações.',
        'A atuação da bancada é marcada por pautas nordestinas, como a convivência com a seca, o rio São Francisco, o desenvolvimento regional e os programas sociais, e também por temas metropolitanos, dada a dimensão de Salvador e do Recôncavo. No Senado, os três representantes participam das comissões de educação, desenvolvimento regional e assuntos econômicos, com presença recorrente em relatorias de matérias estratégicas. A bancada também acompanha as discussões sobre o pacto federativo e a redistribuição de recursos, temas de interesse direto de um estado de grande população.',
        'Internamente, a delegação baiana reflete as disputas políticas do estado, com alternância de grupos no comando das principais posições. Apesar das diferenças partidárias, há consenso histórico em torno de obras hídricas, ferrovias e do polo petroquímico de Camaçari, temas tratados como interesse de estado e que mobilizam a bancada de forma unida no Congresso. A união da bancada em torno de projetos estruturantes, como a ferrovia de integração oeste-leste, é citada como exemplo de articulação estadual.',
      ],
    },
    temas: {
      titulo: 'Turismo, petróleo e o São Francisco',
      paragrafos: [
        'A Bahia concentra no litoral e no Recôncavo grande parte da sua atividade econômica histórica: o turismo em Salvador e nas praias do litoral norte e sul, o petróleo descoberto no Recôncavo a partir dos anos 1930 e o polo petroquímico de Camaçari, um dos maiores complexos industriais do país. A capital, primeira sede do governo colonial, preserva um patrimônio cultural reconhecido internacionalmente. O litoral baiano, um dos mais extensos do país, combina destinos consolidados e novas áreas de investimento hoteleiro.',
        'O rio São Francisco atravessa o oeste e o norte do estado e é fonte de irrigação, energia e abastecimento, com a fruticultura irrigada em expansão no vale. O oeste baiano, em área de cerrado, viveu nas últimas décadas forte crescimento do agronegócio, com soja, algodão e pecuária em grandes propriedades, transformando a região em uma das fronteiras agrícolas mais dinâmicas do país. A energia eólica, em expansão no norte do estado, e o polo de cloroquímicos completam a matriz industrial baiana.',
        'A cultura popular, do Pelourinho, patrimônio da humanidade, às festas de largo e ao samba de roda, atrai visitantes e sustenta cadeias produtivas locais. A desigualdade entre a capital, o Recôncavo e o interior profundo segue como tema central dos debates sobre políticas públicas, e a infraestrutura de transporte permanece um dos principais gargalos apontados pela representação baiana. As festas populares, espalhadas por todo o estado, movimentam a economia e preservam tradições reconhecidas nacionalmente.',
      ],
    },
    historia: {
      titulo: 'A primeira capital do Brasil',
      paragrafos: [
        'Salvador foi a primeira capital do Brasil, de 1549 até 1763, quando a sede do governo colonial foi transferida para o Rio de Janeiro. Essa centralidade histórica fez da Bahia o berço de instituições, universidades e movimentos culturais, e moldou uma elite política com forte tradição de participação nos assuntos nacionais desde os primeiros tempos da colônia. A arquitetura colonial, as irmandades religiosas e as universidades centenárias fazem de Salvador referência cultural para todo o país.',
        'No Império, a província da Bahia teve papel relevante nas disputas políticas e na economia açucareira, e a cidade de Salvador foi palco de episódios centrais da história do país. Na República, o estado consolidou uma das maiores representações do Congresso, com presença constante nas coalizões federais e nas disputas pela presidência ao longo do século XX. A bancada baiana participou de todos os períodos de transição política do século XX, do Estado Novo à redemocratização.',
        'A história recente da representação baiana combina continuidade de grupos políticos tradicionais com ascensão de novas lideranças, em ciclos que acompanham a evolução eleitoral do estado. A dimensão da delegação garante à Bahia um lugar permanente nas negociações nacionais, independentemente de quem esteja no governo federal, papel que o estado exerce desde a redemocratização. A força eleitoral do estado, somada à capilaridade partidária, garante à Bahia protagonismo em qualquer cenário político nacional.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'ce',
    nome: 'Ceará',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Uma das maiores bancadas do Nordeste',
      paragrafos: [
        'O Ceará elege uma das maiores bancadas do Nordeste e três senadores, com delegação que costuma ter atuação coesa em pautas regionais. A representação cearense é historicamente forte em comissões ligadas à seca, aos recursos hídricos e ao desenvolvimento do semiárido, temas centrais da política local há mais de um século e que ainda orientam boa parte da agenda da bancada. A atuação se estende ainda à educação profissional e ao combate à pobreza, áreas em que o estado é referência nacional.',
        'Na Câmara, a bancada participa das frentes parlamentares do Nordeste e acompanha a transposição do rio São Francisco, obra que abastece parte do estado. No Senado, os três representantes cearenses atuam em temas como energias renováveis, turismo e políticas sociais, áreas em que o Ceará ganhou projeção nacional nas últimas décadas, tanto na geração de energia eólica quanto na gestão pública. A delegação também defende a ampliação do aeroporto de Fortaleza e dos portos cearenses, obras consideradas prioritárias para o turismo e o comércio.',
        'A composição da delegação alterna lideranças de diferentes partidos, com renovação parcial a cada eleição. O estado desenvolveu tradição de gestão pública reconhecida em áreas como saúde e educação, o que faz da bancada uma defensora de programas federais descentralizados e de políticas de convivência com o clima do semiárido. A força dos governos estaduais na montagem das chapas e a tradição de gestão marcam a escolha dos candidatos a deputado federal.',
      ],
    },
    temas: {
      titulo: 'Sol, vento e a convivência com a seca',
      paragrafos: [
        'O Ceará é um dos estados mais expostos à seca no país, e a convivência com o semiárido moldou sua história, sua cultura e sua agenda política. Reservatórios, cisternas e sistemas de adutoras integram a infraestrutura hídrica que sustenta o interior, enquanto o estado se tornou referência nacional em políticas de convivência com o clima e de segurança hídrica. O estado também desenvolveu programas de convivência com o semiárido que viraram modelo para outras regiões do país e da América Latina.',
        'O estado também virou pioneiro na geração de energia eólica, com os primeiros parques instalados no litoral no início dos anos 2000, e avança na energia solar, que aproveita uma das maiores incidências de sol do país. O porto do Pecém, na região metropolitana de Fortaleza, e o turismo de praia, com destinos como Jericoacoara e Canoa Quebrada, completam os principais vetores econômicos recentes. A indústria de confecções e calçados, concentrada em cidades do interior, emprega milhares de trabalhadores e movimenta a economia regional.',
        'No interior, a agricultura irrigada no vale do Jaguaribe e a fruticultura para exportação convivem com a pecuária e a agricultura familiar. A capital, Fortaleza, concentra serviços, comércio e indústria, e a cultura cearense, do artesanato ao forró e ao cordel, projeta o estado em todo o país, inclusive em festivais e centros de tradição popular. As praias do litoral leste e oeste, com falésias e dunas, diversificam um turismo que já está entre os mais dinâmicos do Nordeste.',
      ],
    },
    historia: {
      titulo: 'Terra da luz e das secas',
      paragrafos: [
        'O Ceará ficou conhecido como Terra da Luz por ter sido, em 1884, a primeira província a abolir a escravidão, quatro anos antes da Lei Áurea. A imagem de pioneirismo, somada à resistência às grandes secas do século XIX, ajudou a construir uma identidade política forte e orgulhosa, que valoriza a superação de adversidades climáticas e sociais. O pioneirismo na abolição é celebrado em monumentos e no calendário cívico do estado até os dias de hoje.',
        'As secas do fim do Império e das primeiras décadas da República provocaram migrações em massa e deram origem às políticas federais de combate à seca, com a criação de obras e órgãos voltados ao Nordeste. Essa história fez da representação cearense uma das mais atentas às pautas hídricas do Congresso, posição que mantém nas discussões sobre transposição e revitalização de rios. As políticas de açudagem e, mais tarde, a transposição do São Francisco deram ao Ceará uma das maiores infraestruturas hídricas do Nordeste.',
        'No século XX, o Ceará formou lideranças que se projetaram nacionalmente, e a política local se modernizou com ciclos de renovação e alternância de grupos. A combinação de bancada numerosa e três senadores garante ao estado presença constante nas negociações sobre recursos hídricos, energia e políticas sociais, temas que seguem no centro da agenda cearense. A combinação de gestão pública premiada e de participação federal ativa mantém o estado em posição de destaque no cenário nacional.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'df',
    nome: 'Distrito Federal',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'A bancada da capital federal',
      paragrafos: [
        'O Distrito Federal elege uma bancada proporcional à sua população e três senadores, mas sua representação tem um caráter especial: representa a capital do país. A delegação brasiliense atua em um território onde a economia é dominada pela administração pública, pelas empresas estatais e pelos serviços ligados ao governo federal, o que aproxima a agenda local das decisões nacionais. A pauta das carreiras dos servidores públicos federais, numerosos no DF, é acompanhada de perto pela bancada em todas as legislaturas.',
        'Na Câmara, os deputados do DF acompanham de perto temas como o funcionalismo público, o pacto federativo e a transferência de recursos para as unidades da federação. No Senado, os três representantes do Distrito Federal participam das comissões de assuntos econômicos e de infraestrutura, áreas de interesse direto da capital e do entorno. A delegação também se dedica a temas urbanos, como o metrô, o saneamento e a habitação nas regiões administrativas.',
        'A representação brasiliense costuma defender também o entorno do DF, formado por municípios goianos que dependem da estrutura de Brasília. A convivência entre a agenda nacional, que domina a cidade, e as demandas locais de transporte, moradia e segurança marca a atuação da bancada, que precisa conciliar os dois papéis em todas as legislaturas. A relação com o governo federal, que administra parte dos serviços locais, exige da bancada articulação permanente com os ministérios.',
      ],
    },
    temas: {
      titulo: 'Brasília, serviços e patrimônio',
      paragrafos: [
        'Brasília, inaugurada em 1960 como nova capital do país, é o centro de decisões do Executivo, do Legislativo e do Judiciário. A cidade concentra ministérios, sedes de estatais, órgãos de controle e um setor de serviços especializado, o que faz da economia local uma das mais estáveis e de maior renda média do país, ainda que fortemente dependente do orçamento federal. A cidade também se consolidou como destino de turismo cívico e de eventos, com a Esplanada dos Ministérios entre os cartões-postais mais visitados do país.',
        'O traçado urbanístico de Brasília, projetado por Lúcio Costa e Oscar Niemeyer, é patrimônio cultural da humanidade reconhecido pela Unesco, e o Plano Piloto convive com regiões administrativas que concentram a maior parte da população. A mobilidade entre essas regiões e o Plano Piloto é tema constante do debate público local, assim como a habitação e a segurança. As regiões administrativas, criadas ao longo das décadas, concentram a maior parte da população e as principais demandas por equipamentos públicos.',
        'O Distrito Federal também sedia embaixadas, organismos internacionais e eventos políticos, o que dá à cidade uma vocação de serviços que vai além da administração pública. A agenda ambiental local inclui o cerrado, bioma predominante, e a gestão de parques e reservas, além da proteção das nascentes dos rios que abastecem a capital e o entorno. O cerrado do Planalto Central, com suas nascentes e veredas, é objeto de políticas de preservação acompanhadas pela sociedade civil local.',
      ],
    },
    historia: {
      titulo: 'Uma capital construída para o centro do país',
      paragrafos: [
        'A ideia de transferir a capital para o interior do país é anterior à República e apareceu em constituições desde o fim do século XIX. A construção de Brasília, iniciada no final dos anos 1950, foi o maior empreendimento do governo de Juscelino Kubitschek e simbolizou a aposta na integração do território nacional, atraindo trabalhadores de todas as regiões do país. O projeto de Brasília atraiu trabalhadores de todas as regiões, os chamados candangos, que formaram a base da população local.',
        'Inaugurada em 1960, Brasília abrigou a transferência dos órgãos federais, e o território do Distrito Federal foi desmembrado de Goiás para sediar a capital. Durante o regime militar, o DF teve governadores nomeados, e a representação política da população foi restabelecida com a redemocratização, na década de 1980, quando os brasilienses voltaram a eleger seus senadores. A criação do Distrito Federal também gerou uma relação particular com Goiás, cujo entorno segue integrado à dinâmica da capital.',
        'Desde então, os brasilienses elegem seus representantes ao Congresso e, a partir dos anos 1990, também o governador do Distrito Federal. A história da representação local é curta se comparada à dos estados, mas consolidou a bancada e os três senadores como porta-vozes da capital nas discussões nacionais, em um território que concentra a sede dos três poderes. A capital consolidou-se como arena das disputas políticas nacionais, papel que a delegação brasiliense ajuda a traduzir em pautas locais.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'es',
    nome: 'Espírito Santo',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada média com pauta própria',
      paragrafos: [
        'O Espírito Santo elege uma bancada federal de porte médio e três senadores, com delegação que costuma atuar de forma articulada em defesa de setores estratégicos do estado. Mineração, siderurgia, petróleo e café formam o núcleo das pautas da representação capixaba no Congresso, temas que atravessam as legislaturas com pouca variação partidária e aproximam os parlamentares entre si. Esse alinhamento é facilitado pelo tamanho do eleitorado, que permite à bancada atuar como um bloco coeso em temas estratégicos.',
        'Na Câmara, os deputados do estado participam das frentes ligadas à indústria e à infraestrutura portuária, e no Senado os três representantes acompanham temas como royalties do petróleo e regulação mineral. A distribuição dos recursos dos royalties é questão central para o estado, um dos maiores produtores de petróleo do país, e mobiliza a bancada em todas as votações orçamentárias. As emendas da bancada costumam priorizar obras de saneamento e estradas, gargalos apontados pelos municípios capixabas.',
        'A delegação capixaba combina nomes de diferentes partidos, com renovação parcial a cada eleição, e costuma preservar consenso em temas considerados de interesse estadual, como a manutenção de investimentos minerários e a expansão do comércio exterior pelos portos capixabas. A política local, marcada pela estabilidade, se reflete na composição da bancada federal. A força das pautas estaduais sobre as siglas partidárias é traço marcante da representação capixaba.',
      ],
    },
    temas: {
      titulo: 'Minério, petróleo e café',
      paragrafos: [
        'A economia capixaba é fortemente marcada pela mineração e pela siderurgia: a Vale mantém no estado uma das maiores minas de minério de ferro do país, e o porto de Tubarão, na capital Vitória, escoa a produção para o exterior. O petróleo e o gás do pré-sal, explorados na costa capixaba, ampliaram a arrecadação de royalties e atraíram cadeias de fornecedores. A indústria capixaba também se beneficia da posição geográfica, próxima dos grandes centros do Sudeste.',
        'O café conilon, cultivado principalmente no norte do estado, faz do Espírito Santo um dos maiores produtores nacionais, ao lado do arábica das montanhas capixabas. A fruticultura, a piscicultura e a indústria de mármore e granito completam o quadro produtivo, com forte presença de pequenas e médias empresas e de cooperativas agrícolas. O conilon, mais resistente ao calor, consolidou o norte do estado como região de produção em larga escala.',
        'O turismo de praia, com cidades como Vila Velha e Guarapari, e a serra, com seus vilarejos de imigração europeia, complementam a economia local. A capital Vitória e a região metropolitana concentram serviços, enquanto o interior vive do agronegócio e da indústria de transformação, em um estado de economia diversificada apesar do território pequeno. A serra, com cidades como Domingos Martins e Santa Teresa, preserva a herança cultural dos imigrantes.',
      ],
    },
    historia: {
      titulo: 'Uma capitania que se industrializou',
      paragrafos: [
        'O Espírito Santo foi uma das primeiras capitanias do Brasil, doada na década de 1530, mas permaneceu por séculos à margem dos grandes ciclos econômicos nacionais. A província ganhou relevância com o café no século XIX e recebeu, a partir de então, levas de imigrantes europeus, sobretudo italianos, alemães e pomeranos, que formaram colônias agrícolas no interior. Essas colônias preservaram tradições, festas e dialetos que ainda marcam o interior do estado.',
        'No século XX, o estado se industrializou em torno da siderurgia, com a instalação da Companhia Vale do Rio Doce na década de 1940, e da exploração do petróleo nas décadas seguintes. A representação capixaba no Congresso acompanhou essa trajetória, com bancadas que ganharam importância nas pautas mineral, portuária e energética. A estrada de ferro Vitória-Minas, construída para escoar o minério, integrou o estado ao circuito do Sudeste.',
        'Historicamente, o Espírito Santo foi tratado como estado pequeno do Sudeste, mas sua localização entre os grandes centros e o litoral deu à delegação um perfil pragmático, voltado a resultados concretos em infraestrutura e comércio exterior. Os três senadores reforçam a presença do estado nas discussões federativas, especialmente nas pautas de royalties e de logística. A agenda da delegação segue hoje ancorada na diversificação produtiva e na competitividade logística.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'go',
    nome: 'Goiás',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Peso do Centro-Oeste na Câmara',
      paragrafos: [
        'Goiás elege uma bancada de porte médio e três senadores, com delegação fortemente ligada ao agronegócio e às demandas do Centro-Oeste. A proximidade com Brasília dá à bancada goiana acesso permanente aos corredores do poder, e parlamentares do estado aparecem com frequência em cargos de liderança e em relatorias de matérias econômicas. A bancada também se destaca pela articulação com as demais delegações do Centro-Oeste em pautas comuns.',
        'Na Câmara, os deputados goianos atuam em frentes ligadas à agropecuária, à logística e à reforma tributária, temas centrais para a economia estadual. No Senado, os três representantes do estado participam das comissões de agricultura e de assuntos econômicos, refletindo o perfil produtivo de Goiás, um dos líderes nacionais em soja, milho e pecuária de corte. As discussões sobre a reforma tributária, de impacto direto no setor produtivo goiano, são acompanhadas de perto pela delegação.',
        'A delegação também acompanha os temas do entorno do Distrito Federal, com demandas de transporte, saúde e serviços na região metropolitana. A política goiana combina tradição de grupos familiares com renovação, e a bancada costuma renovar parte de suas cadeiras a cada eleição, mantendo, porém, o perfil ruralista predominante. A capital Goiânia e o entorno do Distrito Federal formam o maior colégio eleitoral do estado, centro das disputas pelas cadeiras federais.',
      ],
    },
    temas: {
      titulo: 'Agro, cerrado e o entorno de Brasília',
      paragrafos: [
        'Goiás é um dos principais estados agrícolas do país: soja, milho, cana-de-açúcar e pecuária de corte sustentam uma economia que se expandiu a partir da década de 1970 com a modernização do cerrado. O estado também se destaca na mineração, com nióbio, fosfato e calcário extraídos no interior, e na indústria de processamento de alimentos. A agroindústria local, com frigoríficos, laticínios e processamento de grãos, agrega valor à produção e gera empregos nas cidades médias.',
        'A capital, Goiânia, planejada na década de 1930, e cidades como Anápolis e Rio Verde formam um interior dinâmico, com forte presença de cooperativas, agroindústrias e centros de pesquisa agrícola. O estado é também porta de entrada para o agronegócio do Matopiba e do norte do país, posição logística privilegiada no planalto central. A localização central do estado, no cruzamento das principais rodovias do país, favoreceu a instalação de centros de distribuição e indústrias.',
        'A proximidade com Brasília gera uma relação peculiar: o entorno goiano abriga dezenas de municípios que cresceram como cidades-dormitório da capital federal, com demandas permanentes de transporte, saúde e segurança. O turismo de águas quentes, em Caldas Novas, e o patrimônio histórico da cidade de Goiás, tombada pela Unesco, completam o perfil do estado. O cerrado, bioma predominante, combina produção agrícola intensiva com unidades de conservação e nascentes de rios importantes.',
      ],
    },
    historia: {
      titulo: 'Do ouro colonial ao agronegócio',
      paragrafos: [
        'Goiás foi povoado por bandeirantes que buscaram ouro no interior no século XVIII, e a cidade de Goiás, antiga Vila Boa, foi a capital da capitania e depois da província. O esgotamento das minas levou a um longo período de estagnação econômica, superado apenas no século XX com a expansão da pecuária e a integração do estado ao centro do país. A chegada da estrada de ferro, no início do século XX, e depois das rodovias, integrou o estado ao mercado nacional.',
        'A construção de Brasília, concluída em 1960, transformou Goiás: o estado cedeu parte de seu território para a criação do Distrito Federal e passou a ocupar posição central na rede de transportes nacional. Goiânia, fundada em 1933 como nova capital, já havia marcado a modernização do estado e o deslocamento do eixo político local. Brasília, por sua vez, passou a dividir com Goiânia o protagonismo econômico do Planalto Central.',
        'A partir dos anos 1970, os programas de ocupação do cerrado, as estradas e a pesquisa agropecuária transformaram Goiás em potência agrícola, e a representação federal passou a espelhar esse perfil. A história política recente do estado combina longos ciclos de domínio de grupos locais com alternância de partidos, em um equilíbrio que se renova a cada eleição. A alternância de forças mantém a bancada plural e aberta a alianças, perfil que se reflete nas votações do Congresso.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'ma',
    nome: 'Maranhão',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada expressiva no Nordeste',
      paragrafos: [
        'O Maranhão elege uma das maiores bancadas do Nordeste e três senadores, com delegação que historicamente ocupa espaço relevante no Congresso. A capital, São Luís, e o interior dividem a atenção da representação maranhense, que atua em frentes que vão do agronegócio do sul do estado às comunidades tradicionais da Amazônia e da Baixada. A delegação também costuma ocupar relatorias de matérias orçamentárias e sociais, posições que permitem direcionar recursos para o estado.',
        'Na Câmara, a bancada participa das frentes do Nordeste, da agropecuária e do meio ambiente, e no Senado os três representantes acompanham temas como a base espacial de Alcântara, a energia eólica e as políticas sociais. O estado também concentra um dos maiores públicos de programas federais de transferência de renda, pauta constante da delegação. A pauta da energia eólica, que transformou o litoral maranhense em polo gerador, ganha espaço nas comissões da Câmara.',
        'A composição da bancada maranhense reflete a diversidade do estado, com lideranças urbanas e rurais, e costuma renovar parte das cadeiras a cada eleição. A política local tem tradição de grupos fortes e de alternância de forças, o que mantém a delegação plural em termos partidários e presente nas articulações do Congresso. A força das bancadas nordestinas nas articulações nacionais faz do Maranhão um estado cortejado nas disputas por comissões e relatorias.',
      ],
    },
    temas: {
      titulo: 'Baixada, Lençóis e a nova fronteira agrícola',
      paragrafos: [
        'O Maranhão combina paisagens e economias muito distintas. No litoral e na Baixada Maranhense predominam as planícies alagadas, a pesca e o babaçu, enquanto os Lençóis Maranhenses, no extremo norte, formam um dos maiores campos de dunas do país, protegidos em parque nacional e transformados em atração turística crescente. A expansão agrícola atraiu migrantes e transformou cidades como Balsas e Imperatriz em polos regionais de comércio e serviços.',
        'No sul e no leste do estado, o cerrado virou uma das novas fronteiras agrícolas do país, com expansão da soja, do milho e da pecuária, integrando a região conhecida como Matopiba. No oeste, a floresta amazônica cobre parte do território, com unidades de conservação, terras indígenas e populações extrativistas que dependem da floresta em pé. O estado também se destaca na produção de arroz, mandioca e babaçu, atividades que convivem com a agricultura moderna.',
        'São Luís, capital fundada por franceses no século XVII e patrimônio da humanidade, concentra serviços e indústria, e o porto de Itaqui escoa parte da produção agrícola e mineral da região. A base de lançamento de Alcântara, na costa, é tema de debates sobre cooperação espacial internacional e sobre o uso do território pelas comunidades locais. A relação entre a base espacial e as comunidades locais segue sendo tema de negociação entre o estado e a União.',
      ],
    },
    historia: {
      titulo: 'Uma história de ciclos',
      paragrafos: [
        'O Maranhão foi uma das capitanias mais ricas do período colonial, com economia baseada no algodão e no arroz, e São Luís se tornou um dos centros culturais do país, com tradição de letras, azulejos e festas populares. A Balaiada, revolta popular ocorrida entre 1838 e 1841, marcou a história da província e segue lembrada pela historiografia. O período também consolidou São Luís como referência cultural do Norte e do Nordeste, com o centro histórico tombado pela Unesco.',
        'No século XX, o estado passou por fases de estagnação e por projetos de integração nacional, como a construção da estrada Belém-Brasília e a expansão da mineração na Amazônia oriental. A representação maranhense no Congresso acompanhou esses ciclos, com presença marcante nas negociações nacionais e nas coalizões de governo. Os projetos de integração do século XX mudaram a economia e a demografia do estado, que se tornou porta de entrada da Amazônia oriental.',
        'Nas últimas décadas, o Maranhão reduziu indicadores de pobreza com a expansão dos programas sociais, e a economia se diversificou com o agronegócio e as energias renováveis. A história recente da representação local combina continuidade de lideranças tradicionais com renovação geracional, perfil comum aos grandes estados nordestinos e que se reflete na composição atual da bancada. A diversificação recente, com energia eólica e agronegócio, ampliou a pauta da representação maranhense no Congresso.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'mg',
    nome: 'Minas Gerais',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Uma das maiores delegações do país',
      paragrafos: [
        'Minas Gerais elege uma das maiores bancadas da Câmara dos Deputados do país, atrás apenas dos estados mais populosos, e três senadores. A delegação mineira reúne parlamentares de praticamente todos os espectros partidários, e sua diversidade a torna peça-chave nas coalizões federais e nas eleições para as presidências da Câmara e do Senado. A força eleitoral de Minas, espalhada por centenas de municípios, obriga os partidos a construir chapas regionais e amplia a diversidade da delegação.',
        'A bancada atua em frentes muito distintas, do agronegócio à indústria, da mineração às políticas sociais, refletindo a economia diversificada do estado. No Senado, os três representantes de Minas participam das principais comissões, com presença tradicional em relatorias de matérias econômicas, tributárias e federativas, áreas em que o estado acumula experiência histórica. A bancada também se dedica às pautas de infraestrutura e de segurança hídrica, temas sensíveis para um estado de território extenso e relevo montanhoso.',
        'A política mineira é conhecida pela força dos partidos de centro e pela capacidade de negociação, e a delegação costuma ser cortejada por governos de diferentes campos. A renovação é parcial a cada eleição, mantendo núcleos experientes que dão continuidade à atuação do estado no Congresso e preservam o protagonismo de Minas nas articulações nacionais. A tradição de conciliação política, que marcou a história do estado, segue orientando a atuação dos parlamentares mineiros no Congresso.',
      ],
    },
    temas: {
      titulo: 'Mineração, agro e indústria',
      paragrafos: [
        'Minas Gerais tem uma das economias mais diversificadas do país. A mineração, concentrada no chamado Quadrilátero Ferrífero, é a base histórica do desenvolvimento do estado, e os rompimentos de barragens em Mariana e Brumadinho colocaram a segurança da atividade no centro do debate público e regulatório, com reflexos nas políticas de fiscalização em todo o país. A regulação da mineração, com novas regras para barragens e licenciamento, segue como tema central da agenda política e econômica do estado.',
        'O agronegócio é outro pilar: Minas é um dos maiores produtores de café do país, além de forte em leite, milho, soja e cana. A indústria de transformação, com destaque para siderurgia, automóveis e alimentos, se concentra na região metropolitana de Belo Horizonte e no sul do estado, com polos de tecnologia também em expansão. A diversificação industrial, com polos de tecnologia em expansão, amplia a pauta da representação mineira.',
        'O turismo histórico das cidades coloniais, como Ouro Preto e Tiradentes, patrimônios do período do ouro, complementa a economia, junto com o ecoturismo da serra do Espinhaço e as estâncias de águas de Poços de Caldas e Araxá. A capital, Belo Horizonte, planejada no fim do século XIX, é o principal centro urbano e de serviços do estado. O patrimônio histórico mineiro, com suas igrejas barrocas e cidades preservadas, é um dos maiores do país e sustenta o turismo cultural.',
      ],
    },
    historia: {
      titulo: 'O ouro, o café e a política nacional',
      paragrafos: [
        'A história de Minas Gerais começa com o ciclo do ouro no século XVIII, que fez da capitania o centro econômico da colônia e deu origem a cidades como Ouro Preto, então Vila Rica. A Inconfidência Mineira, de 1789, transformou o estado em símbolo da luta pela independência e marcou a formação de uma identidade política própria. A riqueza do ouro financiou igrejas, museus e um dos maiores conjuntos de arte barroca do mundo, ainda hoje atração turística central.',
        'No Império e na República Velha, a economia do café consolidou Minas como potência nacional, e a chamada política do café com leite, de alternância entre mineiros e paulistas na presidência, marcou a primeira fase da República. A representação mineira no Congresso sempre esteve entre as maiores, com peso decisivo nas decisões nacionais. A política mineira também é lembrada pela capacidade de construir consensos, traço que se mantém na atuação da bancada federal.',
        'No século XX, a industrialização, com a siderurgia e depois o setor automotivo, diversificou a economia, e a política mineira ganhou fama de pragmática, com forte cultura de negociação e de construção de pontes entre campos opostos. A delegação atual mantém a tradição de pluralidade partidária e de protagonismo nas articulações do Congresso. A pluralidade partidária da delegação reflete a complexidade eleitoral do estado, com disputas regionais em todas as macrorregiões.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'ms',
    nome: 'Mato Grosso do Sul',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada jovem, perfil agropecuário',
      paragrafos: [
        'Mato Grosso do Sul elege uma bancada federal de porte médio e três senadores, e sua delegação tem perfil fortemente ligado ao agronegócio e à pecuária. A representação sul-mato-grossense costuma atuar em frentes de agropecuária, infraestrutura e defesa sanitária, temas centrais para a economia estadual e para as regiões de fronteira. A defesa da cadeia da carne, da infraestrutura rodoviária e da ferrovia aparece com frequência nas emendas e nos discursos da delegação.',
        'Na Câmara, os deputados do estado participam das frentes ruralistas e de logística, e no Senado os três representantes acompanham comissões de agricultura, meio ambiente e relações exteriores, dado o caráter fronteiriço do estado com Paraguai e Bolívia. O Pantanal, bioma compartilhado, também é pauta permanente da delegação. O estado também acompanha as negociações sobre comércio com os países vizinhos, que movimentam as cidades de fronteira.',
        'A delegação combina nomes de diferentes partidos e renova parte das cadeiras a cada eleição. A política local tem tradição de estabilidade e de alternância entre grupos do agronegócio e do funcionalismo, com a capital Campo Grande e as cidades do interior compondo o eleitorado do estado, criado há menos de cinco décadas. A divisão do antigo Mato Grosso criou uma identidade política própria, que se fortalece a cada eleição e define o perfil da delegação.',
      ],
    },
    temas: {
      titulo: 'Pantanal, agro e fronteira',
      paragrafos: [
        'Mato Grosso do Sul abriga a maior parte do Pantanal, um dos maiores biomas alagáveis do mundo, com biodiversidade única e turismo de natureza em destinos como Bonito, na serra da Bodoquena, famosa por seus rios cristalinos. As queimadas e as secas do bioma viraram temas recorrentes no debate nacional sobre clima e preservação. A região pantaneira também concentra grande parte da pecuária extensiva do estado, que convive com o regime de cheias e vazantes do bioma.',
        'A economia estadual é dominada pela pecuária de corte, pela soja, pelo milho e pela cana-de-açúcar, com expansão acelerada da agricultura nas últimas décadas. A fronteira com Paraguai e Bolívia movimenta comércio e serviços nas cidades-gêmeas, e a hidrovia do Paraguai é rota importante de escoamento da produção para os países vizinhos. A produção de celulose, com fábricas em Três Lagoas, transformou o estado em um dos maiores exportadores do produto no país.',
        'Campo Grande, capital planejada, concentra serviços e indústria de transformação, enquanto cidades como Dourados e Três Lagoas cresceram com o agronegócio e as fábricas de celulose. O estado também é porta de entrada para o turismo de pesca e para o ecoturismo do Pantanal, setor em expansão constante. O ecoturismo, com observação de aves e pesca esportiva, cresce apoiado na preservação do Pantanal e da serra da Bodoquena.',
      ],
    },
    historia: {
      titulo: 'O estado criado em 1977',
      paragrafos: [
        'Mato Grosso do Sul é um dos estados mais novos do país: foi criado em 1977, com a divisão do antigo Mato Grosso, e instalado em 1979, com Campo Grande como capital. A região, porém, tem história antiga, com ocupação ligada aos bandeirantes, à exploração de minérios no século XVIII e à Guerra do Paraguai, que marcou as cidades do sul. As fortificações da época da guerra, preservadas em cidades como Corumbá, hoje integram o patrimônio histórico regional.',
        'A divisão do estado atendeu a demandas locais de longa data e reorganizou a política regional. Desde a instalação, o novo estado passou a eleger sua própria bancada federal e seus três senadores, construindo em poucas décadas uma tradição própria de representação e de atuação nas pautas do agronegócio. A criação do estado deu à região sul do antigo Mato Grosso autonomia administrativa, política e orçamentária.',
        'A história recente de Mato Grosso do Sul está ligada à expansão agropecuária, à integração com os países vizinhos e à preservação do Pantanal, temas que moldam a agenda de sua delegação. A juventude institucional do estado contrasta com a força econômica conquistada, perfil singular entre as unidades da federação. A integração com Paraguai e Bolívia, por estradas e hidrovias, ampliou o comércio e aproximou o estado dos países vizinhos.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'mt',
    nome: 'Mato Grosso',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'A bancada do agronegócio',
      paragrafos: [
        'Mato Grosso elege uma bancada federal de porte médio e três senadores, com delegação reconhecidamente ligada ao agronegócio, principal motor da economia estadual. A representação mato-grossense costuma liderar pautas de interesse rural, como código florestal, defesa sanitária, logística de escoamento e regularização fundiária, mobilizando a delegação de forma unida. Emendas e requerimentos da bancada costumam priorizar estradas, ferrovias e armazenagem, gargalos reconhecidos do setor produtivo.',
        'Na Câmara, os deputados do estado integram as principais frentes ligadas à agropecuária e à infraestrutura, e no Senado os três representantes atuam em comissões de agricultura e de meio ambiente. O equilíbrio entre produção e preservação, tema sensível no estado, é pauta permanente da delegação em todas as legislaturas. As discussões sobre o Código Florestal e o licenciamento ambiental, que afetam a produção local, são acompanhadas de perto pela delegação.',
        'A composição da bancada mistura lideranças do agronegócio, do funcionalismo e das cidades médias, com renovação parcial a cada eleição. A política mato-grossense é marcada pela força dos grupos rurais e pela crescente urbanização de cidades como Cuiabá, Várzea Grande e Rondonópolis, que se reflete nas disputas pelas cadeiras federais. A urbanização das cidades médias, com demanda por serviços e infraestrutura, ampliou a pauta da bancada para além do campo.',
      ],
    },
    temas: {
      titulo: 'Grãos, Pantanal e a porta da Amazônia',
      paragrafos: [
        'Mato Grosso é o maior produtor nacional de soja, milho e algodão, com agricultura em larga escala no cerrado e pecuária extensiva em todo o estado. Cuiabá, capital fundada por mineradores no século XVIII, é o centro de serviços de uma região que se tornou a principal fronteira agrícola do mundo nas últimas décadas. A produção em larga escala, com duas safras por ano, faz do estado referência mundial em produtividade agrícola.',
        'O norte do estado abriga porções da floresta amazônica e terras indígenas, e o sul faz divisa com o Pantanal, bioma que Mato Grosso divide com Mato Grosso do Sul. A Chapada dos Guimarães, próxima a Cuiabá, é destino de ecoturismo, e o rio Araguaia marca a divisa leste do estado com Goiás e Tocantins. As terras indígenas e as unidades de conservação do norte colocam o estado no centro das discussões sobre a agenda ambiental brasileira.',
        'A logística é o principal gargalo: a produção depende de rodovias e de portos distantes, como os do chamado Arco Norte, e a expansão da ferrovia é tema recorrente nas pautas da bancada. O estado também atrai investimentos em energia, com destaque para a expansão da cana-de-açúcar e do etanol no sudeste mato-grossense. A expansão da malha ferroviária, ligando o centro do estado aos portos do Arco Norte, é apontada como prioridade pela representação.',
      ],
    },
    historia: {
      titulo: 'Das minas de Cuiabá à fronteira agrícola',
      paragrafos: [
        'Mato Grosso foi ocupado por bandeirantes paulistas que buscavam ouro no século XVIII, e Cuiabá, fundada em 1719, tornou-se o principal núcleo urbano da região. Durante séculos, o estado foi sinônimo de isolamento, com acesso difícil pelos rios e pelas estradas de terra que ligavam o centro do país ao extremo oeste. As monções, expedições fluviais do período colonial, e a navegação pelos rios marcaram a ocupação da região.',
        'No século XX, a marcha para o oeste, a construção de estradas e a criação de Brasília integraram Mato Grosso ao país. A partir dos anos 1970, a ocupação do cerrado e a migração de produtores do Sul transformaram o estado em potência agrícola, com crescimento populacional entre os maiores do país. A ocupação acelerada também trouxe desafios fundiários e ambientais, temas que passaram a dominar a agenda política local.',
        'Em 1977, a divisão do estado criou Mato Grosso do Sul, e o Mato Grosso remanescente seguiu sua trajetória de expansão agropecuária. A representação federal acompanhou a transformação, e o estado deixou de ser fronteira isolada para se tornar protagonista das pautas do agronegócio no Congresso. A identidade do estado se consolidou em torno do campo, mas as cidades crescem e diversificam a política mato-grossense.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'pa',
    nome: 'Pará',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'A maior bancada da Amazônia',
      paragrafos: [
        'O Pará elege a maior bancada entre os estados da região Norte e três senadores, com delegação que combina pautas amazônicas, urbanas e minerárias. A representação paraense atua em temas como a COP30, realizada em Belém em 2025, a mineração em Carajás e a infraestrutura de integração da Amazônia, que atravessam as legislaturas. A delegação também acompanha as discussões sobre regularização ambiental e fundiária, temas centrais para a economia do estado.',
        'Na Câmara, os deputados do Pará participam das frentes ambiental, mineral e de infraestrutura, e no Senado os três representantes acompanham as comissões de meio ambiente e desenvolvimento regional. A capital, Belém, concentra boa parte da bancada, mas o interior elege parlamentares ligados aos polos de mineração, de energia e do agronegócio. A bancada se divide entre as pautas de preservação e as de desenvolvimento, equilíbrio que orienta as votações da delegação.',
        'A delegação paraense é plural em termos partidários e costuma renovar parte das cadeiras a cada eleição. As disputas políticas no estado alternam forças ligadas à máquina pública, ao agronegócio e aos movimentos sociais e ambientais, perfil que se reflete na composição da bancada federal e nas articulações do Congresso. A alternância de forças no governo do estado, observada nas últimas eleições, também se reflete nas disputas internas da delegação.',
      ],
    },
    temas: {
      titulo: 'Amazônia, mineração e Belém',
      paragrafos: [
        'O Pará é o segundo maior estado do país e o coração da Amazônia brasileira, com a maior parte do território coberta por floresta e cortada por rios como o Amazonas, o Tocantins e o Xingu. A economia combina mineração, com o complexo de Carajás, energia hidrelétrica, com usinas como Belo Monte, e agropecuária em expansão no sudeste do estado. A mineração em Carajás, uma das maiores províncias minerais do mundo, sustenta a economia do sudeste paraense e financia municípios.',
        'Belém, capital fundada no século XVII, é a maior metrópole da Amazônia e sediou a COP30 em 2025, conferência da Organização das Nações Unidas sobre clima que colocou a cidade no centro do debate ambiental global. O turismo de floresta, o açaí e a cultura do carimbó completam a identidade paraense, reconhecida em todo o país. A cidade também concentra universidades, centros de pesquisa e a maior rede de saúde pública da região Norte.',
        'A ilha de Marajó, no encontro do rio Amazonas com o mar, e a região do Xingu, com seus povos indígenas, são símbolos da diversidade do estado. A logística fluvial, os portos e as estradas são temas recorrentes da pauta regional, junto com a convivência entre preservação ambiental e desenvolvimento econômico. A convivência entre grandes projetos, unidades de conservação e populações tradicionais segue sendo o maior desafio do desenvolvimento paraense.',
      ],
    },
    historia: {
      titulo: 'Da Cabanagem ao protagonismo amazônico',
      paragrafos: [
        'O Pará tem história marcada por revoltas e ciclos econômicos. A Cabanagem, revolta popular ocorrida entre 1835 e 1840, foi uma das maiores insurreições do Brasil imperial e deixou marcas profundas na identidade paraense. No fim do século XIX, o ciclo da borracha enriqueceu Belém, com o teatro da Paz como símbolo da prosperidade da época. A borracha também financiou a construção de ferrovias e de infraestrutura urbana que marcam a região até hoje.',
        'No século XX, a criação de órgãos de desenvolvimento regional, a construção da rodovia Belém-Brasília e os grandes projetos minerários e hidrelétricos integraram o estado ao país, com custos sociais e ambientais debatidos até hoje. A representação federal acompanhou cada fase, com bancadas cada vez mais ligadas às pautas amazônicas. Os grandes projetos dos anos 1970 e 1980, de mineração e energia, atraíram migrantes e mudaram o perfil demográfico do estado.',
        'A redemocratização fortaleceu os movimentos sociais e ambientais na política paraense, e a alternância de governos de diferentes campos ampliou o debate político local. Com a maior bancada do Norte, o Pará é hoje a principal voz da Amazônia nas negociações nacionais, inclusive nos temas climáticos que ganharam projeção com a COP30. A realização da COP30 em Belém reforçou o papel do Pará como interlocutor entre a Amazônia e o mundo, tema que segue na agenda da bancada.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'pb',
    nome: 'Paraíba',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada de porte médio, voz nordestina',
      paragrafos: [
        'A Paraíba elege uma bancada federal de porte médio e três senadores, com delegação atuante nas pautas do Nordeste. A representação paraibana costuma priorizar temas como a transposição do rio São Francisco, a convivência com a seca e o desenvolvimento do semiárido, além de políticas sociais, educação e segurança pública. A bancada também atua em pautas de infraestrutura, como estradas, transposição e saneamento, temas que movimentam emendas e requerimentos.',
        'Na Câmara, os deputados do estado integram frentes nordestinas e de recursos hídricos, e no Senado os três representantes participam de comissões de educação, desenvolvimento regional e assuntos econômicos. A Paraíba também projeta lideranças para posições de comando nas duas casas, com parlamentares que se destacam em relatorias e presidências. A delegação também participa das discussões sobre o financiamento da educação, área em que o estado se destaca nacionalmente.',
        'A delegação combina perfis urbanos, ligados a João Pessoa e Campina Grande, e rurais, com renovação parcial a cada eleição. A política paraibana tem tradição de grupos regionais e de famílias políticas, mas registrou nas últimas décadas alternância entre diferentes forças partidárias, o que diversificou a composição da bancada federal. A competitividade das disputas locais mantém a bancada renovada e atenta às demandas do eleitorado.',
      ],
    },
    temas: {
      titulo: 'Litoral, semiárido e o São Francisco',
      paragrafos: [
        'A Paraíba tem o ponto mais oriental das Américas, a Ponta do Seixas, em João Pessoa, e um litoral de praias muito procuradas, que sustenta um turismo em expansão. O interior, porém, vive a realidade do semiárido, com municípios que dependem de programas de convivência com a seca e da transposição do rio São Francisco. O litoral paraibano, com as praias de Tambaba, Coqueirinho e da península de João Pessoa, é um dos mais valorizados do Nordeste.',
        'Campina Grande, no agreste, é um dos maiores polos tecnológicos e universitários do Nordeste, e sua festa de São João está entre as mais populares do país. O brejo paraibano, de clima ameno, produz café e abriga cidades históricas como Areia, com arquitetura e memória do ciclo do algodão. O estado também se destaca na produção de algodão no sertão e na pecuária leiteira do Cariri, atividades tradicionais que seguem relevantes.',
        'A economia combina serviços, comércio e indústria na capital, agropecuária no interior e turismo no litoral, com destaque para a carcinicultura, a produção de camarão, e a fruticultura irrigada. O artesanato, sobretudo o de renda e couro, e a música regional completam o perfil cultural do estado. O turismo religioso e de eventos, com o São João de Campina Grande, também movimenta a economia e a imagem do estado.',
      ],
    },
    historia: {
      titulo: 'Berço de acontecimentos nacionais',
      paragrafos: [
        'A Paraíba foi uma das primeiras capitanias do Brasil, mas sua história nacional ganhou relevo no século XX. O estado esteve no centro dos acontecimentos que antecederam a Revolução de 1930, e a capital, rebatizada como João Pessoa em homenagem a um político paraibano, carrega essa memória até hoje. A capital, fundada em 1585, é uma das mais antigas do país e preserva um centro histórico tombado como patrimônio nacional.',
        'A representação paraibana no Congresso tem tradição antiga, com presença desde o Império, e o estado sempre manteve bancada proporcional à sua população. Ao longo do século XX, a política local oscilou entre grupos tradicionais e movimentos de renovação, acompanhando as mudanças nacionais e as disputas pelo comando do estado. A política paraibana do século XX também foi marcada por ciclos de domínio oligárquico e de renovação, acompanhando os movimentos nacionais.',
        'Nas últimas décadas, a Paraíba ganhou projeção com a expansão universitária, o polo tecnológico de Campina Grande e a conclusão de obras hídricas. A delegação federal combina experiência e renovação, mantendo o estado presente nas principais negociações do Congresso e nas pautas específicas do Nordeste. A interiorização do desenvolvimento, com polos em Campina Grande, Patos e Cajazeiras, aproximou o interior das decisões nacionais.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'pe',
    nome: 'Pernambuco',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Uma das maiores bancadas do Nordeste',
      paragrafos: [
        'Pernambuco elege uma das maiores bancadas do Nordeste e três senadores, com delegação histórica no cenário nacional. A representação pernambucana atua em pautas variadas, do polo industrial de Suape e do Porto Digital, em Recife, à transposição do rio São Francisco e ao desenvolvimento do sertão, temas que atravessam as legislaturas. A bancada também se mobiliza em torno da segurança hídrica, do turismo e do polo de saúde de Recife, setores de peso na economia local.',
        'Na Câmara, os deputados do estado integram frentes de indústria, tecnologia e recursos hídricos, e no Senado os três representantes participam das comissões de desenvolvimento regional e assuntos econômicos. Pernambuco costuma projetar lideranças nacionais e abrigar disputas políticas acirradas entre grupos com tradição de organização partidária. A delegação também acompanha as políticas de desenvolvimento do sertão e do agreste, regiões que concentram parcela relevante do eleitorado.',
        'A delegação combina nomes da capital, da Região Metropolitana e do interior, com renovação parcial a cada eleição. A política pernambucana tem história de alternância entre forças de diferentes campos, perfil que se reflete na bancada federal e que mantém o estado entre os protagonistas das articulações do Nordeste no Congresso. A competitividade das eleições pernambucanas, entre as mais disputadas do Nordeste, mantém a bancada em constante renovação.',
      ],
    },
    temas: {
      titulo: 'Recife, Suape e o sertão do São Francisco',
      paragrafos: [
        'Pernambuco reúne uma das economias mais diversificadas do Nordeste. Recife, capital, é o centro de serviços e abriga o Porto Digital, um dos principais polos de tecnologia do país, enquanto o complexo portuário-industrial de Suape atraiu refinaria, estaleiros e indústrias químicas nas últimas décadas. O estado também é forte em educação e pesquisa, com universidades centenárias e uma das maiores redes de escolas técnicas do país.',
        'O rio São Francisco corta o sertão pernambucano e alimenta a agricultura irrigada do polo Petrolina-Juazeiro, referência nacional em fruticultura para exportação. O turismo de Olinda e Fernando de Noronha, o frevo e o maracatu projetam a cultura pernambucana no país e no exterior, com reconhecimento de patrimônios da humanidade. O São Francisco também abastece o polo de irrigação e atrai investimentos em fruticultura e turismo na região do vale.',
        'A Zona da Mata conserva a herança da cana-de-açúcar, o agreste cresce com confecções e serviços, e o sertão convive com a seca e com as obras de transposição do São Francisco. Essa diversidade faz da agenda da bancada um mosaico de interesses regionais que se renovam a cada ciclo orçamentário. A agenda da bancada reflete essa diversidade, com atenção tanto às demandas urbanas da capital quanto às do interior semiárido.',
      ],
    },
    historia: {
      titulo: 'Palco de revoltas e revoluções',
      paragrafos: [
        'Pernambuco tem uma das histórias políticas mais ricas do Brasil. Foi palco da Revolução Pernambucana de 1817, que proclamou uma república provisória, e da Confederação do Equador, em 1824, além de abrigar a resistência à ocupação holandesa no século XVII, com a Insurreição Pernambucana como marco. O estado também foi berço do abolicionismo e de movimentos culturais, com tradições como o frevo, patrimônio imaterial da humanidade.',
        'A economia do açúcar sustentou a província e depois o estado, que manteve representação numerosa no Congresso desde o Império. No século XX, Recife foi centro de movimentos culturais e de debates políticos que ecoaram no plano nacional, consolidando a tradição de lideranças pernambucanas na política brasileira. A literatura de cordel, o cinema e a música seguiram projetando a cultura pernambucana no cenário nacional.',
        'A política pernambucana moderna alternou forças tradicionais e novas lideranças, com períodos de polarização e de alianças amplas. A delegação federal, uma das maiores do Nordeste, mantém o estado entre os protagonistas das negociações no Congresso, posição que ocupa desde a redemocratização. A participação pernambucana nas disputas presidenciais e nas articulações do Congresso reforça o protagonismo político do estado no cenário nacional.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'pi',
    nome: 'Piauí',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada compacta, presença constante',
      paragrafos: [
        'O Piauí elege uma bancada federal compacta e três senadores, com delegação atuante nas pautas do semiárido e do desenvolvimento do Nordeste. A representação piauiense costuma priorizar temas como recursos hídricos, agricultura irrigada e políticas sociais, áreas em que o estado avançou nas últimas décadas. A bancada também defende investimentos em estradas, ferrovias e no porto de Luís Correia, obras consideradas estratégicas para o escoamento da produção.',
        'Na Câmara, os deputados do Piauí integram as frentes nordestinas e de agricultura, e no Senado os três representantes acompanham comissões de desenvolvimento regional e educação. O estado também tem tradição de projetar lideranças para cargos nacionais, com parlamentares que ocuparam posições de comando nas duas casas. A delegação também acompanha as políticas de interiorização universitária e de combate à pobreza, que transformaram o estado nas últimas décadas.',
        'A delegação combina nomes de Teresina, do litoral e do interior, com renovação parcial a cada eleição. A política piauiense é marcada pela força de grupos regionais e pela alternância entre partidos, perfil comum aos estados do Nordeste e que se reflete na composição plural da bancada federal. A renovação da bancada, com a entrada de novas lideranças, reflete a transição pela qual o estado passa.',
      ],
    },
    temas: {
      titulo: 'Delta, caju e o cerrado do sul',
      paragrafos: [
        'O Piauí tem litoral curto, mas singular: o delta do Parnaíba, na divisa com o Maranhão, é o único delta em mar aberto das Américas, com dunas, manguezais e o turismo das cidades de Parnaíba e Luís Correia. A capital, Teresina, é a única capital do Nordeste fora do litoral, às margens dos rios Parnaíba e Poti. O rio Parnaíba, que dá nome ao delta, marca a divisa com o Maranhão e é navegável em boa parte do seu curso.',
        'O semiárido cobre o centro-sul do estado, com convivência com a seca e agricultura de sequeiro, enquanto o sul, em área de cerrado, vive a expansão da soja integrada à região do Matopiba. O Piauí é o maior produtor nacional de caju, atividade tradicional do litoral, e avança na fruticultura irrigada. A fruticultura irrigada e a produção de mel e de cajuína ampliam a pauta agroindustrial do estado.',
        'A Serra da Capivara, no sudeste, abriga sítios arqueológicos com pinturas rupestres entre os mais antigos das Américas, reconhecidos como patrimônio da humanidade. O ecoturismo, o artesanato em palha e a música regional completam o perfil do estado, que também investe em energias renováveis. O parque nacional da Serra da Capivara atrai pesquisadores do mundo inteiro, interessados nas pinturas rupestres e na arqueologia local.',
      ],
    },
    historia: {
      titulo: 'Do interior à modernização tardia',
      paragrafos: [
        'O Piauí foi ocupado a partir do interior, com fazendas de gado que seguiam o curso do rio Parnaíba, e a província teve papel secundário na colônia, baseada na pecuária e no algodão. Teresina, fundada em 1852, foi a primeira capital planejada do Brasil no período imperial, símbolo da interiorização do povoamento. A criação da capital, em meados do século XIX, transferiu o centro administrativo do litoral para o interior, decisão que moldou a ocupação do estado.',
        'A representação piauiense no Congresso existe desde o Império, com bancada sempre proporcional à população do estado. No século XX, o Piauí figurou entre os estados mais pobres do país, situação que começou a mudar com os programas sociais e com a expansão agrícola recente no cerrado do sul. A migração de nordestinos para outras regiões, fenômeno histórico, também marcou o Piauí, que hoje recebe investimentos em educação e infraestrutura.',
        'Nas últimas décadas, o estado combinou avanços sociais com a chegada do agronegócio ao cerrado, e a delegação federal passou a defender uma agenda de desenvolvimento diversificada. A história recente mostra um Piauí em transição, com representação atenta às oportunidades e aos gargalos do estado no Congresso. A agenda da bancada combina a defesa dos programas sociais com o apoio à nova fronteira agrícola do cerrado.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'pr',
    nome: 'Paraná',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Uma das maiores bancadas do Sul',
      paragrafos: [
        'O Paraná elege uma das maiores bancadas da região Sul e três senadores, com delegação forte e organizada. A representação paranaense atua em pautas do agronegócio, da indústria e da infraestrutura, com destaque para temas como a usina de Itaipu, os portos de Paranaguá e Antonina e a logística de escoamento da produção. A bancada também acompanha as discussões sobre pedágios nas rodovias estaduais, tema de grande repercussão entre a população paranaense.',
        'Na Câmara, os deputados do estado integram frentes de agropecuária, indústria e comércio exterior, e no Senado os três representantes participam das comissões de agricultura e assuntos econômicos. O Paraná também costuma eleger governadores de diferentes partidos, refletindo uma política estadual plural e competitiva. A delegação também participa das negociações sobre a reforma do ICMS e sobre o pacto federativo, matérias de impacto direto nas finanças do estado.',
        'A delegação combina nomes de Curitiba, do interior agrícola e do litoral, com renovação parcial a cada eleição. A política paranaense é conhecida pela organização partidária e pela alternância de forças, com bancada federal que acompanha as disputas locais e mantém o estado influente nas negociações do Sul. A força dos partidos no estado, com estruturas organizadas nos municípios, sustenta a renovação constante da bancada.',
      ],
    },
    temas: {
      titulo: 'Agro, indústria e Itaipu',
      paragrafos: [
        'O Paraná é um dos principais estados agrícolas do país: soja, milho, trigo e frango sustentam uma economia que também se destaca na indústria, com o polo automotivo de Curitiba e a agroindústria do interior. O estado é líder nacional na produção de proteína animal, com cadeias integradas de aves e suínos. O estado é também um dos maiores produtores de madeira, papel e celulose do país, com florestas plantadas que abastecem a indústria.',
        'A usina de Itaipu, binacional com o Paraguai, é uma das maiores hidrelétricas do mundo e abastece parte significativa do consumo brasileiro. O porto de Paranaguá escoa a produção agrícola do estado e de outras regiões, e Foz do Iguaçu, com as cataratas, é um dos destinos turísticos mais visitados do país. A construção de Itaipu, na década de 1970, atraiu trabalhadores de todo o país e transformou a região oeste do estado.',
        'O estado tem tradição de cooperativismo, com algumas das maiores cooperativas do mundo, e uma matriz energética diversificada, com hidrelétricas, biocombustíveis e parques eólicos em expansão. A erva-mate e o café marcaram a história econômica paranaense e seguem presentes na cultura e na pauta regional. O interior paranaense, com suas cooperativas e agroindústrias, é um dos mais prósperos do país e define o perfil da representação estadual.',
      ],
    },
    historia: {
      titulo: 'Da erva-mate ao agronegócio moderno',
      paragrafos: [
        'O Paraná foi ocupado a partir do século XVII por paulistas que buscavam ouro e índios, e a erva-mate foi o primeiro grande ciclo econômico do estado. No século XIX, a imigração europeia, sobretudo de alemães, italianos, poloneses e ucranianos, moldou a ocupação do sul do estado e da região de Curitiba. As colônias de imigração preservaram línguas, festas e tradições que ainda hoje caracterizam o interior paranaense.',
        'No século XX, o ciclo do café, com a marcha da produção a partir de São Paulo, transformou o norte do Paraná, e a grande geada de 1975 levou à substituição do café pela soja e pelo trigo. O estado se modernizou rapidamente, com forte industrialização e urbanização a partir dos anos 1970. A industrialização de Curitiba e da região metropolitana, com o polo automotivo, consolidou o Paraná entre os estados mais desenvolvidos do Sul.',
        'A representação paranaense no Congresso acompanhou essas transformações, mantendo bancada numerosa e atuante desde a Primeira República. A política local, com tradição de organização e de disputas entre regiões do estado, consolidou o Paraná como uma das delegações mais influentes do Sul nas negociações nacionais. A tradição de diálogo entre os poderes e a estabilidade institucional são marcas da política paranaense nas últimas décadas.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'rj',
    nome: 'Rio de Janeiro',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Entre as maiores delegações do país',
      paragrafos: [
        'O Rio de Janeiro elege uma das maiores bancadas da Câmara dos Deputados do país e três senadores, com delegação marcada pela diversidade política. A representação fluminense atua em pautas metropolitanas, de petróleo e gás, segurança pública e cultura, refletindo a complexidade de um estado que combina capital e municípios do interior. A pauta dos royalties e da participação especial, que divide recursos entre os municípios produtores, mobiliza a bancada em todas as votações orçamentárias.',
        'Na Câmara, os deputados do Rio integram frentes de energia, segurança e cultura, e no Senado os três representantes participam das comissões de assuntos econômicos e de constituição e justiça. O estado concentra sedes de empresas estatais e órgãos federais, o que aproxima a agenda da bancada dos temas empresariais e do funcionalismo. A delegação também acompanha os programas de segurança pública e as políticas sociais, temas sensíveis para o eleitorado fluminense.',
        'A delegação fluminense é plural em termos partidários e costuma renovar parte das cadeiras a cada eleição. A política do estado, marcada por polarizações e por disputas entre a capital, a Baixada e o interior, projeta lideranças com grande exposição nacional em todos os campos. A renovação parcial da bancada, com a entrada de novas lideranças, mantém a delegação conectada às mudanças do eleitorado.',
      ],
    },
    temas: {
      titulo: 'Petróleo, turismo e a metrópole',
      paragrafos: [
        'A economia fluminense é fortemente ligada ao petróleo e ao gás: a Bacia de Campos, descoberta na década de 1970, e o pré-sal fazem do estado o maior produtor nacional de petróleo, com royalties que financiam os municípios. A indústria naval, a siderurgia e a indústria química completam a base produtiva tradicional. A indústria do petróleo sustenta uma cadeia de fornecedores e de serviços especializados concentrada em Macaé e na região dos lagos.',
        'O turismo é outro pilar: o Rio de Janeiro atrai visitantes do mundo inteiro com suas praias, o Cristo Redentor, o Pão de Açúcar e eventos como o carnaval, e o interior, com a região serrana, Petrópolis e a Costa Verde, diversifica a oferta turística ao longo do ano. O estado também sedia grandes eventos esportivos e culturais, e a economia criativa, do audiovisual à música, tem peso crescente.',
        'A Região Metropolitana do Rio, uma das maiores do país, concentra população, serviços e também os principais desafios urbanos, de mobilidade e segurança. A Baixada Fluminense, o norte fluminense, com sua economia ligada ao petróleo, e o interior agropecuário completam um estado de grandes contrastes econômicos e sociais. A mobilidade, o saneamento e a segurança seguem como os principais desafios metropolitanos, tema permanente da agenda da bancada.',
      ],
    },
    historia: {
      titulo: 'A capital que moldou o país',
      paragrafos: [
        'O Rio de Janeiro foi capital do Brasil de 1763 a 1960, período em que concentrou a corte, o governo imperial e depois a República. Essa centralidade fez do estado o palco das principais decisões políticas do país por dois séculos, com representação sempre numerosa no Congresso e forte presença na vida nacional. A cidade foi também capital do Império e da República, papel que moldou a arquitetura, as instituições e a vida cultural do estado.',
        'Em 1975, a fusão do estado do Rio com a Guanabara, antigo Distrito Federal, criou o estado atual, reunindo a capital e o antigo interior fluminense. O processo reorganizou a política local e a composição da bancada federal, que passou a representar um território maior e mais diverso. A fusão de 1975 unificou a política fluminense e criou o estado atual, com capital única e bancada única no Congresso.',
        'Nas últimas décadas, o estado alternou fases de protagonismo econômico, com o petróleo e os grandes eventos, e de crise fiscal, tema recorrente nas discussões federativas. A delegação fluminense, entre as maiores do país, mantém o Rio de Janeiro no centro das negociações nacionais, posição que ocupa desde a República. A restauração do centro histórico do Rio, tombado como patrimônio da humanidade, simboliza a relação da cidade com a própria história.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'rn',
    nome: 'Rio Grande do Norte',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada de porte médio no Nordeste',
      paragrafos: [
        'O Rio Grande do Norte elege uma bancada federal de porte médio e três senadores, com delegação atuante nas pautas do Nordeste. A representação potiguar costuma priorizar temas como energia eólica, petróleo, turismo e recursos hídricos, áreas centrais para a economia estadual e para o seu desenvolvimento. A bancada também acompanha os debates sobre a malha rodoviária e sobre a duplicação de estradas estratégicas para o turismo e o escoamento da produção.',
        'Na Câmara, os deputados do estado integram frentes de energia, turismo e desenvolvimento regional, e no Senado os três representantes acompanham comissões de infraestrutura e assuntos econômicos. O estado também tem tradição de projetar lideranças nacionais, com parlamentares que ocuparam cargos de destaque nas duas casas. A delegação também participa das discussões sobre o pré-sal e sobre a partilha dos royalties, temas de interesse direto do estado.',
        'A delegação combina nomes de Natal, do litoral e do interior, com renovação parcial a cada eleição. A política potiguar alterna grupos tradicionais e novas forças, perfil comum aos estados do Nordeste, com disputas acirradas pelas cadeiras federais e pela influência no governo do estado. As disputas entre os grupos políticos do estado, históricas e competitivas, se refletem na composição da bancada federal.',
      ],
    },
    temas: {
      titulo: 'Sal, vento e sol no litoral',
      paragrafos: [
        'O Rio Grande do Norte é o maior produtor nacional de sal, extraído das salinas do litoral, e um dos maiores produtores terrestres de petróleo do país, com campos no interior e na costa. O estado também lidera a geração de energia eólica no Brasil, com parques que aproveitam os ventos constantes do litoral, e avança na energia solar. O estado também sedia a base de lançamento de foguetes de Barreira do Inferno, ligada ao programa espacial brasileiro.',
        'O turismo é forte: Natal e as praias da costa das Dunas e da Costa Branca atraem visitantes, e o litoral sul, com Genipabu e as piscinas naturais, está entre os destinos mais procurados do Nordeste. A fruticultura irrigada, o camarão e o caju completam a pauta produtiva do estado. O artesanato, sobretudo o de renda de bilro e o de cerâmica, e a culinária à base de peixes e frutos do mar completam a identidade potiguar.',
        'O interior, com a região do Seridó, vive da mineração, da caprinocultura e do algodão, em uma área de semiárido que depende das obras hídricas. A história do estado registra ainda um pioneirismo: um município potiguar elegeu, em 1928, a primeira prefeita do Brasil, marco lembrado até hoje. O abastecimento de água do interior depende de adutoras e de reservatórios, obras que a bancada acompanha de perto.',
      ],
    },
    historia: {
      titulo: 'Do sal e do algodão à energia limpa',
      paragrafos: [
        'O Rio Grande do Norte foi uma das primeiras capitanias do Brasil e teve economia baseada no gado, no algodão e no sal durante os períodos colonial e imperial. A capital, Natal, cresceu como porto e centro comercial, e o estado manteve representação no Congresso desde o Império. As salinas e os engenhos marcaram a ocupação do litoral, e a pecuária se expandiu pelo sertão em direção ao interior.',
        'Durante a Segunda Guerra Mundial, Natal sediou uma base aérea aliada, episódio que projetou a cidade internacionalmente e que é lembrado pela historiografia local. No século XX, o estado diversificou a economia com o petróleo e, a partir dos anos 2000, tornou-se pioneiro nacional na geração de energia eólica. As pesquisas em energias renováveis aproximaram o estado do setor de ciência e tecnologia, com institutos dedicados ao tema.',
        'A representação potiguar acompanhou essa trajetória, com bancada proporcional à população e três senadores em todas as legislaturas. A política local, com tradição de grupos familiares e alternância de partidos, mantém o estado presente nas discussões federativas do Nordeste e nas pautas de energia. A presença feminina crescente na política potiguar é um dos traços da evolução recente da representação local.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'ro',
    nome: 'Rondônia',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada pequena, pautas de fronteira',
      paragrafos: [
        'Rondônia elege uma das menores bancadas da Câmara dos Deputados e três senadores, com delegação atuante nas pautas amazônicas e do agronegócio. A representação rondoniense costuma priorizar temas como logística, energia, regularização fundiária e a integração com a Bolívia, país vizinho na fronteira oeste. A bancada também se mobiliza em torno da malha rodoviária, do asfaltamento de trechos estratégicos e do fortalecimento da saúde no interior.',
        'Na Câmara, os deputados de Rondônia integram frentes de agropecuária e infraestrutura, e no Senado os três representantes acompanham comissões de desenvolvimento regional e agricultura. O estado, criado há poucas décadas, construiu em pouco tempo uma tradição própria de representação, voltada para as demandas da colonização recente. A delegação acompanha ainda os programas de regularização fundiária e de apoio à agricultura familiar, temas centrais para um estado de colonização recente.',
        'A delegação combina nomes de Porto Velho, de Ji-Paraná e dos municípios do interior, com renovação parcial a cada eleição. A política local é marcada pela força do agronegócio e pela diversidade da população formada por migrantes de todas as regiões do país, perfil que se reflete na bancada federal. A diversidade de origens da população, com forte presença sulista e nordestina, se reflete nas disputas políticas locais.',
      ],
    },
    temas: {
      titulo: 'Agro, floresta e a memória da Madeira-Mamoré',
      paragrafos: [
        'Rondônia combina a floresta amazônica, que cobre boa parte do território, com uma economia dominada pela agropecuária: a soja, o milho e a pecuária avançaram sobre as áreas de cerrado e de transição, e o estado está entre os maiores produtores de carne do país. A cafeicultura, que marcou a colonização dirigida dos anos 1970 e 1980, ainda tem peso no interior. O estado é também um dos maiores produtores de café robusta da região Norte, cultura que ocupa pequenas propriedades no interior.',
        'A capital, Porto Velho, nasceu às margens do rio Madeira e guarda a memória da estrada de ferro Madeira-Mamoré, construída no início do século XX para escoar a borracha da região. As usinas hidrelétricas de Santo Antônio e Jirau, no rio Madeira, ampliaram a geração de energia e atraíram investimentos. A construção das usinas, na década de 2010, trouxe investimentos e movimentou a economia de Porto Velho e região.',
        'O estado faz fronteira com a Bolívia, com comércio ativo nas cidades de Guajará-Mirim e na região de fronteira, e abriga terras indígenas e unidades de conservação. A mineração, o extrativismo da castanha e da borracha e o turismo de floresta completam a pauta econômica e ambiental da representação local. A ponte sobre o rio Madeira, ligando o Brasil à Bolívia, é a principal via de comércio com o país vizinho.',
      ],
    },
    historia: {
      titulo: 'O território que virou estado em 1982',
      paragrafos: [
        'Rondônia foi criado como território federal em 1943, com o nome de Guaporé, e rebatizado na década de 1950 em homenagem ao marechal Cândido Rondon, sertanista que integrou a região ao país. A ocupação era rarefeita até meados do século XX, com população concentrada às margens dos rios e nas missões religiosas. As obras da estrada de ferro, no início do século XX, deixaram vestígios históricos que hoje são patrimônio da região.',
        'A partir dos anos 1970, os projetos de colonização, as estradas e a migração de agricultores do Sul transformaram o território: a população cresceu rapidamente, e Rondônia foi elevada à condição de estado em 1982, passando a eleger governador, deputados federais e senadores. Os conflitos fundiários do período de colonização marcaram a história do estado e ainda aparecem nas pautas da representação federal.',
        'Desde então, a representação rondoniense acompanhou a expansão agropecuária e os debates fundiários da região, temas que marcam a agenda local. A história curta do estado convive com uma identidade política forte, formada por migrantes de todas as regiões do país, o que dá à bancada um perfil pragmático. A agenda da bancada combina o apoio ao agronegócio com as demandas de infraestrutura social herdadas da ocupação rápida.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'rr',
    nome: 'Roraima',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Uma das menores delegações do país',
      paragrafos: [
        'Roraima elege uma das menores bancadas da Câmara dos Deputados e três senadores, e é o estado com a menor população do país. Apesar do tamanho, a delegação roraimense tem agenda própria, centrada na fronteira com a Venezuela e a Guiana, nas terras indígenas e na infraestrutura da Amazônia setentrional. A pauta do abastecimento, que depende de estradas longas e do transporte aéreo, também é constante na agenda da delegação roraimense.',
        'Na Câmara, os deputados de Roraima integram frentes de segurança pública e de defesa das fronteiras, e no Senado os três representantes acompanham temas de relações exteriores e desenvolvimento regional. A imigração venezuelana, intensa a partir do fim da década de 2010, colocou o estado no centro do debate nacional sobre acolhimento humanitário. A delegação também participa das negociações sobre a operação Acolhida e sobre os repasses federais para a saúde e a educação locais.',
        'A delegação combina nomes de Boa Vista, única capital do estado, e dos municípios do interior, com renovação parcial a cada eleição. A política local é marcada pela força do funcionalismo público e por disputas entre grupos ligados ao agronegócio e aos povos indígenas, tensão que atravessa a agenda da bancada. A polarização entre as pautas do agronegócio e as dos povos indígenas mantém a política local em debate permanente.',
      ],
    },
    temas: {
      titulo: 'Fronteira, lavrado e a Amazônia',
      paragrafos: [
        'Roraima é o estado mais setentrional do Brasil, com fronteira com a Venezuela ao norte e a Guiana a leste. O relevo mistura a floresta amazônica com o lavrado, uma savana que cobre boa parte do território e abriga o Monte Roraima, no extremo norte, um dos pontos mais altos do país. O lavrado, com suas chapadas e campos, é habitat de espécies únicas e destino de pesquisas científicas e de turismo de observação.',
        'A economia local é pequena e dependente do funcionalismo público, do comércio e da agropecuária, com a soja e o arroz cultivados no lavrado. O estado abriga extensas terras indígenas, como a Raposa Serra do Sol, e a demarcação de territórios é tema permanente do debate político local e nacional. O estado também investe no turismo de aventura e na observação da natureza, com potencial reconhecido na região das serras.',
        'A capital, Boa Vista, é a única capital brasileira totalmente ao norte da linha do Equador, e o rio Branco corta o estado de norte a sul. A logística depende da rodovia BR-174, que liga Manaus à fronteira venezuelana, rota usada no fluxo migratório recente e alvo de investimentos federais. O fluxo migratório recente pressionou os serviços públicos e exigiu a ampliação da estrutura de acolhimento do estado.',
      ],
    },
    historia: {
      titulo: 'Do território federal ao estado de 1988',
      paragrafos: [
        'Roraima foi criado como território federal na década de 1940, com o nome de Rio Branco, e rebatizado na década de 1960. A região permaneceu por décadas entre as menos povoadas do país, com economia baseada no extrativismo, na pecuária e no funcionalismo público federal. A criação do território federal atraiu funcionários públicos e pioneiros, que formaram a base da população de Boa Vista.',
        'A Constituição de 1988 elevou Roraima à condição de estado, com direito a eleger governador, deputados federais e senadores. Desde então, a representação roraimense construiu sua história no Congresso em torno das pautas de fronteira, terras indígenas e segurança pública, temas que definem a agenda local. A instalação dos poderes estaduais em Boa Vista consolidou a capital como centro político e econômico, concentrando serviços e empregos.',
        'A chegada de migrantes venezuelanos, a partir de 2018, mudou a demografia e a agenda política do estado, que passou a receber programas federais de acolhimento e interiorização. A delegação pequena, somada aos três senadores, garante a Roraima voz própria nas discussões nacionais sobre fronteiras e migração. A integração com a Guiana e a Venezuela, por estradas e pelo comércio de fronteira, segue na pauta da delegação.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'rs',
    nome: 'Rio Grande do Sul',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Uma das maiores bancadas do Sul',
      paragrafos: [
        'O Rio Grande do Sul elege uma das maiores bancadas da região Sul e três senadores, com delegação de forte tradição partidária. A representação gaúcha é conhecida pela polarização política entre diferentes espectros, e seus parlamentares costumam ter atuação destacada em comissões, relatorias e na construção de acordos nacionais. A bancada também atua nos temas do funcionalismo estadual e das finanças do Rio Grande do Sul, que enfrenta ciclos de desequilíbrio fiscal e depende de acordos com a União.',
        'Na Câmara, os deputados do estado integram frentes de agricultura, indústria e segurança, e no Senado os três representantes participam das comissões de assuntos econômicos e de agronegócio. As enchentes de maio de 2024, que atingiram a capital e centenas de municípios, mobilizaram a bancada em torno de recursos para reconstrução e prevenção. A delegação também acompanha os programas federais de crédito rural e de seguro agrícola, essenciais para os produtores gaúchos.',
        'A delegação combina nomes de Porto Alegre, da serra, do sul e do norte do estado, com renovação parcial a cada eleição. A política gaúcha, marcada pela organização partidária e pelo voto de opinião, projeta lideranças com peso nacional em todas as legendas, perfil que se mantém ao longo das legislaturas. A organização partidária gaúcha, uma das mais antigas do país, mantém a bancada coesa nos momentos decisivos das votações nacionais.',
      ],
    },
    temas: {
      titulo: 'Agro, serra e a reconstrução pós-enchente',
      paragrafos: [
        'O Rio Grande do Sul é um dos principais estados do agronegócio: soja, arroz, trigo, milho e a pecuária de corte formam a base da economia, junto com a indústria de máquinas agrícolas, calçados e alimentos. A serra gaúcha, com sua produção de vinhos e a herança da imigração italiana, é um dos principais destinos turísticos do país. O estado também se destaca na produção de tabaco, maior do país, e na vitivinicultura, que sustenta o turismo da serra e o comércio exterior.',
        'As enchentes de maio de 2024, entre as maiores da história do estado, atingiram a capital e centenas de municípios, com impacto econômico e social profundo. A reconstrução, com obras de prevenção e apoio às famílias atingidas, tornou-se a principal pauta da representação gaúcha no Congresso e nos governos estadual e federal. A resposta às enchentes, com a reconstrução de estradas, pontes e moradias, segue mobilizando recursos federais e a atenção da bancada.',
        'O estado também se destaca na produção de energia, com parques eólicos na campanha e hidrelétricas, e no cooperativismo, um dos mais fortes do país. Porto Alegre, capital, e o porto de Rio Grande, no sul, completam a infraestrutura logística de uma economia diversificada e industrializada. A campanha gaúcha, com seus campos de pecuária, e o litoral, com balneários históricos, completam a geografia econômica e turística do estado.',
      ],
    },
    historia: {
      titulo: 'Fronteira, revolução e imigração',
      paragrafos: [
        'O Rio Grande do Sul formou-se como região de fronteira, marcada pelas guerras platinas e pela Revolução Farroupilha, que durou de 1835 a 1845 e foi a mais longa revolta do período imperial. A cultura gaúcha, do chimarrão ao churrasco e às tradições de estância, nasceu dessa história de conflitos e de pecuária extensiva. As guerras e revoluções forjaram uma cultura política própria, de valorização da tradição e da palavra.',
        'A imigração alemã, a partir de 1824, e a italiana, a partir de 1875, povoou o norte e a serra do estado, criando cidades como São Leopoldo e Caxias do Sul. No século XX, o Rio Grande do Sul manteve forte tradição política, com bancada numerosa e presença constante nas principais disputas nacionais. O estado também sediou importantes movimentos políticos do século XX e mantém uma das imprensas regionais mais ativas do país.',
        'Nas últimas décadas, o estado alternou ciclos de liderança econômica e de crises fiscais, temas recorrentes nas discussões federativas. A representação gaúcha, plural e organizada, mantém o Rio Grande do Sul entre os estados mais influentes do país no Congresso, papel que exerce desde a redemocratização. A vocação de liderança política do estado, forjada ao longo de décadas, permanece como traço marcante da delegação gaúcha no Congresso.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'sc',
    nome: 'Santa Catarina',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada organizada e empreendedora',
      paragrafos: [
        'Santa Catarina elege uma bancada federal de porte médio e três senadores, com delegação conhecida pela organização e pelo perfil empreendedor. A representação catarinense atua em pautas de indústria, comércio exterior, tecnologia e agropecuária, setores que sustentam uma das economias mais dinâmicas do país. A bancada também acompanha as discussões sobre a reforma tributária e sobre a simplificação da burocracia para as pequenas empresas, base do tecido produtivo catarinense.',
        'Na Câmara, os deputados do estado integram frentes de indústria, tecnologia e portos, e no Senado os três representantes participam de comissões de assuntos econômicos e de ciência e tecnologia. O estado também é referência nacional em gestão pública e em qualidade de vida, temas que aparecem nas pautas da bancada. A delegação também defende a ampliação dos portos e aeroportos do estado, obras consideradas essenciais para a competitividade da economia local.',
        'A delegação combina nomes do Vale do Itajaí, de Florianópolis, do norte e do sul do estado, com renovação parcial a cada eleição. A política catarinense é marcada pela força dos municípios médios e pela alternância entre partidos de centro e de direita, perfil estável ao longo das últimas legislaturas. A renovação parcial da bancada, combinada com a permanência de lideranças experientes, garante continuidade à atuação catarinense no Congresso.',
      ],
    },
    temas: {
      titulo: 'Tecnologia, têxteis e portos',
      paragrafos: [
        'Santa Catarina tem economia diversificada e pulverizada: o Vale do Itajaí concentra a indústria têxtil e de confecções, o norte do estado abriga indústrias metalmecânicas e de móveis, e o oeste é forte na agroindústria de aves e suínos, com empresas de projeção nacional. A pequena propriedade rural e o cooperativismo sustentam a agropecuária local. A cadeia de aves e suínos, integrada em todo o oeste, tornou Santa Catarina referência mundial em produção de proteína animal.',
        'Florianópolis, capital, virou polo de tecnologia e inovação, com um ecossistema de startups e empresas de software reconhecido nacionalmente, e o estado está entre os líderes em inovação no país. Os portos de Itajaí, Navegantes e São Francisco do Sul movimentam parte relevante do comércio exterior brasileiro, especialmente do Sul. O estado também se destaca na produção de mel, maçã e cebola, atividades de pequenas propriedades beneficiadas pelo clima e pela organização cooperativista.',
        'O turismo completa o quadro: as praias de Florianópolis, Balneário Camboriú e Itapema, a serra com suas estâncias e as festas de outubro, como a Oktoberfest de Blumenau, atraem milhões de visitantes todos os anos. A produção de carvão no sul do estado, histórica, ainda marca a economia da região carbonífera. O litoral catarinense, com centenas de quilômetros de praias, e a serra, com suas estações de inverno, formam a principal vocação turística do Sul.',
      ],
    },
    historia: {
      titulo: 'Imigração e pequena propriedade',
      paragrafos: [
        'Santa Catarina foi colonizada por imigrantes europeus no século XIX, sobretudo alemães, italianos e açorianos, que formaram colônias de pequenas propriedades familiares no litoral e no interior. Essa base agrícola e o espírito associativo deram origem ao cooperativismo e à indústria que caracterizam o estado até hoje. Essas colônias desenvolveram um modelo de ocupação baseado no trabalho familiar, que mais tarde sustentou o surgimento das indústrias locais.',
        'A Guerra do Contestado, disputada com o Paraná pela região do planalto entre 1912 e 1916, marcou a história do estado e levou à definição definitiva das fronteiras. No século XX, a industrialização pulverizada, com empresas familiares que viraram grupos nacionais, consolidou a economia catarinense. O carvão mineral, explorado no sul do estado, sustentou a indústria catarinense por décadas e ainda gera empregos na região.',
        'A representação catarinense no Congresso acompanhou essa trajetória, com bancada estável e atuante desde o Império. A política local, marcada pela organização e por disputas menos polarizadas do que em outros estados, mantém Santa Catarina entre as delegações mais influentes do Sul nas negociações nacionais. A combinação de tradição e inovação faz de Santa Catarina um dos estados mais competitivos do país, perfil que se reflete na bancada.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'se',
    nome: 'Sergipe',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'Bancada pequena, voz ativa',
      paragrafos: [
        'Sergipe elege uma bancada federal pequena e três senadores, com delegação atuante nas pautas do Nordeste. A representação sergipana costuma priorizar temas como petróleo, o rio São Francisco, a indústria e as políticas sociais, áreas centrais para a economia estadual e para o desenvolvimento do estado. A bancada também defende investimentos no complexo portuário e nas indústrias de fertilizantes e de cimento, setores em expansão no estado.',
        'Na Câmara, os deputados do estado integram frentes de energia e desenvolvimento regional, e no Senado os três representantes acompanham comissões de infraestrutura e assuntos econômicos. Apesar do tamanho, a delegação sergipana projeta lideranças com presença nacional e participação em posições de comando nas duas casas. A delegação também acompanha as políticas de exploração do gás natural e os projetos de petroquímica previstos para a região de Sergipe.',
        'A delegação combina nomes de Aracaju, do litoral e do sertão, com renovação parcial a cada eleição. A política sergipana alterna grupos tradicionais e novas forças, perfil comum aos estados de menor população do Nordeste, com disputas acirradas pelas poucas cadeiras federais. As disputas pelas poucas cadeiras federais costumam ser das mais acirradas do Nordeste, mobilizando as principais lideranças políticas do estado.',
      ],
    },
    temas: {
      titulo: 'Petróleo, São Francisco e o menor estado',
      paragrafos: [
        'Sergipe é o menor estado do país em área, mas tem economia diversificada. O petróleo, extraído em terra e no mar desde meados do século XX, e o gás natural sustentam a arrecadação estadual, e o rio São Francisco corta o estado, com a hidrelétrica de Xingó localizada na divisa com Alagoas. A indústria de fertilizantes, com novas plantas previstas, pode transformar o estado em polo petroquímico do Nordeste.',
        'A foz do São Francisco, também na divisa com Alagoas, abriga uma das maiores concentrações de manguezais do país e sustenta a pesca e o turismo da região. A capital, Aracaju, planejada no século XIX, cresceu com o comércio e os serviços, e o litoral sul, com praias e falésias, atrai visitantes durante todo o ano. O centro histórico de São Cristóvão, patrimônio da humanidade, e as praias da foz do São Francisco completam o roteiro turístico sergipano.',
        'A agropecuária, com a cana-de-açúcar, a laranja e o milho, e a indústria de alimentos e cimento completam o quadro produtivo. O sertão sergipano convive com a seca e depende das obras hídricas, temas recorrentes na agenda da bancada federal e nas negociações com o governo federal. O abastecimento do sertão depende de adutoras e de obras como o Canal do Sertão, acompanhadas de perto pela bancada federal.',
      ],
    },
    historia: {
      titulo: 'Da capitania desmembrada da Bahia',
      paragrafos: [
        'Sergipe foi desmembrado da Bahia em 1820, tornando-se a mais nova capitania do período colonial tardio, e mantém desde então representação nas instâncias legislativas nacionais. O estado, pequeno em área, desenvolveu identidade própria, com forte cultura popular e tradição política local de longa data. As festas juninas, o forró e a culinária sergipana, como o caranguejo e o bolo de fubá, marcam a cultura local.',
        'No século XX, a descoberta de petróleo em terra, na década de 1960, transformou a economia sergipana e financiou a expansão de Aracaju. A representação federal acompanhou o crescimento, com bancada que oscilou conforme a população, mas sempre com três senadores em todas as legislaturas. A indústria de alimentos e a construção civil cresceram nas últimas décadas, diversificando a economia e a pauta da representação federal.',
        'Nas últimas décadas, Sergipe avançou em indicadores sociais e diversificou a economia, com a indústria e os serviços. A história recente da representação local combina continuidade de grupos políticos e renovação, em um estado que mantém presença constante nas pautas nordestinas do Congresso. A delegação sergipana, pequena mas atuante, mantém o estado presente nas comissões, nas relatorias e nas negociações do Congresso.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'sp',
    nome: 'São Paulo',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'A maior bancada do país',
      paragrafos: [
        'São Paulo elege a maior bancada da Câmara dos Deputados do país e três senadores, reflexo da maior população do Brasil. A delegação paulista reúne parlamentares de quase todos os partidos e espectros, e sua dimensão a torna decisiva em qualquer votação: nenhuma coalizão governista ou oposicionista ignora o peso paulista. A diversidade da delegação faz de São Paulo o estado com o maior número de frentes parlamentares representadas, da saúde à segurança, do agronegócio às pautas urbanas.',
        'Na Câmara, os deputados de São Paulo integram todas as principais frentes temáticas, da agropecuária à tecnologia, e no Senado os três representantes participam das comissões de assuntos econômicos e de constituição e justiça. O estado também concentra a maior parte das direções partidárias e das lideranças políticas nacionais. A bancada paulista também concentra as maiores bancadas temáticas da Câmara, o que amplia sua influência nas comissões.',
        'A delegação combina nomes da capital, da Grande São Paulo, do interior e do litoral, com renovação parcial a cada eleição. A política paulista é marcada pela diversidade e pela força dos grandes centros urbanos, perfil que se reflete na composição da maior bancada do Congresso e na pluralidade de pautas defendidas. A força eleitoral do interior, que elege parte relevante da delegação, equilibra a representação entre a metrópole e o campo.',
      ],
    },
    temas: {
      titulo: 'A maior economia e o interior produtivo',
      paragrafos: [
        'São Paulo é a maior economia do país e o principal centro financeiro da América Latina, com a bolsa de valores, as sedes dos grandes bancos e um dos maiores parques industriais do mundo. A capital concentra serviços, mas o interior abriga polos industriais e tecnológicos, como Campinas, São José dos Campos e o ABC paulista. O estado também concentra a maior parte do setor financeiro e de serviços do país, além de sediar as principais empresas de tecnologia.',
        'O agronegócio paulista também é gigante: o estado lidera a produção de cana-de-açúcar e de laranja e tem forte pecuária, com o porto de Santos, o maior da América Latina, escoando a produção para o exterior. O litoral, com o turismo do litoral norte e da baixada santista, completa a diversidade econômica do estado. A cana-de-açúcar alimenta um dos maiores polos de etanol e bioeletricidade do mundo, com usinas espalhadas pelo interior.',
        'A Grande São Paulo, uma das maiores regiões metropolitanas do mundo, concentra população, empregos e também os principais desafios urbanos de mobilidade, moradia e segurança. As universidades públicas, os institutos de pesquisa e o ecossistema de inovação fazem do estado o principal polo científico e tecnológico do país. A rede de transporte paulista, com rodovias concedidas, aeroportos e o maior sistema metroferroviário do país, sustenta a economia estadual.',
      ],
    },
    historia: {
      titulo: 'Do café à potência industrial',
      paragrafos: [
        'São Paulo foi povoado a partir do planalto, com as bandeiras que exploraram o interior na época colonial, e ganhou escala com o café no século XIX, que financiou ferrovias, portos e a imigração europeia. A capital e as cidades do interior cresceram rapidamente com a riqueza cafeeira, atraindo trabalhadores de todo o mundo. A abolição da escravidão e a chegada de imigrantes, no fim do século XIX, mudaram o perfil social e econômico do estado.',
        'No século XX, a industrialização, acelerada a partir dos anos 1930 e consolidada nas décadas seguintes, transformou o estado na locomotiva econômica do país. A representação paulista no Congresso, a maior desde a Primeira República, acompanhou essa centralidade, com presença decisiva em todos os períodos da história nacional. A criação da Universidade de São Paulo, nos anos 1930, e dos institutos de pesquisa consolidou a vocação científica do estado.',
        'A política paulista, marcada pela pluralidade partidária e pelos grandes colégios eleitorais, projeta lideranças de todos os campos. A combinação da maior bancada da Câmara com três senadores garante a São Paulo papel central nas negociações federativas e na definição da agenda nacional, posição que o estado ocupa desde o início da República. A pluralidade política paulista, da esquerda à direita, faz do estado um retrato da diversidade do eleitorado brasileiro.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
  {
    uf: 'to',
    nome: 'Tocantins',
    atualizadoEm: '2026-08-14',
    bancada: {
      titulo: 'A bancada do estado mais novo',
      paragrafos: [
        'Tocantins elege uma bancada federal de porte pequeno e três senadores, com delegação formada a partir da criação do estado, em 1988. A representação tocantinense atua em pautas do agronegócio, da logística e do desenvolvimento do cerrado, com forte ligação com Palmas, a capital planejada, e com os municípios do interior. A bancada também acompanha as discussões sobre a ferrovia Norte-Sul e sobre a conclusão de trechos rodoviários, obras que integram o estado ao restante do país.',
        'Na Câmara, os deputados do Tocantins integram frentes de agropecuária e infraestrutura, e no Senado os três representantes acompanham comissões de desenvolvimento regional e agricultura. Por ser um estado novo, a política local se organizou em torno de grupos fundadores, com renovação gradual de lideranças a cada eleição. A delegação também participa das políticas de expansão do agronegócio e de regularização fundiária, temas centrais para a economia local.',
        'A delegação combina nomes de Palmas, de Araguaína e dos municípios do interior, com renovação parcial a cada legislatura. A história curta do estado faz da representação federal um campo ainda em construção, com tradições que vão se consolidando na medida em que o estado amadurece institucionalmente. A história curta do estado faz da representação federal um campo em construção, com tradições que se consolidam a cada eleição e a cada legislatura do Congresso.',
      ],
    },
    temas: {
      titulo: 'Cerrado, agro e o Jalapão',
      paragrafos: [
        'Tocantins nasceu do desmembramento do norte de Goiás e tem no cerrado seu bioma predominante, com a soja, o milho e a pecuária sustentando a economia. O estado integra a região agrícola conhecida como Matopiba, uma das fronteiras de expansão do agronegócio brasileiro, com crescimento acelerado nas últimas décadas. A fruticultura irrigada, com destaque para o abacaxi e a banana, também ganha espaço na pauta produtiva do estado.',
        'O rio Tocantins, que dá nome ao estado, e o Araguaia, na divisa com Goiás e Mato Grosso, formam a bacia hidrográfica central, com usinas hidrelétricas que aproveitam o potencial da região. A ilha do Bananal, no Araguaia, é considerada a maior ilha fluvial do mundo, com parque nacional e reservas indígenas. As usinas do rio Tocantins geram energia para o estado e para o sistema interligado nacional, com novas hidrelétricas em estudo.',
        'O Jalapão, no leste do estado, virou destino de ecoturismo com seus fervedouros, dunas e cachoeiras, e Palmas, fundada em 1989, é a capital mais jovem do país. A logística, com a ferrovia Norte-Sul cortando o estado e rodovias que ligam o Centro-Oeste ao Norte, é tema central para o escoamento da produção. O turismo de natureza, com o Jalapão e a ilha do Bananal, cresce e diversifica a economia além do agronegócio.',
      ],
    },
    historia: {
      titulo: 'O estado criado pela Constituinte',
      paragrafos: [
        'Tocantins foi criado pela Constituição de 1988, desmembrado de Goiás, em um movimento que atendeu a reivindicações históricas do norte goiano por desenvolvimento próprio. A capital, Palmas, foi fundada em 1989 em área planejada às margens do rio Tocantins, hoje banhada pelo lago da usina hidrelétrica de Lajeado, no rio Tocantins. A escolha de Palmas como capital, no centro geográfico do estado, simbolizou a aposta no desenvolvimento do interior.',
        'Desde a instalação, o novo estado passou a eleger governador, deputados federais e senadores, construindo do zero sua representação no Congresso. A política local se organizou em torno de lideranças que participaram da criação do estado, com disputas pelo comando dos primeiros governos e pela definição dos centros de poder. A consolidação do estado também passa pela interiorização da universidade e pela expansão da rede de saúde, temas defendidos pela bancada no orçamento federal.',
        'Em pouco mais de três décadas, Tocantins combinou expansão agropecuária, investimentos em infraestrutura e crescimento urbano, com Araguaína e Gurupi se consolidando como polos regionais. A história da representação tocantinense é curta, mas o estado já garantiu presença nas pautas do agronegócio e do desenvolvimento regional no Congresso. A juventude institucional do estado, somada ao dinamismo da fronteira agrícola, projeta o Tocantins como unidade em ascensão no cenário nacional.',
      ],
    },
    fontes: [
      { label: 'Portal do TSE', href: 'https://www.tse.jus.br/' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/' },
      { label: 'Dados abertos do Senado', href: 'https://www12.senado.leg.br/dados-abertos' },
    ],
  },
];
