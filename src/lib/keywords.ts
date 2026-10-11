/** 도시 검색 결과에 항상 붙는 세부 키워드 */
export const baseStayKeywords = [
  "추천",
  "가성비",
  "내돈내산",
  "온천",
  "대욕장",
] as const;

/** "도쿄 3인 숙소 신주쿠" 형태. 기본 키워드 뒤에 숙소 밀집 지역을 붙인다. */
export function cityStayKeywordPhrases(cityName: string, areas: string[]) {
  return [...baseStayKeywords, ...areas].map(
    (term) => `${cityName} 3인 숙소 ${term}`,
  );
}
