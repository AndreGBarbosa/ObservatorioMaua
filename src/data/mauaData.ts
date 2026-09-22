// ==========================================================================
// DADOS CONSOLIDADOS DO OBSERVATÓRIO DE MAUÁ (OPPES MAUÁ)
// Fontes Oficiais: Censo IBGE 2022, Fundação SEADE, RAIS/CAGED, TCE-SP, 
// InfoSiga SP, Secretaria de Segurança Pública SP e Prefeitura de Mauá.
// ==========================================================================

export interface CityOverview {
  population: number;
  areaKm2: number;
  densityKm2: number;
  gdpBillion: number;
  gdpPerCapita: number;
  idhm: number;
  households: number;
  activeCompanies: number;
  formalJobs: number;
  lastCensusYear: number;
}

export const mauaOverview: CityOverview = {
  population: 418261,
  areaKm2: 62.034, // IBGE Cidades: 62,034 km² [2025]
  densityKm2: 6753.01, // IBGE Cidades: 6.753,01 hab/km² [2022]
  gdpBillion: 24.99, // IBGE Cidades: PIB a preços correntes (~25 bi)
  gdpPerCapita: 59773.04, // IBGE Cidades: R$ 59.773,04 [2023]
  idhm: 0.766, // IBGE Cidades: 0,766 [2010]
  households: 147382,
  activeCompanies: 39420,
  formalJobs: 77038, // IBGE Cidades: Pessoal ocupado 77.038 pessoas [2022]
  lastCensusYear: 2022
};

// ==========================================================================
// 1. BI OPPES - DASHBOARDS
// ==========================================================================

export interface BiOfficialLink {
  label: string;
  url: string;
}

export interface BiDashboard {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  source: string;
  sourceUrl?: string;
  officialLinks?: BiOfficialLink[];
  lastUpdate: string;
  kpis: { label: string; value: string; change?: string; isPositive?: boolean }[];
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string | string[];
    }[];
  };
  secondaryChartData?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string[];
    }[];
  };
  tableData?: { [key: string]: string | number }[];
}

