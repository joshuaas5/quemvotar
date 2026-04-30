import Link from 'next/link';

export default function QuizBand() {
  return (
    <section className="bg-black py-12 sm:py-16 px-4 sm:px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary-container border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-black text-white font-headline font-black text-xs sm:text-sm uppercase px-3 py-1 mb-4 border-2 border-black">
              NOVO
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter leading-tight mb-4">
              DESCUBRA SEU <span className="bg-black text-white px-2">MATCH</span> POLITICO
            </h2>
            <p className="font-body font-bold text-base sm:text-lg uppercase text-on-primary-fixed max-w-2xl">
              Responda 10 perguntas sobre temas do Congresso e descubra quais deputados e senadores pensam mais parecido com voce.
            </p>
          </div>
          <div className="w-full md:w-auto shrink-0">
            <Link href="/match" className="block w-full md:w-auto">
              <button className="w-full bg-black text-white font-headline font-black text-xl sm:text-2xl px-10 sm:px-14 py-6 sm:py-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-[0.97] transition-all uppercase">
                Fazer Match →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
