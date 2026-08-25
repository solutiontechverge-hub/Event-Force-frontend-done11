'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import { getVehicleSlug } from '@/data/fleet';
import { usePageMount } from '@/hooks/usePageMount';

export interface DetailCar {
  name: string;
  price: string;
  duration: string;
  image: unknown;
  class: string;
  transport?: string;
  branch: string[];
}

export function useVehicleDetail() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getVehicleBySlug } = usePricing();
  const isMounted = usePageMount();

  const vehicleId = params?.vehicleId as string;
  const colorIndexParam = searchParams?.get('colorIndex');
  const initialColorIndex = colorIndexParam ? parseInt(colorIndexParam, 10) : 0;

  const [selectedColor, setSelectedColor] = useState(initialColorIndex);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [hoveredMainImage, setHoveredMainImage] = useState(false);
  const [hoveredInteriorImage, setHoveredInteriorImage] = useState<number | null>(null);

  useEffect(() => {
    if (colorIndexParam) {
      const colorIndex = parseInt(colorIndexParam, 10);
      if (!Number.isNaN(colorIndex) && colorIndex >= 0) {
        setSelectedColor(colorIndex);
      }
    }
  }, [colorIndexParam]);

  const selectedCar: DetailCar | undefined = useMemo(() => {
    const vehicleData = getVehicleBySlug(vehicleId);
    if (!vehicleData) return undefined;

    return {
      name: vehicleData.name,
      price: vehicleData.detailPrice,
      duration: vehicleData.detailDuration,
      image: vehicleData.image,
      class: vehicleData.class,
      branch: vehicleData.branches,
      transport: vehicleData.transport,
    };
  }, [getVehicleBySlug, vehicleId]);

  const buildBookingUrl = (
    getColorOptions: () => Array<{ id: string; image: unknown }>,
  ) => {
    if (!selectedCar) return null;

    const colorOptions = getColorOptions();
    const selectedColorOption = colorOptions[selectedColor];
    const imageToUse = selectedColorOption?.image || selectedCar.image;

    let imageSrc = '';
    if (imageToUse) {
      if (typeof imageToUse === 'string') {
        imageSrc = imageToUse;
      } else if (
        typeof imageToUse === 'object' &&
        imageToUse !== null &&
        'src' in imageToUse &&
        typeof (imageToUse as { src: string }).src === 'string'
      ) {
        imageSrc = (imageToUse as { src: string }).src;
      }
    }

    const query = new URLSearchParams({
      car: getVehicleSlug(selectedCar.name),
      price: selectedCar.price,
      duration: selectedCar.duration,
      colorIndex: selectedColor.toString(),
      colorId: selectedColorOption?.id || 'default',
      image: imageSrc,
      from: 'details',
    });

    return `/manage-booking?${query.toString()}`;
  };

  const handleBookNow = (
    getColorOptions: () => Array<{ id: string; image: unknown }>,
  ) => {
    const url = buildBookingUrl(getColorOptions);
    if (url) router.push(url);
  };

  return {
    vehicleId,
    isMounted,
    selectedCar,
    selectedColor,
    setSelectedColor,
    heroImageLoaded,
    setHeroImageLoaded,
    hoveredMainImage,
    setHoveredMainImage,
    hoveredInteriorImage,
    setHoveredInteriorImage,
    handleBookNow,
    router,
  };
}