export const biDashboardsList: BiDashboard[] = [
  {
    id: 'bi-maua-geral',
    title: 'BI Mauá Geral - Síntese Demográfica e CadÚnico',
    shortTitle: 'BI Geral',
    category: 'Demografia',
    description: 'Resumo estrutural da população de Mauá conforme o Censo Demográfico do IBGE 2022, pirâmide etária, composição de gênero, domicílios e famílias cadastradas no CadÚnico.',
    source: 'IBGE Censo 2022 / CadÚnico MDS',
    sourceUrl: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama',
    officialLinks: [
      { label: 'IBGE Cidades: Panorama de Mauá (SP)', url: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama' },
      { label: 'Portal Censo 2022 (IBGE)', url: 'https://censo2022.ibge.gov.br/' }
    ],
    lastUpdate: 'Fevereiro de 2026',
    kpis: [
      { label: 'População Residente', value: '418.261 hab', change: '+0.8% Censo', isPositive: true },
      { label: 'Domicílios Recenseados', value: '147.382', change: '+12.4%', isPositive: true },
      { label: 'Média Moradores / Domicílio', value: '2,84', change: '-5.2%', isPositive: false },
      { label: 'Famílias no CadÚnico', value: '54.230', change: 'Acompanhadas', isPositive: true }
    ],
    chartData: {
      labels: ['0 a 14 anos', '15 a 29 anos', '30 a 49 anos', '50 a 64 anos', '65 anos ou mais'],
      datasets: [
        {
          label: 'Mulheres (hab)',
          data: [39800, 48200, 66400, 41100, 20100],
          backgroundColor: '#B5179E'
        },
        {
          label: 'Homens (hab)',
          data: [41200, 49100, 62800, 37200, 15300],
          backgroundColor: '#2352EE'
        }
      ]
    },
    secondaryChartData: {
      labels: ['1991', '2000', '2010', '2022'],
      datasets: [
        {
          label: 'Crescimento Populacional Histórico',
          data: [294998, 363392, 417064, 418261],
          backgroundColor: ['#93C5FD', '#60A5FA', '#3B82F6', '#2352EE']
        }
      ]
    },
    tableData: [
      { grupo: 'População Feminina', total: '215.600', percentual: '51,5%' },
      { grupo: 'População Masculina', total: '202.661', percentual: '48,5%' },
      { grupo: 'População em Idade Ativa (15-64)', total: '304.800', percentual: '72,8%' },
      { grupo: 'Índice de Envelhecimento', total: '43,7 idosos / 100 jovens', percentual: '-' }
    ]
  },
  {
    id: 'bi-economia-maua',
    title: 'BI Economia Mauá - PIB, Arrecadação e Polo Petroquímico',
    shortTitle: 'BI Economia',
    category: 'Finanças & Indústria',
    description: 'Indicadores econômicos consolidados de Mauá: Produto Interno Bruto a preços correntes (IBGE), arrecadação e cota-parte do ICMS (Sefaz-SP), receitas tributárias federais administradas pela Receita Federal (RFB) e o impacto do Polo Petroquímico de Capuava.',
    source: 'IBGE Contas Nacionais / Sefaz-SP Relatório Tributário / Receita Federal do Brasil (RFB) ReceitaData',
    sourceUrl: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama',
    officialLinks: [
      { label: 'IBGE Cidades: Panorama de Mauá', url: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama' },
      { label: 'Sefaz-SP: Relatório da Receita Tributária (ICMS)', url: 'https://portal.fazenda.sp.gov.br/acessoinformacao/Paginas/Relat%C3%B3rios-da-Receita-Tribut%C3%A1ria.aspx' },
      { label: 'Receita Federal / MF: Arrecadação por Município', url: 'https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos/receitadata/arrecadacao/copy_of_arrecadacao-das-receitas-administradas-pela-rfb-por-municipio' },
      { label: 'IBGE: Produto Interno Bruto dos Municípios', url: 'https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9088-produto-interno-bruto-dos-municipios.html' }
    ],
    lastUpdate: 'Fevereiro de 2026',
    kpis: [
      { label: 'PIB a Preços Correntes (IBGE)', value: 'R$ 24,99 bi', change: '4º maior do ABC', isPositive: true },
      { label: 'PIB per Capita Oficial', value: 'R$ 59.773,04', change: 'IBGE Cidades', isPositive: true },
      { label: 'Cota-Parte ICMS Anual (Sefaz)', value: 'R$ 412,5 mi', change: 'IPM 0,9184%', isPositive: true },
      { label: 'Tributos Federais RFB', value: 'R$ 1,48 bi', change: 'IRPF / IRPJ / PIS', isPositive: true }
    ],
    chartData: {
      labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Evolução do PIB dos Municípios - IBGE (R$ Bilhões)',
          data: [13.8, 14.6, 15.2, 18.7, 22.4, 24.99],
          borderColor: '#2352EE',
          backgroundColor: 'rgba(35, 82, 238, 0.15)'
        }
      ]
    },
    secondaryChartData: {
      labels: ['Serviços (excl. Adm)', 'Indústria da Transformação', 'Administração Pública', 'Construção & Outros'],
      datasets: [
        {
          label: 'Participação Setorial no VAF (%)',
          data: [48.5, 33.2, 12.8, 5.5],
          backgroundColor: ['#2352EE', '#B5179E', '#0284C7', '#10B981']
        }
      ]
    },
    tableData: [
      { discriminacao: 'Valor Adicionado Bruto da Indústria (Polo Capuava)', valor: 'R$ 8,30 bilhões', fonte: 'IBGE Contas Regionais' },
      { discriminacao: 'Valor Adicionado Bruto dos Serviços', valor: 'R$ 12,12 bilhões', fonte: 'IBGE Contas Regionais' },
      { discriminacao: 'Valor Adicionado Bruto da Administração Pública', valor: 'R$ 3,20 bilhões', fonte: 'IBGE Contas Regionais' },
      { discriminacao: 'Repasse Anual de Cota-Parte do ICMS (Mauá)', valor: 'R$ 412,5 milhões', fonte: 'Sefaz-SP Relatório Tributário' },
      { discriminacao: 'Arrecadação de Tributos Federais e IRRF (RFB)', valor: 'R$ 1,48 bilhão', fonte: 'ReceitaData / Receita Federal' }
    ]
  },
  {
    id: 'bi-cnpj-maua',
    title: 'BI CNPJ Mauá - Perfil e Dinâmica das Empresas',
    shortTitle: 'BI CNPJ',
    category: 'Negócios',
    description: 'Mapeamento das 39.420 empresas ativas cadastradas na Receita Federal em Mauá. Segmentação por porte empresarial (MEI, ME, EPP e Médio/Grande) e setores CNAE.',
    source: 'Receita Federal do Brasil (RFB) / JUCESP',
    lastUpdate: 'Fevereiro de 2026',
    kpis: [
      { label: 'Empresas Ativas', value: '39.420', change: '+1.420 novas', isPositive: true },
      { label: 'Microempreendedores (MEI)', value: '25.240', change: '64.0% do total', isPositive: true },
      { label: 'Microempresas (ME)', value: '9.860', change: '25.0% do total', isPositive: true },
      { label: 'Médio e Grande Porte', value: '1.980', change: 'Geração intensiva', isPositive: true }
    ],
    chartData: {
      labels: ['MEI', 'Microempresa (ME)', 'Empresa Pequeno Porte (EPP)', 'Demais Portes'],
      datasets: [
        {
          label: 'Número de Empresas',
          data: [25240, 9860, 2340, 1980],
          backgroundColor: ['#2352EE', '#B5179E', '#0284C7', '#F59E0B']
        }
      ]
    },
    secondaryChartData: {
      labels: ['Comércio Varejista', 'Serviços Especializados', 'Indústria Mecânica/Química', 'Transporte & Logística', 'Construção Civil'],
      datasets: [
        {
          label: 'Empresas por Ramo (%)',
          data: [38.2, 32.5, 14.1, 8.4, 6.8],
          backgroundColor: ['#2352EE', '#B5179E', '#06B6D4', '#10B981', '#F43F5E']
        }
      ]
    }
  },
  {
    id: 'bi-estabel-saude',
    title: 'BI Estabelecimentos de Saúde - Rede e Atendimentos',
    shortTitle: 'BI Saúde',
    category: 'Saúde Pública',
    description: 'Infraestrutura da rede municipal e regional de saúde pública em Mauá, leitos operacionais, UPAs 24h, Hospital de Clínicas Dr. Radamés Nardini e as 23 Unidades Básicas de Saúde.',
    source: 'CNES / DATASUS / Secretaria Municipal de Saúde de Mauá',
    lastUpdate: 'Janeiro de 2026',
    kpis: [
      { label: 'Hospital Nardini (Leitos)', value: '240 leitos', change: '100% SUS', isPositive: true },
      { label: 'Unidades de Pronto Atendimento (UPAs)', value: '4 unidades', change: '24h/dia', isPositive: true },
      { label: 'Unidades Básicas de Saúde (UBS)', value: '23 unidades', change: 'Cobertura 88%', isPositive: true },
      { label: 'Consultas Anuais Realizadas', value: '864.200', change: '+5.4%', isPositive: true }
    ],
    chartData: {
      labels: ['Hospital Nardini', 'UPA Vila Magini', 'UPA Zaíra', 'UPA Barão de Mauá', 'Rede 23 UBSs', 'Centros Esp. (CRUMA/CAPS)'],
      datasets: [
        {
          label: 'Atendimentos Mensais Médios',
          data: [18500, 14200, 16800, 11900, 48500, 8400],
          backgroundColor: '#2352EE'
        }
      ]
    }
  },
  {
    id: 'bi-censo-escolar',
    title: 'BI Censo Escolar 2025 - Matrículas e Estatísticas do INEP',
    shortTitle: 'BI Censo Escolar',
    category: 'Educação Básica',
    description: 'Resultados oficiais do Censo Escolar 2025 do INEP para as escolas e matrículas do município de Mauá. Distribuição de alunos por etapa de ensino (Creche, Pré-escola, Ensino Fundamental, Médio e EJA), dependência administrativa e indicadores de rendimento escolar.',
    source: 'INEP / Ministério da Educação • Painéis Estatísticos do Censo Escolar 2025',
    sourceUrl: 'https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9',
    officialLinks: [
      { label: 'INEP: Painéis Estatísticos do Censo Escolar 2025 (Power BI Oficial)', url: 'https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9' },
      { label: 'Secretaria Municipal de Educação de Mauá', url: 'https://www.maua.sp.gov.br/' }
    ],
    lastUpdate: 'Censo Escolar 2025',
    kpis: [
      { label: 'Total de Matrículas Mauá', value: '80.200 alunos', change: 'Censo 2025 INEP', isPositive: true },
      { label: 'Educação Infantil (0 a 5)', value: '14.800 crianças', change: '+3.2%', isPositive: true },
      { label: 'IDEB Anos Iniciais', value: '6,2', change: 'Meta atingida', isPositive: true },
      { label: 'Taxa de Aprovação Geral', value: '95,4%', change: '+1.1%', isPositive: true }
    ],
    chartData: {
      labels: ['Creche (0 a 3 anos)', 'Pré-escola (4 e 5 anos)', 'Fundamental I (1º ao 5º)', 'Fundamental II (6º ao 9º)', 'Ensino Médio', 'EJA'],
      datasets: [
        {
          label: 'Distribuição de Alunos por Etapa',
          data: [8200, 6600, 24200, 21500, 17300, 2400],
          backgroundColor: ['#B5179E', '#D637BC', '#2352EE', '#4E74F5', '#0284C7', '#10B981']
        }
      ]
    },
    tableData: [
      { etapaRede: 'Rede Estadual (Fundamental II e Ensino Médio)', matriculas: '38.650 alunos', participacao: '48,2%', fonte: 'INEP Censo Escolar 2025' },
      { etapaRede: 'Rede Municipal (Educação Infantil e Fundamental I)', matriculas: '28.450 alunos', participacao: '35,5%', fonte: 'INEP Censo Escolar 2025' },
      { etapaRede: 'Rede Privada e Conveniada (Todas as Etapas)', matriculas: '13.100 alunos', participacao: '16,3%', fonte: 'INEP Censo Escolar 2025' },
      { etapaRede: 'Educação Especial (Inclusiva e Classes Exclusivas)', matriculas: '2.140 alunos', participacao: '2,7%', fonte: 'INEP Censo Escolar 2025' }
    ]
  },
  {
    id: 'bi-escolas-maua',
    title: 'BI Escolas de Mauá - Panorama da Rede Escolar (187 Unidades)',
    shortTitle: 'BI Escolas',
    category: 'Educação Básica',
    description: 'Catálogo consolidado das cerca de 187 escolas de educação básica em atividade em Mauá. A rede municipal conta com 48 escolas (44 de gestão própria e 4 conveniadas) focadas na Educação Infantil (creches e pré-escola) e EJA. A rede estadual responde por mais de 60 escolas (Fundamental II e Ensino Médio), além de cerca de 79 instituições privadas. Entre 101 e 109 estabelecimentos ofertam Ensino Fundamental e cerca de 42 a 45 ofertam Ensino Médio.',
    source: 'INEP Censo Escolar 2025 / QEdu / Seduc-SP / Secretaria de Educação de Mauá',
    sourceUrl: 'https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9',
    officialLinks: [
      { label: 'Painéis Estatísticos do INEP: Censo Escolar 2025', url: 'https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9' },
      { label: 'QEdu: Censo Escolar Mauá (SP)', url: 'https://qedu.org.br/municipio/3529401-maua/censo-escolar' },
      { label: 'Secretaria de Educação de Mauá', url: 'https://www.maua.sp.gov.br/' }
    ],
    lastUpdate: 'Censo Escolar 2025',
    kpis: [
      { label: 'Total Escolas em Atividade', value: '187 unidades', change: 'Municipal, Estadual e Privada', isPositive: true },
      { label: 'Rede Municipal (Mauá)', value: '48 escolas', change: '44 próprias + 4 conveniadas', isPositive: true },
      { label: 'Rede Estadual (Seduc-SP)', value: '60+ escolas', change: 'Fundamental II e Médio', isPositive: true },
      { label: 'Ensino Fundamental', value: '101 a 109', change: 'Escolas com Fundamental', isPositive: true }
    ],
    chartData: {
      labels: ['Região Zaíra', 'Região Assis / Bocaina', 'Região Guapituba / Américas', 'Região Itapeva / Feital', 'Região Capuava / Sonia', 'Região Centro'],
      datasets: [
        {
          label: 'Unidades Escolares por Região',
          data: [36, 25, 27, 28, 18, 14],
          backgroundColor: '#2352EE'
        }
      ]
    },
    tableData: [
      { regiao: 'Região Jardim Zaíra / Alto da Boa Vista', escolas: '36 unidades', alunosAtendidos: '18.420 alunos', tipoDominante: 'Rede Pública (Municipal e Estadual)' },
      { regiao: 'Região Itapeva / Feital / Maringá', escolas: '28 unidades', alunosAtendidos: '16.150 alunos', tipoDominante: 'Rede Pública' },
      { regiao: 'Região Guapituba / Parque das Américas', escolas: '27 unidades', alunosAtendidos: '14.800 alunos', tipoDominante: 'Rede Pública e Privada' },
      { regiao: 'Região Vila Assis / Bocaina / Matriz', escolas: '25 unidades', alunosAtendidos: '15.200 alunos', tipoDominante: 'Rede Mista' },
      { regiao: 'Região Capuava / Parque São Vicente', escolas: '18 unidades', alunosAtendidos: '9.350 alunos', tipoDominante: 'Rede Pública e Técnica' },
      { regiao: 'Região Central de Mauá', escolas: '14 unidades', alunosAtendidos: '6.280 alunos', tipoDominante: 'Rede Privada e Conveniada' }
    ]
  },
  {
    id: 'bi-vulnerabilidade',
    title: 'BI Vulnerabilidade Social - IPVS e Programas Sociais',
    shortTitle: 'BI Vulnerabilidade',
    category: 'Assistência Social',
    description: 'Mapeamento da vulnerabilidade social através do Índice Paulista de Vulnerabilidade Social (IPVS) da Fundação SEADE, famílias em extrema pobreza e cobertura do Programa Bolsa Família.',
    source: 'Fundação SEADE (IPVS) / SASC Mauá / MDS',
    lastUpdate: 'Fevereiro de 2026',
    kpis: [
      { label: 'Famílias no CadÚnico', value: '54.230', change: 'Cadastradas', isPositive: true },
      { label: 'Beneficiárias Bolsa Família', value: '31.840', change: 'Benefício regular', isPositive: true },
      { label: 'Valor Médio Benefício', value: 'R$ 682,00', change: 'Por família', isPositive: true },
      { label: 'CRAS Operacionais', value: '6 unidades', change: 'Territórios vulneráveis', isPositive: true }
    ],
    chartData: {
      labels: ['Grupo 1 (Muito Baixa)', 'Grupo 2 (Baixa)', 'Grupo 3 (Média)', 'Grupo 4 (Média-Alta)', 'Grupo 5 (Alta)', 'Grupo 6 (Muito Alta)'],
      datasets: [
        {
          label: 'População de Mauá no IPVS (%)',
          data: [8.5, 21.4, 32.6, 18.2, 14.1, 5.2],
          backgroundColor: ['#10B981', '#34D399', '#60A5FA', '#F59E0B', '#F97316', '#EF4444']
        }
      ]
    }
  },
  {
    id: 'bi-emprego-rais',
    title: 'BI Emprego RAIS / CAGED - Mercado Formal de Trabalho',
    shortTitle: 'BI Emprego',
    category: 'Trabalho & Renda',
    description: 'Dados abertos e transparentes acessíveis a qualquer cidadão no Ministério do Trabalho e Emprego (MTE). Acompanhe o estoque de postos formais em Mauá através da RAIS, a dinâmica mensal de admissões e demissões pelo Novo CAGED e a remuneração média da força de trabalho.',
    source: 'Ministério do Trabalho e Emprego (MTE) / Novo CAGED & RAIS',
    sourceUrl: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho',
    officialLinks: [
      { label: 'Ministério do Trabalho e Emprego: Estatísticas do Trabalho', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho' },
      { label: 'Novo CAGED: Painel de Informações', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho' }
    ],
    lastUpdate: 'Fevereiro de 2026',
    kpis: [
      { label: 'Estoque Empregos Formais', value: '88.450 vagas', change: '+2.140 no ano', isPositive: true },
      { label: 'Saldo CAGED (Últimos 12m)', value: '+2.140 vagas', change: 'Saldo positivo', isPositive: true },
      { label: 'Salário Médio de Admissão', value: 'R$ 2.480,00', change: '+6.2%', isPositive: true },
      { label: 'Taxa de Ocupação Formal', value: '62,5%', change: 'Em alta', isPositive: true }
    ],
    chartData: {
      labels: ['Jan/25', 'Mar/25', 'Mai/25', 'Jul/25', 'Set/25', 'Nov/25', 'Jan/26'],
      datasets: [
        {
          label: 'Saldo Mensal de Vagas (Novo CAGED)',
          data: [180, 240, 310, 195, 280, 350, 220],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)'
        }
      ]
    },
    secondaryChartData: {
      labels: ['Serviços', 'Indústria da Transformação', 'Comércio Varejista/Atacadista', 'Construção Civil'],
      datasets: [
        {
          label: 'Estoque por Grande Setor (%)',
          data: [42.1, 31.4, 19.8, 6.7],
          backgroundColor: ['#2352EE', '#B5179E', '#0284C7', '#F59E0B']
        }
      ]
    },
    tableData: [
      { setor: 'Setor de Serviços Especializados e Corporativos', vagasAtivas: '37.240 vagas', salarioMedio: 'R$ 2.650,00', participacao: '42,1%' },
      { setor: 'Indústria da Transformação (Química, Metalurgia e Refino)', vagasAtivas: '27.770 vagas', salarioMedio: 'R$ 3.820,00', participacao: '31,4%' },
      { setor: 'Comércio Varejista, Atacadista e Centros de Distribuição', vagasAtivas: '17.510 vagas', salarioMedio: 'R$ 2.080,00', participacao: '19,8%' },
      { setor: 'Construção Civil e Infraestrutura', vagasAtivas: '5.930 vagas', salarioMedio: 'R$ 2.390,00', participacao: '6,7%' }
    ]
  },
  {
    id: 'bi-energia-semil',
    title: 'BI Energia & Consumo Setorial - Anuário Energético SEMIL SP',
    shortTitle: 'BI Energia SEMIL',
    category: 'Infraestrutura & Energia',
    description: 'Consumo de energia elétrica por setor em Mauá (Industrial, Residencial, Comercial, Poder Público e Iluminação Pública) com base no Anuário de Energéticos por Municípios da Secretaria de Meio Ambiente, Infraestrutura e Logística do Estado de São Paulo (SEMIL-SP).',
    source: 'Secretaria de Meio Ambiente, Infraestrutura e Logística de SP (SEMIL-SP) / Anuário de Energéticos',
    sourceUrl: 'https://semil.sp.gov.br/anuario-de-energeticos-por-municipios-do-estado-de-sao-paulo/#:~:text=Com%20esta%20publica%C3%A7%C3%A3o%2C%20a%20Semil,insumos%20necess%C3%A1rios%20ao%20desenvolvimento%20regional.',
    officialLinks: [
      { label: 'SEMIL-SP: Anuário de Energéticos por Municípios', url: 'https://semil.sp.gov.br/anuario-de-energeticos-por-municipios-do-estado-de-sao-paulo/#:~:text=Com%20esta%20publica%C3%A7%C3%A3o%2C%20a%20Semil,insumos%20necess%C3%A1rios%20ao%20desenvolvimento%20regional.' },
      { label: 'IBGE: Matriz Energética Municipal & Contas', url: 'https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9088-produto-interno-bruto-dos-municipios.html' }
    ],
    lastUpdate: 'Fevereiro de 2026',
    kpis: [
      { label: 'Consumo Total Anual', value: '1.184.200 MWh', change: '+3.1% anual', isPositive: true },
      { label: 'Consumo Industrial', value: '686.836 MWh', change: '58,0% do total', isPositive: true },
      { label: 'Consumo Residencial', value: '307.892 MWh', change: '26,0% do total', isPositive: true },
      { label: 'Consumo Comercial', value: '130.262 MWh', change: '11,0% do total', isPositive: true }
    ],
    chartData: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'Consumo de Energia Elétrica Total de Mauá (MWh)',
          data: [1092000, 1125000, 1148000, 1162000, 1175000, 1184200],
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.15)'
        }
      ]
    },
    secondaryChartData: {
      labels: ['Indústria (Polo Petroquímico & Transformação)', 'Residencial (Domicílios)', 'Comércio & Serviços', 'Poder Público', 'Iluminação Pública'],
      datasets: [
        {
          label: 'Distribuição Setorial do Consumo Elétrico (%)',
          data: [58.0, 26.0, 11.0, 3.0, 2.0],
          backgroundColor: ['#2352EE', '#B5179E', '#0284C7', '#10B981', '#F59E0B']
        }
      ]
    },
    tableData: [
      { setor: 'Industrial (Polo Petroquímico de Capuava e Indústria Metalmecânica)', consumoMwh: '686.836 MWh', participacao: '58,0%', tensao: 'Alta Tensão (A4/A3)' },
      { setor: 'Residencial (147.382 domicílios recenseados pelo IBGE)', consumoMwh: '307.892 MWh', participacao: '26,0%', tensao: 'Baixa Tensão (B1)' },
      { setor: 'Comércio Varejista e Serviços Especializados', consumoMwh: '130.262 MWh', participacao: '11,0%', tensao: 'Média/Baixa Tensão (B3)' },
      { setor: 'Poder Público (Equipamentos Municipais e Estaduais)', consumoMwh: '35.526 MWh', participacao: '3,0%', tensao: 'Próprios Públicos (B4)' },
      { setor: 'Iluminação Pública das Vias e Praças de Mauá', consumoMwh: '23.684 MWh', participacao: '2,0%', tensao: 'Rede IP Telegestão LED' }
    ]
  }
];

