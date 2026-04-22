import type { Metadata } from "next";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MatchClient } from '@/components/match/MatchClient';
import { getParlamentares, getRankingParlamentares } from '@/lib/api';
import { buildRankingLookupKey, rankingHouseFromCargo } from '@/lib/match/ranking-key';

export const metadata: Metadata = {
  title: "Match Eleitoral",
  description:
    "Responda a um quiz rápido e descubra quais parlamentares são mais alinhados com o seu perfil político. Veja sua posição no Diagrama de Nolan.",
  alternates: { canonical: "https://quemvotar.com.br/match" },
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

      <main className="flex-grow bg-surface-container py-16 px-4 sm:px-6 overflow-x-clip">
        <div className="max-w-7xl mx-auto space-y-10">
          <Breadcrumbs items={[{ label: 'Match Eleitoral' }]} />
          <section className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-5xl uppercase mb-4">Match eleitoral</h1>
            <p className="font-body font-bold text-lg uppercase opacity-80">
              Responda aos temas abaixo para encontrar parlamentares mais próximos do seu perfil político,
              além de visualizar sua nota no Ranking dos Políticos e o seu eixo ideológico.
            </p>
          </section>

          <MatchClient parlamentares={parlamentares} rankings={rankingsMap} />
        </div>
      </main>

      <Footer />
    </div>
  );
}