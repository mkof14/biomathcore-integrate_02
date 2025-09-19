.PHONY: db-up db-down db-reset migrate-dev migrate-deploy seed test fast fast-ci dev smoke

db-up:
	pnpm run db:up && pnpm run db:wait

db-down:
	docker compose down -v

db-reset:
	pnpm run db:reset && pnpm run db:seed

migrate-dev:
	pnpm run prisma:migrate:dev

migrate-deploy:
	pnpm run prisma:migrate:deploy

seed:
	pnpm run db:seed

test:
	pnpm run test:unit && PLAYWRIGHT_BASE_URL="http://localhost:3000" pnpm exec playwright test --config=tests/e2e/smoke.config.ts

fast: db-up migrate-dev seed test

fast-ci: migrate-deploy test

dev:
	NEXT_TELEMETRY_DISABLED=1 pnpm dev

smoke:
	PLAYWRIGHT_BASE_URL="http://localhost:3000" pnpm exec playwright test --config=tests/e2e/smoke.config.ts -g '@smoke'
