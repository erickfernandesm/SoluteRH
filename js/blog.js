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
    whats: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2A9.8 9.8 0 003.6 17l-1.4 5.1 5.2-1.4A9.8 9.8 0 1012 2.2zm0 17.9c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.1 8.1 0 1111.4 2.9 8 8 0 01-4.3 1z"/></svg>',
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
