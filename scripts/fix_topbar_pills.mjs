import fs from "fs";
import path from "path";

const root = "src";
const files = [];
(function walk(dir){
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p = path.join(dir,e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && p.endsWith(".tsx")) files.push(p);
  }
})(root);

const rxHasScale = /from\s+["']lucide-react["']|<Scale(?:\s|\/>|>)/;
const rxPair =
/(<(div|span)([^>]*?)className=\{?["'][^"']*rounded-(?:full|\[9999px\])[^"']*["']\}?[^>]*>\s*<\/\2>\s*)(<(div|span)([^>]*?)className=\{?["'][^"']*rounded-(?:full|\[9999px\])[^"']*["']\}?[^>]*>\s*<\/\6>)/s;

let changedAny = false;

for (const p of files) {
  let s = fs.readFileSync(p,"utf8");
  if (!rxHasScale.test(s)) continue;

  const before = s;

  s = s.replace(rxPair, (m, first, _t2, second) => {
    const withA = first.replace(/>(\s*)<\/(div|span)>/, '><span className="pointer-events-none select-none font-semibold tracking-wide text-white">A</span></$2>');
    const withAB = second.replace(/>(\s*)<\/(div|span)>/, '><span className="pointer-events-none select-none font-semibold tracking-wide text-white">B</span></$2>');
    return withA + withAB;
  });

  if (s !== before) {
    fs.writeFileSync(p,s);
    console.log("patched", p);
    changedAny = true;
  }
}

if (!changedAny) {
  console.log("nochange");
}
