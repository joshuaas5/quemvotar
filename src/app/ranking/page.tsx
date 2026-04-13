import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RankingExplorer, { type RankingExplorerRow } from '@/components/RankingExplorer';
import { normalizeUf } from '@/lib/geo';
import { getParlamentares, getPerfilHref, getRankingParlamentares } from '@/lib/api';
import type { PerfilPublico } from '@/lib/api';

export const revalidate = 1800;

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function findLocalPerfil(perfis: PerfilPublico[], nome: string, cargo: string) {
  const nomeNormalizado = normalizeText(nome);
  const cargoNormalizado = normalizeText(cargo);

  return perfis.find((perfil) => {
    const mesmaCasa =
      (perfil.fonte === 'camara' && cargoNormalizado.includes('deputado')) ||
      (perfil.fonte === 'senado' && cargoNormalizado.includes('senador'));

    return mesmaCasa && normalizeText(perfil.nome_urna) === nomeNormalizado;
  });
}

export default async function RankingPage() {
  const [ranking, parlamentares] = await Promise.all([getRankingParlamentares(350), getParlamentares()]);

  const rows: RankingExplorerRow[] = ranking.map((item) => {
    const perfilLocal = findLocalPerfil(parlamentares, item.nome, item.cargo);

    return {
      id: item.id,
      nome: item.nome,
      cargo: item.cargo,
      partidoSigla: perfilLocal?.partido ?? '',
      partidoNome: item.partido,
      uf: normalizeUf(perfilLocal?.uf ?? item.uf),
      nota: item.ranking.nota,
      rankingGeral: item.ranking.rankingGeral,
      rankingCasa: item.ranking.rankingCasa,
      rankingPartido: item.ranking.rankingPartido,
      rankingEstado: item.ranking.rankingEstado,
      fotoUrl: item.fotoUrl,
      fonteUrl: item.fonteUrl,
      perfilHref: perfilLocal ? getPerfilHref(perfilLocal) : null,
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <section className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-5xl uppercase mb-4">Ranking dos parlamentares</h1>
            <p className="font-body font-bold text-lg uppercase opacity-80">
              Explore o ranking com filtros por estado, partido e casa, e compare nomes lado a lado.
            </p>
          </section>

          <RankingExplorer rows={rows} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
