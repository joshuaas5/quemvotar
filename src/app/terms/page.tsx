import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso e condicoes de acesso ao QuemVotar. Consulte dados oficiais sobre politicos brasileiros.',
  alternates: { canonical: 'https://quemvotar.com.br/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Termos de Uso' }]} />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">
              Termos de Uso
            </h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
              Regras e condicoes para uso do QuemVotar. Leia com atencao.
            </p>
          </section>

          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8 font-body">
            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">1. Aceitacao dos Termos</h2>
              <p className="leading-relaxed">
                Ao acessar e usar o site QuemVotar (&quot;Site&quot;), voce concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicaveis. Se nao concordar com qualquer parte destes termos, nao utilize o Site. Estes termos podem ser alterados a qualquer momento, sem aviso previo. O uso continuado do Site apos alteracoes constitui aceitacao dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">2. Natureza dos Dados</h2>
              <p className="leading-relaxed">
                O QuemVotar e uma plataforma de transparencia politica que consolida dados publicos e oficiais de fontes governamentais, incluindo a Camara dos Deputados, o Senado Federal, o Tribunal Superior Eleitoral (TSE), o Conselho Nacional de Justica (CNJ) e o Ranking dos Politicos. Todos os dados exibidos sao de dominio publico e obtidos via APIs oficiais ou portais de transparencia. Nao produzimos, editamos nem alteramos os dados brutos fornecidos por essas instituicoes.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">3. Isencao de Responsabilidade</h2>
              <p className="leading-relaxed">
                O QuemVotar nao se responsabiliza pela precisao, completude ou atualidade dos dados exibidos. Embora nos esforcemos para manter as informacoes atualizadas, os dados dependem de atualizacoes das fontes originais. O Site e fornecido &quot;como esta&quot;, sem garantias de qualquer tipo, expressas ou implicitas. O uso das informacoes e por sua conta e risco.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">4. Uso Permitido</h2>
              <p className="leading-relaxed">
                Voce pode usar o Site para consulta pessoal, pesquisa academica, jornalismo e fins informativos. E proibido usar o Site para fins comerciais nao autorizados, mineracao de dados automatizada (scraping) que sobrecarregue nossos servidores, ou qualquer atividade que viole leis brasileiras. Reservamo-nos o direito de bloquear acessos abusivos.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">5. Propriedade Intelectual</h2>
              <p className="leading-relaxed">
                O design, codigo-fonte, logomarca e identidade visual do QuemVotar sao de propriedade exclusiva dos criadores do Site. Os dados publicos exibidos permanecem de dominio publico conforme a legislacao brasileira (Lei de Acesso a Informacao - LAI). A reproducao nao autorizada de partes significativas do Site para concorrencia direta e proibida.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">6. Privacidade e Cookies</h2>
              <p className="leading-relaxed">
                O QuemVotar utiliza cookies e tecnologias de rastreamento para melhorar a experiencia do usuario, exibir anuncios (Google AdSense) e analisar trafego (Google Analytics). Ao usar o Site, voce consente com o uso dessas tecnologias. Para mais detalhes, consulte nossa <a href="/privacy" className="underline font-bold">Politica de Privacidade</a>.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">7. Anuncios e Monetizacao</h2>
              <p className="leading-relaxed">
                O Site exibe anuncios via Google AdSense. O Google pode usar cookies para personalizar anuncios com base em visitas anteriores ao Site e a outros sites. Voce pode desativar a personalizacao de anuncios nas configuracoes de privacidade do Google. O QuemVotar nao endossa produtos ou servicos anunciados e nao se responsabiliza pelo conteudo de sites de terceiros.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">8. Limitacao de Responsabilidade</h2>
              <p className="leading-relaxed">
                Em nenhuma circunstancia o QuemVotar, seus criadores ou colaboradores serao responsaveis por danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar o Site, mesmo que tenham sido avisados da possibilidade de tais danos.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">9. Lei Aplicavel e Foro</h2>
              <p className="leading-relaxed">
                Estes Termos de Uso sao regidos pelas leis da Republica Federativa do Brasil. Quaisquer disputas relacionadas a estes termos serao submetidas ao foro da comarca de Brasilia, Distrito Federal, com exclusao de qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">10. Contato</h2>
              <p className="leading-relaxed">
                Para questoes sobre estes Termos de Uso, entre em contato pelo e-mail: <strong>contato@quemvotar.com.br</strong>
              </p>
            </section>

            <p className="text-sm opacity-70 pt-4 border-t-2 border-black">
              Ultima atualizacao: 28 de abril de 2026.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
