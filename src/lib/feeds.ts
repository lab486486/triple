import { getCollection } from "astro:content";
import { site } from "../site.config";
import { areaPath, cityPath, stayPath } from "./labels";

export type FeedItem = {
  title: string;
  path: string;
  description: string;
  body: string;
  date: Date;
};

export function absUrl(path: string): string {
  return new URL(path, `${site.baseUrl}/`).href;
}

export function xmlText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function rfc822(date: Date): string {
  return date.toUTCString().replace("GMT", "+0000");
}

export function isoDate(date: Date): string {
  return date.toISOString();
}

export function markdownToHtml(markdown: string): string {
  const blocks = markdown
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  if (blocks.length === 0) return "";
  return blocks
    .map((block) => {
      const heading = block.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length;
        return `<h${level}>${inlineHtml(heading[2])}</h${level}>`;
      }
      return `<p>${inlineHtml(block).replaceAll("\n", "<br/>")}</p>`;
    })
    .join("");
}

function inlineHtml(value: string): string {
  return xmlText(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

export async function collectFeedItems(): Promise<FeedItem[]> {
  const [guides, stays, areas, cities] = await Promise.all([
    getCollection("guides"),
    getCollection("stays"),
    getCollection("areas"),
    getCollection("cities"),
  ]);

  const items: FeedItem[] = [
    ...guides.map((guide) => ({
      title: guide.data.title,
      path: `/blog/${guide.id}/`,
      description: guide.data.description,
      body: [guide.data.description, guide.body ?? ""].filter(Boolean).join("\n\n"),
      date: guide.data.date,
    })),
    ...stays.map((stay) => ({
      title: `${stay.data.nameKo} 3인`,
      path: stayPath(stay),
      description: stay.data.verdict,
      body: [stay.data.verdict, stay.body ?? ""].filter(Boolean).join("\n\n"),
      date: stay.data.updated,
    })),
    ...areas.map((area) => ({
      title: area.data.title,
      path: areaPath(area.data.city, area.data.slug),
      description: area.data.description,
      body: [area.data.why, area.body ?? ""].filter(Boolean).join("\n\n"),
      date: new Date("2026-09-15T00:00:00+09:00"),
    })),
    ...cities.map((city) => ({
      title: city.data.title,
      path: cityPath(city.id),
      description: city.data.description,
      body: [city.data.lede, city.body ?? ""].filter(Boolean).join("\n\n"),
      date: new Date("2026-09-15T00:00:00+09:00"),
    })),
  ];

  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function collectSitemapUrls(): Promise<
  { path: string; lastmod: Date; changefreq: string; priority: string }[]
> {
  const [guides, stays, areas, cities, chains] = await Promise.all([
    getCollection("guides"),
    getCollection("stays"),
    getCollection("areas"),
    getCollection("cities"),
    getCollection("chains"),
  ]);

  const now = new Date();
  return [
    { path: "/", lastmod: now, changefreq: "daily", priority: "1.0" },
    { path: "/about/", lastmod: now, changefreq: "monthly", priority: "0.4" },
    { path: "/blog/", lastmod: now, changefreq: "weekly", priority: "0.6" },
    { path: "/search/", lastmod: now, changefreq: "weekly", priority: "0.3" },
    ...cities.map((city) => ({
      path: cityPath(city.id),
      lastmod: now,
      changefreq: "weekly",
      priority: "0.8",
    })),
    ...areas.map((area) => ({
      path: areaPath(area.data.city, area.data.slug),
      lastmod: now,
      changefreq: "weekly",
      priority: "0.8",
    })),
    ...stays.map((stay) => ({
      path: stayPath(stay),
      lastmod: stay.data.updated,
      changefreq: "weekly",
      priority: "0.7",
    })),
    ...guides.map((guide) => ({
      path: `/blog/${guide.id}/`,
      lastmod: guide.data.date,
      changefreq: "monthly",
      priority: "0.6",
    })),
    ...chains.map((chain) => ({
      path: `/chains/${chain.id}/`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.4",
    })),
  ];
}

export function rssXml(items: FeedItem[]): string {
  const channelLink = absUrl("/");
  const built = rfc822(items[0]?.date ?? new Date());
  const itemXml = items
    .map((item) => {
      const link = absUrl(item.path);
      const html = markdownToHtml(item.body || item.description);
      return `  <item>
    <title>${xmlText(item.title)}</title>
    <link>${xmlText(link)}</link>
    <guid isPermaLink="true">${xmlText(link)}</guid>
    <pubDate>${rfc822(item.date)}</pubDate>
    <description><![CDATA[${html}]]></description>
  </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlText(site.brandName)}</title>
    <link>${xmlText(channelLink)}</link>
    <description>${xmlText(site.description)}</description>
    <language>ko</language>
    <lastBuildDate>${built}</lastBuildDate>
${itemXml}
  </channel>
</rss>
`;
}

export function sitemapXml(
  urls: { path: string; lastmod: Date; changefreq: string; priority: string }[],
): string {
  const body = urls
    .map(
      (url) => `  <url>
    <loc>${xmlText(absUrl(url.path))}</loc>
    <lastmod>${isoDate(url.lastmod)}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export const rssHeaders = {
  "Content-Type": "application/rss+xml; charset=utf-8",
};

export const sitemapHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
};
