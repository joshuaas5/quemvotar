'use client';
import { useState } from 'react';
import Link from 'next/link';
import { sharingEvent } from '@/lib/sharing/events';
import { ShareTool } from '@/components/sharing/ShareTool';
import { baixarCartao, compartilharCartao, criarCartao, type ShareCard } from '@/lib/sharing/cards';
import type { MatchCandidatoResultado } from '@/lib/match/candidatos';

export function MatchCandidatosShareCard({ perfil, uf, respondidas, matches }: { perfil: string; uf: string; respondidas: number; matches: MatchCandidatoResultado[] }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const card: ShareCard = {
    title: 'MEU MATCH ELEITORAL', subtitle: `${uf} • ${respondidas}/10 perguntas • perfil estimado: ${perfil}`,
    rows: [{ label: 'Meu perfil estimado', title: perfil, detail: 'Compare as propostas antes de decidir seu voto.', value: '' },
      ...[6, uf === 'DF' ? 8 : 7, 5, 3, 1].flatMap((codigo) => {
        const result = matches.find((m) => m.candidato.cargoCodigo === codigo && m.candidato.eixo);
        return result ? [{ label: result.candidato.cargo, title: result.candidato.nomeUrna,
          detail: `Base: ${result.candidato.baseLabel}`, value: `${result.match}%` }] : [];
      })],
    notes: ['Afinidade estimada pelo eixo político. Não é intenção de voto.', 'Um nome por cargo. Empates seguem ordem alfabética.', 'Faça o seu Match e compare ideias. Sem cadastro.'], path: '/match/candidatos',
  };
  const image = async (share: boolean) => {
    setBusy(true); setStatus('');
    try {
      const blob = await criarCartao(card);
      if (share) {
        const result = await compartilharCartao(blob, 'meu-match-eleitoral-2026.png', 'Meu Match Eleitoral 2026');
        if (result !== 'cancelled') sharingEvent('match_image_share');
        setStatus(result === 'downloaded' ? 'Imagem baixada. Anexe no Status ou onde preferir.' : result === 'shared' ? 'Imagem compartilhada.' : '');
      } else { baixarCartao(blob, 'meu-match-eleitoral-2026.png'); sharingEvent('match_download'); setStatus('Imagem baixada. Pronta para compartilhar!'); }
    } catch { setStatus('Não foi possível criar a imagem. Você ainda pode compartilhar o convite abaixo.'); }
    finally { setBusy(false); }
  };
  return <section className="border-4 border-black bg-[#9BF6FF] p-5 sm:p-6 space-y-4">
    <h3 className="font-headline font-black text-2xl uppercase">Seu resultado vira uma imagem</h3>
    <p className="font-body">Baixe seu perfil e o primeiro resultado de cada cargo nos filtros atuais. A imagem revela esse resultado; o convite abaixo leva apenas à ferramenta.</p>
    <div className="flex flex-wrap gap-3">
      <button disabled={busy} onClick={() => image(false)} className="border-4 border-black bg-black text-white px-5 py-3 font-headline font-black uppercase disabled:opacity-50">{busy ? 'Criando…' : 'Baixar resultado em imagem'}</button>
      <button disabled={busy} onClick={() => image(true)} className="border-4 border-black bg-white px-5 py-3 font-headline font-black uppercase disabled:opacity-50">Compartilhar imagem</button>
      <Link href="/minha-urna" className="border-4 border-black bg-primary-container px-5 py-3 font-headline font-black uppercase">Montar minha cola →</Link>
    </div>
    <p role="status" className="font-body font-bold text-sm">{status}</p>
    <ShareTool path="/match/candidatos" text="Fiz o Match Eleitoral 2026. São 10 perguntas para comparar seu perfil com os candidatos, sem cadastro. Faz o seu também:" />
    <Link href="/candidatos/metodologia" className="block underline font-body text-sm">Entenda a estimativa e as limitações do Match</Link>
  </section>;
}
