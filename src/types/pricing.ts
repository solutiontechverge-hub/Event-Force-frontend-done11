export type VehicleType =
  | 'ford_taurus'
  | 'yukon'
  | 'bmw_5'
  | 'bmw_735_mercedes_s450'
  | 'hiace_12_seat'
  | 'coaster_23_seat'
  | 'bus_49_seat';

export type City = 'riyadh' | 'dammam' | 'jeddah' | 'madina' | 'makkah';
export type ServiceType = 'airport_transfer' | 'city_transfer' | 'inter_city' | 'hourly' | 'daily';

export interface VehicleRate {
  vehicleType: VehicleType;
  rate: number | null; // null means NA/not available
}

export interface AirportTransferRate {
  type: 'airport_transfer';
  city: City;
  from: string; // e.g., "Riyadh Airport"
  to: string; // e.g., "City"
  rates: VehicleRate[];
}

export interface CityTransferRate {
  type: 'city_transfer';
  city: City;
  from: string; // e.g., "Downtown"
  to: string; // e.g., "Inside City"
  rates: VehicleRate[];
}

export interface InterCityRate {
  type: 'inter_city';
  from: string; // e.g., "Jeddah"
  to: string; // e.g., "KAUST"
  rates: VehicleRate[];
}

export interface HourlyRate {
  type: 'hourly';
  rates: VehicleRate[];
}

export interface DailyRate {
  type: 'daily';
  duration: '8_hours' | '12_hours' | 'extra_hour';
  rates: VehicleRate[];
}

export type RateCardEntry =
  | AirportTransferRate
  | CityTransferRate
  | InterCityRate
  | HourlyRate
  | DailyRate;

export interface RateCard {
  year: number;
  entries: RateCardEntry[];
  note?: string; // e.g., "The above rate excludes VAT 15%"
}

export interface VehicleTypeInfo {
  key: VehicleType;
  displayName: string;
  shortName?: string;
}

export const VEHICLE_TYPES: VehicleTypeInfo[] = [
  { key: 'ford_taurus', displayName: 'Ford Taurus / Similar', shortName: 'Ford Taurus' },
  { key: 'yukon', displayName: 'Yukon / Similar', shortName: 'Yukon' },
  { key: 'bmw_5', displayName: 'BMW 5 / Similar', shortName: 'BMW 5' },
  {
    key: 'bmw_735_mercedes_s450',
    displayName: 'BMW735 / Mercedes S450',
    shortName: 'BMW 735 / Mercedes S450',
  },
  { key: 'hiace_12_seat', displayName: '12 Seat Hiace', shortName: 'Hiace 12 Seat' },
  { key: 'coaster_23_seat', displayName: '23 Seat Coaster', shortName: 'Coaster 23 Seat' },
  { key: 'bus_49_seat', displayName: '49 Seat Bus', shortName: 'Bus 49 Seat' },
];

