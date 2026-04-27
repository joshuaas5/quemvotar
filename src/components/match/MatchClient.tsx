'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MatchQuiz } from './MatchQuiz';
import { calculateMatchScoreDetailed, calculateNolanChart, type UserAnswersMap } from '@/lib/match/calculator';
import { buildRankingLookupKey } from '@/lib/match/ranking-key';
import type { PerfilPublico } from '@/lib/api';

function ShareMatchButton({ nolan, topMatches }: { nolan: ReturnType<typeof calculateNolanChart>; topMatches: Array<PerfilPublico & { score: number }> }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const lines = [
      `🗳️ Meu Match Eleitoral no QuemVotar:`,
      ``,
      `📍 Eixo ideológico: ${nolan.label}`,
      `💰 Liberdade Econômica: ${nolan.econPercent.toFixed(0)}%`,
      `🕊️ Liberdade Pessoal: ${nolan.personalPercent.toFixed(0)}%`,
      ``,
      `🏆 Top matches:`,
      ...topMatches.slice(0, 3).map((p, i) => `${i + 1}. ${p.nome_urna} (${p.partido}-${p.uf}) — ${p.score.toFixed(1)}%`),
      ``,
      `Descubra o seu: https://quemvotar.com.br/match`,
    ];

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-[#25d366] border-4 border-black font-headline font-black px-6 py-4 uppercase text-lg hover:brightness-110 w-full md:w-auto text-center flex items-center justify-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {copied ? 'Copiado!' : 'Copiar resultado'}
    </button>
  );
}

type Question = {
  id: string;
  title: string;
  description: string;
};

