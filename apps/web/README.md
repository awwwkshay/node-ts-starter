# @awwwkshay/node-ts-web-starter

Front-end for the `node-ts-starter` monorepo. Built on **Vite**, **React 19**, and **TanStack Router / Query**, it demonstrates server-integrated routing, modern styling, and shared schema usage with the API package.

## Highlights

- **Routing:** File-based routes live under `src/routes/` and are wired together via the generated `routeTree` (see `routeTree.gen.ts`).
- **Data layer:** TanStack Query is initialized through `src/integrations/tanstack-query/root-provider.tsx`; the router wraps every route with the shared query client for SSR-friendly fetching.
- **Styling:** Tailwind CSS 4.0 shapes the gradients and responsive layout in `src/routes/index.tsx`; components use utility classes plus Lucide icons for visual polish.
- **Full-stack ready:** Environment-aware builds make it easy to point the UI at the sibling API (`NITRO_API_BASE_URL`) while still supporting `vite dev` for local iteration.

## Prerequisites

1. Node.js >= 22.13.0 (root `package.json` enforces this engine).
2. `pnpm@10.13.1` to match the workspace lockfile.
3. `pnpm install` from the repository root to populate hoisted dependencies and link workspace packages.

```bash
pnpm install
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm --filter @awwwkshay/node-ts-web-starter dev` | Launch the Vite dev server. Hot reloads + TanStack Router devtools in the browser. |
| `pnpm --filter @awwwkshay/node-ts-web-starter build` | Generate a production build for both client and server artifacts (`nitro`/SSR). |
| `pnpm --filter @awwwkshay/node-ts-web-starter preview` | Preview the build via `vite preview`. |
| `pnpm --filter @awwwkshay/node-ts-web-starter test` | Run unit/integration tests with Vitest. |
| `pnpm --filter @awwwkshay/node-ts-web-starter start` | Start the compiled SSR server (`node ./dist/server/index.mjs`). Expects `NITRO_API_BASE_URL` and `NITRO_PORT`. |
| `pnpm --filter @awwwkshay/node-ts-web-starter format` | Format sources with `oxfmt`. |
| `pnpm --filter @awwwkshay/node-ts-web-starter lint` | Run `oxlint` with type-aware rules. |
| `pnpm --filter @awwwkshay/node-ts-web-starter clean` | Remove the `dist/` output. |

## Environment

Environment variables live on the `start` script and the Vite/Nitro stack. For local production-like tests, set:

```bash
export NITRO_PORT=3000
export NITRO_API_BASE_URL=http://localhost:8000
```

- `NITRO_API_BASE_URL` points to `apps/api` so the front-end can call the Hono server.
- `NITRO_PORT` controls where the SSR server listens when using `pnpm start`.

When running `pnpm --filter ... dev`, Vite spies on `vite.config.ts` and automatically proxies to the API if you configure it there.

## Architecture

1. **`src/router.tsx`** builds the TanStack router, attaches the generated route tree, and wires the shared TanStack Query client using `setupRouterSsrQueryIntegration`.  
2. **`src/routes/`** drives the UI. `__root.tsx` defines the shared layout, while `index.tsx` provides the hero page you see on first load.  
3. **`src/integrations/tanstack-query/`** hosts the query context/provider plus the DevTools integration referenced by the router wrapper.  
4. **`src/schema`/`packages/core`** share Zod schemas to keep API contracts consistent (e.g., `todoSchema`).  
5. **`src/styles.css` & Tailwind config**: Tailwind 4 supplies utility-first styling; check `src/styles.css` for base resets and gradient definitions.  

## Development Flow

1. Start the API: `pnpm --filter @awwwkshay/node-ts-api-starter dev`.  
2. Run the web server: `pnpm --filter @awwwkshay/node-ts-web-starter dev`.  
3. Access the client at the Vite dev URL (usually `http://localhost:5173`).  
4. When you change `src/routes/` files, TanStack Router regenerates the route tree using the plugin defined in `routeTree.gen.ts`.

## Testing & Quality

- `vitest`: tests and snapshots live near components; run `pnpm --filter @awwwkshay/node-ts-web-starter test`.  
- `oxfmt`/`oxlint`: formatting and linting match the API package and ensure consistent style across the monorepo.  
- `pnpm --filter @awwwkshay/node-ts-web-starter lint` automatically fixes fixable issues while still running type-aware checks.

## Deployment

1. `pnpm --filter @awwwkshay/node-ts-web-starter build` to compile.  
2. Serve via `pnpm --filter @awwwkshay/node-ts-web-starter start` + set `NITRO_API_BASE_URL` to the production API URL.  
3. Alternatively, export `NITRO_PORT`/`NITRO_API_BASE_URL` and run `node ./dist/server/index.mjs` yourself.  
For container deployments, copy `dist/` and `node_modules/.pnpm` into the image, expose `NITRO_PORT`, and run the same start command.

## Learn More

- [TanStack Router Docs](https://tanstack.com/router)  
- [TanStack Query Docs](https://tanstack.com/query)  
- [Vite](https://vite.dev) and [Nitro](https://nitro.unjs.io) for SSR builds  
- See `apps/api` for the matching backend API that provides `/todos`, `/info`, and health routes.

Happy building! 🚀
