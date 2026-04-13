import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MatchExperience, { type MatchRow } from '@/components/MatchExperience';
import { getParlamentares, getPartidos, getPerfilHref, getRankingParlamentares } from '@/lib/api';
import type { PerfilPublico } from '@/lib/api';

export const dynamic = 'force-dynamic';

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

export default async function MatchPage() {
  const [ranking, parlamentares, partidos] = await Promise.all([
    getRankingParlamentares(350),
    getParlamentares(),
    getPartidos(),
  ]);

  const partidosMap = new Map(partidos.map((partido) => [partido.sigla, partido]));

  const rows: MatchRow[] = ranking.map((item) => {
    const perfilLocal = findLocalPerfil(parlamentares, item.nome, item.cargo);
    const partido = partidosMap.get(perfilLocal?.partido ?? item.partido);

    return {
      id: item.id,
      nome: item.nome,
      cargo: item.cargo,
      partidoSigla: perfilLocal?.partido ?? item.partido,
      partidoNome: partido?.nome ?? item.partido,
      uf: perfilLocal?.uf ?? item.uf,
      nota: item.ranking.nota,
      rankingGeral: item.ranking.rankingGeral,
      espectro: partido?.espectro ?? null,
      espectroEixo: partido?.espectroEixo ?? null,
      familiaPolitica: partido?.familiaPolitica ?? null,
      perfilHref: perfilLocal ? getPerfilHref(perfilLocal) : null,
      fonteUrl: item.fonteUrl,
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <section className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-5xl uppercase mb-4">Match eleitoral</h1>
            <p className="font-body font-bold text-lg uppercase opacity-80">
              Filtre por estado, casa, campo político, família política e partido para encontrar
              nomes mais próximos do que você procura.
            </p>
          </section>

          <MatchExperience rows={rows} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
