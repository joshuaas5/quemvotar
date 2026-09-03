import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { MatchCandidatos } from '@/components/match/MatchCandidatos';
import { MatchTabs } from '@/components/match/MatchTabs';
import { AdLeaderboard } from '@/components/ads/Adsterra';

export const metadata: Metadata = {
  title: 'Match Candidatos 2026',
  description:
    'Responda a um quiz rápido e descubra quais candidatos das Eleições 2026 combinam com o seu perfil: presidente, governador, senador e deputados.',
  alternates: { canonical: 'https://www.quemvotar.com.br/match/candidatos' },
};

export default function MatchCandidatosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow qv-grid-bg py-16 px-4 sm:px-6 overflow-x-clip">
        <div className="max-w-7xl mx-auto space-y-10">
          <Breadcrumbs items={[{ label: 'Match', href: '/match' }, { label: 'Candidatos 2026' }]} />

          <PageHero
            eyebrow="Eleições 2026"
            title="Match Candidatos 2026"
            description="Descubra quais candidatos das Eleições Gerais de 2026 combinam com o seu perfil político. Candidato ainda não votou — o cruzamento usa plano de governo e posicionamento, com a base sempre declarada."
            accent="yellow"
            stat={{ value: '19.7 mil', label: 'Candidatos sincronizados do TSE, atualizado a cada hora.' }}
          />

          <MatchTabs ativo="candidatos" />

          <AdLeaderboard />

          <MatchCandidatos />
        </div>
      </main>

      <Footer />
    </div>
  );
}
