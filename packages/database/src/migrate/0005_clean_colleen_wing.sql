ALTER TABLE "gate_log" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gate_log" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gate_log" ALTER COLUMN "remote" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gate_log" ADD COLUMN "created" date DEFAULT now() NOT NULL;