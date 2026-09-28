/* =============================================================================
   DEPOIMENTOS
   Todos os depoimentos numa pagina so: os que ja estao no cadastro do site
   (TESTIMONIALS) e os que a Solute aprova no sistema, que chegam sozinhos
   pela lista publica de depoimentos.
   ========================================================================== */

const { SITE, TESTIMONIALS } = require('../site');
const { icon } = require('../icons');
const B = require('../blocks');

const meta = {
  file: 'depoimentos.html',
  page: 'depoimentos',
  title: 'Depoimentos de clientes | Solute RH',
  description:
    'O que dizem as empresas atendidas pela Solute RH: depoimentos reais de clientes de consultoria de RH, cargos e salários, liderança e recrutamento.',
  ogImage: 'og-default.jpg',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Depoimentos de clientes da Solute RH',
    itemListElement: TESTIMONIALS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        reviewBody: t.quote,
        author: { '@type': 'Organization', name: t.name },
        itemReviewed: { '@type': 'Organization', name: SITE.legal },
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      },
    })),
  },
};

const estrelas = Array(5).fill(icon('starFill')).join('');

const cards = TESTIMONIALS.map((t) => {
  const avatar = t.photo
    ? `<img class="tstm__ava" src="media/${t.photo}.webp" alt="${t.name}" width="46" height="46" loading="lazy">`
    : t.logo
      ? `<img class="tstm__ava tstm__ava--logo" src="media/${t.logo}.webp" alt="${t.name}" width="46" height="46" loading="lazy">`
      : `<span class="tstm__ava tstm__ava--ph" aria-hidden="true">${t.initials}</span>`;
  return `
      <figure class="tstm tstm--fixo" data-reveal="up">
        <div class="tstm__stars" aria-label="5 de 5 estrelas">${estrelas}</div>
        <blockquote class="tstm__quote">${t.quote}</blockquote>
        <figcaption class="tstm__who">
          ${avatar}
          <span>
            <span class="tstm__name">${t.name}</span>
            <span class="tstm__role">${t.role}</span>
          </span>
        </figcaption>
      </figure>`;
}).join('');

const body = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="hero-sub__bg" aria-hidden="true">
    <img src="media/foto-time.webp" alt="" width="800" height="600">
  </div>
  <div class="wrap wrap--wide">
    <nav class="crumbs" aria-label="Você está aqui">
      <a href="index.html">Início</a>
      ${icon('chevronR')}
      <a href="clientes.html">Clientes</a>
      ${icon('chevronR')}
      <span aria-current="page">Depoimentos</span>
    </nav>
    <p class="eyebrow eyebrow--center" data-reveal="up">Quem já passou por isso</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">O resultado quem conta são os nossos clientes</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Depoimentos escritos pelas próprias empresas atendidas, com o nome e o serviço
      contratado. A maior parte veio da pesquisa de satisfação que fazemos com a carteira.
    </p>

    <div class="row" style="justify-content:center;margin-top:2rem" data-reveal="up" data-reveal-delay="200">
      <a class="tag tag--brand" href="${SITE.googleProfile}" target="_blank" rel="noopener">
        <img src="media/google-colorido.png" alt="" width="15" height="15"> Nota 5,0 no Google
      </a>
      <span class="tag">${icon('building')} +${SITE.stats.empresas} empresas atendidas</span>
    </div>
  </div>
</section>

<section class="section section--flush-top" aria-label="Depoimentos">
  <div class="wrap wrap--wide">
    <div class="tstm-grid" data-tstm-lista data-api="${SITE.depoimentosApi}" data-stagger="70">${cards}
    </div>
    <p class="tstm-nota" data-reveal="up">
      Cada depoimento é publicado com a autorização de quem escreveu.
    </p>
  </div>
</section>

${B.ctaBand({
  eyebrow: 'A sua empresa aqui',
  title: 'Quer o mesmo para a sua gestão de pessoas?',
  text: 'A primeira conversa é gratuita e dura 30 minutos. Serve para entender o seu contexto e apontar onde está o gargalo.',
  waText: 'Olá! Vi os depoimentos no site e gostaria de conversar sobre a minha empresa.',
  cta: 'Agendar diagnóstico gratuito',
})}

</main>
`;

module.exports = { meta, body };
