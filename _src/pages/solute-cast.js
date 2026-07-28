/* =============================================================================
   SOLUTE CAST
   ========================================================================== */

const { SITE } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

const meta = {
  file: 'solute-cast.html',
  page: 'solute-cast',
  title: 'Solute Cast | Lives semanais sobre gestão de pessoas',
  description:
    'Toda terça-feira às 09h00, ao vivo no YouTube com Rosemeire Moreira: liderança, retenção, remuneração, NR-01 e cultura organizacional.',
  ogImage: 'og-default.jpg',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: 'Solute Cast',
    description: 'Conversas semanais sobre gestão de pessoas com Rosemeire Moreira.',
    url: SITE.url + '/solute-cast.html',
    webFeed: SITE.social.youtube,
    author: { '@type': 'Person', name: 'Rosemeire Moreira' },
  },
};

/* temas recorrentes do programa */
const TEMAS = [
  ['Liderança na prática', 'clock', 'Como dar feedback difícil, delegar sem perder o controle e conduzir conversas que ninguém quer ter.'],
  ['Retenção e turnover', 'users', 'Por que gente boa vai embora, o que dá para ler nos números e o que fazer antes do pedido de demissão.'],
  ['Remuneração', 'scale', 'Cargos, salários, bônus e o que a empresa pode (e não pode) prometer sem criar passivo.'],
  ['NR-01 e saúde mental', 'shield', 'O que a norma exige de verdade, o que é exagero de fornecedor e como começar sem gastar fortuna.'],
  ['Cultura e clima', 'pulse', 'Como medir o que o time pensa, o que fazer com o resultado e por que pesquisa sem ação piora tudo.'],
  ['IA aplicada ao RH', 'sparkles', 'Onde a inteligência artificial já ajuda o RH hoje e onde ela ainda atrapalha mais do que resolve.'],
];

