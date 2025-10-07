import fs from "fs";

const p = "src/app/page.tsx";
if (!fs.existsSync(p)) process.exit(0);
let s = fs.readFileSync(p,"utf8");

// ensure import
if (!/from ["']@\/app\/_components\/HomeCategories["']/.test(s)) {
  const ib = s.match(/^(?:"use client";\s*)?(?:import[^\n]*\n)+/m);
  if (ib) s = s.replace(ib[0], ib[0] + `import HomeCategories from "@/app/_components/HomeCategories";\n`);
  else s = `import HomeCategories from "@/app/_components/HomeCategories";\n` + s;
}

// remove other hero/top sections
const dropNames = ["Hero","HeroSection","PrimaryHero","TopCTA","FeatureHero","Promo","Showcase","BigCTA","HeadlineStrip","SplitCTA","LandingHero","LandingHeader","MarketingHero","Intro"];
for (const n of dropNames) {
  const rxSelf = new RegExp(`<${n}[^>]*\\/>\\s*`,"g");
  const rxPair = new RegExp(`<${n}[^>]*>[\\s\\S]*?<\\/${n}>\\s*`,"g");
  s = s.replace(rxSelf,"").replace(rxPair,"");
}

// remove any other categories components except HomeCategories
s = s.replace(/<([A-Z]\w*Categories\w*)\b([^>]*)\/>\s*/g, (m,name)=> name==="HomeCategories"?m:"");
s = s.replace(/<([A-Z]\w*Categories\w*)\b[^>]*>[\s\S]*?<\/\1>\s*/g, (m,name)=> name==="HomeCategories"?m:"");

// ensure HomeCategories at top of <main>
if (/<main[^>]*>/.test(s)) {
  s = s.replace(/<main([^>]*)>/, `<main$1>\n  <HomeCategories />`);
} else {
  s = `<HomeCategories />\n` + s;
}

// keep a single HomeCategories
s = s.replace(/(<HomeCategories\s*\/>\s*){2,}/g, `<HomeCategories />\n`);

fs.writeFileSync(p,s);
console.log("patched",p);
