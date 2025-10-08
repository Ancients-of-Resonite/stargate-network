import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import * as authSchema from "./auth-schema.ts";
import pg from "pg";

const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    connectionString: process.env.DB_URL,
  }),
  schema: {
    ...schema,
    ...authSchema
  },
});
