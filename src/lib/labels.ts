import type { CollectionEntry } from "astro:content";

export type PartyType = CollectionEntry<"stays">["data"]["party_types"][number];
export type SleepLayout = CollectionEntry<"stays">["data"]["sleep_layout"];
export type PriceBand = CollectionEntry<"stays">["data"]["price_band"];

export const partyLabels: Record<PartyType, string> = {
  couple_child: "부부+자녀",
  three_adults: "성인 3인",
};

export const sleepLabels: Record<SleepLayout, string> = {
  apartment: "더블+싱글",
  triple_bed: "싱글 X 3",
  futon_3: "다다미",
  twin_extra: "엑스트라베드",
};

export const priceLabels: Record<PriceBand, string> = {
  low: "실속",
  mid: "중간",
  high: "상급",
};

export const weekdayPriceLabels: Record<PriceBand, string> = {
  low: "1박 7만원대(평일기준)",
  mid: "1박 10만원대(평일기준)",
  high: "1박 15만원대(평일기준)",
};

export function stayTransit(stay: {
  data: { transit?: string; station?: string; walk_min?: number };
}): string {
  if (stay.data.transit?.trim()) return stay.data.transit.trim();
  const station = stay.data.station?.trim();
  if (!station) return "";
  const minutes = stay.data.walk_min ?? 0;
  return `${station}(${minutes}분 소요)`;
}

export function transitLabel(station: string, walkMin: number): string {
  return stayTransit({ data: { station, walk_min: walkMin } });
}

export function stayPath(stay: CollectionEntry<"stays">): string {
  return `/${stay.data.city}/${stay.data.area}/${stay.id}/`;
}

export function areaPath(city: string, area: string): string {
  return `/${city}/${area}/`;
}

export function cityPath(city: string): string {
  return `/${city}/`;
}

export const cityNames: Record<string, string> = {
  tokyo: "도쿄",
  osaka: "오사카",
  kyoto: "교토",
  fukuoka: "후쿠오카",
};

export const areaNames: Record<string, string> = {
  ueno: "우에노",
  asakusa: "아사쿠사",
  shinjuku: "신주쿠",
  namba: "난바",
  station: "교토역",
  hakata: "하카타",
};

export function placeLabel(city: string, area: string): string {
  return [areaNames[area] ?? area, cityNames[city] ?? city].join(" · ");
}

export function partyList(types: PartyType[]): string {
  return types.map((type) => partyLabels[type]).join(" · ");
}
