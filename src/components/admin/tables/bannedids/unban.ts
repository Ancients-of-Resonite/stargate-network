"use server"

import { db, eq } from "database/src/db";
import { bannedIds } from "database/src/schema";

export async function unban(user: typeof bannedIds.$inferSelect) {
  return db.delete(bannedIds).where(eq(bannedIds.id, user.id)).then(() => {return true})
}
