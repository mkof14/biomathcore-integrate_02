import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // skip internals / assets / APIs
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/api') ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) return NextResponse.next();

  // /Member -> /member (preserve the rest and query)
  if (pathname.startsWith('/Member')) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/Member/, '/member');
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// run on everything except excluded above
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
