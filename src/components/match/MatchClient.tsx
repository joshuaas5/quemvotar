'use client';

import React, { useState, useMemo } from 'react';
import { MatchQuiz } from './MatchQuiz';
import { calculateMatchScoreDetailed, calculateNolanChart, type UserAnswersMap } from '@/lib/match/calculator';
import type { PerfilPublico } from '@/lib/api';

type Question = {
  id: string;
  title: string;
  description: string;
};

const QUESTIONS: Question[] = [
  {
    id: 'pvt',
    title: 'Privatizações',
    description: 'Empresas estatais (Correios, Petrobras) devem ser privatizadas para melhorar a eficiência da economia e remover corrupção.',
  },
  {
    id: 'agr',
    title: 'Agronegócio',
    description: 'O agronegócio e a produção de alimentos devem ter mais liberdade para se expandir, mesmo que avance sobre áreas de preservação ambiental informais.',
  },
  {
    id: 'impostos',
    title: 'Taxação de Fortunas',
    description: 'O governo deve aumentar os impostos sobre grandes fortunas e grandes lucros para financiar mais programas de bem social e redução de desigualdade.',
  },
  {
    id: 'drogas',
    title: 'Drogas',
    description: 'A legalização e regulamentação da maconha seria uma medida mais eficaz para combater o tráfico e a violência do que a proibição.',
  },
  {
    id: 'armas',
    title: 'Posse de Armas',
    description: 'O acesso à posse e ao porte de armas de fogo pelo cidadão comum sem antecedentes criminais deve ser facilitado para defesa pessoal.',
  },
  {
    id: 'quotas',
    title: 'Cotas',
    description: 'Reservas de vagas (cotas raciais e sociais) em universidades e concursos públicos são políticas fundamentais para reduzir desigualdades.',
  },
  {
    id: 'abor',
    title: 'Aborto',
    description: 'A decisão sobre a interrupção da gravidez (aborto) nas primeiras semanas deve pertencer somente à mulher, de forma descriminalizada e legalizada.',
  },
  {
    id: 'religiao',
    title: 'Religião no Estado',
    description: 'Valores cristãos e da família tradicional devem ser a principal base para as diretrizes morais de leis e do ensino público.',
  },
  {
    id: 'clt',
    title: 'Leis Trabalhistas',
    description: 'Leis de proteção ao emprego (nos moldes da CLT) precisam ser mais flexibilizadas, permitindo negociação direta entre empregador e empregado.',
  },
  {
    id: 'meio_amb',
    title: 'Meio Ambiente',
    description: 'Proteger o meio ambiente e preservar florestas deve ser prioridade máxima do Estado, ainda que signifique perder poder de crescimento econômico na região.',
  }
];

