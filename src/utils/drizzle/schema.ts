import { boolean, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const stargates = pgTable("stargates", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  gate_address: text().notNull(),
  gate_code: text().notNull(),
  owner_name: text().notNull(),
  session_url: text().notNull(),
  session_name: text().notNull(),
  active_users: integer().notNull(),
  max_users: integer().notNull(),
  public_gate: boolean().notNull(),
  is_headless: boolean().notNull(),
  iris_state: boolean().notNull(),
  gate_status: text({
    enum: [
      "IDLE",
      "INCOMING7",
      "INCOMING8",
      "INCOMING9",
      "OPEN",
    ],
  }),
});
