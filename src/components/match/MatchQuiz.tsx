import React from 'react';
import type { UserAnswer } from '@/lib/match/calculator';

type MatchQuizProps = {
  questionId: string;
  title: string;
  description: string;
  accentColor: string;
  currentAnswer?: UserAnswer;
  onAnswer: (questionId: string, answer: UserAnswer) => void;
};

const LIKERT_OPTIONS = [
  { score: 1, label: 'Discordo muito', bg: 'bg-[#ff6b6b]', hover: 'hover:bg-[#ff5252]', text: 'text-white' },
  { score: 2, label: 'Discordo', bg: 'bg-[#ffa8a8]', hover: 'hover:bg-[#ff8e8e]', text: 'text-black' },
  { score: 3, label: 'Neutro', bg: 'bg-[#e5e5e5]', hover: 'hover:bg-[#d4d4d4]', text: 'text-black' },
  { score: 4, label: 'Concordo', bg: 'bg-[#8ecae6]', hover: 'hover:bg-[#7ab8d4]', text: 'text-black' },
  { score: 5, label: 'Concordo muito', bg: 'bg-[#219ebc]', hover: 'hover:bg-[#1a8aa8]', text: 'text-white' },
];

export function MatchQuiz({ questionId, title, description, accentColor, currentAnswer, onAnswer }: MatchQuizProps) {
  const currentScore = currentAnswer?.score;
  const currentWeight = currentAnswer?.weight ?? 2;

  const handleScoreClick = (score: number) => {
    onAnswer(questionId, { score, weight: currentWeight });
  };

  const handleWeightClick = (weight: number) => {
    if (currentScore) {
      onAnswer(questionId, { score: currentScore, weight });
    }
  };

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
      {/* Header colorido brutalista */}
      <div className="border-b-4 border-black p-5 sm:p-6" style={{ backgroundColor: accentColor }}>
        <h3 className="font-headline font-black text-2xl sm:text-3xl uppercase leading-tight text-black">
          {title}
        </h3>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-6">
        <p className="font-body font-bold text-base sm:text-lg leading-relaxed text-black/80">
          {description}
        </p>

        {/* Likert horizontal */}
        <div className="flex flex-col gap-3">
          <span className="font-label font-bold uppercase text-xs tracking-wider text-black/60">
            Qual a sua posição?
          </span>
          <div className="flex gap-1 sm:gap-2">
            {LIKERT_OPTIONS.map((opt) => {
              const isSelected = currentScore === opt.score;
              return (
                <button
                  key={opt.score}
                  onClick={() => handleScoreClick(opt.score)}
                  className={`
                    flex-1 min-h-[60px] sm:min-h-[72px] border-2 sm:border-4 border-black
                    font-headline font-bold text-xs sm:text-sm uppercase
                    transition-all duration-100 active:scale-95 cursor-pointer
                    flex flex-col items-center justify-center gap-1
                    ${opt.bg} ${opt.hover} ${opt.text}
                    ${isSelected ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px] ring-2 ring-black ring-offset-2' : 'opacity-80 hover:opacity-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
                  `}
                >
                  <span className="hidden sm:inline">{opt.label}</span>
                  <span className="sm:hidden text-lg leading-none">
                    {opt.score === 1 && '👎'}
                    {opt.score === 2 && '↙️'}
                    {opt.score === 3 && '•'}
                    {opt.score === 4 && '↗️'}
                    {opt.score === 5 && '👍'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Peso de importância - quadrados clicáveis */}
        <div className={`transition-all duration-300 ${currentScore ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <span className="font-label font-bold uppercase text-xs tracking-wider text-black/60 block mb-2">
            Quão importante é esse tema para você?
          </span>
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((w) => {
              const isActive = currentWeight >= w;
              return (
                <button
                  key={w}
                  onClick={() => handleWeightClick(w)}
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 border-4 border-black font-headline font-black text-lg
                    transition-all duration-100 active:scale-90 cursor-pointer
                    ${isActive ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]' : 'bg-white text-black hover:bg-gray-100'}
                  `}
                  title={w === 1 ? 'Pouco importante' : w === 2 ? 'Importante' : 'Muito importante'}
                >
                  {w}
                </button>
              );
            })}
            <span className="font-label font-bold uppercase text-xs ml-2 text-black/70">
              {currentWeight === 1 && 'Pouco importante'}
              {currentWeight === 2 && 'Importante'}
              {currentWeight === 3 && 'Muito importante'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
