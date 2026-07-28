#!/usr/bin/env node
/* =============================================================================
   Captura de tela para revisao visual (Chrome headless).
   Uso:  node _tools/shot.js <pagina.html> [largura] [alturaTotal]
   Gera o PNG da pagina inteira e recortes de 900px em sequencia.
   ========================================================================== */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => fs.existsSync(p));

if (!CHROME) { console.error('Chrome/Edge nao encontrado'); process.exit(1); }

const OUT = process.env.SHOT_DIR || path.join(os.tmpdir(), 'solute-shots');
fs.mkdirSync(OUT, { recursive: true });

const page = process.argv[2] || 'index.html';
const w = parseInt(process.argv[3] || '1440', 10);
const h = parseInt(process.argv[4] || '9000', 10);
const tag = (process.argv[5] || page.replace('.html', '')) + '-' + w;

const file = path.join(OUT, tag + '.png');
const url = 'http://127.0.0.1:8899/' + page;

execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--autoplay-policy=no-user-gesture-required',
  '--force-prefers-reduced-motion',
  '--window-size=' + w + ',' + h,
  '--virtual-time-budget=15000',
  '--screenshot=' + file,
  url,
], { stdio: 'ignore', timeout: 90000 });

console.log(file);
