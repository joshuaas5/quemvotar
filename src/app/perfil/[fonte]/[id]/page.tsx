import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getCasaBadge, getFonteBadge, getPerfilDetalhado } from '@/lib/api';
import type { PerfilDetalhadoPublico, PerfilItemLista } from '@/lib/official';

export const dynamic = 'force-dynamic';

function formatDate(value?: string | null) {
  if (!value) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
    }
  }

  return value;
}

function formatNumber(value?: number | null) {
  if (typeof value !== 'number') {
    return null;
  }

  return new Intl.NumberFormat('pt-BR').format(value);
}

function formatScore(value?: number | null) {
  if (typeof value !== 'number') {
    return null;
  }

  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatPercent(value?: number | null) {
  if (typeof value !== 'number') {
    return null;
  }

  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%`;
}

function renderListSection(
  title: string,
  description: string,
  items: PerfilItemLista[],
  emptyText: string,
) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-4xl uppercase">{title}</h2>
        <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">{description}</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-body font-bold">{emptyText}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <article
              key={`${title}-${item.titulo}-${item.data ?? index}`}
              className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-2xl">
                    {item.data ? (
                      <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                        {formatDate(item.data)}
                      </p>
                    ) : null}
                    <h3 className="font-headline font-black text-2xl uppercase leading-tight">
                      {item.titulo}
                    </h3>
                  </div>
                  {item.destaque ? (
                    <span className="bg-primary-container border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                      {item.destaque}
                    </span>
                  ) : null}
                </div>

                {item.descricao ? <p className="font-body font-medium">{item.descricao}</p> : null}
                {item.detalhe ? (
                  <p className="font-label font-bold uppercase text-xs opacity-70">{item.detalhe}</p>
                ) : null}

                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-headline font-black uppercase border-b-4 border-black w-max"
                  >
                    Ver página oficial
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function renderSobreSection(perfil: PerfilDetalhadoPublico) {
  const detalhes = [
    { label: 'Nome completo', value: perfil.nomeCompleto },
    { label: 'Nascimento', value: formatDate(perfil.dataNascimento) },
    { label: 'Naturalidade', value: perfil.naturalidade },
    { label: 'Sexo', value: perfil.sexo },
    { label: 'E-mail institucional', value: perfil.email },
    {
      label: 'Telefones oficiais',
      value: perfil.telefones.length > 0 ? perfil.telefones.join(' • ') : null,
    },
    { label: 'Gabinete', value: perfil.gabinete },
    { label: 'Escolaridade', value: perfil.escolaridade },
    { label: 'Site pessoal', value: perfil.sitePessoal },
  ].filter((item) => Boolean(item.value));

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-4xl uppercase">Raio-X Oficial</h2>
        <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">
          Identificação, contato e dados biográficos retornados pelas fontes oficiais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {detalhes.map((item) => (
          <article
            key={item.label}
            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">{item.label}</p>
            <p className="font-body font-bold text-lg break-words">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function renderIndicadoresSection(perfil: PerfilDetalhadoPublico) {
  const cards = [];

  if (typeof perfil.autoriasTotal === 'number') {
    cards.push({
      title: 'Autorias localizadas',
      value: formatNumber(perfil.autoriasTotal),
      helper: 'Projetos, requerimentos e matérias localizados nesta fonte.',
      href: undefined,
    });
  }

  if (
    typeof perfil.autoriasAprovadas === 'number' &&
    typeof perfil.autoriasAmostraAnalisada === 'number'
  ) {
    cards.push({
      title: 'Aprovações identificadas',
      value: formatNumber(perfil.autoriasAprovadas),
      helper: `Confirmadas nas últimas ${perfil.autoriasAmostraAnalisada} matérias analisadas.`,
      href: undefined,
    });
  }

  if (perfil.ranking) {
    cards.push({
      title: 'Nota do Ranking dos Políticos',
      value: formatScore(perfil.ranking.nota),
      helper: [
        perfil.ranking.rankingGeral ? `Geral: #${perfil.ranking.rankingGeral}` : null,
        perfil.ranking.rankingCasa ? `Na casa: #${perfil.ranking.rankingCasa}` : null,
        perfil.ranking.rankingEstado ? `No estado: #${perfil.ranking.rankingEstado}` : null,
      ]
        .filter(Boolean)
        .join(' • '),
      href: perfil.ranking.fonteUrl,
    });
  }

  if (perfil.governismo) {
    cards.push({
      title: 'Alinhamento com o governo',
      value: formatPercent(perfil.governismo.percentualFavoravel),
      helper: `${formatNumber(perfil.governismo.votosFavoraveis)} votos favoráveis em ${formatNumber(
        perfil.governismo.votosConsiderados,
      )} votos considerados.`,
      href: perfil.governismo.fonteUrl,
    });
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-4xl uppercase">Indicadores</h2>
        <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">
          Leitura rápida da atuação, da produção legislativa e dos índices públicos disponíveis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <article
            key={card.title}
            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">{card.title}</p>
            <p className="font-headline font-black text-4xl">{card.value}</p>
            {card.helper ? <p className="font-body font-medium mt-3">{card.helper}</p> : null}
            {card.href ? (
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 font-headline font-black uppercase border-b-4 border-black"
              >
                Ver fonte
              </a>
            ) : null}
          </article>
        ))}
      </div>

      {perfil.ranking?.anos.length ? (
        <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-label font-bold uppercase text-xs opacity-70 mb-4">
            Evolução anual da nota
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {perfil.ranking.anos.map((ano) => (
              <article key={ano.ano} className="border-4 border-black p-4 bg-surface-container-low">
                <p className="font-headline font-black text-2xl">{ano.ano}</p>
                <p className="font-body font-bold mt-1">Nota {formatScore(ano.pontuacao)}</p>
                <p className="font-label font-bold uppercase text-xs opacity-70 mt-3">
                  {[
                    typeof ano.votacoes === 'number' ? `Votações ${formatScore(ano.votacoes)}` : null,
                    typeof ano.presenca === 'number' ? `Presença ${formatScore(ano.presenca)}` : null,
                  ]
                    .filter(Boolean)
                    .join(' • ')}
                </p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default async function PerfilPage({
  params,
}: {
  params: Promise<{ fonte: string; id: string }>;
}) {
  const { fonte, id } = await params;

  if (fonte !== 'camara' && fonte !== 'senado') {
    notFound();
  }

  const perfil = await getPerfilDetalhado(fonte, id);

  if (!perfil) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <Link
            href="/parlamentares"
            className="inline-block font-headline font-black uppercase text-lg border-b-4 border-black"
          >
            Voltar para parlamentares
          </Link>

          <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="bg-surface-container-high border-b-4 lg:border-b-0 lg:border-r-4 border-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={perfil.foto_url || 'https://fakeimg.pl/640x640?text=Sem+Foto'}
                  alt={perfil.nome_urna}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-8 lg:p-10 space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className="bg-secondary-fixed text-on-secondary-fixed border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                    {getCasaBadge(perfil)}
                  </span>
                  <span className="bg-white border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                    {getFonteBadge(perfil)}
                  </span>
                  {perfil.situacao ? (
                    <span className="bg-primary-container border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                      {perfil.situacao}
                    </span>
                  ) : null}
                </div>

                <div>
                  <p className="font-label font-bold uppercase text-sm opacity-70 mb-2">
                    {perfil.partido} {perfil.uf ? `• ${perfil.uf}` : ''} • {perfil.cargo}
                  </p>
                  <h1 className="font-headline font-black text-5xl md:text-7xl uppercase leading-none">
                    {perfil.nome_urna}
                  </h1>
                  <p className="font-body font-bold text-lg mt-4 max-w-3xl">
                    Perfil montado com dados das fontes oficiais do Congresso e indicadores públicos auditáveis.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {perfil.fatos.slice(0, 8).map((fato) => (
                    <article
                      key={`${fato.label}-${fato.value}`}
                      className="border-4 border-black p-4 bg-surface-container-low"
                    >
                      <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                        {fato.label}
                      </p>
                      <p className="font-body font-bold">{fato.value}</p>
                    </article>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {perfil.linksOficiais.slice(0, 6).map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-headline font-black uppercase border-b-4 border-black"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {perfil.atualizadoEm ? (
                  <p className="font-label font-bold uppercase text-xs opacity-70">
                    Atualização informada pela fonte: {formatDate(perfil.atualizadoEm) ?? perfil.atualizadoEm}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {renderSobreSection(perfil)}
          {renderIndicadoresSection(perfil)}

          {renderListSection(
            'Mandato',
            'Mandato atual e histórico retornados pelas fontes oficiais.',
            perfil.mandatos,
            'A fonte não retornou mais registros de mandato para este perfil nesta consulta.',
          )}

          {renderListSection(
            'Projetos e Requerimentos',
            'Matérias e autorias legislativas localizadas para este parlamentar.',
            perfil.autorias,
            'A fonte não retornou autorias recentes nesta consulta.',
          )}

          {renderListSection(
            'Votações Recentes',
            'Votos nominais e deliberações localizadas nas fontes consultadas.',
            perfil.votacoes,
            'A fonte não retornou votações recentes para este perfil nesta consulta.',
          )}

          {renderListSection(
            'Comissões',
            'Participações em comissões e frentes oficiais.',
            perfil.comissoes,
            'A fonte não retornou comissões ativas para este perfil nesta consulta.',
          )}

          {renderListSection(
            'Cargos',
            'Cargos institucionais publicados pela casa legislativa correspondente.',
            perfil.cargos,
            'A fonte não retornou cargos ativos para este perfil nesta consulta.',
          )}

          {renderListSection(
            perfil.fonte === 'camara' ? 'Despesas Recentes' : 'Histórico Partidário',
            perfil.fonte === 'camara'
              ? 'Despesas recentes da cota parlamentar retornadas pela Câmara dos Deputados.'
              : 'Filiações partidárias históricas retornadas pelo Senado Federal.',
            perfil.fonte === 'camara' ? perfil.despesas : perfil.filiacoes,
            perfil.fonte === 'camara'
              ? 'A Câmara não retornou despesas recentes para este perfil nesta consulta.'
              : 'O Senado não retornou histórico partidário para este perfil nesta consulta.',
          )}

          <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-3xl uppercase mb-4">
              Fontes Desta Página
            </h2>
            <p className="font-body font-medium mb-6">
              Este perfil reúne dados publicados pela Câmara dos Deputados, pelo Senado Federal e,
              quando disponível, por índices públicos de acompanhamento legislativo.
            </p>
            <div className="space-y-3">
              {perfil.linksOficiais.map((link) => (
                <a
                  key={`${link.label}-${link.href}-full`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-headline font-black uppercase border-b-4 border-black w-max"
                >
                  {link.label}
                </a>
              ))}
              {perfil.ranking ? (
                <a
                  href={perfil.ranking.fonteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-headline font-black uppercase border-b-4 border-black w-max"
                >
                  Ranking dos Políticos
                </a>
              ) : null}
              {perfil.governismo ? (
                <a
                  href={perfil.governismo.fonteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-headline font-black uppercase border-b-4 border-black w-max"
                >
                  Radar do Congresso
                </a>
              ) : null}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
