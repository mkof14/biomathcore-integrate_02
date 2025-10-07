import fs from "fs";
import path from "path";

const ROOT = "src/app";
const exts = [".tsx",".ts",".jsx",".js"];
const ctaTexts = ["Explore Services","See Example","Discover Now"];

function walk(dir){
  if(!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap(f=>{
    const p=path.join(dir,f);
    const st=fs.statSync(p);
    if(st.isDirectory()) return walk(p);
    if(exts.some(e=>p.endsWith(e))) return [p];
    return [];
  });
}

function needsPatch(cls){
  return /bg-(blue|sky)-[56789]00/.test(cls) || /rounded-full/.test(cls) || /\btext-white\b/.test(cls);
}

function patchFile(file){
  let s = fs.readFileSync(file,"utf8");
  let changed = false;

  s = s.replace(/className=(["'`])([^"'`]*?)\1/g, (m,q,cls)=>{
    if(!cls.includes("btn-nasa") && needsPatch(cls)) { changed = true; return `className=${q}btn-nasa${q}`; }
    return m;
  });

  for(const label of ctaTexts){
    const rxLink = new RegExp(`(<Link[^>]*className=)(["'\\\`])(.*?)\\2([^>]*>\\s*)(${label})`,"g");
    s = s.replace(rxLink,(m,a,q,cls,mid,lab)=>{ changed = true; return `${a}${q}btn-nasa${q}${mid}${lab}`; });
    const rxBtn = new RegExp(`(<button[^>]*className=)(["'\\\`])(.*?)\\2([^>]*>\\s*)(${label})`,"g");
    s = s.replace(rxBtn,(m,a,q,cls,mid,lab)=>{ changed = true; return `${a}${q}btn-nasa${q}${mid}${lab}`; });
  }

  if(changed){ fs.writeFileSync(file,s,"utf8"); console.log("patched",file); }
}

walk(ROOT).forEach(patchFile);
