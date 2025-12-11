# node-ts-starter

A pnpm-powered monorepo that hosts a TanStack-powered React web client (`apps/web/`), a Hono-based API server (`apps/api/`), and shared TypeScript schemas/utilities (`packages/core/`). Infrastructure manifests and Tilt recipes live under `infrastructure/`, giving you a complete full-stack starting point with modern routing, schema validation, and Kubernetes-friendly tooling.

## What's in the workspace

- **`apps/api/`** – Hono server that validates environment variables via `zod`, exposes `/todos`/`/info`, and relies on `packages/core` for shared schemas.
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

- **API:** `pnpm --filter @awwwkshay/node-ts-api-starter dev` – runs `tsx watch src/index.ts`. Ensure `.env` (example in `apps/api/README.md`) is present when running outside Tilt.
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

## Shared environment notes

- The API validates `NODE_ENV`, `PORT`, and `CLIENT_URLS` via `apps/api/src/schemas/env.ts` before listening. Use a `.env` file in development or rely on your platform’s secrets in production.
- The web app expects `NITRO_API_BASE_URL` for API calls and `NITRO_PORT` when running the preview/start command.

## Contributing

1. Make your code changes inside the relevant package (`apps/api`, `apps/web`, or `packages/core`).
2. Rebuild any touched package (`pnpm build` or `pnpm --filter <package> build`).
3. Run lint/format scripts to keep the workspace consistent (`oxfmt`/`oxlint` are already configured in each package).
4. Update `packages/core/dist` whenever the shared exports change so other workspaces immediately consume the new artifacts.

## Learn more

- `apps/api/README.md` – API-specific configs and endpoints.
- `apps/web/README.md` – Front-end details (routing, TanStack integrations, deployment hints).
- `packages/core/README.md` – Shared schema/contracts reference.

Happy building! 🎯
