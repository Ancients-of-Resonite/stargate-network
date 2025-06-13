export interface Stargate {
  id: string;
  gate_address: string;
  gate_code: string;
  owner_name: string;
  session_url: string;
  session_name: string;
  active_users: number;
  max_users: number;
  public_gate: boolean;
  is_headless: boolean;
  iris_state: boolean;
  gate_status: "IDLE" | "INCOMING7" | "INCOMING8" | "INCOMING9" | "OPEN";
  created: Date;
  updated: Date;
}
