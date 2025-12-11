# node-ts-starter

A pnpm-powered monorepo that hosts a TanStack-powered React web client (`apps/web/`), a Hono-based API server (`apps/api/`), an auth service backed by Better Auth (`apps/auth/`), and shared TypeScript schemas/utilities (`packages/core/`). Infrastructure manifests and Tilt recipes live under `infrastructure/`, giving you a complete full-stack starting point with modern routing, schema validation, and Kubernetes-friendly tooling.

## What's in the workspace

- **`apps/api/`** – Hono server that validates environment variables via `zod`, exposes `/todos`/`/info`, and relies on `packages/core` for shared schemas.
- **`apps/auth/`** – Hono service that wires `better-auth`, Drizzle, and OpenAPI (`/docs`) together for session, user, and JWT tooling.
- **`apps/web/`** – Vite + React 19 + TanStack Router/Query client with SSR support via Nitro; it fetches the API through the `NITRO_API_BASE_URL` contract.
- **`packages/core/`** – Shared schemas (e.g., `todoSchema`) and helpers, built with `tsup` to emit both ESM and CJS bundles consumed by the apps.
- **`infrastructure/`** – Tiltfile and Kubernetes manifests (`k8s/`) for bringing the stack up locally or deploying it to a cluster.

## Prerequisites

1. Node.js >= 22.13.0 (see `package.json` engines).
2. pnpm@10.13.1 matching the lockfile.
3. [`Tilt`](https://tilt.dev) if you plan to use the `dev:k8s` workflow.

Install dependencies once from the repo root:

```bash
pnpm install
```

## Running the apps

- **API:** `pnpm --filter @awwwkshay/node-ts-api-starter dev` – runs `tsx watch src/index.ts`. Ensure .env (example in [apps/api/README.md](apps/api/README.md)) is present when running outside Tilt.
- **Auth:** `pnpm --filter @awwwkshay/node-ts-auth-starter dev` – runs `rolldown --watch` alongside `nodemon dist/server.js` so the Better Auth surface + OpenAPI docs update live. Provide `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `CLIENT_URLS` before starting.
- **Web:** `pnpm --filter @awwwkshay/node-ts-web-starter dev` – launches Vite with TanStack Router devtools. Set `NITRO_API_BASE_URL` (defaults to `http://localhost:8000`) if you point the client at another API.
- **Full stack (Tilt):** `pnpm dev:k8s` – executes `tilt up` from the root for Kubernetes-style development (requires Tilt installed).

## Workspace utilities

| Script | Description |
| --- | --- |
| `pnpm clean:dist` | Removes `dist/` from all apps/packages. |
| `pnpm clean:node_modules` | Removes per-package `node_modules`. |
| `pnpm clean:all` | Runs both `clean:dist` and `clean:node_modules`. |
| `pnpm dev:k8s` | Starts Tilt so both apps (and any declared k8s resources) run together. |

Each package also exposes format/lint/build scripts; see the sub-readmes for instructions such as `pnpm --filter @awwwkshay/node-ts-web-starter test` or `pnpm --filter @awwwkshay/node-ts-api-starter lint`.

## Turbo workflows

The repo ships with a `turbo.json` root manifest so you can orchestrate cross-package tasks via `turbo run`. The most useful shortcuts are:

| Command | Effect |
| --- | --- |
| `pnpm turbo run build` | Builds every package that exposes a `build` script (`apps/*`, `packages/*`). |
| `pnpm turbo run build:apps` | Builds only the apps (`apps/api`, `apps/auth`, `apps/web`), reusing the cached `build:packages` artifacts when possible. |
| `pnpm turbo run build:packages` | Builds only the shared packages (particularly `packages/core`) so you can skip the apps when iterating on schemas/utilities. |
| `pnpm turbo run dev --filter <package>` | Starts a persistent dev task (defined by the package) after running `build:packages` to keep shared builds fresh. e.g., `pnpm turbo run dev --filter @awwwkshay/node-ts-api-starter`. |
| `pnpm turbo run lint` / `format` / `test` / `clean` | Runs the corresponding task across the workspace with caching where enabled (`clean` always runs). |

Turbo reuses cached outputs based on `turbo.json`, so rerunning `build` or `lint` is lightweight once deployments are cached.

## Example env files

Each app provides a template that you can copy into its local .env file before starting the service.

| App | Template |
| --- | --- |
| API | [apps/api/example.env](apps/api/example.env) |
| Auth | [apps/auth/example.env](apps/auth/example.env) |
| Web | [apps/web/example.env](apps/web/example.env) |

Copy the template next to the matching package and adjust the values (database URL, secrets, ports) to match your local stack.

## Shared environment notes

- The API validates `NODE_ENV`, `PORT`, and `CLIENT_URLS` via `apps/api/src/schemas/env.ts` before listening. Use [apps/api/example.env](apps/api/example.env) as a starting point for your local .env, or rely on your platform’s secrets in production.
- The web app expects `NITRO_API_BASE_URL` for API calls and `NITRO_PORT` when running the preview/start command; copy [apps/web/example.env](apps/web/example.env) when you're toggling ports.
- The auth service validates and exposes `DATABASE_URL`, `BETTER_AUTH_SECRET`, `CLIENT_URLS`, and `BETTER_AUTH_URL` before booting so the Better Auth plugins (OpenAPI, JWT, cookies, etc.) behave consistently; mirror [apps/auth/example.env](apps/auth/example.env) when populating these values locally.

## Contributing

1. Make your code changes inside the relevant package (`apps/api`, `apps/auth`, `apps/web`, or `packages/core`).
2. Rebuild any touched package (`pnpm build` or `pnpm --filter <package> build`).
3. Run lint/format scripts to keep the workspace consistent (`oxfmt`/`oxlint` are already configured in each package).
4. Update `packages/core/dist` whenever the shared exports change so other workspaces immediately consume the new artifacts.

## Learn more

- `apps/api/README.md` – API-specific configs and endpoints.
- `apps/auth/README.md` – Better Auth + Drizzle deployment notes for the session service.
- `apps/web/README.md` – Front-end details (routing, TanStack integrations, deployment hints).
- `packages/core/README.md` – Shared schema/contracts reference.

Happy building! 🎯
