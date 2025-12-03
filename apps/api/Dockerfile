# --------------------------
# 1. Builder image
# --------------------------
FROM node:22-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

# Copy workspace root
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copy ONLY package.json files first (best practice)
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/

# Install API deps (dev deps included)
RUN pnpm install --frozen-lockfile --filter @awwwkshay/node-ts-api-starter

# Copy ALL source code (full repo!)
COPY . .

# Build TS
WORKDIR /app/apps/api
RUN pnpm build

# --------------------------
# 2. Production runtime image
# --------------------------
FROM node:22-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000
ENV CLIENT_URL=http://localhost:3000

RUN npm install -g pnpm

# Copy workspace + lockfile
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copy only package.json for workspace packages
COPY packages/*/package.json ./packages/

# Copy API package.json
COPY apps/api/package.json ./apps/api/

# Install production dependencies including workspace deps
RUN pnpm install --prod --frozen-lockfile --filter @awwwkshay/node-ts-api-starter

# Copy final workspace packages (required at runtime!)
COPY packages ./packages

# Copy final build output
COPY --from=builder /app/apps/api/dist ./apps/api/dist

EXPOSE $PORT
CMD ["node", "apps/api/dist/index.js"]
