import { RateCard, VehicleType } from '@/types/pricing';

export const rateCard2025: RateCard = {
  year: 2025,
  note: 'The above rate excludes VAT 15%',
  entries: [
    // Airport Transfers
    {
      type: 'airport_transfer',
      city: 'riyadh',
      from: 'Riyadh Airport (pick up / Drop)',
      to: 'City',
      rates: [
        { vehicleType: 'ford_taurus', rate: 150 },
        { vehicleType: 'yukon', rate: 300 },
        { vehicleType: 'bmw_5', rate: 250 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 450 },
        { vehicleType: 'hiace_12_seat', rate: 500 },
        { vehicleType: 'coaster_23_seat', rate: 800 },
        { vehicleType: 'bus_49_seat', rate: 1200 },
      ],
    },
    {
      type: 'city_transfer',
      city: 'riyadh',
      from: 'Downtown',
      to: 'Inside City',
      rates: [
        { vehicleType: 'ford_taurus', rate: 125 },
        { vehicleType: 'yukon', rate: 250 },
        { vehicleType: 'bmw_5', rate: 225 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 350 },
        { vehicleType: 'hiace_12_seat', rate: 400 },
        { vehicleType: 'coaster_23_seat', rate: 600 },
        { vehicleType: 'bus_49_seat', rate: 1000 },
      ],
    },
    {
      type: 'airport_transfer',
      city: 'dammam',
      from: 'Dammam Airport (pick up / Drop)',
      to: 'City',
      rates: [
        { vehicleType: 'ford_taurus', rate: 150 },
        { vehicleType: 'yukon', rate: 300 },
        { vehicleType: 'bmw_5', rate: 250 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 450 },
        { vehicleType: 'hiace_12_seat', rate: 500 },
        { vehicleType: 'coaster_23_seat', rate: 800 },
        { vehicleType: 'bus_49_seat', rate: 1200 },
      ],
    },
    {
      type: 'city_transfer',
      city: 'dammam',
      from: 'Downtown',
      to: 'Inside City',
      rates: [
        { vehicleType: 'ford_taurus', rate: 125 },
        { vehicleType: 'yukon', rate: 250 },
        { vehicleType: 'bmw_5', rate: 225 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 350 },
        { vehicleType: 'hiace_12_seat', rate: 400 },
        { vehicleType: 'coaster_23_seat', rate: 600 },
        { vehicleType: 'bus_49_seat', rate: 1000 },
      ],
    },
    {
      type: 'airport_transfer',
      city: 'jeddah',
      from: 'Jeddah Airport (pick up / Drop)',
      to: 'City',
      rates: [
        { vehicleType: 'ford_taurus', rate: 150 },
        { vehicleType: 'yukon', rate: 300 },
        { vehicleType: 'bmw_5', rate: 250 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 400 },
        { vehicleType: 'hiace_12_seat', rate: 500 },
        { vehicleType: 'coaster_23_seat', rate: 800 },
        { vehicleType: 'bus_49_seat', rate: 1200 },
      ],
    },
    {
      type: 'city_transfer',
      city: 'jeddah',
      from: 'Downtown',
      to: 'Inside City',
      rates: [
        { vehicleType: 'ford_taurus', rate: 125 },
        { vehicleType: 'yukon', rate: 250 },
        { vehicleType: 'bmw_5', rate: 225 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 350 },
        { vehicleType: 'hiace_12_seat', rate: 400 },
        { vehicleType: 'coaster_23_seat', rate: 600 },
        { vehicleType: 'bus_49_seat', rate: 1000 },
      ],
    },
    {
      type: 'airport_transfer',
      city: 'madina',
      from: 'Madina Airport (pick up / Drop)',
      to: 'City',
      rates: [
        { vehicleType: 'ford_taurus', rate: 150 },
        { vehicleType: 'yukon', rate: 250 },
        { vehicleType: 'bmw_5', rate: 250 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 450 },
        { vehicleType: 'hiace_12_seat', rate: 300 },
        { vehicleType: 'coaster_23_seat', rate: 800 },
        { vehicleType: 'bus_49_seat', rate: 1200 },
      ],
    },
    {
      type: 'city_transfer',
      city: 'madina',
      from: 'Downtown',
      to: 'Inside City',
      rates: [
        { vehicleType: 'ford_taurus', rate: 125 },
        { vehicleType: 'yukon', rate: 225 },
        { vehicleType: 'bmw_5', rate: 225 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 800 },
        { vehicleType: 'hiace_12_seat', rate: 400 },
        { vehicleType: 'coaster_23_seat', rate: 600 },
        { vehicleType: 'bus_49_seat', rate: 1000 },
      ],
    },
    // Inter-city / Specific Destinations
    {
      type: 'inter_city',
      from: 'Jeddah',
      to: 'KAUST',
      rates: [
        { vehicleType: 'ford_taurus', rate: 225 },
        { vehicleType: 'yukon', rate: 400 },
        { vehicleType: 'bmw_5', rate: 400 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 1250 },
        { vehicleType: 'hiace_12_seat', rate: 600 },
        { vehicleType: 'coaster_23_seat', rate: 1000 },
        { vehicleType: 'bus_49_seat', rate: 1500 },
      ],
    },
    {
      type: 'inter_city',
      from: 'Jeddah',
      to: 'KAEC',
      rates: [
        { vehicleType: 'ford_taurus', rate: 300 },
        { vehicleType: 'yukon', rate: 500 },
        { vehicleType: 'bmw_5', rate: 500 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 1400 },
        { vehicleType: 'hiace_12_seat', rate: 750 },
        { vehicleType: 'coaster_23_seat', rate: 1200 },
        { vehicleType: 'bus_49_seat', rate: 2000 },
      ],
    },
    {
      type: 'inter_city',
      from: 'Jeddah',
      to: 'Yanbu',
      rates: [
        { vehicleType: 'ford_taurus', rate: 600 },
        { vehicleType: 'yukon', rate: 1000 },
        { vehicleType: 'bmw_5', rate: 1000 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 3000 },
        { vehicleType: 'hiace_12_seat', rate: 1200 },
        { vehicleType: 'coaster_23_seat', rate: 2000 },
        { vehicleType: 'bus_49_seat', rate: 2500 },
      ],
    },
    {
      type: 'inter_city',
      from: 'Jeddah',
      to: 'Red Sea Umluj',
      rates: [
        { vehicleType: 'ford_taurus', rate: 1500 },
        { vehicleType: 'yukon', rate: 2500 },
        { vehicleType: 'bmw_5', rate: 2500 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 4500 },
        { vehicleType: 'hiace_12_seat', rate: 1600 },
        { vehicleType: 'coaster_23_seat', rate: 3000 },
        { vehicleType: 'bus_49_seat', rate: 3500 },
      ],
    },
    {
      type: 'inter_city',
      from: 'Jeddah',
      to: 'NEOM',
      rates: [
        { vehicleType: 'ford_taurus', rate: 2500 },
        { vehicleType: 'yukon', rate: 3500 },
        { vehicleType: 'bmw_5', rate: 3500 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 5000 },
        { vehicleType: 'hiace_12_seat', rate: 2000 },
        { vehicleType: 'coaster_23_seat', rate: 3500 },
        { vehicleType: 'bus_49_seat', rate: 4000 },
      ],
    },
    {
      type: 'inter_city',
      from: 'Jeddah Airport (pick up / Drop)',
      to: 'Makkah',
      rates: [
        { vehicleType: 'ford_taurus', rate: 300 },
        { vehicleType: 'yukon', rate: 500 },
        { vehicleType: 'bmw_5', rate: 500 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 1250 },
        { vehicleType: 'hiace_12_seat', rate: 600 },
        { vehicleType: 'coaster_23_seat', rate: 1000 },
        { vehicleType: 'bus_49_seat', rate: 1000 },
      ],
    },
    {
      type: 'inter_city',
      from: 'Jeddah or Makkah',
      to: 'Medina',
      rates: [
        { vehicleType: 'ford_taurus', rate: 900 },
        { vehicleType: 'yukon', rate: 1500 },
        { vehicleType: 'bmw_5', rate: 1500 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 3000 },
        { vehicleType: 'hiace_12_seat', rate: 1400 },
        { vehicleType: 'coaster_23_seat', rate: 1800 },
        { vehicleType: 'bus_49_seat', rate: 2000 },
      ],
    },
    // Hourly Rates
    {
      type: 'hourly',
      rates: [
        { vehicleType: 'ford_taurus', rate: 125 },
        { vehicleType: 'yukon', rate: 150 },
        { vehicleType: 'bmw_5', rate: 150 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 400 },
        { vehicleType: 'hiace_12_seat', rate: null }, // NA
        { vehicleType: 'coaster_23_seat', rate: null }, // NA
        { vehicleType: 'bus_49_seat', rate: null }, // NA
      ],
    },
    // Daily Rates - 8 hours
    {
      type: 'daily',
      duration: '8_hours',
      rates: [
        { vehicleType: 'ford_taurus', rate: 750 },
        { vehicleType: 'yukon', rate: 1200 },
        { vehicleType: 'bmw_5', rate: 1200 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 2000 }, // Range: 2000/2500, using min value
        { vehicleType: 'hiace_12_seat', rate: 850 },
        { vehicleType: 'coaster_23_seat', rate: 1200 },
        { vehicleType: 'bus_49_seat', rate: 1500 },
      ],
    },
    // Daily Rates - 12 hours
    {
      type: 'daily',
      duration: '12_hours',
      rates: [
        { vehicleType: 'ford_taurus', rate: 1000 },
        { vehicleType: 'yukon', rate: 1500 },
        { vehicleType: 'bmw_5', rate: 1500 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 2400 }, // Range: 2400/3000, using min value
        { vehicleType: 'hiace_12_seat', rate: 1000 },
        { vehicleType: 'coaster_23_seat', rate: 1500 },
        { vehicleType: 'bus_49_seat', rate: 2000 },
      ],
    },
    // Extra Hour Rate
    {
      type: 'daily',
      duration: 'extra_hour',
      rates: [
        { vehicleType: 'ford_taurus', rate: 125 },
        { vehicleType: 'yukon', rate: 150 },
        { vehicleType: 'bmw_5', rate: 150 },
        { vehicleType: 'bmw_735_mercedes_s450', rate: 300 },
        { vehicleType: 'hiace_12_seat', rate: 125 },
        { vehicleType: 'coaster_23_seat', rate: 150 },
        { vehicleType: 'bus_49_seat', rate: 250 },
      ],
    },
  ],
};

