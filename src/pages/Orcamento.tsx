import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Building2, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Landmark,
  TrendingUp,
  Zap,
  Sparkles,
  Database
} from 'lucide-react';
import { budget2026 } from '../data/mauaData';
import '../utils/chartConfig';
import { Bar, Doughnut } from 'react-chartjs-2';

export const Orcamento: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [departmentFilter] = useState<string>('todos');

  const filteredDepartments = budget2026.departments.filter(dept => {
    return departmentFilter === 'todos' || dept.name.toLowerCase().includes(departmentFilter.toLowerCase());
  });

  // Chart 1: Despesas por Secretaria
  const expensesChartData = {
    labels: budget2026.departments.map(d => d.name),
    datasets: [
      {
        label: 'Orçamento Previsto (R$ Milhões)',
        data: budget2026.departments.map(d => Number((d.budgeted / 1000000).toFixed(1))),
        backgroundColor: budget2026.departments.map(d => d.color)
      }
    ]
  };

  // Chart 2: Fontes de Receita
  const revenueChartData = {
    labels: budget2026.revenueSources.map(r => r.name),
    datasets: [
      {
        label: 'Receitas (R$ Milhões)',
        data: budget2026.revenueSources.map(r => Number((r.amount / 1000000).toFixed(1))),
        backgroundColor: ['#2352EE', '#B5179E', '#0284C7', '#10B981']
      }
    ]
  };

  const handleDownloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Secretaria / Órgão,Valor Fixado (R$),Valor Liquidado (R$),Participação (%)\n";
    budget2026.departments.forEach(d => {
      csvContent += `"${d.name}",${d.budgeted},${d.realized},${d.percentage}%\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orcamento-maua-${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="main-content">
      {/* Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #10277A 100%)', color: '#FFFFFF', padding: '3.5rem 0 2.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
                Gestão Fiscal & Transparência Pública
              </span>
              <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
                Orçamento Municipal de Mauá • Exercício {selectedYear}
              </h1>
              <p style={{ color: '#CBD5E1', maxWidth: '720px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Detalhamento das receitas orçamentárias arrecadadas e despesas públicas liquidadas pela Administração Direta e Indireta de Mauá, fiscalizadas e homologadas pelo Tribunal de Contas do Estado de São Paulo (TCE/SP).
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)' }}>
              <span style={{ fontSize: '0.8125rem', color: '#CBD5E1', fontWeight: 600 }}>Exercício:</span>
              <button 
                type="button" 
                onClick={() => setSelectedYear(2026)}
                className={`access-btn ${selectedYear === 2026 ? 'active' : ''}`}
              >
                2026 (Vigente)
              </button>
              <button 
                type="button" 
                onClick={() => setSelectedYear(2025)}
                className={`access-btn ${selectedYear === 2025 ? 'active' : ''}`}
              >
                2025 (Consolidado)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Números Gerais do Orçamento */}
      <section style={{ padding: '2.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon-wrapper blue">
                  <Landmark size={22} />
                </div>
                <span className="stat-badge positive">LOA {selectedYear}</span>
              </div>
              <div className="stat-number">R$ 2,12 bi</div>
              <div className="stat-title">Receita Total Prevista</div>
              <div className="stat-source-tag">
                <Database size={11} />
                <span>Fonte: Prefeitura de Mauá / TCE-SP</span>
                <span>•</span>
                <strong>Ano: LOA {selectedYear}</strong>
              </div>
              <div className="stat-footer-text">Arrecadado até o momento: R$ 2,08 bi</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon-wrapper magenta">
                  <FileSpreadsheet size={22} />
                </div>
                <span className="stat-badge positive">96,3% executado</span>
              </div>
              <div className="stat-number">R$ 2,04 bi</div>
              <div className="stat-title">Despesa Total Liquidada</div>
              <div className="stat-source-tag">
                <Database size={11} />
                <span>Fonte: Prefeitura de Mauá / TCE-SP</span>
                <span>•</span>
                <strong>Ano: LOA {selectedYear}</strong>
              </div>
              <div className="stat-footer-text">Superávit orçamentário corrente</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon-wrapper emerald">
                  <ShieldCheck size={22} />
                </div>
                <span className="stat-badge positive">31,5% do total</span>
              </div>
              <div className="stat-number">R$ 667,8 mi</div>
              <div className="stat-title">Investimento em Saúde Pública</div>
              <div className="stat-source-tag">
                <Database size={11} />
                <span>Fonte: Fundo Municipal de Saúde</span>
                <span>•</span>
                <strong>Ano: {selectedYear}</strong>
              </div>
              <div className="stat-footer-text">Mínimo constitucional de 15% superado</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon-wrapper cyan">
                  <Building2 size={22} />
                </div>
                <span className="stat-badge positive">26,8% do total</span>
              </div>
              <div className="stat-number">R$ 568,1 mi</div>
              <div className="stat-title">Investimento em Educação</div>
              <div className="stat-source-tag">
                <Database size={11} />
                <span>Fonte: Secretaria de Educação / FUNDEB</span>
                <span>•</span>
                <strong>Ano: {selectedYear}</strong>
              </div>
              <div className="stat-footer-text">Mínimo constitucional de 25% superado</div>
            </div>
          </div>

          {/* Destaque Comparativo com IBGE Cidades Finanças Públicas */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid rgba(35, 82, 238, 0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'var(--maua-blue-subtle)', color: 'var(--maua-blue)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
                <Landmark size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Comparativo com Finanças Públicas Oficiais do IBGE Cidades
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Receitas Realizadas: <strong>R$ 1,99 bi</strong> • Despesas Empenhadas: <strong>R$ 1,81 bi</strong> • Receitas Externas: <strong>66,95%</strong> (Fonte: IBGE Panorama Mauá • <strong>Ano: 2025</strong>)
                </div>
              </div>
            </div>

            <a 
              href="https://cidades.ibge.gov.br/brasil/sp/maua/panorama"
              target="_blank"
              rel="noopener noreferrer"
              className="access-btn"
              style={{ background: 'var(--maua-blue)', color: '#FFFFFF', padding: '0.45rem 0.9rem', fontSize: '0.78rem' }}
            >
              <span>Conferir no IBGE Panorama</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Área de Gráficos de Execução Orçamentária */}
          <div className="grid-responsive-split" style={{ marginBottom: '2.5rem' }}>
            
            {/* Gráfico 1: Despesas por Secretaria */}
            <div className="chart-card-wrapper" style={{ margin: 0 }}>
              <div className="chart-card-header">
                <div>
                  <h3 className="chart-title">Despesas Fixadas por Secretaria Municipal</h3>
                  <p className="chart-desc">Em R$ Milhões • Lei Orçamentária Anual (LOA Mauá)</p>
                </div>
                <span className="stat-badge neutral">Por Secretaria</span>
              </div>
              <div style={{ height: '320px' }}>
                <Bar 
                  data={expensesChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { grid: { color: '#F1F5F9' }, ticks: { callback: (v) => `R$ ${v} mi` } },
                      y: { grid: { display: false }, ticks: { font: { size: 11 } } }
                    }
                  }}
                />
              </div>
            </div>

            {/* Gráfico 2: Composição da Receita */}
            <div className="chart-card-wrapper" style={{ margin: 0 }}>
              <div className="chart-card-header">
                <div>
                  <h3 className="chart-title">Origem dos Recursos Arrecadados</h3>
                  <p className="chart-desc">Participação por fonte de tributação e repasses</p>
                </div>
              </div>
              <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Doughnut 
                  data={revenueChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'bottom', labels: { boxWidth: 12, padding: 12, font: { size: 11 } } }
                    }
                  }}
                />
              </div>
            </div>

          </div>

          {/* Tabela de Execução Orçamentária */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Detalhamento das Despesas por Secretaria e Encargos
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Dados oficiais extraídos do Sistema Integrado de Gestão Financeira e TCE/SP.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button 
                  type="button" 
                  className="access-btn" 
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-main)', border: '1px solid var(--border-medium)', padding: '0.45rem 0.85rem' }}
                  onClick={handleDownloadCsv}
                >
                  <Download size={14} />
                  <span>Exportar Dados (.CSV)</span>
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Secretaria / Órgão</th>
                    <th>Orçamento Fixado (R$)</th>
                    <th>Valor Liquidado (R$)</th>
                    <th>Participação</th>
                    <th>Execução</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartments.map((dept, idx) => {
                    const execRate = ((dept.realized / dept.budgeted) * 100).toFixed(1);
                    return (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: dept.color, display: 'inline-block' }}></span>
                          <span>{dept.name}</span>
                        </td>
                        <td>R$ {dept.budgeted.toLocaleString('pt-BR')}</td>
                        <td>R$ {dept.realized.toLocaleString('pt-BR')}</td>
                        <td>
                          <strong>{dept.percentage}%</strong>
                        </td>
                        <td>
                          <span className="stat-badge positive" style={{ fontSize: '0.72rem' }}>
                            {execRate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Painel de Fontes Oficiais da Receita e Economia (SEFAZ, RFB, IBGE, SEMIL) */}
          <div style={{ marginTop: '3rem', background: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div>
                <span className="hero-pill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#EFF6FF', color: '#1D4ED8', borderColor: '#BFDBFE', fontSize: '0.75rem' }}>
                  <Sparkles size={13} />
                  <span>Bases Oficiais Governamentais</span>
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.25rem 0' }}>
                  Fontes Oficiais da Receita Tributária & Indicadores Econômicos
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, maxWidth: '750px' }}>
                  Acesse diretamente os portais de dados abertos estaduais e federais responsáveis pelo cálculo, repasse e auditoria dos recursos e da atividade econômica de Mauá.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              
              {/* 1. Sefaz-SP ICMS */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.4rem', border: '1px solid var(--border-medium)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(35, 82, 238, 0.1)', color: '#2352EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2352EE', textTransform: 'uppercase' }}>Governo de SP</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Arrecadação de ICMS</h4>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: '0.6rem 0 1rem' }}>
                    Relatório da Receita Tributária da Secretaria da Fazenda e Planejamento de SP. Apura o Índice de Participação (IPM) e a cota-parte transferida a Mauá (~R$ 412,5 mi/ano).
                  </p>
                </div>
                <a 
                  href="https://portal.fazenda.sp.gov.br/acessoinformacao/Paginas/Relat%C3%B3rios-da-Receita-Tribut%C3%A1ria.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="axis-card-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Relatório Tributário Sefaz-SP</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* 2. Ministério da Fazenda / Receita Federal */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.4rem', border: '1px solid var(--border-medium)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(181, 23, 158, 0.1)', color: '#B5179E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Landmark size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B5179E', textTransform: 'uppercase' }}>Governo Federal</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Imposto de Renda (RFB)</h4>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: '0.6rem 0 1rem' }}>
                    ReceitaData da Receita Federal do Brasil. Consolida o Imposto de Renda (IRPF e IRPJ), CSLL e contribuições administradas no município de Mauá (~R$ 1,48 bi/ano).
                  </p>
                </div>
                <a 
                  href="https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos/receitadata/arrecadacao/copy_of_arrecadacao-das-receitas-administradas-pela-rfb-por-municipio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="axis-card-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>ReceitaData Ministério Fazenda</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* 3. IBGE PIB dos Municípios */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.4rem', border: '1px solid var(--border-medium)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(2, 132, 199, 0.1)', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0284C7', textTransform: 'uppercase' }}>IBGE Contas Nacionais</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>PIB dos Municípios</h4>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: '0.6rem 0 1rem' }}>
                    Série oficial do Produto Interno Bruto a preços correntes (R$ 24,99 bilhões), PIB per capita (R$ 59.773,04) e VAB industrial e de serviços calculado pelo IBGE.
                  </p>
                </div>
                <a 
                  href="https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9088-produto-interno-bruto-dos-municipios.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="axis-card-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>PIB dos Municípios IBGE</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* 4. SEMIL-SP Energia Elétrica */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.4rem', border: '1px solid var(--border-medium)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>SEMIL SP</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Consumo de Energia</h4>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: '0.6rem 0 1rem' }}>
                    Anuário de Energéticos da Secretaria do Meio Ambiente e Infraestrutura. Balanço em MWh por setor: 58% na indústria de Mauá e 26% em domicílios residenciais.
                  </p>
                </div>
                <a 
                  href="https://semil.sp.gov.br/anuario-de-energeticos-por-municipios-do-estado-de-sao-paulo/#:~:text=Com%20esta%20publica%C3%A7%C3%A3o%2C%20a%20Semil,insumos%20necess%C3%A1rios%20ao%20desenvolvimento%20regional." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="axis-card-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Anuário Energético SEMIL</span>
                  <ExternalLink size={12} />
                </a>
              </div>

            </div>
          </div>

          {/* Links para os Tribunais e Portais Oficiais */}
          <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <div className="axis-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <ShieldCheck size={24} color="#2352EE" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Portal da Transparência de Mauá</h4>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: '1.5', marginBottom: '1rem' }}>
                Acompanhe em tempo real empenhos, contratos, licitações, despesas com pessoal e repasses de convênios diretamente no portal oficial do município.
              </p>
              <a 
                href="https://transparencia.maua.sp.gov.br/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="axis-card-btn"
              >
                <span>Acessar Portal da Transparência</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <div className="axis-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Landmark size={24} color="#B5179E" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Tribunal de Contas do Estado (TCE/SP)</h4>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: '1.5', marginBottom: '1rem' }}>
                Consulte pareceres prévios, relatórios de alertas fiscais e o Índice de Efetividade da Gestão Municipal (IEG-M) de Mauá fiscalizados pelo TCE/SP.
              </p>
              <a 
                href="https://www.tce.sp.gov.br/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="axis-card-btn"
              >
                <span>Consultar Dados no TCE/SP</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
