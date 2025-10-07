import fs from "fs";

const p = "src/app/svc/[slug]/page.tsx";
let s = fs.readFileSync(p, "utf8");

if (!/from ['"]@\/app\/_components\/AiWhiteAndAB['"]/.test(s)) {
  const lines = s.split(/\r?\n/);
  let lastImport = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*import\s.+from\s+['"][^'"]+['"]\s*;?\s*$/.test(lines[i])) lastImport = i;
  }
  lines.splice(lastImport + 1, 0, `import AiWhiteAndAB from "@/app/_components/AiWhiteAndAB";`);
  s = lines.join("\n");
}

if (!/<AiWhiteAndAB\s*\/>/.test(s)) {
  s = s.replace(/<main([^>]*)>/, `<main$1>\n      <AiWhiteAndAB />`);
}

fs.writeFileSync(p, s, "utf8");
console.log("patched", p);
