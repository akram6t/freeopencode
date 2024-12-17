CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`content` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text,
	`project_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`author_name` text NOT NULL,
	`author_email` text,
	`author_bio` text,
	`author_website` text,
	`source_url` text NOT NULL,
	`demo_url` text,
	`thumbnail` text,
	`screenshots` text,
	`technologies` text,
	`tags` text,
	`views` integer DEFAULT 0,
	`likes` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `simple` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `simple_email_unique` ON `simple` (`email`);--> statement-breakpoint
CREATE TABLE `technologies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text,
	`icon` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `technologies_name_unique` ON `technologies` (`name`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`role` text DEFAULT 'user',
	`auth_providers` text,
	`profile` text,
	`password` text,
	`verify_token` text,
	`verify_token_expiry` integer,
	`is_verified` integer DEFAULT 0 NOT NULL,
	`forgot_password_token` text,
	`forgot_password_token_expiry` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_user_id_unique` ON `users` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);