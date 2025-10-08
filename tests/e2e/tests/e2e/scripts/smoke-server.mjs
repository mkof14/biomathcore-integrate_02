import { resolve } from 'node:path';
const real = resolve(process.cwd(), 'tests/e2e/scripts/smoke-server.mjs');
console.log('[compat-mjs] importing real server:', real);
const m = await import('file://' + real);
export default m;
