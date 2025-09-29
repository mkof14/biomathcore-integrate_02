set -e
for b in $(find src/components -type f -name "*.bak.backbtn"); do
  mv "$b" "${b%.bak.backbtn}"
done
rm -rf .next
pnpm dev
