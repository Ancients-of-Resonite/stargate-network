import * as schemas from "database/src/schema";

export type Stargate = typeof schemas.stargates.$inferSelect;
export type User = typeof schemas.users.$inferSelect;
