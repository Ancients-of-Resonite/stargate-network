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
import { Cron } from "croner";
import { EventEmitter } from "./types/events";

const wss = new WebSocketServer({
  port: 8000,
});

export const sessions = new Sessions();
export const gateEvents = new EventEmitter<any>()

wss.on("listening", () => {
  log.info("WebSocket server is listening on port 8000");

  const prune = new Cron("*/1 * * * *", async () => {
    const mintime = 60000
    let slist = sessions.getSessions()
    let dblist = await db.select().from(stargate)

    let currentDate = new Date()

    dblist.forEach(async (g) => {
      let timeDifference = currentDate.getTime() - g.last_keep_alive!.getTime()

      if (timeDifference > mintime) {
        log.info(`Removing stale stargate ${g.gate_address}${g.gate_code}`)
        await db.delete(stargate).where(eq(stargate.id, g.id))
      }
    })

    slist.forEach(async (s) => {
      let timeDifference = currentDate.getTime() - s.lastKeepAlive.getTime()
      if (timeDifference > mintime) {
        log.info(`Removing stale session ${s.remote}`)
        sessions.removeSession(s.remote)
      }
    })
  })

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
  const forwardedFor = req.headers["x-forwarded-for"]
  const remote = (forwardedFor ?? req.socket.remoteAddress) + ":" + req.socket.remotePort;

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
        let _s = sessions.getSession(remote)
        gateEvents.emit(`irisUpdate:${_s?.gate_address}`, data.iris_state)
        break;
      case MessageType.KeepAlive:
        sessions.sessionKeepAlive(remote)
        break;
      default:
        socket.send("this type is not a thing");
        break;
    }
  });
});
