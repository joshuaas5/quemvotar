import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import CompararClient from '@/components/CompararClient';
import {
  getParlamentares,
  getPerfilBasico,
  getPerfilEnriquecido,
  getPerfilHref,
} from '@/lib/api';
import { getPartyLogoBySigla } from '@/lib/party-logos';

export const metadata: Metadata = {
  title: 'Comparar Parlamentares',
  description:
    'Compare lado a lado dois deputados ou senadores: notas, presença, gastos, governismo e alinhamento político.',
  alternates: { canonical: 'https://quemvotar.com.br/comparar' },
};

function formatScore(value?: number | null) {
  if (typeof value !== 'number') return '-';
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatPercent(value?: number | null) {
  if (typeof value !== 'number') return '-';
  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%`;
}

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

function CompareRow({
  label,
  left,
  right,
  highlight = false,
}: {
  label: string;
  left: React.ReactNode;
  right: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[1fr_120px_1fr] gap-4 items-center border-b-2 border-black/10 py-4 ${
        highlight ? 'bg-surface-container-low' : ''
      }`}
    >
      <div className="text-right order-2 md:order-1 px-4">
        <div className="font-body font-bold">{left}</div>
      </div>
      <div className="text-center order-1 md:order-2">
        <span className="font-label font-bold uppercase text-xs opacity-60 bg-white border-2 border-black px-2 py-1 inline-block">
          {label}
        </span>
      </div>
      <div className="text-left order-3 px-4">
        <div className="font-body font-bold">{right}</div>
      </div>
    </div>
  );
}

