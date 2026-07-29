#!/usr/bin/env node
/* =============================================================================
   SOLUTE RH — gerador de paginas estaticas
   -----------------------------------------------------------------------------
   Junta  _src/layout.js (header/footer/SEO)  +  _src/pages/*.js (conteudo)
   e escreve arquivos .html completos e autonomos na raiz do projeto.

   Uso:   node _tools/build-site.js

   IMPORTANTE: o HTML gerado e 100% estatico e pode ser editado a mao.
   O gerador existe so para nao ter que repetir menu/rodape em 19 paginas.
   Se voce editar um .html direto, lembre que rodar o build sobrescreve.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT, '_src', 'pages');

const { head, header, footer } = require(path.join(ROOT, '_src', 'layout'));
const { SITE, SERVICES, EVENT } = require(path.join(ROOT, '_src', 'site'));

/* -------------------------------------------------------------- helpers */
function write(file, html) {
  fs.writeFileSync(path.join(ROOT, file), html, 'utf8');
  const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
  console.log('  ' + file.padEnd(42) + kb + ' KB');
}

function render(mod) {
  const pages = typeof mod === 'function' ? mod() : mod;
  return Array.isArray(pages) ? pages : [pages];
}

/* ---------------------------------------------------------------- build */
console.log('\nSolute RH — gerando paginas\n');

if (!fs.existsSync(PAGES_DIR)) {
  console.error('Pasta _src/pages nao encontrada.');
  process.exit(1);
}

const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith('.js')).sort();
let total = 0;
const semIndice = ['404.html'];   // paginas que nao entram no sitemap

files.forEach((f) => {
  delete require.cache[require.resolve(path.join(PAGES_DIR, f))];
  const mod = require(path.join(PAGES_DIR, f));
  render(mod).forEach((page) => {
    if (page.meta.skip) return;
    const html = head(page.meta) + header(page.meta) + page.body + footer();
    write(page.meta.file, html);
    // quem pede noindex nao deve aparecer no sitemap
    if (page.meta.noindex) semIndice.push(page.meta.file);
    total++;
  });
});

/* ------------------------------------------------------------- sitemap */
const urls = [];
fs.readdirSync(ROOT)
  .filter((f) => f.endsWith('.html') && semIndice.indexOf(f) === -1)
  .sort()
  .forEach((f) => {
    if (!EVENT.enabled && f === 'evento.html') return;
    const loc = SITE.url + '/' + (f === 'index.html' ? '' : f);
    let priority = '0.7';
    if (f === 'index.html') priority = '1.0';
    else if (['consultoria.html', 'cursos.html', 'contato.html', 'quem-somos.html'].includes(f)) priority = '0.9';
    else if (f === 'politica-de-privacidade.html') priority = '0.3';
    urls.push(
      `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    );
  });

write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
);

/* -------------------------------------------------------------- robots */
write(
  'robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`
);

/* ---------------------------------------------------------- webmanifest */
write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: SITE.legal,
      short_name: SITE.name,
      description: SITE.tagline,
      start_url: '/',
      display: 'standalone',
      background_color: '#0A0A0C',
      theme_color: '#0A0A0C',
      lang: 'pt-BR',
      icons: [
        { src: '/media/favicon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/media/favicon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/media/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2
  ) + '\n'
);

console.log(
  `\n${total} paginas geradas · ${SERVICES.length} servicos · evento ${EVENT.enabled ? 'ATIVO' : 'desativado'}\n`
);
