CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"image" varchar(255),
	"role" text DEFAULT 'customer' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
