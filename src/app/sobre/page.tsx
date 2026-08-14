import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { SITE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Sobre o QuemVotar',
  description:
    'QuemVotar é um projeto editorial da Editora Vélos para organizar dados públicos sobre parlamentares brasileiros com transparência, independência e fontes verificáveis.',
  alternates: { canonical: 'https://www.quemvotar.com.br/sobre' },
  robots: { index: true, follow: true },
};

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Sobre' }]} />

          <PageHero
            eyebrow="Quem está por trás"
            title="Sobre o QuemVotar"
            description="Um projeto editorial independente para transformar dados públicos em consulta eleitoral compreensível."
            accent="cyan"
            stat={{ value: SITE.publisherName, label: 'Editora responsável pela publicação.' }}
          />

          {/* Identidade (Fase 2 do plano de correção AdSense) */}
          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8 font-body">
            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Responsável pela publicação</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-black p-4">
                  <dt className="font-label font-bold uppercase text-xs opacity-70 mb-1">Editora</dt>
                  <dd className="font-bold">{SITE.publisherName}{SITE.publisherCnpj ? ` — CNPJ ${SITE.publisherCnpj}` : ''}</dd>
                </div>
                <div className="border-2 border-black p-4">
                  <dt className="font-label font-bold uppercase text-xs opacity-70 mb-1">Responsável editorial</dt>
                  <dd className="font-bold">{SITE.responsibleName || 'A informar em breve'}</dd>
                  {SITE.responsibleCredential ? (
                    <dd className="mt-1 text-sm">{SITE.responsibleCredential}</dd>
                  ) : null}
                </div>
                {SITE.responsibleCityUf ? (
                  <div className="border-2 border-black p-4">
                    <dt className="font-label font-bold uppercase text-xs opacity-70 mb-1">Cidade/UF</dt>
                    <dd className="font-bold">{SITE.responsibleCityUf}</dd>
                  </div>
                ) : null}
                <div className="border-2 border-black p-4">
                  <dt className="font-label font-bold uppercase text-xs opacity-70 mb-1">Contato</dt>
                  <dd className="font-bold">
                    <a href={`mailto:${SITE.contactEmail}`} className="underline">{SITE.contactEmail}</a>
                  </dd>
                </div>
              </dl>
              {SITE.address ? (
                <p className="mt-4 text-sm opacity-80">{SITE.address}</p>
              ) : null}
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Nossa missão</h2>
              <p className="leading-relaxed">
                O QuemVotar existe para ajudar eleitores brasileiros a consultar parlamentares em
                exercício com base em informações públicas, rastreáveis e apresentadas de forma
                simples. A proposta não é dizer em quem votar, mas reduzir a distância entre o
                cidadão e os dados oficiais sobre mandatos, partidos, presença, gastos, votações e
                fontes institucionais.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Como o conteúdo é produzido</h2>
              <p className="leading-relaxed">
                Guias, análises e metodologia são escritos e revisados por pessoas, com assinatura e
                data em cada publicação. Os dados de mandato vêm de registros públicos oficiais
                (Câmara dos Deputados, Senado Federal, TSE e CNJ), sempre com link para a fonte
                original. Nenhum texto publicado no site é gerado automaticamente a partir de
                planilhas ou templates.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Independência</h2>
              <p className="leading-relaxed">
                O projeto não representa partido político, parlamentar, candidato, mandato, órgão
                público ou campanha eleitoral. A receita vem de publicidade digital, sem patrocínio
                de agentes políticos. Links para fontes externas existem para permitir conferência
                direta pelo usuário.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Limites importantes</h2>
              <p className="leading-relaxed">
                Dados públicos podem estar incompletos, indisponíveis temporariamente ou com formatos
                diferentes entre Câmara, Senado, TSE, CNJ e bases externas. Por isso, o QuemVotar
                apresenta fontes e evita tratar qualquer indicador isolado como veredito definitivo
                sobre um parlamentar. O eleitor deve usar o site como ponto de partida para pesquisa,
                não como substituto da própria avaliação.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Correções e transparência</h2>
              <p className="leading-relaxed">
                Solicitações de correção, dúvidas sobre fontes e sugestões editoriais são tratadas
                pela página de{' '}
                <Link href="/contact" className="font-bold underline">contato</Link>. Quando uma
                informação parecer incorreta, recomendamos incluir a URL da página, o trecho
                questionado e, se possível, um link para a fonte oficial atualizada. O histórico de
                correções relevantes é registrado e as versões dos textos são datadas.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
