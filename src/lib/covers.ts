import { mediaUrl } from "./media";

export const cityCovers: Record<string, string> = {
  tokyo: "/images/covers/tokyo.jpg",
  osaka: "/images/covers/namba.jpg",
  kyoto: "/images/covers/kyoto.jpg",
  fukuoka: "/images/covers/hakata.jpg",
};

export const areaCovers: Record<string, string> = {
  "tokyo/ueno": "/images/covers/ueno.jpg",
  "tokyo/ginza": "/images/covers/ginza.jpg",
  "tokyo/shinjuku": "/images/covers/shinjuku.jpg",
  "osaka/namba": "/images/covers/namba.jpg",
  "kyoto/station": "/images/covers/kyoto-station.jpg",
  "fukuoka/hakata": "/images/covers/hakata.jpg",
};

export function areaCover(city: string, area: string): string {
  return areaCovers[`${city}/${area}`] ?? cityCovers[city] ?? cityCovers.tokyo;
}

export function stayCover(city: string, area: string, photos: string[] = []) {
  const first = photos[0];
  if (first) return mediaUrl(first);
  return areaCover(city, area);
}

export function stayGallery(city: string, area: string, photos: string[] = []) {
  const custom = photos.map(mediaUrl);
  return [
    ...new Set([
      ...custom,
      areaCover(city, area),
      cityCovers[city] ?? cityCovers.tokyo,
    ]),
  ];
}
