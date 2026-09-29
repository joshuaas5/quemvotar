import type { PollAverage } from '@/lib/pesquisas/aggregate';
import { formatPercent, formatPollDate } from '@/lib/pesquisas/aggregate';

const COLORS = ['#FFD709', '#9BF6FF', '#FFB3D9', '#C8FF8C', '#D7B8FF', '#FFC27A'];

export function PollChart({ average, compact = false }: { average: PollAverage; compact?: boolean }) {
  return <div>
    <div className="mb-6 flex flex-wrap items-center gap-2 font-label text-xs font-black uppercase">
      <span className="border-2 border-black bg-black px-3 py-1 text-white">{average.round}º turno · estimulada</span>
      <span className="border-2 border-black bg-white px-3 py-1">{average.polls.length} {average.polls.length === 1 ? 'pesquisa' : 'pesquisas'} · {average.polls.length} {average.polls.length === 1 ? 'instituto' : 'institutos'}</span>
      <span className="border-2 border-black bg-white px-3 py-1">Campo até {formatPollDate(average.lastFieldDate)}</span>
    </div>
    <ol className="space-y-4" aria-label={average.polls.length === 1 ? 'Intenção de voto na pesquisa selecionada' : 'Média descritiva de intenção de voto'}>
      {(compact ? average.results.slice(0, 6) : average.results).map((result, index) => <li key={result.id} className="relative">
        <div className="mb-1 flex items-end justify-between gap-3">
          <span className={`${compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'} font-headline font-black leading-tight`}>{result.name}{result.party && <span className="ml-2 font-label text-xs font-bold opacity-60">{result.party}</span>}</span>
          <span className={`${compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'} shrink-0 font-headline font-black tabular-nums`}>{formatPercent(result.percent)}</span>
        </div>
        <div className={`${compact ? 'h-5' : 'h-7'} overflow-hidden border-2 border-black bg-white`} aria-hidden="true">
          <div className="h-full border-r-2 border-black transition-[width] duration-300" style={{ width: `${result.percent}%`, backgroundColor: COLORS[index % COLORS.length] }} />
        </div>
      </li>)}
    </ol>
    {compact && average.results.length > 6 && <p className="mt-3 font-body text-sm font-bold">Os seis maiores percentuais. Veja todos os candidatos no agregador completo.</p>}
    {average.results.length === 0 && <p className="border-2 border-black bg-white p-4 font-body font-bold">Os candidatos não aparecem em todas as pesquisas deste grupo. Consulte os resultados individuais abaixo.</p>}
    <p className="mt-5 font-body text-sm font-semibold leading-relaxed">{average.polls.length > 1 ? 'Cada instituto tem o mesmo peso. A média considera sua pesquisa mais recente neste cenário; ela não prevê o resultado da eleição e não tem margem de erro própria.' : 'Há uma única pesquisa comparável nesta janela. Os números acima são os resultados desse levantamento, sem combinação com outros cenários.'}</p>
    {average.excludedCandidates.length > 0 && <p className="mt-2 font-body text-sm leading-relaxed">Fora da média por não aparecerem em todos os levantamentos: {average.excludedCandidates.join(', ')}. Ausência não conta como zero.</p>}
    {average.office === 'senate' && <p className="mt-2 font-body text-sm font-bold">{average.senateVote === 'two-votes' ? 'O eleitor escolhe dois senadores em 2026. Neste cenário de duas escolhas, os percentuais podem somar mais de 100%.' : average.senateVote === 'average-two-votes' ? 'O instituto apresenta a média das duas escolhas para senador. Este denominador é diferente da soma das duas escolhas; não combinamos os dois formatos.' : average.senateVote === 'first-vote' ? 'Este cenário mede apenas a primeira escolha para senador; não é somado à segunda escolha.' : average.senateVote === 'second-vote' ? 'Este cenário mede apenas a segunda escolha para senador; não é somado à primeira escolha.' : 'Este cenário mede uma escolha para senador. Ele não é combinado com cenários de duas escolhas.'}</p>}
  </div>;
}
