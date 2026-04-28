'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigation } from './NavigationProvider';

export default function NavigationOverlay() {
  const { isNavigating, endNavigation } = useNavigation();
  const pathname = usePathname();

  // Detecta mudanca de rota e desliga o loading
  useEffect(() => {
    endNavigation();
  }, [pathname, endNavigation]);

  // Fallback: desliga sozinho apos 6s
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        endNavigation();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isNavigating, endNavigation]);

  if (!isNavigating) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-[2px] flex items-center justify-center animate-fade-in">
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4 animate-fade-in-up">
        <span className="material-symbols-outlined text-5xl animate-spin">progress_activity</span>
        <p className="font-headline font-black text-xl uppercase">Carregando...</p>
      </div>
    </div>
  );
}
