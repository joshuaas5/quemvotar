import type { Metadata } from 'next';
import { toolMetadata } from '@/lib/sharing/metadata';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { MatchCandidatos } from '@/components/match/MatchCandidatos';
import { MatchTabs } from '@/components/match/MatchTabs';
import { UF_LISTA } from '@/lib/candidatos/ufs';
import { AdLeaderboard } from '@/components/ads/Adsterra';

export const metadata: Metadata = toolMetadata('Match Candidatos 2026', 'Responda 10 perguntas, compare seu perfil com os candidatos e compartilhe seu resultado. Grátis e sem cadastro.', '/match/candidatos');

export default async function MatchCandidatosPage({ searchParams }: { searchParams: Promise<{ uf?: string; cargo?: string }> }) {
  const params = await searchParams;
  const uf = UF_LISTA.some((u) => u.sigla === params.uf?.toUpperCase()) ? params.uf!.toUpperCase() : 'BR';
  const cargo = ['1', '3', '5', '6', '7', '8'].includes(params.cargo ?? '') ? params.cargo! : '0';
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
            stat={{ value: '10', label: 'Perguntas · sem cadastro · resultado calculado no navegador.' }}
          />

          <MatchTabs ativo="candidatos" />

          <AdLeaderboard />

          <MatchCandidatos initialUf={uf} initialCargo={cargo} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
