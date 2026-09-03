import Link from 'next/link';
import Icon from './Icon';
import { CookieSettingsButton } from './ConsentManager';
import { ADSTERRA_SMARTLINK_URL, AdLeaderboard } from './ads/Adsterra';

export default function Footer() {
  return (
    <>
      <div className="w-full px-4 py-6 bg-[#e0e3e4] border-t-4 border-black">
        <AdLeaderboard />
      </div>
      <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#e0e3e4] border-t-4 border-black">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="text-lg font-black text-black font-headline uppercase">QUEM VOTAR.</div>
        <p className="font-body font-bold uppercase text-sm text-black max-w-md text-center md:text-left">
          © {new Date().getFullYear()} QUEM VOTAR. PLATAFORMA INDEPENDENTE. DADOS: CÂMARA, SENADO,
          TSE E CNJ.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 font-body font-bold uppercase text-sm">
        <Link href="/sobre" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Sobre
        </Link>
        <Link href="/metodologia" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Metodologia
        </Link>
        <Link href="/politica-editorial" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Política Editorial
        </Link>
        <Link href="/guias" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Guias
        </Link>
        <Link href="/candidatos" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Candidatos 2026
        </Link>
        <Link href="/editorial" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Análises
        </Link>
        <Link href="/comparar" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Comparar
        </Link>
        <Link href="/privacy" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Privacidade
        </Link>
        <CookieSettingsButton />
        <Link href="/terms" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Termos de Uso
        </Link>
        <Link href="/api-docs" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Fontes
        </Link>
        <Link href="/contact" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Contato
        </Link>
        <a
          href={ADSTERRA_SMARTLINK_URL}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="text-black/50 no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer"
          title="Publicidade"
        >
          Publicidade
        </a>

      </div>

      <div className="flex gap-4">
        <Link
          href="/partidos"
          aria-label="Ver partidos"
          className="w-10 h-10 border-2 border-black bg-on-background flex items-center justify-center text-white cursor-pointer hover:bg-secondary hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <Icon name="groups" className="w-5 h-5" />
        </Link>
        <Link
          href="/ranking"
          aria-label="Ver ranking"
          className="w-10 h-10 border-2 border-black bg-on-background flex items-center justify-center text-white cursor-pointer hover:bg-secondary hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <Icon name="leaderboard" className="w-5 h-5" />
        </Link>
        <Link
          href="/parlamentares"
          aria-label="Buscar parlamentares"
          className="w-10 h-10 border-2 border-black bg-on-background flex items-center justify-center text-white cursor-pointer hover:bg-secondary hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <Icon name="search" className="w-5 h-5" />
        </Link>
      </div>
    </footer>
    </>
  );
}
