import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { jwt, openAPI } from "better-auth/plugins";

import { accounts, sessions, users, verifications, db, jwkss } from "@/db";

export const auth = betterAuth({
	trustedOrigins: ["*"],
	secret: process.env.BETTER_AUTH_SECRET,
	url: process.env.BETTER_AUTH_URL,
	basePath: "/",
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
		schema: {
			accounts,
			sessions,
			users,
			verifications,
			jwkss,
		},
	}),
	appName: "auth",
	plugins: [
		openAPI({
			theme: "deepSpace",
		}),
		jwt(),
	],
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		cookies: {
			sessionToken: {
				attributes: {
					sameSite: "none",
					secure: true,
					partitioned: true, // New browser standards will mandate this for foreign cookies
				},
			},
		},
	},
});
