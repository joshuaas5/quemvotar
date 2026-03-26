import { cache } from 'react';
import type { PerfilDetalhadoPublico, PerfilItemLista, PerfilPublico } from './types';

const SENADO_API_ROOT = 'https://legis.senado.leg.br/dadosabertos';
const SENADO_LISTA_ATUAL_URL = `${SENADO_API_ROOT}/senador/lista/atual.json`;

interface SenadoTelefone {
  NumeroTelefone?: string;
}

interface SenadoServico {
  NomeServico?: string;
  UrlServico?: string;
}

interface SenadoIdentificacao {
  CodigoParlamentar?: string;
  CodigoPublicoNaLegAtual?: string;
  NomeParlamentar?: string;
  NomeCompletoParlamentar?: string;
  SexoParlamentar?: string;
  FormaTratamento?: string;
  UrlFotoParlamentar?: string;
  UrlPaginaParlamentar?: string;
  UrlPaginaParticular?: string;
  EmailParlamentar?: string;
  SiglaPartidoParlamentar?: string;
  UfParlamentar?: string;
  Bloco?: {
    NomeBloco?: string;
    NomeApelido?: string;
  };
  MembroMesa?: string;
  MembroLideranca?: string;
}

interface SenadoLegislatura {
  NumeroLegislatura?: string;
  DataInicio?: string;
  DataFim?: string;
}

interface SenadoSuplente {
  DescricaoParticipacao?: string;
  NomeParlamentar?: string;
}

interface SenadoExercicio {
  DataInicio?: string;
  DataFim?: string;
  DescricaoCausaAfastamento?: string;
}

interface SenadoMandato {
  CodigoMandato?: string;
  UfParlamentar?: string;
  PrimeiraLegislaturaDoMandato?: SenadoLegislatura;
  SegundaLegislaturaDoMandato?: SenadoLegislatura;
  DescricaoParticipacao?: string;
  Suplentes?: {
    Suplente?: SenadoSuplente | SenadoSuplente[];
  };
  Exercicios?: {
    Exercicio?: SenadoExercicio | SenadoExercicio[];
  };
}

interface SenadoParlamentarLista {
  IdentificacaoParlamentar?: SenadoIdentificacao;
  Mandato?: SenadoMandato;
}

interface SenadoDetalheParlamentar {
  IdentificacaoParlamentar?: SenadoIdentificacao;
  DadosBasicosParlamentar?: {
    DataNascimento?: string;
    Naturalidade?: string;
    UfNaturalidade?: string;
    EnderecoParlamentar?: string;
  };
  Telefones?: {
    Telefone?: SenadoTelefone | SenadoTelefone[];
  };
  OutrasInformacoes?: {
    Servico?: SenadoServico | SenadoServico[];
  };
}

interface SenadoComissao {
  IdentificacaoComissao?: {
    SiglaComissao?: string;
    NomeComissao?: string;
    SiglaCasaComissao?: string;
  };
  DescricaoParticipacao?: string;
  DataInicio?: string;
  DataFim?: string;
}

interface SenadoCargo {
  IdentificacaoComissao?: {
    SiglaComissao?: string;
    NomeComissao?: string;
    SiglaCasaComissao?: string;
  };
  DescricaoCargo?: string;
  DataInicio?: string;
  DataFim?: string;
}

interface SenadoVotacao {
  SessaoPlenaria?: {
    DataSessao?: string;
    NumeroSessao?: string;
  };
  Materia?: {
    DescricaoIdentificacao?: string;
    Ementa?: string;
  };
  DescricaoVotacao?: string;
  DescricaoResultado?: string;
  SiglaDescricaoVoto?: string;
  TotalVotosSim?: string;
  TotalVotosNao?: string;
  TotalVotosAbstencao?: string;
}

interface SenadoAutoria {
  Materia?: {
    DescricaoIdentificacao?: string;
    Ementa?: string;
    Data?: string;
  };
  IndicadorAutorPrincipal?: string;
}

