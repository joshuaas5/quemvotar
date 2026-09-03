import type { Metadata } from "next";
import Image from 'next/image';
import Icon from '@/components/Icon';
import LoadingLink from '@/components/LoadingLink';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { getParlamentares, getPerfilHref, getRankingParlamentares, type PerfilPublico } from '@/lib/api';
import { getPartyLogoBySigla, getPartyVisualEmoji } from '@/lib/party-logos';
import { AdLeaderboard } from '@/components/ads/Adsterra';

export const metadata: Metadata = {
  title: "Ranking de parlamentares",
  description:
    "Veja a nota pública de desempenho legislativo dos deputados e senadores com base no Ranking dos Políticos. Filtre por casa, UF e nome.",
  alternates: { canonical: "https://www.quemvotar.com.br/ranking" },
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function formatScore(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

function findLocalPerfil(perfis: PerfilPublico[], nome: string, cargo: string, uf: string) {
  const nomeNormalizado = normalizeText(nome);
  const cargoNormalizado = normalizeText(cargo);

  const filterCasaEState = (perfil: PerfilPublico) => {
    const mesmaCasa =
      (perfil.fonte === 'camara' && cargoNormalizado.includes('deputado')) ||
      (perfil.fonte === 'senado' && cargoNormalizado.includes('senador'));
    return mesmaCasa && (!uf || perfil.uf === uf);
  };

  // Exact match
  let target = perfis.find((perfil) => filterCasaEState(perfil) && normalizeText(perfil.nome_urna) === nomeNormalizado);
  
  if (!target) {
    // Fuzzy match
    target = perfis.find((perfil) => {
      if (!filterCasaEState(perfil)) return false;
      const pnome = normalizeText(perfil.nome_urna);
      const partesNome = nomeNormalizado.split(' ');
      const partesPnome = pnome.split(' ');
      
      // If at least half the parts match
      const acertos = partesNome.filter(p => pnome.includes(p) || p.length > 3 && partesPnome.some(pp => pp.includes(p) || p.includes(pp)));
      return acertos.length >= Math.min(2, partesNome.length);
    });
  }
  
  return target;
}

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q.trim() : '';
  const casa = typeof params.casa === 'string' ? params.casa.trim().toLowerCase() : ''; const uf = typeof params.uf === 'string' ? params.uf.trim().toUpperCase() : '';
  const fonte = casa === 'camara' || casa === 'senado' ? casa : undefined;

  const [ranking, parlamentares] = await Promise.all([
    getRankingParlamentares(30, fonte),
    getParlamentares(),
  ]);

  const ufs = Array.from(new Set(ranking.map(i => i.uf).filter(Boolean))).sort(); const resultados = ranking.filter((item) => { 
 if(uf && item.uf !== uf) return false; 
 if(!q) return true; 
 return [item.nome, item.partido, item.uf, item.cargo]
      .join(' ')
      .toLowerCase()
      .includes(q.toLowerCase());
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Ranking' }]} />
          <PageHero
            eyebrow="Desempenho público"
            title="Ranking de parlamentares"
            description="Nota pública de desempenho legislativo com referência ao Ranking dos Políticos."
            accent="yellow"
            stat={{ value: resultados.length.toLocaleString('pt-BR'), label: 'Parlamentares no recorte atual de filtros.' }}
          />

          <AdLeaderboard />

          <section className="bg-white border-4 border-black p-5 md:p-7 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-3">
              Como usar este ranking
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 font-body">
              <p className="font-medium leading-relaxed">
                {'Esta p\u00e1gina mostra um recorte de '}{ranking.length.toLocaleString('pt-BR')}{' parlamentares com dados publicados pelo Ranking dos Pol\u00edticos. A nota \u00e9 calculada e atualizada pela fonte externa; o QuemVotar apenas organiza o acesso a ela.'}
              </p>
              <p className="font-medium leading-relaxed">
                {'Ranking n\u00e3o \u00e9 recomenda\u00e7\u00e3o de voto. Compare a nota com o perfil, as vota\u00e7\u00f5es, as despesas, as autorias e os links oficiais antes de formar sua pr\u00f3pria conclus\u00e3o.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-5">
              <a
                href="https://ranking.org.br/ranking"
                target="_blank"
                rel="noreferrer"
                className="font-headline font-black uppercase border-b-4 border-black"
              >
                Consultar a fonte original
              </a>
              <LoadingLink href="/metodologia" className="font-headline font-black uppercase border-b-4 border-black">
                Entender a metodologia do site
              </LoadingLink>
            </div>
          </section>

          <form className="bg-[#FFD709] border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Nome, partido ou UF"
              className="border-4 border-black px-4 py-3 font-headline font-bold uppercase"
            />

            <select
              name="casa"
              defaultValue={casa}
              className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
            >
              <option value="">Camara e Senado</option>
              <option value="camara">Camara</option>
              <option value="senado">Senado</option>
            </select>

            <select name="uf" defaultValue={uf} className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"><option value="">Todas as UFs</option>{ufs.map(u => <option key={u} value={u}>{u}</option>)}</select>

            <button
              type="submit"
              className="bg-primary-container border-4 border-black px-6 py-3 font-headline font-black uppercase"
            >
              Aplicar filtros
            </button>
          </form>

          <p className="font-body font-medium text-sm">
            Os filtros atuam somente nos {ranking.length.toLocaleString('pt-BR')} registros carregados neste recorte.
          </p>

          <section className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-headline font-black text-xl md:text-2xl uppercase">
              {resultados.length} parlamentares no recorte atual
            </p>
            <LoadingLink href="/parlamentares" className="font-headline font-black uppercase border-b-4 border-black">
              Explorar todos
            </LoadingLink>
          </section>

          {resultados.length === 0 ? (
            <div className="bg-white border-4 border-black p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Icon name="search_off" className="w-16 h-16 mb-4" />
              <h2 className="font-headline font-black text-2xl md:text-3xl uppercase">
                Nenhum parlamentar encontrado
              </h2>
              <p className="font-body font-bold mt-2">
                Tente ajustar os filtros de casa, UF ou nome.
              </p>
              <a
                href="/ranking"
                className="inline-block mt-6 bg-black text-white font-headline font-black px-6 py-3 uppercase border-4 border-black hover:bg-white hover:text-black transition-colors"
              >
                Limpar filtros
              </a>
            </div>
          ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {resultados.map((item) => {
              const perfilLocal = findLocalPerfil(parlamentares, item.nome, item.cargo, item.uf);
              const logo = getPartyLogoBySigla(item.partido);
              const visual = getPartyVisualEmoji(item.partido);

              return (
                <LoadingLink
                  key={item.id}
                  href={perfilLocal ? getPerfilHref(perfilLocal) : item.fonteUrl}
                  target={perfilLocal ? '_self' : '_blank'}
                  rel={perfilLocal ? undefined : 'noreferrer'}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:scale-[0.97] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 transition-all duration-150 cursor-pointer block"
                >
                  <div className="grid grid-cols-[96px_minmax(0,1fr)] md:grid-cols-[120px_minmax(0,1fr)] border-b-4 border-black">
                    <div className="bg-surface-container-high min-h-[96px] md:min-h-[120px] relative">
                      {item.fotoUrl ? (
                        <Image
                          src={item.fotoUrl}
                          alt={item.nome}
                          fill
                          sizes="120px"
                          className="object-cover object-top"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-headline font-black text-3xl md:text-4xl">
                          {getInitials(item.nome)}
                        </div>
                      )}
                    </div>

                    <div className="p-4 md:p-5 space-y-2">
                      <p className="font-label font-bold uppercase text-xs opacity-70">
                        {item.cargo} • {item.uf}
                      </p>
                      <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-none">
                        {item.nome}
                      </h2>
                      <p className="font-body font-bold">{visual} {item.partido}</p>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-4 border-black p-4 bg-[#FFF4C2]">
                        <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Nota</p>
                        <p className="font-headline font-black text-4xl">
                          {formatScore(item.ranking.nota)}
                        </p>
                      </div>
                      <div className="border-4 border-black p-4 bg-[#D7F6FF]">
                        <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Ranking geral</p>
                        <p className="font-headline font-black text-4xl">
                          #{item.ranking.rankingGeral ?? '—'}
                        </p>
                      </div>
                    </div>

                    <p className="font-body font-medium">
                      {[
                        item.ranking.rankingCasa ? `Na casa: #${item.ranking.rankingCasa}` : null,
                        item.ranking.rankingEstado ? `No estado: #${item.ranking.rankingEstado}` : null,
                        item.ranking.rankingPartido ? `No partido: #${item.ranking.rankingPartido}` : null,
                      ]
                        .filter(Boolean)
                        .join(' • ')}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      {perfilLocal ? (
                        <LoadingLink
                          href={getPerfilHref(perfilLocal)}
                          className="font-headline font-black uppercase border-b-4 border-black"
                        >
                          Abrir perfil no site
                        </LoadingLink>
                      ) : null}
                      <a
                        href={item.fonteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-headline font-black uppercase border-b-4 border-black"
                      >
                        Ver fonte
                      </a>
                    </div>
                  </div>
                </LoadingLink>
              );
            })}
          </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}



