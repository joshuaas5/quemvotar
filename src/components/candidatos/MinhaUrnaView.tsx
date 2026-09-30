'use client';
import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useMinhaUrna } from './MinhaUrnaProvider';
import { cargosDaUrna, faltamNaUrna, ufDaUrna, votosPorCargo } from '@/lib/candidatos/minha-urna';
import { UF_LISTA } from '@/lib/candidatos/ufs';
import { baixarCartao, compartilharCartao, criarCartao, type ShareCard } from '@/lib/sharing/cards';
import { sharingEvent } from '@/lib/sharing/events';
import { ShareTool } from '@/components/sharing/ShareTool';
import { ColaCandidatePicker } from './ColaCandidatePicker';
import { FotoCandidato } from './FotoCandidato';
import { SQ_ELEICAO_2026 } from '@/lib/candidatos/snapshot';
import { fotosParaExportar } from '@/lib/candidatos/foto-export';
import { printCartao } from '@/lib/sharing/print';

const subscribeUf = (notify: () => void) => { window.addEventListener('storage', notify); return () => window.removeEventListener('storage', notify); };
const savedUf = () => { try { const uf = window.localStorage.getItem('quemvotar:cola-uf:v1'); return UF_LISTA.some((state) => state.sigla === uf) ? uf! : 'BR'; } catch { return 'BR'; } };

