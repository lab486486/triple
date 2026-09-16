export const amenityOptions = [
  "무선인터넷",
  "욕실용품",
  "TV",
  "에어컨",
  "샤워실",
  "금연",
  "엘리베이터",
  "카드결제",
  "드라이기",
  "수영장",
  "야외수영장",
  "사우나",
  "레스토랑",
  "카페",
  "무료주차",
  "주차장",
  "공용스파",
  "스프링클러",
] as const;

export const defaultAmenities: string[] = [
  "무선인터넷",
  "욕실용품",
  "TV",
  "에어컨",
  "샤워실",
  "금연",
  "엘리베이터",
  "카드결제",
  "드라이기",
];

export type AmenityIcon =
  | "wifi"
  | "bath"
  | "tv"
  | "ac"
  | "shower"
  | "smoke"
  | "elevator"
  | "card"
  | "dryer"
  | "pool"
  | "sauna"
  | "restaurant"
  | "cafe"
  | "parking"
  | "spa"
  | "sprinkler";

export const amenityIcon: Record<string, AmenityIcon> = {
  무선인터넷: "wifi",
  욕실용품: "bath",
  TV: "tv",
  에어컨: "ac",
  샤워실: "shower",
  금연: "smoke",
  엘리베이터: "elevator",
  카드결제: "card",
  드라이기: "dryer",
  수영장: "pool",
  야외수영장: "pool",
  사우나: "sauna",
  레스토랑: "restaurant",
  카페: "cafe",
  무료주차: "parking",
  주차장: "parking",
  공용스파: "spa",
  스프링클러: "sprinkler",
};
