import { DialRequest } from "@/types/messageTypes.ts";
import { pb } from "../utils/pocketbase.ts";
import { sessions } from "../main.ts";

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

      if (gate.gate_code != session.gate_code) {
        socket.send("CSDialCheck:302");
        return;
      }
    } catch {
      socket.send("CSDialCheck:404");
    }
  }
  socket.send("dial request received\n" + address + +" " + code);
}
