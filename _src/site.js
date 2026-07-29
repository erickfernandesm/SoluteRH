/* =============================================================================
   SOLUTE RH - dados compartilhados do site
   Altere aqui e rode `node _tools/build-site.js` para propagar em todas
   as paginas (menu, rodape, contatos, SEO...).
   ========================================================================== */

const SITE = {
  name: 'Solute RH',
  legal: 'Solute Recursos Humanos',
  cnpj: '42.692.955/0001-05',
  tagline: 'Fortalecemos negócios através de pessoas',
  url: 'https://soluterh.com.br',

  phone: '(32) 99950-1615',
  phoneRaw: '5532999501615',
  email: 'contato@soluterh.com.br',

  address: {
    street: 'R. Batista de Oliveira, 1164, Sala 607',
    district: 'Centro',
    city: 'Juiz de Fora',
    state: 'MG',
    zip: '36010-532',
    full: 'R. Batista de Oliveira, 1164, Sala 607, Centro, Juiz de Fora / MG',
  },

  social: {
    instagram: 'https://www.instagram.com/soluterecursoshumanos/',
    linkedin: 'https://www.linkedin.com/company/solute-rh/',
    youtube: 'https://www.youtube.com/@rose.especialistarh',
  },

  // mensagem padrao do botao de WhatsApp
  waText: 'Olá! Vim pelo site da Solute RH e gostaria de agendar um diagnóstico gratuito.',

  stats: {
    empresas: 700,
    formados: 16000,
    anos: 5,
    nota: 5.0,
    experiencia: 15,
    cursos: 20,
  },

  live: {
    day: 'Toda terça-feira',
    time: '09h00',
    radio: 'Rádio Aló FM 96.7',
  },
};

/* --------------------------------------------------------------------------
   SERVICOS DE CONSULTORIA
   -------------------------------------------------------------------------- */
