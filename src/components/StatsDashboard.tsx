import Link from 'next/link';
import { getLiderancas, getPanoramaDados, getPartidos } from '@/lib/api';

function formatNumber(value: number | null) {
  if (value === null) return '—';
  return new Intl.NumberFormat('pt-BR').format(value);
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
    <section id="dados" className="py-24 px-6 max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h2 className="font-headline font-black text-5xl uppercase">Panorama do Congresso</h2>
        <p className="font-body font-bold uppercase text-sm opacity-70">
          Distribuição por partido e quadro oficial de lideranças políticas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
        <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h3 className="font-headline font-black text-3xl uppercase">Partidos com mais cadeiras</h3>
              <p className="font-body font-bold uppercase text-xs opacity-70 mt-2">
                Deputados e senadores em exercício por partido.
              </p>
            </div>
            <Link href="/partidos" className="font-headline font-black uppercase border-b-4 border-black">
              Ver todos
            </Link>
          </div>

          <div className="space-y-4">
            {topPartidos.map((partido) => (
              <article
                key={partido.sigla}
                className="grid grid-cols-[80px_minmax(0,1fr)_120px] items-center gap-4 border-4 border-black p-4"
              >
                <div className="font-headline font-black text-3xl uppercase">{partido.sigla}</div>
                <div>
                  <p className="font-body font-bold">{partido.nome}</p>
                  <p className="font-label font-bold uppercase text-xs opacity-70">
                    {partido.deputados} deputados • {partido.senadores} senadores
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-headline font-black text-3xl">{formatNumber(partido.totalParlamentares)}</p>
                  <p className="font-label font-bold uppercase text-xs opacity-70">total</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div>
            <h3 className="font-headline font-black text-3xl uppercase">Base Atual</h3>
            <p className="font-body font-bold uppercase text-xs opacity-70 mt-2">
              Retrato oficial das casas legislativas nesta consulta.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border-4 border-black p-4 bg-surface-container-low text-center">
              <p className="font-headline font-black text-4xl">{formatNumber(panorama.totalParlamentares)}</p>
              <p className="font-label font-bold uppercase text-xs">Parlamentares</p>
            </div>
            <div className="border-4 border-black p-4 bg-surface-container-low text-center">
              <p className="font-headline font-black text-4xl">{formatNumber(panorama.totalUfs)}</p>
              <p className="font-label font-bold uppercase text-xs">UFs</p>
            </div>
            <div className="border-4 border-black p-4 bg-surface-container-low text-center">
              <p className="font-headline font-black text-4xl">{formatNumber(panorama.totalDeputados)}</p>
              <p className="font-label font-bold uppercase text-xs">Deputados</p>
            </div>
            <div className="border-4 border-black p-4 bg-surface-container-low text-center">
              <p className="font-headline font-black text-4xl">{formatNumber(panorama.totalSenadores)}</p>
              <p className="font-label font-bold uppercase text-xs">Senadores</p>
            </div>
          </div>

          <p className="font-body font-medium">
            Dados puxados das APIs oficiais da Câmara dos Deputados e do Senado Federal.
          </p>

          <Link href="/ranking" className="inline-block font-headline font-black uppercase border-b-4 border-black">
            Ver ranking dos parlamentares
          </Link>
        </section>
      </div>

      <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h3 className="font-headline font-black text-3xl uppercase">Lideranças Políticas</h3>
            <p className="font-body font-bold uppercase text-xs opacity-70 mt-2">
              Governo, oposição, maioria e minoria nas casas legislativas.
            </p>
          </div>
          <Link href="/partidos" className="font-headline font-black uppercase border-b-4 border-black">
            Abrir partidos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {principaisLiderancas.map((lideranca) => (
            <article key={lideranca.id} className="border-4 border-black p-5 bg-surface-container-low">
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                {lideranca.casa} • {lideranca.categoria}
              </p>
              <h4 className="font-headline font-black text-2xl uppercase leading-tight">
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
