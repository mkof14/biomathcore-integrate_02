const { spawn } = require('node:child_process');
const path = require('node:path');
const serverPath = path.resolve(process.cwd(), 'tests/e2e/scripts/smoke-server.mjs');
const child = spawn(process.execPath, [serverPath], { stdio: 'inherit', env: process.env });
child.on('exit', (code) => process.exit(code ?? 0));
