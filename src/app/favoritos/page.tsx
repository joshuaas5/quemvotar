import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import FavoritosClient from '@/components/FavoritosClient';

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

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Favoritos' }]} />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">
              Meus Favoritos
            </h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
              Parlamentares que voce esta acompanhando. Os dados sao salvos localmente no seu navegador.
            </p>
          </section>

          <FavoritosClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
