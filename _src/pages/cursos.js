/* =============================================================================
   SOLUTE CURSOS
   ========================================================================== */

const { SITE, COURSES } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

const meta = {
  file: 'cursos.html',
  page: 'cursos',
  title: 'Solute Cursos | Formação em RH com certificação MEC',
  description:
    'Mais de 20 cursos on-line de RH: Método RH Estratégico com certificação MEC, Plano de Cargos e Salários, NR-01, liderança e IA aplicada ao RH. +16.000 alunos.',
  ogImage: 'og-default.jpg',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cursos da Solute Cursos',
    itemListElement: COURSES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: c.title,
        description: c.text,
        provider: { '@type': 'Organization', name: 'Solute Cursos', url: SITE.url },
      },
    })),
  },
};

const cards = COURSES.map(
  (c) => `
        <article class="course" data-reveal="up">
          <div class="course__top">
            ${c.badge ? `<span class="tag tag--brand course__badge">${c.badge}</span>` : ''}
            <h3 class="course__title">${c.title}</h3>
          </div>
          <div class="course__body">
            <p class="course__text">${c.text}</p>
            <div class="course__meta">
              ${c.meta.map((m) => `<span>${icon('check')} ${m}</span>`).join('\n              ')}
            </div>
            <div class="course__foot">
              <a class="link-arrow" href="${c.url || wa('Olá! Quero saber mais sobre o curso ' + c.title + '.')}"
                 target="_blank" aria-label="Quero saber mais sobre ${c.title}">
                Quero saber mais ${icon(c.url ? 'external' : 'arrow')}
              </a>
            </div>
          </div>
        </article>`
).join('');

const body = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="hero-sub__bg" aria-hidden="true">
    <img src="media/rhestrategico.webp" alt="" width="1122" height="1402">
  </div>
  <div class="wrap wrap--wide">
    <nav class="crumbs" aria-label="Você está aqui">
      <a href="index.html">Início</a>
      ${icon('chevronR')}
      <span aria-current="page">Cursos</span>
    </nav>

    <img src="media/logo-cursos-branca.png" alt="Solute Cursos" width="900" height="330"
         style="height:46px;width:auto;margin:0 auto 1.6rem" data-reveal="up">

    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">O método da consultoria, na sua mão</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Tudo o que aplicamos dentro das empresas, transformado em curso para profissionais de RH
      e empresários que querem executar por conta própria. Com material pronto, não só teoria.
    </p>

    <div class="row" style="margin-top:2rem;gap:.7rem" data-reveal="up" data-reveal-delay="180">
      <span class="tag tag--brand">${icon('cap')} Certificação MEC</span>
      <span class="tag">${icon('users')} +16.000 alunos formados</span>
      <span class="tag">${icon('book')} +20 cursos on-line</span>
    </div>

    <div class="row" style="margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="230">
      <a class="btn btn--primary btn--lg" href="${wa('Olá! Quero informações sobre os cursos da Solute.')}" target="_blank" data-magnetic="0.22">
        Falar com um consultor ${icon('arrow')}
      </a>
      <a class="btn btn--ghost btn--lg" href="#catalogo">Ver o catálogo</a>
    </div>
  </div>
</section>

<!-- ================================================= DIFERENCIAIS -->
<section class="section" aria-labelledby="dif-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Por que funciona</p>
      <h2 id="dif-titulo" class="measure" data-split="words" data-reveal="fade">Curso feito por quem executa, não por quem só ensina</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Cada aula sai de um projeto real de consultoria. Se algo não funciona na prática,
        simplesmente não entra no material.
      </p>
    </div>

    <div class="grid grid-4" data-stagger="100">
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('file')}</span>
        <h3 class="card__title">Material pronto</h3>
        <p class="card__text">Planilhas, templates e documentos que você usa no dia seguinte, já formatados.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('cap')}</span>
        <h3 class="card__title">Certificação MEC</h3>
        <p class="card__text">O Método RH Estratégico recebeu certificação reconhecida pelo MEC.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('users')}</span>
        <h3 class="card__title">Mentorias ao vivo</h3>
        <p class="card__text">Espaço para levar o seu caso real e sair com o encaminhamento na mão.</p>
      </article>
      <article class="card" data-reveal="up">
        <span class="card__ico">${icon('refresh')}</span>
        <h3 class="card__title">Sempre atualizado</h3>
        <p class="card__text">Mudou norma, mudou prática de mercado, o conteúdo é revisado.</p>
      </article>
    </div>
  </div>
</section>

