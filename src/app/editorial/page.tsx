import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { EDITORIAL_ARTICLES } from '@/lib/editorial';
import { getAuthorBySlug } from '@/lib/authors';

export const metadata: Metadata = {
  title: 'Análises do Congresso',
  description:
    'Análises assinadas e revisadas sobre o funcionamento do Congresso Nacional, votações e o que observar em ano eleitoral.',
  alternates: { canonical: 'https://www.quemvotar.com.br/editorial' },
  robots: { index: true, follow: true },
};

export default function EditorialPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[#F7F2DE] py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Análises' }]} />

          <PageHero
            eyebrow="Seção editorial assinada"
            title="Análises do Congresso"
            description="Textos assinados, datados e revisados sobre o funcionamento do Congresso e o que observar em ano eleitoral."
            accent="pink"
            stat={{ value: String(EDITORIAL_ARTICLES.length), label: 'análises publicadas até agora.' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {EDITORIAL_ARTICLES.map((article) => {
              const author = getAuthorBySlug(article.author);
              return (
                <Link
                  key={article.slug}
                  href={`/editorial/${article.slug}`}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all block p-6 md:p-8"
                >
                  <p className="font-label font-black uppercase text-xs bg-black text-white px-3 py-1 w-max mb-4">
                    Análise • {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                  </p>
                  <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-tight mb-3">
                    {article.title}
                  </h2>
                  <p className="font-body font-medium leading-relaxed mb-4">{article.description}</p>
                  {author ? (
                    <p className="font-label font-bold uppercase text-xs opacity-70">
                      Por {author.name}
                    </p>
                  ) : null}
                </Link>
              );
            })}
          </div>

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body">
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-3">
              Como esta seção funciona
            </h2>
            <p className="leading-relaxed">
              As análises do QuemVotar são assinadas, revisadas e datadas. Elas explicam o processo
              legislativo e os registros públicos com base em fontes oficiais, sem recomendação de
              voto e sem vínculo com partidos, candidatos ou mandatos. Correções são tratadas pelo
              canal de contato.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
