/**
 * Utilitários para gerar JSON-LD schemas.
 * Use com <script type="application/ld+json"> injetado via dangerouslySetInnerHTML.
 */

export function buildWebSiteSchema(baseUrl: string, name: string, description: string, searchUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: baseUrl,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}${searchUrl}`,
      },
      'query-input': 'required name=q',
    },
  };
}

export function buildOrganizationSchema(
  name: string,
  url: string,
  description: string,
  logo?: string,
  sameAs?: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    description,
    ...(logo ? { logo } : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildBreadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: { '@type': 'Thing', '@id': item.url } } : {}),
    })),
  };
}
