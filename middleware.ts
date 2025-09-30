import { NextResponse } from "next/server";

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
const maxReq = Number(process.env.RATE_LIMIT_MAX || 120);
const buckets = new Map<string,{ reset:number; count:number }>();
function rlOk(ip:string) {
  const now = Date.now();
  const b = buckets.get(ip) || { reset: now + windowMs, count: 0 };
  if (now > b.reset) { b.reset = now + windowMs; b.count = 0; }
  b.count++;
  buckets.set(ip, b);
  return b.count <= maxReq;
}

export function middleware(req: Request) {
  const url = new URL(req.url);
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    (req as any).ip || "0.0.0.0";

  // security headers
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options","DENY");
  res.headers.set("X-Content-Type-Options","nosniff");
  res.headers.set("Referrer-Policy","no-referrer-when-downgrade");
  res.headers.set("Permissions-Policy","geolocation=(), microphone=(), camera=()");

  // rate limit (skip _next/public/auth)
  if (!url.pathname.startsWith("/_next") &&
      !url.pathname.startsWith("/public") &&
      !url.pathname.startsWith("/api/auth")) {
    if (!rlOk(ip)) {
      return new NextResponse(JSON.stringify({ ok:false, error:"rate_limited" }), {
        status: 429,
        headers: { "Content-Type":"application/json" }
      });
    }
  }

  // aliases: /Member* and /member-zone* -> /member*
  const p = url.pathname;
  if (p.startsWith("/Member") || p.startsWith("/member-zone") || p.startsWith("/Member%20Zone")) {
    url.pathname = p
      .replace(/^\/Member/, "/member")
      .replace(/^\/member-zone/, "/member")
      .replace(/^\/Member%20Zone/, "/member");
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.txt).*)"]
};
