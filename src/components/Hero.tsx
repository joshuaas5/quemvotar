'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from './Icon';

export default function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      router.push('/busca?q=' + encodeURIComponent(query.trim()));
    }
  };

  return (
    <section className="qv-grid-bg relative overflow-hidden px-4 py-8 sm:px-6 sm:py-14">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-4 border-black qv-dark-panel shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute -right-10 -top-10 h-40 w-40 rotate-12 border-4 border-black bg-[#FFD709]" />
        <div className="absolute -bottom-12 -left-10 hidden h-32 w-32 rotate-45 border-4 border-black bg-[#9BF6FF] sm:block" />

        <div className="relative px-5 py-10 text-center sm:px-10 sm:py-14 lg:px-16">
          <p className="mb-5 inline-block border-2 border-black bg-[#9BF6FF] px-3 py-1 font-label text-xs font-black uppercase text-black sm:text-sm">
            {'Seu voto. Sua escolha.'}
          </p>
          <h1 className="mx-auto max-w-5xl font-headline text-4xl font-black uppercase leading-[1.04] tracking-tighter sm:text-6xl md:text-7xl">
            <span className="block">{'Descubra quem combina'}</span>
            <span className="mt-1 inline-block bg-primary-container px-2 py-1 leading-none text-on-primary-fixed sm:px-3">{'com o seu voto'}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl font-body text-base font-semibold leading-relaxed sm:text-xl">
            {'Responda 10 perguntas r\u00e1pidas e veja quais parlamentares t\u00eam mais afinidade com voc\u00ea. \u00c9 gr\u00e1tis e n\u00e3o precisa criar conta.'}
          </p>

          <Link
            href="/match"
            className="group mx-auto mt-8 flex w-full max-w-2xl items-center justify-between gap-4 border-4 border-black bg-[#FF4D8D] p-4 text-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] sm:px-6 sm:py-5"
          >
            <span className="text-left">
              <span className="block font-headline text-2xl font-black uppercase leading-none sm:text-4xl">{'Fazer o Match'}</span>
              <span className="mt-1 block font-body text-sm font-bold sm:text-base">{'Comece agora e compartilhe o seu resultado.'}</span>
            </span>
            <span aria-hidden="true" className="shrink-0 border-4 border-black bg-black px-4 py-3 font-headline text-2xl font-black text-white group-hover:bg-white group-hover:text-black">
              {'\u2192'}
            </span>
          </Link>

          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-3 gap-2 text-black sm:gap-3">
            <div className="border-2 border-black bg-white px-2 py-3 font-label text-xs font-black uppercase sm:text-sm">{'10 perguntas'}</div>
            <div className="border-2 border-black bg-[#C8FF8C] px-2 py-3 font-label text-xs font-black uppercase sm:text-sm">{'Gr\u00e1tis'}</div>
            <div className="border-2 border-black bg-[#FFD709] px-2 py-3 font-label text-xs font-black uppercase sm:text-sm">{'Sem cadastro'}</div>
          </div>
        </div>

        <div className="relative border-t-4 border-black bg-white px-5 py-6 text-black sm:px-10">
          <p className="text-center font-body text-sm font-bold sm:text-base">{'Quer encontrar algu\u00e9m espec\u00edfico?'}</p>
          <form onSubmit={handleSearch} className="mx-auto mt-3 flex max-w-2xl flex-col overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:flex-row">
            <label htmlFor="hero-search" className="sr-only">{'Nome, partido ou estado'}</label>
            <div className="flex flex-1 items-center gap-3 bg-white px-4 py-3">
              <Icon name="search" className="h-5 w-5 shrink-0" />
              <input
                id="hero-search"
                className="w-full border-none font-body font-semibold outline-none placeholder:text-black/45"
                placeholder="Nome, partido ou estado"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <button type="submit" className="cursor-pointer border-t-4 border-black bg-black px-6 py-3 font-headline text-lg font-black uppercase text-white transition-colors hover:bg-[#FFD709] hover:text-black sm:border-l-4 sm:border-t-0">
              {'Buscar'}
            </button>
          </form>
          <Link href="/comparar" className="mt-4 block text-center font-label text-sm font-black underline underline-offset-4">
            {'Ou compare dois pol\u00edticos lado a lado'}
          </Link>
        </div>
      </div>
    </section>
  );
}
