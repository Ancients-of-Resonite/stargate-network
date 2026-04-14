import { parse } from "url";
import { createServer, Server, IncomingMessage, ServerResponse } from "http";
import next from "next";
import { WebSocket, WebSocketServer } from "ws";
import { Socket } from "net";
import { pgClient } from "database/src/db";
import { auth } from "./lib/auth";
import { URLSearchParams } from "url";

const nextApp = next({ dev: Bun.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

type Client = {
  isAdmin: boolean;
  socket: WebSocket;
};
const clients: Set<Client> = new Set();

nextApp.prepare().then(async () => {
  const server: Server = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      handle(req, res, parse(req.url || "", true));
    },
  );

  const wss = new WebSocketServer({ noServer: true });

  wss.on("connection", async (ws: WebSocket, req: IncomingMessage) => {
    const search = new URLSearchParams(req.url);
    const key =
      (req.headers["x-api-key"] as string | null) ??
      search.get("/api/ws?apikey");
    const session = await auth.api.getSession({
      headers: new Headers({
        "x-api-key": key ?? "",
      }),
    });
    const isAdmin = session?.user.tags.includes("admin") ?? false;
    const cl: Client = {
      isAdmin,
      socket: ws,
    };
    clients.add(cl);

    ws.on("close", () => {
      clients.delete(cl);
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
    clients.forEach(async ({ socket, isAdmin }) => {
      if (isAdmin) {
        socket.send(
          JSON.stringify({
            type: command,
            table: relation.table,
            row,
          }),
        );
      } else if (command === "delete" || row!.public_gate) {
        socket.send(
          JSON.stringify({
            type: command,
            table: relation.table,
            row,
          }),
        );
      }
    });
  });
});
