import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const users = sqliteTable("users", {
	clerkID: text("clerk_id", { length: 255 }).notNull().primaryKey().unique(),
	firstName: text("first_name", { length: 50 }).notNull(),
	lastName: text("last_name", { length: 50 }).notNull(),
	email: text("email", { length: 255 }).notNull().unique(),
	hackerTag: text("hacker_tag", { length: 50 }).notNull().unique(),
	registrationComplete: integer("registration_complete", {mode:"boolean"}).notNull().default(false),
	createdAt: integer("created_at", {mode:"timestamp_ms"}).notNull().default(sql`(current_timestamp)`),
	hasSearchableProfile: integer("has_searchable_profile", {mode:"boolean"}).notNull().default(true),
	group: integer("group").notNull(),
	role: text("role").notNull().default("hacker"),
	checkinTimestamp: integer("checkin_timestamp", {mode:"timestamp_ms"}),
	teamID: text("team_id", { length: 50 }),
	points: integer("points").notNull().default(0),
	checkedIn: integer("checked_in", {mode:"boolean"}).notNull().default(false),
	rsvp: integer("rsvp", {mode:"boolean"}).notNull().default(false),
});

export const userRelations = relations(users, ({ one, many }) => ({
	registrationData: one(registrationData, {
		fields: [users.clerkID],
		references: [registrationData.clerkID],
	}),
	discordVerification: one(discordVerification, {
		fields: [users.clerkID],
		references: [discordVerification.clerkID],
	}),
	profileData: one(profileData, {
		fields: [users.hackerTag],
		references: [profileData.hackerTag],
	}),
	files: many(files),
	scans: many(scans),
	team: one(teams, {
		fields: [users.teamID],
		references: [teams.id],
	}),
	invites: many(invites),
}));

export const registrationData = sqliteTable("registration_data", {
	clerkID: text("clerk_id", { length: 255 }).notNull().primaryKey().unique(),
	age: integer("age").notNull(),
	gender: text("gender", { length: 50 }).notNull(),
	race: text("race", { length: 75 }).notNull(),
	ethnicity: text("ethnicity", { length: 50 }).notNull(),
	acceptedMLHCodeOfConduct: integer("accepted_mlh_code_of_conduct", {
		mode: "boolean",
	}).notNull(),
	sharedDataWithMLH: integer("shared_data_with_mlh", {
		mode: "boolean",
	}).notNull(),
	wantsToReceiveMLHEmails: integer("wants_to_receive_mlh_emails", {
		mode: "boolean",
	}).notNull(),
	university: text("university", { length: 200 }).notNull(),
	major: text("major", { length: 200 }).notNull(),
	shortID: text("short_id", { length: 50 }).notNull(),
	levelOfStudy: text("level_of_study", { length: 50 }).notNull(),
	hackathonsAttended: integer("hackathons_attended").notNull(),
	softwareExperience: text("software_experience", { length: 25 }).notNull(),
	heardFrom: text("heard_from", { length: 50 }),
	shirtSize: text("shirt_size", { length: 5 }).notNull(),
	dietRestrictions: text("diet_restrictions", { mode: "json" })
		.notNull()
		.$type<string[]>(),
	accommodationNote: text("accommodation_note"),
	GitHub: text("github", { length: 100 }),
	LinkedIn: text("linkedin", { length: 100 }),
	PersonalWebsite: text("personal_website", { length: 100 }),
	resume: text("resume", { length: 255 })
		.notNull()
		.default("https://static.acmutsa.org/No%20Resume%20Provided.pdf"),
});

export const profileData = sqliteTable("profile_data", {
	hackerTag: text("hacker_tag", { length: 50 }).notNull().primaryKey().unique(),
	discordUsername: text("discord_username", { length: 60 }).notNull(),
	pronouns: text("pronouns", { length: 20 }).notNull(),
	bio: text("bio").notNull(),
	skills: text("skills", {mode:"json"}).notNull().$type<string[]>(),
	profilePhoto: text("profile_photo", { length: 255 }).notNull(),
});

