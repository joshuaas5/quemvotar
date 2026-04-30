'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Global Error]', error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#f5f6f7] flex items-center justify-center p-4">
        <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full text-center">
          <Icon name="warning" className="w-16 h-16 sm:w-24 sm:h-24 mb-4 block" />
          <h1 className="font-headline font-black text-3xl sm:text-5xl uppercase mb-4">
            Algo deu errado
          </h1>
          <p className="font-body font-bold text-base sm:text-lg opacity-80 mb-6">
            Encontramos um problema inesperado. Nossa equipe foi notificada automaticamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="bg-black text-white font-headline font-black px-6 py-3 uppercase border-4 border-black hover:bg-white hover:text-black transition-colors"
            >
              Tentar novamente
            </button>
            <Link
              href="/"
              className="bg-white text-black font-headline font-black px-6 py-3 uppercase border-4 border-black hover:bg-black hover:text-white transition-colors"
            >
              Voltar ao inicio
            </Link>
          </div>
          {error.digest && (
            <p className="mt-6 font-mono text-xs opacity-50">Ref: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  );
}