export default async function CompararPage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string }>;
}) {
  const { a, b } = await searchParams;

  const parseId = (raw?: string) => {
    if (!raw) return null;
    const [fonte, id] = raw.split('/');
    if (fonte !== 'camara' && fonte !== 'senado') return null;
    return { fonte, id };
  };

  const refA = parseId(a);
  const refB = parseId(b);

  if (!refA || !refB) {
    const parlamentares = await getParlamentares().catch(() => []);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs items={[{ label: 'Comparar' }]} />
            <CompararClient parlamentares={parlamentares} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const [basicoA, basicoB] = await Promise.all([
    getPerfilBasico(refA.fonte as 'camara' | 'senado', refA.id),
    getPerfilBasico(refB.fonte as 'camara' | 'senado', refB.id),
  ]);

  if (!basicoA || !basicoB) {
    notFound();
  }

  const [enriA, enriB] = await Promise.all([
    getPerfilEnriquecido(basicoA.perfil, basicoA.partido),
    getPerfilEnriquecido(basicoB.perfil, basicoB.partido),
  ]);

  const pA = basicoA.perfil;
  const pB = basicoB.perfil;
  const partA = basicoA.partido;
  const partB = basicoB.partido;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-6 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
          <Breadcrumbs items={[{ label: 'Comparar' }]} />

          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-2">
                Comparar Parlamentares
              </h1>
              <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
                Lado a lado: notas, presença, gastos e alinhamento.
              </p>
            </div>
            <ShareButtons
              title={`Compare: ${pA.nome_urna} x ${pB.nome_urna} | QuemVotar`}
              description="Veja a comparação lado a lado entre dois parlamentares."
              path={`/comparar?a=${refA.fonte}/${refA.id}&b=${refB.fonte}/${refB.id}`}
            />
          </section>

          {/* Header cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card A */}
            <article className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div
                className="h-32 md:h-40 border-b-4 border-black relative"
                style={{
                  background: `linear-gradient(135deg, ${partA?.cores?.[0] ?? '#111827'} 0%, ${partA?.cores?.[1] ?? '#d1d5db'} 100%)`,
                }}
              >
                <div className="absolute -bottom-10 left-6 w-24 h-24 md:w-28 md:h-28 border-4 border-black bg-white overflow-hidden">
                  {pA.foto_url ? (
                    <Image src={pA.foto_url} alt={pA.nome_urna} fill sizes="112px" className="object-cover object-top" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-headline font-black text-2xl">
                      {getInitials(pA.nome_urna)}
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-12 pb-6 px-6">
                <p className="font-label font-bold uppercase text-xs opacity-70">
                  {pA.casa} • {pA.partido} • {pA.uf}
                </p>
                <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-none mt-1">
                  {pA.nome_urna}
                </h2>
                <Link
                  href={getPerfilHref(pA)}
                  className="inline-block mt-3 font-headline font-black uppercase text-sm border-b-4 border-black"
                >
                  Ver perfil completo
                </Link>
              </div>
            </article>

            {/* Card B */}
            <article className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div
                className="h-32 md:h-40 border-b-4 border-black relative"
                style={{
                  background: `linear-gradient(135deg, ${partB?.cores?.[0] ?? '#111827'} 0%, ${partB?.cores?.[1] ?? '#d1d5db'} 100%)`,
                }}
              >
                <div className="absolute -bottom-10 left-6 w-24 h-24 md:w-28 md:h-28 border-4 border-black bg-white overflow-hidden">
                  {pB.foto_url ? (
                    <Image src={pB.foto_url} alt={pB.nome_urna} fill sizes="112px" className="object-cover object-top" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-headline font-black text-2xl">
                      {getInitials(pB.nome_urna)}
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-12 pb-6 px-6">
                <p className="font-label font-bold uppercase text-xs opacity-70">
                  {pB.casa} • {pB.partido} • {pB.uf}
                </p>
                <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-none mt-1">
                  {pB.nome_urna}
                </h2>
                <Link
                  href={getPerfilHref(pB)}
                  className="inline-block mt-3 font-headline font-black uppercase text-sm border-b-4 border-black"
                >
                  Ver perfil completo
                </Link>
              </div>
            </article>
          </section>

          {/* Comparison table */}
          <section className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="p-4 md:p-6 border-b-4 border-black bg-surface-container-low">
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase">Métricas principais</h2>
            </div>
            <div className="divide-y-2 divide-black/10">
              <CompareRow
                label="Nota"
                left={
                  <div className="flex flex-col items-end">
                    <span className="font-headline font-black text-3xl">{formatScore(enriA.ranking?.nota)}</span>
                    {enriA.ranking?.rankingGeral ? (
                      <span className="font-label font-bold uppercase text-xs opacity-70">Geral #{enriA.ranking.rankingGeral}</span>
                    ) : null}
                  </div>
                }
                right={
                  <div className="flex flex-col items-start">
                    <span className="font-headline font-black text-3xl">{formatScore(enriB.ranking?.nota)}</span>
                    {enriB.ranking?.rankingGeral ? (
                      <span className="font-label font-bold uppercase text-xs opacity-70">Geral #{enriB.ranking.rankingGeral}</span>
                    ) : null}
                  </div>
                }
                highlight
              />
              <CompareRow
                label="Presença"
                left={
                  <div className="flex flex-col items-end">
                    <span className="font-headline font-black text-3xl">{formatPercent(enriA.presenca?.percentual)}</span>
                    {enriA.presenca ? (
                      <span className="font-label font-bold uppercase text-xs opacity-70">
                        {enriA.presenca.presencas}/{enriA.presenca.sessoesDeliberativas} sessões
                      </span>
                    ) : null}
                  </div>
                }
                right={
                  <div className="flex flex-col items-start">
                    <span className="font-headline font-black text-3xl">{formatPercent(enriB.presenca?.percentual)}</span>
                    {enriB.presenca ? (
                      <span className="font-label font-bold uppercase text-xs opacity-70">
                        {enriB.presenca.presencas}/{enriB.presenca.sessoesDeliberativas} sessões
                      </span>
                    ) : null}
                  </div>
                }
              />
              <CompareRow
                label="Alinhamento"
                left={
                  <div className="flex flex-col items-end">
                    <span className="font-headline font-black text-3xl">{formatPercent(enriA.governismo?.percentualFavoravel)}</span>
                    <span className="font-label font-bold uppercase text-xs opacity-70">apoio ao governo</span>
                  </div>
                }
                right={
                  <div className="flex flex-col items-start">
                    <span className="font-headline font-black text-3xl">{formatPercent(enriB.governismo?.percentualFavoravel)}</span>
                    <span className="font-label font-bold uppercase text-xs opacity-70">apoio ao governo</span>
                  </div>
                }
                highlight
              />
              <CompareRow
                label="Campo"
                left={enriA.espectro?.label ?? partA?.espectro ?? '-'}
                right={enriB.espectro?.label ?? partB?.espectro ?? '-'}
              />
              <CompareRow
                label="Gastos (últimos)"
                left={
                  enriA.despesas.length > 0 ? (
                    <span className="font-headline font-black text-xl">
                      {enriA.despesas.slice(0, 3).reduce((acc, d) => {
                        const val = d.destaque?.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.');
                        return acc + (parseFloat(val || '0') || 0);
                      }, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  ) : (
                    '-'
                  )
                }
                right={
                  enriB.despesas.length > 0 ? (
                    <span className="font-headline font-black text-xl">
                      {enriB.despesas.slice(0, 3).reduce((acc, d) => {
                        const val = d.destaque?.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.');
                        return acc + (parseFloat(val || '0') || 0);
                      }, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  ) : (
                    '-'
                  )
                }
                highlight
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
