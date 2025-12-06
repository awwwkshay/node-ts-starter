import { envSchema, type Env } from "../schemas/index.js";

export let envVars: Env;

export const loadEnvVars = async () => {
	const dotenv = await import("dotenv");
	dotenv.config({ path: ".env", override: true });
	setEnvVars();
};

export const setEnvVars = () => {
	envVars = envSchema.parse(process.env);
};
