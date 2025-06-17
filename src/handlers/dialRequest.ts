import { DialRequest } from "@/types/messageTypes.ts";
import { pb } from "../utils/pocketbase.ts";

export default async function dialRequest(
  { data, socket }: { data: DialRequest; socket: WebSocket },
) {
  const address = data.gate_address.slice(0, 6);
  const code = data.gate_address.slice(6, 8);
  const to_gate = await pb.collection("stargates").getFirstListItem(
    `gate_address="${address}"`,
  );
  socket.send("dial request received\n" + data);
}
