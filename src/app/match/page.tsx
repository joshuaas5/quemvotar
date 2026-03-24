import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MatchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-black opacity-5 pointer-events-none select-none font-headline tracking-tighter">
          MATCH
        </div>

        <div className="w-full max-w-3xl z-10">
          <div className="bg-white border-4 border-black p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-12">
            <span className="material-symbols-outlined text-5xl mb-6 text-tertiary">rule</span>
            <h1 className="font-headline font-black text-4xl md:text-6xl uppercase leading-none mb-6">
              Match em construcao com votos oficiais
            </h1>
            <p className="font-body font-medium text-lg max-w-xl mx-auto opacity-80">
              Esta tela nao vai fingir alinhamento ideologico enquanto a ingestao de votacoes
              nominais da Camara e do Senado nao estiver auditada ponta a ponta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-container border-4 border-black p-6">
              <p className="font-headline font-black text-2xl uppercase mb-2">1. Coletar</p>
              <p className="font-body font-medium">
                Votacoes nominais oficiais das casas legislativas.
              </p>
            </div>
            <div className="bg-secondary-fixed border-4 border-black p-6">
              <p className="font-headline font-black text-2xl uppercase mb-2">2. Explicar</p>
              <p className="font-body font-medium">
                Tema, contexto e regra de comparacao visiveis para o usuario.
              </p>
            </div>
            <div className="bg-white border-4 border-black p-6">
              <p className="font-headline font-black text-2xl uppercase mb-2">3. Liberar</p>
              <p className="font-body font-medium">
                Match so quando o resultado puder ser auditado por qualquer pessoa.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
