DROP TABLE "progresses" CASCADE;--> statement-breakpoint
ALTER TABLE "terms" ADD COLUMN "status" integer DEFAULT 0 NOT NULL;