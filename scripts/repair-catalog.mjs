import fs from 'fs';

const p = 'src/lib/service-catalog.ts';
let s = fs.readFileSync(p, 'utf8');
let orig = s;

// 1) Заголовок массива: "Category[," -> "Category[] = ["
s = s.replace(/export\s+const\s+CATEGORIES\s*:\s*Category\s*\[\s*,?/,
              'export const CATEGORIES: Category[] = [');

// 2) Удаляем артефакт "}] = [" между категориями -> просто "},"
s = s.replace(/\}\s*\]\s*=\s*\[/g, '},');

// 3) Между закрытием категории "}\n{" ставим запятую: "},\n  {"
s = s.replace(/\}\s*\n\s*\{/g, '},\n  {');

// 4) Страхуем запятую после массива services перед следующей категорией
//   "]\n  }\n  {" -> "]\n  },\n  {"
s = s.replace(/\]\s*\n\s*\}\s*\n\s*\{/g, ']\n  },\n  {');

// 5) Убираем случайные запятые перед открывающей скобкой массива
s = s.replace(/(\[\s*),\s*\n\s*\{/g, '$1\n  {');

// 6) Добавляем закрытие массива "];" в конец, если отсутствует
if (!/\n\];\s*$/.test(s)) s = s.replace(/\s*$/, '\n];\n');

// 7) Гарантируем наличие getCategory
if (!/export function getCategory\s*\(/.test(s)) {
  s += `

export function getCategory(slug: string) {
  // @ts-ignore
  return (CATEGORIES || []).find((c:any) => c.slug === slug) || null;
}
`;
}

// Записываем только если что-то изменилось
if (s !== orig) {
  fs.writeFileSync(p, s, 'utf8');
  console.log('✅ service-catalog.ts repaired');
} else {
  console.log('ℹ️ No changes made');
}
