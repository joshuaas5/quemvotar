/**
 * Tenta corrigir strings que foram interpretadas como ISO-8859-1 (Latin-1) 
 * mas são originalmente UTF-8 (Mojibake).
 */
export function decodeMojibake(str: string | null | undefined): string {
  if (!str) return '';
  
  try {
    // Se contém caracteres que parecem início de sequência UTF-8 mas estão quebrados
    if (/[ÂÃâ]/.test(str)) {
      return decodeURIComponent(escape(str));
    }
    return str;
  } catch (e) {
    return str
      .replace(/â€¢/g, '•')
      .replace(/â€"/g, '—')
      .replace(/Ã©/g, 'é')
      .replace(/Ã¡/g, 'á')
      .replace(/Ã³/g, 'ó')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã£/g, 'ã')
      .replace(/Ãµ/g, 'õ')
      .replace(/Ã§/g, 'ç')
      .replace(/Âº/g, 'º')
      .replace(/Âª/g, 'ª')
      .replace(/Ã  /g, 'à')
      .replace(/Ã­/g, 'í')
      .replace(/Ã¼/g, 'ü')
      .replace(/Ã©/g, 'é')
      .replace(/â€/g, '—');
  }
}

/**
 * Aplica decodeMojibake a todos os campos string de um objeto.
 */
export function decodeObjMojibake<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj } as Record<string, any>;
  for (const key of Object.keys(result)) {
    const val = result[key];
    if (typeof val === 'string') {
      result[key] = decodeMojibake(val);
    }
  }
  return result as T;
}
