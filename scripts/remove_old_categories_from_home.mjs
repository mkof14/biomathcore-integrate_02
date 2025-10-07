import fs from "fs";

const p = "src/app/page.tsx";
if (!fs.existsSync(p)) process.exit(0);
let s = fs.readFileSync(p, "utf8");

function stripGridWithServices(src) {
  const patterns = [
    /<section\b[^>]*>(?:(?!<\/section>).)*?\bgrid\b[^>]*>(?:(?!<\/section>).)*?services(?:(?!<\/section>).)*?<\/section>/gis,
    /<div\b[^>]*className=\{?["'`][^"'`]*\bgrid\b[^"'`]*["'`]\}?[^>]*>(?:(?!<\/div>).)*?services(?:(?!<\/div>).)*?<\/div>/gis,
  ];
  for (const rx of patterns) {
    src = src.replace(rx, (m) => {
      const head = m.match(/<h1[\s\S]*?<\/h1>/i)?.[0] ?? "";
      const para = m.match(/<p[\s\S]*?<\/p>/i)?.[0] ?? "";
      return head || para ? `${head}\n${para}\n` : "";
    });
  }
  return src;
}

s = stripGridWithServices(s);

s = s.replace(/<([A-Z][A-Za-z0-9_]*)Categories([A-Za-z0-9_]*)\b[^>]*\/>\s*/g, (m, name) => {
  return name === "Home" ? m : "";
});
s = s.replace(/<([A-Z][A-Za-z0-9_]*)Categories([A-Za-z0-9_]*)\b[^>]*>[\s\S]*?<\/\1Categories\2>\s*/g, (m, name) => {
  return name === "Home" ? m : "";
});

if (!/<HomeCategories\s*\/>/.test(s)) {
  s = s.replace(/(<h1[\s\S]*?<\/h1>\s*(?:<p[\s\S]*?<\/p>\s*)?)/i, `$1\n<HomeCategories />\n`);
}

s = s.replace(/\n{3,}/g, "\n\n");

fs.writeFileSync(p, s, "utf8");
console.log("patched", p);
