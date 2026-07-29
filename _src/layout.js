/* =============================================================================
   SOLUTE RH - layout compartilhado (head, header, drawer, footer)
   ========================================================================== */

const { SITE, SERVICES, COURSES, TRAININGS, NAV, EVENT } = require('./site');
const { icon } = require('./icons');

const wa = (text) =>
  'https://wa.me/' + SITE.phoneRaw + '?text=' + encodeURIComponent(text || SITE.waText);

/* ---------------------------------------------------------------- <head> */
function head(meta) {
  const title = meta.title;
  const desc = meta.description;
  const canonical = SITE.url + '/' + (meta.file === 'index.html' ? '' : meta.file);
  const ogImage = SITE.url + '/media/' + (meta.ogImage || 'og-default.jpg');

  const schema = meta.schema ? JSON.stringify(meta.schema, null, 2) : null;

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#0A0A0C">
<meta name="author" content="${SITE.legal}">
${meta.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${canonical}">

<!-- Open Graph -->
<meta property="og:type" content="${meta.ogType || 'website'}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImage}">

<!-- Icones -->
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" href="media/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="media/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">

<!-- Fontes auto-hospedadas -->
<link rel="preload" href="fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="fonts/fonts.css">
<link rel="stylesheet" href="css/style.css">

<!-- Sem JS o conteudo continua visivel: desliga as animacoes de entrada -->
<noscript><style>
  [data-reveal],.split-word,.split-char{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}
  .veil::after{display:none}.veil>img,.veil>video{transform:none!important}
  .preloader{display:none}.mark::after{transform:scaleX(1)!important}
  .drawer{display:none}.steps__progress{height:100%!important}
</style></noscript>
${meta.preload ? meta.preload.map((p) => `<link rel="preload" href="${p.href}" as="${p.as}"${p.type ? ` type="${p.type}"` : ''}>`).join('\n') : ''}
${schema ? `<script type="application/ld+json">\n${schema}\n</script>` : ''}
</head>
<body${meta.bodyClass ? ` class="${meta.bodyClass}"` : ''}${meta.bodyAttrs || ''}>

<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

<div class="preloader" role="status" aria-label="Carregando">
  <img class="preloader__mark" src="media/simbolo-solute-laranja.svg" alt="" width="96" height="96">
  <div class="preloader__bar"><span></span></div>
</div>

<div class="progress-bar" aria-hidden="true"></div>
`;
}

/* --------------------------------------------------------------- ANUNCIO */
function announceBar() {
  if (!EVENT.enabled) return '';
  return `
<div class="announce" data-announce-id="${EVENT.id}">
  <div class="announce__inner">
    ${icon('sparkles')}
    <span>${EVENT.announceText}</span>
    <a href="${EVENT.page}">Saiba mais &rarr;</a>
  </div>
  <button class="announce__close" type="button" aria-label="Fechar aviso">${icon('close')}</button>
</div>`;
}

/* ---------------------------------------------------------------- HEADER */
/** Painel suspenso de um item do menu.
 *  'services' leva a paginas internas; 'courses' abre o site de cada curso
 *  em outra aba. */
function mega(tipo) {
  const itens = tipo === 'trainings'
    ? TRAININGS.map((x) => ({
        titulo: x.title,
        // quando o treinamento e o mesmo servico da consultoria, a descricao
        // vem de la para os dois menus dizerem a mesma coisa
        texto: x.short || (SERVICES.find((s) => s.slug === x.sameAs) || {}).short || '',
        href: 'treinamentos.html#' + x.slug,
        icone: x.icon,
        externo: false,
      }))
    : tipo === 'courses'
    ? COURSES.map((c) => ({
        titulo: c.title,
        texto: c.short || '',
        href: c.url || 'cursos.html',
        icone: c.icon || 'book',
        externo: !!c.url,
      }))
    : SERVICES.map((s) => ({
        titulo: s.nav,
        texto: s.short,
        href: 'consultoria-' + s.slug + '.html',
        icone: s.icon,
        externo: false,
      }));

  const cells = itens.map(
    (i) => `
        <a class="mega__link" href="${i.href}"${i.externo ? ' target="_blank"' : ''}>
          <span class="mega__ico">${icon(i.icone)}</span>
          <span class="mega__txt">
            <strong>${i.titulo}</strong>
            <span>${i.texto}</span>
          </span>
        </a>`
  ).join('');

  const rodape = tipo === 'trainings'
    ? { nota: 'Todos os formatos são fechados e montados sob a realidade da sua empresa.',
        label: 'Ver todos os treinamentos', href: 'treinamentos.html' }
    : tipo === 'courses'
    ? { nota: 'Não sabe qual curso combina com o seu momento? A gente ajuda a escolher.',
        label: 'Ver todos os cursos', href: 'cursos.html' }
    : { nota: 'Não sabe por onde começar? O diagnóstico gratuito aponta a prioridade.',
        label: 'Ver toda a consultoria', href: 'consultoria.html' };

  return `
      <div class="mega" role="menu">
        <div class="mega__grid">${cells}
        </div>
        <div class="mega__foot">
          <span>${rodape.nota}</span>
          <a class="link-arrow" href="${rodape.href}">${rodape.label} ${icon('arrow')}</a>
        </div>
      </div>`;
}

function header(meta) {
  const navItems = NAV.map((n) => {
    const current = meta.page === n.page ? ' aria-current="page"' : '';
    if (n.mega) {
      return `
    <li class="nav__item nav__item--has-mega">
      <a class="nav__link" href="${n.href}" data-page="${n.page}"${current} aria-expanded="false" aria-haspopup="true">
        ${n.label}
        <svg class="nav__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </a>${mega(n.mega)}
    </li>`;
    }
    return `
    <li class="nav__item"><a class="nav__link" href="${n.href}" data-page="${n.page}"${current}>${n.label}</a></li>`;
  }).join('');

  const drawerItems = NAV.map((n) => {
    if (n.mega) {
      const subs = n.mega === 'trainings'
        ? TRAININGS.map((x) =>
            `<a href="treinamentos.html#${x.slug}">${x.title}</a>`
          ).join('\n')
        : n.mega === 'courses'
        ? COURSES.map((c) =>
            `<a href="${c.url || 'cursos.html'}"${c.url ? ' target="_blank"' : ''}>${c.title}</a>`
          ).join('\n            ')
        : SERVICES.map((s) =>
            `<a href="consultoria-${s.slug}.html">${s.nav}</a>`
          ).join('\n            ');
      const verTudo = n.mega === 'trainings'
        ? '<a href="treinamentos.html"><strong>Ver todos os treinamentos</strong></a>'
        : n.mega === 'courses'
        ? '<a href="cursos.html"><strong>Ver todos os cursos</strong></a>'
        : '<a href="consultoria.html"><strong>Ver tudo em Consultoria</strong></a>';
      return `
      <li class="drawer__item drawer__item--has-sub">
        <button class="drawer__link" type="button" aria-expanded="false">
          ${n.label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="drawer__sub">
          <div>
            ${verTudo}
            ${subs}
          </div>
        </div>
      </li>`;
    }
    return `
      <li class="drawer__item"><a class="drawer__link" href="${n.href}">${n.label}</a></li>`;
  }).join('');

  return `${announceBar()}
<header class="header">
  <div class="header__inner">
    <a class="brand" href="index.html" aria-label="${SITE.name}, página inicial">
      <img src="media/logo-solute-branca.svg" alt="${SITE.name}" width="356" height="164">
    </a>

    <nav class="nav" aria-label="Navegação principal">
      <ul class="nav__list">${navItems}
      </ul>
    </nav>

    <div class="header__actions">
      <a class="btn btn--primary btn--sm" href="${wa()}" target="_blank" data-magnetic="0.2">
        Diagnóstico gratuito ${icon('arrow')}
      </a>
      <button class="burger" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-mobile">
        <span class="burger__bars" aria-hidden="true"><i></i><i></i><i></i></span>
        <img class="burger__close" src="media/botao-fechar-branco.png" alt="" width="64" height="64">
      </button>
    </div>
  </div>
</header>

<div class="drawer" id="menu-mobile">
  <nav aria-label="Navegação mobile">
    <ul class="drawer__list">${drawerItems}
    </ul>
  </nav>
  <div class="drawer__foot">
    <a class="btn btn--primary btn--block" href="${wa()}" target="_blank">
      Diagnóstico gratuito ${icon('arrow')}
    </a>
    <div class="drawer__contact">
      <a href="tel:+${SITE.phoneRaw}">${icon('phone')}<span>${SITE.phone}</span></a>
      <a href="mailto:${SITE.email}">${icon('mail')}<span>${SITE.email}</span></a>
    </div>
    ${socials()}
  </div>
</div>
`;
}

/* --------------------------------------------------------------- SOCIAIS */
function socials(cls) {
  return `<div class="socials${cls ? ' ' + cls : ''}">
    <a class="social" href="${SITE.social.instagram}" target="_blank" aria-label="Instagram da Solute RH">${icon('instagram')}</a>
    <a class="social" href="${SITE.social.linkedin}" target="_blank" aria-label="LinkedIn da Solute RH">${icon('linkedin')}</a>
    <a class="social" href="${SITE.social.youtube}" target="_blank" aria-label="YouTube da Solute RH">${icon('youtube')}</a>
    <a class="social" href="${wa()}" target="_blank" aria-label="WhatsApp da Solute RH">${icon('whatsapp')}</a>
  </div>`;
}

/* ---------------------------------------------------------------- FOOTER */
function footer() {
  const svcLinks = SERVICES.slice(0, 8)
    .map((s) => `<a href="consultoria-${s.slug}.html">${s.nav}</a>`)
    .join('\n        ');

  return `
<footer class="footer">
  <div class="wrap wrap--wide">
    <div class="footer__grid">

      <div class="footer__brand">
        <img src="media/logo-solute-branca.svg" alt="${SITE.name}" width="356" height="164">
        <p>${SITE.tagline}. Organizamos a gestão de pessoas com soluções personalizadas, líderes preparados e uma cultura alinhada aos objetivos do negócio.</p>
        ${socials()}
      </div>

      <div>
        <h2 class="footer__title">Consultoria</h2>
        <nav class="footer__links" aria-label="Serviços de consultoria">
        ${svcLinks}
        </nav>
      </div>

      <div>
        <h2 class="footer__title">Institucional</h2>
        <nav class="footer__links" aria-label="Links institucionais">
          <a href="quem-somos.html">Quem somos</a>
          <a href="consultoria.html">Consultoria</a>
          <a href="cursos.html">Solute Cursos</a>
          <a href="treinamentos.html">Treinamentos</a>
          <a href="clientes.html">Clientes</a>
          <a href="solute-cast.html">Solute Cast</a>
          <a href="contato.html">Contato</a>${EVENT.enabled ? `\n          <a href="${EVENT.page}">${EVENT.name}</a>` : ''}
          <a href="politica-de-privacidade.html">Política de Privacidade</a>
        </nav>
      </div>

      <div>
        <h2 class="footer__title">Fale com a gente</h2>
        <div class="footer__contact">
          <a href="${wa()}" target="_blank">${icon('whatsapp')}<span>${SITE.phone}<br><span class="dim" style="font-size:.82rem">WhatsApp · resposta no mesmo dia</span></span></a>
          <a href="mailto:${SITE.email}">${icon('mail')}<span>${SITE.email}</span></a>
          <p>${icon('pin')}<span>${SITE.address.street}<br>${SITE.address.district}, ${SITE.address.city} / ${SITE.address.state}</span></p>
          <p>${icon('clock')}<span>Segunda a quinta, das 08h às 18h<br>Sexta, das 08h às 17h</span></p>
        </div>
      </div>

    </div>
  </div>

  <div class="wrap wrap--wide">
    <div class="footer__bar">
      <span>&copy; <span data-year>2026</span> ${SITE.legal} · CNPJ ${SITE.cnpj}</span>
      <nav class="footer__legal" aria-label="Links legais">
        <a href="politica-de-privacidade.html">Política de Privacidade</a>
        <a href="contato.html">Contato</a>
      </nav>
    </div>
  </div>

  <span class="footer__watermark" aria-hidden="true">SOLUTE RH</span>
</footer>

<a class="wa-float" href="${wa()}" target="_blank" aria-label="Falar no WhatsApp">
  <img src="media/whatsapp-colorido.png" alt="" width="26" height="26">
  <span>Fale com a gente</span>
</a>

<button class="to-top" type="button" aria-label="Voltar ao topo">${icon('arrowUp')}</button>

<script src="js/main.js" defer></script>
</body>
</html>
`;
}

module.exports = { head, header, footer, socials, wa };
