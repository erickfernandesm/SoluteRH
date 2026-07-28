#!/usr/bin/env node
/* =============================================================================
   Verificacao do site gerado:
     - links internos apontam para arquivos existentes
     - imagens, videos, css, js e fontes existem
     - ids de ancora existem na pagina
     - atributos alt, title, lang, h1 unico
     - travessoes no texto visivel (a Solute pediu para nao usar)
   Uso: node _tools/check.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

let errors = 0, warns = 0;
const err = (f, m) => { console.log('  ERRO  [' + f + '] ' + m); errors++; };
const warn = (f, m) => { console.log('  aviso [' + f + '] ' + m); warns++; };

const exists = (p) => {
  const clean = p.split('#')[0].split('?')[0];
  if (!clean) return true;
  return fs.existsSync(path.join(ROOT, decodeURIComponent(clean)));
};

const isExternal = (u) =>
  /^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(u) || u.startsWith('//');

console.log('\nVerificando ' + pages.length + ' paginas\n');

pages.forEach((file) => {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');

  /* ---- href / src ---- */
  const refs = [];
  const re = /(?:href|src)="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) refs.push(m[1]);

  refs.forEach((u) => {
    if (isExternal(u)) return;
    if (!exists(u)) err(file, 'arquivo inexistente: ' + u);
  });

  /* ---- ancoras internas ---- */
  const ids = new Set();
  const reId = /\sid="([^"]+)"/g;
  while ((m = reId.exec(html))) ids.add(m[1]);
  refs.forEach((u) => {
    if (u.startsWith('#') && u.length > 1 && !ids.has(u.slice(1))) {
      warn(file, 'ancora sem destino: ' + u);
    }
  });

  /* ---- imagens sem alt ---- */
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  imgs.forEach((tag) => {
    if (!/\salt=/.test(tag)) err(file, 'img sem alt: ' + tag.slice(0, 78));
  });

  /* ---- estrutura basica ---- */
  if (!/<html lang="pt-BR">/.test(html)) err(file, 'falta lang="pt-BR"');
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s === 0) warn(file, 'sem <h1>');
  if (h1s > 1) warn(file, h1s + ' elementos <h1> (o ideal e 1)');
  if (!/<title>[^<]{10,}<\/title>/.test(html)) err(file, 'title ausente ou curto demais');
  const desc = html.match(/<meta name="description" content="([^"]*)"/);
  if (!desc) err(file, 'sem meta description');
  else if (desc[1].length > 185) warn(file, 'meta description com ' + desc[1].length + ' caracteres (ideal ate 165)');

  /* ---- travessoes no conteudo visivel ---- */
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ');
  if (visible.indexOf('—') > -1) {
    const idx = visible.indexOf('—');
    err(file, 'travessao no texto: "' + visible.slice(Math.max(0, idx - 34), idx + 34).trim() + '"');
  }

  /* ---- botoes/links sem rotulo acessivel ---- */
  const btns = html.match(/<button\b[^>]*>[\s\S]*?<\/button>/g) || [];
  btns.forEach((b) => {
    const inner = b.replace(/<[^>]+>/g, '').trim();
    if (!inner && !/aria-label=/.test(b)) warn(file, 'button sem rotulo: ' + b.slice(0, 60));
  });
});

/* ---- assets orfaos referenciados pelo CSS ---- */
const css = fs.readFileSync(path.join(ROOT, 'css', 'style.css'), 'utf8');
(css.match(/url\((?!["']?data:)["']?([^"')]+)["']?\)/g) || []).forEach((u) => {
  const p = u.replace(/url\(["']?/, '').replace(/["']?\)$/, '');
  if (isExternal(p)) return;
  if (!fs.existsSync(path.join(ROOT, 'css', p))) err('css/style.css', 'url() inexistente: ' + p);
});

/* ---- fontes ---- */
const fcss = fs.readFileSync(path.join(ROOT, 'fonts', 'fonts.css'), 'utf8');
(fcss.match(/url\(([^)]+)\)/g) || []).forEach((u) => {
  const p = u.replace(/url\(/, '').replace(/\)$/, '').replace(/["']/g, '');
  if (!fs.existsSync(path.join(ROOT, 'fonts', p))) err('fonts/fonts.css', 'fonte inexistente: ' + p);
});

console.log('\n' + (errors ? errors + ' erro(s)' : 'nenhum erro') + ' · ' + warns + ' aviso(s)\n');
process.exit(errors ? 1 : 0);
