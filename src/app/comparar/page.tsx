import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import CompararClient from '@/components/CompararClient';
import PageHero from '@/components/PageHero';
import {
  getParlamentares,
  getPerfilBasico,
  getPerfilEnriquecido,
  getPerfilHref,
} from '@/lib/api';

export const metadata: Metadata = {
  title: 'Comparar Parlamentares',
  description:
    'Compare lado a lado dois deputados ou senadores: notas, presença, gastos e alinhamento com governo.',
  alternates: { canonical: 'https://www.quemvotar.com.br/comparar' },
  robots: { index: false, follow: true },
};

function formatScore(value?: number | null) {
  if (typeof value !== 'number') return '-';
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatPercent(value?: number | null) {
  if (typeof value !== 'number') return '-';
  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%`;
}

function sumTopExpenses(despesas: { destaque?: string }[]) {
  if (despesas.length === 0) return null;

  return despesas.slice(0, 3).reduce((acc, despesa) => {
    const value = despesa.destaque?.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.');
    return acc + (parseFloat(value || '0') || 0);
  }, 0);
}

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

const ROW_ACCENTS = {
  neutral: 'bg-white',
  yellow: 'bg-[#FFF4C2]',
  cyan: 'bg-[#D7F6FF]',
  pink: 'bg-[#FFE1F0]',
  green: 'bg-[#E9FFD2]',
  orange: 'bg-[#FFE0C7]',
  purple: 'bg-[#EFE2FF]',
};

function CompareRow({
  label,
  left,
  right,
  accent = 'neutral',
}: {
  label: string;
  left: React.ReactNode;
  right: React.ReactNode;
  accent?: keyof typeof ROW_ACCENTS;
}) {
  return (
    <div className={`${ROW_ACCENTS[accent]} border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_150px_1fr] gap-3 md:gap-4 items-stretch">
        <div className="bg-white border-2 border-black p-4 min-h-[84px] flex items-center md:justify-end text-left md:text-right">
          <div className="font-body font-bold w-full">{left}</div>
        </div>
        <div className="bg-black text-white border-2 border-black p-3 flex flex-col items-center justify-center text-center min-h-[72px]">
          <span className="font-label font-black uppercase text-[11px] opacity-70">Comparando</span>
          <span className="font-headline font-black uppercase text-sm leading-tight mt-1">{label}</span>
        </div>
        <div className="bg-white border-2 border-black p-4 min-h-[84px] flex items-center text-left">
          <div className="font-body font-bold w-full">{right}</div>
        </div>
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
        <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6">
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
  const gastosA = sumTopExpenses(enriA.despesas);
  const gastosB = sumTopExpenses(enriB.despesas);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow qv-grid-bg py-6 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
          <Breadcrumbs items={[{ label: 'Comparar' }]} />

          <section className="space-y-4">
            <PageHero
              eyebrow="Análise lado a lado"
              title="Comparar Parlamentares"
              description="Lado a lado: notas, presença, gastos, partido e alinhamento com governo."
              accent="orange"
              stat={{ value: '2 perfis', label: `${pA.nome_urna} versus ${pB.nome_urna}.` }}
            />
            <ShareButtons
              title={`Compare: ${pA.nome_urna} x ${pB.nome_urna} | QuemVotar`}
              description="Veja a comparação lado a lado entre dois parlamentares."
              path={`/comparar?a=${refA.fonte}/${refA.id}&b=${refB.fonte}/${refB.id}`}
            />
          </section>

          {/* Header cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card A */}
            <article className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="grid grid-cols-[132px_minmax(0,1fr)] sm:grid-cols-[180px_minmax(0,1fr)] min-h-[240px]">
                <div
                  className="relative border-r-4 border-black"
                  style={{
                    background: `linear-gradient(160deg, ${partA?.cores?.[0] ?? '#111827'} 0%, ${partA?.cores?.[1] ?? '#d1d5db'} 100%)`,
                  }}
                >
                  <div className="absolute inset-3 border-4 border-black bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                    {pA.foto_url ? (
                      <Image src={pA.foto_url} alt={pA.nome_urna} fill sizes="180px" className="object-cover object-top" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-headline font-black text-3xl">
                        {getInitials(pA.nome_urna)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-5 md:p-6 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-black text-white border-2 border-black px-2 py-1 font-label font-black uppercase text-[11px]">
                      {pA.fonte === 'camara' ? 'Câmara' : 'Senado'}
                    </span>
                    <span className="bg-[#FFD709] text-black border-2 border-black px-2 py-1 font-label font-black uppercase text-[11px]">
                      {pA.partido} / {pA.uf ?? '-'}
                    </span>
                  </div>
                  <div>
                    <p className="font-label font-bold uppercase text-xs opacity-70">Perfil A</p>
                    <h2 className="font-headline font-black text-3xl md:text-4xl uppercase leading-none mt-1">
                      {pA.nome_urna}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="bg-[#FFF4C2] border-2 border-black p-2">
                      <p className="font-label font-black uppercase text-[10px] opacity-70">Nota</p>
                      <p className="font-headline font-black text-xl">{formatScore(enriA.ranking?.nota)}</p>
                    </div>
                    <div className="bg-[#D7F6FF] border-2 border-black p-2">
                      <p className="font-label font-black uppercase text-[10px] opacity-70">Presença</p>
                      <p className="font-headline font-black text-xl">{formatPercent(enriA.presenca?.percentual)}</p>
                    </div>
                    <div className="bg-[#FFE1F0] border-2 border-black p-2">
                      <p className="font-label font-black uppercase text-[10px] opacity-70">Governo</p>
                      <p className="font-headline font-black text-xl">{formatPercent(enriA.governismo?.percentualFavoravel)}</p>
                    </div>
                  </div>
                <Link
                  href={getPerfilHref(pA)}
                  className="mt-auto inline-block bg-black text-white border-4 border-black px-4 py-2 font-headline font-black uppercase text-sm hover:bg-primary-container hover:text-black transition-colors w-max"
                >
                  Ver perfil completo
                </Link>
                </div>
              </div>
            </article>

            {/* Card B */}
            <article className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="grid grid-cols-[132px_minmax(0,1fr)] sm:grid-cols-[180px_minmax(0,1fr)] min-h-[240px]">
                <div
                  className="relative border-r-4 border-black"
                  style={{
                    background: `linear-gradient(160deg, ${partB?.cores?.[0] ?? '#111827'} 0%, ${partB?.cores?.[1] ?? '#d1d5db'} 100%)`,
                  }}
                >
                  <div className="absolute inset-3 border-4 border-black bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                    {pB.foto_url ? (
                      <Image src={pB.foto_url} alt={pB.nome_urna} fill sizes="180px" className="object-cover object-top" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-headline font-black text-3xl">
                        {getInitials(pB.nome_urna)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-5 md:p-6 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-black text-white border-2 border-black px-2 py-1 font-label font-black uppercase text-[11px]">
                      {pB.fonte === 'camara' ? 'Câmara' : 'Senado'}
                    </span>
                    <span className="bg-[#9BF6FF] text-black border-2 border-black px-2 py-1 font-label font-black uppercase text-[11px]">
                      {pB.partido} / {pB.uf ?? '-'}
                    </span>
                  </div>
                  <div>
                    <p className="font-label font-bold uppercase text-xs opacity-70">Perfil B</p>
                    <h2 className="font-headline font-black text-3xl md:text-4xl uppercase leading-none mt-1">
                      {pB.nome_urna}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="bg-[#FFF4C2] border-2 border-black p-2">
                      <p className="font-label font-black uppercase text-[10px] opacity-70">Nota</p>
                      <p className="font-headline font-black text-xl">{formatScore(enriB.ranking?.nota)}</p>
                    </div>
                    <div className="bg-[#D7F6FF] border-2 border-black p-2">
                      <p className="font-label font-black uppercase text-[10px] opacity-70">Presença</p>
                      <p className="font-headline font-black text-xl">{formatPercent(enriB.presenca?.percentual)}</p>
                    </div>
                    <div className="bg-[#FFE1F0] border-2 border-black p-2">
                      <p className="font-label font-black uppercase text-[10px] opacity-70">Governo</p>
                      <p className="font-headline font-black text-xl">{formatPercent(enriB.governismo?.percentualFavoravel)}</p>
                    </div>
                  </div>
                <Link
                  href={getPerfilHref(pB)}
                  className="mt-auto inline-block bg-black text-white border-4 border-black px-4 py-2 font-headline font-black uppercase text-sm hover:bg-primary-container hover:text-black transition-colors w-max"
                >
                  Ver perfil completo
                </Link>
                </div>
              </div>
            </article>
          </section>

          {/* Comparison table */}
          <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="p-4 md:p-6 border-b-4 border-black bg-[#111827] text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="font-headline font-black text-xl md:text-2xl uppercase">Métricas principais</h2>
                  <p className="font-body font-bold text-sm uppercase opacity-70 mt-1">
                    Compare sinais objetivos, mas abra os perfis para ver contexto e fontes.
                  </p>
                </div>
                <Link href="/comparar" className="bg-black text-white border-4 border-black px-4 py-2 font-headline font-black uppercase text-sm hover:bg-primary-container hover:text-black transition-colors w-max">
                  Trocar seleção
                </Link>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <CompareRow
                label="Cargo"
                left={pA.cargo}
                right={pB.cargo}
                accent="purple"
              />
              <CompareRow
                label="Partido / UF"
                left={`${pA.partido} / ${pA.uf ?? '-'}`}
                right={`${pB.partido} / ${pB.uf ?? '-'}`}
                accent="green"
              />
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
                accent="yellow"
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
                accent="cyan"
              />
              <CompareRow
                label="Alinhamento com governo"
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
                accent="pink"
              />
              <CompareRow
                label="Campo"
                left={enriA.espectro?.label ?? partA?.espectro ?? '-'}
                right={enriB.espectro?.label ?? partB?.espectro ?? '-'}
                accent="green"
              />
              <CompareRow
                label="Gastos (últimos)"
                left={
                  gastosA !== null ? (
                    <span className="font-headline font-black text-xl">
                      {gastosA.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  ) : (
                    '-'
                  )
                }
                right={
                  gastosB !== null ? (
                    <span className="font-headline font-black text-xl">
                      {gastosB.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  ) : (
                    '-'
                  )
                }
                accent="orange"
              />
            </div>
          </section>

          <section className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-2xl uppercase mb-3">Como ler esta comparação</h2>
            <p className="font-body font-bold leading-relaxed">
              A comparação não recomenda voto. Ela coloca dados públicos lado a lado para mostrar diferença de atuação, presença, partido, campo político aproximado e apoio ao governo nas votações monitoradas.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
