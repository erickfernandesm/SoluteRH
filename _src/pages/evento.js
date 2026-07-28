/* =============================================================================
   EVENTO
   -----------------------------------------------------------------------------
   Esta pagina so e gerada quando EVENT.enabled === true em _src/site.js.
   Enquanto estiver false, o arquivo evento.html nao e criado, o link nao
   aparece no menu/rodape e a barra de anuncio fica desligada.

   PARA PUBLICAR O EVENTO:
     1. abra  _src/site.js
     2. no objeto EVENT, troque  enabled: false  por  enabled: true
     3. preencha name, date, dateISO, time, city, venue e announceText
     4. rode  node _tools/build-site.js
   ========================================================================== */

const { SITE, EVENT } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

const meta = {
  file: 'evento.html',
  page: 'evento',
  skip: !EVENT.enabled,          // <<< nao gera o arquivo enquanto estiver desligado
  title: EVENT.name + ' | Solute RH',
  description: EVENT.tagline + '. ' + EVENT.date + ', ' + EVENT.city + '.',
  ogImage: 'og-default.jpg',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: EVENT.name,
    description: EVENT.tagline,
    startDate: EVENT.dateISO || undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: EVENT.venue,
      address: { '@type': 'PostalAddress', addressLocality: EVENT.city, addressCountry: 'BR' },
    },
    organizer: { '@type': 'Organization', name: SITE.legal, url: SITE.url },
    url: SITE.url + '/' + EVENT.page,
  },
};

const waMsg = 'Olá! Quero informações sobre o ' + EVENT.name + '.';

const body = `
<main id="conteudo">

<section class="hero-sub aura" aria-labelledby="titulo">
  <div class="hero-sub__bg" aria-hidden="true">
    <img src="media/conduzido-rose.webp" alt="" width="1672" height="941">
  </div>
  <div class="wrap wrap--wide">
    <nav class="crumbs" aria-label="Você está aqui">
      <a href="index.html">Início</a>
      ${icon('chevronR')}
      <span aria-current="page">${EVENT.name}</span>
    </nav>

    <span class="tag tag--brand" data-reveal="up">${icon('ticket')} Evento presencial</span>

    <h1 class="hero-sub__title" id="titulo" style="margin-top:1.2rem" data-split="words" data-reveal="fade">${EVENT.name}</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">${EVENT.tagline}</p>

    <div class="row" style="margin-top:2rem;gap:.7rem" data-reveal="up" data-reveal-delay="180">
      <span class="tag">${icon('calendar')} ${EVENT.date}</span>
      <span class="tag">${icon('clock')} ${EVENT.time}</span>
      <span class="tag">${icon('pin')} ${EVENT.city}</span>
    </div>

    <div class="row" style="margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="230">
      <a class="btn btn--primary btn--lg" href="${wa(waMsg)}" target="_blank" data-magnetic="0.22">
        ${EVENT.ctaLabel} ${icon('arrow')}
      </a>
      <a class="btn btn--ghost btn--lg" href="#programacao">Ver a programação</a>
    </div>
  </div>
</section>

<!-- ================================================= SOBRE -->
<section class="section" aria-labelledby="sobre-titulo">
  <div class="wrap wrap--wide">
    <div class="duo">
      <div>
        <p class="eyebrow" data-reveal="up">Sobre o encontro</p>
        <h2 id="sobre-titulo" data-split="words" data-reveal="fade">Um dia para sair com plano, não com anotação</h2>
        <p class="lead" style="margin-top:1.2rem" data-reveal="up" data-reveal-delay="100">
          Conteúdo aplicado, casos reais de empresas brasileiras e espaço para você levar a sua
          situação específica. Nada de palestra motivacional genérica.
        </p>
        <ul class="checks" style="margin-top:2rem" data-stagger="90">
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Conteúdo prático</strong> conduzido por quem executa projeto dentro de empresa.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Networking real</strong> com empresários e profissionais de RH da região.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Material de apoio</strong> para você aplicar já na semana seguinte.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Vagas limitadas</strong> para garantir a troca entre os participantes.</span></li>
        </ul>
      </div>

      <div class="figure figure--wide veil" data-reveal="left">
        <img src="media/conduzido-rose.webp" alt="Encontro conduzido pela Solute RH" width="1672" height="941" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- ================================================= PROGRAMACAO -->
<section class="section surface-900" id="programacao" aria-labelledby="prog-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow" data-reveal="up">Programação</p>
        <h2 id="prog-titulo" data-split="words" data-reveal="fade">Como vai ser o dia</h2>
      </div>
      <p class="lead" data-reveal="up" data-reveal-delay="100">
        A grade completa será divulgada em breve. Abaixo, a estrutura geral do encontro.
      </p>
    </div>

    <ol class="steps" data-stagger="120">
      <li class="step" data-reveal="up">
        <span class="step__dot">01</span>
        <div class="step__body">
          <h3 class="step__title">Abertura e diagnóstico coletivo</h3>
          <p class="step__text">Onde está travando a gestão de pessoas das empresas presentes, em números e em prática.</p>
        </div>
      </li>
      <li class="step" data-reveal="up">
        <span class="step__dot">02</span>
        <div class="step__body">
          <h3 class="step__title">Blocos temáticos</h3>
          <p class="step__text">Liderança, remuneração, conformidade e retenção, cada um com ferramenta aplicável na mão.</p>
        </div>
      </li>
      <li class="step" data-reveal="up">
        <span class="step__dot">03</span>
        <div class="step__body">
          <h3 class="step__title">Mesa aberta</h3>
          <p class="step__text">Espaço para os participantes levarem casos reais e discutirem entre pares, com condução da Solute RH.</p>
        </div>
      </li>
      <li class="step" data-reveal="up">
        <span class="step__dot">04</span>
        <div class="step__body">
          <h3 class="step__title">Encerramento e plano de ação</h3>
          <p class="step__text">Cada participante sai com as três prioridades da própria empresa definidas por escrito.</p>
        </div>
      </li>
    </ol>
  </div>
</section>

<!-- ================================================= LOCAL -->
<section class="section" aria-labelledby="local-titulo">
  <div class="wrap wrap--wide">
    <div class="panel panel--brand" data-reveal="rise">
      <div class="panel__inner">
        <div class="duo duo--tight" style="align-items:center">
          <div>
            <p class="eyebrow">Onde e quando</p>
            <h2 id="local-titulo" style="font-size:var(--fs-h3)">${EVENT.venue}</h2>
            <div class="footer__contact" style="margin-top:1.4rem">
              <p>${icon('calendar')}<span>${EVENT.date}</span></p>
              <p>${icon('clock')}<span>${EVENT.time}</span></p>
              <p>${icon('pin')}<span>${EVENT.city}</span></p>
            </div>
          </div>
          <div class="row" style="justify-content:flex-end">
            <a class="btn btn--primary btn--lg" href="${wa(waMsg)}" target="_blank" data-magnetic="0.22">
              ${EVENT.ctaLabel} ${icon('arrow')}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

${B.clientMarquee({ surface: 'surface-900', label: 'Empresas que caminham com a Solute RH' })}

${B.ctaBand({
  eyebrow: EVENT.name,
  title: 'Garanta o seu lugar',
  text: 'As vagas são limitadas para manter a qualidade da troca entre os participantes. Chame no WhatsApp para entrar na lista.',
  waText: waMsg,
  cta: EVENT.ctaLabel,
  note: EVENT.date + ' · ' + EVENT.city,
})}

</main>
`;

module.exports = { meta, body };
