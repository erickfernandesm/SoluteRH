/* =============================================================================
   CONTATO
   ========================================================================== */

const { SITE, SERVICES } = require('../site');
const { icon } = require('../icons');
const { wa, socials } = require('../layout');

const meta = {
  file: 'contato.html',
  page: 'contato',
  title: 'Contato | Solute RH',
  description:
    'Fale com a Solute RH. WhatsApp (32) 99950-1615, contato@soluterh.com.br. Escritório em Juiz de Fora, MG, com atendimento a empresas de todo o Brasil.',
  ogImage: 'og-default.jpg',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contato | Solute RH',
    url: SITE.url + '/contato.html',
    mainEntity: {
      '@type': 'Organization',
      name: SITE.legal,
      telephone: '+' + SITE.phoneRaw,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.state,
        postalCode: SITE.address.zip,
        addressCountry: 'BR',
      },
    },
  },
};

const svcOptions = SERVICES.map((s) => `<option value="${s.title}">${s.title}</option>`).join('\n              ');

const mapQuery = encodeURIComponent(SITE.address.full);

const body = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="hero-sub__bg" aria-hidden="true">
    <img src="media/tour-escritorio-poster.webp" alt="" width="1280" height="720">
  </div>
  <div class="wrap wrap--wide">
    <nav class="crumbs" aria-label="Você está aqui">
      <a href="index.html">Início</a>
      ${icon('chevronR')}
      <span aria-current="page">Contato</span>
    </nav>
    <p class="eyebrow eyebrow--center" data-reveal="up">Fale com a gente</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">A primeira conversa é gratuita</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Trinta minutos para entender o seu contexto e apontar onde está o gargalo da sua gestão
      de pessoas. Se não fizer sentido trabalharmos juntos, a gente diz isso também.
    </p>
    <div class="row" style="margin-top:2.2rem;gap:.8rem" data-reveal="up" data-reveal-delay="200">
      <a class="btn btn--primary btn--lg" href="${wa()}" target="_blank" data-magnetic="0.22">
        ${icon('whatsapp')} Chamar no WhatsApp
      </a>
      <a class="btn btn--ghost btn--lg" href="#form-titulo">Preencher o formulário</a>
    </div>
  </div>
</section>

<!-- ================================================= CANAIS -->
<section class="section--tight" aria-labelledby="canais-titulo">
  <div class="wrap wrap--wide">
    <h2 id="canais-titulo" class="sr-only">Canais de atendimento</h2>
    <div class="grid grid-3" data-stagger="100">

      <a class="card" href="${wa()}" target="_blank" data-reveal="up">
        <span class="card__ico">${icon('whatsapp')}</span>
        <h3 class="card__title">WhatsApp</h3>
        <p class="card__text">O canal mais rápido. Respondemos no mesmo dia útil, normalmente em poucas horas.</p>
        <span class="card__foot"><span class="link-arrow">${SITE.phone} ${icon('arrow')}</span></span>
      </a>

      <a class="card" href="mailto:${SITE.email}" data-reveal="up">
        <span class="card__ico">${icon('mail')}</span>
        <h3 class="card__title">E-mail</h3>
        <p class="card__text">Para propostas, documentos, processos de compras e contatos institucionais.</p>
        <span class="card__foot"><span class="link-arrow">${SITE.email} ${icon('arrow')}</span></span>
      </a>

      <div class="card" data-reveal="up">
        <span class="card__ico">${icon('pin')}</span>
        <h3 class="card__title">Escritório</h3>
        <p class="card__text">${SITE.address.street}<br>${SITE.address.district}, ${SITE.address.city} / ${SITE.address.state}</p>
        <span class="card__foot">
          <a class="link-arrow" href="https://www.google.com/maps/search/?api=1&amp;query=${mapQuery}" target="_blank">Ver no mapa ${icon('external')}</a>
        </span>
      </div>

    </div>
  </div>
</section>

