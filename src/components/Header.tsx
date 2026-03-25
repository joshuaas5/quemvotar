import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 bg-[#f5f6f7] border-b-4 border-black neo-brutalist-shadow">
      <div className="text-3xl font-black text-black tracking-tighter font-headline uppercase">
        QUEM VOTAR.
      </div>

      <div className="hidden md:flex gap-8 items-center font-headline font-black uppercase tracking-tighter">
        <Link href="#candidatos" className="text-black border-b-4 border-black pb-1 active:scale-95 cursor-pointer">
          Candidatos
        </Link>
        <Link href="#partidos" className="text-black/60 hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 cursor-pointer">
          Partidos
        </Link>
        <Link href="#dados" className="text-black/60 hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 cursor-pointer">
          Dados
        </Link>
        <Link href="#metodologia" className="text-black/60 hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 cursor-pointer">
          Metodologia
        </Link>
      </div>

      <button className="bg-primary-container text-black border-4 border-black px-6 py-2 font-headline font-black uppercase tracking-tighter hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        Entenda os Dados
      </button>
    </nav>
  );
}
