/* =============================================================================
   SOLUTE RH - blocos de secao reutilizados em varias paginas
   ========================================================================== */

const { SITE, CLIENTS, TESTIMONIALS, VALUES, SERVICES } = require('./site');
const { icon } = require('./icons');
const { wa } = require('./layout');

/* ------------------------------------------------------ marquee clientes */
function clientMarquee(opts) {
  const o = opts || {};
  const cells = CLIENTS.map(
    (c) => `<div class="client-logo"><img src="media/${c.file}.webp" alt="${c.name}" width="150" height="150" loading="lazy"></div>`
  ).join('\n        ');

  return `
<section class="section section--tight${o.surface ? ' ' + o.surface : ''}" aria-labelledby="clientes-marquee">
  <div class="wrap wrap--wide">
    <p id="clientes-marquee" class="eyebrow eyebrow--center" data-reveal="fade">
      ${o.label || 'Empresas que confiam na Solute RH'}
    </p>
  </div>
  <div class="marquee" data-marquee-speed="42" style="margin-top:2rem">
    <div class="marquee__track">
      <div class="marquee__group">
        ${cells}
      </div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------ depoimentos */
function testimonials(opts) {
  const o = opts || {};
  const stars = Array(5).fill(icon('starFill')).join('');

  const cards = TESTIMONIALS.map((t) => {
    const avatar = t.photo
      ? `<img class="tstm__ava" src="media/${t.photo}.webp" alt="${t.name}" width="46" height="46" loading="lazy">`
      : `<span class="tstm__ava tstm__ava--ph" aria-hidden="true">${t.initials}</span>`;
    return `
          <figure class="tstm">
            <div class="tstm__stars" aria-label="5 de 5 estrelas">${stars}</div>
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

  return `
<section class="section aura aura--soft${o.surface ? ' ' + o.surface : ''}" id="depoimentos" aria-labelledby="depoimentos-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Quem já passou por isso</p>
      <h2 id="depoimentos-titulo" class="measure" data-split="words" data-reveal="fade">${o.title || 'O resultado quem conta são eles'}</h2>
    </div>
  </div>

  <div class="marquee marquee--cards" data-marquee-speed="34" data-reveal="fade">
    <div class="marquee__track">
      <div class="marquee__group">${cards}
      </div>
    </div>
  </div>

  <div class="wrap wrap--wide">
    <div class="row" style="justify-content:center;margin-top:2.8rem;gap:.8rem" data-reveal="up">
      <span class="tag tag--brand"><img src="media/google-colorido.png" alt="" width="15" height="15"> Nota 5,0 no Google</span>
      <span class="tag">${icon('building')} +${SITE.stats.empresas} empresas atendidas</span>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ CTA */
function ctaBand(opts) {
  const o = opts || {};
  return `
<section class="section" aria-labelledby="cta-final">
  <div class="wrap wrap--wide">
    <div class="cta-band" data-reveal="rise">
      <p class="eyebrow eyebrow--center">${o.eyebrow || 'Primeiro passo'}</p>
      <h2 class="cta-band__title" id="cta-final">${o.title || 'Vamos olhar para o seu RH com dados, não com achismo'}</h2>
      <p class="lead">${o.text || 'Uma conversa de 30 minutos, sem custo e sem compromisso. Você sai dela sabendo exatamente qual é o gargalo da sua gestão de pessoas e o que atacar primeiro.'}</p>
      <div class="cta-band__actions">
        <a class="btn btn--primary btn--lg" href="${wa(o.waText)}" target="_blank" data-magnetic="0.25">
          ${o.cta || 'Agendar diagnóstico gratuito'} ${icon('arrow')}
        </a>
        <a class="btn btn--ghost btn--lg" href="contato.html">Ver outras formas de contato</a>
      </div>
      <p class="cta-band__note">${o.note || 'Resposta no mesmo dia útil · Atendemos empresas em todo o Brasil'}</p>
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------------------- valores */
function values(opts) {
  const o = opts || {};
  const cells = VALUES.map(
    (v) => `
        <article class="value">
          <span class="value__ico">${icon(v.icon)}</span>
          <h3>${v.name}</h3>
          <p>${v.text}</p>
        </article>`
  ).join('');

  return `
<section class="section${o.surface ? ' ' + o.surface : ''}" id="valores" aria-labelledby="valores-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Nossos valores</p>
      <h2 id="valores-titulo" class="measure" data-split="words" data-reveal="fade">Estão na parede do escritório e nas entregas</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="100">Quem entra na Solute RH vê estes oito valores logo na primeira sala. Não é decoração: é o critério que usamos para aceitar um projeto, conduzir um diagnóstico e dizer o que precisa ser dito ao cliente.</p>
    </div>

    <div class="values" data-reveal="up">
      ${cells}
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------ estatisticas */
function stats(opts) {
  const o = opts || {};
  const items = o.items || [
    { pre: '+', num: SITE.stats.empresas, label: 'empresas atendidas em todo o Brasil' },
    { pre: '+', num: SITE.stats.formados, label: 'profissionais formados pelos nossos cursos' },
    { num: SITE.stats.experiencia, suf: '+', label: 'anos de experiência em gestão de pessoas' },
    { num: SITE.stats.nota, dec: 1, label: 'de avaliação média no Google', suf: '★' },
  ];

  const cells = items.map(
    (s) => `
        <div class="stat" data-reveal="up">
          <p class="stat__num">
            ${s.pre ? `<span class="pre">${s.pre}</span>` : ''}<span data-count="${s.num}"${s.dec ? ` data-count-decimals="${s.dec}"` : ''}>0</span>${s.suf ? `<span class="suf">${s.suf}</span>` : ''}
          </p>
          <p class="stat__label">${s.label}</p>
        </div>`
  ).join('');

  return `
<section class="section aura aura--bottom${o.surface ? ' ' + o.surface : ''}" aria-labelledby="numeros-titulo">
  <div class="wrap wrap--wide">
    ${o.hideHead ? '' : `
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Em números</p>
      <h2 id="numeros-titulo" class="measure" data-split="words" data-reveal="fade">${o.title || 'Cinco anos organizando a gestão de pessoas de quem produz no Brasil'}</h2>
    </div>`}
    <div class="stats" data-stagger="110">
      ${cells}
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------- grade de servicos */
function servicesGrid(opts) {
  const o = opts || {};
  const list = o.exclude ? SERVICES.filter((s) => s.slug !== o.exclude) : SERVICES;

  const cards = list.map(
    (s) => `
        <a class="svc" href="consultoria-${s.slug}.html" data-reveal="up">
          <div class="svc__media">
            <img src="media/${s.img}.webp" alt="" width="1122" height="1402" loading="lazy" decoding="async">
          </div>
          <div class="svc__body">
            <span class="svc__kicker">${s.kicker}</span>
            <h3 class="svc__title">${s.title}</h3>
            <p class="svc__text">${s.short}</p>
            <span class="svc__go">Conhecer o serviço ${icon('arrow')}</span>
          </div>
        </a>`
  ).join('');

  return `
<section class="section${o.surface ? ' ' + o.surface : ''}" id="servicos" aria-labelledby="servicos-titulo">
  <div class="wrap wrap--wide">
    ${o.hideHead ? '' : `
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Consultoria</p>
      <h2 id="servicos-titulo" class="measure" data-split="words" data-reveal="fade">${o.title || 'Oito frentes para destravar a sua gestão de pessoas'}</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="100">${o.text || 'Cada projeto começa por um diagnóstico. A partir dele, montamos o escopo com o que a sua empresa precisa agora. Nem mais, nem menos.'}</p>
    </div>`}

    <div class="grid grid-4 collapsible" id="grade-servicos" data-collapse="3" data-stagger="80">
      ${cards}
    </div>

    <div class="collapse-more">
      <button class="btn btn--ghost" type="button" data-collapse-btn aria-controls="grade-servicos" aria-expanded="false">
        <span data-collapse-label>Ver os outros ${list.length - 3} serviços</span>
        ${icon('chevron')}
      </button>
    </div>
  </div>
</section>`;
}

module.exports = { clientMarquee, testimonials, ctaBand, values, stats, servicesGrid };
