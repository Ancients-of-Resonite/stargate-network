import { boolean, integer, pgTable, primaryKey, serial, text, uuid } from "drizzle-orm/pg-core";

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
  gate_status: text(),
});

export const bannedIds = pgTable("banned_ids", {
  id: serial().primaryKey().notNull(),
  user_id: text().notNull(),
  reason: text().notNull()
})

export const users = pgTable("users", {
  id: uuid().defaultRandom().unique(),
  username: text().notNull(),
  email: text().notNull(),
  tags: text({
    enum: [
      "admin",
    ]
  })
})
