import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getPartidoPorSigla, getPerfilDetalhado } from '@/lib/api';
import type { PartidoResumo, PerfilDetalhadoPublico, PerfilItemLista } from '@/lib/official';

export const revalidate = 1800;

function formatDate(value?: string | null) {
  if (!value) return null;

  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
    }
  }

  return value;
}

function formatNumber(value?: number | null) {
  if (typeof value !== 'number') return null;
  return new Intl.NumberFormat('pt-BR').format(value);
}

function formatScore(value?: number | null) {
  if (typeof value !== 'number') return null;
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatPercent(value?: number | null) {
  if (typeof value !== 'number') return null;
  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%`;
}


function getParliamentSalaryLabel(fonte: PerfilDetalhadoPublico['fonte']) {
  return {
    value: 'R$ 46.366,19',
    helper: 'Salário bruto por lei.',
    auxilios: fonte === 'camara' ? '+ até R$ 160 mil mensais em verba de gabinete e auxílios.' : '+ até R$ 130 mil mensais em verba de gabinete e auxílios.',
  };
}


function renderListSection(title: string, description: string, items: PerfilItemLista[], emptyText: string) {
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
      value: perfil.telefones.length > 0 ? perfil.telefones.join(' / ') : null,
    },
    { label: 'Gabinete', value: perfil.gabinete },
    { label: 'Escolaridade', value: perfil.escolaridade },
    { label: 'Site pessoal', value: perfil.sitePessoal },
  ].filter((item) => Boolean(item.value));

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-4xl uppercase">Informações oficiais</h2>
        <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">
          Dados biográficos e de contato publicados pelas casas legislativas.
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

function renderTopCards(perfil: PerfilDetalhadoPublico, partido: PartidoResumo | null) {
  const cards = [
    {
      title: 'Nota (Ranking dos Políticos)',
      value: perfil.ranking ? formatScore(perfil.ranking.nota) : '-',
      helper: perfil.ranking?.rankingGeral
        ? `Ranking geral #${perfil.ranking.rankingGeral}`
        : 'Sem nota pública localizada',
      href: perfil.ranking?.fonteUrl,
      bg: 'bg-[#ffe066]',
    },
    {
      title: 'Presença',
      value: perfil.presenca ? formatPercent(perfil.presenca.percentual) : '-',
      helper: perfil.presenca
        ? `${perfil.presenca.presencas}/${perfil.presenca.sessoesDeliberativas} sessões no ano ${perfil.presenca.ano}`
        : 'Sem série de presença localizada',
      href: perfil.presenca?.fonteUrl,
      bg: 'bg-[#9bf6ff]',
    },
    {
      title: 'Alinhamento',
      value: perfil.governismo ? formatPercent(perfil.governismo.percentualFavoravel) : '-',
      helper: perfil.governismo
        ? 'Percentual de apoio ao governo nas votações monitoradas'
        : 'Sem série localizada',
      href: perfil.governismo?.fonteUrl,
      bg: 'bg-[#ffd6a5]',
    },
    {
      title: 'Campo político',
      value: perfil.espectro?.label ?? partido?.espectro ?? '-',
      helper: partido?.familiaPolitica ?? 'Sem classificação aproximada disponível',
      href: partido ? `/partidos/${partido.sigla}` : undefined,
      bg: 'bg-[#caffbf]',
    },
    {
      title: 'Partido',
      value: partido?.sigla ?? perfil.partido,
      helper: partido?.nome ?? perfil.partido,
      href: partido ? `/partidos/${partido.sigla}` : undefined,
      bg: 'bg-[#ffc6ff]',
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
      {cards.map((card) => (
        <article
          key={card.title}
          className={`${card.bg} border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
        >
          <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">{card.title}</p>
          <p className="font-headline font-black text-4xl leading-none">{card.value}</p>
          <p className="font-body font-bold mt-3">{card.helper}</p>
          {card.href ? (
            card.href.startsWith('/') ? (
              <Link
                href={card.href}
                className="inline-block mt-4 font-headline font-black uppercase border-b-4 border-black"
              >
                Abrir
              </Link>
            ) : (
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 font-headline font-black uppercase border-b-4 border-black"
              >
                Ver fonte
              </a>
            )
          ) : null}
        </article>
      ))}
    </section>
  );
}

function renderCampoPoliticoSection(perfil: PerfilDetalhadoPublico, partido: PartidoResumo | null) {
  const espectro = perfil.espectro?.label ?? partido?.espectro;
  const familia = partido?.familiaPolitica;

  if (!espectro && !familia) {
    return null;
  }

  return (
    <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="font-headline font-black text-3xl uppercase mb-4">Campo político</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article className="border-4 border-black p-5 bg-surface-container-low">
          <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Posição aproximada</p>
          <p className="font-body font-bold text-2xl">{espectro ?? 'Não localizada'}</p>
          {familia ? <p className="font-body font-medium mt-3">{familia}</p> : null}
        </article>

        <article className="border-4 border-black p-5 bg-surface-container-low">
          <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">O que isso quer dizer</p>
          <p className="font-body font-medium">
            Esta é uma leitura aproximada do posicionamento político, combinando o partido atual e
            os votos públicos que conseguimos localizar. Não é teste de personalidade nem apoio do
            site ao parlamentar.
          </p>
        </article>
      </div>
    </section>
  );
}

function renderTemaSection(perfil: PerfilDetalhadoPublico) {
  if (!perfil.temasVotacao.length) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-4xl uppercase">Como vota nos temas que pesam</h2>
        <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">
          Resumo das votações recentes agrupadas por assunto para ficar fácil de entender.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {perfil.temasVotacao.map((tema, index) => (
          <article
            key={`${tema.titulo}-${index}`}
            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <p className="font-headline font-black text-2xl uppercase leading-tight">{tema.titulo}</p>
            {tema.data ? (
              <p className="font-label font-bold uppercase text-xs opacity-70 mt-2">
                {formatDate(tema.data)}
              </p>
            ) : null}
            {tema.destaque ? <p className="font-body font-bold mt-4">{tema.destaque}</p> : null}
            {tema.detalhe ? (
              <p className="font-label font-bold uppercase text-xs opacity-70 mt-3">{tema.detalhe}</p>
            ) : null}
            {tema.descricao ? <p className="font-body font-medium mt-4">{tema.descricao}</p> : null}
            {tema.href ? (
              <a
                href={tema.href}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 font-headline font-black uppercase border-b-4 border-black"
              >
                Ver matéria
              </a>
            ) : null}
          </article>
        ))}
      </div>
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

  const partido = await getPartidoPorSigla(perfil.partido);
  const cores = partido?.cores ?? ['#111827', '#d1d5db'];

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

          <section
            className="relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${cores[0]} 0%, ${cores[1]} 100%)`,
            }}
          >
            <div className="absolute right-4 top-4 md:right-6 md:top-6 bg-black text-white border-4 border-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.35)] text-right max-w-[240px] z-10">
              <p className="font-label font-bold uppercase text-[10px] tracking-[0.2em] opacity-80">
                Salário mensal bruto
              </p>
              <p className="font-headline font-black text-2xl leading-none mt-1">{getParliamentSalaryLabel(perfil.fonte).value}</p>
              <p className="font-body font-bold text-[11px] mt-2 leading-tight">{getParliamentSalaryLabel(perfil.fonte).helper}</p>
              <div className="bg-white/30 h-[2px] w-full my-2"></div>
              <p className="font-body text-[10px] leading-tight opacity-90">{getParliamentSalaryLabel(perfil.fonte).auxilios}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="bg-white/20 border-b-4 lg:border-b-0 lg:border-r-4 border-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={perfil.foto_url || 'https://fakeimg.pl/640x640?text=Sem+Foto'}
                  alt={perfil.nome_urna}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-8 lg:p-10 space-y-6 text-white">
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white text-black border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                    {perfil.casa}
                  </span>
                  {perfil.situacao ? (
                    <span className="bg-black text-white border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                      {perfil.situacao}
                    </span>
                  ) : null}
                  {partido?.espectro ? (
                    <span className="bg-white/90 text-black border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                      {partido.espectro}
                    </span>
                  ) : null}
                </div>

                <div>
                  <p className="font-label font-bold uppercase text-sm opacity-90 mb-2">
                    {[perfil.partido, perfil.uf, perfil.cargo].filter(Boolean).join(' / ')}
                  </p>
                  <h1 className="font-headline font-black text-5xl md:text-7xl uppercase leading-none">
                    {perfil.nome_urna}
                  </h1>
                  <p className="font-body font-bold text-lg mt-4 max-w-3xl">
                    {perfil.biografia ? perfil.biografia : "O que mais importa para decidir voto vem primeiro: nota pública, presença, alinhamento, partido e temas em que mais vota."}
                  </p>
                </div>

                {partido ? (
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/partidos/${partido.sigla}`}
                      className="font-headline font-black uppercase border-b-4 border-white"
                    >
                      Ver partido
                    </Link>
                    {partido.siteOficial ? (
                      <a
                        href={partido.siteOficial}
                        target="_blank"
                        rel="noreferrer"
                        className="font-headline font-black uppercase border-b-4 border-white"
                      >
                        Site oficial do partido
                      </a>
                    ) : null}
                  </div>
                ) : null}

                {perfil.atualizadoEm ? (
                  <p className="font-label font-bold uppercase text-xs opacity-80">
                    Atualização informada pela fonte: {formatDate(perfil.atualizadoEm) ?? perfil.atualizadoEm}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {renderTopCards(perfil, partido)}
          {renderCampoPoliticoSection(perfil, partido)}
          {renderTemaSection(perfil)}

          {partido?.definicaoCurta ? (
            <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-headline font-black text-3xl uppercase mb-3">Partido e posicionamento</h2>
              <p className="font-body font-medium">{partido.definicaoCurta}</p>
              <div className="flex flex-wrap gap-4 mt-5">
                {partido.familiaPolitica ? (
                  <span className="border-2 border-black px-3 py-1 font-label font-bold uppercase text-xs">
                    {partido.familiaPolitica}
                  </span>
                ) : null}
                {partido.espectro ? (
                  <span className="border-2 border-black px-3 py-1 font-label font-bold uppercase text-xs">
                    {partido.espectro}
                  </span>
                ) : null}
                {partido.presidenteNacional ? (
                  <span className="border-2 border-black px-3 py-1 font-label font-bold uppercase text-xs">
                    Presidência nacional: {partido.presidenteNacional}
                  </span>
                ) : null}
              </div>
            </section>
          ) : null}

          {renderListSection(
            'Projetos e requerimentos',
            'Matérias e autorias legislativas localizadas para este parlamentar.',
            perfil.autorias,
            'A fonte não retornou autorias recentes nesta consulta.',
          )}

          {renderListSection(
            'Votações recentes',
            'Votos nominais e deliberações localizadas nas fontes consultadas.',
            perfil.votacoes,
            'A fonte não retornou votações recentes para este perfil nesta consulta.',
          )}

          {renderListSection(
            'Mandato',
            'Mandato atual e histórico retornados pelas fontes oficiais.',
            perfil.mandatos,
            'A fonte não retornou mais registros de mandato para este perfil nesta consulta.',
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
            perfil.fonte === 'camara' ? 'Despesas recentes' : 'Histórico partidário',
            perfil.fonte === 'camara'
              ? 'Despesas recentes da cota parlamentar retornadas pela Câmara dos Deputados.'
              : 'Filiações partidárias históricas retornadas pelo Senado Federal.',
            perfil.fonte === 'camara' ? perfil.despesas : perfil.filiacoes,
            perfil.fonte === 'camara'
              ? 'A Câmara não retornou despesas recentes para este perfil nesta consulta.'
              : 'O Senado não retornou histórico partidário para este perfil nesta consulta.',
          )}

          {renderSobreSection(perfil)}

          <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-3xl uppercase mb-4">Fontes desta página</h2>
            <p className="font-body font-medium mb-6">
              Este perfil reúne dados publicados pela Câmara dos Deputados, pelo Senado Federal,
              pelo TSE e por índices públicos de acompanhamento legislativo.
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
              {partido?.tseUrl ? (
                <a
                  href={partido.tseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-headline font-black uppercase border-b-4 border-black w-max"
                >
                  Registro partidário no TSE
                </a>
              ) : null}
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






