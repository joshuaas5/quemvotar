export interface PerfilEditorial {
  fonte: 'camara' | 'senado';
  idOrigem: string;
  nome: string;
  atualizadoEm: string; // 2026-08-14
  texto: string[];
  fontes: { label: string; href: string }[];
}

export const PERFIS_EDITORIAL_1: PerfilEditorial[] = [
  {
    fonte: 'camara',
    idOrigem: '235800',
    nome: 'Jorge Araújo',
    atualizadoEm: '2026-08-14',
    texto: [
      'O cadastro oficial da Câmara dos Deputados identifica o deputado Jorge Araújo, nome civil Jorge Silva de Araújo, como natural de Guarulhos, no estado de São Paulo, onde nasceu em 25 de julho de 1978. No cadastro mantido pela Casa, os campos de escolaridade e de profissão permanecem sem informações preenchidas para este parlamentar, conforme o registro oficial consultado. O cadastro registra ainda o sexo masculino e o estado de nascimento de São Paulo, município de Guarulhos.',
      'De acordo com a base de dados abertos da Câmara, o registro mais recente do deputado, com data de 8 de abril de 2026, indica filiação ao PP, exercício do mandato pelo estado da Bahia e situação de exercício na condição de suplente, campos que constam do cadastro oficial da Casa. O mandato ocorre na 57ª legislatura, que teve início em 1º de fevereiro de 2023 e se estende até 31 de janeiro de 2027, o que significa que o parlamentar passou a exercer o mandato na reta final dessa legislatura.',
      'Os registros oficiais de participação em órgãos da Casa mostram que, a partir do início do exercício do mandato, o deputado passou a integrar a Bancada Negra da Câmara dos Deputados e três comissões permanentes: a Comissão de Ciência, Tecnologia e Inovação, a Comissão de Defesa dos Direitos da Pessoa Idosa e a Comissão de Comunicação. As datas de ingresso nesses colegiados, registradas em 8 de abril, 29 de abril e 12 de maio de 2026, coincidem com o período em que o mandato teve início.',
      'A consulta ao histórico de participação em órgãos da Câmara, que na base oficial cobre o período desde 2015, não localiza ocorrências anteriores a 2026 para este parlamentar, o que indica, segundo o registro oficial, tratar-se do primeiro mandato dele na Casa. A base não traz outros registros sobre a trajetória anterior do deputado, como cargos públicos, atividades profissionais ou passagens por outras casas legislativas, nem informações de escolaridade ou de profissão no cadastro. O campo de profissão, que integra a base oficial, também não apresenta ocorrências registradas para este parlamentar.',
      'O registro de gabinete da Câmara lista, para este parlamentar, a sala 320, no terceiro andar do Anexo 4, com telefone (61) 3215-5320 e e-mail institucional dep.jorgearaujo@camara.leg.br. Este perfil foi elaborado exclusivamente a partir das informações disponíveis no registro oficial, atualizado em agosto de 2026, e será revisado quando novos dados forem publicados pela Câmara dos Deputados em sua plataforma de dados abertos.'
    ],
    fontes: [
      { label: 'Perfil oficial — Câmara dos Deputados', href: 'https://www.camara.leg.br/deputados/235800' },
      { label: 'Dados Abertos — Câmara dos Deputados', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/235800' },
    ],
  },
  {
    fonte: 'senado',
    idOrigem: '3806',
    nome: 'Zequinha Marinho',
    atualizadoEm: '2026-08-14',
    texto: [
      'Zequinha Marinho, nome completo José da Cruz Marinho, é senador pelo Pará. Segundo o registro oficial do Senado Federal, ele nasceu em 18 de setembro de 1959 na cidade de Araguacema, no Tocantins, e exerce o mandato atual como titular, iniciado em fevereiro de 2019, abrangendo a 56ª e a 57ª legislaturas, com previsão de encerramento em janeiro de 2027. O registro de gabinete indica o Anexo 2, Ala Teotônio Vilela, gabinete 18, com telefone (61) 3303-6623.',
      'A trajetória partidária registrada na base oficial mostra filiação ao PSC desde setembro de 2003, passagem pelo PL entre março de 2022 e maio de 2023 e, desde 31 de maio de 2023, filiação ao Podemos, legenda pela qual exerce o mandato atual. O registro de lideranças indica que ele foi líder do PSC no Senado entre 2019 e 2022, vice-líder da Minoria no Congresso Nacional entre 2023 e 2024, líder do Podemos na Comissão Mista de Orçamento em março de 2025 e vice-líder do Podemos no Senado entre outubro de 2025 e abril de 2026.',
      'Ao longo do mandato, o registro oficial de cargos em comissões lista funções como relator da receita na Comissão Mista de Planos, Orçamentos Públicos e Fiscalização, entre 2019 e 2020; coordenador do Comitê de Avaliação da Receita, entre 2019 e 2020; presidente da Comissão Mista Permanente sobre Mudanças Climáticas, entre 2019 e 2020; presidente da Subcomissão Temporária da Usina de Belo Monte, em 2019; presidente da Frente Parlamentar em Defesa da Amazônia Legal, entre 2020 e 2023; e suplente na Comissão Diretora do Senado, entre 2021 e 2023.',
      'Desde fevereiro de 2025, o senador preside a Comissão de Agricultura e Reforma Agrária (CRA), cargo que acumula com a presidência da Frente Parlamentar Mista em Defesa dos Mototaxistas e Motofretistas, desde 2023, da Frente Parlamentar Mista das Ferrovias Autorizadas, desde agosto de 2025, e da frente parlamentar em defesa da exploração de petróleo, desde julho de 2025, além da tesouraria da Frente Parlamentar Evangélica. Em junho de 2026, assumiu a relatoria da comissão mista da Medida Provisória nº 1341, de 2026.',
      'O registro atual de comissões lista ainda grupos parlamentares de relacionamento com China, República da Coreia, Marrocos, Israel, Japão e a Organização do Tratado de Cooperação Amazônica, além de frentes parlamentares dedicadas a temas como eletromobilidade, antirracismo, investimentos estrangeiros e defesa da família. Este perfil foi elaborado exclusivamente com base nos dados abertos do Senado Federal, atualizados em agosto de 2026, e reflete o conteúdo dos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Senado Federal', href: 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/3806' },
      { label: 'Dados Abertos — Senado Federal', href: 'https://legis.senado.leg.br/dadosabertos/senador/3806' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '204536',
    nome: 'Kim Kataguiri',
    atualizadoEm: '2026-08-14',
    texto: [
      'O cadastro oficial da Câmara dos Deputados identifica o deputado Kim Kataguiri, nome civil Kim Patroca Kataguiri, como natural de Salto, no interior de São Paulo, onde nasceu em 28 de janeiro de 1996. O registro da Casa indica escolaridade superior incompleta e profissão de escritor. O parlamentar exerce o mandato como titular pelo estado de São Paulo, com a sigla partidária Missão registrada no cadastro atual, e o registro de gabinete lista o gabinete 744, no Anexo 4, com telefone (61) 3215-5744.',
      'Os registros oficiais de participação em órgãos da Câmara mostram atuação em comissões desde março de 2019, o que indica que o mandato atual, iniciado em fevereiro de 2023 na 57ª legislatura, é o segundo do parlamentar na Casa. Na 56ª legislatura, entre 2019 e 2023, ele integrou colegiados como a Comissão de Constituição e Justiça e de Cidadania, a Comissão de Finanças e Tributação e a Comissão de Trabalho, de Administração e Serviço Público.',
      'Na 57ª legislatura, o registro oficial lista passagens pela Comissão de Constituição e Justiça e de Cidadania, pela Comissão de Fiscalização Financeira e Controle, pela Comissão de Segurança Pública e Combate ao Crime Organizado e pela Comissão de Finanças e Tributação. O deputado integrou ainda comissão especial destinada ao estudo e à atualização da legislação, com participação registrada entre 2023 e 2026, comissão parlamentar de inquérito instalada em maio de 2023, com atuação até setembro daquele ano, e comissão externa criada em agosto de 2024 para acompanhar um desastre ambiental, com vigência registrada até agosto de 2025.',
      'Entre 2024 e 2025, o parlamentar integrou a Comissão de Educação, e entre 2025 e 2026 manteve participação na Comissão de Finanças e Tributação, na Comissão de Fiscalização Financeira e Controle e na Comissão de Segurança Pública e Combate ao Crime Organizado. Os registros de 2026 indicam atuação na Comissão de Finanças e Tributação e na Comissão de Segurança Pública e Combate ao Crime Organizado, com ingresso registrado em fevereiro de 2026. O histórico da legislatura registra ainda passagens breves pela Comissão de Desenvolvimento Econômico, em abril de 2024, e pela Comissão de Indústria, Comércio e Serviços, entre março e setembro de 2025, além de participação na Comissão de Educação com ingresso em maio de 2024.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos da Câmara dos Deputados, atualizados em agosto de 2026, e reflete apenas o que consta nos registros oficiais da Casa, incluindo datas de ingresso e desligamento de cada colegiado.',
    ],
    fontes: [
      { label: 'Perfil oficial — Câmara dos Deputados', href: 'https://www.camara.leg.br/deputados/204536' },
      { label: 'Dados Abertos — Câmara dos Deputados', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204536' },
    ],
  },
  {
    fonte: 'senado',
    idOrigem: '5936',
    nome: 'Carlos Portinho',
    atualizadoEm: '2026-08-14',
    texto: [
      'Carlos Portinho, nome completo Carlos Francisco Portinho, é senador pelo Rio de Janeiro. Segundo o registro oficial do Senado Federal, ele nasceu em 2 de julho de 1973 na cidade do Rio de Janeiro. O mandato atual, iniciado em fevereiro de 2019 e com previsão de encerramento em janeiro de 2027, abrange a 56ª e a 57ª legislaturas e está registrado na condição de primeiro suplente. O registro de gabinete indica o Anexo 2, Ala Teotônio Vilela, gabinete 19, com telefones (61) 3303-6640 e (61) 3303-6613.',
      'A base de dados oficial do Senado registra filiação ao PSD entre novembro e dezembro de 2020 e, desde 28 de dezembro de 2020, filiação ao PL, partido pelo qual exerce o mandato. O registro de lideranças da Casa indica que o senador foi líder do PL no Senado entre janeiro de 2021 e junho de 2022, líder do Governo no Senado entre junho de 2022 e janeiro de 2023 e novamente líder do PL entre fevereiro de 2023 e janeiro de 2025, função que voltou a exercer desde fevereiro de 2025.',
      'No que se refere a cargos em comissões, o registro oficial lista a relatoria de comissão temporária externa do Senado ligada ao setor de petróleo, exercida desde março de 2022, e a vice-presidência de transição energética na Frente Parlamentar de Recursos Naturais e Energia, desde março de 2023. O senador também exerce a segunda vice-presidência da Frente Parlamentar Mista em Defesa dos Mototaxistas e Motofretistas desde junho de 2023, foi vice-presidente da Comenda Nise Magalhães da Silveira entre 2025 e 2026 e é vice-presidente do Conselho do Diploma José Ermírio de Moraes desde abril de 2026. O cadastro oficial indica ainda o e-mail institucional sen.carlosportinho@senado.leg.br para contato com o gabinete.',
      'Entre as comissões permanentes, o registro atual indica que o senador passou a integrar, em maio de 2026, a Comissão de Constituição, Justiça e Cidadania (CCJ). A base oficial também lista participação em grupos parlamentares de relacionamento com os Estados Unidos e com a Arábia Saudita, ambos com registros a partir de 2023, e em frentes parlamentares dedicadas a temas como recursos naturais e energia, cibersegurança, pesquisa biomédica, economia do mar e ferrovias autorizadas, todas com vigência registrada entre 2023 e 2025. Constam ainda participações nas frentes parlamentares por um Brasil sem Jogos de Azar e mista antirracismo, ambas com registros a partir de abril de 2023.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos do Senado Federal, atualizados em agosto de 2026, e reflete apenas o conteúdo dos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Senado Federal', href: 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/5936' },
      { label: 'Dados Abertos — Senado Federal', href: 'https://legis.senado.leg.br/dadosabertos/senador/5936' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '220708',
    nome: 'Gabriel Nunes',
    atualizadoEm: '2026-08-14',
    texto: [
      'O cadastro oficial da Câmara dos Deputados identifica o deputado Gabriel Nunes, nome civil Gabriel Jose Moura Nunes Soares, como natural de Recife, em Pernambuco, onde nasceu em 23 de julho de 1983. O registro da Casa indica escolaridade de pós-graduação e profissões de advogado e empresário. O parlamentar exerce o mandato como titular pelo estado da Bahia, filiado ao PSD, na 57ª legislatura, iniciada em fevereiro de 2023, e o registro de gabinete lista o gabinete 732, no Anexo 4, com telefone (61) 3215-5732.',
      'A consulta ao histórico de participação em órgãos da Câmara, que na base oficial cobre o período desde 2015, não localiza ocorrências anteriores a 2023 para este parlamentar, o que indica, segundo o registro oficial, que o mandato atual é o primeiro dele na Casa. Desde o início da legislatura, o registro lista atuação na Comissão de Desenvolvimento Urbano, na Comissão de Minas e Energia e na Comissão de Viação e Transportes, colegiados que integrou em diferentes períodos entre 2023 e 2026.',
      'Entre 2023 e 2026, o deputado integrou ainda a Comissão de Turismo, a Comissão de Integração Nacional e Desenvolvimento Regional, a Comissão de Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural e a Comissão de Defesa dos Direitos das Pessoas com Deficiência. O registro oficial também registra passagens pela subcomissão especial dedicada à Itaipu Binacional, entre abril de 2024 e janeiro de 2025, por comissão parlamentar de inquérito instalada em maio de 2023, com atuação até setembro daquele ano, e por comissão externa criada em agosto de 2023, com vigência mantida segundo a base oficial.',
      'Em 2025, o parlamentar integrou comissão especial criada para examinar proposta de emenda à Constituição, entre abril e julho, e comissão especial destinada a examinar projeto de lei, com participação registrada a partir de julho de 2025 e mantida. No mesmo ano, consta sua passagem pela Comissão de Integração Nacional e Desenvolvimento Regional, entre junho de 2025 e janeiro de 2026, e pela Comissão de Turismo, com registros entre abril de 2024 e janeiro de 2025. Desde fevereiro de 2026, o registro indica sua participação nas comissões de Viação e Transportes, de Minas e Energia, de Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural e de Defesa dos Direitos das Pessoas com Deficiência, com datas de ingresso e desligamento constantes da base oficial.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos da Câmara dos Deputados, atualizados em agosto de 2026, e reflete apenas o que consta nos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Câmara dos Deputados', href: 'https://www.camara.leg.br/deputados/220708' },
      { label: 'Dados Abertos — Câmara dos Deputados', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/220708' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '204379',
    nome: 'Acácio Favacho',
    atualizadoEm: '2026-08-14',
    texto: [
      'O cadastro oficial da Câmara dos Deputados identifica o deputado Acácio Favacho, nome civil Acácio da Silva Favacho Neto, como natural de Macapá, capital do Amapá, onde nasceu em 28 de setembro de 1983. O registro da Casa indica escolaridade superior. O parlamentar exerce o mandato como titular pelo estado do Amapá, filiado ao MDB, na 57ª legislatura, iniciada em fevereiro de 2023, e o registro de gabinete lista o gabinete 414, no Anexo 4, com telefone (61) 3215-5414.',
      'Os registros oficiais de participação em órgãos da Câmara mostram atuação em comissões desde março de 2019, o que indica que o mandato atual é o segundo do parlamentar na Casa. Na 56ª legislatura, entre 2019 e 2023, ele integrou colegiados como a Comissão de Minas e Energia, a Comissão de Defesa do Consumidor, a Comissão de Desenvolvimento Urbano e a Comissão de Constituição e Justiça e de Cidadania, conforme os registros disponíveis.',
      'Na 57ª legislatura, o registro oficial lista passagens pela Comissão de Constituição e Justiça e de Cidadania, pela Comissão de Defesa dos Direitos das Pessoas com Deficiência, pela Comissão Mista de Planos, Orçamentos Públicos e Fiscalização e, a partir de março de 2026, pela Comissão de Meio Ambiente e Desenvolvimento Sustentável. O parlamentar integrou comissões parlamentares de inquérito instaladas em 2023, uma entre maio e setembro e outra entre junho e outubro daquele ano.',
      'O registro oficial também indica atuação no Conselho de Ética e Decoro Parlamentar da Câmara: o deputado integrou o colegiado entre abril de 2023 e junho de 2025 e voltou a compô-lo desde julho de 2025. Desde abril de 2025, consta sua participação em grupo de trabalho dedicado à consolidação das leis, com vigência mantida, e, desde março de 2026, participação nas comissões de Constituição e Justiça e de Cidadania e de Meio Ambiente e Desenvolvimento Sustentável. Na 56ª legislatura, o histórico registra ainda sua participação na Comissão de Defesa do Consumidor, entre 2019 e 2021, conforme a base oficial.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos da Câmara dos Deputados, atualizados em agosto de 2026, e reflete apenas o que consta nos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Câmara dos Deputados', href: 'https://www.camara.leg.br/deputados/204379' },
      { label: 'Dados Abertos — Câmara dos Deputados', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204379' },
    ],
  },
  {
    fonte: 'senado',
    idOrigem: '5012',
    nome: 'Randolfe Rodrigues',
    atualizadoEm: '2026-08-14',
    texto: [
      'Randolfe Rodrigues, nome completo Randolph Frederich Rodrigues Alves, é senador pelo Amapá. Segundo o registro oficial do Senado Federal, ele nasceu em 6 de novembro de 1972 na cidade de Garanhuns, em Pernambuco. A base oficial registra dois mandatos consecutivos como titular pelo estado: o primeiro entre fevereiro de 2011 e janeiro de 2019, abrangendo a 54ª e a 55ª legislaturas, e o segundo entre fevereiro de 2019 e janeiro de 2027, abrangendo a 56ª e a 57ª legislaturas. O registro de gabinete indica o Anexo 1, 9º pavimento.',
      'A trajetória partidária registrada mostra filiação ao PSOL entre janeiro de 2011 e setembro de 2015, passagem pela Rede Sustentabilidade entre setembro de 2015 e janeiro de 2024, um período sem partido entre janeiro e julho de 2024 e, desde 18 de julho de 2024, filiação ao PT, legenda pela qual exerce o mandato atual. O registro de lideranças indica que ele foi líder do PSOL no Senado entre 2011 e 2015, líder da Rede entre 2015 e 2019, líder da Minoria entre 2019 e 2021 e líder da Oposição entre 2021 e 2023.',
      'Desde janeiro de 2023, o senador exerce a liderança do Governo no Congresso Nacional, conforme o registro oficial, função que mantém, acumulada com a vice-liderança do Governo no Senado entre 2023 e 2026 e com a liderança do PT na Comissão Mista de Orçamento entre 2025 e 2026. Antes disso, o registro de lideranças lista passagens como líder de bloco parlamentar entre 2016 e 2017 e vice-líder de bloco entre 2017 e 2019. O registro de cargos lista ainda a presidência do Conselho Editorial do Senado, exercida desde abril de 2019, a presidência de comissão temporária externa do Senado, desde 2022, e relatorias e revisões em comissões mistas de medidas provisórias, com ocorrências registradas em 2025 e 2026. O cadastro oficial indica o e-mail institucional sen.randolferodrigues@senado.leg.br.',
      'Ao longo da trajetória no Senado, o registro oficial registra a vice-presidência de comissões parlamentares de inquérito, entre as quais as instaladas para investigar o HSBC, em 2015, o rompimento da barragem de Brumadinho, em 2019, e a pandemia de covid-19, em 2021. Nas comissões permanentes, o senador integra desde fevereiro de 2025 a Comissão de Assuntos Econômicos e a Comissão de Relações Exteriores e Defesa Nacional, além de grupos parlamentares de relacionamento com China, Venezuela, Guiana, Azerbaijão, Cazaquistão e Estados Unidos.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos do Senado Federal, atualizados em agosto de 2026, e reflete apenas o conteúdo dos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Senado Federal', href: 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/5012' },
      { label: 'Dados Abertos — Senado Federal', href: 'https://legis.senado.leg.br/dadosabertos/senador/5012' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '160553',
    nome: 'Antonio Brito',
    atualizadoEm: '2026-08-14',
    texto: [
      'O cadastro oficial da Câmara dos Deputados identifica o deputado Antonio Brito, nome civil Antonio Luiz Paranhos Ribeiro Leite de Brito, como natural de Salvador, na Bahia, onde nasceu em 17 de janeiro de 1969. O registro da Casa indica escolaridade superior e profissão de administrador. O parlamentar exerce o mandato como titular pelo estado da Bahia, filiado ao PSD, na 57ª legislatura, iniciada em fevereiro de 2023, e o registro de gabinete lista o gabinete 495, no Anexo 3, com telefone (61) 3215-5495.',
      'Os registros oficiais de participação em órgãos da Câmara mostram atuação contínua em comissões desde março de 2011, o que indica, segundo a base oficial, que o parlamentar exerce mandatos na Casa desde a 54ª legislatura, com passagens também pelas legislaturas seguintes até a atual, a 57ª. Ao longo desse período, o registro lista participações em colegiados como a Comissão de Saúde, a Comissão de Relações Exteriores e de Defesa Nacional, a Comissão de Viação e Transportes, a Comissão de Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural e a Comissão de Defesa dos Direitos da Pessoa Idosa.',
      'Na 57ª legislatura, o registro oficial indica atuação nas comissões de Saúde, de Relações Exteriores e de Defesa Nacional e de Finanças e Tributação, além de participação em grupo de trabalho destinado a propor minirreforma eleitoral, entre agosto e setembro de 2023, e em comissão especial criada em 2025 para examinar proposta de emenda à Constituição, com participação registrada a partir de junho daquele ano e mantida. Na Comissão de Saúde, constam registros entre março e outubro de 2023, e na Comissão de Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural, registros entre março e agosto de 2023. Desde novembro de 2023, consta sua participação na Bancada Negra da Câmara dos Deputados, com vigência mantida segundo a base oficial.',
      'O parlamentar também integrou a Comissão Mista de Planos, Orçamentos Públicos e Fiscalização em dezembro de 2023, a Comissão de Previdência, Assistência Social, Infância, Adolescência e Família e a Comissão de Finanças e Tributação em novembro de 2025, e comissões representativas do Congresso Nacional nos recessos de 2023, 2024 e 2025, conforme o registro oficial de órgãos da Casa. Desde setembro de 2023, consta ainda sua participação em comissão externa destinada a elaborar propostas, com vigência mantida. As datas de ingresso e desligamento de cada colegiado constam da base de dados aberta da Câmara.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos da Câmara dos Deputados, atualizados em agosto de 2026, e reflete apenas o que consta nos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Câmara dos Deputados', href: 'https://www.camara.leg.br/deputados/160553' },
      { label: 'Dados Abertos — Câmara dos Deputados', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/160553' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '204436',
    nome: 'Isnaldo Bulhões Jr.',
    atualizadoEm: '2026-08-14',
    texto: [
      'O cadastro oficial da Câmara dos Deputados identifica o deputado Isnaldo Bulhões Jr., nome civil Isnaldo Bulhoes Barros Junior, como natural de Maceió, capital de Alagoas, onde nasceu em 30 de outubro de 1976. O registro da Casa indica escolaridade superior e profissões de servidor público e agricultor. O parlamentar exerce o mandato como titular pelo estado de Alagoas, filiado ao MDB, na 57ª legislatura, iniciada em fevereiro de 2023, e o registro de gabinete lista o gabinete 639, no Anexo 4, com telefone (61) 3215-5639.',
      'Os registros oficiais de participação em órgãos da Câmara mostram atuação desde fevereiro de 2019, o que indica que o mandato atual é o segundo do parlamentar na Casa. Na 56ª legislatura, entre 2019 e 2023, ele integrou a Mesa Diretora da Câmara entre fevereiro de 2019 e fevereiro de 2021, conforme o registro oficial, além de ter participado de comissões como a de Constituição e Justiça e de Cidadania, a de Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural, a de Trabalho, de Administração e Serviço Público e a de Esporte.',
      'Na 57ª legislatura, o registro oficial lista atuação na Comissão de Constituição e Justiça e de Cidadania e na Comissão de Saúde, além de participação em comissão externa criada em março de 2023, com vigência mantida, em comissão parlamentar de inquérito instalada em setembro de 2023 e em comissões especiais destinadas a examinar proposta de emenda à Constituição, entre 2023 e 2024, e projeto de lei, entre julho e outubro de 2025. Desde abril de 2025, consta sua participação na Comissão Mista de Planos, Orçamentos Públicos e Fiscalização, com vigência registrada até junho de 2026. Na 56ª legislatura, o histórico lista ainda passagens pela Comissão de Esporte, entre 2019 e 2020, e pela Comissão de Trabalho, de Administração e Serviço Público, no mesmo período.',
      'No período mais recente, a base oficial indica que o deputado manteve atuação na Comissão de Saúde, com registros contínuos desde 2024, e voltou a compor a Comissão de Constituição e Justiça e de Cidadania a partir de abril de 2026. As datas de ingresso e desligamento de cada colegiado constam do registro oficial da Câmara dos Deputados, que também lista o e-mail institucional do gabinete no domínio da Casa.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos da Câmara dos Deputados, atualizados em agosto de 2026, e reflete apenas o que consta nos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Câmara dos Deputados', href: 'https://www.camara.leg.br/deputados/204436' },
      { label: 'Dados Abertos — Câmara dos Deputados', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204436' },
    ],
  },
  {
    fonte: 'camara',
    idOrigem: '204560',
    nome: 'Adolfo Viana',
    atualizadoEm: '2026-08-14',
    texto: [
      'O cadastro oficial da Câmara dos Deputados identifica o deputado Adolfo Viana, nome civil Adolfo Viana de Castro Neto, como natural de Salvador, na Bahia, onde nasceu em 2 de fevereiro de 1981. O registro da Casa indica escolaridade superior e profissão de servidor público. O parlamentar exerce o mandato como titular pelo estado da Bahia, filiado ao PSDB, na 57ª legislatura, iniciada em fevereiro de 2023, e o registro de gabinete lista o gabinete 911, no Anexo 4, com telefone (61) 3215-5911.',
      'Os registros oficiais de participação em órgãos da Câmara mostram atuação em comissões desde março de 2019, o que indica que o mandato atual é o segundo do parlamentar na Casa. Na 56ª legislatura, entre 2019 e 2023, ele integrou colegiados como a Comissão de Minas e Energia, a Comissão de Segurança Pública e Combate ao Crime Organizado, a Comissão Mista de Planos, Orçamentos Públicos e Fiscalização, a Comissão de Relações Exteriores e de Defesa Nacional e a Comissão de Ciência, Tecnologia e Inovação, além de comissões parlamentares de inquérito instaladas em 2019, com ocorrências registradas também entre 2019 e 2021, e de conselho de ética entre 2021 e 2022.',
      'Na 57ª legislatura, o registro oficial indica participação na Representação Brasileira no Parlamento do Mercosul, com início em agosto de 2023 e vigência mantida, e em comissões representativas do Congresso Nacional nos recessos de 2023, 2024 e 2025. A base oficial também registra, entre outubro de 2025 e junho de 2026, a participação do deputado em grupo de trabalho destinado a discutir e elaborar propostas no âmbito da Câmara, e, desde dezembro de 2025, sua participação em comissão representativa do Congresso Nacional prevista para o período de recesso. Na 56ª legislatura, o histórico registra ainda passagens pela Comissão de Esporte, entre março e maio de 2021, e pela Comissão de Ciência, Tecnologia e Inovação, entre março de 2021 e fevereiro de 2022.',
      'Os registros de participação em órgãos da Casa para o período entre 2015 e 2022, disponíveis na base de dados aberta da Câmara, não indicam atuação parlamentar anterior a 2019. Dessa forma, a trajetória oficial do deputado na Câmara dos Deputados compreende a 56ª e a 57ª legislaturas, com o histórico de colegiados descrito acima e as respectivas datas de ingresso e desligamento.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos da Câmara dos Deputados, atualizados em agosto de 2026, e reflete apenas o que consta nos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Câmara dos Deputados', href: 'https://www.camara.leg.br/deputados/204560' },
      { label: 'Dados Abertos — Câmara dos Deputados', href: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204560' },
    ],
  },
  {
    fonte: 'senado',
    idOrigem: '5736',
    nome: 'Tereza Cristina',
    atualizadoEm: '2026-08-14',
    texto: [
      'Tereza Cristina, nome completo Tereza Cristina Correa da Costa Dias, é senadora por Mato Grosso do Sul. Segundo o registro oficial do Senado Federal, ela nasceu em 6 de julho de 1954 na cidade de Campo Grande. O mandato atual, iniciado em fevereiro de 2023 e com previsão de encerramento em janeiro de 2031, abrange a 57ª e a 58ª legislaturas e está registrado na condição de titular, com filiação ao PP desde 31 de março de 2022. O registro de gabinete indica o Anexo 2, Ala Affonso Arinos, gabinete 1, com telefone (61) 3303-2431.',
      'O registro oficial de cargos da Casa indica que a senadora exerceu atividades no Congresso Nacional antes do mandato atual: consta sua atuação como relatora de comissão mista da Medida Provisória nº 793, de 2017, entre agosto de 2017 e março de 2018. No mandato atual, o mesmo registro lista a relatoria da comissão mista da Medida Provisória nº 1167, de 2023, desde maio de 2023, e a presidência da comissão mista da Medida Provisória nº 1308, de 2025, desde setembro de 2025.',
      'Desde fevereiro de 2023, a senadora exerce a liderança do PP no Senado, conforme o registro oficial, função que mantém, acumulada com a vice-liderança da Minoria no Congresso Nacional desde abril de 2023. O registro de cargos lista ainda a vice-presidência do Grupo Parlamentar de Relacionamento com o BRICS, exercida desde junho de 2023, a vice-presidência da Frente Parlamentar Mista pelo Fortalecimento da Empresa Brasileira de Pesquisa Agropecuária, desde abril de 2024, e a vice-presidência da Comissão de Relações Exteriores e Defesa Nacional desde março de 2025.',
      'Em agosto de 2025, a senadora passou a exercer a relatoria da Comissão Temporária Externa criada para interlocução sobre as relações econômicas bilaterais com os Estados Unidos, função registrada como vigente. Entre as comissões permanentes, a base oficial indica que ela integra desde fevereiro de 2025 a Comissão de Relações Exteriores e Defesa Nacional e a Comissão de Meio Ambiente, além da Representação Brasileira no Parlamento do Mercosul, da qual participa desde julho de 2023. O registro também lista participação em frentes parlamentares dedicadas a investimentos estrangeiros, com vigência desde janeiro de 2024, a terras raras brasileiras, desde setembro de 2025, à navegação brasileira, desde novembro de 2025, e à economia do mar, desde outubro de 2025, além de grupo de trabalho sobre regulamentação da mineração, desde abril de 2025. O cadastro oficial indica o e-mail institucional sen.terezacristina@senado.leg.br.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos do Senado Federal, atualizados em agosto de 2026, e reflete apenas o conteúdo dos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Senado Federal', href: 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/5736' },
      { label: 'Dados Abertos — Senado Federal', href: 'https://legis.senado.leg.br/dadosabertos/senador/5736' },
    ],
  },
  {
    fonte: 'senado',
    idOrigem: '739',
    nome: 'Ciro Nogueira',
    atualizadoEm: '2026-08-14',
    texto: [
      'Ciro Nogueira, nome completo Ciro Nogueira Lima Filho, é senador pelo Piauí. Segundo o registro oficial do Senado Federal, ele nasceu em 21 de novembro de 1968 na cidade de Teresina. A base oficial registra dois mandatos consecutivos como titular pelo estado: o primeiro entre fevereiro de 2011 e janeiro de 2019, abrangendo a 54ª e a 55ª legislaturas, e o segundo entre fevereiro de 2019 e janeiro de 2027, abrangendo a 56ª e a 57ª legislaturas. A filiação ao PP consta no registro desde fevereiro de 2004, e o gabinete fica no Anexo 1, 3º pavimento.',
      'No primeiro mandato, o registro oficial de cargos indica que o senador integrou a Mesa do Senado Federal como quarto secretário entre 2011 e 2013 e como terceiro secretário entre 2013 e 2015, além de ter exercido a vice-presidência de comissão parlamentar de inquérito instalada em 2011. Entre 2017 e 2019, o mesmo registro lista relatorias e revisões em comissões mistas de medidas provisórias no Congresso Nacional, com ocorrências em 2017 e entre 2018 e 2019.',
      'No mandato atual, o registro de lideranças indica que o senador foi líder do PP no Senado entre março de 2020 e janeiro de 2021, vice-líder do PP entre fevereiro e julho de 2021, líder do PP na Comissão Mista de Orçamento em 2021 e, desde fevereiro de 2023, líder da Minoria no Senado Federal. Entre março de 2023 e março de 2024, exerceu a liderança de bloco parlamentar no Senado, e em junho de 2026 voltou a exercer a liderança do PP na Comissão Mista de Orçamento, função registrada como vigente. O cadastro oficial indica o e-mail institucional sen.cironogueira@senado.leg.br.',
      'Entre as comissões permanentes, a base oficial indica que o senador integra desde fevereiro de 2025 a Comissão de Assuntos Econômicos e, desde julho de 2026, a Comissão de Constituição, Justiça e Cidadania, além da Comissão Mista de Controle das Atividades de Inteligência desde fevereiro de 2025. O registro também lista sua participação como suplente no Conselho de Ética e Decoro Parlamentar desde 2023 e em frentes parlamentares dedicadas ao Matopiba, desde março de 2026, à economia do mar, desde outubro de 2025, e às ferrovias autorizadas, desde agosto de 2025, além de grupos parlamentares de relacionamento com Marrocos, desde 2023, e com Israel, desde 2024.',
      'Este perfil foi elaborado exclusivamente com base nos dados abertos do Senado Federal, atualizados em agosto de 2026, e reflete apenas o conteúdo dos registros oficiais da Casa.',
    ],
    fontes: [
      { label: 'Perfil oficial — Senado Federal', href: 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/739' },
      { label: 'Dados Abertos — Senado Federal', href: 'https://legis.senado.leg.br/dadosabertos/senador/739' },
    ],
  },
];
