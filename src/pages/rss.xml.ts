import type { APIRoute } from "astro";
import { collectFeedItems, rssHeaders, rssXml } from "../lib/feeds";

export const GET: APIRoute = async () => {
  const xml = rssXml(await collectFeedItems());
  return new Response(xml, { headers: rssHeaders });
};
