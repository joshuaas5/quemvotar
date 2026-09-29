'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMinhaUrna } from './MinhaUrnaProvider';
import { faltamNaUrna, rotuloCargo } from '@/lib/candidatos/minha-urna';

const CLOSE_KEY = 'quemvotar:cola-bar-fechada:v1';
const subscribeClose = (notify: () => void) => { window.addEventListener('storage', notify); return () => window.removeEventListener('storage', notify); };
const wasClosed = () => { try { return window.sessionStorage.getItem(CLOSE_KEY) === '1'; } catch { return false; } };

/** Barra fixa no rodapé mostrando os votos escolhidos. */
export function MinhaUrnaBar() {
  const { items } = useMinhaUrna();
  const pathname = usePathname();
  const [closed, setClosed] = useState(false);
  const savedClosed = useSyncExternalStore(subscribeClose, wasClosed, () => false);
  const close = () => {
    setClosed(true);
    try { window.sessionStorage.setItem(CLOSE_KEY, '1'); } catch { /* Fechamento funciona mesmo sem armazenamento. */ }
  };

  if (closed || savedClosed || items.length === 0 || pathname === '/minha-urna') return null;

  const faltando = faltamNaUrna(items);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t-4 border-black bg-black text-white">
      <div className="max-w-7xl mx-auto relative px-4 py-3 pr-16 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={close} aria-label="Fechar barra da colinha" className="absolute right-3 top-2 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-white/50 bg-black font-body text-3xl leading-none text-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><span aria-hidden="true">×</span></button>
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
          Baixar minha cola →
        </Link>
      </div>
    </div>
  );
}
