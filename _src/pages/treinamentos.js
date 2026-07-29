/* =============================================================================
   TREINAMENTOS
   Uma pagina, uma secao por formato, cada uma com a sua ancora (usada pelo
   menu suspenso e pelo indice lateral).
   ========================================================================== */

const { SITE, TRAININGS } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

const meta = {
  file: 'treinamentos.html',
  page: 'treinamentos',
  title: 'Treinamentos | Solute RH',
  description:
    'Treinamentos fechados conduzidos dentro da sua empresa: Academia de Líderes, palestras para eventos internos, saúde mental para lideranças e team building com propósito.',
  ogImage: 'og-default.jpg',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Treinamentos da Solute RH',
    itemListElement: TRAININGS.map((x, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: x.title,
      description: x.short,
      url: SITE.url + '/treinamentos.html#' + x.slug,
    })),
  },
};

/* ------------------------------------------------------------- navegacao */
const atalhos = TRAININGS.map(
  (x) => `<a class="chip" href="#${x.slug}">${x.title}</a>`
).join('\n        ');

/* ---------------------------------------------------------- uma secao ---- */
function secao(x, i) {
  const par = i % 2 === 1;
  const waMsg = 'Olá! Gostaria de saber mais sobre o treinamento de ' + x.title + '.';

  const topicos = x.topics
    .map(
      (tp) => `
          <li data-reveal="up">${icon('checkCircle')}<span><strong>${tp[0]}</strong>. ${tp[1]}</span></li>`
    )
    .join('');

  return `
<section class="section${par ? ' surface-900' : ''}${i === 0 ? ' aura aura--soft' : ''}" id="${x.slug}" aria-labelledby="${x.slug}-titulo">
  <div class="wrap wrap--wide">
    <div class="duo${par ? ' duo--reverse' : ''}">

      <div>
        <span class="emblem" style="margin-inline:0" data-reveal="zoom">${icon(x.icon)}</span>
        <p class="eyebrow" data-reveal="up">Treinamento</p>
        <h2 id="${x.slug}-titulo" data-split="words" data-reveal="fade">${x.title}</h2>
        <p class="lead" style="margin-top:1.1rem" data-reveal="up" data-reveal-delay="100">${x.lead}</p>

        <ul class="checks" style="margin-top:2rem" data-stagger="90">${topicos}
        </ul>

        <div class="row" style="margin-top:2.2rem" data-reveal="up" data-reveal-delay="180">
          <a class="btn btn--primary" href="${wa(waMsg)}" target="_blank" data-magnetic="0.2">
            Falar sobre este treinamento ${icon('arrow')}
          </a>
        </div>
      </div>

      <div class="stack" style="gap:.8rem" data-reveal="${par ? 'right' : 'left'}">
        <div class="ep">
          <span class="ep__ico" style="color:var(--brand)">${icon('layers')}</span>
          <div>
            <h3 class="ep__title">Formato</h3>
            <p class="ep__meta"><span>${x.format}</span></p>
          </div>
        </div>
        <div class="ep">
          <span class="ep__ico" style="color:var(--brand)">${icon('clock')}</span>
          <div>
            <h3 class="ep__title">Duração</h3>
            <p class="ep__meta"><span>${x.duration}</span></p>
          </div>
        </div>
        <div class="ep">
          <span class="ep__ico" style="color:var(--brand)">${icon('users')}</span>
          <div>
            <h3 class="ep__title">Para quem é</h3>
            <p class="ep__meta"><span>${x.forWho}</span></p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>`;
}

const body = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="hero-sub__bg" aria-hidden="true">
    <img src="media/desenvolvimento-de-lideranca.webp" alt="" width="1122" height="1402">
  </div>
  <div class="wrap wrap--wide">
    <nav class="crumbs" aria-label="Você está aqui">
      <a href="index.html">Início</a>
      ${icon('chevronR')}
      <span aria-current="page">Treinamentos</span>
    </nav>
    <p class="eyebrow eyebrow--center" data-reveal="up">Formatos fechados</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">Treinamento que cabe na realidade da sua empresa</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Turmas fechadas, conduzidas dentro da sua empresa, com a pauta montada a partir do que
      está acontecendo aí. Nada de conteúdo de prateleira.
    </p>

    <div class="chips" style="justify-content:center;margin-top:2.2rem" data-reveal="up" data-reveal-delay="200">
      ${atalhos}
    </div>
  </div>
</section>

${TRAININGS.map(secao).join('\n')}

<!-- ================================================= COMO FUNCIONA -->
<section class="section" aria-labelledby="como-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Como funciona</p>
      <h2 id="como-titulo" class="measure" data-split="words" data-reveal="fade">Do primeiro contato ao encontro</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Todo treinamento é montado sob medida. O caminho é sempre o mesmo, independente do formato.
      </p>
    </div>

    <ol class="process" data-stagger="120">
      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">01</span>
        <span class="process__ico">${icon('search')}</span>
        <h3 class="process__title">Conversa inicial</h3>
        <p class="process__text">Entendemos o contexto, o público e o que a empresa quer que mude depois do encontro.</p>
        <span class="process__meta">${icon('clock')} Sem custo</span>
      </li>
      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">02</span>
        <span class="process__ico">${icon('file')}</span>
        <h3 class="process__title">Desenho da pauta</h3>
        <p class="process__text">A partir daí montamos o conteúdo, a carga horária e o formato, com proposta por escrito.</p>
        <span class="process__meta">${icon('check')} Sob medida</span>
      </li>
      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">03</span>
        <span class="process__ico">${icon('users')}</span>
        <h3 class="process__title">Condução</h3>
        <p class="process__text">O encontro acontece na sua empresa ou on-line, com material de apoio para cada participante.</p>
        <span class="process__meta">${icon('megaphone')} Presencial ou remoto</span>
      </li>
      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">04</span>
        <span class="process__ico">${icon('chart')}</span>
        <h3 class="process__title">Devolutiva</h3>
        <p class="process__text">A liderança recebe o que foi observado durante o treinamento e o que precisa sustentar depois.</p>
        <span class="process__meta">${icon('target')} Com plano de continuidade</span>
      </li>
    </ol>
  </div>
</section>

${B.testimonials({ surface: 'surface-900', title: 'O que dizem sobre o trabalho' })}

${B.ctaBand({
  eyebrow: 'Treinamentos',
  title: 'Conte o que precisa acontecer com o seu time',
  text: 'A partir de uma conversa a gente monta o formato, a carga horária e a pauta. Se o melhor caminho for outro serviço, dizemos isso também.',
  waText: 'Olá! Gostaria de falar sobre os treinamentos da Solute RH.',
  cta: 'Falar sobre treinamentos',
})}

</main>
`;

module.exports = { meta, body };
