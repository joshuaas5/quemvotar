/* ────────────────────────────────────────────────────────────────
 * Sanitização de URLs externas.
 *
 * As APIs oficiais (TSE, Câmara, Senado) ocasionalmente trazem
 * URLs malformadas ou parciais que, se usadas direto no href,
 * quebram a navegação (ex.: vão para /caminho relativo). Esta
 * função valida e normaliza: só retorna URL quando é digna de
 * virar link; caso contrário retorna null (o item deve ser
 * ocultado em vez de gerar 404).
 * ──────────────────────────────────────────────────────────────── */

export function saneUrl(raw?: string | null): string | null {
  if (!raw) return null;

  const url = raw.trim();
  if (!url) return null;

  try {
    if (/^https?:\/\//i.test(url)) {
      const parsed = new URL(url);
      // exige hostname com ponto (internet) — evita //caminho-relativo
      if (parsed.hostname.includes('.') && parsed.hostname.length > 3) {
        return parsed.toString();
      }
      return null;
    }

    // Sem protocolo: se parece com domínio (ex: instagram.com/...), completa com https
    if (/^[a-z0-9-]+(\.[a-z0-9-]+){1,}([/:?#].*)?$/i.test(url) && !/\s/.test(url)) {
      return `https://${url}`;
    }

    return null;
  } catch {
    return null;
  }
}

export function isSaneUrl(raw?: string | null): boolean {
  return saneUrl(raw) !== null;
}
