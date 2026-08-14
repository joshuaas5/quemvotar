export interface PerfilEditorial {
  fonte: 'camara' | 'senado';
  idOrigem: string;
  nome: string;
  atualizadoEm: string;
  texto: string[];
  fontes: { label: string; href: string }[];
}

export const PERFIS_EDITORIAL_2: PerfilEditorial[] = [
  {
    fonte: 'senado',
    idOrigem: '5979',
    nome: 'Leila Barros',
    atualizadoEm: '2026-08-14',
    texto: [
      'Leila Gomes de Barros Rêgo, conhecida como Leila Barros, nasceu em 30 de setembro de 1971, em Brasília (DF). Antes da vida pública, atuou como jogadora de vôlei, integrou a seleção brasileira e disputou edições dos Jogos Olímpicos; o registro oficial do Senado lista como profissão a de atleta. Em 2018, elegeu-se senadora pelo Distrito Federal, com mandato iniciado em 1º de fevereiro de 2019 e vigente ao longo das 56ª e 57ª legislaturas, com encerramento previsto para janeiro de 2027. Na chapa pela qual foi eleita, figurou como titular, tendo Leany Lemos e Ivonete Nascimento como suplentes.',
      'O histórico de filiações partidárias registrado na base de dados abertos do Senado mostra que Leila Barros iniciou o mandato pelo PSB, partido ao qual esteve filiada de dezembro de 2018 a agosto de 2021. Depois de um breve período sem partido, filiou-se ao Cidadania em agosto de 2021 e permaneceu na legenda até março de 2022, quando se transferiu para o PDT, partido pelo qual exerce o mandato atualmente.',
      'No Senado, Leila Barros ocupou cargos de direção em comissões temáticas. Presidiu a Comissão de Esporte a partir de fevereiro de 2025 e a Comissão de Meio Ambiente entre 2023 e 2025, da qual passou a ser vice-presidente. Foi vice-presidente da Comissão de Educação e Cultura, entre 2021 e 2023, e presidente da Subcomissão Permanente sobre Esporte, Educação Física e Formação de Categorias de Base, de 2019 a 2023. Entre 2021 e 2023, atuou como procuradora da Procuradoria Especial da Mulher do Senado. Preside ainda, desde março de 2026, a comissão mista criada para examinar a Medida Provisória nº 1326, de 2025, e, desde maio de 2025, a subcomissão temporária de acompanhamento dos preparativos para a realização da COP-30, conforme os registros oficiais da Casa.',
      'Como membro titular, integra atualmente a Comissão de Assuntos Econômicos, a Comissão de Meio Ambiente e a Comissão de Esporte, além de atuar como suplente na Comissão de Constituição, Justiça e Cidadania e na Comissão de Assuntos Sociais. Em frentes parlamentares, é coordenadora no Senado da Frente Parlamentar em Defesa das Políticas Públicas de Juventude desde abril de 2024 e foi vice-presidente pelo Senado da Frente Parlamentar de Recursos Naturais e Energia entre 2024 e 2025. Em cargos de liderança, exerceu a liderança da Bancada Feminina no Senado entre maio de 2024 e julho de 2025 e, desde março de 2025, atua como vice-líder do governo no Senado, conforme os registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial no Senado', href: 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/5979' },
      { label: 'Dados abertos do Senado', href: 'https://legis.senado.leg.br/dadosabertos/senador/5979' },
    ],
  },
  {
    fonte: 'senado',
    idOrigem: '5783',
    nome: 'Zenaide Maia',
    atualizadoEm: '2026-08-14',
    texto: [
      'Zenaide Maia Calado Pereira dos Santos nasceu em 27 de novembro de 1954, em Brejo do Cruz, na Paraíba. Formou-se em Medicina pela Universidade Federal do Rio Grande do Norte, em Natal, e o registro oficial do Senado lista a medicina como sua profissão. Antes do mandato de senadora, exerceu mandato de deputada federal pelo Rio Grande do Norte, entre 2015 e 2019. Em 2018, elegeu-se senadora pelo estado, com mandato iniciado em 1º de fevereiro de 2019 e vigente nas 56ª e 57ª legislaturas, com término previsto para janeiro de 2027; na chapa, figurou como titular, com Júnior Souto e Pastor Manoel Roberto como suplentes.',
      'O registro de filiações partidárias do Senado indica passagem pelo Partido Liberal, entre fevereiro de 2015 e abril de 2018, período em que atuou como deputada federal; pelo PHS, de abril de 2018 a janeiro de 2019; e pelo PROS, de fevereiro de 2019 a dezembro de 2022, legenda pela qual iniciou o mandato no Senado. Desde dezembro de 2022, está filiada ao PSD, partido pelo qual exerce o mandato atualmente.',
      'Em comissões, Zenaide Maia presidiu a Comissão Permanente Mista de Combate à Violência contra a Mulher, entre 2019 e 2020, e foi vice-presidente da Comissão de Desenvolvimento Regional e Turismo, entre 2019 e 2021, e da Comissão de Assuntos Sociais, entre 2021 e 2023. Entre 2023 e 2025, ocupou a vice-presidência da Comissão de Direitos Humanos e Legislação Participativa e, de 2023 a 2025, atuou como procuradora da Procuradoria Especial da Mulher. Foi vice-presidente da subcomissão temporária de acompanhamento da educação na pandemia, a partir de 2021, e da Subcomissão Permanente da Alfabetização na Idade Certa, entre 2024 e 2025. Também foi relatora das comissões mistas das Medidas Provisórias nº 1165, de 2023, nº 1296, de 2025, e nº 1369, de 2026, conforme os registros oficiais.',
      'Atualmente, integra como titular a Comissão de Assuntos Sociais e a Comissão de Educação e Cultura, além de compor o Conselho de Ética e Decoro Parlamentar desde 2023; é suplente na Comissão de Constituição, Justiça e Cidadania e na Comissão de Desenvolvimento Regional e Turismo. Em frentes parlamentares, é vice-coordenadora no Senado da Frente Parlamentar Mista Antirracismo desde abril de 2023. Em lideranças, atua como vice-líder do governo no Senado desde março de 2023 e foi líder do PSD na Comissão Mista de Orçamento entre maio de 2024 e março de 2025, segundo os registros da Casa. Compõe ainda conselhos de premiações do Senado, como o Conselho do Diploma Bertha Lutz, desde 2026, e o Conselho da Comenda Senador Abdias Nascimento, desde 2025.',
    ],
    fontes: [
      { label: 'Perfil oficial no Senado', href: 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/5783' },
      { label: 'Dados abertos do Senado', href: 'https://legis.senado.leg.br/dadosabertos/senador/5783' },
    ],
  },
  {
    fonte: 'senado',
    idOrigem: '5525',
    nome: 'Omar Aziz',
    atualizadoEm: '2026-08-14',
    texto: [
      'Omar José Abdel Aziz nasceu em 13 de agosto de 1958, em Garça, no interior de São Paulo, e construiu a carreira política no Amazonas. Formou-se em Engenharia Civil pela Universidade Federal do Amazonas, e o registro oficial do Senado lista como profissões as de engenheiro e de político. Antes de eleger-se senador, em 2014, exerceu o governo do Amazonas no início da década de 2010. No Senado, cumpriu mandato nas 55ª e 56ª legislaturas, entre 2015 e 2023, e foi reeleito para as 57ª e 58ª legislaturas, com mandato em curso até janeiro de 2031. Na chapa mais recente, figurou como titular, com Cheila Moreira e João Pedro como suplentes; na chapa pela qual foi eleito em 2014, também figurou como titular, com Dr. Helder Cavalcante e Luis Mitoso como suplentes.',
      'Omar Aziz está filiado ao PSD desde fevereiro de 2015, único partido registrado em seu histórico de filiações no Senado. Ao longo do mandato, exerceu a presidência de comissões relevantes: da Comissão de Assuntos Econômicos, entre 2019 e 2021; da Comissão de Segurança Pública, em dois períodos entre 2021 e 2023; da Comissão de Transparência, Governança, Fiscalização e Controle e Defesa do Consumidor, entre 2023 e 2025; e da Frente Parlamentar Observatório da Pandemia de Covid-19, entre 2021 e 2023.',
      'Em abril de 2021, foi eleito presidente da Comissão Parlamentar de Inquérito da Pandemia, instalada no Senado para investigar ações e omissões do poder público no enfrentamento da covid-19, cargo que exerceu durante os trabalhos da CPI. Em dezembro de 2023, passou a presidir a CPI da Braskem, comissão instalada para apurar a atuação da empresa em Maceió, e segue no cargo, segundo os registros oficiais da Casa.',
      'Atualmente, integra como titular a Comissão de Constituição, Justiça e Cidadania, a Comissão de Transparência, Governança, Fiscalização e Controle e Defesa do Consumidor e o Conselho de Ética e Decoro Parlamentar, sendo suplente na Comissão de Assuntos Econômicos, na Comissão de Segurança Pública e em comissão temporária em funcionamento no Senado. Integrou a Frente Parlamentar dos Senadores dos Estados do Norte e do Nordeste entre 2019 e 2023 e, no mesmo período, integrou grupos parlamentares do Congresso Nacional, como o Grupo Parlamentar Brasil-Países Árabes e o Grupo Parlamentar Brasil-Marrocos; desde 2025, compõe o Conselho do Prêmio Trânsito Seguro do Senado. Desde outubro de 2024, exerce a liderança do PSD no Senado; anteriormente, foi vice-líder da legenda na Casa, entre 2023 e 2024, e vice-líder do governo no Congresso Nacional a partir de 2023.',
    ],
    fontes: [
      { label: 'Perfil oficial no Senado', href: 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/5525' },
      { label: 'Dados abertos do Senado', href: 'https://legis.senado.leg.br/dadosabertos/senador/5525' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '74467',
    nome: 'Damião Feliciano',
    atualizadoEm: '2026-08-14',
    texto: [
      'Damião Feliciano da Silva nasceu em 28 de abril de 1952, em Campina Grande, na Paraíba. Segundo a biografia oficial da Câmara dos Deputados, tem mestrado e profissões registradas de empresário, médico e comunicador. Está em exercício do sétimo mandato consecutivo como deputado federal pela Paraíba, iniciado em 1º de fevereiro de 2023, pela legenda União Brasil, na 57ª legislatura. O nome de urna registrado na Câmara é Dr. Damião.',
      'O histórico de mandatos registrado pela Câmara indica que Damião Feliciano exerce o cargo desde 1999. Foi eleito pelo PTB para o mandato 1999-2003 e pelo PMDB para o período 2003-2007, no qual assumiu como suplente de 1º de julho a 23 de novembro de 2004, conforme o registro oficial. Nos mandatos seguintes, o registro da Câmara aponta passagens por PP e PL, e pelo PDT, legenda pela qual foi eleito em 2011, 2015 e 2019, antes da migração para o União Brasil, registrada em 2022 e efetivada durante a legislatura 2019-2023.',
      'Na 57ª legislatura, Damião Feliciano integra como titular a Comissão de Turismo, desde fevereiro de 2026, e a Comissão de Educação, desde março de 2026. Anteriormente, foi titular da Comissão de Relações Exteriores e de Defesa Nacional, entre 2023 e 2025, e da Comissão de Educação, em 2023 e 2024. Integra ainda, como titular, comissão especial destinada a proferir parecer a proposta de emenda à Constituição em tramitação, desde setembro de 2025, e, como suplente, comissão especial de projeto de lei, desde maio de 2025. Foi titular da Bancada Negra da Câmara a partir de novembro de 2023 e coordenador-geral da bancada entre fevereiro de 2024 e dezembro de 2025, segundo o registro oficial de atividades parlamentares.',
      'Compõe também frentes parlamentares com registro na Câmara, entre elas a Frente Parlamentar Mista do Serviço Exterior Brasileiro, a Frente Parlamentar Mista de Telecomunicações e Soluções Digitais, a Frente Parlamentar em Defesa do Futebol Feminino, a Frente Parlamentar em Defesa do Estado Laico e da Liberdade Religiosa, a Frente Parlamentar Mista em Defesa da Pessoa com Epilepsia e a Frente Parlamentar Mista em Defesa das Universidades Públicas Estaduais e Municipais, além da Frente Parlamentar Mista pelo Fortalecimento das Entidades Fechadas de Previdência Complementar e da Frente Parlamentar Mista em Defesa dos Correios. Na atividade partidária, o registro da Câmara mostra que exerceu a vice-liderança do PDT em diversos períodos entre 2009 e 2022 e a vice-liderança do PMDB entre 2001 e 2004. Desde março de 2023, atua como vice-líder do governo na Câmara dos Deputados, conforme os registros oficiais.',
    ],
    fontes: [
      { label: 'Perfil oficial na Câmara', href: 'https://www.camara.leg.br/deputados/74467' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/74467' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '91228',
    nome: 'Waldemar Oliveira',
    atualizadoEm: '2026-08-14',
    texto: [
      'Waldemar de Andrada Ignácio de Oliveira nasceu em 29 de novembro de 1972, no Recife (PE). Segundo a biografia oficial da Câmara dos Deputados, tem formação superior e profissão registrada de advogado. Exerce o primeiro mandato de deputado federal por Pernambuco, iniciado em 1º de fevereiro de 2023, pela legenda Avante, na 57ª legislatura. O registro da Casa não indica mandatos legislativos anteriores; a biografia oficial lista a advocacia como profissão registrada.',
      'Na atividade partidária, o registro da Câmara indica que Waldemar Oliveira atua como vice-líder do governo desde março de 2023. Entre junho e agosto de 2024, exerceu a liderança do bloco formado por União Brasil, PP, federação PSDB-Cidadania, PDT, Avante, Solidariedade e PRD, e, desde abril de 2026, exerce a liderança do Avante na Câmara dos Deputados.',
      'Em comissões, presidiu a Comissão de Administração e Serviço Público entre março de 2024 e março de 2025. Foi titular da Comissão de Constituição e Justiça e de Cidadania em diversos períodos desde 2023, integrando-a novamente como titular a partir de fevereiro de 2026; atualmente, é também suplente da Comissão de Administração e Serviço Público. Em 2024, integrou como titular a comissão especial destinada a estudar a atualização da legislação sobre direito digital e, em 2023, a comissão especial da proposta de emenda à Constituição sobre perda de nacionalidade. Foi suplente da Comissão de Finanças e Tributação, em 2023, e da Comissão de Relações Exteriores e de Defesa Nacional, entre 2024 e 2025.',
      'Participa, como suplente, de comissões especiais em funcionamento, entre elas as destinadas a proferir parecer à proposta de emenda à Constituição que trata dos agentes de saúde e de combate às endemias e ao projeto de lei do sistema portuário brasileiro. Compõe ainda frentes parlamentares com registro na Câmara, como a Frente Parlamentar Mista em Defesa da Cannabis Medicinal e do Cânhamo Industrial, a Frente Parlamentar Mista em Defesa da Pessoa com Epilepsia, a Frente Parlamentar ESG na prática do Congresso Nacional, a Frente Parlamentar Mista do Serviço Exterior Brasileiro, a Frente Parlamentar Mista de Telecomunicações e Soluções Digitais, a Frente Parlamentar Mista em Defesa das Organizações da Sociedade Civil e a Frente Parlamentar Mista Brasil-ASEAN, a Frente Parlamentar Mista em Defesa da União Nacional dos Legisladores e Legislativos Estaduais, a Frente Parlamentar Mista pela Valorização do Serviço Social, a Frente Parlamentar Mista da Hotelaria Brasileira e a Frente Parlamentar Mista do Desenvolvimento Tecnológico e Cultural do Brasil e Coreia do Sul, conforme os registros oficiais de atividades da Câmara.',
    ],
    fontes: [
      { label: 'Perfil oficial na Câmara', href: 'https://www.camara.leg.br/deputados/91228' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/91228' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '122158',
    nome: 'Pedro Paulo',
    atualizadoEm: '2026-08-14',
    texto: [
      'Pedro Paulo Carvalho Teixeira nasceu em 29 de junho de 1972, no Rio de Janeiro (RJ). Segundo a biografia oficial da Câmara dos Deputados, tem mestrado e profissão registrada de economista. Exerce o quarto mandato consecutivo de deputado federal pelo Rio de Janeiro, iniciado em 1º de fevereiro de 2023, na 57ª legislatura, pela legenda PSD.',
      'O histórico de mandatos registrado pela Câmara indica que Pedro Paulo foi eleito deputado federal pelo PMDB para os períodos 2011-2015 e 2015-2019, pelo DEM para o período 2019-2023 e pelo PSD a partir de 2023. O registro oficial de licenças mostra que, na legislatura 2011-2015, licenciou-se do mandato em diversos momentos para assumir o cargo de secretário-chefe da Casa Civil do Rio de Janeiro, reassumindo em seguida, conforme os períodos registrados pela Casa.',
      'Na 57ª legislatura, Pedro Paulo integra como titular a Comissão de Segurança Pública e Combate ao Crime Organizado, desde fevereiro de 2026, e a Comissão de Finanças e Tributação, desde março de 2026; na mesma legislatura, foi titular da Comissão de Finanças e Tributação e da Comissão do Esporte em períodos anteriores, integrou a comissão especial do projeto de lei que altera a legislação do Imposto de Renda, entre 2025 e 2026, e coordenou grupo de trabalho sobre reforma administrativa em 2025. Foi ainda suplente da comissão parlamentar de inquérito sobre a empresa Americanas, em 2023, conforme o registro oficial. Nas legislaturas anteriores, foi titular de comissões especiais da reforma tributária e do teto remuneratório do funcionalismo público, entre 2017 e 2019, e da reforma da Previdência, em 2019.',
      'Nas legislaturas anteriores, foi 2º vice-presidente da Comissão de Finanças e Tributação, entre 2022 e 2023, e integrou comissões especiais de matérias econômicas em diferentes legislaturas. Na legislatura 2015-2019, compôs comissões externas sobre a crise fiscal do estado do Rio de Janeiro, a prevenção de desastres no estado e a intervenção na segurança pública fluminense. Compõe também frentes parlamentares com registro na Câmara, entre elas a Frente Parlamentar Mista do Ambiente de Negócios, a Frente Parlamentar para o Fortalecimento da Indústria Ferroviária Brasileira, a Frente Parlamentar Mista em Defesa da Cannabis Medicinal e do Cânhamo Industrial e a Frente Parlamentar da Baixada Fluminense do Rio de Janeiro. O registro de atividade partidária da Câmara para a legislatura atual não indica cargos de liderança partidária exercidos por Pedro Paulo até o momento; sua atuação registrada concentra-se nas comissões temáticas e nas frentes parlamentares das quais é integrante, conforme os dados oficiais do portal.',
    ],
    fontes: [
      { label: 'Perfil oficial na Câmara', href: 'https://www.camara.leg.br/deputados/122158' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/122158' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '178887',
    nome: 'Rubens Pereira Júnior',
    atualizadoEm: '2026-08-14',
    texto: [
      'Rubens Pereira e Silva Junior nasceu em 16 de março de 1984, em São Luís, no Maranhão. Segundo a biografia oficial da Câmara dos Deputados, tem formação superior e profissão registrada de advogado. Exerce o terceiro mandato consecutivo de deputado federal pelo Maranhão, iniciado em 1º de fevereiro de 2023, na 57ª legislatura, pela legenda PT.',
      'O histórico de mandatos registrado pela Câmara indica que Rubens Pereira Júnior foi eleito pelo PCdoB para os períodos 2015-2019 e 2019-2023, migrando para o PT, com filiação registrada em 2022. Na legislatura 2019-2023, o registro oficial de licenças mostra que se licenciou do mandato em diferentes momentos para assumir cargos no governo do Maranhão: secretário de Estado das Cidades e Desenvolvimento Urbano, entre 2019 e 2020; secretário de Estado da Comunicação Social e Assuntos Políticos, em janeiro de 2021; e secretário de Estado de Articulação Política, entre fevereiro e agosto de 2021, reassumindo o mandato ao final de cada período.',
      'Na atividade partidária, o registro da Câmara indica que foi vice-líder do PCdoB em diversos períodos entre 2016 e 2019, vice-líder da Federação Brasil da Esperança em 2023 e vice-líder do PT em dezembro de 2022. Desde março de 2023, atua como vice-líder do governo na Câmara dos Deputados. Em comissões, é titular da Comissão de Constituição e Justiça e de Cidadania em diversos períodos desde 2023, integrando-a novamente desde fevereiro de 2026, e foi titular da Comissão de Comunicação entre 2024 e 2025. Presidiu, entre 2025 e 2026, a comissão especial do projeto de lei que altera a legislação do Imposto de Renda, da qual foi titular desde abril de 2025.',
      'Na 57ª legislatura, integrou comissão externa criada para acompanhar a grave situação do Maranhão em decorrência das fortes chuvas, desde 2023, e a comissão especial sobre direito digital, desde 2023. Em legislaturas anteriores, foi relator de grupo de trabalho sobre a minirreforma eleitoral, em 2023, coordenador de grupo de trabalho de estudo do Regimento Interno da Câmara, entre 2021 e 2023, e relator-parcial do projeto de reforma do Código de Processo Penal, entre 2016 e 2019. Foi suplente da Comissão de Fiscalização Financeira e Controle em 2023 e 2024 e da Comissão de Finanças e Tributação em 2024 e 2026, e integrou como suplente a comissão parlamentar de inquérito sobre a empresa Americanas, em 2023. Compõe ainda frentes parlamentares com registro na Câmara, como as de defesa dos Correios, da economia informal e da polícia penal.',
    ],
    fontes: [
      { label: 'Perfil oficial na Câmara', href: 'https://www.camara.leg.br/deputados/178887' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/178887' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '198783',
    nome: 'Emanuel Pinheiro Neto',
    atualizadoEm: '2026-08-14',
    texto: [
      'Emanuel Pinheiro da Silva Primo, conhecido como Emanuel Pinheiro Neto, nasceu em 5 de janeiro de 1995, em Cuiabá (MT). Segundo a biografia oficial da Câmara dos Deputados, tem formação superior e profissão registrada de empresário. É filho do prefeito de Cuiabá, Emanuel Pinheiro. O nome de urna registrado na Câmara é Emanuelzinho. Exerce o segundo mandato consecutivo de deputado federal por Mato Grosso, iniciado em 1º de fevereiro de 2023, na 57ª legislatura.',
      'O histórico de mandatos registrado pela Câmara indica que Emanuel Pinheiro Neto foi eleito deputado federal pelo PTB para o período 2019-2023 e pelo MDB para o período 2023-2027; o registro de filiações indica que migrou do PTB para o MDB em 2022, ainda na legislatura anterior. Segundo os registros de filiação partidária da Câmara, filiou-se ao PSD em 2026, legenda pela qual exerce o mandato atualmente.',
      'Na atividade partidária, o registro da Câmara mostra que foi vice-líder do MDB em 2022 e vice-líder de blocos parlamentares em diversos períodos entre 2019 e 2022. Desde março de 2023, atua como vice-líder do governo na Câmara dos Deputados, conforme os registros oficiais.',
      'Em comissões, integra como titular a Comissão de Finanças e Tributação em diversos períodos desde 2023, exercendo o cargo novamente desde abril de 2026; foi titular da Comissão de Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural, entre 2024 e 2025, e 2º vice-presidente da comissão especial do projeto de lei que altera a legislação do Imposto de Renda, entre 2025 e 2026. Em 2023, integrou comissão externa destinada a acompanhar, in loco, a intervenção na saúde pública do município de Cuiabá e comissão externa sobre a delimitação da Terra Indígena Kapôt Nhinore. Na legislatura 2019-2023, presidiu a Comissão de Segurança Pública e Combate ao Crime Organizado, entre 2021 e 2022, foi 1º vice-presidente da Comissão de Defesa dos Direitos da Mulher e integrou comissão externa sobre violência doméstica contra a mulher e feminicídio. Na mesma legislatura, foi 3º vice-presidente da Comissão de Desenvolvimento Econômico, entre 2019 e 2021, suplente do Conselho de Ética e Decoro Parlamentar em dois períodos e suplente da comissão parlamentar de inquérito sobre práticas ilícitas no âmbito do BNDES, em 2019. Compõe ainda frentes parlamentares com registro na Câmara, como a Frente Parlamentar Mista da Saúde, a Frente Parlamentar em Defesa do Esporte, a Frente Parlamentar da Juventude, a Frente Parlamentar Mista em Defesa da Enfermagem, a Frente Parlamentar Mista em Defesa dos Direitos dos Povos Indígenas e a Frente Parlamentar da Agropecuária.',
    ],
    fontes: [
      { label: 'Perfil oficial na Câmara', href: 'https://www.camara.leg.br/deputados/198783' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/198783' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '220556',
    nome: 'Ana Paula Lima',
    atualizadoEm: '2026-08-14',
    texto: [
      'Ana Paula de Souza Lima nasceu em 19 de abril de 1964, em Curitiba (PR). Segundo a biografia oficial da Câmara dos Deputados, tem formação superior e profissão registrada de enfermeira. Exerce o primeiro mandato de deputada federal por Santa Catarina, iniciado em 1º de fevereiro de 2023, na 57ª legislatura, pela legenda PT.',
      'Na estrutura da Câmara, o registro oficial de atividades indica que Ana Paula Lima integra a Secretaria da Mulher como titular desde maio de 2023 e foi secretária da Juventude na Secretaria da Primeira Infância, Adolescência e Juventude entre março de 2023 e abril de 2025. Na atividade partidária, atua como vice-líder do governo na Câmara desde março de 2023.',
      'Em comissões, sua atuação concentra-se em temas de saúde, mulher e infância. É titular da Comissão de Saúde em diversos períodos desde 2023, integrando-a novamente como titular a partir de fevereiro de 2026, e é suplente da Comissão de Previdência, Assistência Social, Infância, Adolescência e Família e da Comissão de Constituição e Justiça e de Cidadania. Exerce a segunda vice-presidência da comissão especial destinada a estudar as razões do aumento de denúncias de violência obstétrica e morte materna desde abril de 2023, e integra comissões especiais sobre prevenção e auxílio a desastres e calamidades naturais e sobre o projeto de lei do sistema portuário, além de comissão externa sobre o enfrentamento da tuberculose. Em 2023, foi titular da Comissão de Defesa dos Direitos das Pessoas com Deficiência e integrou comissão especial sobre a perda de nacionalidade. No mesmo período, foi suplente da Comissão de Viação e Transportes, da Comissão de Fiscalização Financeira e Controle e da Comissão de Finanças e Tributação; em 2025, foi suplente da Comissão de Turismo e da comissão especial do projeto de lei sobre inteligência artificial e, em 2024, integrou como titular a comissão especial da proposta de emenda à Constituição sobre emendas orçamentárias para emergências naturais, conforme os registros oficiais.',
      'Integra ainda frentes parlamentares com registro na Câmara, entre elas a Frente Parlamentar em Defesa da Enfermagem, a Frente Parlamentar Mista em Defesa da Saúde das Mulheres, a Frente Parlamentar Mista em Defesa da Mulher Vítima de Violência Doméstica, a Frente Parlamentar Mista do Sistema Único de Saúde, a Frente Parlamentar Mista em Defesa dos Agentes Comunitários de Saúde e de Combate às Endemias e a Frente Parlamentar de Luta contra a Tuberculose, entre outras ligadas à saúde pública, à infância e à juventude.',
    ],
    fontes: [
      { label: 'Perfil oficial na Câmara', href: 'https://www.camara.leg.br/deputados/220556' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/220556' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '220615',
    nome: 'Pastor Henrique Vieira',
    atualizadoEm: '2026-08-14',
    texto: [
      'Henrique dos Santos Vieira Lima, conhecido como Pastor Henrique Vieira, nasceu em 15 de abril de 1987, em Niterói (RJ). Segundo a biografia oficial da Câmara dos Deputados, tem mestrado incompleto e profissões registradas de pastor, ator, professor e escritor. Exerce o primeiro mandato de deputado federal pelo Rio de Janeiro, iniciado em 1º de fevereiro de 2023, na 57ª legislatura, pelo PSOL, partido integrante da federação PSOL-Rede. Tomou posse na sessão preparatória da 57ª legislatura, conforme o registro da Casa.',
      'Na atividade partidária, o registro da Câmara indica que Henrique Vieira atua como vice-líder do governo desde março de 2023 e foi vice-líder da Federação PSOL-Rede em diversos períodos entre 2023 e 2026. Integra a Bancada Negra da Câmara dos Deputados como titular desde novembro de 2023.',
      'Em comissões, é titular da Comissão de Direitos Humanos, Minorias e Igualdade Racial, da Comissão de Cultura e da Comissão de Segurança Pública e Combate ao Crime Organizado, todas a partir de fevereiro de 2026, e integra a subcomissão especial de fiscalização e direitos dos presos do 8 de janeiro, desde março de 2026. Integra ainda, como titular ou suplente, comissões especiais destinadas a proferir parecer a propostas de emenda à Constituição em tramitação na Casa. Anteriormente, foi suplente da Comissão de Direitos Humanos, Minorias e Igualdade Racial, entre 2023 e 2024, da Comissão de Cultura, entre 2024 e 2026, e da Comissão de Legislação Participativa, em 2023, conforme os registros oficiais de atividades.',
      'Integra também frentes parlamentares com registro na Câmara, entre elas a Frente Parlamentar em Defesa da Reforma Psiquiátrica e da Luta Antimanicomial, a Frente Parlamentar Mista por Cidadania e Direitos LGBTI+, a Frente Parlamentar Mista em Defesa dos Direitos da População em Situação de Rua, a Frente Parlamentar Mista pela Reestatização da Eletrobras, a Frente Parlamentar em Defesa das Favelas e Respeito à Cidadania dos seus Moradores, a Frente Parlamentar Mista em Defesa do Movimento Hip Hop, a Frente Parlamentar em Defesa do Samba e Valorização do Carnaval Brasileiro e a Frente Parlamentar Mista em Defesa da Escola Pública, a Frente Parlamentar Mista em Apoio aos Objetivos de Desenvolvimento Sustentável da ONU, a Frente Parlamentar Mista em Defesa da Amazônia, a Frente Parlamentar de Prevenção de Desastres e Apoio Humanitário, a Frente Parlamentar Mista em Defesa da Saúde das Mulheres e a Frente Parlamentar Mista em Defesa dos Cuidados Paliativos, a Frente Parlamentar Mista em Defesa do Patrimônio Histórico e Cultural Brasileiro e a Frente Parlamentar Mista de Enfrentamento às IST, HIV/Aids e Hepatites Virais, entre outras.',
    ],
    fontes: [
      { label: 'Perfil oficial na Câmara', href: 'https://www.camara.leg.br/deputados/220615' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/220615' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '220668',
    nome: 'Maria Arraes',
    atualizadoEm: '2026-08-14',
    texto: [
      'Maria Leal Arraes de Alencar, conhecida como Maria Arraes, nasceu em 24 de fevereiro de 1994, no Recife (PE). Segundo a biografia oficial da Câmara dos Deputados, tem pós-graduação e profissão registrada de advogada. Exerce o primeiro mandato de deputada federal por Pernambuco, iniciado em 1º de fevereiro de 2023, na 57ª legislatura; foi eleita pelo Solidariedade e, segundo o registro de filiações da Câmara, filiou-se ao PSB em 2026, legenda pela qual exerce o mandato atualmente.',
      'O registro oficial de licenças da Câmara indica que Maria Arraes se licenciou do mandato por licença-maternidade, pelo prazo de 120 dias, a partir de 7 de novembro de 2024. Na atividade partidária, atua como vice-líder do governo na Câmara desde março de 2023, e integra a Secretaria da Mulher como titular desde maio de 2023, conforme os registros oficiais.',
      'Em comissões, foi titular da Comissão de Constituição e Justiça e de Cidadania em diversos períodos entre 2023 e 2026, e titular da Comissão de Defesa dos Direitos da Mulher entre 2024 e 2026, sendo atualmente suplente em ambas. Integra como titular a comissão especial sobre transição energética e produção de hidrogênio verde, desde 2023, e a comissão especial destinada a estudar formas de prevenção e auxílio a desastres naturais, também desde 2023. Em 2026, integrou grupo de trabalho sobre crimes praticados em razão de misoginia, entre maio e julho daquele ano. Foi suplente da Comissão de Educação, em 2023, e da Comissão de Indústria, Comércio e Serviços, em 2024. Na comissão especial de prevenção e auxílio a desastres e calamidades naturais, o registro da Câmara indica titularidade em 2023, renovada nos períodos seguintes, posição que a deputada mantém atualmente, conforme os registros oficiais.',
      'Integra ainda frentes parlamentares com registro na Câmara, entre elas a Frente Parlamentar Mista em Defesa da Saúde das Mulheres, a Frente Parlamentar Mista em Defesa da Mulher Vítima de Violência Doméstica, a Frente Parlamentar para o Fortalecimento da Mulher, a Frente Parlamentar Mista da Primeira Infância, a Frente Parlamentar para o Fortalecimento do Nordeste, a Frente Parlamentar Mista em Prol do Semiárido e a Frente Parlamentar em Defesa da Duplicação da BR-423 em Pernambuco, a Frente Parlamentar Mista em Defesa da Carnaúba, a Frente Parlamentar Mista Brasil-África com participação popular de enfrentamento ao racismo, a Frente Parlamentar do Cooperativismo, a Frente Parlamentar Mista da Agricultura Familiar, a Frente Parlamentar Mista em Defesa do Turismo, a Frente Parlamentar Mista da Saúde Digital, a Frente Parlamentar da Juventude, a Frente Parlamentar Mista em Defesa do Saneamento Básico e a Frente Parlamentar Mista de Portos e Aeroportos, entre outras.',
    ],
    fontes: [
      { label: 'Perfil oficial na Câmara', href: 'https://www.camara.leg.br/deputados/220668' },
      { label: 'Dados abertos da Câmara', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/220668' },
    ],
  },
  {
    fonte: 'senado',
    idOrigem: '3777',
    nome: 'Eduardo Gomes',
    atualizadoEm: '2026-08-14',
    texto: [
      'Carlos Eduardo Torres Gomes, conhecido como Eduardo Gomes, nasceu em 28 de abril de 1966, em Estância, em Sergipe. O registro oficial do Senado indica que cursou Engenharia Agrícola pela ULBRA, em Palmas, com formação superior incompleta. Antes do mandato de senador, exerceu mandatos de deputado federal pelo Tocantins. Eleito em 2018, cumpre mandato de senador pelo estado desde fevereiro de 2019, nas 56ª e 57ª legislaturas, com término previsto para janeiro de 2027; na chapa, figurou como titular, com Siqueira Campos e Ogari Pacheco como suplentes.',
      'O registro de filiações partidárias do Senado indica passagem pelo PSDB, entre 2003 e 2013; pelo Solidariedade, entre 2013 e 2019; e pelo MDB, entre janeiro de 2019 e março de 2022, legenda pela qual iniciou o mandato de senador. Desde abril de 2022, está filiado ao PL, partido pelo qual exerce o mandato atualmente. O registro de exercícios do mandato no Senado indica que, em parte da legislatura, houve períodos de licença com convocação de suplentes, entre 2019 e 2022, com retomada do exercício em novembro de 2022.',
      'Em cargos de direção, Eduardo Gomes foi 1º secretário da Mesa Diretora do Congresso Nacional, entre 2011 e 2013, período em que ainda era deputado federal, e 2º secretário da mesma Mesa, entre 2019 e 2021; na mesma legislatura, foi 2º secretário da Comissão Diretora do Senado Federal. Presidiu a Comissão de Comunicação e Direito Digital entre 2023 e 2025 e a Subcomissão Permanente de Proteção e Defesa da Pessoa Idosa, entre 2019 e 2023. Desde fevereiro de 2025, é 1º vice-presidente da Comissão Diretora do Senado. Presidiu ainda comissões mistas de medidas provisórias em diferentes momentos, entre elas as das Medidas Provisórias nº 869, de 2018, e nº 1172, de 2023, e, em 2007, a comissão mista especial sobre mudanças climáticas, conforme os registros oficiais da Casa.',
      'Em lideranças, foi líder do PL na Comissão Mista de Orçamento entre abril de 2023 e março de 2024 e vice-líder da Oposição no Senado entre 2023 e 2025, atuando também como vice-líder da Minoria no Congresso Nacional desde 2023. Atualmente, integra como titular a Comissão de Desenvolvimento Regional e Turismo e a Comissão de Comunicação e Direito Digital, sendo suplente na Comissão de Assuntos Econômicos, na Comissão de Constituição, Justiça e Cidadania, na Comissão de Meio Ambiente e na Comissão de Esporte. Em 2023, foi relator de comissão temporária sobre inteligência artificial e, desde agosto de 2026, é relator de comissão mista de medida provisória, segundo os registros oficiais.',
    ],
    fontes: [
      { label: 'Perfil oficial no Senado', href: 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/3777' },
      { label: 'Dados abertos do Senado', href: 'https://legis.senado.leg.br/dadosabertos/senador/3777' },
    ],
  },
];