interface SenadoFiliacao {
  Partido?: {
    SiglaPartido?: string;
    NomePartido?: string;
  };
  DataFiliacao?: string;
  DataDesfiliacao?: string;
}

function toArray<T>(value?: T | T[] | null): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function compact<T>(values: Array<T | null | undefined | false>): T[] {
  return values.filter(Boolean) as T[];
}

async function fetchSenado<T>(path: string): Promise<T> {
  const response = await fetch(`${SENADO_API_ROOT}${path}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar a API do Senado: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function fetchSenadoSafe<T>(path: string): Promise<T | null> {
  try {
    return await fetchSenado<T>(path);
  } catch {
    return null;
  }
}

function normalizeSenador(parlamentar: SenadoParlamentarLista): PerfilPublico {
  const info = parlamentar.IdentificacaoParlamentar ?? {};

  return {
    id: `senado-${info.CodigoParlamentar ?? info.CodigoPublicoNaLegAtual ?? ''}`,
    idOrigem: String(info.CodigoParlamentar ?? info.CodigoPublicoNaLegAtual ?? ''),
    nome_urna: info.NomeParlamentar ?? 'Sem nome',
    partido: info.SiglaPartidoParlamentar ?? '--',
    uf: info.UfParlamentar ?? '',
    cargo: 'Senador',
    foto_url: info.UrlFotoParlamentar ?? '',
    casa: 'Senado Federal',
    fonte: 'senado',
    fonteUrl:
      info.UrlPaginaParlamentar ??
      `${SENADO_API_ROOT}/senador/lista/atual`,
  };
}

const fetchSenadoresListaAtual = cache(async (): Promise<SenadoParlamentarLista[]> => {
  const payload = await fetchSenado<{
    ListaParlamentarEmExercicio?: {
      Metadados?: { Versao?: string };
      Parlamentares?: {
        Parlamentar?: SenadoParlamentarLista[];
      };
    };
  }>('/senador/lista/atual.json');

  return payload.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar ?? [];
});

function mapMandato(mandato: SenadoMandato): PerfilItemLista {
  const legislaturas = compact([
    mandato.PrimeiraLegislaturaDoMandato?.NumeroLegislatura
      ? `Legislatura ${mandato.PrimeiraLegislaturaDoMandato.NumeroLegislatura}`
      : null,
    mandato.SegundaLegislaturaDoMandato?.NumeroLegislatura
      ? `Legislatura ${mandato.SegundaLegislaturaDoMandato.NumeroLegislatura}`
      : null,
  ]).join(' • ');

  const suplentes = toArray(mandato.Suplentes?.Suplente)
    .map((suplente) =>
      compact([
        suplente.DescricaoParticipacao ?? null,
        suplente.NomeParlamentar ?? null,
      ]).join(': '),
    )
    .filter(Boolean)
    .join(' | ');

  return {
    titulo: legislaturas || 'Mandato no Senado',
    descricao: compact([
      mandato.DescricaoParticipacao ?? null,
      mandato.UfParlamentar ? `Mandato pela UF ${mandato.UfParlamentar}` : null,
      suplentes ? `Suplência: ${suplentes}` : null,
    ]).join(' • '),
    data: mandato.PrimeiraLegislaturaDoMandato?.DataInicio ?? undefined,
    destaque: mandato.DescricaoParticipacao ?? undefined,
  };
}

function mapComissao(comissao: SenadoComissao): PerfilItemLista {
  return {
    titulo:
      comissao.IdentificacaoComissao?.SiglaComissao ??
      comissao.IdentificacaoComissao?.NomeComissao ??
      'Comissão',
    descricao:
      comissao.IdentificacaoComissao?.NomeComissao ??
      'Comissão sem nome informado.',
    detalhe: compact([
      comissao.DescricaoParticipacao ?? null,
      comissao.IdentificacaoComissao?.SiglaCasaComissao ?? null,
    ]).join(' • '),
    data: comissao.DataInicio ?? undefined,
  };
}

function mapCargo(cargo: SenadoCargo): PerfilItemLista {
  return {
    titulo: cargo.DescricaoCargo ?? 'Cargo parlamentar',
    descricao:
      cargo.IdentificacaoComissao?.NomeComissao ??
      cargo.IdentificacaoComissao?.SiglaComissao ??
      'Órgão não informado',
    detalhe: compact([
      cargo.IdentificacaoComissao?.SiglaComissao ?? null,
      cargo.IdentificacaoComissao?.SiglaCasaComissao ?? null,
    ]).join(' • '),
    data: cargo.DataInicio ?? undefined,
  };
}

function mapVotacao(votacao: SenadoVotacao): PerfilItemLista {
  return {
    titulo:
      votacao.Materia?.DescricaoIdentificacao ??
      votacao.DescricaoVotacao ??
      'Votação nominal',
    descricao:
      votacao.DescricaoVotacao ??
      votacao.Materia?.Ementa ??
      'Votação retornada pela API oficial do Senado.',
    detalhe: compact([
      votacao.DescricaoResultado ?? null,
      votacao.SiglaDescricaoVoto ?? null,
      votacao.TotalVotosSim ? `Sim ${votacao.TotalVotosSim}` : null,
      votacao.TotalVotosNao ? `Não ${votacao.TotalVotosNao}` : null,
      votacao.TotalVotosAbstencao ? `Abstenção ${votacao.TotalVotosAbstencao}` : null,
    ]).join(' • '),
    data: votacao.SessaoPlenaria?.DataSessao ?? undefined,
    destaque: votacao.SiglaDescricaoVoto ?? undefined,
  };
}

function mapAutoria(autoria: SenadoAutoria): PerfilItemLista {
  return {
    titulo:
      autoria.Materia?.DescricaoIdentificacao ??
      'Matéria de autoria',
    descricao:
      autoria.Materia?.Ementa ??
      'Matéria legislativa retornada pela API oficial do Senado.',
    data: autoria.Materia?.Data ?? undefined,
    destaque:
      autoria.IndicadorAutorPrincipal === 'Sim'
        ? 'Autor principal'
        : autoria.IndicadorAutorPrincipal === 'Não'
          ? 'Coautoria'
          : undefined,
  };
}

function mapFiliacao(filiacao: SenadoFiliacao): PerfilItemLista {
  return {
    titulo:
      filiacao.Partido?.SiglaPartido ??
      filiacao.Partido?.NomePartido ??
      'Partido',
    descricao: filiacao.Partido?.NomePartido ?? 'Filiação partidária registrada.',
    detalhe:
      filiacao.DataDesfiliacao
        ? `Desfiliação em ${filiacao.DataDesfiliacao}`
        : 'Filiação sem data de desligamento informada.',
    data: filiacao.DataFiliacao ?? undefined,
  };
}

export const fetchSenadores = cache(async (): Promise<PerfilPublico[]> => {
  const parlamentares = await fetchSenadoresListaAtual();
  return parlamentares.map(normalizeSenador);
});

export const fetchSenadorDetalhado = cache(
  async (id: string): Promise<PerfilDetalhadoPublico | null> => {
    const parlamentaresAtuais = await fetchSenadoresListaAtual();
    const parlamentarAtual = parlamentaresAtuais.find(
      (item) =>
        item.IdentificacaoParlamentar?.CodigoParlamentar === id ||
        item.IdentificacaoParlamentar?.CodigoPublicoNaLegAtual === id,
    );

    const [
      detalhePayload,
      mandatosPayload,
      comissoesPayload,
      cargosPayload,
      votacoesPayload,
      autoriasPayload,
      filiacoesPayload,
    ] = await Promise.all([
      fetchSenadoSafe<{
        DetalheParlamentar?: {
          Metadados?: { Versao?: string };
          Parlamentar?: SenadoDetalheParlamentar;
        };
      }>(`/senador/${id}.json`),
      fetchSenadoSafe<{
        MandatoParlamentar?: {
          Parlamentar?: {
            Mandatos?: {
              Mandato?: SenadoMandato[];
            };
          };
        };
      }>(`/senador/${id}/mandatos.json`),
      fetchSenadoSafe<{
        MembroComissaoParlamentar?: {
          Parlamentar?: {
            MembroComissoes?: {
              Comissao?: SenadoComissao[];
            };
          };
        };
      }>(`/senador/${id}/comissoes.json?indAtivos=S`),
      fetchSenadoSafe<{
        CargoParlamentar?: {
          Parlamentar?: {
            Cargos?: {
              Cargo?: SenadoCargo[];
            };
          };
        };
      }>(`/senador/${id}/cargos.json?indAtivos=S`),
      fetchSenadoSafe<{
        VotacaoParlamentar?: {
          Metadados?: {
            Descontinuacao?: {
              DataDesativacaoCompleta?: string;
              UrlServicoSubstituto?: string;
            };
          };
          Parlamentar?: {
            Votacoes?: {
              Votacao?: SenadoVotacao[];
            };
          };
        };
      }>(`/senador/${id}/votacoes.json`),
      fetchSenadoSafe<{
        MateriasAutoriaParlamentar?: {
          Parlamentar?: {
            Autorias?: {
              Autoria?: SenadoAutoria[];
            };
          };
        };
      }>(`/senador/${id}/autorias.json`),
      fetchSenadoSafe<{
        FiliacaoParlamentar?: {
          Parlamentar?: {
            Filiacoes?: {
              Filiacao?: SenadoFiliacao[];
            };
          };
        };
      }>(`/senador/${id}/filiacoes.json`),
    ]);

    const detalhe = detalhePayload?.DetalheParlamentar?.Parlamentar;
    const identificacao = detalhe?.IdentificacaoParlamentar ?? parlamentarAtual?.IdentificacaoParlamentar;

    if (!identificacao?.CodigoParlamentar && !identificacao?.CodigoPublicoNaLegAtual) {
      return null;
    }

    const perfilBase = normalizeSenador({
      IdentificacaoParlamentar: identificacao,
      Mandato: parlamentarAtual?.Mandato,
    });

    const dadosBasicos = detalhe?.DadosBasicosParlamentar;
    const naturalidade = compact([
      dadosBasicos?.Naturalidade ?? null,
      dadosBasicos?.UfNaturalidade ?? null,
    ]).join(' - ');
    const telefones = toArray(detalhe?.Telefones?.Telefone)
      .map((telefone) => telefone.NumeroTelefone)
      .filter((value): value is string => Boolean(value));
    const mandatoAtual = parlamentarAtual?.Mandato;
    const bloco = identificacao.Bloco?.NomeApelido || identificacao.Bloco?.NomeBloco || null;
    const servicos = toArray(detalhe?.OutrasInformacoes?.Servico);
    const votosMeta = votacoesPayload?.VotacaoParlamentar?.Metadados?.Descontinuacao;

    return {
      ...perfilBase,
      nomeCompleto: identificacao.NomeCompletoParlamentar ?? null,
      sexo: identificacao.SexoParlamentar ?? null,
      email: identificacao.EmailParlamentar ?? null,
      telefones,
      dataNascimento: dadosBasicos?.DataNascimento ?? null,
      naturalidade: naturalidade || null,
      escolaridade: null,
      situacao: 'Em exercício',
      condicaoMandato: mandatoAtual?.DescricaoParticipacao ?? null,
      gabinete: dadosBasicos?.EnderecoParlamentar ?? null,
      sitePessoal: identificacao.UrlPaginaParticular ?? null,
      redesSociais: [],
      atualizadoEm: detalhePayload?.DetalheParlamentar?.Metadados?.Versao ?? null,
      fatos: compact([
        { label: 'Cargo', value: 'Senador' },
        perfilBase.partido ? { label: 'Partido', value: perfilBase.partido } : null,
        perfilBase.uf ? { label: 'UF', value: perfilBase.uf } : null,
        mandatoAtual?.DescricaoParticipacao
          ? { label: 'Participação no mandato', value: mandatoAtual.DescricaoParticipacao }
          : null,
        bloco ? { label: 'Bloco', value: bloco } : null,
        identificacao.MembroMesa === 'Sim'
          ? { label: 'Mesa Diretora', value: 'Integra a Mesa' }
          : null,
        identificacao.MembroLideranca === 'Sim'
          ? { label: 'Liderança', value: 'Exerce função de liderança' }
          : null,
        dadosBasicos?.EnderecoParlamentar
          ? { label: 'Gabinete', value: dadosBasicos.EnderecoParlamentar }
          : null,
      ]),
      mandatos: compact([
        mandatoAtual ? mapMandato(mandatoAtual) : null,
        ...toArray(mandatosPayload?.MandatoParlamentar?.Parlamentar?.Mandatos?.Mandato)
          .slice(0, 5)
          .map(mapMandato),
      ]).filter(
        (item, index, array) =>
          array.findIndex(
            (candidate) =>
              candidate.titulo === item.titulo &&
              candidate.descricao === item.descricao &&
              candidate.data === item.data,
          ) === index,
      ),
      comissoes: toArray(
        comissoesPayload?.MembroComissaoParlamentar?.Parlamentar?.MembroComissoes?.Comissao,
      )
        .slice(0, 8)
        .map(mapComissao),
      cargos: toArray(cargosPayload?.CargoParlamentar?.Parlamentar?.Cargos?.Cargo)
        .slice(0, 8)
        .map(mapCargo),
      votacoes: toArray(votacoesPayload?.VotacaoParlamentar?.Parlamentar?.Votacoes?.Votacao)
        .slice(0, 6)
        .map(mapVotacao),
      despesas: [],
      autorias: toArray(
        autoriasPayload?.MateriasAutoriaParlamentar?.Parlamentar?.Autorias?.Autoria,
      )
        .slice(0, 6)
        .map(mapAutoria),
      filiacoes: toArray(
        filiacoesPayload?.FiliacaoParlamentar?.Parlamentar?.Filiacoes?.Filiacao,
      )
        .slice(0, 6)
        .map(mapFiliacao),
      linksOficiais: compact([
        { label: 'Perfil oficial do Senado', href: perfilBase.fonteUrl },
        { label: 'Serviço de detalhe aberto', href: `${SENADO_API_ROOT}/senador/${id}.json` },
        identificacao.UrlPaginaParticular
          ? { label: 'Página pessoal informada', href: identificacao.UrlPaginaParticular }
          : null,
        ...servicos
          .filter((servico) =>
            ['MandatoParlamentar', 'MembroComissaoParlamentar', 'VotacaoParlamentar'].includes(
              servico.NomeServico ?? '',
            ),
          )
          .map((servico) => ({
            label: servico.NomeServico ?? 'Serviço relacionado',
            href: servico.UrlServico ?? '',
          }))
          .filter((servico) => Boolean(servico.href)),
      ]),
      notas: compact([
        'Comissões, cargos, autorias e filiações são exibidos a partir de serviços oficiais do Senado Federal.',
        votosMeta?.DataDesativacaoCompleta
          ? `O serviço legado de votações do Senado informa desativação completa em ${votosMeta.DataDesativacaoCompleta}, mas ainda retornou dados nesta consulta.`
          : null,
        votosMeta?.UrlServicoSubstituto
          ? `O próprio Senado aponta um serviço substituto para votações: ${votosMeta.UrlServicoSubstituto}.`
          : null,
        'Dados judiciais e reputacionais não são inferidos automaticamente nesta página.',
      ]),
    };
  },
);
