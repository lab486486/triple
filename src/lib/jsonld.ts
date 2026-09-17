import type { CollectionEntry } from "astro:content";
import { site } from "../site.config";
import { stayPath, areaPath, cityPath } from "./labels";

type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, site.baseUrl).href,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function lodgingJsonLd(stay: CollectionEntry<"stays">) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: stay.data.nameKo,
    alternateName: stay.data.nameEn,
    url: new URL(stayPath(stay), site.baseUrl).href,
    address: {
      "@type": "PostalAddress",
      streetAddress: stay.data.address,
      addressCountry: "JP",
    },
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: stay.data.capacity_comfortable,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    url: site.baseUrl,
    description: site.description,
  };
}

export function crumbsForStay(
  city: CollectionEntry<"cities">,
  area: CollectionEntry<"areas">,
  stay: CollectionEntry<"stays">,
): Crumb[] {
  return [
    { name: "홈", path: "/" },
    { name: city.data.nameKo, path: cityPath(city.id) },
    { name: area.data.nameKo, path: areaPath(city.id, area.data.slug) },
    { name: stay.data.nameKo, path: stayPath(stay) },
  ];
}

export function crumbsForArea(
  city: CollectionEntry<"cities">,
  area: CollectionEntry<"areas">,
): Crumb[] {
  return [
    { name: "홈", path: "/" },
    { name: city.data.nameKo, path: cityPath(city.id) },
    { name: area.data.nameKo, path: areaPath(city.id, area.data.slug) },
  ];
}

export function crumbsForCity(city: CollectionEntry<"cities">): Crumb[] {
  return [
    { name: "홈", path: "/" },
    { name: city.data.nameKo, path: cityPath(city.id) },
  ];
}
