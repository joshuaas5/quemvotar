import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import QuizBand from "@/components/QuizBand";
import StatsDashboard from "@/components/StatsDashboard";
import Footer from "@/components/Footer";
import { buildWebSiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "QuemVotar - Descubra quem é quem na política",
  description:
    "Consulte deputados, senadores, partidos e rankings com dados oficiais da Câmara, Senado e TSE. Vote com dados, não no escuro.",
  alternates: { canonical: "https://quemvotar.com.br/" },
};

export const revalidate = 1800;

export default function Home() {
  const websiteSchema = buildWebSiteSchema(
    'https://quemvotar.com.br',
    'QuemVotar',
    'Consulte deputados, senadores, partidos e rankings com dados oficiais da Câmara, Senado e TSE.',
    '/busca?q={q}'
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
          text: 'QuemVotar e uma plataforma de transparencia politica que consolida dados publicos da Camara dos Deputados, Senado Federal, TSE e Ranking dos Politicos. Voce pode consultar perfis, notas, rankings e fazer um match eleitoral para descobrir quais parlamentares pensam parecido com voce.',
        },
      },
      {
        '@type': 'Question',
        name: 'De onde vem os dados dos politicos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Todos os dados sao de fontes oficiais e auditaveis: APIs da Camara dos Deputados, Senado Federal, Tribunal Superior Eleitoral (TSE), Conselho Nacional de Justica (CNJ) e Ranking dos Politicos. Nao produzimos nem editamos os dados brutos.',
        },
      },
      {
        '@type': 'Question',
        name: 'O Match Eleitoral funciona como?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O Match Eleitoral cruza suas respostas sobre temas como armas, aborto, cotas, privatizacoes e meio ambiente com o historico de votacoes e posicionamentos partidarios de cada parlamentar. O resultado mostra quem tem maior afinidade com suas respostas.',
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
        <QuizBand />
        <Highlights />
        <StatsDashboard />
      </main>

      <Footer />
    </>
  );
}