FROM node:22.20.0-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack use pnpm@10.15.1 && pnpm install --frozen-lockfile

FROM node:22.20.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN ./scripts/emit-build-env.sh >> .env && \
    corepack enable && corepack use pnpm@10.15.1 && pnpm build

FROM node:22.20.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./
RUN corepack enable && corepack use pnpm@10.15.1 && pnpm add next
EXPOSE 3000
CMD ["pnpm","start","-p","3000"]
