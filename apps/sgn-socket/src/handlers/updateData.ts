import { sessions } from "../main";
import { UpdateData } from "../types/messageTypes";
import { db, eq } from "database/src/db";
import { stargate } from "database/src/schema";

export default async function updateData(data: UpdateData, remote: string) {
  const session = sessions.getSession(remote);
  if (!session) return;
  await db.update(stargate).set({
    gate_status: data.gate_status,
    active_users: data.currentUsers,
    max_users: data.maxUsers
  }).where(eq(stargate.id, session.id))
}
