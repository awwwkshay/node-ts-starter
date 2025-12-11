import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { accounts, sessions, users, verifications, jwkss } from "./schema";

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
	max: 10,
	idleTimeoutMillis: 30000,
});

export const db = drizzle(pool, {
	schema: {
		accounts,
		sessions,
		users,
		verifications,
		jwkss,
	},
	casing: "snake_case",
});
