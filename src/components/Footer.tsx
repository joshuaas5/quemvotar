import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#e0e3e4] border-t-4 border-black">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="text-lg font-black text-black font-headline uppercase">QUEM VOTAR.</div>
        <p className="font-body font-bold uppercase text-sm text-black max-w-md text-center md:text-left">
          © {new Date().getFullYear()} QUEM VOTAR. PLATAFORMA INDEPENDENTE. DADOS: C�MARA, SENADO,
          TSE E CNJ.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 font-body font-bold uppercase text-sm">
        <Link href="/privacy" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Privacidade
        </Link>
        <Link href="/terms" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Termos de Uso
        </Link>
        <Link href="/api-docs" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Fontes
        </Link>
        <Link href="/contact" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Contato
        </Link>
      </div>

      <div className="flex gap-4">
        <Link
          href="/partidos"
          className="w-10 h-10 border-2 border-black bg-on-background flex items-center justify-center text-white cursor-pointer hover:bg-secondary hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <span className="material-symbols-outlined">groups</span>
        </Link>
        <Link
          href="/ranking"
          className="w-10 h-10 border-2 border-black bg-on-background flex items-center justify-center text-white cursor-pointer hover:bg-secondary hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <span className="material-symbols-outlined">leaderboard</span>
        </Link>
        <Link
          href="/parlamentares"
          className="w-10 h-10 border-2 border-black bg-on-background flex items-center justify-center text-white cursor-pointer hover:bg-secondary hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <span className="material-symbols-outlined">search</span>
        </Link>
      </div>
    </footer>
  );
}