const SERVICES = [
  {
    slug: 'rh-estrategico',
    nav: 'RH Estratégico',
    title: 'RH Estratégico',
    kicker: 'Estrutura & indicadores',
    short: 'Implantação completa da estrutura de RH com indicadores reais de gestão.',
    blurb:
      'Implantamos a estrutura completa do seu RH com indicadores reais de gestão: turnover, custo de contratação, produtividade, engajamento e desempenho. Junto vem a governança necessária para reduzir riscos trabalhistas.',
    img: 'rhestrategico',
    icon: 'target',
    lead:
      'Se o RH da sua empresa ainda é reativo, ou seja, apaga incêndio, resolve folha e não senta à mesa de decisão, o que falta é estrutura, não esforço. O RH Estratégico organiza processos, cria indicadores e transforma gestão de pessoas em vantagem competitiva.',
    pains: [
      'Decisões de pessoal tomadas no achismo, sem dado nenhum para sustentar.',
      'Turnover alto e ninguém sabe dizer exatamente por quê.',
      'Processos de RH informais, na cabeça de uma pessoa só.',
      'Passivo trabalhista aparecendo de surpresa.',
    ],
    delivers: [
      ['Diagnóstico completo do RH', 'Mapeamento de processos, riscos e maturidade da área em relação ao porte e ao setor da empresa.'],
      ['Painel de indicadores', 'Turnover, absenteísmo, custo por contratação, tempo de fechamento de vaga, headcount e produtividade.'],
      ['Desenho de processos', 'Fluxos escritos e padronizados de admissão, integração, desligamento, férias e movimentações.'],
      ['Governança e conformidade', 'Políticas, documentação e rotinas que protegem a empresa de riscos trabalhistas.'],
      ['Estrutura organizacional', 'Organograma, definição de papéis e clareza de responsabilidades por área.'],
      ['Plano de ação com prazos', 'Cronograma priorizado do que fazer primeiro, com responsáveis e metas por trimestre.'],
    ],
    results: [
      'Redução consistente do turnover',
      'Decisões de pessoal baseadas em dados',
      'Menor exposição a passivos trabalhistas',
      'RH participando das decisões do negócio',
    ],
    forWho: 'Empresas a partir de 20 colaboradores que já sentem que o RH informal não dá mais conta.',
  },
  {
    slug: 'plano-de-cargos-e-salarios',
    nav: 'Plano de Cargos e Salários',
    title: 'Plano de Cargos e Salários',
    kicker: 'Equidade & retenção',
    short: 'Estrutura salarial justa, transparente e adaptada à realidade do negócio.',
    blurb:
      'Equidade interna, transparência salarial e retenção de talentos com uma estrutura de cargos e faixas construída sob medida para a realidade financeira do seu negócio.',
    img: 'planodecargos-e-salarios',
    icon: 'scale',
    lead:
      'Salário desalinhado gera dois problemas caros ao mesmo tempo: gente boa indo embora e gente cara demais para a entrega. Um plano de cargos e salários bem construído resolve os dois e ainda te dá previsibilidade de folha.',
    pains: [
      'Pessoas no mesmo cargo ganhando valores muito diferentes.',
      'Pedidos de aumento resolvidos caso a caso, sem critério.',
      'Não existe um caminho claro de crescimento para o time.',
      'A folha cresce e ninguém consegue projetar o impacto.',
    ],
    delivers: [
      ['Descrição de cargos', 'Todas as funções descritas com requisitos, responsabilidades e entregas esperadas.'],
      ['Avaliação e pontuação', 'Metodologia de pontos para hierarquizar cargos com critério técnico, não por simpatia.'],
      ['Pesquisa salarial', 'Comparação com o mercado da região e do setor para calibrar as faixas.'],
      ['Tabela salarial por faixas', 'Níveis e steps por cargo, com mínimo, médio e máximo definidos.'],
      ['Política de remuneração', 'Regras escritas de promoção, mérito, enquadramento e reajuste.'],
      ['Simulação de impacto', 'Projeção do custo de implantação e do reflexo na folha mês a mês.'],
    ],
    results: [
      'Fim das negociações salariais caso a caso',
      'Trilha de carreira visível para o time',
      'Previsibilidade do custo de folha',
      'Redução de saídas por questão salarial',
    ],
    forWho: 'Empresas que já cresceram e perceberam que a folha virou uma colcha de retalhos.',
  },
  {
    slug: 'nr-01-riscos-psicossociais',
    nav: 'NR-01 e Riscos Psicossociais',
    title: 'NR-01 e Riscos Psicossociais',
    kicker: 'Conformidade legal',
    short: 'Implementação e acompanhamento contínuo do gerenciamento de riscos psicossociais.',
    blurb:
      'Implementação e acompanhamento contínuo da NR-01: mapeamento de riscos psicossociais, documentação exigida e atualização diante das mudanças regulatórias.',
    img: 'nr01',
    icon: 'shield',
    lead:
      'A NR-01 deixou de ser papelada de SESMT e passou a exigir gestão real de riscos psicossociais. Empresa sem inventário de riscos e plano de ação documentado está exposta a autuação, interdição e ação trabalhista.',
    pains: [
      'PGR desatualizado ou sem os riscos psicossociais mapeados.',
      'Ninguém sabe exatamente o que a fiscalização vai pedir.',
      'Afastamentos por saúde mental crescendo sem tratativa.',
      'Documentação espalhada, sem evidência de acompanhamento.',
    ],
    delivers: [
      ['Inventário de riscos', 'Levantamento dos riscos psicossociais por setor e função, com metodologia rastreável.'],
      ['Avaliação e priorização', 'Matriz de severidade e probabilidade para priorizar o que tratar primeiro.'],
      ['Plano de ação documentado', 'Medidas de controle com responsáveis, prazos e evidências de execução.'],
      ['Integração com o PGR', 'Alinhamento do material com o Programa de Gerenciamento de Riscos existente.'],
      ['Treinamento de lideranças', 'Capacitação de gestores para identificar e encaminhar situações de risco.'],
      ['Acompanhamento contínuo', 'Revisões periódicas e atualização diante de mudanças na norma.'],
    ],
    results: [
      'Conformidade documentada e auditável',
      'Redução de afastamentos e absenteísmo',
      'Liderança preparada para agir',
      'Menor exposição a autuação e passivo',
    ],
    forWho: 'Qualquer empresa com colaboradores CLT. A NR-01 se aplica a todas.',
  },
  {
    slug: 'desenvolvimento-de-lideranca',
    nav: 'Academia de Líderes',
    title: 'Academia de Líderes',
    kicker: 'Liderança & cultura',
    short: 'Formação de líderes que decidem bem, dão retorno e sustentam a cultura.',
    blurb:
      'Desenvolvemos líderes capazes de tomar decisões assertivas, sustentar uma cultura de excelência e manter equipes engajadas no dia a dia.',
    img: 'desenvolvimento-de-lideranca',
    icon: 'users',
    lead:
      'Quase todo problema de clima é, no fundo, um problema de liderança. Promover o melhor técnico sem prepará-lo para liderar custa caro: cria conflito, trava a entrega e faz gente boa pedir demissão do chefe, não da empresa.',
    pains: [
      'Líderes técnicos excelentes, gestores despreparados.',
      'Conversas difíceis sendo evitadas até virarem crise.',
      'Cada gestor conduz o time de um jeito completamente diferente.',
      'Feedback só acontece quando algo dá errado.',
    ],
    delivers: [
      ['Diagnóstico de liderança', 'Mapeamento do estilo, das lacunas e do potencial de cada gestor.'],
      ['Trilha de formação', 'Encontros estruturados de comunicação, feedback, delegação e gestão de conflito.'],
      ['Ferramentas práticas', 'Roteiros de 1:1, matriz de delegação, plano de desenvolvimento individual.'],
      ['Estudos de caso reais', 'Situações da própria empresa trabalhadas em grupo, com condução da consultoria.'],
      ['Mentoria individual', 'Acompanhamento próximo dos líderes com maior impacto no negócio.'],
      ['Ritual de gestão', 'Implantação de rotinas de acompanhamento que não dependem de lembrete.'],
    ],
    results: [
      'Time mais engajado e menos rotativo',
      'Conflitos resolvidos antes de escalar',
      'Padrão comum de gestão entre as áreas',
      'Sucessão de lideranças preparada',
    ],
    forWho: 'Empresas com camada de coordenação/gerência formada ou em formação.',
  },
  {
    slug: 'avaliacao-de-desempenho',
    nav: 'Avaliação de Desempenho',
    title: 'Avaliação de Desempenho',
    kicker: 'Critério & mérito',
    short: 'Reconheça os colaboradores certos com critérios justos e estruturados.',
    blurb:
      'Saia dos achismos. Reconheça e promova as pessoas certas com critérios claros, defensáveis e conectados às metas do negócio.',
    img: 'avaliacao-de-desempenho',
    icon: 'chart',
    lead:
      'Sem avaliação estruturada, quem cresce é quem aparece, não quem entrega. Isso desmotiva o time inteiro e faz a empresa perder justamente quem sustenta o resultado.',
    pains: [
      'Promoções decididas por percepção, não por entrega.',
      'Time sem clareza do que é "fazer um bom trabalho" ali.',
      'Avaliação vira formulário preenchido às pressas uma vez ao ano.',
      'Resultado da avaliação não vira ação nenhuma.',
    ],
    delivers: [
      ['Modelo sob medida', 'Escolha e calibragem do formato (90°, 180° ou 360°) conforme a maturidade da empresa.'],
      ['Competências e metas', 'Definição do que será avaliado por cargo, com comportamentos observáveis.'],
      ['Formulários e escalas', 'Instrumentos prontos, com escala calibrada para evitar nota-média em tudo.'],
      ['Capacitação dos avaliadores', 'Treinamento de gestores para avaliar sem viés e conduzir a devolutiva.'],
      ['Comitê de calibração', 'Rito de alinhamento entre áreas para dar consistência às notas.'],
      ['PDI e plano de sucessão', 'Do resultado sai plano de desenvolvimento individual e mapa de sucessores.'],
    ],
    results: [
      'Meritocracia com critério defensável',
      'Conversas de carreira mais objetivas',
      'Base sólida para promoção e mérito',
      'Identificação real dos talentos-chave',
    ],
    forWho: 'Empresas que precisam justificar promoções e méritos com critério.',
  },
  {
    slug: 'pesquisa-de-clima',
    nav: 'Pesquisa de Clima',
    title: 'Pesquisa de Clima Organizacional',
    kicker: 'Escuta & dados',
    short: 'Entenda o que o time realmente pensa, com dado e não com boato.',
    blurb:
      'Compreenda as percepções reais da sua equipe com dados precisos e transforme isso em ações concretas para um ambiente de trabalho saudável e produtivo.',
    img: 'pesquisa-organizacional',
    icon: 'pulse',
    lead:
      'Quando a informação só chega pelo corredor, a empresa sempre descobre o problema tarde demais. Pesquisa de clima bem conduzida antecipa saída de talento, conflito de área e queda de produtividade.',
    pains: [
      'A diretoria só descobre o problema na entrevista de desligamento.',
      'Pesquisas anteriores geraram expectativa e nenhuma ação.',
      'Time não responde com sinceridade por medo de exposição.',
      'Resultado vira relatório bonito que ninguém usa.',
    ],
    delivers: [
      ['Instrumento validado', 'Questionário construído sobre dimensões testadas, adaptado à linguagem da empresa.'],
      ['Aplicação sigilosa', 'Coleta anônima conduzida por terceiro, o que aumenta muito a adesão e a sinceridade.'],
      ['Análise por recorte', 'Resultados por área, tempo de casa, cargo e liderança, sem expor indivíduos.'],
      ['Devolutiva executiva', 'Apresentação para a diretoria com os achados críticos e o que fazer com eles.'],
      ['Plano de ação priorizado', 'Iniciativas ordenadas por impacto e esforço, com responsáveis definidos.'],
      ['Comunicação de retorno', 'Roteiro para devolver o resultado ao time sem gerar ruído.'],
    ],
    results: [
      'Problemas identificados antes de virar saída',
      'Ações focadas no que realmente pesa',
      'Aumento de confiança na liderança',
      'Base comparável para medir evolução',
    ],
    forWho: 'Empresas a partir de 30 colaboradores, ou em momento de mudança relevante.',
  },
  {
    slug: 'fit-cultural-e-perfil-comportamental',
    nav: 'Fit Cultural e Perfil Comportamental',
    title: 'Fit Cultural e Perfil Comportamental',
    kicker: 'Aderência & encaixe',
    short: 'Contratações alinhadas à cultura, com muito menos erro de escolha.',
    blurb:
      'Contratações mais assertivas e alinhadas à cultura da empresa, reduzindo o turnover causado por desencaixe comportamental.',
    img: 'fit-cultural',
    icon: 'puzzle',
    lead:
      'Currículo mostra o que a pessoa sabe fazer. Comportamento mostra se ela vai conseguir fazer ali, com aquele time e aquele gestor. A maioria dos desligamentos precoces não é falta de técnica, é desencaixe.',
    pains: [
      'Contratações técnicas perfeitas que não duram seis meses.',
      'Time novo entrando e não "pegando o jeito da casa".',
      'Cada gestor contrata com um critério subjetivo próprio.',
      'Conflitos recorrentes entre perfis que não deveriam estar juntos.',
    ],
    delivers: [
      ['Mapeamento da cultura real', 'Identificação dos valores praticados de fato, não só os do quadro na parede.'],
      ['Perfil ideal por cargo', 'Definição do conjunto comportamental que funciona em cada posição.'],
      ['Aplicação de assessments', 'Ferramentas de perfil comportamental aplicadas e interpretadas por especialista.'],
      ['Roteiro de entrevista por competência', 'Perguntas estruturadas que revelam comportamento passado, não intenção.'],
      ['Laudo de aderência', 'Parecer objetivo de encaixe do candidato com o cargo, o gestor e a cultura.'],
      ['Mapa do time atual', 'Leitura comportamental da equipe existente para entender complementaridades e atritos.'],
    ],
    results: [
      'Queda expressiva do turnover precoce',
      'Integração mais rápida dos novos',
      'Critério comum de contratação',
      'Times montados por complementaridade',
    ],
    forWho: 'Empresas que contratam com frequência ou que sofrem com saídas nos primeiros meses.',
  },
  {
    slug: 'recrutamento-e-selecao',
    nav: 'Recrutamento e Seleção',
    title: 'Recrutamento e Seleção Personalizado',
    kicker: 'Atração & escolha',
    short: 'Candidatos certos para a vaga e para a cultura, em todo o Brasil.',
    blurb:
      'Processo conduzido de ponta a ponta para entregar candidatos alinhados à vaga e à cultura da empresa, com atendimento em todo o Brasil.',
    img: 'recrutamento-selecao',
    icon: 'search',
    lead:
      'Vaga aberta por muito tempo custa caro em duas frentes: a entrega que não acontece e o time que assume a sobrecarga. Um processo estruturado reduz o tempo de fechamento e, principalmente, o risco de errar a escolha.',
    pains: [
      'Vagas abertas há meses sem candidato adequado.',
      'Muito currículo chegando e pouquíssimo aderente.',
      'Gestor perdendo horas em entrevista que não deveria acontecer.',
      'Candidato aceita a proposta e desiste antes de começar.',
    ],
    delivers: [
      ['Alinhamento de perfil', 'Reunião de abertura com o gestor para definir o que é essencial e o que é desejável.'],
      ['Atração ativa', 'Divulgação em canais certos mais busca ativa (hunting) quando o perfil é escasso.'],
      ['Triagem técnica e comportamental', 'Filtro em duas camadas antes de qualquer currículo chegar ao gestor.'],
      ['Entrevista por competência', 'Condução estruturada por especialista, com registro comparável entre candidatos.'],
      ['Parecer completo', 'Shortlist com análise de cada finalista, pontos de atenção e recomendação.'],
      ['Acompanhamento pós-contratação', 'Follow-up nos primeiros meses e garantia de reposição contratual.'],
    ],
    results: [
      'Tempo de fechamento de vaga menor',
      'Gestor entrevistando só quem faz sentido',
      'Menos erro de contratação',
      'Cobertura nacional de busca',
    ],
    forWho: 'Empresas de qualquer porte com vagas críticas ou de difícil preenchimento.',
  },
];

