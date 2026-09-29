import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HomeElectionHub from '@/components/HomeElectionHub';
import { PesquisasDestaque } from '@/components/pesquisas/PesquisasDestaque';
import Highlights from '@/components/Highlights';
import StatsDashboard from '@/components/StatsDashboard';
import EditorialGuide from '@/components/EditorialGuide';
import CandidatosBand from '@/components/CandidatosBand';
import Footer from '@/components/Footer';
import { AdLeaderboard, AdNative, AdRectangle300x250 } from '@/components/ads/Adsterra';
import { buildWebSiteSchema } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Eleições 2026: pesquisas eleitorais, Match e cola eleitoral',
  description:
    'Compare pesquisas eleitorais para presidente, governo e Senado. Faça o Match de candidatos 2026 e imprima sua cola eleitoral grátis.',
  alternates: { canonical: 'https://www.quemvotar.com.br/' },
  openGraph: { title: 'Eleições 2026: pesquisas, Match e cola eleitoral', description: 'Compare pesquisas de presidente, governo e Senado, descubra seu Match e prepare sua cola.', url: 'https://www.quemvotar.com.br/', images: [{ url: '/pesquisas/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Eleições 2026: pesquisas, Match e cola eleitoral', images: ['/pesquisas/opengraph-image'] },
};

export const revalidate = 1800;

export default function Home() {
  const websiteSchema = buildWebSiteSchema(
    'https://www.quemvotar.com.br',
    'QuemVotar',
    'Compare pesquisas eleitorais para presidente, governo e Senado. Faça o Match de candidatos 2026 e imprima sua cola eleitoral grátis.',
    '/candidatos?q={q}',
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que e o QuemVotar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O QuemVotar ajuda voc\u00ea a pesquisar antes de votar. Aqui voc\u00ea encontra o Match Eleitoral, perfis de parlamentares, compara\u00e7\u00f5es e links para dados p\u00fablicos.',
        },
      },
      {
        '@type': 'Question',
        name: 'O Match Eleitoral funciona como?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Você responde 10 perguntas sobre temas políticos. O Match de candidatos 2026 estima afinidade pelo eixo político, com a base de cada candidato identificada: plano de governo, análise editorial ou posicionamento do partido. Não é recomendação de voto.',
        },
      },
      {
        '@type': 'Question',
        name: 'De onde vem os dados?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'As p\u00e1ginas indicam as fontes consultadas, incluindo C\u00e2mara dos Deputados, Senado Federal, TSE e outras bases p\u00fablicas identificadas.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, faqSchema]) }}
      />
      <Header />

      <main className="flex-grow">
        <HomeElectionHub />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4" aria-label="Publicidade">
          <AdLeaderboard />
        </div>
        <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2">
          <Hero />
          <PesquisasDestaque />
        </div>
        <CandidatosBand />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center gap-2" aria-label="Publicidade">
          <span className="font-label text-[10px] font-bold uppercase opacity-60">Publicidade</span>
          <AdRectangle300x250 />
        </div>
        <Highlights />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" aria-label="Publicidade">
          <AdNative />
        </div>
        <EditorialGuide />
        <StatsDashboard />
      </main>

      <Footer />
    </>
  );
}
