import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 bg-[#f7f6f2] border-b border-[#e5e5e5]">
      <Link href="/" className="text-3xl font-black text-black tracking-tighter font-headline uppercase">
        QUEM VOTAR.
      </Link>

      <div className="hidden md:flex gap-8 items-center font-headline font-black uppercase tracking-tighter">
        <Link href="/parlamentares" className="text-black border-b-4 border-black pb-1 active:scale-95 cursor-pointer">
          Parlamentares
        </Link>
        <Link
          href="/ranking"
          className="text-black/60 hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 cursor-pointer"
        >
          Ranking
        </Link>
        <Link
          href="/partidos"
          className="text-black/60 hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 cursor-pointer"
        >
          Partidos
        </Link>
        <Link
          href="/#dados"
          className="text-black/60 hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 cursor-pointer"
        >
          Panorama
        </Link>
        <Link
          href="/api-docs"
          className="text-black/60 hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 cursor-pointer"
        >
          Fontes
        </Link>
      </div>

      <Link
        href="/parlamentares"
        className="bg-[#ffd709] text-black border-4 border-black px-6 py-2 font-headline font-black uppercase tracking-tighter hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        Explorar
      </Link>
    </nav>
  );
}

