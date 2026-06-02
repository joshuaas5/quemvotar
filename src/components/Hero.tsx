'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from './Icon';

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
    <section className="qv-grid-bg relative overflow-hidden py-10 sm:py-16 px-4 sm:px-6">
      <div className="relative max-w-7xl mx-auto border-4 border-black qv-dark-panel shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FFD709] border-4 border-black rotate-12" />
        <div className="absolute right-16 bottom-10 w-28 h-28 bg-[#FF4D8D] border-4 border-black -rotate-12 hidden md:block" />
        <div className="absolute left-8 bottom-8 w-24 h-24 bg-[#9BF6FF] border-4 border-black rotate-45 hidden lg:block" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-8 lg:gap-12 p-6 sm:p-10 lg:p-14">
          <div className="text-left">
            <p className="inline-block bg-[#9BF6FF] text-black font-label font-black text-xs sm:text-sm uppercase px-3 py-1 mb-5 border-2 border-black">
              Clareza na política
            </p>
            <h1 className="font-headline font-black text-4xl sm:text-6xl md:text-8xl leading-none tracking-tighter mb-5 sm:mb-6 uppercase">
              NÃO ELEJA <br /> NO <span className="bg-primary-container px-2 sm:px-4 text-on-primary-fixed">ESCURO</span>. <br /> VOTE COM DADOS.
            </h1>
            <p className="font-body font-bold text-base sm:text-xl md:text-2xl max-w-4xl mb-8 sm:mb-10 uppercase opacity-90 leading-relaxed">
              Consulte deputados, senadores, partidos, lideranças e notas públicas com base em dados oficiais, guias editoriais e referências auditáveis.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div className="bg-white text-black border-4 border-black p-4 shadow-[5px_5px_0px_0px_rgba(255,215,9,1)]">
                <p className="font-headline font-black text-3xl uppercase">Guias</p>
                <p className="font-label font-bold uppercase text-xs">contexto antes do voto</p>
              </div>
              <div className="bg-[#9BF6FF] text-black border-4 border-black p-4 shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]">
                <p className="font-headline font-black text-3xl uppercase">Dados</p>
                <p className="font-label font-bold uppercase text-xs">fontes verificáveis</p>
              </div>
              <Link href="/comparar" className="bg-[#FFB3D9] text-black border-4 border-black p-4 shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all">
                <p className="font-headline font-black text-3xl uppercase">Comparar</p>
                <p className="font-label font-bold uppercase text-xs">dois perfis lado a lado</p>
              </Link>
            </div>
          </div>

          <aside className="bg-white text-black border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(255,215,9,1)] h-max lg:mt-8">
            <p className="font-label font-black uppercase text-xs opacity-70 mb-2">Comece por aqui</p>
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase leading-none mb-4">
              Busque uma pessoa, partido ou UF
            </h2>
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-0 border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center bg-white px-4 py-3 border-b-4 border-black">
                <Icon name="search" className="w-6 h-6 mr-3 shrink-0" />
                <input
                  className="w-full border-none focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-base font-headline font-bold uppercase placeholder-black/30"
                  placeholder="Nome, partido ou UF"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-primary-container text-on-primary-fixed font-headline font-black text-lg px-8 py-4 border-black hover:bg-black hover:text-white transition-colors uppercase cursor-pointer"
              >
                Buscar dados
              </button>
            </form>
          </aside>
        </div>

        <div className="relative border-t-4 border-black bg-white text-black px-6 sm:px-10 py-4 flex flex-col sm:flex-row gap-3 sm:gap-4 font-label font-bold text-xs sm:text-sm uppercase">
          <span className="flex items-center gap-2 bg-black text-white border-2 border-black px-3 py-1 w-max">
            <Icon name="verified" className="w-4 h-4 shrink-0" /> Câmara e Senado
          </span>
          <span className="flex items-center gap-2 bg-[#C8FF8C] text-black border-2 border-black px-3 py-1 w-max">
            <Icon name="database" className="w-4 h-4 shrink-0" /> Fontes auditáveis
          </span>
          <span className="flex items-center gap-2 bg-[#FFD709] text-black border-2 border-black px-3 py-1 w-max">
            Conteúdo editorial próprio
          </span>
        </div>
      </div>
    </section>
  );
}
