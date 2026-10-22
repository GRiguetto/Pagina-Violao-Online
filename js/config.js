/* =====================================================================
   EDITE AQUI. Tudo o que aparece no site vem deste arquivo.
   Textos entre [colchetes] ou com "seu-" são lembretes: troque antes de publicar.
   Rodando no seu computador, um aviso mostra quantos campos ainda faltam.
   Obs.: a fonte do nome (Six Caps) só tem letras sem acento; evite acentos em "nome".
   ===================================================================== */
window.PORTFOLIO = {
  nome: "Gabriel",
  titulo: "Desenvolvedor web com foco em front-end, sistemas de gestão e acessibilidade.",
  descricao: "Portfólio de Gabriel, desenvolvedor web de São José do Rio Preto, SP.",

  sobre: [
    "Trabalho na Secretaria Municipal de Saúde de São José do Rio Preto, onde crio e mantenho sistemas web que organizam escalas, plantões e pedidos de transferência de profissionais de várias unidades de saúde.",
    "Antes de escrever código, penso em quem vai usar a tela: um gerente aprovando plantões, um servidor pedindo transferência, alguém que navega só com o teclado. Por isso desenho perfis de acesso claros, formulários que explicam o erro e interfaces que funcionam sem mouse.",
    "Fora do trabalho, toco violão, jogo RPG de mesa (D&D 5e) e construo jogos no navegador. As cordas lá em cima, o afinador acessível e o jogo de cartas nasceram disso."
  ],
  agora: [
    "Construindo o front-end do ERP de uma empresa de ar-condicionado da cidade, projeto da faculdade",
    "Estudando Java, Spring Boot e estruturas de dados",
    "Evoluindo os sistemas de plantões e transferências da secretaria"
  ],

  /* ano, nome, tipo, resumo, destaques (lista), stack (lista), repo e demo (opcionais: deixe "" para esconder) */
  projetos: [
    { ano: "2026", nome: "Transferência Noturna", tipo: "Trabalho, saúde pública",
      resumo: "Servidores pedem transferência de turno entre unidades de saúde e a fila segue o mérito.",
      destaques: ["Três perfis: funcionário, gerente e administrador", "Pontuação por tempo de serviço e formação, com bloqueio de pedidos duplicados", "Gerente aprova ou nega com justificativa e consulta histórico paginado", "Migração de um protótipo em localStorage para PHP e MySQL"],
      stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"], repo: "", demo: "" },
    { ano: "2026", nome: "Movimentação de Servidores", tipo: "Trabalho, saúde pública",
      resumo: "Pedidos de transferência entre quatro unidades, com a camada de dados isolada para trocar o back-end sem mexer na interface.",
      destaques: ["Autenticação com JWT e correção do cabeçalho Authorization no Apache", "Camada de dados isolada em db.js", "Importação de mais de 2.800 registros com senhas em bcrypt", "Máscaras, validações e cadastro mais claro"],
      stack: ["JavaScript", "PHP", "MySQL", "JWT"], repo: "", demo: "" },
    { ano: "2026", nome: "Controle de Plantões", tipo: "Trabalho, saúde pública",
      resumo: "Registro e aprovação de plantões de 6, 12 e 24 horas, com painéis por perfil e relatórios exportáveis.",
      destaques: ["Gerente restrito à própria unidade", "Painéis com indicadores e histórico mensal", "Exportação em XLSX, CSV e PDF com nome de arquivo dinâmico", "Tour guiado por perfil e meta de acessibilidade WCAG 2.1 AA"],
      stack: ["PHP", "MySQL", "JavaScript"], repo: "", demo: "" },
    { ano: "2026", nome: "AR Ecológico", tipo: "Faculdade",
      resumo: "Front-end de um ERP para uma empresa de ar-condicionado da cidade: clientes, contratos, ordens de serviço e financeiro.",
      destaques: ["CRUD completo e dashboards para cliente, funcionário, contrato e serviço", "Financeiro com contas a pagar, fluxo de caixa e DRE em modais", "Configurações de visual, exibição e acessibilidade", "Código em português, pronto para integrar com Spring Boot e SQL Server"],
      stack: ["Bootstrap 4", "Thymeleaf", "JavaScript", "Spring Boot"], repo: "", demo: "" },
    { ano: "2026", nome: "Afinador de Violão Acessível", tipo: "Pessoal",
      resumo: "Afinador para quem tem baixa visão ou não enxerga: o resultado é falado e tocado, não só mostrado.",
      destaques: ["Detecção de altura (algoritmo YIN) em Java puro, sem bibliotecas", "Captura de áudio no navegador com AudioWorklet", "Regiões ARIA, síntese de voz e modos de alto contraste", "Spring Boot com JPA e H2"],
      stack: ["Java", "Spring Boot", "Web Audio", "ARIA"], repo: "", demo: "" },
    { ano: "2026", nome: "Jogo de Cartas Tático", tipo: "Pessoal",
      resumo: "Jogo por turnos no navegador, com mecânicas inspiradas em D&D 5e e visual de fantasia sombria.",
      destaques: ["Pontos de vida, dano por atributo e inimigos com IA", "Visualizador de cartas com 12 classes e temas completos"],
      stack: ["HTML", "CSS", "JavaScript"], repo: "", demo: "" },
    { ano: "2026", nome: "Automação de Dados de Gestão", tipo: "Trabalho, saúde pública",
      resumo: "Rotinas em Python que extraem, cruzam e auditam dados de ponto, escalas e cadastros profissionais.",
      destaques: ["Selenium para baixar relatórios de dezenas de unidades", "Extração de tabelas de PDF para Excel", "Relatórios em Excel e Word com alertas coloridos para inconsistências"],
      stack: ["Python", "Selenium", "Excel", "Apps Script"], repo: "", demo: "" }
  ],

  /* nivel de cada item: "d" = uso no dia a dia, "u" = já usei em projetos, "e" = estudando */
  stack: [
    { grupo: "Front-end", itens: [["HTML5", "d"], ["CSS3", "d"], ["JavaScript", "d"], ["Bootstrap", "u"], ["Thymeleaf", "u"], ["Web Audio e Canvas", "u"], ["html2pdf.js", "u"]] },
    { grupo: "Back-end", itens: [["PHP", "d"], ["Java", "u"], ["Spring Boot", "u"], ["Autenticação JWT", "u"], ["APIs REST", "u"]] },
    { grupo: "Banco de dados", itens: [["MySQL", "d"], ["SQL Server", "u"], ["SQLite", "u"], ["H2", "u"]] },
    { grupo: "Dados e automação", itens: [["Python", "d"], ["Selenium", "u"], ["Excel e Google Sheets", "d"], ["Apps Script", "u"]] },
    { grupo: "Ferramentas", itens: [["Maven", "u"], ["Postman", "u"], ["phpMyAdmin", "d"], ["Estruturas de dados", "e"]] },
    { grupo: "Acessibilidade e qualidade", itens: [["WCAG 2.1", "u"], ["ARIA", "u"], ["Leitores de tela", "e"], ["Código limpo", "e"]] }
  ],

  percurso: [
    { periodo: "Atualmente", cargo: "[Seu cargo]", local: "Secretaria Municipal de Saúde, São José do Rio Preto",
      texto: "Sistemas web para gestão de pessoal das unidades de saúde: transferências, plantões e escalas. Automação de relatórios e auditoria de dados." },
    { periodo: "[Ano] até hoje", cargo: "[Seu curso]", local: "[Sua instituição]",
      texto: "Java e orientação a objetos, estruturas de dados (buscas e ordenação), bancos de dados com SQL Server e Estatística. Projeto integrador: o front-end do ERP da AR Ecológico." }
  ],

  contato: {
    texto: "Tem um sistema para construir ou uma interface para melhorar? Me escreva.",
    email: "seu@email.com",
    links: [
      { rotulo: "GitHub", url: "https://github.com/seu-usuario" },
      { rotulo: "LinkedIn", url: "https://www.linkedin.com/in/seu-usuario" }
    ]
  },

  /* Afinação do violão que as cordas tocam. Troque as frequências (Hz) para outra afinação. */
  afinacao: [
    { n: "E", nome: "Mi grave", hz: 82.41 }, { n: "A", nome: "Lá", hz: 110 },
    { n: "D", nome: "Ré", hz: 146.83 }, { n: "G", nome: "Sol", hz: 196 },
    { n: "B", nome: "Si", hz: 246.94 }, { n: "E", nome: "Mi agudo", hz: 329.63 }
  ]
};
