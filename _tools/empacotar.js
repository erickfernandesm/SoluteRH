#!/usr/bin/env node
/* =============================================================================
   Monta o pacote de publicacao: copia apenas o que vai para o servidor
   e gera um .zip pronto para subir no cPanel.

   Uso:  node _tools/empacotar.js
   Saida: publicar/soluterh-site.zip
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DEST = path.join(ROOT, 'publicar');
const STAGE = path.join(DEST, 'site');
const ZIP = path.join(DEST, 'soluterh-site.zip');

/* o que vai para o servidor */
const ARQUIVOS = ['.htaccess', 'favicon.ico', 'robots.txt', 'sitemap.xml', 'site.webmanifest'];
const PASTAS = ['css', 'js', 'fonts', 'media', 'data'];

/* limpa a saida anterior */
fs.rmSync(DEST, { recursive: true, force: true });
fs.mkdirSync(STAGE, { recursive: true });

function copiar(origem, destino) {
  fs.cpSync(origem, destino, { recursive: true });
}

let n = 0;

// paginas
fs.readdirSync(ROOT)
  .filter((f) => f.endsWith('.html'))
  .forEach((f) => {
    fs.copyFileSync(path.join(ROOT, f), path.join(STAGE, f));
    n++;
  });

// arquivos avulsos
ARQUIVOS.forEach((f) => {
  const de = path.join(ROOT, f);
  if (!fs.existsSync(de)) {
    console.log('  FALTA: ' + f);
    return;
  }
  fs.copyFileSync(de, path.join(STAGE, f));
  n++;
});

// pastas
PASTAS.forEach((d) => {
  const de = path.join(ROOT, d);
  if (!fs.existsSync(de)) {
    console.log('  FALTA: ' + d + '/');
    return;
  }
  copiar(de, path.join(STAGE, d));
  n += fs.readdirSync(de).length;
});

/* compacta pelo PowerShell (nao precisa instalar nada) */
execFileSync('powershell', [
  '-NoProfile', '-Command',
  `Compress-Archive -Path '${STAGE}\\*' -DestinationPath '${ZIP}' -Force`,
], { stdio: 'ignore' });

const mb = (fs.statSync(ZIP).size / 1048576).toFixed(1);
console.log('\n  publicar/soluterh-site.zip  (' + mb + ' MB, ' + n + ' itens)');
console.log('  Suba esse arquivo em public_html e use Extrair no cPanel.\n');
