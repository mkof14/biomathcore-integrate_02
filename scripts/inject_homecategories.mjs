import fs from "fs";

const p = "src/app/page.tsx";
if (!fs.existsSync(p)) process.exit(0);
let s = fs.readFileSync(p, "utf8");

// ensure import
if (!/from ["']@\/app\/_components\/HomeCategories["']/.test(s)) {
  const ib = s.match(/^(?:"use client";\s*)?(?:import[^\n]*\n)+/m);
  if (ib) s = s.replace(ib[0], ib[0] + `import HomeCategories from "@/app/_components/HomeCategories";\n`);
  else s = `import HomeCategories from "@/app/_components/HomeCategories";\n` + s;
}

// ensure JSX
if (!/<HomeCategories\s*\/>/.test(s)) {
  if (/<\/main>/.test(s)) s = s.replace(/<\/main>/, `  <HomeCategories />\n</main>`);
  else s += `\n<HomeCategories />\n`;
}

fs.writeFileSync(p, s, "utf8");
console.log("patched", p);
