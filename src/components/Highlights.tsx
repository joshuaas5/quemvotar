import Link from 'next/link';
import { getCasaBadge, getFonteBadge, getHighlights } from '@/lib/api';

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

export default async function Highlights() {
  const candidatos = await getHighlights();

  return (
    <section id="candidatos" className="bg-surface-container-low py-20 px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-label font-bold uppercase tracking-[0.3em] opacity-60 mb-3">
            Perfis reais para comecar
          </p>
          <h2 className="font-headline font-black text-5xl uppercase tracking-tighter mb-2">
            Quem esta no Congresso agora
          </h2>
          <p className="font-body font-bold text-xl uppercase opacity-70 max-w-4xl">
            Uma amostra da base consultada a partir do espelho local ou diretamente das APIs
            oficiais da Camara dos Deputados e do Senado Federal.
          </p>
        </div>

        {candidatos.length === 0 ? (
          <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-headline font-black text-3xl uppercase mb-3">
              Sem retorno oficial neste momento
            </h3>
            <p className="font-body font-medium max-w-3xl">
              O visual continua pronto, mas a exibicao de perfis depende do espelho local ou da
              resposta das APIs oficiais. Preferimos mostrar vazio a preencher a tela com dados
              inventados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {candidatos.map((candidato) => (
              <article
                key={`${candidato.fonte}-${candidato.id}`}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 group"
              >
                <div className="bg-on-background text-white p-4 font-headline font-black uppercase flex justify-between items-center">
                  <span>{getCasaBadge(candidato)}</span>
                  <span className="material-symbols-outlined">source</span>
                </div>
                <div className="aspect-square relative overflow-hidden border-b-4 border-black bg-surface-container-high">
                  {candidato.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                      alt={candidato.nome_urna}
                      src={candidato.foto_url}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-headline font-black text-6xl">
                      {getInitials(candidato.nome_urna)}
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="font-headline font-black text-on-surface-variant text-sm block mb-1">
                    {candidato.partido} {candidato.uf ? `(${candidato.uf})` : ''}
                  </span>
                  <h3 className="font-headline font-black text-3xl xl:text-4xl leading-none uppercase mb-4">
                    {candidato.nome_urna}
                  </h3>
                  <p className="font-body font-medium mb-3 text-sm">
                    {candidato.cargo} em exercicio. Foto, sigla partidaria e UF exibidos a partir
                    da base oficial sincronizada ou da consulta direta nas APIs publicas.
                  </p>
                  <p className="font-label font-bold text-xs uppercase opacity-70 mb-6">
                    {getFonteBadge(candidato)}
                  </p>
                  <Link
                    href={`/busca?q=${encodeURIComponent(candidato.nome_urna)}`}
                    className="w-full bg-on-background text-white font-headline font-black py-4 uppercase border-4 border-transparent hover:bg-white hover:text-black hover:border-black transition-all text-center"
                  >
                    ABRIR PERFIL
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
