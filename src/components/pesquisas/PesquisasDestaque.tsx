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
  const presidential = groups.find((group) => group.office === 'president' && group.uf === 'BR' && group.round === 2 && group.polls[0]?.scenarioId === 'lula-flavio-bolsonaro-total-vote');
  const states = new Set(groups.filter((group) => group.office !== 'president' && group.round === 1).map((group) => group.uf));
  return <section id="pesquisas-home" className="h-full border-4 border-black bg-[#FFD709] p-5 text-black shadow-[6px_6px_0_0_#000] sm:p-6" aria-labelledby="pesquisas-home-title">
    <p className="mb-3 inline-block border-2 border-black bg-black px-3 py-1 font-label text-xs font-black uppercase text-white">Pesquisas eleitorais · 2026</p>
    <h2 id="pesquisas-home-title" className="font-headline text-3xl font-black uppercase leading-tight sm:text-4xl">Como está a corrida para presidente?</h2>
    <p className="mt-4 font-body font-semibold leading-relaxed">Compare levantamentos recentes. Presidente em destaque; governo e Senado por estado.</p>
    <Link href="/pesquisas" className="mt-5 flex items-center justify-between border-4 border-black bg-white px-4 py-4 font-headline text-xl font-black uppercase shadow-[4px_4px_0_0_#000] hover:bg-[#9BF6FF]">Ver o agregador completo <span aria-hidden="true">→</span></Link>
    <div className="mt-6 border-2 border-black bg-[#FFFDF5] p-4">
      <h3 className="font-headline text-xl font-black uppercase">Presidente · 2º turno</h3>
      {presidential ? <><p className="mb-4 mt-1 font-label text-xs font-bold uppercase">{presidential.polls.length > 1 ? 'Média descritiva' : 'Pesquisa mais recente'} · {presidential.label}</p><PollChart average={presidential} compact />
        <details className="mt-4 border-t-2 border-black pt-3"><summary className="cursor-pointer font-label text-xs font-black uppercase">Fontes e fichas técnicas · {presidential.polls.length} levantamento{presidential.polls.length !== 1 ? 's' : ''}</summary><div className="mt-4"><PollSources polls={presidential.polls} /></div></details>
      </> : <p className="mt-3 font-body font-semibold">Sem pesquisas nacionais verificadas na janela atual. Consulte a cobertura e as fontes no agregador.</p>}
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3 font-headline text-sm font-black uppercase">
      <Link href="/pesquisas?cargo=governor&uf=SP" className="border-2 border-black bg-white p-3 hover:bg-[#9BF6FF]">Governador →</Link>
      <Link href="/pesquisas?cargo=senate&uf=SP" className="border-2 border-black bg-white p-3 hover:bg-[#C8FF8C]">Senado →</Link>
    </div>
    <p className="mt-4 font-body text-xs font-semibold">26 estados e Distrito Federal para consulta. {states.size} UFs com levantamentos estaduais verificados na janela de {data.maxAgeDays} dias.</p>
    <p className="mt-3 font-body text-xs font-semibold">Consulta em {formatPollDate(today)}.</p>
  </section>;
}
