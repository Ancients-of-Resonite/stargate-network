import { stargates as stargateSchema } from "../utils/drizzle/schema.ts";

export interface Session {
  id: string;
  gate_address: string;
  gate_code: string;
  gate_status: string;
  // Format: "<ip>:<port>"
  remote: string;
  incoming_call: () => void;
  connected_gate: {
    session?: Session;
  };
}

export interface updateSession {
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

  public dialSession(origin: Session, address: "string", length: number) {
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

    this.sessions[destinationIndex].incoming_call();
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
