import { defineConfig } from "drizzle-kit";


export default defineConfig({
  out: "./src/migrate",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number ?? 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: false,
    url: process.env.DB_URL!,
  },
});