/* --------------------------------------------------------------------------
   CURSOS (Solute Cursos)
   -------------------------------------------------------------------------- */
const COURSES = [
  {
    title: 'Método RH Estratégico',
    icon: 'target',
    short: 'A formação completa para estruturar um RH que decide.',
    url: 'https://metodorhestrategico.com.br/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&fbclid=PAZXh0bgNhZW0CMTEAAaeqYwmeVZcXlEB0ajHU0NTfQJH1G4HnHnIrSHrKp3PEDy7alPVzGS_xGcOXtg_aem_CFpT6V6ub77CvnXdsigXzg',
    badge: 'Certificação MEC',
    text: 'A formação completa para estruturar um RH que senta à mesa de decisão. Método validado em centenas de empresas, com ferramentas prontas e mentorias ao vivo.',
    meta: ['+50 horas', 'Certificado MEC', 'Mentorias ao vivo'],
    featured: true,
  },
  {
    title: 'Plano de Cargos e Salários',
    icon: 'scale',
    short: 'Do zero à tabela salarial pronta, com planilhas.',
    url: 'https://curso.soluterh.com.br/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&fbclid=PAZXh0bgNhZW0CMTEAAaeqYwmeVZcXlEB0ajHU0NTfQJH1G4HnHnIrSHrKp3PEDy7alPVzGS_xGcOXtg_aem_CFpT6V6ub77CvnXdsigXzg',
    badge: 'Mais procurado',
    text: 'Do zero à tabela salarial pronta. Passo a passo com planilhas de descrição, pontuação e faixas, mais suporte direto para tirar dúvidas do seu caso real.',
    meta: ['Planilhas prontas', 'Suporte direto', 'Estudo de caso'],
    featured: true,
  },
  {
    title: 'Domine a NR-01',
    icon: 'shield',
    short: 'Riscos psicossociais na ordem certa, com templates.',
    url: 'https://dominenr1.com.br/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&fbclid=PAZXh0bgNhZW0CMTEAAaeqYwmeVZcXlEB0ajHU0NTfQJH1G4HnHnIrSHrKp3PEDy7alPVzGS_xGcOXtg_aem_CFpT6V6ub77CvnXdsigXzg',
    badge: 'Conformidade',
    text: 'Tudo o que a norma exige sobre riscos psicossociais, na ordem certa de execução, com os documentos que a fiscalização pede já modelados.',
    meta: ['20 horas', '9 módulos', '8 templates'],
    featured: true,
  },
  {
    title: 'I.A. com RH',
    icon: 'sparkles',
    short: 'Automatize triagem, cargos e clima com prompts prontos.',
    url: 'https://iacomrh.com.br/ia-com-rh-2/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&fbclid=PAZXh0bgNhZW0CMTEAAaeqYwmeVZcXlEB0ajHU0NTfQJH1G4HnHnIrSHrKp3PEDy7alPVzGS_xGcOXtg_aem_CFpT6V6ub77CvnXdsigXzg',
    badge: 'Novo',
    text: 'Como automatizar triagem, descrição de cargos, análise de clima e relatórios usando inteligência artificial, com prompts prontos para o dia a dia do RH.',
    meta: ['Prompts prontos', 'Prático', 'Atualizado'],
  },
  {
    title: 'Liderar com Alta Performance',
    icon: 'users',
    short: 'Feedback, delegação e conversas difíceis na prática.',
    url: 'https://liderarcomaltaperformance.com.br/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&fbclid=PAZXh0bgNhZW0CMTEAAaeqYwmeVZcXlEB0ajHU0NTfQJH1G4HnHnIrSHrKp3PEDy7alPVzGS_xGcOXtg_aem_CFpT6V6ub77CvnXdsigXzg',
    text: 'Formação para gestores que precisam entregar resultado através do time: feedback, delegação, conversas difíceis e gestão de conflito.',
    meta: ['Para gestores', 'Casos reais'],
  },
  {
    title: 'Avaliação de Desempenho',
    icon: 'chart',
    short: 'Um ciclo de avaliação que gera decisão, não formulário.',
    url: 'https://avaliacaodedesempenhonapraticasoluterh.pages.dev/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR',
    text: 'Metodologia prática para empresários e gestores montarem um ciclo de avaliação que gera decisão, e não só formulário preenchido.',
    meta: ['Modelos prontos', 'Passo a passo'],
  },
  {
    title: 'Meu Time Forte',
    icon: 'handshake',
    short: 'Formar, integrar e manter equipes de alta entrega.',
    url: 'https://meutimeforte.com.br/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&fbclid=PAZXh0bgNhZW0CMTEAAaeqYwmeVZcXlEB0ajHU0NTfQJH1G4HnHnIrSHrKp3PEDy7alPVzGS_xGcOXtg_aem_CFpT6V6ub77CvnXdsigXzg',
    text: 'Como formar, integrar e manter equipes de alta entrega, desde a seleção até o ritual de acompanhamento semanal.',
    meta: ['Times', 'Engajamento'],
  },
  {
    title: 'Programa de Remuneração',
    icon: 'layers',
    short: 'Remuneração variável e bônus ligados a metas.',
    url: 'https://www.mentoria.soluterh.com.br/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR',
    text: 'Estrutura de remuneração variável, bonificação e incentivos ligada a metas, sem criar passivo nem distorção interna.',
    meta: ['Remuneração variável', 'Metas'],
  },
];

