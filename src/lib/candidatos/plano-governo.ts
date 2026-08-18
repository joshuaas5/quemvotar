import type { CandidatoTseDetalhe, EixoEspectro, PlanoGovernoResumo } from './types';
import { arquivoUrlCandidato } from './urls';

/* ────────────────────────────────────────────────────────────────
 * Plano de governo: extração e análise determinística.
 *
 * No TSE, o plano de governo é um arquivo PDF (codTipo = "5")
 * anexado ao registro do candidato — obrigatório para cargos do
 * Executivo (presidente, governador; prefeito em eleições
 * municipais). Candidatos do Legislativo não têm plano de governo.
 * ──────────────────────────────────────────────────────────────── */

export function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9\s%$]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ── Dicionários de marcadores (auditáveis) ───────────────────── */

interface Marcador {
  termo: string;
  peso: number;
}

type Dimensao = {
  id: string;
  nome: string;
  emoji: string;
  esquerda: Marcador[];
  direita: Marcador[];
};

const DIMENSOES: Dimensao[] = [
  {
    id: 'economia',
    nome: 'Economia e papel do Estado',
    emoji: '🏛️',
    esquerda: [
      { termo: 'TAXACAO DE GRANDES FORTUNAS', peso: 3 },
      { termo: 'IMPOSTOS PROGRESSIVOS', peso: 2 },
      { termo: 'TRIBUTACAO PROGRESSIVA', peso: 2 },
      { termo: 'ESTATIZACAO', peso: 3 },
      { termo: 'BANCO PUBLICO', peso: 2 },
      { termo: 'POLITICA INDUSTRIAL', peso: 1 },
      { termo: 'REFORMA AGRARIA', peso: 2 },
      { termo: 'CONTROLE DE PRECOS', peso: 2 },
      { termo: 'ESTADO FORTE', peso: 2 },
      { termo: 'FORTALECIMENTO DO ESTADO', peso: 2 },
      { termo: 'PROGRAMAS SOCIAIS', peso: 1 },
      { termo: 'TRANSFERENCIA DE RENDA', peso: 2 },
      { termo: 'RENDA BASICA', peso: 2 },
      { termo: 'BOLSA FAMILIA', peso: 1 },
      { termo: 'REDUCAO DA DESIGUALDADE', peso: 1 },
      { termo: 'COMBATE A DESIGUALDADE', peso: 1 },
      { termo: 'SOBERANIA NACIONAL', peso: 1 },
      { termo: 'PROTECIONISMO', peso: 2 },
      { termo: 'SERVICOS PUBLICOS UNIVERSAL', peso: 1 },
    ],
    direita: [
      { termo: 'PRIVATIZACAO', peso: 3 },
      { termo: 'PRIVATIZACOES', peso: 3 },
      { termo: 'DESESTATIZACAO', peso: 3 },
      { termo: 'TETO DE GASTOS', peso: 2 },
      { termo: 'CORTE DE GASTOS', peso: 2 },
      { termo: 'REDUCAO DE IMPOSTOS', peso: 2 },
      { termo: 'CARGA TRIBUTARIA MENOR', peso: 2 },
      { termo: 'MENOS ESTADO', peso: 2 },
      { termo: 'ESTADO ENXUTO', peso: 2 },
      { termo: 'ENXUGAMENTO DA MAQUINA', peso: 2 },
      { termo: 'REFORMA ADMINISTRATIVA', peso: 2 },
      { termo: 'DESBUROCRATIZACAO', peso: 1 },
      { termo: 'LIBERALIZACAO', peso: 2 },
      { termo: 'ABERTURA COMERCIAL', peso: 2 },
      { termo: 'DESREGULAMENTACAO', peso: 2 },
      { termo: 'PARCE RIAS PUBLICO PRIVADAS', peso: 1 },
      { termo: 'PPP', peso: 1 },
      { termo: 'MERITOCRACIA', peso: 1 },
      { termo: 'EMPREENDEDORISMO', peso: 1 },
      { termo: 'LIVRE MERCADO', peso: 2 },
      { termo: 'SEGURANCA JURIDICA PARA INVESTIR', peso: 1 },
      { termo: 'REFORMA TRIBUTARIA NEUTRA', peso: 1 },
    ],
  },
  {
    id: 'trabalho',
    nome: 'Trabalho e direitos',
    emoji: '🧑‍🏭',
    esquerda: [
      { termo: 'VALORIZACAO DO SALARIO MINIMO', peso: 2 },
      { termo: 'DIREITOS TRABALHISTAS', peso: 2 },
      { termo: 'FORTALECIMENTO DA CLT', peso: 2 },
      { termo: 'CONVENCOES COLETIVAS', peso: 1 },
      { termo: 'SINDICATOS', peso: 1 },
      { termo: 'NEGOCIACAO COLETIVA', peso: 1 },
      { termo: 'REDUCAO DA JORNADA', peso: 1 },
      { termo: 'TRABALHO DECENTE', peso: 1 },
      { termo: 'IGUALDADE SALARIAL', peso: 1 },
    ],
    direita: [
      { termo: 'FLEXIBILIZACAO TRABALHISTA', peso: 2 },
      { termo: 'FLEXIBILIZAR A CLT', peso: 2 },
      { termo: 'CARTEIRA VERDE E AMARELA', peso: 2 },
      { termo: 'MENOS ENCARGOS', peso: 2 },
      { termo: 'ACORDO INDIVIDUAL', peso: 1 },
      { termo: 'PEJOTIZACAO', peso: 2 },
      { termo: 'LIBERDADE DE CONTRATACAO', peso: 1 },
    ],
  },
  {
    id: 'costumes',
    nome: 'Costumes e direitos civis',
    emoji: '⚖️',
    esquerda: [
      { termo: 'DIREITOS LGBTQIA', peso: 3 },
      { termo: 'DIVERSIDADE', peso: 1 },
      { termo: 'IGUALDADE DE GENERO', peso: 2 },
      { termo: 'AUTONOMIA DA MULHER', peso: 2 },
      { termo: 'DESCRIMINALIZACAO', peso: 2 },
      { termo: 'LEGALIZACAO', peso: 2 },
      { termo: 'ESTADO LAICO', peso: 2 },
      { termo: 'DIREITOS REPRODUTIVOS', peso: 2 },
      { termo: 'FEMINISMO', peso: 2 },
      { termo: 'ANTIRRACISMO', peso: 1 },
      { termo: 'POVOS INDIGENAS', peso: 1 },
      { termo: 'QUILOMBOLAS', peso: 1 },
      { termo: 'EDUCACAO SEXUAL', peso: 1 },
    ],
    direita: [
      { termo: 'VALORES CRISTAOS', peso: 2 },
      { termo: 'FAMILIA TRADICIONAL', peso: 2 },
      { termo: 'PROTECAO DA FAMILIA', peso: 1 },
      { termo: 'VIDA DESDE A CONCEPCAO', peso: 3 },
      { termo: 'FAMILIA COMO BASE DA SOCIEDADE', peso: 1 },
      { termo: 'ENSINO DOMICILIAR', peso: 2 },
      { termo: 'HOMESCHOOLING', peso: 2 },
      { termo: 'IDEOLOGIA DE GENERO', peso: 2 },
      { termo: 'PATRIA', peso: 1 },
      { termo: 'DEUS', peso: 1 },
      { termo: 'BIBLIA', peso: 1 },
      { termo: 'DIREITO A VIDA', peso: 1 },
      { termo: 'FAMILIA E RELIGIAO', peso: 1 },
    ],
  },
  {
    id: 'seguranca',
    nome: 'Segurança pública',
    emoji: '👮',
    esquerda: [
      { termo: 'PREVENCAO A VIOLENCIA', peso: 2 },
      { termo: 'POLICIA CIDADÃ', peso: 1 },
      { termo: 'POLICIA CIDADANIA', peso: 1 },
      { termo: 'DESENCARCERAMENTO', peso: 2 },
      { termo: 'CAUSAS SOCIAIS DA VIOLENCIA', peso: 2 },
      { termo: 'JUSTICA RESTAURATIVA', peso: 2 },
      { termo: 'REDUCAO DE DANOS', peso: 1 },
      { termo: 'CONTROLE EXTERNO DA POLICIA', peso: 1 },
    ],
    direita: [
      { termo: 'ENDURECIMENTO PENAL', peso: 2 },
      { termo: 'REDUCAO DA MAIORIDADE PENAL', peso: 3 },
      { termo: 'PORTE DE ARMAS', peso: 2 },
      { termo: 'DIREITO A DEFESA ARMADA', peso: 2 },
      { termo: 'CAC', peso: 1 },
      { termo: 'ARMAMENTO', peso: 2 },
      { termo: 'PENA MAIS DURA', peso: 1 },
      { termo: 'TOLERANCIA ZERO', peso: 2 },
      { termo: 'REINCIDENCIA', peso: 1 },
      { termo: 'FACCOES', peso: 1 },
      { termo: 'CADEIA', peso: 1 },
    ],
  },
  {
    id: 'ambiente',
    nome: 'Meio ambiente',
    emoji: '🌱',
    esquerda: [
      { termo: 'TRANSICAO ECOLOGICA', peso: 2 },
      { termo: 'JUSTICA CLIMATICA', peso: 2 },
      { termo: 'DESMATAMENTO ZERO', peso: 2 },
      { termo: 'PROTECAO AMBIENTAL', peso: 1 },
      { termo: 'MEIO AMBIENTE', peso: 0.5 },
      { termo: 'MUDANCAS CLIMATICAS', peso: 1 },
      { termo: 'ECONOMIA VERDE', peso: 1 },
      { termo: 'POVOS DA FLORESTA', peso: 1 },
      { termo: 'SOCIEDADE DE BAIXO CARBONO', peso: 2 },
    ],
    direita: [
      { termo: 'LICENCIAMENTO AMBIENTAL FLEXIVEL', peso: 2 },
      { termo: 'AGILIDADE NO LICENCIAMENTO', peso: 1 },
      { termo: 'SEGURANCA JURIDICA DO AGRO', peso: 1 },
      { termo: 'EXPLORACAO DE RECURSOS NATURAIS', peso: 1 },
      { termo: 'MINERACAO RESPONSAVEL', peso: 0.5 },
      { termo: 'AGRO', peso: 0.5 },
      { termo: 'AGRO NEGOCIO', peso: 0.5 },
      { termo: 'AGRO NEGOCIO', peso: 0.5 },
    ],
  },
];

