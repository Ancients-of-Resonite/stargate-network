import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import * as authSchema from "./auth-schema";
import pg from "pg";

export { eq } from "drizzle-orm"

const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    connectionString: `postgresql://${Bun.env.DB_USER}:${Bun.env.DB_PASS}@${Bun.env.DB_HOST}:${Bun.env.DB_PORT ?? 5432}/${Bun.env.DB_DATABASE}`,
  }),
  schema: {
    ...schema,
    ...authSchema
  },
});

