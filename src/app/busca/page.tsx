import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {
  getCasaBadge,
  getFonteBadge,
  getPerfilHref,
  searchCandidatos,
} from '@/lib/api';

export const dynamic = 'force-dynamic';

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const unresolvedSearchParams = await searchParams;
  const q = typeof unresolvedSearchParams.q === 'string' ? unresolvedSearchParams.q : '';
  const resultados = await searchCandidatos(q);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-headline font-black text-5xl uppercase mb-8">
            Resultados para: <span className="bg-primary-container px-2">{q || 'Busca'}</span>
          </h1>
          <p className="font-body font-bold uppercase text-sm opacity-70 mb-10">
            O buscador retorna perfis diretamente das APIs oficiais da Câmara e do Senado.
          </p>

          {resultados.length === 0 ? (
            <div className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
              <h2 className="font-headline font-black text-3xl uppercase">
                Nenhum perfil oficial encontrado
              </h2>
              <p className="font-body font-bold mt-2">
                Tente buscar por outro nome, partido, cargo ou UF.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resultados.map((perfil) => (
                <Link
                  key={`${perfil.fonte}-${perfil.id}`}
                  href={getPerfilHref(perfil)}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <div className="w-32 h-auto border-r-4 border-black bg-gray-200 shrink-0">
                    {perfil.foto_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={perfil.foto_url}
                        alt={perfil.nome_urna}
                        className="w-full h-full object-cover grayscale"
                      />
                    ) : (
                      <div className="w-full h-full min-h-32 flex items-center justify-center font-headline font-black text-3xl">
                        {getInitials(perfil.nome_urna)}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <span className="font-label font-bold text-xs uppercase opacity-70 mb-1">
                      {perfil.partido} - {perfil.cargo} {perfil.uf ? `- ${perfil.uf}` : ''}
                    </span>
                    <h3 className="font-headline font-black text-2xl uppercase leading-none mb-2">
                      {perfil.nome_urna}
                    </h3>
                    <span className="font-label font-bold text-xs bg-secondary-fixed text-on-secondary-fixed px-2 py-1 inline-block w-max mb-2">
                      {getCasaBadge(perfil)}
                    </span>
                    <span className="font-label font-bold text-[11px] uppercase opacity-70 mb-4">
                      {getFonteBadge(perfil)}
                    </span>
                    <span className="font-headline font-black uppercase text-lg border-b-4 border-black w-max">
                      Abrir perfil
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block font-headline font-black uppercase text-xl border-b-4 border-black hover:text-primary-container transition-colors"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
