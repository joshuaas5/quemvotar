import { cache } from 'react';
import {
  fetchOfficialCongressProfiles,
  getOfficialProfileHref,
  type PerfilPublico,
} from '@/lib/official';
import {
  fetchAssiduidadeForPerfil,
  fetchCamaraVoteThemesForPerfil,
  fetchGovernismoForPerfil,
} from '@/lib/external/radar';
import { fetchRankingForPerfil } from '@/lib/external/ranking';
import type { GovernismoReferencia, PresencaReferencia, RankingReferencia } from '@/lib/official/types';
import type { PerfilItemLista } from '@/lib/official/types';

/* ────────────────────────────────────────────────────────────────
 * Cruzamento: candidato 2026 ↔ mandato parlamentar em exercício.
 *
 * Quando o candidato JÁ é deputado ou senador, o perfil dele no
 * QuemVotar ganha os dados reais do mandato (presença, ranking,
 * governismo, temas de votação) — a mesma riqueza dos parlamentares.
 * A correspondência é por nome normalizado + partido + UF e é
 * sempre apresentada como "possível correspondência" quando houver
 * qualquer dúvida (homônimos).
 * ──────────────────────────────────────────────────────────────── */

function normalizarNome(nome: string): string {
  return nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface MandatoParlamentar {
  perfil: PerfilPublico;
  href: string;
  /** 'exata' = nome de urna idêntico; 'provavel' = casou por nome completo/partido/UF. */
  correspondencia: 'exata' | 'provavel';
  presenca: PresencaReferencia | null;
  ranking: RankingReferencia | null;
  governismo: GovernismoReferencia | null;
  temasVotacao: PerfilItemLista[];
}

export interface CandidatoParaMandato {
  nomeUrna: string;
  nomeCompleto?: string | null;
  partido: string | null;
  uf: string;
}

export const buscarMandatoParlamentar = cache(
  async (candidato: CandidatoParaMandato): Promise<MandatoParlamentar | null> => {
    if (!candidato.partido) return null;

    const perfis = await fetchOfficialCongressProfiles().catch(() => []);

    const candidatosNorm = normalizarNome(candidato.nomeUrna);
    const completoNorm = candidato.nomeCompleto ? normalizarNome(candidato.nomeCompleto) : null;

    const candidatos = perfis.filter(
      (perfil) =>
        perfil.partido === candidato.partido &&
        (!candidato.uf || perfil.uf === candidato.uf),
    );

    // 1º: nome de urna idêntico (correspondência exata)
    const exato = candidatos.find((perfil) => normalizarNome(perfil.nome_urna) === candidatosNorm);

    // 2º: nome civil idêntico
    const porNomeCivil = !exato && completoNorm
      ? candidatos.find((perfil) => normalizarNome(perfil.nome_urna) === completoNorm)
      : null;

    // 3º: nome completo do candidato contém o nome de urna do parlamentar (ou vice-versa)
    const provavel =
      !exato && !porNomeCivil
        ? candidatos.find((perfil) => {
            const perfilNorm = normalizarNome(perfil.nome_urna);
            const curto = perfilNorm.length <= candidatosNorm.length ? perfilNorm : candidatosNorm;
            const longo = perfilNorm.length <= candidatosNorm.length ? candidatosNorm : perfilNorm;
            return curto.length >= 8 && longo.includes(curto);
          })
        : null;

    const perfil = exato ?? porNomeCivil ?? provavel;
    if (!perfil) return null;

    const [presenca, ranking, governismo, temasVotacao] = await Promise.all([
      fetchAssiduidadeForPerfil(perfil).catch(() => null),
      fetchRankingForPerfil(perfil).catch(() => null),
      fetchGovernismoForPerfil(perfil).catch(() => null),
      fetchCamaraVoteThemesForPerfil(perfil).catch(() => []),
    ]);

    return {
      perfil,
      href: getOfficialProfileHref(perfil),
      correspondencia: exato || porNomeCivil ? 'exata' : 'provavel',
      presenca,
      ranking,
      governismo,
      temasVotacao,
    };
  },
);

/** Biografia curta via Wikipédia (mesma fonte usada nos perfis de parlamentares).
 * 1) tenta o título direto; 2) se não existir, usa a busca da Wikipédia
 * para achar o artigo certo (nomes de urna em caixa alta não são títulos válidos). */
export const buscarBiografia = cache(async (termo: string): Promise<string | null> => {
  if (!termo) return null;

  const extrair = async (titulo: string): Promise<string | null> => {
    const response = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&format=json&redirects=true&titles=${encodeURIComponent(titulo)}`,
      { next: { revalidate: 86400 } },
    );
    const data = (await response.json()) as { query?: { pages?: Record<string, { extract?: string }> } };
    const pages = data?.query?.pages;
    if (!pages) return null;
    const pageId = Object.keys(pages)[0];
    const extract = pages[pageId]?.extract;
    if (extract && !extract.includes('pode referir-se a:')) return extract.split('\n')[0];
    return null;
  };

  try {
    // 1º: título direto (nome de urna em Title Case costuma funcionar)
    const tituloDireto = termo
      .toLowerCase()
      .split(' ')
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ');
    const direto = await extrair(tituloDireto);
    if (direto) return direto;

    // 2º: busca na Wikipédia pelo termo completo
    const searchResponse = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(termo)}&srlimit=3&format=json`,
      { next: { revalidate: 86400 } },
    );
    const searchData = (await searchResponse.json()) as {
      query?: { search?: Array<{ title: string }> };
    };
    const candidatos = searchData?.query?.search ?? [];
    for (const resultado of candidatos) {
      const extraido = await extrair(resultado.title);
      if (extraido) return extraido;
    }
    return null;
  } catch {
    return null;
  }
});