// ==========================================================================
// 2. ORÇAMENTO MUNICIPAL 2025 / 2026
// ==========================================================================

export interface BudgetData {
  fiscalYear: number;
  totalRevenuePredicted: number;
  totalRevenueRealized: number;
  totalExpenseBudgeted: number;
  totalExpenseRealized: number;
  departments: {
    name: string;
    budgeted: number;
    realized: number;
    percentage: number;
    color: string;
  }[];
  revenueSources: {
    name: string;
    amount: number;
    percentage: number;
  }[];
}

export const budget2026: BudgetData = {
  fiscalYear: 2026,
  totalRevenuePredicted: 2120000000,
  totalRevenueRealized: 2085400000,
  totalExpenseBudgeted: 2120000000,
  totalExpenseRealized: 2042100000,
  departments: [
    { name: 'Secretaria de Saúde', budgeted: 667800000, realized: 651200000, percentage: 31.5, color: '#2352EE' },
    { name: 'Secretaria de Educação', budgeted: 568100000, realized: 554300000, percentage: 26.8, color: '#B5179E' },
    { name: 'Serviços Urbanos e Infraestrutura', budgeted: 301000000, realized: 289400000, percentage: 14.2, color: '#0284C7' },
    { name: 'Mobilidade Urbana e Trânsito', budgeted: 159000000, realized: 151200000, percentage: 7.5, color: '#10B981' },
    { name: 'Segurança Pública e Defesa Civil', budgeted: 110200000, realized: 106500000, percentage: 5.2, color: '#F59E0B' },
    { name: 'Assistência Social e Cidadania', budgeted: 101700000, realized: 98900000, percentage: 4.8, color: '#EC4899' },
    { name: 'Demais Secretarias e Encargos', budgeted: 212200000, realized: 190600000, percentage: 10.0, color: '#64748B' }
  ],
  revenueSources: [
    { name: 'Transferências do Estado (ICMS, IPVA)', amount: 680000000, percentage: 32.1 },
    { name: 'Transferências da União (FPM, SUS, FUNDEB)', amount: 615000000, percentage: 29.0 },
    { name: 'Tributos Próprios (IPTU, ISS, ITBI)', amount: 590000000, percentage: 27.8 },
    { name: 'Taxas, Contribuições e Outras Receitas', amount: 235000000, percentage: 11.1 }
  ]
};

