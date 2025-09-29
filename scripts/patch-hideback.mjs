import fs from "fs";

const p = "src/app/layout.tsx";
let s = fs.readFileSync(p, "utf8");

// Add import if missing (prefer alias "@/components/HideBack", fallback to relative)
const hasAlias = /from\s+"@\/components\/HideBack"/.test(s);
const hasRelative = /from\s+"\.{1,2}\/components\/HideBack"/.test(s);
if (!hasAlias && !hasRelative) {
  const importLine = 'import HideBack from "@/components/HideBack";\n';
  const useClient = /^["']use client["'];?\s*/;
  if (useClient.test(s)) {
    s = s.replace(useClient, (m) => m + importLine);
  } else {
    // insert after first import block or at top
    const firstImportMatch = s.match(/^(?:import[\s\S]*?\n)+/);
    if (firstImportMatch) {
      const idx = firstImportMatch[0].length;
      s = s.slice(0, idx) + importLine + s.slice(idx);
    } else {
      s = importLine + s;
    }
  }
}

// Insert <HideBack /> after <Header />
if (!/<HideBack\s*\/>/.test(s)) {
  s = s.replace(/(<Header\s*\/>\s*)/, `$1\n            <HideBack />\n`);
}

fs.writeFileSync(p, s);
console.log("patched:", p);
