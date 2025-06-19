import { sessions } from "../main.ts";
import { UpdateData } from "../types/messageTypes.ts";
import { pb } from "../utils/pocketbase.ts";

export default async function updateData(data: UpdateData, remote: string) {
  const session = sessions.getSession(remote);
  if (!session) return;
  await pb.collection("stargates").update(session.id, {
    gate_status: data.gate_status,
    active_users: data.currentUsers,
    max_users: data.maxUsers,
  });
}
