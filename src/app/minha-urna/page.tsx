import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { MinhaUrnaView } from '@/components/candidatos/MinhaUrnaView';

export const metadata: Metadata = {
  title: 'Minha Urna 2026',
  description: 'Sua lista de votos para as Eleições 2026: presidente, governador, senador, deputado federal e estadual.',
  alternates: { canonical: 'https://www.quemvotar.com.br/minha-urna' },
};

export default function MinhaUrnaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6" style={{ paddingBottom: '80px' }}>
        <div className="max-w-4xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: 'Minha Urna' }]} />

          <PageHero
            eyebrow="Eleições Gerais · 04/10/2026"
            title="Minha Urna"
            description="Seus votos escolhidos, prontos para o dia da eleição. Um voto por cargo — fica salvo só no seu navegador."
            accent="yellow"
            stat={{ value: 'Local', label: 'Nada é publicado; a lista fica apenas no navegador.' }}
          />

          <MinhaUrnaView />
        </div>
      </main>

      <Footer />
    </div>
  );
}
