import * as schemas from "$packages/database/src/schema";

export type Stargate = typeof schemas.stargates.$inferSelect;
export type User = typeof schemas.users.$inferSelect;
