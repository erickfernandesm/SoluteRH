/* =============================================================================
   BLOG  (listagem + post individual)
   -----------------------------------------------------------------------------
   Estas duas paginas sao "cascas": o conteudo vem de uma fonte JSON definida
   em BLOG.source (_src/site.js) e e renderizado por js/blog.js.
   Assim o sistema da Solute publica e o site reflete, sem novo deploy.
   ========================================================================== */

const { SITE, BLOG } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

const dataAttrs =
  ` data-blog-source="${BLOG.source}" data-blog-per-page="${BLOG.perPage}"` +
  ` data-blog-fallback="${BLOG.fallbackCover}" data-blog-author="${BLOG.author}"` +
  ` data-blog-avatar="${BLOG.authorPhoto}"`;

/* ---------------------------------------------------------------- LISTAGEM */
const listMeta = {
  file: 'blog.html',
  page: 'blog',
  title: 'Blog | Solute RH',
  description:
    'Artigos práticos sobre gestão de pessoas: RH estratégico, cargos e salários, NR-01, liderança, clima e recrutamento. Conteúdo de quem executa dentro das empresas.',
  ogImage: 'og-default.jpg',
  bodyClass: 'blog-page',
  bodyAttrs: dataAttrs,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Solute RH',
    url: SITE.url + '/blog.html',
    publisher: { '@type': 'Organization', name: SITE.legal, url: SITE.url },
  },
};

const listBody = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="wrap wrap--wide">
    <nav class="crumbs" aria-label="Você está aqui">
      <a href="index.html">Início</a>
      ${icon('chevronR')}
      <span aria-current="page">Blog</span>
    </nav>
    <p class="eyebrow" data-reveal="up">Conteúdo</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">Gestão de pessoas explicada por quem executa</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Publicações, vídeos e guias que nascem de projetos reais dentro de empresas
      brasileiras. Sem teoria solta e sem receita de bolo.
    </p>
  </div>
</section>

<section class="section section--flush-top" aria-label="Artigos do blog">
  <div class="wrap wrap--wide">

    <div class="blog-toolbar" data-reveal="up">
      <div class="chips" data-blog-filters role="group" aria-label="Filtrar por categoria"></div>
      <div class="row" style="gap:1rem">
        <span class="dim" style="font-size:.85rem" data-blog-count aria-live="polite"></span>
        <label class="search">
          <span class="sr-only">Buscar artigos</span>
          ${icon('search')}
          <input type="search" placeholder="Buscar publicação..." data-blog-search autocomplete="off">
        </label>
      </div>
    </div>

    <div class="feed" data-blog-list></div>

    <div class="row" style="justify-content:center;margin-top:2.6rem">
      <button class="btn btn--ghost btn--lg" type="button" data-blog-more hidden>
        Carregar mais publicações ${icon('arrowDown')}
      </button>
    </div>

  </div>
</section>

<!-- ================================================= NEWSLETTER / CAST -->
<section class="section surface-900" aria-labelledby="mais-titulo">
  <div class="wrap wrap--wide">
    <div class="duo">
      <div>
        <p class="eyebrow" data-reveal="up">Toda semana</p>
        <h2 id="mais-titulo" data-split="words" data-reveal="fade">Prefere ouvir a ler?</h2>
        <p class="lead" style="margin-top:1.1rem" data-reveal="up" data-reveal-delay="100">
          Os mesmos assuntos do blog viram conversa ao vivo no Solute Cast,
          ${SITE.live.day.toLowerCase()} às ${SITE.live.time}, com pergunta aberta da audiência.
        </p>
        <div class="row" style="margin-top:2rem;gap:.8rem" data-reveal="up" data-reveal-delay="160">
          <a class="btn btn--primary" href="solute-cast.html" data-magnetic="0.2">
            Conhecer o Solute Cast ${icon('arrow')}
          </a>
          <a class="btn btn--ghost" href="${SITE.social.youtube}" target="_blank">
            ${icon('youtube')} Ver no YouTube
          </a>
        </div>
      </div>

      <div class="figure figure--wide veil" style="display:grid;place-items:center;background:linear-gradient(150deg,var(--ink-850),var(--ink-1000))" data-reveal="left">
        <div style="text-align:center;padding:2rem">
          <img src="media/logo-cast-branca.png" alt="Solute Cast" width="900" height="300"
               style="width:min(300px,68%);margin:0 auto 1.8rem" loading="lazy">
          <a class="play-btn" href="${SITE.social.youtube}" target="_blank" aria-label="Assistir ao Solute Cast" style="margin:0 auto">
            ${icon('play')}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

${B.ctaBand({
  eyebrow: 'Do conteúdo à prática',
  title: 'Ler ajuda. Aplicar resolve.',
  text: 'Se algum destes assuntos é exatamente o que está travando a sua empresa, vamos olhar isso juntos no diagnóstico gratuito.',
})}

</main>

<script src="js/blog.js" defer></script>
`;

/* ------------------------------------------------------------- POST UNICO */
const postMeta = {
  file: 'post.html',
  page: 'blog',
  title: 'Artigo | Blog Solute RH',
  description:
    'Artigo do blog da Solute RH sobre gestão de pessoas, RH estratégico e liderança.',
  ogImage: 'og-default.jpg',
  ogType: 'article',
  bodyClass: 'blog-page',
  bodyAttrs: dataAttrs,
  noindex: true, // o conteudo e dinamico; a listagem e a pagina indexavel
};

const postBody = `
<main id="conteudo">

<section class="section" style="padding-top:calc(var(--header-h) + clamp(2.5rem,5vw,4.5rem))">
  <div class="wrap wrap--wide">
    <div data-blog-post></div>
  </div>
</section>

<section class="section surface-900" data-blog-related-section hidden aria-labelledby="rel-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Continue lendo</p>
        <h2 id="rel-titulo">Outros artigos</h2>
      </div>
      <div class="row" style="justify-content:flex-end;align-self:end">
        <a class="link-arrow" href="blog.html">Ver todos ${icon('arrow')}</a>
      </div>
    </div>
    <div class="post-grid" data-blog-related></div>
  </div>
</section>

${B.ctaBand({
  eyebrow: 'Precisa resolver isso aí?',
  title: 'A gente olha o seu caso sem custo',
  text: 'Trinta minutos de conversa para entender o contexto da sua empresa e apontar a prioridade. Sem compromisso de contratação.',
})}

</main>

<script src="js/blog.js" defer></script>
`;

module.exports = () => [
  { meta: listMeta, body: listBody },
  { meta: postMeta, body: postBody },
];
