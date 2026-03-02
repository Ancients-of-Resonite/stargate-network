import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import * as authSchema from "./auth-schema";
import pg from "pg";

export { eq } from "drizzle-orm"

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