/* --------------------------------------------------------------------------
   CLIENTES
   -------------------------------------------------------------------------- */
const CLIENTS = [
  { file: 'tim', name: 'TIM' },
  { file: 'trade', name: 'Trade' },
  { file: 'sindicomercio', name: 'Sindicomércio' },
  { file: 'libano', name: 'Faculdade Líbano' },
  { file: 'datafor', name: 'Datafor' },
  { file: 'fisk', name: 'Fisk' },
  { file: 'pramar', name: 'Pramar' },
  { file: 'pralis', name: 'Pralis' },
  { file: 'paraibuna-embalagens', name: 'Paraibuna Embalagens' },
  { file: 'mundial-aluminio', name: 'Mundial Alumínio' },
  { file: 'newmed', name: 'Newmed' },
  { file: 'gazzoni', name: 'Gazzoni' },
  { file: 'fisiodonto', name: 'Fisiodonto' },
  { file: 'oficina-grafica', name: 'Oficina Gráfica' },
  { file: 'equipar', name: 'Equipar' },
  { file: 'constance', name: 'Constance' },
  { file: 'match-digital', name: 'Match Digital' },
  { file: 'corinto', name: 'Corinto' },
  { file: 'ativa', name: 'Ativa Hospitalar' },
  { file: 'procare', name: 'Procare Produtos Hospitalares' },
  { file: 'nbcbank', name: 'NBC Bank' },
  { file: 'acoem', name: 'Acoem' },
  { file: 'melfex', name: 'Melfex' },
  { file: 'saojose', name: 'Supermercado São José' },
  { file: 'masabor', name: 'Massabor' },
  { file: 'alpha', name: 'Alpha Co' },
  { file: 'dominic', name: 'Dominic Esquadrias' },
  { file: 'ultra', name: 'Ultra Medka' },
  { file: 'smcontabilidade', name: 'SM Contabilidade' },
  { file: 'patativa', name: 'Grupo Patativa' },
  { file: 'amazonia', name: 'Hotel Portal da Amazônia' },
  { file: 'faput', name: 'Fapur' },
  { file: 'pedro', name: 'Instituto Pedro Ruiz' },
];

