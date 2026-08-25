export type VehiclePriceKey =
  | "fordTaurus"
  | "yukon"
  | "bmw5"
  | "bmw7"
  | "mercedesS450"
  | "mercedesVClass"
  | "sprinter12"
  | "hiace12"
  | "coaster23"
  | "bus49";

export type RoutePriceKey =
  | "riyadh-airport-city"
  | "dammam-airport-city"
  | "jeddah-airport-city"
  | "madina-airport-city"
  | "riyadh-downtown-city"
  | "dammam-downtown-city"
  | "jeddah-downtown-city"
  | "madina-downtown-city"
  | "jeddah-kaust"
  | "jeddah-kaec"
  | "jeddah-yanbu"
  | "jeddah-red-sea-umluj"
  | "jeddah-neom"
  | "jeddah-airport-makkah"
  | "jeddah-makkah-medina";

export type DailyPriceKey = "8-hours" | "12-hours" | "extra-hour";

export type VehicleRates = Partial<Record<VehiclePriceKey, number | null>>;

export interface PricingData {
  routes: Record<RoutePriceKey, VehicleRates>;
  hourly: VehicleRates;
  daily8: VehicleRates;
  daily12: VehicleRates;
  extraHour: VehicleRates;
}

export interface FleetColorVariant {
  id: string;
  name: string;
  color?: string;
  imageKey?: string;
}

export interface FleetVehicleConfig {
  id: string;
  vehicleKey: VehiclePriceKey;
  name: string;
  slug: string;
  class: string;
  year: string;
  branches: string[];
  defaultBranch: string;
  transport?: string;
  features: string[];
  showOnHomepage: boolean;
  imageKey: string;
  bookingImageKey?: string;
  colorVariants?: FleetColorVariant[];
}

export interface FleetConfig {
  vehicles: FleetVehicleConfig[];
}

export interface RouteDefinition {
  key: RoutePriceKey;
  label: string;
  category: string;
}

export const VEHICLE_PRICE_KEYS: VehiclePriceKey[] = [
  "fordTaurus",
  "yukon",
  "bmw5",
  "bmw7",
  "mercedesS450",
  "mercedesVClass",
  "sprinter12",
  "hiace12",
  "coaster23",
  "bus49",
];

export const ROUTE_DEFINITIONS: RouteDefinition[] = [
  { key: "riyadh-airport-city", label: "Riyadh Airport ↔ City", category: "Airport" },
  { key: "dammam-airport-city", label: "Dammam Airport ↔ City", category: "Airport" },
  { key: "jeddah-airport-city", label: "Jeddah Airport ↔ City", category: "Airport" },
  { key: "madina-airport-city", label: "Madinah Airport ↔ City", category: "Airport" },
  { key: "riyadh-downtown-city", label: "Riyadh Downtown ↔ City", category: "Downtown" },
  { key: "dammam-downtown-city", label: "Dammam Downtown ↔ City", category: "Downtown" },
  { key: "jeddah-downtown-city", label: "Jeddah Downtown ↔ City", category: "Downtown" },
  { key: "madina-downtown-city", label: "Madinah Downtown ↔ City", category: "Downtown" },
  { key: "jeddah-kaust", label: "Jeddah ↔ KAUST", category: "Intercity" },
  { key: "jeddah-kaec", label: "Jeddah ↔ KAEC", category: "Intercity" },
  { key: "jeddah-yanbu", label: "Jeddah ↔ Yanbu", category: "Intercity" },
  { key: "jeddah-red-sea-umluj", label: "Jeddah ↔ Red Sea Umluj", category: "Intercity" },
  { key: "jeddah-neom", label: "Jeddah ↔ NEOM", category: "Intercity" },
  { key: "jeddah-airport-makkah", label: "Jeddah Airport ↔ Makkah", category: "Makkah" },
  { key: "jeddah-makkah-medina", label: "Makkah ↔ Madinah", category: "Makkah" },
];
