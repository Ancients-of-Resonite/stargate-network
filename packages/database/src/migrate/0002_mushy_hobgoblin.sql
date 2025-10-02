ALTER TABLE "stargates" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "stargate_view_policy" ON "stargates" AS PERMISSIVE FOR ALL TO public WITH CHECK (public_gate = true);