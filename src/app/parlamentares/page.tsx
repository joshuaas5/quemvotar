import type { Metadata } from "next";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ParlamentaresClient from '@/components/ParlamentaresClient';
import AdSenseAutoAds from '@/components/AdSenseAutoAds';
import { getParlamentares, getPartidos } from '@/lib/api';

export const metadata: Metadata = {
  title: "Parlamentares em Exercício",
  description:
    "Busque deputados federais e senadores por nome, partido, UF ou casa legislativa. Dados oficiais atualizados.",
  alternates: { canonical: "https://quemvotar.com.br/parlamentares" },
};

export const revalidate = 1800;

export default async function ParlamentaresPage() {
  const [parlamentares, partidos] = await Promise.all([getParlamentares(), getPartidos()]);

  const ufs = Array.from(
    new Set(parlamentares.map((perfil) => perfil.uf).filter((value): value is string => Boolean(value))),
  ).sort((a, b) => a.localeCompare(b, 'pt-BR'));

  return (
    <div className="min-h-screen flex flex-col">
      <AdSenseAutoAds />
      <Header />

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Parlamentares' }]} />
          <ParlamentaresClient parlamentares={parlamentares} partidos={partidos} ufs={ufs} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
