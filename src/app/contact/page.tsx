import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com o QuemVotar para correções, dúvidas sobre fontes públicas, parcerias e sugestões editoriais.',
  alternates: { canonical: 'https://www.quemvotar.com.br/contact' },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Contato' }]} />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">
              Contato
            </h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
              Fale com o QuemVotar sobre correções, fontes públicas, parcerias e sugestões.
            </p>
          </section>

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8 font-body">
            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">
                Canal principal
              </h2>
              <p className="leading-relaxed">
                Para falar com a equipe, envie uma mensagem para{' '}
                <a href="mailto:contato@quemvotar.com.br" className="font-bold underline">
                  contato@quemvotar.com.br
                </a>
                . Use esse canal para informar erros de dados, sugerir melhorias no site, tratar de parcerias ou pedir esclarecimentos sobre as fontes usadas.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">
                Correções de dados
              </h2>
              <p className="leading-relaxed">
                O QuemVotar consolida informações públicas da Câmara dos Deputados, do Senado Federal, do TSE, do CNJ e de bases externas indicadas nas páginas. Quando uma informação parecer incorreta, envie a URL da página, o trecho questionado e, se possível, o link da fonte oficial atualizada.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">
                Responsabilidade editorial
              </h2>
              <p className="leading-relaxed">
                A plataforma é independente e não representa partido, candidato, mandato parlamentar ou órgão público. Nosso compromisso é deixar claro de onde cada informação veio e facilitar a conferência por qualquer cidadão.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
