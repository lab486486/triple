import { getCollection, type CollectionEntry } from "astro:content";

export async function getCities() {
  const cities = await getCollection("cities");
  return cities.sort((a, b) => a.data.sort - b.data.sort);
}

export async function getCity(id: string) {
  const cities = await getCollection("cities");
  return cities.find((city) => city.id === id);
}

export async function getAreasByCity(city: string) {
  const areas = await getCollection("areas");
  return areas
    .filter((area) => area.data.city === city)
    .sort((a, b) => a.data.sort - b.data.sort);
}

export async function getArea(city: string, slug: string) {
  const areas = await getCollection("areas");
  return areas.find(
    (area) => area.data.city === city && area.data.slug === slug,
  );
}

export async function getStaysByArea(city: string, area: string) {
  const stays = await getCollection("stays");
  return stays
    .filter((stay) => stay.data.city === city && stay.data.area === area)
    .sort((a, b) => a.data.rank - b.data.rank);
}

export async function getStaysByCity(city: string) {
  const stays = await getCollection("stays");
  return stays
    .filter((stay) => stay.data.city === city)
    .sort((a, b) => a.data.rank - b.data.rank);
}

export async function getStaysByChain(chain: string) {
  const stays = await getCollection("stays");
  return stays.filter((stay) => stay.data.chain === chain);
}

export async function getFeaturedStays() {
  const stays = await getCollection("stays");
  return stays
    .filter((stay) => stay.data.featured)
    .sort((a, b) => a.data.rank - b.data.rank);
}

const cityHighlightIds: Record<string, string> = {
  tokyo: "minn-ueno",
  osaka: "mimaru-namba-station",
  kyoto: "mimaru-kyoto-station",
  fukuoka: "hotel-nikko-fukuoka",
};

export async function getCityHighlights() {
  const cities = await getCities();
  const stays = await getCollection("stays");
  return cities.flatMap((city) => {
    const preferred = stays.find(
      (stay) => stay.id === cityHighlightIds[city.id],
    );
    const fallback = stays
      .filter((stay) => stay.data.city === city.id)
      .sort((a, b) => a.data.rank - b.data.rank)[0];
    const stay = preferred ?? fallback;
    return stay ? [{ city, stay }] : [];
  });
}

export async function relatedStays(
  stay: CollectionEntry<"stays">,
  limit = 3,
) {
  const sameArea = await getStaysByArea(stay.data.city, stay.data.area);
  return sameArea.filter((item) => item.id !== stay.id).slice(0, limit);
}
