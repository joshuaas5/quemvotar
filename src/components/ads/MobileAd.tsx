'use client';

import { useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { useMinhaUrna } from '@/components/candidatos/MinhaUrnaProvider';
import { AdsterraBanner } from './AdsterraBanner';

const key = 'qv-mobile-ad-closed:v1';
const subscribe = (notify: () => void) => { window.addEventListener('storage', notify); return () => window.removeEventListener('storage', notify); };
const saved = () => { try { return window.sessionStorage.getItem(key) === '1'; } catch { return false; } };

export function MobileAd() {
  const pathname = usePathname();
  const { items } = useMinhaUrna();
  const [closed, setClosed] = useState(false);
  const previouslyClosed = useSyncExternalStore(subscribe, saved, () => false);
  if (closed || previouslyClosed || items.length > 0 || pathname === '/minha-urna' || pathname.startsWith('/match')) return null;
  const close = () => { setClosed(true); try { window.sessionStorage.setItem(key, '1'); } catch { /* Close still works. */ } };
  return <aside data-advertisement className="qv-advertisement qv-mobile-ad fixed inset-x-0 bottom-0 z-30 border-t-2 border-black bg-white md:hidden" aria-label="Publicidade">
    <div className="relative mx-auto flex h-11 max-w-lg items-center justify-center">
      <span className="font-label text-[10px] uppercase text-black/60">Publicidade</span>
      <button type="button" onClick={close} aria-label="Fechar publicidade" className="absolute right-1 top-0 flex h-11 w-11 items-center justify-center text-3xl text-black">×</button>
    </div>
    <div className="flex justify-center"><AdsterraBanner adKey="876aa82b74c7ba612f7e65595c0ca3b7" width={320} height={50} media="(max-width: 767px)" /></div>
  </aside>;
}
