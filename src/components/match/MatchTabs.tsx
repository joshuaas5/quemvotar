import Link from 'next/link';

/**
 * Abas do Match Eleitoral — une o Match de parlamentares (votações
 * reais) e o Match de Candidatos 2026 (posicionamento).
 */
export function MatchTabs({ ativo }: { ativo: 'parlamentares' | 'candidatos' }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/match"
        className={`border-4 border-black px-5 py-3 font-headline font-black uppercase text-sm ${
          ativo === 'parlamentares' ? 'bg-black text-white' : 'bg-white hover:bg-surface-container-high'
        }`}
      >
        🏛️ Parlamentares em exercício
      </Link>
      <Link
        href="/match/candidatos"
        className={`border-4 border-black px-5 py-3 font-headline font-black uppercase text-sm ${
          ativo === 'candidatos' ? 'bg-black text-white' : 'bg-white hover:bg-surface-container-high'
        }`}
      >
        🗳️ Candidatos 2026
      </Link>
    </div>
  );
}
