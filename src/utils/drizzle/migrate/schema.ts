import { pgTable, uuid, text, integer, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const stargates = pgTable("stargates", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	gateAddress: text("gate_address").notNull(),
	gateCode: text("gate_code").notNull(),
	ownerName: text("owner_name").notNull(),
	sessionUrl: text("session_url").notNull(),
	sessionName: text("session_name").notNull(),
	activeUsers: integer("active_users").notNull(),
	maxUsers: integer("max_users").notNull(),
	publicGate: boolean("public_gate").notNull(),
	isHeadless: boolean("is_headless").notNull(),
	irisState: boolean("iris_state").notNull(),
	gateStatus: text("gate_status"),
});
