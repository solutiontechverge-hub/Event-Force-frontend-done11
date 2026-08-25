import { getVehicleBySlug } from '@/data/fleet';
import { SEO } from '@/constants/theme';
import { getFleetImageSrc } from '@/lib/fleetImageUtils';

export function VehicleJsonLd({ vehicleId }: { vehicleId: string }) {
  const vehicle = getVehicleBySlug(vehicleId);
  if (!vehicle) return null;

  const imageSrc = getFleetImageSrc(vehicle.image);
  const schemaImage = imageSrc.startsWith('http')
    ? imageSrc
    : `${SEO.siteUrl}${imageSrc}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vehicle.name,
    description: `${vehicle.name} — premium ${vehicle.class} vehicle rental from Event Force.`,
    image: schemaImage,
    brand: {
      '@type': 'Brand',
      name: SEO.siteName,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'SAR',
      price: vehicle.detailPrice.replace(/[^\d.]/g, ''),
      availability: 'https://schema.org/InStock',
      url: `${SEO.siteUrl}/our-fleet/${vehicleId}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
