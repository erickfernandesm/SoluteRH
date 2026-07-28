/* =============================================================================
   PAGINAS DE SERVICO (uma por item de SERVICES)
   Exporta um array: o gerador escreve consultoria-<slug>.html para cada um.
   ========================================================================== */

const { SITE, SERVICES } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

function page(svc, idx) {
  const others = SERVICES.filter((s) => s.slug !== svc.slug).slice(0, 4);

  const meta = {
    file: 'consultoria-' + svc.slug + '.html',
    page: 'consultoria',
    title: svc.title + ' | Consultoria Solute RH',
    description: svc.blurb.slice(0, 175),
    ogImage: 'og-default.jpg',
    ogType: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: svc.title,
      description: svc.blurb,
      serviceType: svc.title,
      provider: { '@type': 'Organization', name: SITE.legal, url: SITE.url },
      areaServed: { '@type': 'Country', name: 'Brasil' },
      url: SITE.url + '/consultoria-' + svc.slug + '.html',
    },
  };

  const delivers = svc.delivers
    .map(
      (d, i) => `
        <article class="card" data-reveal="up">
          <span class="card__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          <span class="card__ico">${icon('check')}</span>
          <h3 class="card__title">${d[0]}</h3>
          <p class="card__text">${d[1]}</p>
        </article>`
    )
    .join('');

  const pains = svc.pains
    .map((p) => `<li class="pain" data-reveal="up">${icon('x')}<span>${p}</span></li>`)
    .join('\n      ');

  const results = svc.results
    .map(
      (r) => `
          <li data-reveal="up">${icon('checkCircle')}<span><strong>${r}</strong></span></li>`
    )
    .join('');

  const related = others
    .map(
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
    )
    .join('');

  const waMsg = 'Olá! Tenho interesse no serviço de ' + svc.title + '. Podemos conversar?';

  const body = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="hero-sub__bg" aria-hidden="true">
    <img src="media/${svc.img}.webp" alt="" width="1122" height="1402">
  </div>
  <div class="wrap wrap--wide">
    <nav class="crumbs" aria-label="Você está aqui">
      <a href="index.html">Início</a>
      ${icon('chevronR')}
      <a href="consultoria.html">Consultoria</a>
      ${icon('chevronR')}
      <span aria-current="page">${svc.nav}</span>
    </nav>
    <p class="eyebrow" data-reveal="up">${svc.kicker}</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">${svc.title}</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">${svc.blurb}</p>
    <div class="row" style="margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="200">
      <a class="btn btn--primary btn--lg" href="${wa(waMsg)}" target="_blank" data-magnetic="0.22">
        Falar sobre este serviço ${icon('arrow')}
      </a>
      <a class="btn btn--ghost btn--lg" href="#entregaveis">Ver o que está incluso</a>
    </div>
  </div>
</section>

<!-- ================================================= CONTEXTO -->
<section class="section" aria-labelledby="contexto-titulo">
  <div class="wrap wrap--wide">

    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">O problema</p>
      <h2 id="contexto-titulo" class="measure" data-split="words" data-reveal="fade">Por que isso importa</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">${svc.lead}</p>
    </div>

    <p class="eyebrow eyebrow--center" style="margin-bottom:1.4rem" data-reveal="up">Sinais de alerta</p>

    <ul class="pain-grid" data-stagger="80">
      ${pains}
    </ul>

    <div class="quote-box quote-box--center" data-reveal="up" data-reveal-delay="120">
      <p><strong>Para quem é:</strong> ${svc.forWho}</p>
    </div>

  </div>
</section>

<!-- ================================================= ENTREGAVEIS -->
<section class="section surface-900 aura aura--soft" id="entregaveis" aria-labelledby="entregaveis-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">O que está incluso</p>
      <h2 id="entregaveis-titulo" class="measure" data-split="words" data-reveal="fade">Entregáveis do projeto</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Tudo o que sai deste projeto fica com a sua empresa: documentos, planilhas, políticas e
        o time treinado para manter a rotina rodando.
      </p>
    </div>

    <div class="grid grid-3" data-stagger="90">
      ${delivers}
    </div>
  </div>
