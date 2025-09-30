DROP POLICY "public" ON "stargates" CASCADE;--> statement-breakpoint
CREATE POLICY "public" ON "stargates" AS PERMISSIVE FOR SELECT TO public;