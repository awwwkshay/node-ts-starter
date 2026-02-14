# Node TypeScript Starter

A pnpm-powered monorepo that boots a React 19 + TanStack front-end, a Hono-based API, a Better Auth session service, shared TypeScript contracts, and Kubernetes-ready infrastructure so you can experiment with full-stack patterns from a single workspace.

## Workspace layout

- `apps/api/` – Hono server that validates every request payload with `zod`, relies on `packages/core` for shared schemas, and exposes `/todos`, `/info`, and health probes.
- `apps/auth/` – Less than a dozen routes backed by Better Auth and Drizzle, exposing OpenAPI docs at `/docs` plus JWT/cookie tooling.
- `apps/web/` – Vite + React 19 + TanStack Router/Query UI with Nitro SSR and shared schema validation from `packages/core`.
- `apps/postgres/` – Helper script used by Tilt or custom Docker workflows to create multiple Postgres databases via the official image.
- `packages/core/` – Shared `todoSchema`, helpers, and `tsdown` output (CJS + ESM) consumed by every app.
- `infrastructure/` – Tiltfile, Helm charts, and Kubernetes manifests (`infrastructure/k8s/`) to bring the stack up locally or deploy it to a cluster.

## Prerequisites

1. **Node.js** ≥ v24 (`package.json` `engines`).
2. **pnpm** 10.24.0 (root `packageManager`).
3. **Docker** when you need Postgres containers or Tilt’s cluster emulation.
4. **Tilt** (`pnpm dev:k8s`) for the Kubernetes-style dev workflow.

## Getting started

```bash
pnpm install

# If you want to pull or push images to GitHub Container Registry, authenticate first:
docker login ghcr.io
# Or if you want to use Docker Hub instead:
docker login docker.io

# Then set these environment variables so the Kubernetes manifests can reference them for image pulls:
export GITHUB_TOKEN=<your-github-token>
export GITHUB_USERNAME=<your-github-username>
export GITHUB_EMAIL=<your-github-email>
echo $GITHUB_TOKEN $GITHUB_USERNAME $GITHUB_EMAIL

# Create the `app` namespace for all deployments:
kubectl apply -f infrastructure/k8s/app.namespace.yaml

# Apply the GitHub Container Registry secret (requires GITHUB_TOKEN, GITHUB_USERNAME, and GITHUB_EMAIL environment variables):
kubectl apply -f infrastructure/k8s/ghcr.secret.yaml
```

1. Copy `apps/api/example.env`, `apps/auth/example.env`, and `apps/web/example.env` into their respective directories and fill in secrets (database URLs, client origins, `BETTER_AUTH_SECRET`, etc.)
2. Run any app individually via `pnpm --filter <package> dev` or start the whole stack with `pnpm dev:k8s` (Tilt handles the `infrastructure/k8s` manifests + Postgres helper).
3. For production builds, use `pnpm --filter <package> build` or orchestrate across packages with `pnpm turbo run build`.

## Running the services

| Service | Dev command | Notes |
| --- | --- | --- |
| API | `pnpm --filter @awwwkshay/node-ts-api-starter dev` | `rolldown --watch` + `nodemon dist/server.js`, CORS-locked via `CLIENT_URLS`. |
| Auth | `pnpm --filter @awwwkshay/node-ts-auth-starter dev` | Better Auth surface + Drizzle; requires `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `DATABASE_URL`. |
| Web | `pnpm --filter @awwwkshay/node-ts-web-starter dev` | Vite + Nitro dev server, proxies to the API via `NITRO_API_BASE_URL`. |
| Full stack | `pnpm dev:k8s` | Tilt orchestrates everything, including the `apps/postgres` script that seeds extra databases. |

## Tilt & Kubernetes

`pnpm dev:k8s` runs Tilt from the workspace root. The `Tiltfile` declares services for API, Auth, Web, Postgres, and any extra Kubernetes resources under `infrastructure/k8s/` (deployments, services, configs, secrets, and migration jobs).

## Shared tooling

- `packages/core` publishes shared schemas via `tsdown` so both API and web clients always share the same contracts.
- `turbo.json` orchestrates cross-package builds/tests via `pnpm turbo run build`, `lint`, `test`, and `clean`.
- Postgres multi-database creation happens through `apps/postgres/create-multiple-postgresql-databases.sh`, triggered by setting `POSTGRES_MULTIPLE_DATABASES` before Tilt or Docker starts the container.

## Root scripts

| Script | Description |
| --- | --- |
| `pnpm clean:dist` | Remove every `dist/` folder across `apps/` and `packages/`. |
| `pnpm clean:node_modules` | Drop every `node_modules` under `apps/` and `packages/`. |
| `pnpm clean:all` | Runs both of the above. |
| `pnpm dev:k8s` | Starts Tilt for the Kubernetes-like dev experience. |

## Environment templates

| App | Template |
| --- | --- |
| API | `apps/api/example.env` |
| Auth | `apps/auth/example.env` |
| Web | `apps/web/example.env` |

Copy the template, remove the leading `#` comments, and update the values to match your local credentials or hosted secrets.

## Contributing

1. Make changes in the package that owns the feature (`apps/api`, `apps/auth`, `apps/web`, or `packages/core`).
2. Rebuild the touched package (`pnpm --filter <package> build`).
3. Run `pnpm --filter <package> format` / `lint` to stay consistent.
4. Update `packages/core/dist` whenever shared exports change so the apps consume the latest bundle.

Generated on 2026-02-14
