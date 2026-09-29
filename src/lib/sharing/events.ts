/** Measure actions only; never send candidates, answers or political preferences. */
export function sharingEvent(action: 'cola_download' | 'cola_print' | 'cola_image_share' | 'match_download' | 'match_image_share' | 'invite_whatsapp' | 'invite_copy') {
  const browser = window as Window & { gtag?: (command: string, name: string) => void };
  browser.gtag?.('event', action);
}
