'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section
      id="busca"
      className="relative overflow-hidden pt-20 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-12 h-56 w-56 bg-primary-container border-4 border-black rotate-12" />
        <div className="absolute top-24 -right-12 h-72 w-72 bg-secondary-fixed border-4 border-black -rotate-12" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[26vw] font-black text-black/5 select-none">
          PUBLICO
        </div>
      </div>

      <p className="font-label font-bold uppercase tracking-[0.3em] text-on-background/70 mb-4">
        Fontes oficiais. Rastro publico. Zero chute juridico.
      </p>
      <h1 className="font-headline font-black text-6xl md:text-8xl leading-none tracking-tighter mb-6 text-on-background uppercase">
        Nao acuse <br /> no <span className="bg-primary-container px-4 text-on-primary-fixed">escuro</span>. <br /> confira na fonte.
      </h1>
      <p className="font-body font-bold text-xl md:text-2xl max-w-4xl mb-12 uppercase">
        Pesquise deputados e senadores em exercicio com dados rastreaveis da Camara e do Senado.
        Quando uma informacao ainda nao tiver API oficial auditada, ela simplesmente nao entra no ar.
      </p>

      <form
        onSubmit={handleSearch}
        className="w-full max-w-4xl flex flex-col md:flex-row gap-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black"
      >
        <div className="flex-grow flex items-center bg-white px-6 py-4">
          <span className="material-symbols-outlined text-4xl mr-4">search</span>
          <input
            className="w-full border-none focus:outline-[0px] focus:ring-0 text-xl font-headline font-bold uppercase placeholder-black/30"
            placeholder="PESQUISE UM NOME, PARTIDO OU UF..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-container text-on-primary-fixed font-headline font-black text-2xl px-12 py-4 border-t-4 md:border-t-0 md:border-l-4 border-black hover:bg-on-primary-fixed hover:text-primary-container transition-colors uppercase cursor-pointer"
        >
          BUSCAR
        </button>
      </form>

      <div className="mt-8 flex flex-col md:flex-row gap-4 font-label font-bold text-sm uppercase">
        <span className="flex items-center gap-2 bg-on-background text-white px-3 py-1">
          <span className="material-symbols-outlined text-sm">verified</span> CAMARA + SENADO
        </span>

        <span className="flex items-center gap-2 bg-on-background text-white px-3 py-1">
          <span className="material-symbols-outlined text-sm">shield</span> SEM PROCESSO SEM FONTE
        </span>

        <span className="flex items-center gap-2 bg-on-background text-white px-3 py-1">
          <span className="material-symbols-outlined text-sm">public</span> PRODUTO INDEPENDENTE
        </span>
      </div>
    </section>
  );
}
