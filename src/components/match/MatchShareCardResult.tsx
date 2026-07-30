'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import Icon from '../Icon';
import { useToast } from '@/components/Toast';
import type { PerfilPublico } from '@/lib/api';
import type { calculateNolanChart } from '@/lib/match/calculator';

function getNolanColors(label: string) {
  if (label.includes('Libert\u00e1rio')) return { bg: '#bfdbfe', border: '#2563eb', text: '#1e40af' };
  if (label.includes('Conservador')) return { bg: '#fecaca', border: '#dc2626', text: '#991b1b' };
  if (label.includes('Esquerda') || label.includes('Progressista')) return { bg: '#e9d5ff', border: '#9333ea', text: '#6b21a8' };
  if (label.includes('Estatista')) return { bg: '#fde68a', border: '#d97706', text: '#92400e' };
  return { bg: '#f3f4f6', border: '#6b7280', text: '#374151' };
}

function getInitials(nome: string) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('');
}

interface MatchShareCardResultProps {
  nolan: ReturnType<typeof calculateNolanChart>;
  topMatches: Array<PerfilPublico & { score: number }>;
}

export default function MatchShareCardResult({ nolan, topMatches }: MatchShareCardResultProps) {
  const { showToast } = useToast();
  const colors = getNolanColors(nolan.label);
  const top3 = topMatches.slice(0, 3);

  const handleShare = useCallback(async () => {
    const text = [
      'Meu Match Eleitoral - ' + nolan.label,
      'Liberdade econ\u00f4mica: ' + nolan.econPercent.toFixed(0) + '% | Liberdade pessoal: ' + nolan.personalPercent.toFixed(0) + '%',
      'Mais afinidade: ' + top3.map((profile, index) => (
        (index + 1) + '. ' + profile.nome_urna + ' (' + profile.partido + ') - ' + profile.score.toFixed(0) + '%'
      )).join(' | '),
      'quemvotar.com.br/match',
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Meu Match Eleitoral', text });
        showToast('Compartilhado!', 'success');
        return;
      }

      await navigator.clipboard.writeText(text);
      showToast('Resultado copiado!', 'success');
    } catch {
      // O navegador pode cancelar o compartilhamento sem exigir uma mensagem.
    }
  }, [nolan, showToast, top3]);

  return (
    <section className="mx-auto w-full max-w-[620px]" aria-label="Cartao para compartilhar o resultado do Match Eleitoral">
      <div className="overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-black px-5 py-4 text-white sm:px-6 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src="/logo-header.png" alt="QuemVotar" width={32} height={32} className="h-8 w-8" unoptimized />
              <div>
                <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-white/65">Match Eleitoral</p>
                <p className="font-headline text-xl font-black uppercase leading-none sm:text-2xl">{'Seu cart\u00e3o de afinidade'}</p>
              </div>
            </div>
            <span className="border-2 border-white px-2 py-1 font-label text-[10px] font-bold uppercase tracking-wider">
              QuemVotar
            </span>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-7">
          <div className="text-center">
            <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-black/55">{'Seu perfil pol\u00edtico'}</p>
            <div
              className="mt-2 inline-block border-4 border-black px-4 py-2 font-headline text-xl font-black uppercase sm:text-2xl"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {nolan.label}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="border-3 border-black bg-[#f7f7f7] p-3 text-center sm:p-4">
              <p className="font-label text-[10px] font-bold uppercase tracking-wide text-black/55">{'Liberdade econ\u00f4mica'}</p>
              <p className="mt-1 font-headline text-3xl font-black leading-none sm:text-4xl">{nolan.econPercent.toFixed(0)}%</p>
            </div>
            <div className="border-3 border-black bg-[#f7f7f7] p-3 text-center sm:p-4">
              <p className="font-label text-[10px] font-bold uppercase tracking-wide text-black/55">{'Liberdade pessoal'}</p>
              <p className="mt-1 font-headline text-3xl font-black leading-none sm:text-4xl">{nolan.personalPercent.toFixed(0)}%</p>
            </div>
          </div>

          <div className="border-t-3 border-black pt-4">
            <p className="mb-3 font-label text-xs font-bold uppercase tracking-[0.12em] text-black/60">{'Os 3 perfis com maior afinidade'}</p>
            <div className="space-y-2.5">
              {top3.map((profile, index) => (
                <div key={profile.idOrigem} className="flex items-center gap-3 border-2 border-black bg-white p-2.5 sm:p-3">
                  <span className="w-6 text-center font-headline text-lg font-black sm:text-xl">{index + 1}</span>
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden border-2 border-black bg-gray-200 sm:h-12 sm:w-12">
                    {profile.foto_url ? (
                      <Image src={profile.foto_url} alt={profile.nome_urna} fill sizes="48px" className="object-cover object-top" unoptimized />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-headline text-xs font-black">
                        {getInitials(profile.nome_urna)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-headline text-base font-black uppercase leading-tight sm:text-lg">{profile.nome_urna}</p>
                    <p className="mt-0.5 font-label text-xs font-bold uppercase text-black/55">{profile.partido}</p>
                  </div>
                  <span className="font-headline text-2xl font-black leading-none sm:text-3xl">{profile.score.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          <p className="border-l-4 border-black bg-[#fff4b8] px-3 py-2 font-body text-sm font-bold leading-snug">
            {'Este cart\u00e3o resume suas respostas. A afinidade n\u00e3o \u00e9 recomenda\u00e7\u00e3o de voto.'}
          </p>
        </div>

        <div className="border-t-4 border-black bg-[#ffe066] px-5 py-3 sm:px-7">
          <p className="font-label text-xs font-bold uppercase tracking-wide">{'Compare ideias. Vote com informa\u00e7\u00e3o.'}</p>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 border-4 border-black bg-black px-5 py-4 font-headline text-base font-black uppercase text-white shadow-[5px_5px_0px_0px_rgba(255,224,102,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_rgba(255,224,102,1)] active:translate-x-0 active:translate-y-0 active:shadow-none sm:text-lg"
      >
        <Icon name="share" className="h-5 w-5" />
        {'Compartilhar meu resultado'}
      </button>
      <p className="mt-3 text-center font-label text-xs font-bold uppercase tracking-wide text-black/55">
        {'Compartilhe pelo celular ou copie o texto para publicar onde quiser.'}
      </p>
    </section>
  );
}
