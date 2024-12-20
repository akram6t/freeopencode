DROP TABLE `simple`;--> statement-breakpoint
DROP TABLE `technologies`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text,
	`project_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_likes`("id", "user_id", "project_id") SELECT "id", "user_id", "project_id" FROM `likes`;--> statement-breakpoint
DROP TABLE `likes`;--> statement-breakpoint
ALTER TABLE `__new_likes` RENAME TO `likes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX `users_username_unique`;--> statement-breakpoint
DROP INDEX "users_user_id_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "verify_token_expiry" TO "verify_token_expiry" text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_user_id_unique` ON `users` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "is_verified" TO "is_verified" integer;--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "forgot_password_token_expiry" TO "forgot_password_token_expiry" text;--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text;--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" text;--> statement-breakpoint
ALTER TABLE `users` ADD `full_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `google_id` text;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `username`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `auth_providers`;--> statement-breakpoint
ALTER TABLE `projects` ALTER COLUMN "created_at" TO "created_at" text;--> statement-breakpoint
ALTER TABLE `projects` ALTER COLUMN "updated_at" TO "updated_at" text;--> statement-breakpoint
ALTER TABLE `projects` DROP COLUMN `likes`;