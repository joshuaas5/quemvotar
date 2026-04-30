import Image from 'next/image';
import LoadingLink from '@/components/LoadingLink';
import { getCasaBadge, getHighlights, getPerfilHref } from '@/lib/api';

function getCardConfig(index: number) {
  const configs = [
    { bgClass: 'bg-primary-container', textClass: 'text-on-primary-fixed', shadowClass: 'shadow-primary-container' },
    { bgClass: 'bg-[#9bf6ff]', textClass: 'text-black', shadowClass: 'shadow-[#9bf6ff]' },
    { bgClass: 'bg-[#ffc6ff]', textClass: 'text-black', shadowClass: 'shadow-[#ffc6ff]' },
  ];
  return configs[index % configs.length];
}

export default async function Highlights() {
  const candidatos = await getHighlights();

  return (
    <section id="candidatos" className="bg-surface-container-low py-12 sm:py-20 px-4 sm:px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 sm:mb-16">
          <h2 className="font-headline font-black text-3xl sm:text-5xl uppercase tracking-tighter mb-2">
            PARLAMENTARES EM EXERCÍCIO
          </h2>
          <p className="font-body font-bold text-base sm:text-xl uppercase opacity-70">
            Perfis em destaque nesta visita.
          </p>
        </div>

        {candidatos.length === 0 ? (
          <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-headline font-black text-2xl sm:text-3xl uppercase mb-3">
              NENHUM DADO DISPONÍVEL NO MOMENTO
            </h3>
            <p className="font-body font-bold">
              Não conseguimos carregar os perfis das APIs oficiais agora. Tente em alguns minutos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {candidatos.map((candidato, index) => {
              const config = getCardConfig(index);

              return (
                <article
                  key={`${candidato.fonte}-${candidato.id}`}
                  className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:scale-[0.97] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 transition-all duration-150 group"
                >
                  <div className={`${config.bgClass} ${config.textClass} p-4 font-headline font-black uppercase flex justify-between items-center`}>
                    <span>{getCasaBadge(candidato)}</span>
                    <span className="material-symbols-outlined">verified</span>
                  </div>

                  <div className="aspect-square bg-gray-100 grayscale hover:grayscale-0 transition-all border-b-4 border-black overflow-hidden relative flex items-center justify-center">
                    {candidato.foto_url ? (
                      <Image
                        src={candidato.foto_url}
                        alt={candidato.nome_urna}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        quality={60}
                      />
                    ) : (
                      <span className="font-headline font-black text-5xl text-gray-300">{candidato.nome_urna.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <span className="font-headline font-black text-on-surface-variant text-sm block mb-1">
                      {candidato.partido} {candidato.uf ? `(${candidato.uf})` : ''}
                    </span>
                    <h3 className="font-headline font-black text-2xl sm:text-3xl xl:text-4xl leading-none uppercase mb-4">
                      {candidato.nome_urna}
                    </h3>
                    <p className="font-body font-medium mb-6 text-sm flex-grow">
                      Consulte a nota no ranking, histórico de votações, assiduidade e principais
                      temas defendidos.
                    </p>

                    <LoadingLink
                      href={getPerfilHref(candidato)}
                      className="inline-block mt-auto bg-black text-white px-6 py-3 font-headline font-black text-lg uppercase border-2 border-black hover:bg-white hover:text-black active:bg-black active:text-white active:scale-[0.97] transition-all text-center"
                    >
                      Ver perfil completo
                    </LoadingLink>
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
