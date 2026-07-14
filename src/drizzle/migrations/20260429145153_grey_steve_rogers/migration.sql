CREATE TABLE "set_to_tasks" (
	"setid" uuid,
	"taskid" uuid,
	CONSTRAINT "set_to_tasks_pkey" PRIMARY KEY("setid","taskid")
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"classid" uuid NOT NULL,
	"name" varchar(120) NOT NULL,
	"deadline" timestamp with time zone NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "progresses" ADD COLUMN "taskid" uuid;--> statement-breakpoint
ALTER TABLE "progresses" DROP COLUMN "last_reviewed_at";--> statement-breakpoint
ALTER TABLE "terms" DROP COLUMN "last_reviewed_at";--> statement-breakpoint
ALTER TABLE "set_to_tasks" ADD CONSTRAINT "set_to_tasks_setid_sets_id_fkey" FOREIGN KEY ("setid") REFERENCES "sets"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "set_to_tasks" ADD CONSTRAINT "set_to_tasks_taskid_tasks_id_fkey" FOREIGN KEY ("taskid") REFERENCES "tasks"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_classid_classes_id_fkey" FOREIGN KEY ("classid") REFERENCES "classes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "progresses" ADD CONSTRAINT "progresses_taskid_tasks_id_fkey" FOREIGN KEY ("taskid") REFERENCES "tasks"("id") ON DELETE CASCADE;