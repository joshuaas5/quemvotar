import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import FavoritosClient from '@/components/FavoritosClient';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Meus Favoritos',
  description: 'Lista local de parlamentares favoritos salva no navegador do usuário.',
  alternates: { canonical: 'https://www.quemvotar.com.br/favoritos' },
  robots: { index: false, follow: true },
};

export default function FavoritosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Favoritos' }]} />

          <PageHero
            eyebrow="Lista local"
            title="Meus Favoritos"
            description="Parlamentares que você está acompanhando. Os dados são salvos localmente no seu navegador."
            accent="purple"
            stat={{ value: 'Local', label: 'Nada é publicado; a lista fica apenas no navegador.' }}
          />

          <FavoritosClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
