'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import { PoliticoPicker } from '@/components/PoliticoPicker';
import { useToast } from '@/components/Toast';
import type { PerfilPublico } from '@/lib/api';
import { getPartyLogoBySigla } from '@/lib/party-logos';

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

interface CompararClientProps {
  parlamentares: PerfilPublico[];
}

export default function CompararClient({ parlamentares }: CompararClientProps) {
  const [a, setA] = useState<{ fonte: string; id: string } | null>(null);
  const [b, setB] = useState<{ fonte: string; id: string } | null>(null);
  const { showToast } = useToast();

  const handleCompare = useCallback(() => {
    if (!a || !b) {
      showToast('Selecione dois parlamentares para comparar.', 'error');
      return;
    }
    if (a.fonte === b.fonte && a.id === b.id) {
      showToast('Selecione dois parlamentares diferentes.', 'error');
      return;
    }
    window.location.href = `/comparar?a=${a.fonte}/${a.id}&b=${b.fonte}/${b.id}`;
  }, [a, b, showToast]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
        <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3">
          Comparar Parlamentares
        </h1>
        <p className="font-body font-bold text-base md:text-lg opacity-80 max-w-2xl mx-auto">
          Escolha dois parlamentares e compare lado a lado: notas, presença, gastos e alinhamento político.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PoliticoPicker
          parlamentares={parlamentares}
          onSelect={(fonte, id) => setA({ fonte, id })}
          selected={a}
          label="Primeiro parlamentar"
        />
        <PoliticoPicker
          parlamentares={parlamentares}
          onSelect={(fonte, id) => setB({ fonte, id })}
          selected={b}
          label="Segundo parlamentar"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleCompare}
          disabled={!a || !b}
          className="bg-black text-white font-headline font-black text-xl md:text-2xl uppercase px-10 py-5 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Comparar lado a lado →
        </button>
      </div>

      {(a || b) && (
        <div className="bg-white border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-headline font-black text-lg uppercase mb-3">Selecionados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectedPreview
              parlamentares={parlamentares}
              selected={a}
              label="Primeiro"
              onClear={() => setA(null)}
            />
            <SelectedPreview
              parlamentares={parlamentares}
              selected={b}
              label="Segundo"
              onClear={() => setB(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SelectedPreview({
  parlamentares,
  selected,
  label,
  onClear,
}: {
  parlamentares: PerfilPublico[];
  selected: { fonte: string; id: string } | null;
  label: string;
  onClear: () => void;
}) {
  const perfil = selected
    ? parlamentares.find((p) => p.fonte === selected.fonte && p.idOrigem === selected.id)
    : null;

  if (!perfil) {
    return (
      <div className="border-4 border-dashed border-black/30 p-4 text-center">
        <p className="font-label font-bold uppercase text-sm opacity-50">{label}: Nenhum selecionado</p>
      </div>
    );
  }

  const logo = getPartyLogoBySigla(perfil.partido);

  return (
    <div className="border-4 border-black p-3 flex items-center gap-3 bg-[#ffe066]">
      <div className="w-12 h-12 border-2 border-black bg-gray-200 shrink-0 relative overflow-hidden">
        {perfil.foto_url ? (
          <Image
            src={perfil.foto_url}
            alt={perfil.nome_urna}
            fill
            sizes="48px"
            className="object-cover object-top"
            unoptimized
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center font-headline font-black text-lg">
            {getInitials(perfil.nome_urna)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-headline font-black text-sm uppercase truncate">{perfil.nome_urna}</p>
        <p className="font-label font-bold text-[11px] uppercase opacity-70">
          {perfil.partido} • {perfil.uf}
        </p>
      </div>
      <button
        onClick={onClear}
        className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center hover:bg-red-100 transition-colors"
        aria-label="Remover selecao"
      >
        <Icon name="close" className="w-4 h-4" />
      </button>
    </div>
  );
}
