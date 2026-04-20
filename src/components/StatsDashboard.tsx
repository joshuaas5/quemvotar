import Link from 'next/link';
import { getLiderancas, getPanoramaDados, getPartidos } from '@/lib/api';

function formatNumber(value: number | null) {
  if (value === null) return '—';
  return new Intl.NumberFormat('pt-BR').format(value);
}

const LIDERANCA_STYLE: Record<string, { emoji: string; bg: string; border: string; accent: string }> = {
  governo: { emoji: '◼', bg: 'bg-slate-100', border: 'border-slate-400', accent: 'text-slate-900' },
  oposicao: { emoji: '◆', bg: 'bg-zinc-100', border: 'border-zinc-400', accent: 'text-zinc-900' },
  maioria: { emoji: '●', bg: 'bg-stone-100', border: 'border-stone-400', accent: 'text-stone-900' },
  minoria: { emoji: '▲', bg: 'bg-neutral-100', border: 'border-neutral-400', accent: 'text-neutral-900' },
};

export default async function StatsDashboard() {
  const [panorama, partidos, liderancas] = await Promise.all([
    getPanoramaDados().catch(() => ({
      totalParlamentares: null,
      totalDeputados: null,
      totalSenadores: null,
      totalUfs: null,
      fonteAtual: 'indisponivel' as const,
    })),
    getPartidos().catch(() => []),
    getLiderancas().catch(() => []),
  ]);

  const topPartidos = partidos.slice(0, 8);
  const maxCadeiras = topPartidos.length > 0 ? topPartidos[0].totalParlamentares : 1;
  const principaisLiderancas = liderancas
    .filter((item) => item.casa === 'CD' || item.casa === 'SF')
    .slice(0, 6);

  return (
    <section id="dados" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      <div className="text-center space-y-3">
        <h2 className="font-headline font-black text-3xl sm:text-5xl uppercase">📊 Panorama do Congresso</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70">
          Distribuição por partido e quadro oficial de lideranças políticas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 sm:gap-8">
        <section className="bg-white border-4 border-black p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h3 className="font-headline font-black text-2xl sm:text-3xl uppercase">🏛️ Partidos com mais cadeiras</h3>
              <p className="font-body font-bold uppercase text-xs opacity-70 mt-2">
                Deputados e senadores em exercício por partido.
              </p>
            </div>
            <Link href="/partidos" className="font-headline font-black uppercase text-sm border-b-4 border-black shrink-0">
              Ver todos
            </Link>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {topPartidos.map((partido, index) => {
              const barPercent = Math.max(8, (partido.totalParlamentares / maxCadeiras) * 100);
              const barColors = [
                'bg-yellow-400', 'bg-blue-400', 'bg-red-400', 'bg-green-400',
                'bg-purple-400', 'bg-orange-400', 'bg-teal-400', 'bg-pink-400',
              ];

              return (
                <article
                  key={partido.sigla}
                  className="border-4 border-black p-3 sm:p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                >
                  <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                      <div className="font-headline font-black text-xl sm:text-2xl uppercase shrink-0 min-w-[3.5rem] sm:min-w-[5rem] w-fit break-all sm:break-normal">
                        {partido.sigla}
                      </div>
                      <div className="min-w-0">
                        <p className="font-body font-bold text-xs sm:text-sm truncate">{partido.nome}</p>
                        <p className="font-label font-bold uppercase text-xs opacity-70">
                          {partido.deputados} dep. • {partido.senadores} sen.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-headline font-black text-xl sm:text-3xl">{formatNumber(partido.totalParlamentares)}</p>
                      <p className="font-label font-bold uppercase text-xs opacity-70">total</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full border border-black/10 overflow-hidden">
                    <div
                      className={`h-full ${barColors[index % barColors.length]} rounded-full transition-all`}
                      style={{ width: `${barPercent}%` }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white border-4 border-black p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-5 sm:space-y-6">
          <div>
            <h3 className="font-headline font-black text-2xl sm:text-3xl uppercase">📈 Base Atual</h3>
            <p className="font-body font-bold uppercase text-xs opacity-70 mt-2">
              Retrato oficial das casas legislativas nesta consulta.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="border-4 border-black p-3 sm:p-4 bg-[#ffe066] text-center">
              <p className="font-headline font-black text-2xl sm:text-4xl">{formatNumber(panorama.totalParlamentares)}</p>
              <p className="font-label font-bold uppercase text-xs">Parlamentares</p>
            </div>
            <div className="border-4 border-black p-3 sm:p-4 bg-[#9bf6ff] text-center">
              <p className="font-headline font-black text-2xl sm:text-4xl">{formatNumber(panorama.totalUfs)}</p>
              <p className="font-label font-bold uppercase text-xs">UFs</p>
            </div>
            <div className="border-4 border-black p-3 sm:p-4 bg-[#ffd6a5] text-center">
              <p className="font-headline font-black text-2xl sm:text-4xl">{formatNumber(panorama.totalDeputados)}</p>
              <p className="font-label font-bold uppercase text-xs">Deputados</p>
            </div>
            <div className="border-4 border-black p-3 sm:p-4 bg-[#ffc6ff] text-center">
              <p className="font-headline font-black text-2xl sm:text-4xl">{formatNumber(panorama.totalSenadores)}</p>
              <p className="font-label font-bold uppercase text-xs">Senadores</p>
            </div>
          </div>

          <p className="font-body font-medium text-sm">
            Dados puxados das APIs oficiais da Câmara dos Deputados e do Senado Federal.
          </p>

          <Link href="/ranking" className="inline-block font-headline font-black uppercase text-sm border-b-4 border-black">
            Ver ranking dos parlamentares
          </Link>
        </section>
      </div>

      <section className="bg-white border-4 border-black p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h3 className="font-headline font-black text-2xl sm:text-3xl uppercase">👥 Lideranças Políticas</h3>
            <p className="font-body font-bold uppercase text-xs opacity-70 mt-2">
              Governo, oposição, maioria e minoria nas casas legislativas.
            </p>
          </div>
          <Link href="/partidos" className="font-headline font-black uppercase text-sm border-b-4 border-black shrink-0">
            Abrir partidos
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {principaisLiderancas.map((lideranca) => {
            const style = LIDERANCA_STYLE[lideranca.categoria] ?? LIDERANCA_STYLE.governo;

            return (
              <article
                key={lideranca.id}
                className={`${style.bg} border-4 ${style.border} p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{style.emoji}</span>
                  <span className={`font-label font-bold uppercase text-xs ${style.accent}`}>
                    {lideranca.casa} • {lideranca.categoria}
                  </span>
                </div>
                <h4 className={`font-headline font-black text-xl sm:text-2xl uppercase leading-tight ${style.accent}`}>
                  {lideranca.nomeParlamentar}
                </h4>
                <p className="font-body font-medium text-sm mt-2 sm:mt-3">{lideranca.titulo}</p>
                {lideranca.partido ? (
                  <span className={`inline-block mt-2 ${style.bg} border-2 ${style.border} px-2 py-0.5 font-label font-bold uppercase text-xs ${style.accent}`}>
                    {lideranca.partido}
                  </span>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
