import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (creds) => {
        try {
          const email = String(creds?.email || "").toLowerCase().trim();
          const password = String(creds?.password || "");
          if (!email || !password) return null;

          const user = await db.user.findUnique({ where: { email } });
          if (!user || !user.passwordHash) return null;

          const { compare } = await import("bcryptjs");
          const ok = await compare(password, user.passwordHash);
          if (!ok) return null;

          return { id: user.id, email: user.email, name: user.name || user.email };
        } catch (e) {
          console.error("authorize error:", e);
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
});
