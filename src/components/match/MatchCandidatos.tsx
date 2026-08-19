'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MatchQuiz } from './MatchQuiz';
import { QUESTIONS } from '@/lib/match/questions';
import type { UserAnswersMap } from '@/lib/match/calculator';
import {
  calcularEixoUsuario,
  EIXOS,
  ordenarMatches,
  type CandidatoMatchLite,
  type MatchCandidatoResultado,
} from '@/lib/match/candidatos';
import { UF_LISTA } from '@/lib/candidatos/ufs';
import { dadosUrl } from '@/lib/candidatos/dados-url';
import { FotoCandidato } from '@/components/candidatos/FotoCandidato';
import { useMinhaUrna } from '@/components/candidatos/MinhaUrnaProvider';
import { votosPorCargo, votosPreenchidos } from '@/lib/candidatos/minha-urna';
import { CompararLadoALado } from '@/components/candidatos/CompararLadoALado';

const EIXO_CORES: Record<string, string> = {
  esquerda: 'bg-red-500',
  'centro-esquerda': 'bg-orange-400',
  centro: 'bg-yellow-400',
  'centro-direita': 'bg-blue-400',
  direita: 'bg-indigo-500',
};

const BASE_BADGE: Record<string, string> = {
  'plano-de-governo': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'analise-curada': 'bg-violet-100 text-violet-800 border-violet-300',
  partido: 'bg-sky-100 text-sky-800 border-sky-300',
  indefinido: 'bg-gray-100 text-gray-600 border-gray-300',
};

function cargoBadge(cargoCodigo: number): string {
  const base = 'font-label font-bold uppercase text-[10px] border-2 px-1.5 py-0.5 ';
  if ([1, 2, 3, 4].includes(cargoCodigo)) return base + 'bg-violet-100 text-violet-800 border-violet-300';
  if (cargoCodigo === 5) return base + 'bg-blue-100 text-blue-800 border-blue-300';
  if (cargoCodigo === 6) return base + 'bg-teal-100 text-teal-800 border-teal-300';
  return base + 'bg-amber-100 text-amber-800 border-amber-300';
}

const SECOES_CARGO: Array<{ titulo: string; emoji: string; codigos: number[] }> = [
  { titulo: 'Executivo', emoji: '🧭', codigos: [1, 3, 4] },
  { titulo: 'Senador', emoji: '🇧🇷', codigos: [5] },
  { titulo: 'Deputado Federal', emoji: '🟢', codigos: [6] },
  { titulo: 'Deputado Estadual / Distrital', emoji: '🟠', codigos: [7, 8] },
];

const COMPARAR_KEY = 'quemvotar:comparar:v1';

function carregarComparar(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.sessionStorage.getItem(COMPARAR_KEY) ?? '[]') as number[];
  } catch {
    return [];
  }
}

