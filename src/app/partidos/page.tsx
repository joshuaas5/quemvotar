import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getLiderancas, getPartidos } from '@/lib/api';
import { getPartyVisualEmoji } from '@/lib/party-logos';

export const revalidate = 3600;

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(date);
}

function getCasaLabel(casa: string) {
  if (casa === 'CD') return 'CAMARA';
  if (casa === 'SF') return 'SENADO';
  return casa;
}

export default async function PartidosPage() {
  const [partidos, liderancas] = await Promise.all([getPartidos(), getLiderancas()]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">Partidos e liderancas 🧩</h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
              Retrato dos partidos com assento no Congresso, incluindo presidencia nacional,
              campo politico aproximado e lideranca nas casas.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
            {liderancas.slice(0, 8).map((lideranca) => (
              <article
                key={lideranca.id}
                className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                  {getCasaLabel(lideranca.casa)} • {lideranca.categoria}
                </p>
                <h2 className="font-headline font-black text-xl md:text-2xl uppercase leading-tight">
                  {lideranca.nomeParlamentar}
                </h2>
                <p className="font-body font-medium mt-3">{lideranca.titulo}</p>
                <p className="font-label font-bold uppercase text-xs mt-3 opacity-70">
                  {lideranca.partido ? `${lideranca.partido} • ` : ''}
                  {formatDate(lideranca.dataDesignacao) ?? 'Data nao informada'}
                </p>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {partidos.map((partido) => (
              <article
                key={partido.sigla}
                className="bg-white border-4 border-black p-5 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="grid grid-cols-[74px_minmax(0,1fr)] md:grid-cols-[88px_minmax(0,1fr)] gap-4 md:gap-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partido.logoUrl ?? 'https://fakeimg.pl/320x320?text=Partido'}
                    alt={partido.sigla}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain border-4 border-black bg-white p-1"
                  />

                  <div className="space-y-2">
                    <p className="font-label font-bold uppercase text-xs opacity-70">{partido.sigla}</p>
                    <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-none">
                      {partido.nome}
                    </h2>
                    <p className="font-body font-bold uppercase text-sm">
                      {getPartyVisualEmoji(partido.sigla)} {partido.totalParlamentares} parlamentares • {partido.deputados} deputados • {partido.senadores} senadores
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {partido.espectro ? (
                        <span className="border-2 border-black px-3 py-1 font-label font-bold uppercase text-xs bg-[#FFF4C2]">
                          {partido.espectro}
                        </span>
                      ) : null}
                      {partido.familiaPolitica ? (
                        <span className="border-2 border-black px-3 py-1 font-label font-bold uppercase text-xs bg-[#D7F6FF]">
                          {partido.familiaPolitica}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {partido.definicaoCurta ? (
                  <p className="font-body font-medium mt-5 md:mt-6">{partido.definicaoCurta}</p>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 md:mt-6">
                  <div className="border-4 border-black p-4 bg-[#E9FFD2]">
                    <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Presidencia nacional</p>
                    <p className="font-body font-bold">{partido.presidenteNacional ?? 'Nao localizada'}</p>
                  </div>

                  <div className="border-4 border-black p-4 bg-[#FFE0C7]">
                    <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Lideranca na Camara</p>
                    <p className="font-body font-bold">{partido.liderCamara?.nome ?? 'Sem lider retornado'}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href={`/partidos/${partido.sigla}`} className="font-headline font-black uppercase border-b-4 border-black">
                    Abrir partido
                  </Link>
                  <Link href={`/parlamentares?partido=${encodeURIComponent(partido.sigla)}`} className="font-headline font-black uppercase border-b-4 border-black">
                    Ver bancada
                  </Link>
                  {partido.siteOficial ? (
                    <a href={partido.siteOficial} target="_blank" rel="noreferrer" className="font-headline font-black uppercase border-b-4 border-black">
                      Site oficial
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
