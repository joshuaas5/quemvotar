'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { CandidatoMatchLite } from '@/lib/match/candidatos';
import { FotoCandidato } from '@/components/candidatos/FotoCandidato';

/**
 * Busca GLOBAL de candidatos 2026 — percorre os snapshots estáticos
 * (index.json, ~19.7 mil candidatos) por nome, partido, coligação,
 * cargo e UF. Funciona "Deltan", "Maria", "PL", "deputado federal SP".
 * 100% client-side e sem custo de servidor.
 */

const EIXO_TEXTO: Record<string, string> = {
  esquerda: 'text-red-600',
  'centro-esquerda': 'text-orange-600',
  centro: 'text-yellow-600',
  'centro-direita': 'text-blue-600',
  direita: 'text-indigo-600',
};

const BASE_BADGE: Record<string, string> = {
  'plano-de-governo': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'analise-curada': 'bg-violet-100 text-violet-800 border-violet-300',
  partido: 'bg-sky-100 text-sky-800 border-sky-300',
  indefinido: 'bg-gray-100 text-gray-600 border-gray-300',
};

export function BuscaCandidatos({ inicial = '' }: { inicial?: string }) {
  const [termo, setTermo] = useState(inicial);
  const [uf, setUf] = useState('');
  const [catalogo, setCatalogo] = useState<CandidatoMatchLite[] | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carrega o índice completo UMA vez (cacheado em memória)
  useEffect(() => {
    if (catalogo !== null) return;
    setCarregando(true);
    fetch('/dados/candidatos/index.json')
      .then((r) => {
        if (!r.ok) throw new Error('sem índice');
        return r.json();
      })
      .then((p: { candidatos: CandidatoMatchLite[] }) => {
        setCatalogo(p.candidatos ?? []);
        setErro(null);
      })
      .catch(() => setErro('Não foi possível carregar o índice de candidatos. Tente novamente.'))
      .finally(() => setCarregando(false));
  }, [catalogo]);

  // Debounce da consulta
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    setCarregando(true);
    timer.current = setTimeout(() => setCarregando(false), 220);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [termo, uf]);

  const resultados = useMemo(() => {
    if (!catalogo) return [];
    const q = termo.trim().toLowerCase();
    if (q.length < 2 && !uf) return [];
    return catalogo
      .filter((c) => {
        const okUf = !uf || c.uf === uf;
        if (!okUf) return false;
        if (q.length < 2) return true;
        return (
          c.nomeUrna.toLowerCase().includes(q) ||
          (c.cargo ?? '').toLowerCase().includes(q) ||
          (c.partido ?? '').toLowerCase().includes(q) ||
          (c.coligacao ?? '').toLowerCase().includes(q) ||
          String(c.numero).includes(q)
        );
      })
      .slice(0, 40);
  }, [catalogo, termo, uf]);

  return (
    <section className="space-y-6">
      <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3">
        <p className="font-headline font-black uppercase text-sm">🔎 Busca global: qualquer candidato do Brasil</p>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3">
          <input
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Nome, partido, coligação, cargo, nº (ex.: Deltan, PL, deputado federal PR)"
            className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
            autoFocus
          />
          <select
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
          >
            <option value="">Todos os estados</option>
            {['BR', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <p className="font-label font-bold uppercase text-[10px] opacity-60">
          Procure por nome de urna, partido, cargo ou número — resultados em todo o Brasil.
        </p>
      </div>

      {carregando && !resultados.length ? (
        <div className="bg-white border-4 border-black p-10 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-headline font-black uppercase text-lg animate-pulse">Buscando...</p>
        </div>
      ) : erro ? (
        <div className="bg-white border-4 border-black p-10 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-body font-bold uppercase text-sm text-red-700">{erro}</p>
        </div>
      ) : termo.trim().length < 2 && !uf ? (
        <div className="bg-white border-4 border-black p-10 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-body font-bold uppercase text-sm opacity-70">
            Digite ao menos 2 letras para buscar em todos os candidatos.
          </p>
        </div>
      ) : resultados.length === 0 ? (
        <div className="bg-white border-4 border-black p-10 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-headline font-black uppercase text-xl">Nenhum candidato encontrado</p>
          <p className="font-body font-bold uppercase text-xs opacity-60 mt-2">
            Tente outro nome, partido ou estado.
          </p>
        </div>
      ) : (
        <>
          <p className="font-headline font-black uppercase text-lg">
            {resultados.length} resultado{resultados.length === 1 ? '' : 's'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {resultados.map((c) => (
              <Link
                key={c.id}
                href={`/candidatos/2026/${c.uf}/${c.id}`}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:shadow-[0_10px_20px_rgba(0,0,0,0.14)] transition-shadow duration-200 cursor-pointer"
              >
                <div className="aspect-[4/3] border-b-4 border-black bg-surface-container-high overflow-hidden">
                  <FotoCandidato sqEleicao={20322002026} id={c.id} uf={c.uf} nome={c.nomeUrna} fotoAlta={c.fotoAlta ?? null} />
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col">
                  <p className="font-label font-bold uppercase text-[10px] opacity-60">
                    {c.partido ?? 'Sem partido'} · {c.cargo} · {c.uf}
                  </p>
                  <h3 className="font-headline font-black text-2xl uppercase leading-none">{c.nomeUrna}</h3>
                  <div className="flex items-center justify-between border-2 border-black bg-surface-container-high px-3 py-1.5">
                    <span className="font-label font-bold uppercase text-[10px] opacity-60">Nº</span>
                    <span className="font-headline font-black text-2xl">{c.numero}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className={`font-headline font-black uppercase text-sm ${c.eixo ? (EIXO_TEXTO[c.eixo] ?? 'opacity-70') : 'opacity-40'}`}>
                      {c.eixo ?? 'sem eixo'}
                    </span>
                    <span className={`font-label font-bold uppercase text-[9px] border-2 px-1.5 py-0.5 ${BASE_BADGE[c.base] ?? ''}`}>
                      {c.baseLabel}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
