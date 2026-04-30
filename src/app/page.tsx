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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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