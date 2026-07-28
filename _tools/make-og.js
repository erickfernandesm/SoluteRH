#!/usr/bin/env node
/* =============================================================================
   Gera a imagem de Open Graph (media/og-default.jpg, 1200x630) usada nas
   previas de WhatsApp, LinkedIn, Facebook e X.

   Uso:  node _tools/make-og.js
   Requer Chrome (ou Edge) instalado.
   ========================================================================== */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => fs.existsSync(p));

if (!CHROME) { console.error('Chrome/Edge nao encontrado.'); process.exit(1); }

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link rel="stylesheet" href="../fonts/fonts.css">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{
    background:#0A0A0C;
    font-family:'Inter',system-ui,sans-serif;
    color:#EDEDF0;
    position:relative;
    display:flex;flex-direction:column;justify-content:space-between;
    padding:64px 72px;
  }
  .grid{
    position:absolute;inset:0;
    background-image:
      linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);
    background-size:74px 74px;
    -webkit-mask-image:radial-gradient(ellipse 80% 70% at 30% 40%,#000 10%,transparent 75%);
  }
  .glow{
    position:absolute;width:760px;height:760px;border-radius:50%;
    right:-190px;top:-260px;
    background:radial-gradient(circle,rgba(243,140,35,.34),rgba(243,140,35,.08) 42%,transparent 68%);
    filter:blur(10px);
  }
  .row{position:relative;display:flex;align-items:center;justify-content:space-between}
  .logo{height:52px;width:auto}
  .eyebrow{
    font-size:16px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
    color:#F38C23;display:flex;align-items:center;gap:14px;
  }
  .eyebrow::before{content:'';width:38px;height:2px;background:linear-gradient(90deg,transparent,#F38C23);border-radius:2px}
  h1{
    position:relative;
    font-family:'Sora',sans-serif;font-weight:800;
    font-size:74px;line-height:1.03;letter-spacing:-.04em;
    color:#FBFBFC;max-width:930px;margin-top:26px;
  }
  h1 em{font-style:normal;color:#F38C23;position:relative;white-space:nowrap}
  h1 em::after{
    content:'';position:absolute;left:0;right:0;bottom:.06em;height:.075em;
    background:linear-gradient(90deg,#D2740F,#FFAE5C);border-radius:99px;
  }
  .foot{position:relative;display:flex;align-items:center;gap:34px;font-size:19px;color:#A0A0AA}
  .foot b{color:#FBFBFC;font-family:'Sora',sans-serif;font-weight:700;font-size:23px;letter-spacing:-.02em}
  .dot{width:5px;height:5px;border-radius:50%;background:#33333D}
  .site{
    font-family:'Sora',sans-serif;font-weight:600;font-size:19px;
    color:#EDEDF0;letter-spacing:-.01em;
  }
</style></head><body>
  <div class="grid"></div><div class="glow"></div>

  <div class="row">
    <img class="logo" src="../media/logo-solute-branca.svg" alt="">
    <span class="site">soluterh.com.br</span>
  </div>

  <div>
    <span class="eyebrow">Consultoria em RH</span>
    <h1>Fortalecemos negócios<br>através de <em>pessoas</em></h1>
  </div>

  <div class="foot">
    <span><b>+700</b> empresas atendidas</span>
    <span class="dot"></span>
    <span><b>+16.000</b> profissionais formados</span>
    <span class="dot"></span>
    <span><b>5,0★</b> no Google</span>
  </div>
</body></html>`;

const tmp = path.join(ROOT, '_tools', '_og.html');
const out = path.join(ROOT, 'media', 'og-default.png');
fs.writeFileSync(tmp, html, 'utf8');

execFileSync(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  '--virtual-time-budget=6000',
  '--screenshot=' + out,
  'file:///' + tmp.replace(/\\/g, '/'),
], { stdio: 'ignore' });

fs.unlinkSync(tmp);
console.log(fs.existsSync(out) ? 'media/og-default.png gerado' : 'falhou');
