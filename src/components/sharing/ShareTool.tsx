'use client';
import { sharingEvent } from '@/lib/sharing/events';
import { useState } from 'react';

/** Only the public tool URL is shared here, never personal selections. */
export function ShareTool({ path, text }: { path: string; text: string }) {
  const [status, setStatus] = useState('');
  const url = `https://www.quemvotar.com.br${path}?utm_source=compartilhamento&utm_medium=convite&utm_campaign=eleicoes2026`;
  const message = `${text}\n${url}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(message); sharingEvent('invite_copy'); setStatus('Convite copiado!'); }
    catch { setStatus('Use o botão WhatsApp para enviar o convite.'); }
  };
  return <div className="qv-no-print space-y-3">
    <div className="flex flex-wrap gap-3">
      <a onClick={() => sharingEvent('invite_whatsapp')} href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="border-4 border-black bg-[#C8FF8C] px-5 py-3 font-headline font-black uppercase text-sm">Convidar pelo WhatsApp</a>
      <button type="button" onClick={copy} className="border-4 border-black bg-white px-5 py-3 font-headline font-black uppercase text-sm">Copiar convite</button>
    </div>
    <p className="font-body text-sm">O convite abre a ferramenta. Suas escolhas e respostas não entram no link.</p>
    <p role="status" className="font-body font-bold text-sm">{status}</p>
  </div>;
}
