import Link from 'next/link';

export default function CandidatosBand() {
  return (
    <section className="bg-primary-container border-b-4 border-black py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <p className="font-label font-bold uppercase text-xs mb-3 bg-black text-white inline-block px-3 py-1">
            Eleições Gerais · 04/10/2026 · Fonte oficial TSE
          </p>
          <h2 className="font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter leading-tight mb-4">
            CONHEÇA QUEM ESTÁ <span className="bg-on-background text-white px-2">CONCORRENDO</span> EM 2026
          </h2>
          <p className="font-body font-bold text-xl uppercase opacity-80">
            Presidente, governadores, senadores e deputados — com registro oficial, plano de governo
            e posicionamento estimado com transparência.
          </p>
        </div>
        <div className="w-full md:w-auto">
          <Link href="/candidatos" className="block w-full md:w-auto">
            <button className="w-full bg-black text-white font-headline font-black text-2xl md:text-3xl px-12 py-8 border-4 border-black shadow-[10px_10px_0px_0px_rgba(255,255,255,0.4)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all uppercase">
              VER CANDIDATOS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
