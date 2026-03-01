import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "database/src/db"
import {apiKey} from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    nextCookies(),
    apiKey()
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    discord: {
      enabled: true,
      clientId: Bun.env.DISCORD_CLIENT_ID!,
      clientSecret: Bun.env.DISCORD_CLIENT_SECRET!
    }
  },
  user: {
    additionalFields: {
      tags: {
        type: "string[]",
        required: true,
        input: false,
        defaultValue: []
      }
    }
  },
  database: drizzleAdapter(db, {
    provider: "pg"
  })
})

