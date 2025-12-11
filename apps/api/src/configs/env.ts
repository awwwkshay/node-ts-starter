import { appEnvSchema, type AppEnv } from "@/schemas";

export let envVars: AppEnv;

export const loadEnvVars = async () => {
	const dotenv = await import("dotenv");
	dotenv.config({ path: ".env", override: true });
	setEnvVars();
};

export const setEnvVars = () => {
	envVars = appEnvSchema.parse(process.env);
};
