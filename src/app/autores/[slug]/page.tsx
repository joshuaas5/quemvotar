import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AUTHORS, getAuthorBySlug } from '@/lib/authors';
import { getActiveGuides } from '@/lib/guides';
import { EDITORIAL_ARTICLES } from '@/lib/editorial';

export function generateStaticParams() {
  return AUTHORS.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: 'Autor não encontrado | QuemVotar',
      description: 'Não foi possível localizar este autor.',
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `${author.name} | QuemVotar`,
    description: `Perfil de ${author.name}, ${author.role} no QuemVotar.`,
    alternates: { canonical: `https://www.quemvotar.com.br/autores/${author.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const guides = getActiveGuides().filter((guide) => guide.author === author.slug);
  const editorials = EDITORIAL_ARTICLES.filter((article) => article.author === author.slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Autores' }, { label: author.name }]} />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body">
            <p className="font-label font-black uppercase text-xs bg-black text-white px-3 py-1 w-max mb-5">
              {author.role}
            </p>
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase leading-none mb-4">
              {author.name}
            </h1>
            <p className="font-label font-bold uppercase text-xs opacity-70 mb-6">{author.cityUf}</p>
            <p className="font-bold leading-relaxed mb-6">{author.credential}</p>
            {author.bio.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-base md:text-lg mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {guides.length > 0 ? (
            <section className="space-y-4">
              <h2 className="font-headline font-black text-2xl md:text-3xl uppercase">Guias deste autor</h2>
              <div className="space-y-4">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guias/${guide.slug}`}
                    className="block bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all"
                  >
                    <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                      {new Date(guide.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                    <h3 className="font-headline font-black text-xl md:text-2xl uppercase leading-tight">
                      {guide.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {editorials.length > 0 ? (
            <section className="space-y-4">
              <h2 className="font-headline font-black text-2xl md:text-3xl uppercase">Análises deste autor</h2>
              <div className="space-y-4">
                {editorials.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/editorial/${article.slug}`}
                    className="block bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all"
                  >
                    <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                      {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                    </p>
                    <h3 className="font-headline font-black text-xl md:text-2xl uppercase leading-tight">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body">
            <p className="leading-relaxed">
              Correções e questionamentos sobre o conteúdo assinado podem ser enviados pelo{' '}
              <Link href="/contact" className="font-bold underline">canal de contato</Link>, com a URL da
              página e o trecho questionado.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
