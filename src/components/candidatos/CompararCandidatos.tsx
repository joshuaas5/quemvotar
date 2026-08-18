'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { UF_LISTA } from '@/lib/candidatos/ufs';
import { FotoCandidato } from '@/components/candidatos/FotoCandidato';
import type { CandidatoMatchLite } from '@/lib/match/candidatos';

const EIXO_CORES: Record<string, string> = {
  esquerda: 'bg-red-500',
  'centro-esquerda': 'bg-orange-400',
  centro: 'bg-yellow-400',
  'centro-direita': 'bg-blue-400',
  direita: 'bg-indigo-500',
};

interface DetalheApi {
  idTse: number;
  nomeUrna: string;
  partido: string | null;
  cargo: string;
  cargoCodigo: number;
  uf: string;
  numero: number;
  situacao: string;
  totalDeBens: number | null;
  sites: string[];
  eleicoesAnteriores: unknown[];
  planoGoverno?: { disponivel: boolean; urlDownload?: string | null };
  posicionamento?: {
    label: string;
    baseLabel: string;
    base: string;
    eixo: string | null;
    resumo?: string;
    temas?: string[];
    confianca: number;
  };
}

interface Selecionado {
  lite: CandidatoMatchLite & { cargoLabel?: string };
  detalhe: DetalheApi | null;
  carregandoDetalhe: boolean;
}

