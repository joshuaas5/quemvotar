'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function LoadingLink({ href, children, className = '', target, rel }: LoadingLinkProps) {
  const [isPending, startTransition] = useTransition();
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (target === '_blank') return; // Não mostra loading para links externos
    setClicked(true);
    startTransition(() => {
      // A navegação acontece naturalmente pelo Link
    });
  };

  const showOverlay = isPending || clicked;

  return (
    <Link
      href={href}
      className={`relative block ${className}`}
      onClick={handleClick}
      target={target}
      rel={rel}
    >
      {children}
      {showOverlay && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 animate-fade-in">
          <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="material-symbols-outlined text-3xl animate-spin">progress_activity</span>
          </div>
        </div>
      )}
    </Link>
  );
}