export function MinhaUrnaView() {
  const { items, adicionar, remover, limpar } = useMinhaUrna();
  const [picker, setPicker] = useState<string | null>(null);
  const persistedUf = useSyncExternalStore(subscribeUf, savedUf, () => 'BR');
  const [estado, setEstado] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const ufSalva = ufDaUrna(items);
  const uf = ufSalva === 'BR' ? estado || persistedUf : ufSalva;
  const slots = cargosDaUrna(uf).flatMap((cargo) => Array.from({ length: votosPorCargo(cargo.codigo) }, (_, index) => ({
    ...cargo, index, escolhido: items.filter((i) => i.cargoCodigo === cargo.codigo)[index],
  })));
  const faltando = faltamNaUrna(items, uf).reduce((sum, c) => sum + c.faltando, 0);
  const card: ShareCard = {
    title: 'MINHA COLA ELEITORAL', subtitle: `1º turno • 04/10/2026 • ${uf === 'BR' ? 'Escolha seu estado' : uf} • ordem de votação`,
    rows: slots.map((slot, index) => ({ label: `${index + 1}. ${slot.rotulo}${slot.codigo === 5 ? ` (${slot.index + 1}º voto)` : ''}`,
      title: slot.escolhido?.nomeUrna ?? 'Ainda não escolhido', detail: slot.escolhido ? `${slot.escolhido.partido ?? 'Sem partido'} • ${slot.escolhido.uf}` : 'Confira antes de votar', value: slot.escolhido ? String(slot.escolhido.numero) : '—', photoUrls: slot.escolhido ? fotosParaExportar(SQ_ELEICAO_2026, slot.escolhido.id, slot.escolhido.uf, slot.escolhido.fotoAlta) : undefined })),
    notes: ['Escolhas pessoais. Confira os números e o registro no TSE.', 'Leve a cola em papel. Celular não pode ser usado na cabine.'], path: '/minha-urna',
  };
  const print = async () => {
    setBusy(true); setStatus('Carregando fotos para impressão…');
    try {
      const blob = await criarCartao(card);
      await printCartao(blob);
      sharingEvent('cola_print'); setStatus('');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Não foi possível preparar a impressão.'); }
    finally { setBusy(false); }
  };
  const image = async (share: boolean) => {
    setBusy(true); setStatus('');
    try {
      const blob = await criarCartao(card);
      if (share) {
        const result = await compartilharCartao(blob, 'minha-cola-eleitoral-2026.png', 'Minha cola eleitoral 2026');
        if (result !== 'cancelled') sharingEvent('cola_image_share');
        setStatus(result === 'downloaded' ? 'Imagem baixada. Você pode anexá-la onde quiser.' : result === 'shared' ? 'Imagem compartilhada.' : '');
      } else { baixarCartao(blob, 'minha-cola-eleitoral-2026.png'); sharingEvent('cola_download'); setStatus('Cola baixada! Imprima para levar à votação.'); }
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Não foi possível criar a imagem. Tente imprimir.'); }
    finally { setBusy(false); }
  };
  return <div className="space-y-8">
    <section className="qv-no-print border-4 border-black bg-[#9BF6FF] p-5 space-y-4">
      <h2 className="font-headline font-black text-2xl uppercase">Sua cola, na ordem da urna</h2>
      <p className="font-body text-sm">Escolha seu estado e toque em cada cargo. São seis escolhas, com dois senadores; sua cola fica neste navegador.</p>
      <label className="block font-body font-bold">Estado onde você vota
        <select value={uf} disabled={ufSalva !== 'BR'} onChange={(e) => { setEstado(e.target.value); setPicker(e.target.value === 'BR' ? null : '6-0'); try { window.localStorage.setItem('quemvotar:cola-uf:v1', e.target.value); } catch { /* Opcional. */ } }} className="block w-full sm:w-auto mt-2 border-2 border-black bg-white p-3">
          <option value="BR">Selecione seu estado</option>
          {UF_LISTA.map((u) => <option key={u.sigla} value={u.sigla}>{u.sigla} — {u.nome}</option>)}
        </select>
      </label>
      {ufSalva !== 'BR' && <p className="font-body text-sm">Para mudar de estado, remova as escolhas estaduais da cola.</p>}
      <p className="font-body font-bold">{faltando === 0 ? 'As seis escolhas estão preenchidas.' : `${items.length} de 6 escolhas preenchidas. Você pode baixar a cola parcial.`}</p>
      <div className="flex flex-wrap gap-3">
        <button disabled={busy || !items.length} onClick={() => image(false)} className="border-4 border-black bg-black text-white px-5 py-3 font-headline font-black uppercase disabled:opacity-50">{busy ? 'Criando imagem…' : 'Baixar minha cola'}</button>
        <button disabled={busy} onClick={print} className="border-4 border-black bg-white px-5 py-3 font-headline font-black uppercase disabled:opacity-50">Imprimir em papel</button>
        {items.length > 0 && <button onClick={limpar} className="border-2 border-black bg-white px-3 py-2 font-body font-bold">Limpar escolhas</button>}
      </div>
      <p role="status" className="font-body font-bold text-sm">{status}</p>
      <p className="font-body text-xs">Na cabine, leve a cola em papel e deixe o celular fora.</p>
    </section>
    <section className="qv-print-cola border-4 border-black bg-white p-4 sm:p-6 space-y-3">
      <h2 className="font-headline font-black text-2xl uppercase">Minha cola eleitoral 2026 · {uf}</h2>
      <p className="font-body text-sm">1º turno · 4 de outubro · siga esta ordem</p>
      {slots.map((slot, index) => <div key={`${slot.codigo}-${slot.index}`} className="space-y-2"><article className="qv-cola-row border-2 border-black p-3 sm:p-4 flex gap-2 sm:gap-4 items-center">
        <span className={`font-headline font-black text-2xl shrink-0 ${slot.escolhido ? 'hidden sm:block print:block' : ''}`}>{index + 1}.</span>
        {slot.escolhido && <span className="qv-cola-photo w-11 h-14 shrink-0 overflow-hidden border border-black"><FotoCandidato loading="eager" sqEleicao={SQ_ELEICAO_2026} id={slot.escolhido.id} uf={slot.escolhido.uf} nome={slot.escolhido.nomeUrna} fotoAlta={slot.escolhido.fotoAlta} iniciaisClassName="font-headline font-bold text-base" /></span>}
        <div className="flex-1 min-w-0">
          <h3 className="font-label font-bold uppercase text-xs">{slot.rotulo}{slot.codigo === 5 ? ` · ${slot.index + 1}º voto` : ''}</h3>
          <p className="font-headline font-black text-lg sm:text-xl break-words">{slot.escolhido?.nomeUrna ?? 'Ainda não escolhido'}</p>
          {slot.escolhido ? <><p className="font-body text-sm">{slot.escolhido.partido} · {slot.escolhido.uf}</p><div className="qv-no-print mt-2 flex flex-wrap gap-3 text-sm"><Link className="underline" href={`/candidatos/2026/${slot.escolhido.uf}/${slot.escolhido.id}`}>Conferir perfil</Link><button className="underline text-red-700" onClick={() => remover(slot.escolhido!.id)}>Remover</button></div></>
            : <button type="button" disabled={slot.codigo !== 1 && uf === 'BR'} className="qv-no-print mt-2 border-2 border-black bg-primary-container px-3 py-2 font-body font-bold text-sm disabled:opacity-50" onClick={() => setPicker(`${slot.codigo}-${slot.index}`)}>{slot.codigo !== 1 && uf === 'BR' ? 'Selecione seu estado acima' : 'Escolher candidato →'}</button>}
        </div>
        <span className="font-headline font-black text-2xl sm:text-4xl shrink-0">{slot.escolhido?.numero ?? '—'}</span>
      </article>{picker === `${slot.codigo}-${slot.index}` && !slot.escolhido && <ColaCandidatePicker key={`${uf}-${picker}`} uf={uf} cargo={slot.codigo} selectedIds={items.map((item) => item.id)} onClose={() => setPicker(null)} onChoose={(candidate) => { adicionar(candidate); setPicker(null); setStatus(`${candidate.nomeUrna} adicionado à sua cola. Você pode remover abaixo.`); }} />}</div>)}
      <p className="font-body text-xs">Escolhas pessoais · confira números e registro no TSE · quemvotar.com.br/minha-urna</p>
    </section>
    <section className="qv-no-print border-4 border-black bg-primary-container p-5 space-y-4">
      <h2 className="font-headline font-black text-2xl uppercase">Ajude alguém a preparar o voto</h2>
      <ShareTool path="/minha-urna" text="Já preparou sua cola eleitoral? Aqui dá para escolher os candidatos e imprimir na ordem da urna, com os dois senadores de 2026." />
      {items.length > 0 && <details><summary className="font-body font-bold cursor-pointer">Quero compartilhar uma imagem das minhas escolhas</summary><p className="font-body text-sm mt-3">Esta imagem mostra os nomes e números que você escolheu. Só envie se quiser revelar essas preferências.</p><button disabled={busy} onClick={() => image(true)} className="mt-3 border-2 border-black bg-white px-4 py-3 font-body font-bold">Compartilhar minhas escolhas em imagem</button></details>}
    </section>
    <div className="qv-no-print flex flex-wrap gap-4 font-headline font-black"><Link href={`/match/candidatos?uf=${uf}`} className="underline">Descobrir candidatos no Match →</Link><Link href="/resultados" className="underline">Meu candidato foi eleito? →</Link></div>
  </div>;
}
