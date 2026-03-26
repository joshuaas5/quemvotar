import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getPartidoPorSigla } from '@/lib/api';

export const dynamic = 'force-dynamic';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <Link href="/partidos" className="inline-block font-headline font-black uppercase text-lg border-b-4 border-black">
            Voltar para partidos
          </Link>

          <section
            className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${cores[0]} 0%, ${cores[1]} 100%)` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="bg-white/15 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex items-center justify-center p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partido.logoUrl ?? 'https://fakeimg.pl/320x320?text=Partido'}
                  alt={partido.sigla}
                  className="w-40 h-40 object-cover border-4 border-black bg-white"
                />
              </div>

              <div className="p-8 lg:p-10 text-white space-y-5">
                <p className="font-label font-bold uppercase text-sm opacity-90">{partido.sigla}</p>
                <h1 className="font-headline font-black text-5xl md:text-7xl uppercase leading-none">
                  {partido.nome}
                </h1>
                <p className="font-body font-bold text-lg max-w-4xl">
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

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <article className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Cadeiras no Congresso</p>
              <p className="font-headline font-black text-4xl">{partido.totalParlamentares}</p>
              <p className="font-body font-bold mt-3">{partido.deputados} deputados • {partido.senadores} senadores</p>
            </article>

            <article className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Presidência nacional</p>
              <p className="font-body font-bold text-xl">{partido.presidenteNacional ?? 'Não localizada'}</p>
            </article>

            <article className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Liderança na Câmara</p>
              <p className="font-body font-bold text-xl">{partido.liderCamara?.nome ?? 'Sem líder localizado'}</p>
            </article>

            <article className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Liderança no Senado</p>
              <p className="font-body font-bold text-xl">{partido.liderSenado?.nome ?? 'Sem líder localizado'}</p>
            </article>
          </section>

          <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-3xl uppercase mb-4">Identidade política</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-label font-bold uppercase text-xs opacity-70">Campo aproximado</p>
                <p className="font-body font-bold text-2xl">{partido.espectro ?? 'Não classificado'}</p>
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

          {partido.blocosSenado.length > 0 ? (
            <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-headline font-black text-3xl uppercase mb-4">Blocos no Senado</h2>
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

          <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-3xl uppercase mb-4">Fontes e caminhos</h2>
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
                  Registro partidário no TSE
                </a>
              ) : null}
              <a href={partido.fonteUrl} target="_blank" rel="noreferrer" className="block font-headline font-black uppercase border-b-4 border-black w-max">
                Dados da Câmara
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
