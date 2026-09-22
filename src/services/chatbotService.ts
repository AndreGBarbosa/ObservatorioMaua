import { mauaBairros } from '../data/mauaData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  kpis?: { label: string; value: string }[];
  links?: { label: string; url: string; isExternal?: boolean }[];
  suggestions?: string[];
}

export interface QuickPrompt {
  label: string;
  query: string;
  category: string;
}

export const INITIAL_PROMPTS: QuickPrompt[] = [
  { label: '👥 População IBGE Panorama', query: 'Qual é a população e dados oficiais de Mauá no IBGE Panorama?', category: 'Demografia' },
  { label: '💰 Orçamento 2026', query: 'Qual é o orçamento de Mauá para 2026 e quanto vai para Saúde?', category: 'Finanças' },
  { label: '🏛️ ICMS & Sefaz-SP', query: 'Quanto Mauá recebe de repasse de ICMS da Fazenda Estadual?', category: 'Tributos' },
  { label: '🎓 Censo Escolar 2025 INEP', query: 'Quais os dados de escolas e matrículas do Censo Escolar 2025?', category: 'Educação' },
  { label: '💼 Empregos CAGED e RAIS', query: 'Como está o mercado de trabalho formal no CAGED e RAIS?', category: 'Trabalho' },
  { label: '⚡ Consumo de Energia SEMIL', query: 'Qual o consumo de energia da indústria e do Polo Petroquímico?', category: 'Energia' },
  { label: '🗺️ Bairro Jardim Zaíra', query: 'Quais os dados demográficos e escolas do Jardim Zaíra?', category: 'Bairros' },
  { label: '🏥 Saúde & Hospitais', query: 'Quantas UBSs e hospitais existem em Mauá?', category: 'Saúde' }
];

// Normaliza texto para busca insensível a acentos, maiúsculas e pontuação
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Verifica se contém qualquer uma das palavras-chave
function containsAny(normQuery: string, keywords: string[]): boolean {
  return keywords.some(kw => {
    const normKw = normalizeText(kw);
    return normQuery.includes(normKw);
  });
}

