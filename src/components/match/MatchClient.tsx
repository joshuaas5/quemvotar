'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MatchQuiz } from './MatchQuiz';
import type { UserAnswersMap } from '@/lib/match/calculator';
import { calculateMatchScoreDetailed, calculateNolanChart } from '@/lib/match/calculator';
import { buildRankingLookupKey } from '@/lib/match/ranking-key';
import MatchShareCard from './MatchShareCard';
import type { PerfilPublico } from '@/lib/api';

/* Cor do quadrante Nolan */
function getNolanColors(label: string) {
  if (label.includes('Libertário')) return { bg: '#bfdbfe', border: '#2563eb', text: '#1e40af' };
  if (label.includes('Conservador')) return { bg: '#fecaca', border: '#dc2626', text: '#991b1b' };
  if (label.includes('Esquerda') || label.includes('Progressista')) return { bg: '#e9d5ff', border: '#9333ea', text: '#6b21a8' };
  if (label.includes('Estatista') || label.includes('Populista')) return { bg: '#fde68a', border: '#d97706', text: '#92400e' };
  return { bg: '#f3f4f6', border: '#6b7280', text: '#374151' };
}

function getInitials(nome: string) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('');
}

type Question = {
  id: string;
  title: string;
  description: string;
  accentColor: string;
};

const QUESTIONS: Question[] = [
  { id: 'pvt', title: 'Privatizações', description: 'Empresas estatais (Correios, Petrobras) devem ser privatizadas para melhorar a eficiência da economia e remover corrupção.', accentColor: '#ffe066' },
  { id: 'agr', title: 'Agronegócio', description: 'O agronegócio e a produção de alimentos devem ter mais liberdade para se expandir, mesmo que avance sobre áreas de preservação ambiental informais.', accentColor: '#9bf6ff' },
  { id: 'impostos', title: 'Taxação de Fortunas', description: 'O governo deve aumentar os impostos sobre grandes fortunas e grandes lucros para financiar mais programas de bem social e redução de desigualdade.', accentColor: '#ffc6ff' },
  { id: 'drogas', title: 'Drogas', description: 'A legalização e regulamentação da maconha seria uma medida mais eficaz para combater o tráfico e a violência do que a proibição.', accentColor: '#c77dff' },
  { id: 'armas', title: 'Posse de Armas', description: 'O acesso à posse e ao porte de armas de fogo pelo cidadão comum sem antecedentes criminais deve ser facilitado para defesa pessoal.', accentColor: '#ff6b6b' },
  { id: 'cotas', title: 'Cotas', description: 'Reservas de vagas (cotas raciais e sociais) em universidades e concursos públicos são políticas fundamentais para reduzir desigualdades.', accentColor: '#ff9f1c' },
  { id: 'abor', title: 'Aborto', description: 'A decisão sobre a interrupção da gravidez (aborto) nas primeiras semanas deve pertencer somente à mulher, de forma descriminalizada e legalizada.', accentColor: '#ff006e' },
  { id: 'religiao', title: 'Religião no Estado', description: 'Valores cristãos e da família tradicional devem ser a principal base para as diretrizes morais de leis e do ensino público.', accentColor: '#a2d2ff' },
  { id: 'clt', title: 'Leis Trabalhistas', description: 'Leis de proteção ao emprego (nos moldes da CLT) precisam ser mais flexibilizadas, permitindo negociação direta entre empregador e empregado.', accentColor: '#ffd166' },
  { id: 'meio_amb', title: 'Meio Ambiente', description: 'Proteger o meio ambiente e preservar florestas deve ser prioridade máxima do Estado, ainda que signifique perder poder de crescimento econômico na região.', accentColor: '#06d6a0' },
];

