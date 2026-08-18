'use client';

import React, { useState } from 'react';
import { fotoProxiUrl } from '@/lib/candidatos/urls';
import { iniciais } from '@/lib/candidatos/ui';

/**
 * Foto oficial do candidato (proxy do TSE) com fallback automático:
 * se o TSE não tiver foto publicada, exibe as iniciais — sem quebrar.
 */
export function FotoCandidato({
  sqEleicao,
  id,
  uf,
  nome,
  className = '',
  iniciaisClassName = '',
}: {
  sqEleicao: number;
  id: number;
  uf: string;
  nome: string;
  className?: string;
  iniciaisClassName?: string;
}) {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-white ${iniciaisClassName || 'font-headline font-black text-6xl'}`}>
        {iniciais(nome)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fotoProxiUrl(sqEleicao, id, uf)}
      alt={`Foto oficial de ${nome}`}
      className={`w-full h-full object-cover object-top ${className}`}
      loading="lazy"
      onError={() => setFalhou(true)}
    />
  );
}
