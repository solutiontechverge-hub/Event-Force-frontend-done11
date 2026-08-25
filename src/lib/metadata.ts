import type { Metadata } from 'next';
import { SEO } from '@/constants/theme';

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function createPageMetadata({
  title,
  description,
  path = '',
  noIndex = false,
  keywords,
}: PageMetadataOptions): Metadata {
  const url = `${SEO.siteUrl}${path}`;

  return {
    title,
    description,
    keywords: keywords ?? SEO.keywords,
    metadataBase: new URL(SEO.siteUrl),
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SEO.siteName,
      type: 'website',
      locale: 'ar_SA',
      images: [
        {
          url: SEO.ogImagePath,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SEO.ogImagePath],
    },
    alternates: {
      canonical: url,
    },
  };
}
