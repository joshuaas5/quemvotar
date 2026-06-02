import type { Metadata } from "next";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { MatchClient } from '@/components/match/MatchClient';
import { getParlamentares, getRankingParlamentares } from '@/lib/api';
import { buildRankingLookupKey, rankingHouseFromCargo } from '@/lib/match/ranking-key';

export const metadata: Metadata = {
  title: "Match Eleitoral",
  description:
    "Responda a um quiz rápido e descubra quais parlamentares são mais alinhados com o seu perfil político. Veja sua posição no Diagrama de Nolan.",
  alternates: { canonical: "https://www.quemvotar.com.br/match" },
};

export const revalidate = 86400;

export default async function MatchPage() {
  const parlamentares = await getParlamentares();

  // Cria índice de notas por chave composta para evitar colisões por homônimos.
  const rankingList = await getRankingParlamentares(600).catch(() => []);
  const rankingsMap: Record<string, number> = {};

  rankingList.forEach((r) => {
    const casa = rankingHouseFromCargo(r.cargo);
    if (!casa) return;

    const keyPrincipal = buildRankingLookupKey({
      nome: r.nome,
      partido: r.partido,
      uf: r.uf,
      casa,
    });
    rankingsMap[keyPrincipal] = r.ranking.nota;

    if (r.nomeCivil) {
      const keyNomeCivil = buildRankingLookupKey({
        nome: r.nomeCivil,
        partido: r.partido,
        uf: r.uf,
        casa,
      });
      rankingsMap[keyNomeCivil] = r.ranking.nota;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow qv-grid-bg py-16 px-4 sm:px-6 overflow-x-clip">
        <div className="max-w-7xl mx-auto space-y-10">
          <Breadcrumbs items={[{ label: 'Match Eleitoral' }]} />
          <PageHero
            eyebrow="Comparação guiada"
            title="Match eleitoral"
            description="Responda aos temas abaixo para encontrar parlamentares mais próximos do seu perfil político, além de visualizar sua nota no Ranking dos Políticos e o seu eixo ideológico."
            accent="pink"
            stat={{ value: '10 temas', label: 'Perguntas estruturadas para comparação transparente.' }}
          />

          <MatchClient parlamentares={parlamentares} rankings={rankingsMap} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
