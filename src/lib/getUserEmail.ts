import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // adjust if your file path differs
import { headers } from "next/headers";

/** Returns an email from session; in dev allows X-User-Email header fallback. */
export async function getUserEmail() {
  const session = await getServerSession(authOptions as any).catch(() => null);
  const emailFromSession = session?.user?.email;
  if (emailFromSession) return emailFromSession;

  // Dev fallback for local testing
  const h = headers();
  const devEmail = h.get("x-user-email");
  if (process.env.NODE_ENV !== "production" && devEmail) return devEmail;

  throw new Error("UNAUTHENTICATED");
}
