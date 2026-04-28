'use client';

import { useEffect } from 'react';
import { useNavigation } from './NavigationProvider';

export default function NavigationOverlay() {
  const { isNavigating, endNavigation } = useNavigation();

  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        endNavigation();
      }, 8000); // Fallback: max 8s loading
      return () => clearTimeout(timer);
    }
  }, [isNavigating, endNavigation]);

  // Quando a pagina monta, desliga o loading
  useEffect(() => {
    endNavigation();
  }, [endNavigation]);

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
