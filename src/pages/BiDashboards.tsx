import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Building2, 
  HeartPulse, 
  GraduationCap, 
  Layers, 
  Users, 
  Briefcase, 
  Download, 
  Share2, 
  Calendar, 
  Database,
  CheckCircle,
  Table as TableIcon,
  Zap,
  ExternalLink
} from 'lucide-react';
import { biDashboardsList } from '../data/mauaData';
import type { BiDashboard } from '../data/mauaData';
import '../utils/chartConfig';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

export const BiDashboards: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || biDashboardsList[0].id;
  
  const [activeTabId, setActiveTabId] = useState<string>(initialTab);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && biDashboardsList.some(b => b.id === tabFromUrl)) {
      setActiveTabId(tabFromUrl);
    }
  }, [searchParams]);

  const activeDashboard: BiDashboard = biDashboardsList.find(b => b.id === activeTabId) || biDashboardsList[0];

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
    setSearchParams({ tab: id });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download tabular data as CSV
  const handleDownloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Indicador / Categoria,Valor\n";
    activeDashboard.chartData.labels.forEach((label, idx) => {
      const val = activeDashboard.chartData.datasets[0]?.data[idx] || 0;
      csvContent += `"${label}",${val}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeDashboard.id}-dados.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="main-content">
      {/* Top Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #193DB8 100%)', color: '#FFFFFF', padding: '3rem 0 2.5rem' }}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
            Business Intelligence Governamental
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
            BI OPPES Mauá • Painéis Analíticos
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Ambiente interativo de visualização de dados públicos de Mauá. Demografia, arrecadação, empresas ativas, rede de saúde, censo escolar, vulnerabilidade social e mercado formal de trabalho.
          </p>
        </div>
      </section>

      {/* Navegação por Abas dos 8 BIs */}
      <section style={{ padding: '2rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          <div className="dashboard-tabs-bar">
            {biDashboardsList.map((bi) => {
              const isActive = bi.id === activeTabId;
              let Icon = BarChart3;
              if (bi.id === 'bi-maua-geral') Icon = Users;
              else if (bi.id === 'bi-economia-maua') Icon = TrendingUp;
              else if (bi.id === 'bi-cnpj-maua') Icon = Building2;
              else if (bi.id === 'bi-estabel-saude') Icon = HeartPulse;
              else if (bi.id === 'bi-censo-escolar') Icon = GraduationCap;
              else if (bi.id === 'bi-escolas-maua') Icon = Layers;
              else if (bi.id === 'bi-vulnerabilidade') Icon = Users;
              else if (bi.id === 'bi-emprego-rais') Icon = Briefcase;
              else if (bi.id === 'bi-energia-semil') Icon = Zap;

              return (
                <button
                  key={bi.id}
                  type="button"
                  className={`dashboard-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabChange(bi.id)}
                >
                  <Icon size={16} />
                  <span>{bi.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Cabeçalho do Painel Ativo */}
          <div style={{ 
            background: '#FFFFFF', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--border-subtle)', 
            padding: '2rem', 
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <span className="pub-category">{activeDashboard.category}</span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.35rem 0' }}>
                  {activeDashboard.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px', lineHeight: '1.5' }}>
                  {activeDashboard.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-light)', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Database size={14} color="#2352EE" />
                    <span>Fonte: {activeDashboard.source}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} color="#B5179E" />
                    <span>Última atualização: {activeDashboard.lastUpdate}</span>
                  </div>
                </div>

                {/* Badges de Links Oficiais Externos */}
                {activeDashboard.officialLinks && activeDashboard.officialLinks.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>Fontes Oficiais:</span>
                    {activeDashboard.officialLinks.map((link, lIdx) => (
                      <a 
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="access-btn"
                        style={{ 
                          fontSize: '0.75rem', 
                          padding: '0.3rem 0.65rem', 
                          background: '#EFF6FF', 
                          color: '#1D4ED8', 
                          border: '1px solid #BFDBFE',
                          textDecoration: 'none'
                        }}
                        title={`Consultar ${link.label}`}
                      >
                        <span>{link.label}</span>
                        <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button 
                  type="button" 
                  className="access-btn" 
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-main)', border: '1px solid var(--border-medium)', padding: '0.5rem 0.9rem' }}
                  onClick={handleDownloadCsv}
                  title="Baixar dados em formato CSV"
                >
                  <Download size={14} />
                  <span>Exportar CSV</span>
                </button>
                <button 
                  type="button" 
                  className="access-btn" 
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-main)', border: '1px solid var(--border-medium)', padding: '0.5rem 0.9rem' }}
                  onClick={handleShare}
                  title="Compartilhar link deste painel"
                >
                  {copied ? <CheckCircle size={14} color="#059669" /> : <Share2 size={14} />}
                  <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Destaque Especial: Acesso aos Painéis do INEP PowerBI */}
          {activeDashboard.id === 'bi-censo-escolar' && (
            <div style={{
              background: 'linear-gradient(135deg, #1E3A8A 0%, #2352EE 100%)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem 2rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <span style={{ background: '#F59E0B', color: '#1E293B', fontWeight: 800, fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
                    INEP / MEC OFICIAL
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#93C5FD', fontWeight: 600 }}>Censo Escolar 2025</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.35rem 0', color: '#FFFFFF' }}>
                  Painéis Estatísticos do INEP com Resultados do Censo Escolar 2025
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#E0E7FF', maxWidth: '700px' }}>
                  Acesse a plataforma analítica interativa em Power BI mantida pelo INEP com resultados do Censo Escolar 2025: dados das escolas e matrículas de Mauá.
                </p>
              </div>

              <a 
                href="https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-search-btn"
                style={{ 
                  background: '#F59E0B', 
                  color: '#0F172A', 
                  fontWeight: 800, 
                  textDecoration: 'none', 
                  padding: '0.75rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Acessar Painéis do INEP (Power BI)</span>
                <ExternalLink size={16} />
              </a>
            </div>
          )}

          {/* Grade de KPIs do Dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {activeDashboard.kpis.map((kpi, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-subtle)', 
                  padding: '1.25rem', 
                  boxShadow: 'var(--shadow-sm)' 
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.35rem' }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', lineHeight: 1.1 }}>
                  {kpi.value}
                </div>
                {kpi.change && (
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    color: kpi.isPositive ? '#059669' : '#DC2626', 
                    marginTop: '0.35rem' 
                  }}>
                    {kpi.change}
                  </div>
                )}
                <div style={{ marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.72rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                  <Database size={11} color="#2352EE" />
                  <span>Fonte: {activeDashboard.source.split('/')[0].trim()}</span>
                  <span>•</span>
                  <strong style={{ color: 'var(--maua-blue)' }}>{activeDashboard.lastUpdate}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Área Principal de Gráficos */}
          <div className={activeDashboard.secondaryChartData ? 'grid-responsive-split' : ''} style={{ marginBottom: '2.5rem' }}>
            
            {/* Gráfico Primário */}
            <div className="chart-card-wrapper" style={{ margin: 0 }}>
              <div className="chart-card-header">
                <div>
                  <h3 className="chart-title">Visualização Gráfica Principal</h3>
                  <p className="chart-desc">Série consolidada e categorização • {activeDashboard.shortTitle}</p>
                </div>
                <span className="stat-badge positive">Dados Consolidados</span>
              </div>
              <div style={{ height: '340px' }}>
                {activeDashboard.id === 'bi-economia-maua' || activeDashboard.id === 'bi-emprego-rais' ? (
                  <Line 
                    data={activeDashboard.chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: { grid: { color: '#F1F5F9' } },
                        x: { grid: { display: false } }
                      }
                    }}
                  />
                ) : (
                  <Bar 
                    data={activeDashboard.chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: { grid: { color: '#F1F5F9' } },
                        x: { grid: { display: false } }
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* Gráfico Secundário (quando existir) */}
            {activeDashboard.secondaryChartData && (
              <div className="chart-card-wrapper" style={{ margin: 0 }}>
                <div className="chart-card-header">
                  <div>
                    <h3 className="chart-title">Composição & Proporção</h3>
                    <p className="chart-desc">Distribuição percentual por segmento</p>
                  </div>
                </div>
                <div style={{ height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Doughnut 
                    data={activeDashboard.secondaryChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } }
                      }
                    }}
                  />
                </div>
              </div>
            )}

          </div>

          {/* Tabela de Dados Tabulares */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TableIcon size={18} color="#2352EE" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Detalhamento Tabular
                </h3>
              </div>
              <button 
                type="button" 
                onClick={handleDownloadCsv}
                style={{ background: 'none', border: 'none', color: '#2352EE', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Download size={14} />
                <span>Baixar esta tabela (.CSV)</span>
              </button>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Categoria / Segmento</th>
                    <th>Valor Registrado</th>
                    <th>Participação</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDashboard.chartData.labels.map((lbl, i) => {
                    const val = activeDashboard.chartData.datasets[0]?.data[i] || 0;
                    return (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{lbl}</td>
                        <td>{val.toLocaleString('pt-BR')}</td>
                        <td>{((val / (activeDashboard.chartData.datasets[0]?.data.reduce((a, b) => a + b, 0) || 1)) * 100).toFixed(1)}%</td>
                        <td>
                          <span className="stat-badge positive" style={{ fontSize: '0.7rem' }}>
                            Validado
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Box Informativo Oficial */}
          <div style={{ 
            marginTop: '2rem', 
            background: 'var(--maua-blue-subtle)', 
            border: '1px solid rgba(35, 82, 238, 0.2)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '0.25rem' }}>
                Precisa de recortes específicos para pesquisas acadêmicas ou projetos?
              </h4>
              <p style={{ fontSize: '0.8125rem', color: '#334155', margin: 0 }}>
                O OPPES Mauá fornece bases desidentificadas e microdados para universidades, institutos e cidadãos através da Lei de Acesso à Informação.
              </p>
            </div>
            <a 
              href="#/fale-conosco" 
              className="axis-card-btn"
              style={{ background: 'var(--maua-blue)', color: '#FFF', padding: '0.55rem 1.25rem', borderRadius: 'var(--radius-full)' }}
            >
              <span>Solicitar Dados</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};
