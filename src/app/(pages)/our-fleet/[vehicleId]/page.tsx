import type { Metadata } from 'next';
import { getVehicleBySlug } from '@/data/fleet';
import { createPageMetadata } from '@/lib/metadata';
import VehicleDetailClient from './VehicleDetailClient';
import { VehicleJsonLd } from './VehicleJsonLd';

type PageProps = {
  params: Promise<{ vehicleId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vehicleId } = await params;
  const vehicle = getVehicleBySlug(vehicleId);

  if (!vehicle) {
    return createPageMetadata({
      title: 'Vehicle Not Found | Event Force',
      description: 'The requested vehicle could not be found in our fleet.',
      path: `/our-fleet/${vehicleId}`,
    });
  }

  return createPageMetadata({
    title: `${vehicle.name} | Event Force Fleet`,
    description: `Book the ${vehicle.name} — ${vehicle.detailPrice} ${vehicle.detailDuration}. Premium ${vehicle.class} transportation across Saudi Arabia.`,
    path: `/our-fleet/${vehicleId}`,
  });
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { vehicleId } = await params;
  return (
    <>
      <VehicleJsonLd vehicleId={vehicleId} />
      <VehicleDetailClient />
    </>
  );
}
