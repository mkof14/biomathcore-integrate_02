set -e

list=$(cat <<'EOF'
src/app/member/admin/page.tsx
src/app/member/catalog/page.tsx
src/app/member/files/page.tsx
src/app/member/questionnaires/RenderForm.tsx
src/app/member/questionnaires/sexual-health/page.tsx
EOF
)

for f in $list; do
  [ -f "$f" ] || continue
  cp "$f" "$f.bak.backlink"

  /usr/bin/perl -0777 -pe '
    s#<Link[^>]*>\s*Back\s*</Link>##gs;
    s#<a[^>]*>\s*(?:‹\s*)?Back\s*</a>##gs;
    s#<button[^>]*>\s*Back\s*</button>##gs;
  ' -i "$f"

  # подчистить лишние двойные переносы после удаления
  /usr/bin/perl -0777 -pe 's/\n{3,}/\n\n/gs' -i "$f"
done

rm -rf .next
pnpm dev
