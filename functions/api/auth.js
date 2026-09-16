export async function onRequestGet(context) {
  const clientId = context.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response(
      "GitHub 로그인이 아직 연결되지 않았습니다. 로컬에서는 npm run cms 를 켠 뒤 /admin/ 에서 편집하세요.",
      { status: 501, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }

  const url = new URL(context.request.url);
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("scope", "public_repo");
  authorize.searchParams.set("redirect_uri", `${url.origin}/api/callback`);
  return Response.redirect(authorize.toString(), 302);
}
