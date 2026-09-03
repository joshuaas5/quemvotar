import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import LoadingLink from '@/components/LoadingLink';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import PageHero from '@/components/PageHero';
import { getParlamentares, getPerfilHref } from '@/lib/api';
import { getPartyLogoBySigla, getPartyVisualEmoji } from '@/lib/party-logos';
import { getUfEditorialByUf } from '@/lib/uf-editorial-utils';
import { SITE } from '@/lib/site-config';
import { AdLeaderboard } from '@/components/ads/Adsterra';

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
  // Fase 3.4: a pagina volta a ser indexavel quando recebe conteudo editorial proprio.
  const hasEditorial = getUfEditorialByUf(uf) !== null;
  return {
    title: `Guia Eleitoral - ${nome}`,
    description: `Conheça os deputados federais e senadores do ${nome}. Dados oficiais de mandato, gastos, presença e ranking de desempenho.`,
    alternates: { canonical: `https://www.quemvotar.com.br/uf/${uf}` },
    robots: hasEditorial ? { index: true, follow: true } : { index: false, follow: true },
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
  const editorial = getUfEditorialByUf(uf);

  if (!nomeUf) {
    notFound();
  }

  const parlamentares = await getParlamentares();
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

      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <AdLeaderboard />
          <Breadcrumbs
            items={[{ label: nomeUf }]}
          />

          <section className="space-y-4">
            <PageHero
              eyebrow="Guia estadual"
              title={`Guia Eleitoral - ${nomeUf}`}
              description="Deputados federais e senadores que representam o estado."
              accent="green"
              stat={{ value: daUf.length.toLocaleString('pt-BR'), label: 'Parlamentares encontrados para esta UF.' }}
            />
            <ShareButtons
              title={`Guia Eleitoral - ${nomeUf} | QuemVotar`}
              description={`Veja os parlamentares do ${nomeUf} e compare antes de votar.`}
              path={`/uf/${uf}`}
            />
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

          {editorial ? (
            <>
              <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-6">
                <p className="font-label font-black uppercase text-xs bg-black text-white px-3 py-1 w-max">
                  Análise editorial • Atualizado em {new Date(editorial.atualizadoEm).toLocaleDateString('pt-BR')}
                </p>
                <h2 className="font-headline font-black text-2xl md:text-4xl uppercase leading-tight">
                  {editorial.bancada.titulo}
                </h2>
                {editorial.bancada.paragrafos.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-base md:text-lg">{paragraph}</p>
                ))}
              </section>

              <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-6">
                <h2 className="font-headline font-black text-2xl md:text-4xl uppercase leading-tight">
                  {editorial.temas.titulo}
                </h2>
                {editorial.temas.paragrafos.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-base md:text-lg">{paragraph}</p>
                ))}
              </section>

              <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-6">
                <h2 className="font-headline font-black text-2xl md:text-4xl uppercase leading-tight">
                  {editorial.historia.titulo}
                </h2>
                {editorial.historia.paragrafos.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-base md:text-lg">{paragraph}</p>
                ))}
              </section>

              {editorial.fontes.length > 0 ? (
                <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-headline font-black text-2xl md:text-3xl uppercase mb-4">Fontes desta análise</h2>
                  <div className="space-y-3">
                    {editorial.fontes.map((fonte) => (
                      <a
                        key={fonte.href}
                        href={fonte.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block font-headline font-black uppercase border-b-4 border-black w-max max-w-full truncate"
                      >
                        {fonte.label}
                      </a>
                    ))}
                  </div>
                  <p className="mt-6 font-body text-sm leading-relaxed">
                    Análise assinada pela equipe editorial do QuemVotar ({SITE.publisherName}). Este texto
                    não representa recomendação de voto nem posição de partido, candidato ou órgão público.
                  </p>
                </section>
              ) : null}
            </>
          ) : null}

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-body space-y-4">
            <h2 className="font-headline font-black text-2xl md:text-3xl uppercase">
              Como usar este guia estadual
            </h2>
            <p className="font-medium leading-relaxed">
              Esta página organiza os parlamentares que representam {nomeUf} no Congresso Nacional. O objetivo é facilitar a consulta por UF, partido e casa legislativa antes de comparar perfis individuais.
            </p>
            <p className="font-medium leading-relaxed">
              A lista não é ranking eleitoral nem recomendação de voto. Para avaliar cada representante, abra o perfil completo e confira dados de mandato, fontes oficiais, histórico disponível, partido e critérios metodológicos.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <LoadingLink href="/metodologia" className="font-headline font-black uppercase border-b-4 border-black">
                Entender metodologia
              </LoadingLink>
              <LoadingLink href="/comparar" className="font-headline font-black uppercase border-b-4 border-black">
                Comparar parlamentares
              </LoadingLink>
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
