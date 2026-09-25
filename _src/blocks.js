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
    // foto da pessoa, logo da empresa ou, na falta dos dois, as iniciais
    const avatar = t.photo
      ? `<img class="tstm__ava" src="media/${t.photo}.webp" alt="${t.name}" width="46" height="46" loading="lazy">`
      : t.logo
        ? `<img class="tstm__ava tstm__ava--logo" src="media/${t.logo}.webp" alt="${t.name}" width="46" height="46" loading="lazy">`
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
      <h2 id="depoimentos-titulo" class="measure" data-split="words" data-reveal="fade">${o.title || 'O resultado quem conta são os nossos clientes'}</h2>
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
      <a class="tag tag--brand" href="${SITE.googleProfile}" target="_blank" rel="noopener"><img src="media/google-colorido.png" alt="" width="15" height="15"> Nota 5,0 no Google</a>
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
      <p class="lead measure" data-reveal="up" data-reveal-delay="100">São seis, e vêm do nosso Manual de Cultura e Conduta. Não é decoração de parede: é o critério que usamos para aceitar um projeto, conduzir um diagnóstico e dizer ao cliente o que precisa ser dito.</p>
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

/* ------------------------------------------------------------ solute cast */
/* Card do podcast: trecho do programa rodando mudo no fundo. O play leva ao
   episodio em destaque no canal do YouTube, em outra aba. */
function castCard(opts) {
  const o = opts || {};
  const ep = SITE.cast.featured;
  const url = 'https://www.youtube.com/watch?v=' + ep.id;
  const meta = o.meta || [
    icon('mic') + ' O podcast da Solute',
    icon('calendar') + ' ' + SITE.cast.cadence + ' a partir de setembro',
    icon('youtube') + ' No YouTube',
  ];
  return `
      <div class="cast-card cast-card--video" data-cast-card data-reveal="${o.reveal || 'rise'}">
        <div class="cast-card__bg" aria-hidden="true">
          <video src="media/solute-cast-teaser.mp4" poster="media/solute-cast-teaser.webp"
                 muted loop playsinline preload="none" tabindex="-1"></video>
        </div>
        <img class="cast-card__logo" src="media/logo-cast-branca.png" alt="Solute Cast"
             width="900" height="300" loading="lazy">
        <a class="play-btn" href="${url}" target="_blank" rel="noopener"
           aria-label="Assistir ao episódio: ${ep.title}">${icon('play')}</a>
        <p class="cast-card__ep"><span>Episódio em destaque</span>${ep.title}</p>
        <p class="cast-card__meta">
          ${meta.map((m) => '<span class="cast-card__it">' + m + '</span>').join(' <span aria-hidden="true">·</span> ')}
        </p>
      </div>`;
}

/* ------------------------------------------------- pergunta para o podcast */
/* Pop-up com nome, WhatsApp e pergunta. Envia para o sistema de gestao
   (Perguntas SoluteCast). O botao que abre e um link de WhatsApp: sem
   JavaScript, a pergunta segue por la. */
function askDialog() {
  return `
<dialog class="ask" id="pergunta-cast" aria-labelledby="ask-titulo" data-ask data-api="${SITE.cast.perguntasApi}" data-wa="${SITE.phoneRaw}">
  <div class="ask__box">
    <button class="ask__close" type="button" data-ask-close aria-label="Fechar">${icon('close')}</button>

    <form class="ask__form" data-ask-form novalidate>
      <p class="eyebrow">Solute Cast</p>
      <h2 class="ask__title" id="ask-titulo">Mande a sua pergunta</h2>
      <p class="ask__lead">As perguntas escolhidas viram pauta no programa. Se precisarmos de algum detalhe, falamos com você pelo WhatsApp.</p>

      <div class="field">
        <label class="label" for="ask-nome">Seu nome <span class="req">*</span></label>
        <input class="input" type="text" id="ask-nome" name="nome" required minlength="2" maxlength="80" autocomplete="name" placeholder="Como podemos te chamar?">
      </div>
      <div class="field">
        <label class="label" for="ask-whats">WhatsApp <span class="req">*</span></label>
        <input class="input" type="tel" id="ask-whats" name="whatsapp" required inputmode="tel" autocomplete="tel" maxlength="16" placeholder="(32) 99999-9999">
      </div>
      <div class="field">
        <label class="label" for="ask-pergunta">Sua pergunta <span class="req">*</span></label>
        <textarea class="textarea" id="ask-pergunta" name="pergunta" required minlength="5" maxlength="1500" rows="4" placeholder="O que você gostaria de ver discutido no programa?"></textarea>
        <span class="ask__count" data-ask-count aria-hidden="true">0 / 1500</span>
      </div>

      <!-- campo invisivel: se vier preenchido, e robo -->
      <div class="ask__hp" aria-hidden="true">
        <label for="ask-site">Deixe em branco</label>
        <input type="text" id="ask-site" name="website" tabindex="-1" autocomplete="off">
      </div>

      <p class="form-msg ask__msg" data-ask-msg role="alert" hidden></p>

      <button class="btn btn--primary btn--lg ask__send" type="submit" data-ask-send>
        Enviar pergunta ${icon('arrow')}
      </button>
    </form>

    <div class="ask__done" data-ask-done hidden>
      <span class="ask__done-ico">${icon('checkCircle')}</span>
      <h2 class="ask__title">Pergunta recebida</h2>
      <p class="ask__lead">Obrigado! Ela já está com a nossa equipe. Se for escolhida para o programa, avisamos você pelo WhatsApp.</p>
      <button class="btn btn--ghost" type="button" data-ask-close>Fechar</button>
    </div>
  </div>
</dialog>`;
}

