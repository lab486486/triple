import type { CollectionEntry } from "astro:content";
import { partyLabels, sleepLabels } from "./labels";

export type StayRoom = CollectionEntry<"stays">["data"]["rooms"][number];

export function roomsForStay(stay: CollectionEntry<"stays">): StayRoom[] {
  if (stay.data.rooms.length > 0) return stay.data.rooms;
  return [
    {
      name: `대표 3인실 · ${sleepLabels[stay.data.sleep_layout]}`,
      size_sqm: stay.data.room_size_sqm,
      beds: stay.data.beds,
      capacity_official: stay.data.capacity_official,
      capacity_comfortable: stay.data.capacity_comfortable,
      party_types: stay.data.party_types,
      recommended: true,
      note: stay.data.verdict,
    },
  ];
}

export function stayFacts(stay: CollectionEntry<"stays">) {
  return [
    sleepLabels[stay.data.sleep_layout],
    `${stay.data.room_size_sqm}㎡`,
    `편안하게 ${stay.data.capacity_comfortable}인`,
    stay.data.child_sharing ? "첨이네 확인" : "첨이네 비추천",
    stay.data.extra_bed ? "엑베 타입 있음" : "고정 침대",
    ...stay.data.party_types.map((type) => partyLabels[type]),
  ];
}
