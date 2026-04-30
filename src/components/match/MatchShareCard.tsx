'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { useToast } from '@/components/Toast';
import type { PerfilPublico } from '@/lib/api';
import type { calculateNolanChart } from '@/lib/match/calculator';

function getNolanColors(label: string) {
  if (label.includes('Libertário')) return { bg: '#bfdbfe', border: '#2563eb', text: '#1e40af' };
  if (label.includes('Conservador')) return { bg: '#fecaca', border: '#dc2626', text: '#991b1b' };
  if (label.includes('Esquerda') || label.includes('Progressista')) return { bg: '#e9d5ff', border: '#9333ea', text: '#6b21a8' };
  if (label.includes('Estatista')) return { bg: '#fde68a', border: '#d97706', text: '#92400e' };
  return { bg: '#f3f4f6', border: '#6b7280', text: '#374151' };
}

function getInitials(nome: string) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('');
}

interface MatchShareCardProps {
  nolan: ReturnType<typeof calculateNolanChart>;
  topMatches: Array<PerfilPublico & { score: number }>;
}

export default function MatchShareCard({ nolan, topMatches }: MatchShareCardProps) {
  const { showToast } = useToast();
  const colors = getNolanColors(nolan.label);
  const top3 = topMatches.slice(0, 3);

  const handleShare = useCallback(async () => {
    const text = [
      `Meu Match Eleitoral — ${nolan.label}`,
      `Economia: ${nolan.econPercent.toFixed(0)}% | Social: ${nolan.personalPercent.toFixed(0)}%`,
      `Top: ${topMatches.slice(0, 3).map((p, i) => `${i + 1}. ${p.nome_urna} (${p.partido}) — ${p.score.toFixed(0)}%`).join(' | ')}`,
      `quemvotar.com.br/match`,
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Meu Match Eleitoral', text });
        showToast('Compartilhado!', 'success');
        return;
      }
      await navigator.clipboard.writeText(text);
      showToast('Copiado!', 'success');
    } catch { /* cancelado */ }
  }, [nolan, topMatches, showToast]);

  return (
    <div className="space-y-2.5 max-w-[300px]">
      {/* Card de preview */}
      <div className="border-3 border-black overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]">
        {/* Header */}
        <div className="bg-black text-white px-3 py-2 flex items-center gap-2">
          <Image src="/logo-header.png" alt="QV" width={22} height={22} className="w-5.5 h-5.5" unoptimized />
          <span className="font-headline font-black text-xs tracking-wider uppercase">QuemVotar</span>
        </div>

        {/* Body */}
        <div className="p-3 space-y-3">
          {/* Badge */}
          <div className="flex justify-center">
            <span
              className="inline-block border-2 border-black px-3 py-1 font-headline font-black text-sm uppercase tracking-wide"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {nolan.label}
            </span>
          </div>

          {/* Stats inline */}
          <div className="flex gap-2 text-center">
            <div className="flex-1 bg-gray-50 border-2 border-black py-1.5">
              <p className="font-label font-bold text-[9px] uppercase opacity-50">ECO</p>
              <p className="font-headline font-black text-lg leading-tight">{nolan.econPercent.toFixed(0)}%</p>
            </div>
            <div className="flex-1 bg-gray-50 border-2 border-black py-1.5">
              <p className="font-label font-bold text-[9px] uppercase opacity-50">SOC</p>
              <p className="font-headline font-black text-lg leading-tight">{nolan.personalPercent.toFixed(0)}%</p>
            </div>
          </div>

          {/* Top 3 */}
          <div className="space-y-1">
            {top3.map((pol, i) => (
              <div key={pol.idOrigem} className="flex items-center gap-1.5 text-left">
                <span className="font-headline font-black text-xs w-3 text-right">{i + 1}</span>
                <div className="w-6 h-6 border-2 border-black bg-gray-200 relative overflow-hidden shrink-0">
                  {pol.foto_url ? (
                    <Image src={pol.foto_url} alt={pol.nome_urna} fill sizes="24px" className="object-cover object-top" unoptimized />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center font-headline font-black text-[8px]">{getInitials(pol.nome_urna)}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-headline font-black text-[11px] uppercase leading-tight truncate">{pol.nome_urna}</p>
                  <p className="font-label text-[9px] uppercase opacity-50 leading-tight">{pol.partido}</p>
                </div>
                <span className="font-headline font-black text-xs shrink-0">{pol.score.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botão compartilhar */}
      <button
        onClick={handleShare}
        className="w-full bg-black text-white font-headline font-black text-sm uppercase py-2.5 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">share</span>
        Compartilhar
      </button>
    </div>
  );
}
