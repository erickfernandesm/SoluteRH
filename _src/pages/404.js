/* =============================================================================
   404
   ========================================================================== */

const { SERVICES } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');

const meta = {
  file: '404.html',
  page: '404',
  title: 'Página não encontrada | Solute RH',
  description: 'A página que você procurava não existe ou mudou de endereço.',
  ogImage: 'og-default.jpg',
};

const links = SERVICES.slice(0, 4)
  .map(
    (s) => `
        <a class="card" href="consultoria-${s.slug}.html" data-reveal="up">
          <span class="card__ico">${icon(s.icon)}</span>
          <h2 class="card__title" style="font-size:1.02rem">${s.title}</h2>
          <p class="card__text" style="font-size:.88rem">${s.short}</p>
        </a>`
  )
  .join('');

const body = `
<main id="conteudo">

<section class="section aura" style="padding-top:calc(var(--header-h) + clamp(3rem,7vw,6rem))" aria-labelledby="titulo">
  <div class="wrap wrap--narrow" style="text-align:center">
    <p class="err-code" data-reveal="zoom" aria-hidden="true">404</p>
    <h1 id="titulo" style="margin-top:1rem" data-split="words" data-reveal="fade">Essa página saiu do organograma</h1>
    <p class="lead" style="margin:1.3rem auto 0;max-width:52ch" data-reveal="up" data-reveal-delay="120">
      O endereço que você acessou não existe mais ou foi movido. Nada grave: abaixo estão os
      caminhos mais procurados do site.
    </p>
    <div class="row" style="justify-content:center;margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="180">
      <a class="btn btn--primary btn--lg" href="index.html" data-magnetic="0.22">
        Voltar para o início ${icon('arrow')}
      </a>
      <a class="btn btn--ghost btn--lg" href="${wa('Olá! Caí em uma página que não existe no site e gostaria de ajuda.')}" target="_blank">
        Falar no WhatsApp
      </a>
    </div>
  </div>
</section>

<section class="section section--flush-top" aria-labelledby="atalhos-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Atalhos</p>
      <h2 id="atalhos-titulo" data-reveal="fade">Talvez você estivesse procurando por</h2>
    </div>
    <div class="grid grid-4" data-stagger="90">
      ${links}
    </div>
    <div class="row" style="justify-content:center;margin-top:2.5rem;gap:1.5rem" data-reveal="up">
      <a class="link-arrow" href="consultoria.html">Toda a consultoria ${icon('arrow')}</a>
      <a class="link-arrow" href="cursos.html">Solute Cursos ${icon('arrow')}</a>
      <a class="link-arrow" href="blog.html">Blog ${icon('arrow')}</a>
      <a class="link-arrow" href="contato.html">Contato ${icon('arrow')}</a>
    </div>
  </div>
</section>

</main>
`;

module.exports = { meta, body };
