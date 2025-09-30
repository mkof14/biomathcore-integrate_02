set -e
sed -i '' '/^NEXT_PUBLIC_HIDE_BACK=/d' .env.local || true

f1="src/components/common/BackButton.tsx"
f2="src/components/ui/BackButton.tsx"

[ -f "${f1}.bak.hideback" ] && mv "${f1}.bak.hideback" "$f1"
[ -f "${f2}.bak.hideback" ] && mv "${f2}.bak.hideback" "$f2"

rm -rf .next
pnpm dev
