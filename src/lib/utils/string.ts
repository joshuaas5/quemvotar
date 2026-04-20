/**
 * Tenta corrigir strings que foram interpretadas como ISO-8859-1 (Latin-1) 
 * mas são originalmente UTF-8 (Mojibake).
 */
export function decodeMojibake(str: string | null | undefined): string {
  if (!str) return '';
  
  try {
    // Padrão clássico: se contém caracteres que parecem início de sequência UTF-8
    // mas estão quebrados em bytes individuais. 
    // Ex: â€¢ (•), Ã© (é), Ã£ (ã)
    if (/[ÂÃâ]/.test(str)) {
      return decodeURIComponent(escape(str));
    }
    return str;
  } catch (e) {
    // Se falhar (ex: string já é UTF-8 mas contém caracteres inválidos para escape), 
    // retorna original mas tenta limpezas manuais comuns se necessário.
    return str
      .replace(/â€¢/g, '•')
      .replace(/Ã©/g, 'é')
      .replace(/Ã¡/g, 'á')
      .replace(/Ã³/g, 'ó')
      .replace(/Ãº/g, 'ú')
      .replace(/Ãã/g, 'ã')
      .replace(/Ãµ/g, 'õ')
      .replace(/Ã§/g, 'ç')
      .replace(/Âº/g, 'º')
      .replace(/Âª/g, 'ª');
  }
}
