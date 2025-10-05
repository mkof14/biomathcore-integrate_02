import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const config: NextAuthOptions = {
  debug: true,
  // важен для Vercel (и при прокси): разрешаем доверять host-заголовку
  trustHost: true,

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (creds) => {
        const startedAt = Date.now();
        try {
          const email = String(creds?.email || "").toLowerCase().trim();
          const password = String(creds?.password || "");
          console.log("[auth] authorize:start", { emailPresent: !!email, pwPresent: !!password });

          if (!email || !password) {
            console.log("[auth] authorize:missing");
            return null;
          }

          // Диагностический бэкдор: ALLOW_TEST_LOGIN=1 и тестовые креды
          if (process.env.ALLOW_TEST_LOGIN === "1"
              && email === "test@biomathcore.com"
              && password === "Passw0rd!") {
            console.log("[auth] authorize:ALLOW_TEST_LOGIN bypass");
            return { id: "test-local", email, name: "Test User" };
          }

          const user = await db.user.findUnique({ where: { email } });
          if (!user) { console.log("[auth] authorize:no-user"); return null; }

          if (!user.passwordHash) { console.log("[auth] authorize:no-hash"); return null; }

          const { compare } = await import("bcryptjs");
          const ok = await compare(password, user.passwordHash);
          console.log("[auth] authorize:compare", { ok });

          if (!ok) return null;
          const result = { id: user.id, email: user.email, name: user.name || user.email };
          console.log("[auth] authorize:success", { ms: Date.now() - startedAt });
          return result;
        } catch (e) {
          console.error("[auth] authorize:error", e);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id as string;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) (session.user as any).id = token.id;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
