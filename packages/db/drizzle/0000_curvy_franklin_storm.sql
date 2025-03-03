CREATE TABLE `discord_verification` (
	`code` text(255) PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`clerk_id` text(255),
	`discord_user_id` text(255) NOT NULL,
	`discord_user_tag` text(255) NOT NULL,
	`discord_profile_photo` text(255) NOT NULL,
	`discord_name` text(255) NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`guild` text(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `error_log` (
	`id` text(50) PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`user_id` text(255),
	`route` text(255),
	`message` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer NOT NULL,
	`description` text NOT NULL,
	`type` text(50) NOT NULL,
	`host` text(255),
	`hidden` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`presigned_url` text NOT NULL,
	`key` text(500) NOT NULL,
	`validated` integer DEFAULT false NOT NULL,
	`type` text NOT NULL,
	`owner_id` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `invites` (
	`invitee_id` text(255) NOT NULL,
	`team_id` text(50) NOT NULL,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	PRIMARY KEY(`invitee_id`, `team_id`)
);
--> statement-breakpoint
CREATE TABLE `profile_data` (
	`hacker_tag` text(50) PRIMARY KEY NOT NULL,
	`discord_username` text(60) NOT NULL,
	`pronouns` text(20) NOT NULL,
	`bio` text NOT NULL,
	`skills` text NOT NULL,
	`profile_photo` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `registration_data` (
	`clerk_id` text(255) PRIMARY KEY NOT NULL,
	`age` integer NOT NULL,
	`gender` text(50) NOT NULL,
	`race` text(75) NOT NULL,
	`ethnicity` text(50) NOT NULL,
	`accepted_mlh_code_of_conduct` integer NOT NULL,
	`shared_data_with_mlh` integer NOT NULL,
	`wants_to_receive_mlh_emails` integer NOT NULL,
	`university` text(200) NOT NULL,
	`major` text(200) NOT NULL,
	`short_id` text(50) NOT NULL,
	`level_of_study` text(50) NOT NULL,
	`hackathons_attended` integer NOT NULL,
	`software_experience` text(25) NOT NULL,
	`heard_from` text(50),
	`shirt_size` text(5) NOT NULL,
	`diet_restrictions` text NOT NULL,
	`accommodation_note` text,
	`github` text(100),
	`linkedin` text(100),
	`personal_website` text(100),
	`resume` text(255) DEFAULT 'https://static.acmutsa.org/No%20Resume%20Provided.pdf' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `scans` (
	`updated_at` integer DEFAULT (current_timestamp) NOT NULL,
	`user_id` text(255) NOT NULL,
	`event_id` integer NOT NULL,
	`count` integer NOT NULL,
	PRIMARY KEY(`event_id`, `user_id`)
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` text(50) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`tag` text(50) NOT NULL,
	`bio` text,
	`photo` text(400) NOT NULL,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`owner_id` text(255) NOT NULL,
	`devpost_url` text(255)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`clerk_id` text(255) PRIMARY KEY NOT NULL,
	`first_name` text(50) NOT NULL,
	`last_name` text(50) NOT NULL,
	`email` text(255) NOT NULL,
	`hacker_tag` text(50) NOT NULL,
	`registration_complete` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`has_searchable_profile` integer DEFAULT true NOT NULL,
	`group` integer NOT NULL,
	`role` text DEFAULT 'hacker' NOT NULL,
	`checkin_timestamp` integer,
	`team_id` text(50),
	`points` integer DEFAULT 0 NOT NULL,
	`checked_in` integer DEFAULT false NOT NULL,
	`rsvp` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `files_id_unique` ON `files` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `files_key_unique` ON `files` (`key`);--> statement-breakpoint
CREATE UNIQUE INDEX `profile_data_hacker_tag_unique` ON `profile_data` (`hacker_tag`);--> statement-breakpoint
CREATE UNIQUE INDEX `registration_data_clerk_id_unique` ON `registration_data` (`clerk_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `teams_id_unique` ON `teams` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `teams_tag_unique` ON `teams` (`tag`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_clerk_id_unique` ON `users` (`clerk_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_hacker_tag_unique` ON `users` (`hacker_tag`);