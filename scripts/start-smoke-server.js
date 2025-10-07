const { spawn } = require('node:child_process');
const path = require('node:path');
let serverPath = path.resolve(__dirname, '..', 'tests', 'e2e', 'scripts', 'smoke-server.mjs');
serverPath = serverPath.replace(/tests[\/\\]e2e[\/\\]tests[\/\\]e2e[\/\\]/g, 'tests/e2e/');
console.log('[smoke-wrapper] launching:', serverPath, 'cwd=', process.cwd());
const child = spawn(process.execPath, [serverPath], { stdio: 'inherit', env: process.env });
child.on('exit', (code) => process.exit(code ?? 0));
