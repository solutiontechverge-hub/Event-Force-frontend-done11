import type { VehiclePriceKey } from "@/types/fleetPricing";

export function getVehicleKeyFromName(
  carName: string | undefined | null,
): VehiclePriceKey | null {
  if (!carName) return null;

  const name = carName.toLowerCase().trim();

  if (name.includes("taurus")) return "fordTaurus";
  if (name.includes("yukon")) return "yukon";
  if (name.includes("bmw") && name.includes("5")) return "bmw5";
  if (name.includes("bmw") && name.includes("7")) return "bmw7";
  if (
    name.includes("s450") ||
    name.includes("mercedes s") ||
    name.includes("s-class") ||
    name.includes("s class")
  )
    return "mercedesS450";
  if (
    name.includes("v class") ||
    name.includes("v-class") ||
    name.includes("vclass") ||
    name.includes("mercedes v")
  )
    return "mercedesVClass";
  if (name.includes("sprinter")) return "sprinter12";
  if (name.includes("hiace")) return "hiace12";
  if (name.includes("coaster")) return "coaster23";
  if (name.includes("bus") || name.includes("coach")) return "bus49";

  return null;
}

export function formatSarPrice(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "N/A";
  return `${amount} SAR`;
}

export function normalizeLocation(text: string = ""): string {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

export function getRouteKeyFromLocations(
  pickup: string,
  destination: string,
): string | null {
  const p = normalizeLocation(pickup);
  const d = normalizeLocation(destination);

  if (
    (p.includes("riyadh airport") && d.includes("city")) ||
    (d.includes("riyadh airport") && p.includes("city"))
  )
    return "riyadh-airport-city";

  if (
    (p.includes("jeddah airport") && d.includes("city")) ||
    (d.includes("jeddah airport") && p.includes("city"))
  )
    return "jeddah-airport-city";

  if (
    (p.includes("dammam airport") && d.includes("city")) ||
    (d.includes("dammam airport") && p.includes("city"))
  )
    return "dammam-airport-city";

  if (
    (p.includes("madinah airport") && d.includes("city")) ||
    (d.includes("madinah airport") && p.includes("city"))
  )
    return "madina-airport-city";

  if (
    (p.includes("makkah") && d.includes("airport")) ||
    (d.includes("makkah") && p.includes("airport"))
  )
    return "jeddah-airport-makkah";

  if (
    (p.includes("makkah") && d.includes("medina")) ||
    (d.includes("makkah") && p.includes("medina")) ||
    (p.includes("makkah") && d.includes("madinah")) ||
    (d.includes("makkah") && p.includes("madinah"))
  )
    return "jeddah-makkah-medina";

  if (p.includes("kaust") || d.includes("kaust")) return "jeddah-kaust";
  if (p.includes("kaec") || d.includes("kaec")) return "jeddah-kaec";
  if (p.includes("yanbu") || d.includes("yanbu")) return "jeddah-yanbu";
  if (p.includes("neom") || d.includes("neom")) return "jeddah-neom";
  if (p.includes("umluj") || d.includes("red sea"))
    return "jeddah-red-sea-umluj";

  if (
    (p.includes("downtown") && d.includes("inside city")) ||
    (d.includes("downtown") && p.includes("inside city")) ||
    (p.includes("downtown") && d.includes("city")) ||
    (d.includes("downtown") && p.includes("city"))
  ) {
    if (p.includes("riyadh") || d.includes("riyadh"))
      return "riyadh-downtown-city";
    if (p.includes("jeddah") || d.includes("jeddah"))
      return "jeddah-downtown-city";
    if (p.includes("dammam") || d.includes("dammam"))
      return "dammam-downtown-city";
    if (p.includes("madina") || d.includes("madina"))
      return "madina-downtown-city";
  }

  return null;
}
