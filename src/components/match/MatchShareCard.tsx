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
        showToast('Compartilhado com sucesso!', 'success');
        return;
      }
      await navigator.clipboard.writeText(text);
      showToast('Resultado copiado! Cole onde quiser.', 'success');
    } catch {
      // Usuário cancelou
    }
  }, [nolan, topMatches, showToast]);

  return (
    <div className="space-y-3">
      {/* Card visual compacto e harmonico */}
      <div
        className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        style={{ backgroundColor: colors.bg }}
      >
        {/* Header */}
        <div className="border-b-4 border-black p-3 sm:p-4 flex items-center gap-2.5 bg-white">
          <Image src="/logo-header.png" alt="QuemVotar" width={32} height={32} className="w-8 h-8" unoptimized />
          <span className="font-headline font-black text-base sm:text-lg uppercase">QuemVotar</span>
        </div>

        {/* Body - mais compacto */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Label do quadrante */}
          <div className="text-center">
            <p className="font-label font-bold uppercase text-[10px] opacity-60 mb-1">Meu eixo ideologico</p>
            <div
              className="inline-block border-4 border-black px-3 py-1.5 font-headline font-black text-base sm:text-lg uppercase"
              style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.accent }}
            >
              {nolan.label}
            </div>
          </div>

          {/* Stats lado a lado compactos */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white border-4 border-black p-2 text-center">
              <p className="font-label font-bold uppercase text-[9px] opacity-60">Economia</p>
              <p className="font-headline font-black text-xl">{nolan.econPercent.toFixed(0)}%</p>
            </div>
            <div className="bg-white border-4 border-black p-2 text-center">
              <p className="font-label font-bold uppercase text-[9px] opacity-60">Social</p>
              <p className="font-headline font-black text-xl">{nolan.personalPercent.toFixed(0)}%</p>
            </div>
          </div>

          {/* Top Matches - mais compactos */}
          <div className="space-y-1.5">
            <p className="font-label font-bold uppercase text-[10px] opacity-60 text-center">Mais alinhados</p>
            {top3.map((pol, i) => (
              <div key={pol.idOrigem} className="bg-white border-4 border-black p-2 flex items-center gap-2">
                <div className="w-7 h-7 bg-black text-white font-headline font-black text-xs flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <div className="w-8 h-8 border-2 border-black bg-gray-200 shrink-0 relative overflow-hidden">
                  {pol.foto_url ? (
                    <Image src={pol.foto_url} alt={pol.nome_urna} fill sizes="32px" className="object-cover object-top" unoptimized />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center font-headline font-black text-[10px]">{getInitials(pol.nome_urna)}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-headline font-black text-xs uppercase truncate">{pol.nome_urna}</p>
                  <p className="font-label font-bold text-[9px] uppercase opacity-60">{pol.partido} • {pol.uf}</p>
                </div>
                <div className="font-headline font-black text-base">{pol.score.toFixed(1)}%</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center pt-1 border-t-4 border-black/10">
            <p className="font-label font-bold uppercase text-[9px] opacity-50">quemvotar.com.br/match</p>
          </div>
        </div>
      </div>

      {/* Botão de compartilhar */}
      <button
        onClick={handleShare}
        className="w-full bg-black text-white font-headline font-black text-base uppercase px-5 py-3 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-xl">share</span>
        Compartilhar
      </button>
    </div>
  );
}
