import { log } from "@/utils/log.ts";

import { MessageType } from "@/types/messageTypes.ts";
import dialRequest from "@/handlers/dialRequest.ts";
import { pb } from "@/utils/pocketbase.ts";
import { green, red } from "colors";
import requestAddress from "@/handlers/requestAddress.ts";
import { Sessions } from "./types/session.ts";

if (!Deno.env.get("PB_ENDPOINT")) {
  log.fatal("Please include PB_ENDPOINT as an environment variable");
  Deno.exit(20);
}

if (!Deno.env.get("PB_EMAIL") || !Deno.env.get("PB_PASSWORD")) {
  log.fatal(
    "Please include an PB_EMAIL and PB_PASSWORD environment variable for the pocketbase database",
  );
  Deno.exit(20);
}

pb.admins.authWithPassword(
  Deno.env.get("PB_EMAIL")!,
  Deno.env.get("PB_PASSWORD")!,
);

export const sessions = new Sessions();

Deno.serve((req, info) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const remote = `${info.remoteAddr.hostname}:${info.remoteAddr.port}`;

  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.addEventListener("open", (_e) => {
    log.info(
      `A new client has connected: ${info.remoteAddr.hostname}:${info.remoteAddr.port}`,
    );
  });

  socket.addEventListener("message", (event) => {
    if (event.data.startsWith("IDC")) return;

    const data = JSON.parse(event.data);
    const ses_data = {
      data,
      socket,
      remote,
    };
    switch (data.type) {
      case MessageType.RequestAddress:
        log.info(
          `Client ${
            green(remote)
          } has requested address ${data.gate_address}${data.gate_code}`,
        );
        requestAddress(ses_data);
        break;
      case MessageType.DialRequest:
        log.info(
          `Client ${green(remote)} has requested to dial.`,
        );
        dialRequest(ses_data);
        break;
      default:
        socket.send("this type is not a thing");
        break;
    }
  });

  socket.addEventListener("close", (_ev) => {
    log.info(
      `Client ${
        red(info.remoteAddr.hostname + ":" + info.remoteAddr.port)
      } has disconnected from the network.`,
    );
  });

  return response;
});
