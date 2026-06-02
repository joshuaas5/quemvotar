import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { GUIDE_ARTICLES, getGuideBySlug, getGuideCardStyle, getGuideCategory, getGuideWordCount } from '@/lib/guides';

export function generateStaticParams() {
  return GUIDE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideBySlug(slug);

  if (!article) {
    return {
      title: 'Guia não encontrado | QuemVotar',
      description: 'Não foi possível localizar este guia editorial.',
    };
  }

  const canonical = `https://www.quemvotar.com.br/guias/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function GuiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getGuideBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = getGuideCategory(article);
  const currentIndex = GUIDE_ARTICLES.findIndex((item) => item.slug === article.slug);
  const accent = getGuideCardStyle(Math.max(0, currentIndex));
  const related = GUIDE_ARTICLES
    .filter((item) => item.slug !== article.slug && category.slugs.includes(item.slug))
    .slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    dateModified: article.updatedAt,
    datePublished: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'QuemVotar',
      url: 'https://www.quemvotar.com.br/sobre',
    },
    publisher: {
      '@type': 'Organization',
      name: 'QuemVotar',
      url: 'https://www.quemvotar.com.br',
    },
    mainEntityOfPage: `https://www.quemvotar.com.br/guias/${article.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="flex-grow bg-[#F7F2DE] py-10 md:py-16 px-4 md:px-6 overflow-hidden">
        <article className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Guias', href: '/guias' }, { label: article.title }]} />

          <header className="relative border-4 border-black bg-[#111827] text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className={`absolute -right-12 -top-12 w-40 h-40 ${accent} border-4 border-black rotate-12`} />
            <div className="absolute right-16 bottom-8 w-20 h-20 bg-[#FF4D8D] border-4 border-black -rotate-12 hidden md:block" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 md:gap-10 p-6 md:p-10 lg:p-12">
              <div>
                <p className={`${category.colorClass} ${category.textClass} font-label font-black uppercase text-xs md:text-sm border-2 border-black px-3 py-1 w-max mb-5`}>
                  {category.label}
                </p>
                <h1 className="font-headline font-black text-4xl md:text-6xl lg:text-7xl uppercase leading-none mb-5 max-w-5xl">
                  {article.title}
                </h1>
                <p className="font-body font-bold text-base md:text-xl uppercase opacity-90 leading-relaxed max-w-4xl">
                  {article.description}
                </p>
              </div>

              <aside className="bg-white text-black border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(255,215,9,1)] h-max">
                <p className="font-headline font-black text-3xl uppercase mb-4">Dados do guia</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 border-black p-3 bg-[#FFD709]">
                    <p className="font-headline font-black text-2xl">{article.readingTime}</p>
                    <p className="font-label font-bold uppercase text-[10px]">leitura</p>
                  </div>
                  <div className="border-2 border-black p-3 bg-[#9BF6FF]">
                    <p className="font-headline font-black text-2xl">{article.sections.length}</p>
                    <p className="font-label font-bold uppercase text-[10px]">capítulos</p>
                  </div>
                  <div className="border-2 border-black p-3 bg-[#C8FF8C] col-span-2">
                    <p className="font-headline font-black text-2xl">{getGuideWordCount(article).toLocaleString('pt-BR')}</p>
                    <p className="font-label font-bold uppercase text-[10px]">palavras aproximadas</p>
                  </div>
                </div>
                <p className="font-label font-bold uppercase text-xs mt-4 opacity-70">
                  Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR')}
                </p>
              </aside>
            </div>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 md:gap-8 items-start">
            <aside className="lg:sticky lg:top-28 bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-headline font-black text-2xl uppercase mb-4">Neste guia</h2>
              <nav className="space-y-3">
                {article.sections.map((section, index) => (
                  <a key={section.title} href={`#secao-${index + 1}`} className="block font-label font-black uppercase text-xs border-b-2 border-black pb-2 hover:text-[#BB0100]">
                    {index + 1}. {section.title}
                  </a>
                ))}
              </nav>
              <Link href="/guias" className="mt-6 inline-block bg-black text-white border-4 border-black px-4 py-2 font-headline font-black uppercase hover:bg-[#FFD709] hover:text-black transition-colors">
                Todos os guias
              </Link>
            </aside>

            <div className="space-y-6 md:space-y-8">
              <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body">
                <p className="text-xl md:text-2xl leading-relaxed font-bold">{article.intro}</p>
              </section>

              {article.sections.map((section, index) => (
                <section key={section.title} id={`secao-${index + 1}`} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden scroll-mt-28">
                  <div className={`${getGuideCardStyle(index)} border-b-4 border-black p-4 md:p-5 flex items-center gap-4`}>
                    <span className="bg-black text-white border-2 border-black w-10 h-10 flex items-center justify-center font-headline font-black text-xl shrink-0">
                      {index + 1}
                    </span>
                    <h2 className="font-headline font-black text-2xl md:text-4xl uppercase leading-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="p-6 md:p-10 font-body space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="leading-relaxed text-base md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          {related.length > 0 ? (
            <section className="space-y-5">
              <h2 className="font-headline font-black text-3xl md:text-5xl uppercase leading-none">Continue nessa trilha</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {related.map((item, index) => (
                  <Link key={item.slug} href={`/guias/${item.slug}`} className={`${getGuideCardStyle(index + 2)} border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all block`}>
                    <p className="font-label font-black uppercase text-xs mb-3">Relacionado • {item.readingTime}</p>
                    <h3 className="font-headline font-black text-2xl uppercase leading-tight mb-3">{item.title}</h3>
                    <p className="font-body font-bold text-sm leading-relaxed">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <footer className="bg-primary-container border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-3">
              Continue a pesquisa
            </h2>
            <p className="font-body font-bold mb-5">
              Depois de entender o método, compare dados concretos nos perfis, partidos e páginas estaduais do QuemVotar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/parlamentares" className="font-headline font-black uppercase border-b-4 border-black">
                Explorar parlamentares
              </Link>
              <Link href="/metodologia" className="font-headline font-black uppercase border-b-4 border-black">
                Ver metodologia
              </Link>
              <Link href="/guias" className="font-headline font-black uppercase border-b-4 border-black">
                Todos os guias
              </Link>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
}
