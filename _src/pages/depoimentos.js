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

/* estrelas do formulario: radios de verdade, para funcionar no teclado */
const notas = [5, 4, 3, 2, 1]
  .map(
    (n) => `
          <input class="stars__input" type="radio" id="nota-${n}" name="nota" value="${n}" required>
          <label class="stars__star" for="nota-${n}" title="${n} de 5">${icon('starFill')}<span class="sr-only">${n} de 5</span></label>`
  )
  .join('');

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

<!-- ================================================= DEIXE O SEU -->
<section class="section surface-900" id="feedback" aria-labelledby="feedback-titulo">
  <div class="wrap wrap--narrow">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Você é cliente?</p>
      <h2 id="feedback-titulo" data-split="words" data-reveal="fade">Deixe o seu feedback</h2>
      <p class="lead" data-reveal="up" data-reveal-delay="100">
        Leva dois minutos. O que você escrever ajuda a Solute a melhorar e, se você
        autorizar, pode virar depoimento aqui nesta página.
      </p>
    </div>

    <div data-feedback data-api="${SITE.feedbackApi}" data-wa="${SITE.phoneRaw}"
         data-google="${SITE.googleReview || SITE.googleProfile}">

      <form class="fb-card" data-feedback-form novalidate>
        <div class="field">
          <label class="label" for="fb-nota">Como você avalia o nosso trabalho? <span class="req">*</span></label>
          <div class="stars" id="fb-nota" role="radiogroup" aria-label="Nota de 1 a 5">${notas}
          </div>
        </div>

        <div class="field">
          <label class="label" for="fb-texto">Conte como foi <span class="req">*</span></label>
          <textarea class="textarea" id="fb-texto" name="texto" required minlength="15" maxlength="1500" rows="6"
                    placeholder="O que mudou na sua empresa? O que fez diferença no trabalho da equipe? Escreva do seu jeito."></textarea>
          <span class="ask__count" data-feedback-count aria-hidden="true">0 / 1500</span>
        </div>

        <div class="grid grid-2" style="gap:1.1rem" data-feedback-quem>
          <div class="field">
            <label class="label" for="fb-nome">Seu nome <span class="req">*</span></label>
            <input class="input" type="text" id="fb-nome" name="nome" required minlength="2" maxlength="80" autocomplete="name" placeholder="Como podemos te chamar?">
          </div>
          <div class="field">
            <label class="label" for="fb-empresa">Empresa <span class="req">*</span></label>
            <input class="input" type="text" id="fb-empresa" name="empresa" required minlength="2" maxlength="80" autocomplete="organization" placeholder="Nome da empresa">
          </div>
        </div>

        <label class="check">
          <input type="checkbox" name="autoriza" value="sim" checked>
          <span>Autorizo a Solute RH a publicar este depoimento no site, com o meu nome e o da empresa.</span>
        </label>

        <!-- campo invisivel: se vier preenchido, e robo -->
        <div class="ask__hp" aria-hidden="true">
          <label for="fb-site">Deixe em branco</label>
          <input type="text" id="fb-site" name="website" tabindex="-1" autocomplete="off">
        </div>

        <p class="form-msg ask__msg" data-feedback-msg role="alert" hidden></p>

        <button class="btn btn--primary btn--lg ask__send" type="submit" data-feedback-send>
          Enviar feedback ${icon('arrow')}
        </button>
      </form>

      <!-- enviado: copia o texto e segue para a avaliacao no Google -->
      <div class="fb-card fb-done" data-feedback-done hidden>
        <span class="ask__done-ico">${icon('checkCircle')}</span>
        <h2 class="ask__title">Obrigado! Recebemos o seu feedback</h2>

        <p class="fb-google__text">
          Copiamos o seu texto. Estamos abrindo o Google para você colar e publicar.
        </p>
        <blockquote class="fb-google__quote" data-feedback-eco></blockquote>

        <p class="fb-abrindo" data-feedback-abrindo>
          <span class="fb-abrindo__dot" aria-hidden="true"></span> Abrindo o Google...
        </p>

        <a class="btn btn--primary btn--lg" data-feedback-google target="_blank" rel="noopener">
          <img src="media/google-colorido.png" alt="" width="18" height="18"> Avaliar no Google
        </a>
        <p class="fb-done__nota">Se o Google não abrir sozinho, use o botão acima.</p>
      </div>

    </div>
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
