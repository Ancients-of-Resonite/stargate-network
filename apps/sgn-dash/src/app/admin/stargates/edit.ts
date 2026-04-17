"use server";
import { formSchema } from "./edit-dialog";
import * as z from "zod";
import { db, eq } from "database/src/db";
import { stargate } from "database/src/schema";

export default async function editGate(
  gate: typeof stargate.$inferSelect,
  data: z.infer<typeof formSchema>,
) {
  await db
    .update(stargate)
    .set({
      session_name: data.session_name,
      public_gate: data.is_public,
    })
    .where(eq(stargate.id, gate.id));
}