<!-- ================================================= CATALOGO -->
<section class="section surface-900 aura aura--soft" id="catalogo" aria-labelledby="catalogo-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <span class="emblem" data-reveal="zoom">
        <img src="media/icone-cursos-laranja.png" alt="" width="900" height="900" loading="lazy">
      </span>
      <p class="eyebrow eyebrow--center" data-reveal="up">Catálogo</p>
      <h2 id="catalogo-titulo" class="measure" data-split="words" data-reveal="fade">Escolha por onde começar</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Se você está montando um RH do zero, comece pelo Método RH Estratégico. Se já tem
        a estrutura e precisa resolver uma frente específica, vá direto no curso dela.
      </p>
    </div>

    <div class="grid grid-3" data-stagger="90">
      ${cards}
    </div>
  </div>
</section>

<!-- ================================================= PARA QUEM -->
<section class="section" aria-labelledby="paraquem-titulo">
  <div class="wrap wrap--wide">
    <div class="duo">
      <div class="figure-frame" data-reveal="right">
        <div class="figure figure--wide veil">
          <img src="media/planodecargos-e-salarios.webp" alt="Aluna aplicando o método em uma empresa" width="1122" height="1402" loading="lazy" style="aspect-ratio:16/11;object-fit:cover">
        </div>
        <div class="badge-float badge-float--bl">
          <b>+16k</b>
          <span>alunos já passaram por aqui</span>
        </div>
      </div>
      <div>
        <p class="eyebrow" data-reveal="up">Para quem é</p>
        <h2 id="paraquem-titulo" data-split="words" data-reveal="fade">Se você é a pessoa que precisa resolver, é para você</h2>
        <ul class="checks" style="margin-top:1.8rem" data-stagger="90">
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Analistas e coordenadores de RH</strong> que querem sair do operacional e virar referência técnica.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Empresários e sócios</strong> que ainda tocam a gestão de pessoas por conta própria.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Consultores autônomos</strong> que precisam de método e material para entregar aos clientes.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Gestores de área</strong> que lideram time e nunca receberam formação para isso.</span></li>
        </ul>
        <div style="margin-top:2.2rem" data-reveal="up">
          <a class="btn btn--primary" href="${wa('Olá! Quero ajuda para escolher o curso certo para o meu momento.')}" target="_blank" data-magnetic="0.2">
            Me ajuda a escolher o curso ${icon('arrow')}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

${B.stats({
  surface: 'surface-900',
  title: 'A escola de RH que já formou uma cidade inteira',
  items: [
    { pre: '+', num: 16000, label: 'profissionais formados nos nossos cursos' },
    { pre: '+', num: 20, label: 'cursos on-line no catálogo' },
    { num: 50, suf: 'h', label: 'de conteúdo só no Método RH Estratégico' },
    { num: 5, dec: 1, suf: '★', label: 'de avaliação média dos alunos' },
  ],
})}

<!-- ================================================= FAQ -->
<section class="section" aria-labelledby="faq-titulo">
  <div class="wrap wrap--narrow">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Dúvidas frequentes</p>
      <h2 id="faq-titulo" data-split="words" data-reveal="fade">O que costumam perguntar</h2>
    </div>

    <div class="acc" data-reveal="up">
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">Os cursos são gravados ou ao vivo?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>As aulas são gravadas, para você assistir no seu ritmo. Além delas, os cursos principais têm encontros de mentoria ao vivo, em que você leva o seu caso real e sai com o encaminhamento.</p></div></div>
      </div>
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">O certificado é reconhecido?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>Sim. O Método RH Estratégico recebeu certificação reconhecida pelo MEC. Os demais cursos emitem certificado de conclusão da Solute Cursos com a carga horária cumprida.</p></div></div>
      </div>
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">Preciso ter formação em RH?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>Não. Boa parte dos alunos são empresários, gestores de área e profissionais de administração que assumiram a gestão de pessoas na prática. A linguagem dos cursos é direta e sem jargão desnecessário.</p></div></div>
      </div>
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">Qual a diferença entre o curso e a consultoria?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>No curso você aprende o método e executa por conta própria, com o nosso material. Na consultoria, a nossa equipe entra na sua empresa e executa junto com o seu time. Muita gente começa pelo curso e contrata a consultoria depois, para acelerar.</p></div></div>
      </div>
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">Minha empresa pode comprar para a equipe toda?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>Pode, e é bem comum. Temos condições especiais para turmas fechadas e podemos adaptar exemplos e estudos de caso para a realidade do seu setor. Fale com a gente pelo WhatsApp para montar a proposta.</p></div></div>
      </div>
    </div>
  </div>
</section>

${B.ctaBand({
  eyebrow: 'Solute Cursos',
  title: 'Comece pelo curso certo para o seu momento',
  text: 'Conte em qual etapa a sua gestão de pessoas está hoje e indicamos o caminho, mesmo que a resposta seja esperar um pouco.',
  waText: 'Olá! Quero ajuda para escolher o curso certo da Solute Cursos.',
  cta: 'Falar sobre os cursos',
  note: 'Atendimento por WhatsApp, resposta no mesmo dia útil',
})}

</main>
`;

module.exports = { meta, body };
