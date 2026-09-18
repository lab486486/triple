import { getCollection, type CollectionEntry } from "astro:content";

export type Guide = CollectionEntry<"guides">;

export async function allGuides(): Promise<Guide[]> {
  return (await getCollection("guides")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export function guidePath(post: Guide): string {
  return `/blog/${post.id}/`;
}

export function neighborGuides(posts: Guide[], id: string) {
  const index = posts.findIndex((post) => post.id === id);
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

export function relatedGuides(posts: Guide[], current: Guide, limit = 3): Guide[] {
  const tags = new Set(current.data.tags ?? []);
  const others = posts.filter((post) => post.id !== current.id);
  if (tags.size === 0) return others.slice(0, limit);

  const ranked = others
    .map((post) => ({
      post,
      score: (post.data.tags ?? []).filter((tag) => tags.has(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime(),
    );

  const tagged = ranked.filter((item) => item.score > 0).map((item) => item.post);
  if (tagged.length >= limit) return tagged.slice(0, limit);

  const seen = new Set(tagged.map((post) => post.id));
  return [...tagged, ...others.filter((post) => !seen.has(post.id))].slice(0, limit);
}

export function formatPostDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}