const temasCards = TEMAS.map(
  (t) => `
        <article class="card" data-reveal="up">
          <span class="card__ico">${icon(t[1])}</span>
          <h3 class="card__title">${t[0]}</h3>
          <p class="card__text">${t[2]}</p>
        </article>`
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
      <span aria-current="page">Solute Cast</span>
    </nav>

    <p class="live-tag live-tag--center" data-reveal="up" data-live
       data-live-on="Ao vivo agora, entre no canal"
       data-live-off="Ao vivo ${SITE.live.day.toLowerCase()} às ${SITE.live.time}"><span class="tag__dot tag__dot--live"></span> <span data-live-label>Ao vivo ${SITE.live.day.toLowerCase()} às ${SITE.live.time}</span></p>

    <img src="media/logo-cast-branca.png" alt="Solute Cast" width="900" height="300"
         style="height:56px;width:auto;margin:1.4rem auto 1.6rem" data-reveal="up" data-reveal-delay="80">

    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">Gestão de pessoas sem enrolação, toda semana</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Uma hora por semana com a Rosemeire Moreira falando do que realmente acontece dentro
      das empresas, ao vivo no YouTube. Casos reais, pergunta aberta da audiência e nenhuma
      resposta pronta.
    </p>

    <div class="row" style="margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="200">
      <a class="btn btn--primary btn--lg" href="${SITE.social.youtube}" target="_blank" data-magnetic="0.22">
        ${icon('youtube')} Assistir no YouTube
      </a>
      <a class="btn btn--ghost btn--lg" href="#temas">Ver os temas</a>
    </div>
  </div>
</section>

<!-- ================================================= ONDE ASSISTIR -->
<section class="section" aria-labelledby="onde-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <span class="emblem" data-reveal="zoom">
        <img src="media/icone-cast-laranja.png" alt="" width="900" height="900" loading="lazy">
      </span>
      <p class="eyebrow eyebrow--center" data-reveal="up">Onde acompanhar</p>
      <h2 id="onde-titulo" class="measure" data-split="words" data-reveal="fade">No formato que couber na sua semana</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Ao vivo com o chat aberto, gravado para assistir depois ou em cortes curtos para
        acompanhar sem tempo sobrando.
      </p>
    </div>

    <div class="grid grid-3" data-stagger="110">
      <a class="card" href="${SITE.social.youtube}" target="_blank" data-reveal="up">
        <span class="card__ico">${icon('youtube')}</span>
        <h3 class="card__title">Ao vivo no YouTube</h3>
        <p class="card__text">${SITE.live.day} às ${SITE.live.time}, com chat aberto para perguntas durante todo o programa.</p>
        <span class="card__foot"><span class="link-arrow">Abrir canal ${icon('external')}</span></span>
      </a>
      <a class="card" href="${SITE.social.youtube}" target="_blank" data-reveal="up">
        <span class="card__ico">${icon('play')}</span>
        <h3 class="card__title">Episódios gravados</h3>
        <p class="card__text">Perdeu a live? Todos os programas ficam salvos no canal para assistir na hora que der.</p>
        <span class="card__foot"><span class="link-arrow">Ver episódios ${icon('external')}</span></span>
      </a>
      <a class="card" href="${SITE.social.instagram}" target="_blank" data-reveal="up">
        <span class="card__ico">${icon('instagram')}</span>
        <h3 class="card__title">Cortes no Instagram</h3>
        <p class="card__text">Os melhores trechos de cada programa, em vídeos curtos, para acompanhar sem tempo sobrando.</p>
        <span class="card__foot"><span class="link-arrow">Seguir o perfil ${icon('external')}</span></span>
      </a>
    </div>
  </div>
</section>

<!-- ================================================= TEMAS -->
<section class="section surface-900 aura aura--soft" id="temas" aria-labelledby="temas-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Assuntos do programa</p>
      <h2 id="temas-titulo" class="measure" data-split="words" data-reveal="fade">O que a gente discute por aqui</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        A pauta muda toda semana, mas gira sempre em torno destes seis eixos. Se você tem uma
        dúvida específica, pode mandar antes e ela entra na conversa.
      </p>
    </div>

    <div class="grid grid-3" data-stagger="90">
      ${temasCards}
    </div>

    <div class="row" style="justify-content:center;margin-top:2.8rem" data-reveal="up">
      <a class="btn btn--ghost btn--lg" href="${wa('Olá! Tenho uma pergunta para o Solute Cast: ')}" target="_blank">
        ${icon('megaphone')} Mandar uma pergunta para a live
      </a>
    </div>
  </div>
</section>

<!-- ================================================= ROTINA -->
<section class="section" aria-labelledby="rotina-titulo">
  <div class="wrap wrap--wide">
    <div class="panel panel--brand" data-reveal="rise">
      <div class="panel__inner">
        <div class="duo duo--tight" style="align-items:center">
          <div>
            <p class="eyebrow" data-reveal="up">Toda semana</p>
            <h2 id="rotina-titulo" data-split="words" data-reveal="fade">Coloque na agenda</h2>
            <p class="lead" style="margin-top:1rem" data-reveal="up" data-reveal-delay="100">
              O programa é sempre no mesmo dia e no mesmo horário. É de graça, não precisa de
              inscrição e você pode entrar e sair a hora que quiser.
            </p>
            <div class="row" style="margin-top:1.8rem;gap:.6rem" data-reveal="up" data-reveal-delay="160">
              <span class="tag tag--brand">${icon('calendar')} ${SITE.live.day}</span>
              <span class="tag tag--brand">${icon('clock')} ${SITE.live.time}</span>
              <span class="tag">${icon('ticket')} Entrada livre</span>
            </div>
          </div>

          <div class="stack" style="gap:.8rem">
            <div class="ep" data-reveal="left" data-live>
              <span class="ep__ico"><img src="media/icone-cast-laranja.png" alt=""></span>
              <div>
                <h3 class="ep__title"><span data-live-label>Próxima live</span></h3>
                <p class="ep__meta"><span>${icon('calendar')} ${SITE.live.day}</span><span>${icon('clock')} ${SITE.live.time}</span></p>
              </div>
            </div>
            <a class="ep" href="${SITE.social.youtube}" target="_blank" data-reveal="left">
              <span class="ep__ico" style="color:var(--brand)">${icon('youtube')}</span>
              <div>
                <h3 class="ep__title">Episódios anteriores</h3>
                <p class="ep__meta"><span>Assista a qualquer momento no canal</span></p>
              </div>
            </a>
            <a class="ep" href="${SITE.social.instagram}" target="_blank" data-reveal="left">
              <span class="ep__ico" style="color:var(--brand)">${icon('instagram')}</span>
              <div>
                <h3 class="ep__title">Cortes e bastidores</h3>
                <p class="ep__meta"><span>Os melhores trechos no Instagram</span></p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

${B.ctaBand({
  eyebrow: 'Solute Cast',
  title: 'Gostou da conversa? Vamos falar da sua empresa',
  text: 'O programa é o conteúdo aberto. Quando o assunto é resolver a sua gestão de pessoas na prática, a conversa é outra, e ela também começa de graça.',
  cta: 'Agendar diagnóstico gratuito',
})}

</main>
`;

module.exports = { meta, body };
