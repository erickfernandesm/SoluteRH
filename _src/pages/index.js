/* =============================================================================
   HOME
   ========================================================================== */

const { SITE, SERVICES, EVENT } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

const meta = {
  file: 'index.html',
  page: 'index',
  title: 'Solute RH | Consultoria em RH Estratégico e Gestão de Pessoas',
  description:
    'Consultoria de RH que organiza a gestão de pessoas com método validado: RH estratégico, cargos e salários, NR-01, liderança e recrutamento. +700 empresas atendidas.',
  ogImage: 'og-default.jpg',
  preload: [{ href: 'media/tour-escritorio-poster.webp', as: 'image' }],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': SITE.url + '/#organizacao',
    name: SITE.legal,
    alternateName: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    logo: SITE.url + '/media/logo-solute.svg',
    image: SITE.url + '/media/og-default.jpg',
    telephone: '+' + SITE.phoneRaw,
    email: SITE.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: 'BR',
    },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.youtube],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      ratingCount: '32',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Consultoria em Recursos Humanos',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.short },
      })),
    },
  },
};

/* ------------------------------------------------------------------ HERO */
const hero = `
<main id="conteudo">

<section class="hero hero--center" id="inicio" aria-label="Apresentação">
  <div class="hero__media">
    <!-- no celular o js troca para a versao vertical (9:16), que enquadra melhor -->
    <video
      src="media/tour-escritorio.mp4"
      poster="media/tour-escritorio-poster.webp"
      data-src-mobile="media/tour-escritorio-vertical.mp4"
      data-poster-mobile="media/tour-escritorio-vertical-poster.webp"
      autoplay muted loop playsinline preload="metadata"
      aria-hidden="true" tabindex="-1"></video>
  </div>
  <div class="hero__glow" aria-hidden="true"></div>

  <div class="wrap wrap--wide hero__inner">
    <div class="hero__content">

      <p class="eyebrow eyebrow--center" data-reveal="up">Consultoria em RH · Juiz de Fora e todo o Brasil</p>

      <h1 class="hero__title" data-reveal="fade" data-reveal-delay="120">
        <span class="split-line"><span class="split-word" style="--word-delay:0ms">Fortalecemos</span></span>
        <span class="split-line"><span class="split-word" style="--word-delay:110ms">negócios</span> <span class="split-word" style="--word-delay:190ms">através</span></span>
        <span class="split-line"><span class="split-word" style="--word-delay:270ms">de</span> <span class="split-word" style="--word-delay:340ms"><span class="mark">pessoas</span></span></span>
      </h1>

      <p class="hero__lead" data-reveal="up" data-reveal-delay="520">
        Organizamos a gestão de pessoas da sua empresa com <strong>soluções personalizadas</strong>,
        <strong>líderes preparados</strong> e uma cultura alinhada aos objetivos do negócio.
        Somos o motor que impulsiona performance, engajamento e crescimento sustentável.
      </p>

      <div class="hero__cta" data-reveal="up" data-reveal-delay="640">
        <a class="btn btn--primary btn--lg" href="${wa()}" target="_blank" data-magnetic="0.24">
          Diagnóstico gratuito ${icon('arrow')}
        </a>
        <a class="btn btn--ghost btn--lg" href="consultoria.html">
          Conheça nossas soluções
        </a>
      </div>

      <p class="hero__place" data-reveal="up" data-reveal-delay="720">
        ${icon('pin')} Nosso escritório · Juiz de Fora, MG
      </p>

    </div>

    <div class="hero__stats" data-reveal="up" data-reveal-delay="800">
      <div class="hero__stat">
        <b>+<span data-count="700">0</span></b>
        <span>empresas atendidas</span>
      </div>
      <div class="hero__stat">
        <b>+<span data-count="16000">0</span></b>
        <span>profissionais formados</span>
      </div>
      <div class="hero__stat">
        <b><span data-count="15">0</span>+</b>
        <span>anos de experiência</span>
      </div>
      <div class="hero__stat">
        <b><span data-count="5" data-count-decimals="1">0</span>★</b>
        <span>avaliação no Google</span>
      </div>
    </div>

  </div>
</section>
`;