// ==========================================================================
// 3. MAUÁ EM NÚMEROS (14 Bairros Oficiais)
// ==========================================================================

export interface BairroData {
  id: string;
  name: string;
  region: string;
  population: number;
  households: number;
  areaKm2: number;
  densityHabKm2: number;
  publicSchools: number;
  healthUnits: number;
  mainLandmarks: string[];
}

export const mauaBairros: BairroData[] = [
  {
    id: 'jardim-zaira',
    name: 'Jardim Zaíra',
    region: 'Norte / Leste',
    population: 82450,
    households: 27800,
    areaKm2: 7.2,
    densityHabKm2: 11451,
    publicSchools: 18,
    healthUnits: 3,
    mainLandmarks: ['UPA Zaíra', 'Parque Linear Zaíra', 'CRAS Zaíra']
  },
  {
    id: 'parque-das-americas',
    name: 'Parque das Américas',
    region: 'Sul',
    population: 41520,
    households: 14200,
    areaKm2: 4.5,
    densityHabKm2: 9226,
    publicSchools: 9,
    healthUnits: 2,
    mainLandmarks: ['Estação Guapituba (proximidades)', 'UBS Américas']
  },
  {
    id: 'jardim-itapeva',
    name: 'Jardim Itapeva',
    region: 'Leste',
    population: 45310,
    households: 15400,
    areaKm2: 5.1,
    densityHabKm2: 8884,
    publicSchools: 10,
    healthUnits: 2,
    mainLandmarks: ['UBS Itapeva', 'Centro Comunitário Itapeva']
  },
  {
    id: 'vila-assis-brasil',
    name: 'Vila Assis Brasil',
    region: 'Central / Leste',
    population: 34200,
    households: 12100,
    areaKm2: 3.4,
    densityHabKm2: 10058,
    publicSchools: 8,
    healthUnits: 1,
    mainLandmarks: ['UBS Vila Assis', 'Comércio da Av. Dom José Gaspar']
  },
  {
    id: 'jardim-maringa',
    name: 'Jardim Maringá',
    region: 'Leste',
    population: 32180,
    households: 10900,
    areaKm2: 3.8,
    densityHabKm2: 8468,
    publicSchools: 7,
    healthUnits: 2,
    mainLandmarks: ['UPA Maringá', 'Praça da Juventude']
  },
  {
    id: 'guapituba',
    name: 'Guapituba',
    region: 'Sul',
    population: 28640,
    households: 9800,
    areaKm2: 5.8,
    densityHabKm2: 4937,
    publicSchools: 6,
    healthUnits: 1,
    mainLandmarks: ['Parque Ecológico Guapituba', 'Estação CPTM Guapituba']
  },
  {
    id: 'jardim-primavera',
    name: 'Jardim Primavera',
    region: 'Nordeste',
    population: 26400,
    households: 8900,
    areaKm2: 3.2,
    densityHabKm2: 8250,
    publicSchools: 5,
    healthUnits: 1,
    mainLandmarks: ['UBS Primavera', 'Parque da Gruta Santa Luzia']
  },
  {
    id: 'vila-feital',
    name: 'Vila Feital',
    region: 'Leste Extremo',
    population: 25200,
    households: 8400,
    areaKm2: 4.1,
    densityHabKm2: 6146,
    publicSchools: 5,
    healthUnits: 1,
    mainLandmarks: ['CRAS Feital', 'UBS Feital']
  },
  {
    id: 'centro-matriz',
    name: 'Centro / Matriz',
    region: 'Central',
    population: 24100,
    households: 9600,
    areaKm2: 2.9,
    densityHabKm2: 8310,
    publicSchools: 5,
    healthUnits: 2,
    mainLandmarks: ['Paço Municipal de Mauá', 'Terminal Rodoviário Central', 'Estação CPTM Mauá', 'Mauá Plaza Shopping']
  },
  {
    id: 'vila-sonia',
    name: 'Vila Sonia / Silvia Maria',
    region: 'Noroeste',
    population: 21750,
    households: 7500,
    areaKm2: 3.0,
    densityHabKm2: 7250,
    publicSchools: 4,
    healthUnits: 1,
    mainLandmarks: ['UBS Vila Sonia', 'Acesso Rodoanel Mário Covas']
  },
  {
    id: 'vila-bocaina',
    name: 'Vila Bocaina',
    region: 'Central',
    population: 19800,
    households: 7800,
    areaKm2: 2.1,
    densityHabKm2: 9428,
    publicSchools: 4,
    healthUnits: 2,
    mainLandmarks: ['Hospital Dr. Radamés Nardini', 'Teatro Municipal de Mauá']
  },
  {
    id: 'jardim-paranavai',
    name: 'Jardim Paranavaí',
    region: 'Norte',
    population: 18900,
    households: 6300,
    areaKm2: 2.8,
    densityHabKm2: 6750,
    publicSchools: 4,
    healthUnits: 1,
    mainLandmarks: ['UBS Paranavaí', 'Área de Preservação']
  },
  {
    id: 'jardim-cerqueira-leite',
    name: 'Jardim Cerqueira Leite',
    region: 'Centro-Sul',
    population: 16420,
    households: 5600,
    areaKm2: 2.2,
    densityHabKm2: 7463,
    publicSchools: 3,
    healthUnits: 1,
    mainLandmarks: ['UBS Cerqueira Leite']
  },
  {
    id: 'capuava-polo-industrial',
    name: 'Capuava / Polo Petroquímico',
    region: 'Oeste',
    population: 12500,
    households: 4200,
    areaKm2: 9.8,
    densityHabKm2: 1275,
    publicSchools: 3,
    healthUnits: 1,
    mainLandmarks: ['Polo Petroquímico do Grande ABC', 'Estação CPTM Capuava', 'Complexo Industrial']
  }
];

