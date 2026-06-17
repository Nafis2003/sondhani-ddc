CREATE TABLE "patients" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"ref_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"mobile" varchar(50) NOT NULL,
	"date" varchar(50) NOT NULL,
	"time" varchar(50) NOT NULL,
	"hbs_ag" varchar(50) NOT NULL,
	"hcv" varchar(50) NOT NULL,
	"malaria" varchar(50) NOT NULL,
	"hiv" varchar(50) NOT NULL,
	"vdrl" varchar(50) NOT NULL,
	"blood_glucose" varchar(50) NOT NULL,
	"created_at" bigint NOT NULL,
	"updated_at" bigint DEFAULT 0 NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"synced" boolean DEFAULT true NOT NULL
);
