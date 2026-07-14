CREATE TABLE "invites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"inviteid" varchar(21) NOT NULL,
	"classid" uuid NOT NULL,
	"teacherid" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "invites_table";--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_classid_classes_id_fkey" FOREIGN KEY ("classid") REFERENCES "classes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_teacherid_users_id_fkey" FOREIGN KEY ("teacherid") REFERENCES "users"("id") ON DELETE CASCADE;