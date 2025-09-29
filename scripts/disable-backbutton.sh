set -e

files="
src/components/common/BackButton.tsx
src/components/ui/BackButton.tsx
"

for f in $files; do
  [ -f "$f" ] || continue
  cp "$f" "$f.bak.backbtn"
  cat > "$f" <<'TSX'
export default function BackButton(_: any){ return null; }
TSX
done

rm -rf .next
pnpm dev
