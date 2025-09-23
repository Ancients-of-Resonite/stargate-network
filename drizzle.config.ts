import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/utils/drizzle/migrate",
  schema: "./src/utils/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    database: "stargate-network",
    host: "192.168.2.39",
    port: 5439,
    user: "ancientsofresonite",
    password: "8xCNfPMZv12QJ7",
    ssl: false,
    url: Deno.env.get("DATABASE_URL")!,
  },
});
