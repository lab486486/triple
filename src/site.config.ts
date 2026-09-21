export const site = {
  name: "3인룸",
  brandName: "3인룸",
  brandRest: "room.kr",
  title: "3인룸 — 도쿄·오사카 숙소 3인",
  description:
    "도쿄 숙소 3인, 오사카 가족여행 숙소 3인. 3인 호텔·가성비 가족숙소를 침대 구성과 면적으로 가릅니다.",
  /** 공개 주소. 관리자 GitHub OAuth callback은 https://3room.kr/api/callback 입니다. */
  baseUrl: "https://3room.kr",
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