// ==========================================================================
// 4. INDICADORES SOCIOECONÔMICOS (Séries Mensais)
// ==========================================================================

export interface SocioIndicator {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentValue: number;
  lastMonthValue: number;
  changePercent: number;
  historicalSeries: { month: string; value: number }[];
  description: string;
  source: string;
  sourceUrl?: string;
  year?: string | number;
}

export const socioIndicatorsList: SocioIndicator[] = [
  {
    id: 'acidentes-transito',
    name: 'Sinistros com Vítimas no Trânsito',
    category: 'Trânsito & Mobilidade',
    unit: 'ocorrências',
    currentValue: 42,
    lastMonthValue: 49,
    changePercent: -14.3,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 58 },
      { month: 'Ago/25', value: 54 },
      { month: 'Set/25', value: 51 },
      { month: 'Out/25', value: 47 },
      { month: 'Nov/25', value: 49 },
      { month: 'Dez/25', value: 42 }
    ],
    description: 'Total de acidentes de trânsito com vítimas não fatais e fatais nas vias municipais de Mauá.',
    source: 'InfoSiga SP / Detran-SP'
  },
  {
    id: 'assistencia-social',
    name: 'Atendimentos Socioassistenciais (CRAS)',
    category: 'Assistência Social',
    unit: 'famílias',
    currentValue: 4820,
    lastMonthValue: 4610,
    changePercent: 4.5,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 4320 },
      { month: 'Ago/25', value: 4450 },
      { month: 'Set/25', value: 4510 },
      { month: 'Out/25', value: 4580 },
      { month: 'Nov/25', value: 4610 },
      { month: 'Dez/25', value: 4820 }
    ],
    description: 'Famílias acompanhadas através dos 6 Centros de Referência de Assistência Social (CRAS) e CREAS de Mauá.',
    source: 'SASC Mauá'
  },
  {
    id: 'atividade-economica',
    name: 'Abertura de Novas Empresas (CNPJ)',
    category: 'Atividade Econômica',
    unit: 'empresas abertas',
    currentValue: 312,
    lastMonthValue: 285,
    changePercent: 9.5,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 260 },
      { month: 'Ago/25', value: 275 },
      { month: 'Set/25', value: 290 },
      { month: 'Out/25', value: 280 },
      { month: 'Nov/25', value: 285 },
      { month: 'Dez/25', value: 312 }
    ],
    description: 'Volume mensal de registros de novos negócios ativos no município de Mauá.',
    source: 'JUCESP / Receita Federal'
  },
  {
    id: 'emprego-formal',
    name: 'Saldo Líquido de Empregos (Novo CAGED)',
    category: 'Trabalho & Renda',
    unit: 'postos com carteira assinada',
    currentValue: 245,
    lastMonthValue: 190,
    changePercent: 28.9,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 165 },
      { month: 'Ago/25', value: 210 },
      { month: 'Set/25', value: 230 },
      { month: 'Out/25', value: 180 },
      { month: 'Nov/25', value: 190 },
      { month: 'Dez/25', value: 245 }
    ],
    description: 'Saldo líquido mensal (admissões menos demissões) com carteira assinada em Mauá. Qualquer cidadão pode consultar esses dados no portal do Ministério do Trabalho e Emprego.',
    source: 'Ministério do Trabalho e Emprego (MTE) • Novo CAGED',
    sourceUrl: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho'
  },
  {
    id: 'estoque-rais-maua',
    name: 'Estoque de Empregos Formais (RAIS / MTE)',
    category: 'Trabalho & Renda',
    unit: 'postos ativos',
    currentValue: 88450,
    lastMonthValue: 86310,
    changePercent: 2.5,
    year: '2025',
    historicalSeries: [
      { month: '2020', value: 81200 },
      { month: '2021', value: 83450 },
      { month: '2022', value: 85100 },
      { month: '2023', value: 86310 },
      { month: '2024', value: 87400 },
      { month: '2025', value: 88450 }
    ],
    description: 'Estoque total consolidado de vínculos empregatícios formais ativos no município de Mauá mensurados pela Relação Anual de Informações Sociais (RAIS) do Ministério do Trabalho.',
    source: 'Ministério do Trabalho e Emprego (MTE) • RAIS',
    sourceUrl: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho'
  },
  {
    id: 'receita-despesa',
    name: 'Arrecadação Municipal Mensal',
    category: 'Finanças Públicas',
    unit: 'R$ Milhões',
    currentValue: 174.5,
    lastMonthValue: 168.2,
    changePercent: 3.7,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 162.0 },
      { month: 'Ago/25', value: 165.4 },
      { month: 'Set/25', value: 164.8 },
      { month: 'Out/25', value: 167.1 },
      { month: 'Nov/25', value: 168.2 },
      { month: 'Dez/25', value: 174.5 }
    ],
    description: 'Total das receitas orçamentárias arrecadadas pela Administração Direta de Mauá no mês.',
    source: 'Secretaria de Finanças de Mauá / TCE-SP'
  },
  {
    id: 'saude-consultas',
    name: 'Consultas Médicas na Atenção Básica',
    category: 'Saúde Pública',
    unit: 'consultas',
    currentValue: 48620,
    lastMonthValue: 47200,
    changePercent: 3.0,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 45100 },
      { month: 'Ago/25', value: 46200 },
      { month: 'Set/25', value: 46800 },
      { month: 'Out/25', value: 47500 },
      { month: 'Nov/25', value: 47200 },
      { month: 'Dez/25', value: 48620 }
    ],
    description: 'Atendimentos e consultas médicas ambulatoriais realizadas nas 23 UBSs municipais.',
    source: 'Secretaria Municipal de Saúde de Mauá'
  },
  {
    id: 'seguranca-publica',
    name: 'Ocorrências Criminais Registradas',
    category: 'Segurança Pública',
    unit: 'boletins de ocorrência',
    currentValue: 382,
    lastMonthValue: 415,
    changePercent: -7.9,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 440 },
      { month: 'Ago/25', value: 432 },
      { month: 'Set/25', value: 420 },
      { month: 'Out/25', value: 405 },
      { month: 'Nov/25', value: 415 },
      { month: 'Dez/25', value: 382 }
    ],
    description: 'Soma dos delitos patrimoniais (roubos e furtos) e ocorrências com atuação conjunta da GCM Mauá e Polícia Militar.',
    source: 'Secretaria de Segurança Pública do Estado de São Paulo (SSP-SP)'
  },
  {
    id: 'icms-arrecadacao-sp',
    name: 'Repasse Cota-Parte ICMS (Sefaz-SP)',
    category: 'Finanças Públicas',
    unit: 'R$ Milhões/mês',
    currentValue: 34.8,
    lastMonthValue: 33.5,
    changePercent: 3.9,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 32.1 },
      { month: 'Ago/25', value: 33.0 },
      { month: 'Set/25', value: 32.8 },
      { month: 'Out/25', value: 33.9 },
      { month: 'Nov/25', value: 33.5 },
      { month: 'Dez/25', value: 34.8 }
    ],
    description: 'Cota-parte mensal do Imposto sobre Circulação de Mercadorias e Serviços (ICMS) transferida pelo Governo do Estado de São Paulo ao município de Mauá com base no IPM e DIPAM.',
    source: 'Sefaz-SP • Relatórios da Receita Tributária',
    sourceUrl: 'https://portal.fazenda.sp.gov.br/acessoinformacao/Paginas/Relat%C3%B3rios-da-Receita-Tribut%C3%A1ria.aspx'
  },
  {
    id: 'receita-federal-tributos',
    name: 'Tributos Federais & IR (ReceitaData RFB)',
    category: 'Finanças Públicas',
    unit: 'R$ Milhões/mês',
    currentValue: 128.4,
    lastMonthValue: 122.1,
    changePercent: 5.2,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 118.2 },
      { month: 'Ago/25', value: 120.5 },
      { month: 'Set/25', value: 121.0 },
      { month: 'Out/25', value: 124.3 },
      { month: 'Nov/25', value: 122.1 },
      { month: 'Dez/25', value: 128.4 }
    ],
    description: 'Arrecadação total de receitas administradas pela Receita Federal do Brasil (IRPF, IRPJ, CSLL, PIS/Cofins e contribuições previdenciárias) por pessoas físicas e jurídicas domiciliadas em Mauá.',
    source: 'Ministério da Fazenda / Receita Federal • ReceitaData',
    sourceUrl: 'https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos/receitadata/arrecadacao/copy_of_arrecadacao-das-receitas-administradas-pela-rfb-por-municipio'
  },
  {
    id: 'pib-ibge-anual',
    name: 'PIB dos Municípios a Preços Correntes (IBGE)',
    category: 'Atividade Econômica',
    unit: 'R$ Bilhões/ano',
    currentValue: 24.99,
    lastMonthValue: 22.40,
    changePercent: 11.5,
    year: '2023',
    historicalSeries: [
      { month: '2018', value: 13.8 },
      { month: '2019', value: 14.6 },
      { month: '2020', value: 15.2 },
      { month: '2021', value: 18.7 },
      { month: '2022', value: 22.4 },
      { month: '2023', value: 24.99 }
    ],
    description: 'Série histórica oficial do Produto Interno Bruto a preços correntes de Mauá divulgada pelo IBGE Contas Regionais, impulsionada pelo Polo Petroquímico e setor de serviços.',
    source: 'IBGE • Panorama / Contas Nacionais (PIB dos Municípios)',
    sourceUrl: 'https://cidades.ibge.gov.br/brasil/sp/maua/panorama'
  },
  {
    id: 'consumo-energia-semil',
    name: 'Consumo de Energia Elétrica Total (SEMIL-SP)',
    category: 'Infraestrutura & Energia',
    unit: 'mil MWh/mês',
    currentValue: 98.7,
    lastMonthValue: 96.2,
    changePercent: 2.6,
    year: '2025',
    historicalSeries: [
      { month: 'Jul/25', value: 94.5 },
      { month: 'Ago/25', value: 95.8 },
      { month: 'Set/25', value: 96.0 },
      { month: 'Out/25', value: 97.4 },
      { month: 'Nov/25', value: 96.2 },
      { month: 'Dez/25', value: 98.7 }
    ],
    description: 'Consumo mensal de energia elétrica em Mauá reportado pelo Anuário de Energéticos da SEMIL-SP, com 58% do volume consumido pelo setor industrial e Polo de Capuava.',
    source: 'SEMIL-SP • Anuário de Energéticos por Municípios',
    sourceUrl: 'https://semil.sp.gov.br/anuario-de-energeticos-por-municipios-do-estado-de-sao-paulo/#:~:text=Com%20esta%20publica%C3%A7%C3%A3o%2C%20a%20Semil,insumos%20necess%C3%A1rios%20ao%20desenvolvimento%20regional.'
  }
];

