import Link from 'next/link';

const ITEMS = [
  {
    href: '/sobre',
    title: 'Por que o QuemVotar existe',
    description:
      'Organizamos dados públicos para ajudar o eleitor a conferir mandatos, partidos e fontes antes de formar opinião.',
  },
  {
    href: '/metodologia',
    title: 'Como os dados são tratados',
    description:
      'Explicamos de onde vêm notas, presença, votações e classificações aproximadas, incluindo limites de cada fonte.',
  },
  {
    href: '/politica-editorial',
    title: 'Como corrigimos informações',
    description:
      'Pedidos de correção são avaliados com base em fonte verificável e contexto, sem preencher lacunas com dados artificiais.',
  },
  {
    href: '/guias',
    title: 'Guias para decidir melhor',
    description:
      'Artigos permanentes explicam como ler votações, comparar parlamentares, conferir fontes e avaliar mandatos.',
  },
];

export default function EditorialGuide() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="font-headline font-black text-3xl sm:text-5xl uppercase tracking-tighter mb-3">
          Transparência antes da opinião
        </h2>
        <p className="font-body font-bold text-base sm:text-xl uppercase opacity-80 max-w-4xl">
          O QuemVotar não recomenda candidatos. A plataforma organiza dados oficiais, mostra caminhos de conferência e explica limitações para que cada pessoa faça a própria análise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
        {ITEMS.map((item) => (
          <article key={item.href} className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-headline font-black text-2xl md:text-3xl uppercase leading-tight mb-3">
              {item.title}
            </h3>
            <p className="font-body font-medium mb-5 leading-relaxed">{item.description}</p>
            <Link href={item.href} className="font-headline font-black uppercase border-b-4 border-black">
              Ler mais
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
