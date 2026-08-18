import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import { getPartidoPorSigla } from '@/lib/api';
import { completarPartido2026, getPartidoFallback2026 } from '@/lib/partidos-2026';
import { saneUrl } from '@/lib/utils/safe-url';
import { getPartyVisualEmoji } from '@/lib/party-logos';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import { getPartidoEditorialBySigla, getPartidoEditorialWordCount } from '@/lib/partidos-editorial-utils';
import { SITE } from '@/lib/site-config';

export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ sigla: string }> }
): Promise<Metadata> {
  const { sigla: siglaEncodada } = await params;
  // Next 16 entrega o segmento URL-encodado; decodifica antes de usar
  const sigla = decodeURIComponent(siglaEncodada);
  // Linha 23: generateMetadata — blindado contra scrape instável do TSE
  let partido: Awaited<ReturnType<typeof getPartidoPorSigla>> = null;
  try {
    partido = await getPartidoPorSigla(sigla);
  } catch {
    partido = null;
  }

  if (!partido) {
    partido = getPartidoFallback2026(sigla);
  }

  if (!partido) {
    return {
      title: 'Partido não encontrado | QuemVotar',
      description: 'Não foi possível localizar o partido na base de dados.',
    };
  }

  const canonicalUrl = `https://www.quemvotar.com.br/partidos/${partido.sigla}`;

  // Fase 3.3: a pagina volta a ser indexavel quando recebe conteudo editorial proprio.
  const hasEditorial = getPartidoEditorialBySigla(partido.sigla) !== null;

  return {
    title: `${partido.nome} (${partido.sigla}) | QuemVotar`,
    description: `Conheça o partido ${partido.nome} (${partido.sigla}): ${partido.totalParlamentares} parlamentares, bancada, lideranças e posicionamento político.`,
    alternates: { canonical: canonicalUrl },
    robots: hasEditorial ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: `${partido.nome} (${partido.sigla})`,
      description: `Bancada, lideranças e posicionamento político do ${partido.nome}.`,
      images: partido.logoUrl ? [partido.logoUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      images: partido.logoUrl ? [partido.logoUrl] : [],
    },
  };
}

