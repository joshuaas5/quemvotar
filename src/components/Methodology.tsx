import { OFFICIAL_SOURCE_LINKS } from '@/lib/api';

const commitments = [
  {
    title: 'SO ENTRA O QUE TEM FONTE',
    body:
      'Cargo, partido, UF e foto so aparecem quando conseguimos apontar para uma base oficial ou para um espelho sincronizado dela.',
  },
  {
    title: 'SEM PROCESSO SEM PROVA',
    body:
      'Processos judiciais, ficha limpa e acusacoes ficam fora do ar enquanto a integracao oficial e a conciliacao de identidade nao estiverem auditadas.',
  },
  {
    title: 'MATCH SO QUANDO FOR REAL',
    body:
      'O comparador ideologico sera liberado apenas quando as votacoes nominais oficiais estiverem consolidadas e explicadas para o usuario.',
  },
];

export default function Methodology() {
  return (
    <section id="metodologia" className="bg-[#111111] text-white py-24 px-6 border-t-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <p className="font-label font-bold uppercase tracking-[0.3em] text-secondary-fixed mb-4">
            Metodologia Publica
          </p>
          <h2 className="font-headline font-black text-5xl md:text-7xl uppercase leading-none mb-6">
            Antes de viralizar, a gente verifica.
          </h2>
          <p className="font-body font-medium text-lg md:text-2xl text-white/80">
            O posicionamento do produto e forte. A base de dados precisa ser ainda mais forte.
            Por isso, a regra e simples: sem fonte oficial, sem selo, sem numero e sem acusacao no ar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {commitments.map((item) => (
            <article
              key={item.title}
              className="border-4 border-white bg-[#1a1a1a] p-8 shadow-[8px_8px_0px_0px_rgba(0,251,251,0.45)]"
            >
              <h3 className="font-headline font-black text-3xl uppercase leading-none mb-4">
                {item.title}
              </h3>
              <p className="font-body font-medium text-white/80">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 mt-14">
          <div className="bg-white text-black border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(255,215,9,1)]">
            <p className="font-label font-bold uppercase text-sm mb-3">
              Fontes oficiais usadas agora
            </p>
            <div className="space-y-4">
              {OFFICIAL_SOURCE_LINKS.map((source) => (
                <a
                  key={source.id}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block border-4 border-black p-4 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <p className="font-headline font-black text-2xl uppercase">
                    {source.label}
                  </p>
                  <p className="font-body font-medium text-sm break-all">{source.href}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-primary-container text-black border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.25)]">
            <p className="font-label font-bold uppercase text-sm mb-3">
              O que ainda nao entra em producao
            </p>
            <ul className="space-y-4 font-headline font-black text-2xl uppercase leading-tight">
              <li>Processos judiciais sem integracao oficial auditada.</li>
              <li>Ficha limpa inferida por padrao.</li>
              <li>Metricas de acesso ou tendencia sem analytics real.</li>
              <li>Match ideologico baseado em votos nao validados.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
