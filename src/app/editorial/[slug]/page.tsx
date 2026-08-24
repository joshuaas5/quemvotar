import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { EDITORIAL_ARTICLES, getEditorialBySlug } from '@/lib/editorial';
import { getAuthorBySlug } from '@/lib/authors';
import { SITE } from '@/lib/site-config';
import { AdLeaderboard, AdRectangle300x250, AdNative } from '@/components/ads/Adsterra';

export function generateStaticParams() {
  return EDITORIAL_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getEditorialBySlug(slug);

  if (!article) {
    return {
      title: 'Análise não encontrada | QuemVotar',
      description: 'Não foi possível localizar esta análise.',
      robots: { index: false, follow: true },
    };
  }

  const canonical = `https://www.quemvotar.com.br/editorial/${article.slug}`;
  const author = getAuthorBySlug(article.author);

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
    robots: { index: true, follow: true },
    authors: author ? [{ url: `https://www.quemvotar.com.br/autores/${author.slug}` }] : undefined,
  };
}

export default async function EditorialArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getEditorialBySlug(slug);

  if (!article) {
    notFound();
  }

  const author = getAuthorBySlug(article.author);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    isAccessibleForFree: true,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          url: `https://www.quemvotar.com.br/autores/${author.slug}`,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE.publisherName || SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon.png`,
    },
    mainEntityOfPage: `https://www.quemvotar.com.br/editorial/${article.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="flex-grow bg-[#F7F2DE] py-10 md:py-16 px-4 md:px-6 overflow-hidden">
        <article className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Análises', href: '/editorial' }, { label: article.title }]} />

          <AdLeaderboard />

          <header className="relative border-4 border-black bg-[#111827] text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden p-6 md:p-10 lg:p-12">
            <p className="font-label font-black uppercase text-xs md:text-sm bg-[#FF4D8D] text-black border-2 border-black px-3 py-1 w-max mb-5">
              Análise do QuemVotar
            </p>
            <h1 className="font-headline font-black text-3xl md:text-5xl lg:text-6xl uppercase leading-none mb-5">
              {article.title}
            </h1>
            <p className="font-body font-bold text-base md:text-xl uppercase opacity-90 leading-relaxed">
              {article.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-body">
              {author ? (
                <Link href={`/autores/${author.slug}`} className="font-bold underline">
                  Por {author.name}
                </Link>
              ) : null}
              <span className="opacity-80">
                Publicado em {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
              </span>
              {article.updatedAt !== article.publishedAt ? (
                <span className="opacity-80">
                  Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR')}
                </span>
              ) : null}
            </div>
          </header>

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body">
            <p className="text-xl md:text-2xl leading-relaxed font-bold">{article.intro}</p>
          </section>

          {article.sections.map((section, index) => (
            <section
              key={section.title}
              className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="bg-[#FFD709] border-b-4 border-black p-4 md:p-5 flex items-center gap-4">
                <span className="bg-black text-white border-2 border-black w-10 h-10 flex items-center justify-center font-headline font-black text-xl shrink-0">
                  {index + 1}
                </span>
                <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-tight">
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

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-4">Fontes para conferir</h2>
            <div className="space-y-3">
              {article.sources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-headline font-black uppercase border-b-4 border-black w-max max-w-full truncate"
                >
                  {source.label}
                </a>
              ))}
            </div>
            <p className="mt-6 font-body text-sm leading-relaxed">
              Este texto foi revisado pela equipe editorial do QuemVotar e não representa
              recomendação de voto nem posição de partido, candidato ou órgão público.
            </p>
          </section>

          <div className="space-y-6">
            <div className="border-4 border-dashed border-black p-4 text-center">
              <AdRectangle300x250 />
            </div>
            <div className="border-4 border-dashed border-black p-4 text-center">
              <AdNative />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
