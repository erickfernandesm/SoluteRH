/* =============================================================================
   SOLUTE RH — engine de interacao e animacao
   Vanilla JS, zero dependencias. Tudo respeita prefers-reduced-motion.
   -----------------------------------------------------------------------------
   Modulos:
     preloader · header · megaMenu · drawer · reveal · splitText · counters
     parallax · cardGlow · magnetic · steps · slider · accordion
     progress · floaters · scrollSpy · marquee · heroMedia · forms · announce
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- utils */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  const on = (el, ev, fn, opt) => el && el.addEventListener(ev, fn, opt);

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOUCH   = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp  = (a, b, t) => a + (b - a) * t;

  /** rAF agendado — evita layout thrash em eventos de scroll/resize */
  function raf(fn) {
    let ticking = false;
    return function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; fn(); });
    };
  }

  /* ================================================================
     PRELOADER
     ================================================================ */
  function preloader() {
    const el = $('.preloader');
    if (!el) return;
    const hide = () => {
      el.classList.add('is-gone');
      document.body.classList.remove('is-locked');
      setTimeout(() => el.remove(), 800);
    };
    // some assim que a pagina carregar; teto de 2.2s pra nunca travar
    if (document.readyState === 'complete') setTimeout(hide, 260);
    else on(window, 'load', () => setTimeout(hide, 260));
    setTimeout(hide, 2200);
  }

  /* ================================================================
     HEADER — estado "grudado" + esconde ao descer
     ================================================================ */
  function header() {
    const el = $('.header');
    if (!el) return;
    let last = window.scrollY;

    const update = raf(() => {
      const y = window.scrollY;
      el.classList.toggle('is-stuck', y > 24);
      // so esconde depois de 460px e se o menu mobile estiver fechado
      const drawerOpen = document.body.classList.contains('is-locked');
      if (!drawerOpen && y > 460 && y > last + 6) el.classList.add('is-hidden');
      else if (y < last - 6 || y < 200) el.classList.remove('is-hidden');
      last = y;
    });

    on(window, 'scroll', update, { passive: true });
    update();
  }

  /* ================================================================
     MEGA MENU (desktop) — abre no hover e no foco por teclado
     ================================================================ */
  function megaMenu() {
    const items = $$('.nav__item--has-mega');
    if (!items.length) return;

    items.forEach((item) => {
      const trigger = $('.nav__link', item);
      const mega = $('.mega', item);
      if (!trigger || !mega) return;
      let timer;

      const open = () => {
        clearTimeout(timer);
        items.forEach((o) => o !== item && o.classList.remove('is-open'));
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      };
      const close = (delay) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        }, delay || 0);
      };

      on(item, 'mouseenter', open);
      on(item, 'mouseleave', () => close(110));
      on(trigger, 'focus', open);
      on(item, 'focusout', (e) => {
        if (!item.contains(e.relatedTarget)) close(0);
      });
      // no toque, o primeiro clique abre em vez de navegar
      on(trigger, 'click', (e) => {
        if (!TOUCH) return;
        if (!item.classList.contains('is-open')) { e.preventDefault(); open(); }
      });
    });

    on(document, 'keydown', (e) => {
      if (e.key !== 'Escape') return;
      items.forEach((i) => {
        i.classList.remove('is-open');
        const t = $('.nav__link', i);
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });

    on(document, 'click', (e) => {
      items.forEach((i) => {
        if (i.contains(e.target)) return;
        i.classList.remove('is-open');
        const t = $('.nav__link', i);
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ================================================================
     DRAWER MOBILE
     ================================================================ */
  function drawer() {
    const burger = $('.burger');
    const box = $('.drawer');
    if (!burger || !box) return;

    const links = $$('.drawer__link', box);

    const setStagger = (open) => {
      links.forEach((l, i) => {
        l.style.transitionDelay = open ? (0.11 + i * 0.055) + 's' : '0s';
      });
    };

    const toggle = (force) => {
      const open = force !== undefined ? force : !box.classList.contains('is-open');
      box.classList.toggle('is-open', open);
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('is-locked', open);
      setStagger(open);
      if (open) $('.header').classList.remove('is-hidden');
    };

    on(burger, 'click', () => toggle());
    on(document, 'keydown', (e) => { if (e.key === 'Escape') toggle(false); });

    // submenus (acordeao)
    $$('.drawer__item--has-sub', box).forEach((item) => {
      const btn = $('.drawer__link', item);
      on(btn, 'click', (e) => {
        e.preventDefault();
        const open = !item.classList.contains('is-open');
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      });
    });

    // fecha ao clicar em link real
    $$('a[href]', box).forEach((a) => {
      if (a.closest('.drawer__item--has-sub') && a.classList.contains('drawer__link')) return;
      on(a, 'click', () => toggle(false));
    });

    // fecha se voltar ao desktop
    on(window, 'resize', raf(() => {
      if (window.innerWidth > 980 && box.classList.contains('is-open')) toggle(false);
    }));
  }

  /* ================================================================
     REVEAL — IntersectionObserver + stagger declarativo
     data-reveal="up|fade|zoom|blur|clip|rise|left|right"
     data-reveal-delay="120"      (ms)
     data-stagger="90"            (no pai: escalona os filhos diretos)
     ================================================================ */
  function reveal() {
    let io = null;

    if (!REDUCED && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          if (entry.target.dataset.revealOnce !== 'false') io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -11% 0px', threshold: 0.06 });
    }

    /** Varre o documento e registra o que ainda nao foi observado.
     *  Exposto como window.SoluteReveal() para conteudo carregado depois
     *  (ex.: os cards do blog vindos do JSON). */
    function scan() {
      // aplica delays de stagger declarados no pai
      $$('[data-stagger]').forEach((parent) => {
        const step = parseFloat(parent.dataset.stagger) || 80;
        const start = parseFloat(parent.dataset.staggerStart) || 0;
        $$(':scope > [data-reveal]', parent).forEach((kid, i) => {
          if (kid.dataset.revealDelay) return;   // delay explicito vence
          kid.style.setProperty('--reveal-delay', (start + i * step) + 'ms');
        });
      });

      const nodes = $$('[data-reveal]:not([data-reveal-bound])')
        .concat($$('.veil:not([data-reveal]):not([data-reveal-bound])'));

      nodes.forEach((n) => {
        n.setAttribute('data-reveal-bound', '');
        if (n.dataset.revealDelay) n.style.setProperty('--reveal-delay', n.dataset.revealDelay + 'ms');
        if (io) io.observe(n);
        else n.classList.add('is-revealed');
      });
    }

    scan();
    window.SoluteReveal = scan;
  }

  /* ================================================================
     SPLIT TEXT — quebra em linhas/palavras preservando acessibilidade
     data-split="words" | "chars"
     ================================================================ */
  function splitText() {
    $$('[data-split]').forEach((el) => {
      if (el.dataset.splitDone) return;
      const mode = el.dataset.split || 'words';
      const step = parseFloat(el.dataset.splitStagger) || (mode === 'chars' ? 26 : 62);
      const base = parseFloat(el.dataset.splitDelay) || 0;

      // o texto original vira rotulo acessivel; os pedacos ficam ocultos ao leitor
      const original = el.textContent.trim().replace(/\s+/g, ' ');
      if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', original);

      // cada elemento-filho de nivel 1 vira uma "linha" com overflow hidden
      const lines = el.dataset.splitLines
        ? original.split('|').map((s) => s.trim())
        : [original];

      let idx = 0;
      const frag = document.createDocumentFragment();

      lines.forEach((lineText) => {
        const line = document.createElement('span');
        line.className = 'split-line';
        line.setAttribute('aria-hidden', 'true');

        if (mode === 'chars') {
          lineText.split('').forEach((ch) => {
            const s = document.createElement('span');
            s.className = 'split-char';
            s.textContent = ch === ' ' ? ' ' : ch;
            s.style.setProperty('--char-delay', (base + idx * step) + 'ms');
            idx++;
            line.appendChild(s);
          });
        } else {
          lineText.split(' ').forEach((w, i, arr) => {
            const wrap = document.createElement('span');
            wrap.className = 'split-word';
            wrap.style.setProperty('--word-delay', (base + idx * step) + 'ms');
            wrap.innerHTML = w;
            idx++;
            line.appendChild(wrap);
            if (i < arr.length - 1) line.appendChild(document.createTextNode(' '));
          });
        }
        frag.appendChild(line);
      });

      el.textContent = '';
      el.appendChild(frag);
      el.dataset.splitDone = '1';
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'fade');
    });
  }

  /* ================================================================
     CONTADORES — data-count="700" data-count-decimals="1"
     ================================================================ */
  function counters() {
    const nodes = $$('[data-count]');
    if (!nodes.length) return;

    const fmt = (v, dec) =>
      v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });

    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.countDecimals || '0', 10);
      const dur = parseInt(el.dataset.countDuration || '1800', 10);

      if (REDUCED) { el.textContent = fmt(target, dec); return; }

      const t0 = performance.now();
      const tick = (now) => {
        const p = clamp((now - t0) / dur, 0, 1);
        // easeOutExpo
        const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = fmt(target * e, dec);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target, dec);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) { nodes.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.35 });
    nodes.forEach((n) => { n.textContent = '0'; io.observe(n); });
  }

  /* ================================================================
     PARALLAX — data-parallax="0.18" (fracao do deslocamento)
     ================================================================ */
  function parallax() {
    const nodes = $$('[data-parallax]');
    if (!nodes.length || REDUCED) return;

    let vh = window.innerHeight;
    const state = nodes.map((el) => ({ el, speed: parseFloat(el.dataset.parallax) || 0.15, cur: 0 }));

    const update = () => {
      state.forEach((s) => {
        const r = s.el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const progress = (r.top + r.height / 2 - vh / 2) / vh;   // -1 .. 1
        const target = -progress * s.speed * 100;
        s.cur = lerp(s.cur, target, 0.14);
        s.el.style.transform = 'translate3d(0,' + s.cur.toFixed(2) + 'px,0)';
      });
      requestAnimationFrame(update);
    };

    on(window, 'resize', raf(() => { vh = window.innerHeight; }), { passive: true });
    requestAnimationFrame(update);
  }

  /* ================================================================
     CARD GLOW — brilho que segue o mouse
     ================================================================ */
  function cardGlow() {
    if (TOUCH) return;
    const cards = $$('.card, .panel--brand, .stat-card, .course');
    cards.forEach((card) => {
      on(card, 'pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ================================================================
     BOTOES MAGNETICOS
     ================================================================ */
  function magnetic() {
    if (TOUCH || REDUCED) return;
    $$('[data-magnetic]').forEach((el) => {
      const power = parseFloat(el.dataset.magnetic) || 0.28;
      let rid = null, cx = 0, cy = 0, tx = 0, ty = 0;

      const loop = () => {
        cx = lerp(cx, tx, 0.16);
        cy = lerp(cy, ty, 0.16);
        el.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)';
        if (Math.abs(cx - tx) > 0.05 || Math.abs(cy - ty) > 0.05) rid = requestAnimationFrame(loop);
        else { el.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)'; rid = null; }
      };
      const kick = () => { if (!rid) rid = requestAnimationFrame(loop); };

      on(el, 'pointermove', (e) => {
        const r = el.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width / 2)) * power;
        ty = (e.clientY - (r.top + r.height / 2)) * power;
        kick();
      });
      on(el, 'pointerleave', () => { tx = 0; ty = 0; kick(); });
    });
  }

  /* ================================================================
     TIMELINE — linha de progresso que acompanha o scroll
     ================================================================ */
  function steps() {
    const lists = $$('.steps:not(.steps--h)');
    if (!lists.length) return;

    lists.forEach((list) => {
      let bar = $('.steps__progress', list);
      if (!bar) {
        bar = document.createElement('span');
        bar.className = 'steps__progress';
        bar.setAttribute('aria-hidden', 'true');
        list.prepend(bar);
      }
      if (REDUCED) { bar.style.height = '100%'; return; }

      const update = raf(() => {
        const r = list.getBoundingClientRect();
        const anchor = window.innerHeight * 0.55;
        const p = clamp((anchor - r.top) / r.height, 0, 1);
        bar.style.height = (p * 100) + '%';
      });
      on(window, 'scroll', update, { passive: true });
      on(window, 'resize', update, { passive: true });
      update();
    });
  }

  /* ================================================================
     SLIDER DE DEPOIMENTOS — setas, pontos, arraste e teclado
     ================================================================ */
  function slider() {
    $$('[data-slider]').forEach((root) => {
      const track = $('.tstm-track', root) || $('[data-slider-track]', root);
      if (!track) return;
      const slides = Array.prototype.slice.call(track.children);
      if (!slides.length) return;

      const prev = $('[data-slider-prev]', root);
      const next = $('[data-slider-next]', root);
      const dotsBox = $('[data-slider-dots]', root);
      let index = 0;

      const gap = () => parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
      const perView = () => Math.max(1, Math.round(track.parentElement.offsetWidth / (slides[0].offsetWidth + gap())));
      const maxIndex = () => Math.max(0, slides.length - perView());

      const dots = [];
      if (dotsBox) {
        dotsBox.innerHTML = '';
        slides.forEach((_, i) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('role', 'tab');
          b.setAttribute('aria-label', 'Ir para o depoimento ' + (i + 1));
          on(b, 'click', () => go(i));
          dotsBox.appendChild(b);
          dots.push(b);
        });
      }

      function go(i) {
        index = clamp(i, 0, maxIndex());
        const x = index * (slides[0].offsetWidth + gap());
        track.style.transform = 'translate3d(' + -x + 'px,0,0)';
        if (prev) prev.disabled = index === 0;
        if (next) next.disabled = index === maxIndex();
        dots.forEach((d, di) => d.setAttribute('aria-selected', String(di === index)));
      }

      on(prev, 'click', () => go(index - 1));
      on(next, 'click', () => go(index + 1));
      on(window, 'resize', raf(() => go(index)));

      // arraste / swipe
      let down = false, startX = 0, moved = 0;
      on(track, 'pointerdown', (e) => {
        down = true; startX = e.clientX; moved = 0;
        track.style.transition = 'none';
        track.setPointerCapture(e.pointerId);
      });
      on(track, 'pointermove', (e) => {
        if (!down) return;
        moved = e.clientX - startX;
        const x = index * (slides[0].offsetWidth + gap()) - moved;
        track.style.transform = 'translate3d(' + -x + 'px,0,0)';
      });
      const release = () => {
        if (!down) return;
        down = false;
        track.style.transition = '';
        if (Math.abs(moved) > 60) go(index + (moved < 0 ? 1 : -1));
        else go(index);
      };
      on(track, 'pointerup', release);
      on(track, 'pointercancel', release);
      on(track, 'dragstart', (e) => e.preventDefault());

      on(root, 'keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); go(index - 1); }
      });

      go(0);
    });
  }

  /* ================================================================
     GRADE RECOLHIDA — botao "ver mais" (so aparece no celular)
     ================================================================ */
  function collapsibles() {
    $$('[data-collapse-btn]').forEach((btn) => {
      const grid = document.getElementById(btn.getAttribute('aria-controls'));
      if (!grid) return;
      const label = $('[data-collapse-label]', btn);
      const keep = parseInt(grid.dataset.collapse || '3', 10);
      const openText = label ? label.textContent : '';
      const closeText = btn.dataset.collapseClose || 'Ver menos';

      on(btn, 'click', () => {
        const open = !grid.classList.contains('is-expanded');
        grid.classList.toggle('is-expanded', open);
        btn.setAttribute('aria-expanded', String(open));
        if (label) label.textContent = open ? closeText : openText;

        if (open) {
          // os itens estavam em display:none, entao o observer nunca os viu
          $$(':scope > [data-reveal]', grid).slice(keep).forEach((el, i) => {
            el.style.setProperty('--reveal-delay', i * 70 + 'ms');
            requestAnimationFrame(() => el.classList.add('is-revealed'));
          });
        } else {
          // volta para o topo da grade para nao ficar perdido no meio da pagina
          grid.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ================================================================
     ACORDEAO
     ================================================================ */
  function accordion() {
    $$('.acc').forEach((acc) => {
      const single = acc.dataset.accSingle !== 'false';
      $$('.acc__item', acc).forEach((item) => {
        const btn = $('.acc__btn', item);
        const panel = $('.acc__panel', item);
        if (!btn || !panel) return;
        on(btn, 'click', () => {
          const open = !item.classList.contains('is-open');
          if (single) {
            $$('.acc__item', acc).forEach((o) => {
              o.classList.remove('is-open');
              const b = $('.acc__btn', o);
              if (b) b.setAttribute('aria-expanded', 'false');
            });
          }
          item.classList.toggle('is-open', open);
          btn.setAttribute('aria-expanded', String(open));
        });
      });
    });
  }

  /* ================================================================
     BARRA DE PROGRESSO DE LEITURA
     ================================================================ */
  function progress() {
    const bar = $('.progress-bar');
    if (!bar) return;
    const update = raf(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? clamp(window.scrollY / h, 0, 1) : 0) + ')';
    });
    on(window, 'scroll', update, { passive: true });
    on(window, 'resize', update, { passive: true });
    update();
  }

  /* ================================================================
     BOTOES FLUTUANTES (whatsapp + voltar ao topo)
     ================================================================ */
  function floaters() {
    const wa = $('.wa-float');
    const top = $('.to-top');
    if (!wa && !top) return;

    const update = raf(() => {
      const y = window.scrollY;
      if (wa) wa.classList.toggle('is-in', y > 340);
      if (top) top.classList.toggle('is-in', y > 900);
    });
    on(window, 'scroll', update, { passive: true });
    update();

    on(top, 'click', () => {
      window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    });
  }

  /* ================================================================
     SCROLLSPY do indice lateral
     ================================================================ */
  function scrollSpy() {
    const links = $$('.toc__list a[href^="#"]');
    if (!links.length) return;
    const map = links
      .map((a) => ({ a, sec: document.getElementById(a.getAttribute('href').slice(1)) }))
      .filter((x) => x.sec);
    if (!map.length) return;

    const update = raf(() => {
      const line = window.innerHeight * 0.32;
      let active = map[0];
      map.forEach((m) => {
        if (m.sec.getBoundingClientRect().top <= line) active = m;
      });
      map.forEach((m) => m.a.classList.toggle('is-active', m === active));
    });
    on(window, 'scroll', update, { passive: true });
    update();
  }

  /* ================================================================
     MARQUEE — duplica o conteudo e calcula a duracao pela largura
     ================================================================ */
  function marquee() {
    $$('.marquee').forEach((m) => {
      const track = $('.marquee__track', m);
      const group = $('.marquee__group', track);
      if (!track || !group) return;

      // duplica ate cobrir 2x a viewport (loop sem emenda)
      if (track.children.length === 1) {
        const clone = group.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      }

      const speed = parseFloat(m.dataset.marqueeSpeed) || 60;   // px por segundo
      const setDur = () => {
        const w = group.getBoundingClientRect().width;
        if (w > 0) track.style.setProperty('--marquee-dur', (w / speed) + 's');
      };
      setDur();
      on(window, 'resize', raf(setDur), { passive: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(setDur);
    });
  }

  /* ================================================================
     HERO — video de fundo com leve zoom-out no scroll
     ================================================================ */
  function heroMedia() {
    const media = $('.hero__media');
    if (!media) return;

    const video = $('video', media);

    // troca para a versao vertical no celular, antes de comecar a carregar
    if (video && video.dataset.srcMobile && window.matchMedia('(max-width: 780px)').matches) {
      video.src = video.dataset.srcMobile;
      if (video.dataset.posterMobile) video.poster = video.dataset.posterMobile;
      video.load();
    }

    if (video) {
      if (REDUCED) {
        // quem pediu menos movimento ve o quadro parado, nao uma tela preta
        video.removeAttribute('autoplay');
        video.removeAttribute('loop');
        video.pause();
      } else {
        // navegadores podem bloquear autoplay: cai pro poster silenciosamente
        const p = video.play();
        if (p && p.catch) p.catch(() => { video.removeAttribute('autoplay'); });
        // economiza bateria quando o hero sai da tela
        if ('IntersectionObserver' in window) {
          new IntersectionObserver((es) => {
            es.forEach((e) => { e.isIntersecting ? video.play().catch(() => {}) : video.pause(); });
          }, { threshold: 0.02 }).observe(media);
        }
      }
    }

    if (REDUCED) return;
    const layer = video || $('img', media);
    if (!layer) return;

    const update = raf(() => {
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      const p = clamp(y / window.innerHeight, 0, 1);
      layer.style.transform = 'scale(' + (1.06 + p * 0.09) + ') translate3d(0,' + (p * 34) + 'px,0)';
      layer.style.opacity = String(1 - p * 0.45);
    });
    on(window, 'scroll', update, { passive: true });
  }

  /* ================================================================
     ANCORAS SUAVES
     ================================================================ */
  function anchors() {
    on(document, 'click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id === '#' || id === '#!') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  }

  /* ================================================================
     FORMULARIOS
     Site estatico: monta a mensagem e abre WhatsApp (ou e-mail).
     Para trocar por backend/Formspree basta apontar o action do <form>.
     ================================================================ */
  function forms() {
    $$('form[data-form]').forEach((form) => {
      const out = $('[data-form-msg]', form);
      const mode = form.dataset.form;                    // "whatsapp" | "email"
      const phone = form.dataset.phone || '5532999501615';
      const mail = form.dataset.mail || 'contato@soluterh.com.br';

      on(form, 'submit', (e) => {
        // se o form tiver action externo (Formspree etc), deixa seguir normal
        if (form.getAttribute('action')) return;
        e.preventDefault();

        if (!form.reportValidity()) return;

        const data = new FormData(form);
        const lines = [];
        $$('[name]', form).forEach((el) => {
          if (el.type === 'checkbox' && !el.checked) return;
          if (el.type === 'checkbox' && el.name === 'lgpd') return;
          const label = el.dataset.label || (el.labels && el.labels[0] ? el.labels[0].textContent.replace('*', '').trim() : el.name);
          const v = data.get(el.name);
          if (v) lines.push(label + ': ' + v);
        });

        const subject = form.dataset.subject || 'Contato pelo site Solute RH';
        const body = subject + '\n\n' + lines.join('\n');

        if (mode === 'email') {
          window.location.href = 'mailto:' + mail +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);
        } else {
          window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(body), '_blank', 'noopener');
        }

        if (out) {
          out.hidden = false;
          out.textContent = mode === 'email'
            ? 'Abrimos seu programa de e-mail com a mensagem pronta. É só enviar!'
            : 'Abrimos o WhatsApp com sua mensagem pronta. É só apertar enviar!';
        }
        form.reset();
      });
    });
  }

  /* ================================================================
     BARRA DE ANUNCIO (evento) — dispensavel, lembra a escolha
     ================================================================ */
  function announce() {
    const bar = $('.announce');
    if (!bar) return;
    const key = 'solute-announce-' + (bar.dataset.announceId || 'v1');

    try {
      if (localStorage.getItem(key) === 'off') { bar.remove(); return; }
    } catch (err) { /* modo privado: segue mostrando */ }

    document.body.classList.add('has-announce');
    on($('.announce__close', bar), 'click', () => {
      bar.remove();
      document.body.classList.remove('has-announce');
      try { localStorage.setItem(key, 'off'); } catch (err) {}
    });
  }

  /* ================================================================
     MISC — ano no rodape, links externos seguros
     ================================================================ */
  function misc() {
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

    // na home, clicar na logo volta suavemente para o topo em vez de recarregar
    const brand = $('.brand');
    const onHome = /(^|\/)(index\.html)?$/.test(location.pathname);
    if (brand && onHome) {
      on(brand, 'click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
        history.replaceState(null, '', location.pathname);
      });
    }

    // selo "ao vivo" do Solute Cast: acende na terca, das 09h as 12h
    const live = $$('[data-live]');
    if (live.length) {
      const now = new Date();
      const isLive = now.getDay() === 2 && now.getHours() >= 9 && now.getHours() < 12;
      live.forEach((el) => {
        el.classList.toggle('is-live', isLive);
        const label = $('[data-live-label]', el) || el;
        if (isLive) label.textContent = el.dataset.liveOn || 'Ao vivo agora';
        else if (el.dataset.liveOff) label.textContent = el.dataset.liveOff;
      });
    }

    $$('a[target="_blank"]').forEach((a) => {
      const rel = (a.getAttribute('rel') || '').split(' ').filter(Boolean);
      if (!rel.includes('noopener')) rel.push('noopener');
      if (!rel.includes('noreferrer')) rel.push('noreferrer');
      a.setAttribute('rel', rel.join(' '));
    });

    // marca o item de menu da pagina atual
    const here = location.pathname.split('/').pop() || 'index.html';
    $$('a[data-page]').forEach((a) => {
      if (a.dataset.page === here.replace('.html', '') || (here === 'index.html' && a.dataset.page === 'index')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ================================================================
     BOOT
     ================================================================ */
  function init() {
    splitText();      // antes do reveal: cria os nos que serao observados
    preloader();
    header();
    megaMenu();
    drawer();
    reveal();
    counters();
    parallax();
    cardGlow();
    magnetic();
    steps();
    slider();
    collapsibles();
    accordion();
    progress();
    floaters();
    scrollSpy();
    marquee();
    heroMedia();
    anchors();
    forms();
    announce();
    misc();
  }

  if (document.readyState === 'loading') on(document, 'DOMContentLoaded', init);
  else init();
})();
