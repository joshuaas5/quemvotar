/* ────────────────────────────────────────────────────────────────
 * Foto em ALTA RESOLUÇÃO para candidatos que já são parlamentares.
 *
 * A foto do TSE (DivulgaCandContas) é uma miniatura de 161x225px.
 * Para quem exerce mandato hoje, a Câmara e o Senado distribuem
 * fotos oficiais grandes:
 *   - Câmara: 640x480  (bandep/pagina_do_deputado/{id}.jpg)
 *   - Senado: 480x600  (legis.senado.leg.br/senadores/fotos-oficiais/{id})
 *
 * Sem dependência de React — usável por ETL e runtime.
 * ──────────────────────────────────────────────────────────────── */

export interface ParlamentarParaFoto {
  idOrigem: string;
  casa: 'Câmara dos Deputados' | 'Senado Federal';
}

export function getFotoAltaParlamentar(perfil: ParlamentarParaFoto): string | null {
  if (!perfil.idOrigem) return null;

  const apenasDigitos = perfil.idOrigem.match(/\d+/g)?.join('') ?? '';

  if (perfil.casa === 'Câmara dos Deputados') {
    if (!apenasDigitos) return null;
    // URL em alta da Câmara (640x480)
    return `https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/${apenasDigitos}.jpg`;
  }

  if (perfil.casa === 'Senado Federal') {
    if (!apenasDigitos) return null;
    // Foto oficial do Senado (480x600) — sem extensão
    return `https://legis.senado.leg.br/senadores/fotos-oficiais/${apenasDigitos}`;
  }

  return null;
}
