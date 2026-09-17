# 3인룸 — 일본 3인 숙소

3명이 실제로 눕는 일본 숙소만 소개하는 한국어 사이트입니다. 예약은 라쿠텐트래블로 넘깁니다.

## 로컬

```bash
npm install
npm run dev
```

## Cloudflare Pages

GitHub 저장소와 연결한 뒤 빌드 설정은 다음과 같습니다.

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`

사이트 주소는 [`src/site.config.ts`](src/site.config.ts)의 `baseUrl`입니다. 지금은 테스트용 `https://triple-e6i.pages.dev`이고, `3room.kr`을 Cloudflare에 붙인 뒤에 그 주소로 바꿉니다. 라쿠텐 어필리에이트 ID가 나오면 같은 파일의 `rakutenAffiliateId`에 넣습니다.

## 콘텐츠

숙소·지역·가이드는 `src/content/` 마크다운입니다. 빈 지역 페이지는 올리지 말고, 숙소 frontmatter의 `city`/`area`가 URL과 일치해야 합니다.

관리자 폼은 `/admin/` 입니다. 로컬에서는 개발 서버와 함께 `npm run cms`를 켭니다. 배포 사이트에서 GitHub로 로그인하려면 Cloudflare에 `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`을 넣고, GitHub OAuth App의 callback을 `https://triple-e6i.pages.dev/api/callback`로 두면 됩니다. `3room.kr`을 붙인 뒤에는 callback을 그 주소로 추가하면 됩니다. 숙소 입력 때 객실은 3인실만 넣습니다.
