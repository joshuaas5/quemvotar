import { AdsterraBanner } from './AdsterraBanner';

/* ────────────────────────────────────────────────────────────────
 * Anúncios Adsterra — carregados apenas em produção/diagnóstico.
 * OBSERVAÇÃO: configurado a pedido do dono do site para testes.
 * ──────────────────────────────────────────────────────────────── */

export const ADSTERRA_SOCIAL_BAR_SRC =
  'https://bauval.org/14/81ff3fee2b95fa3a26279fe6cc12ee23';

/** Leaderboard: loads only the size supported by the current screen. */
export function AdLeaderboard() {
  return <div data-advertisement className="qv-advertisement flex justify-center w-full overflow-hidden">
    <div className="md:hidden"><AdsterraBanner adKey="876aa82b74c7ba612f7e65595c0ca3b7" width={320} height={50} media="(max-width: 767px)" title="Publicidade no topo" /></div>
    <div className="hidden md:block"><AdsterraBanner adKey="b9861387958db10ac9330cab0e89166e" width={728} height={90} media="(min-width: 768px)" /></div>
  </div>;
}

export function AdRectangle300x250() {
  return <div data-advertisement className="qv-advertisement flex justify-center w-full overflow-hidden"><AdsterraBanner adKey="fbf5a9629d4855c6250e2efc8c9cdcbe" width={300} height={250} /></div>;
}

/** Isolated frames keep the two desktop rails' configurations independent. */
export function AdSidebar({ side = 'right' }: { side?: 'left' | 'right' }) {
  const title = side === 'left' ? 'Publicidade lateral esquerda' : 'Publicidade lateral direita';
  return <aside data-advertisement className={`qv-advertisement qv-desktop-ad qv-desktop-ad-${side}`} aria-label={title}>
    <p className="mb-2 text-center font-label text-[10px] uppercase opacity-60">Publicidade</p>
    <AdsterraBanner adKey="c9bf45f4747c8fa088adcb1889774660" width={160} height={600} media="(min-width: 1280px)" title={title} />
  </aside>;
}

/** Native banner — se mistura com o conteúdo. */
export function AdNative() {
  return (
    <div data-advertisement className="qv-advertisement flex justify-center w-full overflow-hidden">
      <script
        async
        data-cfasync="false"
        src="https://bauval.org/21/527d185ff1ad1d190a497c8519cc522c"
      />
      <div id="container-527d185ff1ad1d190a497c8519cc522c" />
    </div>
  );
}

/** Smartlink (link de publicidade) — usado no rodapé. */
export const ADSTERRA_SMARTLINK_URL =
  'https://www.profitableratecpmnetwork.com/s9bxtnuah?key=15f6d280c9d0b4d496752284a79cde62';