/* ------------------------------------------------------------- O PROBLEMA */
const problema = `
<section class="section gridlines" aria-labelledby="problema-titulo">
  <div class="wrap wrap--wide">

    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">O diagnóstico honesto</p>
      <h2 id="problema-titulo" class="measure" data-split="words" data-reveal="fade">Se qualquer uma destas frases parece familiar, o problema não é o time</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        É estrutura. E estrutura se constrói, normalmente em menos tempo e por menos dinheiro
        do que custa continuar convivendo com o problema.
      </p>
    </div>

    <ul class="pain-grid" data-stagger="80">
      <li class="pain" data-reveal="up">${icon('x')}<span>Você contrata, treina e, seis meses depois, <strong>a pessoa vai embora</strong>. E o ciclo recomeça.</span></li>
      <li class="pain" data-reveal="up">${icon('x')}<span>Cada gestor conduz o time do seu jeito. <strong>Não existe um padrão</strong> de liderança na casa.</span></li>
      <li class="pain" data-reveal="up">${icon('x')}<span>Aumento salarial é decidido caso a caso, <strong>sem critério nenhum</strong>. E todo mundo sabe.</span></li>
      <li class="pain" data-reveal="up">${icon('x')}<span>Você descobre que o clima está ruim <strong>na entrevista de desligamento</strong>.</span></li>
      <li class="pain" data-reveal="up">${icon('x')}<span>A NR-01 virou exigência e ninguém sabe <strong>o que a fiscalização vai pedir</strong>.</span></li>
      <li class="pain" data-reveal="up">${icon('x')}<span>O RH está ocupado demais apagando incêndio <strong>para pensar em estratégia</strong>.</span></li>
    </ul>

    <div class="row" style="justify-content:center;margin-top:2.8rem" data-reveal="up">
      <a class="btn btn--primary btn--lg" href="${wa('Olá! Vi o site da Solute RH e me identifiquei com os sinais de RH desestruturado. Gostaria de conversar.')}" target="_blank" data-magnetic="0.2">
        Quero destravar isso ${icon('arrow')}
      </a>
    </div>

  </div>
</section>
`;

/* ---------------------------------------------------------------- PILARES */
const pilares = `
<section class="section surface-900 aura aura--right" id="divisoes" aria-labelledby="divisoes-titulo">
  <div class="wrap wrap--wide">

    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Três frentes, um mesmo método</p>
      <h2 id="divisoes-titulo" class="measure" data-split="words" data-reveal="fade">A Solute RH atua onde a gestão de pessoas acontece</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="140">
        Consultoria para estruturar por dentro, cursos para formar quem executa e conteúdo
        semanal para manter empresário e RH atualizados.
      </p>
    </div>

    <div class="grid grid-3" data-stagger="130">

      <article class="pillar" data-reveal="up">
        <img class="pillar__logo" src="media/logo-consultoria-branca.png" alt="Solute Consultoria" width="900" height="248" loading="lazy">
        <h3 class="pillar__title">Consultoria</h3>
        <p class="pillar__text">Projetos B2B conduzidos dentro da sua empresa, com método validado e acompanhamento direto da nossa equipe até a solução estar rodando.</p>
        <ul class="pillar__list">
          <li>${icon('check')}<span>Diagnóstico antes de qualquer proposta</span></li>
          <li>${icon('check')}<span>Escopo montado sob a sua realidade</span></li>
          <li>${icon('check')}<span>Entrega com indicador, não com relatório</span></li>
        </ul>
        <div class="pillar__foot">
          <a class="link-arrow" href="consultoria.html">Ver os 8 serviços ${icon('arrow')}</a>
        </div>
      </article>

      <article class="pillar" data-reveal="up">
        <img class="pillar__logo" src="media/logo-cursos-branca.png" alt="Solute Cursos" width="900" height="330" loading="lazy">
        <h3 class="pillar__title">Cursos</h3>
        <p class="pillar__text">Plataforma de formação para profissionais de RH e empresários que precisam executar por conta própria, com material pronto e certificação reconhecida.</p>
        <ul class="pillar__list">
          <li>${icon('check')}<span>+16.000 alunos formados</span></li>
          <li>${icon('check')}<span>Mais de 20 cursos on-line</span></li>
          <li>${icon('check')}<span>Certificação MEC no Método RH Estratégico</span></li>
        </ul>
        <div class="pillar__foot">
          <a class="link-arrow" href="cursos.html">Ver os cursos ${icon('arrow')}</a>
        </div>
      </article>

      <article class="pillar" data-reveal="up">
        <img class="pillar__logo" src="media/logo-cast-branca.png" alt="Solute Cast" width="900" height="300" loading="lazy">
        <h3 class="pillar__title">Cast</h3>
        <p class="pillar__text">Conversa semanal sobre gestão de pessoas, ao vivo, com a Rosemeire Moreira. De graça, sem enrolação e com pergunta aberta da audiência.</p>
        <ul class="pillar__list">
          <li>${icon('check')}<span>${SITE.live.day} às ${SITE.live.time}</span></li>
          <li>${icon('check')}<span>Ao vivo no YouTube, com chat aberto</span></li>
          <li>${icon('check')}<span>Casos reais de empresas brasileiras</span></li>
        </ul>
        <div class="pillar__foot">
          <a class="link-arrow" href="solute-cast.html">Assistir às lives ${icon('arrow')}</a>
        </div>
      </article>

    </div>
  </div>
</section>
`;

