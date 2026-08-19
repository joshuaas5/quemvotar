'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FotoCandidato } from '@/components/candidatos/FotoCandidato';
import type { CandidatoMatchLite } from '@/lib/match/candidatos';

const EIXO_CORES: Record<string, string> = {
  esquerda: 'bg-red-500',
  'centro-esquerda': 'bg-orange-400',
  centro: 'bg-yellow-400',
  'centro-direita': 'bg-blue-400',
  direita: 'bg-indigo-500',
};

const EIXO_TEXTO: Record<string, string> = {
  esquerda: 'text-red-600',
  'centro-esquerda': 'text-orange-600',
  centro: 'text-yellow-600',
  'centro-direita': 'text-blue-600',
  direita: 'text-indigo-600',
};

interface DetalheApi {
  idTse: number;
  nomeUrna: string;
  partido: string | null;
  cargo: string;
  uf: string;
  numero: number;
  situacao: string;
  totalDeBens: number | null;
  sites: string[];
  eleicoesAnteriores: unknown[];
  mandato?: boolean;
  planoGoverno?: { disponivel: boolean; urlDownload?: string | null };
  posicionamento?: {
    label: string;
    baseLabel: string;
    eixo: string | null;
    resumo?: string;
    confianca: number;
  };
}

function formatarMoeda(valor: number | null): string {
  if (typeof valor !== 'number' || !Number.isFinite(valor)) return '—';
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

/**
 * Comparação LADO A LADO embutida (match/vitrine): até 3 candidatos,
 * com posicionamento, plano de governo, bens e nº na urna.
 */
export function CompararLadoALado({
  selecionados,
  itens,
}: {
  selecionados: CandidatoMatchLite[];
  itens: CandidatoMatchLite[];
}) {
  const [detalhes, setDetalhes] = useState<Record<number, DetalheApi | null>>({});
  const [carregando, setCarregando] = useState<Record<number, boolean>>({});

  const resolverUf = (id: number) => itens.find((i) => i.id === id)?.uf ?? 'BR';

  useEffect(() => {
    let ativo = true;
    selecionados.forEach((cand) => {
      if (detalhes[cand.id] !== undefined) return;
      setCarregando((prev) => ({ ...prev, [cand.id]: true }));
      const ufSelecionada = resolverUf(cand.id);
      fetch(`/api/fontes/tse/candidato?ano=2026&uf=${ufSelecionada}&id=${cand.id}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((payload: DetalheApi | null) => {
          if (ativo) setDetalhes((prev) => ({ ...prev, [cand.id]: payload }));
        })
        .catch(() => {
          if (ativo) setDetalhes((prev) => ({ ...prev, [cand.id]: null }));
        })
        .finally(() => {
          if (ativo) setCarregando((prev) => ({ ...prev, [cand.id]: false }));
        });
    });
    return () => {
      ativo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selecionados, detalhes]);

  if (selecionados.length < 2) return null;

  return (
    <section className="space-y-4" id="comparacao">
      <header className="flex flex-wrap items-center justify-between gap-3 border-y-4 border-black py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🆚</span>
          <h3 className="font-headline font-black text-2xl uppercase">Comparação lado a lado</h3>
        </div>
        <Link
          href={`/comparar/candidatos?ids=${selecionados.map((c) => c.id).join(',')}`}
          className="bg-primary-container border-4 border-black px-4 py-2 font-headline font-black uppercase text-xs hover:bg-primary text-black no-underline"
        >
          Ver página completa ↗
        </Link>
      </header>

      <div className={`grid gap-6 ${selecionados.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {selecionados.map((cand) => {
          const det = detalhes[cand.id];
          const loading = carregando[cand.id];
          return (
            <article key={cand.id} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col">
              <div className="aspect-[4/3] border-b-4 border-black bg-surface-container-high overflow-hidden">
                <FotoCandidato sqEleicao={20322002026} id={cand.id} uf={cand.uf} nome={cand.nomeUrna} fotoAlta={cand.fotoAlta ?? null} />
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col">
                <div>
                  <p className="font-label font-bold uppercase text-[10px] opacity-60">
                    {cand.partido ?? '?'} · {cand.cargo} · {cand.uf}
                  </p>
                  <h4 className="font-headline font-black text-2xl uppercase leading-none mt-1">{cand.nomeUrna}</h4>
                </div>

                <div className="flex items-center justify-between border-2 border-black bg-surface-container-high px-3 py-2">
                  <span className="font-label font-bold uppercase text-[10px] opacity-60">Nº na urna</span>
                  <span className="font-headline font-black text-3xl">{cand.numero}</span>
                </div>

                {loading ? (
                  <p className="font-label font-bold uppercase text-[10px] opacity-60 animate-pulse">Carregando detalhes...</p>
                ) : det ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-headline font-black uppercase text-lg ${det.posicionamento?.eixo ? (EIXO_TEXTO[det.posicionamento.eixo] ?? '') : 'opacity-50'}`}>
                          {det.posicionamento?.label ?? '—'}
                        </span>
                        <span className="font-label font-bold uppercase text-[9px] border-2 border-black px-1.5 py-0.5 bg-sky-100 text-sky-800">
                          {det.posicionamento?.baseLabel ?? ''}
                        </span>
                      </div>
                      <div className="h-2.5 w-full border-2 border-black bg-gray-200 relative">
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-black ${EIXO_CORES[det.posicionamento?.eixo ?? ''] ?? 'bg-gray-400'}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="border-2 border-black bg-surface-container p-2">
                        <p className="font-label font-bold uppercase text-[9px] opacity-60">Bens</p>
                        <p className="font-headline font-black uppercase text-xs">{formatarMoeda(det.totalDeBens)}</p>
                      </div>
                      <div className="border-2 border-black bg-surface-container p-2">
                        <p className="font-label font-bold uppercase text-[9px] opacity-60">Situação</p>
                        <p className="font-headline font-black uppercase text-[10px] leading-tight">{det.situacao}</p>
                      </div>
                    </div>

                    {det.planoGoverno?.disponivel && det.planoGoverno.urlDownload ? (
                      <a
                        href={det.planoGoverno.urlDownload}
                        target="_blank"
                        rel="noreferrer"
                        className="block bg-emerald-100 border-2 border-emerald-700 text-emerald-900 font-headline font-black uppercase text-[10px] px-3 py-2 text-center hover:bg-emerald-200"
                      >
                        📄 Plano de governo (PDF)
                      </a>
                    ) : null}

                    <p className="font-label font-bold uppercase text-[9px] opacity-50">
                      {det.eleicoesAnteriores.length > 0 ? `${det.eleicoesAnteriores.length} eleição(ões) anterior(es)` : 'Primeira candidatura'}
                      {cand.mandato ? ' · 🏛️ Exerce mandato' : ''}
                    </p>
                  </div>
                ) : (
                  <p className="font-label font-bold uppercase text-[10px] opacity-50">Detalhe indisponível no momento.</p>
                )}

                <div className="mt-auto pt-2">
                  <Link
                    href={`/candidatos/2026/${cand.uf}/${cand.id}`}
                    className="block bg-primary-container border-4 border-black px-4 py-2 font-headline font-black uppercase text-xs text-center hover:bg-primary text-black no-underline"
                  >
                    Ver perfil completo →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
