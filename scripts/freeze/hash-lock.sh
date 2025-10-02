#!/usr/bin/env bash
set -euo pipefail
HASHFILE=".frozen.hashes"
generate() {
  : > "$HASHFILE"
  while read -r path; do
    [ -e "$path" ] && shasum "$path" >> "$HASHFILE"
  done <<'EOF'
src/components/Header.tsx
src/components/Footer.tsx
EOF
}
verify() { shasum -c "$HASHFILE"; }
case "${1:-verify}" in
  gen) generate;;
  *) verify;;
esac
