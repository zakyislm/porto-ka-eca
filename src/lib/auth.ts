import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return "/";
      
      // Cek apakah email ada di whitelist tabel Admin untuk portfolio ini
      const slug = process.env.PORTFOLIO_SLUG || "resha";
      if (user.email === process.env.ADMIN_EMAIL) return true;

      const portfolio = await prisma.portfolio.findUnique({
        where: { slug },
        include: { admins: true },
      });

      if (!portfolio) return "/";
      
      const isAllowed = portfolio.admins.some((admin: any) => admin.email === user.email);
      return isAllowed ? true : "/";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
