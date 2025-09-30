ALTER TABLE "stargates" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "admin-delete" ON "stargates" AS PERMISSIVE FOR DELETE TO "admin";--> statement-breakpoint
CREATE POLICY "admin-insert" ON "stargates" AS PERMISSIVE FOR INSERT TO "admin";--> statement-breakpoint
CREATE POLICY "public" ON "stargates" AS RESTRICTIVE FOR SELECT TO public;