const QUESTIONS: Question[] = [
  {
    id: 'pvt',
    title: 'Privatizações',
    description:
      'Empresas estatais (Correios, Petrobras) devem ser privatizadas para melhorar a eficiência da economia e remover corrupção.',
  },
  {
    id: 'agr',
    title: 'Agronegócio',
    description:
      'O agronegócio e a produção de alimentos devem ter mais liberdade para se expandir, mesmo que avance sobre áreas de preservação ambiental informais.',
  },
  {
    id: 'impostos',
    title: 'Taxação de Fortunas',
    description:
      'O governo deve aumentar os impostos sobre grandes fortunas e grandes lucros para financiar mais programas de bem social e redução de desigualdade.',
  },
  {
    id: 'drogas',
    title: 'Drogas',
    description:
      'A legalização e regulamentação da maconha seria uma medida mais eficaz para combater o tráfico e a violência do que a proibição.',
  },
  {
    id: 'armas',
    title: 'Posse de Armas',
    description:
      'O acesso à posse e ao porte de armas de fogo pelo cidadão comum sem antecedentes criminais deve ser facilitado para defesa pessoal.',
  },
  {
    id: 'cotas',
    title: 'Cotas',
    description:
      'Reservas de vagas (cotas raciais e sociais) em universidades e concursos públicos são políticas fundamentais para reduzir desigualdades.',
  },
  {
    id: 'abor',
    title: 'Aborto',
    description:
      'A decisão sobre a interrupção da gravidez (aborto) nas primeiras semanas deve pertencer somente à mulher, de forma descriminalizada e legalizada.',
  },
  {
    id: 'religiao',
    title: 'Religião no Estado',
    description:
      'Valores cristãos e da família tradicional devem ser a principal base para as diretrizes morais de leis e do ensino público.',
  },
  {
    id: 'clt',
    title: 'Leis Trabalhistas',
    description:
      'Leis de proteção ao emprego (nos moldes da CLT) precisam ser mais flexibilizadas, permitindo negociação direta entre empregador e empregado.',
  },
  {
    id: 'meio_amb',
    title: 'Meio Ambiente',
    description:
      'Proteger o meio ambiente e preservar florestas deve ser prioridade máxima do Estado, ainda que signifique perder poder de crescimento econômico na região.',
  },
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
  const spectrumSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showResults) return;

    window.requestAnimationFrame(() => {
      if (spectrumSectionRef.current) {
        spectrumSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [showResults]);

  const handleAnswer = (questionId: string, answer: { score: number; weight: number }) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
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

  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);

  return (
    <div className="max-w-6xl mx-auto w-full overflow-x-hidden">
      {!showResults ? (
        <div className="space-y-8">
          <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <h1 className="font-headline font-black text-4xl uppercase mb-2">Descubra seu Match</h1>
            <p className="font-body font-bold opacity-80 max-w-2xl mx-auto">
              Sua opinião importa. Analisaremos sua visão de mundo em economia, sociedade, costumes e
              meio ambiente para cruzar com a inclinação e histórico de cada parlamentar.
            </p>

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
                currentAnswer={answers[q.id]}
                onAnswer={handleAnswer}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12 bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="text-center w-full">
              <p className="font-label font-bold uppercase tracking-widest text-sm mb-4 opacity-70">
                Responda todas para o melhor resultado
              </p>
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(answers).length < 3}
                className="bg-black text-white font-headline font-black text-2xl sm:text-3xl uppercase px-8 sm:px-16 py-6 border-4 border-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-none transition-all w-full sm:w-auto"
              >
                Cruzar dados e ver resultados
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center gap-4 bg-primary-container border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="min-w-0">
              <h2 className="font-headline font-black text-4xl uppercase leading-none">Resultado do cruzamento</h2>
              <p className="font-body font-bold mt-2 opacity-80 max-w-xl">
                Encontramos os parlamentares que possuem o perfil mais alinhado com base em espectro
                partidário e análise de inclinações em votações teóricas.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => setShowResults(false)}
                className="bg-white border-4 border-black font-headline font-black px-6 py-4 uppercase text-lg hover:bg-gray-100 w-full md:w-auto text-center"
              >
                Afinar respostas
              </button>
              {results.nolan && (
                <ShareMatchButton nolan={results.nolan} topMatches={results.scored} />
              )}
            </div>
          </div>

          {results.nolan && (
            <div
              ref={spectrumSectionRef}
              className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center scroll-mt-4 overflow-hidden"
            >
              <div className="min-w-0">
                <h3 className="font-headline font-black text-3xl uppercase mb-4 text-primary-fixed">Seu eixo ideológico</h3>
                <p className="font-body font-bold text-lg mb-2">
                  Seu posicionamento, calculado no Diagrama de Nolan pelas suas respostas, sugere o eixo:{' '}
                  <strong className="bg-[#ffc6ff] border-2 border-black px-2">{results.nolan.label}</strong>.
                </p>
                <ul className="space-y-2 mt-4 font-body font-medium">
                  <li>
                    <strong>Liberdade Econômica:</strong> {results.nolan.econPercent.toFixed(0)}%
                  </li>
                  <li>
                    <strong>Liberdade Pessoal:</strong> {results.nolan.personalPercent.toFixed(0)}%
                  </li>
                </ul>
              </div>

              <div className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto aspect-square flex items-center justify-center">
                {/* Diagrama de Nolan — diamante científico conforme David Nolan (1971) */}
                <svg viewBox="0 0 360 360" className="w-full h-full border-4 border-black bg-white" preserveAspectRatio="xMidYMid meet">
                  {/* Centro e escala */}
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

                    // Vértices do diamante
                    const top = { x: cx, y: 80 };
                    const right = { x: 280, y: cy };
                    const bottom = { x: cx, y: 280 };
                    const left = { x: 80, y: cy };

                    return (
                      <g>
                        {/* 4 triângulos coloridos do diamante */}
                        <polygon points={`${top.x},${top.y} ${cx},${cy} ${left.x},${left.y}`} fill="#bfdbfe" stroke="none" />
                        <polygon points={`${top.x},${top.y} ${right.x},${right.y} ${cx},${cy}`} fill="#fecaca" stroke="none" />
                        <polygon points={`${left.x},${left.y} ${cx},${cy} ${bottom.x},${bottom.y}`} fill="#e9d5ff" stroke="none" />
                        <polygon points={`${cx},${cy} ${right.x},${right.y} ${bottom.x},${bottom.y}`} fill="#fde68a" stroke="none" />

                        {/* Borda do diamante */}
                        <polygon
                          points={`${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}`}
                          fill="none"
                          stroke="#000"
                          strokeWidth="3"
                        />

                        {/* Eixos tracejados */}
                        <line x1={left.x} y1={left.y} x2={right.x} y2={right.y} stroke="#000" strokeWidth="1.5" strokeDasharray="4 4" />
                        <line x1={top.x} y1={top.y} x2={bottom.x} y2={bottom.y} stroke="#000" strokeWidth="1.5" strokeDasharray="4 4" />

                        {/* Labels internos dos quadrantes */}
                        <text x={cx - 34} y={cy - 34} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>Progressista</text>
                        <text x={cx + 34} y={cy - 34} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>Liberalismo</text>
                        <text x={cx - 34} y={cy + 40} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>Estatista</text>
                        <text x={cx + 34} y={cy + 40} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>Conservador</text>

                        {/* Labels das pontas (fora do diamante) */}
                        <rect x={top.x - 38} y={top.y - 22} width="76" height="18" fill="#fff" stroke="#000" strokeWidth="1.5" />
                        <text x={top.x} y={top.y - 8} textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Libertário</text>

                        <rect x={right.x + 6} y={right.y - 10} width="76" height="18" fill="#fff" stroke="#000" strokeWidth="1.5" />
                        <text x={right.x + 44} y={right.y + 2} textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Direita</text>

                        <rect x={left.x - 82} y={left.y - 10} width="76" height="18" fill="#fff" stroke="#000" strokeWidth="1.5" />
                        <text x={left.x - 44} y={left.y + 2} textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Esquerda</text>

                        <rect x={bottom.x - 38} y={bottom.y + 6} width="76" height="18" fill="#fff" stroke="#000" strokeWidth="1.5" />
                        <text x={bottom.x} y={bottom.y + 20} textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Autoritário</text>

                        {/* Títulos dos eixos */}
                        <text x={right.x + 22} y={right.y + 28} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700 }}>Liberdade Econômica →</text>
                        <text x={left.x - 14} y={left.y - 24} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700 }}>← Intervencionismo</text>
                        <text x={top.x + 52} y={top.y + 14} textAnchor="start" style={{ fontSize: 9, fontWeight: 700 }}>↑ Liberdade Pessoal</text>
                        <text x={bottom.x + 52} y={bottom.y - 10} textAnchor="start" style={{ fontSize: 9, fontWeight: 700 }}>↓ Autoritarismo</text>

                        {/* Bolinha do usuário */}
                        <circle cx={px} cy={py} r="8" fill="#000" stroke="#fff" strokeWidth="3" />
                        <circle cx={px} cy={py} r="4" fill="#fff" />
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.scored.map((pol) => {
              const perfilHref = `/perfil/${pol.fonte}/${pol.idOrigem}`;
              return (
                <Link
                  key={pol.idOrigem}
                  href={perfilHref}
                  className="bg-white border-4 border-black p-6 flex flex-col items-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow cursor-pointer"
                >
                  {pol.rankingNota !== null && (
                    <div className="absolute top-2 right-2 bg-[#ffe066] border-4 border-black px-2 py-1 font-headline font-black text-sm sm:text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10 max-w-[75%] text-right leading-tight">
                      Nota{' '}
                      {pol.rankingNota.toLocaleString('pt-BR', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}
                    </div>
                  )}

                  <div className="w-32 h-32 border-4 border-black bg-gray-200 rounded-full mb-4 overflow-hidden relative flex items-center justify-center">
                    {pol.foto_url ? (
                      <Image src={pol.foto_url} alt={pol.nome_urna} fill sizes="128px" className="object-cover object-top" unoptimized />
                    ) : (
                      <span className="font-headline font-black text-2xl text-gray-400">{pol.nome_urna.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                    )}
                  </div>
                  <h3 className="font-headline font-black text-2xl uppercase leading-tight mb-2 break-words w-full">
                    {pol.nome_urna}
                  </h3>
                  <p className="font-label font-bold text-sm uppercase opacity-70 mb-4 bg-gray-100 px-3 py-1 border-2 border-black w-full break-words">
                    {pol.partido} - {pol.uf}
                  </p>
                  <div className="mt-auto w-full bg-secondary-fixed border-4 border-black py-4">
                    <span className="font-headline font-black text-4xl">{pol.score.toFixed(1)}%</span>
                    <span className="block text-sm font-bold uppercase mt-1 opacity-90">De afinidade total</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
