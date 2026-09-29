import type { Metadata } from 'next';
import { toolMetadata } from '@/lib/sharing/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { ResultadosView } from '@/components/resultados/ResultadosView';
import { AdLeaderboard, AdRectangle300x250 } from '@/components/ads/Adsterra';
export const metadata: Metadata = toolMetadata('Meu candidato foi eleito? Resultados 2026', 'Acompanhe a apuração por estado e cargo com dados oficiais do TSE. Confira a situação final e os candidatos ao segundo turno.', '/resultados');
export default function ResultadosPage() {
  return <><Header /><main className="qv-grid-bg py-10 px-4 sm:px-6"><div className="max-w-5xl mx-auto space-y-8"><PageHero eyebrow="Eleições 2026 · 4 e 25 de outubro" title="Meu candidato foi eleito?" description="Resultados oficiais por estado e cargo. Acompanhe a apuração e confira a situação divulgada pelo TSE." accent="yellow" /><AdLeaderboard /><ResultadosView /><div className="flex flex-col items-center gap-2"><span className="font-label text-xs uppercase">Publicidade</span><AdRectangle300x250 /></div></div></main><Footer /></>;
}
