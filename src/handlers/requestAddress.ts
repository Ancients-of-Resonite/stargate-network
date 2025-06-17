import { cyan } from "colors";
import { RequestAddress } from "@/types/messageTypes.ts";
import { log } from "@/utils/log.ts";
import { pb } from "@/utils/pocketbase.ts";
import { sessions } from "../main.ts";

export default async function requestAddress(
  { data, socket, remote }: {
    data: RequestAddress;
    socket: WebSocket;
    remote: Deno.NetAddr;
  },
) {
  const eg = await pb.collection("stargates").getFullList(1, {
    filter: `gate_address="${data.gate_address}"`,
  });

  if (eg.length == 0) {
    log.info(
      `Accepted request for address ${data.gate_address}${data.gate_code}`,
    );

    const gate = await pb.collection("stargates").create({
      gate_address: data.gate_address,
      gate_code: data.gate_code,
      max_users: data.max_users,
      active_users: data.current_users,
      public_gate: data.public,
      is_headless: data.is_headless,
      gate_status: "IDLE",
      iris_state: false,
      owner_name: data.host_id,
      session_name: data.gate_name,
      session_url: data.session_id,
    });

    const unsub = await pb.collection("stargates").subscribe(gate.id, (e) => {
      console.log("temp\n" + e);
    });

    socket.addEventListener("close", async () => {
      await unsub();
    });

    sessions.pushSession({
      gate_address: data.gate_address,
      gate_code: data.gate_code,
      remote: `${remote.hostname}:${remote.port}`,
      gate_status: "IDLE",
      connected_gate: {
        connected: false,
      },
    });

    socket.send('{code:200,message:"Address accepted"}');
  } else {
    log.info(
      `Denied request for address ${data.gate_address}${data.gate_code} for client ${
        cyan(remote.hostname + ":" + remote.port)
      }. Address already taken`,
    );
    socket.send("403");

    sessions.removeSession(`${remote.hostname}:${remote.port}`);
  }
}
