import { drizzle } from "drizzle-orm/node-postgres";
import { stargates as stargateSchema } from "./schema.ts";
import pg from "pg";

const { Pool } = pg;

if (!Deno.env.get("DB_URL")) {
  console.error("Please enter a DB_URL variable");
  Deno.exit(5);
}

export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DB_URL"),
  }),
  schema: {
    stargateSchema,
  },
});
