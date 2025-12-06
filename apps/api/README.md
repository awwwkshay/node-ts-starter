# @awwwkshay/node-ts-api-starter

This package powers the API side of the `node-ts-starter` monorepo. It ships a lightweight **Hono** server that serves configuration-safe metadata plus a validated TODO list backed by the shared `@awwwkshay/node-ts-core` package.

## Highlights

- **Framework:** [`Hono`](https://hono.dev) with `@hono/node-server` for fast HTTP handling in both development and serverless-like environments.
- **Schema safety:** `zod` schemas declare everything from the TODO payload to the required runtime environment variables.
- **Monorepo friendly:** Depends on `@awwwkshay/node-ts-core` via workspace protocol so shared types stay in sync across API and UI layers.
- **Environment-aware bootstrapping:** Loads `.env` files only when `NODE_ENV=development`, otherwise trusts the hosting platform to inject the values.

## Prerequisites

1. Node.js `>=22.13.0` (per the root `package.json` engines field).
2. `pnpm@10.13.1` as the package manager (defined in the root workspace).
3. (Optional) A `.env` file in the repo root or `apps/api` folder when running locally. Example values live in the **Environment** section below.

Install the workspace dependencies from the repo root:

```bash
pnpm install
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm --filter @awwwkshay/node-ts-api-starter dev` | Run the API in development mode (`tsx watch src/index.ts`). Loads `.env` for `NODE_ENV=development`. |
| `pnpm --filter @awwwkshay/node-ts-api-starter build` | Compile TypeScript to `dist/` for production deployments (`tsc -p .`). |
| `pnpm --filter @awwwkshay/node-ts-api-starter clean` | Remove the compiled artifacts in `dist/`. |
| `pnpm --filter @awwwkshay/node-ts-api-starter format` | Run `oxfmt` over the API sources. |
| `pnpm --filter @awwwkshay/node-ts-api-starter lint` | Run `oxlint` with type-aware, type-checking rules. |

> Additional monorepo-level cleaning shortcuts live in the root `package.json` (`clean:dist`, `clean:node_modules`, `clean:all`).

## Environment

All variables are validated through `apps/api/src/schemas/env.ts` (`zod`). The server will refuse to start if validation fails.

```env
NODE_ENV=development    # must be one of development/testing/production
PORT=8000
CLIENT_URL=http://localhost:4173   # adjust for your web client
```

- `NODE_ENV` defaults to `production` when not explicitly set. During development the server imports `dotenv` to populate values from `.env`.
- `PORT` defaults to `8000` so the API can run alongside other services.
- `CLIENT_URL` is used by the `cors` middleware to restrict requests to your front-end host.

## Architecture

1. **`src/index.ts`** bootstraps the Hono router, loads environment variables, configures CORS, and defines the few available routes.
2. **`configs/env.ts`** either loads `.env` (development) or parses `process.env` before handing values to the rest of the app.
3. **`schemas/env.ts`** defines the single truth around the env payload using `zod` so the server fails fast on invalid configuration.
4. **`packages/core`** exposes shared schemas such as `todoSchema`, keeping types consistent between API and web layers.

## Exposed Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET /` | `/` | Returns `Hello Hono` and verifies the server is reachable. |
| `GET /info` | `/info` | Echoes active `NODE_ENV`, listening `PORT`, and allowed `CLIENT_URL`. Useful for readiness checks. |
| `GET /todos` | `/todos` | Returns a static TODO list validated with `todoSchema`. Replace this stub with your datastore or downstream service as needed. |

All endpoints are typed through Hono’s `Hono<{ Bindings; Variables }>` generic to keep the handler context strict.

## Development Notes

- **CORS:** `@hono/cors` allows only the configured `CLIENT_URL` while still allowing credentials and a 10-minute preflight cache (`maxAge: 600`).
- **Shared schema:** `todoSchema` comes from `@awwwkshay/node-ts-core`, demonstrating how to pull shared contracts from the `packages/` area.
- **Logging:** On startup, the server logs the env payload when `NODE_ENV=development` to aid debugging.

To tie the API with the web app locally, run `pnpm --filter @awwwkshay/node-ts-api-starter dev` and the web client (e.g., `pnpm --filter @awwwkshay/node-ts-web-starter dev`). The API is CORS-locked to the front-end so adjust `CLIENT_URL` if you use a different port.

## Deployment

1. Run `pnpm --filter @awwwkshay/node-ts-api-starter build` to produce `dist/index.js`.
2. Execute `NODE_ENV=production node dist/index.js` (or use your preferred process manager).
3. Provide the same environment variables via your hosting platform / container.
4. If deploying to containerized platforms, point the start command at the compiled `dist/index.js` and install only production dependencies.

## Troubleshooting

- `ValidationError: ZodError` during startup usually means an env var is missing or malformed — double-check your `.env` file or hosting config.
- If CORS rejects requests, confirm `CLIENT_URL` matches the `Origin` header from the browser.

## Learn More

- [Hono Documentation](https://hono.dev)
- [Zod](https://zod.dev)
- [TanStack Router / React](../../apps/web/README.md) (for the paired web client)

Happy building! 👋
