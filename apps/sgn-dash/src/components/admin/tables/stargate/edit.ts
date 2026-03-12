"use server"

import { db, eq } from "database/src/db"
import { stargate } from "database/src/schema"

export async function editGate(
  gate: typeof stargate.$inferSelect,
  values: {
    session_name?: string,
    public?: boolean,
    owner_name?: string,
    status?: string
  }) {
  await db.update(stargate).set({
    session_name: values.session_name,
    public_gate: values.public,
    owner_name: values.owner_name
  }).where(eq(stargate.id, gate.id)).then(() => {return true}).catch(() => {return false})
}
