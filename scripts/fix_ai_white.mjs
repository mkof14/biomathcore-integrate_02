import fs from "fs";

const p = "src/app/svc/[slug]/page.tsx";
if (!fs.existsSync(p)) process.exit(0);
let s = fs.readFileSync(p, "utf8");

// 1) make sure isAI exists
if (!/const\s+isAI\s*=/.test(s)) {
  s = s.replace(/export default function[^{]+\{\s*\n/, m => (
    m + `  const isAI = ((((params as any)||{}).slug)||(typeof slug==="string"?slug:"")||"").startsWith("ai-");\n`
  ));
}

// 2) fix malformed `${isAI ? ai-white-text : }` fragments
const goodFrag = "${isAI ? 'ai-white-text' : ''}";
s = s
  .replace(/\$\{isAI\s*\?\s*ai-white-text\s*:\s*\}/g, goodFrag)
  .replace(/\$\{isAI\s*\?\s*ai-white-text\s*:\s*''\}/g, goodFrag)
  .replace(/\$\{isAI\s*\?\s*'ai-white-text'\s*:\s*\}/g, goodFrag)
  .replace(/\$\{isAI\s*\?\s*'ai-white-text'\s*:\s*''\}/g, goodFrag);

// 3) if duplicate condition fragments appear, keep only one
s = s.replace(/(\$\{isAI[^}]+\})\s*(\$\{isAI[^}]+\})/g, "$1");

// 4) normalize <main className> to include a single conditional
s = s.replace(
  /<main\s+className=\s*(?:"([^"]*)"|\{\s*`([\s\S]*?)`\s*\})\s*>/,
  (m, lit, tmpl) => {
    const base = (lit || tmpl || "px-6 py-8 max-w-3xl mx-auto")
      .replace(/\$\{[^}]*\}/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return `<main className={\`${base} \${isAI ? 'ai-white-text' : ''}\`}>`;
  }
);

// 5) tidy spaces inside template literals
s = s.replace(/className=\{`([^`]*)`\}>/g, (m, cls) => {
  return `className={\`${cls.replace(/\s+/g, " ").trim()}\`}>`;
});

fs.writeFileSync(p, s, "utf8");
console.log("fixed", p);
