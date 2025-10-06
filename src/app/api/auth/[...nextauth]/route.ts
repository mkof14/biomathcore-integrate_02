import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        try {
          const email = (creds?.email || "").trim().toLowerCase();
          const password = creds?.password || "";

          // краткий лог для диагностики (без пароля)
          console.log("[AUTH] try", { email, hasPass: !!password });

          if (!email || !password) return null;

          const user = await prisma.user.findUnique({ where: { email } });
          console.log("[AUTH] user", {
            found: !!user,
            hasHash: !!user?.passwordHash,
          });

          if (!user?.passwordHash) return null;

          const ok = await bcrypt.compare(password, user.passwordHash);
          console.log("[AUTH] compare", ok);
          if (!ok) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name ?? undefined,
          };
        } catch (e) {
          console.error("[AUTH] error", e);
          return null;
        }
      },
    }),
  ],
  // можно оставить включённым до завершения настройки
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export const runtime = "nodejs";
