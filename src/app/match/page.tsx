'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mocks para estruturar a tela. Integrar com o BD depois.
const BOTOES = [
  { id: 'sim', label: 'Concordo', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed', hover: 'hover:bg-on-secondary-fixed hover:text-white' },
  { id: 'nao', label: 'Discordo', bg: 'bg-tertiary', text: 'text-white', hover: 'hover:bg-white hover:text-tertiary' },
  { id: 'pular', label: 'Pular Pauta', bg: 'bg-white', text: 'text-black', hover: 'hover:bg-black hover:text-white' }
];

export default function MatchPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 10;
  
  const handleAnswer = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      alert("Integração do resultado do Match será feita na Fase 3!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-surface-container flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Fundo Decorativo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-black opacity-5 pointer-events-none select-none font-headline tracking-tighter">
          MATCH
        </div>

        <div className="w-full max-w-3xl z-10">
          
          {/* Header do Card (Progresso) */}
          <div className="mb-8 flex items-center justify-between font-headline font-black uppercase text-xl">
            <span>PAUTA {step} DE {totalSteps}</span>
            <span className="text-tertiary">{totalSteps - step} RESTANTES</span>
          </div>

          {/* Barra de Progresso */}
          <div className="w-full h-4 border-2 border-black bg-white mb-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div 
              className="h-full bg-primary-container border-r-2 border-black transition-all duration-300 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>

          {/* Cartão de Pergunta Principal */}
          <div className="bg-white border-4 border-black p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-12">
            <span className="material-symbols-outlined text-5xl mb-6 text-tertiary">gavel</span>
            <h1 className="font-headline font-black text-4xl md:text-6xl uppercase leading-none mb-6">
              A favor da privatização do saneamento básico?
            </h1>
            <p className="font-body font-medium text-lg max-w-xl mx-auto opacity-80">
              Esta pauta foi votada recentemente no congresso e divide opiniões sobre gestão de recursos hídricos.
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOTOES.map((btn) => (
              <button 
                key={btn.id}
                onClick={handleAnswer}
                className={`${btn.bg} ${btn.text} border-4 border-black font-headline font-black uppercase text-2xl py-6 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${btn.hover} cursor-pointer`}
              >
                {btn.label}
              </button>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
