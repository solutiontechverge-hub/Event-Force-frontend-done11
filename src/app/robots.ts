import { MetadataRoute } from 'next';
import { SEO } from '@/constants/theme';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin-login',
          '/login',
          '/signin',
          '/signup',
          '/forgot-password',
          '/reset-password',
          '/manage-booking',
          '/profile',
          '/success',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin-login',
          '/login',
          '/signin',
          '/signup',
          '/forgot-password',
          '/reset-password',
          '/manage-booking',
          '/profile',
          '/success',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

