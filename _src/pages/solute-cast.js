/* =============================================================================
   SOLUTE CAST
   -----------------------------------------------------------------------------
   A pagina trata duas coisas distintas, cada uma no seu bloco:
     1. o podcast Solute Cast (episodios gravados)
     2. as lives de terca (transmissao ao vivo, com chat aberto)
   ========================================================================== */

const { SITE } = require('../site');
const { icon } = require('../icons');
const { wa } = require('../layout');
const B = require('../blocks');

const meta = {
  file: 'solute-cast.html',
  page: 'solute-cast',
  title: 'Solute Cast | Podcast e lives sobre gestão de pessoas',
  description:
    'O podcast da Solute RH sobre gestão de pessoas, com Rosemeire Moreira, e as lives de terça-feira às 09h00 no YouTube, com pergunta aberta da audiência.',
  ogImage: 'og-default.jpg',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: 'Solute Cast',
    description: 'Conversas sobre gestão de pessoas com Rosemeire Moreira.',
    url: SITE.url + '/solute-cast.html',
    webFeed: SITE.social.youtube,
    author: { '@type': 'Person', name: 'Rosemeire Moreira' },
  },
};

/* temas recorrentes, comuns ao podcast e as lives */
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

<!-- ================================================= HERO -->
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

    <img src="media/logo-cast-branca.png" alt="Solute Cast" width="900" height="300"
         style="height:56px;width:auto;margin:0 auto 1.6rem" data-reveal="up">

    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">Gestão de pessoas sem enrolação</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      O canal da Solute RH tem duas frentes: o <strong style="color:var(--fog-50)">podcast</strong>,
      com conversas sobre o que realmente acontece dentro das empresas, e as
      <strong style="color:var(--fog-50)">lives de terça</strong>, ao vivo e com pergunta aberta.
    </p>

    <div class="row" style="margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="200">
      <a class="btn btn--primary btn--lg" href="${SITE.social.youtube}" target="_blank" data-magnetic="0.22">
        ${icon('youtube')} Abrir o canal
      </a>
      <a class="btn btn--ghost btn--lg" href="#lives">Ver as lives de terça</a>
    </div>
  </div>
</section>

<!-- ================================================= O PODCAST -->
<section class="section" id="podcast" aria-labelledby="podcast-titulo">
  <div class="wrap wrap--wide">
    <div class="duo">

      <div>
        <p class="eyebrow" data-reveal="up">O podcast</p>
        <h2 id="podcast-titulo" data-split="words" data-reveal="fade">Solute Cast</h2>
        <p class="lead" style="margin-top:1.1rem" data-reveal="up" data-reveal-delay="100">
          Episódios com a Rosemeire Moreira sobre liderança, retenção, remuneração,
          conformidade e cultura. Cada conversa parte de um caso real de empresa, não de
          teoria de livro.
        </p>

        <ul class="checks" style="margin-top:2rem" data-stagger="90">
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Casos reais</strong> de empresas brasileiras, com o nome preservado.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Sem receita pronta</strong>: o que funciona em uma indústria não funciona no varejo.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Disponível quando der</strong>: os episódios ficam salvos no canal.</span></li>
        </ul>

        <div class="row" style="margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="180">
          <a class="btn btn--primary" href="${SITE.social.youtube}" target="_blank" data-magnetic="0.2">
            ${icon('play')} Ouvir os episódios
          </a>
          <span class="btn btn--soon" aria-disabled="true">
            ${icon('spotify')} Em breve no Spotify
          </span>
        </div>
      </div>

      <div class="cast-card" data-reveal="left">
        <img class="cast-card__logo" src="media/logo-cast-branca.png" alt="Solute Cast"
             width="900" height="300" loading="lazy">
        <a class="play-btn" href="${SITE.social.youtube}" target="_blank"
           aria-label="Ouvir o Solute Cast no YouTube">${icon('play')}</a>
        <p class="cast-card__meta">
          ${icon('mic')} Podcast
          <span aria-hidden="true">·</span>
          ${icon('youtube')} No canal do YouTube
        </p>
      </div>

    </div>
  </div>
</section>

