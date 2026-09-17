import { site } from "../site.config";

export function mediaUrl(src: string): string {
  if (!src) return src;
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  const base = site.mediaBaseUrl.replace(/\/$/, "");
  if (!base) return `/${src.replace(/^\//, "")}`;
  return `${base}/${src.replace(/^\//, "")}`;
}
