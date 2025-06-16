import { RequestAddress } from "../types/messageTypes.ts";
import { log } from "../utils/log.ts";
import { pb } from "../utils/pocketbase.ts";

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
    socket.send('{code:200,message:"Address accepted"}');
    log.info(
      `Accepted request for address ${data.gate_address}${data.gate_code}`,
    );
  } else {
    log.info(
      `Denied request for address ${data.gate_address}${data.gate_code}. Address already taken`,
    );
    socket.send("403");
  }
  socket.send("request recieved for an address\n" + data);
}
