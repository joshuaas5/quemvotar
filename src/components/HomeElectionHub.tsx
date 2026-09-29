import Link from 'next/link';

const ENTRY_POINTS = [
  { href: '/minha-urna', title: 'Montar colinha', action: 'Minha cola', color: '#9BF6FF', eyebrow: 'Prepare seu voto', description: 'Guarde os números na ordem da urna. Baixe ou imprima sua cola eleitoral.' },
  { href: '/candidatos', title: 'Candidatos e Match', action: 'Ver candidatos', color: '#FF4D8D', eyebrow: 'Descubra e compare', description: 'Conheça os candidatos e descubra sua afinidade com 10 perguntas.' },
  { href: '/pesquisas', title: 'Pesquisas eleitorais', action: 'Ver pesquisas', color: '#FFD709', eyebrow: 'Acompanhe a corrida', description: 'Presidente, governo e Senado. Compare levantamentos e fontes por estado.' },
];

/** Three equal entry points remain immediately visible together on mobile. */
export default function HomeElectionHub() {
  return <section className="qv-grid-bg px-4 py-6 sm:px-6 sm:py-8" aria-labelledby="election-hub-title">
    <div className="mx-auto max-w-6xl">
      <p className="font-label text-xs font-black uppercase">Eleições 2026 · grátis e sem cadastro</p>
      <h1 id="election-hub-title" className="mt-2 font-headline text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl">Seu voto. A corrida. Tudo aqui.</h1>
      <p className="mt-3 font-body text-sm font-semibold sm:text-base">Por onde você quer começar?</p>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-5">
        {ENTRY_POINTS.map(entry => <Link key={entry.href} href={entry.href} style={{ backgroundColor: entry.color }} className="flex min-w-0 flex-col justify-between border-4 border-black p-2 text-black shadow-[3px_3px_0_0_#000] transition hover:-translate-y-1 sm:p-5 sm:shadow-[4px_4px_0_0_#000]">
          <div><p className="hidden font-label text-xs font-black uppercase sm:block">{entry.eyebrow}</p><h2 className="font-headline text-base font-black uppercase leading-tight sm:mt-2 sm:text-3xl">{entry.title}</h2><p className="mt-3 hidden font-body text-sm font-semibold leading-relaxed sm:block">{entry.description}</p></div>
          <span className="mt-4 flex min-h-14 items-center justify-between gap-1 border-2 border-black bg-white px-1.5 py-2 font-headline text-[10px] font-black uppercase leading-tight sm:mt-5 sm:px-3 sm:py-3 sm:text-base">{entry.action}<span aria-hidden="true">→</span></span>
        </Link>)}
      </div>
    </div>
  </section>;
}
