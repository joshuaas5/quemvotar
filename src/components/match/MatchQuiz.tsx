import React, { useState } from 'react';
import type { UserAnswer } from '@/lib/match/calculator';

type MatchQuizProps = {
  questionId: string;
  title: string;
  description: string;
  currentAnswer?: UserAnswer;
  onAnswer: (questionId: string, answer: UserAnswer) => void;
};

const LIKERT_OPTIONS = [
  { score: 1, label: 'Discordo muito', color: 'bg-red-500 hover:bg-red-600' },
  { score: 2, label: 'Discordo um pouco', color: 'bg-red-300 hover:bg-red-400 text-black' },
  { score: 3, label: 'Neutro', color: 'bg-gray-300 hover:bg-gray-400 text-black' },
  { score: 4, label: 'Concordo um pouco', color: 'bg-blue-300 hover:bg-blue-400 text-black' },
  { score: 5, label: 'Concordo muito', color: 'bg-blue-600 hover:bg-blue-700 text-white' },
];

export function MatchQuiz({ questionId, title, description, currentAnswer, onAnswer }: MatchQuizProps) {
  const currentScore = currentAnswer?.score;
  const currentWeight = currentAnswer?.weight ?? 2;

  const handleScoreClick = (score: number) => {
    onAnswer(questionId, { score, weight: currentWeight });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentScore) {
      onAnswer(questionId, { score: currentScore, weight: Number(e.target.value) });
    }
  };

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
      <h3 className="font-headline font-black text-2xl uppercase mb-2 leading-tight">{title}</h3>
      <p className="font-body font-medium text-sm mb-6">{description}</p>

      <div className="flex flex-col gap-2 mb-6">
        {LIKERT_OPTIONS.map((opt) => (
          <button
            key={opt.score}
            onClick={() => handleScoreClick(opt.score)}
            className={`border-2 border-black px-4 py-2 font-headline font-bold uppercase transition-transform ${opt.color} ${currentScore === opt.score ? 'scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'opacity-80'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div
        className={`bg-surface-container p-4 border-2 border-black mt-auto transition-all duration-200 ${
          currentScore ? 'opacity-100' : 'opacity-40 pointer-events-none'
        }`}
      >
        <label className="block font-label font-bold uppercase text-xs mb-2">
          Qual a importância desse tema para você?
        </label>
        <select
          value={currentWeight}
          onChange={handleWeightChange}
          disabled={!currentScore}
          className="w-full border-2 border-black p-2 font-body font-bold disabled:opacity-50"
        >
          <option value={1}>Pouco importante</option>
          <option value={2}>Importante</option>
          <option value={3}>Muito importante</option>
        </select>
      </div>
    </div>
  );
}
