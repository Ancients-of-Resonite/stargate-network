import { WebSocket } from "ws";
import { DialRequest } from "@/types/messageTypes";

import { sessions } from "../main";
import { log } from "../utils/log";
import { cyan, magenta, red } from "@std/fmt/colors";
import { db, eq } from "database/src/db";
import { gateLog, stargate } from "database/src/schema";

export default async function validateRequest(
  { data, socket, remote }: {
    data: DialRequest;
    socket: WebSocket;
    remote: string;
  },
) {
  const address = data.gate_address.slice(0, 6);
  // const code = data.gate_address.slice(6, 8);
  const session = sessions.getSession(remote);
  
  var sourceTypeCode = "";
  if (session) {
    var sourceTypeCode = session.gate_code;
  }
  const dialedTypeCode = data.gate_address.slice(6, 8);
  const code = dialedTypeCode + sourceTypeCode.slice(dialedTypeCode.length,2);

  if (session) {
    if (data.gate_address.length < 6) {
      socket.send("CSDialCheck:400");
      log.info(`Validation check failed with code ${red("400")}`);
      await db.insert(gateLog)
        .values({
          type: "VALIDATE",
          status: 400,
          remote: remote,
          data: {
            gate: address + code,
            message: "Address too short"
          }
        })
      return;
    }

    if (address == session.gate_address) {
      socket.send("CSValidCheck:403");
      log.info(`Validation check failed with code ${red("403")}`);
      await db.insert(gateLog)
        .values({
          type: "VALIDATE",
          status: 403,
          remote: remote,
          data: {
            gate: address + code,
            message: "Gate validation failed, gate is the same as current session"
          }
        })
      return;
    }

    try {
      const gate = (await db.select().from(stargate).where(eq(stargate.gate_address, address)))[0]

      if (!gate) {
        console.log(`Dialout from ${session.gate_address}${session.gate_code} (${cyan(remote)}) failed, no gate found.`)
          await db.insert(gateLog)
            .values({
              type: "VALIDATE",
              status: 404,
              remote: remote,
              data: {
                gate: address + code,
                message: "Validation check failed, gate was not found"
              }
            })
          socket.send("CSValidCheck:404");
        return
      }

      if (data.gate_address.length > 6) {

        if (gate.status != "IDLE"){
          socket.send("CSValidCheck:403");
          log.info(
            `Address validation from ${cyan(session.gate_address) + magenta(session.gate_code)
            } for ${cyan(gate.gate_address) + magenta(gate.gate_code)
            } failed with code ${red("403")}.`,
          );
          await db.insert(gateLog)
            .values({
              type: "VALIDATE",
              status: 403,
              remote: remote,
              data: {
                gate: address + code,
                message: "Validation check failed, target gate busy"
              }
            })
          return;
        }

        if (gate.active_users >= gate.max_users){
          socket.send("CSValidCheck:403");
          log.info(
            `Address validation from ${cyan(session.gate_address) + magenta(session.gate_code)
            } for ${cyan(gate.gate_address) + magenta(gate.gate_code)
            } failed with code ${red("403")}.`,
          );
          await db.insert(gateLog)
            .values({
              type: "VALIDATE",
              status: 403,
              remote: remote,
              data: {
                gate: address + code,
                message: "Validation check failed, user limit reached"
              }
            })
          return;
        }

        if (gate.gate_code == code) {
          log.info(
            `Address validation from ${cyan(session.gate_address) + magenta(session.gate_code)
            } for ${cyan(gate.gate_address) + magenta(gate.gate_code)
            } was successful.`,
          );
          await db.insert(gateLog)
            .values({
              type: "VALIDATE",
              status: 200,
              remote: remote,
              data: {
                gate: address + code,
                message: "Validation check was successful, gate exists and is available for connection"
              }
            })
          socket.send("CSValidCheck:200");
          return;
        } else {
          socket.send("CSValidCheck:302");
          log.info(
            `Address validation from ${cyan(session.gate_address) + magenta(session.gate_code)
            } for ${cyan(gate.gate_address) + magenta(gate.gate_code)
            } failed with code ${red("302")}.`,
          );
          await db.insert(gateLog)
            .values({
              type: "VALIDATE",
              status: 302,
              remote: remote,
              data: {
                gate: address + code,
                message: "Validation check failed, incorrect gate group"
              }
            })
          return;
        }
      }
      if (gate.gate_code != session.gate_code) {
        socket.send("CSValidCheck:302");
          await db.insert(gateLog)
            .values({
              type: "VALIDATE",
              status: 302,
              remote: remote,
              data: {
                gate: address + code,
                message: "Validation check failed, incorrect gate group"
              }
            })
        return;
      }

      socket.send("CSValidCheck:200");
          await db.insert(gateLog)
            .values({
              type: "VALIDATE",
              status: 200,
              remote: remote,
              data: {
                gate: address + code,
                message: "Validation check was successful, gate exists and is available for connection"
              }
            })
      log.info(
        `Validation check was successful, gate exists and is available for connection`,
      );
    } catch {
      socket.send("CSValidCheck:404");
          await db.insert(gateLog)
            .values({
              type: "VALIDATE",
              status: 404,
              remote: remote,
              data: {
                gate: address + code,
                message: "Validation check failed, gate not found"
              }
            })
      log.info(
        `Validation failed code ${red("404")} gate not found`,
      );
      return;
    }
  }
}
