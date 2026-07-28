/* =============================================================================
   QUEM SOMOS
   ========================================================================== */

const { SITE, TEAM, TEAM_CTA } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

const meta = {
  file: 'quem-somos.html',
  page: 'quem-somos',
  title: 'Quem somos | Solute RH',
  description:
    'Conheça a Solute RH e a história de Rosemeire Moreira: 15 anos de experiência levando estruturação de RH para empresas brasileiras de todos os portes.',
  ogImage: 'og-default.jpg',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Quem somos | Solute RH',
    url: SITE.url + '/quem-somos.html',
    about: { '@type': 'Organization', name: SITE.legal, url: SITE.url },
  },
};

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
      <span aria-current="page">Quem somos</span>
    </nav>
    <p class="eyebrow" data-reveal="up">A Solute RH</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">Gente boa não basta. Precisa de estrutura.</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Nascemos para levar a estruturação de gestão de pessoas que só as grandes corporações
      tinham até as empresas que realmente movem a economia brasileira.
    </p>
  </div>
</section>

<!-- ================================================= HISTORIA -->
<section class="section" aria-labelledby="historia-titulo">
  <div class="wrap wrap--wide">
    <div class="duo">

      <div class="figure-frame" data-reveal="right">
        <div class="figure figure--portrait veil">
          <img src="media/rose-principal.webp" alt="Rosemeire Moreira, fundadora da Solute RH" width="660" height="950" data-parallax="0.06">
        </div>
        <div class="badge-float badge-float--br">
          <b>15+</b>
          <span>anos em gestão de pessoas</span>
        </div>
      </div>

      <div>
        <p class="eyebrow" data-reveal="up">A fundadora</p>
        <h2 id="historia-titulo" data-split="words" data-reveal="fade">Rosemeire Moreira</h2>
        <p class="lead" style="margin-top:.9rem" data-reveal="up" data-reveal-delay="90">
          Especialista em RH Estratégico, Liderança e Gestão de Pessoas.
        </p>

        <div class="prose" style="margin-top:1.6rem" data-reveal="up" data-reveal-delay="150">
          <p>
            Durante mais de 15 anos dentro de empresas brasileiras, a Rose viu o mesmo roteiro
            se repetir em setores completamente diferentes. Negócios competentes, com produto bom
            e gente dedicada, travados no mesmo ponto: <strong>não havia estrutura de gestão de pessoas</strong>.
          </p>
          <p>
            Contratava-se no susto. Promovia-se por percepção. O salário era negociado caso a caso.
            E quando alguém importante saía, a empresa descobria o problema tarde demais,
            na entrevista de desligamento.
          </p>
          <p>
            O diagnóstico era sempre o mesmo, mas a solução estava disponível só para quem podia
            bancar uma consultoria de grande porte. A Solute RH nasceu exatamente aí:
            <strong>método de gente grande, no tamanho e no orçamento de quem produz de verdade</strong>.
          </p>
        </div>

        <div class="row" style="margin-top:2rem;gap:.6rem" data-reveal="up" data-reveal-delay="220">
          <span class="tag">${icon('building')} Consultoria B2B</span>
          <span class="tag">${icon('cap')} Solute Cursos</span>
          <span class="tag">${icon('mic')} Solute Cast</span>
        </div>

        <div style="margin-top:2rem" data-reveal="up" data-reveal-delay="260">
          <a class="btn btn--primary" href="${wa('Olá! Vim pelo site e gostaria de falar diretamente com a equipe da Solute RH.')}" target="_blank" data-magnetic="0.2">
            Falar com a nossa equipe ${icon('arrow')}
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ================================================= PROPOSITO -->
<section class="section surface-900 aura aura--soft" aria-labelledby="proposito-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">O que nos move</p>
      <h2 id="proposito-titulo" class="measure" data-split="words" data-reveal="fade">Fortalecer negócios através de pessoas</h2>
    </div>

    <div class="grid grid-3" data-stagger="120">
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('compass')}</span>
        <h3 class="card__title">Propósito</h3>
        <p class="card__text">Tornar a boa gestão de pessoas acessível a empresas de todos os portes, com método validado e linguagem que o empresário entende.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('eye')}</span>
        <h3 class="card__title">Visão</h3>
        <p class="card__text">Ser a referência em RH estratégico para negócios brasileiros que querem crescer sem perder gente boa no caminho.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('handshake')}</span>
        <h3 class="card__title">Como trabalhamos</h3>
        <p class="card__text">Diagnóstico antes de proposta, escopo sob medida e entrega feita lado a lado com o seu time, até a rotina rodar sozinha.</p>
      </article>
    </div>
  </div>
