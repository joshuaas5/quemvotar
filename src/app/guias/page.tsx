import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getActiveGuides, GUIDE_CATEGORIES, getGuideCardStyle, getGuideCategory, getGuideReadingTime, getGuideWordCount } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Guias do Eleitor',
  description:
    'Guias práticos e permanentes para avaliar parlamentares, conferir fontes oficiais, ler votações e comparar mandatos.',
  alternates: { canonical: 'https://www.quemvotar.com.br/guias' },
};

export default function GuiasPage() {
  const featured = getActiveGuides()[0];
  const totalWords = getActiveGuides().reduce((total, article) => total + getGuideWordCount(article), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[#F7F2DE] py-10 md:py-16 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          <Breadcrumbs items={[{ label: 'Guias' }]} />

          <section className="relative border-4 border-black bg-[#111827] text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="absolute -right-16 -top-16 w-44 h-44 bg-[#FFD709] border-4 border-black rotate-12" />
            <div className="absolute right-16 bottom-8 w-24 h-24 bg-[#FF4D8D] border-4 border-black -rotate-12 hidden md:block" />
            <div className="absolute left-1/2 -bottom-12 w-36 h-36 bg-[#9BF6FF] border-4 border-black rotate-45 hidden lg:block" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-10 p-6 md:p-10 lg:p-12">
              <div>
                <p className="font-label font-black uppercase text-xs md:text-sm bg-[#FFD709] text-black border-2 border-black px-3 py-1 w-max mb-5">
                  Biblioteca editorial do QuemVotar
                </p>
                <h1 className="font-headline font-black text-4xl md:text-6xl lg:text-7xl uppercase leading-none mb-5">
                  Guias do Eleitor
                </h1>
                <p className="font-body font-bold text-base md:text-xl uppercase opacity-90 max-w-3xl leading-relaxed">
                  Conteúdo permanente para entender Congresso, fiscalizar políticos, conferir fontes e transformar dados públicos em decisão eleitoral melhor.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 content-end">
                <div className="bg-white text-black border-4 border-black p-4 shadow-[5px_5px_0px_0px_rgba(255,215,9,1)]">
                  <p className="font-headline font-black text-4xl">{getActiveGuides().length}</p>
                  <p className="font-label font-bold uppercase text-xs">guias publicados</p>
                </div>
                <div className="bg-[#9BF6FF] text-black border-4 border-black p-4 shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]">
                  <p className="font-headline font-black text-4xl">{GUIDE_CATEGORIES.length}</p>
                  <p className="font-label font-bold uppercase text-xs">trilhas de leitura</p>
                </div>
                <div className="bg-[#C8FF8C] text-black border-4 border-black p-4 shadow-[5px_5px_0px_0px_rgba(255,77,141,1)] col-span-2">
                  <p className="font-headline font-black text-4xl">{Math.round(totalWords / 1000)}k+</p>
                  <p className="font-label font-bold uppercase text-xs">palavras de conteúdo original e explicativo</p>
                </div>
              </div>
            </div>
          </section>

          {featured ? (
            <section className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-6 md:gap-8 items-stretch">
              <div className="bg-[#FF4D8D] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">
                <p className="font-label font-black uppercase text-xs mb-3">Comece por aqui</p>
                <h2 className="font-headline font-black text-3xl md:text-5xl uppercase leading-none">
                  O voto melhora quando a pergunta melhora.
                </h2>
              </div>
              <article className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <p className="font-label font-black uppercase text-xs bg-black text-white px-3 py-1 w-max mb-4">
                    Destaque • {getGuideReadingTime(featured)}
                  </p>
                  <h2 className="font-headline font-black text-3xl md:text-5xl uppercase leading-tight mb-4">
                    {featured.title}
                  </h2>
                  <p className="font-body font-medium text-lg leading-relaxed max-w-3xl">{featured.description}</p>
                </div>
                <Link href={`/guias/${featured.slug}`} className="mt-6 bg-black text-white border-4 border-black px-5 py-3 font-headline font-black uppercase w-max hover:bg-[#FFD709] hover:text-black transition-colors">
                  Ler guia em destaque
                </Link>
              </article>
            </section>
          ) : null}

          <section className="space-y-5">
            <div className="bg-black text-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="font-headline font-black text-3xl md:text-5xl uppercase leading-none">Trilhas de leitura</h2>
                <p className="font-body font-bold uppercase text-sm opacity-80 mt-2">
                  Escolha por objetivo: entender regras, checar dados, comparar mandatos ou decidir voto.
                </p>
              </div>
              <span className="bg-[#FFD709] text-black border-4 border-white px-4 py-2 font-headline font-black uppercase w-max">
                {GUIDE_CATEGORIES.length} trilhas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 md:gap-6">
            {GUIDE_CATEGORIES.map((category) => (
              <div key={category.id} className={`${category.colorClass} ${category.textClass} border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                <p className="font-headline font-black text-3xl uppercase leading-none mb-3">{category.label}</p>
                <p className="font-body font-bold text-sm leading-relaxed mb-4">{category.description}</p>
                <p className="font-label font-black uppercase text-xs border-t-2 border-black pt-3">
                  {category.slugs.filter((slug) => getActiveGuides().some((article) => article.slug === slug)).length} guias nessa trilha
                </p>
              </div>
            ))}
            </div>
          </section>

          <section className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="font-headline font-black text-3xl md:text-5xl uppercase leading-none">Todos os guias</h2>
                <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">
                  Leitura prática, fonte verificável e linguagem direta para decisão eleitoral.
                </p>
              </div>
              <Link href="/metodologia" className="font-headline font-black uppercase border-b-4 border-black w-max">
                Ver metodologia do site
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {getActiveGuides().map((article, index) => {
                const category = getGuideCategory(article);
                const cardStyle = getGuideCardStyle(index);

                return (
                  <article key={article.slug} className={`${cardStyle} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all flex flex-col overflow-hidden`}>
                    <div className="bg-white border-b-4 border-black p-4 flex items-center justify-between gap-4">
                      <span className="font-label font-black uppercase text-[11px] border-2 border-black px-2 py-1">
                        {category.label}
                      </span>
                      <span className="font-label font-black uppercase text-[11px]">
                        {getGuideReadingTime(article)}
                      </span>
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <p className="font-label font-bold uppercase text-xs opacity-70 mb-3">
                        {new Date(article.updatedAt).toLocaleDateString('pt-BR')} • {getGuideWordCount(article).toLocaleString('pt-BR')} palavras
                      </p>
                      <h3 className="font-headline font-black text-2xl md:text-3xl uppercase leading-tight mb-3">
                        {article.title}
                      </h3>
                      <p className="font-body font-medium leading-relaxed mb-6 flex-1">{article.description}</p>
                      <Link href={`/guias/${article.slug}`} className="bg-black text-white border-4 border-black px-4 py-2 font-headline font-black uppercase w-max hover:bg-white hover:text-black transition-colors">
                        Abrir guia
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
