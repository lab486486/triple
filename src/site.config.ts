export const site = {
  name: "트리플",
  brandName: "트리플",
  title: "트리플 — 일본 3인 숙소",
  description:
    "3명이 실제로 눕는 일본 숙소만 고릅니다. 우에노·도쿄·오사카·교토·후쿠오카에서 부부+자녀와 성인 3인 기준으로 방을 가릅니다.",
  baseUrl: "https://triple-e6i.pages.dev",
  lang: "ko",
  /** 라쿠텐트래블 어필리에이트 ID. 발급 후 넣으면 모든 CTA에 붙습니다. */
  rakutenAffiliateId: "",
  rakutenSearchBase: "https://hotel.travel.rakuten.co.jp/hotelsearch/",
} as const;

export const nav = [
  { href: "/tokyo/", label: "도쿄" },
  { href: "/osaka/", label: "오사카" },
  { href: "/kyoto/", label: "교토" },
  { href: "/fukuoka/", label: "후쿠오카" },
  { href: "/guides/", label: "고르는 법" },
] as const;
