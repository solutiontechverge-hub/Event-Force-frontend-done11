import { MetadataRoute } from 'next';
import { SEO } from '@/constants/theme';

// Vehicle list - matches the fleet array from FleetPage
const vehicles = [
  'ford-taurus',
  'gmc-yukon',
  'bmw-5-series',
  'mercedes-s450',
  'bmw-7-series',
  'mercedes-v-class',
  'toyota-hiace',
  'toyota-coaster',
  'chines-bus-49-sea',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO.siteUrl;
  const currentDate = new Date();

  // Static pages
  const routes = [
    '',
    '/home',
    '/about-us',
    '/contact-us',
    '/our-fleet',
    '/faq',
    '/help-center',
    '/privacy-policy',
    '/terms-of-service',
    '/support',
    '/support/faq',
    '/support/help-center',
    '/support/privacy',
    '/support/terms',
  ];

  // Generate sitemap entries for static routes
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route === '/home' ? 'daily' : 'weekly',
    priority: route === '' || route === '/home' ? 1.0 : 0.8,
  }));

  // Dynamic routes - vehicle detail pages
  const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((vehicleId) => ({
    url: `${baseUrl}/our-fleet/${vehicleId}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}

