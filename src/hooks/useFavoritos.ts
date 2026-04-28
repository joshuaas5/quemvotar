'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Favorito {
  id: string;
  fonte: 'camara' | 'senado';
  nome_urna: string;
  partido: string;
  uf: string;
  cargo: string;
  foto_url?: string;
  addedAt: string;
}

const STORAGE_KEY = 'quemvotar:favoritos';

function loadFavoritos(): Favorito[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavoritos(list: Favorito[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFavoritos(loadFavoritos());
    setLoaded(true);
  }, []);

  const isFavorito = useCallback(
    (id: string, fonte: string) => {
      return favoritos.some((f) => f.id === id && f.fonte === fonte);
    },
    [favoritos]
  );

  const toggleFavorito = useCallback(
    (politico: Omit<Favorito, 'addedAt'>) => {
      setFavoritos((prev) => {
        const exists = prev.some((f) => f.id === politico.id && f.fonte === politico.fonte);
        let next: Favorito[];
        if (exists) {
          next = prev.filter((f) => !(f.id === politico.id && f.fonte === politico.fonte));
        } else {
          next = [...prev, { ...politico, addedAt: new Date().toISOString() }];
        }
        saveFavoritos(next);
        return next;
      });
    },
    []
  );

  const removeFavorito = useCallback((id: string, fonte: string) => {
    setFavoritos((prev) => {
      const next = prev.filter((f) => !(f.id === id && f.fonte === fonte));
      saveFavoritos(next);
      return next;
    });
  }, []);

  return { favoritos, isFavorito, toggleFavorito, removeFavorito, loaded };
}
