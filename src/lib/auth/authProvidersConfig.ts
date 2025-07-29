import type { NextAuthConfig } from "next-auth";

const authProvidersConfig = {
  providers: [
    {
      id: "rauth",
      name: "rauth",
      type: "oidc",
      issuer: `${process.env.RAY_AUTH_BASE_URL}`,
      clientId: process.env.RAY_AUTH_CLIENT_ID,
      clientSecret: process.env.RAY_AUTH_CLIENT_SECRET,
      token: `${process.env.RAY_AUTH_BASE_URL}/api/rauth/token`,
      wellKnown: `${process.env.RAY_AUTH_BASE_URL}/.well-known/openid-configuration`,
      checks: ["pkce", "state"],
    },
  ],
} satisfies NextAuthConfig;

export default authProvidersConfig;
