const { spawn } = require('node:child_process');
const path = require('node:path');

// Жёстко резолвим реальный mock под tests/e2e/scripts/smoke-server.mjs
const serverPath = path.resolve(__dirname, '../tests/e2e/scripts/smoke-server.mjs');

const env = {
  ...process.env,
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || '3010',
};

const child = spawn(process.execPath, [serverPath], { stdio: 'inherit', env });
child.on('exit', (code) => process.exit(code ?? 0));
