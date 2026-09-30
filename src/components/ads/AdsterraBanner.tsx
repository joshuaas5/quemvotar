'use client';

import { useEffect, useRef } from 'react';

interface Props { adKey: string; width: number; height: number; media?: string; title?: string }

/** Each banner owns its config; hidden screen variants never request an ad. */
export function AdsterraBanner({ adKey, width, height, media, title = 'Publicidade' }: Props) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = container.current;
    if (!host) return;
    const viewport = media ? window.matchMedia(media) : null;
    const mount = () => {
      host.replaceChildren();
      if (viewport && !viewport.matches) return;
      const frame = document.createElement('iframe');
      frame.title = title;
      frame.width = String(width);
      frame.height = String(height);
      frame.style.cssText = 'display:block;border:0;overflow:hidden;';
      frame.setAttribute('scrolling', 'no');
      const options = JSON.stringify({ key: adKey, format: 'iframe', height, width, params: {} });
      frame.srcdoc = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;overflow:hidden;width:${width}px;height:${height}px}iframe{border:0}</style></head><body><script>window.atOptions=${options};</script><script src="https://www.highrevenueformat.com/${adKey}/invoke.js"></script></body></html>`;
      host.appendChild(frame);
    };
    mount();
    viewport?.addEventListener('change', mount);
    return () => { viewport?.removeEventListener('change', mount); host.replaceChildren(); };
  }, [adKey, width, height, media, title]);
  return <div ref={container} data-advertisement style={{ width, height }} />;
}
