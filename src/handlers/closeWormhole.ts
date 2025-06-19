import { sessions } from "../main.ts";
import { DialRequest } from "../types/messageTypes.ts";
import { log } from "../utils/log.ts";
import { pb } from "../utils/pocketbase.ts";

export default async function closeWormhole(socket: WebSocket, remote: string) {
  const session = sessions.getSession(remote);
  if (session?.connected_gate.state != "OUTGOING") return;
  log.info(
    `Client ${remote} has requested to close connection from ${
      session.gate_address + session.gate_code
    } to ${session.connected_gate.gate_address} ${session.connected_gate.gate_code}`,
  );

  await pb.collection("stargates").update(session.id, {
    gate_status: "IDLE",
  });

  await pb.collection("stargates").update(session.connected_gate.gate_id!);
  socket.send("200");
}
