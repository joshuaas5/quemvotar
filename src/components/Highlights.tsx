import { getHighlights } from '@/lib/api';

export default async function Highlights() {
  const candidatos = await getHighlights();

  // Define visual logic for the Top 3 based on their rank/index.
  const visualConfig = [
    {
      bgClass: "bg-tertiary",
      textClass: "text-white",
      label: "ALERTA DE PROCESSOS",
      icon: "warning",
      desc: (c: any) => `Possui ${c.num_processos_stf} investigações ativas no STF.`
    },
    {
      bgClass: "bg-secondary-fixed",
      textClass: "text-on-secondary-fixed",
      label: "BEM AVALIADO",
      icon: "thumb_up",
      desc: () => `Ficha limpa e histórico sólido nas sessões.`
    },
    {
      bgClass: "bg-primary-container",
      textClass: "text-on-primary-fixed",
      label: "EM ASCENSÃO",
      icon: "trending_up",
      desc: () => `Acessos subindo nas últimas 24 horas.`
    }
  ];

  return (
    <section className="bg-surface-container-low py-20 px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-headline font-black text-5xl uppercase tracking-tighter mb-2">FICHAS MAIS ACESSADAS HOJE</h2>
          <p className="font-body font-bold text-xl uppercase opacity-70">Veja quem a internet está investigando antes de ir às urnas.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {candidatos.map((candidato, index) => {
            const config = visualConfig[index % 3]; // Loop configs if more than 3
            return (
              <article key={candidato.id} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 group">
                <div className={`${config.bgClass} ${config.textClass} p-4 font-headline font-black uppercase flex justify-between items-center`}>
                  <span>{config.label}</span>
                  <span className="material-symbols-outlined">{config.icon}</span>
                </div>
                <div className="aspect-square relative overflow-hidden border-b-4 border-black grayscale group-hover:grayscale-0 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-full h-full object-cover object-top" alt={candidato.nome_urna} src={candidato.foto_url || "https://fakeimg.pl/600x600?text=Sem+Foto"}/>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="font-headline font-black text-on-surface-variant text-sm block mb-1">
                    {candidato.partido} {candidato.uf ? `(${candidato.uf})` : ''}
                  </span>
                  <h3 className="font-headline font-black text-3xl xl:text-4xl leading-none uppercase mb-4">{candidato.nome_urna}</h3>
                  <p className="font-body font-medium mb-6 text-sm flex-grow">
                    {config.desc(candidato)}
                  </p>
                  <button className="w-full bg-on-background text-white font-headline font-black py-4 uppercase border-4 border-transparent hover:bg-white hover:text-black hover:border-black transition-all cursor-pointer">
                      VER CAPIVARA
                  </button>
                </div>
              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}
