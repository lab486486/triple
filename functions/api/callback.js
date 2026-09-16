function page(script) {
  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>트리플 로그인</title>
  </head>
  <body>
    <p>GitHub 로그인을 마무리하는 중입니다.</p>
    <script>${script}</script>
  </body>
</html>`;
}

function postMessageScript(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return `
    (function () {
      function receive(event) {
        if (event.origin !== window.location.origin) return;
        window.opener.postMessage(${JSON.stringify(message)}, event.origin);
      }
      window.addEventListener("message", receive, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  `;
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");
  const clientId = context.env.GITHUB_CLIENT_ID;
  const clientSecret = context.env.GITHUB_CLIENT_SECRET;
  const headers = { "content-type": "text/html; charset=utf-8" };

  if (!code || !clientId || !clientSecret) {
    return new Response(
      page(postMessageScript("error", { message: "로그인 코드가 없습니다." })),
      { status: 400, headers },
    );
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });
  const tokenJson = await tokenRes.json();
  if (!tokenJson.access_token) {
    return new Response(
      page(
        postMessageScript("error", {
          message: tokenJson.error_description || "토큰을 받지 못했습니다.",
        }),
      ),
      { status: 400, headers },
    );
  }

  return new Response(
    page(
      postMessageScript("success", {
        token: tokenJson.access_token,
        provider: "github",
      }),
    ),
    { headers },
  );
}
