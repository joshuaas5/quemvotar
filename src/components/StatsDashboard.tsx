import { getPanoramaDados } from '@/lib/api';

function formatNumber(value: number | null) {
  if (value === null) return '—';
  return new Intl.NumberFormat('pt-BR').format(value);
}

function getPercentage(part: number | null, total: number | null) {
  if (!part || !total) return 0;
  return Math.round((part / total) * 100);
}

export default async function StatsDashboard() {
  const panorama = await getPanoramaDados();
  const deputadosWidth = getPercentage(
    panorama.totalDeputados,
    panorama.totalParlamentares,
  );
  const senadoresWidth = getPercentage(
    panorama.totalSenadores,
    panorama.totalParlamentares,
  );
  const complementWidth = Math.max(0, 100 - deputadosWidth - senadoresWidth);
  const fonteLabel =
    panorama.fonteAtual === 'apis_oficiais'
      ? 'APIs oficiais em tempo real'
      : 'Aguardando resposta das fontes';

  return (
    <section id="dados" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-headline font-black text-5xl uppercase mb-16 text-center">PANORAMA NACIONAL</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        <div className="md:col-span-2 md:row-span-2 bg-white border-4 border-black p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div>
            <span className="material-symbols-outlined text-6xl text-tertiary mb-6">account_balance</span>
            <h3 className="font-headline font-black text-5xl uppercase leading-none mb-4">
              {formatNumber(panorama.totalParlamentares)}
            </h3>
            <p className="font-body font-bold text-lg uppercase">
              Parlamentares em exercício localizados nas fontes oficiais consultadas.
            </p>
          </div>
          <div className="bg-surface-container-high p-4 border-2 border-black">
            <p className="text-xs font-black uppercase mb-2">Distribuição da Base Atual</p>
            <div className="w-full bg-on-background h-8 flex">
              <div className="bg-tertiary h-full border-r-2 border-black" style={{ width: `${deputadosWidth}%` }} />
              <div className="bg-primary-container h-full border-r-2 border-black" style={{ width: `${senadoresWidth}%` }} />
              <div className="bg-white h-full" style={{ width: `${complementWidth}%` }} />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-on-background text-white p-8 shadow-[6px_6px_0px_0px_rgba(0,102,102,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,102,102,1)] transition-all duration-200">
          <div className="flex justify-between items-start">
            <h3 className="font-headline font-black text-3xl uppercase leading-none">FONTE <br /> EM USO</h3>
            <span className="material-symbols-outlined text-4xl text-secondary-fixed">dns</span>
          </div>
          <div className="mt-8">
            <p className="font-body text-3xl font-black uppercase">{fonteLabel}</p>
            <p className="text-sm font-bold opacity-70 uppercase">
              Câmara dos Deputados e Senado Federal são a origem consultada para os perfis exibidos.
            </p>
          </div>
        </div>

        <div className="bg-primary-container border-4 border-black p-6 flex flex-col justify-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <h3 className="font-headline font-black text-4xl uppercase">{formatNumber(panorama.totalUfs)}</h3>
          <p className="font-label font-bold text-xs uppercase">UFs representadas na base</p>
        </div>

        <div className="bg-secondary border-4 border-black p-6 flex flex-col justify-center text-center text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <h3 className="font-headline font-black text-4xl uppercase">{formatNumber(panorama.totalSenadores)}</h3>
          <p className="font-label font-bold text-xs uppercase">Senadores localizados</p>
        </div>
      </div>
    </section>
  );
}
