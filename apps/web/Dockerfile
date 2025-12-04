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
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/

# Install API deps (dev deps included)
RUN pnpm install --frozen-lockfile --filter @awwwkshay/node-ts-web-starter

# Copy ALL source code (full repo!)
COPY . .

# Build TS
WORKDIR /app/apps/web
RUN pnpm build

# --------------------------
# 2. Production runtime image
# --------------------------
FROM node:22-slim

WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_PORT=5173
ENV NITRO_API_BASE_URL=http://host.docker.internal:8000
ENV VITE_API_BASE_URL=http://host.docker.internal:8000
ENV VITE_APP_NAME="Node TS Starter"

RUN npm install -g pnpm

# Copy workspace + lockfile
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copy only package.json for workspace packages
COPY packages/*/package.json ./packages/

# Copy API package.json
COPY apps/web/package.json ./apps/web/

# Install production dependencies including workspace deps
RUN pnpm install --prod --frozen-lockfile --filter @awwwkshay/node-ts-web-starter

# Copy final workspace packages (required at runtime!)
COPY packages ./packages

# Copy final build output
COPY --from=builder /app/apps/web/dist ./apps/web/dist

EXPOSE $NITRO_PORT
CMD ["node", "apps/web/dist/server/index.mjs"]
