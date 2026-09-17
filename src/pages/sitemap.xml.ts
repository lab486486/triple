import type { APIRoute } from "astro";
import { collectSitemapUrls, sitemapHeaders, sitemapXml } from "../lib/feeds";

export const GET: APIRoute = async () => {
  const xml = sitemapXml(await collectSitemapUrls());
  return new Response(xml, { headers: sitemapHeaders });
};
