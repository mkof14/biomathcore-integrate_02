import { type NextAuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/email";
export const authConfig = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT || 465),
        auth: { user: process.env.EMAIL_SERVER_USER!, pass: process.env.EMAIL_SERVER_PASSWORD! },
        secure: true,
      },
      from: process.env.EMAIL_FROM!,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        if (process.env.NODE_ENV !== "production") {
          console.log("[magic-link]", identifier, url);
          return;
        }
        const nodemailer = await import("nodemailer");
        const transport = nodemailer.createTransport(provider.server as any);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: "Sign in to BioMath Core",
          text: `Sign in: ${url}`,
          html: `<p>Sign in: <a href="${url}">${url}</a></p>`,
        });
        const failed = (result.rejected || []).concat(result.pending || []);
        if (failed.length) throw new Error(`Email(s) failed: ${failed.join(", ")}`);
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {},
  trustHost: true,
} satisfies NextAuthConfig;
