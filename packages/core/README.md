# @awwwkshay/node-ts-core

Core shared utilities and schemas for the node-ts-starter monorepo.

## Installation

In your workspace apps:

```bash
pnpm add @awwwkshay/node-ts-core
```

Or reference in `package.json`:

```json
{
  "dependencies": {
    "@awwwkshay/node-ts-core": "workspace:*"
  }
}
```

## Usage

```typescript
import { todoSchema } from '@awwwkshay/node-ts-core';

// Validate data
const todo = todoSchema.parse({
  id: '1',
  title: 'Learn TypeScript',
  completed: false
});

// Type inference
type Todo = z.infer<typeof todoSchema>;
```

## Development

```bash
# Build the package
pnpm build

# Watch mode (for development)
pnpm dev

# Type check without building
pnpm type-check

# Clean build artifacts
pnpm clean
```

## Peer Dependencies

This package requires:
- `zod` ^4.0.0

Make sure to install it in your consuming app.

## What's Included

- ✅ ESM and CJS builds
- ✅ TypeScript type declarations
- ✅ Source maps for debugging
- ✅ Tree-shakeable exports

## Adding New Exports

1. Create your file in `src/`
2. Export from `src/index.ts`:
   ```typescript
   export { myNewSchema } from './my-new-schema';
   ```
3. Build: `pnpm build`
