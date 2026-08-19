/* ────────────────────────────────────────────────────────────────
 * URL dos dados de candidatos.
 *
 * Fase 1 (hoje): arquivos estáticos no próprio site (/dados/...) —
 * servidos pela Vercel junto com o app.
 * Fase 2 (Cloudflare R2): basta configurar NEXT_PUBLIC_DADOS_URL
 * apontando para o domínio público do bucket (ex.:
 * https://dados.quemvotar.com.br). O ETL já sobe os arquivos para
 * lá; este helper troca o caminho sem mexer no resto do código.
 * ──────────────────────────────────────────────────────────────── */

const BASE_EXTERNO = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_DADOS_URL : '';

export function dadosUrl(nomeArquivo: string): string {
  if (BASE_EXTERNO) {
    return `${BASE_EXTERNO.replace(/\/+$/, '')}/candidatos/${nomeArquivo}`;
  }
  return `/dados/candidatos/${nomeArquivo}`;
}