// Helper function to get rate for a specific vehicle type and service
export function getRate(
  vehicleType: VehicleType,
  service: {
    type: 'airport_transfer' | 'city_transfer';
    city: 'riyadh' | 'dammam' | 'jeddah' | 'madina';
    from: string;
    to: string;
  }
): number | null;
export function getRate(
  vehicleType: VehicleType,
  service: {
    type: 'inter_city';
    from: string;
    to: string;
  }
): number | null;
export function getRate(
  vehicleType: VehicleType,
  service: {
    type: 'hourly';
  }
): number | null;
export function getRate(
  vehicleType: VehicleType,
  service: {
    type: 'daily';
    duration: '8_hours' | '12_hours' | 'extra_hour';
  }
): number | null;
export function getRate(vehicleType: VehicleType, service: any): number | null {
  const entry = rateCard2025.entries.find((entry) => {
    if (entry.type !== service.type) return false;

    if (entry.type === 'airport_transfer' || entry.type === 'city_transfer') {
      return (
        entry.city === service.city &&
        entry.from === service.from &&
        entry.to === service.to
      );
    }

    if (entry.type === 'inter_city') {
      return entry.from === service.from && entry.to === service.to;
    }

    if (entry.type === 'hourly') {
      return true;
    }

    if (entry.type === 'daily') {
      return entry.duration === service.duration;
    }

    return false;
  });

  if (!entry) return null;

  const vehicleRate = entry.rates.find((r) => r.vehicleType === vehicleType);
  return vehicleRate?.rate ?? null;
}

