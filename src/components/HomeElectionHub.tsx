import Link from 'next/link';

const OPTIONS = [
  { href: '/minha-urna', title: 'Montar minha colinha', description: 'Os números certos, na ordem da urna.', color: '#7CEBFF', icon: 'M8 3h8v4H8z M6 5H4v16h16V5h-2 M8 12l2 2 5-5 M8 18h8' },
  { href: '/candidatos', title: 'Conhecer os candidatos', description: 'Busque, compare e descubra seu Match.', color: '#FF91C5', icon: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21v-2a8 8 0 0 1 16 0v2' },
  { href: '/pesquisas', title: 'Acompanhar as pesquisas', description: 'Presidente, governo e Senado do seu estado.', color: '#FFD709', icon: 'M4 3v18h17 M8 17v-5 M13 17V8 M18 17V4' },
];

export default function HomeElectionHub() {
  return <section className="bg-[#FFFDF5] px-4 pb-6 pt-7 sm:px-6 sm:py-10" aria-labelledby="election-hub-title">
    <div className="mx-auto max-w-6xl">
      <p className="font-label text-[11px] font-black uppercase tracking-[.15em]">Eleições 2026 · grátis e sem cadastro</p>
      <h1 id="election-hub-title" className="mt-3 max-w-3xl font-headline text-[clamp(2.25rem,9vw,4.5rem)] font-black leading-[1.02] tracking-tight">Seu voto<br className="sm:hidden" /> começa aqui.</h1>
      <p className="mt-3 font-body text-sm font-semibold text-black/65 sm:text-lg">Escolha o que você precisa. É simples.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-5">
        {OPTIONS.map(option => <Link key={option.href} href={option.href} style={{ backgroundColor: option.color }} className="group flex min-w-0 items-center gap-3 rounded-2xl border-2 border-black p-3.5 shadow-[3px_3px_0_0_#000] transition hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black sm:flex-col sm:items-start sm:gap-5 sm:p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-white/65 sm:h-16 sm:w-16"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 sm:h-9 sm:w-9" aria-hidden="true"><path d={option.icon} /></svg></span>
          <span className="min-w-0 flex-1"><span className="block font-headline text-lg font-black leading-tight sm:text-2xl">{option.title}</span><span className="mt-1 block font-body text-xs font-medium leading-relaxed text-black/65 sm:mt-3 sm:text-sm">{option.description}</span></span>
          <span className="shrink-0 font-headline text-2xl font-black sm:self-end" aria-hidden="true">↗</span>
        </Link>)}
      </div>
    </div>
  </section>;
}
