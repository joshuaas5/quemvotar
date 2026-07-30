import type { MetadataRoute } from 'next';
import { fetchOfficialCongressProfiles, getPartidosResumo } from '@/lib/official';
import { GUIDE_ARTICLES } from '@/lib/guides';
import { isProfileEligibleForSitemap } from '@/lib/seo/indexability';

export const revalidate = 86400;

const editorialLastModified = new Date('2026-06-02');


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.quemvotar.com.br';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/guias`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/metodologia`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/sobre`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/politica-editorial`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/parlamentares`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/ranking`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/match`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/partidos`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const [perfis, partidos] = await Promise.all([
    fetchOfficialCongressProfiles().catch(() => []),
    getPartidosResumo().catch(() => []),
  ]);

  const perfilRoutes: MetadataRoute.Sitemap = perfis.filter(isProfileEligibleForSitemap).map((perfil) => ({
    url: `${baseUrl}/perfil/${perfil.fonte}/${perfil.idOrigem}`,
    // The list endpoint does not expose a trustworthy modification date for
    // every profile. Omit lastmod instead of claiming a page changed weekly.
    changeFrequency: 'monthly',
    priority: 0.55,
  }));

  const partidoRoutes: MetadataRoute.Sitemap = partidos.map((partido) => ({
    url: `${baseUrl}/partidos/${partido.sigla}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const ufSet = new Set(perfis.map((p) => p.uf).filter((uf): uf is string => Boolean(uf)));
  const ufRoutes: MetadataRoute.Sitemap = Array.from(ufSet).map((uf) => ({
    url: `${baseUrl}/uf/${uf.toLowerCase()}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDE_ARTICLES.map((article) => ({
    url: `${baseUrl}/guias/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...guideRoutes, ...perfilRoutes, ...partidoRoutes, ...ufRoutes];
}
