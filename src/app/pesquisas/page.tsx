import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { AdLeaderboard, AdRectangle300x250 } from '@/components/ads/Adsterra';
import { PollsExplorer } from '@/components/pesquisas/PollsExplorer';
import { readPollDataset } from '@/lib/pesquisas/read';
import { brazilToday } from '@/lib/pesquisas/aggregate';
import { POLL_UFS, type PollOffice } from '@/lib/pesquisas/types';

export const revalidate = 3600;
export const metadata: Metadata = {
  title: 'Pesquisas Eleitorais 2026: Presidente, Governador e Senado',
  description: 'Compare pesquisas eleitorais de 2026 com fontes identificadas e média descritiva de cenários comparáveis. Presidente em destaque e consulta por estado para governador e Senado.',
  alternates: { canonical: 'https://www.quemvotar.com.br/pesquisas' },
  openGraph: { title: 'Como está a corrida eleitoral? Pesquisas 2026', description: 'Presidente, governador e Senado. Veja os levantamentos, os números e as fontes no QuemVotar.', url: 'https://www.quemvotar.com.br/pesquisas' },
  twitter: { card: 'summary_large_image', title: 'Pesquisas Eleitorais 2026 | QuemVotar', images: ['/pesquisas/opengraph-image'] },
};

export default async function PesquisasPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [params, dataset] = await Promise.all([searchParams, readPollDataset()]);
  const initialOffice: PollOffice = params.cargo === 'governor' || params.cargo === 'senate' ? params.cargo : 'president';
  const initialUf = typeof params.uf === 'string' && POLL_UFS.some(([uf]) => uf === params.uf) ? params.uf : 'SP';
  const initialRound = params.turno === '2' && initialOffice !== 'senate' ? 2 : 1;
  return <><main className="qv-grid-bg px-4 py-10 text-black sm:px-6"><div className="mx-auto max-w-6xl space-y-8"><PageHero eyebrow="Agregador · Eleições 2026" title="A corrida eleitoral, em um só lugar." description="Pesquisas com fonte e registro identificados. Presidente em destaque; governador e Senado nos 26 estados e no Distrito Federal." accent="yellow" stat={{ value: '27 UFs', label: 'Filtros por estado. Os dados aparecem somente após verificação.' }} /><AdLeaderboard /><PollsExplorer dataset={dataset} asOf={brazilToday()} initialOffice={initialOffice} initialUf={initialUf} initialRound={initialRound} /><div className="flex flex-col items-center gap-2"><span className="font-label text-xs uppercase">Publicidade</span><AdRectangle300x250 /></div></div></main><Footer /></>;
}
