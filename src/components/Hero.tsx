'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      <h1 className="font-headline font-black text-4xl sm:text-6xl md:text-8xl leading-none tracking-tighter mb-4 sm:mb-6 text-on-background uppercase">
        NÃO ELEJA <br /> NO <span className="bg-primary-container px-2 sm:px-4 text-on-primary-fixed">ESCURO</span>. <br /> VOTE COM DADOS.
      </h1>
      <p className="font-body font-bold text-base sm:text-xl md:text-2xl max-w-3xl mb-8 sm:mb-12 uppercase">
        Consulte deputados, senadores, partidos, lideranças e notas públicas com base em dados
        oficiais e referências auditáveis.
      </p>

      <form
        onSubmit={handleSearch}
        className="w-full max-w-4xl flex flex-col sm:flex-row gap-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black"
      >
        <div className="flex-grow flex items-center bg-white px-4 sm:px-6 py-3 sm:py-4">
          <span className="material-symbols-outlined text-2xl sm:text-4xl mr-3 sm:mr-4">search</span>
          <input
            className="w-full border-none focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-base sm:text-xl font-headline font-bold uppercase placeholder-black/30"
            placeholder="Pesquise um parlamentar, partido ou UF..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-container text-on-primary-fixed font-headline font-black text-lg sm:text-2xl px-8 sm:px-12 py-3 sm:py-4 border-t-4 sm:border-t-0 sm:border-l-4 border-black hover:bg-on-primary-fixed hover:text-primary-container transition-colors uppercase cursor-pointer"
        >
          Buscar
        </button>
      </form>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 font-label font-bold text-xs sm:text-sm uppercase">
        <span className="flex items-center gap-2 bg-on-background text-white px-3 py-1">
          <span className="material-symbols-outlined text-sm">verified</span> Dados oficiais da
          Câmara e do Senado
        </span>
        <span className="flex items-center gap-2 bg-on-background text-white px-3 py-1">
          <span className="material-symbols-outlined text-sm">database</span> Fontes externas
          auditáveis
        </span>
      </div>
    </section>
  );
}
