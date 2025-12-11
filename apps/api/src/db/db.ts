import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { todosTable } from "./schema";

const useSsl = process.env.DB_SSL?.toLowerCase() === "true";

const connectionOptions = {
	connectionString: process.env.DATABASE_URL!,
	ssl: useSsl ? { rejectUnauthorized: false } : false,
};

export const db = drizzle({
	connection: connectionOptions,
	schema: {
		todos: todosTable,
	},
});
