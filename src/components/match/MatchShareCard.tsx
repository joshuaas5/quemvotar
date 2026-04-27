'use client';

import Image from 'next/image';
import { useRef, useCallback } from 'react';
import { useToast } from '@/components/Toast';
import type { PerfilPublico } from '@/lib/api';
import type { calculateNolanChart } from '@/lib/match/calculator';

function getNolanColors(label: string) {
  if (label.includes('Libertário')) return { bg: '#bfdbfe', accent: '#2563eb', text: '#1e40af' };
  if (label.includes('Conservador')) return { bg: '#fecaca', accent: '#dc2626', text: '#991b1b' };
  if (label.includes('Esquerda') || label.includes('Progressista')) return { bg: '#e9d5ff', accent: '#9333ea', text: '#6b21a8' };
  if (label.includes('Estatista')) return { bg: '#fde68a', accent: '#d97706', text: '#92400e' };
  return { bg: '#f3f4f6', accent: '#6b7280', text: '#374151' };
}

function getInitials(nome: string) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('');
}

interface MatchShareCardProps {
  nolan: ReturnType<typeof calculateNolanChart>;
  topMatches: Array<PerfilPublico & { score: number }>;
}

export default function MatchShareCard({ nolan, topMatches }: MatchShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const colors = getNolanColors(nolan.label);

  const handleShare = useCallback(async () => {
    const text = [
      `🗳️ Meu Match Eleitoral no QuemVotar:`,
      ``,
      `📍 ${nolan.label}`,
      `💰 Liberdade Econômica: ${nolan.econPercent.toFixed(0)}%`,
      `🕊️ Liberdade Pessoal: ${nolan.personalPercent.toFixed(0)}%`,
      ``,
      `🏆 Top matches:`,
      ...topMatches.slice(0, 3).map((p, i) => `${i + 1}. ${p.nome_urna} (${p.partido}) — ${p.score.toFixed(1)}%`),
      ``,
      `Descubra o seu: https://quemvotar.com.br/match`,
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Meu Match Eleitoral — ${nolan.label}`,
          text,
          url: 'https://quemvotar.com.br/match',
        });
        showToast('Compartilhado com sucesso!', 'success');
        return;
      }

      await navigator.clipboard.writeText(text);
      showToast('Resultado copiado! Cole onde quiser.', 'success');
    } catch {
      // Usuário cancelou ou não deu permissão
    }
  }, [nolan, topMatches, showToast]);

  const top3 = topMatches.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Card visual para screenshot */}
      <div
        ref={cardRef}
        className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        style={{ backgroundColor: colors.bg }}
      >
        {/* Header */}
        <div className="border-b-4 border-black p-4 sm:p-5 flex items-center gap-3 bg-white">
          <Image src="/logo-header.png" alt="QuemVotar" width={40} height={40} className="w-9 h-9" unoptimized />
          <span className="font-headline font-black text-lg sm:text-xl uppercase">QuemVotar</span>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Quadrante */}
          <div className="text-center">
            <p className="font-label font-bold uppercase text-xs opacity-70 mb-1">Meu eixo ideológico</p>
            <div
              className="inline-block border-4 border-black px-4 py-2 font-headline font-black text-xl sm:text-2xl uppercase"
              style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.accent }}
            >
              {nolan.label}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border-4 border-black p-3 text-center">
              <p className="font-label font-bold uppercase text-[10px] opacity-70">Liberdade Econômica</p>
              <p className="font-headline font-black text-2xl">{nolan.econPercent.toFixed(0)}%</p>
            </div>
            <div className="bg-white border-4 border-black p-3 text-center">
              <p className="font-label font-bold uppercase text-[10px] opacity-70">Liberdade Pessoal</p>
              <p className="font-headline font-black text-2xl">{nolan.personalPercent.toFixed(0)}%</p>
            </div>
          </div>

          {/* Top Matches */}
          <div className="space-y-2">
            <p className="font-label font-bold uppercase text-xs opacity-70 text-center">Parlamentares mais alinhados</p>
            <div className="space-y-2">
              {top3.map((pol, i) => (
                <div key={pol.idOrigem} className="bg-white border-4 border-black p-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-black text-white font-headline font-black text-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <div className="w-9 h-9 border-2 border-black bg-gray-200 shrink-0 relative overflow-hidden">
                    {pol.foto_url ? (
                      <Image src={pol.foto_url} alt={pol.nome_urna} fill sizes="36px" className="object-cover object-top" unoptimized />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center font-headline font-black text-xs">{getInitials(pol.nome_urna)}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-headline font-black text-sm uppercase truncate">{pol.nome_urna}</p>
                    <p className="font-label font-bold text-[10px] uppercase opacity-70">{pol.partido} • {pol.uf}</p>
                  </div>
                  <div className="font-headline font-black text-lg">{pol.score.toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-2 border-t-4 border-black/10">
            <p className="font-label font-bold uppercase text-[10px] opacity-60">
              quemvotar.com.br/match
            </p>
          </div>
        </div>
      </div>

      {/* Botão de compartilhar */}
      <button
        onClick={handleShare}
        className="w-full bg-black text-white font-headline font-black text-lg uppercase px-6 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">share</span>
        Compartilhar resultado
      </button>
    </div>
  );
}
