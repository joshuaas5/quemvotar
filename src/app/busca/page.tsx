import { searchCandidatos } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
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
            Resultados para: <span className="bg-primary-container px-2">{q || 'Tudo'}</span>
          </h1>
          
          {resultados.length === 0 ? (
            <div className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
              <h2 className="font-headline font-black text-3xl uppercase">NEHUM CANDIDATO ENCONTRADO</h2>
              <p className="font-body font-bold mt-2">Tente buscar por outro nome ou partido.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resultados.map((c) => (
                <div key={c.id} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="w-32 h-auto border-r-4 border-black bg-gray-200 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.foto_url || "https://fakeimg.pl/200x200?text=Sem+Foto"} alt={c.nome_urna} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <span className="font-label font-bold text-xs uppercase opacity-70 mb-1">{c.partido} - {c.cargo}</span>
                    <h3 className="font-headline font-black text-2xl uppercase leading-none mb-2">{c.nome_urna}</h3>
                    {c.num_processos_stf > 0 ? (
                      <span className="font-label font-bold text-xs bg-tertiary text-white px-2 py-1 inline-block w-max">
                        {c.num_processos_stf} PROCESSOS NO STF
                      </span>
                    ) : (
                      <span className="font-label font-bold text-xs bg-secondary-fixed text-on-secondary-fixed px-2 py-1 inline-block w-max">
                        FICHA LIMPA
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/" className="inline-block font-headline font-black uppercase text-xl border-b-4 border-black hover:text-primary-container transition-colors">
              VOLTAR AO INÍCIO
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
