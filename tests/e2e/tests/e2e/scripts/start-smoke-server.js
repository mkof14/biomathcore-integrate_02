const { spawn } = require('node:child_process');
const path = require('node:path');
const real = path.resolve(process.cwd(), 'tests/e2e/scripts/smoke-server.mjs');
console.log('[compat-wrapper] launching:', real);
const child = spawn(process.execPath, [real], { stdio: 'inherit', env: process.env });
child.on('exit', (code) => process.exit(code ?? 0));