/* --------------------------------------------------------------------------
   DEPOIMENTOS
   -------------------------------------------------------------------------- */
const TESTIMONIALS = [
  {
    quote:
      'A consultoria da Solute RH transformou completamente nossa gestão de pessoas. A metodologia da Rose é prática, validada e gerou resultados visíveis em poucos meses.',
    name: 'Riane Lopes',
    role: 'Sócia Diretora · Faculdade Líbano',
    photo: 'riane',
  },
  {
    quote:
      'Trabalhar com a Solute RH foi um divisor de águas. A equipe entende do que está falando e conduz cada etapa com muito profissionalismo.',
    name: 'Marcia Gargiulo',
    role: 'Diretora · Datafor',
    photo: 'marcia',
  },
  {
    quote:
      'O plano de cargos e salários trouxe uma clareza que a gente não tinha. Hoje cada pessoa sabe onde está e o que precisa fazer para crescer aqui dentro.',
    name: 'Empresa parceira',
    role: 'Indústria · Zona da Mata, MG',
    initials: 'ZM',
  },
  {
    quote:
      'A implantação da NR-01 foi conduzida com muita segurança técnica. Ficamos em conformidade e, de quebra, com um plano real de cuidado com o time.',
    name: 'Empresa parceira',
    role: 'Serviços · Juiz de Fora, MG',
    initials: 'JF',
  },
];

