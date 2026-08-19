'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Feedback tátil de navegação:
 *  - ao clicar num link/atalho interno, ativa `html.navigating`
 *    (cursor de espera, já definido no CSS global) + barra top + aviso.
 *  - encerra quando a rota muda (navegação concluída) ou após 2s
 *    (fallback) — o usuário nunca fica achando que travou.
 */
export function LoadingFeedback() {
  const pathname = usePathname();
  const [ativo, setAtivo] = useState(false);
  const pathRef = useRef(pathname);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function desativar() {
    setAtivo(false);
    document.documentElement.classList.remove('navigating');
  }

  function ativar() {
    setAtivo(true);
    document.documentElement.classList.add('navigating');
    if (timer.current) clearTimeout(timer.current);
    // fallback: se a rota não trocar (ex.: link âncora), some sozinho
    timer.current = setTimeout(() => desativar(), 2000);
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const alvo = (e.target as HTMLElement | null)?.closest?.('a[href], button, [role="button"]');
      if (!alvo) return;

      const href = alvo.getAttribute('href');
      if (href && href.startsWith('#')) return;
      if (href === 'javascript:void(0)' || href === '') return;

      const navegacaoExterna =
        alvo instanceof HTMLAnchorElement && href
          ? (() => {
              try {
                return new URL(alvo.href).origin !== window.location.origin;
              } catch {
                return false;
              }
            })()
          : false;
      if (navegacaoExterna) return;

      ativar();
    }

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rota mudou (navegação concluída) → encerra e sobe para o topo
  useEffect(() => {
    if (pathRef.current !== pathname) {
      desativar();
      pathRef.current = pathname;
      try {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } catch {
        window.scrollTo(0, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!ativo) return null;

  return (
    <>
      <div className="fixed top-0 inset-x-0 h-1.5 bg-[#ffd709] z-[300]" />
      <div className="fixed bottom-24 inset-x-0 flex justify-center z-[300] pointer-events-none">
        <span className="bg-black text-white font-headline font-black uppercase text-xs px-4 py-2 border-4 border-[#ffd709] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse">
          ⏳ Carregando...
        </span>
      </div>
    </>
  );
}