/* ------------------------------------------------------------------ ROSE */
const rose = `
<section class="section" id="rose" aria-labelledby="rose-titulo">
  <div class="wrap wrap--wide">
    <div class="duo">

      <div class="figure-frame portrait-cap" data-reveal="right">
        <div class="figure figure--portrait veil">
          <img src="media/rose-principal.webp" alt="Rosemeire Moreira, fundadora da Solute RH" width="660" height="950" loading="lazy" data-parallax="0.06">
        </div>
        <div class="badge-float badge-float--br">
          <b>15+</b>
          <span>anos transformando gestão de pessoas</span>
        </div>
      </div>

      <div>
        <p class="eyebrow" data-reveal="up">Quem conduz</p>
        <h2 id="rose-titulo" data-split="words" data-reveal="fade">Rosemeire Moreira</h2>
        <p class="lead" style="margin-top:1rem" data-reveal="up" data-reveal-delay="100">
          Especialista em RH Estratégico, Liderança e Gestão de Pessoas.
        </p>

        <div class="stack" style="gap:1.15rem;margin-top:1.6rem;color:var(--fog-300)">
          <p data-reveal="up" data-reveal-delay="160">
            Depois de mais de 15 anos dentro de empresas brasileiras, a Rose identificou um padrão
            que se repetia em praticamente todas: <strong style="color:var(--fog-50)">negócios competentes,
            travados pela falta de estrutura de gestão de pessoas</strong>. Não era falta de vontade
            nem de gente boa. Era falta de método.
          </p>
          <p data-reveal="up" data-reveal-delay="220">
            A Solute RH nasceu para levar a estruturação de RH que só as grandes corporações tinham
            para empresas de todos os portes. Hoje, à frente da consultoria, ela conduz projetos,
            forma turmas na Solute Cursos e apresenta o Solute Cast.
          </p>
        </div>

        <div class="grid grid-2" style="margin-top:2rem;gap:1rem" data-stagger="90">
          <div class="card" data-reveal="up" style="padding:1.15rem 1.3rem">
            <span class="card__ico" style="width:40px;height:40px;margin-bottom:.8rem">${icon('cap')}</span>
            <h3 class="card__title" style="font-size:1rem">Solute Cursos</h3>
            <p class="card__text" style="font-size:.88rem">+16 mil alunos formados em mais de 20 cursos on-line.</p>
          </div>
          <div class="card" data-reveal="up" style="padding:1.15rem 1.3rem">
            <span class="card__ico" style="width:40px;height:40px;margin-bottom:.8rem">${icon('mic')}</span>
            <h3 class="card__title" style="font-size:1rem">Solute Cast</h3>
            <p class="card__text" style="font-size:.88rem">Apresentadora do programa semanal ao vivo no YouTube.</p>
          </div>
        </div>

        <div style="margin-top:2rem" data-reveal="up" data-reveal-delay="280">
          <a class="link-arrow" href="quem-somos.html">Conhecer a história completa ${icon('arrow')}</a>
        </div>
      </div>

    </div>
  </div>
</section>
`;

