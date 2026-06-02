import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { GUIDE_ARTICLES, getGuideBySlug } from '@/lib/guides';

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
      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <article className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Guias', href: '/guias' }, { label: article.title }]} />

          <header className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-label font-bold uppercase text-xs md:text-sm opacity-70 mb-3">
              Guia do eleitor • {article.readingTime} • Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR')}
            </p>
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase leading-tight mb-4">
              {article.title}
            </h1>
            <p className="font-body font-bold text-base md:text-xl uppercase opacity-80">
              {article.description}
            </p>
          </header>

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-8">
            <p className="text-lg leading-relaxed font-medium">{article.intro}</p>

            {article.sections.map((section) => (
              <section key={section.title} className="space-y-3 border-t-2 border-black pt-6">
                <h2 className="font-headline font-black text-2xl md:text-3xl uppercase">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </section>

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
