'use client';

import React, { useState } from 'react';
import { fotoProxiUrl, fotoUrlCandidato } from '@/lib/candidatos/urls';
import { iniciais } from '@/lib/candidatos/ui';

/**
 * Foto do candidato com fallback em cascata:
 *   1. fotoAlta (Câmara/Senado em alta resolução, quando disponível)
 *   2. proxy da foto oficial do TSE
 *   3. foto oficial diretamente do TSE, se o proxy estiver indisponível
 *   4. iniciais do nome
 * Nunca quebra a página se a foto não existir.
 */
interface FotoCandidatoProps {
  sqEleicao: number;
  id: number;
  uf: string;
  nome: string;
  fotoAlta?: string | null;
  className?: string;
  iniciaisClassName?: string;
}

export function FotoCandidato(props: FotoCandidatoProps) {
  // A troca de candidato deve reiniciar a cascata, mesmo quando React reutiliza
  // a mesma posição da lista depois de uma busca ou alteração dos filtros.
  return <FotoComFallback key={`${props.sqEleicao}:${props.id}:${props.uf}:${props.fotoAlta ?? ''}`} {...props} />;
}

function FotoComFallback({
  sqEleicao,
  id,
  uf,
  nome,
  fotoAlta = null,
  className = '',
  iniciaisClassName = '',
}: FotoCandidatoProps) {
  const sources = [...new Set([
    fotoAlta,
    fotoProxiUrl(sqEleicao, id, uf),
    fotoUrlCandidato(sqEleicao, id, uf),
  ].filter((source): source is string => Boolean(source)))];
  const [sourceIndex, setSourceIndex] = useState(0);

  // Sem nenhuma fonte utilizável → iniciais
  if (sourceIndex >= sources.length) {
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

  const src = sources[sourceIndex];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Foto oficial de ${nome}`}
      className={`w-full h-full object-cover object-top ${className}`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setSourceIndex((current) => current + 1)}
    />
  );
}
