set -e
for b in $(find src/app -type f -name "*.bak.backlink"); do
  orig="${b%.bak.backlink}"
  mv "$b" "$orig"
done
rm -rf .next
pnpm dev
