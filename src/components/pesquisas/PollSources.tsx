import { formatPercent, formatPollDate } from '@/lib/pesquisas/aggregate';
import type { ElectoralPoll } from '@/lib/pesquisas/types';

export function PollSources({ polls, compact = false }: { polls: ElectoralPoll[]; compact?: boolean }) {
  return <div className="space-y-3">
    <h3 className="font-headline text-xl font-black uppercase">{polls.length === 1 ? 'Pesquisa utilizada' : 'Pesquisas utilizadas'} · fontes abertas</h3>
    <div className={`grid gap-3 ${compact ? 'lg:grid-cols-2' : ''}`}>
      {polls.map((poll) => <article key={poll.id} className="border-2 border-black bg-white p-4 text-black">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h4 className="font-headline text-lg font-black">{poll.institute}</h4>
          <a href={poll.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-label text-xs font-black uppercase underline underline-offset-4">Abrir fonte ↗</a>
        </div>
        <p className="mt-2 font-body text-sm font-semibold leading-relaxed">Campo: {formatPollDate(poll.fieldStart)} a {formatPollDate(poll.fieldEnd)} · Divulgação: {formatPollDate(poll.publishedAt)} · {new Intl.NumberFormat('pt-BR').format(poll.sampleSize)} entrevistados · Margem de erro: ±{poll.marginOfError.toLocaleString('pt-BR')} pontos percentuais · Confiança: {poll.confidenceLevel.toLocaleString('pt-BR')}%.</p>
        <p className="mt-2 font-body text-sm leading-relaxed"><strong>Contratante:</strong> {poll.contractor}. <strong>Registro TSE:</strong> {poll.tseRegistration}. <strong>Fonte:</strong> {poll.sourceLabel}.</p>
        <p className="mt-2 font-body text-sm leading-relaxed"><strong>Cenário:</strong> {poll.scenarioLabel} · {poll.round}º turno · intenção estimulada.</p>
        <details className="mt-3 border-t-2 border-black pt-2">
          <summary className="cursor-pointer font-label text-xs font-black uppercase">Ver todos os números deste levantamento</summary>
          <dl className="mt-3 grid gap-1 font-body text-sm">
            {poll.results.map((result) => <div key={result.id} className="flex justify-between gap-4 border-b border-black/10 py-1"><dt>{result.name}{result.party ? ` (${result.party})` : ''}</dt><dd className="font-bold tabular-nums">{formatPercent(result.percent)}</dd></div>)}
          </dl>
        </details>
      </article>)}
    </div>
  </div>;
}