/* --------------------------------------------------------------------------
   VALORES (parede do escritório)
   -------------------------------------------------------------------------- */
const VALUES = [
  { name: 'Humildade',     icon: 'heart',   text: 'Escutar antes de opinar. Cada empresa tem um contexto que só ela conhece de verdade.' },
  { name: 'Integridade',   icon: 'shield',  text: 'Fazer o certo mesmo quando ninguém está olhando, inclusive quando dá mais trabalho.' },
  { name: 'Excelência',    icon: 'star',    text: 'Entregar acima do combinado é o padrão, não a exceção celebrada.' },
  { name: 'Metas',         icon: 'target',  text: 'Trabalho de gestão de pessoas que não move indicador é conversa bonita, não resultado.' },
  { name: 'Seriedade',     icon: 'check',   text: 'Prazo é compromisso. Método é método. Diagnóstico não se inventa.' },
  { name: 'Ética',         icon: 'scale',   text: 'Sigilo absoluto sobre o que vemos dentro de cada empresa. Sem exceção.' },
  { name: 'Humanização',   icon: 'users',   text: 'Por trás de cada indicador existe uma pessoa com uma história. Nunca esquecemos disso.' },
  { name: 'Resolutividade',icon: 'bolt',    text: 'Apontar o problema é fácil. Nós ficamos até a solução estar rodando.' },
];

