import type { MetadataRoute } from 'next';
import { getPartidosResumo } from '@/lib/official';
import { GUIDE_ARTICLES } from '@/lib/guides';

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

  const partidos = await getPartidosResumo().catch(() => []);

  const partidoRoutes: MetadataRoute.Sitemap = partidos.map((partido) => ({
    url: `${baseUrl}/partidos/${partido.sigla}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const ufRoutes: MetadataRoute.Sitemap = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ].map((uf) => ({
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

  // Perfis individuais continuam acessiveis por busca e pelos links internos.
  // Eles voltam ao sitemap quando houver curadoria da versao detalhada de cada perfil.
  return [...staticRoutes, ...guideRoutes, ...partidoRoutes, ...ufRoutes];
}
