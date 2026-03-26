import Link from 'next/link';
import { getCasaBadge, getHighlights, getPerfilHref } from '@/lib/api';

type CardConfig = {
  bgClass: string;
  textClass: string;
  icon: string;
};

function getCardConfig(index: number): CardConfig {
  const configs: CardConfig[] = [
    { bgClass: 'bg-tertiary', textClass: 'text-white', icon: 'account_balance' },
    { bgClass: 'bg-secondary-fixed', textClass: 'text-on-secondary-fixed', icon: 'how_to_vote' },
    { bgClass: 'bg-primary-container', textClass: 'text-on-primary-fixed', icon: 'verified' },
  ];

  return configs[index % configs.length];
}

export default async function Highlights() {
  const candidatos = await getHighlights();

  return (
    <section id="candidatos" className="bg-surface-container-low py-20 px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-headline font-black text-5xl uppercase tracking-tighter mb-2">
            PARLAMENTARES EM EXERCÍCIO
          </h2>
          <p className="font-body font-bold text-xl uppercase opacity-70">
            Perfis carregados com base nas APIs oficiais da Câmara e do Senado.
          </p>
        </div>

        {candidatos.length === 0 ? (
          <div className="bg-white border-4 border-black p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-headline font-black text-3xl uppercase mb-3">
              NENHUM DADO DISPONÍVEL NO MOMENTO
            </h3>
            <p className="font-body font-bold">
              A vitrine depende da resposta das APIs oficiais consultadas pelo projeto.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {candidatos.map((candidato, index) => {
              const config = getCardConfig(index);

              return (
                <article
                  key={`${candidato.fonte}-${candidato.id}`}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 group"
                >
                  <div className={`${config.bgClass} ${config.textClass} p-4 font-headline font-black uppercase flex justify-between items-center`}>
                    <span>{getCasaBadge(candidato)}</span>
                    <span className="material-symbols-outlined">{config.icon}</span>
                  </div>
                  <div className="aspect-square relative overflow-hidden border-b-4 border-black grayscale group-hover:grayscale-0 transition-all duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-full object-cover object-top"
                      alt={candidato.nome_urna}
                      src={candidato.foto_url || 'https://fakeimg.pl/600x600?text=Sem+Foto'}
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <span className="font-headline font-black text-on-surface-variant text-sm block mb-1">
                      {candidato.partido} {candidato.uf ? `(${candidato.uf})` : ''}
                    </span>
                    <h3 className="font-headline font-black text-3xl xl:text-4xl leading-none uppercase mb-4">
                      {candidato.nome_urna}
                    </h3>
                    <p className="font-body font-medium mb-6 text-sm flex-grow">
                      {candidato.cargo} em exercício. Perfil exibido a partir de fonte oficial já
                      disponível na base do projeto.
                    </p>
                    <Link
                      href={getPerfilHref(candidato)}
                      className="w-full bg-on-background text-white font-headline font-black py-4 uppercase border-4 border-transparent hover:bg-white hover:text-black hover:border-black transition-all cursor-pointer text-center"
                    >
                      VER PERFIL
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
