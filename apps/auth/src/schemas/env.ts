import z from "zod/v4";

export const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "testing", "production"])
		.default("production"),
	PORT: z.coerce.number().default(8000),
	CLIENT_URLS: z.url(),
	BETTER_AUTH_SECRET: z.string().min(18),
	BETTER_AUTH_URL: z.url(),
	DATABASE_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;
