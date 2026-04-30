'use client';

import Image from 'next/image';
import { useCallback } from 'react';
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
  const { showToast } = useToast();
  const colors = getNolanColors(nolan.label);
  const top3 = topMatches.slice(0, 3);

  const handleShare = useCallback(async () => {
    const text = [
      `Meu Match Eleitoral no QuemVotar:`,
      ``,
      `${nolan.label}`,
      `Economia: ${nolan.econPercent.toFixed(0)}%`,
      `Social: ${nolan.personalPercent.toFixed(0)}%`,
      ``,
      `Top matches:`,
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
        showToast('Compartilhado!', 'success');
        return;
      }
      await navigator.clipboard.writeText(text);
      showToast('Copiado!', 'success');
    } catch {
      // usuario cancelou
    }
  }, [nolan, topMatches, showToast]);

  return (
    <button
      onClick={handleShare}
      className="bg-black text-white font-headline font-black text-sm uppercase px-4 py-2.5 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all flex items-center gap-1.5"
    >
      <span className="material-symbols-outlined text-base">share</span>
      Compartilhar
    </button>
  );
}