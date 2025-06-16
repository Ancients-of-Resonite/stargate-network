import { DialRequest } from "../types/messageTypes.ts";

export default async function dialRequest(
  { data, socket }: { data: DialRequest; socket: WebSocket },
) {
  socket.send("dial request received\n" + data);
}