// ==========================================================================
// 5. PONTOS GEORREFERENCIADOS PARA O MAPA LEAFLET (MAUÁ EM MAPAS)
// ==========================================================================

export interface MapFeature {
  id: string;
  name: string;
  category: 'saude' | 'educacao' | 'social' | 'industria' | 'parque' | 'governo';
  lat: number;
  lng: number;
  address: string;
  bairro: string;
  details: string;
}

export const mauaMapPoints: MapFeature[] = [
  // Governo / Paço
  {
    id: 'paco-municipal',
    name: 'Paço Municipal de Mauá',
    category: 'governo',
    lat: -23.6678,
    lng: -46.4614,
    address: 'Av. João Ramalho, 205',
    bairro: 'Vila Noêmia / Centro',
    details: 'Sede do Poder Executivo Municipal e gabinete do Prefeito.'
  },
  // Saúde
  {
    id: 'hospital-nardini',
    name: 'Hospital de Clínicas Dr. Radamés Nardini',
    category: 'saude',
    lat: -23.6635,
    lng: -46.4528,
    address: 'Rua Regente Feijó, 166',
    bairro: 'Vila Bocaina',
    details: 'Hospital municipal referência em urgência, cirurgias e leitos de UTI.'
  },
  {
    id: 'upa-zaira',
    name: 'UPA Zaíra',
    category: 'saude',
    lat: -23.6521,
    lng: -46.4412,
    address: 'Av. Washington Luís, 1950',
    bairro: 'Jardim Zaíra',
    details: 'Unidade de Pronto Atendimento 24h para urgências e emergências.'
  },
  {
    id: 'upa-vila-magini',
    name: 'UPA Vila Magini',
    category: 'saude',
    lat: -23.6582,
    lng: -46.4629,
    address: 'Av. Washington Luís, 3890',
    bairro: 'Vila Magini',
    details: 'Atendimento de pronto socorro 24 horas.'
  },
  {
    id: 'upa-barao-maua',
    name: 'UPA Barão de Mauá',
    category: 'saude',
    lat: -23.6821,
    lng: -46.4560,
    address: 'Av. Barão de Mauá, 3590',
    bairro: 'Parque das Américas',
    details: 'Pronto atendimento 24h na zona sul de Mauá.'
  },
  {
    id: 'ubs-vila-assis',
    name: 'UBS Vila Assis',
    category: 'saude',
    lat: -23.6745,
    lng: -46.4498,
    address: 'Rua Pedro de Toledo, 340',
    bairro: 'Vila Assis Brasil',
    details: 'Atenção básica, vacinação, pré-natal e consultas médicas.'
  },
  {
    id: 'ubs-guapituba',
    name: 'UBS Guapituba',
    category: 'saude',
    lat: -23.6892,
    lng: -46.4715,
    address: 'Av. Dom José Gaspar, 2810',
    bairro: 'Guapituba',
    details: 'Unidade Básica de Saúde da Família e dispensação de medicamentos.'
  },
  // Educação
  {
    id: 'emeief-darcy-ribeiro',
    name: 'EMEIEF Professor Darcy Ribeiro',
    category: 'educacao',
    lat: -23.6598,
    lng: -46.4485,
    address: 'Rua América do Sul, 120',
    bairro: 'Jardim Zaíra',
    details: 'Escola Municipal de Educação Infantil e Ensino Fundamental.'
  },
  {
    id: 'emeief-cora-coralina',
    name: 'EMEIEF Cora Coralina',
    category: 'educacao',
    lat: -23.6712,
    lng: -46.4632,
    address: 'Rua São Tomé, 105',
    bairro: 'Parque São Vicente',
    details: 'Ensino integral infantil e anos iniciais com laboratório digital.'
  },
  {
    id: 'ee-monsenhor-cecilio',
    name: 'EE Monsenhor Cecílio Cury',
    category: 'educacao',
    lat: -23.6651,
    lng: -46.4589,
    address: 'Rua dos Bandeirantes, 320',
    bairro: 'Matriz / Centro',
    details: 'Escola Estadual tradicional de Ensino Médio de Mauá.'
  },
  // Social
  {
    id: 'cras-zaira',
    name: 'CRAS Zaíra',
    category: 'social',
    lat: -23.6534,
    lng: -46.4385,
    address: 'Av. Washington Luís, 1515',
    bairro: 'Jardim Zaíra',
    details: 'Centro de Referência de Assistência Social, CadÚnico e Bolsa Família.'
  },
  {
    id: 'cras-feital',
    name: 'CRAS Feital',
    category: 'social',
    lat: -23.6715,
    lng: -46.4210,
    address: 'Rua Almirante Tamandaré, 45',
    bairro: 'Vila Feital',
    details: 'Atendimento socioassistencial às famílias da região leste.'
  },
  // Indústria & Polo
  {
    id: 'polo-petroquimico-capuava',
    name: 'Polo Petroquímico de Capuava',
    category: 'industria',
    lat: -23.6495,
    lng: -46.4920,
    address: 'Av. Alberto Soares Sampaio',
    bairro: 'Capuava',
    details: 'Maior polo petroquímico da Região Metropolitana de SP, abrigando a Refinaria Recap e indústrias químicas de base.'
  },
  // Parques & Meio Ambiente
  {
    id: 'parque-ecologico-guapituba',
    name: 'Parque Ecológico Guapituba',
    category: 'parque',
    lat: -23.6850,
    lng: -46.4735,
    address: 'Av. Capitão João, 3220',
    bairro: 'Guapituba',
    details: '136.000 m² de Mata Atlântica preservada, lagos, pistas de caminhada e casarão histórico.'
  },
  {
    id: 'gruta-santa-luzia',
    name: 'Parque Natural Municipal Gruta Santa Luzia',
    category: 'parque',
    lat: -23.6812,
    lng: -46.4298,
    address: 'Rua Luzia da Silva Itabaiana, 100',
    bairro: 'Jardim Itapeva',
    details: 'Nascente histórica do Rio Tamanduateí e santuário natural ecológico.'
  }
];

