import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defaultAmenities } from "./lib/amenities";

const partyType = z.enum(["couple_child", "three_adults"]);
const sleepLayout = z.enum([
  "triple_bed",
  "twin_extra",
  "futon_3",
  "apartment",
]);
const priceBand = z.enum(["low", "mid", "high"]);

const faq = z.object({
  q: z.string(),
  a: z.string(),
});

const cities = defineCollection({
  loader: glob({ base: "./src/content/cities", pattern: "**/*.md" }),
  schema: z.object({
    nameKo: z.string(),
    nameEn: z.string(),
    title: z.string(),
    description: z.string(),
    kicker: z.string(),
    lede: z.string(),
    sort: z.number(),
    faqs: z.array(faq),
  }),
});

const areas = defineCollection({
  loader: glob({ base: "./src/content/areas", pattern: "**/*.md" }),
  schema: z.object({
    city: z.string(),
    slug: z.string(),
    nameKo: z.string(),
    nameEn: z.string(),
    title: z.string(),
    description: z.string(),
    kicker: z.string(),
    why: z.string(),
    sort: z.number(),
    faqs: z.array(faq),
  }),
});

const stayRoom = z.object({
  name: z.string(),
  size_sqm: z.number().optional(),
  beds: z.string(),
  capacity_official: z.number().optional(),
  capacity_comfortable: z.number(),
  party_types: z.array(partyType).optional(),
  recommended: z.boolean().optional().default(false),
  note: z.string(),
  rakuten_url: z.string().url().optional(),
  photo: z.string().optional(),
});

const stays = defineCollection({
  loader: glob({ base: "./src/content/stays", pattern: "**/*.md" }),
  schema: z.object({
    nameKo: z.string(),
    nameEn: z.string(),
    city: z.string(),
    area: z.string(),
    chain: z.string().optional(),
    party_types: z.array(partyType).min(1),
    sleep_layout: sleepLayout,
    capacity_official: z.number().optional(),
    capacity_comfortable: z.number(),
    room_size_sqm: z.number(),
    beds: z.string().optional(),
    child_sharing: z.boolean().optional(),
    extra_bed: z.boolean().optional(),
    transit: z.string().optional(),
    station: z.string().optional(),
    walk_min: z.number().optional(),
    price_band: priceBand,
    rakuten_url: z.string().url(),
    official_url: z.string().url().optional(),
    address: z.string(),
    check_in: z.preprocess(
      (v) => (typeof v === "string" && v.trim() ? v.trim() : undefined),
      z.string().default("15:00"),
    ),
    check_out: z.preprocess(
      (v) => (typeof v === "string" && v.trim() ? v.trim() : undefined),
      z.string().default("11:00"),
    ),
    amenities: z.array(z.string()).default(defaultAmenities),
    verdict: z.string(),
    not_for: z.string().optional(),
    rank: z.number(),
    featured: z.boolean().default(false),
    updated: z.coerce.date(),
    photos: z.array(z.string()).default([]),
    rooms: z.array(stayRoom).default([]),
  }),
});

const guides = defineCollection({
  loader: glob({ base: "./src/content/guides", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    kicker: z.string().default("블로그"),
    date: z.coerce.date(),
    cover_image: z.string().optional(),
  }),
});

const chains = defineCollection({
  loader: glob({ base: "./src/content/chains", pattern: "**/*.md" }),
  schema: z.object({
    nameKo: z.string(),
    nameEn: z.string(),
    title: z.string(),
    description: z.string(),
    official_url: z.string().url(),
  }),
});

export const collections = { cities, areas, stays, guides, chains };
