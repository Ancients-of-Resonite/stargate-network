import { WebSocketServer } from "ws";

import { log } from "@/utils/log";

import { MessageType } from "@/types/messageTypes";
import dialRequest from "@/handlers/dialRequest";
import { cyan, green, red } from "@std/fmt/colors";
import requestAddress from "@/handlers/requestAddress";
import { Sessions } from "./types/session";
import validateRequest from "./handlers/validateAddress";
import closeWormhole from "./handlers/closeWormhole";
import updateData from "./handlers/updateData";
import { gateLog, stargate } from "database/src/schema";
import { db, eq } from "database/src/db";

const wss = new WebSocketServer({
  port: 8000,
});

export const sessions = new Sessions();

wss.on("listening", () => {
  log.info("WebSocket server is listening on port 8000");

  Bun.serve({
    port: 3000,
    routes: {
      "/health": Response.json({
        status: 'healthy'
      }) 
    }
  })
});

wss.on("connection", (socket, req) => {
  const remote = req.socket.remoteAddress + ":" + req.socket.remotePort;

  log.info(`A new client has connected: ${green(remote)}`);

  socket.addEventListener("close", async (_ev) => {
    const session = sessions.getSession(remote);
    log.info(`Client ${red(remote)} has disconnected from the network.`);
    if (session) {
      if (session.connected_gate.session) {
        session.connected_gate.session.send_impulse("CloseWormhole")
      }
      await db
        .delete(stargate)
        .where(eq(stargate.id, session.id))
      await db.insert(gateLog)
        .values({
          type: "DELETE",
          remote: remote,
          status: 200,
          data: {
            gate: session.gate_address + session.gate_code,
            message: "Client disconnected, removing stargate"
          }
        })
      sessions.removeSession(`${remote}`);
    }
  });

  socket.addEventListener("message", (e) => {
    const event = e.data.toString();

    if (event.startsWith("IDC")) {
      const session = sessions.getSession(remote);

      if (!session) return;
      log.info(
        `Recieved gate relay from ${session.gate_address}${session.gate_code
        } (${green(remote)})`
      );
      session.connected_gate.session?.gate_relay(e.data as any);
      return;
    }

    const data = JSON.parse(event);
    const ses_data = {
      data,
      socket,
      remote,
    };
    switch (data.type) {
      case MessageType.RequestAddress:
        let temp = sessions.getSession(remote)
        if (temp) return
        log.info(
          `Client ${green(remote)} has requested address ${data.gate_address}${data.gate_code
          }`
        );
        requestAddress(ses_data);
        break;
      case MessageType.DialRequest:
        log.info(`Client ${green(remote)} has requested to dial.`);
        dialRequest(ses_data);
        break;
      case MessageType.ValidateAddress:
        log.info(
          `Client ${remote} has requested to validate address ${cyan(
            data.gate_address
          )}`
        );
        validateRequest(ses_data);
        break;
      case MessageType.CloseWormhole:
        closeWormhole(socket, remote);
        break;
      case MessageType.UpdateData:
        updateData(data, remote);
        break;
      case MessageType.UpdateIris:
        break;
      case MessageType.KeepAlive:
        break;
      default:
        socket.send("this type is not a thing");
        break;
    }
  });
});
