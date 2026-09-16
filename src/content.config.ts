import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
  capacity_official: z.number(),
  capacity_comfortable: z.number(),
  party_types: z.array(partyType).optional(),
  recommended: z.boolean().default(false),
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
    capacity_official: z.number(),
    capacity_comfortable: z.number(),
    room_size_sqm: z.number(),
    beds: z.string(),
    child_sharing: z.boolean(),
    extra_bed: z.boolean(),
    station: z.string(),
    walk_min: z.number(),
    price_band: priceBand,
    rakuten_url: z.string().url(),
    official_url: z.string().url().optional(),
    address: z.string(),
    verdict: z.string(),
    not_for: z.string(),
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
    kicker: z.string(),
    date: z.coerce.date(),
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
