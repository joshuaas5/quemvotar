import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import LoadingLink from '@/components/LoadingLink';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import { getParlamentares, getPartidos, getPerfilHref } from '@/lib/api';
import { getPartyLogoBySigla, getPartyVisualEmoji } from '@/lib/party-logos';

export const revalidate = 1800;

const UF_NAMES: Record<string, string> = {
  ac: 'Acre', al: 'Alagoas', ap: 'Amapá', am: 'Amazonas', ba: 'Bahia',
  ce: 'Ceará', df: 'Distrito Federal', es: 'Espírito Santo', go: 'Goiás',
  ma: 'Maranhão', mt: 'Mato Grosso', ms: 'Mato Grosso do Sul', mg: 'Minas Gerais',
  pa: 'Pará', pb: 'Paraíba', pr: 'Paraná', pe: 'Pernambuco', pi: 'Piauí',
  rj: 'Rio de Janeiro', rn: 'Rio Grande do Norte', rs: 'Rio Grande do Sul',
  ro: 'Rondônia', rr: 'Roraima', sc: 'Santa Catarina', sp: 'São Paulo',
  se: 'Sergipe', to: 'Tocantins',
};

export async function generateMetadata({ params }: { params: Promise<{ sigla: string }> }): Promise<Metadata> {
  const { sigla } = await params;
  const uf = sigla.toLowerCase();
  const nome = UF_NAMES[uf] ?? sigla.toUpperCase();
  return {
    title: `Guia Eleitoral - ${nome}`,
    description: `Conheça os deputados federais e senadores do ${nome}. Dados oficiais de mandato, gastos, presença e ranking de desempenho.`,
    alternates: { canonical: `https://quemvotar.com.br/uf/${uf}` },
  };
}

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

export default async function UfPage({ params }: { params: Promise<{ sigla: string }> }) {
  const { sigla } = await params;
  const uf = sigla.toLowerCase();
  const nomeUf = UF_NAMES[uf];

  if (!nomeUf) {
    notFound();
  }

  const [parlamentares, partidos] = await Promise.all([getParlamentares(), getPartidos()]);
  const daUf = parlamentares.filter((p) => p.uf?.toLowerCase() === uf);

  if (daUf.length === 0) {
    notFound();
  }

  const deputados = daUf.filter((p) => p.fonte === 'camara');
  const senadores = daUf.filter((p) => p.fonte === 'senado');
  const partidosUf = Array.from(new Set(daUf.map((p) => p.partido))).sort();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <Breadcrumbs
            items={[{ label: nomeUf }]}
          />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3 md:mb-4">
                  Guia Eleitoral - {nomeUf}
                </h1>
                <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
                  Deputados federais e senadores que representam o estado.
                </p>
              </div>
              <ShareButtons
                title={`Guia Eleitoral - ${nomeUf} | QuemVotar`}
                description={`Veja os parlamentares do ${nomeUf} e compare antes de votar.`}
                path={`/uf/${uf}`}
              />
            </div>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <p className="font-headline font-black text-3xl md:text-4xl">{daUf.length}</p>
              <p className="font-label font-bold uppercase text-xs opacity-70 mt-1">Parlamentares</p>
            </div>
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <p className="font-headline font-black text-3xl md:text-4xl">{deputados.length}</p>
              <p className="font-label font-bold uppercase text-xs opacity-70 mt-1">Deputados</p>
            </div>
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <p className="font-headline font-black text-3xl md:text-4xl">{senadores.length}</p>
              <p className="font-label font-bold uppercase text-xs opacity-70 mt-1">Senadores</p>
            </div>
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <p className="font-headline font-black text-3xl md:text-4xl">{partidosUf.length}</p>
              <p className="font-label font-bold uppercase text-xs opacity-70 mt-1">Partidos</p>
            </div>
          </section>

          <section>
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-4 md:mb-6">
              Representantes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {daUf.map((perfil) => {
                const logo = getPartyLogoBySigla(perfil.partido);
                const visual = getPartyVisualEmoji(perfil.partido);

                return (
                  <LoadingLink
                    key={`${perfil.fonte}-${perfil.id}`}
                    href={getPerfilHref(perfil)}
                    className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:scale-[0.97] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 transition-all duration-150 cursor-pointer"
                  >
                    <div className="aspect-square border-b-4 border-black bg-surface-container-high overflow-hidden relative">
                      {perfil.foto_url ? (
                        <Image
                          src={perfil.foto_url}
                          alt={perfil.nome_urna}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover object-top"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-headline font-black text-5xl">
                          {getInitials(perfil.nome_urna)}
                        </div>
                      )}
                    </div>
                    <div className="p-5 md:p-6 space-y-3">
                      <span className="font-label font-bold uppercase text-xs text-on-surface-variant/90">
                        {perfil.casa}
                      </span>
                      <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-none">
                        {perfil.nome_urna}
                      </h2>
                      <div className="flex items-center gap-2">
                        {logo ? (
                          <Image
                            src={logo}
                            alt={`Logo ${perfil.partido}`}
                            width={32}
                            height={32}
                            className="object-contain rounded-full bg-white border-2 border-black p-1"
                          />
                        ) : null}
                        <p className="font-body font-bold uppercase text-sm text-on-surface/90">
                          {visual} {perfil.partido} • {perfil.cargo}
                        </p>
                      </div>
                      <span className="font-headline font-black uppercase border-b-4 border-black inline-block">
                        Abrir perfil
                      </span>
                    </div>
                  </LoadingLink>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
