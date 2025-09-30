import { db } from "$packages/database/src/db";

export * as schema from "$packages/database/src/schema";

export function useDrizzle() {
  return db;
}