export default async function PartidoDetailPage({
  params,
}: {
  params: Promise<{ sigla: string }>;
}) {
  // Página — decodifica o segmento URL-encodado
  const { sigla: siglaEncodada } = await params;
  const sigla = decodeURIComponent(siglaEncodada);

  let partido: Awaited<ReturnType<typeof getPartidoPorSigla>> = null;
  try {
    partido = await getPartidoPorSigla(sigla);
  } catch (error) {
    // scraping do TSE pode falhar/oscilar — não pode derrubar a página
    console.error(`Falha ao buscar o partido ${sigla} no TSE:`, String(error).slice(0, 200));
  }

  if (!partido) {
    // Partidos novos/2026 que ainda não estão na raspagem do TSE
    partido = getPartidoFallback2026(sigla);
  } else {
    // Preenche campos que o scraper pode deixar faltando (ficha incompleta)
    partido = completarPartido2026(partido);
  }

  if (!partido) {
    notFound();
  }

  const siteOficial = saneUrl(partido.siteOficial);
  const estatutoUrl = saneUrl(partido.estatutoUrl);
  const tseUrl = saneUrl(partido.tseUrl);

  const cores = partido.cores ?? ['#111827', '#9ca3af'];
  const visual = getPartyVisualEmoji(partido.sigla);
  const canonicalUrl = `https://www.quemvotar.com.br/partidos/${partido.sigla}`;
  const editorial = getPartidoEditorialBySigla(partido.sigla);

  const orgSchema = buildOrganizationSchema(
    partido.nome,
    canonicalUrl,
    partido.definicaoCurta || `Partido ${partido.nome} com ${partido.totalParlamentares} parlamentares no Congresso Nacional.`,
    partido.logoUrl ?? undefined,
    partido.siteOficial ? [partido.siteOficial] : undefined
  );

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Início', url: 'https://www.quemvotar.com.br/' },
    { name: 'Partidos', url: 'https://www.quemvotar.com.br/partidos' },
    { name: partido.sigla },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, breadcrumbSchema]) }}
      />
      <Header />

      <main className="flex-grow qv-grid-bg py-10 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: 'Partidos', href: '/partidos' },
                { label: partido.sigla },
              ]}
            />
            <ShareButtons
              title={`${partido.nome} (${partido.sigla}) | QuemVotar`}
              description={`Conheça o partido ${partido.nome}: bancada, lideranças e posicionamento político.`}
              path={`/partidos/${partido.sigla}`}
            />
          </div>

          <section
            className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${cores[0]} 0%, ${cores[1]} 100%)` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="bg-white/15 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex items-center justify-center p-6">
                {partido.logoUrl ? (
                  <Image
                    src={partido.logoUrl}
                    alt={partido.sigla}
                    width={160}
                    height={160}
                    className="w-32 h-32 md:w-40 md:h-40 object-contain border-4 border-black bg-white p-1"
                    unoptimized
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 border-4 border-black bg-gray-200 flex items-center justify-center font-headline font-black text-3xl">
                    {partido.sigla.slice(0, 2)}
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8 lg:p-10 text-white space-y-5">
                <p className="font-label font-bold uppercase text-sm opacity-90">{visual} {partido.sigla}</p>
                <h1 className="font-headline font-black text-3xl md:text-5xl lg:text-7xl uppercase leading-none">
                  {partido.nome}
                </h1>
                <p className="font-body font-bold text-base md:text-lg max-w-4xl">
                  {partido.definicaoCurta ?? 'Partido com representação parlamentar ativa no Congresso Nacional.'}
                </p>
                <div className="flex flex-wrap gap-3">
                  {partido.espectro ? (
                    <span className="bg-white text-black border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                      {partido.espectro}
                    </span>
                  ) : null}
                  {partido.familiaPolitica ? (
                    <span className="bg-black text-white border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                      {partido.familiaPolitica}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
            <article className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#FFF4C2]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Cadeiras no Congresso</p>
              <p className="font-headline font-black text-4xl">{partido.totalParlamentares}</p>
              <p className="font-body font-bold mt-3">{partido.deputados} deputados • {partido.senadores} senadores</p>
            </article>

            <article className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#D7F6FF]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Presidência nacional</p>
              <p className="font-body font-bold text-xl">{partido.presidenteNacional ?? 'Não localizada'}</p>
            </article>

            <article className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#E9FFD2]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Liderança na Câmara</p>
              <p className="font-body font-bold text-xl">{partido.liderCamara?.nome ?? 'Sem líder localizado'}</p>
            </article>

            <article className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#FFE0C7]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Liderança no Senado</p>
              <p className="font-body font-bold text-xl">{partido.liderSenado?.nome ?? 'Sem líder localizado'}</p>
            </article>
          </section>

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-4">Identidade política</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-label font-bold uppercase text-xs opacity-70">Campo aproximado</p>
                <p className="font-body font-bold text-xl md:text-2xl">{partido.espectro ?? 'Não classificado'}</p>
                <p className="font-body font-medium">
                  {partido.familiaPolitica
                    ? `Família política aproximada: ${partido.familiaPolitica}.`
                    : 'Família política não identificada.'}
                </p>
              </div>
              <div className="space-y-3">
                <p className="font-label font-bold uppercase text-xs opacity-70">Como o partido se apresenta</p>
                <p className="font-body font-medium">
                  {partido.definicaoCurta ?? 'Descrição pública não localizada no site oficial.'}
                </p>
              </div>
            </div>
          </section>

          {editorial ? (
            <>
              <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-6">
                <p className="font-label font-black uppercase text-xs bg-black text-white px-3 py-1 w-max">
                  Análise editorial • Atualizado em {new Date(editorial.atualizadoEm).toLocaleDateString('pt-BR')}
                </p>
                <h2 className="font-headline font-black text-2xl md:text-4xl uppercase leading-tight">
                  {editorial.historia.titulo}
                </h2>
                {editorial.historia.paragrafos.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-base md:text-lg">{paragraph}</p>
                ))}
              </section>

              <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-6">
                <h2 className="font-headline font-black text-2xl md:text-4xl uppercase leading-tight">
                  {editorial.ideologia.titulo}
                </h2>
                {editorial.ideologia.paragrafos.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-base md:text-lg">{paragraph}</p>
                ))}
              </section>

              <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-6">
                <h2 className="font-headline font-black text-2xl md:text-4xl uppercase leading-tight">
                  {editorial.congresso.titulo}
                </h2>
                {editorial.congresso.paragrafos.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-base md:text-lg">{paragraph}</p>
                ))}
              </section>

              <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-6">
                <h2 className="font-headline font-black text-2xl md:text-4xl uppercase leading-tight">
                  {editorial.controversias.titulo}
                </h2>
                {editorial.controversias.paragrafos.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-base md:text-lg">{paragraph}</p>
                ))}
              </section>

              {editorial.fontes.length > 0 ? (
                <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-4">Fontes desta análise</h2>
                  <div className="space-y-3">
                    {editorial.fontes.map((fonte) => (
                      <a
                        key={fonte.href}
                        href={fonte.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block font-headline font-black uppercase border-b-4 border-black w-max max-w-full truncate"
                      >
                        {fonte.label}
                      </a>
                    ))}
                  </div>
                  <p className="mt-6 font-body text-sm leading-relaxed">
                    Análise assinada pela equipe editorial do QuemVotar ({SITE.publisherName}). Este texto
                    não representa recomendação de voto nem posição do partido.
                  </p>
                </section>
              ) : null}
            </>
          ) : null}

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-4">
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase">Como interpretar este partido</h2>
            <p className="font-medium leading-relaxed">
              Esta página resume a presença do {partido.nome} ({partido.sigla}) no Congresso Nacional, incluindo tamanho da bancada, lideranças localizadas e caminhos para fontes oficiais. A composição parlamentar pode mudar por migrações partidárias, licenças, suplências e atualizações das casas legislativas.
            </p>
            <p className="font-medium leading-relaxed">
              Campo político e família partidária são classificações aproximadas para navegação. Elas devem ser lidas junto com votos, projetos, atuação das lideranças e informações oficiais do partido.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/metodologia" className="font-headline font-black uppercase border-b-4 border-black">
                Entender metodologia
              </Link>
              <Link href="/politica-editorial" className="font-headline font-black uppercase border-b-4 border-black">
                Política editorial
              </Link>
            </div>
          </section>

          {partido.blocosSenado.length > 0 ? (
            <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-4">Blocos no Senado</h2>
              <div className="flex flex-wrap gap-3">
                {partido.blocosSenado.map((bloco) => (
                  <span
                    key={`${partido.sigla}-${bloco}`}
                    className="border-2 border-black px-3 py-1 font-label font-bold uppercase text-xs"
                  >
                    {bloco}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-4">Fontes e caminhos</h2>
            <div className="space-y-3">
              <Link href={`/parlamentares?partido=${encodeURIComponent(partido.sigla)}`} className="block font-headline font-black uppercase border-b-4 border-black w-max">
                Ver bancada do partido
              </Link>
              {siteOficial ? (
                <a href={siteOficial} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
                  Site oficial
                </a>
              ) : null}
              {estatutoUrl ? (
                <a href={estatutoUrl} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
                  Estatuto no TSE
                </a>
              ) : null}
              {tseUrl ? (
                <a href={tseUrl} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
                  Registro partidario no TSE
                </a>
              ) : null}
              <a href={partido.fonteUrl} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
                Dados da Camara
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
