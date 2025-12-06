import { envSchema } from "@/schemas";
import { createServerFn } from "@tanstack/react-start";

export const loadServerEnvVars = createServerFn().handler(async () => {
    return envSchema.parse(process.env);
})