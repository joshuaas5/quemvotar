import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Sobre o QuemVotar',
  description:
    'Conheça a missão do QuemVotar: organizar dados públicos sobre parlamentares brasileiros com transparência, independência e fontes verificáveis.',
  alternates: { canonical: 'https://www.quemvotar.com.br/sobre' },
};

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Sobre' }]} />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">
              Sobre o QuemVotar
            </h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
              Uma plataforma independente para transformar dados públicos em consulta eleitoral compreensível.
            </p>
          </section>

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8 font-body">
            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Nossa missão</h2>
              <p className="leading-relaxed">
                O QuemVotar existe para ajudar eleitores brasileiros a consultar parlamentares em exercício com base em informações públicas, rastreáveis e apresentadas de forma simples. A proposta não é dizer em quem votar, mas reduzir a distância entre o cidadão e os dados oficiais sobre mandatos, partidos, presença, gastos, votações e fontes institucionais.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Independência</h2>
              <p className="leading-relaxed">
                A plataforma não representa partido político, parlamentar, candidato, mandato, órgão público ou campanha eleitoral. O conteúdo é organizado com finalidade informativa, cívica e educacional. Links para fontes externas são usados para permitir conferência direta pelo usuário.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">O que torna o site útil</h2>
              <p className="leading-relaxed">
                Em vez de exigir que o usuário navegue por vários portais públicos separados, o QuemVotar reúne caminhos de consulta em um só lugar. Cada perfil busca destacar informações práticas para análise eleitoral: quem é o parlamentar, qual partido representa, qual UF representa, quais dados oficiais estão disponíveis e onde conferir a origem de cada informação.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Limites importantes</h2>
              <p className="leading-relaxed">
                Dados públicos podem estar incompletos, indisponíveis temporariamente ou com formatos diferentes entre Câmara, Senado, TSE, CNJ e bases externas. Por isso, o QuemVotar apresenta fontes e evita tratar qualquer indicador isolado como veredito definitivo sobre um parlamentar. O eleitor deve usar o site como ponto de partida para pesquisa, não como substituto da própria avaliação.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Contato e correções</h2>
              <p className="leading-relaxed">
                Solicitações de correção, dúvidas sobre fontes e sugestões editoriais podem ser enviadas pela página de contato. Quando uma informação parecer incorreta, recomendamos incluir a URL da página, o trecho questionado e, se possível, um link para a fonte oficial atualizada.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
