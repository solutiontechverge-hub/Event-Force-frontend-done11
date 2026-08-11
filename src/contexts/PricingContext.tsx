"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { FleetConfig, PricingData } from "@/types/fleetPricing";
import {
  getDefaultFleetConfig,
  getDefaultPricing,
} from "@/data/defaultPricing";
import {
  resolveFleetVehicle,
  resolveFleetVehicles,
  getHomepageFleet,
  type ResolvedFleetVehicle,
} from "@/data/fleet";
import {
  subscribeToFleetConfig,
  subscribeToPricing,
  calculateBookingPrice,
  getHourlyPrice,
} from "@/services/pricingService";
import { getVehicleKeyFromName } from "@/lib/vehicleKeys";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrors";

interface PricingContextValue {
  pricing: PricingData;
  fleetConfig: FleetConfig;
  fleetVehicles: ResolvedFleetVehicle[];
  homepageFleet: ResolvedFleetVehicle[];
  isLoading: boolean;
  syncError: string | null;
  getHourlyRate: (carName: string) => number | null;
  getBookingPrice: (
    carName: string,
    pickup: string,
    destination: string,
  ) => number | null;
  getVehicleBySlug: (slug: string) => ResolvedFleetVehicle | undefined;
}

const PricingContext = createContext<PricingContextValue | undefined>(
  undefined,
);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [pricing, setPricing] = useState<PricingData>(getDefaultPricing);
  const [fleetConfig, setFleetConfig] = useState<FleetConfig>(
    getDefaultFleetConfig,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    let pricingReady = false;
    let fleetReady = false;

    const markReady = () => {
      if (pricingReady && fleetReady) {
        setIsLoading(false);
      }
    };

    const handleSyncError = (error: Error) => {
      setSyncError(getFirebaseErrorMessage(error));
    };

    const unsubPricing = subscribeToPricing(
      (data) => {
        setPricing(data);
        setSyncError(null);
        pricingReady = true;
        markReady();
      },
      (error) => {
        handleSyncError(error);
        pricingReady = true;
        markReady();
      },
    );

    const unsubFleet = subscribeToFleetConfig(
      (data) => {
        setFleetConfig(data);
        setSyncError(null);
        fleetReady = true;
        markReady();
      },
      (error) => {
        handleSyncError(error);
        fleetReady = true;
        markReady();
      },
    );

    return () => {
      unsubPricing();
      unsubFleet();
    };
  }, []);

  const fleetVehicles = useMemo(
    () => resolveFleetVehicles(fleetConfig.vehicles, pricing),
    [fleetConfig.vehicles, pricing],
  );

  const homepageFleet = useMemo(
    () => getHomepageFleet(fleetConfig.vehicles, pricing),
    [fleetConfig.vehicles, pricing],
  );

  const getHourlyRate = useCallback(
    (carName: string) => {
      const key = getVehicleKeyFromName(carName);
      if (!key) return null;
      return getHourlyPrice(pricing, key);
    },
    [pricing],
  );

  const getBookingPriceFn = useCallback(
    (carName: string, pickup: string, destination: string) =>
      calculateBookingPrice(
        pricing,
        carName,
        pickup,
        destination,
        getVehicleKeyFromName,
      ),
    [pricing],
  );

  const getVehicleBySlugFn = useCallback(
    (slug: string) => {
      const config = fleetConfig.vehicles.find(
        (vehicle) => vehicle.slug === slug,
      );
      if (!config) return undefined;
      return resolveFleetVehicle(config, pricing);
    },
    [fleetConfig.vehicles, pricing],
  );

  const value = useMemo<PricingContextValue>(
    () => ({
      pricing,
      fleetConfig,
      fleetVehicles,
      homepageFleet,
      isLoading,
      syncError,
      getHourlyRate,
      getBookingPrice: getBookingPriceFn,
      getVehicleBySlug: getVehicleBySlugFn,
    }),
    [
      pricing,
      fleetConfig,
      fleetVehicles,
      homepageFleet,
      isLoading,
      syncError,
      getHourlyRate,
      getBookingPriceFn,
      getVehicleBySlugFn,
    ],
  );

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error("usePricing must be used within PricingProvider");
  }
  return context;
}
