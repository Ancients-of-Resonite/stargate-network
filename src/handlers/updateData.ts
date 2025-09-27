import { sessions } from "../main.ts";
import { UpdateData } from "../types/messageTypes.ts";
import { db } from "$packages/database/src/db.ts";
import { stargates as stargateSchema } from "$packages/database/src/schema.ts";
import { eq } from "drizzle-orm";

export default async function updateData(data: UpdateData, remote: string) {
  const session = sessions.getSession(remote);
  if (!session) return;
  await db.update(stargateSchema).set({
    gate_status: data.gate_status,
    active_users: data.currentUsers,
    max_users: data.maxUsers,
  }).where(
    eq(stargateSchema.id, session.id),
  );
}