<!-- ================================================= FORMULARIO + MAPA -->
<section class="section" aria-labelledby="form-titulo">
  <div class="wrap wrap--wide">
    <div class="duo duo--top">

      <div data-reveal="up">
        <p class="eyebrow">Prefere escrever?</p>
        <h2 id="form-titulo" data-split="words" data-reveal="fade">Conte o que está acontecendo</h2>
        <p class="muted" style="margin-top:.9rem;margin-bottom:2rem">
          Preencha os campos abaixo. Ao enviar, abrimos o WhatsApp com a sua mensagem já
          montada, é só apertar enviar.
        </p>

        <form class="form" data-form="whatsapp" data-subject="Contato pelo site Solute RH" novalidate>
          <div class="grid grid-2" style="gap:1.1rem">
            <div class="field">
              <label class="label" for="nome">Seu nome <span class="req">*</span></label>
              <input class="input" type="text" id="nome" name="nome" required autocomplete="name" placeholder="Como podemos te chamar?">
            </div>
            <div class="field">
              <label class="label" for="empresa">Empresa <span class="req">*</span></label>
              <input class="input" type="text" id="empresa" name="empresa" required autocomplete="organization" placeholder="Nome da empresa">
            </div>
          </div>

          <div class="grid grid-2" style="gap:1.1rem">
            <div class="field">
              <label class="label" for="email">E-mail <span class="req">*</span></label>
              <input class="input" type="email" id="email" name="email" required autocomplete="email" placeholder="voce@empresa.com.br">
            </div>
            <div class="field">
              <label class="label" for="telefone">Telefone</label>
              <input class="input" type="tel" id="telefone" name="telefone" autocomplete="tel" placeholder="(00) 00000-0000">
            </div>
          </div>

          <div class="grid grid-2" style="gap:1.1rem">
            <div class="field">
              <label class="label" for="porte">Número de colaboradores</label>
              <select class="select" id="porte" name="porte">
                <option value="">Selecione</option>
                <option>Até 10</option>
                <option>De 11 a 50</option>
                <option>De 51 a 200</option>
                <option>De 201 a 500</option>
                <option>Mais de 500</option>
              </select>
            </div>
            <div class="field">
              <label class="label" for="interesse">Assunto</label>
              <select class="select" id="interesse" name="interesse">
                <option value="">Selecione</option>
                <option>Diagnóstico gratuito</option>
                ${svcOptions}
                <option>Solute Cursos</option>
                <option>Mesa Solute</option>
                <option>Outro assunto</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="label" for="mensagem">O que está travando hoje? <span class="req">*</span></label>
            <textarea class="textarea" id="mensagem" name="mensagem" required placeholder="Descreva rapidamente a situação. Quanto mais contexto, melhor a nossa devolutiva."></textarea>
          </div>

          <label class="check">
            <input type="checkbox" name="lgpd" required>
            <span>Autorizo a Solute RH a entrar em contato comigo e concordo com a
              <a href="politica-de-privacidade.html">Política de Privacidade</a>.</span>
          </label>

          <div class="row" style="gap:.8rem;margin-top:.4rem">
            <button class="btn btn--primary btn--lg" type="submit" data-magnetic="0.2">
              Enviar mensagem ${icon('whatsapp')}
            </button>
            <a class="btn btn--quiet" href="mailto:${SITE.email}">ou envie por e-mail</a>
          </div>

          <p class="form-msg" data-form-msg hidden></p>
          <p class="form-note">Seus dados são usados apenas para responder este contato. Não repassamos informação para terceiros.</p>
        </form>
      </div>

      <div class="stack" style="gap:1.6rem" data-reveal="left">
        <div class="map-frame">
          <iframe
            title="Localização do escritório da Solute RH em Juiz de Fora"
            src="https://www.google.com/maps?q=${mapQuery}&amp;output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div class="card" style="padding:1.6rem">
          <h3 class="card__title" style="font-size:1.05rem">Atendimento</h3>
          <div class="footer__contact" style="margin-top:1.1rem">
            <p>${icon('clock')}<span>Segunda a quinta, das 08h às 18h<br>Sexta, das 08h às 17h</span></p>
            <p>${icon('pin')}<span>${SITE.address.street}<br>${SITE.address.district}, ${SITE.address.city} / ${SITE.address.state}<br>CEP ${SITE.address.zip}</span></p>
            <a href="tel:+${SITE.phoneRaw}">${icon('phone')}<span>${SITE.phone}</span></a>
            <a href="mailto:${SITE.email}">${icon('mail')}<span>${SITE.email}</span></a>
          </div>
          <div style="margin-top:1.4rem;padding-top:1.4rem;border-top:1px solid var(--line)">
            <p class="dim" style="font-size:.84rem;margin-bottom:.5rem">Acompanhe nas redes</p>
            ${socials()}
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ================================================= FAQ -->
<section class="section surface-900" aria-labelledby="faq-titulo">
  <div class="wrap wrap--narrow">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center" data-reveal="up">Antes de escrever</p>
      <h2 id="faq-titulo" data-split="words" data-reveal="fade">Perguntas que chegam sempre</h2>
    </div>

    <div class="acc" data-reveal="up">
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">O diagnóstico é realmente gratuito?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>É. São cerca de 30 minutos de conversa, sem custo e sem compromisso de contratação. O objetivo é entender o seu contexto e apontar a prioridade. Se a nossa consultoria não for o caminho, dizemos isso na hora.</p></div></div>
      </div>
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">Vocês atendem fora de Juiz de Fora?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>Sim, atendemos empresas em todo o Brasil. Boa parte dos projetos acontece em formato remoto, com encontros presenciais quando o escopo pede. Recrutamento e seleção também tem cobertura nacional.</p></div></div>
      </div>
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">Qual o porte mínimo de empresa que vocês atendem?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>Não temos um corte rígido, mas os projetos de estruturação de RH costumam fazer mais sentido a partir de 20 colaboradores. Abaixo disso, muitas vezes o melhor caminho é a Solute Cursos, para o próprio empresário executar.</p></div></div>
      </div>
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">Quanto custa um projeto de consultoria?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>Depende do escopo, do porte e da urgência, então não trabalhamos com tabela fixa. A proposta com investimento só é montada depois do diagnóstico, quando já sabemos exatamente o que precisa ser feito.</p></div></div>
      </div>
      <div class="acc__item">
        <button class="acc__btn" type="button" aria-expanded="false">Em quanto tempo vocês respondem?<span class="acc__ico" aria-hidden="true"></span></button>
        <div class="acc__panel"><div><p>No mesmo dia útil, normalmente em poucas horas. O WhatsApp costuma ser o canal mais rápido. Mensagens enviadas no fim de semana são respondidas na segunda pela manhã.</p></div></div>
      </div>
    </div>
  </div>
</section>

<!-- ================================================= CTA WHATSAPP -->
<section class="section" aria-labelledby="cta-wpp">
  <div class="wrap wrap--wide">
    <div class="cta-band" data-reveal="rise">
      <p class="eyebrow eyebrow--center">Caminho mais curto</p>
      <h2 class="cta-band__title" id="cta-wpp">Prefere resolver agora pelo WhatsApp?</h2>
      <p class="lead">Manda uma mensagem contando rapidamente o que está acontecendo. A gente responde ainda hoje.</p>
      <div class="cta-band__actions">
        <a class="btn btn--primary btn--lg" href="${wa()}" target="_blank" data-magnetic="0.25">
          ${icon('whatsapp')} Chamar no WhatsApp
        </a>
      </div>
      <p class="cta-band__note">${SITE.phone} · Seg. a qui. 08h às 18h · Sex. 08h às 17h</p>
    </div>
  </div>
</section>

</main>
`;

module.exports = { meta, body };
