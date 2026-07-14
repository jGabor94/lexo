CREATE TABLE "progresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"userid" text NOT NULL,
	"termid" uuid NOT NULL,
	"status" integer DEFAULT 0 NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"last_reviewed_at" timestamp,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "terms" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "progresses" ADD CONSTRAINT "progresses_userid_users_id_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "progresses" ADD CONSTRAINT "progresses_termid_terms_id_fkey" FOREIGN KEY ("termid") REFERENCES "terms"("id") ON DELETE CASCADE;