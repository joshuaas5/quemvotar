'use client';

import { useEffect, useMemo, useState } from 'react';
import { dadosUrl } from '@/lib/candidatos/dados-url';
import type { CandidatoSnapshotLite, SnapshotDataset } from '@/lib/candidatos/snapshot';
import { SQ_ELEICAO_2026 } from '@/lib/candidatos/snapshot';
import { FotoCandidato } from './FotoCandidato';

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');

export function ColaCandidatePicker({ uf, cargo, selectedIds, onChoose, onClose }: {
  uf: string; cargo: number; selectedIds: number[];
  onChoose: (candidate: CandidatoSnapshotLite) => void; onClose: () => void;
}) {
  const [candidates, setCandidates] = useState<CandidatoSnapshotLite[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [limit, setLimit] = useState(30);
  useEffect(() => {
    const controller = new AbortController();
    fetch(dadosUrl(`${cargo === 1 ? 'BR' : uf}-${cargo}.json`), { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('snapshot'); return response.json(); })
      .then((data: SnapshotDataset) => {
        if (!Array.isArray(data.candidatos)) throw new Error('snapshot');
        setCandidates(data.candidatos.filter((c) => c.cargoCodigo === cargo && c.uf === (cargo === 1 ? 'BR' : uf)));
      })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [uf, cargo, retry]);
  const filtered = useMemo(() => candidates.filter((candidate) => normalize(`${candidate.nomeUrna} ${candidate.numero} ${candidate.partido ?? ''}`).includes(normalize(query.trim()))), [candidates, query]);

  return <div className="qv-no-print rounded-2xl border-2 border-black bg-[#FFF9D9] p-3 space-y-3">
    <div className="flex items-center justify-between gap-3"><p className="font-body font-bold text-sm">Toque no nome para adicionar à cola</p><button type="button" onClick={onClose} className="font-body text-sm underline">Fechar</button></div>
    <label className="block font-body text-sm font-bold">Buscar por nome, número ou partido
      <input value={query} onChange={(event) => { setQuery(event.target.value); setLimit(30); }} className="mt-1 block w-full border-2 border-black bg-white p-3" placeholder="Ex.: nome ou número do candidato" />
    </label>
    {loading ? <p role="status" className="font-body text-sm">Carregando candidatos…</p> : error ? <div role="alert" className="font-body text-sm">Não foi possível carregar a lista. <button type="button" className="underline font-bold" onClick={() => { setLoading(true); setError(false); setRetry((value) => value + 1); }}>Tentar novamente</button></div> : <>
      <p className="font-body text-xs">{filtered.length} candidatos · {cargo === 1 ? 'Brasil' : uf}</p>
      <div className="max-h-96 overflow-y-auto space-y-2">
        {filtered.slice(0, limit).map((candidate) => {
          const selected = selectedIds.includes(candidate.id);
          return <button key={candidate.id} type="button" disabled={selected} onClick={() => onChoose(candidate)} className="w-full rounded-xl border-2 border-black bg-white p-2 flex items-center gap-3 text-left hover:bg-[#9BF6FF] disabled:bg-green-50 disabled:opacity-70">
            <span className="w-11 h-14 shrink-0 overflow-hidden border border-black"><FotoCandidato sqEleicao={SQ_ELEICAO_2026} id={candidate.id} uf={candidate.uf} nome={candidate.nomeUrna} fotoAlta={candidate.fotoAlta} iniciaisClassName="font-headline font-bold text-base" /></span>
            <span className="flex-1 min-w-0"><span className="block font-headline font-black text-sm break-words">{candidate.nomeUrna}</span><span className="block font-body text-xs">{candidate.partido} · {selected ? 'Já está na sua cola ✓' : 'Adicionar à cola'}</span></span>
            <span className="font-headline font-black text-lg shrink-0">{candidate.numero}</span>
          </button>;
        })}
      </div>
      {filtered.length === 0 && <p className="font-body text-sm">Nenhum candidato encontrado. Tente outro nome ou número.</p>}
      {filtered.length > limit && <button type="button" className="w-full border-2 border-black bg-white p-3 font-body font-bold text-sm" onClick={() => setLimit((value) => value + 30)}>Mostrar mais candidatos</button>}
    </>}
  </div>;
}
