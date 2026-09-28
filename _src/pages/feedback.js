/* =============================================================================
   FEEDBACK (atalho)
   O formulario de feedback passou a morar dentro da pagina de Depoimentos, em
   29/09/2026. Esta pagina continua existindo so para nao quebrar os enderecos
   ja enviados: manda quem chega direto para a parte certa da pagina nova.
   ========================================================================== */

const { icon } = require('../icons');

const meta = {
  file: 'feedback.html',
  page: 'feedback',
  title: 'Deixe o seu feedback | Solute RH',
  description: 'Conte como foi trabalhar com a Solute RH.',
  ogImage: 'og-default.jpg',
  noindex: true,
  head: '<meta http-equiv="refresh" content="0; url=depoimentos.html#feedback">',
};

const body = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="wrap wrap--wide">
    <p class="eyebrow eyebrow--center">Feedback dos clientes</p>
    <h1 class="hero-sub__title" id="titulo">Mudamos esta página de lugar</h1>
    <p class="lead">
      O formulário de feedback agora fica na página de Depoimentos. Estamos levando
      você até lá.
    </p>
    <div class="row" style="justify-content:center;margin-top:2rem">
      <a class="btn btn--primary btn--lg" href="depoimentos.html#feedback">
        Ir para os depoimentos ${icon('arrow')}
      </a>
    </div>
  </div>
</section>

</main>
`;

module.exports = { meta, body };
