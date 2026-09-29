'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ADSTERRA_SOCIAL_BAR_SRC } from './ads/Adsterra';

type ConsentChoice = 'all' | 'necessary';

interface ConsentRecord {
  choice: ConsentChoice;
  updatedAt: string;
}

interface ConsentManagerProps {
  adsenseClient?: string;
  gaId?: string;
  gtmId?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = 'qv-cookie-consent-v1';
const OPEN_EVENT = 'qv:open-cookie-settings';

function readConsent(): ConsentRecord | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as Partial<ConsentRecord>;
    if ((parsed.choice === 'all' || parsed.choice === 'necessary') && typeof parsed.updatedAt === 'string') {
      return { choice: parsed.choice, updatedAt: parsed.updatedAt };
    }
  } catch {
    // A tela continua disponivel quando o navegador bloqueia o armazenamento local.
  }

  return null;
}

function appendScript(id: string, source: string) {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = source;
  document.head.appendChild(script);
}

function enableAnalytics(gaId: string) {
  appendScript('qv-ga-' + gaId, 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId));

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', gaId, {
    page_title: document.title,
    page_location: window.location.href,
  });
}

function enableTagManager(gtmId: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });
  appendScript('qv-gtm-' + gtmId, 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gtmId));
}

function enableAdvertising(adsenseClient: string) {
  appendScript(
    'qv-adsense-' + adsenseClient,
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(adsenseClient),
  );
}

function enableAdsterra() {
  // A rede orienta inserir a Social Bar no fim do body.
  if (document.getElementById('qv-adsterra-social-bar')) return;
  const script = document.createElement('script');
  script.id = 'qv-adsterra-social-bar';
  script.src = ADSTERRA_SOCIAL_BAR_SRC;
  script.async = true;
  script.setAttribute('data-cfasync', 'false');
  document.body.appendChild(script);
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="cursor-pointer text-black no-underline transition-colors duration-75 hover:text-[#ffd709]"
    >
      {'Prefer\u00eancias de cookies'}
    </button>
  );
}

export default function ConsentManager({ adsenseClient, gaId, gtmId }: ConsentManagerProps) {
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedConsent = readConsent();
    setConsent(savedConsent);
    setIsReady(true);
    setIsOpen(savedConsent === null);

    const openSettings = () => setIsOpen(true);
    window.addEventListener(OPEN_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_EVENT, openSettings);
  }, []);

  // ANALYTICS: a tag GA4 agora é fixa no <head> (layout) — nada a carregar aqui.
  // Este componente cuida apenas de anúncios (com consentimento) e do
  // rastreamento de troca de página (SPA).
  useEffect(() => {
    if (!consent || consent.choice !== 'all') return;
    if (gtmId) enableTagManager(gtmId);
    if (adsenseClient) enableAdvertising(adsenseClient);
    enableAdsterra();
  }, [adsenseClient, consent, gtmId]);

  // Rastreia cada troca de página (SPA) no Analytics — sempre, sem depender de clique
  const pathname = usePathname();
  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return;
    window.gtag?.('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, gaId]);

  const saveConsent = useCallback((choice: ConsentChoice) => {
    const nextConsent = { choice, updatedAt: new Date().toISOString() };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConsent));
    } catch {
      // A escolha funciona nesta visita mesmo sem armazenamento persistente.
    }

    setConsent(nextConsent);
    setIsOpen(false);
    // Scripts de anúncios já carregados não podem ser desfeitos apenas removendo a tag.
    if (consent?.choice === 'all' && choice === 'necessary') window.location.reload();
  }, [consent]);

  if (!isReady || !isOpen) return null;

  const updating = consent !== null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-5" role="dialog" aria-modal="true" aria-labelledby="cookie-consent-title">
      <div className="mx-auto max-w-3xl border-4 border-black bg-white p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-black/60">QuemVotar</p>
            <h2 id="cookie-consent-title" className="mt-1 font-headline text-2xl font-black uppercase leading-none">
              {updating ? 'Atualize suas prefer\u00eancias' : 'Sua privacidade, sua escolha'}
            </h2>
            <p className="mt-3 font-body text-sm font-semibold leading-relaxed sm:text-base">
              {'O site mede audi\u00eancia e exibe banners. Se voc\u00ea aceitar, tamb\u00e9m ativaremos a Social Bar e outros recursos opcionais de publicidade.'}
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-black/70">
              {'Voc\u00ea pode recusar esses formatos adicionais e alterar sua escolha depois. Saiba mais na '}
              <Link href="/privacy" className="font-bold underline">
                {'Pol\u00edtica de Privacidade'}
              </Link>
              .
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:min-w-[220px]">
            <button
              type="button"
              onClick={() => saveConsent('all')}
              className="cursor-pointer border-4 border-black bg-black px-4 py-3 font-headline text-sm font-black uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {'Aceitar todos'}
            </button>
            <button
              type="button"
              onClick={() => saveConsent('necessary')}
              className="cursor-pointer border-4 border-black bg-white px-4 py-3 font-headline text-sm font-black uppercase transition-colors hover:bg-[#ffe066]"
            >
              {'Recusar formatos adicionais'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
