import { DialRequest } from "@/types/messageTypes.ts";
import { pb } from "../utils/pocketbase.ts";
import { sessions } from "../main.ts";
import { log } from "../utils/log.ts";
import { cyan, magenta, red } from "colors";

export default async function dialRequest(
  { data, socket, remote }: {
    data: DialRequest;
    socket: WebSocket;
    remote: string;
  },
) {
  const address = data.gate_address.slice(0, 6);
  const code = data.gate_address.slice(6, 8);
  const session = sessions.getSession(remote);

  if (session?.connected_gate.state != "IDLE") return;

  if (session) {
    if (data.gate_address.length < 6) {
      socket.send("CSDialCheck:400");
      return;
    }

    if (address == session.gate_address) {
      socket.send("CSDialCheck:403");
      return;
    }

    try {
      const gate = await pb.collection("stargates").getFirstListItem(
        `gate_address = "${address}"`,
      );

      if (data.gate_address.length > 6) {
        if (gate.gate_code.startsWith(code)) {
          socket.send("CSDialCheck:200");
          socket.send(`CSDialedSessionURL:${gate.session_url}`);
          sessions.updateSession(remote, gate);
          await pb.collection("stargates").update(gate.id, {
            gate_status: `INCOMING${data.gate_address.length + 1}`,
          });
          log.info(
            `Dialout from ${
              cyan(session.gate_address) + magenta(session.gate_code)
            } to ${
              cyan(gate.gate_address) + magenta(gate.gate_code)
            } was successful.`,
          );
          return;
        } else {
          socket.send("CSDialCheck:302");
          log.info(
            `Dialout from ${
              cyan(session.gate_address) + magenta(session.gate_code)
            } to ${
              cyan(gate.gate_address) + magenta(gate.gate_code)
            } failed with code ${red("302")}.`,
          );
          return;
        }
      }
      if (gate.gate_code != session.gate_code) {
        socket.send("CSDialCheck:302");
        return;
      }

      await pb.collection("stargates").update(gate.id, {
        gate_status: "INCOMING7",
      });
      socket.send("CSDialCheck:200");
      socket.send(`CSDialedSessionURL:${gate.session_url}`);
      sessions.updateSession(remote, gate, "OUTGOING");
    } catch {
      socket.send("CSDialCheck:404");
      log.info(
        "Dialout failed, cannot dial your own address... You get a busy signal",
      );
      return;
    }
  }
  socket.send("dial request received\n" + address + +" " + code);
}
