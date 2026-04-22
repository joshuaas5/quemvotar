import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import QuizBand from "@/components/QuizBand";
import StatsDashboard from "@/components/StatsDashboard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "QuemVotar - Descubra quem é quem na política",
  description:
    "Consulte deputados, senadores, partidos e rankings com dados oficiais da Câmara, Senado e TSE. Vote com dados, não no escuro.",
  alternates: { canonical: "https://quemvotar.com.br/" },
};

export const revalidate = 1800;

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-grow">
        <Hero />
        <Highlights />
        <QuizBand />
        <StatsDashboard />
      </main>

      <Footer />
    </>
  );
}