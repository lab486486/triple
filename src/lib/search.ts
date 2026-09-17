import type { CollectionEntry } from "astro:content";

export type StayFilter = {
  region?: string;
  price?: string;
  layout?: string;
  party?: string;
};

export function filterStays(
  stays: CollectionEntry<"stays">[],
  query: StayFilter,
) {
  return stays.filter((stay) => {
    if (query.region) {
      if (query.region.includes("/")) {
        const [city, area] = query.region.split("/");
        if (stay.data.city !== city || stay.data.area !== area) return false;
      } else if (stay.data.city !== query.region) {
        return false;
      }
    }
    if (query.price && String(stay.data.price_band) !== query.price) return false;
    if (query.layout && stay.data.sleep_layout !== query.layout) return false;
    if (query.party && !stay.data.party_types.includes(query.party as never)) {
      return false;
    }
    return true;
  });
}
