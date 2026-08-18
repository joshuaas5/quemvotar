import type { EixoEspectro } from './types';

/* ────────────────────────────────────────────────────────────────
 * ANÁLISE CURADA — eleições 2026.
 *
 * Análises produzidas pela redação do QuemVotar em 18/08/2026
 * (início do período de registro de candidaturas), com base na
 * LEITURA DIRETA do plano de governo registrado no TSE (arquivo
 * oficial codTipo=5) e no histórico público dos candidatos.
 *
 * Cada entrada declara: eixo, confiança, temas e a justificativa.
 * A interface SEMPRE exibe o selo "Análise QuemVotar" + a data.
 *
 * Candidatos sem entrada caem automaticamente na estimativa pelo
 * partido (camada 3 do motor), rotulada como tal.
 * ──────────────────────────────────────────────────────────────── */

export interface AnaliseCurada {
  idTse: number;
  nome: string;
  uf: string;
  cargo: string;
  eixo: EixoEspectro;
  confianca: number;
  resumo: string;
  temas: string[];
  avisos?: string[];
  analisadoEm: string;
  planoUrl?: string | null;
}

export const ANALISE_CURADA_2026: Record<number, AnaliseCurada> = {
  /* ── Presidência da República ─────────────────────────────── */

  280002542548: {
    idTse: 280002542548,
    nome: 'Lula',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'esquerda',
    confianca: 0.9,
    resumo:
      'Plano de governo lido na íntegra (20 páginas, registrado no TSE em 15/08/2026): reafirma o projeto de "transformação" do mandato atual com combate às desigualdades, fortalecimento do Estado e dos serviços públicos, valorização do trabalho, transição para economia de baixo carbono, participação social e soberania nacional. Programa clássico da esquerda democrática brasileira, com ênfase em inclusão social e reconstrução do Estado.',
    temas: ['Combate às desigualdades', 'Estado e serviços públicos', 'Valorização do trabalho', 'Transição ecológica'],
    analisadoEm: '2026-08-18',
  },

  280002551544: {
    idTse: 280002551544,
    nome: 'Flavio Bolsonaro',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'direita',
    confianca: 0.95,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): agenda liberal-conservadora explícita — "alternativa liberal, conservadora, reformista e corajosa". Eixos: segurança com tolerância zero (endurecimento penal, mais presídios), tesouraço nos gastos públicos, menos impostos, reforma do Estado, e valores inegociáveis de família, vida desde a concepção, propriedade privada e liberdade religiosa. Alinhado à direita bolsonarista.',
    temas: ['Segurança pública dura', 'Redução de impostos e gastos', 'Valores familiares e religiosos', 'Reforma do Estado'],
    analisadoEm: '2026-08-18',
  },

  280002551932: {
    idTse: 280002551932,
    nome: 'Ronaldo Caiado',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'centro-direita',
    confianca: 0.85,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): perfil gerencial de centro-direita — iniciativa privada como principal motor da economia, Estado "profissional, digital e orientado por resultados", combate à corrupção e à captura do Estado, manutenção da rede de transferência de renda com condicionalidades, segurança jurídica para o agronegócio e inserção internacional pragmática. Sem radicalismo ideológico.',
    temas: ['Gestão e eficiência do Estado', 'Iniciativa privada', 'Segurança jurídica', 'Proteção social com emancipação'],
    analisadoEm: '2026-08-18',
  },

  280002539826: {
    idTse: 280002539826,
    nome: 'Zema',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'direita',
    confianca: 0.9,
    resumo:
      'Plano de governo lido (registrado no TSE em 15/08/2026): agenda liberal — cortar gastos, reduzir o peso do Estado onde não é essencial, metas de redução de impostos que impõem corte de gastos, combate a privilégios e fraudes em programas sociais, PPPs, segurança jurídica e regulação pontual (ex.: IA). Alinhado ao liberalismo de direita do NOVO.',
    temas: ['Corte de gastos e equilíbrio fiscal', 'Redução de impostos', 'Estado enxuto', 'Segurança jurídica'],
    analisadoEm: '2026-08-18',
  },

  280002551547: {
    idTse: 280002551547,
    nome: 'Escritor Augusto Cury',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'centro',
    confianca: 0.6,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): discurso de "terceira via" que rejeita a polarização esquerda/direita e critica "o barco ideológico". Prioriza saúde emocional e educação, famílias, professores, pequenos agricultores e comerciantes; defende liberdade econômica, meritocracia, produtividade e responsabilidade fiscal. Classificação de centro, com viés econômico de centro-direita, confiança moderada por ser um plano propositalmente transversal.',
    temas: ['Saúde emocional e educação', 'Família', 'Liberdade econômica moderada', 'Responsabilidade fiscal'],
    analisadoEm: '2026-08-18',
  },

  280002540694: {
    idTse: 280002540694,
    nome: 'Renan Santos',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'centro-direita',
    confianca: 0.7,
    resumo:
      'Plano de governo lido (registrado no TSE em 15/08/2026): "nova direita reformista" que critica tanto a direita liberal simplista ("privatizar tudo") quanto o conservadorismo conspiratório. Propõe revisão radical do pacto federativo, reforma do Estado, combate ao crime organizado com endurecimento penal e mérito como critério. Posição de centro-direita reformista, com ênfase em segurança e instituições.',
    temas: ['Reforma do Estado e pacto federativo', 'Segurança contra o crime organizado', 'Meritocracia', 'Combate a privilégios'],
    analisadoEm: '2026-08-18',
  },

  280002538811: {
    idTse: 280002538811,
    nome: 'Samara',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'esquerda',
    confianca: 0.9,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): programa anticapitalista — crítica ao imperialismo e ao capital financeiro, defesa de saúde, educação, moradia, transporte e cultura "como direitos, e não mercadorias", fim da escala 6x1, redução da jornada com aumento salarial, elevação de 100% do salário mínimo, reforma agrária e soberania nacional. Esquerda radical (UP).',
    temas: ['Direitos como não-mercadorias', 'Jornada de trabalho e salário mínimo', 'Reforma agrária', 'Soberania nacional'],
    analisadoEm: '2026-08-18',
  },

  280002551975: {
    idTse: 280002551975,
    nome: 'Edmilson Costa',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'esquerda',
    confianca: 0.95,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): programa socialista — luta contra o imperialismo e a "ordem burguesa", conselhos populares, estatização, solidariedade com Cuba, Palestina e Venezuela, melhores condições de vida da classe trabalhadora. Esquerda revolucionária (PCB).',
    temas: ['Socialismo', 'Anti-imperialismo', 'Conselhos populares', 'Classe trabalhadora'],
    analisadoEm: '2026-08-18',
  },

  280002541457: {
    idTse: 280002541457,
    nome: 'Hertz Dias',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'esquerda',
    confianca: 0.9,
    resumo:
      'Plano de governo lido (registrado no TSE em 16/08/2026): programa trotskista — defesa da classe trabalhadora, crítica ao imperialismo e à "burguesia nacional submissa", denúncia da destruição do SUS e das universidades, soberania nacional, monopólios como raiz do retrocesso social. Esquerda revolucionária (PSTU).',
    temas: ['Classe trabalhadora', 'Anti-imperialismo', 'Serviços públicos universais', 'Soberania nacional'],
    analisadoEm: '2026-08-18',
  },

  280002552487: {
    idTse: 280002552487,
    nome: 'Rui Costa Pimenta',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'esquerda',
    confianca: 0.95,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): programa de "governo operário" — revolução e emancipação da classe trabalhadora da "escravidão do capitalismo", punição a latifundiários, saída do imperialismo da Amazônia e da América Latina. Esquerda revolucionária radical (PCO).',
    temas: ['Revolução e governo operário', 'Anti-imperialismo', 'Classe trabalhadora', 'Reforma agrária'],
    analisadoEm: '2026-08-18',
  },

  280002552484: {
    idTse: 280002552484,
    nome: 'Clariana Barao',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'centro-direita',
    confianca: 0.65,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): documento enxuto e técnico — resultado fiscal e dívida/PIB como indicadores, revisão de gastos, investimento privado, empreendedorismo, conectividade e apoio a famílias vulneráveis. Perfil de centro-direita gerencial; pauta de costumes pouco presente no texto.',
    temas: ['Equilíbrio fiscal', 'Empreendedorismo e investimento privado', 'Gestão por indicadores', 'Famílias vulneráveis'],
    analisadoEm: '2026-08-18',
  },

  280002548139: {
    idTse: 280002548139,
    nome: 'Veterinário Wilson Grassi',
    uf: 'BR',
    cargo: 'Presidente',
    eixo: 'direita',
    confianca: 0.85,
    resumo:
      'Plano de governo lido (registrado no TSE em 16/08/2026): reforma tributária radical — extinção da maioria dos tributos federais (IRPJ, Cofins, CSLL, IOF, IPI, contribuição patronal), financiamento via imposto sobre transações, com ganho de R$ 266 bi/ano de renda disponível para famílias. Liberalismo radical de corte de impostos (partido Democrata).',
    temas: ['Extinção de tributos federais', 'Renda disponível das famílias', 'Competitividade', 'Estado enxuto'],
    analisadoEm: '2026-08-18',
  },

  /* ── Governo do Paraná (exemplo de análise por estado) ────── */

  160002547666: {
    idTse: 160002547666,
    nome: 'Requião Filho',
    uf: 'PR',
    cargo: 'Governador',
    eixo: 'centro-esquerda',
    confianca: 0.8,
    resumo:
      'Plano de governo lido (registrado no TSE em 16/08/2026): desenvolvimentismo estadual de centro-esquerda — escola pública, saúde e segurança com presença do Estado, crédito público para pequenos negócios, redução de desigualdades entre regiões, valorização de professores, profissionais de saúde e policiais, proteção do patrimônio público. Perfil trabalhista (PDT) com gestão por metas.',
    temas: ['Serviços públicos com presença do Estado', 'Redução de desigualdades regionais', 'Crédito público e pequenos negócios', 'Valorização de servidores'],
    analisadoEm: '2026-08-18',
  },

  160002540833: {
    idTse: 160002540833,
    nome: 'Sergio Moro',
    uf: 'PR',
    cargo: 'Governador',
    eixo: 'direita',
    confianca: 0.6,
    resumo:
      'Plano de governo ainda sem texto legível no TSE (o arquivo registrado em 17/08/2026 é apenas a petição de juntada; o anexo não foi digitalizado até 18/08/2026). Posição estimada pelo partido (PL) e pelo histórico público do candidato: agenda de direita com ênfase em combate à corrupção, segurança pública e gestão. Será revisada quando o anexo estiver disponível.',
    temas: ['Segurança pública', 'Combate à corrupção', 'Gestão'],
    avisos: ['Plano de governo sem texto legível até 18/08/2026 — estimativa pelo partido e histórico.'],
    analisadoEm: '2026-08-18',
  },

  160002549553: {
    idTse: 160002549553,
    nome: 'Sandro Alex',
    uf: 'PR',
    cargo: 'Governador',
    eixo: 'centro',
    confianca: 0.7,
    resumo:
      'Plano de governo lido (registrado no TSE em 16/08/2026): plataforma de continuidade administrativa — consolidação da gestão atual (educação, polo industrial, infraestrutura), inovação, gestão por resultados, cooperação e eficiência. Perfil pragmático de centro, sem viés ideológico marcado.',
    temas: ['Continuidade da gestão', 'Educação e inovação', 'Gestão por resultados', 'Infraestrutura'],
    analisadoEm: '2026-08-18',
  },

  160002547594: {
    idTse: 160002547594,
    nome: 'Alexandre Salomão',
    uf: 'PR',
    cargo: 'Governador',
    eixo: 'centro-direita',
    confianca: 0.7,
    resumo:
      'Plano de governo lido (registrado no TSE em 15/08/2026): "liberdade econômica com responsabilidade social", eficiência do Estado, segurança jurídica, soluções pragmáticas para emprego, educação e saúde, e segurança pública que não separa eficácia de legalidade (formação em Direitos Humanos). Perfil de centro-direita moderado.',
    temas: ['Liberdade econômica com responsabilidade social', 'Eficiência do Estado', 'Segurança pública legalista', 'Pragmatismo'],
    analisadoEm: '2026-08-18',
  },

  160002551353: {
    idTse: 160002551353,
    nome: 'Luiz França',
    uf: 'PR',
    cargo: 'Governador',
    eixo: 'centro-direita',
    confianca: 0.6,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): narrativa de valorização das famílias e comunidades do interior; gestão pragmática com decisões de privatização caso a caso ("cada decisão será individual"), avaliação de contratos por custo e alcance, reforço de serviços essenciais (segurança, saúde, educação) e combate a privilégios. Perfil de centro-direita reformista (Missão).',
    temas: ['Famílias e comunidades', 'Gestão pragmática', 'Serviços essenciais', 'Combate a privilégios'],
    analisadoEm: '2026-08-18',
  },

  160002550997: {
    idTse: 160002550997,
    nome: 'Tayná Miessa',
    uf: 'PR',
    cargo: 'Governador',
    eixo: 'esquerda',
    confianca: 0.9,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): programa socialista — "não basta administrar melhor o capitalismo, é preciso transformá-lo", construção do socialismo no Paraná, memória das lutas operárias, indígenas e quilombolas, crítica à exploração latifundiária e ao capital financeiro. Esquerda radical (UP).',
    temas: ['Socialismo', 'Lutas populares e quilombolas', 'Trabalhadores', 'Reforma agrária'],
    analisadoEm: '2026-08-18',
  },

  160002548010: {
    idTse: 160002548010,
    nome: 'Samuel de Mattos',
    uf: 'PR',
    cargo: 'Governador',
    eixo: 'esquerda',
    confianca: 0.9,
    resumo:
      'Plano de governo lido (registrado no TSE em 16/08/2026): programa socialista explícito — defesa do socialismo e do comunismo, necessidades básicas da classe trabalhadora, crítica à esquerda institucional (PT) e ao capital financeiro internacional. Esquerda revolucionária (PSTU).',
    temas: ['Socialismo', 'Classe trabalhadora', 'Crítica ao capital financeiro', 'Serviços públicos'],
    analisadoEm: '2026-08-18',
  },

  160002552560: {
    idTse: 160002552560,
    nome: 'Adriano Funileiro',
    uf: 'PR',
    cargo: 'Governador',
    eixo: 'esquerda',
    confianca: 0.95,
    resumo:
      'Plano de governo lido (registrado no TSE em 17/08/2026): programa de "revolução, governo operário e comunismo" — crítica à "ditadura dos bancos e do grande capital", organização da classe operária, superação do regime atual. Esquerda revolucionária radical (PCO).',
    temas: ['Revolução e governo operário', 'Anti-capitalismo', 'Classe operária'],
    analisadoEm: '2026-08-18',
  },
};
