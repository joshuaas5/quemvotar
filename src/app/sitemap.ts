import type { MetadataRoute } from 'next';
import { getActiveGuides } from '@/lib/guides';
import { EDITORIAL_ARTICLES } from '@/lib/editorial';
import { getAllPartidosEditorial } from '@/lib/partidos-editorial-utils';
import { UFS_EDITORIAL } from '@/lib/content/uf-editorial';
import { getAllPerfisEditorial } from '@/lib/perfis-editorial-utils';

export const revalidate = 86400;

const editorialLastModified = new Date('2026-06-02');
const eleicao2026LastModified = new Date('2026-08-19');


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.quemvotar.com.br';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 1 },
    // Eleições 2026 (prioridade máxima — eleição em 04/10/2026)
    { url: `${baseUrl}/candidatos`, lastModified: eleicao2026LastModified, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${baseUrl}/match/candidatos`, lastModified: eleicao2026LastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/candidatos/metodologia`, lastModified: eleicao2026LastModified, changeFrequency: 'monthly', priority: 0.55 },
    { url: `${baseUrl}/guias`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/metodologia`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/sobre`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/politica-editorial`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/parlamentares`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/ranking`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/match`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/partidos`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const guideRoutes: MetadataRoute.Sitemap = getActiveGuides().map((article) => ({
    url: `${baseUrl}/guias/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const editorialRoutes: MetadataRoute.Sitemap = EDITORIAL_ARTICLES.map((article) => ({
    url: `${baseUrl}/editorial/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Fase 3.3/3.4: partidos e UFs com conteudo editorial proprio voltam ao sitemap.
  const partidoRoutes: MetadataRoute.Sitemap = getAllPartidosEditorial().map((partido) => ({
    // Siglas acentuadas (ex.: UNIÃO) precisam de percent-encoding para que
    // crawlers nao enviem bytes crus e recebam 500.
    url: `${baseUrl}/partidos/${encodeURIComponent(partido.sigla)}`,
    lastModified: new Date(partido.atualizadoEm),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  const ufRoutes: MetadataRoute.Sitemap = UFS_EDITORIAL.map((estado) => ({
    url: `${baseUrl}/uf/${estado.uf}`,
    lastModified: new Date(estado.atualizadoEm),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Fase 3.6: perfis com texto editorial humano voltam ao sitemap (allowlist).
  const perfilRoutes: MetadataRoute.Sitemap = getAllPerfisEditorial().map((perfil) => ({
    url: `${baseUrl}/perfil/${perfil.fonte}/${perfil.idOrigem}`,
    lastModified: new Date(perfil.atualizadoEm),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Fase 1 do plano de correcao AdSense: perfis de template (/perfil/*) e as
  // paginas de UF/partido sem conteudo editorial proprio saem do sitemap e
  // ficam com noindex. Voltao ao indice apenas quando receberem texto escrito
  // por humano (Fases 3.3/3.4/3.6).
  return [...staticRoutes, ...guideRoutes, ...editorialRoutes, ...partidoRoutes, ...ufRoutes, ...perfilRoutes];
}
