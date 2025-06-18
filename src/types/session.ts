import { Stargate } from "./stargate.ts";

export interface Session {
  id: string;
  gate_address: string;
  gate_code: string;
  gate_status: string;
  // Format: "<ip>:<port>"
  remote: string;
  connected_gate: {
    connected: boolean;
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

  public updateSession(remote: string, gate?: Stargate) {
    let index = this.sessions.findIndex((v) => v.remote == remote);

    this.sessions[index].connected_gate = {
      connected: gate != undefined,
    };
  }
}
