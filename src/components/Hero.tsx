'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/parlamentares?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none -z-10"
        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      />
      <h1 className="font-headline font-black text-6xl md:text-8xl leading-none tracking-tighter mb-6 text-on-background uppercase">
        NÃƒO ELEJA <br /> NO <span className="bg-primary-container px-4 text-on-primary-fixed">ESCURO</span>. <br /> VOTE COM DADOS.
      </h1>
      <p className="font-body font-medium text-xl md:text-2xl max-w-3xl mb-12 uppercase">
        Consulte deputados, senadores, partidos, lideranÃ§as e notas pÃºblicas com base em dados
        oficiais e referÃªncias auditÃ¡veis.
      </p>

      <form
        onSubmit={handleSearch}
        className="w-full max-w-4xl flex flex-col md:flex-row gap-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black"
      >
        <div className="flex-grow flex items-center bg-white px-6 py-4">
          <span className="material-symbols-outlined text-4xl mr-4">search</span>
          <input
            className="w-full border-none focus:outline-[0px] focus:ring-0 text-xl font-headline font-bold uppercase placeholder-black/30"
            placeholder="Pesquise um parlamentar, partido ou UF..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-container text-on-primary-fixed font-headline font-black text-2xl px-12 py-4 border-t-4 md:border-t-0 md:border-l-4 border-black hover:bg-on-primary-fixed hover:text-primary-container transition-colors uppercase cursor-pointer"
        >
          Buscar
        </button>
      </form>

      <div className="mt-8 flex flex-col md:flex-row gap-4 font-label font-bold text-sm uppercase">
        <span className="flex items-center gap-2 bg-on-background text-white px-3 py-1">
          <span className="material-symbols-outlined text-sm">verified</span> Dados oficiais da
          CÃ¢mara e do Senado
        </span>

        <span className="flex items-center gap-2 bg-on-background text-white px-3 py-1">
          <span className="material-symbols-outlined text-sm">leaderboard</span> ReferÃªncias
          pÃºblicas de acompanhamento legislativo
        </span>
      </div>
    </section>
  );
}


