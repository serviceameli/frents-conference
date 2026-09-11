CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`services` text NOT NULL,
	`intents` text NOT NULL,
	`source` text NOT NULL,
	`utm` text NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` integer NOT NULL,
	`ip_hash` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `leads_ip_created_idx` ON `leads` (`ip_hash`,`created_at`);