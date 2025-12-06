import { createServerFn } from "@tanstack/react-start";

import { envSchema } from "@/schemas";

export const loadServerEnvVars = createServerFn().handler(async () => {
	return envSchema.parse(process.env);
});
