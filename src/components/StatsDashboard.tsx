import Link from 'next/link';
import { getLiderancas, getPanoramaDados, getPartidos } from '@/lib/api';
import { getPartyVisualEmoji } from '@/lib/party-logos';

function formatNumber(value: number | null) {
  if (value === null) return '—';
  return new Intl.NumberFormat('pt-BR').format(value);
}

function getCasaLabel(casa: string) {
  if (casa === 'CD') return 'CAMARA';
  if (casa === 'SF') return 'SENADO';
  return casa;
}

export default async function StatsDashboard() {
  const [panorama, partidos, liderancas] = await Promise.all([
    getPanoramaDados(),
    getPartidos(),
    getLiderancas(),
  ]);

  const topPartidos = partidos.slice(0, 8);
  const principaisLiderancas = liderancas
    .filter((item) => item.casa === 'CD' || item.casa === 'SF')
    .slice(0, 6);

  return (
    <section id="dados" className="py-14 md:py-24 px-4 md:px-6 max-w-7xl mx-auto space-y-8 md:space-y-10">
      <div className="text-center space-y-3">
        <h2 className="font-headline font-black text-3xl md:text-5xl uppercase">Panorama do Congresso 📊</h2>
        <p className="font-body font-bold uppercase text-xs md:text-sm opacity-70">
          Distribuicao por partido e quadro oficial de liderancas politicas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8">
        <section className="bg-white border-4 border-black p-5 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h3 className="font-headline font-black text-2xl md:text-3xl uppercase">Partidos com mais cadeiras</h3>
              <p className="font-body font-bold uppercase text-xs opacity-70 mt-2">
                Deputados e senadores em exercicio por partido.
              </p>
            </div>
            <Link href="/partidos" className="font-headline font-black uppercase border-b-4 border-black">
              Ver todos
            </Link>
          </div>

          <div className="space-y-3 md:space-y-4">
            {topPartidos.map((partido) => (
              <article
                key={partido.sigla}
                className="grid grid-cols-[56px_minmax(0,1fr)_84px] md:grid-cols-[80px_minmax(0,1fr)_120px] items-center gap-3 md:gap-4 border-4 border-black p-3 md:p-4"
              >
                <div className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partido.logoUrl ?? "https://fakeimg.pl/200x200?text=Partido"}
                    alt={`Logo ${partido.sigla}`}
                    className="w-11 h-11 md:w-14 md:h-14 object-contain bg-white border-2 border-black p-1"
                  />
                </div>
                <div>
                  <p className="font-body font-bold leading-tight">{partido.nome}</p>
                  <p className="font-label font-bold uppercase text-[11px] md:text-xs opacity-70">
                    {getPartyVisualEmoji(partido.sigla)} {partido.deputados} deputados • {partido.senadores} senadores
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-headline font-black text-2xl md:text-3xl">{formatNumber(partido.totalParlamentares)}</p>
                  <p className="font-label font-bold uppercase text-xs opacity-70">total</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white border-4 border-black p-5 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-5 md:space-y-6">
          <div>
            <h3 className="font-headline font-black text-2xl md:text-3xl uppercase">Base Atual ⚡</h3>
            <p className="font-body font-bold uppercase text-xs opacity-70 mt-2">
              Retrato oficial das casas legislativas nesta consulta.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="border-4 border-black p-3 md:p-4 bg-[#FFF4C2] text-center">
              <p className="font-headline font-black text-3xl md:text-4xl">{formatNumber(panorama.totalParlamentares)}</p>
              <p className="font-label font-bold uppercase text-xs">👥 Parlamentares</p>
            </div>
            <div className="border-4 border-black p-3 md:p-4 bg-[#D7F6FF] text-center">
              <p className="font-headline font-black text-3xl md:text-4xl">{formatNumber(panorama.totalUfs)}</p>
              <p className="font-label font-bold uppercase text-xs">🗺️ UFs</p>
            </div>
            <div className="border-4 border-black p-3 md:p-4 bg-[#E9FFD2] text-center">
              <p className="font-headline font-black text-3xl md:text-4xl">{formatNumber(panorama.totalDeputados)}</p>
              <p className="font-label font-bold uppercase text-xs">CAMARA</p>
            </div>
            <div className="border-4 border-black p-3 md:p-4 bg-[#FFE0C7] text-center">
              <p className="font-headline font-black text-3xl md:text-4xl">{formatNumber(panorama.totalSenadores)}</p>
              <p className="font-label font-bold uppercase text-xs">SENADO</p>
            </div>
          </div>

          <p className="font-body font-medium">
            Dados puxados das APIs oficiais da Camara dos Deputados e do Senado Federal.
          </p>

          <Link href="/ranking" className="inline-block font-headline font-black uppercase border-b-4 border-black">
            Ver ranking dos parlamentares
          </Link>
        </section>
      </div>

      <section className="bg-white border-4 border-black p-5 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h3 className="font-headline font-black text-2xl md:text-3xl uppercase">Liderancas Politicas 🏛️</h3>
            <p className="font-body font-bold uppercase text-xs opacity-70 mt-2">
              Governo, oposicao, maioria e minoria nas casas legislativas.
            </p>
          </div>
          <Link href="/partidos" className="font-headline font-black uppercase border-b-4 border-black">
            Abrir partidos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {principaisLiderancas.map((lideranca) => (
            <article key={lideranca.id} className="border-4 border-black p-4 md:p-5 bg-surface-container-low">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                {getCasaLabel(lideranca.casa)} • {lideranca.categoria}
              </p>
              <h4 className="font-headline font-black text-xl md:text-2xl uppercase leading-tight">
                {lideranca.nomeParlamentar}
              </h4>
              <p className="font-body font-medium mt-3">{lideranca.titulo}</p>
              {lideranca.partido ? (
                <p className="font-label font-bold uppercase text-xs mt-3 opacity-70">{lideranca.partido}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

