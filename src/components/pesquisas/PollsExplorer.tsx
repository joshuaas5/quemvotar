'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { aggregatePolls, formatPollDate } from '@/lib/pesquisas/aggregate';
import type { PollDataset, PollOffice } from '@/lib/pesquisas/types';
import { POLL_OFFICES, POLL_UFS } from '@/lib/pesquisas/types';
import { PollChart } from './PollChart';
import { PollSources } from './PollSources';

export function PollsExplorer({ dataset, asOf, initialOffice = 'president', initialUf = 'SP' }: { dataset: PollDataset; asOf: string; initialOffice?: PollOffice; initialUf?: string }) {
  const [office, setOffice] = useState<PollOffice>(initialOffice);
  const [uf, setUf] = useState(initialUf);
  const [round, setRound] = useState<1 | 2>(1);
  const [scenario, setScenario] = useState('');
  const [shareStatus, setShareStatus] = useState('');
  const [institute, setInstitute] = useState('');
  const archive = dataset.polls.filter((poll) => poll.office === office && poll.uf === (office === 'president' ? 'BR' : uf) && poll.round === round && poll.publishedAt <= asOf).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const institutes = [...new Set(archive.map((poll) => poll.institute))].sort();
  const history = archive.filter((poll) => !institute || poll.institute === institute);
  const registrations = new Set(dataset.polls.flatMap((poll) => poll.tseRegistrations ?? [poll.tseRegistration])).size;
  const groups = useMemo(() => aggregatePolls(dataset, asOf), [dataset, asOf]);
  const visible = groups.filter((group) => group.office === office && group.uf === (office === 'president' ? 'BR' : uf) && group.round === round);
  const selected = visible.find((group) => group.id === scenario) ?? visible[0];
  const selectedName = office === 'president' ? 'Brasil' : POLL_UFS.find(([code]) => code === uf)?.[1];
  const hasSecondRound = dataset.polls.some((poll) => poll.office === office && poll.uf === (office === 'president' ? 'BR' : uf) && poll.round === 2 && poll.publishedAt <= asOf);
  const statesWithPolls = new Set(groups.filter((group) => group.office !== 'president').map((group) => group.uf));
  const pollCount = new Set(groups.flatMap((group) => group.polls.map((poll) => poll.id))).size;

  async function share() {
    const url = new URL('/pesquisas', window.location.origin);
    url.searchParams.set('cargo', office);
    if (office !== 'president') url.searchParams.set('uf', uf);
    url.searchParams.set('utm_source', 'compartilhamento');
    const title = `Pesquisas 2026: ${POLL_OFFICES[office]} · ${selectedName}`;
    try {
      if (navigator.share) await navigator.share({ title, text: 'Confira os levantamentos, os cenários comparáveis e as fontes no QuemVotar.', url: url.toString() });
      else { await navigator.clipboard.writeText(url.toString()); setShareStatus('Link copiado!'); }
    } catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setShareStatus('Não foi possível compartilhar. Copie o endereço desta página.'); }
  }

  return <div className="space-y-7">
    <section className="border-4 border-black bg-[#FFD709] p-4 shadow-[6px_6px_0_0_#000] sm:p-6" aria-label="Filtros de pesquisas eleitorais">
      <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Cargo">
        {(Object.keys(POLL_OFFICES) as PollOffice[]).map((value) => <button type="button" key={value} onClick={() => { setOffice(value); setRound(1); setScenario(''); setInstitute(''); }} aria-pressed={office === value} className={`cursor-pointer border-4 border-black px-4 py-4 text-left font-headline text-xl font-black uppercase transition ${office === value ? 'bg-black text-white shadow-[4px_4px_0_0_#FF4D8D]' : 'bg-white text-black hover:bg-[#9BF6FF]'}`}>{POLL_OFFICES[value]}<span className="mt-1 block font-body text-xs font-semibold normal-case">{value === 'president' ? 'A corrida nacional' : value === 'governor' ? 'O governo do seu estado' : 'Duas vagas por estado'}</span></button>)}
      </div>
      <div className="mt-5 grid items-end gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <label className="font-label text-xs font-black uppercase">{office === 'president' ? 'Abrangência' : 'Estado'}<select value={office === 'president' ? 'BR' : uf} disabled={office === 'president'} onChange={(event) => { setUf(event.target.value); setScenario(''); setInstitute(''); }} className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 font-body text-base font-bold text-black disabled:opacity-80">{office === 'president' ? <option value="BR">Brasil · pesquisa nacional</option> : POLL_UFS.map(([code, name]) => <option value={code} key={code}>{code} · {name}</option>)}</select></label>
        <label className="font-label text-xs font-black uppercase">Turno<select value={round} onChange={(event) => { setRound(Number(event.target.value) as 1 | 2); setScenario(''); }} className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 font-body text-base font-bold"><option value="1">1º turno</option>{hasSecondRound && <option value="2">2º turno · cenários separados</option>}</select></label>
        <button type="button" onClick={share} className="cursor-pointer border-2 border-black bg-[#FF4D8D] px-4 py-3 font-headline font-black uppercase">Compartilhar ↗</button>
      </div>
      <p role="status" className="mt-2 font-body text-sm font-bold">{shareStatus}</p>
    </section>

    <section className="border-4 border-black bg-[#FFFDF5] p-5 shadow-[8px_8px_0_0_#000] sm:p-8" aria-labelledby="poll-race-title">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div><p className="mb-2 font-label text-xs font-black uppercase">{selected && selected.polls.length > 1 ? 'Média descritiva · pesos iguais' : 'Intenção de voto · fonte identificada'}</p><h2 id="poll-race-title" className="font-headline text-3xl font-black uppercase leading-tight sm:text-5xl">{POLL_OFFICES[office]} <span className="block text-black/60">{selectedName}</span></h2></div>
        <span className="border-2 border-black bg-[#9BF6FF] px-3 py-2 font-label text-xs font-black uppercase">Últimos {dataset.maxAgeDays} dias de campo</span>
      </div>
      {visible.length > 1 && <label className="mb-6 block font-label text-xs font-black uppercase">Cenário pesquisado<select value={selected?.id ?? ''} onChange={(event) => setScenario(event.target.value)} className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 font-body text-base font-bold normal-case">{visible.map((group) => <option key={group.id} value={group.id}>{group.label} · {group.polls.length} {group.polls.length === 1 ? 'pesquisa' : 'pesquisas'} · campo até {formatPollDate(group.lastFieldDate)}</option>)}</select></label>}
      {selected ? <><p className="mb-4 font-body text-sm font-bold">{selected.label}</p><PollChart average={selected} /></> : <div className="border-2 border-black bg-white px-5 py-8"><p className="font-headline text-2xl font-black">Sem pesquisas verificadas para este recorte.</p><p className="mt-3 max-w-3xl font-body font-semibold leading-relaxed">Não há um levantamento com fonte e registro conferidos para {POLL_OFFICES[office].toLocaleLowerCase('pt-BR')} em {selectedName} no {round}º turno nesta janela. Os filtros cobrem os 26 estados e o Distrito Federal; cobertura de filtros não significa cobertura de dados.</p><p className="mt-3 font-body leading-relaxed">Experimente outro estado ou cargo. Novos resultados entram após verificação das informações do levantamento.</p></div>}
    </section>

    {selected && <PollSources polls={selected.polls} />}

    <section id="historico" className="border-4 border-black bg-[#FFFDF5] p-5 sm:p-7" aria-labelledby="poll-history-title">
      <h2 id="poll-history-title" className="font-headline text-2xl font-black uppercase">Todas as publicações do acervo</h2>
      <p className="mt-2 font-body text-sm font-semibold">Veja cada divulgação de {POLL_OFFICES[office].toLocaleLowerCase('pt-BR')} em {selectedName}, incluindo rodadas anteriores e cenários diferentes. Pesquisas fora da janela não entram na média acima.</p>
      <label className="my-5 block font-label text-xs font-black uppercase">Filtrar por instituto<select value={institutes.includes(institute) ? institute : ''} onChange={(event) => setInstitute(event.target.value)} className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 font-body text-base font-bold"><option value="">Todos os institutos · {archive.length} recortes</option>{institutes.map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
      <p className="mb-4 font-body text-sm font-bold">{history.length} recortes · {new Set(history.flatMap((poll) => poll.tseRegistrations ?? [poll.tseRegistration])).size} registros de pesquisa</p>
      {history.length ? <PollSources polls={history} /> : <p className="font-body font-semibold">Ainda não há publicações verificadas neste filtro.</p>}
    </section>

    <section id="metodologia" className="border-4 border-black bg-[#9BF6FF] p-5 sm:p-7" aria-labelledby="poll-method-title">
      <h2 id="poll-method-title" className="font-headline text-2xl font-black uppercase">Como ler estes números</h2>
      <div className="mt-4 grid gap-5 font-body text-sm font-semibold leading-relaxed md:grid-cols-2">
        <p><strong className="block font-headline text-base uppercase">A média é uma descrição</strong>Consideramos pesquisas estimuladas com fim do campo nos últimos {dataset.maxAgeDays} dias, já divulgadas. Cada instituto contribui com o seu levantamento mais recente para cada cenário e recebe o mesmo peso. Não fazemos previsão eleitoral, ponderação por tamanho da amostra nem intervalo de confiança combinado.</p>
        <p><strong className="block font-headline text-base uppercase">Cenários precisam ser comparáveis</strong>Presidente nacional, governador e Senado de cada UF são recortes separados. Também separamos os turnos, as listas de candidatos e, no Senado, soma das duas escolhas, média das duas escolhas, primeira escolha e segunda escolha. Não juntamos pesquisa espontânea com estimulada.</p>
        <p><strong className="block font-headline text-base uppercase">Dado ausente não vira zero</strong>Um candidato só aparece na média se seu percentual está explicitamente informado em todos os levantamentos usados naquele grupo. Brancos, nulos e indecisos permanecem nos resultados individuais. Não recalculamos percentuais como votos válidos.</p>
        <p><strong className="block font-headline text-base uppercase">Cada levantamento tem suas limitações</strong>As margens de erro e o nível de confiança são do levantamento original. Diferenças menores que essas margens exigem cautela; a ordem das barras não demonstra uma vantagem estatisticamente significativa. Consulte a fonte para o questionário, a amostragem e o método completo.</p>
      </div>
      <p className="mt-5 border-t-2 border-black pt-4 font-body text-sm font-semibold">Fonte da regra de divulgação: <a className="underline underline-offset-4" target="_blank" rel="noopener noreferrer" href="https://www.tse.jus.br/legislacao/compilada/res/2019/resolucao-no-23-600-de-12-de-dezembro-de-2019">Resolução TSE nº 23.600/2019, art. 10 ↗</a>. Os levantamentos originais podem ser consultados no <a href="https://pesqele-divulgacao.tse.jus.br/app/pesquisa/listar.xhtml" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">PesqEle do TSE ↗</a>.</p>
    </section>

    <section className="border-2 border-black bg-white p-5" aria-label="Cobertura e atualização">
      <h2 className="font-headline text-xl font-black uppercase">Cobertura e atualização</h2>
      <p className="mt-2 font-body text-sm font-semibold">{registrations} registros no acervo · {pollCount} {pollCount === 1 ? 'recorte elegível' : 'recortes elegíveis'} · {statesWithPolls.size} UFs com dados estaduais nesta janela · consulta em {formatPollDate(asOf)}.{dataset.updatedAt && ` Base atualizada em ${formatPollDate(dataset.updatedAt.slice(0, 10))}.`}</p>
      <p className="mt-2 font-body text-sm font-bold">Institutos no acervo: {[...new Set(dataset.polls.map((poll) => poll.institute))].sort().join(' · ')}.</p>
      {dataset.coverageNote && <p className="mt-2 font-body text-sm leading-relaxed">{dataset.coverageNote}</p>}
      <p className="mt-2 font-body text-sm leading-relaxed">A publicação de uma pesquisa depende da checagem da fonte, do registro e dos dados exigidos para divulgação. A página mostra as lacunas e não preenche estados ou candidatos com números estimados.</p>
    </section>
    <div className="grid gap-3 font-headline font-black uppercase sm:grid-cols-2"><Link href="/match/candidatos" className="border-4 border-black bg-[#FF4D8D] p-5">Descobrir meu Match 2026 →</Link><Link href="/minha-urna" className="border-4 border-black bg-[#C8FF8C] p-5">Montar e imprimir minha cola →</Link></div>
  </div>;
}
