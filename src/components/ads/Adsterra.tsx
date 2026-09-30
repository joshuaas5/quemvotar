import { AdsterraBanner } from './AdsterraBanner';

/* ────────────────────────────────────────────────────────────────
 * Anúncios Adsterra — carregados apenas em produção/diagnóstico.
 * OBSERVAÇÃO: configurado a pedido do dono do site para testes.
 * ──────────────────────────────────────────────────────────────── */

export const ADSTERRA_SOCIAL_BAR_SRC =
  'https://pl30928280.profitableratecpmnetwork.com/81/ff/3f/81ff3fee2b95fa3a26279fe6cc12ee23.js';

/** Leaderboard: loads only the size supported by the current screen. */
export function AdLeaderboard() {
  return <div data-advertisement className="qv-advertisement flex justify-center w-full overflow-hidden">
    <div className="hidden md:block"><AdsterraBanner adKey="b9861387958db10ac9330cab0e89166e" width={728} height={90} media="(min-width: 768px)" /></div>
    <div className="block md:hidden"><AdsterraBanner adKey="876aa82b74c7ba612f7e65595c0ca3b7" width={320} height={50} media="(max-width: 767px)" /></div>
  </div>;
}

export function AdRectangle300x250() {
  return <div data-advertisement className="qv-advertisement flex justify-center w-full overflow-hidden"><AdsterraBanner adKey="fbf5a9629d4855c6250e2efc8c9cdcbe" width={300} height={250} /></div>;
}

/** One supplied placement, visible beside content on wide desktop screens. */
export function AdSidebar() {
  return <aside data-advertisement className="qv-advertisement qv-desktop-ad" aria-label="Publicidade lateral">
    <p className="mb-2 text-center font-label text-[10px] uppercase opacity-60">Publicidade</p>
    <AdsterraBanner adKey="c9bf45f4747c8fa088adcb1889774660" width={160} height={600} media="(min-width: 1280px)" title="Publicidade lateral" />
  </aside>;
}

/** Native banner — se mistura com o conteúdo. */
export function AdNative() {
  return (
    <div data-advertisement className="qv-advertisement flex justify-center w-full overflow-hidden">
      <script
        async
        data-cfasync="false"
        src="https://pl30928282.profitableratecpmnetwork.com/527d185ff1ad1d190a497c8519cc522c/invoke.js"
      />
      <div id="container-527d185ff1ad1d190a497c8519cc522c" />
    </div>
  );
}

/** Smartlink (link de publicidade) — usado no rodapé. */
export const ADSTERRA_SMARTLINK_URL =
  'https://www.profitableratecpmnetwork.com/s9bxtnuah?key=15f6d280c9d0b4d496752284a79cde62';
