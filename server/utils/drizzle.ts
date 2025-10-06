import { db } from "$packages/database/src/db";

export * as schema from "$packages/database/src/schema";
export * as authSchema from "$packages/database/src/auth-schema";

export function useDrizzle() {
  return db;
}
