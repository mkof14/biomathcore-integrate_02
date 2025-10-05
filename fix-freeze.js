const fs = require('fs');
const p = 'FROZEN_PAGES.json';
let j = {};
try { j = JSON.parse(fs.readFileSync(p, 'utf8')); } catch(e) {}

const unset = (k) => { if (Object.prototype.hasOwnProperty.call(j, k)) delete j[k]; };
unset('/');
unset('/home');
unset('/index');
unset('/services');

// Явно разрешаем работать со страницами:
j['/'] = false;
j['/services'] = false;

fs.writeFileSync(p, JSON.stringify(j, null, 2));
console.log('Updated FROZEN_PAGES.json for Home and Services');
