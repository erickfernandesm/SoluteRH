/* =============================================================================
   CONSULTORIA (hub)
   ========================================================================== */

const { SITE, SERVICES } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

const meta = {
  file: 'consultoria.html',
  page: 'consultoria',
  title: 'Consultoria em RH | Solute RH',
  description:
    'Oito frentes de consultoria em recursos humanos: RH estratégico, cargos e salários, NR-01, liderança, avaliação de desempenho, clima, fit cultural e recrutamento.',
  ogImage: 'og-default.jpg',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Serviços de consultoria em RH',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: SITE.url + '/consultoria-' + s.slug + '.html',
    })),
  },
};

const body = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="hero-sub__bg" aria-hidden="true">
    <img src="media/conduzido-rose.webp" alt="" width="1672" height="941">
  </div>
  <div class="wrap wrap--wide">
    <nav class="crumbs" aria-label="Você está aqui">
      <a href="index.html">Início</a>
      ${icon('chevronR')}
      <span aria-current="page">Consultoria</span>
    </nav>
    <p class="eyebrow" data-reveal="up">Solute Consultoria</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">Consultoria de RH que entrega indicador, não relatório</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Projetos conduzidos dentro da sua empresa, com método validado em mais de 700 negócios.
      Começamos sempre pelo diagnóstico e montamos o escopo com o que você precisa agora.
    </p>
    <div class="row" style="margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="200">
      <a class="btn btn--primary btn--lg" href="${wa('Olá! Gostaria de agendar o diagnóstico gratuito da consultoria.')}" target="_blank" data-magnetic="0.22">
        Agendar diagnóstico gratuito ${icon('arrow')}
      </a>
      <a class="btn btn--ghost btn--lg" href="#servicos">Ver os 8 serviços</a>
    </div>
  </div>
</section>

<!-- ================================================= COMO ESCOLHER -->
<section class="section--tight" aria-labelledby="escolher-titulo">
  <div class="wrap wrap--wide">
    <div class="panel panel--brand" data-reveal="rise">
      <div class="panel__inner" style="padding-block:clamp(1.6rem,1.2rem+2vw,2.6rem)">
        <div class="duo duo--tight" style="align-items:center">
          <div>
            <h2 id="escolher-titulo" style="font-size:var(--fs-h4)">Não sabe por qual serviço começar?</h2>
            <p class="muted" style="margin-top:.7rem;font-size:.97rem">
              Normal. Na maioria das empresas o problema aparente não é o problema real.
              O diagnóstico gratuito existe justamente para apontar a prioridade certa antes de
              você investir em qualquer frente.
            </p>
          </div>
          <div class="row" style="justify-content:flex-end">
            <a class="btn btn--primary" href="${wa('Olá! Não sei por onde começar na consultoria. Podemos fazer o diagnóstico?')}" target="_blank" data-magnetic="0.2">
              Quero o diagnóstico ${icon('arrow')}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

${B.servicesGrid({
  title: 'Oito frentes para destravar a sua gestão de pessoas',
  text: 'Cada serviço funciona sozinho ou combinado com os outros. É comum um projeto começar por uma frente e abrir naturalmente para a seguinte.',
})}

<!-- ================================================= METODO -->
<section class="section surface-900 aura aura--soft" id="metodo" aria-labelledby="metodo-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Como conduzimos</p>
      <h2 id="metodo-titulo" class="measure" data-split="words" data-reveal="fade">O mesmo método em todos os projetos</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Muda o escopo, muda o setor, muda o porte. O que não muda é a sequência que garante
        que a entrega vire rotina de verdade dentro da empresa.
      </p>
    </div>

    <ol class="process" data-stagger="120">
      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">01</span>
        <span class="process__ico">${icon('search')}</span>
        <h3 class="process__title">Diagnóstico</h3>
        <p class="process__text">Conversa com a diretoria, leitura dos números existentes e escuta de quem opera. Saímos com o mapa do que está travando, em ordem de impacto no negócio.</p>
        <span class="process__meta">${icon('clock')} Sem custo · 30 minutos</span>
      </li>
      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">02</span>
        <span class="process__ico">${icon('file')}</span>
        <h3 class="process__title">Desenho da solução</h3>
        <p class="process__text">Escopo montado sob a sua realidade, com entregáveis, prazos, responsáveis e indicadores definidos antes de qualquer assinatura.</p>
        <span class="process__meta">${icon('check')} Escopo sob medida</span>
      </li>
      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">03</span>
        <span class="process__ico">${icon('handshake')}</span>
        <h3 class="process__title">Implantação lado a lado</h3>
        <p class="process__text">Construímos junto com o seu time, não por cima dele. Documentos e ferramentas ficam na casa, com quem vai usar já treinado.</p>
        <span class="process__meta">${icon('users')} Com a sua liderança junto</span>
      </li>
      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">04</span>
        <span class="process__ico">${icon('chart')}</span>
        <h3 class="process__title">Acompanhamento</h3>
        <p class="process__text">Medimos o antes e o depois nos indicadores combinados e ajustamos a rota. O objetivo declarado é você não precisar mais da consultoria naquela frente.</p>
        <span class="process__meta">${icon('target')} Até virar autonomia</span>
      </li>
    </ol>
  </div>
</section>

<!-- ================================================= PARA QUEM -->
<section class="section" aria-labelledby="paraquem-titulo">
  <div class="wrap wrap--wide">

    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Para quem é</p>
      <h2 id="paraquem-titulo" class="measure" data-split="words" data-reveal="fade">Empresas que já sentiram o limite do informal</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Atendemos indústria, comércio, serviços, saúde e educação. O que os clientes têm em
        comum não é o setor: é o momento.
      </p>
    </div>

    <ul class="pain-grid" data-stagger="80">
      <li class="pain pain--ok" data-reveal="up">${icon('checkCircle')}<span>Cresceram e perceberam que <strong>a gestão de pessoas não acompanhou</strong> o crescimento.</span></li>
      <li class="pain pain--ok" data-reveal="up">${icon('checkCircle')}<span>Têm um RH pequeno, sobrecarregado, <strong>sem tempo de pensar em estratégia</strong>.</span></li>
      <li class="pain pain--ok" data-reveal="up">${icon('checkCircle')}<span>Precisam se adequar à <strong>NR-01</strong> e não sabem por onde começar.</span></li>
      <li class="pain pain--ok" data-reveal="up">${icon('checkCircle')}<span>Estão <strong>perdendo gente boa</strong> e querem entender o porquê com dado, não com boato.</span></li>
      <li class="pain pain--ok" data-reveal="up">${icon('checkCircle')}<span>Vão passar por <strong>sucessão, fusão ou expansão</strong> e querem chegar preparadas.</span></li>
      <li class="pain pain--ok" data-reveal="up">${icon('checkCircle')}<span>Querem <strong>profissionalizar a gestão</strong> sem perder o jeito próprio da casa.</span></li>
    </ul>

  </div>
</section>

${B.stats({ hideHead: true, surface: 'surface-900' })}

${B.testimonials({})}

${B.clientMarquee({ surface: 'surface-900', label: 'Empresas atendidas pela Solute Consultoria' })}

${B.ctaBand({
  title: 'O diagnóstico é gratuito. O prejuízo de continuar como está, não.',
  text: 'Agende uma conversa de 30 minutos. Você sai dela sabendo exatamente qual frente atacar primeiro, mesmo que decida fazer por conta própria.',
})}

</main>
`;

module.exports = { meta, body };
