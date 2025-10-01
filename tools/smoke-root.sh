#!/usr/bin/env bash
set -euo pipefail
B="http://localhost:3000"

root_code=$(curl -sS -o /dev/null -w '%{http_code}' "$B/")
ops_legacy_code=$(curl -sS -o /dev/null -w '%{http_code}' "$B/api/_ops/health" || echo 000)
ops_code=$(curl -sS -o /dev/null -w '%{http_code}' "$B/api/ops/health" || echo 000)
member_code=$(curl -sS -o /dev/null -w '%{http_code}' "$B/member")
dash_code=$(curl -sS -o /dev/null -w '%{http_code}' "$B/member/dashboard")

printf "[1/4] /                 -> %s\n" "$root_code"
printf "[2/4] /api/health       -> %s / %s\n" "$ops_legacy_code" "$ops_code"
printf "[3/4] /member           -> %s\n" "$member_code"
printf "[4/4] /member/dashboard -> %s\n" "$dash_code"

[ "$root_code" = "200" ] || exit 1
[ "$ops_code" = "200" ] || exit 1

echo "SMOKE OK"