/* --------------------------------------------------------------------------
   EQUIPE (pagina Quem Somos)
   As fotos vivem em media/time-<photo>.webp, geradas a partir de
   assets/fotoredonda_<photo>.webp por  python _tools/build-assets.py
   -------------------------------------------------------------------------- */
const TEAM = [
  {
    photo: 'rose',
    name: 'Rosemeire Moreira',
    tag: 'Cofundadora',
    role: 'CEO · Especialista em RH Estratégico',
    text: 'Conduz a consultoria estratégica e os cursos. Apresentadora do Solute Cast.',
    founder: true,
  },
  {
    photo: 'marcos',
    name: 'Marcos Dias',
    tag: 'Cofundador',
    role: 'COO · Diretor de Operações',
    text: 'Lidera marketing, comercial, tecnologia e operações. À frente da performance da empresa.',
    founder: true,
  },
  {
    photo: 'emillia',
    name: 'Emíllia',
    tag: 'Consultora',
    role: 'Psicóloga Organizacional · Especialista em RH Estratégico',
    text: 'Conduz projetos de consultoria com clientes Solute em todo o Brasil e lidera o time de suporte por trás de cada entrega.',
  },
  {
    photo: 'pamela',
    name: 'Pâmela',
    tag: 'Consultora',
    role: 'Administradora · Especialista em RH Estratégico',
    text: 'Conduz projetos de consultoria com clientes Solute em todo o Brasil e lidera o time de suporte por trás de cada entrega.',
  },
  {
    photo: 'vanessa',
    name: 'Vanessa',
    tag: 'Consultora',
    role: 'Psicóloga Organizacional · Especialista em RH Estratégico',
    text: 'Conduz projetos de consultoria com clientes Solute em todo o Brasil e lidera o time de suporte por trás de cada entrega.',
  },
  {
    photo: 'raniel',
    name: 'Raniel',
    tag: 'Customer Success',
    role: 'Sucesso do Cliente',
    text: 'Acompanha os clientes da Solute do início ao final do projeto.',
  },
  {
    photo: 'livia',
    name: 'Lívia',
    tag: 'Comercial B2B',
    role: 'Consultora Comercial',
    text: 'Conduz os relacionamentos comerciais dos serviços B2B da Solute Consultoria.',
  },
];

