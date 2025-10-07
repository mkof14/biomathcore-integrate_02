import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function withAuthGuard(req: NextRequest, opts?: { roles?: string[] }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = new URL(req.url);
  if (!token) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
  if (opts?.roles?.length) {
    const userRole = (token as any)?.role ?? "member";
    if (!opts.roles.includes(userRole)) {
      url.pathname = "/403";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
