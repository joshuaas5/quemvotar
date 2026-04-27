'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PerfilPublico } from '@/lib/api';

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

interface PoliticoPickerProps {
  parlamentares: PerfilPublico[];
  onSelect: (fonte: string, id: string) => void;
  selected?: { fonte: string; id: string } | null;
  label: string;
}

export function PoliticoPicker({ parlamentares, onSelect, selected, label }: PoliticoPickerProps) {
  const [q, setQ] = useState('');

  const filtrados = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return parlamentares.slice(0, 12);
    return parlamentares.filter((p) =>
      [p.nome_urna, p.partido, p.uf ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query)
    ).slice(0, 12);
  }, [parlamentares, q]);

  const isSelected = (p: PerfilPublico) =>
    selected && selected.fonte === p.fonte && selected.id === p.idOrigem;

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div className="border-b-4 border-black p-4 bg-primary-container">
        <h3 className="font-headline font-black text-xl uppercase">{label}</h3>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome, partido ou UF..."
          className="w-full mt-2 border-4 border-black px-3 py-2 font-headline font-bold uppercase text-sm"
        />
      </div>
      <div className="max-h-[320px] overflow-y-auto p-2 space-y-1">
        {filtrados.map((perfil) => (
          <button
            key={`${perfil.fonte}-${perfil.idOrigem}`}
            onClick={() => onSelect(perfil.fonte, perfil.idOrigem || '')}
            className={`w-full flex items-center gap-3 p-2 border-2 border-black text-left transition-all cursor-pointer ${
              isSelected(perfil)
                ? 'bg-[#ffe066] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="w-10 h-10 border-2 border-black bg-gray-200 shrink-0 relative overflow-hidden">
              {perfil.foto_url ? (
                <Image
                  src={perfil.foto_url}
                  alt={perfil.nome_urna}
                  fill
                  sizes="40px"
                  className="object-cover object-top"
                  unoptimized
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center font-headline font-black text-sm">
                  {getInitials(perfil.nome_urna)}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-headline font-black text-sm uppercase truncate">
                {perfil.nome_urna}
              </p>
              <p className="font-label font-bold text-[11px] uppercase opacity-70">
                {perfil.partido} • {perfil.uf}
              </p>
            </div>
          </button>
        ))}
        {filtrados.length === 0 && (
          <p className="p-4 text-center font-body font-bold opacity-60 text-sm">
            Nenhum resultado para &quot;{q}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
