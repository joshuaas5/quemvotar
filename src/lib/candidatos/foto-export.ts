import { fotoProxiUrl } from './urls';

/** Local portraits are the same official/public images used on the site. */
export function fotoLocalCandidato(id: number): string | null {
  if (id === 280002551544) return '/images/candidatos/flavio-bolsonaro.jpg';
  if (id === 280002542548) return '/images/candidatos/lula.png';
  return null;
}

export function fotosParaExportar(sqEleicao: number, id: number, uf: string, fotoAlta?: string | null): string[] {
  const local = fotoLocalCandidato(id);
  const proxy = fotoProxiUrl(sqEleicao, id, uf);
  return [local, fotoAlta ? `${proxy}&alta=${encodeURIComponent(fotoAlta)}` : null, proxy]
    .filter((source): source is string => Boolean(source));
}
