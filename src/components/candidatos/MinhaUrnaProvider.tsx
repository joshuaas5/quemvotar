'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  carregarMinhaUrna,
  adicionarNaUrna,
  removerDaUrna,
  limparMinhaUrna,
  type MinhaUrnaItem,
} from '@/lib/candidatos/minha-urna';

interface MinhaUrnaContextValue {
  items: MinhaUrnaItem[];
  adicionar: (item: Omit<MinhaUrnaItem, 'eixo' | 'base' | 'baseLabel'> & { eixo?: string | null; base?: string; baseLabel?: string }) => void;
  remover: (id: number) => void;
  limpar: () => void;
  esta: (id: number) => boolean;
}

const MinhaUrnaContext = createContext<MinhaUrnaContextValue | null>(null);

export function MinhaUrnaProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MinhaUrnaItem[]>([]);

  useEffect(() => {
    setItems(carregarMinhaUrna());
    const listener = () => setItems(carregarMinhaUrna());
    window.addEventListener('quemvotar:minha-urna-change', listener);
    return () => window.removeEventListener('quemvotar:minha-urna-change', listener);
  }, []);

  const adicionar = useCallback((item: Parameters<MinhaUrnaContextValue['adicionar']>[0]) => {
    setItems(adicionarNaUrna(item));
  }, []);

  const remover = useCallback((id: number) => {
    setItems(removerDaUrna(id));
  }, []);

  const limpar = useCallback(() => {
    limparMinhaUrna();
    setItems([]);
  }, []);

  const esta = useCallback((id: number) => items.some((i) => i.id === id), [items]);

  return (
    <MinhaUrnaContext.Provider value={{ items, adicionar, remover, limpar, esta }}>
      {children}
    </MinhaUrnaContext.Provider>
  );
}

export function useMinhaUrna(): MinhaUrnaContextValue {
  const ctx = useContext(MinhaUrnaContext);
  if (!ctx) throw new Error('useMinhaUrna deve ser usado dentro de <MinhaUrnaProvider>');
  return ctx;
}
