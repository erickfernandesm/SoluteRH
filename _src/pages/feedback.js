/* =============================================================================
   FEEDBACK DO CLIENTE
   Pagina de link privado: chega por WhatsApp com um codigo por cliente
   (feedback.html?c=<codigo>). Nao entra no menu nem no Google.

   O objetivo declarado pela Solute e a avaliacao no Google. Por isso o
   depoimento escrito aqui vira o rascunho da avaliacao: ao enviar, a pessoa
   recebe o texto pronto para colar, com um toque, e o botao do Google.

   O convite ao Google aparece para todo mundo, tenha a pessoa escrito elogio
   ou reclamacao. Filtrar o convite pela nota e proibido pelo Google e pode
   custar a remocao das avaliacoes.
   ========================================================================== */

const { SITE } = require('../site');
const { icon } = require('../icons');
const B = require('../blocks');

const meta = {
  file: 'feedback.html',
  page: 'feedback',
  title: 'Deixe o seu feedback | Solute RH',
  description: 'Conte como foi trabalhar com a Solute RH.',
  ogImage: 'og-default.jpg',
  noindex: true, // pagina de link privado: fora do Google
};

const estrelas = [5, 4, 3, 2, 1]
  .map(
    (n) => `
          <input class="stars__input" type="radio" id="nota-${n}" name="nota" value="${n}" required>
          <label class="stars__star" for="nota-${n}" title="${n} de 5">${icon('starFill')}<span class="sr-only">${n} de 5</span></label>`
  )
  .join('');

const body = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="hero-sub__bg" aria-hidden="true">
    <img src="media/conduzido-rose.webp" alt="" width="1672" height="941">
  </div>
  <div class="wrap wrap--wide">
    <p class="eyebrow eyebrow--center" data-reveal="up">Feedback dos clientes</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">Como foi trabalhar com a gente?</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Leva dois minutos. O que você escrever aqui ajuda a Solute a melhorar e,
      se você autorizar, pode virar depoimento no site.
    </p>
  </div>
</section>

<section class="section section--flush-top" aria-label="Formulário de feedback">
  <div class="wrap wrap--narrow" data-feedback data-api="${SITE.feedbackApi}" data-wa="${SITE.phoneRaw}"
       data-google="${SITE.googleReview || 'https://www.google.com/maps/search/?api=1&query=Solute+RH+Juiz+de+Fora'}">

    <!-- 1. formulario -->
    <form class="fb-card" data-feedback-form novalidate>
      <p class="fb-hello" data-feedback-hello hidden></p>

      <div class="field">
        <label class="label" for="fb-nota">Como você avalia o nosso trabalho? <span class="req">*</span></label>
        <div class="stars" id="fb-nota" role="radiogroup" aria-label="Nota de 1 a 5">${estrelas}
        </div>
      </div>

      <div class="field">
        <label class="label" for="fb-texto">Conte como foi <span class="req">*</span></label>
        <textarea class="textarea" id="fb-texto" name="texto" required minlength="15" maxlength="1500" rows="6"
                  placeholder="O que mudou na sua empresa? O que fez diferença no trabalho da equipe? Escreva do seu jeito."></textarea>
        <span class="ask__count" data-feedback-count aria-hidden="true">0 / 1500</span>
      </div>

      <div class="grid grid-2" style="gap:1.1rem" data-feedback-quem>
        <div class="field">
          <label class="label" for="fb-nome">Seu nome <span class="req">*</span></label>
          <input class="input" type="text" id="fb-nome" name="nome" required minlength="2" maxlength="80" autocomplete="name" placeholder="Como podemos te chamar?">
        </div>
        <div class="field">
          <label class="label" for="fb-empresa">Empresa <span class="req">*</span></label>
          <input class="input" type="text" id="fb-empresa" name="empresa" required minlength="2" maxlength="80" autocomplete="organization" placeholder="Nome da empresa">
        </div>
      </div>

      <label class="check">
        <input type="checkbox" name="autoriza" value="sim" checked>
        <span>Autorizo a Solute RH a publicar este depoimento no site, com o meu nome e o da empresa.</span>
      </label>

      <div class="ask__hp" aria-hidden="true">
        <label for="fb-site">Deixe em branco</label>
        <input type="text" id="fb-site" name="website" tabindex="-1" autocomplete="off">
      </div>

      <p class="form-msg ask__msg" data-feedback-msg role="alert" hidden></p>

      <button class="btn btn--primary btn--lg ask__send" type="submit" data-feedback-send>
        Enviar feedback ${icon('arrow')}
      </button>
    </form>

    <!-- 2. enviado: confirmacao curta na pagina -->
    <div class="fb-card fb-done" data-feedback-done hidden>
      <span class="ask__done-ico">${icon('checkCircle')}</span>
      <h2 class="ask__title">Obrigado! Recebemos o seu feedback</h2>
      <p class="fb-done__nota">Se a janela do Google não abrir, use o botão abaixo.</p>
      <button class="btn btn--primary btn--lg" type="button" data-feedback-reabrir>
        <img src="media/google-colorido.png" alt="" width="18" height="18"> Avaliar no Google
      </button>
    </div>

  </div>
</section>

<!-- 3. o pop-up do Google, que abre assim que o feedback e enviado -->
<dialog class="ask fb-pop" data-feedback-pop aria-labelledby="pop-titulo">
  <div class="ask__box">
    <button class="ask__close" type="button" data-feedback-pop-close aria-label="Fechar">${icon('close')}</button>

    <div class="fb-google">
      <p class="fb-google__eyebrow">${icon('star')} Falta um passo, e ele ajuda muito</p>
      <h2 class="fb-google__title" id="pop-titulo">Publique o que você escreveu no Google</h2>
      <p class="fb-google__text">
        A avaliação no Google é o que faz outras empresas encontrarem a Solute RH.
        O seu texto está aqui: copie, abra o Google e cole.
      </p>

      <blockquote class="fb-google__quote" data-feedback-eco></blockquote>

      <div class="fb-google__acoes">
        <button class="btn btn--ghost" type="button" data-feedback-copy>
          ${icon('file')} <span data-feedback-copy-label>Copiar o meu texto</span>
        </button>
        <a class="btn btn--primary btn--lg" data-feedback-google target="_blank" rel="noopener">
          <img src="media/google-colorido.png" alt="" width="18" height="18"> Avaliar no Google
        </a>
      </div>

      <button class="fb-pop__depois" type="button" data-feedback-pop-close>Deixar para depois</button>
    </div>
  </div>
</dialog>

</main>
`;

module.exports = { meta, body };
