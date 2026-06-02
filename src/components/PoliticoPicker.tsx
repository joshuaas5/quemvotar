'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Image from 'next/image';
import type { PerfilPublico } from '@/lib/api';

const ITEMS_PER_PAGE = 24;

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function spreadForDiscovery(items: PerfilPublico[]) {
  if (items.length <= ITEMS_PER_PAGE) return items;

  const step = Math.max(1, Math.floor(items.length / 36));
  const used = new Set<number>();
  const mixed: PerfilPublico[] = [];

  for (let index = 0; index < items.length && mixed.length < 36; index += step) {
    mixed.push(items[index]);
    used.add(index);
  }

  return [...mixed, ...items.filter((_, index) => !used.has(index))];
}

interface PoliticoPickerProps {
  parlamentares: PerfilPublico[];
  onSelect: (fonte: string, id: string) => void;
  selected?: { fonte: string; id: string } | null;
  disabledSelection?: { fonte: string; id: string } | null;
  label: string;
}

export function PoliticoPicker({ parlamentares, onSelect, selected, disabledSelection, label }: PoliticoPickerProps) {
  const [q, setQ] = useState('');
  const [casaFilter, setCasaFilter] = useState('');
  const [ufFilter, setUfFilter] = useState('');
  const [partidoFilter, setPartidoFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const deferredQuery = useDeferredValue(q);

  const options = useMemo(() => {
    const ufs = Array.from(new Set(parlamentares.map((p) => p.uf).filter((value): value is string => Boolean(value)))).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    const partidos = Array.from(new Set(parlamentares.map((p) => p.partido).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt-BR'));

    return { ufs, partidos };
  }, [parlamentares]);

  const filtrados = useMemo(() => {
    const query = normalizeText(deferredQuery);
    const filtered = parlamentares.filter((p) => {
      const matchesCasa = !casaFilter || p.fonte === casaFilter;
      const matchesUf = !ufFilter || p.uf === ufFilter;
      const matchesPartido = !partidoFilter || p.partido === partidoFilter;
      const matchesQuery = !query || normalizeText([p.nome_urna, p.partido, p.uf ?? '', p.cargo, p.casa].join(' ')).includes(query);

      return matchesCasa && matchesUf && matchesPartido && matchesQuery;
    });

    return query || casaFilter || ufFilter || partidoFilter ? filtered : spreadForDiscovery(filtered);
  }, [parlamentares, deferredQuery, casaFilter, ufFilter, partidoFilter]);

  const visibleItems = filtrados.slice(0, visibleCount);
  const hasMore = visibleCount < filtrados.length;
  const hasActiveFilter = Boolean(q.trim() || casaFilter || ufFilter || partidoFilter);

  const isSelected = (p: PerfilPublico) =>
    selected && selected.fonte === p.fonte && selected.id === p.idOrigem;

  const isDisabled = (p: PerfilPublico) =>
    disabledSelection && disabledSelection.fonte === p.fonte && disabledSelection.id === p.idOrigem;

  const resetVisibleCount = () => setVisibleCount(ITEMS_PER_PAGE);

  const clearFilters = () => {
    setQ('');
    setCasaFilter('');
    setUfFilter('');
    setPartidoFilter('');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div className="border-b-4 border-black p-4 bg-primary-container space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-headline font-black text-xl uppercase">{label}</h3>
            <p className="font-label font-bold uppercase text-xs opacity-70">
              {filtrados.length} perfis encontrados
            </p>
          </div>
          {hasActiveFilter ? (
            <button
              type="button"
              onClick={clearFilters}
              className="bg-white border-2 border-black px-3 py-1 font-headline font-black uppercase text-xs hover:bg-black hover:text-white transition-colors"
            >
              Limpar
            </button>
          ) : null}
        </div>
        <input
          type="text"
          value={q}
          onChange={(e) => { setQ(e.target.value); resetVisibleCount(); }}
          placeholder="Buscar por nome, partido ou UF..."
          className="w-full mt-2 border-4 border-black px-3 py-2 font-headline font-bold uppercase text-sm"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <select
            value={casaFilter}
            onChange={(e) => { setCasaFilter(e.target.value); resetVisibleCount(); }}
            className="border-2 border-black bg-white px-2 py-2 font-label font-bold uppercase text-xs"
          >
            <option value="">Câmara e Senado</option>
            <option value="camara">Câmara</option>
            <option value="senado">Senado</option>
          </select>
          <select
            value={ufFilter}
            onChange={(e) => { setUfFilter(e.target.value); resetVisibleCount(); }}
            className="border-2 border-black bg-white px-2 py-2 font-label font-bold uppercase text-xs"
          >
            <option value="">Todas as UFs</option>
            {options.ufs.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
          <select
            value={partidoFilter}
            onChange={(e) => { setPartidoFilter(e.target.value); resetVisibleCount(); }}
            className="border-2 border-black bg-white px-2 py-2 font-label font-bold uppercase text-xs"
          >
            <option value="">Todos os partidos</option>
            {options.partidos.map((partido) => (
              <option key={partido} value={partido}>{partido}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-h-[520px] overflow-y-auto p-2 space-y-2">
        {!hasActiveFilter ? (
          <p className="bg-[#D7F6FF] border-2 border-black px-3 py-2 font-label font-bold uppercase text-xs">
            Sugestões iniciais misturam estados, casas e partidos. Use os filtros para afinar.
          </p>
        ) : null}
        {visibleItems.map((perfil) => (
          <button
            key={`${perfil.fonte}-${perfil.idOrigem}`}
            onClick={() => onSelect(perfil.fonte, perfil.idOrigem || '')}
            disabled={Boolean(isDisabled(perfil))}
            className={`w-full flex items-center gap-3 p-2 border-2 border-black text-left transition-all ${
              isSelected(perfil)
                ? 'bg-[#ffe066] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                : isDisabled(perfil)
                  ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                  : 'bg-white hover:bg-[#F2FFD8] cursor-pointer hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <div className="w-12 h-12 border-2 border-black bg-gray-200 shrink-0 relative overflow-hidden">
              {perfil.foto_url ? (
                <Image
                  src={perfil.foto_url}
                  alt={perfil.nome_urna}
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                  unoptimized
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center font-headline font-black text-sm">
                  {getInitials(perfil.nome_urna)}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-headline font-black text-sm uppercase truncate">
                {perfil.nome_urna}
              </p>
              <p className="font-label font-bold text-[11px] uppercase opacity-70">
                {perfil.partido} • {perfil.uf} • {perfil.fonte === 'camara' ? 'Câmara' : 'Senado'}
              </p>
            </div>
            {isDisabled(perfil) ? (
              <span className="font-label font-black uppercase text-[10px] bg-white border-2 border-black px-2 py-1">
                já escolhido
              </span>
            ) : null}
          </button>
        ))}
        {hasMore ? (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
            className="w-full bg-black text-white border-2 border-black px-4 py-3 font-headline font-black uppercase hover:bg-primary-container hover:text-black transition-colors"
          >
            Carregar mais {Math.min(ITEMS_PER_PAGE, filtrados.length - visibleCount)}
          </button>
        ) : null}
        {filtrados.length === 0 && (
          <p className="p-4 text-center font-body font-bold opacity-60 text-sm">
            Nenhum resultado para &quot;{q}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
