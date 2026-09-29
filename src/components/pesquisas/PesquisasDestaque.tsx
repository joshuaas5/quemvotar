import Link from 'next/link';
import { aggregatePolls, brazilToday, formatPollDate } from '@/lib/pesquisas/aggregate';
import { readPollDataset } from '@/lib/pesquisas/read';
import type { PollDataset } from '@/lib/pesquisas/types';
import { PollChart } from './PollChart';
import { PollSources } from './PollSources';

export async function PesquisasDestaque({ dataset }: { dataset?: PollDataset } = {}) {
  const data = dataset ?? await readPollDataset();
  const today = brazilToday();
  const groups = aggregatePolls(data, today);
  const presidential = groups.find((group) => group.office === 'president' && group.uf === 'BR' && group.round === 1);
  const states = new Set(groups.filter((group) => group.office !== 'president' && group.round === 1).map((group) => group.uf));
  return <section className="border-y-4 border-black bg-[#FFD709] px-4 py-10 text-black sm:px-6 sm:py-14" aria-labelledby="pesquisas-home-title">
    <div className="mx-auto max-w-6xl">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <p className="border-2 border-black bg-black px-3 py-1 font-label text-sm font-black uppercase text-white">Pesquisas eleitorais · 2026</p>
        <span className="border-2 border-black bg-white px-3 py-1 font-label text-xs font-bold uppercase">Janela de {data.maxAgeDays} dias · fontes identificadas</span>
      </div>
      <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 id="pesquisas-home-title" className="font-headline text-4xl font-black uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">Como está a corrida <span className="mt-1 inline-block bg-black px-2 pb-1 text-[#FFD709]">para presidente?</span></h2>
          <p className="mt-5 font-body text-lg font-bold leading-relaxed">Compare as pesquisas, veja os números e confira de onde eles vêm. Presidente em destaque; governador e Senado por estado.</p>
          <Link href="/pesquisas" className="mt-6 flex items-center justify-between gap-4 border-4 border-black bg-[#FF4D8D] px-5 py-4 font-headline text-xl font-black uppercase shadow-[6px_6px_0_0_#000] transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#000]">Ver o agregador completo <span aria-hidden="true">→</span></Link>
          <div className="mt-5 grid grid-cols-2 gap-3 font-headline font-black uppercase">
            <Link href="/pesquisas?cargo=governor&uf=SP" className="border-2 border-black bg-white px-3 py-4 hover:bg-[#9BF6FF]">Governador<br /><span className="font-body text-xs normal-case">Escolha seu estado →</span></Link>
            <Link href="/pesquisas?cargo=senate&uf=SP" className="border-2 border-black bg-white px-3 py-4 hover:bg-[#C8FF8C]">Senado<br /><span className="font-body text-xs normal-case">Confira as duas vagas →</span></Link>
          </div>
          <p className="mt-4 font-body text-sm font-semibold">27 estados disponíveis para consulta. {states.size > 0 ? `${states.size} com levantamentos estaduais verificados na janela atual.` : 'A inclusão de dados depende da verificação da pesquisa e do registro no TSE.'}</p>
        </div>
        <div className="border-4 border-black bg-[#FFFDF5] p-5 shadow-[8px_8px_0_0_#000] sm:p-6">
          <h3 className="mb-1 font-headline text-2xl font-black uppercase">Presidente · Brasil</h3>
          {presidential ? <><p className="mb-4 font-label text-xs font-bold uppercase">{presidential.polls.length > 1 ? 'Média descritiva' : 'Pesquisa mais recente'} · {presidential.label}</p><PollChart average={presidential} compact /><Link href="/pesquisas" className="mt-5 block border-2 border-black bg-[#9BF6FF] px-3 py-3 text-center font-headline font-black uppercase">Ver cenários e metodologia →</Link></> : <><p className="mt-5 border-2 border-black bg-[#9BF6FF] p-4 font-headline text-xl font-black">Sem pesquisas nacionais verificadas na janela atual.</p><p className="mt-4 font-body font-semibold leading-relaxed">Os números aparecem quando há uma fonte identificada, os dados completos do levantamento e seu registro no TSE. Nenhum percentual é estimado para preencher lacunas.</p><Link href="/pesquisas" className="mt-5 block border-2 border-black bg-black px-4 py-3 text-center font-headline font-black uppercase text-white">Consultar cobertura e fontes →</Link></>}
        </div>
      </div>
      {presidential && <div className="mt-8"><PollSources polls={presidential.polls} compact /></div>}
      <p className="mt-6 font-body text-xs font-semibold">Consulta em {formatPollDate(today)}. Pesquisas retratam o momento da coleta; não são resultado da eleição. A combinação descritiva do QuemVotar não é uma nova pesquisa.</p>
    </div>
  </section>;
}
