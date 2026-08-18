import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { CompararCandidatos } from '@/components/candidatos/CompararCandidatos';

export const metadata: Metadata = {
  title: 'Comparar Candidatos 2026',
  description:
    'Compare lado a lado até 3 candidatos das Eleições 2026: posicionamento, plano de governo, bens declarados e número na urna.',
  alternates: { canonical: 'https://www.quemvotar.com.br/comparar/candidatos' },
};

export default async function CompararCandidatosPage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const params = await searchParams;
  const ids = typeof params.ids === 'string' ? params.ids : '';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: 'Comparar', href: '/comparar' }, { label: 'Candidatos 2026' }]} />

          <PageHero
            eyebrow="Eleições 2026 · TSE"
            title="Comparar Candidatos"
            description="Compare até 3 candidatos lado a lado: posicionamento, base da estimativa, plano de governo, bens declarados e o número na urna."
            accent="cyan"
            stat={{ value: '3', label: 'Limite de candidatos por comparação para leitura fácil.' }}
          />

          <CompararCandidatos idsIniciais={ids} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
