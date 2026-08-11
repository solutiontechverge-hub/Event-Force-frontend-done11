import type { StaticImageData } from "next/image";
import {
  BmwBlack1,
  CarBmw7Series,
  CarChinesbus49Sea,
  CarFordTaurus,
  CarGmc,
  CarHiace,
  CarMercedesS450,
  CarMercedesVClass,
  CarMw5Series,
  CarToyotaCoaster,
  MeTrendAgateBlack01,
} from "./fleetImages";
import type { FleetColorVariant, FleetVehicleConfig } from "@/types/fleetPricing";
import {
  DEFAULT_FLEET_CONFIG,
  DEFAULT_FLEET_VEHICLES,
  getDefaultFleetConfig,
} from "./defaultPricing";
import { formatSarPrice } from "@/lib/vehicleKeys";
import type { PricingData } from "@/types/fleetPricing";
import type { FleetImageSource } from "@/lib/fleetImageUtils";

const IMAGE_MAP: Record<string, StaticImageData> = {
  CarFordTaurus,
  CarGmc,
  CarMw5Series,
  CarMercedesS450,
  CarBmw7Series,
  CarMercedesVClass,
  CarHiace,
  CarToyotaCoaster,
  CarChinesbus49Sea,
  MeTrendAgateBlack01,
  BmwBlack1,
};

export const FLEET_IMAGE_OPTIONS = Object.keys(IMAGE_MAP);

export interface FleetVehicle extends FleetVehicleConfig {
  image: FleetImageSource;
  bookingImage?: FleetImageSource;
  listPrice: string;
  listDuration: string;
  detailPrice: string;
  detailDuration: string;
}

export type ResolvedFleetVehicle = FleetVehicle;

const PACKAGE_12H_VEHICLE_KEYS = new Set([
  "hiace12",
  "coaster23",
  "bus49",
]);

function resolveDetailPricing(
  config: FleetVehicleConfig,
  pricing?: PricingData | null,
): Pick<FleetVehicle, "detailPrice" | "detailDuration"> {
  if (PACKAGE_12H_VEHICLE_KEYS.has(config.vehicleKey)) {
    const packageRate = pricing?.daily12?.[config.vehicleKey] ?? null;
    return {
      detailPrice: formatSarPrice(packageRate),
      detailDuration: "12 hours",
    };
  }

  const hourlyRate = pricing?.hourly?.[config.vehicleKey] ?? null;
  return {
    detailPrice: formatSarPrice(hourlyRate),
    detailDuration: "Per Hour",
  };
}

function resolveLocalImage(key: string): StaticImageData {
  return IMAGE_MAP[key] ?? CarFordTaurus;
}

function resolveConfiguredImage(
  key: string | undefined,
  fallbackKey: string,
): FleetImageSource {
  if (key) return resolveLocalImage(key);
  return resolveLocalImage(fallbackKey);
}

export function resolveColorVariantImage(
  variant: FleetColorVariant,
): FleetImageSource {
  if (variant.imageKey) return resolveLocalImage(variant.imageKey);
  return CarFordTaurus;
}

export function resolveFleetVehicle(
  config: FleetVehicleConfig,
  pricing?: PricingData | null,
): ResolvedFleetVehicle {
  const hourlyRate = pricing?.hourly?.[config.vehicleKey] ?? null;
  const detailPricing = resolveDetailPricing(config, pricing);

  return {
    ...config,
    image: resolveConfiguredImage(config.imageKey, "CarFordTaurus"),
    bookingImage: config.bookingImageKey
      ? resolveLocalImage(config.bookingImageKey)
      : undefined,
    listPrice: formatSarPrice(hourlyRate),
    listDuration: "Per hour",
    ...detailPricing,
  };
}

export function resolveFleetVehicles(
  configs: FleetVehicleConfig[],
  pricing?: PricingData | null,
): ResolvedFleetVehicle[] {
  return configs.map((config) => resolveFleetVehicle(config, pricing));
}

export function getHomepageFleet(
  configs: FleetVehicleConfig[],
  pricing?: PricingData | null,
): ResolvedFleetVehicle[] {
  return resolveFleetVehicles(
    configs.filter((vehicle) => vehicle.showOnHomepage),
    pricing,
  );
}

export { DEFAULT_FLEET_VEHICLES, DEFAULT_FLEET_CONFIG, getDefaultFleetConfig };

export function getVehicleBySlugFromConfig(
  slug: string,
  configs: FleetVehicleConfig[],
): FleetVehicleConfig | undefined {
  return configs.find((vehicle) => vehicle.slug === slug);
}

export function getAllVehicleSlugsFromConfig(
  configs: FleetVehicleConfig[],
): string[] {
  return configs.map((vehicle) => vehicle.slug);
}

export function getVehicleSlugFromConfig(
  name: string,
  configs: FleetVehicleConfig[],
): string {
  const found = configs.find(
    (vehicle) => vehicle.name.toLowerCase() === name.toLowerCase(),
  );
  return found?.slug ?? name.toLowerCase().replace(/\s+/g, "-");
}

export function toBookingFleetFromResolved(
  vehicles: ResolvedFleetVehicle[],
) {
  return vehicles.map((vehicle) => ({
    name: vehicle.name,
    price: vehicle.detailPrice,
    duration: vehicle.detailDuration,
    image: vehicle.bookingImage ?? vehicle.image,
    class: vehicle.class,
    year: vehicle.year,
    branch: vehicle.defaultBranch,
  }));
}

// Backward-compatible exports for pages not yet on PricingContext
export const FLEET_VEHICLES = resolveFleetVehicles(DEFAULT_FLEET_VEHICLES);

export function getVehicleBySlug(slug: string): ResolvedFleetVehicle | undefined {
  const config = getVehicleBySlugFromConfig(slug, DEFAULT_FLEET_VEHICLES);
  return config ? resolveFleetVehicle(config) : undefined;
}

export function getAllVehicleSlugs() {
  return getAllVehicleSlugsFromConfig(DEFAULT_FLEET_VEHICLES);
}

export function getVehicleSlug(name: string) {
  return getVehicleSlugFromConfig(name, DEFAULT_FLEET_VEHICLES);
}

export function toBookingFleet() {
  return toBookingFleetFromResolved(FLEET_VEHICLES);
}
