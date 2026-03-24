import { getPanoramaDados } from '@/lib/api';

function formatNumber(value: number | null) {
  if (value === null) {
    return '--';
  }

  return new Intl.NumberFormat('pt-BR').format(value);
}

export default async function StatsDashboard() {
  const panorama = await getPanoramaDados();
  const fonteAtual =
    panorama.fonteAtual === 'espelho_supabase'
      ? 'Espelho local do projeto'
      : panorama.fonteAtual === 'apis_oficiais'
        ? 'Consultas oficiais em tempo real'
        : 'Sem retorno de dados no momento';

  return (
    <section id="dados" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-headline font-black text-5xl uppercase mb-16 text-center">
        Panorama Oficial
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        <div className="md:col-span-2 md:row-span-2 bg-white border-4 border-black p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div>
            <span className="material-symbols-outlined text-6xl text-tertiary mb-6">account_balance</span>
            <p className="font-label font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-4">
              Base disponivel agora
            </p>
            <h3 className="font-headline font-black text-5xl uppercase leading-none mb-4">
              {formatNumber(panorama.totalParlamentares)}
            </h3>
            <p className="font-body font-bold text-lg uppercase">
              Perfis parlamentares rastreaveis entre Camara dos Deputados e Senado Federal.
            </p>
          </div>
          <div className="bg-surface-container-high p-4 border-2 border-black">
            <p className="text-xs font-black uppercase mb-2">Origem em uso</p>
            <p className="font-body font-medium">{fonteAtual}</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-on-background text-white p-8 shadow-[6px_6px_0px_0px_rgba(0,102,102,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,102,102,1)] transition-all duration-200">
          <div className="flex justify-between items-start">
            <h3 className="font-headline font-black text-3xl uppercase leading-none">
              Sem alegacao <br /> sem API
            </h3>
            <span className="material-symbols-outlined text-4xl text-secondary-fixed">gpp_good</span>
          </div>
          <div className="mt-8">
            <p className="font-body text-3xl font-black uppercase">Blindagem juridica</p>
            <p className="text-sm font-bold opacity-70 uppercase">
              Processo, ficha limpa e tendencia ficam bloqueados ate termos fonte oficial e
              conciliacao de identidade comprovavel.
            </p>
          </div>
        </div>

        <div className="bg-primary-container border-4 border-black p-6 flex flex-col justify-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <h3 className="font-headline font-black text-4xl uppercase">
            {formatNumber(panorama.totalDeputados)}
          </h3>
          <p className="font-label font-bold text-xs uppercase">Deputados federais localizados</p>
        </div>

        <div className="bg-secondary border-4 border-black p-6 flex flex-col justify-center text-center text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <h3 className="font-headline font-black text-4xl uppercase">
            {formatNumber(panorama.totalSenadores)}
          </h3>
          <p className="font-label font-bold text-xs uppercase">
            Senadores localizados
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-headline font-black text-3xl uppercase">
            {formatNumber(panorama.totalUfs)}
          </p>
          <p className="font-label font-bold uppercase text-sm mt-2">
            UFs representadas na base atual
          </p>
        </div>
        <div className="bg-[#111111] text-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(255,215,9,0.7)]">
          <p className="font-headline font-black text-3xl uppercase">
            Site forte, dado sobrio
          </p>
          <p className="font-body font-medium mt-2 text-white/80">
            A parte viral vem do posicionamento e da experiencia. A parte factual vem so do que
            conseguimos provar.
          </p>
        </div>
      </div>
    </section>
  );
}
