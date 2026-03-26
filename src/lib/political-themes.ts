import type { PerfilItemLista } from '@/lib/official';

interface VoteThemeSource {
  titulo: string;
  descricao?: string;
  data?: string;
  voto: string;
  href?: string;
}

const THEMES = [
  {
    tema: 'Economia e impostos',
    keywords: ['tribut', 'imposto', 'fiscal', 'orcament', 'arcabouco', 'divida', 'credito', 'gasto'],
  },
  {
    tema: 'Saúde',
    keywords: ['saude', 'sus', 'hospital', 'medic', 'enferm', 'vacina', 'farmac'],
  },
  {
    tema: 'Educação',
    keywords: ['educa', 'escola', 'univers', 'professor', 'aluno', 'ensino'],
  },
  {
    tema: 'Segurança',
    keywords: ['seguranca', 'policia', 'crime', 'arma', 'pris', 'penal', 'violencia'],
  },
  {
    tema: 'Meio ambiente',
    keywords: ['ambient', 'clima', 'floresta', 'desmat', 'amaz', 'licenciamento', 'energia'],
  },
  {
    tema: 'Direitos sociais',
    keywords: ['trabalho', 'salario', 'aposent', 'previd', 'assistencia', 'familia', 'mulher', 'igualdade'],
  },
  {
    tema: 'Infraestrutura e cidades',
    keywords: ['transporte', 'rodovia', 'saneamento', 'habitacao', 'mobilidade', 'cidade'],
  },
] as const;

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function truncate(value: string, max = 180) {
  if (value.length <= max) {
    return value;
  }

  return `${value.slice(0, max - 1).trim()}…`;
}

function detectTheme(item: VoteThemeSource) {
  const text = normalizeText(`${item.titulo} ${item.descricao ?? ''}`);

  let bestTheme = 'Temas gerais';
  let bestScore = 0;

  for (const theme of THEMES) {
    const score = theme.keywords.reduce((count, keyword) => (text.includes(keyword) ? count + 1 : count), 0);

    if (score > bestScore) {
      bestTheme = theme.tema;
      bestScore = score;
    }
  }

  return bestTheme;
}

function normalizeVote(value: string) {
  const text = normalizeText(value);

  if (text.includes('sim') || text.includes('favor')) return 'sim';
  if (text.includes('nao') || text.includes('não') || text.includes('contra')) return 'nao';
  if (text.includes('abst')) return 'abstencao';
  if (text.includes('obstr')) return 'obstrucao';
  return 'outro';
}

export function buildVoteThemeCards(items: VoteThemeSource[]): PerfilItemLista[] {
  const grouped = new Map<
    string,
    {
      items: VoteThemeSource[];
      sim: number;
      nao: number;
      abstencao: number;
      obstrucao: number;
    }
  >();

  for (const item of items) {
    const tema = detectTheme(item);
    const current = grouped.get(tema) ?? {
      items: [],
      sim: 0,
      nao: 0,
      abstencao: 0,
      obstrucao: 0,
    };

    current.items.push(item);
    const voto = normalizeVote(item.voto);

    if (voto === 'sim') current.sim += 1;
    if (voto === 'nao') current.nao += 1;
    if (voto === 'abstencao') current.abstencao += 1;
    if (voto === 'obstrucao') current.obstrucao += 1;

    grouped.set(tema, current);
  }

  return Array.from(grouped.entries())
    .sort((a, b) => b[1].items.length - a[1].items.length)
    .slice(0, 4)
    .map(([tema, resumo]) => {
      const ultima = [...resumo.items].sort((a, b) => (b.data ?? '').localeCompare(a.data ?? ''))[0];
      const tendencia =
        resumo.sim > resumo.nao
          ? 'Mais votos favoráveis'
          : resumo.nao > resumo.sim
            ? 'Mais votos contrários'
            : 'Votos divididos';

      return {
        titulo: tema,
        descricao: ultima?.descricao ? truncate(ultima.descricao) : 'Tema recorrente nas votações recentes.',
        detalhe: [
          `${resumo.items.length} votações analisadas`,
          resumo.sim ? `${resumo.sim} favoráveis` : null,
          resumo.nao ? `${resumo.nao} contrárias` : null,
          resumo.abstencao ? `${resumo.abstencao} abstenções` : null,
        ]
          .filter(Boolean)
          .join(' • '),
        data: ultima?.data,
        destaque: tendencia,
        href: ultima?.href,
      } satisfies PerfilItemLista;
    });
}
