'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMinhaUrna } from '@/components/candidatos/MinhaUrnaProvider';
import { FotoCandidato } from '@/components/candidatos/FotoCandidato';
import { CARGOS_URNA, faltamNaUrna } from '@/lib/candidatos/minha-urna';
import { EIXO_TEXTO } from '@/lib/candidatos/ui';

export function MinhaUrnaView() {
  const { items, remover, limpar } = useMinhaUrna();
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faltando = faltamNaUrna(items);

  const textoCompartilhar = [
    '🗳️ Minha Urna — QuemVotar 2026',
    ...items
      .sort((a, b) => a.cargoCodigo - b.cargoCodigo)
      .map((i) => `• ${i.cargo}: ${i.nomeUrna} (${i.partido ?? '?'}) — Nº ${i.numero}`),
    faltando.length > 0
      ? `\nFaltando: ${faltando.map((c) => c.rotulo).join(', ')}`
      : '\nUrna completa! ✅',
    '\nCompare ideias. Vote com informação.',
    'https://www.quemvotar.com.br/minha-urna',
  ].join('\n');

  const compartilhar = async () => {
    const navegador = navigator as Navigator & { share?: (d: { title: string; text: string }) => Promise<void> };
    if (navegador.share) {
      try {
        await navegador.share({ title: 'Minha Urna 2026', text: textoCompartilhar });
        return;
      } catch {
        // cancelado
      }
    }
    try {
      await navigator.clipboard.writeText(textoCompartilhar);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // sem clipboard
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={compartilhar}
          className="bg-black text-white border-4 border-black px-6 py-3 font-headline font-black uppercase text-sm hover:bg-white hover:text-black transition-colors"
        >
          {copiado ? '✓ Copiado!' : '📤 Compartilhar minha urna'}
        </button>
        {items.length > 0 ? (
          <button
            onClick={() => limpar()}
            className="border-4 border-black px-6 py-3 font-headline font-black uppercase text-sm hover:bg-red-100"
          >
            Limpar tudo
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <section className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-6xl block mb-4">🗳️</span>
          <h2 className="font-headline font-black text-3xl uppercase mb-3">Sua urna está vazia</h2>
          <p className="font-body font-bold uppercase text-sm opacity-70 mb-6">
            Escolha seus candidatos no Match ou na vitrine — cada escolha entra na sua urna.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/match/candidatos" className="bg-primary-container border-4 border-black px-6 py-3 font-headline font-black uppercase text-sm hover:bg-primary">
              Fazer o Match 2026 →
            </Link>
            <Link href="/candidatos" className="border-4 border-black px-6 py-3 font-headline font-black uppercase text-sm hover:bg-surface-container-high">
              Ver todos os candidatos
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-6">
          {CARGOS_URNA.map((cargo) => {
            const escolhido = items.find((i) => i.cargoCodigo === cargo.codigo);
            return (
              <article key={cargo.codigo} className="bg-white border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                  <div>
                    <p className="font-label font-bold uppercase text-[10px] opacity-60">
                      {cargo.obrigatorio ? 'Voto obrigatório' : 'Voto'} · 1 escolha
                    </p>
                    <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase">{cargo.rotulo}</h2>
                  </div>
                  {escolhido ? (
                    <span className="font-headline font-black uppercase text-2xl text-emerald-700">✔ Escolhido</span>
                  ) : (
                    <span className="font-headline font-black uppercase text-sm bg-red-50 border-2 border-red-300 text-red-700 px-3 py-1">
                      Falta escolher
                    </span>
                  )}
                </div>

                {escolhido ? (
                  <div className="flex items-center gap-4 border-2 border-black bg-surface-container p-4 flex-wrap sm:flex-nowrap">
                    <div className="w-24 h-24 border-2 border-black bg-surface-container-high overflow-hidden shrink-0 flex items-center justify-center">
                      <FotoCandidato sqEleicao={20322002026} id={escolhido.id} uf={escolhido.uf} nome={escolhido.nomeUrna} iniciaisClassName="font-headline font-black text-xl" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-headline font-black text-2xl uppercase leading-none">{escolhido.nomeUrna}</p>
                      <p className="font-body font-bold uppercase text-xs opacity-70">
                        {escolhido.partido ?? 'Sem partido'} · {escolhido.uf}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-headline font-black uppercase text-lg border-2 border-black bg-white px-3 py-1">Nº {escolhido.numero}</span>
                        {escolhido.eixo ? (
                          <span className={`font-label font-bold uppercase text-[10px] ${EIXO_TEXTO[escolhido.eixo as keyof typeof EIXO_TEXTO] ?? ''}`}>
                            {escolhido.eixo}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center shrink-0">
                      <Link
                        href={`/candidatos/2026/${escolhido.uf}/${escolhido.id}`}
                        className="font-headline font-black uppercase text-xs border-2 border-black px-3 py-1.5 hover:bg-primary-container"
                      >
                        Ver perfil
                      </Link>
                      <button
                        onClick={() => remover(escolhido.id)}
                        className="font-headline font-black uppercase text-xs border-2 border-black px-3 py-1.5 text-red-700 hover:bg-red-100"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-black p-6 text-center">
                    <Link href={`/match/candidatos?cargo=${cargo.codigo}`} className="font-headline font-black uppercase text-sm underline">
                      Selecione {cargo.rotulo === 'Deputado Estadual' ? 'ou Distrital' : `seu candidato a ${cargo.rotulo.toLowerCase()}`}
                    </Link>
                    <p className="font-label font-bold uppercase text-[10px] opacity-60 mt-2">
                      Dica: use o Match para achar quem combina com você
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