export function MatchCandidatos() {
  const [answers, setAnswers] = useState<UserAnswersMap>({});
  const [showResults, setShowResults] = useState(false);
  const [uf, setUf] = useState('BR');
  const [cargoFiltro, setCargoFiltro] = useState('0');
  const [partidoFiltro, setPartidoFiltro] = useState('');
  const [dados, setDados] = useState<CandidatoMatchLite[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [semDados, setSemDados] = useState(false);
  const [verMais, setVerMais] = useState(8);
  const [comparar, setComparar] = useState<number[]>([]);
  const { items, adicionar, remover, esta } = useMinhaUrna();

  useEffect(() => {
    setComparar(carregarComparar());
  }, []);

  useEffect(() => {
    if (!showResults) return;
    let ativo = true;
    setCarregando(true);
    setSemDados(false);
    setVerMais(8);

    fetch(dadosUrl(`index-${uf}.json`))
      .then((response) => {
        if (!response.ok) throw new Error('sem dados');
        return response.json();
      })
      .then((payload: { candidatos: CandidatoMatchLite[] }) => {
        if (!ativo) return;
        setDados(payload.candidatos ?? []);
      })
      .catch(() => {
        if (ativo) setSemDados(true);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [showResults, uf]);

  const handleAnswer = (questionId: string, answer: { score: number; weight: number }) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const usuario = useMemo(
    () => (showResults ? calcularEixoUsuario(answers) : { indice: 2, label: 'Centro' }),
    [answers, showResults],
  );

  const partidos = useMemo(
    () => Array.from(new Set(dados.map((c) => c.partido).filter(Boolean) as string[])).sort(),
    [dados],
  );

  const matches = useMemo(() => {
    const filtrados = dados.filter((c) => {
      const okCargo = cargoFiltro === '0' || String(c.cargoCodigo) === cargoFiltro;
      const okPartido = !partidoFiltro || c.partido === partidoFiltro;
      return okCargo && okPartido;
    });
    return ordenarMatches(usuario.indice, filtrados);
  }, [dados, cargoFiltro, partidoFiltro, usuario.indice]);

  const toggleComparar = (id: number) => {
    const atual = carregarComparar();
    const novo = atual.includes(id) ? atual.filter((i) => i !== id) : [...atual, id].slice(-3);
    try {
      window.sessionStorage.setItem(COMPARAR_KEY, JSON.stringify(novo));
    } catch {
      // sem sessionStorage
    }
    setComparar(novo);
  };

  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);

  if (!showResults) {
    return (
      <div className="space-y-8">
        <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <h2 className="font-headline font-black text-4xl uppercase mb-2">Descubra seu Match</h2>
          <p className="font-body font-bold opacity-80 max-w-2xl mx-auto">
            Candidato ainda não votou — o cruzamento usa o que existe de mais sólido:
            o <strong>plano de governo</strong> (executivos) e o <strong>posicionamento</strong> de cada candidato,
            com a base sempre declarada.
          </p>

          <div className="mt-6 max-w-md mx-auto text-left">
            <label className="font-label font-bold uppercase text-xs opacity-70 mb-1 block">
              Seu estado (para ver os deputados da sua região):
            </label>
            <select
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              className="w-full border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
            >
              <option value="BR">Brasil (Presidente)</option>
              {UF_LISTA.map((item) => (
                <option key={item.sigla} value={item.sigla}>{item.sigla} — {item.nome}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 border-4 border-black h-8 bg-surface-container w-full max-w-xl mx-auto relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-primary-fixed border-r-4 border-black transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-headline font-black uppercase text-sm z-10 mix-blend-difference text-white">
              Completado {progress}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {QUESTIONS.map((q) => (
            <MatchQuiz
              key={q.id}
              questionId={q.id}
              title={q.title}
              description={q.description}
              accentColor={q.accentColor}
              currentAnswer={answers[q.id]}
              onAnswer={handleAnswer}
            />
          ))}
        </div>

        <div className="flex justify-center bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="text-center w-full">
            <p className="font-label font-bold uppercase tracking-widest text-sm mb-4 opacity-70">
              Responda todas para o melhor resultado
            </p>
            <button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(answers).length < 3}
              className="bg-black text-white font-headline font-black text-2xl sm:text-3xl uppercase px-8 sm:px-16 py-6 border-4 border-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-none transition-all w-full sm:w-auto"
            >
              Ver candidatos compatíveis
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center gap-4 bg-primary-container border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="min-w-0">
          <h2 className="font-headline font-black text-4xl uppercase leading-none">Seus candidatos</h2>
          <p className="font-body font-bold mt-2 opacity-80 max-w-xl">
            Seu perfil sugere o eixo <strong className="bg-white border-2 border-black px-2">{usuario.label}</strong>.
            Listamos por seção da urna — a base de cada posicionamento está no selo.
          </p>
          <p className="font-label font-bold uppercase text-[10px] opacity-60 mt-2">
            {dados.length.toLocaleString('pt-BR')} candidatos avaliados em {uf === 'BR' ? 'Brasil' : uf}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {comparar.length >= 2 ? (
            <>
              <a
                href="#comparacao"
                className="bg-black text-white border-4 border-black font-headline font-black px-6 py-4 uppercase text-lg hover:opacity-90"
              >
                🆚 Comparar ({comparar.length}) ↓
              </a>
              <Link
                href={`/comparar/candidatos?ids=${comparar.join(',')}`}
                className="bg-white border-4 border-black font-headline font-black px-6 py-4 uppercase text-lg hover:bg-gray-100"
              >
                Página completa ↗
              </Link>
            </>
          ) : null}
          <button
            onClick={() => setShowResults(false)}
            className="bg-white border-4 border-black font-headline font-black px-6 py-4 uppercase text-lg hover:bg-gray-100"
          >
            Afinar respostas
          </button>
          <Link
            href="/candidatos/metodologia"
            className="bg-white border-4 border-black font-headline font-black px-6 py-4 uppercase text-lg hover:bg-gray-100 text-center"
          >
            Metodologia
          </Link>
        </div>
      </div>

      {/* Filtros */}
      {/* Escolha do cargo (seção da urna) */}
      <div className="bg-white border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3">
        <p className="font-headline font-black uppercase text-sm">🗳️ Sugestões para qual cargo?</p>
        <div className="flex flex-wrap gap-2">
          {[
            { codigo: '0', nome: 'Todos' },
            { codigo: '1', nome: 'Presidente' },
            { codigo: '3', nome: 'Governador' },
            { codigo: '5', nome: 'Senador · elege 2' },
            { codigo: '6', nome: 'Dep. Federal' },
            { codigo: '7', nome: 'Dep. Estadual' },
          ].map((cargo) => (
            <button
              key={cargo.codigo}
              type="button"
              onClick={() => setCargoFiltro(cargo.codigo)}
              className={`border-2 border-black px-3 py-2 font-headline font-black uppercase text-xs ${
                cargoFiltro === cargo.codigo ? 'bg-black text-white' : 'bg-white hover:bg-surface-container-high'
              }`}
            >
              {cargo.nome}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <select
          value={uf}
          onChange={(e) => setUf(e.target.value)}
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
        >
          <option value="BR">Brasil</option>
          {UF_LISTA.map((item) => (
            <option key={item.sigla} value={item.sigla}>{item.sigla} — {item.nome}</option>
          ))}
        </select>

        <select
          value={partidoFiltro}
          onChange={(e) => setPartidoFiltro(e.target.value)}
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
        >
          <option value="">Todos os partidos</option>
          {partidos.map((sigla) => (
            <option key={sigla} value={sigla}>{sigla}</option>
          ))}
        </select>
        </div>
      </div>

      {carregando ? (
        <div className="bg-white border-4 border-black p-12 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-headline font-black uppercase text-xl">Carregando candidatos...</p>
        </div>
      ) : semDados ? (
        <div className="bg-white border-4 border-black p-12 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-headline font-black uppercase text-xl mb-3">Dados ainda não sincronizados</p>
          <p className="font-body font-medium text-sm opacity-70 mb-4">
            O snapshot de candidatos para {uf} ainda não foi gerado. Rode o sincronizador ou escolha outra UF.
          </p>
          <code className="bg-surface-container border-2 border-black px-3 py-2 font-mono text-xs">
            npx tsx scripts/sync-candidatos.ts --uf {uf}
          </code>
        </div>
      ) : (
        SECOES_CARGO.map((secao) => {
          const daSecao = matches.filter(({ candidato }) => secao.codigos.includes(candidato.cargoCodigo)).slice(0, verMais);
          if (daSecao.length === 0) return null;

          return (
            <section key={secao.titulo} className="space-y-4">
              <header className="flex items-center gap-3 border-b-4 border-black pb-2">
                <span className="text-2xl">{secao.emoji}</span>
                <h3 className="font-headline font-black text-2xl sm:text-3xl uppercase">{secao.titulo}</h3>
                <span className="font-label font-bold uppercase text-xs bg-surface-container-high border-2 border-black px-2 py-0.5">
                  {secao.codigos.includes(5) ? '2 votos em 2026' : '1 voto'}
                </span>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {daSecao.map(({ candidato, match }: MatchCandidatoResultado) => (
                  <article
                    key={candidato.id}
                    className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:shadow-[0_10px_20px_rgba(0,0,0,0.14)] transition-shadow duration-200"
                  >
                    <Link href={`/candidatos/2026/${candidato.uf}/${candidato.id}`} className="p-5 space-y-3 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-2">
                            <span className={cargoBadge(candidato.cargoCodigo)}>{candidato.cargo}</span>
                            {candidato.mandato ? (
                              <span className="font-label font-bold uppercase text-[10px] border-2 border-black px-1.5 py-0.5 bg-emerald-100 text-emerald-800">
                                🏛️ Já exerce mandato
                              </span>
                            ) : (
                              <span className="font-label font-bold uppercase text-[10px] border-2 border-black px-1.5 py-0.5 bg-amber-50 text-amber-800">
                                🌟 Sem mandato atual
                              </span>
                            )}
                          </div>
                          <h4 className="font-headline font-black text-xl md:text-2xl uppercase leading-none">
                            {candidato.nomeUrna}
                          </h4>
                          <p className="font-label font-bold uppercase text-[10px] opacity-60 mt-1">
                            {candidato.partido ?? 'Sem partido'} · {candidato.uf}
                          </p>
                        </div>
                        <div className="w-14 h-14 border-2 border-black bg-surface-container-high overflow-hidden shrink-0">
                          <FotoCandidato
                            sqEleicao={20322002026}
                            id={candidato.id}
                            uf={candidato.uf}
                            nome={candidato.nomeUrna}
                            fotoAlta={candidato.fotoAlta ?? null}
                            iniciaisClassName="font-headline font-black text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 border-2 border-black bg-surface-container-high px-3 py-2">
                        <span className="font-label font-bold uppercase text-[10px] opacity-60">Nº na urna</span>
                        <span className="font-headline font-black text-3xl uppercase leading-none">{candidato.numero}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-headline font-black text-2xl uppercase">
                            {match}%
                          </span>
                          <span className={`font-label font-bold uppercase text-[10px] border-2 px-1.5 py-0.5 ${BASE_BADGE[candidato.base] ?? ''}`}>
                            {candidato.baseLabel}
                          </span>
                        </div>
                        <div className="h-3 w-full border-2 border-black bg-gray-200 relative">
                          <div
                            className={`absolute left-0 top-0 bottom-0 ${EIXO_CORES[candidato.eixo ?? ''] ?? 'bg-gray-400'}`}
                            style={{ width: `${match}%` }}
                          />
                        </div>
                      </div>
                    </Link>

                    <div className="border-t-4 border-black flex divide-x-4 divide-black">
                      {esta(candidato.id) ? (
                        <button
                          onClick={() => remover(candidato.id)}
                          className="flex-1 font-headline font-black uppercase text-[10px] px-3 py-3 hover:bg-red-100"
                          title="Remover da Minha Urna"
                        >
                          ✔ Na urna
                        </button>
                      ) : votosPreenchidos(items, candidato.cargoCodigo) >= votosPorCargo(candidato.cargoCodigo) ? (
                        <span
                          className="flex-1 font-headline font-black uppercase text-[10px] px-3 py-3 bg-gray-100 text-gray-400 flex items-center justify-center"
                          title={`Cargo com ${votosPorCargo(candidato.cargoCodigo)} votos já selecionados`}
                        >
                          🗳️ Vaga preenchida
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            adicionar({
                              id: candidato.id,
                              nomeUrna: candidato.nomeUrna,
                              partido: candidato.partido,
                              cargoCodigo: candidato.cargoCodigo,
                              cargo: candidato.cargo,
                              uf: candidato.uf,
                              numero: candidato.numero,
                              eixo: candidato.eixo,
                              base: candidato.base,
                              baseLabel: candidato.baseLabel,
                              fotoAlta: candidato.fotoAlta ?? null,
                            })
                          }
                          className="flex-1 font-headline font-black uppercase text-[10px] px-3 py-3 hover:bg-primary-container"
                        >
                          ➕ Minha Urna
                        </button>
                      )}
                      <button
                        onClick={() => toggleComparar(candidato.id)}
                        className={`flex-1 font-headline font-black uppercase text-[10px] px-3 py-3 ${
                          comparar.includes(candidato.id) ? 'bg-black text-white' : 'hover:bg-surface-container-high'
                        }`}
                        title="Adicionar à comparação"
                      >
                        ⧉ {comparar.includes(candidato.id) ? 'Comparar ✓' : 'Comparar'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })
      )}

      {/* Comparação lado a lado (quando 2+ selecionados) */}
      {!carregando && !semDados && comparar.length >= 2 ? (
        <CompararLadoALado
          selecionados={dados.filter((c) => comparar.includes(c.id))}
          itens={dados}
        />
      ) : null}

      {!carregando && !semDados && matches.length > verMais ? (
        <div className="text-center">
          <button
            onClick={() => setVerMais((n) => n + 8)}
            className="bg-primary-container border-4 border-black px-8 py-4 font-headline font-black uppercase text-lg hover:bg-primary"
          >
            Ver mais candidatos
          </button>
        </div>
      ) : null}
    </div>
  );
}
