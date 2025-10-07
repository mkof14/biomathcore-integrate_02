import fs from "fs";

const p = "src/app/page.tsx";
if (!fs.existsSync(p)) process.exit(0);
let s = fs.readFileSync(p, "utf8");
let before = s;

// 1) remove <section> that contains a grid of categories with "services" counters
const rxSection = /<section\b[^>]*>(?:.|\n)*?<\/section>/gi;
s = s.replace(rxSection, (sec) => {
  const looksLikeOld =
    /\bgrid\b/.test(sec) &&
    /\bservices\b/i.test(sec) &&
    /(Critical Health|Everyday Wellness|Longevity & Anti-Aging|General Sexual Longevity|Eye-Health Suite)/i.test(sec);
  return looksLikeOld ? "" : sec;
});

// 2) remove <div className="... grid ..."> block with services counters (fallback)
const rxDiv = /<div\b[^>]*className=\{?["'`][^"'`]*\bgrid\b[^"'`]*["'`]\}?[^>]*>(?:.|\n)*?<\/div>/gi;
s = s.replace(rxDiv, (blk) => {
  const looksLikeOld =
    /\bservices\b/i.test(blk) &&
    /(Critical Health|Everyday Wellness|Longevity & Anti-Aging|General Sexual Longevity|Eye-Health Suite)/i.test(blk);
  return looksLikeOld ? "" : blk;
});

// 3) ensure HomeCategories exists near top of <main>
if (!/<HomeCategories\s*\/>/.test(s)) {
  s = s.replace(/<main([^>]*)>/, `<main$1>\n  <HomeCategories />`);
}

// cleanup
s = s.replace(/\n{3,}/g, "\n\n");

if (s !== before) {
  fs.writeFileSync(p, s, "utf8");
  console.log("patched", p);
} else {
  console.log("nochange", p);
}