/* ---------------------------------------------- plantao e solute cast lado a lado */
/* Os dois sao gratuitos e ficam no YouTube, mas sao coisas diferentes: o
   Plantao e aula ao vivo com hora marcada, o Solute Cast e podcast gravado.
   Por isso cada um tem o seu card, com visual proprio: o Plantao mostra a
   agenda, o Cast mostra o programa. */
function channels(opts) {
  const o = opts || {};
  const id = o.id || 'canais';
  const ep = SITE.cast.featured;
  const url = 'https://www.youtube.com/watch?v=' + ep.id;
  return `
<section class="section${o.surface ? ' ' + o.surface : ''}" aria-labelledby="${id}-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">${o.eyebrow || 'Conteúdo gratuito'}</p>
      <h2 id="${id}-titulo" class="measure" data-split="words" data-reveal="fade">${o.title || 'Duas formas de acompanhar a Solute'}</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="100">${o.lead || 'O Plantão RH Estratégico é aula ao vivo, toda semana. O Solute Cast é o nosso podcast, com episódios quinzenais. Os dois são gratuitos e ficam no YouTube.'}</p>
    </div>

    <div class="channels" data-stagger="120">

      <article class="channel channel--live" data-reveal="up">
        <div class="channel__media">
          <img class="channel__photo" src="media/rose-principal.webp"
               alt="Rosemeire Moreira, que apresenta o Plantão RH Estratégico" width="660" height="950" loading="lazy">
          <p class="live-tag channel__badge" data-live
             data-live-on="Ao vivo agora"
             data-live-off="Ao vivo · terça, ${SITE.live.time}"><span class="tag__dot tag__dot--live"></span> <span data-live-label>Ao vivo · terça, ${SITE.live.time}</span></p>
        </div>
        <div class="channel__body">
          <p class="channel__kicker">Aula ao vivo · toda semana</p>
          <h3 class="channel__title">Plantão RH Estratégico</h3>
          <p class="channel__text">Uma hora de aula sobre o que acontece dentro das empresas: liderança, conflito, retenção, remuneração e legislação. O chat fica aberto para perguntas.</p>
          <ul class="channel__facts">
            <li>${icon('calendar')} ${SITE.live.day}</li>
            <li>${icon('clock')} ${SITE.live.time}</li>
            <li>${icon('ticket')} Gratuito, sem inscrição</li>
          </ul>
          <div class="channel__cta">
            <a class="btn btn--primary" href="${SITE.social.youtube}" target="_blank" rel="noopener">${icon('youtube')} Assistir ao Plantão</a>
          </div>
        </div>
      </article>

      <article class="channel channel--cast" data-cast-card data-reveal="up">
        <div class="channel__media" data-cast-media>
          <div class="cast-card__bg" aria-hidden="true">
            <video src="media/solute-cast-teaser.mp4" poster="media/solute-cast-teaser.webp"
                   muted loop playsinline preload="none" tabindex="-1"></video>
          </div>
          <img class="channel__logo" src="media/logo-cast-branca.png" alt="Solute Cast" width="900" height="300" loading="lazy">
          <a class="play-btn play-btn--sm" href="${url}" target="_blank" rel="noopener"
             aria-label="Assistir ao episódio: ${ep.title}">${icon('play')}</a>
        </div>
        <div class="channel__body">
          <p class="channel__kicker">Podcast · a cada 15 dias</p>
          <h3 class="channel__title">Solute Cast</h3>
          <p class="channel__text">O podcast da Solute: conversas com convidados sobre casos reais de gestão de pessoas. Episódios quinzenais a partir de setembro.</p>
          <p class="channel__ep"><span>Episódio em destaque</span>${ep.title}</p>
          <div class="channel__cta">
            <a class="btn btn--ghost" href="solute-cast.html">Ver o Solute Cast ${icon('arrow')}</a>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>`;
}

module.exports = { clientMarquee, testimonials, ctaBand, values, stats, servicesGrid, castCard, askDialog, channels };
