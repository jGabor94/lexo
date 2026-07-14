CREATE TABLE "invites_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"inviteid" varchar(21) NOT NULL,
	"classid" uuid NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invites_table" ADD CONSTRAINT "invites_table_classid_classes_id_fkey" FOREIGN KEY ("classid") REFERENCES "classes"("id") ON DELETE CASCADE;