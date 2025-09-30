#!/usr/bin/env bash
set -euo pipefail
B="http://localhost:3000"
OUT="reports/AUDIT_MAIN1_$(date +%Y%m%d-%H%M%S).txt"

{
  echo "== RUN: $(date -u)"
  echo "== GIT =="
  git rev-parse --abbrev-ref HEAD
  git rev-parse HEAD

  echo
  echo "== ROUTES CODES =="
  for p in / /member /member/dashboard /api/_ops/health; do
    printf "%-26s %s\n" "$p" "$(curl -sS -o /dev/null -w '%{http_code}' "$B$p" || echo 000)"
  done

  echo
  echo "== SANDBOX REFERENCES =="
  grep -RIn --include='*.{ts,tsx,js,jsx,mjs}' '/_sandbox' src 2>/dev/null || true

  echo
  echo "== REDIRECT CALLS =="
  grep -RIn --include='*.{ts,tsx,js,jsx,mjs}' -e 'redirect(' -e 'redirects(' src 2>/dev/null || true

  echo
  echo "== MIDDLEWARE SNAPSHOTS =="
  for f in middleware.ts src/middleware.ts; do
    [ -f "$f" ] && { echo "--- $f ---"; sed -n '1,160p' "$f"; }
  done

  echo
  echo "== NEXT CONFIG =="
  for f in next.config.js next.config.mjs next.config.ts; do
    [ -f "$f" ] && { echo "--- $f ---"; sed -n '1,200p' "$f"; }
  done

  echo
  echo "== ROOT FILES =="
  for f in src/app/layout.tsx src/app/page.tsx; do
    [ -f "$f" ] && { echo "--- $f ---"; sed -n '1,120p' "$f"; }
  done
} | tee "$OUT"

echo "Report: $OUT"
