import type { HttpBindings } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { todosRouter } from "@/controllers";
import type { AppEnv } from "@/schemas";

type Bindings = AppEnv & HttpBindings;

type Variables = {};

export const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use(
	cors({
		origin: process.env.CLIENT_URLS.split(","),
		allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		credentials: true,
	}),
);

app.get("/health", (c) => {
	return c.json({ status: "ok" });
});

app.route("/todos", todosRouter);
