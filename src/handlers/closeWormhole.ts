import { WebSocket } from "ws";
import { eq } from "drizzle-orm";
import { sessions } from "../main";
import { DialRequest } from "../types/messageTypes";
import { db, prisma } from "database/src/db";
import { stargates } from "database/src/schema";
import { log } from "../utils/log";


export default async function closeWormhole(socket: WebSocket, remote: string) {
  const session = sessions.getSession(remote);
  if (!session?.connected_gate.session) return;
  log.info(
    `Client ${remote} has requested to close connection from ${
      session.gate_address + session.gate_code
    } to ${session.connected_gate.session?.gate_address} ${session.connected_gate.session?.gate_code}`,
  );

  const outgoing_gate = await prisma.stargates.findFirst({
      where: {
        id: session.connected_gate.session!.id
      },
  });

  const this_gate = await prisma.stargates.findFirst({
    where: {
      id: session.id
      },
  });

  if (!outgoing_gate) {
    log.error(`Gate ${session.connected_gate.session?.gate_address} was not found`);
    return;
  }

  if (!this_gate) {
    log.error(`Gate ${session.gate_address}${session.gate_code} was not found`);
    return;
  }

  sessions.closeGate(session)

  socket.send("200");
}
