import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import QuizBand from "@/components/QuizBand";
import StatsDashboard from "@/components/StatsDashboard";
import Footer from "@/components/Footer";

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
