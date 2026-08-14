import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { SITE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com a equipe do QuemVotar para correções, dúvidas sobre fontes públicas, parcerias e sugestões editoriais.',
  alternates: { canonical: 'https://www.quemvotar.com.br/contact' },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Contato' }]} />

          <PageHero
            eyebrow="Canal aberto"
            title="Contato"
            description="Fale com a equipe do QuemVotar sobre correções, fontes públicas, parcerias e sugestões."
            accent="orange"
            stat={{ value: 'Correção', label: 'Envie URL, trecho questionado e fonte oficial atualizada.' }}
          />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8 font-body">
            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">
                Canal principal
              </h2>
              <p className="leading-relaxed">
                Para falar com a equipe, envie uma mensagem para{' '}
                <a href={`mailto:${SITE.contactEmail}`} className="font-bold underline">
                  {SITE.contactEmail}
                </a>
                . Use esse canal para informar erros de dados, sugerir melhorias no site, tratar de
                parcerias ou pedir esclarecimentos sobre as fontes usadas. Mensagens sobre correções
                são respondidas com a análise do trecho apontado.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">
                Correções de dados
              </h2>
              <p className="leading-relaxed">
                O QuemVotar consolida informações públicas da Câmara dos Deputados, do Senado
                Federal, do TSE, do CNJ e de bases externas indicadas nas páginas. Quando uma
                informação parecer incorreta, envie a URL da página, o trecho questionado e, se
                possível, o link da fonte oficial atualizada. O pedido é registrado e respondido com
                o resultado da verificação.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">
                Quem responde
              </h2>
              <p className="leading-relaxed">
                O canal é atendido pela equipe editorial do QuemVotar, projeto publicado pela{' '}
                {SITE.publisherName}. A identidade da publicação e os responsáveis estão na página{' '}
                <a href="/sobre" className="font-bold underline">Sobre</a>.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">
                Responsabilidade editorial
              </h2>
              <p className="leading-relaxed">
                A plataforma é independente e não representa partido, candidato, mandato
                parlamentar ou órgão público. Nosso compromisso é deixar claro de onde cada
                informação veio e facilitar a conferência por qualquer cidadão.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
