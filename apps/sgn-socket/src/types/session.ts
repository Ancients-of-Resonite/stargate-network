import { log } from "@/utils/log";
import { db, eq } from "database/src/db";
import { stargate } from "database/src/schema";

export type Session = {
  id: string;
  gate_address: string;
  gate_code: string;
  gate_status: string;
  // Format: "<ip>:<port>"
  remote: string;
  send_impulse: (tag: string) => void;
  gate_relay: (relay: string) => void;
  connected_gate: {
    session?: Session;
  };
  lastKeepAlive: Date;
}

export type updateSession = {
  id?: string;
  gate_address?: string;
  gate_code?: string;
  gate_status?: string;
  connected_gate: {
    session?: Session;
  };
}
export class Sessions {
  private sessions: Session[];

  constructor() {
    this.sessions = [];
  }

  public getSession(remote: string): Session | undefined {
    return this.sessions.find((v) => v.remote == remote);
  }

  public pushSession(session: Session) {
    this.sessions.push(session);
  }

  public getSessions() {
    return this.sessions;
  }

  public removeSession(remote: string) {
    const oldses = this.sessions.filter((v) => v.remote != remote);

    this.sessions = oldses;
  }

  public async sessionKeepAlive(remote: string) {
    const session = this.sessions.findIndex(v => v.remote == remote)
    this.sessions[session].lastKeepAlive = new Date()
    await db.update(stargate)
      .set({ last_keep_alive: new Date() })
      .where(eq(stargate.gate_address, this.sessions[session].gate_address))
  }

  public dialSession(origin: Session, dialed_address: string) {
    const address = dialed_address.slice(0, 6);
    const destinationIndex = this.sessions.findIndex((v) =>
      v.gate_address == address
    );

    this.updateSession({
      remote: origin.remote,
      data: {
        connected_gate: {
          session: this.sessions[destinationIndex],
        },
      },
    });

    this.sessions[destinationIndex].send_impulse(`OpenIncoming:${dialed_address.length + 1}`);
  }

  public closeGate(origin: Session) {
    const session_index = this.sessions.findIndex((v) => v.id == origin.id);

    this.sessions[session_index].connected_gate.session?.send_impulse("CloseWormhole");

    this.sessions[session_index].connected_gate.session = undefined;
  }

  public updateSession({
    remote,
    data,
  }: {
    remote: string;
    data?: updateSession;
  }) {
    const index = this.sessions.findIndex((v) => v.remote == remote);
    const session = this.sessions[index];

    this.sessions[index].connected_gate = {
      session: data?.connected_gate.session ?? session.connected_gate.session,
    };
    this.sessions[index].id = data?.id ?? session.id;
    this.sessions[index].gate_address = data?.gate_address ??
      session.gate_address;
    this.sessions[index].gate_code = data?.gate_code ?? session.gate_code;
    this.sessions[index].gate_status = data?.gate_status ?? session.gate_status;
  }
}
