import {
  boolean,
  integer,
  json,
  pgEnum,
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
}, (t) => [
  pgPolicy('admin', {
    as: "permissive",
    to: admin,
    for: "delete",
  }),
  pgPolicy("public_read", {
    as: "permissive",
    to: "public",
    for: "select",
    using: sql`${t.public_gate} = false`
  })
]);

export const gateLogType = pgEnum('gate_log_type', ['DIALOUT', 'CLOSE', 'DELETE', 'CREATE'])

export const gateLog = pgTable("gate_log", {
  id: uuid().primaryKey().unique().defaultRandom(),
  type: gateLogType(),
  data: json().notNull()
})

export const bannedIds = pgTable("banned_ids", {
  id: serial().primaryKey().notNull(),
  user_id: text().notNull(),
  reason: text().notNull(),
});
