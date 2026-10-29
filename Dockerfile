# Pin the exact Node version and keep engines.node in package.json aligned with it.
FROM node:24.18.0-alpine AS base

# Pick up OS security patches on every build
RUN apk update && apk upgrade --no-cache

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# corepack uses the pnpm version pinned in package.json "packageManager"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM base AS prod-deps
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS runtime

ENV NODE_ENV=production
ENV APP_PORT=3000

RUN addgroup -S nodejs && adduser -S app -G nodejs

COPY --from=prod-deps --chown=app:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=app:nodejs /app/dist ./dist

USER app

EXPOSE 3000

CMD ["node", "dist/main.js"]
