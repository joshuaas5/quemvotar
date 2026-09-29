import Link from 'next/link';
import { aggregatePolls, brazilToday, formatPercent, formatPollDate, type PollAverage } from '@/lib/pesquisas/aggregate';
import { readPollDataset } from '@/lib/pesquisas/read';

function LeaderPanel({ average, round }: { average?: PollAverage; round: 1 | 2 }) {
  const leader = average?.results[0];
  const runnerUp = average?.results[1];
  const tied = leader && runnerUp && Math.round(leader.percent * 10) === Math.round(runnerUp.percent * 10);
  return <article className="flex flex-col border-4 border-black bg-white p-5 shadow-[4px_4px_0_0_#000] sm:p-6">
    <p className="font-label text-xs font-black uppercase">Presidente · {round}º turno{round === 2 ? ' · cenário Lula × Flávio' : ''}</p>
    {leader ? <>
      <p className="mt-4 font-body text-sm font-bold">{tied ? 'Empate numérico na média arredondada' : 'Maior percentual na média'}</p>
      <h3 className="mt-1 font-headline text-3xl font-black uppercase leading-tight sm:text-4xl">{tied ? `${leader.name} e ${runnerUp!.name}` : leader.name}</h3>
      <p className="mt-2 font-headline text-5xl font-black tabular-nums sm:text-6xl">{formatPercent(leader.percent)}</p>
      {runnerUp && <p className="mt-3 font-body font-bold">{tied ? 'Também' : 'Em seguida'}: {runnerUp.name} · {formatPercent(runnerUp.percent)}</p>}
      <p className="mt-4 font-body text-xs font-semibold leading-relaxed">{average!.polls.length} instituto{average!.polls.length !== 1 ? 's' : ''} · coleta de {formatPollDate(average!.firstFieldDate)} a {formatPollDate(average!.lastFieldDate)} · intenção estimulada no total da amostra.</p>
    </> : <p className="my-6 font-body font-semibold">Ainda não há média de pesquisas verificadas para este cenário na janela atual.</p>}
    <Link href={`/pesquisas?cargo=president&uf=BR&turno=${round}`} className="mt-5 block border-2 border-black bg-[#FFD709] px-3 py-3 text-center font-headline font-black uppercase hover:bg-[#9BF6FF]">Conferir números e fontes →</Link>
  </article>;
}

export async function PollLeaderBanner() {
  const dataset = await readPollDataset();
  const averages = aggregatePolls(dataset, brazilToday());
  const select = (round: 1 | 2, scenario: string) => averages.find(average => average.office === 'president' && average.uf === 'BR' && average.round === round && average.polls[0]?.scenarioId === scenario && (average.polls[0]?.voteBasis ?? 'total') === 'total');
  return <section className="border-y-4 border-black bg-[#C8FF8C] px-4 py-7 text-black sm:px-6 sm:py-10" aria-labelledby="poll-leader-title">
    <div className="mx-auto max-w-6xl">
      <p className="font-label text-xs font-black uppercase">Quem lidera a média das pesquisas?</p>
      <h2 id="poll-leader-title" className="mt-2 font-headline text-3xl font-black uppercase leading-tight sm:text-5xl">Se a eleição fosse hoje?</h2>
      <p className="mt-3 font-body font-bold">Veja a média das pesquisas — intenção de voto não é resultado.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2"><LeaderPanel round={1} average={select(1, 'president-registered-2026-total-vote')} /><LeaderPanel round={2} average={select(2, 'lula-flavio-bolsonaro-total-vote')} /></div>
      <p className="mt-5 font-body text-xs font-semibold leading-relaxed">Média descritiva das pesquisas compatíveis dos últimos {dataset.maxAgeDays} dias, usando o levantamento mais recente de cada instituto com o mesmo peso. A ordem numérica não demonstra vantagem estatística e não prevê quem será eleito. O segundo turno é um cenário pesquisado; os finalistas ainda não estão definidos.</p>
    </div>
  </section>;
}
