import { withAuthGuard } from "@/lib/auth/guard";
import type { NextRequest } from "next/server";

import { ensureRequestId } from "@/lib/http/requestId";
export async function middleware(req: NextRequest) { const id = ensureRequestId(req.headers); const path = new URL(req.url).pathname;
  if (path.startsWith("/member") || path.startsWith("/reports")) {
    return withAuthGuard(req, { roles: ["member","admin","staff"] });
  }
  if (path.startsWith("/admin")) {
    return withAuthGuard(req, { roles: ["admin"] });
  }
  return new Response(null, { status: 200 });
}

export const config = {
  matcher: ["/member/:path*","/reports/:path*","/admin/:path*"],
};
