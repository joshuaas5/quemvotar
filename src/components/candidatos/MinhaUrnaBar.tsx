'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMinhaUrna } from './MinhaUrnaProvider';
import { faltamNaUrna, rotuloCargo } from '@/lib/candidatos/minha-urna';

/** Barra fixa no rodapé mostrando os votos escolhidos. */
export function MinhaUrnaBar() {
  const { items } = useMinhaUrna();
  const pathname = usePathname();

  if (items.length === 0 || pathname === '/minha-urna') return null;

  const faltando = faltamNaUrna(items);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t-4 border-black bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <span className="font-headline font-black uppercase text-sm">🗳️ Minha Urna:</span>
          {items.map((item) => (
            <span
              key={item.id}
              className="font-label font-bold uppercase text-[10px] bg-white text-black border-2 border-white px-2 py-0.5"
              title={`${item.cargo} · Nº ${item.numero}`}
            >
              {rotuloCargo(item.cargoCodigo)}: {item.nomeUrna} ({item.numero})
            </span>
          ))}
          {faltando.length > 0 ? (
            <span className="font-label font-bold uppercase text-[10px] text-yellow-300">
              Faltam: {faltando.map((c) => `${c.rotulo}${c.faltando > 1 ? ` (${c.faltando})` : ''}`).join(', ')}
            </span>
          ) : null}
        </div>
        <Link
          href="/minha-urna"
          className="bg-[#ffd709] text-black border-4 border-[#ffd709] px-4 py-2 font-headline font-black uppercase text-xs hover:bg-white hover:border-white transition-colors"
        >
          Ver minha urna →
        </Link>
      </div>
    </div>
  );
}
