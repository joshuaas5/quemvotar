import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Metodologia',
  description:
    'Entenda como o QuemVotar organiza dados oficiais, rankings, presença, votações, partidos e limitações metodológicas.',
  alternates: { canonical: 'https://www.quemvotar.com.br/metodologia' },
};

export default function MetodologiaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Metodologia' }]} />

          <PageHero
            eyebrow="Como os dados são tratados"
            title="Metodologia"
            description="Como coletamos, organizamos e apresentamos informações públicas sobre parlamentares."
            accent="green"
            stat={{ value: '7 critérios', label: 'Fontes, limites, indicadores, match e uso responsável dos dados.' }}
          />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8 font-body">
            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">1. Fontes principais</h2>
              <p className="leading-relaxed">
                O QuemVotar prioriza fontes públicas e verificáveis, incluindo APIs e páginas oficiais da Câmara dos Deputados, Senado Federal, Tribunal Superior Eleitoral, Conselho Nacional de Justiça e bases externas explicitamente identificadas. Sempre que possível, cada página inclui links para a fonte original.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">2. Perfis parlamentares</h2>
              <p className="leading-relaxed">
                Os perfis são montados a partir de dados oficiais de identificação, mandato, partido, UF, casa legislativa, contatos institucionais, cargos, comissões, autorias, despesas e votações quando esses dados estão disponíveis. A disponibilidade varia por casa legislativa e por parlamentar.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">3. Rankings e indicadores</h2>
              <p className="leading-relaxed">
                Indicadores como nota pública, presença e alinhamento com governo são apresentados como sinais auxiliares de análise. Eles não substituem leitura de projetos, votos nominais, histórico do mandato e contexto político. Sempre que uma nota vier de uma fonte externa, o site indica o caminho para conferência.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">4. Campo político e partidos</h2>
              <p className="leading-relaxed">
                Classificações de campo político são aproximadas e servem para navegação e comparação geral. Elas podem combinar informações do partido atual, metadados públicos e padrões de votação disponíveis. A classificação não representa endosso, acusação ou avaliação moral do parlamentar.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">5. Match eleitoral</h2>
              <p className="leading-relaxed">
                O match eleitoral é uma ferramenta exploratória. Ele cruza respostas do usuário com temas políticos e dados disponíveis sobre parlamentares ou partidos. O resultado deve ser interpretado como afinidade aproximada dentro do conjunto de dados analisado, não como recomendação automática de voto.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">6. Atualização e falhas de fonte</h2>
              <p className="leading-relaxed">
                O site depende de serviços públicos externos. Quando uma fonte está indisponível, preferimos exibir ausência temporária de dados em vez de preencher a página com informações não verificadas. Essa decisão preserva a confiabilidade editorial e evita publicar dados artificiais.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">7. Como usar os dados com responsabilidade</h2>
              <p className="leading-relaxed">
                Recomendamos comparar múltiplos sinais: histórico de votos, projetos apresentados, presença, partido, atuação em comissões, despesas declaradas e fontes oficiais. Nenhum dado isolado deve ser usado como única base para decidir voto.
              </p>
            </div>

            <div className="border-t-2 border-black pt-6">
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Guias complementares</h2>
              <p className="leading-relaxed mb-4">
                Para aplicar esses critérios na prática, consulte os guias editoriais sobre deputados, senadores, leitura de votações, fontes oficiais e uso de dados públicos.
              </p>
              <Link href="/guias" className="font-headline font-black uppercase border-b-4 border-black">
                Abrir guias do eleitor
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
