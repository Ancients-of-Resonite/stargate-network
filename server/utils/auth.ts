import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "database/src/db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    discord: {
      enabled: true,
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
  account: {
    additionalFields: {
      tags: {
        type: "string[]",
        default: ["user"],
      },
    },
  },
    user: {
      additionalFields: {
        tags: {
          type: "string[]",
          default: ["user"],
        },
      },
    },
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
});
