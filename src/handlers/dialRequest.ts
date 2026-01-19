import { WebSocket } from "ws";
import { DialRequest } from "@/types/messageTypes";

import { sessions } from "../main";
import { log } from "../utils/log";
import { cyan, magenta, red } from "@std/fmt/colors";
import { db, eq } from "database/src/db";
import { gateLog, stargate } from "database/src/schema";

export default async function dialRequest(
  { data, socket, remote }: {
    data: DialRequest;
    socket: WebSocket;
    remote: string;
  },
) {
  const address = data.gate_address.slice(0, 6);
  const code = data.gate_address.slice(6, 8);
  const session = sessions.getSession(remote);

  if (session?.connected_gate.session) return;

  if (session) {
    if (data.gate_address.length < 6) {
      socket.send("CSDialCheck:400");
      return;
    }

    if (address == session.gate_address) {
      socket.send("CSDialCheck:403");
      return;
    }

    try {
      const gate = (await db.select().from(stargate).where(eq(stargate.gate_address, address)))[0]

      if (!gate) {
        log.info(`Dialout failed, gate not found`);
        socket.send("CSDialCheck:404");
        await db.insert(gateLog).values({
          type: "DIALOUT",
          data: {
            origin_gate: session.gate_address + session.gate_code,
            end_gate: address + code,
            status: 404,
            message: "Gate not found"
          }
        })
        return;
      }

      if (data.gate_address.length > 6) {
        if (gate.gate_code.startsWith(code)) {
          socket.send("CSDialCheck:200");
          socket.send(`CSDialedSessionURL:${gate.session_url}`);
          sessions.updateSession({
            remote: remote,
          });
          sessions.dialSession(session, data.gate_address)
          log.info(
            `Dialout from ${cyan(session.gate_address) + magenta(session.gate_code)
            } to ${cyan(gate.gate_address) + magenta(gate.gate_code)
            } was successful.`,
          );
          await db.insert(gateLog).values({
            type: "DIALOUT",
            data: {
              origin_gate: session.gate_address + session.gate_code,
              end_gate: address + code,
              status: 200,
              message: "Dialout successful"
            }
          })
          return;
        } else {
          socket.send("CSDialCheck:302");
          log.info(
            `Dialout from ${cyan(session.gate_address) + magenta(session.gate_code)
            } to ${cyan(gate.gate_address) + magenta(gate.gate_code)
            } failed with code ${red("302")}.`,
          );
          await db.insert(gateLog).values({
            type: "DIALOUT",
            data: {
              origin_gate: session.gate_address + session.gate_code,
              end_gate: address + code,
              status: 302,
              message: "Incorrect gate code"
            }
          })
          return;
        }
      }
      if (gate.gate_code != session.gate_code) {
        socket.send("CSDialCheck:302");
        await db.insert(gateLog).values({
          type: "DIALOUT",
          data: {
            origin_gate: session.gate_address + session.gate_code,
            end_gate: address + code,
            status: 302,
            message: "Incorrect gate code"
          }
        })
        return;
      }

      await db.insert(gateLog).values({
        type: "DIALOUT",
        data: {
          origin_gate: session.gate_address + session.gate_code,
          end_gate: address + code,
          status: 200,
          message: "Dialout successful"
        }
      })
      socket.send("CSDialCheck:200");
      socket.send(`CSDialedSessionURL:${gate.session_url}`);
      sessions.dialSession(session, data.gate_address)
    } catch (err) {
      socket.send("CSDialCheck:404");
      log.error(
        "Something failed... Check error message \n --- Error Message ---",
      );
      await db.insert(gateLog).values({
        type: "DIALOUT",
        data: {
          origin_gate: session.gate_address + session.gate_code,
          end_gate: address + code,
          status: 500,
          message: err
        }
      })
      console.error(err);
      return;
    }
  }
}
