import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import StatsDashboard from '@/components/StatsDashboard';
import EditorialGuide from '@/components/EditorialGuide';
import Footer from '@/components/Footer';
import { buildWebSiteSchema } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Quem votar? Descubra quem combina com seu voto',
  description:
    'Fa\u00e7a o Match Eleitoral, compare pol\u00edticos e confira dados p\u00fablicos antes de votar.',
  alternates: { canonical: 'https://www.quemvotar.com.br/' },
};

export const revalidate = 1800;

export default function Home() {
  const websiteSchema = buildWebSiteSchema(
    'https://www.quemvotar.com.br',
    'QuemVotar',
    'Fa\u00e7a o Match Eleitoral, compare pol\u00edticos e confira dados p\u00fablicos antes de votar.',
    '/busca?q={q}',
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
          text: 'Voc\u00ea responde perguntas sobre temas pol\u00edticos. O resultado mostra parlamentares com maior afinidade, usando votos p\u00fablicos quando localizados e refer\u00eancias partid\u00e1rias nos demais temas.',
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
        <Hero />
        <Highlights />
        <EditorialGuide />
        <StatsDashboard />
      </main>

      <Footer />
    </>
  );
}