export function MatchClient({
  parlamentares,
  rankings,
}: {
  parlamentares: PerfilPublico[];
  rankings: Record<string, number>;
}) {
  const [answers, setAnswers] = useState<UserAnswersMap>({});
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [ufFilter, setUfFilter] = useState('');
  const [casaFilter, setCasaFilter] = useState('');
  const [matchScores, setMatchScores] = useState<Record<string, number>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const spectrumSectionRef = useRef<HTMLDivElement | null>(null);

  const ufs = useMemo(() => {
    return Array.from(new Set(parlamentares.map((p) => p.uf).filter(Boolean))).sort() as string[];
  }, [parlamentares]);

  const currentQuestion = QUESTIONS[currentStep];
  const totalSteps = QUESTIONS.length;

  useEffect(() => {
    if (!showResults) return;
    window.requestAnimationFrame(() => {
      if (spectrumSectionRef.current) {
        spectrumSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }, [showResults]);

  useEffect(() => {
    if (!showResults) {
      setMatchScores({});
      setIsCalculating(false);
      return;
    }

    let cancelled = false;
    setIsCalculating(true);

    async function fetchScores() {
      try {
        const payload = {
          answers,
          parlamentares: parlamentares.map((p) => ({
            id: p.id,
            idOrigem: p.idOrigem,
            nome_urna: p.nome_urna,
            partido: p.partido,
            uf: p.uf,
            fonte: p.fonte,
          })),
          rankings,
        };

        const resp = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!resp.ok) throw new Error('Falha ao calcular match');
        const data = await resp.json();

        if (!cancelled && data.scores) {
          const map: Record<string, number> = {};
          data.scores.forEach((s: { id: string; score: number }) => {
            map[s.id] = s.score;
          });
          setMatchScores(map);
        }
      } catch (err) {
        console.error('Erro ao buscar scores de match:', err);
      } finally {
        if (!cancelled) setIsCalculating(false);
      }
    }

    fetchScores();
    return () => { cancelled = true; };
  }, [showResults, answers, parlamentares, rankings]);

  const handleAnswer = (questionId: string, answer: { score: number; weight: number }) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection('next');
      setCurrentStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setDirection('prev');
      setCurrentStep((s) => s - 1);
    }
  };

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 'next' : 'prev');
    setCurrentStep(step);
  };

  const results = useMemo(() => {
    if (!showResults) return { scored: [], nolan: null };

    const nolan = calculateNolanChart(answers);

    const scored = parlamentares.map((pol) => {
      const rankingKey = buildRankingLookupKey({
        nome: pol.nome_urna,
        partido: pol.partido,
        uf: pol.uf,
        casa: pol.fonte,
      });
      const rankingNota = rankings[rankingKey] ?? null;

      const realScore = matchScores[pol.id];
      const score =
        typeof realScore === 'number'
          ? realScore
          : calculateMatchScoreDetailed(
              answers,
              pol.idOrigem || pol.nome_urna,
              pol.partido || '',
              rankingNota,
            );

      return { ...pol, score, rankingNota };
    });

    return {
      scored: scored.sort((a, b) => b.score - a.score),
      nolan,
    };
  }, [answers, parlamentares, showResults, rankings, matchScores]);

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-4xl mx-auto w-full overflow-x-hidden">
      {!showResults ? (
        <div className="space-y-6">
          {/* Header do wizard */}
          <div className="bg-white border-4 border-black p-6 sm:p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <h1 className="font-headline font-black text-3xl sm:text-5xl uppercase mb-3">Match Eleitoral</h1>
            <p className="font-body font-bold text-base sm:text-lg opacity-80 max-w-2xl mx-auto">
              Responda {totalSteps} temas para descobrir quais parlamentares pensam mais parecido com você.
            </p>
          </div>

          {/* Progresso segmentado */}
          <div className="bg-white border-4 border-black p-4 sm:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-headline font-black uppercase text-sm">
                Pergunta {currentStep + 1} de {totalSteps}
              </span>
              <span className="font-label font-bold uppercase text-xs text-black/60">
                {answeredCount} de {totalSteps} respondidas
              </span>
            </div>
            <div className="flex gap-1">
              {QUESTIONS.map((q, i) => {
                const isAnswered = answers[q.id] != null;
                const isCurrent = i === currentStep;
                return (
                  <button
                    key={q.id}
                    onClick={() => goToStep(i)}
                    className={`
                      flex-1 h-3 sm:h-4 border-2 border-black transition-all duration-200 cursor-pointer
                      ${isAnswered ? 'bg-black' : 'bg-white'}
                      ${isCurrent ? 'ring-2 ring-offset-2 ring-[#ff006e]' : ''}
                    `}
                    title={q.title}
                  />
                );
              })}
            </div>
          </div>

          {/* Card da pergunta com animação */}
          <div
            key={currentQuestion.id}
            className="animate-slide-in"
            style={{ animationDuration: '0.3s' }}
          >
            <MatchQuiz
              questionId={currentQuestion.id}
              title={currentQuestion.title}
              description={currentQuestion.description}
              accentColor={currentQuestion.accentColor}
              currentAnswer={answers[currentQuestion.id]}
              onAnswer={handleAnswer}
            />
          </div>

          {/* Navegação */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goPrev}
              disabled={currentStep === 0}
              className="bg-white border-4 border-black font-headline font-black px-5 py-3 sm:px-6 sm:py-4 uppercase text-base sm:text-lg hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-30 disabled:hover:shadow-none disabled:cursor-not-allowed transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              ← Anterior
            </button>

            {currentStep === totalSteps - 1 ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={answeredCount < 3}
                className="bg-black text-white border-4 border-black font-headline font-black px-6 py-3 sm:px-8 sm:py-4 uppercase text-lg sm:text-xl hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] disabled:opacity-40 disabled:hover:shadow-none transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Ver resultados →
              </button>
            ) : (
              <button
                onClick={goNext}
                className="bg-[#ffe066] border-4 border-black font-headline font-black px-5 py-3 sm:px-6 sm:py-4 uppercase text-base sm:text-lg hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Próximo →
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Resultado principal — compacto */}
          {results.nolan && (
            <div
              ref={spectrumSectionRef}
              className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden scroll-mt-4"
            >
              {/* Header com label + share */}
              <div
                className="border-b-4 border-black px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                style={{ backgroundColor: getNolanColors(results.nolan.label).bg }}
              >
                <div>
                  <p className="font-label font-bold uppercase text-[10px] tracking-widest opacity-60 mb-0.5">Seu eixo ideologico</p>
                  <h2
                    className="font-headline font-black text-2xl sm:text-3xl uppercase leading-none"
                    style={{ color: getNolanColors(results.nolan.label).text }}
                  >
                    {results.nolan.label}
                  </h2>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => { setShowResults(false); setCurrentStep(0); setMatchScores({}); }}
                    className="bg-white border-3 border-black font-headline font-black px-4 py-2 uppercase text-sm hover:bg-gray-100 transition-colors"
                  >
                    Refazer
                  </button>
                  {results.nolan && <MatchShareCard nolan={results.nolan} topMatches={results.scored} />}
                </div>
              </div>

              {/* Corpo: descricao + barras + mini diagrama */}
              <div className="p-5 sm:p-6 space-y-5">
                <p className="font-body text-sm sm:text-base leading-relaxed text-black/80">
                  {results.nolan.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border-4 border-black p-3 text-center" style={{ backgroundColor: '#06d6a020' }}>
                    <p className="font-label font-bold uppercase text-[10px] opacity-60">Economia</p>
                    <p className="font-headline font-black text-2xl">{results.nolan.econPercent.toFixed(0)}%</p>
                  </div>
                  <div className="border-4 border-black p-3 text-center" style={{ backgroundColor: '#ff9f1c20' }}>
                    <p className="font-label font-bold uppercase text-[10px] opacity-60">Social</p>
                    <p className="font-headline font-black text-2xl">{results.nolan.personalPercent.toFixed(0)}%</p>
                  </div>
                </div>

                {/* Mini Nolan Diagram */}
                <div className="flex justify-center">
                  <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56" preserveAspectRatio="xMidYMid meet">
                    {(() => {
                      const n = results.nolan;
                      const cx = 100;
                      const cy = 100;
                      const s = 70;
                      const up = n.econPercent / 100 - 0.5;
                      const vp = n.personalPercent / 100 - 0.5;
                      const px = cx + (up - vp) * s;
                      const py = cy - (up + vp) * s;

                      const t = { x: cx, y: 20 };
                      const r = { x: 180, y: cy };
                      const b = { x: cx, y: 180 };
                      const l = { x: 20, y: cy };

                      return (
                        <g>
                          <rect x="0" y="0" width="200" height="200" fill="#fff" stroke="#000" strokeWidth="3" />
                          <polygon points={`${t.x},${t.y} ${cx},${cy} ${l.x},${l.y}`} fill="#bfdbfe" />
                          <polygon points={`${t.x},${t.y} ${r.x},${r.y} ${cx},${cy}`} fill="#fecaca" />
                          <polygon points={`${l.x},${l.y} ${cx},${cy} ${b.x},${b.y}`} fill="#e9d5ff" />
                          <polygon points={`${cx},${cy} ${r.x},${r.y} ${b.x},${b.y}`} fill="#fde68a" />
                          <line x1={l.x} y1={l.y} x2={r.x} y2={r.y} stroke="#000" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1={t.x} y1={t.y} x2={b.x} y2={b.y} stroke="#000" strokeWidth="1" strokeDasharray="3 3" />
                          <text x={cx} y={12} textAnchor="middle" style={{ fontSize: 7, fontWeight: 800 }}>LIBERTARIO</text>
                          <text x={195} y={cy + 3} textAnchor="end" style={{ fontSize: 7, fontWeight: 800 }}>DIREITA</text>
                          <text x={5} y={cy + 3} textAnchor="start" style={{ fontSize: 7, fontWeight: 800 }}>ESQUERDA</text>
                          <text x={cx} y={197} textAnchor="middle" style={{ fontSize: 7, fontWeight: 800 }}>AUTORITARIO</text>
                          <circle cx={px} cy={py} r="6" fill="#000" stroke="#fff" strokeWidth="2" />
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {isCalculating && (
                  <p className="font-label font-bold uppercase text-xs text-center text-yellow-900 animate-pulse">
                    Consultando votacoes reais na Camara...
                  </p>
                )}
                {!isCalculating && Object.keys(matchScores).length > 0 && (
                  <p className="font-label font-bold uppercase text-xs text-center text-green-800">
                    Scores refinados com votacoes reais
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Filtros */}
          <div className="bg-white border-4 border-black p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label font-bold uppercase text-xs opacity-70">Filtrar:</span>
              <select
                value={ufFilter}
                onChange={(e) => setUfFilter(e.target.value)}
                className="border-3 border-black px-2 py-1.5 font-headline font-bold uppercase text-sm bg-white"
              >
                <option value="">UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
              <select
                value={casaFilter}
                onChange={(e) => setCasaFilter(e.target.value)}
                className="border-3 border-black px-2 py-1.5 font-headline font-bold uppercase text-sm bg-white"
              >
                <option value="">Casa</option>
                <option value="camara">Deputados</option>
                <option value="senado">Senadores</option>
              </select>
              {(ufFilter || casaFilter) && (
                <button
                  onClick={() => { setUfFilter(''); setCasaFilter(''); }}
                  className="font-label font-bold uppercase text-xs border-2 border-black px-2 py-1 hover:bg-gray-100"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Cards de resultados — mais compactos */}
          {(() => {
            const filtered = results.scored
              .filter((pol) => (!ufFilter || pol.uf === ufFilter) && (!casaFilter || pol.fonte === casaFilter))
              .slice(0, 24);

            if (filtered.length === 0) {
              return (
                <div className="bg-white border-4 border-black p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <span className="material-symbols-outlined text-5xl mb-3 block">filter_alt_off</span>
                  <h3 className="font-headline font-black text-xl uppercase">Nenhum parlamentar encontrado</h3>
                  <p className="font-body font-bold mt-2 text-sm">Tente remover os filtros.</p>
                  <button
                    onClick={() => { setUfFilter(''); setCasaFilter(''); }}
                    className="mt-4 bg-black text-white font-headline font-black px-5 py-2 uppercase border-4 border-black hover:bg-white hover:text-black transition-colors text-sm"
                  >
                    Limpar filtros
                  </button>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((pol) => {
                  const href = `/perfil/${pol.fonte}/${pol.idOrigem}`;
                  return (
                    <Link
                      key={pol.idOrigem}
                      href={href}
                      className="bg-white border-3 border-black flex flex-col hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:shadow-none active:translate-y-0 transition-all duration-150 cursor-pointer group"
                    >
                      <div className="aspect-square bg-gray-100 overflow-hidden relative border-b-3 border-black">
                        {pol.foto_url ? (
                          <Image src={pol.foto_url} alt={pol.nome_urna} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-300" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-headline font-black text-3xl text-gray-300">
                            {getInitials(pol.nome_urna)}
                          </div>
                        )}
                        <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white text-center py-0.5">
                          <span className="font-headline font-black text-lg leading-none">{pol.score.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <p className="font-headline font-black text-sm uppercase leading-tight truncate">{pol.nome_urna}</p>
                        <p className="font-label font-bold text-[10px] uppercase opacity-60 truncate">{pol.partido} {pol.uf ? `· ${pol.uf}` : ''}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}