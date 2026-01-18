CREATE TYPE "public"."gate_log_type" AS ENUM('DIALOUT', 'CLOSE', 'DELETE', 'CREATE');--> statement-breakpoint
CREATE ROLE "admin" WITH CREATEDB CREATEROLE;--> statement-breakpoint
CREATE ROLE "user";--> statement-breakpoint
CREATE TABLE "banned_ids" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"reason" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gate_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "gate_log_type",
	"data" json NOT NULL,
	CONSTRAINT "gate_log_id_unique" UNIQUE("id")
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
--> statement-breakpoint
ALTER TABLE "stargates" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"tags" text[],
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "admin" ON "stargates" AS PERMISSIVE FOR DELETE TO "admin";--> statement-breakpoint
CREATE POLICY "public_read" ON "stargates" AS PERMISSIVE FOR SELECT TO public USING ("stargates"."public_gate" = false);