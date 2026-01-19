import { WebSocket } from "ws";
import { DialRequest } from "@/types/messageTypes";

import { sessions } from "../main";
import { log } from "../utils/log";
import { cyan, magenta, red } from "@std/fmt/colors";
import { db, eq } from "database/src/db";
import { stargate } from "database/src/schema";

export default async function validateRequest(
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
      log.info(`Validation check failed with code ${red("400")}`);
      return;
    }

    if (address == session.gate_address) {
      socket.send("CSValidCheck:403");
      log.info(`Validation check failed with code ${red("403")}`);
      return;
    }

    try {
      const gate = (await db.select().from(stargate).where(eq(stargate.id, address)))[0]

      if (!gate) {
        console.log(`Dialout from ${session.gate_address}${session.gate_code} (${cyan(remote)}) failed, no gate found.`)
        return
      }

      if (data.gate_address.length > 6) {
        if (gate.gate_code.startsWith(code)) {
          log.info(
            `Address validation from ${
              cyan(session.gate_address) + magenta(session.gate_code)
            } for ${
              cyan(gate.gate_address) + magenta(gate.gate_code)
            } was successful.`,
          );
          return;
        } else {
          socket.send("CSValidCheck:302");
          log.info(
            `Address validation from ${
              cyan(session.gate_address) + magenta(session.gate_code)
            } for ${
              cyan(gate.gate_address) + magenta(gate.gate_code)
            } failed with code ${red("302")}.`,
          );
          return;
        }
      }
      if (gate.gate_code != session.gate_code) {
        socket.send("CSValidCheck:302");
        return;
      }

      socket.send("CSValidCheck:200");
      log.info(
        `Validation check was successful, gate exists and is available for connection`,
      );
    } catch {
      socket.send("CSValidCheck:404");
      log.info(
        `Validation failed code ${red("404")} gate not found`,
      );
      return;
    }
  }
}
