import type { MetadataRoute } from 'next';
import { fetchOfficialCongressProfiles, getPartidosResumo } from '@/lib/official';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://quemvotar.com.br';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/parlamentares`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/ranking`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/match`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/partidos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/busca`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/comparar`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/api-docs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const [perfis, partidos] = await Promise.all([
    fetchOfficialCongressProfiles().catch(() => []),
    getPartidosResumo().catch(() => []),
  ]);

  const perfilRoutes: MetadataRoute.Sitemap = perfis.map((perfil) => ({
    url: `${baseUrl}/perfil/${perfil.fonte}/${perfil.idOrigem}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  const partidoRoutes: MetadataRoute.Sitemap = partidos.map((partido) => ({
    url: `${baseUrl}/partidos/${partido.sigla}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const ufSet = new Set(perfis.map((p) => p.uf).filter((uf): uf is string => Boolean(uf)));
  const ufRoutes: MetadataRoute.Sitemap = Array.from(ufSet).map((uf) => ({
    url: `${baseUrl}/uf/${uf.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...perfilRoutes, ...partidoRoutes, ...ufRoutes];
}
