import type { PriceBand } from "./labels";

export const bandWon: Record<PriceBand, string> = {
  low: "7만원대",
  mid: "10만원대",
  high: "15만원대",
};

export function nightPrice(band: PriceBand): string {
  return `1박 ${bandWon[band]}`;
}

export function stayScore(id: string) {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const n = hash >>> 0;
  const score = (9 + (n % 10) / 10).toFixed(1);
  const count = 120 + (n % 880);
  return { score, count };
}

export function mapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
