import { todoSchema } from "@awwwkshay/node-ts-core";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { envVars, loadEnvVars, setEnvVars } from "./configs/index.js";
import type { Env } from "./schemas/index.js";

// load node environment
const NODE_ENV = (process.env.NODE_ENV || "production") as Env["NODE_ENV"];

// load environment variables
if (NODE_ENV === "development") {
	await loadEnvVars();
	console.info("Loading environment variables");
	console.info(envVars);
} else {
	setEnvVars();
}

type Bindings = Env;

type Variables = {};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// configure middlewares
app.use(
	"*",
	cors({
		origin: [envVars.CLIENT_URL],
		maxAge: 600,
		credentials: true,
	}),
);

// configure routes
app.get("/", (c) => {
	return c.text("Hello Hono");
});

app.get("/info", (c) => {
	return c.json({
		NODE_ENV,
		PORT: envVars.PORT,
		CLIENT_URL: envVars.CLIENT_URL,
	});
});

app.get("/todos", async (c) => {
	const rawTodos = [
		{ id: 1, title: "Learn TypeScript", completed: false },
		{ id: 2, title: "Build a Hono app", completed: true },
	];
	const todos = todoSchema.array().parse(rawTodos);
	return c.json({ todos });
});

// start server
serve(
	{
		fetch: app.fetch,
		port: envVars.PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
