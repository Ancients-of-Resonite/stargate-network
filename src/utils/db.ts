import { drizzle } from "drizzle-orm/node-postgres";
import { stargates as stargateSchema } from "./drizzle/schema.ts";
import pg from "pg";
import { log } from "./log.ts";

const { Pool } = pg;

if (!Deno.env.get("DATABASE_URL")) {
  log.fatal("Please enter a DATABASE_URL variable");
  Deno.exit(5);
}

export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: {
    stargateSchema,
  },
});
