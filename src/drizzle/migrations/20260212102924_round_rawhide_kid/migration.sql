CREATE TABLE "changelogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"description" text NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "folders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"name" varchar(100) NOT NULL,
	"userid" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favorite_sets" (
	"userid" text,
	"setid" uuid,
	CONSTRAINT "favorite_sets_pkey" PRIMARY KEY("userid","setid")
);
--> statement-breakpoint
CREATE TABLE "set_to_folders" (
	"folderid" uuid,
	"setid" uuid,
	CONSTRAINT "set_to_folders_pkey" PRIMARY KEY("folderid","setid")
);
--> statement-breakpoint
CREATE TABLE "sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"name" varchar(120) NOT NULL,
	"preferredTermLang" varchar NOT NULL,
	"preferredDefinitionLang" varchar NOT NULL,
	"public" boolean DEFAULT true,
	"userid" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "terms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"setid" uuid NOT NULL,
	"term" json NOT NULL,
	"definition" json NOT NULL,
	"example_sentence" text,
	"status" integer DEFAULT 0 NOT NULL,
	"last_reviewed_at" timestamp,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text,
	"providerAccountId" text,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_pkey" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"username" varchar(100) NOT NULL,
	"password" varchar(100) DEFAULT '' NOT NULL,
	"email" varchar(100) NOT NULL UNIQUE,
	"name" varchar(100) DEFAULT '',
	"emailVerified" timestamp,
	"roles" varchar(100)[] DEFAULT ARRAY[]::varchar(100)[] NOT NULL,
	"image" varchar(255) DEFAULT '' NOT NULL,
	"theme" varchar DEFAULT 'light' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "folders" ADD CONSTRAINT "folders_userid_users_id_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "favorite_sets" ADD CONSTRAINT "favorite_sets_userid_users_id_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "favorite_sets" ADD CONSTRAINT "favorite_sets_setid_sets_id_fkey" FOREIGN KEY ("setid") REFERENCES "sets"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "set_to_folders" ADD CONSTRAINT "set_to_folders_folderid_folders_id_fkey" FOREIGN KEY ("folderid") REFERENCES "folders"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "set_to_folders" ADD CONSTRAINT "set_to_folders_setid_sets_id_fkey" FOREIGN KEY ("setid") REFERENCES "sets"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "sets" ADD CONSTRAINT "sets_userid_users_id_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "terms" ADD CONSTRAINT "terms_setid_sets_id_fkey" FOREIGN KEY ("setid") REFERENCES "sets"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;