import { parse } from "url";
import { createServer, Server, IncomingMessage, ServerResponse } from "http";
import next from "next";
import { WebSocket, WebSocketServer } from "ws";
import { Socket } from "net";
import { pgClient } from "database/src/db";

const nextApp = next({ dev: Bun.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();
const clients: Set<WebSocket> = new Set();

nextApp.prepare().then(async () => {
  const server: Server = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      handle(req, res, parse(req.url || "", true));
    },
  );

  const wss = new WebSocketServer({ noServer: true });

  wss.on("connection", (ws: WebSocket) => {
    clients.add(ws);
    console.log("New client connected to realtime server");

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected");
    });
  });

  server.on("upgrade", (req: IncomingMessage, socket: Socket, head: Buffer) => {
    const { pathname } = parse(req.url || "/", true);

    if (pathname === "/_next/webpack-hmr") {
      nextApp.getUpgradeHandler()(req, socket, head);
    }

    if (pathname === "/api/ws") {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
      });
    }
  });

  server.listen(3000);
  console.log("Server listening on port 3000");
  await pgClient.subscribe("*:stargates", (row, { command, relation }) => {
    console.log(row);
  });
});
