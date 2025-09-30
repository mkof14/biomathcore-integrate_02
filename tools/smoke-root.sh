#!/usr/bin/env bash
set -euo pipefail
B="http://localhost:3000"
echo "[1/4] /                -> $(curl -sS -o /dev/null -w '%{http_code}' $B/)"
echo "[2/4] /api/_ops/health -> $(curl -sS -o /dev/null -w "%{http_code}" $B/api/_ops/health) / $(curl -sS -o /dev/null -w "%{http_code}" $B/api/ops/health)
echo "[3/4] /member          -> $(curl -sS -o /dev/null -w '%{http_code}' $B/member)"
echo "[4/4] /member/dashboard-> $(curl -sS -o /dev/null -w '%{http_code}' $B/member/dashboard)"
test "$(curl -sS -o /dev/null -w '%{http_code}' $B/)" = "200"
echo "SMOKE OK"
