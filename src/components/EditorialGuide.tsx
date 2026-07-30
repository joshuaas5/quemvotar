import Link from 'next/link';

const ITEMS = [
  {
    href: '/guias',
    title: 'Entenda sem juridiqu\u00eas',
    description: 'Guias r\u00e1pidos para entender votos, partidos e promessas sem precisar ser especialista.',
    className: 'bg-[#FFD709]',
  },
  {
    href: '/comparar',
    title: 'Compare dois pol\u00edticos',
    description: 'Coloque dois nomes lado a lado e veja o que est\u00e1 dispon\u00edvel sobre cada um.',
    className: 'bg-[#9BF6FF]',
  },
  {
    href: '/metodologia',
    title: 'De onde v\u00eam os dados',
    description: 'Mostramos as fontes para voc\u00ea conferir quando quiser.',
    className: 'bg-[#FFB3D9]',
  },
  {
    href: '/contact',
    title: 'Viu algo errado?',
    description: 'Avise a gente. Uma corre\u00e7\u00e3o com fonte ajuda todo mundo a votar melhor.',
    className: 'bg-[#C8FF8C]',
  },
];

export default function EditorialGuide() {
  return (
    <section className="qv-grid-bg px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
        <div className="relative overflow-hidden border-4 border-black qv-dark-panel p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:p-10">
          <div className="absolute -right-10 -top-10 h-32 w-32 rotate-12 border-4 border-black bg-[#FFD709]" />
          <div className="relative">
            <p className="mb-4 inline-block border-2 border-black bg-[#9BF6FF] px-3 py-1 font-label text-xs font-black uppercase text-black">
              {'Sem enrola\u00e7\u00e3o'}
            </p>
            <h2 className="max-w-4xl font-headline text-3xl font-black uppercase tracking-tighter sm:text-5xl md:text-6xl">
              {'Voc\u00ea decide. A gente ajuda a conferir.'}
            </h2>
            <p className="mt-4 max-w-4xl font-body text-base font-semibold leading-relaxed sm:text-xl">
              {'Aqui voc\u00ea encontra o que cada pol\u00edtico fez, votou e gastou — com caminhos para conferir por conta pr\u00f3pria.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 md:gap-8">
          {ITEMS.map((item) => (
            <article key={item.href} className={item.className + ' qv-lift-card border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-6'}>
              <h3 className="mb-3 font-headline text-2xl font-black uppercase leading-tight md:text-3xl">
                {item.title}
              </h3>
              <p className="mb-5 font-body leading-relaxed">{item.description}</p>
              <Link href={item.href} className="font-headline font-black uppercase underline decoration-4 underline-offset-4">
                {'Abrir'}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
