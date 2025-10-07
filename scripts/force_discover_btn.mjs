import fs from "fs";
import path from "path";

const ROOT = "src/app";
const exts = [".tsx",".ts",".jsx",".js"];

function walk(d){
  if(!fs.existsSync(d)) return [];
  return fs.readdirSync(d).flatMap(f=>{
    const p=path.join(d,f);
    const st=fs.statSync(p);
    if(st.isDirectory()) return walk(p);
    if(exts.some(e=>p.endsWith(e))) return [p];
    return [];
  });
}

function patch(s){
  let changed=false;

  const rxLink = /(<Link[^>]*?className=)(["'`])([\s\S]*?)\2([\s\S]*?>\s*)(Discover Now)(\s*<\/Link>)/g;
  s = s.replace(rxLink,(m,a,q,cls,mid,lab,tail)=>{changed=true;return `${a}${q}btn-nasa${q}${mid}${lab}${tail}`;});

  const rxBtn = /(<button[^>]*?className=)(["'`])([\s\S]*?)\2([\s\S]*?>\s*)(Discover Now)(\s*<\/button>)/g;
  s = s.replace(rxBtn,(m,a,q,cls,mid,lab,tail)=>{changed=true;return `${a}${q}btn-nasa${q}${mid}${lab}${tail}`;});

  const rxA = /(<a[^>]*?className=)(["'`])([\s\S]*?)\2([\s\S]*?>\s*)(Discover Now)(\s*<\/a>)/g;
  s = s.replace(rxA,(m,a,q,cls,mid,lab,tail)=>{changed=true;return `${a}${q}btn-nasa${q}${mid}${lab}${tail}`;});

  return {s,changed};
}

for(const file of walk(ROOT)){
  let src = fs.readFileSync(file,"utf8");
  const {s,changed} = patch(src);
  if(changed){ fs.writeFileSync(file,s,"utf8"); console.log("patched",file); }
}
