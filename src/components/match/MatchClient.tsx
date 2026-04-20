'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  const [selectedUf, setSelectedUf] = useState<string>('');

  const handleAnswer = (questionId: string, answer: { score: number; weight: number }) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const ufs = useMemo(() => Array.from(new Set(parlamentares.map(p => p.uf).filter(Boolean))).sort(), [parlamentares]);

  const results = useMemo(() => {
    if (!showResults) return { scored: [], nolan: null };

    const nolan = calculateNolanChart(answers);

    const scored = parlamentares
      .filter(pol => selectedUf ? pol.uf === selectedUf : true)
      .map(pol => {
        const score = calculateMatchScoreDetailed(answers, pol.idOrigem || pol.nome_urna, pol.partido || '');
        const rankingNota = rankings[pol.nome_urna] ?? null;
        return { ...pol, score, rankingNota };
      });

    return { 
      scored: scored.sort((a, b) => b.score - a.score).slice(0, 12),
      nolan
    };
  }, [answers, parlamentares, showResults, rankings, selectedUf]);

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
            
            <div className="flex items-center gap-4">
              <select 
                value={selectedUf} 
                onChange={e => setSelectedUf(e.target.value)} 
                className="bg-white border-4 border-black font-headline font-black px-4 py-4 uppercase text-lg cursor-pointer max-w-[200px]"
              >
                <option value="">Brasil Inteiro (Sem Filtro)</option>
                {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </select>
              <button 
                onClick={() => setShowResults(false)}
                className="bg-white border-4 border-black font-headline font-black px-6 py-4 uppercase text-lg hover:bg-gray-100 whitespace-nowrap"
              >
                Afinar Respostas
              </button>
            </div>
          </div>

          {results.nolan && (
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t-[12px]">
              <div className="space-y-4">
                <p className="font-label font-bold uppercase tracking-widest text-xs opacity-60">Sua Análise de Identidade</p>
                <h3 className="font-headline font-black text-4xl uppercase leading-none">
                  Você é <span className="bg-primary-fixed border-2 border-black px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{results.nolan.label}</span>
                </h3>
                <p className="font-body font-bold text-xl leading-relaxed">
                  {results.nolan.description}
                </p>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="border-4 border-black p-4 bg-gray-50">
                     <p className="font-label font-bold uppercase text-[10px] opacity-60">Liberdade Econômica</p>
                     <p className="font-headline font-black text-3xl">{results.nolan.econPercent.toFixed(0)}%</p>
                  </div>
                  <div className="border-4 border-black p-4 bg-gray-50">
                     <p className="font-label font-bold uppercase text-[10px] opacity-60">Liberdade Pessoal</p>
                     <p className="font-headline font-black text-3xl">{results.nolan.personalPercent.toFixed(0)}%</p>
                  </div>
                </div>
              </div>
              <div className="relative w-full aspect-square max-w-[340px] mx-auto flex items-center justify-center">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 border-2 border-dashed border-black/10 rounded-full" />
                  
                  <div className="relative w-[70%] h-[70%] border-4 border-black bg-gray-100 rotate-45 origin-center overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,.1)]">
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                      <div className="bg-[#b3d4ff] hover:brightness-95 transition-all"></div>
                      <div className="bg-[#ffb3b3] hover:brightness-95 transition-all"></div>
                      <div className="bg-[#e6ccff] hover:brightness-95 transition-all"></div>
                      <div className="bg-[#ffe6b3] hover:brightness-95 transition-all"></div>
                    </div>
                    <div 
                      className="absolute w-[8%] h-[8%] bg-black rounded-full shadow-[0_0_0_4px_white] z-20 transition-all duration-1000 ease-out animate-pulse"
                      style={{
                        bottom: `calc(${results.nolan.econPercent}% - 4%)`,
                        left: `calc(${results.nolan.personalPercent}% - 4%)`
                      }}
                    />
                  </div>
                  
                  <span className="absolute top-[0px] left-1/2 -translate-x-1/2 font-headline font-black uppercase text-[10px] bg-white border-2 border-black px-2 py-1 z-30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Libertário</span>
                  <span className="absolute bottom-[0px] left-1/2 -translate-x-1/2 font-headline font-black uppercase text-[10px] bg-white border-2 border-black px-2 py-1 z-30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Estatista</span>
                  <span className="absolute left-[0px] top-1/2 -translate-y-1/2 font-headline font-black uppercase text-[10px] bg-white border-2 border-black px-2 py-1 z-30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Esquerda</span>
                  <span className="absolute right-[0px] top-1/2 -translate-y-1/2 font-headline font-black uppercase text-[10px] bg-white border-2 border-black px-2 py-1 z-30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Direita</span>
                </div>
              </div>
          )}

          <div className="pt-6">
            <h3 className="font-headline font-black text-3xl uppercase mb-6 flex items-center gap-3">
              🎯 Parlamentares mais próximos de você
              {selectedUf && <span className="text-sm bg-black text-white px-3 py-1">Filtrado por: {selectedUf}</span>}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.scored.map((pol, idx) => (
                <Link 
                  href={`/perfil/${pol.fonte}/${pol.idOrigem}`} 
                  key={pol.idOrigem} 
                  className={`bg-white border-4 border-black p-6 flex flex-col items-center text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer relative group ${idx === 0 ? 'border-primary-fixed border-t-[12px]' : ''}`}
                >
                  {idx === 0 && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 font-headline font-black uppercase text-xs tracking-tighter">
                      Sua melhor opção
                    </div>
                  )}

                  {pol.rankingNota !== null && (
                     <div className="absolute top-[-10px] right-[-10px] bg-[#ffe066] border-4 border-black px-3 py-1 font-headline font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                       {pol.rankingNota.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                     </div>
                  )}
                  
                  <div className="w-32 h-32 border-4 border-black bg-gray-200 rounded-full mb-4 overflow-hidden relative group-hover:scale-105 transition-transform">
                    {pol.foto_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={pol.foto_url} alt={pol.nome_urna} className="w-full h-full object-cover object-top" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="https://fakeimg.pl/640x640?text=Sem+Foto" alt="Sem Foto" className="w-full h-full object-cover object-top" />
                    )}
                  </div>
                  
                  <h3 className="font-headline font-black text-2xl uppercase leading-tight mb-2 group-hover:underline">{pol.nome_urna}</h3>
                  <p className="font-label font-bold text-xs uppercase opacity-70 mb-4 bg-gray-100 px-3 py-1 border-2 border-black">{pol.partido} - {pol.uf}</p>
                  
                  <div className="mt-auto w-full bg-surface-container border-4 border-black py-4 group-hover:bg-primary-container transition-colors relative overflow-hidden">
                    <div 
                       className="absolute left-0 top-0 bottom-0 bg-primary-fixed/20 transition-all duration-1000"
                       style={{ width: `${pol.score}%` }}
                    />
                    <div className="relative z-10">
                      <span className="font-headline font-black text-4xl">{pol.score.toFixed(1)}%</span>
                      <span className="block text-[10px] font-black uppercase mt-1 opacity-70 tracking-tighter">Afinidade Ideológica</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-b-4 border-black font-headline font-black uppercase text-xs w-max tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                    Visualizar ficha completa →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