/* ---------------------------------------------------------------- METODO */
const metodo = `
<section class="section surface-900 aura aura--soft" id="metodo" aria-labelledby="metodo-titulo">
  <div class="wrap wrap--wide">

    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Como funciona</p>
      <h2 id="metodo-titulo" class="measure" data-split="words" data-reveal="fade">Um método em quatro tempos</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Nada de proposta genérica. Todo projeto na Solute RH começa entendendo a sua operação
        e termina com a rotina rodando sem depender da gente.
      </p>
    </div>

    <ol class="process" data-stagger="120">

      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">01</span>
        <span class="process__ico">${icon('search')}</span>
        <h3 class="process__title">Diagnóstico</h3>
        <p class="process__text">Conversa com a diretoria, leitura dos números que já existem e escuta de quem opera. Saímos daqui com o mapa do que está travando, em ordem de impacto.</p>
        <span class="process__meta">${icon('clock')} Sem custo · 30 minutos</span>
      </li>

      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">02</span>
        <span class="process__ico">${icon('file')}</span>
        <h3 class="process__title">Desenho da solução</h3>
        <p class="process__text">Montamos o escopo com o que a empresa precisa agora, não o pacote inteiro. Entregáveis, prazos e responsáveis definidos antes de qualquer assinatura.</p>
        <span class="process__meta">${icon('check')} Escopo sob medida</span>
      </li>

      <li class="process__step" data-reveal="up">
        <span class="process__num" aria-hidden="true">03</span>
        <span class="process__ico">${icon('handshake')}</span>
        <h3 class="process__title">Implantação lado a lado</h3>
        <p class="process__text">A consultoria constrói junto com o seu time, não por cima dele. Documentos e ferramentas ficam na casa, com quem vai usar já treinado.</p>
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
`;

/* ----------------------------------------------------------- MESA SOLUTE */
const mesa = `
<section class="section" id="mesa-solute" aria-labelledby="mesa-titulo">
  <div class="wrap wrap--wide">
    <div class="panel panel--brand" data-reveal="rise">
      <div class="panel__inner">
        <div class="duo duo--tight">

          <div>
            <p class="eyebrow" data-reveal="up">Gratuito · vagas limitadas</p>
            <h2 id="mesa-titulo" data-split="words" data-reveal="fade">Mesa Solute</h2>
            <p class="lead" style="margin-top:1rem" data-reveal="up" data-reveal-delay="100">
              Um encontro semanal on-line com <strong style="color:var(--fog-50)">dez empresários</strong> e a
              Rosemeire Moreira para colocar na mesa o que está travando a gestão de pessoas de cada um.
              Sem palestra, sem venda: análise de caso real, entre pares.
            </p>

            <ul class="checks" style="margin-top:1.8rem" data-stagger="80">
              <li data-reveal="up">${icon('checkCircle')}<span>Grupos de <strong>no máximo 10 empresas</strong>, para todo mundo falar</span></li>
              <li data-reveal="up">${icon('checkCircle')}<span>Para negócios com <strong>10 ou mais colaboradores</strong></span></li>
              <li data-reveal="up">${icon('checkCircle')}<span>100% on-line e <strong>sem nenhum custo</strong></span></li>
            </ul>

            <div style="margin-top:2rem" data-reveal="up">
              <a class="btn btn--primary btn--lg" href="${wa('Olá! Quero meu lugar na Mesa Solute. Minha empresa tem mais de 10 colaboradores.')}" target="_blank" data-magnetic="0.24">
                Quero meu lugar na mesa ${icon('arrow')}
              </a>
            </div>
          </div>

          <div class="figure figure--wide veil" data-reveal="left">
            <img src="media/conduzido-rose.webp" alt="Encontro de empresários conduzido pela Solute RH" width="1672" height="941" loading="lazy">
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
`;

/* ------------------------------------------------------------- ESCRITORIO */
const escritorio = `
<section class="band-video" id="escritorio" aria-labelledby="escritorio-titulo">
  <div class="band-video__media">
    <video src="media/tour-escritorio.mp4" poster="media/tour-escritorio-poster.webp"
           autoplay muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>
  </div>
  <div class="wrap wrap--narrow" style="text-align:center">
    <p class="eyebrow eyebrow--center" data-reveal="up">Nossa casa</p>
    <h2 id="escritorio-titulo" data-split="words" data-reveal="fade">Um time de gente que gosta de gente</h2>
    <p class="lead" style="margin:1.3rem auto 0;max-width:56ch" data-reveal="up" data-reveal-delay="120">
      No coração de Juiz de Fora, em Minas Gerais, atendendo empresas do país inteiro.
      Se estiver por perto, o café está sempre pronto.
    </p>
    <div class="row" style="justify-content:center;margin-top:2.2rem" data-reveal="up" data-reveal-delay="200">
      <a class="btn btn--ghost btn--lg" href="contato.html">Ver onde estamos ${icon('pin')}</a>
    </div>
  </div>
</section>
`;

