import React from 'react';
import type { UserAnswer } from '@/lib/match/calculator';

type MatchQuizProps = {
  questionId: string;
  title: string;
  onAnswer: (questionId: string, answer: UserAnswer) => void;
};

export function MatchQuiz({ questionId, title, onAnswer }: MatchQuizProps) {
  // Vamos usar peso 1 por default para simplificar o MVP
  const handleClick = (vote: string) => {
    onAnswer(questionId, { vote, weight: 1 });
  };

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="font-headline font-black text-2xl mb-4">{title}</h3>
      <div className="flex gap-4">
        <button 
          onClick={() => handleClick('SIM')}
          className="bg-primary-container text-black font-bold border-2 border-black px-4 py-2 hover:bg-primary-fixed"
        >
          SIM
        </button>
        <button 
          onClick={() => handleClick('NAO')}
          className="bg-secondary-container text-black font-bold border-2 border-black px-4 py-2 hover:bg-secondary-fixed"
        >
          NÃO
        </button>
      </div>
    </div>
  );
}
