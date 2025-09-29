import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/migrate",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    database: Deno.env.get("DB_DATABASE"),
    host: Deno.env.get("DB_HOST"),
    port: Deno.env.get("DB_PORT") as unknown as number ?? 5432,
    user: Deno.env.get("DB_USER"),
    password: Deno.env.get("DB_PASS"),
    ssl: false,
    url: Deno.env.get("DB_URL")!,
  },
});
