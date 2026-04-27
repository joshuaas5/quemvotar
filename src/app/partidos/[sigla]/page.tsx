import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import { getPartidoPorSigla } from '@/lib/api';
import { getPartyVisualEmoji } from '@/lib/party-logos';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/jsonld';

export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ sigla: string }> }
): Promise<Metadata> {
  const { sigla } = await params;
  const partido = await getPartidoPorSigla(sigla);

  if (!partido) {
    return {
      title: 'Partido não encontrado | QuemVotar',
      description: 'Não foi possível localizar o partido na base de dados.',
    };
  }

  const canonicalUrl = `https://quemvotar.com.br/partidos/${partido.sigla}`;

  return {
    title: `${partido.nome} (${partido.sigla}) | QuemVotar`,
    description: `Conheça o partido ${partido.nome} (${partido.sigla}): ${partido.totalParlamentares} parlamentares, bancada, lideranças e posicionamento político.`,
    alternates: { canonical: canonicalUrl },
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
  const { sigla } = await params;
  const partido = await getPartidoPorSigla(sigla);

  if (!partido) {
    notFound();
  }

  const cores = partido.cores ?? ['#111827', '#9ca3af'];
  const visual = getPartyVisualEmoji(partido.sigla);
  const canonicalUrl = `https://quemvotar.com.br/partidos/${partido.sigla}`;

  const orgSchema = buildOrganizationSchema(
    partido.nome,
    canonicalUrl,
    partido.definicaoCurta || `Partido ${partido.nome} com ${partido.totalParlamentares} parlamentares no Congresso Nacional.`,
    partido.logoUrl ?? undefined,
    partido.siteOficial ? [partido.siteOficial] : undefined
  );

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Início', url: 'https://quemvotar.com.br/' },
    { name: 'Partidos', url: 'https://quemvotar.com.br/partidos' },
    { name: partido.sigla },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, breadcrumbSchema]) }}
      />
      <Header />

      <main className="flex-grow bg-surface-container py-10 md:py-12 px-4 md:px-6">
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
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Presidencia nacional</p>
              <p className="font-body font-bold text-xl">{partido.presidenteNacional ?? 'Nao localizada'}</p>
            </article>

            <article className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#E9FFD2]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Lideranca na Camara</p>
              <p className="font-body font-bold text-xl">{partido.liderCamara?.nome ?? 'Sem lider localizado'}</p>
            </article>

            <article className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#FFE0C7]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Lideranca no Senado</p>
              <p className="font-body font-bold text-xl">{partido.liderSenado?.nome ?? 'Sem lider localizado'}</p>
            </article>
          </section>

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-4">Identidade politica</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-label font-bold uppercase text-xs opacity-70">Campo aproximado</p>
                <p className="font-body font-bold text-xl md:text-2xl">{partido.espectro ?? 'Nao classificado'}</p>
                <p className="font-body font-medium">
                  {partido.familiaPolitica
                    ? `Familia politica aproximada: ${partido.familiaPolitica}.`
                    : 'Familia politica nao identificada.'}
                </p>
              </div>
              <div className="space-y-3">
                <p className="font-label font-bold uppercase text-xs opacity-70">Como o partido se apresenta</p>
                <p className="font-body font-medium">
                  {partido.definicaoCurta ?? 'Descricao publica nao localizada no site oficial.'}
                </p>
              </div>
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
              {partido.siteOficial ? (
                <a href={partido.siteOficial} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
                  Site oficial
                </a>
              ) : null}
              {partido.estatutoUrl ? (
                <a href={partido.estatutoUrl} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
                  Estatuto no TSE
                </a>
              ) : null}
              {partido.tseUrl ? (
                <a href={partido.tseUrl} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
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