</section>

${B.values({})}

<!-- ================================================= TIME -->
<section class="section surface-900" aria-labelledby="time-titulo">
  <div class="wrap wrap--wide">
    <div class="duo duo--reverse">

      <div>
        <p class="eyebrow" data-reveal="up">O time</p>
        <h2 id="time-titulo" data-split="words" data-reveal="fade">Uma equipe pequena, próxima e especialista</h2>
        <p class="lead" style="margin-top:1.2rem" data-reveal="up" data-reveal-delay="100">
          Na Solute RH você não fala com um comercial e depois é repassado para um estagiário.
          Quem conduz o diagnóstico é quem entrega o projeto.
        </p>

        <ul class="checks" style="margin-top:2rem" data-stagger="90">
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Atendimento direto</strong> com quem executa o projeto, do começo ao fim.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Sigilo absoluto</strong> sobre tudo o que vemos dentro da empresa.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Presença nacional</strong>, com base em Juiz de Fora e projetos em todo o Brasil.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Formação continuada</strong>: o que ensinamos nos cursos é o que praticamos na consultoria.</span></li>
        </ul>
      </div>

      <!-- a foto e 4:3; a moldura acompanha para nao cortar ninguem -->
      <div class="figure veil" style="aspect-ratio:4/3" data-reveal="right">
        <img src="media/foto-time.webp" alt="Equipe da Solute RH" width="800" height="600">
      </div>

    </div>
  </div>
</section>


<!-- ================================================= EQUIPE -->
<section class="section aura aura--soft" id="equipe" aria-labelledby="equipe-titulo">
  <div class="wrap wrap--wide">

    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Quem faz acontecer</p>
      <h2 id="equipe-titulo" class="measure" data-split="words" data-reveal="fade">A equipe Solute</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Psicólogas organizacionais, administradoras e especialistas em RH estratégico.
        Gente que entra na sua empresa para resolver, não para apresentar slide.
      </p>
    </div>

    <ul class="team" data-stagger="80">
${TEAM.map(
  (m) => `      <li class="person${m.founder ? ' person--founder' : ''}" data-reveal="up">
        <span class="person__ring">
          <img src="media/time-${m.photo}.webp" alt="${m.name}" width="440" height="440" loading="lazy" decoding="async">
        </span>
        <span class="person__tag">${m.tag}</span>
        <h3 class="person__name">${m.name}</h3>
        <p class="person__role">${m.role}</p>
        <p class="person__text">${m.text}</p>
      </li>`
).join('\n')}

      <li class="person person--open" data-reveal="up">
        <span class="person__ring">
          <img src="media/time-${TEAM_CTA.photo}.webp" alt="" width="440" height="440" loading="lazy">
        </span>
        <span class="person__tag">${TEAM_CTA.tag}</span>
        <h3 class="person__name">${TEAM_CTA.name}</h3>
        <p class="person__role">${TEAM_CTA.role}</p>
        <p class="person__text">${TEAM_CTA.text}</p>
        <a class="btn btn--primary btn--sm person__cta"
           href="${wa('Olá! Gostaria de enviar meu currículo para a Solute RH.')}" target="_blank">
          ${icon('whatsapp')} Enviar currículo
        </a>
      </li>
    </ul>

  </div>
</section>

${B.stats({ title: 'O que construímos até aqui' })}

${B.testimonials({ surface: 'surface-900' })}

${B.clientMarquee({ label: 'Empresas que já passaram por aqui' })}

${B.ctaBand({
  eyebrow: 'Vamos conversar',
  title: 'Conte o que está travando a sua gestão de pessoas',
  text: 'A primeira conversa é gratuita e serve para uma coisa só: entender o seu contexto e apontar onde está o gargalo. Se não fizer sentido trabalharmos juntos, a gente diz isso também.',
})}

</main>
`;

module.exports = { meta, body };
