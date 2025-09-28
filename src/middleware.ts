import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const p = url.pathname;
  if (p.startsWith("/Member") || p.startsWith("/member-zone") || p.startsWith("/Member%20Zone")) {
    url.pathname = p.replace(/^\/Member/, "/member").replace(/^\/member-zone/, "/member").replace(/^\/Member%20Zone/, "/member");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/Member/:path*", "/member-zone/:path*", "/Member%20Zone/:path*"],
};
