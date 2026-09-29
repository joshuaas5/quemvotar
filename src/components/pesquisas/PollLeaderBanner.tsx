import Link from 'next/link';
import { aggregatePolls, brazilToday, formatPercent, formatPollDate } from '@/lib/pesquisas/aggregate';
import { readPollDataset } from '@/lib/pesquisas/read';
import { FotoCandidato } from '@/components/candidatos/FotoCandidato';

const PHOTO_IDS: Record<string, number> = { 'flavio-bolsonaro': 280002551544, lula: 280002542548 };

export async function PollLeaderBanner() {
  const dataset = await readPollDataset();
  const average = aggregatePolls(dataset, brazilToday()).find(group => group.office === 'president' && group.uf === 'BR' && group.round === 2 && group.polls[0]?.scenarioId === 'lula-flavio-bolsonaro-total-vote' && (group.polls[0]?.voteBasis ?? 'total') === 'total');
  const leader = average?.results[0];
  const runner = average?.results[1];
  const tied = leader && runner && Math.round(leader.percent * 10) === Math.round(runner.percent * 10);
  return <section className="bg-[#FFFDF5] px-4 pb-7 sm:px-6 sm:pb-10" aria-labelledby="poll-leader-title">
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] bg-[#111318] p-5 text-white shadow-[5px_5px_0_0_#FFD709] sm:p-9">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" aria-hidden="true" />
      <p className="relative inline-flex rounded-full border border-white/25 px-3 py-1.5 font-label text-[10px] font-black uppercase tracking-[.12em]">Presidente · segundo turno</p>
      <h2 id="poll-leader-title" className="relative mt-5 font-headline text-2xl font-black leading-tight sm:text-4xl">Se o segundo turno fosse hoje?</h2>
      {leader && runner ? <>
        <div className="relative mt-5 flex items-center gap-4 sm:gap-7">
          {!tied && PHOTO_IDS[leader.id] && <div className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-white/30 bg-white sm:h-44 sm:w-36"><FotoCandidato sqEleicao={20322002026} id={PHOTO_IDS[leader.id]} uf="BR" nome={leader.name} iniciaisClassName="font-headline text-3xl font-black text-black" /></div>}
          <div className="min-w-0"><h3 className="font-headline text-[clamp(1.5rem,7vw,4.5rem)] font-black leading-[1.02] tracking-tight text-[#FFD709]">{tied ? `${leader.name} e ${runner.name}` : leader.name}</h3><p className="mt-3 font-body text-base font-semibold sm:text-xl">{tied ? 'empatam na média das pesquisas.' : 'lidera a média das pesquisas.'}</p></div>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-3">
          {[leader, runner].map((candidate, index) => <div key={candidate.id} className={`min-w-0 rounded-2xl border p-4 sm:p-6 ${index === 0 && !tied ? 'border-[#FFD709] bg-[#FFD709] text-black' : 'border-white/25 bg-white/5'}`}><p className="font-body text-xs font-bold sm:text-base">{candidate.name}</p><p className="mt-2 font-headline text-[clamp(2rem,9vw,4rem)] font-black leading-none tabular-nums">{formatPercent(candidate.percent)}</p></div>)}
        </div>
        <p className="relative mt-4 font-body text-xs font-medium text-white/70">Segundo {average!.polls.length} institutos · campo até {formatPollDate(average!.lastFieldDate)}</p>
      </> : <p className="relative mt-5 font-body font-semibold">Novos números aparecem aqui após a conferência das pesquisas.</p>}
      <Link href="/pesquisas?cargo=president&uf=BR&turno=2" className="relative mt-5 flex min-h-12 items-center justify-between rounded-xl bg-white px-4 py-3 font-headline text-sm font-black text-black sm:text-base">Ver todas as pesquisas <span aria-hidden="true">↗</span></Link>
      <p className="relative mt-3 font-body text-[11px] leading-relaxed text-white/65">A média indica intenção de voto neste cenário, sem garantir vitória.</p>
    </div>
  </section>;
}
