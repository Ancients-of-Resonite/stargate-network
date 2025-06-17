export interface Session {
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
}
