import { site } from "../site.config";

const TRIP_HOST = "https://kr.trip.com";

type StayAffiliate = {
  data: {
    city: string;
    nameEn: string;
    trip_hotel?: string;
    rakuten_url?: string;
  };
};

type RoomAffiliate = {
  trip_hotel?: string;
  rakuten_url?: string;
};

export function stayAffiliateUrl(stay: StayAffiliate): string {
  return tripTargetUrl(stay.data.trip_hotel, stay.data.city, stay.data.nameEn, stay.data.rakuten_url);
}

export function roomAffiliateUrl(stay: StayAffiliate, room?: RoomAffiliate): string {
  const roomValue = room?.trip_hotel?.trim();
  if (roomValue) return tripTargetUrl(roomValue, stay.data.city, stay.data.nameEn, room?.rakuten_url);
  if (room?.rakuten_url && isTripHost(room.rakuten_url)) {
    return tripTargetUrl(room.rakuten_url, stay.data.city, stay.data.nameEn);
  }
  return stayAffiliateUrl(stay);
}

export function affiliateHref(rawUrl: string): string {
  return stampTripAffiliate(rawUrl);
}

function tripTargetUrl(
  input: string | undefined,
  city: string,
  fallbackName: string,
  legacyUrl?: string,
): string {
  const value = input?.trim();
  if (value) return fromTripInput(value, city);

  const legacy = legacyUrl?.trim();
  if (legacy && isTripHost(legacy)) return fromTripInput(legacy, city);

  return tripSearchUrl(fallbackName, city);
}

function fromTripInput(raw: string, city: string): string {
  const hotelId = extractHotelId(raw);
  if (hotelId) return tripHotelUrl(hotelId, city);

  if (isTripHost(raw)) {
    try {
      return stampTripAffiliate(raw);
    } catch {
      return tripSearchUrl(raw, city);
    }
  }

  return tripSearchUrl(raw, city);
}

export function extractHotelId(raw: string): string | null {
  const value = raw.trim();
  if (/^\d{4,}$/.test(value)) return value;

  try {
    const url = new URL(value);
    const fromQuery = url.searchParams.get("hotelId") || url.searchParams.get("hotelid");
    if (fromQuery && /^\d+$/.test(fromQuery)) return fromQuery;

    const fromPath = url.pathname.match(/hotel-detail-(\d+)/i) ?? url.pathname.match(/\/hotels\/detail\/(\d+)/i);
    if (fromPath?.[1]) return fromPath[1];
  } catch {
    const loose = value.match(/hotel-detail-(\d+)/i);
    if (loose?.[1]) return loose[1];
  }

  return null;
}

function tripHotelUrl(hotelId: string, city: string): string {
  const url = new URL(`${TRIP_HOST}/hotels/detail/`);
  url.searchParams.set("cityId", String(tripCityId(city)));
  url.searchParams.set("hotelId", hotelId);
  return stampTripAffiliate(url);
}

function tripSearchUrl(keyword: string, city: string): string {
  const url = new URL(`${TRIP_HOST}/hotels/list`);
  url.searchParams.set("city", String(tripCityId(city)));
  url.searchParams.set("keyword", keyword);
  return stampTripAffiliate(url);
}

function stampTripAffiliate(input: string | URL): string {
  try {
    const url = input instanceof URL ? input : new URL(input);
    url.searchParams.set("adult", "3");
    url.searchParams.set("children", "0");
    url.searchParams.set("crn", "1");
    url.searchParams.set("Allianceid", site.tripAllianceId);
    url.searchParams.set("SID", site.tripSid);
    url.searchParams.set("trip_sub1", site.tripSub1);
    url.searchParams.delete("trip_sub3");
    return url.toString();
  } catch {
    return String(input);
  }
}

function isTripHost(raw: string): boolean {
  try {
    const host = new URL(raw).hostname;
    return host === "trip.com" || host.endsWith(".trip.com");
  } catch {
    return false;
  }
}

function tripCityId(city: string): number {
  return site.tripCityIds[city as keyof typeof site.tripCityIds] ?? site.tripCityIds.tokyo;
}
