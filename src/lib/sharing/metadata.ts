import type { Metadata } from 'next';
export function toolMetadata(title: string, description: string, path: string): Metadata {
  const url = `https://www.quemvotar.com.br${path}`;
  const image = `${url}/opengraph-image`;
  return { title, description, alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', locale: 'pt_BR', images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] } };
}
