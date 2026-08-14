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

/**
 * Schema Article com autor e publisher (Fase 2 do plano de correcao AdSense).
 * Usado em guias e analises editoriais assinadas.
 */
export function buildArticleSchema(params: {
  headline: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  author?: { name: string; url: string } | null;
  publisherName: string;
  publisherUrl: string;
  logoUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.headline,
    description: params.description,
    datePublished: params.publishedAt,
    dateModified: params.updatedAt,
    isAccessibleForFree: true,
    ...(params.author
      ? { author: { '@type': 'Person', name: params.author.name, url: params.author.url } }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: params.publisherName,
      url: params.publisherUrl,
      ...(params.logoUrl ? { logo: params.logoUrl } : {}),
    },
    mainEntityOfPage: params.url,
  };
}

/**
 * Schema FAQPage (Fase 3.2 do plano). Usado nos guias com secao de perguntas
 * frequentes, permitindo rich result no Google.
 */
export function buildFaqPageSchema(faq: { pergunta: string; resposta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: item.resposta },
    })),
  };
}
