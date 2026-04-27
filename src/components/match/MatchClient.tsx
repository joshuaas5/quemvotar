'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MatchQuiz } from './MatchQuiz';
import MatchShareCard from './MatchShareCard';
import { calculateMatchScoreDetailed, calculateNolanChart, type UserAnswersMap } from '@/lib/match/calculator';
import { buildRankingLookupKey } from '@/lib/match/ranking-key';
import type { PerfilPublico } from '@/lib/api';

/* Barras de stats estilo RPG */
function StatBar({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  const filled = Math.round(value / 10);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-headline font-black uppercase text-sm sm:text-base">
          {icon} {label}
        </span>
        <span className="font-headline font-black text-xl">{value.toFixed(0)}%</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-4 sm:h-5 border-2 border-black ${i < filled ? '' : 'bg-gray-200'}`}
            style={i < filled ? { backgroundColor: color } : undefined}
          />
        ))}
      </div>
    </div>
  );
}

type Question = {
  id: string;
  title: string;
  description: string;
  accentColor: string;
};

const QUESTIONS: Question[] = [
  {
    id: 'pvt',
    title: 'Privatizações',
    description: 'Empresas estatais (Correios, Petrobras) devem ser privatizadas para melhorar a eficiência da economia e remover corrupção.',
    accentColor: '#ffe066',
  },
  {
    id: 'agr',
    title: 'Agronegócio',
    description: 'O agronegócio e a produção de alimentos devem ter mais liberdade para se expandir, mesmo que avance sobre áreas de preservação ambiental informais.',
    accentColor: '#9bf6ff',
  },
  {
    id: 'impostos',
    title: 'Taxação de Fortunas',
    description: 'O governo deve aumentar os impostos sobre grandes fortunas e grandes lucros para financiar mais programas de bem social e redução de desigualdade.',
    accentColor: '#ffc6ff',
  },
  {
    id: 'drogas',
    title: 'Drogas',
    description: 'A legalização e regulamentação da maconha seria uma medida mais eficaz para combater o tráfico e a violência do que a proibição.',
    accentColor: '#c77dff',
  },
  {
    id: 'armas',
    title: 'Posse de Armas',
    description: 'O acesso à posse e ao porte de armas de fogo pelo cidadão comum sem antecedentes criminais deve ser facilitado para defesa pessoal.',
    accentColor: '#ff6b6b',
  },
  {
    id: 'cotas',
    title: 'Cotas',
    description: 'Reservas de vagas (cotas raciais e sociais) em universidades e concursos públicos são políticas fundamentais para reduzir desigualdades.',
    accentColor: '#ff9f1c',
  },
  {
    id: 'abor',
    title: 'Aborto',
    description: 'A decisão sobre a interrupção da gravidez (aborto) nas primeiras semanas deve pertencer somente à mulher, de forma descriminalizada e legalizada.',
    accentColor: '#ff006e',
  },
  {
    id: 'religiao',
    title: 'Religião no Estado',
    description: 'Valores cristãos e da família tradicional devem ser a principal base para as diretrizes morais de leis e do ensino público.',
    accentColor: '#a2d2ff',
  },
  {
    id: 'clt',
    title: 'Leis Trabalhistas',
    description: 'Leis de proteção ao emprego (nos moldes da CLT) precisam ser mais flexibilizadas, permitindo negociação direta entre empregador e empregado.',
    accentColor: '#ffd166',
  },
  {
    id: 'meio_amb',
    title: 'Meio Ambiente',
    description: 'Proteger o meio ambiente e preservar florestas deve ser prioridade máxima do Estado, ainda que signifique perder poder de crescimento econômico na região.',
    accentColor: '#06d6a0',
  },
];

/* Cor do quadrante Nolan para badge e fundo */
function getNolanColors(label: string) {
  if (label.includes('Libertário')) return { bg: '#bfdbfe', border: '#2563eb', text: '#1e40af' };
  if (label.includes('Conservador')) return { bg: '#fecaca', border: '#dc2626', text: '#991b1b' };
  if (label.includes('Esquerda') || label.includes('Progressista')) return { bg: '#e9d5ff', border: '#9333ea', text: '#6b21a8' };
  if (label.includes('Estatista')) return { bg: '#fde68a', border: '#d97706', text: '#92400e' };
  return { bg: '#f3f4f6', border: '#6b7280', text: '#374151' };
}

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
  const spectrumSectionRef = useRef<HTMLDivElement | null>(null);

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
      const score = calculateMatchScoreDetailed(
        answers,
        pol.idOrigem || pol.nome_urna,
        pol.partido || '',
        rankingNota,
      );
      return { ...pol, score, rankingNota };
    });

    return {
      scored: scored.sort((a, b) => b.score - a.score).slice(0, 12),
      nolan,
    };
  }, [answers, parlamentares, showResults, rankings]);

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
        <div className="space-y-8">
          {/* Header dos resultados */}
          <div className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center gap-4 bg-primary-container border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="min-w-0">
              <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase leading-none">Seu resultado</h2>
              <p className="font-body font-bold mt-2 opacity-80 max-w-xl text-sm sm:text-base">
                Cruzamos suas respostas com o espectro partidário e histórico de votações teóricas de {parlamentares.length} parlamentares.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { setShowResults(false); setCurrentStep(0); }}
                className="bg-white border-4 border-black font-headline font-black px-5 py-3 sm:px-6 sm:py-4 uppercase text-base hover:bg-gray-100 w-full sm:w-auto text-center transition-all"
              >
                Refazer quiz
              </button>
              {results.nolan && (
                <MatchShareCard nolan={results.nolan} topMatches={results.scored} />
              )}
            </div>
          </div>

          {/* Dashboard de Perfil Nolan */}
          {results.nolan && (
            <div
              ref={spectrumSectionRef}
              className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden scroll-mt-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Info do perfil */}
                <div className="min-w-0 space-y-6">
                  <div>
                    <h3 className="font-headline font-black text-2xl sm:text-3xl uppercase mb-3">Seu perfil político</h3>
                    <div
                      className="inline-block border-4 border-black px-4 py-2 font-headline font-black text-lg sm:text-xl uppercase"
                      style={{
                        backgroundColor: getNolanColors(results.nolan.label).bg,
                        color: getNolanColors(results.nolan.label).text,
                      }}
                    >
                      {results.nolan.label}
                    </div>
                  </div>

                  <p className="font-body font-bold text-base sm:text-lg leading-relaxed text-black/80">
                    {results.nolan.description}
                  </p>

                  <div className="space-y-4">
                    <StatBar
                      label="Liberdade Econômica"
                      value={results.nolan.econPercent}
                      color="#06d6a0"
                      icon="💰"
                    />
                    <StatBar
                      label="Liberdade Pessoal"
                      value={results.nolan.personalPercent}
                      color="#ff9f1c"
                      icon="🕊️"
                    />
                  </div>
                </div>

                {/* Diagrama de Nolan */}
                <div className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto aspect-square flex items-center justify-center">
                  <svg viewBox="0 0 360 360" className="w-full h-full border-4 border-black bg-white" preserveAspectRatio="xMidYMid meet">
                    {(() => {
                      const cx = 180;
                      const cy = 180;
                      const scale = 100;
                      const u = results.nolan.econPercent / 100;
                      const v = results.nolan.personalPercent / 100;
                      const up = u - 0.5;
                      const vp = v - 0.5;
                      const px = cx + (up - vp) * scale;
                      const py = cy - (up + vp) * scale;

                      const top = { x: cx, y: 80 };
                      const right = { x: 280, y: cy };
                      const bottom = { x: cx, y: 280 };
                      const left = { x: 80, y: cy };

                      return (
                        <g>
                          <polygon points={`${top.x},${top.y} ${cx},${cy} ${left.x},${left.y}`} fill="#bfdbfe" stroke="none" />
                          <polygon points={`${top.x},${top.y} ${right.x},${right.y} ${cx},${cy}`} fill="#fecaca" stroke="none" />
                          <polygon points={`${left.x},${left.y} ${cx},${cy} ${bottom.x},${bottom.y}`} fill="#e9d5ff" stroke="none" />
                          <polygon points={`${cx},${cy} ${right.x},${right.y} ${bottom.x},${bottom.y}`} fill="#fde68a" stroke="none" />

                          <polygon
                            points={`${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}`}
                            fill="none"
                            stroke="#000"
                            strokeWidth="3"
                          />

                          <line x1={left.x} y1={left.y} x2={right.x} y2={right.y} stroke="#000" strokeWidth="1.5" strokeDasharray="4 4" />
                          <line x1={top.x} y1={top.y} x2={bottom.x} y2={bottom.y} stroke="#000" strokeWidth="1.5" strokeDasharray="4 4" />

                          <text x={cx - 34} y={cy - 34} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>Progressista</text>
                          <text x={cx + 34} y={cy - 34} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>Liberalismo</text>
                          <text x={cx - 34} y={cy + 40} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>Estatista</text>
                          <text x={cx + 34} y={cy + 40} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>Conservador</text>

                          <rect x={top.x - 38} y={top.y - 22} width="76" height="18" fill="#fff" stroke="#000" strokeWidth="1.5" />
                          <text x={top.x} y={top.y - 8} textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Libertário</text>

                          <rect x={right.x + 6} y={right.y - 10} width="76" height="18" fill="#fff" stroke="#000" strokeWidth="1.5" />
                          <text x={right.x + 44} y={right.y + 2} textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Direita</text>

                          <rect x={left.x - 82} y={left.y - 10} width="76" height="18" fill="#fff" stroke="#000" strokeWidth="1.5" />
                          <text x={left.x - 44} y={left.y + 2} textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Esquerda</text>

                          <rect x={bottom.x - 38} y={bottom.y + 6} width="76" height="18" fill="#fff" stroke="#000" strokeWidth="1.5" />
                          <text x={bottom.x} y={bottom.y + 20} textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Autoritário</text>

                          <text x={right.x + 22} y={right.y + 28} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700 }}>Liberdade Econômica →</text>
                          <text x={left.x - 14} y={left.y - 24} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700 }}>← Intervencionismo</text>
                          <text x={top.x + 52} y={top.y + 14} textAnchor="start" style={{ fontSize: 9, fontWeight: 700 }}>↑ Liberdade Pessoal</text>
                          <text x={bottom.x + 52} y={bottom.y - 10} textAnchor="start" style={{ fontSize: 9, fontWeight: 700 }}>↓ Autoritarismo</text>

                          <circle cx={px} cy={py} r="8" fill="#000" stroke="#fff" strokeWidth="3" />
                          <circle cx={px} cy={py} r="4" fill="#fff" />
                        </g>
                      );
                    })()}
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Cards de resultados */}
          <div>
            <h3 className="font-headline font-black text-2xl sm:text-3xl uppercase mb-4">
              Parlamentares mais alinhados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.scored.map((pol, index) => {
                const perfilHref = `/perfil/${pol.fonte}/${pol.idOrigem}`;
                const delay = Math.min(index * 80, 600);
                return (
                  <Link
                    key={pol.idOrigem}
                    href={perfilHref}
                    className="bg-white border-4 border-black p-5 flex flex-col items-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
                  >
                    {pol.rankingNota !== null && (
                      <div className="absolute top-2 right-2 bg-[#ffe066] border-4 border-black px-2 py-1 font-headline font-black text-xs sm:text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10 leading-tight">
                        Nota {pol.rankingNota.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                      </div>
                    )}

                    <div className="w-28 h-28 border-4 border-black bg-gray-200 rounded-full mb-3 overflow-hidden relative flex items-center justify-center">
                      {pol.foto_url ? (
                        <Image src={pol.foto_url} alt={pol.nome_urna} fill sizes="112px" className="object-cover object-top" unoptimized />
                      ) : (
                        <span className="font-headline font-black text-2xl text-gray-400">
                          {pol.nome_urna.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      )}
                    </div>

                    <h4 className="font-headline font-black text-xl uppercase leading-tight mb-1 break-words w-full">
                      {pol.nome_urna}
                    </h4>
                    <p className="font-label font-bold text-xs uppercase opacity-70 mb-3 bg-gray-100 px-2 py-1 border-2 border-black w-full break-words">
                      {pol.partido} - {pol.uf}
                    </p>

                    <div className="mt-auto w-full bg-secondary-fixed border-4 border-black py-3">
                      <span className="font-headline font-black text-3xl">{pol.score.toFixed(1)}%</span>
                      <span className="block text-xs font-bold uppercase mt-1 opacity-90">Afinidade</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