export function CompararCandidatos({ idsIniciais }: { idsIniciais: string }) {
  const [uf, setUf] = useState('BR');
  const [busca, setBusca] = useState('');
  const [catalogo, setCatalogo] = useState<CandidatoMatchLite[]>([]);
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const iniciais = idsIniciais
      .split(',')
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n) && n > 0)
      .slice(0, 3);
    setIds(iniciais);
  }, [idsIniciais]);

  // catálogo (para o seletor adicionar candidatos)
  useEffect(() => {
    setBusca('');
    fetch(`/dados/candidatos/index-${uf}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((p: { candidatos: CandidatoMatchLite[] } | null) => setCatalogo(p?.candidatos ?? []))
      .catch(() => setCatalogo([]));
  }, [uf]);

  const resultadosBusca = useMemo(() => {
    if (busca.trim().length < 3) return [];
    const termo = busca.trim().toLowerCase();
    return catalogo
      .filter((c) => !ids.includes(c.id) && (c.nomeUrna.toLowerCase().includes(termo) || (c.partido ?? '').toLowerCase().includes(termo)))
      .slice(0, 8);
  }, [busca, catalogo, ids]);

  const [detalhes, setDetalhes] = useState<Record<number, DetalheApi | null>>({});
  const [carregandoDetalhe, setCarregandoDetalhe] = useState<Record<number, boolean>>({});

  // busca detalhe de cada id selecionado
  useEffect(() => {
    let ativo = true;
    async function carregar(id: number, ufSelecionada: string) {
      setCarregandoDetalhe((prev) => ({ ...prev, [id]: true }));
      try {
        const response = await fetch(`/api/fontes/tse/candidato?ano=2026&uf=${ufSelecionada}&id=${id}`);
        const payload = response.ok ? ((await response.json()) as DetalheApi) : null;
        if (ativo) setDetalhes((prev) => ({ ...prev, [id]: payload }));
      } catch {
        if (ativo) setDetalhes((prev) => ({ ...prev, [id]: null }));
      } finally {
        if (ativo) setCarregandoDetalhe((prev) => ({ ...prev, [id]: false }));
      }
    }
    ids.forEach((id) => {
      if (detalhes[id] === undefined) {
        const candidato = catalogo.find((c) => c.id === id) ?? { uf: 'BR' } as CandidatoMatchLite;
        carregar(id, candidato.uf || uf);
      }
    });
    return () => {
      ativo = false;
    };
  }, [ids, catalogo, uf, detalhes]);

  const adicionar = (candidato: CandidatoMatchLite) => {
    setIds((prev) => (prev.includes(candidato.id) ? prev : [...prev, candidato.id].slice(-3)));
  };

  const remover = (id: number) => {
    setIds((prev) => prev.filter((i) => i !== id));
  };

  const selecionados = ids
    .map((id) => {
      const lite = catalogo.find((c) => c.id === id) as CandidatoMatchLite | undefined;
      return lite ? { lite, detalhe: detalhes[id] ?? null, carregandoDetalhe: carregandoDetalhe[id] ?? false } : null;
    })
    .filter((s): s is Selecionado => s !== null);

  return (
    <div className="space-y-8">
      {/* Seletor */}
      <section className="bg-white border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full sm:w-56">
            <label className="font-label font-bold uppercase text-[10px] opacity-60 block mb-1">Estado</label>
            <select
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              className="w-full border-4 border-black px-3 py-2.5 font-headline font-bold uppercase bg-white"
            >
              <option value="BR">Brasil</option>
              {UF_LISTA.map((item) => (
                <option key={item.sigla} value={item.sigla}>{item.sigla} — {item.nome}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="font-label font-bold uppercase text-[10px] opacity-60 block mb-1">
              Busque por nome (mín. 3 letras) — até 3 candidatos
            </label>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Ex.: Deltan, Marina, Tabata..."
              className="w-full border-4 border-black px-3 py-2.5 font-headline font-bold uppercase bg-white"
            />
          </div>
        </div>

        {resultadosBusca.length > 0 ? (
          <ul className="border-4 border-black bg-surface-container-low divide-y-2 divide-black">
            {resultadosBusca.map((candidato) => (
              <li key={candidato.id} className="flex items-center justify-between gap-3 px-3 py-2">
                <div className="min-w-0">
                  <p className="font-headline font-black uppercase text-sm">{candidato.nomeUrna}</p>
                  <p className="font-label font-bold uppercase text-[10px] opacity-60">
                    {candidato.partido ?? '?'} · {candidato.cargo} · {candidato.uf} · Nº {candidato.numero}
                  </p>
                </div>
                <button
                  onClick={() => adicionar(candidato)}
                  disabled={ids.length >= 3}
                  className="bg-primary-container border-2 border-black px-3 py-1.5 font-headline font-black uppercase text-[10px] hover:bg-primary disabled:opacity-40 shrink-0"
                >
                  + Adicionar
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {ids.length >= 3 ? (
          <p className="font-label font-bold uppercase text-[10px] text-amber-700">Limite de 3 candidatos por comparação.</p>
        ) : null}
      </section>

      {/* Resultado da comparação */}
      {selecionados.length === 0 ? (
        <section className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-6xl block mb-4">🆚</span>
          <h2 className="font-headline font-black text-3xl uppercase mb-3">Compare candidatos lado a lado</h2>
          <p className="font-body font-bold uppercase text-sm opacity-70 mb-4">
            Adicione até 3 candidatos acima para ver posicionamento, plano de governo, bens e números na urna.
          </p>
          <Link href="/match/candidatos" className="bg-primary-container border-4 border-black px-6 py-3 font-headline font-black uppercase text-sm hover:bg-primary">
            ou descubra pelo Match →
          </Link>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {selecionados.map(({ lite, detalhe, carregandoDetalhe }) => (
            <article key={lite.id} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col">
              <div className="aspect-[4/3] border-b-4 border-black bg-surface-container-high overflow-hidden relative">
                <FotoCandidato sqEleicao={20322002026} id={lite.id} uf={lite.uf} nome={lite.nomeUrna} />
                <button
                  onClick={() => remover(lite.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white border-2 border-black w-8 h-8 flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  title="Remover da comparação"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col">
                <div>
                  <p className="font-label font-bold uppercase text-[10px] opacity-60">
                    {lite.partido ?? '?'} · {lite.cargo} · {lite.uf}
                  </p>
                  <h3 className="font-headline font-black text-2xl uppercase leading-none mt-1">{lite.nomeUrna}</h3>
                </div>

                <div className="flex items-center justify-between border-2 border-black bg-surface-container-high px-3 py-2">
                  <span className="font-label font-bold uppercase text-[10px] opacity-60">Nº na urna</span>
                  <span className="font-headline font-black text-3xl">{lite.numero}</span>
                </div>

                {carregandoDetalhe ? (
                  <p className="font-label font-bold uppercase text-[10px] opacity-60">Carregando detalhes...</p>
                ) : detalhe ? (
                  <>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline font-black uppercase text-xl">
                          {detalhe.posicionamento?.label ?? '—'}
                        </span>
                        <span className="font-label font-bold uppercase text-[10px] border-2 border-black px-1.5 py-0.5 bg-sky-100 text-sky-800">
                          {detalhe.posicionamento?.baseLabel ?? ''}
                        </span>
                      </div>
                      <div className="h-3 w-full border-2 border-black bg-gray-200 relative">
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black ${EIXO_CORES[detalhe.posicionamento?.eixo ?? ''] ?? 'bg-gray-400'}`}
                        />
                      </div>
                      {detalhe.posicionamento?.resumo ? (
                        <p className="font-label font-bold uppercase text-[10px] opacity-60 leading-relaxed">
                          {detalhe.posicionamento.resumo}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="border-2 border-black bg-surface-container p-2">
                        <p className="font-label font-bold uppercase text-[9px] opacity-60">Bens declarados</p>
                        <p className="font-headline font-black uppercase text-sm">
                          {typeof detalhe.totalDeBens === 'number'
                            ? detalhe.totalDeBens.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
                            : '—'}
                        </p>
                      </div>
                      <div className="border-2 border-black bg-surface-container p-2">
                        <p className="font-label font-bold uppercase text-[9px] opacity-60">Situação</p>
                        <p className="font-headline font-black uppercase text-[10px] leading-tight">{detalhe.situacao}</p>
                      </div>
                    </div>

                    {detalhe.planoGoverno?.disponivel && detalhe.planoGoverno.urlDownload ? (
                      <a
                        href={detalhe.planoGoverno.urlDownload}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-100 border-2 border-emerald-700 text-emerald-900 font-headline font-black uppercase text-[10px] px-3 py-2 text-center hover:bg-emerald-200"
                      >
                        📄 Plano de governo (PDF)
                      </a>
                    ) : null}

                    <p className="font-label font-bold uppercase text-[9px] opacity-50">
                      {detalhe.eleicoesAnteriores.length > 0 ? `${detalhe.eleicoesAnteriores.length} eleição(ões) anterior(es)` : 'Primeira candidatura registrada'}
                      {' · '}{detalhe.sites.length > 0 ? `${detalhe.sites.length} canal(is) oficial(is)` : 'Sem canais declarados'}
                    </p>
                  </>
                ) : (
                  <p className="font-label font-bold uppercase text-[10px] opacity-50">Detalhe indisponível no momento.</p>
                )}

                <div className="mt-auto pt-2">
                  <Link
                    href={`/candidatos/2026/${lite.uf}/${lite.id}`}
                    className="block bg-primary-container border-4 border-black px-4 py-2.5 font-headline font-black uppercase text-xs text-center hover:bg-primary text-black no-underline"
                  >
                    Ver perfil completo →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
