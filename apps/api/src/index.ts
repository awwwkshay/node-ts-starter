import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from 'hono/cors'

const app = new Hono();
app.use('*', cors({
	origin: ['http://localhost:3000'],
	maxAge: 600,
	credentials: true,
}))
app.get("/", (c) => {
	return c.text("Hello Hono!");
});

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
