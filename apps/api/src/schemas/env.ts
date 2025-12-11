import z from "zod";

export const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "testing", "production"])
		.default("production"),
	PORT: z.coerce.number().default(8000),
	CLIENT_URLS: z.url(),
});

export type Env = z.infer<typeof envSchema>;
