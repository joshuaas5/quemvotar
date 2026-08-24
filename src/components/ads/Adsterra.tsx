/* ────────────────────────────────────────────────────────────────
 * Anúncios Adsterra — carregados apenas em produção/diagnóstico.
 * OBSERVAÇÃO: configurado a pedido do dono do site para testes.
 * ──────────────────────────────────────────────────────────────── */

/** Scripts globais que rodam em TODAS as páginas (popunder + social bar). */
export function AdsterraLayoutScripts() {
  return (
    <>
      {/* Popunder */}
      <script
        src="https://pl30928279.profitableratecpmnetwork.com/e3/56/c2/e356c23c8d6d06504fb388e912637a7c.js"
        data-cfasync="false"
      />
      {/* Social Bar */}
      <script
        src="https://pl30928280.profitableratecpmnetwork.com/81/ff/3f/81ff3fee2b95fa3a26279fe6cc12ee23.js"
        data-cfasync="false"
      />
    </>
  );
}

/** Leaderboard: 728x90 no desktop, 320x50 no mobile (mesma faixa). */
export function AdLeaderboard() {
  return (
    <div className="flex justify-center w-full overflow-hidden">
      {/* 728x90 — desktop */}
      <div className="hidden md:block">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : 'b9861387958db10ac9330cab0e89166e',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            `,
          }}
        />
        <script src="https://www.highrevenueformat.com/b9861387958db10ac9330cab0e89166e/invoke.js" />
      </div>
      {/* 320x50 — mobile */}
      <div className="block md:hidden">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '876aa82b74c7ba612f7e65595c0ca3b7',
                'format' : 'iframe',
                'height' : 50,
                'width' : 320,
                'params' : {}
              };
            `,
          }}
        />
        <script src="https://www.highrevenueformat.com/876aa82b74c7ba612f7e65595c0ca3b7/invoke.js" />
      </div>
    </div>
  );
}

/** Retângulo 300x250 — bom para meio de conteúdo. */
export function AdRectangle300x250() {
  return (
    <div className="flex justify-center w-full overflow-hidden">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key' : 'fbf5a9629d4855c6250e2efc8c9cdcbe',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          `,
        }}
      />
      <script src="https://www.highrevenueformat.com/fbf5a9629d4855c6250e2efc8c9cdcbe/invoke.js" />
    </div>
  );
}

/** Native banner — se mistura com o conteúdo. */
export function AdNative() {
  return (
    <div className="flex justify-center w-full overflow-hidden">
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