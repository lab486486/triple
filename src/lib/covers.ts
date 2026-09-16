export const cityCovers: Record<string, string> = {
  tokyo: "/images/covers/tokyo.jpg",
  osaka: "/images/covers/namba.jpg",
  kyoto: "/images/covers/kyoto.jpg",
  fukuoka: "/images/covers/hakata.jpg",
};

export const areaCovers: Record<string, string> = {
  "tokyo/ueno": "/images/covers/ueno.jpg",
  "tokyo/asakusa": "/images/covers/asakusa.jpg",
  "tokyo/shinjuku": "/images/covers/shinjuku.jpg",
  "osaka/namba": "/images/covers/namba.jpg",
  "kyoto/station": "/images/covers/kyoto-station.jpg",
  "fukuoka/hakata": "/images/covers/hakata.jpg",
};

export function areaCover(city: string, area: string): string {
  return areaCovers[`${city}/${area}`] ?? cityCovers[city] ?? cityCovers.tokyo;
}

export function stayCover(city: string, area: string): string {
  return areaCover(city, area);
}

export function stayGallery(city: string, area: string, photos: string[] = []) {
  return [...new Set([...photos, stayCover(city, area), cityCovers[city] ?? cityCovers.tokyo])];
}
