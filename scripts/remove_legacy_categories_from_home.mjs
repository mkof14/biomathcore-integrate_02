import fs from "fs";

const p = "src/app/page.tsx";
if (!fs.existsSync(p)) process.exit(0);
let s = fs.readFileSync(p, "utf8");

// remove any Categories-like components except HomeCategories
function stripOtherCategoryComponents(code){
  // collect imported identifiers that contain "Category" or "Categories" (exclude HomeCategories)
  const importRE = /^import\s+([^;]+)\s+from\s+["'][^"']+["'];?\s*$/gm;
  const toRemove = new Set<string>();

  code.replace(importRE, (m, spec) => {
    // default import
    const def = spec.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*(,|\s*$)/)?.[1];
    if (def && /Categor(y|ies)/i.test(def) && def !== "HomeCategories") toRemove.add(def);

    // named imports
    const named = [...spec.matchAll(/\{\s*([^}]+)\s*\}/g)].flatMap(x => x[1].split(","));
    named.forEach(n => {
      const name = n.trim().split(/\s+as\s+/i)[0];
      if (name && /Categor(y|ies)/i.test(name) && name !== "HomeCategories") toRemove.add(name);
    });
    return m;
  });

  // remove imports for those identifiers
  if (toRemove.size) {
    code = code.replace(importRE, (m, spec) => {
      let line = m;
      for (const id of toRemove) {
        // remove default import if matches
        line = line.replace(new RegExp(`(^\\s*import\\s*)${id}\\s*,\\s*\\{`), `$1{`);
        line = line.replace(new RegExp(`(^\\s*import\\s*)${id}\\s*(;|$)`), `import$2`);
        // remove named import specifier
        line = line.replace(new RegExp(`\\b${id}\\s*(,\\s*|\\s*)(?=[}\\)])`), "");
      }
      // clean empty named blocks
      line = line.replace(/\{\s*\}\s*,?\s*/g, "");
      // drop line if it became just "import ;"
      if (/^\s*import\s*;?\s*$/.test(line)) return "";
      return line;
    });

    // remove JSX usages of those identifiers
    for (const id of toRemove) {
      const pair = new RegExp(`<${id}\\b[\\s\\S]*?<\\/${id}>\\s*`, "g");
      const self = new RegExp(`<${id}\\b[^>]*\\/?>\\s*`, "g");
      code = code.replace(pair, "").replace(self, "");
    }
  }
  return code;
}

// also try to remove any inline grid section that shows "... services" counts (legacy block)
function stripLegacyGridByHeuristic(code){
  const rxSection = /<section\b[^>]*>(?:.|\n)*?<\/section>/gi;
  code = code.replace(rxSection, (sec) => {
    if (/\bgrid\b/.test(sec) && /\bservices\b/i.test(sec) && /Digital Therapeutics Store|General Sexual Longevity|Eye-Health Suite/i.test(sec)) {
      return "";
    }
    return sec;
  });
  return code;
}

let before = s;
s = stripOtherCategoryComponents(s);
s = stripLegacyGridByHeuristic(s);

// ensure one HomeCategories near top of <main>
if (!/<HomeCategories\s*\/>/.test(s)) {
  s = s.replace(/<main([^>]*)>/, `<main$1>\n  <HomeCategories />`);
}
// de-dupe multiples
s = s.replace(/(\s*<HomeCategories\s*\/>\s*){2,}/g, "\n  <HomeCategories />\n");
// cleanup
s = s.replace(/\n{3,}/g, "\n\n");

if (s !== before) {
  fs.writeFileSync(p, s, "utf8");
  console.log("patched", p);
} else {
  console.log("nochange", p);
}
