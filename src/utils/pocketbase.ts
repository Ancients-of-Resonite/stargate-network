import PocketBase, { RecordService } from "pocketbase";
import { Stargate } from "../types/stargate.ts";
import { User } from "../types/user.ts";

interface TPB extends PocketBase {
  collection(idOrName: string): RecordService;
  collection(idOrName: "stargates"): RecordService<Stargate>;
  collection(idOrName: "users"): RecordService<User>;
}

export const pb = new PocketBase(Deno.env.get("PB_ENDPOINT")!) as TPB;
pb.autoCancellation(false);
