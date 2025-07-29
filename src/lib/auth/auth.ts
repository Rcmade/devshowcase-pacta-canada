import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { db } from "../db";
import authProvidersConfig from "./authProvidersConfig";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    // signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({}) {},
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email || !user?.name) return false;

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      // if (token.role && session.user) {
      //   session.user.role = token.role;
      // }

      if (session.user) {
        session.user.email = token?.email as string;
        session.user.name = token?.name as string;
      }
      // session.user.role = token.role;
      return session;
    },
    async jwt({ token }) {
      if (!token.email) return token;

      // if (trigger === "signIn" || trigger === "update") {
      //   // if (user?.role) {
      //   //   token.role = user?.role;
      //   // }
      // }
      // token.email = user?.email as string;
      // token.name = user?.name as string;
      // token.role = user?.role
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },

  ...authProvidersConfig,
  // debug: true,

  adapter: DrizzleAdapter(db),
});
