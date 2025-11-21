import { WebSocket } from "ws";
import { sessions } from "../main";
import { UpdateData } from "../types/messageTypes";
import { db, prisma } from "database/src/db";
import { stargates as stargateSchema } from "database/src/schema";
import { eq } from "drizzle-orm";

export default async function updateData(data: UpdateData, remote: string) {
  const session = sessions.getSession(remote);
  if (!session) return;
  await prisma.stargates.update({
    where: {
      id: session.id
    },
    data: {
      gate_status: data.gate_status,
      active_users: data.currentUsers,
      max_users: data.maxUsers,
    }
  })
}
