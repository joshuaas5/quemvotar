'use client';

import Image from 'next/image';
import LoadingLink from '@/components/LoadingLink';
import Icon from '@/components/Icon';
import { useFavoritos } from '@/hooks/useFavoritos';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

function getInitials(nome: string) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('');
}

export default function FavoritosPage() {
  const { favoritos, removeFavorito, loaded } = useFavoritos();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Favoritos' }]} />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">
              Meus Favoritos
            </h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
              Parlamentares que voce esta acompanhando. Os dados sao salvos localmente no seu navegador.
            </p>
          </section>

          {!loaded ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-pulse aspect-[3/4]" />
              ))}
            </div>
          ) : favoritos.length === 0 ? (
            <div className="bg-white border-4 border-black p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Icon name="bookmark" className="w-16 h-16 mb-4" />
              <h2 className="font-headline font-black text-2xl md:text-3xl uppercase">
                Nenhum favorito ainda
              </h2>
              <p className="font-body font-bold mt-2 max-w-lg mx-auto">
                Ao navegar pelos perfis dos parlamentares, clique no icone de coracao para adiciona-los aqui.
              </p>
              <LoadingLink
                href="/parlamentares"
                className="inline-block mt-6 bg-black text-white font-headline font-black px-6 py-3 uppercase border-4 border-black hover:bg-white hover:text-black transition-colors"
              >
                Explorar parlamentares
              </LoadingLink>
            </div>
          ) : (
            <>
              <p className="font-headline font-black text-xl md:text-2xl uppercase">
                {favoritos.length} parlamentar{favoritos.length > 1 ? 'es' : ''} salvo{favoritos.length > 1 ? 's' : ''}
              </p>

              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {favoritos.map((fav) => {
                  const perfilHref = `/perfil/${fav.fonte}/${fav.id}`;
                  return (
                    <div
                      key={`${fav.fonte}-${fav.id}`}
                      className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:scale-[0.97] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 transition-all duration-150"
                    >
                      <LoadingLink href={perfilHref} className="aspect-square border-b-4 border-black bg-surface-container-high overflow-hidden relative block">
                        {fav.foto_url ? (
                          <Image
                            src={fav.foto_url}
                            alt={fav.nome_urna}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover object-top"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-headline font-black text-5xl">
                            {getInitials(fav.nome_urna)}
                          </div>
                        )}
                      </LoadingLink>
                      <div className="p-5 md:p-6 space-y-3 flex-1">
                        <LoadingLink href={perfilHref}>
                          <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-none hover:underline">
                            {fav.nome_urna}
                          </h2>
                        </LoadingLink>
                        <p className="font-body font-bold uppercase text-sm text-on-surface/90">
                          {fav.partido} • {fav.uf} • {fav.cargo}
                        </p>
                        <div className="pt-2 flex items-center justify-between">
                          <LoadingLink
                            href={perfilHref}
                            className="font-headline font-black uppercase border-b-4 border-black inline-block"
                          >
                            Abrir perfil
                          </LoadingLink>
                          <button
                            onClick={() => removeFavorito(fav.id, fav.fonte)}
                            className="w-9 h-9 border-2 border-black bg-white flex items-center justify-center hover:bg-[#ff006e] hover:text-white transition-colors"
                            aria-label="Remover dos favoritos"
                          >
                            <Icon name="delete" className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