/* card final, de vagas */
const TEAM_CTA = {
  photo: 'vagas',
  tag: 'Vagas abertas',
  name: 'E você?',
  role: 'Junte-se à Solute',
  text: 'Estamos sempre atentos a talentos alinhados à nossa cultura.',
  cta: 'Enviar currículo',
};

/* --------------------------------------------------------------------------
   NAVEGACAO
   -------------------------------------------------------------------------- */
const NAV = [
  { label: 'Quem somos', href: 'quem-somos.html', page: 'quem-somos' },
  {
    label: 'Consultoria',
    href: 'consultoria.html',
    page: 'consultoria',
    mega: 'services',
  },
  { label: 'Cursos', href: 'cursos.html', page: 'cursos', mega: 'courses' },
  { label: 'Clientes', href: 'clientes.html', page: 'clientes' },
  { label: 'Blog', href: 'blog.html', page: 'blog' },
  { label: 'Solute Cast', href: 'solute-cast.html', page: 'solute-cast' },
  { label: 'Contato', href: 'contato.html', page: 'contato' },
];

/* --------------------------------------------------------------------------
   BLOG
   `source` e a origem dos posts. Pode ser:
     - um arquivo local  ->  'data/posts.json'
     - um endpoint do sistema Solute -> 'https://sistema.soluterh.com.br/api/posts'
   O formato esperado esta documentado em _docs/BLOG.md
   -------------------------------------------------------------------------- */
const BLOG = {
  source: 'https://sistema.soluterh.com.br/api/publico/blog',
  perPage: 6,
  fallbackCover: 'media/rhestrategico.webp',
  // autor padrao quando o post nao trouxer um
  author: 'Rosemeire Moreira',
  authorPhoto: 'media/time-rose.webp',
  authorRole: 'Solute RH',
};

/* --------------------------------------------------------------------------
   EVENTO - mude `enabled` para true quando quiser publicar
   -------------------------------------------------------------------------- */
const EVENT = {
  enabled: false,                 // <<< liga/desliga tudo do evento no site
  id: 'evento-2026',              // muda quando quiser reexibir a barra a quem fechou
  name: 'Encontro Solute RH 2026',
  tagline: 'O encontro anual de gestão de pessoas da Solute RH',
  date: 'Data a definir',
  dateISO: '',                    // ex.: '2026-10-15'
  time: 'A definir',
  city: 'Juiz de Fora, MG',
  venue: 'Local a definir',
  page: 'evento.html',
  ctaLabel: 'Quero ser avisado',
  announceText: 'Inscrições abertas para o Encontro Solute RH 2026',
};

module.exports = { SITE, SERVICES, COURSES, CLIENTS, TESTIMONIALS, VALUES, TEAM, TEAM_CTA, NAV, EVENT, BLOG };
