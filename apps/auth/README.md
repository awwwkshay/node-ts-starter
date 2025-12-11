# Auth service

## Overview

- **Frameworks**: built on `Hono` with `@hono/node-server` for the HTTP layer and `better-auth` to provide a secure user + session API.
- **Data layer**: `Drizzle ORM` talks to Postgres and syncs with the `better-auth` schema (`accounts`, `sessions`, `users`, `verifications`, `jwkss`).
- **Plugins & tools**: exposes an OpenAPI UI at `/docs` (via the `openAPI` plugin) and issues JWTs through the `jwt` plugin.
- The service ships as a standalone Node process (`apps/auth/src/server.ts`) that wires the middleware stack (`apps/auth/src/app.ts`) and delegates all API traffic to `better-auth`'s handler.

## Getting started

1. Install dependencies from the repo root, e.g. `pnpm install` (the auth app is part of the pnpm workspace).
2. Provision a Postgres database and expose its connection via `DATABASE_URL`.
3. Create a `.env` file (see **Environment variables** below) and populate the keys.
4. Run in development with `pnpm --filter @awwwkshay/node-ts-auth-starter dev` (this runs `rolldown --watch` alongside `nodemon dist/server.js`).
5. Build for production with `pnpm --filter @awwwkshay/node-ts-auth-starter build` and start with `pnpm --filter @awwwkshay/node-ts-auth-starter start`.

## Environment variables

| Name | Purpose | Notes |
| --- | --- | --- |
| `NODE_ENV` | Controls the build/runtime mode | defaults to `production` if unset |
| `PORT` | HTTP port for the Hono server | defaults to `8000` |
| `CLIENT_URLS` | Allowed origins for CORS | comma-separated URLs (this is split inside `app.ts`). |
| `BETTER_AUTH_SECRET` | Symmetric key that signs cookies + tokens | minimum 18 chars; used by `better-auth`. |
| `BETTER_AUTH_URL` | The public base URL for this service | required by `better-auth` plugins and cookies. |
| `DATABASE_URL` | Postgres connection string | consumed by `drizzleAdapter` inside `src/lib/auth.ts`. |

## Scripts

| Script | Description |
| --- | --- |
| `format` / `format:check` | format the workspace with `oxfmt`. |
| `lint` | run `oxlint` with type-aware checks. |
| `clean` | delete `dist` to start from scratch. |
| `build` | bundle the service via `rolldown`. |
| `watch` | rebuild on change (`rolldown --watch`). |
| `run:nodemon` | restart the built server when `dist` changes. |
| `dev` | run `watch` + `run:nodemon` concurrently for a hot loop. |
| `start` | run the production bundle on `NODE_ENV=production`. |

## Database & Auth tooling

- `auth:secret`: output a new `BETTER_AUTH_SECRET` (use this when rotating keys).
- `auth:generate`: refresh the `src/db/auth-schema.ts` file so Drizzle reflects any schema changes.
- `db:generate`: run `drizzle-kit generate` to keep TS models in sync with the database.
- `db:migrate` / `db:drop`: run migrations or drop the database via `drizzle-kit`.

## Architecture notes

- `apps/auth/src/app.ts` wires `cors()` with origins from `CLIENT_URLS`, injects the authenticated `user`/`session` onto the context, and forwards every request into `better-auth` via `auth.handler`. This means all login, logout, session, user, and verification endpoints are handled by Better Auth.
- The auth config in `apps/auth/src/lib/auth.ts` plugs the Drizzle adapter so the same Postgres database powers both the ORM models and Better Auth’s session/account tables, enabling `openAPI` docs (`/docs`) and JWT support out of the box.
- `apps/auth/src/server.ts` boots the server via `@hono/node-server`, logs the runtime port, and listens for `SIGINT`/`SIGTERM` to close gracefully.

## Deployment tips

- Ensure `NODE_ENV=production`, `CLIENT_URLS` contains the web client URL, and the database migrations have been applied before running `start`.
- The service exposes `/docs` (OpenAPI UI) and the default Better Auth REST surface; these are automatically protected by the middleware and sign cookies with the `BETTER_AUTH_SECRET` value.
