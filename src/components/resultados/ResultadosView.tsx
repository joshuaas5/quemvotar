'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UF_LISTA } from '@/lib/candidatos/ufs';
import { rotuloCargo } from '@/lib/candidatos/minha-urna';
import { useMinhaUrna } from '@/components/candidatos/MinhaUrnaProvider';
import { ShareTool } from '@/components/sharing/ShareTool';
import type { ResultadoTse } from '@/lib/resultados/tse';
const normalizar = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function ResultadosView() {
  const { items } = useMinhaUrna();
  const [uf, setUf] = useState('BR');
  const [cargo, setCargo] = useState(1);
  const [turno, setTurno] = useState(1);
  const [busca, setBusca] = useState('');
  const [soMinhaUrna, setSoMinhaUrna] = useState(false);
  const [limite, setLimite] = useState(30);
  const [dados, setDados] = useState<ResultadoTse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); let timer: ReturnType<typeof setTimeout>;
    setDados(null); setCarregando(true); setLimite(30);
    const carregar = async () => {
      if (document.hidden) { timer = setTimeout(carregar, 60_000); return; }
      try {
        const response = await fetch(`/api/resultados?uf=${uf}&cargo=${cargo}&turno=${turno}`, { signal: controller.signal });
        if (!response.ok) throw new Error('indisponível');
        const data: ResultadoTse = await response.json();
        if (controller.signal.aborted) return;
        setDados(data);
        if (!data.finalizada && data.fase !== 'sem-disputa') {
          const delay = data.fase === 'agendada' ? Math.max(60_000, Math.min(3_600_000, Date.parse(data.inicio) - Date.now())) : 60_000;
          timer = setTimeout(carregar, delay);
        }
      } catch {
        if (!controller.signal.aborted) { setDados({ fase: 'indisponivel', uf, cargo, turno: turno as 1 | 2, inicio: '', fonte: 'https://resultados.tse.jus.br/' }); timer = setTimeout(carregar, 60_000); }
      } finally { if (!controller.signal.aborted) setCarregando(false); }
    };
    carregar();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [uf, cargo, turno, retry]);
  const candidatos = (dados?.candidatos ?? []).filter((c) => {
    const termo = normalizar(busca.trim());
    const selected = items.some((i) => i.cargoCodigo === cargo && (cargo === 1 || i.uf === uf) && (String(i.id) === c.id || String(i.numero) === c.numero));
    return (!termo || normalizar(`${c.nome} ${c.numero} ${c.partido}`).includes(termo)) && (!soMinhaUrna || selected);
  });
  const segundoTurno = dados?.candidatos?.filter((c) => /2.*turno/i.test(c.situacao)) ?? [];
  return <div className="space-y-6">
    <section className="border-4 border-black bg-white p-5 space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <label className="font-body font-bold">Estado<select value={uf} onChange={(e) => { setUf(e.target.value); if (e.target.value === 'BR') setCargo(1); else if (cargo === 7 || cargo === 8) setCargo(e.target.value === 'DF' ? 8 : 7); }} className="block w-full mt-2 p-3 border-2 border-black bg-white"><option value="BR">Brasil · Presidência</option>{UF_LISTA.map((u) => <option key={u.sigla} value={u.sigla}>{u.sigla} — {u.nome}</option>)}</select></label>
        <label className="font-body font-bold">Cargo<select value={cargo} onChange={(e) => setCargo(Number(e.target.value))} className="block w-full mt-2 p-3 border-2 border-black bg-white">{[1, ...(uf !== 'BR' ? [3, ...(turno === 1 ? [5, 6, uf === 'DF' ? 8 : 7] : [])] : [])].map((c) => <option key={c} value={c}>{rotuloCargo(c)}</option>)}</select></label>
        <label className="font-body font-bold">Turno<select value={turno} onChange={(e) => { setTurno(Number(e.target.value)); if (Number(e.target.value) === 2 && ![1, 3].includes(cargo)) setCargo(1); }} className="block w-full mt-2 p-3 border-2 border-black bg-white"><option value={1}>1º turno · 04/10</option><option value={2}>2º turno · 25/10</option></select></label>
      </div>
      <p className="font-body text-sm">Presidência mostra o total nacional. Nos outros cargos, selecione o estado onde você vota.</p>
    </section>
    <section className="border-4 border-black bg-primary-container p-5" aria-live="polite">
      <h2 className="font-headline font-black text-2xl uppercase">{carregando ? 'Consultando o TSE…' : dados?.fase === 'agendada' ? 'A eleição ainda não aconteceu' : dados?.fase === 'disponivel' ? dados.finalizada ? 'Totalização final informada pelo TSE' : 'Apuração parcial' : dados?.fase === 'sem-disputa' ? 'Disputa não encontrada na configuração do TSE' : dados?.fase === 'aguardando' ? 'Aguardando divulgação do TSE' : 'Dados temporariamente indisponíveis'}</h2>
      {dados?.fase === 'agendada' && <p className="font-body mt-3">Volte em {turno === 1 ? '4' : '25'} de outubro, após as 17h de Brasília, para acompanhar os resultados oficiais. Até lá, <Link href="/minha-urna" className="underline font-bold">prepare sua cola eleitoral</Link>.</p>}
      {dados?.fase === 'disponivel' && <><p className="font-body mt-2">{dados.secoes?.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}% das seções totalizadas · {dados.atualizacao}</p><p className="font-body text-sm mt-2">A liderança na contagem não confirma eleição. Deputados dependem das regras proporcionais; a situação final vem do TSE.</p></>}
      {(dados?.fase === 'aguardando' || dados?.fase === 'indisponivel' || dados?.fase === 'sem-disputa') && <p className="font-body mt-3">Consulte também o <a href="https://resultados.tse.jus.br/" target="_blank" rel="noopener noreferrer" className="underline font-bold">portal oficial de resultados do TSE</a>. Esta página tenta novamente durante a apuração.</p>}
      {dados?.avisos?.map((aviso) => <p key={aviso} className="font-body font-bold mt-2">{aviso}</p>)}
      {dados && dados.fase !== 'agendada' && <button onClick={() => setRetry((r) => r + 1)} className="mt-4 border-2 border-black bg-white px-4 py-2 font-body font-bold">Atualizar</button>}
    </section>
    {segundoTurno.length >= 2 && <section className="border-4 border-black bg-[#9BF6FF] p-5 space-y-3"><h2 className="font-headline font-black text-2xl uppercase">Vai ter 2º turno</h2><p className="font-body">Classificados informados pelo TSE: {segundoTurno.map((c) => c.nome).join(' e ')}.</p><Link className="underline font-bold" href={`/comparar/candidatos?ids=${segundoTurno.map((c) => c.id).join(',')}`}>Compare os candidatos para 25 de outubro →</Link></section>}
    {dados?.fase === 'disponivel' && <section className="space-y-4">
      <label className="block font-body font-bold">Buscar nome, número ou partido<input type="search" value={busca} onChange={(e) => { setBusca(e.target.value); setLimite(30); }} placeholder="Digite o nome ou número do candidato" className="block w-full border-4 border-black bg-white p-4 mt-2" /></label>
      {items.length > 0 && <label className="flex gap-3 items-center font-body font-bold"><input type="checkbox" checked={soMinhaUrna} onChange={(e) => setSoMinhaUrna(e.target.checked)} />Mostrar só minhas escolhas salvas neste navegador</label>}
      <p className="font-body text-sm">{candidatos.length} candidatos encontrados. Percentuais e votos computados conforme o TSE.</p>
      <div className="grid sm:grid-cols-2 gap-4">{candidatos.slice(0, limite).map((c) => <article key={c.id} className="border-4 border-black bg-white p-5 space-y-2"><p className="font-label font-bold text-sm">{c.partido} · Nº {c.numero}</p><h3 className="font-headline font-black text-2xl">{c.nome}</h3><p className="font-headline font-black text-3xl">{c.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%</p><p className="font-body">{c.votos.toLocaleString('pt-BR')} votos computados{c.destinoVoto ? ` · ${c.destinoVoto}` : ''}</p><p className={`inline-block border-2 border-black px-3 py-1 font-body font-bold ${/^eleito/i.test(c.situacao) ? 'bg-[#C8FF8C]' : 'bg-primary-container'}`}>{c.situacao}</p><Link href={`/candidatos/2026/${cargo === 1 ? 'BR' : uf}/${c.id}`} className="block underline font-body font-bold text-sm">Ver perfil e propostas →</Link></article>)}</div>
      {!candidatos.length && <p className="border-2 border-black bg-white p-5 font-body">Nenhum candidato corresponde a esses filtros. Tente buscar pelo número ou retirar o filtro das suas escolhas.</p>}
      {candidatos.length > limite && <button onClick={() => setLimite((n) => n + 30)} className="border-4 border-black bg-white px-5 py-3 font-headline font-black uppercase">Ver mais resultados</button>}
    </section>}
    <section className="border-4 border-black bg-white p-5 space-y-4"><h2 className="font-headline font-black text-xl uppercase">Deixe o link pronto para domingo</h2><ShareTool path="/resultados" text="Meu candidato foi eleito? Salve este link para acompanhar os resultados de 2026 com dados oficiais do TSE, por estado e cargo:" /><p className="font-body text-sm">Fonte: TSE. Consulta com cache de 60 segundos; a atualização pode chegar com atraso. Serviço independente, sem vínculo com a Justiça Eleitoral.</p><a href="https://resultados.tse.jus.br/" target="_blank" rel="noopener noreferrer" className="block underline font-body text-sm">Abrir resultados oficiais no TSE</a></section>
  </div>;
}