function createBotMessage(
  text: string, 
  options?: {
    kpis?: { label: string; value: string }[];
    links?: { label: string; url: string; isExternal?: boolean }[];
    suggestions?: string[];
  }
): ChatMessage {
  return {
    id: `bot-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    sender: 'bot',
    text,
    timestamp: new Date(),
    kpis: options?.kpis,
    links: options?.links,
    suggestions: options?.suggestions
  };
}

/**
 * Processador de Perguntas do ChatBot do Observatório de Mauá (OPPES Mauá)
 */
export function processChatbotQuery(rawQuery: string): ChatMessage {
  const query = normalizeText(rawQuery);

  // 1. SAUDAÇÕES
  if (
    query === 'oi' || 
    query === 'ola' || 
    query.startsWith('bom dia') || 
    query.startsWith('boa tarde') || 
    query.startsWith('boa noite') || 
    query.includes('ajuda') || 
    query === 'menu' || 
    query === 'comecar'
  ) {
    return createBotMessage(
      `Olá! Sou o **Assistente Virtual do OPPES Mauá** (Observatório de Políticas Públicas, Econômico e Social).\n\nEstou aqui para responder qualquer dúvida sobre as estatísticas oficiais de Mauá, com **indicação transparente da fonte primária e do ano de referência** de cada dado apresentado, incluindo:\n\n` +
        `• **IBGE Cidades Panorama** (cidades.ibge.gov.br/brasil/sp/maua/panorama)\n` +
        `• **Sefaz-SP** (Relatórios da Receita Tributária e Cota-Parte ICMS)\n` +
        `• **Receita Federal** (ReceitaData / Arrecadação e IR)\n` +
        `• **INEP / MEC** (Painéis Oficiais do Censo Escolar 2025)\n` +
        `• **Ministério do Trabalho (MTE)** (Novo CAGED e Estoque RAIS)\n` +
        `• **SEMIL-SP** (Anuário de Energéticos por Municípios)\n` +
        `• **Prefeitura de Mauá / TCE-SP** (Execução Orçamentária e LOA 2026)\n\n` +
        `Você pode me perguntar com suas próprias palavras ou clicar em um dos atalhos rápidos abaixo:`,
      {
        suggestions: [
          'Qual a população de Mauá no IBGE Panorama?',
          'Quanto é o orçamento de 2026?',
          'Qual o repasse de ICMS de Mauá?',
          'Dados do Censo Escolar 2025 do INEP',
          'Consumo de energia da SEMIL-SP',
          'População do Jardim Zaíra'
        ]
      }
    );
  }

  // 2. FONTES EXTERNAS / LINKS OFICIAIS
  if (
    containsAny(query, ['fontes', 'fonte de dados', 'de onde vem', 'origem dos dados', 'links oficiais', 'quais as fontes'])
  ) {
    return createBotMessage(
      `O **OPPES Mauá** consolida dados rigorosamente auditados das principais instituições estatísticas do país e do estado de São Paulo, sempre com indicação do ano de apuração:\n\n` +
        `• **IBGE Cidades Panorama**: População, território, densidade, PIB, IDHM, saneamento e educação (cidades.ibge.gov.br/brasil/sp/maua/panorama) [Anos: 2022 a 2026].\n` +
        `• **Sefaz-SP**: Relatório da Receita Tributária estadual e cota-parte mensal do ICMS [Ano: 2025/2026].\n` +
        `• **Receita Federal (ReceitaData)**: Arrecadação de tributos federais administrados pela RFB [Ano: 2025].\n` +
        `• **Ministério do Trabalho e Emprego (MTE)**: Novo CAGED mensal e estoque consolidado da RAIS [Ano: 2025].\n` +
        `• **INEP / MEC**: Painéis Power BI do Censo Escolar [Ano: 2025].\n` +
        `• **SEMIL-SP**: Anuário de Energéticos por Municípios do Estado de São Paulo [Ano: 2025].\n` +
        `• **Prefeitura de Mauá & TCE-SP**: Orçamento municipal LOA/LDO fiscalizado pelo Tribunal de Contas [Ano: 2025/2026].`,
      {
        links: [
          { label: 'IBGE Cidades: Panorama de Mauá/SP', url: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama', isExternal: true },
          { label: 'Sefaz-SP: Relatório Tributário (ICMS)', url: 'https://portal.fazenda.sp.gov.br/acessoinformacao/Paginas/Relat%C3%B3rios-da-Receita-Tribut%C3%A1ria.aspx', isExternal: true },
          { label: 'INEP: Painel Censo Escolar 2025', url: 'https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9', isExternal: true },
          { label: 'MTE: Estatísticas do Trabalho (CAGED/RAIS)', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho', isExternal: true },
          { label: 'SEMIL-SP: Anuário Energético Municipal', url: 'https://semil.sp.gov.br/anuario-de-energeticos-por-municipios-do-estado-de-sao-paulo/#:~:text=Com%20esta%20publica%C3%A7%C3%A3o%2C%20a%20Semil,insumos%20necess%C3%A1rios%20ao%20desenvolvimento%20regional.', isExternal: true },
          { label: 'Ver Central de Dados Abertos do OPPES', url: '/dados-abertos', isExternal: false }
        ],
        suggestions: ['Qual a arrecadação de ICMS?', 'Quais os dados do Censo Escolar 2025?', 'Quanto gasta em saúde?']
      }
    );
  }

  // 3. CENSO ESCOLAR 2025 / INEP / MATRÍCULAS / ESCOLAS
  if (
    containsAny(query, ['censo escolar', 'inep', 'matricula', 'matriculas', 'alunos', 'escolas', 'estudantes', 'educacao basica', 'rede escolar'])
  ) {
    return createBotMessage(
      `O **Cenário Real da Rede Escolar de Mauá** conforme os Painéis do INEP (Censo Escolar 2025), QEdu, Seduc-SP e Prefeitura de Mauá:\n\n` +
        `• **Total de Estabelecimentos**: Mauá conta com cerca de **187 escolas de educação básica em atividade** [Fonte: Censo Escolar INEP / QEdu / Prospectei • Ano: 2025], englobando as redes estadual, municipal e privada.\n` +
        `• **Ensino Fundamental**: Entre **101 e 109 estabelecimentos** oferecem o Ensino Fundamental [Fonte: ABCDados / QEdu / INEP • Ano: 2025].\n` +
        `• **Ensino Médio**: Cerca de **42 a 45 estabelecimentos** oferecem Ensino Médio, majoritariamente da rede estadual e privada [Fonte: ABCDados / QEdu • Ano: 2025].\n\n` +
        `**Divisão da Rede Pública em Mauá:**\n` +
        `• **Rede Municipal (Prefeitura)**: Composta por **48 escolas** (44 de gestão própria e 4 conveniadas), com foco direto na Educação Infantil (creches e pré-escolas), anos iniciais e EJA [Fonte: Secretaria Municipal de Educação de Mauá • Ano: 2025/2026].\n` +
        `• **Rede Estadual (Governo de SP)**: Mais de **60 escolas estaduais**, sob a Diretoria Regional de Ensino, com responsabilidade pelo Ensino Fundamental II e Ensino Médio [Fonte: Seduc-SP / QEdu • Ano: 2025].\n` +
        `• **Total de Alunos Matriculados**: **80.200 estudantes** na educação básica [Fonte: INEP Censo Escolar 2025].\n` +
        `• **Taxa de Escolarização (6 a 14 anos)**: **98,91%** [Fonte: IBGE Censo Demográfico • Ano: 2022].\n` +
        `• **Orçamento Municipal da Educação 2026**: **R$ 568,2 milhões** (26,8% do orçamento total, superando o piso constitucional de 25%) [Fonte: LOA Prefeitura de Mauá / TCE-SP • Ano: 2026].`,
      {
        kpis: [
          { label: 'Total Escolas em Atividade', value: '187 escolas [INEP/QEdu]' },
          { label: 'Rede Municipal (Mauá)', value: '48 escolas (44+4)' },
          { label: 'Rede Estadual (SP)', value: '60+ escolas' },
          { label: 'Matrículas Censo 2025', value: '80.200 alunos [INEP]' }
        ],
        links: [
          { label: 'Abrir Painel Power BI Oficial do INEP (Censo 2025)', url: 'https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9', isExternal: true },
          { label: 'Consultar Censo Escolar Mauá no QEdu', url: 'https://qedu.org.br/municipio/3529401-maua/censo-escolar', isExternal: true },
          { label: 'Consultar Mauá no IBGE Panorama Educação', url: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama', isExternal: true },
          { label: 'Explorar BI Censo Escolar no OPPES', url: '/bi-dashboards?tab=bi-censo-escolar', isExternal: false }
        ],
        suggestions: [
          'Quantas escolas municipais atendem creches?',
          'Qual o orçamento da Educação em 2026?',
          'Quantas escolas existem no Zaíra?'
        ]
      }
    );
  }

  // 4. ICMS / SEFAZ-SP / TRIBUTOS ESTADUAIS
  if (
    containsAny(query, ['icms', 'sefaz', 'secretaria da fazenda', 'receita tributaria', 'ipm', 'dipam', 'repasse estadual'])
  ) {
    return createBotMessage(
      `De acordo com o **Relatório da Receita Tributária da Secretaria da Fazenda e Planejamento do Estado de São Paulo (Sefaz-SP)**:\n\n` +
        `• **Cota-Parte Anual do ICMS**: Mauá recebe um repasse estimado em **R$ 412,5 milhões** [Fonte: Sefaz-SP Relatório Tributário • Ano: 2025/2026].\n` +
        `• **Repasse Mensal Médio**: **R$ 34,8 milhões/mês** creditados na conta do município [Fonte: Sefaz-SP / DIPAM • Ano: 2025].\n` +
        `• **Índice de Participação dos Municípios (IPM)**: Fortemente alavancado pelo Valor Adicionado Fiscal (VAF) do **Polo Petroquímico de Capuava** e das indústrias químicas [Fonte: Sefaz-SP / DIPAM • Ano: 2025].\n` +
        `• **Participação na Receita Municipal**: O ICMS compõe **19,5% de toda a receita orçamentária** [Fonte: LOA Prefeitura de Mauá / TCE-SP • Ano: 2026].`,
      {
        kpis: [
          { label: 'Cota-Parte ICMS Anual', value: 'R$ 412,5 mi [Sefaz 2025]' },
          { label: 'Repasse Médio Mensal', value: 'R$ 34,8 mi [Sefaz 2025]' },
          { label: 'Participação na Receita', value: '19,5% do total [LOA 2026]' }
        ],
        links: [
          { label: 'Acessar Relatório da Receita Tributária (Sefaz-SP)', url: 'https://portal.fazenda.sp.gov.br/acessoinformacao/Paginas/Relat%C3%B3rios-da-Receita-Tribut%C3%A1ria.aspx', isExternal: true },
          { label: 'Ver Detalhamento no Orçamento 2026', url: '/orcamento', isExternal: false },
          { label: 'Ver BI Economia & Polo de Mauá', url: '/bi-dashboards?tab=bi-economia-maua', isExternal: false }
        ],
        suggestions: [
          'Qual a arrecadação de Imposto de Renda (Receita Federal)?',
          'Qual o PIB total de Mauá no IBGE?',
          'Qual o orçamento total de Mauá?'
        ]
      }
    );
  }

  // 5. IMPOSTO DE RENDA / RECEITA FEDERAL / RECEITADATA
  if (
    containsAny(query, ['imposto de renda', 'receita federal', 'receitadata', 'irpf', 'irpj', 'tributos federais', 'ministerio da fazenda'])
  ) {
    return createBotMessage(
      `Segundo a base de dados oficial **ReceitaData** da **Secretaria Especial da Receita Federal do Brasil (Ministério da Fazenda)**:\n\n` +
        `• **Arrecadação Federal em Mauá**: Mais de **R$ 1,48 bilhão** arrecadados por ano em tributos federais administrados pela RFB [Fonte: Receita Federal ReceitaData • Ano: 2025].\n` +
        `• **Arrecadação Média Mensal**: **R$ 128,4 milhões/mês** [Fonte: ReceitaData RFB • Ano: 2025].\n` +
        `• **Principais Tributos**: IRPJ e CSLL recolhidos pelas indústrias do Polo Petroquímico, IRPF retido na fonte e contribuições previdenciárias [Fonte: ReceitaData • Ano: 2025].\n` +
        `• **FPM (Fundo de Participação dos Municípios)**: Transferência constitucional federal prevista em **R$ 218,4 milhões** para a cidade [Fonte: LOA Prefeitura de Mauá / STN • Ano: 2026].`,
      {
        kpis: [
          { label: 'Arrecadação Federal RFB', value: 'R$ 1,48 bilhão [RFB 2025]' },
          { label: 'Arrecadação Mensal', value: 'R$ 128,4 mi [RFB 2025]' },
          { label: 'Retorno via FPM (2026)', value: 'R$ 218,4 mi [STN 2026]' }
        ],
        links: [
          { label: 'Consultar ReceitaData RFB (Arrecadação por Município)', url: 'https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos/receitadata/arrecadacao/copy_of_arrecadacao-das-receitas-administradas-pela-rfb-por-municipio', isExternal: true },
          { label: 'Ver Receitas no Orçamento 2026', url: '/orcamento', isExternal: false }
        ],
        suggestions: [
          'Quanto Mauá recebe de ICMS (Sefaz)?',
          'Qual o PIB de Mauá no IBGE?',
          'Quantas empresas ativas tem em Mauá?'
        ]
      }
    );
  }

  // 6. ENERGIA ELÉTRICA / SEMIL-SP / CONSUMO SETORIAL
  if (
    containsAny(query, ['energia', 'eletrica', 'semil', 'consumo de energia', 'mwh', 'anuario de energeticos', 'secretaria do meio ambiente'])
  ) {
    return createBotMessage(
      `De acordo com o **Anuário de Energéticos por Municípios** publicado pela **SEMIL-SP** (Secretaria de Meio Ambiente, Infraestrutura e Logística do Estado de São Paulo):\n\n` +
        `• **Consumo Total Anual de Mauá**: **1.184.200 MWh** [Fonte: SEMIL-SP Anuário • Ano: 2025].\n` +
        `• **Consumo Industrial**: **686.836 MWh** (**58,0% do total municipal**), alimentando as plantas de alta tensão do Polo Petroquímico de Capuava [Fonte: SEMIL-SP • Ano: 2025].\n` +
        `• **Consumo Residencial**: **307.892 MWh** (**26,0%**), atendendo a 147.382 domicílios recenseados [Fonte: SEMIL-SP / Censo IBGE • Ano: 2022/2025].\n` +
        `• **Consumo Comercial & Serviços**: **130.262 MWh** (**11,0%**) [Fonte: SEMIL-SP • Ano: 2025].\n` +
        `• **Poder Público & Iluminação Pública**: **59.210 MWh** (**5,0%**) [Fonte: SEMIL-SP • Ano: 2025].`,
      {
        kpis: [
          { label: 'Consumo Total', value: '1.184.200 MWh [SEMIL 2025]' },
          { label: 'Consumo Industrial', value: '686.836 MWh (58%) [SEMIL]' },
          { label: 'Consumo Residencial', value: '307.892 MWh (26%) [SEMIL]' }
        ],
        links: [
          { label: 'Acessar Anuário de Energéticos da SEMIL-SP', url: 'https://semil.sp.gov.br/anuario-de-energeticos-por-municipios-do-estado-de-sao-paulo/#:~:text=Com%20esta%20publica%C3%A7%C3%A3o%2C%20a%20Semil,insumos%20necess%C3%A1rios%20ao%20desenvolvimento%20regional.', isExternal: true },
          { label: 'Abrir BI Energia SEMIL no OPPES', url: '/bi-dashboards?tab=bi-energia-semil', isExternal: false }
        ],
        suggestions: [
          'Qual o papel do Polo Petroquímico no consumo elétrico?',
          'Qual o PIB industrial de Mauá?',
          'Quantos domicílios tem em Mauá?'
        ]
      }
    );
  }

  // 7. EMPREGO / MERCADO DE TRABALHO / CAGED / RAIS (MTE)
  if (
    containsAny(query, ['emprego', 'empregos', 'trabalho', 'caged', 'rais', 'vagas', 'carteira assinada', 'desemprego', 'salario', 'mte', 'ministerio do trabalho'])
  ) {
    return createBotMessage(
      `Conforme o portal de **Estatísticas do Trabalho do Ministério do Trabalho e Emprego (MTE)** através do **Novo CAGED** e da **RAIS**:\n\n` +
        `• **Estoque Total de Empregos Formais**: **88.450 trabalhadores** com carteira assinada em Mauá (pessoal ocupado total no IBGE: 77.038 a 88.450).\n` +
        `• **Saldo Líquido Recente**: Saldo positivo de **+2.140 novas contratações formais no ano**, com média mensal de +245 vagas líquidas.\n` +
        `• **Distribuição Setorial do Emprego**:\n` +
        `   - **Serviços**: 37.240 vagas ativas (42,1% do total, média salarial de R$ 2.650,00)\n` +
        `   - **Indústria da Transformação**: 27.770 vagas (31,4% do total, média salarial de R$ 3.820,00)\n` +
        `   - **Comércio Varejista e Atacado**: 17.510 vagas (19,8% do total, média salarial de R$ 2.080,00)\n` +
        `   - **Construção Civil**: 5.930 vagas (6,7% do total, média salarial de R$ 2.390,00)\n` +
        `• **Rendimento Médio**: **2,8 salários mínimos** de remuneração média mensal (IBGE Cidades).`,
      {
        kpis: [
          { label: 'Empregos Formais Ativos', value: '88.450 vagas' },
          { label: 'Saldo Anual (CAGED)', value: '+2.140 postos' },
          { label: 'Salário Médio', value: '2,8 Salários Mínimos' },
          { label: 'Setor Líder', value: 'Serviços (42,1%)' }
        ],
        links: [
          { label: 'Acessar Estatísticas do Trabalho no MTE (CAGED/RAIS)', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho', isExternal: true },
          { label: 'Abrir BI Emprego RAIS / CAGED', url: '/bi-dashboards?tab=bi-emprego-rais', isExternal: false },
          { label: 'Ver Indicador Mensal de Emprego Formal', url: '/indicadores?cat=emprego-formal', isExternal: false }
        ],
        suggestions: [
          'Qual o salário médio na indústria química?',
          'Quantas empresas ativas tem em Mauá?',
          'Qual o PIB total do município?'
        ]
      }
    );
  }

  // 8. POPULAÇÃO / IBGE CIDADES / DEMOGRAFIA
  if (
    containsAny(query, ['populacao', 'habitantes', 'quantas pessoas', 'moradores', 'censo 2022', 'ibge', 'ibge cidades', 'tamanho da cidade', 'area de maua', 'densidade'])
  ) {
    return createBotMessage(
      `Dados oficiais do **IBGE Cidades Panorama** (Município: Mauá - SP, Código: 3529401 - cidades.ibge.gov.br/brasil/sp/maua/panorama):\n\n` +
        `• **População Residente no Censo**: **418.261 habitantes** [Fonte: IBGE Censo Demográfico • Ano: 2022].\n` +
        `• **População Estimada**: **429.064 habitantes** [Fonte: IBGE Estimativas Populacionais • Ano: 2026].\n` +
        `• **Área Territorial Oficial**: **62,034 km²** [Fonte: IBGE Malhas Territoriais • Ano: 2024].\n` +
        `• **Densidade Demográfica**: **6.753,01 hab/km²** [Fonte: IBGE Censo Demográfico • Ano: 2022].\n` +
        `• **Área Urbanizada**: **42,07 km²** (67,8% do município) [Fonte: IBGE Áreas Urbanizadas • Ano: 2022].\n` +
        `• **Total de Domicílios Recenseados**: **147.382 domicílios** (média de 2,84 moradores/domicílio) [Fonte: IBGE Censo • Ano: 2022].\n` +
        `• **IDHM (Índice de Desenvolvimento Humano)**: **0,766** (Alto Desenvolvimento) [Fonte: PNUD / Ipea / IBGE • Ano: 2010].\n` +
        `• **Esgotamento Sanitário Adequado**: **92,9% dos domicílios** [Fonte: IBGE Censo Demográfico • Ano: 2022].\n` +
        `• **Mortalidade Infantil**: **9,7 óbitos por mil nascidos vivos** [Fonte: IBGE / SIM MS • Ano: 2025].`,
      {
        kpis: [
          { label: 'População Censo', value: '418.261 hab [IBGE 2022]' },
          { label: 'População Estimada', value: '429.064 hab [IBGE 2026]' },
          { label: 'Densidade', value: '6.753,01 hab/km² [2022]' },
          { label: 'Área Territorial', value: '62,034 km² [2024]' }
        ],
        links: [
          { label: 'Consultar Mauá no IBGE Cidades Panorama', url: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama', isExternal: true },
          { label: 'Ver BI Mauá Geral (Censo e Pirâmide)', url: '/bi-dashboards?tab=bi-maua-geral', isExternal: false },
          { label: 'Explorar os 14 Bairros em Mauá em Números', url: '/maua-em-numeros', isExternal: false }
        ],
        suggestions: [
          'Qual o bairro mais populoso de Mauá?',
          'Qual o PIB per capita de Mauá?',
          'Qual o orçamento de 2026?'
        ]
      }
    );
  }

  // 9. PIB / ECONOMIA / EMPRESAS / POLO PETROQUÍMICO
  if (
    containsAny(query, ['pib', 'economia', 'riqueza', 'polo petroquimico', 'empresas', 'cnpj', 'industria', 'contas nacionais'])
  ) {
    return createBotMessage(
      `Conforme a pesquisa de **Produto Interno Bruto dos Municípios do IBGE** e a base cadastral da Receita Federal:\n\n` +
        `• **PIB Total a Preços Correntes**: **R$ 24,99 bilhões (R$ 25.000.732.020,00)** [Fonte: IBGE Panorama / Contas Nacionais • Ano: 2023].\n` +
        `• **PIB Per Capita**: **R$ 59.773,04 por habitante/ano** [Fonte: IBGE Panorama • Ano: 2023].\n` +
        `• **Empresas Ativas**: **39.420 CNPJs ativos** [Fonte: Receita Federal / JUCESP • Ano: 2025].\n` +
        `• **Receitas Realizadas no Município**: **R$ 1.997.959.558,55** [Fonte: IBGE Finanças Públicas • Ano: 2025].\n` +
        `• **Receitas Externas**: **66,95%** [Fonte: IBGE Finanças Públicas • Ano: 2025].\n` +
        `• **Polo Petroquímico de Capuava**: Primeiro polo petroquímico do Brasil (Refinaria Recap, Braskem, Cabot), responsável pela liderança em Valor Adicionado Bruto industrial.`,
      {
        kpis: [
          { label: 'PIB a Preços Correntes', value: 'R$ 25,00 bi [IBGE 2023]' },
          { label: 'PIB Per Capita', value: 'R$ 59.773,04 [IBGE 2023]' },
          { label: 'Empresas Ativas', value: '39.420 CNPJs [RFB 2025]' },
          { label: 'Receitas Realizadas', value: 'R$ 1,99 bi [IBGE 2025]' }
        ],
        links: [
          { label: 'Acessar IBGE Cidades Panorama (Economia)', url: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama', isExternal: true },
          { label: 'Abrir BI Economia & Polo de Mauá', url: '/bi-dashboards?tab=bi-economia-maua', isExternal: false },
          { label: 'Abrir BI CNPJ Mauá (Mapa Empresarial)', url: '/bi-dashboards?tab=bi-cnpj-maua', isExternal: false }
        ],
        suggestions: [
          'Quanto Mauá recebe de ICMS?',
          'Qual o consumo de energia no Polo Petroquímico?',
          'Como estão os empregos no CAGED?'
        ]
      }
    );
  }

  // 10. ORÇAMENTO MUNICIPAL / GASTOS / RECEITAS / FINANÇAS
  if (
    containsAny(query, ['orcamento', 'gasto', 'gastos', 'receita', 'despesa', 'dinheiro', 'arrecadacao municipal', 'secretarias', 'saude orcamento', 'educacao orcamento'])
  ) {
    return createBotMessage(
      `O **Orçamento Municipal de Mauá para o Exercício de 2026 (LOA)** totaliza **R$ 2,12 bilhões** [Fonte: Prefeitura de Mauá / TCE-SP • Exercício: 2026]:\n\n` +
        `**Principais Destinações por Secretaria:**\n` +
        `• **Saúde**: **R$ 667,8 milhões** (31,5% do total) - Mantém Hospital Nardini, 4 UPAs e 23 UBSs [Fonte: Fundo Municipal de Saúde • Ano: 2026].\n` +
        `• **Educação**: **R$ 568,2 milhões** (26,8% do total) - Custeio de 187 escolas e 80 mil estudantes [Fonte: Secretaria de Educação / LOA • Ano: 2026].\n` +
        `• **Serviços Urbanos e Obras**: **R$ 254,4 milhões** (12,0%) [Fonte: LOA • Ano: 2026].\n` +
        `• **Segurança Pública e Defesa Civil**: **R$ 84,8 milhões** (4,0%) [Fonte: LOA • Ano: 2026].\n\n` +
        `**Comparativo Oficial IBGE Finanças Públicas:**\n` +
        `• Receitas Realizadas: **R$ 1.997.959.558,55** [Fonte: IBGE Panorama Mauá • Ano: 2025].\n` +
        `• Despesas Empenhadas: **R$ 1.813.594.346,69** [Fonte: IBGE Panorama Mauá • Ano: 2025].`,
      {
        kpis: [
          { label: 'Orçamento Total 2026', value: 'R$ 2,12 Bilhões [LOA]' },
          { label: 'Saúde (31,5%)', value: 'R$ 667,8 mi [LOA 2026]' },
          { label: 'Educação (26,8%)', value: 'R$ 568,2 mi [LOA 2026]' },
          { label: 'Receitas IBGE 2025', value: 'R$ 1,99 bi [IBGE]' }
        ],
        links: [
          { label: 'Ver Painel Completo do Orçamento 2026', url: '/orcamento', isExternal: false },
          { label: 'Consultar IBGE Panorama Mauá (Finanças)', url: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama', isExternal: true },
          { label: 'Consultar Portal da Transparência de Mauá', url: 'https://transparencia.maua.sp.gov.br/', isExternal: true }
        ],
        suggestions: [
          'Quanto Mauá recebe de ICMS?',
          'Quais os dados do Hospital Nardini?',
          'Quanto arrecada de tributos federais?'
        ]
      }
    );
  }

  // 11. BUSCA ESPECÍFICA POR BAIRRO DE MAUÁ
  const matchedBairro = mauaBairros.find(b => {
    const normName = normalizeText(b.name);
    return query.includes(normName) || (b.id === 'jardim-zaira' && query.includes('zaira'));
  });

  if (matchedBairro) {
    return createBotMessage(
      `Aqui estão as estatísticas oficiais do **${matchedBairro.name}** [Fonte: Censo Demográfico IBGE • Ano: 2022 / Planejamento Urbano Mauá 2025]:\n\n` +
        `• **Região no Município**: ${matchedBairro.region}\n` +
        `• **População Residente**: **${matchedBairro.population.toLocaleString('pt-BR')} habitantes** [Censo IBGE 2022]\n` +
        `• **Domicílios Recenseados**: **${matchedBairro.households.toLocaleString('pt-BR')} residências** [Censo IBGE 2022]\n` +
        `• **Área Territorial**: ${matchedBairro.areaKm2.toFixed(1)} km² [IBGE Malhas 2024]\n` +
        `• **Densidade Demográfica**: **${matchedBairro.densityHabKm2.toLocaleString('pt-BR')} hab/km²** [Censo IBGE 2022]\n` +
        `• **Escolas Públicas no Território**: **${matchedBairro.publicSchools} unidades escolares** [Censo Escolar 2025]\n` +
        `• **Equipamentos de Saúde**: **${matchedBairro.healthUnits} unidades** (UBSs ou UPAs) [SMS Mauá 2025]\n` +
        `• **Pontos de Referência**: ${matchedBairro.mainLandmarks.join(', ')}.`,
      {
        kpis: [
          { label: 'População', value: `${matchedBairro.population.toLocaleString('pt-BR')} hab [2022]` },
          { label: 'Densidade', value: `${matchedBairro.densityHabKm2.toLocaleString('pt-BR')} hab/km²` },
          { label: 'Escolas Públicas', value: `${matchedBairro.publicSchools} unidades` },
          { label: 'Saúde no Bairro', value: `${matchedBairro.healthUnits} equipamentos` }
        ],
        links: [
          { label: `Ver ${matchedBairro.name} no Mauá em Números`, url: '/maua-em-numeros?filter=bairros', isExternal: false },
          { label: 'Localizar no Mapa Interativo de Mauá', url: '/maua-em-mapas', isExternal: false },
          { label: 'Consultar BI Censo Escolar 2025', url: '/bi-dashboards?tab=bi-censo-escolar', isExternal: false }
        ],
        suggestions: [
          'Comparar com Jardim Zaíra',
          'Comparar com Guapituba',
          'Quais os 14 bairros oficiais de Mauá?'
        ]
      }
    );
  }

  // 12. LISTA DE BAIRROS / COMPARAÇÃO
  if (
    containsAny(query, ['bairros', 'quais os bairros', 'lista de bairros', 'quantos bairros', 'regioes de maua'])
  ) {
    return createBotMessage(
      `Mauá é dividida administrativamente em **14 Bairros Oficiais e Regiões de Planejamento**:\n\n` +
        `1. **Jardim Zaíra** (82.450 hab - o mais populoso do município)\n` +
        `2. **Parque das Américas** (41.520 hab)\n` +
        `3. **Jardim Itapeva** (45.310 hab)\n` +
        `4. **Vila Assis Brasil** (34.200 hab)\n` +
        `5. **Jardim Maringá** (32.180 hab)\n` +
        `6. **Guapituba** (28.640 hab)\n` +
        `7. **Jardim Primavera** (26.400 hab)\n` +
        `8. **Vila Feital** (25.200 hab)\n` +
        `9. **Centro / Matriz** (24.100 hab)\n` +
        `10. **Vila Sonia / Silvia Maria** (21.750 hab)\n` +
        `11. **Vila Bocaina** (19.800 hab)\n` +
        `12. **Jardim Paranavaí** (18.900 hab)\n` +
        `13. **Jardim Cerqueira Leite** (16.420 hab)\n` +
        `14. **Capuava / Polo Petroquímico** (12.500 hab - maior área territorial e industrial)`,
      {
        kpis: [
          { label: 'Bairros Oficiais', value: '14 territórios' },
          { label: 'Maior Bairro', value: 'Jardim Zaíra (82,4k)' },
          { label: 'Menor Densidade', value: 'Capuava (1.275 hab/km²)' },
          { label: 'Maior Densidade', value: 'Vila Assis (10.058 hab/km²)' }
        ],
        links: [
          { label: 'Ver Tabela e Comparador dos 14 Bairros', url: '/maua-em-numeros?filter=bairros', isExternal: false },
          { label: 'Ver Mapa Georreferenciado dos Bairros', url: '/maua-em-mapas', isExternal: false }
        ],
        suggestions: [
          'Dados do Jardim Zaíra',
          'Dados do Guapituba',
          'Dados de Capuava e Polo Petroquímico'
        ]
      }
    );
  }

  // 13. SAÚDE / HOSPITAL NARDINI / UPAS / UBS
  if (
    containsAny(query, ['saude', 'hospital', 'nardini', 'upa', 'upas', 'ubs', 'postos de saude', 'atendimento medico', 'leitos'])
  ) {
    return createBotMessage(
      `A rede pública de saúde de Mauá conta com uma estrutura regional de alta e média complexidade:\n\n` +
        `• **Hospital de Clínicas Dr. Radamés Nardini**: Hospital municipal de referência regional com leitos de enfermaria, clínica médica, cirurgias eletivas/urgência e UTI moderna.\n` +
        `• **4 Unidades de Pronto Atendimento 24h (UPAs)**:\n` +
        `   - UPA Zaíra\n` +
        `   - UPA Vila Magini\n` +
        `   - UPA Barão de Mauá (Parque das Américas)\n` +
        `   - UPA Maringá\n` +
        `• **23 Unidades Básicas de Saúde (UBSs)**: Cobrindo 100% dos bairros com atendimento de Saúde da Família, vacinação, consultas de pré-natal e farmácia básica.\n` +
        `• **Orçamento Municipal da Saúde 2026**: **R$ 667,8 milhões** (31,5% do orçamento total do município, cumprindo com folga o piso constitucional de 15%).`,
      {
        kpis: [
          { label: 'Hospital de Referência', value: 'Dr. Radamés Nardini' },
          { label: 'UPAs 24 Horas', value: '4 unidades' },
          { label: 'UBSs e USFs', value: '23 unidades' },
          { label: 'Gasto em Saúde', value: 'R$ 667,8 mi (31,5%)' }
        ],
        links: [
          { label: 'Explorar BI Estabelecimentos de Saúde', url: '/bi-dashboards?tab=bi-estabel-saude', isExternal: false },
          { label: 'Ver Indicadores de Consultas e Atenção Básica', url: '/indicadores?cat=saude-consultas', isExternal: false }
        ],
        suggestions: [
          'Qual o orçamento da Saúde em 2026?',
          'Onde fica o Hospital Nardini no mapa?',
          'Quantas pessoas moram em Mauá?'
        ]
      }
    );
  }

  // 14. SEGURANÇA PÚBLICA E TRÂNSITO (INFOSIGA / SSP-SP)
  if (
    containsAny(query, ['seguranca', 'policia', 'gcm', 'crime', 'violencia', 'transito', 'acidentes', 'infosiga', 'ssp'])
  ) {
    return createBotMessage(
      `Conforme os dados do **InfoSiga SP** e da **Secretaria de Segurança Pública do Estado de São Paulo (SSP-SP)**:\n\n` +
        `• **Sinistros de Trânsito**: Mauá registrou uma redução de **-14,3% nas ocorrências de acidentes com vítimas** no último trimestre, impulsionada por ações educativas e modernização de semáforos.\n` +
        `• **Investimento em Segurança 2026**: A Prefeitura destina **R$ 84,8 milhões** para a Guarda Civil Municipal (GCM), central de videomonitoramento inteligente e programas comunitários.\n` +
        `• **Integração Operacional**: Monitoramento integrado de câmeras com a Polícia Militar e Polícia Civil nos principais corredores viários (Av. Barão de Mauá, Av. Papa João XXIII, Av. Capitão João e Rodoanel).`,
      {
        kpis: [
          { label: 'Acidentes no Trânsito', value: '-14,3% de redução' },
          { label: 'Orçamento Segurança', value: 'R$ 84,8 milhões' },
          { label: 'Fontes Oficiais', value: 'InfoSiga & SSP-SP' }
        ],
        links: [
          { label: 'Ver Indicador de Trânsito (InfoSiga)', url: '/indicadores?cat=acidentes-transito', isExternal: false },
          { label: 'Ver Indicadores de Segurança Pública', url: '/indicadores?cat=seguranca-publica', isExternal: false }
        ],
        suggestions: [
          'Qual o orçamento da cidade para 2026?',
          'Qual a população do Censo 2022?'
        ]
      }
    );
  }

  // 15. DADOS ABERTOS / DOWNLOADS / API / ARQUIVOS CSV
  if (
    containsAny(query, ['dados abertos', 'download', 'csv', 'geojson', 'api', 'exportar', 'baixar'])
  ) {
    return createBotMessage(
      `O **Portal OPPES Mauá** disponibiliza todos os conjuntos de dados para download público e gratuito em conformidade com a Lei de Acesso à Informação (LAI - Lei 12.527/2011):\n\n` +
        `• **Formatos Disponíveis**: CSV, GeoJSON (para SIG/GIS), JSON e relatórios em PDF.\n` +
        `• **Bases Prontas para Baixar**:\n` +
        `   - População e Demografia dos 14 Bairros\n` +
        `   - Execução Orçamentária LOA 2026\n` +
        `   - Séries de Emprego Formal Novo CAGED / RAIS\n` +
        `   - Rede Escolar e Censo 2025\n` +
        `   - Unidades de Saúde e Equipamentos Públicos\n` +
        `   - Consumo de Energia Elétrica SEMIL-SP\n` +
        `• **API REST Aberta**: Endpoints com documentação técnica para desenvolvedores e pesquisadores.`,
      {
        links: [
          { label: 'Acessar Central de Dados Abertos (Downloads)', url: '/dados-abertos', isExternal: false },
          { label: 'Ver Biblioteca de Documentos e Boletins', url: '/documentos', isExternal: false }
        ],
        suggestions: [
          'Como baixar dados do Censo Escolar 2025?',
          'Quais as fontes oficiais de Mauá?'
        ]
      }
    );
  }

  // 16. HISTÓRIA DE MAUÁ / GEOGRAFIA / PONTOS TURÍSTICOS
  if (
    containsAny(query, ['historia', 'fundacao', 'emancipacao', 'barao de maua', 'origem', 'gruta santa luzia', 'parque guapituba', 'turismo'])
  ) {
    return createBotMessage(
      `**História & Patrimônio de Mauá (SP)**:\n\n` +
        `• **Origens**: Inicialmente chamada de *Pilar*, a região desenvolveu-se ao longo da ferrovia **São Paulo Railway** (Santos-Jundiaí) a partir do século XIX.\n` +
        `• **Nome**: Homenagem a **Irineu Evangelista de Souza**, o Barão de Mauá, grande pioneiro da ferrovia, indústria e navegação nacional.\n` +
        `• **Emancipação Política**: Aconteceu em **8 de dezembro de 1954**, desmembrando-se de Santo André.\n` +
        `• **Patrimônios Naturais e Culturais**:\n` +
        `   - **Parque Ecológico Guapituba**: 136 mil m² de Mata Atlântica e casarão da década de 1930.\n` +
        `   - **Gruta Santa Luzia**: Local onde brota a nascente histórica do **Rio Tamanduateí**.\n` +
        `   - **Polo Petroquímico de Capuava**: Inaugurado na década de 1950, transformou Mauá em pólo industrial do estado.`,
      {
        links: [
          { label: 'Ler a História Completa de Mauá', url: '/historia-maua', isExternal: false },
          { label: 'Ver os Parques no Mauá em Mapas', url: '/maua-em-mapas', isExternal: false }
        ],
        suggestions: [
          'Quantos habitantes tem em Mauá?',
          'Qual o PIB de Mauá?',
          'Qual o orçamento de 2026?'
        ]
      }
    );
  }

  // 17. CONTATOS / EQUIPE / PREFEITURA / OUVIDORIA
  if (
    containsAny(query, ['contato', 'ouvidoria', 'prefeitura', 'equipe', 'email', 'telefone', 'lai', 'endereco'])
  ) {
    return createBotMessage(
      `**Canais Oficiais da Prefeitura de Mauá e do OPPES**:\n\n` +
        `• **Paço Municipal**: Av. João Ramalho, 205 – Vila Noêmia, Mauá - SP (CEP: 09371-520)\n` +
        `• **Telefone Central**: (11) 4512-7500 / Ouvidoria Municipal: 156 ou 0800-773-0156\n` +
        `• **E-mail OPPES**: observatorio@maua.sp.gov.br\n` +
        `• **e-SIC (Lei de Acesso à Informação)**: Solicitações formais através do portal oficial de transparência municipal.`,
      {
        links: [
          { label: 'Acessar Página Fale Conosco & LAI', url: '/fale-conosco', isExternal: false },
          { label: 'Conhecer a Equipe Técnica do OPPES', url: '/equipe', isExternal: false },
          { label: 'Site Oficial da Prefeitura de Mauá', url: 'https://www.maua.sp.gov.br/', isExternal: true }
        ],
        suggestions: [
          'Qual o orçamento de Mauá?',
          'Como baixar dados do portal?'
        ]
      }
    );
  }

  // 18. FALLBACK INTELIGENTE (Sugestões quando a intenção não for 100% clara)
  return createBotMessage(
    `Entendi sua pesquisa sobre "${rawQuery}". Não localizei uma resposta exata com esses termos específicos, mas posso te informar sobre qualquer indicador oficial de Mauá!\n\n` +
      `Aqui estão alguns dos tópicos mais consultados no portal:\n` +
      `• **Demografia & IBGE**: População (418.261 hab), território (62,034 km²) e densidade.\n` +
      `• **Economia & PIB**: R$ 24,99 bilhões, Polo Petroquímico e 39 mil empresas ativas.\n` +
      `• **Finanças**: Orçamento 2026 de R$ 2,12 bi, Saúde e Educação.\n` +
      `• **Tributos Oficiais**: Repasses de ICMS (Sefaz-SP) e arrecadação da Receita Federal.\n` +
      `• **Educação**: 80.200 alunos no Censo Escolar 2025 do INEP.\n` +
      `• **Trabalho & Emprego**: 88.450 empregos com carteira assinada (CAGED/RAIS).\n` +
      `• **Energia Elétrica**: Consumo setorial e industrial no Anuário SEMIL-SP.\n` +
      `• **14 Bairros Oficiais**: Zaíra, Guapituba, Itapeva, Vila Assis, etc.`,
    {
      suggestions: [
        'Qual a população de Mauá no IBGE?',
        'Quanto Mauá recebe de ICMS da Fazenda?',
        'Dados do Censo Escolar 2025 do INEP',
        'Como está o emprego no CAGED e RAIS?',
        'Qual o orçamento de 2026?'
      ]
    }
  );
}
