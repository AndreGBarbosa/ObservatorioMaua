# ObservatorioMaua

Portal oficial do **Observatório de Mauá** — plataforma de transparência ativa, inteligência de dados públicos e indicadores socioeconômicos do município de Mauá/SP.

Inspirado nas melhores práticas de observatórios municipais (como o Observatório de Diadema) e com a identidade visual oficial de Mauá (`#2352EE` e `#B5179E`), o portal centraliza dados oficiais, painéis interativos de BI e um Assistente de Inteligência Artificial para cidadãos, gestores públicos e pesquisadores.

---

## 📊 Fontes Oficiais de Dados Integradas

Todos os indicadores contam com **atribuição explícita de fonte e ano de referência**:

- **[IBGE Cidades - Panorama de Mauá (Cód. 3529401)](https://cidades.ibge.gov.br/brasil/sp/maua/panorama)**: População no Censo 2022 (418.261 hab.), Densidade Demográfica, PIB per capita (R$ 38.082,43), Salário Médio Formal (2,6 salários mínimos), Pessoal Ocupado, IDHM (0,766), Mortalidade Infantil, Esgotamento Sanitário e Arborização.
- **[Secretaria da Fazenda de SP (SEFAZ-SP) - Receita Tributária](https://portal.fazenda.sp.gov.br/acessoinformacao/Paginas/Relat%C3%B3rios-da-Receita-Tribut%C3%A1ria.aspx)**: Arrecadação de ICMS, repasses estaduais e histórico fiscal.
- **[Ministério da Fazenda / Receita Federal](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos/receitadata/arrecadacao/copy_of_arrecadacao-das-receitas-administradas-pela-rfb-por-municipio)**: Arrecadação de IRPF e IRPJ administradas pela RFB.
- **[Ministério do Trabalho e Emprego (MTE) - Novo CAGED & RAIS](https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho)**: Estatísticas de admissões, desligamentos, saldo formal acumulado de empregos e vínculos ativos por setor.
- **[INEP Censo Escolar & QEdu](https://qedu.org.br/municipio/3529401-maua/censo-escolar)**:
  - **187 escolas de Educação Básica ativas** (Rede Municipal, Estadual e Privada).
  - **101 a 109 estabelecimentos** com Ensino Fundamental.
  - **42 a 45 estabelecimentos** com Ensino Médio.
  - **Rede Municipal**: 48 escolas (44 próprias + 4 conveniadas) focadas na Educação Infantil e EJA.
  - **Rede Estadual**: Mais de 60 escolas estaduais (Anos Finais Fundamental e Ensino Médio sob Seduc-SP / Diretoria de Mauá).
- **[SEMIL-SP - Anuário Energético](https://semil.sp.gov.br/anuario-de-energeticos-por-municipios-do-estado-de-sao-paulo/)**: Consumo de energia elétrica industrial, comercial e residencial.

---

## 🚀 Funcionalidades do Portal

1. **Dashboard Principal (`/`)**: Visão geral com cartões de estatísticas vitais, busca global inteligente, filtros por eixo e atalhos rápidos.
2. **Painel Dinâmico IBGE (`IbgeIndicatorPanel`)**: Abas temáticas (Geral, Trabalho, Economia, Educação, Saúde & Meio Ambiente) com sincronização em tempo real via API do IBGE Cidades.
3. **Indicadores Socioeconômicos (`/indicadores`)**: Filtros por eixos temáticos (Educação, Economia, Saúde, Emprego, Meio Ambiente, Gestão Pública, Segurança).
4. **História e Identidade de Mauá (`/historia`)**: Linha do tempo da fundação, símbolos municipais, Barão de Mauá e herança ferroviária e industrial.
5. **Orçamento e Finanças Públicas (`/orcamento`)**: Análise da LOA, receitas, despesas, fontes e comparativo com o IBGE Finanças Públicas 2025.
6. **Dados Abertos e Downloads (`/dados-abertos`)**: Catálogo de datasets em CSV, JSON e relatórios para livre utilização pela sociedade civil e pesquisadores.
7. **Assistente Virtual IA (`ObservatorioChatbot`)**: Chatbot flutuante inteligente treinado com todos os dados oficiais de Mauá, com suporte a sugestões de perguntas, histórico de conversa, links para fontes e citações diretas.
8. **100% Responsivo e Acessível**: Testado para telas mobile, tablets e desktops com navegação por teclado e tags semânticas.

---

## 🛠️ Tecnologias Utilizadas

- **React 19 + TypeScript**
- **Vite 8**
- **Lucide React** (Ícones modernos)
- **Vanilla CSS3** (Tokens de design, temas, glassmorphism e animações)
- **API IBGE Cidades & APIs Governamentais**

---

## 💻 Como Rodar Localmente

```bash
# Clonar o repositório
git clone https://github.com/AndreGBarbosa/ObservatorioMaua.git

# Acessar a pasta do projeto
cd ObservatorioMaua

# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

---

## 📄 Licença

Projeto desenvolvido para fins de transparência e utilidade pública municipal.
