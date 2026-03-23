CREATE TABLE "class_to_users" (
	"teacherid" text,
	"classid" uuid,
	CONSTRAINT "class_to_users_pkey" PRIMARY KEY("classid","teacherid")
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"name" varchar(120) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "roles" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "roles" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "class_to_users" ADD CONSTRAINT "class_to_users_teacherid_users_id_fkey" FOREIGN KEY ("teacherid") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "class_to_users" ADD CONSTRAINT "class_to_users_classid_classes_id_fkey" FOREIGN KEY ("classid") REFERENCES "classes"("id") ON DELETE CASCADE;