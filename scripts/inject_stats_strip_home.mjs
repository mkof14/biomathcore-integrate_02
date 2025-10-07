import fs from "fs"

const p = "src/app/page.tsx"
if (!fs.existsSync(p)) process.exit(0)
let s = fs.readFileSync(p, "utf8")

if (!/StatsStrip/.test(s)) {
  const ib = s.match(/^(?:"use client";\s*)?(?:import[^\n]*\n)+/m)
  if (ib) s = s.replace(ib[0], ib[0] + `import StatsStrip from "@/app/_components/StatsStrip";\n`)
  else s = `import StatsStrip from "@/app/_components/StatsStrip";\n` + s
}
if (!/<StatsStrip\s*\/>/.test(s)) {
  s = s.replace(/<\/main>/, "  <StatsStrip />\n</main>")
}
fs.writeFileSync(p, s, "utf8")
console.log("patched", p)
