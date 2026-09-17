export const site = {
  name: "3인룸",
  brandName: "3인룸",
  brandRest: "room.kr",
  title: "3인룸 — 일본 3인 숙소",
  description:
    "3명이 실제로 눕는 일본 숙소만 고릅니다. 우에노·도쿄·오사카·교토·후쿠오카에서 부부+자녀와 성인 3인 기준으로 방을 가릅니다.",
  /** 커스텀 도메인 연결 전까지 Pages 주소. 연결 후 https://3room.kr 로 바꿉니다. */
  baseUrl: "https://triple-e6i.pages.dev",
  mediaBaseUrl: "https://pub-776d8a270e67409bb1704e375af76a79.r2.dev",
  lang: "ko",
  tripAllianceId: "3937504",
  tripSid: "331494563",
  tripSub1: "3room",
  tripCityIds: {
    tokyo: 228,
    osaka: 219,
    kyoto: 734,
    fukuoka: 248,
  },
} as const;

export const nav = [
  { href: "/tokyo/", label: "도쿄" },
  { href: "/osaka/", label: "오사카" },
  { href: "/kyoto/", label: "교토" },
  { href: "/fukuoka/", label: "후쿠오카" },
] as const;
