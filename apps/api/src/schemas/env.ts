import z from "zod/v4";

export const appEnvSchema = z.object({
	NODE_ENV: z
		.enum(["development", "testing", "production"])
		.default("production"),
	PORT: z.coerce.number().default(8000),
	CLIENT_URLS: z.string(),
	DATABASE_URL: z.url(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
