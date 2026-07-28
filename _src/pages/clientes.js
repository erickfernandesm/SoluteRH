/* =============================================================================
   CLIENTES
   ========================================================================== */

const { SITE, CLIENTS } = require('../site');
const { icon } = require('../icons');
const B = require('../blocks');

const meta = {
  file: 'clientes.html',
  page: 'clientes',
  title: 'Clientes | Solute RH',
  description:
    'Mais de 700 empresas atendidas pela Solute RH em indústria, comércio, serviços, saúde e educação. Conheça algumas delas e o que dizem sobre o trabalho.',
  ogImage: 'og-default.jpg',
};

const cells = CLIENTS.map(
  (c) => `
        <div class="logo-grid__cell">
          <img src="media/${c.file}.webp" alt="${c.name}" width="150" height="150" loading="lazy">
        </div>`
).join('');

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
      <span aria-current="page">Clientes</span>
    </nav>
    <p class="eyebrow" data-reveal="up">Quem confia na Solute RH</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">Mais de 700 empresas já sentaram nessa mesa</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      De indústria a educação, de operação com 15 pessoas a estrutura com centenas.
      O que muda é o contexto. O método é o mesmo.
    </p>
  </div>
</section>

<!-- ================================================= GRADE DE LOGOS -->
<section class="section" aria-labelledby="logos-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Alguns dos nossos clientes</p>
      <h2 id="logos-titulo" class="measure" data-split="words" data-reveal="fade">Marcas que já passaram por aqui</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Boa parte dos nossos projetos é confidencial, então nem toda empresa atendida aparece
        nesta lista. Estas autorizaram a divulgação.
      </p>
    </div>

    <div class="logo-grid" data-reveal="up">
      ${cells}
    </div>
  </div>
</section>

<!-- ================================================= SETORES -->
<section class="section surface-900 aura aura--soft" aria-labelledby="setores-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Onde atuamos</p>
      <h2 id="setores-titulo" class="measure" data-split="words" data-reveal="fade">Setores que já atendemos</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        A gestão de pessoas muda muito de um setor para o outro. Turnover em indústria não se
        trata como turnover em varejo, e liderança em saúde tem particularidades próprias.
      </p>
    </div>

    <div class="grid grid-3" data-stagger="100">
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('building')}</span>
        <h3 class="card__title">Indústria</h3>
        <p class="card__text">Turnover de chão de fábrica, escalas, plano de cargos com muitas faixas operacionais e conformidade com NR-01.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('layers')}</span>
        <h3 class="card__title">Comércio e varejo</h3>
        <p class="card__text">Alta rotatividade, remuneração variável, seleção em volume e formação rápida de liderança de loja.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('handshake')}</span>
        <h3 class="card__title">Serviços</h3>
        <p class="card__text">Retenção de especialistas, trilha de carreira técnica e estruturação de RH em empresas que cresceram rápido.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('heart')}</span>
        <h3 class="card__title">Saúde</h3>
        <p class="card__text">Escalas complexas, risco psicossocial elevado, gestão de equipes multidisciplinares e conformidade rigorosa.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('cap')}</span>
        <h3 class="card__title">Educação</h3>
        <p class="card__text">Corpo docente com regime próprio, avaliação de desempenho adaptada e clima organizacional em campus.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('sparkles')}</span>
        <h3 class="card__title">Tecnologia e digital</h3>
        <p class="card__text">Disputa por talento escasso, cultura em times remotos e estrutura de cargos para carreiras em Y.</p>
      </article>
    </div>
  </div>
</section>

${B.testimonials({ title: 'O que dizem sobre o trabalho' })}

<!-- ================================================= CASOS -->
<section class="section surface-900" aria-labelledby="casos-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Resultados típicos</p>
      <h2 id="casos-titulo" class="measure" data-split="words" data-reveal="fade">O que costuma mudar em seis meses</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Os números abaixo são a faixa observada em projetos de consultoria conduzidos pela
        Solute RH. Cada empresa tem o seu ponto de partida e o seu ritmo.
      </p>
    </div>

    <div class="grid grid-4" data-stagger="100">
      <div class="stat-card" data-reveal="up">
        <p class="stat__num"><span class="pre">até </span><span data-count="40">0</span><span class="suf">%</span></p>
        <p class="stat__label">de redução no turnover após estruturação de RH e liderança</p>
      </div>
      <div class="stat-card" data-reveal="up">
        <p class="stat__num"><span class="pre">até </span><span data-count="50">0</span><span class="suf">%</span></p>
        <p class="stat__label">menos tempo para fechar uma vaga com processo estruturado</p>
      </div>
      <div class="stat-card" data-reveal="up">
        <p class="stat__num"><span data-count="100">0</span><span class="suf">%</span></p>
        <p class="stat__label">da documentação exigida pela NR-01 organizada e auditável</p>
      </div>
      <div class="stat-card" data-reveal="up">
        <p class="stat__num"><span data-count="90">0</span><span class="suf">d</span></p>
        <p class="stat__label">é o prazo médio para o primeiro indicador começar a mexer</p>
      </div>
    </div>
  </div>
</section>


${B.ctaBand({
  title: 'Sua empresa pode ser a próxima dessa lista',
  text: 'Agende o diagnóstico gratuito. Em 30 minutos você entende onde está o gargalo da sua gestão de pessoas, com ou sem contrato depois.',
})}

</main>
`;

module.exports = { meta, body };
