import { MetadataRoute } from 'next';
import { SEO } from '@/constants/theme';
import { getAllVehicleSlugs } from '@/data/fleet';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO.siteUrl;
  const currentDate = new Date();

  const routes = [
    '',
    '/about-us',
    '/contact-us',
    '/our-fleet',
    '/privacy-policy',
    '/terms-of-service',
    '/support',
    '/support/faq',
    '/support/help-center',
    '/support/privacy',
    '/support/terms',
  ];

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const vehicleRoutes: MetadataRoute.Sitemap = getAllVehicleSlugs().map((vehicleId) => ({
    url: `${baseUrl}/our-fleet/${vehicleId}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
