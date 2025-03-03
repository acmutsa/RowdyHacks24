import { drizzle as pgDrizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as dotenv from "dotenv";
import * as pgSchema from "./schema-postgres";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

dotenv.config({
  path: "../../.env",
});

const dbPostgres = pgDrizzle(sql, { schema: pgSchema });

const discordPromise = dbPostgres.query.discordVerification.findMany();
const errorLogPromise = dbPostgres.query.errorLog.findMany();
const eventPromise = dbPostgres.query.events.findMany();
const filesPromise = dbPostgres.query.files.findMany();
const invitesPromise = dbPostgres.query.invites.findMany();
const profileDataPromise = dbPostgres.query.profileData.findMany();
const registrationDataPromise = dbPostgres.query.registrationData.findMany();
const scansPromise = dbPostgres.query.scans.findMany();
const teamsPromise = dbPostgres.query.teams.findMany();
const usersPromise = dbPostgres.query.users.findMany();


const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(turso, { schema });

const runMigrations = async () => {
	const [
		_discord,
		_errorLog,
		_events,
		_files,
		_invites,
		_profileData,
		_registrationData,
		_scans,
		_teams,
		_users
	] = await Promise.all([
		discordPromise,
		errorLogPromise,
		eventPromise,
		filesPromise,
		invitesPromise,
		profileDataPromise,
		registrationDataPromise,
		scansPromise,
		teamsPromise,
		usersPromise
	]);


	

	console.log("⏳ Running migrations...");
	const start = Date.now();
console.log("Migrating discordVerification");
	await db.insert(schema.discordVerification).values(_discord);
console.log("Migrating errorLog");
	if (_errorLog.length > 0) {
		await db.insert(schema.errorLog).values(_errorLog);
	}
console.log("Migrating events");
	await db.insert(schema.events).values(_events);
console.log("Migrating files");
	if (_files.length > 0) {
		await db.insert(schema.files).values(_files);
	}
console.log("Migrating invites");
	if (_invites.length > 0) {
		await db.insert(schema.invites).values(_invites);
	}
console.log("Migrating profileData");
	await db.insert(schema.profileData).values(_profileData);
console.log("Migrating registrationData");
	await db.insert(schema.registrationData).values(_registrationData);
console.log("Migrating scans");
	await db.insert(schema.scans).values(_scans);
console.log("Migrating teams");
	if (_teams.length > 0) {
		await db.insert(schema.teams).values(_teams);
	}
console.log("Migrating users");
	await db.insert(schema.users).values(_users);


	console.log(`✅ Migrations completed in ${Date.now() - start}ms`);

	process.exit(0);
};

runMigrations().catch((err) => {
	console.error("❌ Migration failed");
	console.error(err);
	process.exit(1);
});
