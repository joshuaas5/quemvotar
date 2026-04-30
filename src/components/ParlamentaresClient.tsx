'use client';

import { useState, useMemo, useTransition, memo } from 'react';
import Image from 'next/image';
import LoadingLink from '@/components/LoadingLink';
import type { PerfilPublico, PartidoResumo } from '@/lib/official';
import { getCasaBadge, getPerfilHref } from '@/lib/api';
import { getPartyLogoBySigla, getPartyVisualEmoji } from '@/lib/party-logos';

const ITEMS_PER_PAGE = 24;

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

const ParlamentarCard = memo(function ParlamentarCard({ perfil }: { perfil: PerfilPublico }) {
  const logo = getPartyLogoBySigla(perfil.partido);
  const visual = getPartyVisualEmoji(perfil.partido);

  return (
    <LoadingLink
      href={getPerfilHref(perfil)}
      className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:scale-[0.97] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 transition-all duration-150 cursor-pointer"
    >
      <div className="aspect-square border-b-4 border-black bg-surface-container-high overflow-hidden relative">
        {perfil.foto_url ? (
          <Image
            src={perfil.foto_url}
            alt={perfil.nome_urna}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top"
            quality={60}
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
            <Image src={logo} alt={`Logo ${perfil.partido}`} width={32} height={32} className="object-contain rounded-full bg-white border-2 border-black p-1" />
          ) : null}
          <p className="font-body font-bold uppercase text-sm text-on-surface/90">
            {visual} {perfil.partido} {perfil.uf ? `• ${perfil.uf}` : ''} • {perfil.cargo}
          </p>
        </div>
        <span className="font-headline font-black uppercase border-b-4 border-black inline-block">
          Abrir perfil
        </span>
      </div>
    </LoadingLink>
  );
});

interface ParlamentaresClientProps {
  parlamentares: PerfilPublico[];
  partidos: PartidoResumo[];
  ufs: string[];
}

export default function ParlamentaresClient({ parlamentares, partidos, ufs }: ParlamentaresClientProps) {
  const [q, setQ] = useState('');
  const [partidoFilter, setPartidoFilter] = useState('');
  const [ufFilter, setUfFilter] = useState('');
  const [casaFilter, setCasaFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isPending, startTransition] = useTransition();

  const resultados = useMemo(() => {
    const query = q.trim().toLowerCase();
    return parlamentares.filter((perfil) => {
      const matchesQ =
        !query ||
        [perfil.nome_urna, perfil.partido, perfil.uf ?? '', perfil.cargo]
          .join(' ')
          .toLowerCase()
          .includes(query);
      const matchesParty = !partidoFilter || perfil.partido === partidoFilter;
      const matchesUf = !ufFilter || perfil.uf === ufFilter;
      const matchesHouse = !casaFilter || perfil.fonte === casaFilter;
      return matchesQ && matchesParty && matchesUf && matchesHouse;
    });
  }, [parlamentares, q, partidoFilter, ufFilter, casaFilter]);

  const visiveis = resultados.slice(0, visibleCount);
  const temMais = visibleCount < resultados.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setQ(e.target.value);
      setVisibleCount(ITEMS_PER_PAGE);
    });
  };

  const handleFilterChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      setter(e.target.value);
      setVisibleCount(ITEMS_PER_PAGE);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
      <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">Parlamentares em Exercicio</h1>
        <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
          Encontre deputados e senadores por nome, partido, UF e casa legislativa.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-4"
      >
        <input
          type="text"
          value={q}
          onChange={handleSearchChange}
          placeholder="Nome ou partido"
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase"
        />

        <select
          value={partidoFilter}
          onChange={handleFilterChange(setPartidoFilter)}
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
          value={ufFilter}
          onChange={handleFilterChange(setUfFilter)}
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
          value={casaFilter}
          onChange={handleFilterChange(setCasaFilter)}
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
          {isPending && <span className="ml-2 text-sm opacity-50">(filtrando...)</span>}
        </p>
        <div className="flex flex-wrap gap-4">
          <LoadingLink href="/ranking" className="font-headline font-black uppercase border-b-4 border-black">
            Ver ranking
          </LoadingLink>
          <LoadingLink href="/partidos" className="font-headline font-black uppercase border-b-4 border-black">
            Ver partidos
          </LoadingLink>
        </div>
      </section>

      {resultados.length === 0 ? (
        <div className="bg-white border-4 border-black p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
          <h2 className="font-headline font-black text-2xl md:text-3xl uppercase">
            Nenhum parlamentar encontrado
          </h2>
          <p className="font-body font-bold mt-2">
            Tente ajustar os filtros ou limpar a busca.
          </p>
          <button
            onClick={() => { setQ(''); setPartidoFilter(''); setUfFilter(''); setCasaFilter(''); setVisibleCount(ITEMS_PER_PAGE); }}
            className="mt-6 bg-black text-white font-headline font-black px-6 py-3 uppercase border-4 border-black hover:bg-white hover:text-black transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {visiveis.map((perfil) => (
              <ParlamentarCard key={`${perfil.fonte}-${perfil.id}`} perfil={perfil} />
            ))}
          </section>
          {temMais && (
            <div className="flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                className="bg-white border-4 border-black font-headline font-black px-8 py-4 uppercase text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Carregar mais 24
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
