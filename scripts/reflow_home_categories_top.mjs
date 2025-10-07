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

// remove all existing HomeCategories occurrences
s = s.replace(/<HomeCategories\s*\/>\s*/g, "");

// helper to remove components by name (paired or self-closing)
function drop(name){
  const rxSelf = new RegExp(`<${name}[^>]*\\/>\n?`, "g");
  const rxPair = new RegExp(`<${name}[^>]*>[\\s\\S]*?<\\/${name}>\\s*`, "g");
  s = s.replace(rxSelf, "");
  s = s.replace(rxPair, "");
}

// likely hero/upper sections to remove
[
  "Hero",
  "HeroSection",
  "PrimaryHero",
  "TopCTA",
  "FeatureHero",
  "Promo",
  "Showcase",
  "BigCTA",
  "ServicePromos",
  "HeadlineStrip",
  "SplitCTA",
  "LandingHero",
  "LandingHeader",
  "MarketingHero",
  "Intro",
].forEach(drop);

// insert HomeCategories right after opening <main ...>
s = s.replace(/(<main[^>]*>)/, `$1\n  <HomeCategories />\n`);

// fallbacks: if no <main>, insert near top
if (!/<HomeCategories\s*\/>/.test(s)) {
  s = s + `\n<HomeCategories />\n`;
}

// cleanup extra blank lines
s = s.replace(/\n{3,}/g, "\n\n");

fs.writeFileSync(p, s, "utf8");
console.log("patched", p);
