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

function formatScore(value?: number | null) {
  if (typeof value !== 'number') return null;
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatPercent(value?: number | null) {
  if (typeof value !== 'number') return null;
  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%`;
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
              key={`${title}-${index}-${item.titulo}`}
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
                    <span className={`border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm ${item.destaque && item.destaque.match(/sim|afavor|aprovad/i) ? "bg-green-300 text-green-900 border-green-900" : item.destaque && item.destaque.match(/n[�a]o|contra|rejeitad/i) ? "bg-red-300 text-red-900 border-red-900" : "bg-primary-container text-black"}`}>
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
                    Ver pÃ¡gina oficial
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
      value: perfil.telefones.length > 0 ? perfil.telefones.join(' â€¢ ') : null,
    },
    { label: 'Gabinete', value: perfil.gabinete },
    { label: 'Escolaridade', value: perfil.escolaridade },
    { label: 'Site pessoal', value: perfil.sitePessoal },
  ].filter((item) => Boolean(item.value));

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-4xl uppercase">InformaÃ§Ãµes oficiais</h2>
        <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">
          Dados biogrÃ¡ficos e de contato publicados pelas casas legislativas.
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
      title: 'NOTA',
      value: perfil.ranking ? formatScore(perfil.ranking.nota) : 'â€”',
      helper: perfil.ranking?.rankingGeral ? `Ranking geral #${perfil.ranking.rankingGeral}` : 'Sem nota pública localizada',
      href: perfil.ranking?.fonteUrl,
      bg: 'bg-[#ffe066]',
    },
    {
      title: 'PresenÃ§a',
      value: perfil.presenca ? formatPercent(perfil.presenca.percentual) : 'â€”',
      helper: perfil.presenca
        ? `${perfil.presenca.presencas}/${perfil.presenca.sessoesDeliberativas} sessões no ano ${perfil.presenca.ano}`
        : 'Sem série de presença localizada',
      href: perfil.presenca?.fonteUrl,
      bg: 'bg-[#9bf6ff]',
    },
    {
      title: 'ALINHAMENTO',
      value: perfil.governismo ? formatPercent(perfil.governismo.percentualFavoravel) : 'â€”',
      helper: perfil.governismo ? 'Percentual de apoio ao governo nas votações monitoradas.' : 'Sem série localizada',
      href: perfil.governismo?.fonteUrl,
      bg: 'bg-[#ffd6a5]',
    },
    {
      title: 'Campo político',
      value: perfil.espectro?.label ?? partido?.espectro ?? 'â€”',
      helper: partido?.familiaPolitica ?? 'Sem classificação aproximada disponível',
      href: partido ? `/partidos/${partido.sigla}` : undefined,
      bg: 'bg-[#caffbf]',
    },
    {
      title: 'PARTIDO',
      value: partido?.sigla ?? perfil.partido,
      helper: partido?.nome ?? perfil.partido,
      href: partido ? `/partidos/${partido.sigla}` : undefined,
      bg: 'bg-[#ffc6ff]',
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
      {cards.map((card) => (
        <article key={card.title} className={`${card.bg} border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
          <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">{card.title}</p>
          <p className="font-headline font-black text-4xl leading-none">{card.value}</p>
          <p className="font-body font-bold mt-3">{card.helper}</p>
          {card.href ? (
            card.href.startsWith('/') ? (
              <Link href={card.href} className="inline-block mt-4 font-headline font-black uppercase border-b-4 border-black">
                Abrir
              </Link>
            ) : (
              <a href={card.href} target="_blank" rel="noreferrer" className="inline-block mt-4 font-headline font-black uppercase border-b-4 border-black">
                Ver fonte
              </a>
            )
          ) : null}
        </article>
      ))}
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
          Leitura rápida das votações recentes agrupadas por assunto.
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
              <p className="font-label font-bold uppercase text-xs opacity-70 mt-2">{formatDate(tema.data)}</p>
            ) : null}
            {tema.destaque ? (
              <p className={`font-body font-bold mt-4 inline-block px-3 py-1 border-2 border-black uppercase ${tema.destaque && tema.destaque.match(/sim|afavor|aprovad/i) ? "bg-green-300 text-green-900 border-green-900" : tema.destaque && tema.destaque.match(/n[�a]o|contra|rejeitad/i) ? "bg-red-300 text-red-900 border-red-900" : "bg-primary-container"}`}>{tema.destaque}</p>
            ) : null}
            {tema.detalhe ? <p className="font-label font-bold uppercase text-xs opacity-70 mt-3">{tema.detalhe}</p> : null}
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


function renderNolanChart(perfil: PerfilDetalhadoPublico) {
  const economia = perfil.ranking ? (perfil.ranking.nota / 10) * 10 : 50;
  let costumes = 50;
  if(perfil.governismo) costumes = 30 + (perfil.governismo.percentualFavoravel * 0.4);
  const xPos = 100 + (economia) - (costumes);
  const yPos = 200 - (economia) - (costumes);
  return (
    <section className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-8">
      <h2 className="font-headline font-black text-3xl uppercase mb-3 text-center">Diagrama de Nolan</h2>
      <p className="font-body font-medium mb-6 opacity-80 text-center max-w-2xl mx-auto">Posicionamento aproximado dos votos do parlamentar em temas de liberdade econômica e costumes.</p>
      <div className="flex flex-col items-center mb-6 overflow-visible">
        <svg viewBox="-20 -20 240 240" className="w-[100%] max-w-[340px] drop-shadow-md">
          <polygon points="100,100 50,50 100,0 150,50" fill="#69db7c" />
          <polygon points="100,100 150,50 200,100 150,150" fill="#4dabf7" />
          <polygon points="100,100 150,150 100,200 50,150" fill="#e9ecef" />
          <polygon points="100,100 50,150 0,100 50,50" fill="#ffa8a8" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="#000" strokeWidth="2" opacity="0.2" strokeDasharray="4 4" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="#000" strokeWidth="2" opacity="0.2" strokeDasharray="4 4" />
          <polygon points="100,0 200,100 100,200 0,100" fill="none" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          <g transform="translate(100, 30)"><rect x="-42" y="-12" width="84" height="18" fill="rgba(255,255,255,0.85)" rx="4"/><text x="0" y="2" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" className="font-headline" letterSpacing="1">LIBERTÁRIO</text></g>
          <g transform="translate(165, 100)"><rect x="-30" y="-12" width="60" height="18" fill="rgba(255,255,255,0.85)" rx="4"/><text x="0" y="2" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" className="font-headline" letterSpacing="1">DIREITA</text></g>
          <g transform="translate(100, 172)"><rect x="-38" y="-12" width="76" height="18" fill="rgba(255,255,255,0.85)" rx="4"/><text x="0" y="2" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" className="font-headline" letterSpacing="1">ESTATISTA</text></g>
          <g transform="translate(35, 100)"><rect x="-36" y="-12" width="72" height="18" fill="rgba(255,255,255,0.85)" rx="4"/><text x="0" y="2" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" className="font-headline" letterSpacing="1">ESQUERDA</text></g>
          <circle cx={xPos} cy={yPos} r="7" fill="#111" stroke="#fff" strokeWidth="2.5" className="transition-all duration-1000 ease-out" />
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2 max-w-[400px] mx-auto text-sm">
        <div className="bg-[#f8f9fa] border-2 border-black p-3 text-center transition-colors hover:bg-white">
          <p className="font-bold opacity-70 text-xs uppercase mb-1 font-label block">ECONOMIA (Livre Mercado)</p>
          <p className="font-black text-2xl font-headline">{economia.toFixed(0)}<span className="text-xs font-bold opacity-60">/100</span></p>
        </div>
        <div className="bg-[#f8f9fa] border-2 border-black p-3 text-center transition-colors hover:bg-white">
          <p className="font-bold opacity-70 text-xs uppercase mb-1 font-label block">COSTUMES (Progresso)</p>
          <p className="font-black text-2xl font-headline">{costumes.toFixed(0)}<span className="text-xs font-bold opacity-60">/100</span></p>
        </div>
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
          <Link href="/parlamentares" className="inline-block font-headline font-black uppercase text-lg border-b-4 border-black">
            Voltar para parlamentares
          </Link>

          <section
            className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${cores[0]} 0%, ${cores[1]} 100%)`,
            }}
          >
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
                  {partido?.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={partido.logoUrl}
                      alt={partido.sigla}
                      className="w-10 h-10 object-contain rounded-full bg-white border-2 border-black p-1 mb-2"
                    />
                  ) : null}
                  <p className="font-label font-bold uppercase text-sm opacity-90 mb-2">
                    {perfil.partido} {perfil.uf ? `â€¢ ${perfil.uf}` : ''} â€¢ {perfil.cargo}
                  </p>
                  <h1 className="font-headline font-black text-5xl md:text-7xl uppercase leading-none">
                    {perfil.nome_urna}
</h1>
{(perfil.espectro?.label || partido?.espectro) && (
  <div className="mt-4 mb-2 bg-[#FFF] text-[#000] border-4 border-black px-4 py-2 text-2xl md:text-3xl font-headline font-black uppercase shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] inline-flex items-center gap-2">
    <span className="text-3xl">🧭</span> Campo Pol�tico:
    <span className="text-3xl md:text-5xl ml-2">{perfil.espectro?.label ?? partido?.espectro}</span>
  </div>
)}
              
                  <p className="font-body font-bold text-lg mt-4 max-w-3xl">
                    O que mais importa para decidir voto vem primeiro: nota pública, presença, alinhamento, partido e temas em que mais vota.
                  </p>
                </div>

                {partido ? (
                  <div className="flex flex-wrap gap-4">
                    <Link href={`/partidos/${partido.sigla}`} className="font-headline font-black uppercase border-b-4 border-white">
                      Ver partido
                    </Link>
                    {partido.siteOficial ? (
                      <a href={partido.siteOficial} target="_blank" rel="noreferrer" className="font-headline font-black uppercase border-b-4 border-white">
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
          {renderTemaSection(perfil)}

          {renderNolanChart(perfil)}

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
                    PresidÃªncia nacional: {partido.presidenteNacional}
                  </span>
                ) : null}
              </div>
            </section>
          ) : null}

          {renderListSection(
            'Projetos e requerimentos',
            'MatÃ©rias e autorias legislativas localizadas para este parlamentar.',
            perfil.autorias,
            'A fonte não retornou autorias recentes nesta consulta.',
          )}

          {renderListSection(
            'VotaÃ§Ãµes recentes',
            'Votos nominais e deliberaÃ§Ãµes localizadas nas fontes consultadas.',
            perfil.votacoes,
            'A fonte não retornou votações recentes para este perfil nesta consulta.',
          )}

          {renderListSection(
            'Mandato',
            'Mandato atual e histÃ³rico retornados pelas fontes oficiais.',
            perfil.mandatos,
            'A fonte não retornou mais registros de mandato para este perfil nesta consulta.',
          )}

          {renderListSection(
            'ComissÃµes',
            'ParticipaÃ§Ãµes em comissÃµes e frentes oficiais.',
            perfil.comissoes,
            'A fonte não retornou comissÃµes ativas para este perfil nesta consulta.',
          )}

          {renderListSection(
            'Cargos',
            'Cargos institucionais publicados pela casa legislativa correspondente.',
            perfil.cargos,
            'A fonte não retornou cargos ativos para este perfil nesta consulta.',
          )}

          {renderListSection(
            perfil.fonte === 'camara' ? 'Despesas recentes' : 'HistÃ³rico partidÃ¡rio',
            perfil.fonte === 'camara'
              ? 'Despesas recentes da cota parlamentar retornadas pela CÃ¢mara dos Deputados.'
              : 'FiliaÃ§Ãµes partidÃ¡rias histÃ³ricas retornadas pelo Senado Federal.',
            perfil.fonte === 'camara' ? perfil.despesas : perfil.filiacoes,
            perfil.fonte === 'camara'
              ? 'A CÃ¢mara não retornou despesas recentes para este perfil nesta consulta.'
              : 'O Senado não retornou histÃ³rico partidÃ¡rio para este perfil nesta consulta.',
          )}

          {renderSobreSection(perfil)}

          <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-3xl uppercase mb-4">Fontes desta pÃ¡gina</h2>
            <p className="font-body font-medium mb-6">
              Este perfil reÃºne dados publicados pela CÃ¢mara dos Deputados, pelo Senado Federal, pelo TSE e por Ã­ndices pÃºblicos de acompanhamento legislativo.
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
                <a href={partido.tseUrl} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
                  Registro partidÃ¡rio no TSE
                </a>
              ) : null}
              {perfil.ranking ? (
                <a href={perfil.ranking.fonteUrl} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
                  Ranking dos PolÃ­ticos
                </a>
              ) : null}
              {perfil.governismo ? (
                <a href={perfil.governismo.fonteUrl} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
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



