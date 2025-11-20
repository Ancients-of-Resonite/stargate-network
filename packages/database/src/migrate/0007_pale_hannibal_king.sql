ALTER TABLE "stargates" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "admin" ON "stargates" AS PERMISSIVE FOR DELETE TO "admin";--> statement-breakpoint
CREATE POLICY "public_read" ON "stargates" AS PERMISSIVE FOR SELECT TO public USING ("stargates"."public_gate" IS TRUE);