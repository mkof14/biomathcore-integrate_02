#!/usr/bin/env bash
set -euo pipefail
if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required"; exit 1
fi
PKG=package.json
TMP=.pkg.tmp.json
jq '
  .scripts = (.scripts // {}) +
  {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init_or_sync",
    "db:reset": "prisma migrate reset --force",
    "db:seed": "ts-node prisma/seed.ts"
  }
' "$PKG" > "$TMP"
mv "$TMP" "$PKG"
