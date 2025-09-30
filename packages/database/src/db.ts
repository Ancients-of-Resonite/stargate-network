import { drizzle } from "drizzle-orm/node-postgres";
import { stargates as stargateSchema } from "./schema.ts";
import pg from "pg";

const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    connectionString: process.env.DB_URL,
  }),
  schema: {
    stargateSchema,
  },
});
