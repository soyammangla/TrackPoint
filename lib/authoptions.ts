import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // 1️⃣ Ensure user exists in DB on Google login
    async signIn({ user }) {
      if (!user.email) return false;

      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name ?? null,
          image: user.image ?? null,
        },
        create: {
          email: user.email,
          name: user.name ?? null,
          image: user.image ?? null,
          provider: "google", // ✅ REQUIRED — MUST BE HERE
        },
      });

      return true;
    },
    // 2️⃣ Store DB userId in JWT
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true },
        });

        if (dbUser) {
          token.id = String(dbUser.id);
        }
      }
      return token;
    },

    // 3️⃣ Expose userId in session
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
