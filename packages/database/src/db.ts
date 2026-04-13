import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import * as authSchema from "./auth-schema";

import postgres from "postgres";

export { eq } from "drizzle-orm";

export const pgClient = postgres(
  `postgresql://${Bun.env.DB_USER}:${Bun.env.DB_PASS}@${Bun.env.DB_HOST}:${Bun.env.DB_PORT ?? 5432}/${Bun.env.DB_DATABASE}`,
);

export const db = drizzle(pgClient, {
  schema: {
    ...schema,
    ...authSchema,
  },
});