export const events = sqliteTable("events", {
	id: integer("id", { mode: "number" }).primaryKey(),
	title: text("name", { length: 255 }).notNull(),
	startTime: integer("start_time", {mode:"timestamp_ms"}).notNull(),
	endTime: integer("end_time", {mode:"timestamp_ms"}).notNull(),
	description: text("description").notNull(),
	type: text("type", { length: 50 }).notNull(),
	host: text("host", { length: 255 }),
	hidden: integer("hidden", {mode:"boolean"}).notNull().default(false),
});

export const eventsRelations = relations(events, ({ many }) => ({
	scans: many(scans),
}));

export const files = sqliteTable("files", {
	id: text("id", { length: 255 }).notNull().primaryKey().unique(),
	presignedURL: text("presigned_url").notNull(),
	key: text("key", { length: 500 }).notNull().unique(),
	validated: integer("validated", {mode:"boolean"}).notNull().default(false),
	type: text("type").notNull(),
	ownerID: text("owner_id", { length: 255 }).notNull(),
});

export const filesRelations = relations(files, ({ one }) => ({
	owner: one(users, {
		fields: [files.ownerID],
		references: [users.clerkID],
	}),
}));

export const scans = sqliteTable(
	"scans",
	{
		updatedAt: integer("updated_at", {mode:"timestamp_ms"}).notNull().default(sql`(current_timestamp)`),
		userID: text("user_id", { length: 255 }).notNull(),
		eventID: integer("event_id").notNull(),
		count: integer("count").notNull(),
	},
	(table) => ({
		id: primaryKey({ columns: [table.userID, table.eventID] }),
	})
);

export const scansRelations = relations(scans, ({ one }) => ({
	user: one(users, {
		fields: [scans.userID],
		references: [users.clerkID],
	}),
	event: one(events, {
		fields: [scans.eventID],
		references: [events.id],
	}),
}));

export const teams = sqliteTable("teams", {
	id: text("id", { length: 50 }).notNull().primaryKey().unique(),
	name: text("name", { length: 255 }).notNull(),
	tag: text("tag", { length: 50 }).notNull().unique(),
	bio: text("bio"),
	photo: text("photo", { length: 400 }).notNull(),
	createdAt: integer("created_at", {mode:"timestamp_ms"}).notNull().default(sql`(current_timestamp)`),
	ownerID: text("owner_id", { length: 255 }).notNull(),
	devpostURL: text("devpost_url", { length: 255 }),
});

export const teamsRelations = relations(teams, ({ one, many }) => ({
	members: many(users),
	invites: many(invites),
}));

export const invites = sqliteTable(
	"invites",
	{
		inviteeID: text("invitee_id", { length: 255 }).notNull(),
		teamID: text("team_id", { length: 50 }).notNull(),
		createdAt: integer("created_at", { mode: "timestamp_ms" })
			.notNull()
			.default(sql`(current_timestamp)`),
		status: text("status").notNull().default("pending"),
	},
	(table) => ({
		id: primaryKey({ columns: [table.inviteeID, table.teamID] }),
	})
);

export const invitesRelations = relations(invites, ({ one }) => ({
	invitee: one(users, {
		fields: [invites.inviteeID],
		references: [users.clerkID],
	}),
	team: one(teams, {
		fields: [invites.teamID],
		references: [teams.id],
	}),
}));

export const errorLog = sqliteTable("error_log", {
	id: text("id", { length: 50 }).notNull().primaryKey(),
	createdAt: integer("created_at", {mode:"timestamp_ms"}).notNull().default(sql`(current_timestamp)`),
	userID: text("user_id", { length: 255 }),
	route: text("route", { length: 255 }),
	message: text("message").notNull(),
});

export const discordVerification = sqliteTable("discord_verification", {
	code: text("code", { length: 255 }).notNull().primaryKey(),
	createdAt: integer("created_at", {mode:"timestamp_ms"}).notNull().default(sql`(current_timestamp)`),
	clerkID: text("clerk_id", { length: 255 }),
	discordUserID: text("discord_user_id", { length: 255 }).notNull(),
	discordUserTag: text("discord_user_tag", { length: 255 }).notNull(),
	discordProfilePhoto: text("discord_profile_photo", { length: 255 }).notNull(),
	discordName: text("discord_name", { length: 255 }).notNull(),
	status: text("status").notNull().default("pending"),
	guild: text("guild", { length: 100 }).notNull(),
});
