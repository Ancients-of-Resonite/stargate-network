CREATE TABLE "users" (
	"id" uuid DEFAULT gen_random_uuid(),
	"username" text NOT NULL,
	"email" text NOT NULL,
	"tags" text,
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
