export const site = {
  name: "3인룸",
  brandName: "3인룸",
  brandRest: "room.kr",
  title: "3인룸 ㅡ 도쿄 오사카 교토 후쿠오카 숙소 정보",
  description:
    "애매한 3인 여행자를 위한 3인, 4인, 가족 호텔 정보 제공",
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
