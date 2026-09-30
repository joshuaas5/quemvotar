/** Print only the locally generated card; the site's ad scripts never enter this frame. */
export async function printCartao(blob: Blob): Promise<void> {
  const imageUrl = URL.createObjectURL(blob);
  const frame = document.createElement('iframe');
  frame.title = 'Imprimir minha cola eleitoral';
  frame.setAttribute('aria-hidden', 'true');
  frame.tabIndex = -1;
  frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:1px;height:1px;border:0;';
  let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
  const cleanup = () => {
    if (cleanupTimer) clearTimeout(cleanupTimer);
    frame.remove();
    URL.revokeObjectURL(imageUrl);
  };
  document.body.appendChild(frame);
  const printWindow = frame.contentWindow;
  const printDocument = frame.contentDocument;
  if (!printWindow || !printDocument) {
    cleanup();
    throw new Error('Não foi possível abrir a impressão. Baixe a cola e imprima a imagem.');
  }
  const style = printDocument.createElement('style');
  style.textContent = '@page{size:A4;margin:12mm}html,body{margin:0;padding:0;background:#fff}img{display:block;width:100%;height:auto;max-height:273mm;object-fit:contain;print-color-adjust:exact;-webkit-print-color-adjust:exact}';
  printDocument.head.appendChild(style);
  const image = printDocument.createElement('img');
  image.alt = 'Minha cola eleitoral com fotos e números dos candidatos';
  try {
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Não foi possível preparar a imagem para impressão.')), 10_000);
      image.onload = () => { clearTimeout(timer); resolve(); };
      image.onerror = () => { clearTimeout(timer); reject(new Error('Não foi possível carregar a cola para impressão.')); };
      image.src = imageUrl;
      printDocument.body.appendChild(image);
    });
    printWindow.addEventListener('afterprint', cleanup, { once: true });
    cleanupTimer = setTimeout(cleanup, 120_000);
    printWindow.focus();
    printWindow.print();
  } catch (error) {
    cleanup();
    throw error;
  }
}