<!-- ================================================= AS LIVES DE TERÇA -->
<section class="section surface-900 aura aura--soft" id="lives" aria-labelledby="lives-titulo">
  <div class="wrap wrap--wide">
    <div class="duo duo--reverse">

      <div>
        <p class="live-tag" data-reveal="up" data-live
           data-live-on="Ao vivo agora, entre no canal"
           data-live-off="Ao vivo ${SITE.live.day.toLowerCase()} às ${SITE.live.time}"><span class="tag__dot tag__dot--live"></span> <span data-live-label>Ao vivo ${SITE.live.day.toLowerCase()} às ${SITE.live.time}</span></p>

        <h2 id="lives-titulo" style="margin-top:.9rem" data-split="words" data-reveal="fade">As lives de terça</h2>
        <p class="lead" style="margin-top:1.1rem" data-reveal="up" data-reveal-delay="100">
          Uma hora por semana, ao vivo, com o chat aberto. Você chega com a dúvida da sua
          empresa e sai com um encaminhamento. É de graça, não precisa de inscrição e dá
          para entrar e sair a hora que quiser.
        </p>

        <div class="row" style="margin-top:1.8rem;gap:.6rem" data-reveal="up" data-reveal-delay="150">
          <span class="tag tag--brand">${icon('calendar')} ${SITE.live.day}</span>
          <span class="tag tag--brand">${icon('clock')} ${SITE.live.time}</span>
          <span class="tag">${icon('ticket')} Entrada livre</span>
        </div>

        <ul class="checks" style="margin-top:2rem" data-stagger="90">
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Pergunta aberta</strong>: o chat manda a pauta tanto quanto o roteiro.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Mesmo dia e horário</strong>, toda semana, para caber na sua agenda.</span></li>
          <li data-reveal="up">${icon('checkCircle')}<span><strong>Fica gravada</strong> no canal, caso você não consiga assistir na hora.</span></li>
        </ul>

        <div class="row" style="margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="200">
          <a class="btn btn--primary" href="${SITE.social.youtube}" target="_blank" data-magnetic="0.2">
            ${icon('youtube')} Entrar na próxima live
          </a>
        </div>
      </div>

      <div class="stack" style="gap:.8rem" data-reveal="right">
        <div class="next-live" data-live>
          <span class="next-live__cal" aria-hidden="true">
            <b>TER</b>
            <i>09</i>
          </span>
          <span class="next-live__body">
            <span class="next-live__label" data-live-label>Próxima live</span>
            <span class="next-live__when">${SITE.live.day}, às ${SITE.live.time}</span>
          </span>
        </div>
        <a class="ep" href="${SITE.social.youtube}" target="_blank">
          <span class="ep__ico" style="color:var(--brand)">${icon('youtube')}</span>
          <div>
            <h3 class="ep__title">Lives anteriores</h3>
            <p class="ep__meta"><span>Todas ficam salvas no canal</span></p>
          </div>
        </a>
        <a class="ep" href="${SITE.social.instagram}" target="_blank">
          <span class="ep__ico" style="color:var(--brand)">${icon('instagram')}</span>
          <div>
            <h3 class="ep__title">Cortes e bastidores</h3>
            <p class="ep__meta"><span>Os melhores trechos no Instagram</span></p>
          </div>
        </a>
      </div>

    </div>
  </div>
</section>

<!-- ================================================= TEMAS -->
<section class="section" id="temas" aria-labelledby="temas-titulo">
  <div class="wrap wrap--wide">
    <div class="section-head section-head--center">
      <span class="emblem" data-reveal="zoom">
        <img src="media/icone-cast-laranja.png" alt="" width="900" height="900" loading="lazy">
      </span>
      <p class="eyebrow eyebrow--center" data-reveal="up">Assuntos do programa</p>
      <h2 id="temas-titulo" class="measure" data-split="words" data-reveal="fade">O que a gente discute por aqui</h2>
      <p class="lead measure" data-reveal="up" data-reveal-delay="120">
        Vale para o podcast e para as lives. A pauta muda toda semana, mas gira sempre em
        torno destes seis eixos. Se você tem uma dúvida específica, pode mandar antes e ela
        entra na conversa.
      </p>
    </div>

    <div class="grid grid-3" data-stagger="90">
      ${temasCards}
    </div>

    <div class="row" style="justify-content:center;margin-top:2.8rem" data-reveal="up">
      <a class="btn btn--ghost btn--lg" href="${wa('Olá! Tenho uma pergunta para o Solute Cast: ')}" target="_blank">
        ${icon('megaphone')} Mandar uma pergunta
      </a>
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
