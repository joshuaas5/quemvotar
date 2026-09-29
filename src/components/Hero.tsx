'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UF_LISTA } from '@/lib/candidatos/ufs';

export default function Hero() {
  const [query, setQuery] = useState('');
  const [uf, setUf] = useState('SP');
  const [cargo, setCargo] = useState('1');
  const router = useRouter();
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const selectedCargo = ['7', '8'].includes(cargo) ? (uf === 'DF' ? '8' : '7') : cargo;
    const params = new URLSearchParams({ uf: selectedCargo === '1' ? 'BR' : uf, cargo: selectedCargo });
    if (query.trim()) params.set('q', query.trim());
    router.push(`/candidatos?${params}`);
  };
  return <section id="match-home" className="h-full border-4 border-black bg-[#FFFDF5] p-5 text-black shadow-[6px_6px_0_0_#000] sm:p-6" aria-labelledby="match-home-title">
    <p className="mb-3 inline-block border-2 border-black bg-[#FF4D8D] px-3 py-1 font-label text-xs font-black uppercase">Match e busca · candidatos 2026</p>
    <h2 id="match-home-title" className="font-headline text-3xl font-black uppercase leading-tight sm:text-4xl">Quem combina com o seu voto?</h2>
    <p className="mt-4 font-body font-semibold leading-relaxed">Responda 10 perguntas, conheça sua afinidade com os candidatos e compare a base de cada resultado.</p>
    <Link href="/match/candidatos" className="mt-5 flex items-center justify-between border-4 border-black bg-[#FF4D8D] px-4 py-4 font-headline text-xl font-black uppercase shadow-[4px_4px_0_0_#000] hover:bg-[#FFD709]">Fazer o Match 2026 <span aria-hidden="true">→</span></Link>
    <div className="mt-7 border-t-2 border-black pt-5">
      <h3 className="font-headline text-lg font-black uppercase">Ou procure um candidato</h3>
      <form onSubmit={handleSearch} className="mt-3 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="font-label text-xs font-bold uppercase">Estado<select value={uf} disabled={cargo === '1'} onChange={event => setUf(event.target.value)} className="mt-1 w-full border-2 border-black bg-white p-2 text-sm disabled:opacity-60">{cargo === '1' ? <option value={uf}>Brasil · Presidente</option> : UF_LISTA.map(state => <option key={state.sigla} value={state.sigla}>{state.sigla} · {state.nome}</option>)}</select></label>
          <label className="font-label text-xs font-bold uppercase">Cargo<select value={['7', '8'].includes(cargo) ? (uf === 'DF' ? '8' : '7') : cargo} onChange={event => setCargo(event.target.value)} className="mt-1 w-full border-2 border-black bg-white p-2 text-sm"><option value="1">Presidente</option><option value="3">Governador</option><option value="5">Senador</option><option value="6">Deputado federal</option><option value={uf === 'DF' ? '8' : '7'}>Deputado {uf === 'DF' ? 'distrital' : 'estadual'}</option></select></label>
        </div>
        <label htmlFor="hero-search" className="sr-only">Nome ou partido do candidato</label>
        <input id="hero-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Nome ou partido (opcional)" className="w-full border-2 border-black bg-white px-3 py-3 font-body font-semibold" />
        <button type="submit" className="w-full cursor-pointer border-2 border-black bg-black px-4 py-3 font-headline font-black uppercase text-white hover:bg-[#9BF6FF] hover:text-black">Procurar candidatos →</button>
      </form>
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3 font-headline text-sm font-black"><Link href="/minha-urna" className="border-2 border-black bg-[#FFD709] p-3">Montar minha cola →</Link><Link href="/resultados" className="border-2 border-black bg-[#9BF6FF] p-3">Ver apuração →</Link></div>
  </section>;
}
