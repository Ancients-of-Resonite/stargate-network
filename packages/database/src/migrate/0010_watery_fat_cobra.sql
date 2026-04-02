ALTER TABLE "banned_ids" ADD COLUMN "created" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "stargates" ADD COLUMN "created" timestamp DEFAULT now();