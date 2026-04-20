import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getParlamentares, getPerfilHref, getRankingParlamentares, type PerfilPublico } from '@/lib/api';
import { getPartyLogoBySigla, getPartyVisualEmoji } from '@/lib/party-logos';

export const revalidate = 1800;

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

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">Ranking dos Parlamentares 🏆</h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
              Nota pública de desempenho legislativo com referência ao Ranking dos Políticos.
            </p>
          </section>

          <form className="bg-white border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
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

          <section className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-headline font-black text-xl md:text-2xl uppercase">
              {resultados.length} parlamentares no recorte atual
            </p>
            <Link href="/parlamentares" className="font-headline font-black uppercase border-b-4 border-black">
              Explorar todos
            </Link>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {resultados.map((item) => {
              const perfilLocal = findLocalPerfil(parlamentares, item.nome, item.cargo, item.uf);
              const logo = getPartyLogoBySigla(item.partido);
              const visual = getPartyVisualEmoji(item.partido);

              return (
                <article
                  key={item.id}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
                >
                  <div className="grid grid-cols-[96px_minmax(0,1fr)] md:grid-cols-[120px_minmax(0,1fr)] border-b-4 border-black">
                    <div className="bg-surface-container-high min-h-[96px] md:min-h-[120px]">
                      {item.fotoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.fotoUrl}
                          alt={item.nome}
                          className="w-full h-full object-cover object-top"
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
                      <div className="flex items-center gap-2">
                        {logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={logo} alt={`Logo ${item.partido}`} className="w-7 h-7 object-contain rounded-full bg-white border-2 border-black p-1" />
                        ) : null}
                        <p className="font-body font-bold">{visual} {item.partido}</p>
                      </div>
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
                        <Link
                          href={getPerfilHref(perfilLocal)}
                          className="font-headline font-black uppercase border-b-4 border-black"
                        >
                          Abrir perfil no site
                        </Link>
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
                </article>
              );
            })}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}



