import Link from 'next/link';

export default function QuizBand() {
  return (
    <section className="bg-secondary-fixed py-16 px-6 border-b-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <h2 className="font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter leading-tight mb-4">
            O MATCH VAI VOLTAR <br /> QUANDO A BASE DE VOTOS <span className="bg-on-background text-white px-2">FOR 100% EXPLICAVEL</span>.
          </h2>
          <p className="font-body font-bold text-xl uppercase text-on-secondary-fixed">
            Primeiro a gente fecha o pipeline de votacoes nominais oficiais. Depois liberamos a comparacao.
          </p>
        </div>
        <div className="w-full md:w-auto">
          <Link href="/match" className="block w-full md:w-auto">
            <button className="w-full bg-black text-white font-headline font-black text-2xl md:text-3xl px-12 py-8 border-4 border-black shadow-[10px_10px_0px_0px_rgba(255,255,255,0.4)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all uppercase">
              VER STATUS DO MATCH
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
