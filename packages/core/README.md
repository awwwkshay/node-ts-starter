# @awwwkshay/node-ts-core

Shared types, schemas, and helper utilities consumed across `apps/api` and `apps/web` in the `node-ts-starter` monorepo. This thin package stays framework-agnostic so both server and client code can rely on the same contracts without duplicating logic.

## Key Exports

- `todoSchema`: a `zod` schema describing each TODO item (`id`, `title`, `completed`). The API returns data that matches this schema, and the web client shares it for validation and inference.
- `types`: any additional shared types can be exported from `src/index.ts` so that every workspace consumer gets type-safe access with a single import path.
- `helpers` (future): keep this package lean, but add small shared functions here once multiple apps need the same logic.

## Installation

Use the workspace protocol when referencing this package in a consuming project so tooling can keep sources in sync:

```bash
pnpm install
```

Then add the dependency with:

```json
{
  "dependencies": {
    "@awwwkshay/node-ts-core": "workspace:*"
  }
}
```

Any workspace package that imports from `@awwwkshay/node-ts-core` will receive the latest build from `packages/core` without publishing to npm.

## Usage Example

```ts
import { todoSchema } from "@awwwkshay/node-ts-core";

const parsed = todoSchema.safeParse({
  id: "1",
  title: "Sync shared schema",
  completed: false,
});

if (!parsed.success) {
  console.error(parsed.error);
}

type Todo = z.infer<typeof todoSchema>;
```

Because this package exports both CJS and ESM builds via `exports` and `module`/`main`, consuming code can use whichever module system it prefers.

## Development Workflow

Run commands from the package root (or via `pnpm --filter @awwwkshay/node-ts-core <script>` from the repository root):

| Script | Description |
| --- | --- |
| `pnpm dev` | Watch sources and rebuild with `tsup --watch` (useful during cross-package development). |
| `pnpm build` | Compile TypeScript to `dist/` (ESM + CJS + d.ts) using `tsup`. |
| `pnpm clean` | Delete `dist/` artifacts created by the build. |
| `pnpm type-check` | Run `tsc --noEmit` to verify types without building. |
| `pnpm format` / `pnpm lint` | Run `oxfmt`/`oxlint` to keep formatting and lint rules consistent across the workspace. |

The shared build outputs are committed via `dist/`, so remember to rebuild the package before pushing changes that other workspaces depend on.

## Project Structure

```text
packages/core/
├── src/index.ts        # Re-exports shared schemas/helpers
├── src/todo.ts         # TODO schema definition
├── package.json        # Scripts + build config
├── tsup.config.ts      # tsup build options
└── tsconfig.json       # Compiler settings
```

### tsup Configuration

`tsup.config.ts` already produces:

- CJS and ESM bundles under `dist/`.
- Type declarations for each export.
- Minified builds optimized for tree-shaking.

Adjust `tsup.config.ts` only if you add new file entry points or need custom bundling logic.

## Testing Contracts

Because this package exposes schemas that validate runtime data, treat each schema change as a potential breaking change. Update both:

1. The schema definition in `src/`.
2. Any consumer that relies on the shape (search for `todoSchema` across the repo).

Use `pnpm type-check` and the dependent apps' lint/build scripts to ensure the change propagates cleanly.

## Publishing

>This package is workspace-only. No registry publishing is required. Keep the version in sync manually if you ever need to publish separately.

## Contributing

1. Add your schema/helper inside `src/`.
2. Re-export it from `src/index.ts`.  
3. Run `pnpm build` and ensure consuming packages (e.g., `apps/api`, `apps/web`) rebuild against the updated `dist/`.  
4. Commit both source and generated `dist/` files so the rest of the workspace sees your export.
