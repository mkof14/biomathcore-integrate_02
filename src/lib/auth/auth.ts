import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM || "dev@example.com",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
const { handlers } = NextAuth(authOptions as any);
export const { GET, POST } = handlers;
