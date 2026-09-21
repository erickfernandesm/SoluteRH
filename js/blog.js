/* =============================================================================
   SOLUTE RH — motor do blog
   -----------------------------------------------------------------------------
   Le os posts de uma fonte JSON (arquivo local ou API do sistema Solute) e
   renderiza:
     · blog.html            -> feed em formato de rede social
     · post.html?post=slug  -> o artigo completo

   Cada item do feed pode ser publicacao (imagem), video ou carrossel, com
   titulo, descricao, autor, data, categoria e botao opcional.

   Para trocar a origem dos posts, mude BLOG.source em _src/site.js.
   Formato do JSON: veja _docs/BLOG.md
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));

  const root = document.body;
  const SOURCE   = root.dataset.blogSource || 'data/posts.json';
  const PER_PAGE = parseInt(root.dataset.blogPerPage || '6', 10);
  const FALLBACK = root.dataset.blogFallback || '';
  const AUTHOR   = root.dataset.blogAuthor || 'Solute RH';
  const AVATAR   = root.dataset.blogAvatar || '';

  /* ==========================================================================
     SANITIZACAO
     O corpo do post vem como HTML. Mesmo sendo conteudo proprio, filtramos por
     lista de permissao para que um erro no sistema (ou um trecho colado de
     fora) nunca consiga injetar script na pagina.
     ====================================================================== */
  const ALLOWED_TAGS = {
    P: [], BR: [], STRONG: [], B: [], EM: [], I: [], U: [], S: [], SMALL: [],
    H2: ['id'], H3: ['id'], H4: ['id'],
    UL: [], OL: [], LI: [], BLOCKQUOTE: [], HR: [],
    A: ['href', 'title', 'target', 'rel'],
    IMG: ['src', 'alt', 'width', 'height', 'loading'],
    FIGURE: [], FIGCAPTION: [], CODE: [], PRE: [],
    TABLE: [], THEAD: [], TBODY: [], TR: [], TH: [], TD: [],
    IFRAME: ['src', 'title', 'allow', 'allowfullscreen', 'width', 'height', 'frameborder'],
    VIDEO: ['src', 'poster', 'controls', 'muted', 'loop', 'playsinline', 'preload'],
    SOURCE: ['src', 'type'],
    SPAN: [], DIV: [],
  };

  const SAFE_IFRAME_HOSTS = [
    'www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com',
    'player.vimeo.com', 'open.spotify.com', 'www.google.com',
  ];

  function safeUrl(value) {
    if (!value) return null;
    const v = String(value).trim();
    if (/^javascript:/i.test(v) || /^data:(?!image\/)/i.test(v)) return null;
    return v;
  }

  function sanitize(html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = String(html || '');

    const walk = (node) => {
      Array.prototype.slice.call(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) return;                       // texto: ok
        if (child.nodeType !== 1) { child.remove(); return; }    // comentario etc.

        const tag = child.tagName;
        if (!Object.prototype.hasOwnProperty.call(ALLOWED_TAGS, tag)) {
          // tag nao permitida: preserva o texto interno e descarta a tag
          const frag = document.createDocumentFragment();
          while (child.firstChild) frag.appendChild(child.firstChild);
          child.replaceWith(frag);
          walk(node);
          return;
        }

        const allowed = ALLOWED_TAGS[tag];
        Array.prototype.slice.call(child.attributes).forEach((attr) => {
          const name = attr.name.toLowerCase();
          if (name.indexOf('on') === 0 || allowed.indexOf(name) === -1) {
            child.removeAttribute(attr.name);
            return;
          }
          if (name === 'href' || name === 'src') {
            const url = safeUrl(attr.value);
            if (!url) { child.removeAttribute(attr.name); return; }
            if (tag === 'IFRAME') {
              let host = '';
              try { host = new URL(url, location.href).hostname; } catch (e) { host = ''; }
              if (SAFE_IFRAME_HOSTS.indexOf(host) === -1) { child.remove(); return; }
            }
            child.setAttribute(attr.name, url);
          }
        });

        if (tag === 'A' && child.getAttribute('target') === '_blank') {
          child.setAttribute('rel', 'noopener noreferrer');
        }
        if (tag === 'IMG') {
          child.setAttribute('loading', 'lazy');
          if (!child.getAttribute('alt')) child.setAttribute('alt', '');
        }
        walk(child);
      });
    };

    walk(tpl.content);
    return tpl.innerHTML;
  }

  const esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ==========================================================================
     UTILITARIOS
     ====================================================================== */
  const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  function parseDate(v) {
    if (!v) return null;
    const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(v) ? v + 'T12:00:00' : v);
    return isNaN(d.getTime()) ? null : d;
  }

  function fmtDate(v) {
    const d = parseDate(v);
    if (!d) return '';
    return d.getDate() + ' de ' + MESES[d.getMonth()] + '. de ' + d.getFullYear();
  }

  function readingTime(post) {
    if (post.readingMinutes) return post.readingMinutes;
    const text = String(post.body || post.excerpt || '').replace(/<[^>]+>/g, ' ');
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }

  /** publicacao, video ou carrossel: deduz pelo conteudo quando nao vier declarado */
  function kindOf(p) {
    if (p.type) return p.type;
    if (p.images && p.images.length > 1) return 'carousel';
    if (p.video) return 'video';
    return 'post';
  }

  function ytId(v) {
    if (!v) return '';
    if (typeof v === 'object' && v.type === 'youtube' && v.id) return v.id;
    const s = typeof v === 'string' ? v : (v.url || '');
    const m = String(s).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
    return m ? m[1] : '';
  }

  function mp4Of(v) {
    if (!v) return '';
    if (typeof v === 'string') return /\.(mp4|webm)(\?|$)/i.test(v) ? v : '';
    if ((v.type === 'mp4' || v.type === 'video') && v.src) return v.src;
    if (v.url && /\.(mp4|webm)(\?|$)/i.test(v.url)) return v.url;
    return '';
  }

  /* ---------------------------------------------------------------- icones */
  const SVG = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7"/></svg>',
    whats: '<svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path transform="translate(373,26)" d="M0 0 C0.7 0.3 1.4 0.7 2.2 1.1 C22.3 11.0 40.1 24.2 57 39 C57.5 39.4 58.0 39.8 58.5 40.3 C63.7 44.9 68.7 49.6 73.2 54.9 C74.4 56.3 75.6 57.7 76.9 59.0 C121.1 105.9 141.0 171.7 139.1 235.2 C136.4 296.3 110.5 352.1 69.1 396.5 C68.8 396.8 68.8 396.8 67.3 398.5 C63.1 402.9 58.6 407.0 54 411 C53.5 411.4 53.5 411.4 51.1 413.4 C16.8 442.7 -25.4 462.5 -70 470 C-70.9 470.1 -71.8 470.3 -72.8 470.4 C-99.7 474.8 -128.1 474.6 -155 470 C-155.4 469.9 -155.4 469.9 -157.8 469.5 C-179.8 465.6 -202.6 458.7 -222.2 447.9 C-223.0 447.5 -223.8 447.1 -224.5 446.7 C-225.2 446.3 -225.8 446.0 -226.5 445.6 C-235.1 443.4 -244.6 447.8 -252.7 450.5 C-254.1 451 -255.6 451.4 -257.1 451.9 C-260.1 452.9 -263.2 453.9 -266.3 454.9 C-271.2 456.5 -276.0 458.0 -280.9 459.6 C-286.6 461.4 -292.3 463.3 -298.1 465.1 C-311.2 469.4 -324.4 473.6 -337.6 477.8 C-341.1 478.9 -344.5 480.0 -348.0 481.1 C-350.0 481.7 -352.1 482.4 -354.2 483.0 C-355.1 483.3 -356.0 483.6 -357.0 484 C-357.4 484.1 -357.4 484.1 -359.6 484.8 C-360.3 485.0 -361.0 485.2 -361.8 485.5 C-364.3 486.0 -366.4 486.1 -369 486 C-371.3 484.5 -371.3 484.5 -373 482 C-372.6 475.7 -371 470.3 -368.9 464.4 C-368.6 463.5 -368.3 462.6 -368.0 461.6 C-367.0 458.6 -366 455.6 -364.9 452.5 C-364.2 450.4 -363.5 448.3 -362.8 446.2 C-360.9 440.5 -359.0 434.9 -357.1 429.3 C-355.5 424.8 -354.0 420.3 -352.5 415.8 C-349.6 407.3 -346.7 398.8 -343.9 390.3 C-343.2 388.4 -342.6 386.5 -341.9 384.6 C-340.2 379.6 -338.5 374.6 -336.6 369.6 C-336.3 368.6 -335.9 367.6 -335.5 366.5 C-334.8 364.5 -334.1 362.5 -333.3 360.6 C-331.4 355.3 -330.5 351.6 -332 346 C-333.2 343.4 -334.5 341.0 -335.9 338.6 C-366.7 282.8 -371.7 213.9 -354.3 153.1 C-342.8 114.9 -322.6 80.7 -295 52 C-294.4 51.3 -293.8 50.7 -293.1 50.1 C-284.8 41.4 -276.3 33.4 -266.7 26.2 C-264.9 24.9 -263.2 23.6 -261.5 22.3 C-187.7 -34.5 -82.4 -40.7 0 0 Z M-245.6 76.8 C-247.9 78.9 -250.3 81 -252.6 83.0 C-256.8 86.7 -260.4 90.7 -264 95 C-264.4 95.4 -264.8 95.9 -265.2 96.4 C-279.2 112.8 -290 131.0 -298 151 C-298.2 151.7 -298.5 152.4 -298.8 153.1 C-303.4 164.8 -306.4 176.7 -309 189 C-309.2 190.1 -309.4 191.2 -309.7 192.3 C-318.3 239.6 -306.2 290.7 -280.2 330.6 C-279.8 331.2 -279.4 331.7 -279.1 332.3 C-278.0 333.9 -276.8 335.4 -275.7 336.9 C-273.1 341.4 -273.4 345.5 -274.6 350.4 C-275.4 353.2 -276.3 355.9 -277.3 358.6 C-277.7 359.6 -278.0 360.6 -278.4 361.6 C-279.5 364.8 -280.6 368.0 -281.7 371.2 C-282.4 373.3 -283.2 375.5 -283.9 377.6 C-286.4 384.7 -288.9 391.9 -291.4 399.0 C-291.8 400.1 -292.1 401.2 -292.5 402.3 C-292.8 403.2 -293.1 404.1 -293.5 405.0 C-294 407 -294 407 -293 409 C-292.2 408.7 -291.4 408.5 -290.6 408.2 C-283.3 405.9 -275.9 403.5 -268.6 401.2 C-264.8 400.0 -261.0 398.8 -257.2 397.6 C-253.6 396.4 -250.0 395.3 -246.3 394.1 C-244.9 393.7 -243.5 393.2 -242.2 392.8 C-240.2 392.1 -238.3 391.5 -236.3 390.9 C-235.8 390.7 -235.8 390.7 -232.9 389.8 C-225 387.5 -225 387.5 -220.5 389.9 C-219.6 390.4 -218.8 390.8 -217.9 391.3 C-215.9 392.4 -213.9 393.6 -211.9 394.8 C-188.9 408.4 -163.5 416.8 -137 420 C-136.3 420.0 -135.6 420.1 -134.9 420.2 C-100.8 424.7 -64.2 419.1 -33 405 C-32.3 404.7 -31.6 404.4 -30.9 404.1 C15.9 383.5 53.9 344.1 72.9 296.5 C87.8 257.9 91.5 216.2 81 176 C80.8 175.4 80.8 175.4 80.0 172.3 C71.9 142.5 57.2 112.0 34.6 90.5 C32.8 88.8 31.2 87.0 29.6 85.1 C6.7 58.8 -26.2 42.9 -59 33 C-59.6 32.7 -60.3 32.5 -61.1 32.3 C-124.2 13.5 -197.5 32.4 -245.6 76.8 Z "/><path transform="translate(202.8,136.1)" d="M0 0 C4.9 6.5 8.4 13.2 11.5 20.8 C11.9 21.7 12.3 22.7 12.7 23.6 C13.5 25.6 14.3 27.5 15.1 29.5 C16.3 32.5 17.6 35.4 18.8 38.4 C19.6 40.3 20.4 42.2 21.2 44.1 C21.4 44.6 21.4 44.6 22.3 46.8 C28.3 61.4 28.3 61.4 26.1 69.8 C22.8 77.7 17.7 83.9 11.6 89.7 C8.2 93.2 8.2 93.2 8.1 96.3 C9.4 99.5 11.3 102.2 13.5 104.9 C13.7 105.2 13.7 105.2 14.9 106.6 C21.1 114.5 28.0 121.7 35.1 128.8 C35.5 129.2 35.5 129.2 37.4 131.2 C50.4 144.7 69.5 160.1 88.1 164.8 C91.1 164.7 92.0 164.0 94.1 161.8 C94.8 160.9 95.5 160.1 96.2 159.1 C97.0 158.2 97.8 157.2 98.6 156.2 C99.4 155.1 100.3 153.9 101.1 152.8 C102.6 151 104.0 149.1 105.5 147.2 C106.5 146.0 107.4 144.7 108.3 143.5 C111.6 139.3 114.1 136.5 119.1 134.8 C133.0 133.9 147.8 144.0 160.1 149.9 C160.8 150.2 161.5 150.6 162.3 150.9 C186.2 162.5 186.2 162.5 188.1 167.8 C189.4 182.0 188.2 197.2 179.1 208.8 C178.5 209.6 177.9 210.4 177.3 211.3 C171.3 218.4 163.1 223.1 154.9 227.3 C154.2 227.6 153.6 227.9 152.9 228.3 C129.4 239.7 101.8 231.5 78.5 223.6 C50.3 213.8 26.4 199.6 4.1 179.8 C3.9 179.6 3.9 179.6 2.5 178.4 C-2.9 173.5 -8.3 168.6 -13.0 162.9 C-14.3 161.4 -15.6 160.0 -16.9 158.6 C-25.4 149.7 -32.5 139.8 -39.8 129.8 C-40.3 129.1 -40.8 128.4 -41.4 127.7 C-59.2 103.1 -71.8 76.3 -67.6 45.3 C-64.9 29 -57.5 13.6 -44.0 3.5 C-33.1 -2.7 -10.6 -8.0 0 0 Z "/></svg>',
    typePost: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M3 16l5-4 4 3 3-2 6 5"/></svg>',
    typeVideo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 8.5l-6 3.5 6 3.5v-7z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
    typeCarousel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="4" width="14" height="14" rx="2"/><path d="M3 8v10a2 2 0 002 2h10"/></svg>',
  };

  const TYPE_ICON = { post: SVG.typePost, video: SVG.typeVideo, carousel: SVG.typeCarousel };
  const TYPE_NAME = { post: 'Publicação', video: 'Vídeo', carousel: 'Carrossel' };

  /* ==========================================================================
     CARREGAMENTO
     ====================================================================== */
  function normalize(raw) {
    let list = [];
    if (Array.isArray(raw)) list = raw;
    else if (raw && Array.isArray(raw.posts)) list = raw.posts;
    else if (raw && Array.isArray(raw.data)) list = raw.data;
    else if (raw && Array.isArray(raw.items)) list = raw.items;

    return list
      .filter((p) => p && p.title && p.published !== false)
      .map((p, i) => ({
        slug: p.slug || p.id || ('post-' + i),
        title: p.title,
        excerpt: p.excerpt || p.summary || p.resumo || '',
        cover: p.cover || p.image || p.thumbnail || '',
        coverAlt: p.coverAlt || '',
        images: Array.isArray(p.images) ? p.images.filter(Boolean) : [],
        date: p.date || p.publishedAt || p.created_at || '',
        updated: p.updated || p.updatedAt || '',
        author: p.author || p.autor || AUTHOR,
        authorPhoto: p.authorPhoto || p.avatar || '',
        category: p.category || p.categoria || 'RH',
        tags: p.tags || [],
        readingMinutes: p.readingMinutes || p.readTime || 0,
        video: p.video || null,
        button: p.button || p.botao || null,
        type: p.type || '',
        link: p.link || p.url || '',
        body: p.body || p.content || p.conteudo || '',
        featured: !!p.featured,
      }))
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        const da = parseDate(a.date), db = parseDate(b.date);
        return (db ? db.getTime() : 0) - (da ? da.getTime() : 0);
      });
  }

  function load() {
    return fetch(SOURCE, { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(normalize);
  }

  function showError(host, msg) {
    host.innerHTML =
      '<div class="blog-empty">' +
      '<p class="blog-empty__title">Não foi possível carregar as publicações agora</p>' +
      '<p class="muted">' + esc(msg) + '</p>' +
      '<p class="muted" style="margin-top:1rem">Tente recarregar a página em instantes ou ' +
      '<a class="link-arrow" href="contato.html">fale com a gente</a>.</p></div>';
  }

  /* ==========================================================================
     FEED (blog.html)
     ====================================================================== */
  function initList() {
    const host = $('[data-blog-list]');
    if (!host) return;

    const filtersHost = $('[data-blog-filters]');
    const searchInput = $('[data-blog-search]');
    const moreBtn = $('[data-blog-more]');
    const countEl = $('[data-blog-count]');

    let all = [], view = [], shown = 0, cat = 'todas', term = '';

    function matches(p) {
      if (cat !== 'todas' && p.category !== cat) return false;
      const t = term.trim().toLowerCase();
      if (!t) return true;
      return (
        p.title.toLowerCase().indexOf(t) > -1 ||
        String(p.excerpt).toLowerCase().indexOf(t) > -1 ||
        (p.tags || []).join(' ').toLowerCase().indexOf(t) > -1
      );
    }

    /* ------------------------------------------------------------ midia */
    function media(p, url, ext) {
      const kind = kindOf(p);
      const openAttrs = ext ? ' target="_blank" rel="noopener noreferrer"' : '';

      if (kind === 'carousel' && p.images.length) {
        const slides = p.images.map((src, i) =>
          '<img src="' + esc(src) + '" alt="' + esc(p.coverAlt || p.title) +
          ' (' + (i + 1) + ' de ' + p.images.length + ')" loading="lazy" decoding="async">'
        ).join('');
        const dots = p.images.map((_, i) => '<i' + (i === 0 ? ' class="is-on"' : '') + '></i>').join('');
        return (
          '<div class="post-item__media carousel" data-carousel>' +
            '<div class="carousel__track" data-carousel-track>' + slides + '</div>' +
            '<span class="carousel__count" data-carousel-count>1/' + p.images.length + '</span>' +
            '<button class="carousel__btn carousel__btn--prev" type="button" data-carousel-prev aria-label="Imagem anterior">' + SVG.prev + '</button>' +
            '<button class="carousel__btn carousel__btn--next" type="button" data-carousel-next aria-label="Próxima imagem">' + SVG.next + '</button>' +
            '<span class="carousel__dots" data-carousel-dots aria-hidden="true">' + dots + '</span>' +
          '</div>'
        );
      }

      if (kind === 'video') {
        const yt = ytId(p.video);
        if (yt) {
          return (
            '<div class="post-item__media post-item__media--embed">' +
              '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(yt) +
              '" title="' + esc(p.title) + '" loading="lazy" allowfullscreen ' +
              'allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"></iframe>' +
            '</div>'
          );
        }
        const mp4 = mp4Of(p.video);
        if (mp4) {
          return (
            '<div class="post-item__media">' +
              '<video src="' + esc(mp4) + '"' + (p.cover ? ' poster="' + esc(p.cover) + '"' : '') +
              ' controls playsinline preload="metadata"></video>' +
            '</div>'
          );
        }
      }

      const cover = p.cover || p.images[0] || FALLBACK;
      if (!cover) return '';
      return (
        '<a class="post-item__media" href="' + url + '"' + openAttrs + '>' +
          '<img src="' + esc(cover) + '" alt="' + esc(p.coverAlt || p.title) + '" loading="lazy" decoding="async">' +
        '</a>'
      );
    }

    /* ------------------------------------------------------------- card */
    function card(p) {
      const kind = kindOf(p);
      const internal = 'post.html?post=' + encodeURIComponent(p.slug);
      const ext = !p.body && p.link;
      const url = ext ? esc(p.link) : internal;
      const openAttrs = ext ? ' target="_blank" rel="noopener noreferrer"' : '';
      const avatar = p.authorPhoto || AVATAR;

      const btn = p.button && p.button.url
        ? '<a class="btn btn--primary btn--sm" href="' + esc(p.button.url) + '" target="_blank" rel="noopener noreferrer">' +
            esc(p.button.label || 'Saiba mais') + SVG.arrow + '</a>'
        : '';

      const readLink = p.body
        ? '<a class="link-arrow" href="' + internal + '">Ler o artigo completo' + SVG.arrow + '</a>'
        : (ext ? '<a class="link-arrow" href="' + url + '" target="_blank" rel="noopener noreferrer">Abrir' + SVG.arrow + '</a>' : '');

      const tags = (p.tags && p.tags.length)
        ? '<div class="post-item__tags">' + p.tags.slice(0, 4).map((x) => '<span>' + esc(x) + '</span>').join('') + '</div>'
        : '';

      const shareUrl = location.origin + location.pathname.replace(/[^/]*$/, '') + internal;

      return (
        '<article class="post-item" data-reveal="up">' +

          '<header class="post-item__head">' +
            (avatar ? '<img class="post-item__avatar" src="' + esc(avatar) + '" alt="" width="42" height="42" loading="lazy">' : '') +
            '<span class="post-item__who">' +
              '<span class="post-item__author">' + esc(p.author) + '</span>' +
              '<span class="post-item__sub">' +
                (p.date ? '<time datetime="' + esc(p.date) + '">' + fmtDate(p.date) + '</time><i class="dot"></i>' : '') +
                '<span class="post-item__cat">' + esc(p.category) + '</span>' +
                (p.body ? '<i class="dot"></i><span>' + readingTime(p) + ' min de leitura</span>' : '') +
              '</span>' +
            '</span>' +
            '<span class="post-item__type" title="' + TYPE_NAME[kind] + '">' + (TYPE_ICON[kind] || SVG.typePost) + '</span>' +
          '</header>' +

          media(p, url, ext) +

          '<div class="post-item__body">' +
            (p.featured ? '<span style="display:inline-block;margin-bottom:.6rem;background:#f47a1f;color:#fff;font-size:.66rem;font-weight:800;letter-spacing:.08em;padding:.24rem .62rem;border-radius:999px;text-transform:uppercase">Destaque</span>' : '') +
            '<h2 class="post-item__title"><a href="' + url + '"' + openAttrs + '>' + esc(p.title) + '</a></h2>' +
            (p.excerpt ? '<p class="post-item__text">' + esc(p.excerpt) + '</p>' : '') +
            tags +
            ((btn || readLink)
              ? '<div class="post-item__foot">' +
                  '<div class="row" style="gap:.8rem">' + btn + readLink + '</div>' +
                  '<div class="post-item__actions">' +
                    '<a class="post-item__act" target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no WhatsApp" ' +
                      'href="https://wa.me/?text=' + encodeURIComponent(p.title + ' ' + shareUrl) + '">' + SVG.whats + '</a>' +
                    '<button class="post-item__act" type="button" data-copy="' + esc(shareUrl) + '" aria-label="Copiar link">' + SVG.link + '</button>' +
                  '</div>' +
                '</div>'
              : '') +
          '</div>' +
        '</article>'
      );
    }

    /* ------------------------------------------------------- renderizacao */
    function applyFilters() {
      view = all.filter(matches);
      shown = 0;
      host.innerHTML = '';
      render();
    }

    function render() {
      if (!view.length) {
        host.innerHTML =
          '<div class="blog-empty"><p class="blog-empty__title">Nenhuma publicação encontrada</p>' +
          '<p class="muted">Tente outra busca ou volte para todas as categorias.</p></div>';
        if (moreBtn) moreBtn.hidden = true;
        if (countEl) countEl.textContent = '0 publicações';
        return;
      }
      const slice = view.slice(shown, shown + PER_PAGE);
      host.insertAdjacentHTML('beforeend', slice.map(card).join(''));
      shown += slice.length;
      if (moreBtn) moreBtn.hidden = shown >= view.length;
      if (countEl) {
        countEl.textContent = view.length + (view.length === 1 ? ' publicação' : ' publicações');
      }
      bindCarousels(host);
      bindCopy(host);
      if (window.SoluteReveal) window.SoluteReveal();
    }

    function buildFilters() {
      if (!filtersHost) return;
      const cats = ['todas'].concat(
        all.map((p) => p.category).filter((c, i, a) => c && a.indexOf(c) === i).sort()
      );
      filtersHost.innerHTML = cats.map((c) =>
        '<button class="chip' + (c === 'todas' ? ' is-active' : '') + '" type="button" data-cat="' +
        esc(c) + '">' + (c === 'todas' ? 'Todas' : esc(c)) + '</button>'
      ).join('');
      $$('.chip', filtersHost).forEach((b) => {
        b.addEventListener('click', () => {
          $$('.chip', filtersHost).forEach((o) => o.classList.remove('is-active'));
          b.classList.add('is-active');
          cat = b.dataset.cat;
          applyFilters();
        });
      });
    }

    host.innerHTML = '<div class="blog-loading" role="status">Carregando publicações…</div>';

    load()
      .then((posts) => {
        all = posts;
        host.innerHTML = '';
        if (!all.length) {
          host.innerHTML =
            '<div class="blog-empty"><p class="blog-empty__title">Em breve, novas publicações por aqui</p>' +
            '<p class="muted">Estamos preparando os primeiros conteúdos. Enquanto isso, acompanhe o Solute Cast.</p>' +
            '<p style="margin-top:1.2rem"><a class="btn btn--ghost" href="solute-cast.html">Ver o Solute Cast</a></p></div>';
          if (moreBtn) moreBtn.hidden = true;
          return;
        }
        buildFilters();
        applyFilters();
      })
      .catch((err) => showError(host, err.message));

    if (searchInput) {
      let timer;
      searchInput.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => { term = searchInput.value; applyFilters(); }, 220);
      });
    }
    if (moreBtn) moreBtn.addEventListener('click', render);
  }

  /* ==========================================================================
     CARROSSEL — scroll-snap nativo (arrasta no celular) + setas e pontos
     ====================================================================== */
  function bindCarousels(scope) {
    $$('[data-carousel]:not([data-carousel-ready])', scope).forEach((box) => {
      box.setAttribute('data-carousel-ready', '');
      const track = $('[data-carousel-track]', box);
      const prev = $('[data-carousel-prev]', box);
      const next = $('[data-carousel-next]', box);
      const dots = $$('i', $('[data-carousel-dots]', box) || box);
      const count = $('[data-carousel-count]', box);
      const total = track ? track.children.length : 0;
      if (!track || total < 2) return;

      const indexNow = () => Math.round(track.scrollLeft / track.clientWidth);

      function sync() {
        const i = Math.min(total - 1, Math.max(0, indexNow()));
        dots.forEach((d, di) => d.classList.toggle('is-on', di === i));
        if (count) count.textContent = (i + 1) + '/' + total;
        if (prev) prev.disabled = i === 0;
        if (next) next.disabled = i === total - 1;
      }

      const go = (dir) => { track.scrollLeft += dir * track.clientWidth; };
      if (prev) prev.addEventListener('click', () => go(-1));
      if (next) next.addEventListener('click', () => go(1));

      let raf = null;
      track.addEventListener('scroll', () => {
        if (raf) return;
        raf = requestAnimationFrame(() => { raf = null; sync(); });
      }, { passive: true });

      // teclado, quando o carrossel recebe foco
      box.tabIndex = 0;
      box.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1); }
      });

      sync();
    });
  }

  /* -------------------------------------------------------- copiar o link */
  function bindCopy(scope) {
    $$('[data-copy]:not([data-copy-ready])', scope).forEach((btn) => {
      btn.setAttribute('data-copy-ready', '');
      btn.addEventListener('click', () => {
        const url = btn.dataset.copy || location.href;
        const done = () => {
          btn.style.color = 'var(--brand)';
          btn.setAttribute('aria-label', 'Link copiado');
          setTimeout(() => { btn.style.color = ''; btn.setAttribute('aria-label', 'Copiar link'); }, 1800);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(done).catch(() => {});
        else done();
      });
    });
  }

  /* ==========================================================================
     POST INDIVIDUAL (post.html?post=<slug>)
     ====================================================================== */
  function initPost() {
    const host = $('[data-blog-post]');
    if (!host) return;

    const slug = new URLSearchParams(location.search).get('post');
    if (!slug) { showError(host, 'Nenhum artigo indicado no endereço.'); return; }

    host.innerHTML = '<div class="blog-loading" role="status">Carregando artigo…</div>';

    load()
      .then((posts) => {
        const p = posts.find((x) => x.slug === slug);
        if (!p) {
          host.innerHTML =
            '<div class="blog-empty"><p class="blog-empty__title">Publicação não encontrada</p>' +
            '<p class="muted">Ela pode ter sido removida ou mudado de endereço.</p>' +
            '<p style="margin-top:1.2rem"><a class="btn btn--primary" href="blog.html">Ver todas as publicações</a></p></div>';
          return;
        }

        /* ---- SEO dinamico ---- */
        document.title = p.title + ' | Blog Solute RH';
        const setMeta = (sel, val) => {
          const el = document.querySelector(sel);
          if (el && val) el.setAttribute('content', val);
        };
        setMeta('meta[name="description"]', p.excerpt);
        setMeta('meta[property="og:title"]', p.title);
        setMeta('meta[property="og:description"]', p.excerpt);
        setMeta('meta[name="twitter:title"]', p.title);
        setMeta('meta[name="twitter:description"]', p.excerpt);
        const firstImg = p.cover || p.images[0];
        if (firstImg) {
          const abs = /^https?:/i.test(firstImg)
            ? firstImg
            : location.origin + '/' + String(firstImg).replace(/^\//, '');
          setMeta('meta[property="og:image"]', abs);
          setMeta('meta[name="twitter:image"]', abs);
        }
        const canon = document.querySelector('link[rel="canonical"]');
        if (canon) canon.setAttribute('href', location.origin + '/post.html?post=' + encodeURIComponent(p.slug));

        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.excerpt,
          image: firstImg || undefined,
          datePublished: p.date || undefined,
          dateModified: p.updated || p.date || undefined,
          author: { '@type': 'Person', name: p.author },
          publisher: { '@type': 'Organization', name: 'Solute Recursos Humanos' },
        });
        document.head.appendChild(ld);

        /* ---- midia do topo ---- */
        let topMedia = '';
        const yt = ytId(p.video);
        const mp4 = mp4Of(p.video);
        if (yt) {
          topMedia = '<div class="post__embed"><iframe src="https://www.youtube-nocookie.com/embed/' +
            encodeURIComponent(yt) + '" title="' + esc(p.title) + '" loading="lazy" allowfullscreen ' +
            'allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"></iframe></div>';
        } else if (mp4) {
          topMedia = '<div class="post__embed"><video src="' + esc(mp4) + '"' +
            (p.cover ? ' poster="' + esc(p.cover) + '"' : '') + ' controls playsinline preload="metadata"></video></div>';
        } else if (p.images.length > 1) {
          const slides = p.images.map((src, i) =>
            '<img src="' + esc(src) + '" alt="' + esc(p.coverAlt || p.title) + ' (' + (i + 1) + ')" loading="lazy">'
          ).join('');
          const dots = p.images.map((_, i) => '<i' + (i === 0 ? ' class="is-on"' : '') + '></i>').join('');
          topMedia =
            '<div class="post__cover carousel" data-carousel>' +
              '<div class="carousel__track" data-carousel-track>' + slides + '</div>' +
              '<span class="carousel__count" data-carousel-count>1/' + p.images.length + '</span>' +
              '<button class="carousel__btn carousel__btn--prev" type="button" data-carousel-prev aria-label="Imagem anterior">' + SVG.prev + '</button>' +
              '<button class="carousel__btn carousel__btn--next" type="button" data-carousel-next aria-label="Próxima imagem">' + SVG.next + '</button>' +
              '<span class="carousel__dots" data-carousel-dots aria-hidden="true">' + dots + '</span>' +
            '</div>';
        } else if (p.cover) {
          topMedia = '<figure class="post__cover veil is-revealed"><img src="' + esc(p.cover) +
            '" alt="' + esc(p.coverAlt || p.title) + '"></figure>';
        }

        const avatar = p.authorPhoto || AVATAR;
        const btn = p.button && p.button.url
          ? '<p style="margin-top:2rem"><a class="btn btn--primary btn--lg" href="' + esc(p.button.url) +
            '" target="_blank" rel="noopener noreferrer">' + esc(p.button.label || 'Saiba mais') + SVG.arrow + '</a></p>'
          : '';

        host.innerHTML =
          '<article class="post">' +
            '<header class="post__head">' +
              '<nav class="crumbs" aria-label="Você está aqui">' +
                '<a href="index.html">Início</a><span aria-hidden="true">/</span>' +
                '<a href="blog.html">Blog</a><span aria-hidden="true">/</span>' +
                '<span aria-current="page">' + esc(p.category) + '</span>' +
              '</nav>' +
              '<span class="tag tag--brand">' + esc(p.category) + '</span>' +
              '<h1 class="post__title">' + esc(p.title) + '</h1>' +
              (p.excerpt ? '<p class="lead post__excerpt">' + esc(p.excerpt) + '</p>' : '') +
              '<div class="post__meta">' +
                (avatar ? '<img class="post-item__avatar" src="' + esc(avatar) + '" alt="" width="42" height="42">' : '') +
                '<span>' + esc(p.author) + '</span>' +
                (p.date ? '<time datetime="' + esc(p.date) + '">' + fmtDate(p.date) + '</time>' : '') +
                (p.body ? '<span>' + readingTime(p) + ' min de leitura</span>' : '') +
              '</div>' +
            '</header>' +

            topMedia +

            (p.body ? '<div class="post__body prose">' + sanitize(p.body) + '</div>' : '') +
            btn +

            (p.link
              ? '<p class="post__source"><a class="link-arrow" href="' + esc(p.link) +
                '" target="_blank" rel="noopener noreferrer">Ver conteúdo original' + SVG.arrow + '</a></p>'
              : '') +

            (p.tags && p.tags.length
              ? '<div class="post__tags">' + p.tags.map((x) => '<span class="tag">' + esc(x) + '</span>').join('') + '</div>'
              : '') +

            '<footer class="post__share">' +
              '<span class="dim">Compartilhar:</span>' +
              '<a class="social" target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no WhatsApp" ' +
                'href="https://wa.me/?text=' + encodeURIComponent(p.title + ' ' + location.href) + '">' + SVG.whats + '</a>' +
              '<a class="social" target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no LinkedIn" ' +
                'href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(location.href) + '">' +
                '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.46 2.5h.03A2.5 2.5 0 007.5 6a2.5 2.5 0 00-2.52-2.5zM3 21h4V9.5H3V21zm7.5 0h4v-6.4c0-1.7.6-2.8 2-2.8 1.2 0 1.8.8 1.8 2.6V21h4v-7.2c0-3.4-1.8-5-4.2-5-1.9 0-2.8 1.1-3.3 1.9h.03V9.5H10.5c.05 1.1 0 11.5 0 11.5z"/></svg></a>' +
              '<button class="social" type="button" data-copy="' + esc(location.href) + '" aria-label="Copiar link">' + SVG.link + '</button>' +
            '</footer>' +
          '</article>';

        bindCarousels(host);
        bindCopy(host);

        /* ---- relacionados ---- */
        const relHost = $('[data-blog-related]');
        if (relHost) {
          const rel = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
          if (rel.length) {
            relHost.innerHTML = rel.map((r) => {
              const cov = r.cover || r.images[0] || FALLBACK;
              const href = 'post.html?post=' + encodeURIComponent(r.slug);
              return (
                '<article class="post-card" data-reveal="up">' +
                  (cov ? '<a class="post-card__media" href="' + href + '" tabindex="-1" aria-hidden="true">' +
                    '<img src="' + esc(cov) + '" alt="" loading="lazy"></a>' : '') +
                  '<div class="post-card__body">' +
                    '<div class="post-card__meta"><span class="tag tag--brand">' + esc(r.category) + '</span>' +
                    (r.date ? '<time datetime="' + esc(r.date) + '">' + fmtDate(r.date) + '</time>' : '') + '</div>' +
                    '<h3 class="post-card__title"><a href="' + href + '">' + esc(r.title) + '</a></h3>' +
                  '</div>' +
                '</article>'
              );
            }).join('');
            const wrap = relHost.closest('[data-blog-related-section]');
            if (wrap) wrap.hidden = false;
            if (window.SoluteReveal) window.SoluteReveal();
          }
        }
      })
      .catch((err) => showError(host, err.message));
  }

  /* ====================================================================== */
  function init() { initList(); initPost(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
