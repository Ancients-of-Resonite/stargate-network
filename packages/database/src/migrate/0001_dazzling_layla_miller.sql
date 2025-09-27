CREATE TABLE "banned_ids" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"reason" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stargates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gate_address" text NOT NULL,
	"gate_code" text NOT NULL,
	"owner_name" text NOT NULL,
	"session_url" text NOT NULL,
	"session_name" text NOT NULL,
	"active_users" integer NOT NULL,
	"max_users" integer NOT NULL,
	"public_gate" boolean NOT NULL,
	"is_headless" boolean NOT NULL,
	"iris_state" boolean NOT NULL,
	"gate_status" text,
	CONSTRAINT "stargates_id_unique" UNIQUE("id")
);
