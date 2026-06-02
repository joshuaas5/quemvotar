import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { GUIDE_ARTICLES } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Guias do Eleitor',
  description:
    'Guias práticos e permanentes para avaliar parlamentares, conferir fontes oficiais, ler votações e comparar mandatos.',
  alternates: { canonical: 'https://www.quemvotar.com.br/guias' },
};

export default function GuiasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Guias' }]} />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">
              Guias do Eleitor
            </h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80 max-w-4xl">
              Conteúdo editorial permanente para ajudar você a interpretar dados políticos, conferir fontes e comparar mandatos com mais contexto.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {GUIDE_ARTICLES.map((article) => (
              <article key={article.slug} className="bg-white border-4 border-black p-5 md:p-7 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col">
                <p className="font-label font-bold uppercase text-xs opacity-70 mb-3">
                  Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR')} • {article.readingTime}
                </p>
                <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-tight mb-3">
                  {article.title}
                </h2>
                <p className="font-body font-medium leading-relaxed mb-6 flex-1">{article.description}</p>
                <Link href={`/guias/${article.slug}`} className="font-headline font-black uppercase border-b-4 border-black w-max">
                  Ler guia
                </Link>
              </article>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
