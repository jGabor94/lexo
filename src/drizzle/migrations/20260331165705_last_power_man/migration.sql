CREATE TABLE "class_to_students" (
	"studentid" text,
	"classid" uuid,
	CONSTRAINT "class_to_students_pkey" PRIMARY KEY("classid","studentid")
);
--> statement-breakpoint
ALTER TABLE "class_to_students" ADD CONSTRAINT "class_to_students_studentid_users_id_fkey" FOREIGN KEY ("studentid") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "class_to_students" ADD CONSTRAINT "class_to_students_classid_classes_id_fkey" FOREIGN KEY ("classid") REFERENCES "classes"("id") ON DELETE CASCADE;