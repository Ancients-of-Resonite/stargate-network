import { eq } from "drizzle-orm";
import { sessions } from "../main.ts";
import { DialRequest } from "../types/messageTypes.ts";
import { db } from "../utils/db.ts";
import { stargates } from "../utils/drizzle/schema.ts";
import { log } from "../utils/log.ts";
import { pb } from "../utils/pocketbase.ts";

export default async function closeWormhole(socket: WebSocket, remote: string) {
  const session = sessions.getSession(remote);
  if (!session?.connected_gate.session) return;
  log.info(
    `Client ${remote} has requested to close connection from ${
      session.gate_address + session.gate_code
    } to ${session.connected_gate.session?.gate_address} ${session.connected_gate.session?.gate_code}`,
  );

  const outgoing_gate = await db.query.stargateSchema.findFirst({
    where: eq(stargates.id, session.connected_gate.session!.id),
  });

  const this_gate = await db.query.stargateSchema.findFirst({
    where: eq(stargates.id, session.id),
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

  // await db.update(stargates).set({
  //   id: outgoing_gate.id,
  //   gate_status: "IDLE",
  // }).where(
  //   eq(stargates.id, outgoing_gate.id!),
  // );

  // await db.update(stargates).set({
  //   id: this_gate.id,
  //   gate_status: "IDLE",
  // }).where(
  //   eq(stargates.id, this_gate.id),
  // );

  socket.send("200");
}
