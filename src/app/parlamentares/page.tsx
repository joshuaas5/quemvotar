import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getCasaBadge, getParlamentares, getPartidos, getPerfilHref } from '@/lib/api';
import { getPartyLogoBySigla, getPartyVisualEmoji } from '@/lib/party-logos';

export const revalidate = 1800;

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

export default async function ParlamentaresPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q.trim() : '';
  const partido = typeof params.partido === 'string' ? params.partido.trim().toUpperCase() : '';
  const uf = typeof params.uf === 'string' ? params.uf.trim().toUpperCase() : '';
  const casa = typeof params.casa === 'string' ? params.casa.trim().toLowerCase() : '';

  const [parlamentares, partidos] = await Promise.all([getParlamentares(), getPartidos()]);

  const resultados = parlamentares.filter((perfil) => {
    const matchesQ =
      !q ||
      [perfil.nome_urna, perfil.partido, perfil.uf ?? '', perfil.cargo]
        .join(' ')
        .toLowerCase()
        .includes(q.toLowerCase());
    const matchesParty = !partido || perfil.partido === partido;
    const matchesUf = !uf || perfil.uf === uf;
    const matchesHouse = !casa || perfil.fonte === casa;

    return matchesQ && matchesParty && matchesUf && matchesHouse;
  });

  const ufs = Array.from(
    new Set(parlamentares.map((perfil) => perfil.uf).filter((value): value is string => Boolean(value))),
  ).sort((a, b) => a.localeCompare(b, 'pt-BR'));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">Parlamentares em Exercicio</h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
              Encontre deputados e senadores por nome, partido, UF e casa legislativa.
            </p>
          </section>

          <form className="bg-white border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-4">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Nome ou partido"
              className="border-4 border-black px-4 py-3 font-headline font-bold uppercase"
            />

            <select
              name="partido"
              defaultValue={partido}
              className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
            >
              <option value="">Todos os partidos</option>
              {partidos.map((item) => (
                <option key={item.sigla} value={item.sigla}>
                  {item.sigla}
                </option>
              ))}
            </select>

            <select
              name="uf"
              defaultValue={uf}
              className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
            >
              <option value="">Todas as UFs</option>
              {ufs.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              name="casa"
              defaultValue={casa}
              className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
            >
              <option value="">Camara e Senado</option>
              <option value="camara">Camara</option>
              <option value="senado">Senado</option>
            </select>

            <button
              type="submit"
              className="bg-primary-container border-4 border-black px-6 py-3 font-headline font-black uppercase"
            >
              Aplicar filtros
            </button>
          </form>

          <section className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-headline font-black text-xl md:text-2xl uppercase">
              {resultados.length} parlamentares encontrados
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/ranking" className="font-headline font-black uppercase border-b-4 border-black">
                Ver ranking
              </Link>
              <Link href="/partidos" className="font-headline font-black uppercase border-b-4 border-black">
                Ver partidos
              </Link>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {resultados.map((perfil) => {
              const logo = getPartyLogoBySigla(perfil.partido);
              const visual = getPartyVisualEmoji(perfil.partido);

              return (
                <Link
                  key={`${perfil.fonte}-${perfil.id}`}
                  href={getPerfilHref(perfil)}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:shadow-[0_10px_20px_rgba(0,0,0,0.14)] transition-shadow duration-200"
                >
                  
                  <div className="aspect-square border-b-4 border-black bg-surface-container-high overflow-hidden">
                    {perfil.foto_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={perfil.foto_url}
                        alt={perfil.nome_urna}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-headline font-black text-5xl">
                        {getInitials(perfil.nome_urna)}
                      </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6 space-y-3">
                    <span className="font-label font-bold uppercase text-xs text-on-surface-variant/90">
                      {getCasaBadge(perfil)}
                    </span>
                    <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-none">
                      {perfil.nome_urna}
                    </h2>
                    <div className="flex items-center gap-2">
                      {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logo} alt={`Logo ${perfil.partido}`} className="w-8 h-8 object-contain rounded-full bg-white border-2 border-black p-1" />
                      ) : null}
                      <p className="font-body font-bold uppercase text-sm text-on-surface/90">
                        {visual} {perfil.partido} {perfil.uf ? `• ${perfil.uf}` : ''} • {perfil.cargo}
                      </p>
                    </div>
                    <span className="font-headline font-black uppercase border-b-4 border-black inline-block">
                      Abrir perfil
                    </span>
                  </div>
                </Link>
              );
            })}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}






