"use server"

import { db } from "database/src/db";
import { bannedIds } from "database/src/schema";
import * as z from "zod";
import { formSchema } from "./create-dialog";

export default async function createBan(data: z.infer<typeof formSchema>) {
  await db.insert(bannedIds).values({
    user_id: data.user_id,
    reason: data.reason
  })
}
