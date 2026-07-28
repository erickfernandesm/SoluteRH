/* =============================================================================
   POLITICA DE PRIVACIDADE
   ========================================================================== */

const { SITE } = require('../site');
const { icon } = require('../icons');

const meta = {
  file: 'politica-de-privacidade.html',
  page: 'politica',
  title: 'Política de Privacidade | Solute RH',
  description:
    'Como a Solute RH coleta, usa, armazena e protege os dados pessoais dos visitantes do site e dos clientes, em conformidade com a LGPD.',
  ogImage: 'og-default.jpg',
};

const body = `
<main id="conteudo">

<section class="hero-sub hero-sub--center" aria-labelledby="titulo">
  <div class="wrap wrap--wide">
    <nav class="crumbs" aria-label="Você está aqui">
      <a href="index.html">Início</a>
      ${icon('chevronR')}
      <span aria-current="page">Política de Privacidade</span>
    </nav>
    <p class="eyebrow eyebrow--center" data-reveal="up">Transparência</p>
    <h1 class="hero-sub__title" id="titulo" data-split="words" data-reveal="fade">Política de Privacidade</h1>
    <p class="lead" data-reveal="up" data-reveal-delay="140">
      Como a ${SITE.legal} trata os dados pessoais coletados neste site, conforme a Lei Geral
      de Proteção de Dados (Lei nº 13.709/2018).
    </p>
  </div>
</section>

<section class="section section--flush-top" aria-label="Conteúdo da política">
  <div class="wrap wrap--wide">
    <div class="duo duo--top" style="grid-template-columns:minmax(0,.32fr) minmax(0,.68fr)">

      <aside class="toc" aria-label="Índice da política">
        <p class="toc__title">Nesta página</p>
        <nav class="toc__list">
          <a href="#quem">Quem somos</a>
          <a href="#dados">Dados que coletamos</a>
          <a href="#uso">Como usamos</a>
          <a href="#base">Base legal</a>
          <a href="#compartilhamento">Compartilhamento</a>
          <a href="#cookies">Cookies</a>
          <a href="#armazenamento">Armazenamento</a>
          <a href="#direitos">Seus direitos</a>
          <a href="#seguranca">Segurança</a>
          <a href="#alteracoes">Alterações</a>
          <a href="#contato-lgpd">Contato</a>
        </nav>
      </aside>

      <div class="prose" data-reveal="up">

        <p class="dim" style="font-size:.88rem">Última atualização: janeiro de 2026.</p>

        <h2 id="quem">1. Quem somos</h2>
        <p>
          A ${SITE.legal} (${SITE.name}), inscrita no CNPJ ${SITE.cnpj}, com sede em
          ${SITE.address.full}, é a controladora dos dados pessoais tratados por meio
          deste site.
        </p>

        <h2 id="dados">2. Dados que coletamos</h2>
        <p>Coletamos apenas o necessário para responder ao seu contato e melhorar o site:</p>
        <ul>
          <li><strong>Dados que você informa:</strong> nome, e-mail, telefone, empresa, número de colaboradores, assunto de interesse e o conteúdo da mensagem enviada pelo formulário de contato.</li>
          <li><strong>Dados de navegação:</strong> páginas visitadas, tempo de permanência, origem do acesso, tipo de dispositivo e navegador, coletados de forma agregada.</li>
          <li><strong>Comunicação por WhatsApp e e-mail:</strong> o histórico das conversas iniciadas por você através dos canais divulgados no site.</li>
        </ul>
        <p>
          Não coletamos dados pessoais sensíveis pelo site. Se um projeto de consultoria exigir
          tratamento de dados de colaboradores da sua empresa, isso é regido por contrato
          específico, com cláusulas próprias de confidencialidade e proteção de dados.
        </p>

        <h2 id="uso">3. Como usamos os seus dados</h2>
        <ul>
          <li>Responder às solicitações de contato, orçamento e diagnóstico gratuito.</li>
          <li>Enviar informações sobre serviços, cursos, lives e eventos, quando você autoriza.</li>
          <li>Entender como o site é utilizado para melhorar conteúdo e navegação.</li>
          <li>Cumprir obrigações legais e regulatórias aplicáveis.</li>
        </ul>
        <p><strong>Não vendemos, alugamos nem comercializamos dados pessoais em nenhuma hipótese.</strong></p>

        <h2 id="base">4. Base legal do tratamento</h2>
        <p>O tratamento dos seus dados se apoia nas seguintes bases previstas na LGPD:</p>
        <ul>
          <li><strong>Consentimento</strong> (art. 7º, I), quando você preenche o formulário e autoriza o contato.</li>
          <li><strong>Execução de contrato ou procedimentos preliminares</strong> (art. 7º, V), no atendimento a pedidos de proposta.</li>
          <li><strong>Legítimo interesse</strong> (art. 7º, IX), para melhoria do site e comunicação institucional, sempre respeitando os seus direitos.</li>
          <li><strong>Cumprimento de obrigação legal</strong> (art. 7º, II), quando a lei exigir a guarda de determinados registros.</li>
        </ul>

        <h2 id="compartilhamento">5. Com quem compartilhamos</h2>
        <p>
          Compartilhamos dados apenas com prestadores de serviço essenciais à operação, como
          plataformas de hospedagem, e-mail, mensageria e análise de tráfego, todos obrigados
          contratualmente a manter sigilo e a tratar os dados apenas conforme as nossas instruções.
        </p>
        <p>
          Também poderemos compartilhar informações quando houver ordem judicial, requisição de
          autoridade competente ou obrigação legal.
        </p>

        <h2 id="cookies">6. Cookies</h2>
        <p>
          Este site utiliza cookies estritamente necessários ao funcionamento e, quando aplicável,
          cookies de análise para entender o uso das páginas de forma agregada. Você pode bloquear
          ou apagar cookies nas configurações do seu navegador. Ao fazer isso, algumas funções do
          site podem deixar de funcionar corretamente.
        </p>

        <h2 id="armazenamento">7. Por quanto tempo guardamos</h2>
        <p>
          Mantemos os dados de contato pelo tempo necessário ao atendimento e, depois, pelo prazo
          exigido por obrigações legais ou para o exercício regular de direitos. Encerrada a
          finalidade e os prazos legais, os dados são eliminados ou anonimizados.
        </p>

        <h2 id="direitos">8. Seus direitos</h2>
        <p>A qualquer momento, você pode solicitar:</p>
        <ul>
          <li>Confirmação da existência de tratamento e acesso aos seus dados.</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei.</li>
          <li>Portabilidade dos dados a outro fornecedor, mediante requisição expressa.</li>
          <li>Informação sobre com quem os seus dados foram compartilhados.</li>
          <li>Revogação do consentimento e eliminação dos dados tratados com base nele.</li>
        </ul>
        <p>
          Para exercer qualquer desses direitos, escreva para
          <a href="mailto:${SITE.email}">${SITE.email}</a>. Respondemos em até 15 dias.
        </p>

        <h2 id="seguranca">9. Segurança</h2>
        <p>
          Adotamos medidas técnicas e administrativas para proteger os dados pessoais contra
          acessos não autorizados e situações acidentais ou ilícitas de destruição, perda,
          alteração ou difusão. Nenhum sistema é totalmente imune, mas mantemos controles de
          acesso restritos e revisamos as nossas práticas periodicamente.
        </p>

        <h2 id="alteracoes">10. Alterações desta política</h2>
        <p>
          Esta política pode ser atualizada para refletir mudanças legais ou operacionais.
          A data da última atualização fica sempre indicada no topo do documento. Recomendamos
          a leitura periódica.
        </p>

        <h2 id="contato-lgpd">11. Fale sobre privacidade</h2>
        <p>
          Dúvidas, pedidos ou reclamações relacionadas ao tratamento dos seus dados pessoais
          podem ser enviadas para:
        </p>
        <ul>
          <li>E-mail: <a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>Telefone e WhatsApp: <a href="tel:+${SITE.phoneRaw}">${SITE.phone}</a></li>
          <li>Endereço: ${SITE.address.full}</li>
        </ul>

      </div>
    </div>
  </div>
</section>

</main>
`;

module.exports = { meta, body };