export function MatchClient({ 
  parlamentares, 
  rankings 
}: { 
  parlamentares: PerfilPublico[],
  rankings: Record<string, number> 
}) {
  const [answers, setAnswers] = useState<UserAnswersMap>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, answer: { score: number; weight: number }) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const results = useMemo(() => {
    if (!showResults) return { scored: [], nolan: null };

    const nolan = calculateNolanChart(answers);

    const scored = parlamentares.map(pol => {
      const score = calculateMatchScoreDetailed(answers, pol.idOrigem || pol.nome_urna, pol.partido || '');
      const rankingNota = rankings[pol.nome_urna] ?? null;
      return { ...pol, score, rankingNota };
    });

    return { 
      scored: scored.sort((a, b) => b.score - a.score).slice(0, 12),
      nolan
    };
  }, [answers, parlamentares, showResults, rankings]);

  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);

  return (
    <div className="max-w-6xl mx-auto w-full">
      {!showResults ? (
        <div className="space-y-8">
          <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-4xl uppercase mb-2">Descubra seu Match</h1>
            <p className="font-body font-bold opacity-80 max-w-2xl mx-auto">
              Sua opinião importa. Analisaremos sua visão de mundo em economia, sociedade, costumes e meio ambiente para cruzar com a inclinação e histórico de cada parlamentar.
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
            {QUESTIONS.map(q => (
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

          <div className="flex justify-center mt-12 bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center">
              <p className="font-label font-bold uppercase tracking-widest text-sm mb-4 opacity-70">
                Responda todas para o melhor resultado
              </p>
              <button 
                onClick={() => setShowResults(true)}
                disabled={Object.keys(answers).length < 3}
                className="bg-black text-white font-headline font-black text-3xl uppercase px-16 py-6 border-4 border-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-none transition-all"
              >
                Cruzar Dados e Ver Resultados!
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 bg-primary-container border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div>
              <h2 className="font-headline font-black text-4xl uppercase leading-none">Resultado do Cruzamento</h2>
              <p className="font-body font-bold mt-2 opacity-80 max-w-xl">Encontramos os parlamentares que possuem o perfil mais alinhado com base em espectro partidário e análise de inclinações em votações teóricas.</p>
            </div>
            
            <button 
              onClick={() => setShowResults(false)}
              className="bg-white border-4 border-black font-headline font-black px-6 py-4 uppercase text-lg hover:bg-gray-100 whitespace-nowrap"
            >
              Afinar Respostas
            </button>
          </div>

          {results.nolan && (
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-headline font-black text-3xl uppercase mb-4 text-primary-fixed">O Seu Espectro</h3>
                <p className="font-body font-bold text-lg mb-2">Seu posicionamento, calculado no Diagrama de Nolan pelas suas respostas, sugere o eixo: <strong className="bg-[#ffc6ff] border-2 border-black px-2">{results.nolan.label}</strong>.</p>
                <ul className="space-y-2 mt-4 font-body font-medium">
                  <li><strong>Liberdade Econômica:</strong> {results.nolan.econPercent.toFixed(0)}%</li>
                  <li><strong>Liberdade Pessoal:</strong> {results.nolan.personalPercent.toFixed(0)}%</li>
                </ul>
              </div>
              <div className="relative w-full aspect-square max-w-[300px] mx-auto border-4 border-black bg-gray-100 rotate-45 transform origin-center overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="bg-blue-200"></div>
                  <div className="bg-red-200"></div>
                  <div className="bg-yellow-200"></div>
                  <div className="bg-purple-200"></div>
                </div>
                <div 
                  className="absolute w-4 h-4 bg-black rounded-full shadow-[0_0_0_4px_white] z-10 transition-all duration-1000"
                  style={{
                    bottom: `${results.nolan.econPercent}%`,
                    left: `${results.nolan.personalPercent}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                />
                
                <span className="absolute top-2 left-2 -rotate-45 text-[10px] font-bold uppercase">Esquerda</span>
                <span className="absolute bottom-2 right-2 -rotate-45 text-[10px] font-bold uppercase">Direita</span>
                <span className="absolute top-2 right-2 -rotate-45 text-[10px] font-bold uppercase">Libertário</span>
                <span className="absolute bottom-2 left-2 -rotate-45 text-[10px] font-bold uppercase">Estatista</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.scored.map((pol) => (
              <div key={pol.idOrigem} className="bg-white border-4 border-black p-6 flex flex-col items-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
                {pol.rankingNota !== null && (
                   <div className="absolute top-[-10px] right-[-10px] bg-[#ffe066] border-4 border-black px-3 py-1 font-headline font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
                     Nota {pol.rankingNota.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                   </div>
                )}
                
                <div className="w-32 h-32 border-4 border-black bg-gray-200 rounded-full mb-4 overflow-hidden relative">
                  {pol.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pol.foto_url} alt={pol.nome_urna} className="w-full h-full object-cover object-top" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="https://fakeimg.pl/640x640?text=Sem+Foto" alt="Sem Foto" className="w-full h-full object-cover object-top" />
                  )}
                </div>
                <h3 className="font-headline font-black text-2xl uppercase leading-tight mb-2">{pol.nome_urna}</h3>
                <p className="font-label font-bold text-sm uppercase opacity-70 mb-4 bg-gray-100 px-3 py-1 border-2 border-black">{pol.partido} - {pol.uf}</p>
                <div className="mt-auto w-full bg-secondary-fixed border-4 border-black py-4">
                  <span className="font-headline font-black text-4xl">{pol.score.toFixed(1)}%</span>
                  <span className="block text-sm font-bold uppercase mt-1 opacity-90">De Afinidade Total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