/* ------------------------------------------------------------- SOLUTE CAST */
const cast = `
<section class="section surface-900" aria-labelledby="cast-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center" style="margin-bottom:clamp(2rem,1.4rem+2vw,3.4rem)">

      <p class="live-tag live-tag--center" data-reveal="up" data-live
         data-live-on="Ao vivo agora no YouTube"
         data-live-off="${SITE.live.day} às ${SITE.live.time}"><span class="tag__dot tag__dot--live"></span> <span data-live-label>${SITE.live.day} às ${SITE.live.time}</span></p>

      <h2 id="cast-titulo" data-split="words" data-reveal="fade">Solute Cast</h2>

      <p class="lead measure" data-reveal="up" data-reveal-delay="100">
        Toda semana, uma conversa sobre o que realmente acontece dentro das empresas:
        liderança, conflito, retenção, remuneração, legislação e cultura.
        <strong style="color:var(--fog-50)">${SITE.live.day} às ${SITE.live.time}</strong>, ao vivo no YouTube,
        com pergunta aberta da audiência.
      </p>

      <div class="row" style="margin-top:2rem;gap:.7rem;justify-content:center" data-reveal="up" data-reveal-delay="180">
        <a class="btn btn--primary" href="${SITE.social.youtube}" target="_blank" data-magnetic="0.2">
          ${icon('youtube')} Assistir no YouTube
        </a>
        <a class="btn btn--ghost" href="solute-cast.html">Ver todos os episódios</a>
      </div>
    </div>

    <div class="cast-card" data-reveal="rise">
      <img class="cast-card__logo" src="media/logo-cast-branca.png" alt="Solute Cast"
           width="900" height="300" loading="lazy">
      <a class="play-btn" href="${SITE.social.youtube}" target="_blank"
         aria-label="Assistir ao Solute Cast no YouTube">${icon('play')}</a>
      <p class="cast-card__meta">
        ${icon('calendar')} ${SITE.live.day}
        <span aria-hidden="true">·</span>
        ${icon('clock')} ${SITE.live.time}
        <span aria-hidden="true">·</span>
        ${icon('youtube')} Ao vivo no YouTube
      </p>
    </div>

  </div>
</section>
`;

/* -------------------------------------------------------- FAIXA TIPOGRAFICA */
const faixa = `
<section class="section--tight" aria-hidden="true" style="padding-block:clamp(2rem,4vw,3.5rem)">
  <div class="marquee" data-marquee-speed="70">
    <div class="marquee__track">
      <div class="marquee__group marquee__group--text">
        <span class="marquee-text">RH ESTRATÉGICO</span>
        <span class="marquee-text accent">·</span>
        <span class="marquee-text">LIDERANÇA</span>
        <span class="marquee-text accent">·</span>
        <span class="marquee-text">CARGOS E SALÁRIOS</span>
        <span class="marquee-text accent">·</span>
        <span class="marquee-text">NR-01</span>
        <span class="marquee-text accent">·</span>
        <span class="marquee-text">CLIMA</span>
        <span class="marquee-text accent">·</span>
      </div>
    </div>
  </div>
</section>
`;

/* ------------------------------------------------------------- EVENTO (off) */
const evento = EVENT.enabled
  ? `
<section class="section" id="evento" aria-labelledby="evento-titulo">
  <div class="wrap wrap--wide">
    <div class="cta-band" data-reveal="rise">
      <span class="tag tag--brand" style="margin-bottom:1rem">${icon('ticket')} ${EVENT.date}</span>
      <h2 class="cta-band__title" id="evento-titulo">${EVENT.name}</h2>
      <p class="lead">${EVENT.tagline}</p>
      <div class="cta-band__actions">
        <a class="btn btn--primary btn--lg" href="${EVENT.page}" data-magnetic="0.24">${EVENT.ctaLabel} ${icon('arrow')}</a>
      </div>
      <p class="cta-band__note">${EVENT.city}</p>
    </div>
  </div>
</section>`
  : '';

/* ------------------------------------------------------------------ BODY */
const body =
  hero +
  B.clientMarquee({ label: 'Empresas que confiam na Solute RH' }) +
  problema +
  pilares +
  B.servicesGrid({}) +
  B.stats({}) +
  metodo +
  rose +
  mesa +
  B.testimonials({}) +
  B.values({ surface: 'surface-900' }) +
  escritorio +
  cast +
  evento +
  faixa +
  B.ctaBand({}) +
  '\n</main>\n';

module.exports = { meta, body };
