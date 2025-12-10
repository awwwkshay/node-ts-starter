import "dotenv/config";
import { serve } from "@hono/node-server";

import { app } from "@/app";

const NODE_ENV = process.env.NODE_ENV ?? "production"
console.log("NODE_ENV:", NODE_ENV);

const server = serve({ fetch: app.fetch, port: Number.parseInt(process.env.PORT!) }, (info) => {
	console.log(`Server is running on http://localhost:${info.port}`);
});

// graceful shutdown
process.on("SIGINT", () => {
	server.close();
	process.exit(0);
});
process.on("SIGTERM", () => {
	server.close((err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		process.exit(0);
	});
});