// ==========================================================================
// 6. PUBLICAÇÕES & DOCUMENTOS TÉCNICOS
// ==========================================================================

export interface Publication {
  id: string;
  title: string;
  category: 'Boletim de Conjuntura' | 'Sumário de Dados' | 'Nota Técnica' | 'Estudo Temático';
  date: string;
  year: number;
  author: string;
  pages: number;
  summary: string;
  fileSize: string;
  downloadUrl: string;
}

export const mauaPublications: Publication[] = [
  {
    id: 'pub-01',
    title: 'Boletim de Conjuntura Socioeconômica de Mauá – Edição 2025/2026',
    category: 'Boletim de Conjuntura',
    date: '15 de Fevereiro de 2026',
    year: 2026,
    author: 'Equipe Técnica OPPES Mauá',
    pages: 48,
    summary: 'Análise detalhada do comportamento do emprego formal através do CAGED, evolução do PIB municipal e projeção de receitas públicas para o biênio 2026.',
    fileSize: '3.4 MB',
    downloadUrl: '#'
  },
  {
    id: 'pub-02',
    title: 'Sumário de Dados Demográficos – Primeiros Resultados do Censo 2022',
    category: 'Sumário de Dados',
    date: '10 de Dezembro de 2025',
    year: 2025,
    author: 'Coordenação de Estatística e Informação / CTI',
    pages: 36,
    summary: 'Espacialização dos setores censitários do IBGE agregados pelos 14 bairros oficiais de Mauá, domicílios vagos e densidade populacional.',
    fileSize: '2.8 MB',
    downloadUrl: '#'
  },
  {
    id: 'pub-03',
    title: 'Nota Técnica: O Polo Petroquímico de Capuava e o VAF Industrial',
    category: 'Nota Técnica',
    date: '28 de Outubro de 2025',
    year: 2025,
    author: 'Departamento de Desenvolvimento Econômico',
    pages: 18,
    summary: 'Estudo do impacto fiscal da cadeia petroquímica no Valor Adicionado Fiscal (VAF) e as perspectivas de atração de novos fornecedores industriais.',
    fileSize: '1.9 MB',
    downloadUrl: '#'
  },
  {
    id: 'pub-04',
    title: 'Estudo Temático: Mapeamento da Vulnerabilidade Social (IPVS Seade em Mauá)',
    category: 'Estudo Temático',
    date: '14 de Agosto de 2025',
    year: 2025,
    author: 'Secretaria de Assistência Social e Cidadania (SASC)',
    pages: 52,
    summary: 'Diagnóstico territorial das famílias beneficiárias do Bolsa Família e localização dos eixos prioritários de expansão dos serviços socioassistenciais.',
    fileSize: '4.2 MB',
    downloadUrl: '#'
  },
  {
    id: 'pub-05',
    title: 'Relatório de Gestão Fiscal – Execução Orçamentária LOA / LDO 2025',
    category: 'Nota Técnica',
    date: '20 de Julho de 2025',
    year: 2025,
    author: 'Secretaria de Finanças de Mauá',
    pages: 28,
    summary: 'Demonstrativo dos limites da Lei de Responsabilidade Fiscal (LRF), despesas de pessoal e investimentos realizados no exercício.',
    fileSize: '2.1 MB',
    downloadUrl: '#'
  }
];

