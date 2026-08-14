import type { MetadataRoute } from 'next';
import { getActiveGuides } from '@/lib/guides';
import { EDITORIAL_ARTICLES } from '@/lib/editorial';

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

  // Fase 1 do plano de correcao AdSense: perfis de template (/perfil/*) e as
  // paginas de UF/partido sem conteudo editorial proprio saem do sitemap e
  // ficam com noindex. Voltao ao indice apenas quando receberem texto escrito
  // por humano (Fases 3.3/3.4/3.6).
  return [...staticRoutes, ...guideRoutes, ...editorialRoutes];
}
