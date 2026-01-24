ALTER TABLE "gate_log" ALTER COLUMN "created" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "gate_log" ALTER COLUMN "created" SET DEFAULT now();