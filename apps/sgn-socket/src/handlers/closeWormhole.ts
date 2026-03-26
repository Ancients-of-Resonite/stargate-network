import { WebSocket } from "ws";
import { gateEvents, sessions } from "../main";
import { DialRequest } from "../types/messageTypes";
import { db } from "database/src/db";
import { gateLog, stargate } from "database/src/schema";

import { log } from "../utils/log";
import { eq } from "database/src/db";


export default async function closeWormhole(socket: WebSocket, remote: string) {
  const session = sessions.getSession(remote);
  if (!session?.connected_gate.session) return;
  log.info(
    `Client ${remote} has requested to close connection from ${session.gate_address + session.gate_code
    } to ${session.connected_gate.session?.gate_address} ${session.connected_gate.session?.gate_code}`,
  );

  const outgoing_gate = await db.select().from(stargate).where(eq(stargate.id, session.connected_gate.session.id))

  const this_gate = await db.select().from(stargate).where(eq(stargate.id, session.id));

  if (!outgoing_gate) {
    log.error(`Gate ${session.connected_gate.session?.gate_address} was not found`);
    await db.insert(gateLog).values({
      type: "CLOSE",
      remote: session.remote,
      status: 404,
      data: {
        origin_gate: session.gate_address ?? "UNKNOWN",
        end_gate: session.connected_gate.session.gate_address ?? "UNKNOWN",
        message: 'Unable to find connected gate',
      }
    })
    return;
  }

  if (!this_gate) {
    log.error(`Gate ${session.gate_address}${session.gate_code} was not found`);
    await db.insert(gateLog).values({
      type: "CLOSE",
      remote: session.remote,
      status: 404,
      data: {
        origin_gate: session.gate_address ?? "UNKNOWN",
        end_gate: session.connected_gate.session.gate_address ?? "UNKNOWN",
        message: 'Unable to find active session stargate',
      }
    })
    return;
  }

  gateEvents.off(`irisUpdate:${session.connected_gate.session.gate_address}`, session.gate_address)

  await db.insert(gateLog).values({
    type: "CLOSE",
    remote: session.remote,
    status: 200,
    data: {
      origin_gate: session.gate_address ?? "UNKNOWN",
      end_gate: session.connected_gate.session.gate_address ?? "UNKNOWN",
      message: 'Successfully closed gates',
    }
  })
  sessions.closeGate(session)
  socket.send("200");
}
