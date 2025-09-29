set -e
mkdir -p scripts
touch .env.local
sed -i '' '/^NEXT_PUBLIC_HIDE_BACK=/d' .env.local || true
echo 'NEXT_PUBLIC_HIDE_BACK=1' >> .env.local

f1="src/components/common/BackButton.tsx"
f2="src/components/ui/BackButton.tsx"

if [ -f "$f1" ]; then
  cp "$f1" "${f1}.bak.hideback"
  cat > "$f1" <<'TSX'
"use client";
import Link from "next/link";
type Props = { fallback?: string; label?: string; className?: string };
export default function BackButton({ fallback="/", label="Back", className="" }: Props) {
  if (process.env.NEXT_PUBLIC_HIDE_BACK === "1") return null;
  return <Link href={fallback} className={className}>{label}</Link>;
}
TSX
fi

if [ -f "$f2" ]; then
  cp "$f2" "${f2}.bak.hideback"
  cat > "$f2" <<'TSX'
"use client";
import Link from "next/link";
export default function BackButton({ href="/member-zone/questionnaires" }: { href?: string }) {
  if (process.env.NEXT_PUBLIC_HIDE_BACK === "1") return null;
  return <Link href={href} className="inline-flex items-center gap-1 text-sm text-slate-300 hover:text-white">Back</Link>;
}
TSX
fi

rm -rf .next
pnpm dev