</section>

<!-- ================================================= RESULTADOS -->
<section class="section" aria-labelledby="resultados-titulo">
  <div class="wrap wrap--wide">
    <div class="duo">

      <div class="figure figure--wide veil" data-reveal="right">
        <img src="media/${svc.img}.webp" alt="${svc.title}" width="1122" height="1402" loading="lazy" style="aspect-ratio:16/11;object-fit:cover">
      </div>

      <div>
        <p class="eyebrow" data-reveal="up">O que muda</p>
        <h2 id="resultados-titulo" data-split="words" data-reveal="fade">Resultados esperados</h2>
        <ul class="checks" style="margin-top:1.8rem" data-stagger="90">${results}
        </ul>
        <div style="margin-top:2.2rem" data-reveal="up">
          <a class="btn btn--primary" href="${wa(waMsg)}" target="_blank" data-magnetic="0.2">
            Quero esse resultado ${icon('arrow')}
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ================================================= COMO COMECA -->
<section class="section surface-900" aria-labelledby="inicio-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Primeiros passos</p>
      <h2 id="inicio-titulo" class="measure" data-split="words" data-reveal="fade">Como começa um projeto de ${svc.nav}</h2>
    </div>

    <ol class="steps steps--h" data-stagger="110">
      <li class="step" data-reveal="up">
        <span class="step__dot">01</span>
        <div class="step__body">
          <h3 class="step__title" style="font-size:1.05rem">Conversa inicial</h3>
          <p class="step__text" style="font-size:.9rem">30 minutos para entender o contexto, o porte e a urgência. Sem custo.</p>
        </div>
      </li>
      <li class="step" data-reveal="up">
        <span class="step__dot">02</span>
        <div class="step__body">
          <h3 class="step__title" style="font-size:1.05rem">Diagnóstico</h3>
          <p class="step__text" style="font-size:.9rem">Levantamento do que já existe e do que falta nesta frente específica.</p>
        </div>
      </li>
      <li class="step" data-reveal="up">
        <span class="step__dot">03</span>
        <div class="step__body">
          <h3 class="step__title" style="font-size:1.05rem">Proposta</h3>
          <p class="step__text" style="font-size:.9rem">Escopo, cronograma, investimento e indicadores, tudo por escrito.</p>
        </div>
      </li>
      <li class="step" data-reveal="up">
        <span class="step__dot">04</span>
        <div class="step__body">
          <h3 class="step__title" style="font-size:1.05rem">Execução</h3>
          <p class="step__text" style="font-size:.9rem">Implantação conduzida junto com o seu time, até a rotina rodar.</p>
        </div>
      </li>
    </ol>
  </div>
</section>

<!-- ================================================= OUTROS SERVICOS -->
<section class="section" aria-labelledby="outros-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Também pode interessar</p>
      <h2 id="outros-titulo" class="measure" data-split="words" data-reveal="fade">Outras frentes da consultoria</h2>
    </div>
    <div class="grid grid-4" data-stagger="80">
      ${related}
    </div>
    <div class="row" style="justify-content:center;margin-top:2.6rem" data-reveal="up">
      <a class="btn btn--ghost" href="consultoria.html">Ver os 8 serviços ${icon('arrow')}</a>
    </div>
  </div>
</section>

${B.testimonials({ surface: 'surface-900' })}

${B.ctaBand({
  eyebrow: svc.kicker,
  title: 'Vamos falar sobre ' + svc.nav + '?',
  text: 'Uma conversa de 30 minutos, sem custo, para entender se este é mesmo o serviço que a sua empresa precisa agora. Se não for, a gente aponta qual é.',
  waText: waMsg,
  cta: 'Agendar conversa',
})}

</main>
`;

  return { meta, body };
}

module.exports = () => SERVICES.map(page);
