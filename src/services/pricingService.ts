import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  DEFAULT_FLEET_CONFIG,
  DEFAULT_PRICING,
  getDefaultFleetConfig,
  getDefaultPricing,
} from "@/data/defaultPricing";
import type { FleetConfig, PricingData } from "@/types/fleetPricing";
import { ROUTE_DEFINITIONS, VEHICLE_PRICE_KEYS } from "@/types/fleetPricing";
import type { RoutePriceKey, VehiclePriceKey } from "@/types/fleetPricing";

const PRICING_DOC = doc(db, "config", "pricing");
const FLEET_DOC = doc(db, "config", "fleet");

function mergePricing(data: Partial<PricingData> | undefined): PricingData {
  const defaults = getDefaultPricing();

  if (!data) return defaults;

  return {
    routes: { ...defaults.routes, ...(data.routes ?? {}) },
    hourly: { ...defaults.hourly, ...(data.hourly ?? {}) },
    daily8: { ...defaults.daily8, ...(data.daily8 ?? {}) },
    daily12: { ...defaults.daily12, ...(data.daily12 ?? {}) },
    extraHour: { ...defaults.extraHour, ...(data.extraHour ?? {}) },
  };
}

function mergeFleet(data: Partial<FleetConfig> | undefined): FleetConfig {
  if (!data?.vehicles?.length) {
    return getDefaultFleetConfig();
  }

  return {
    vehicles: data.vehicles,
  };
}

export async function fetchPricing(): Promise<PricingData> {
  const snapshot = await getDoc(PRICING_DOC);
  return mergePricing(snapshot.data() as PricingData | undefined);
}

export async function fetchFleetConfig(): Promise<FleetConfig> {
  const snapshot = await getDoc(FLEET_DOC);
  return mergeFleet(snapshot.data() as FleetConfig | undefined);
}

export function subscribeToPricing(
  onData: (pricing: PricingData) => void,
  onError?: (error: Error) => void,
) {
  return onSnapshot(
    PRICING_DOC,
    (snapshot) => {
      onData(mergePricing(snapshot.data() as PricingData | undefined));
    },
    (error) => onError?.(error),
  );
}

export function subscribeToFleetConfig(
  onData: (fleet: FleetConfig) => void,
  onError?: (error: Error) => void,
) {
  return onSnapshot(
    FLEET_DOC,
    (snapshot) => {
      onData(mergeFleet(snapshot.data() as FleetConfig | undefined));
    },
    (error) => onError?.(error),
  );
}

export async function savePricing(
  pricing: PricingData,
  updatedBy: string,
): Promise<void> {
  await setDoc(PRICING_DOC, {
    ...pricing,
    updatedAt: serverTimestamp(),
    updatedBy,
  });
}

export async function saveFleetConfig(
  fleet: FleetConfig,
  updatedBy: string,
): Promise<void> {
  await setDoc(FLEET_DOC, {
    ...fleet,
    updatedAt: serverTimestamp(),
    updatedBy,
  });
}

export async function seedPricingAndFleet(updatedBy: string): Promise<void> {
  const pricingSnap = await getDoc(PRICING_DOC);
  const fleetSnap = await getDoc(FLEET_DOC);

  if (!pricingSnap.exists()) {
    await savePricing(DEFAULT_PRICING, updatedBy);
  }

  if (!fleetSnap.exists()) {
    await saveFleetConfig(DEFAULT_FLEET_CONFIG, updatedBy);
  }
}

export function getRoutePrice(
  pricing: PricingData,
  routeKey: string,
  vehicleKey: VehiclePriceKey,
): number | null {
  const routeRates = pricing.routes[routeKey as RoutePriceKey];
  if (!routeRates) return null;
  const rate = routeRates[vehicleKey];
  return rate === undefined ? null : rate;
}

export function getHourlyPrice(
  pricing: PricingData,
  vehicleKey: VehiclePriceKey,
): number | null {
  const rate = pricing.hourly[vehicleKey];
  return rate === undefined ? null : rate;
}

export function calculateBookingPrice(
  pricing: PricingData,
  carName: string,
  pickup: string,
  destination: string,
  getVehicleKey: (name: string) => VehiclePriceKey | null,
): number | null {
  const vehicleKey = getVehicleKey(carName);
  if (!vehicleKey) return null;

  const pickupNorm = pickup?.toLowerCase().trim();
  const destinationNorm = destination?.toLowerCase().trim();
  if (!pickupNorm || !destinationNorm) return null;

  const matchRoute = (a: string, b: string, key: RoutePriceKey) => {
    if (
      (pickupNorm.includes(a) && destinationNorm.includes(b)) ||
      (pickupNorm.includes(b) && destinationNorm.includes(a))
    ) {
      return getRoutePrice(pricing, key, vehicleKey);
    }
    return null;
  };

  let price =
    matchRoute("riyadh airport", "city", "riyadh-airport-city") ??
    matchRoute("dammam airport", "city", "dammam-airport-city") ??
    matchRoute("jeddah airport", "city", "jeddah-airport-city") ??
    matchRoute("madinah airport", "city", "madina-airport-city");

  if (price !== null) return price;

  price =
    matchRoute("riyadh downtown", "city", "riyadh-downtown-city") ??
    matchRoute("jeddah downtown", "city", "jeddah-downtown-city") ??
    matchRoute("dammam downtown", "city", "dammam-downtown-city") ??
    matchRoute("madina downtown", "city", "madina-downtown-city");

  if (price !== null) return price;

  price =
    matchRoute("jeddah", "kaust", "jeddah-kaust") ??
    matchRoute("jeddah", "kaec", "jeddah-kaec") ??
    matchRoute("jeddah", "yanbu", "jeddah-yanbu") ??
    matchRoute("jeddah", "neom", "jeddah-neom") ??
    matchRoute("jeddah", "umluj", "jeddah-red-sea-umluj");

  if (price !== null) return price;

  price =
    matchRoute("jeddah airport", "makkah", "jeddah-airport-makkah") ??
    matchRoute("makkah", "madinah", "jeddah-makkah-medina");

  if (price !== null) return price;

  return getHourlyPrice(pricing, vehicleKey) ?? 100;
}

export { ROUTE_DEFINITIONS, VEHICLE_PRICE_KEYS };
