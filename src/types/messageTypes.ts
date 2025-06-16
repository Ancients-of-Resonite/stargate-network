export interface DialRequest {
  gate_address: string;
}
export interface ValidateAddress {
  gate_address: string;
}

export interface RequestAddress {
  gate_address: string;
  gate_code: string;
  host_id: string;
  is_headless: boolean;
  session_id: string;
  current_users: number;
  max_users: number;
  public: boolean;
  gate_name: string;
}

export interface UpdateData {
  currentUsers: number;
  maxUsers: number;
  gate_status: string;
  irisState: boolean;
}

export interface UpdateIris {
  type: string;
  iris_state: string;
}

export enum MessageType {
  RequestAddress = "requestAddress",
  ValidateAddress = "validateAddress",
  DialRequest = "dialRequest",
  UpdateData = "updateData",
  CloseWormhole = "closeWormhole",
  UpdateIris = "updateIris",
  KeepAlive = "keepAlive",
}
