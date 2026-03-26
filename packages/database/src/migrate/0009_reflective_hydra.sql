ALTER TABLE "stargates" ALTER COLUMN "last_keep_alive" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "stargates" ALTER COLUMN "last_keep_alive" SET DEFAULT now();