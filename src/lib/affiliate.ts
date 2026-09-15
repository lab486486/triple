import { site } from "../site.config";

export function affiliateHref(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("utm_source", "triple");
    url.searchParams.set("utm_medium", "affiliate");
    url.searchParams.set("utm_campaign", "rakuten-travel");
    if (site.rakutenAffiliateId) {
      url.searchParams.set("f_aid", site.rakutenAffiliateId);
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
}

export function rakutenSearchUrl(keyword: string): string {
  const url = new URL(site.rakutenSearchBase);
  url.searchParams.set("f_keyword", keyword);
  return affiliateHref(url.toString());
}
