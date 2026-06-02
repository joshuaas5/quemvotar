import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Política Editorial',
  description:
    'Conheça os princípios editoriais do QuemVotar para correções, fontes, neutralidade, transparência e limitações dos dados públicos.',
  alternates: { canonical: 'https://www.quemvotar.com.br/politica-editorial' },
};

export default function PoliticaEditorialPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Política Editorial' }]} />

          <PageHero
            eyebrow="Critérios editoriais"
            title="Política Editorial"
            description="Regras para publicar, corrigir e contextualizar dados políticos no QuemVotar."
            accent="pink"
            stat={{ value: 'Correções', label: 'Pedidos são avaliados com base em fonte verificável e contexto.' }}
          />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8 font-body">
            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Princípio de fonte verificável</h2>
              <p className="leading-relaxed">
                Informações factuais devem vir de fonte pública, fonte oficial ou base externa identificada. Quando a informação depender de uma fonte externa, o site deve facilitar a conferência por meio de links, nomes de bases ou descrição clara da origem.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Neutralidade e contexto</h2>
              <p className="leading-relaxed">
                O QuemVotar não publica recomendação oficial de voto, apoio partidário ou campanha contra parlamentares. Indicadores são apresentados como instrumentos de consulta. Textos explicativos devem evitar linguagem acusatória quando não houver fonte direta e devem separar dado, interpretação e limitação.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Correções</h2>
              <p className="leading-relaxed">
                Pedidos de correção são analisados com base em evidência verificável. Quando a fonte oficial estiver desatualizada, podemos indicar a limitação na página, mas não substituímos dados oficiais por alegações sem documentação. Usuários podem enviar solicitações pela página de contato.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Conteúdo gerado por dados</h2>
              <p className="leading-relaxed">
                Parte do site é gerada a partir de bases públicas estruturadas. Para manter valor editorial, as páginas devem explicar a origem dos dados, mostrar caminhos de conferência e contextualizar o que cada métrica significa. Não usamos preenchimento artificial quando uma fonte falha.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Limitações e transparência</h2>
              <p className="leading-relaxed">
                Bases públicas podem conter atrasos, mudanças de formato e lacunas. Uma página sem determinado dado não significa necessariamente ausência de atuação parlamentar; pode significar que a fonte consultada não retornou a informação naquele momento.
              </p>
            </div>

            <div>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">Publicidade</h2>
              <p className="leading-relaxed">
                A eventual exibição de anúncios ajuda a manter a infraestrutura do projeto, mas não interfere nos critérios editoriais, nas fontes usadas nem na forma de apresentar dados políticos. Anunciantes não controlam perfis, rankings, textos metodológicos ou páginas de consulta.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
