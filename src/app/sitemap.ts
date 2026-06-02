import type { MetadataRoute } from 'next';
import { fetchOfficialCongressProfiles, getPartidosResumo } from '@/lib/official';
import { GUIDE_ARTICLES } from '@/lib/guides';

export const revalidate = 86400;

const editorialLastModified = new Date('2026-04-28');

function isIndexablePerfil(perfil: { fonte: string; idOrigem: string; nome_urna: string; partido: string; uf?: string | null }) {
  return (
    (perfil.fonte === 'camara' || perfil.fonte === 'senado') &&
    Boolean(perfil.idOrigem) &&
    Boolean(perfil.nome_urna) &&
    Boolean(perfil.partido) &&
    Boolean(perfil.uf)
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.quemvotar.com.br';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: editorialLastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/parlamentares`, lastModified: editorialLastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/ranking`, lastModified: editorialLastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/match`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/partidos`, lastModified: editorialLastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/sobre`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/metodologia`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/politica-editorial`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/guias`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/contact`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: editorialLastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: editorialLastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/api-docs`, lastModified: editorialLastModified, changeFrequency: 'monthly', priority: 0.4 },
  ];

  const [perfis, partidos] = await Promise.all([
    fetchOfficialCongressProfiles().catch(() => []),
    getPartidosResumo().catch(() => []),
  ]);

  const perfilRoutes: MetadataRoute.Sitemap = perfis.filter(isIndexablePerfil).map((perfil) => ({
    url: `${baseUrl}/perfil/${perfil.fonte}/${perfil.idOrigem}`,
    lastModified: editorialLastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const partidoRoutes: MetadataRoute.Sitemap = partidos.map((partido) => ({
    url: `${baseUrl}/partidos/${partido.sigla}`,
    lastModified: editorialLastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const ufSet = new Set(perfis.map((p) => p.uf).filter((uf): uf is string => Boolean(uf)));
  const ufRoutes: MetadataRoute.Sitemap = Array.from(ufSet).map((uf) => ({
    url: `${baseUrl}/uf/${uf.toLowerCase()}`,
    lastModified: editorialLastModified,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDE_ARTICLES.map((article) => ({
    url: `${baseUrl}/guias/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...guideRoutes, ...perfilRoutes, ...partidoRoutes, ...ufRoutes];
}
