import { log } from "./utils/log.ts";

Deno.serve((req, info) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.addEventListener("open", (_e) => {
    log.info(
      `A new client has connected: ${info.remoteAddr.hostname}:${info.remoteAddr.port}`,
    );
  });

  socket.addEventListener("message", (message) => {
    log.info(message);
  });

  return response;
});
