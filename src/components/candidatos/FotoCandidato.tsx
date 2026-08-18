'use client';

import React, { useState } from 'react';
import { fotoProxiUrl } from '@/lib/candidatos/urls';
import { iniciais } from '@/lib/candidatos/ui';

/**
 * Foto do candidato com fallback em cascata:
 *   1. fotoAlta (Câmara/Senado em alta resolução, quando disponível)
 *   2. proxy da foto oficial do TSE
 *   3. iniciais do nome
 * Nunca quebra a página se a foto não existir.
 */
export function FotoCandidato({
  sqEleicao,
  id,
  uf,
  nome,
  fotoAlta = null,
  className = '',
  iniciaisClassName = '',
}: {
  sqEleicao: number;
  id: number;
  uf: string;
  nome: string;
  fotoAlta?: string | null;
  className?: string;
  iniciaisClassName?: string;
}) {
  const [usarAlta, setUsarAlta] = useState(Boolean(fotoAlta));
  const [usarTse, setUsarTse] = useState(!fotoAlta);

  // Sem nenhuma fonte utilizável → iniciais
  if (!usarAlta && !usarTse) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-white ${
          iniciaisClassName || 'font-headline font-black text-6xl'
        }`}
      >
        {iniciais(nome)}
      </div>
    );
  }

  const src = usarAlta && fotoAlta ? fotoAlta : fotoProxiUrl(sqEleicao, id, uf);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Foto oficial de ${nome}`}
      className={`w-full h-full object-cover object-top ${className}`}
      loading="lazy"
      onError={() => {
        // Foto em alta falhou → tenta a foto do TSE
        if (usarAlta) {
          setUsarAlta(false);
          setUsarTse(true);
        } else {
          // Foto do TSE falhou → iniciais
          setUsarTse(false);
        }
      }}
    />
  );
}
