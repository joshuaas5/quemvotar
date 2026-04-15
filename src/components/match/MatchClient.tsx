'use client';

import React, { useState, useMemo } from 'react';
import { MatchQuiz } from './MatchQuiz';
import { calculateMatchScore, type UserAnswersMap } from '@/lib/match/calculator';
import type { PerfilPublico } from '@/lib/api';

type Question = {
  id: string;
  title: string;
};

const QUESTIONS: Question[] = [
  { id: 'q1', title: 'A favor do Marco Temporal das Terras Indígenas?' },
  { id: 'q2', title: 'Autonomia financeira do Banco Central?' },
  { id: 'q3', title: 'Legalização dos Jogos de Azar?' }
];

function getMockPoliticianVotes(polId: string) {
  const hash = polId.charCodeAt(0) + polId.charCodeAt(polId.length - 1);
  return {
    q1: hash % 2 === 0 ? 'SIM' : 'NAO',
    q2: hash % 3 === 0 ? 'SIM' : 'NAO',
    q3: hash % 5 === 0 ? 'SIM' : 'NAO',
  };
}

export function MatchClient({ parlamentares }: { parlamentares: PerfilPublico[] }) {
  const [answers, setAnswers] = useState<UserAnswersMap>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, answer: { vote: string; weight: number }) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const results = useMemo(() => {
    if (!showResults) return [];

    const scored = parlamentares.map(pol => {
      const polVotes = getMockPoliticianVotes(pol.idOrigem || pol.nome_urna);
      const score = calculateMatchScore(answers, polVotes);
      return { ...pol, score };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 12);
  }, [answers, parlamentares, showResults]);

  return (
    <div className="max-w-5xl mx-auto w-full">
      {!showResults ? (
        <div className="space-y-8">
          <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-4xl uppercase mb-2">Descubra seu Match</h1>
            <p className="font-body font-bold opacity-80">Responda aos temas abaixo para ver quais parlamentares votam como você.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {QUESTIONS.map(q => (
              <MatchQuiz 
                key={q.id} 
                questionId={q.id} 
                title={q.title} 
                onAnswer={handleAnswer} 
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button 
              onClick={() => setShowResults(true)}
              disabled={Object.keys(answers).length === 0}
              className="bg-black text-white font-headline font-black text-2xl uppercase px-12 py-4 border-4 border-black hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-none transition-all"
            >
              Ver meu Match
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center bg-primary-container border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-3xl uppercase">Seus Melhores Matches</h2>
            <button 
              onClick={() => setShowResults(false)}
              className="bg-white border-2 border-black font-bold px-4 py-2 uppercase hover:bg-gray-100"
            >
              Refazer Quiz
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((pol) => (
              <div key={pol.idOrigem} className="bg-white border-4 border-black p-4 flex flex-col items-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-24 h-24 border-4 border-black bg-gray-200 rounded-full mb-4 overflow-hidden">
                  {pol.foto_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={pol.foto_url} alt={pol.nome_urna} className="w-full h-full object-cover object-top" />
                  ) : null}
                </div>
                <h3 className="font-headline font-black text-xl uppercase leading-tight mb-1">{pol.nome_urna}</h3>
                <p className="font-label font-bold text-sm uppercase opacity-70 mb-4">{pol.partido} - {pol.uf}</p>
                <div className="mt-auto w-full bg-secondary-fixed border-4 border-black py-2">
                  <span className="font-headline font-black text-2xl">{pol.score.toFixed(0)}%</span>
                  <span className="block text-xs font-bold uppercase">de afinidade</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
