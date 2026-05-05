import { WebSocket } from "ws";
import { cyan } from "@std/fmt/colors";
import { RequestAddress } from "@/types/messageTypes";
import { log } from "@/utils/log";
import { sessions } from "@/main";
import { db, eq } from "database/src/db";
import { bannedIds, gateLog, stargate } from "database/src/schema";

export default async function requestAddress({
  data,
  socket,
  remote,
}: {
  data: RequestAddress;
  socket: WebSocket;
  remote: string;
}) {
  const banned = await db
    .select()
    .from(bannedIds)
    .where(eq(bannedIds.user_id, data.user_id ?? ""));

  if (banned.length !== 0) {
    log.warn(
      `A banned user [${data.host_id}] tried to access the stargate network. Denying access.`,
    );
    await db.insert(gateLog).values({
      type: "CREATE",
      remote: remote,
      status: 401,
      data: {
        gate: data.gate_address + data.gate_code + "(Fail)",
        message: "Banned user, denied access.",
      },
    });
    socket.send("401");
    socket.close();
    return;
  }

  const eg = (
    await db
      .select()
      .from(stargate)
      .where(eq(stargate.gate_address, data.gate_address))
  )[0];

  if (!eg) {
    log.info(
      `Accepted request for address ${data.gate_address}${data.gate_code} (${cyan(remote)})`,
    );

    try {
      await db.insert(stargate).values({
        gate_address: data.gate_address,
        gate_code: data.gate_code,
        max_users: data.max_users,
        gate_status: "IDLE",
        iris_state: false,
        owner_name: data.host_id,
        session_name: data.gate_name,
        session_url: data.session_id,
        active_users: data.current_users,
        is_headless: data.is_headless,
        public_gate: data.public,
        gate_color: data.gate_color,
        user_id: data.user_id,
        last_keep_alive: new Date(),
      });
    } catch (err) {
      console.log(err);
    }

    const gate = (
      await db
        .select()
        .from(stargate)
        .where(eq(stargate.gate_address, data.gate_address))
    )[0];

    if (!gate) {
      log.error(
        `Failed to create stargate with address ${data.gate_address}${data.gate_code}`,
      );
      await db.insert(gateLog).values({
        type: "CREATE",
        remote: remote,
        status: 500,
        data: {
          gate: data.gate_address + data.gate_code + "(Fail)",
          message: "Failed to create gate",
        },
      });
      return;
    }

    sessions.pushSession({
      id: gate.id,
      gate_address: data.gate_address,
      gate_code: data.gate_code,
      remote: remote,
      gate_status: "IDLE",
      connected_gate: {},
      send_impulse: (tag) => {
        socket.send(`Impulse:${tag}`);
      },
      gate_relay: (relay) => {
        socket.send(relay);
      },
      lastKeepAlive: new Date(),
    });

    await db.insert(gateLog).values({
      type: "CREATE",
      status: 200,
      remote: remote,
      data: {
        gate: gate.gate_address + gate.gate_code,
        message: "Gate created successfully",
      },
    });
    socket.send("200");
    socket.send('{code:200,message:"Address accepted"}'); // WARN: Deprecated response. Make sure your gate handles a plain 200 response instead
  } else if (eg.session_url == data.session_id) {
    log.info(
      `Gate address exists, but session id is the same on requesting gate. Accepting request for ${data.gate_address}${data.gate_code} (${cyan(remote)})`,
    );
    await db
      .update(stargate)
      .set({
        gate_address: data.gate_address,
        gate_code: data.gate_code,
        max_users: data.max_users,
        gate_status: "IDLE",
        iris_state: false,
        owner_name: data.host_id,
        user_id: data.user_id,
        session_name: data.gate_name,
        session_url: data.session_id,
        active_users: data.current_users,
        is_headless: data.is_headless,
        public_gate: data.public,
        gate_color: data.gate_color,
        last_keep_alive: new Date(),
      })
      .where(eq(stargate.id, eg.id));
    sessions.pushSession({
      id: eg.id,
      gate_address: data.gate_address,
      gate_code: data.gate_code,
      remote: remote,
      gate_status: "IDLE",
      connected_gate: {},
      send_impulse: (tag) => {
        socket.send(`Impulse:${tag}`);
      },
      gate_relay: (relay) => {
        socket.send(relay);
      },
      lastKeepAlive: new Date(),
    });
    await db.insert(gateLog).values({
      type: "CREATE",
      status: 200,
      remote: remote,
      data: {
        gate: data.gate_address + data.gate_code,
        message: "Gate already exists with this session url, accepted request",
      },
    });
    socket.send("200");
    socket.send('{code:200,message:"Address accepted"}'); // WARN: Deprecated response. Make sure your gate handles a plain 200 response instead
    return;
  } else {
    await db.insert(gateLog).values({
      type: "CREATE",
      status: 403,
      remote: remote,
      data: {
        gate: data.gate_address + data.gate_code,
        message: "Denied request, address already taken",
      },
    });
    log.info(
      `Denied request for address ${data.gate_address}${data.gate_code} for client ${cyan(
        remote,
      )}. Address already taken`,
    );
    socket.send("403");
  }
}
