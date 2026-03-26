import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OFFICIAL_SOURCE_LINKS, getOfficialSourceStatus, getTseDatasets } from '@/lib/api';

export const revalidate = 86400;

const internalRoutes = [
  {
    path: '/api/fontes',
    description: 'Resumo das fontes oficiais integradas e amostra dos datasets do TSE.',
  },
  {
    path: '/api/fontes/congresso',
    description: 'Lista inicial de parlamentares carregados das APIs oficiais da C�mara e do Senado.',
  },
  {
    path: '/api/fontes/congresso?q=Tabata',
    description: 'Busca textual de parlamentares nas fontes oficiais do Congresso.',
  },
  {
    path: '/api/fontes/tse?limit=6',
    description: 'Lista datasets de candidatos localizados no portal oficial do TSE.',
  },
  {
    path: '/api/fontes/cnj/processo?tribunal=tjdft&numero=07223914020178070001',
    description: 'Consulta segura do CNJ DataJud por n�mero de processo e tribunal.',
  },
];

export default async function ApiDocsPage() {
  const [fontes, tseDatasets] = await Promise.all([
    getOfficialSourceStatus(),
    getTseDatasets(4),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <section className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-5xl uppercase mb-4">APIs E FONTES OFICIAIS</h1>
            <p className="font-body font-bold text-lg uppercase opacity-80">
              O projeto agora separa claramente fonte da verdade, rotas internas e eventual camada
              de armazenamento.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fontes.map((fonte) => (
              <article
                key={fonte.id}
                className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="font-label font-bold uppercase text-xs mb-2">
                  Status: {fonte.status}
                </p>
                <h2 className="font-headline font-black text-3xl uppercase mb-3">{fonte.nome}</h2>
                <p className="font-body font-medium mb-4">{fonte.detalhes}</p>
                <a
                  href={fonte.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-headline font-black uppercase border-b-4 border-black"
                >
                  Abrir fonte oficial
                </a>
              </article>
            ))}
          </section>

          <section className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-4xl uppercase mb-6">ROTAS INTERNAS</h2>
            <div className="space-y-4">
              {internalRoutes.map((route) => (
                <div key={route.path} className="border-2 border-black p-4">
                  <p className="font-headline font-black text-xl break-all">{route.path}</p>
                  <p className="font-body font-medium mt-2">{route.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-4xl uppercase mb-6">DATASETS DO TSE</h2>
            <div className="space-y-4">
              {tseDatasets.map((dataset) => (
                <article key={dataset.id} className="border-2 border-black p-4">
                  <h3 className="font-headline font-black text-2xl uppercase">{dataset.titulo}</h3>
                  <p className="font-body font-medium mt-2">{dataset.descricao || 'Sem descri��o resumida.'}</p>
                  <p className="font-label font-bold uppercase text-xs mt-3">
                    Atualizado em: {new Date(dataset.atualizadoEm).toLocaleString('pt-BR')}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-primary-container border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-4xl uppercase mb-4">REGRA DE SEGURAN�A</h2>
            <p className="font-body font-bold text-lg uppercase">
              CNJ entra por n�mero de processo e tribunal. Nenhuma infer�ncia autom�tica por nome
              ser�tratada como prova.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {OFFICIAL_SOURCE_LINKS.map((source) => (
                <a key={source.id} href={source.href} target="_blank" rel="noreferrer" className="font-headline font-black uppercase border-b-4 border-black w-max">
                  {source.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
