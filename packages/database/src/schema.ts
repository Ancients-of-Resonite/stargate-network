import {
  boolean,
  integer,
  pgPolicy,
  pgRole,
  pgTable,
  primaryKey,
  serial,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const admin = pgRole("admin", {
  createDb: true,
  createRole: true,
  inherit: true,
});

export const user = pgRole("user");

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
}).enableRLS();

export const bannedIds = pgTable("banned_ids", {
  id: serial().primaryKey().notNull(),
  user_id: text().notNull(),
  reason: text().notNull(),
});

export const users = pgTable("users", {
  id: uuid().defaultRandom().unique(),
  username: text().notNull(),
  email: text().notNull(),
  tags: text({
    enum: ["admin"],
  }),
});

export const stargateViewPolicy = pgPolicy("stargate_view_policy", {
  as: "permissive",
  to: "public",
  using: sql`public_gate = true`
}).link(stargates)