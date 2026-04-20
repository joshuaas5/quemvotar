import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { MatchClient } from '@/components/match/MatchClient';
import { getParlamentares, getRankingParlamentares } from '@/lib/api';

export const revalidate = 86400;

export default async function MatchPage() {
  const parlamentares = await getParlamentares();
  
  // Pega o ranking de até 600 (ampla maioria dos deputados e senadores) e cria um map ID -> Nota
  const rankingList = await getRankingParlamentares(600).catch(() => []);
  const rankingsMap: Record<string, number> = {};
  
  // Faz match simplificado por nome_urna (como RankList devolve) vs nome da camara
  rankingList.forEach((r) => {
    rankingsMap[r.nome] = r.ranking.nota;
    if (r.nomeCivil) rankingsMap[r.nomeCivil] = r.ranking.nota;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-16 px-4 sm:px-6 overflow-x-clip">
        <div className="max-w-7xl mx-auto space-y-10">
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

