import { stargates as stargateSchema } from "../utils/drizzle/schema.ts";

export interface Session {
  id: string;
  gate_address: string;
  gate_code: string;
  gate_status: string;
  // Format: "<ip>:<port>"
  remote: string;
  connected_gate: {
    state: "OUTGOING" | "INCOMING" | "IDLE";
    gate_id?: string;
    gate_address?: string;
    gate_code?: string;
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

  public updateSession({
    remote,
    gate,
    connectionState
  }: {
      remote: string,
      gate?: typeof stargateSchema.$inferSelect,
      connectionState?: "OUTGOING" | "INCOMING" | "IDLE"
    }) {
    const index = this.sessions.findIndex((v) => v.remote == remote);
    const session = this.sessions[index];
    
    this.sessions[index].connected_gate = {
      state: connectionState ?? this.sessions[index].connected_gate.state,
      gate_id: gate?.id ?? session.connected_gate.gate_id,
      gate_address: gate?.gate_address ?? session.connected_gate.gate_address,
      gate_code: gate?.gate_code ?? session.connected_gate.gate_code,
    };
  }
}
