import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";


const baseURL = process.env.BETTER_AUTH_URL ?? process.env.APP_URL;
const trustedOrigins = process.env.APP_URL ? [process.env.APP_URL] : [];

export const auth = betterAuth({
  basePath: "/api/auth",
  ...(baseURL && { baseURL }),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  ...(trustedOrigins.length > 0 && { trustedOrigins }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
    },
  },
});
