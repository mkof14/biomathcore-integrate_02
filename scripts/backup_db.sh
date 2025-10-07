#!/usr/bin/env bash
set -euo pipefail
DATE="$(date +%Y-%m-%d_%H-%M-%S)"
OUT="backups"
mkdir -p "$OUT"
if [[ "${DATABASE_URL:-}" == file:* ]]; then
  SRC="${DATABASE_URL#file:}"
  cp -v "$SRC" "$OUT/dev_sqlite_${DATE}.db"
  echo "ok: sqlite backup"
  exit 0
fi
if [[ -n "${PGHOST:-}" || "${DATABASE_URL:-}" == postgres* ]]; then
  pg_dump "${DATABASE_URL:-}" > "$OUT/pg_${DATE}.sql"
  echo "ok: postgres backup"
  exit 0
fi
echo "no database configured"