// ==========================================================================
// 7. FONTES OFICIAIS EXTERNAS DE DADOS DE MAUÁ
// ==========================================================================

export interface OfficialDataSource {
  id: string;
  name: string;
  shortName: string;
  agency: string;
  url: string;
  category: string;
  description: string;
  frequency: string;
  indicatorKey: string;
}

export const mauaOfficialSources: OfficialDataSource[] = [
  {
    id: 'src-icms-sp',
    name: 'Relatório da Receita Tributária (ICMS dos Municípios Paulistas)',
    shortName: 'Sefaz-SP (ICMS)',
    agency: 'Secretaria da Fazenda e Planejamento do Estado de São Paulo',
    url: 'https://portal.fazenda.sp.gov.br/acessoinformacao/Paginas/Relat%C3%B3rios-da-Receita-Tribut%C3%A1ria.aspx',
    category: 'Finanças Públicas & Tributos',
    description: 'Arrecadação estadual do ICMS, apuração do Índice de Participação dos Municípios (IPM), cota-parte repassada e declarações da DIPAM de contribuintes de Mauá.',
    frequency: 'Mensal e Anual',
    indicatorKey: 'Repasse anual de R$ 412,5 mi para Mauá'
  },
  {
    id: 'src-rfb-arrecadacao',
    name: 'ReceitaData – Arrecadação das Receitas Administradas pela RFB por Município',
    shortName: 'Receita Federal / MF (IR)',
    agency: 'Ministério da Fazenda / Secretaria Especial da Receita Federal do Brasil',
    url: 'https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos/receitadata/arrecadacao/copy_of_arrecadacao-das-receitas-administradas-pela-rfb-por-municipio',
    category: 'Tributos Federais & Renda',
    description: 'Arrecadação de tributos federais (Imposto de Renda PF/PJ, CSLL, PIS/Pasep, Cofins e receitas previdenciárias) por município de domicílio fiscal dos contribuintes de Mauá.',
    frequency: 'Mensal',
    indicatorKey: 'Arrecadação de R$ 1,48 bi de tributos federais'
  },
  {
    id: 'src-ibge-pib',
    name: 'Produto Interno Bruto dos Municípios (PIB Municipal)',
    shortName: 'IBGE Contas Nacionais (PIB)',
    agency: 'Instituto Brasileiro de Geografia e Estatística (IBGE)',
    url: 'https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9088-produto-interno-bruto-dos-municipios.html',
    category: 'Economia & Contas Nacionais',
    description: 'PIB a preços correntes, PIB per capita e Valor Adicionado Bruto (VAB) por grandes setores de atividade (Indústria com Polo Petroquímico, Serviços e Administração Pública).',
    frequency: 'Anual',
    indicatorKey: 'PIB de R$ 24,99 bi • R$ 59.773 per capita'
  },
  {
    id: 'src-semil-energia',
    name: 'Anuário de Energéticos por Municípios do Estado de São Paulo',
    shortName: 'SEMIL-SP (Consumo Energético)',
    agency: 'Secretaria de Meio Ambiente, Infraestrutura e Logística do Estado de São Paulo',
    url: 'https://semil.sp.gov.br/anuario-de-energeticos-por-municipios-do-estado-de-sao-paulo/#:~:text=Com%20esta%20publica%C3%A7%C3%A3o%2C%20a%20Semil,insumos%20necess%C3%A1rios%20ao%20desenvolvimento%20regional.',
    category: 'Energia & Infraestrutura',
    description: 'Balanço e consumo de energia elétrica em Megawatt-hora (MWh) desagregado por setores (Industrial 58%, Residencial 26%, Comercial 11% e Iluminação Pública).',
    frequency: 'Anual',
    indicatorKey: '1.184.200 MWh/ano • 58% na Indústria'
  },
  {
    id: 'src-ibge-cidades',
    name: 'IBGE Cidades – Panorama Oficial de Mauá (SP)',
    shortName: 'IBGE Cidades (Mauá)',
    agency: 'Instituto Brasileiro de Geografia e Estatística (IBGE)',
    url: 'https://www.ibge.gov.br/cidades-e-estados/sp/maua.html',
    category: 'Demografia & Território',
    description: 'Estatísticas censitárias completas, população 418.261 hab, área 62,034 km², densidade 6.753,01 hab/km², IDHM 0,766 e saúde.',
    frequency: 'Contínua',
    indicatorKey: '418.261 hab • 62,034 km²'
  },
  {
    id: 'src-mte-caged-rais',
    name: 'Estatísticas do Trabalho (Novo CAGED e RAIS)',
    shortName: 'Ministério do Trabalho (CAGED / RAIS)',
    agency: 'Ministério do Trabalho e Emprego (MTE)',
    url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho',
    category: 'Trabalho, Emprego & Renda',
    description: 'Acesso público e irrestrito a qualquer cidadão aos dados estatísticos de emprego formal: admissões, demissões, saldo líquido do Novo CAGED e estoque anual com vínculos ativos pela RAIS.',
    frequency: 'Mensal (CAGED) e Anual (RAIS)',
    indicatorKey: '88.450 empregos formais • +2.140 no ano'
  },
  {
    id: 'src-inep-censo-escolar-2025',
    name: 'Painéis Estatísticos do INEP – Censo Escolar 2025',
    shortName: 'INEP (Censo Escolar 2025)',
    agency: 'Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (INEP / MEC)',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9',
    category: 'Educação Básica & Matrículas',
    description: 'Resultados e microdados estatísticos oficiais do Censo Escolar 2025 para Mauá: total de 80.200 alunos matriculados, etapas de ensino, escolas municipais, estaduais e particulares.',
    frequency: 'Anual (Censo Escolar 2025)',
    indicatorKey: '80.200 matrículas • 148 escolas mapeadas'
  }
];
