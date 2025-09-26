import { cyan } from "colors";
import { RequestAddress } from "@/types/messageTypes.ts";
import { log } from "@/utils/log.ts";
import { sessions } from "@/main.ts";
import { db } from "../utils/db.ts";
import { eq } from "drizzle-orm";
import { stargates as stargateSchema } from "../utils/drizzle/schema.ts";

export default async function requestAddress(
  { data, socket, remote }: {
    data: RequestAddress;
    socket: WebSocket;
    remote: string;
  },
) {
  const eg = await db.query.stargateSchema.findFirst({
    where: eq(stargateSchema.gate_address, data.gate_address),
  });

  if (!eg) {
    log.info(
      `Accepted request for address ${data.gate_address}${data.gate_code} (${cyan(remote)})`,
    );

    try {
      await db.insert(stargateSchema).values({
        gate_address: data.gate_address,
        gate_code: data.gate_code,
        max_users: data.max_users,
        gate_status: "IDLE",
        iris_state: false,
        owner_name: data.host_id,
        session_name: data.gate_name,
        session_url: data.session_id,
        active_users: data.current_users,
        is_headless: data.is_headless,
        public_gate: data.public,
      });
    } catch (err) {
      console.log(err);
    }

    const gate = await db.query.stargateSchema.findFirst({
      where: eq(stargateSchema.gate_address, data.gate_address),
    });

    if (!gate) {
      log.error(
        `Failed to create stargate with address ${data.gate_address}${data.gate_code}`,
      );
      return;
    }

    socket.addEventListener("close", async () => {
      const gate = sessions.getSession(remote);

      if (gate) {
        await db.delete(stargateSchema).where(eq(stargateSchema.id, gate.id));
        sessions.removeSession(`${remote}`);
      }
      return;
    });

    sessions.pushSession({
      id: gate.id,
      gate_address: data.gate_address,
      gate_code: data.gate_code,
      remote: remote,
      gate_status: "IDLE",
      connected_gate: {},
      send_impulse: (tag) => {
        socket.send(`Impulse:${tag}`)
      },
      gate_relay: (relay) => {
        socket.send(relay)
      }
    });

    socket.send('{code:200,message:"Address accepted"}');
  } else if (eg.session_url == data.session_id) {
    log.info(
      `Gate address exists, but session id is the same on requesting gate. Accepting request for ${data.gate_address}${data.gate_code} (${cyan(remote)})`,
    );
    sessions.pushSession({
      id: eg.id,
      gate_address: data.gate_address,
      gate_code: data.gate_code,
      remote: remote,
      gate_status: "IDLE",
      connected_gate: {},
      send_impulse: (tag) => {
        socket.send(`Impulse:${tag}`)
      },
      gate_relay: (relay) => {
        socket.send(relay)
      }
    });
    socket.send('{code:200,message:"Address accepted"}');
    return;
  } else {
    log.info(
      `Denied request for address ${data.gate_address}${data.gate_code} for client ${
        cyan(remote)
      }. Address already taken`,
    );
    socket.send("403");
  }
}
