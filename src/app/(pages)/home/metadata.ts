import type { Metadata } from "next";
import { SEO } from '@/constants/theme';

export const metadata: Metadata = {
  title: 'Home - Event Force | Premium Transportation & Event Logistics',
  description: 'From luxury VIP vehicles to large-scale event logistics, we provide seamless, reliable, and premium transportation solutions that elevate every occasion across Saudi Arabia.',
  keywords: [
    'transportation',
    'luxury cars',
    'event logistics',
    'Saudi Arabia',
    'VIP transport',
    'car rental',
    'event planning',
    'chauffeur service',
    'premium transportation',
    'Event Force'
  ],
  metadataBase: new URL(SEO.siteUrl),
  openGraph: {
    title: 'Event Force - Premium Transportation & Event Logistics',
    description: 'From luxury VIP vehicles to large-scale event logistics, we provide seamless, reliable, and premium transportation solutions that elevate every occasion across Saudi Arabia.',
    url: SEO.siteUrl,
    siteName: SEO.siteName,
    images: [
      {
        url: SEO.ogImagePath,
        width: 1200,
        height: 630,
        alt: 'Event Force Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Force - Premium Transportation & Event Logistics',
    description: 'From luxury VIP vehicles to large-scale event logistics, we provide seamless, reliable, and premium transportation solutions that elevate every occasion across Saudi Arabia.',
    images: [SEO.ogImagePath],
  },
  alternates: {
    canonical: SEO.siteUrl,
  },
};

