export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/options";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
