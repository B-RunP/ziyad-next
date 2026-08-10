import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

type ProxyContext = {
  params: Promise<{ path: string[] }>;
};

function getApiBaseUrl() {
  const baseUrl = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
  return baseUrl?.replace(/\/$/, "");
}

export async function GET(request: NextRequest, { params }: ProxyContext) {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) {
    return Response.json({ error: "API_BASE_URL belum dikonfigurasi" }, { status: 500 });
  }

  const { path } = await params;
  const upstreamUrl = `${apiBaseUrl}/${path.map(encodeURIComponent).join("/")}${request.nextUrl.search}`;

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        Accept: request.headers.get("accept") ?? "application/json",
      },
      cache: "no-store",
    });

    const responseHeaders = new Headers();
    const contentType = upstreamResponse.headers.get("content-type");
    if (contentType) responseHeaders.set("content-type", contentType);

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    });
  } catch {
    return Response.json({ error: "Gagal menghubungi API upstream" }, { status: 502 });
  }
}
