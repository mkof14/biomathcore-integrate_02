import fs from 'fs';

const p = 'src/lib/service-catalog.ts';
let s = fs.readFileSync(p, 'utf8');
const orig = s;

// найдём позицию функции getCategory
const funcTag = 'export function getCategory';
const funcPos = s.indexOf(funcTag);

// если функции нет — просто выходим (на всякий случай)
if (funcPos === -1) {
  console.log('ℹ️ getCategory not found; nothing to fix.');
  process.exit(0);
}

// 1) убедимся, что ПЕРЕД функцией есть закрытие массива '];'
const beforeFunc = s.slice(0, funcPos);
const hasCloseBefore = /\]\s*;\s*$/.test(beforeFunc);

// если закрытия нет — поставим его перед функцией
let insertDone = false;
if (!hasCloseBefore) {
  s = beforeFunc.replace(/\s*$/, '\n];\n') + s.slice(funcPos);
  insertDone = true;
}

// 2) уберём любые `];` ПОСЛЕ функции (хвост файла)
const tailStart = s.indexOf(funcTag);
let head = s.slice(0, tailStart);
let tail = s.slice(tailStart);

// в начале хвоста мог оказаться лишний `];` (редкий случай) — удалим
tail = tail.replace(/^\s*\];\s*/g, '');

// а также удалим все `];` в самом конце файла, если они идут уже после функции
// (оставляем только пробелы/переводы строк)
tail = tail.replace(/\n\];\s*$/g, '\n');

// 3) нормализуем финальные переводы строк
s = head + tail;
s = s.replace(/\s+$/,'\n');

// сохранить, если были изменения
if (s !== orig) {
  fs.writeFileSync(p, s, 'utf8');
  console.log('✅ Moved array closing bracket before getCategory and cleaned trailing ];');
} else {
  console.log('ℹ️ No changes made.');
}
