import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Politica de Privacidade',
  description: 'Politica de privacidade do QuemVotar. Entenda como tratamos seus dados, cookies e informacoes de navegacao.',
  alternates: { canonical: 'https://www.quemvotar.com.br/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs items={[{ label: 'Politica de Privacidade' }]} />

          <PageHero
            eyebrow="Privacidade e dados"
            title="Política de Privacidade"
            description="Como coletamos, usamos e protegemos suas informações no QuemVotar."
            accent="purple"
            stat={{ value: 'LGPD', label: 'Transparência sobre cookies, analytics, favoritos locais e contato.' }}
          />

          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8 font-body">
            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">1. Introducao</h2>
              <p className="leading-relaxed">
                O QuemVotar se compromete a proteger sua privacidade. Esta Politica de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informacoes quando voce acessa nosso Site. Ao usar o QuemVotar, voce concorda com as praticas descritas nesta politica.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">2. Dados que Coletamos</h2>
              <p className="leading-relaxed mb-3">
                <strong>2.1. Dados de navegacao (automaticos):</strong> Coletamos informacoes tecnicas como endereco IP, tipo de navegador, sistema operacional, paginas visitadas, tempo de permanencia e origem do trafego. Esses dados sao coletados via cookies e ferramentas de analise (Google Analytics).
              </p>
              <p className="leading-relaxed mb-3">
                <strong>2.2. Dados de localizacao aproximada:</strong> Com base no seu endereco IP, podemos inferir sua regiao geografica aproximada para fins estatisticos e de personalizacao de conteudo.
              </p>
              <p className="leading-relaxed">
                <strong>2.3. Dados de preferencias:</strong> Se voce usar a funcao de favoritos do Site, essas preferencias sao armazenadas localmente no seu navegador (localStorage) e nao sao transmitidas para nossos servidores. Voce tem controle total sobre esses dados e pode apaga-los a qualquer momento limpando o cache do navegador.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">3. Como Usamos os Dados</h2>
              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                <li>Melhorar a experiencia do usuario e o desempenho do Site;</li>
                <li>Analisar tendencias de trafego e comportamento de navegacao;</li>
                <li>Exibir anuncios relevantes via Google AdSense;</li>
                <li>Prevenir fraudes e uso abusivo da plataforma;</li>
                <li>Gerar estatisticas agregadas e anonimas sobre o uso do Site.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">4. Cookies e Tecnologias Semelhantes</h2>
              <p className="leading-relaxed">
                {'Usamos recursos opcionais para medir audi\u00eancia e, se voc\u00ea permitir, exibir publicidade. Eles s\u00f3 s\u00e3o carregados depois da sua escolha no aviso de cookies.'}
              </p>
              <p className="mt-3 leading-relaxed">
                {'Voc\u00ea pode revisar ou alterar a escolha a qualquer momento pelo link "Prefer\u00eancias de cookies" no rodap\u00e9. A decis\u00e3o fica armazenada apenas neste navegador.'}
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">5. Compartilhamento de Dados</h2>
              <p className="leading-relaxed">
                Nao vendemos, alugamos ou compartilhamos dados pessoais identificaveis com terceiros, exceto: (i) provedores de servicos essenciais (hospedagem, analise, publicidade); (ii) quando exigido por lei ou ordem judicial; (iii) para proteger nossos direitos legais ou a seguranca dos usuarios. Todos os parceiros estao sujeitos a obrigacoes de confidencialidade.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">6. Seguranca dos Dados</h2>
              <p className="leading-relaxed">
                Adotamos medidas tecnicas e organizacionais para proteger seus dados contra acesso nao autorizado, alteracao, divulgacao ou destruicao. No entanto, nenhum metodo de transmissao pela internet ou armazenamento eletronico e 100% seguro. Nao podemos garantir seguranca absoluta.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">7. Seus Direitos (LGPD)</h2>
              <p className="leading-relaxed mb-3">
                De acordo com a Lei Geral de Protecao de Dados (Lei 13.709/2018), voce tem os seguintes direitos:
              </p>
              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                <li>Acessar seus dados pessoais que mantemos;</li>
                <li>Solicitar correcao de dados incompletos, inexatos ou desatualizados;</li>
                <li>Solicitar anonimizacao, bloqueio ou eliminacao de dados desnecessarios;</li>
                <li>Revogar consentimento a qualquer momento;</li>
                <li>Solicitar portabilidade dos dados para outro servico;</li>
                <li>Opor-se ao tratamento de dados em determinadas circunstancias.</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Para exercer seus direitos, entre em contato pelo e-mail: <strong>staterbills@gmail.com</strong>
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">8. Retencao de Dados</h2>
              <p className="leading-relaxed">
                Mantemos dados de navegacao anonimizados pelo tempo necessario para cumprir as finalidades descritas nesta politica ou conforme exigido por lei. Dados de favoritos (localStorage) permanecem no seu dispositivo ate que voce os remova manualmente.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">9. Menores de Idade</h2>
              <p className="leading-relaxed">
                O QuemVotar nao e direcionado a menores de 13 anos. Nao coletamos intencionalmente dados pessoais de criancas. Se voce e pai/mãe ou responsavel e acredita que seu filho forneceu dados pessoais, entre em contato conosco para remocao.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">10. Alteracoes nesta Politica</h2>
              <p className="leading-relaxed">
                Podemos atualizar esta Politica de Privacidade periodicamente. Alteracoes significativas serao notificadas no Site ou por outros meios apropriados. O uso continuado do Site apos alteracoes constitui aceitacao da nova politica.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase mb-3">11. Contato</h2>
              <p className="leading-relaxed">
                Para questoes sobre privacidade ou exercicio de direitos, entre em contato: <strong>staterbills@gmail.com</strong>
              </p>
            </section>

            <p className="text-sm opacity-70 pt-4 border-t-2 border-black">
              {'\u00daltima atualiza\u00e7\u00e3o: 30 de julho de 2026.'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