/* ── Motor de pontuação ────────────────────────────────────────── */

export interface ResultadoAnalisePlano {
  eixo: EixoEspectro;
  confianca: number;
  resumo: string;
  temas: string[];
  pontuacao: number;
  totalMarcacoes: number;
}

function contarMarcadores(texto: string, marcadores: Marcador[]): { total: number; encontrados: string[] } {
  let total = 0;
  const encontrados: string[] = [];
  for (const marcador of marcadores) {
    const count = texto.split(marcador.termo).length - 1;
    if (count > 0) {
      total += count * marcador.peso;
      encontrados.push(marcador.termo);
    }
  }
  return { total, encontrados };
}

export function analisarPlanoGoverno(texto: string): ResultadoAnalisePlano {
  const normalizado = normalizarTexto(texto);
  if (normalizado.length < 100) {
    return {
      eixo: 'centro',
      confianca: 0.1,
      resumo: 'Plano de governo muito curto para análise confiável.',
      temas: [],
      pontuacao: 0,
      totalMarcacoes: 0,
    };
  }

  let score = 0;
  let totalMarcacoes = 0;
  const temas: string[] = [];
  const detalhes: string[] = [];

  for (const dimensao of DIMENSOES) {
    const esq = contarMarcadores(normalizado, dimensao.esquerda);
    const dir = contarMarcadores(normalizado, dimensao.direita);
    const liquido = esq.total - dir.total;
    totalMarcacoes += esq.total + dir.total;
    score += liquido;

    if (Math.abs(liquido) >= 1) {
      temas.push(dimensao.nome);
      const direcao = liquido > 0 ? 'agenda de esquerda' : 'agenda de direita';
      detalhes.push(
        `${dimensao.nome}: ${esq.total} marcações de esquerda vs ${dir.total} de direita (${direcao})`,
      );
    }
  }

  // Normaliza para escala -1..1 (score bruto dividido por máximo esperado ~10)
  const pontuacao = Math.max(-1, Math.min(1, score / 10));

  let eixo: EixoEspectro;
  if (pontuacao >= 0.35) eixo = 'esquerda';
  else if (pontuacao >= 0.12) eixo = 'centro-esquerda';
  else if (pontuacao > -0.12) eixo = 'centro';
  else if (pontuacao > -0.35) eixo = 'centro-direita';
  else eixo = 'direita';

  const confianca = Math.min(0.85, 0.3 + totalMarcacoes / 80);

  const resumo =
    detalhes.length > 0
      ? `Análise automática do plano de governo registrado no TSE. ${detalhes.join('. ')}.`
      : 'Análise automática do plano de governo: texto sem marcadores claros o suficiente para classificação.';

  return { eixo, confianca, resumo, temas, pontuacao, totalMarcacoes };
}

/* ── Disponibilidade do plano no registro do TSE ──────────────── */

export async function getPlanoGoverno(candidato: CandidatoTseDetalhe): Promise<PlanoGovernoResumo> {
  const plano = (candidato.arquivos ?? []).find((arquivo) => arquivo.codTipo === '5');

  if (!plano) {
    return { disponivel: false };
  }

  return {
    disponivel: true,
    nomeArquivo: plano.nome,
    idArquivo: plano.idArquivo,
    urlDownload: arquivoUrlCandidato(plano.idArquivo),
    textoExtraido: null,
    resumoAutomatico: null,
  };
}
