import type { StaticImageData } from "next/image";

export type FleetImageSource = StaticImageData | string;

export function getFleetImageSrc(
  image: FleetImageSource | undefined | null,
): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.src;
}

export function isRemoteFleetImage(
  image: FleetImageSource | undefined | null,
): boolean {
  const src = getFleetImageSrc(image);
  return src.startsWith("http://") || src.startsWith("https://");
}
