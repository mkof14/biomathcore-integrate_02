#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGETS = [
  'src/lib/report-engine',
  'src/lib/repos',
  'src/lib/repo',
  'src/lib/blackbox',
].map((p)=>path.join(ROOT,p)).filter((p)=>fs.existsSync(p));

const frozen = [
  path.join(ROOT,'src/app/member'),
  path.join(ROOT,'src/app/admin'),
  path.join(ROOT,'src/app/monitoring'),
  path.join(ROOT,'src/app/control-center'),
  path.join(ROOT,'src/app/services'),
  path.join(ROOT,'src/app/investors'),
];

const isFrozen = (fp) => frozen.some((dir)=> fp.startsWith(dir+path.sep));

const list = (dir)=>{
  const out=[];
  const st=[dir];
  while(st.length){
    const d=st.pop();
    if (!fs.existsSync(d)) continue;
    for (const ent of fs.readdirSync(d,{withFileTypes:true})){
      const p=path.join(d,ent.name);
      if (ent.isDirectory()) st.push(p);
      else if (/\.(ts|tsx)$/.test(ent.name)) out.push(p);
    }
  }
  return out;
};

let changed=0;
for (const base of TARGETS){
  for (const file of list(base)){
    if (isFrozen(file)) continue;
    let src = fs.readFileSync(file,'utf8');
    const orig = src;

    // remove ts-nocheck
    src = src.replace(/\/\/\s*@ts-nocheck[^\n]*\n/g,'');

    // prefer expect-error
    src = src.replace(/\/\/\s*@ts-ignore/g,'// @ts-expect-error TODO: narrow types');

    // any -> unknown (avoid generics default = any)
    src = src.replace(/:\s*any\b/g,': unknown');
    src = src.replace(/\bas\s+any\b/g,'as unknown');

    // empty blocks
    src = src.replace(/\{\s*\}/g,'{ /* TODO: implement or remove */ }');

    // import schemas if report-engine file references report entities
    if (/report/i.test(file) && !src.includes("ReportInputSchema") && /params|input|result/i.test(src)){
      src = `import type { ReportInput, ReportResult } from "@/lib/report-engine/contracts/reportSchemas";\n` + src;
    }

    if (src!==orig){
      fs.writeFileSync(file,src,'utf8');
      changed++;
    }
  }
}
console.log(`tighten-report-engine: files changed ${changed}`);
