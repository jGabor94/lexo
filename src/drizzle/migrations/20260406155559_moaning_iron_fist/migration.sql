CREATE TYPE "type" AS ENUM('student', 'teacher');--> statement-breakpoint
ALTER TABLE "invites" ADD COLUMN "type" "type" NOT NULL;