const { spawn } = require('node:child_process');
const path = require('node:path');

const env = { ...process.env };
if (!env.HOST) env.HOST = '127.0.0.1';
if (!env.PORT) env.PORT = '3010';

const serverPath = path.resolve(__dirname, '../tests/e2e/scripts/smoke-server.mjs');
console.log('[wrapper] launching mock:', serverPath, 'HOST=', env.HOST, 'PORT=', env.PORT);

const child = spawn(process.execPath, [serverPath], { stdio: 'inherit', env });
child.on('exit', (code) => process.exit(code ?? 0));
