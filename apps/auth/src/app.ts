import type { HttpBindings } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "@/lib";
import type { Env as AppEnv } from "@/schemas";

type Bindings = AppEnv & HttpBindings;

type Variables = {
	user: typeof auth.$Infer.Session.user | null;
	session: typeof auth.$Infer.Session.session | null;
};

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

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	if (!session) {
		c.set("user", null);
		c.set("session", null);
		await next();
		return;
	}
	c.set("user", session.user);
	c.set("session", session.session);
	await next();
});

app.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));
